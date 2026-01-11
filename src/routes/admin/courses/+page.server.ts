import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { courses, lessons, enrollments, users } from '$lib/server/db/schema';
import { eq, count, asc } from 'drizzle-orm';
import { hasPermission, type Role } from '$lib/config/roles';
import { syncAllSyllabusCourses, isSyllabusCourse } from '$lib/server/syllabus';

async function checkPermission(locals: App.Locals, permission: keyof typeof import('$lib/config/roles').ROLE_PERMISSIONS.student) {
	const user = await locals.getUser();
	if (!user) return null;
	const [dbUser] = await db.select({ role: users.role }).from(users).where(eq(users.id, user.id));
	if (!hasPermission(dbUser?.role as Role, permission)) return null;
	return user;
}

export const load: PageServerLoad = async () => {
	// Sync syllabus-based courses to database (run in background, don't block)
	syncAllSyllabusCourses().catch(console.error);

	// Layout handles auth - just load data
	// Get all courses with lesson and enrollment counts
	const allCourses = await db.select().from(courses);

	const coursesWithData = await Promise.all(
		allCourses.map(async (course) => {
			// Get lesson count
			const [lessonCount] = await db
				.select({ count: count() })
				.from(lessons)
				.where(eq(lessons.courseId, course.id));

			// Get enrollment count
			const [enrollmentCount] = await db
				.select({ count: count() })
				.from(enrollments)
				.where(eq(enrollments.courseId, course.id));

			// Get all lessons for this course
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

	updateCourse: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageCourses');
		if (!user) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const courseId = formData.get('courseId') as string;
		const name = formData.get('name') as string;
		const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;
		const weeks = parseInt(formData.get('weeks') as string) || 4;
		const status = formData.get('status') as string;

		if (!courseId || !name || !slug) {
			return fail(400, { error: 'Course ID, name, and slug are required' });
		}

		// Check if slug is taken by another course
		const existing = await db.select().from(courses).where(eq(courses.slug, slug));
		if (existing.length && existing[0].id !== courseId) {
			return fail(400, { error: 'A course with this slug already exists' });
		}

		await db
			.update(courses)
			.set({
				name,
				slug,
				description: description || null,
				weeks,
				status: status || 'active'
			})
			.where(eq(courses.id, courseId));

		return { success: true, updated: true };
	}
};
