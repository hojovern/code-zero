import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { canAccessAdmin, ROLE_PERMISSIONS, type Role } from '$lib/config/roles';

export const load: LayoutServerLoad = async ({ locals }) => {
	const authUser = await locals.getUser();

	if (!authUser) {
		throw redirect(303, '/?login=1');
	}

	// Get user from our database to check role
	const [dbUser] = await db.select().from(users).where(eq(users.id, authUser.id));

	const role = (dbUser?.role as Role) || 'student';

	// Check if user can access admin
	if (!canAccessAdmin(role)) {
		throw redirect(303, '/portal');
	}

	// Get permissions for this role
	const permissions = ROLE_PERMISSIONS[role];

	return {
		user: {
			id: authUser.id,
			email: authUser.email,
			username: dbUser?.username || authUser.email?.split('@')[0] || authUser.id.slice(0, 8),
			name: dbUser?.name || authUser.user_metadata?.full_name || authUser.user_metadata?.name,
			image: dbUser?.avatarUrl || authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture,
			role,
		},
		permissions,
	};
};
