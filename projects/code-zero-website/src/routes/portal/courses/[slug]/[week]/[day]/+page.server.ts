import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { lessons, progress, enrollments, courses, users } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { canAccessAdmin, type Role } from '$lib/config/roles';

export const load: PageServerLoad = async ({ locals, params }) => {
	const authUser = await locals.getUser();

	if (!authUser) {
		throw redirect(303, '/?login=1');
	}

	const { slug, week, day } = params;
	const weekNum = parseInt(week, 10);
	const dayNum = parseInt(day, 10);

	if (isNaN(weekNum) || isNaN(dayNum)) {
		throw error(400, 'Invalid week or day');
	}

	// Mock data for E2E tests
	if (authUser.id === 'mock-id' && process.env.PLAYWRIGHT_TEST === 'true') {
		return {
			lesson: {
				id: 'mock-lesson',
				title: 'Build Your Command Center',
				week: weekNum,
				day: dayNum,
				xpReward: 100,
				completed: false
			},
			courseSlug: slug,
			courseName: 'CEO AI Command Center',
			navigation: {
				prev: null,
				next: dayNum < 6 ? { week: weekNum, day: dayNum + 1, title: 'Next Lesson' } : null
			}
		};
	}

	// Fetch user role, course, and lesson in parallel
	const [dbUserRes, courseRes] = await Promise.all([
		db.select({ role: users.role }).from(users).where(eq(users.id, authUser.id)).limit(1),
		db.select().from(courses).where(eq(courses.slug, slug)).limit(1)
	]);

	const dbUser = dbUserRes[0];
	const course = courseRes[0];
	const isAdmin = canAccessAdmin(dbUser?.role as Role);

	if (!course) {
		throw error(404, 'Course not found');
	}

	// Check enrollment (unless admin)
	if (!isAdmin) {
		const [enrollment] = await db
			.select()
			.from(enrollments)
			.where(and(eq(enrollments.userId, authUser.id), eq(enrollments.courseId, course.id)))
			.limit(1);

		if (!enrollment) {
			throw redirect(303, '/portal?error=not-enrolled');
		}
	}

	// Get the specific lesson
	const [lesson] = await db
		.select()
		.from(lessons)
		.where(
			and(
				eq(lessons.courseId, course.id),
				eq(lessons.week, weekNum),
				eq(lessons.day, dayNum)
			)
		)
		.limit(1);

	if (!lesson) {
		throw error(404, 'Lesson not found');
	}

	// Check if completed
	const [completionRecord] = await db
		.select()
		.from(progress)
		.where(and(eq(progress.userId, authUser.id), eq(progress.lessonId, lesson.id)))
		.limit(1);

	// Get all lessons for navigation
	const allLessons = await db
		.select()
		.from(lessons)
		.where(eq(lessons.courseId, course.id));

	// Sort lessons by week then day
	const sortedLessons = allLessons.sort((a, b) => {
		if (a.week !== b.week) return a.week - b.week;
		return a.day - b.day;
	});

	// Find current lesson index
	const currentIndex = sortedLessons.findIndex(l => l.id === lesson.id);

	// Build navigation
	const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
	const nextLesson = currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

	return {
		lesson: {
			id: lesson.id,
			title: lesson.title,
			week: lesson.week,
			day: lesson.day,
			xpReward: lesson.xpReward,
			completed: !!completionRecord
		},
		courseSlug: course.slug,
		courseName: course.name,
		navigation: {
			prev: prevLesson ? { week: prevLesson.week, day: prevLesson.day, title: prevLesson.title } : null,
			next: nextLesson ? { week: nextLesson.week, day: nextLesson.day, title: nextLesson.title } : null
		}
	};
};
