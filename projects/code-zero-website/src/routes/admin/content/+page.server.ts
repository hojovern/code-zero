import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getAllContent, getContentStats } from '$lib/server/content';
import { updatePostStatus } from '$lib/server/queue';
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

export const load: PageServerLoad = async ({ url }) => {
	// Layout handles auth - just load data
	// Get filter params
	const typeFilter = url.searchParams.get('type') || 'all';
	const statusFilter = url.searchParams.get('status') || 'all';

	const [allContent, stats] = await Promise.all([
		getAllContent(),
		getContentStats()
	]);

	// Apply filters
	let content = allContent;
	if (typeFilter !== 'all') {
		content = content.filter(c => c.type === typeFilter);
	}
	if (statusFilter !== 'all') {
		content = content.filter(c => c.status === statusFilter);
	}

	return {
		content,
		stats,
		filters: {
			type: typeFilter,
			status: statusFilter
		}
	};
};

export const actions: Actions = {
	approve: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageContent');
		if (!user) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const id = formData.get('id') as string;
		const type = formData.get('type') as string;

		if (!id) {
			return fail(400, { error: 'Missing content ID' });
		}

		// Handle social post approval
		if (type === 'social') {
			const postId = id.replace('social-', '');
			const success = await updatePostStatus(postId, 'approved');
			if (!success) {
				return fail(500, { error: 'Failed to approve content' });
			}
		}

		// For blog/lessons, we'd update the frontmatter - future enhancement

		return { success: true, action: 'approved', id };
	},

	setStatus: async ({ request, locals }) => {
		const user = await checkPermission(locals, 'canManageContent');
		if (!user) {
			return fail(403, { error: 'Unauthorized' });
		}

		const formData = await request.formData();
		const id = formData.get('id') as string;
		const type = formData.get('type') as string;
		const status = formData.get('status') as string;

		if (!id || !status) {
			return fail(400, { error: 'Missing required fields' });
		}

		// Handle social post status change
		if (type === 'social') {
			const postId = id.replace('social-', '');
			const mappedStatus = status === 'draft' ? 'draft' : status === 'approved' ? 'approved' : 'draft';
			const success = await updatePostStatus(postId, mappedStatus as 'draft' | 'approved' | 'rejected');
			if (!success) {
				return fail(500, { error: 'Failed to update status' });
			}
		}

		return { success: true, action: 'statusChanged', id, status };
	}
};
