import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users, courses, enrollments } from '$lib/server/db/schema';
import { eq, count, and } from 'drizzle-orm';
import { generatePassword, generateUsername } from '$lib/server/utils';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { hasPermission, type Role } from '$lib/config/roles';
import { sendEmail } from '$lib/server/email/brevo';

async function checkPermission(locals: App.Locals, permission: keyof typeof import('$lib/config/roles').ROLE_PERMISSIONS.student) {
	const user = await locals.getUser();
	if (!user) return null;
	const [dbUser] = await db.select({ role: users.role }).from(users).where(eq(users.id, user.id));
	if (!hasPermission(dbUser?.role as Role, permission)) return null;
	return user;
}

export const load: PageServerLoad = async () => {
	// Layout handles auth - just load data
	// Get all students (role = 'student') with enrollment counts
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
		.where(eq(users.role, 'student'));

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
		const user = await checkPermission(locals, 'canManageStudents');
		if (!user) {
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
			role: 'student'
		});

		// Send welcome email with login credentials
		const emailResult = await sendEmail({
			to: email,
			subject: 'Welcome to code:zero - Your Login Details',
			html: `
				<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
					<div style="text-align: center; margin-bottom: 32px;">
						<h1 style="color: #04A459; margin: 0; font-size: 28px;">code:zero</h1>
						<p style="color: #666; margin-top: 8px;">Build your freedom</p>
					</div>

					<h2 style="color: #1a1d23; margin-bottom: 16px;">Welcome${name ? `, ${name}` : ''}!</h2>

					<p style="color: #444; line-height: 1.6;">Your student account has been created. Here are your login details:</p>

					<div style="background: #f5f5f5; border-radius: 8px; padding: 24px; margin: 24px 0;">
						<p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${email}</p>
						<p style="margin: 0;"><strong>Password:</strong> <code style="background: #e0e0e0; padding: 4px 8px; border-radius: 4px;">${password}</code></p>
					</div>

					<p style="color: #444; line-height: 1.6;">Click the button below to log in and start your learning journey:</p>

					<div style="text-align: center; margin: 32px 0;">
						<a href="https://codezero.my/login" style="display: inline-block; background: #04A459; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">Log In to code:zero</a>
					</div>

					<p style="color: #888; font-size: 14px; margin-top: 32px;">We recommend changing your password after your first login for security.</p>

					<hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

					<p style="color: #888; font-size: 12px; text-align: center;">
						code:zero - AI-First Coding Academy<br>
						Questions? Reply to this email or contact support@codezero.my
					</p>
				</div>
			`,
			tags: ['welcome', 'credentials', 'onboarding']
		});

		return {
			success: true,
			tempPassword: password,
			username,
			emailSent: emailResult.success,
			email
		};
	},

	enroll: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageStudents');
		if (!user) {
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
		const user = await checkPermission(locals, 'canManageStudents');
		if (!user) {
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
