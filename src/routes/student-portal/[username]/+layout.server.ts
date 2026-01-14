import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, enrollments, courses, progress, lessons, userAchievements, achievements } from '$lib/server/db/schema';
import { eq, and, count, inArray } from 'drizzle-orm';
import { canAccessAdmin, type Role } from '$lib/config/roles';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	try {
		const authUser = await locals.getUser();
		if (!authUser) {
			throw redirect(303, '/?login=1');
		}

		const { username } = params;

		// PHASE 1: Fetch users
		let currentUserResult, profileUserResult;
		[currentUserResult, profileUserResult] = await Promise.all([
			db.select().from(users).where(eq(users.id, authUser.id)).limit(1),
			db.select().from(users).where(eq(users.username, username)).limit(1)
		]);

		let currentUser = currentUserResult[0];
		if (!currentUser) {
			await db.insert(users).values({
				id: authUser.id,
				email: authUser.email,
				name: authUser.user_metadata?.full_name || authUser.user_metadata?.name,
				username: authUser.email?.split('@')[0] || authUser.id.slice(0, 8),
				xpTotal: 0,
				level: 1
			});
			[currentUser] = await db.select().from(users).where(eq(users.id, authUser.id));
		}

		const profileUser = profileUserResult[0];
		if (!profileUser) {
			throw error(404, 'User not found');
		}

		const isOwnProfile = currentUser.id === profileUser.id;
		const isAdmin = canAccessAdmin(currentUser.role as Role);

		// PHASE 2: Fetch all remaining data
		const [userEnrollments, badges, allCoursesResult] = await Promise.all([
			db
				.select({
					enrollment: enrollments,
					course: courses
				})
				.from(enrollments)
				.innerJoin(courses, eq(enrollments.courseId, courses.id))
				.where(eq(enrollments.userId, profileUser.id)),
			db
				.select({
					achievement: achievements
				})
				.from(userAchievements)
				.innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
				.where(eq(userAchievements.userId, profileUser.id)),
			db.select().from(courses)
		]);

		const allCourseIds = allCoursesResult.map(c => c.id);

		// PHASE 3: Fetch counts
		let completedCounts = [];
		let totalCounts = [];

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
						eq(progress.userId, profileUser.id),
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

		// Process enrollment data
		const enrollmentData = (isOwnProfile && isAdmin ? allCoursesResult : userEnrollments.map(e => e.course)).map((course) => {
			const enrollment = userEnrollments.find(e => e.course.id === (course as any).id)?.enrollment;

			const completedRaw = completedCounts.find(c => (c.courseId === (course as any).id))?.count || 0;
			const totalRaw = totalCounts.find(t => (t.courseId === (course as any).id))?.count || 0;

			const completed = typeof completedRaw === 'string' ? parseInt(completedRaw, 10) : Number(completedRaw);
			const total = typeof totalRaw === 'string' ? parseInt(totalRaw, 10) : Number(totalRaw);

			return {
				id: enrollment?.id || `admin-${(course as any).id}`,
				courseId: (course as any).id,
				status: enrollment?.status || 'active',
				enrolledAt: enrollment?.enrolledAt || new Date(),
				course: {
					id: (course as any).id,
					name: (course as any).name,
					slug: (course as any).slug,
					description: (course as any).description,
					image: (course as any).image,
					weeks: (course as any).weeks
				},
				progress: {
					completed,
					total
				}
			};
		});

		// Current logged-in user info
		const safeCurrentUser = {
			id: currentUser.id,
			username: currentUser.username || 'student',
			role: currentUser.role,
			isAdmin
		};

		return {
			user: {
				id: profileUser.id,
				username: profileUser.username || 'student',
				email: isOwnProfile ? profileUser.email || '' : '',
				name: profileUser.name,
				avatarUrl: profileUser.avatarUrl,
				xpTotal: profileUser.xpTotal || 0,
				level: profileUser.level || 1,
				role: profileUser.role,
				canAccessAdmin: isOwnProfile && canAccessAdmin(profileUser.role as Role)
			},
			currentUser: safeCurrentUser,
			isOwnProfile,
			enrollments: enrollmentData,
			achievements: badges.map(b => ({
				id: b.achievement.id,
				name: b.achievement.name,
				description: b.achievement.description,
				icon: b.achievement.icon,
				xpBonus: b.achievement.xpBonus
			}))
		};
	} catch (err) {
		console.error('FATAL ERROR IN STUDENT PORTAL LOAD:', err);

		// If it's a SvelteKit error (redirect or handled error), rethrow it
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}

		// Otherwise, show the actual error message in the 500 for easier debugging
		throw error(500, {
			message: err instanceof Error ? err.message : 'Internal Server Error in Student Portal',
			stack: process.env.NODE_ENV === 'development' ? (err instanceof Error ? err.stack : undefined) : undefined
		});
	}
};
