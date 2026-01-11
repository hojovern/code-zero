import type { PageServerLoad, Actions } from './$types';
import { getEmailQueue, updateCampaignStatus, sendCampaign } from '$lib/server/email/queue';
import { db } from '$lib/server/db';
import { emailCampaigns } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { hasPermission, type Role } from '$lib/config/roles';

export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();
	const queue = await getEmailQueue();

	return {
		queue,
		canSend: hasPermission(parentData.user?.role as Role, 'canSendEmail'),
	};
};

export const actions: Actions = {
	approve: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Campaign ID required' });
		}

		await updateCampaignStatus(id, 'review');
		return { success: true, message: 'Campaign approved for review' };
	},

	reject: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Campaign ID required' });
		}

		await db.delete(emailCampaigns).where(eq(emailCampaigns.id, id));
		return { success: true, message: 'Campaign deleted' };
	},

	send: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Campaign ID required' });
		}

		const result = await sendCampaign(id);

		if (!result.success) {
			return fail(500, { error: 'Failed to send campaign' });
		}

		return {
			success: true,
			message: `Campaign sent to ${result.sent} recipients`,
		};
	},

	pause: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Campaign ID required' });
		}

		await updateCampaignStatus(id, 'paused');
		return { success: true, message: 'Campaign paused' };
	},

	resume: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Campaign ID required' });
		}

		await updateCampaignStatus(id, 'scheduled');
		return { success: true, message: 'Campaign resumed' };
	},
};
