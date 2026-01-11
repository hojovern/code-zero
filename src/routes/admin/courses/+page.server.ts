import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { courses, lessons, enrollments } from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';

const ADMIN_EMAILS = ['hojovern@gmail.com'];

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getUser();
	if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
		throw redirect(303, '/');
	}

	// Get all courses with lesson and enrollment counts
	const allCourses = await db.select().from(courses);

	const coursesWithCounts = await Promise.all(
		allCourses.map(async (course) => {
			const [lessonCount] = await db
				.select({ count: count() })
				.from(lessons)
				.where(eq(lessons.courseId, course.id));

			const [enrollmentCount] = await db
				.select({ count: count() })
				.from(enrollments)
				.where(eq(enrollments.courseId, course.id));

			return {
				...course,
				lessonCount: lessonCount?.count || 0,
				enrollmentCount: enrollmentCount?.count || 0
			};
		})
	);

	return {
		courses: coursesWithCounts
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const user = await locals.getUser();
		if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
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

		// Check if slug exists
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

	addLesson: async ({ request, locals }) => {
		const user = await locals.getUser();
		if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const courseId = formData.get('courseId') as string;
		const week = parseInt(formData.get('week') as string);
		const day = parseInt(formData.get('day') as string);
		const title = formData.get('title') as string;
		const contentPath = formData.get('contentPath') as string;

		if (!courseId || !week || !day || !title) {
			return fail(400, { error: 'All fields are required' });
		}

		// Get order number
		const [lastLesson] = await db
			.select({ order: lessons.order })
			.from(lessons)
			.where(eq(lessons.courseId, courseId))
			.orderBy(lessons.order);

		const order = (lastLesson?.order || 0) + 1;

		await db.insert(lessons).values({
			courseId,
			week,
			day,
			title,
			contentPath: contentPath || null,
			order,
			xpReward: 100
		});

		return { success: true, lessonAdded: true };
	},

	delete: async ({ request, locals }) => {
		const user = await locals.getUser();
		if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const courseId = formData.get('courseId') as string;

		if (!courseId) {
			return fail(400, { error: 'Course ID is required' });
		}

		await db.delete(courses).where(eq(courses.id, courseId));

		return { success: true, deleted: true };
	}
};
