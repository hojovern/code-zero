import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { courses, lessons, enrollments, users } from '$lib/server/db/schema';
import { eq, count, asc, inArray } from 'drizzle-orm';
import { hasPermission, type Role } from '$lib/config/roles';
import { isSyllabusCourse } from '$lib/server/syllabus';
import fs from 'fs/promises';
import path from 'path';

async function checkPermission(locals: App.Locals, permission: keyof typeof import('$lib/config/roles').ROLE_PERMISSIONS.student) {
	const user = await locals.getUser();
	if (!user) return null;
	const [dbUser] = await db.select({ role: users.role }).from(users).where(eq(users.id, user.id));
	if (!hasPermission(dbUser?.role as Role, permission)) return null;
	return user;
}

function getFilePath(contentPath: string): string {
	const match = contentPath.match(/week-(\d+)\/day-(\d+)/);
	if (match) {
		return path.join(process.cwd(), 'syllabus', `week-${match[1]}`, `day-${match[2]}.md`);
	}
	const blockMatch = contentPath.match(/ceo-ai-command\/block-(\d+)/);
	if (blockMatch) {
		return path.join(process.cwd(), 'syllabus', 'ceo-ai-command', `block-${blockMatch[1]}.md`);
	}
	return path.join(process.cwd(), 'syllabus', contentPath.replace(/^\//, '') + '.md');
}

export const load: PageServerLoad = async () => {
	try {
		// Fetch all courses and all lessons in just 2 queries
		const allCourses = await db.select().from(courses);
		const courseIds = allCourses.map(c => c.id);

		let allLessons = [];
		let enrollmentCounts = [];

		if (courseIds.length > 0) {
			[allLessons, enrollmentCounts] = await Promise.all([
				db.select().from(lessons).where(inArray(lessons.courseId, courseIds)).orderBy(asc(lessons.week), asc(lessons.day)),
				db.select({ courseId: enrollments.courseId, count: count() }).from(enrollments).where(inArray(enrollments.courseId, courseIds)).groupBy(enrollments.courseId)
			]);
		}

		const coursesWithData = allCourses.map((course) => {
			const courseLessons = allLessons.filter(l => l.courseId === course.id);
			const enrollCount = enrollmentCounts.find(e => e.courseId === course.id)?.count || 0;

			// Group lessons by week for the UI
			const weeksMap = new Map();
			courseLessons.forEach(lesson => {
				if (!weeksMap.has(lesson.week)) {
					weeksMap.set(lesson.week, { week: lesson.week, title: `Week ${lesson.week}`, days: [] });
				}
				weeksMap.get(lesson.week).days.push({
					day: lesson.day,
					title: lesson.title,
					path: lesson.contentPath?.replace(/^\/student-portal\/[^/]+\/[^/]+\//, '') || ''
				});
			});

			return {
				...course,
				lessonCount: courseLessons.length,
				enrollmentCount: enrollCount,
				isSyllabus: isSyllabusCourse(course.slug),
				weeks: Array.from(weeksMap.values()).sort((a, b) => a.week - b.week)
			};
		});

		return {
			courses: coursesWithData
		};
	} catch (error) {
		console.error('Failed to load courses:', error);
		return { courses: [], error: 'Database connection issue' };
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageCourses');
		if (!user) return fail(403, { error: 'Unauthorized' });

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;
		const weeks = parseInt(formData.get('weeks') as string) || 4;

		if (!name || !slug) return fail(400, { error: 'Name and slug are required' });

		const existing = await db.select().from(courses).where(eq(courses.slug, slug));
		if (existing.length) return fail(400, { error: 'A course with this slug already exists' });

		await db.insert(courses).values({ name, slug, description: description || null, weeks, status: 'active' });
		return { success: true, created: true };
	},

	loadContent: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageCourses');
		if (!user) return fail(403, { error: 'Unauthorized' });

		const formData = await request.formData();
		const contentPath = formData.get('contentPath') as string;
		if (!contentPath) return fail(400, { error: 'No content path specified' });

		try {
			const filePath = getFilePath(contentPath);
			const content = await fs.readFile(filePath, 'utf-8');
			return { success: true, content };
		} catch (error) {
			console.error('Error loading content:', error);
			return fail(400, { error: 'Could not load file. File may not exist.' });
		}
	},

	saveContent: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageCourses');
		if (!user) return fail(403, { error: 'Unauthorized' });

		const formData = await request.formData();
		const contentPath = formData.get('contentPath') as string;
		const content = formData.get('content') as string;

		if (!contentPath) return fail(400, { error: 'No content path specified' });

		try {
			const filePath = getFilePath(contentPath);
			const dir = path.dirname(filePath);
			await fs.mkdir(dir, { recursive: true });
			await fs.writeFile(filePath, content, 'utf-8');
			return { success: true, saved: true };
		} catch (error) {
			console.error('Error saving content:', error);
			return fail(500, { error: 'Failed to save content' });
		}
	}
};