import { db } from '$lib/server/db';
import { users, progress, lessons, achievements, userAchievements, enrollments } from '$lib/server/db/schema';
import { eq, and, count } from 'drizzle-orm';
import { calculateLevel, DEFAULT_ACHIEVEMENTS } from '$lib/config/gamification';

/**
 * Award XP to a user and update their level
 */
export async function awardXP(userId: string, amount: number): Promise<{ newXP: number; newLevel: number; leveledUp: boolean }> {
	// Get current user data
	const [user] = await db.select().from(users).where(eq(users.id, userId));
	if (!user) {
		throw new Error('User not found');
	}

	const currentXP = user.xpTotal || 0;
	const currentLevel = user.level || 1;
	const newXP = currentXP + amount;
	const newLevel = calculateLevel(newXP);
	const leveledUp = newLevel > currentLevel;

	// Update user XP and level
	await db
		.update(users)
		.set({
			xpTotal: newXP,
			level: newLevel
		})
		.where(eq(users.id, userId));

	return { newXP, newLevel, leveledUp };
}

/**
 * Complete a lesson and award XP
 */
export async function completeLesson(
	userId: string,
	lessonId: string
): Promise<{
	xpEarned: number;
	newXP: number;
	newLevel: number;
	leveledUp: boolean;
	newAchievements: typeof DEFAULT_ACHIEVEMENTS;
}> {
	// Check if already completed
	const [existingProgress] = await db
		.select()
		.from(progress)
		.where(and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)));

	if (existingProgress) {
		// Already completed, return current state
		const [user] = await db.select().from(users).where(eq(users.id, userId));
		return {
			xpEarned: 0,
			newXP: user?.xpTotal || 0,
			newLevel: user?.level || 1,
			leveledUp: false,
			newAchievements: []
		};
	}

	// Get lesson XP reward
	const [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId));
	if (!lesson) {
		throw new Error('Lesson not found');
	}

	const xpEarned = lesson.xpReward || 100;

	// Record progress
	await db.insert(progress).values({
		userId,
		lessonId,
		xpEarned
	});

	// Award XP
	const xpResult = await awardXP(userId, xpEarned);

	// Check for new achievements
	const newAchievements = await checkAchievements(userId);

	return {
		xpEarned,
		...xpResult,
		newAchievements
	};
}

/**
 * Check and award any earned achievements
 */
export async function checkAchievements(userId: string): Promise<typeof DEFAULT_ACHIEVEMENTS> {
	const newlyEarned: typeof DEFAULT_ACHIEVEMENTS = [];

	// Get user's current achievements
	const userAchievementsList = await db
		.select({ achievementId: userAchievements.achievementId })
		.from(userAchievements)
		.where(eq(userAchievements.userId, userId));

	const earnedIds = new Set(userAchievementsList.map((a) => a.achievementId));

	// Get all achievements from DB
	const allAchievements = await db.select().from(achievements);

	// Get user stats for checking criteria
	const [progressCount] = await db
		.select({ count: count() })
		.from(progress)
		.where(eq(progress.userId, userId));

	const completedLessons = progressCount?.count || 0;

	// Get lessons by week to check week completion
	const userProgress = await db
		.select({
			lessonId: progress.lessonId
		})
		.from(progress)
		.where(eq(progress.userId, userId));

	const completedLessonIds = userProgress.map((p) => p.lessonId);

	// Check each achievement
	for (const achievement of allAchievements) {
		if (earnedIds.has(achievement.id)) continue;

		let earned = false;

		switch (achievement.id) {
			case 'first_lesson':
				earned = completedLessons >= 1;
				break;

			case 'week_complete':
				// Check if any week is fully completed
				earned = await checkWeekComplete(completedLessonIds);
				break;

			case 'course_complete':
				// Check if any course is fully completed
				earned = await checkCourseComplete(userId);
				break;

			case 'five_lessons':
				earned = completedLessons >= 5;
				break;

			case 'ten_lessons':
				earned = completedLessons >= 10;
				break;

			case 'speed_demon':
				// Complete 3 lessons in one day - check progress timestamps
				earned = await checkSpeedDemon(userId);
				break;
		}

		if (earned) {
			// Award achievement
			await db.insert(userAchievements).values({
				userId,
				achievementId: achievement.id
			});

			// Award bonus XP
			if (achievement.xpBonus) {
				await awardXP(userId, achievement.xpBonus);
			}

			newlyEarned.push({
				id: achievement.id,
				name: achievement.name,
				icon: achievement.icon,
				description: achievement.description || '',
				xpBonus: achievement.xpBonus || 0
			});
		}
	}

	return newlyEarned;
}

/**
 * Check if any week is fully completed
 */
async function checkWeekComplete(completedLessonIds: string[]): Promise<boolean> {
	if (completedLessonIds.length === 0) return false;

	// Get all lessons grouped by course and week
	const allLessons = await db.select().from(lessons);

	// Group lessons by course+week
	const weekGroups = new Map<string, string[]>();
	for (const lesson of allLessons) {
		const key = `${lesson.courseId}-${lesson.week}`;
		if (!weekGroups.has(key)) {
			weekGroups.set(key, []);
		}
		weekGroups.get(key)!.push(lesson.id);
	}

	// Check if any week is fully completed
	const completedSet = new Set(completedLessonIds);
	for (const [, lessonIds] of weekGroups) {
		if (lessonIds.every((id) => completedSet.has(id))) {
			return true;
		}
	}

	return false;
}

/**
 * Check if any course is fully completed
 */
async function checkCourseComplete(userId: string): Promise<boolean> {
	// Get user's enrollments
	const userEnrollments = await db
		.select({ courseId: enrollments.courseId })
		.from(enrollments)
		.where(eq(enrollments.userId, userId));

	if (userEnrollments.length === 0) return false;

	// Get user's completed lessons
	const userProgress = await db
		.select({ lessonId: progress.lessonId })
		.from(progress)
		.where(eq(progress.userId, userId));

	const completedSet = new Set(userProgress.map((p) => p.lessonId));

	// Check each enrolled course
	for (const enrollment of userEnrollments) {
		const courseLessons = await db
			.select({ id: lessons.id })
			.from(lessons)
			.where(eq(lessons.courseId, enrollment.courseId));

		if (courseLessons.length > 0 && courseLessons.every((l) => completedSet.has(l.id))) {
			return true;
		}
	}

	return false;
}

/**
 * Check if user completed 3 lessons in one day
 */
async function checkSpeedDemon(userId: string): Promise<boolean> {
	const userProgress = await db
		.select({ completedAt: progress.completedAt })
		.from(progress)
		.where(eq(progress.userId, userId));

	// Group by date
	const byDate = new Map<string, number>();
	for (const p of userProgress) {
		if (p.completedAt) {
			const dateKey = p.completedAt.toISOString().split('T')[0];
			byDate.set(dateKey, (byDate.get(dateKey) || 0) + 1);
		}
	}

	// Check if any day has 3+ completions
	for (const [, count] of byDate) {
		if (count >= 3) return true;
	}

	return false;
}

/**
 * Get user's progress stats
 */
export async function getUserStats(userId: string) {
	const [user] = await db.select().from(users).where(eq(users.id, userId));
	if (!user) return null;

	const [progressCount] = await db
		.select({ count: count() })
		.from(progress)
		.where(eq(progress.userId, userId));

	const [achievementCount] = await db
		.select({ count: count() })
		.from(userAchievements)
		.where(eq(userAchievements.userId, userId));

	const [enrollmentCount] = await db
		.select({ count: count() })
		.from(enrollments)
		.where(eq(enrollments.userId, userId));

	return {
		xpTotal: user.xpTotal || 0,
		level: user.level || 1,
		lessonsCompleted: progressCount?.count || 0,
		achievementsEarned: achievementCount?.count || 0,
		coursesEnrolled: enrollmentCount?.count || 0
	};
}
