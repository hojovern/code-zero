import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, enrollments, courses, progress, lessons, userAchievements, achievements } from '$lib/server/db/schema';
import { eq, and, count, inArray } from 'drizzle-orm';
import { canAccessAdmin, type Role } from '$lib/config/roles';

export const load: LayoutServerLoad = async ({ locals }) => {
	const authUser = await locals.getUser();

	if (!authUser) {
		throw redirect(303, '/?login=1');
	}

	// Mock data for E2E tests
	if (authUser.id === 'mock-id' && process.env.PLAYWRIGHT_TEST === 'true') {
		return {
			user: {
				id: 'mock-id',
				email: 'test@example.com',
				username: 'mockuser',
				name: 'Mock User',
				role: 'student',
				level: 1,
				xpTotal: 0,
				avatarUrl: null,
				canAccessAdmin: false
			},
			enrollments: [],
			achievements: []
		};
	}

	// Fetch or create user
	let [dbUser] = await db.select().from(users).where(eq(users.id, authUser.id)).limit(1);

	if (!dbUser) {
		await db.insert(users).values({
			id: authUser.id,
			email: authUser.email,
			name: authUser.user_metadata?.full_name || authUser.user_metadata?.name,
			username: authUser.email?.split('@')[0] || authUser.id.slice(0, 8),
			xpTotal: 0,
			level: 1
		});
		[dbUser] = await db.select().from(users).where(eq(users.id, authUser.id));
	}

	const isAdmin = canAccessAdmin(dbUser.role as Role);

	// Fetch enrollments, achievements, and all courses in parallel
	const [userEnrollments, badges, allCoursesResult] = await Promise.all([
		db
			.select({
				enrollment: enrollments,
				course: courses
			})
			.from(enrollments)
			.innerJoin(courses, eq(enrollments.courseId, courses.id))
			.where(eq(enrollments.userId, dbUser.id)),
		db
			.select({
				achievement: achievements
			})
			.from(userAchievements)
			.innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
			.where(eq(userAchievements.userId, dbUser.id)),
		db.select().from(courses)
	]);

	const allCourseIds = allCoursesResult.map(c => c.id);

	// Fetch lesson counts
	let completedCounts: { courseId: string; count: number }[] = [];
	let totalCounts: { courseId: string; count: number }[] = [];

	if (allCourseIds.length > 0) {
		[completedCounts, totalCounts] = await Promise.all([
			db
				.select({
					courseId: lessons.courseId,
					count: count()
				})
				.from(progress)
				.innerJoin(lessons, eq(progress.lessonId, lessons.id))
				.where(and(
					eq(progress.userId, dbUser.id),
					inArray(lessons.courseId, allCourseIds)
				))
				.groupBy(lessons.courseId),
			db
				.select({
					courseId: lessons.courseId,
					count: count()
				})
				.from(lessons)
				.where(inArray(lessons.courseId, allCourseIds))
				.groupBy(lessons.courseId)
		]);
	}

	// Build enrollment data (admins see all courses)
	const coursesToShow = isAdmin ? allCoursesResult : userEnrollments.map(e => e.course);

	const enrollmentData = coursesToShow.map((course) => {
		const enrollment = userEnrollments.find(e => e.course.id === course.id)?.enrollment;
		const completedRaw = completedCounts.find(c => c.courseId === course.id)?.count || 0;
		const totalRaw = totalCounts.find(t => t.courseId === course.id)?.count || 0;
		const completed = typeof completedRaw === 'string' ? parseInt(completedRaw, 10) : Number(completedRaw);
		const total = typeof totalRaw === 'string' ? parseInt(totalRaw, 10) : Number(totalRaw);

		return {
			id: enrollment?.id || `admin-${course.id}`,
			courseId: course.id,
			status: enrollment?.status || 'active',
			enrolledAt: enrollment?.enrolledAt || new Date(),
			course: {
				id: course.id,
				name: course.name,
				slug: course.slug,
				description: course.description,
				image: course.image,
				weeks: course.weeks
			},
			progress: {
				completed,
				total,
				percent: total > 0 ? Math.round((completed / total) * 100) : 0
			}
		};
	});

	return {
		user: {
			id: dbUser.id,
			username: dbUser.username || 'student',
			email: dbUser.email || '',
			name: dbUser.name,
			avatarUrl: dbUser.avatarUrl,
			xpTotal: dbUser.xpTotal || 0,
			level: dbUser.level || 1,
			role: dbUser.role,
			canAccessAdmin: isAdmin
		},
		enrollments: enrollmentData,
		achievements: badges.map(b => ({
			id: b.achievement.id,
			name: b.achievement.name,
			description: b.achievement.description,
			icon: b.achievement.icon,
			xpBonus: b.achievement.xpBonus
		}))
	};
};
