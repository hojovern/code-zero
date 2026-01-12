import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, enrollments, courses, progress, lessons, userAchievements, achievements } from '$lib/server/db/schema';
import { eq, and, count, inArray } from 'drizzle-orm';
import { canAccessAdmin, type Role } from '$lib/config/roles';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const authUser = await locals.getUser();
	if (!authUser) {
		throw redirect(303, '/?login=1');
	}

	const { username } = params;

	// PHASE 1: Fetch users and all courses in parallel (reduces waterfall)
	const [currentUserResult, profileUserResult, allCoursesResult] = await Promise.all([
		db.select().from(users).where(eq(users.id, authUser.id)).limit(1),
		db.select().from(users).where(eq(users.username, username)).limit(1),
		db.select().from(courses) // Pre-fetch for lesson counts
	]);

	let currentUser = currentUserResult[0];
	if (!currentUser) {
		// User exists in Supabase but not in our DB - create record
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
	const allCourseIds = allCoursesResult.map(c => c.id);

	// PHASE 2: Fetch all remaining data in ONE parallel batch
	const [userEnrollments, badges, completedCounts, totalCounts] = await Promise.all([
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
		// Progress counts - fetch for all courses upfront
		allCourseIds.length > 0
			? db
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
				.groupBy(lessons.courseId)
			: Promise.resolve([]),
		// Total lesson counts - fetch for all courses upfront
		allCourseIds.length > 0
			? db
				.select({
					courseId: lessons.courseId,
					count: count()
				})
				.from(lessons)
				.where(inArray(lessons.courseId, allCourseIds))
				.groupBy(lessons.courseId)
			: Promise.resolve([])
	]);

	// For admins viewing their own profile, show ALL courses
	let effectiveCourses: { enrollment: any; course: any }[] = userEnrollments;
	if (isOwnProfile && isAdmin) {
		effectiveCourses = allCoursesResult.map(course => {
			const existingEnrollment = userEnrollments.find(e => e.course.id === course.id);
			if (existingEnrollment) {
				return existingEnrollment;
			}
			return {
				enrollment: {
					id: `admin-${course.id}`,
					userId: profileUser.id,
					courseId: course.id,
					enrolledAt: new Date(),
					status: 'active'
				},
				course
			};
		});
	}

	const enrollmentData = effectiveCourses.map((e) => {
		const completed = completedCounts.find(c => c.courseId === e.course.id)?.count || 0;
		const total = totalCounts.find(t => t.courseId === e.course.id)?.count || 0;

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
				completed,
				total
			}
		};
	});

	return {
		// The user being viewed
		user: {
			id: profileUser.id,
			username: profileUser.username || 'student',
			email: isOwnProfile ? profileUser.email || '' : '', // Only show email on own profile
			name: profileUser.name,
			avatarUrl: profileUser.avatarUrl,
			xpTotal: profileUser.xpTotal || 0,
			level: profileUser.level || 1,
			role: profileUser.role,
			canAccessAdmin: isOwnProfile && canAccessAdmin(profileUser.role as Role)
		},
		// Current logged-in user info
		currentUser: {
			id: currentUser.id,
			username: currentUser.username || 'student',
			role: currentUser.role,
			isAdmin
		},
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
};