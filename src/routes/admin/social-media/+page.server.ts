import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getQueuePosts, updatePostStatus } from '$lib/server/queue';

const ADMIN_EMAILS = ['hojovern@gmail.com'];

async function checkAdmin(locals: App.Locals) {
	const user = await locals.getUser();
	if (!user) return null;
	if (!ADMIN_EMAILS.includes(user.email || '')) return null;
	return user;
}

export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getUser();

	if (!user) {
		throw redirect(303, '/?login=1');
	}

	const isAdmin = ADMIN_EMAILS.includes(user.email || '');
	if (!isAdmin) {
		throw redirect(303, '/');
	}

	const posts = await getQueuePosts();

	return {
		posts,
		user: {
			id: user.id,
			email: user.email,
			name: user.user_metadata?.full_name || user.user_metadata?.name,
			image: user.user_metadata?.avatar_url || user.user_metadata?.picture
		}
	};
};

export const actions: Actions = {
	approve: async ({ request, locals }) => {
		const user = await checkAdmin(locals);
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
		const user = await checkAdmin(locals);
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
		const user = await checkAdmin(locals);
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
