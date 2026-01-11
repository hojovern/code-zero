import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, courses, enrollments } from '$lib/server/db/schema';
import { eq, count, ne, and } from 'drizzle-orm';
import { generatePassword, generateUsername } from '$lib/server/utils';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

const ADMIN_EMAILS = ['hojovern@gmail.com'];

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getUser();
	if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
		throw redirect(303, '/');
	}

	// Get all non-admin students with enrollment counts
	const students = await db
		.select({
			id: users.id,
			username: users.username,
			email: users.email,
			name: users.name,
			level: users.level,
			xpTotal: users.xpTotal,
			createdAt: users.createdAt
		})
		.from(users)
		.where(eq(users.isAdmin, false));

	// Get enrollment counts
	const studentsWithEnrollments = await Promise.all(
		students.map(async (s) => {
			const [result] = await db
				.select({ count: count() })
				.from(enrollments)
				.where(eq(enrollments.userId, s.id));
			return { ...s, enrollmentCount: result?.count || 0 };
		})
	);

	const allCourses = await db.select().from(courses);

	return {
		students: studentsWithEnrollments,
		courses: allCourses
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const user = await locals.getUser();
		if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;

		if (!email) {
			return fail(400, { error: 'Email is required' });
		}

		// Check if user with this email already exists
		const existing = await db.select().from(users).where(eq(users.email, email));
		if (existing.length) {
			return fail(400, { error: 'A student with this email already exists' });
		}

		const username = generateUsername(email);
		const password = generatePassword();

		// Create Supabase admin client
		const supabaseAdmin = createClient(
			publicEnv.PUBLIC_SUPABASE_URL,
			env.SUPABASE_SERVICE_ROLE_KEY,
			{
				auth: {
					autoRefreshToken: false,
					persistSession: false
				}
			}
		);

		// Create Supabase auth user
		const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
			user_metadata: { name, username }
		});

		if (authError) {
			return fail(400, { error: authError.message });
		}

		// Create user in our database
		await db.insert(users).values({
			id: authData.user.id,
			email,
			name: name || null,
			username,
			xpTotal: 0,
			level: 1,
			isAdmin: false
		});

		return { success: true, tempPassword: password, username };
	},

	enroll: async ({ request, locals }) => {
		const user = await locals.getUser();
		if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const userId = formData.get('userId') as string;
		const courseId = formData.get('courseId') as string;

		if (!userId || !courseId) {
			return fail(400, { error: 'Student and course are required' });
		}

		// Check if already enrolled
		const existing = await db
			.select()
			.from(enrollments)
			.where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));

		if (existing.length) {
			return fail(400, { error: 'Student is already enrolled in this course' });
		}

		await db.insert(enrollments).values({
			userId,
			courseId,
			status: 'active'
		});

		return { success: true, enrolled: true };
	},

	delete: async ({ request, locals }) => {
		const user = await locals.getUser();
		if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const userId = formData.get('userId') as string;

		if (!userId) {
			return fail(400, { error: 'Student ID is required' });
		}

		// Create Supabase admin client
		const supabaseAdmin = createClient(
			publicEnv.PUBLIC_SUPABASE_URL,
			env.SUPABASE_SERVICE_ROLE_KEY,
			{
				auth: {
					autoRefreshToken: false,
					persistSession: false
				}
			}
		);

		// Delete from Supabase auth
		const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
		if (authError) {
			return fail(400, { error: authError.message });
		}

		// Delete from our database (cascades to enrollments, progress, achievements)
		await db.delete(users).where(eq(users.id, userId));

		return { success: true, deleted: true };
	}
};
