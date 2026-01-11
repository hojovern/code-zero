import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals }) => {
	const authUser = await locals.getUser();
	if (!authUser) {
		throw redirect(303, '/?login=1');
	}

	// Get user's username for redirects
	const [user] = await db.select({ username: users.username }).from(users).where(eq(users.id, authUser.id));

	return {
		currentUsername: user?.username || authUser.email?.split('@')[0] || authUser.id.slice(0, 8)
	};
};
