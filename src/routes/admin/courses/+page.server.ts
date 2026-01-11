import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { courses, lessons, enrollments, users } from '$lib/server/db/schema';
import { eq, count, asc } from 'drizzle-orm';
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

// Convert contentPath to actual file path
function getFilePath(contentPath: string): string {
	// contentPath is like "/student-portal/week-1/day-1"
	// actual file is at "syllabus/week-1/day-1.md"
	const match = contentPath.match(/week-(\d+)\/day-(\d+)/);
	if (match) {
		return path.join(process.cwd(), 'syllabus', `week-${match[1]}`, `day-${match[2]}.md`);
	}
	// For CEO AI Command: "/enterprise/ceo-ai-command/block-1"
	const blockMatch = contentPath.match(/ceo-ai-command\/block-(\d+)/);
	if (blockMatch) {
		return path.join(process.cwd(), 'syllabus', 'ceo-ai-command', `block-${blockMatch[1]}.md`);
	}
	// Fallback: try direct path
	return path.join(process.cwd(), 'syllabus', contentPath.replace(/^\//, '') + '.md');
}

export const load: PageServerLoad = async () => {
	const allCourses = await db.select().from(courses);

	const coursesWithData = await Promise.all(
		allCourses.map(async (course) => {
			const [lessonCount] = await db
				.select({ count: count() })
				.from(lessons)
				.where(eq(lessons.courseId, course.id));

			const [enrollmentCount] = await db
				.select({ count: count() })
				.from(enrollments)
				.where(eq(enrollments.courseId, course.id));

			const courseLessons = await db
				.select()
				.from(lessons)
				.where(eq(lessons.courseId, course.id))
				.orderBy(asc(lessons.week), asc(lessons.day));

			return {
				...course,
				lessonCount: lessonCount?.count || 0,
				enrollmentCount: enrollmentCount?.count || 0,
				isSyllabus: isSyllabusCourse(course.slug),
				lessons: courseLessons
			};
		})
	);

	return {
		courses: coursesWithData
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageCourses');
		if (!user) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;
		const weeks = parseInt(formData.get('weeks') as string) || 4;

		if (!name || !slug) {
			return fail(400, { error: 'Name and slug are required' });
		}

		const existing = await db.select().from(courses).where(eq(courses.slug, slug));
		if (existing.length) {
			return fail(400, { error: 'A course with this slug already exists' });
		}

		await db.insert(courses).values({
			name,
			slug,
			description: description || null,
			weeks,
			status: 'active'
		});

		return { success: true, created: true };
	},

	loadContent: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageCourses');
		if (!user) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const contentPath = formData.get('contentPath') as string;

		if (!contentPath) {
			return fail(400, { error: 'No content path specified' });
		}

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
		if (!user) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const contentPath = formData.get('contentPath') as string;
		const content = formData.get('content') as string;

		if (!contentPath) {
			return fail(400, { error: 'No content path specified' });
		}

		try {
			const filePath = getFilePath(contentPath);

			// Ensure directory exists
			const dir = path.dirname(filePath);
			await fs.mkdir(dir, { recursive: true });

			// Write content
			await fs.writeFile(filePath, content, 'utf-8');

			return { success: true, saved: true };
		} catch (error) {
			console.error('Error saving content:', error);
			return fail(500, { error: 'Failed to save content' });
		}
	}
};
