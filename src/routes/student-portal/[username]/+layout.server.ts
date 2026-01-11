import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, enrollments, courses, progress, lessons, userAchievements, achievements } from '$lib/server/db/schema';
import { eq, and, count } from 'drizzle-orm';
import { canAccessAdmin, type Role } from '$lib/config/roles';
import { syncAllSyllabusCourses } from '$lib/server/syllabus';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const authUser = await locals.getUser();
	if (!authUser) {
		throw redirect(303, '/?login=1');
	}

	const { username } = params;

	// Get current logged-in user
	let [currentUser] = await db.select().from(users).where(eq(users.id, authUser.id));

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

	// Get profile user (the user being viewed)
	const [profileUser] = await db.select().from(users).where(eq(users.username, username));

	if (!profileUser) {
		throw error(404, 'User not found');
	}

	const isOwnProfile = currentUser.id === profileUser.id;
	const isAdmin = canAccessAdmin(currentUser.role as Role);

	// Sync syllabus courses to database
	await syncAllSyllabusCourses();

	// Get enrollments for the profile user
	const userEnrollments = await db
		.select({
			enrollment: enrollments,
			course: courses
		})
		.from(enrollments)
		.innerJoin(courses, eq(enrollments.courseId, courses.id))
		.where(eq(enrollments.userId, profileUser.id));

	// For admins viewing their own profile, show ALL courses
	let effectiveCourses: typeof userEnrollments = userEnrollments;
	if (isOwnProfile && isAdmin) {
		const allCourses = await db.select().from(courses);
		effectiveCourses = allCourses.map(course => {
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

	// Get progress counts per course
	const enrollmentData = await Promise.all(
		effectiveCourses.map(async (e) => {
			const [completed] = await db
				.select({ count: count() })
				.from(progress)
				.innerJoin(lessons, eq(progress.lessonId, lessons.id))
				.where(and(
					eq(progress.userId, profileUser.id),
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

	// Get profile user achievements
	const badges = await db
		.select({
			achievement: achievements
		})
		.from(userAchievements)
		.innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
		.where(eq(userAchievements.userId, profileUser.id));

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
			canAccessAdmin: isOwnProfile && canAccessAdmin(profileUser.role as Role)
		},
		// Current logged-in user info
		currentUser: {
			id: currentUser.id,
			username: currentUser.username || 'student',
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
