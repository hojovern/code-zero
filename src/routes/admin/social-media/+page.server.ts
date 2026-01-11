import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getQueuePosts, updatePostStatus } from '$lib/server/queue';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hasPermission, type Role } from '$lib/config/roles';

async function checkPermission(locals: App.Locals, permission: keyof typeof import('$lib/config/roles').ROLE_PERMISSIONS.student) {
	const user = await locals.getUser();
	if (!user) return null;
	const [dbUser] = await db.select({ role: users.role }).from(users).where(eq(users.id, user.id));
	if (!hasPermission(dbUser?.role as Role, permission)) return null;
	return user;
}

export const load: PageServerLoad = async () => {
	// Layout handles auth - just load data
	const posts = await getQueuePosts();

	return {
		posts
	};
};

export const actions: Actions = {
	approve: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageSocialMedia');
		if (!user) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Missing post ID' });
		}

		const success = await updatePostStatus(id, 'approved');
		if (!success) {
			return fail(500, { error: 'Failed to approve post' });
		}

		return { success: true, action: 'approved', id };
	},

	reject: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageSocialMedia');
		if (!user) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Missing post ID' });
		}

		const success = await updatePostStatus(id, 'rejected');
		if (!success) {
			return fail(500, { error: 'Failed to reject post' });
		}

		return { success: true, action: 'rejected', id };
	},

	approveAll: async ({ locals }) => {
		const user = await checkPermission(locals, 'canManageSocialMedia');
		if (!user) {
			return fail(403, { error: 'Unauthorized' });
		}

		const posts = await getQueuePosts();
		const draftPosts = posts.filter(p => p.status === 'draft');
		let approved = 0;

		for (const post of draftPosts) {
			const success = await updatePostStatus(post.id, 'approved');
			if (success) approved++;
		}

		return { success: true, action: 'approvedAll', count: approved };
	}
};
