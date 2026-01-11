import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, enrollments, courses, progress, lessons, userAchievements, achievements } from '$lib/server/db/schema';
import { eq, and, count } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals }) => {
	const authUser = await locals.getUser();
	if (!authUser) {
		throw redirect(303, '/?login=1');
	}

	// Get user with extended fields
	const [user] = await db.select().from(users).where(eq(users.id, authUser.id));

	if (!user) {
		// User exists in Supabase but not in our DB - create record
		await db.insert(users).values({
			id: authUser.id,
			email: authUser.email,
			name: authUser.user_metadata?.full_name || authUser.user_metadata?.name,
			username: authUser.email?.split('@')[0] || authUser.id.slice(0, 8),
			xpTotal: 0,
			level: 1
		});

		// Fetch the newly created user
		const [newUser] = await db.select().from(users).where(eq(users.id, authUser.id));
		if (!newUser) throw redirect(303, '/?login=1');

		return {
			user: {
				id: newUser.id,
				username: newUser.username || 'student',
				email: newUser.email || '',
				name: newUser.name,
				avatarUrl: newUser.avatarUrl,
				xpTotal: newUser.xpTotal || 0,
				level: newUser.level || 1,
				isAdmin: newUser.isAdmin || false
			},
			enrollments: [],
			achievements: []
		};
	}

	// Get enrollments with course data
	const userEnrollments = await db
		.select({
			enrollment: enrollments,
			course: courses
		})
		.from(enrollments)
		.innerJoin(courses, eq(enrollments.courseId, courses.id))
		.where(eq(enrollments.userId, user.id));

	// Get progress counts per course
	const enrollmentData = await Promise.all(
		userEnrollments.map(async (e) => {
			const [completed] = await db
				.select({ count: count() })
				.from(progress)
				.innerJoin(lessons, eq(progress.lessonId, lessons.id))
				.where(and(
					eq(progress.userId, user.id),
					eq(lessons.courseId, e.course.id)
				));

			const [total] = await db
				.select({ count: count() })
				.from(lessons)
				.where(eq(lessons.courseId, e.course.id));

			return {
				id: e.enrollment.id,
				courseId: e.course.id,
				status: e.enrollment.status,
				enrolledAt: e.enrollment.enrolledAt,
				course: {
					id: e.course.id,
					name: e.course.name,
					slug: e.course.slug,
					description: e.course.description,
					image: e.course.image,
					weeks: e.course.weeks
				},
				progress: {
					completed: completed?.count || 0,
					total: total?.count || 0
				}
			};
		})
	);

	// Get user achievements
	const badges = await db
		.select({
			achievement: achievements
		})
		.from(userAchievements)
		.innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
		.where(eq(userAchievements.userId, user.id));

	return {
		user: {
			id: user.id,
			username: user.username || 'student',
			email: user.email || '',
			name: user.name,
			avatarUrl: user.avatarUrl,
			xpTotal: user.xpTotal || 0,
			level: user.level || 1,
			isAdmin: user.isAdmin || false
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
