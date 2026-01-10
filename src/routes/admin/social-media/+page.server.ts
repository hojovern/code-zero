import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getQueuePosts, updatePostStatus } from '$lib/server/queue';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_EMAILS = ['jv@codezero.my']; // Fallback admin list

async function isAdmin(session: any): Promise<boolean> {
	if (!session?.user?.email) return false;

	// Check fallback admin list first
	if (ADMIN_EMAILS.includes(session.user.email)) return true;

	// Check database isAdmin field
	try {
		const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
		return user[0]?.isAdmin === true;
	} catch {
		return false;
	}
}

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();

	if (!session) {
		throw redirect(303, '/login?callbackUrl=/admin/social-media');
	}

	const admin = await isAdmin(session);
	if (!admin) {
		throw redirect(303, '/');
	}

	const posts = await getQueuePosts();

	return {
		posts,
		user: session.user
	};
};

export const actions: Actions = {
	approve: async ({ request, locals }) => {
		const session = await locals.auth();
		if (!session || !(await isAdmin(session))) {
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
		const session = await locals.auth();
		if (!session || !(await isAdmin(session))) {
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
		const session = await locals.auth();
		if (!session || !(await isAdmin(session))) {
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
