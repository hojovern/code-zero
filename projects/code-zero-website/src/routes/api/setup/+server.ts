import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_EMAIL = 'hojovern@gmail.com';

/**
 * POST /api/setup
 * One-time setup to create admin user
 *
 * Body: { password: string }
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { password } = await request.json();

		if (!password || password.length < 8) {
			return json({ error: 'Password must be at least 8 characters' }, { status: 400 });
		}

		// Check if admin already exists in our DB
		const [existingUser] = await db.select().from(users).where(eq(users.email, ADMIN_EMAIL));
		if (existingUser) {
			return json({ error: 'Admin user already exists. Login with your credentials.' }, { status: 400 });
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

		// Create Supabase auth user
		const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
			email: ADMIN_EMAIL,
			password,
			email_confirm: true,
			user_metadata: { name: 'Admin', username: 'admin' }
		});

		if (authError) {
			// User might exist in Supabase but not in our DB
			if (authError.message.includes('already been registered')) {
				return json({
					error: 'User exists in Supabase. Try logging in, or delete from Supabase dashboard first.'
				}, { status: 400 });
			}
			return json({ error: authError.message }, { status: 400 });
		}

		// Create user in our database as super_admin
		await db.insert(users).values({
			id: authData.user.id,
			email: ADMIN_EMAIL,
			name: 'Admin',
			username: 'admin',
			xpTotal: 0,
			level: 1,
			role: 'super_admin'
		});

		return json({
			success: true,
			message: 'Admin user created! You can now login with your email and password.'
		});
	} catch (error) {
		console.error('Setup error:', error);
		return json(
			{ error: error instanceof Error ? error.message : 'Setup failed' },
			{ status: 500 }
		);
	}
};
