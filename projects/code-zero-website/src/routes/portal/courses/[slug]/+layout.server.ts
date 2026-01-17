import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { enrollments, courses, lessons, progress, users } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { canAccessAdmin, type Role } from '$lib/config/roles';

export const load: LayoutServerLoad = async ({ locals, params, parent }) => {
	const authUser = await locals.getUser();

	if (!authUser) {
		throw redirect(303, '/?login=1');
	}

	const { slug } = params;

	// Mock data for E2E tests
	if (authUser.id === 'mock-id' && process.env.PLAYWRIGHT_TEST === 'true') {
		return {
			course: {
				id: 'mock-course',
				name: 'CEO AI Command Center',
				slug: 'ceo-ai-command',
				weeks: 1,
				description: 'Learn AI-powered business management'
			},
			lessonsTree: [
				{
					week: 1,
					lessons: [
						{ id: '1', week: 1, day: 1, title: 'Build Your Command Center', xpReward: 100, completed: false },
						{ id: '2', week: 1, day: 2, title: 'Deploy Your Agent Fleet', xpReward: 100, completed: false }
					]
				}
			],
			progress: {
				completed: 0,
				total: 2,
				percent: 0
			},
			isAdmin: false
		};
	}

	// Fetch user role and course in parallel
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

	// Check enrollment
	const [enrollment] = await db
		.select()
		.from(enrollments)
		.where(and(eq(enrollments.userId, authUser.id), eq(enrollments.courseId, course.id)))
		.limit(1);

	if (!enrollment && !isAdmin) {
		throw redirect(303, '/portal?error=not-enrolled');
	}

	// Fetch lessons and user progress in parallel
	const [allLessons, userProgress] = await Promise.all([
		db.select().from(lessons).where(eq(lessons.courseId, course.id)),
		db.select({ lessonId: progress.lessonId }).from(progress).where(eq(progress.userId, authUser.id))
	]);

	const completedLessonIds = new Set(userProgress.map(p => p.lessonId));

	// Build lessons tree grouped by week
	const lessonsByWeek = new Map<number, any[]>();

	for (const lesson of allLessons) {
		if (!lessonsByWeek.has(lesson.week)) {
			lessonsByWeek.set(lesson.week, []);
		}
		lessonsByWeek.get(lesson.week)!.push({
			id: lesson.id,
			week: lesson.week,
			day: lesson.day,
			title: lesson.title,
			xpReward: lesson.xpReward,
			completed: completedLessonIds.has(lesson.id)
		});
	}

	// Sort by week and day
	const lessonsTree = Array.from(lessonsByWeek.entries())
		.sort(([a], [b]) => a - b)
		.map(([week, weekLessons]) => ({
			week,
			lessons: weekLessons.sort((a, b) => a.day - b.day)
		}));

	// Calculate progress
	const totalLessons = allLessons.length;
	const completedLessons = allLessons.filter(l => completedLessonIds.has(l.id)).length;
	const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

	return {
		course: {
			id: course.id,
			name: course.name,
			slug: course.slug,
			weeks: course.weeks,
			description: course.description
		},
		lessonsTree,
		progress: {
			completed: completedLessons,
			total: totalLessons,
			percent: progressPercent
		},
		isAdmin
	};
};
