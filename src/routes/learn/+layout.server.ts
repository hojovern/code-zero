import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { enrollments, courses, lessons, progress } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const user = await locals.getUser();

	// Not logged in - redirect to home with login prompt
	if (!user) {
		throw redirect(303, '/?login=true');
	}

	// Get user's enrollments with course details
	const userEnrollments = await db
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
		.where(eq(enrollments.userId, user.id));

	// No enrollments - redirect to dashboard with message
	if (userEnrollments.length === 0) {
		throw redirect(303, '/dashboard?message=not-enrolled');
	}

	// Get all lessons for enrolled courses
	const enrolledCourseIds = userEnrollments.map((e) => e.courseId);
	const allLessons = await db
		.select()
		.from(lessons)
		.where(eq(lessons.courseId, enrolledCourseIds[0])); // For now, use first course

	// Get user's progress
	const userProgress = await db
		.select({ lessonId: progress.lessonId })
		.from(progress)
		.where(eq(progress.userId, user.id));

	const completedLessonIds = new Set(userProgress.map((p) => p.lessonId));

	// Build lesson tree with completion status
	const lessonsByWeek = new Map<number, typeof allLessons>();
	for (const lesson of allLessons) {
		if (!lessonsByWeek.has(lesson.week)) {
			lessonsByWeek.set(lesson.week, []);
		}
		lessonsByWeek.get(lesson.week)!.push({
			...lesson,
			completed: completedLessonIds.has(lesson.id)
		});
	}

	// Sort lessons within each week by day
	for (const [week, weekLessons] of lessonsByWeek) {
		lessonsByWeek.set(
			week,
			weekLessons.sort((a, b) => a.day - b.day)
		);
	}

	// Convert to array sorted by week
	const lessonsTree = Array.from(lessonsByWeek.entries())
		.sort(([a], [b]) => a - b)
		.map(([week, weekLessons]) => ({
			week,
			lessons: weekLessons
		}));

	// Calculate progress percentage
	const totalLessons = allLessons.length;
	const completedLessons = userProgress.length;
	const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

	// Get current lesson from URL
	const pathMatch = url.pathname.match(/\/learn\/week-(\d+)\/day-(\d+)/);
	let currentLesson = null;
	if (pathMatch) {
		const week = parseInt(pathMatch[1]);
		const day = parseInt(pathMatch[2]);
		currentLesson = allLessons.find((l) => l.week === week && l.day === day) || null;
	}

	return {
		user,
		enrollments: userEnrollments,
		currentCourse: userEnrollments[0], // Default to first enrolled course
		lessonsTree,
		totalLessons,
		completedLessons,
		progressPercent,
		currentLesson,
		completedLessonIds: Array.from(completedLessonIds)
	};
};
