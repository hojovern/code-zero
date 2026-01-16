import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { enrollments, courses, lessons, progress, users } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { canAccessAdmin, type Role } from '$lib/config/roles';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const authUser = await locals.getUser();

	// Not logged in - redirect to home with login prompt
	if (!authUser) {
		throw redirect(303, '/?login=true');
	}

	// Fetch user role and enrollments in parallel
	const [dbUserRes, userEnrollments] = await Promise.all([
		db.select({ role: users.role }).from(users).where(eq(users.id, authUser.id)).limit(1),
		db
			.select({
				courseId: enrollments.courseId,
				courseName: courses.name,
				courseSlug: courses.slug,
				courseWeeks: courses.weeks,
				enrolledAt: enrollments.enrolledAt,
				status: enrollments.status
			})
			.from(enrollments)
			.innerJoin(courses, eq(enrollments.courseId, courses.id))
			.where(eq(enrollments.userId, authUser.id))
	]);

	const dbUser = dbUserRes[0];
	const isAdmin = canAccessAdmin(dbUser?.role as Role);

	// If admin with no enrollments, get all courses instead
	let effectiveEnrollments = userEnrollments;
	if (isAdmin && userEnrollments.length === 0) {
		const allCourses = await db.select().from(courses);
		effectiveEnrollments = allCourses.map(course => ({
			courseId: course.id,
			courseName: course.name,
			courseSlug: course.slug,
			courseWeeks: course.weeks,
			enrolledAt: new Date(),
			status: 'active'
		}));
	}

	// No enrollments - redirect to dashboard with message
	if (effectiveEnrollments.length === 0) {
		throw redirect(303, `/student-portal/${params.username}?message=not-enrolled`);
	}

	// Get all lessons and progress in parallel
	const enrolledCourseId = effectiveEnrollments[0].courseId;
	const [allLessons, userProgress] = await Promise.all([
		db
			.select()
			.from(lessons)
			.where(eq(lessons.courseId, enrolledCourseId)),
		db
			.select({ lessonId: progress.lessonId })
			.from(progress)
			.where(eq(progress.userId, authUser.id))
	]);

	const completedLessonIds = new Set(userProgress.map((p) => p.lessonId));

	// Build lesson tree with completion status
	const lessonsByWeek = new Map<number, any[]>();
	for (const lesson of allLessons) {
		if (!lessonsByWeek.has(lesson.week)) {
			lessonsByWeek.set(lesson.week, []);
		}
		lessonsByWeek.get(lesson.week)!.push({
			...lesson,
			completed: completedLessonIds.has(lesson.id)
		});
	}

	// Sort lessons within each week by day and prepare tree
	const lessonsTree = Array.from(lessonsByWeek.entries())
		.sort(([a], [b]) => a - b)
		.map(([week, weekLessons]) => ({
			week,
			lessons: weekLessons.sort((a, b) => a.day - b.day)
		}));

	// Calculate progress percentage
	const totalLessons = allLessons.length;
	const completedLessons = Array.from(completedLessonIds).filter(id => 
		allLessons.some(l => l.id === id)
	).length;
	const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

	return {
		user: {
			id: authUser.id,
			email: authUser.email,
			role: dbUser?.role
		},
		enrollments: effectiveEnrollments,
		currentCourse: effectiveEnrollments[0],
		isAdmin,
		lessonsTree,
		totalLessons,
		completedLessons,
		progressPercent,
		completedLessonIds: Array.from(completedLessonIds)
	};
};