import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { isValidUsername } from '$lib/server/utils';

export const load: PageServerLoad = async ({ parent }) => {
	return await parent();
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const authUser = await locals.getUser();
		if (!authUser) return fail(401, { error: 'Unauthorized' });

		const formData = await request.formData();
		const username = formData.get('username') as string;
		const name = formData.get('name') as string;

		// Validate username
		if (!isValidUsername(username)) {
			return fail(400, {
				error: 'Username must be 3-20 characters, using only letters, numbers, and underscores'
			});
		}

		// Check if username is taken (by another user)
		const existing = await db.select().from(users).where(eq(users.username, username));
		if (existing.length && existing[0].id !== authUser.id) {
			return fail(400, { error: 'Username already taken' });
		}

		// Update user
		await db.update(users).set({
			username,
			name: name || null
		}).where(eq(users.id, authUser.id));

		return { success: true, message: 'Profile updated successfully! ✨' };
	},

	changePassword: async ({ request, locals }) => {
		const authUser = await locals.getUser();
		if (!authUser) return fail(401, { error: 'Unauthorized' });

		const formData = await request.formData();
		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (newPassword !== confirmPassword) {
			return fail(400, { error: 'Passwords do not match' });
		}

		if (newPassword.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters' });
		}

		// Update password in Supabase
		const { error } = await locals.supabase.auth.updateUser({
			password: newPassword
		});

		if (error) {
			return fail(400, { error: error.message });
		}

		return { success: true, message: 'Password changed successfully! 🔐' };
	}
};
