import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { emailCampaigns } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { getCampaignMetrics } from '$lib/server/email/analytics';
import { sendCampaign, scheduleCampaign, updateCampaignStatus } from '$lib/server/email/queue';
import { hasPermission, type Role } from '$lib/config/roles';

export const load: PageServerLoad = async ({ params, parent }) => {
	const parentData = await parent();

	const [campaign] = await db
		.select()
		.from(emailCampaigns)
		.where(eq(emailCampaigns.id, params.id));

	if (!campaign) {
		throw error(404, 'Campaign not found');
	}

	const metrics = await getCampaignMetrics(campaign.id);

	return {
		campaign,
		metrics,
		canSend: hasPermission(parentData.user?.role as Role, 'canSendEmail'),
	};
};

export const actions: Actions = {
	save: async ({ request, params }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const subject = formData.get('subject') as string;
		const previewText = formData.get('previewText') as string;
		const htmlContent = formData.get('htmlContent') as string;
		const textContent = formData.get('textContent') as string;

		if (!name || !subject || !htmlContent) {
			return fail(400, { error: 'Name, subject, and content are required' });
		}

		await db
			.update(emailCampaigns)
			.set({
				name,
				subject,
				previewText,
				htmlContent,
				textContent,
				updatedAt: new Date(),
			})
			.where(eq(emailCampaigns.id, params.id));

		return { success: true, message: 'Campaign saved' };
	},

	schedule: async ({ request, params }) => {
		const formData = await request.formData();
		const scheduledAt = formData.get('scheduledAt') as string;

		if (!scheduledAt) {
			return fail(400, { error: 'Schedule date is required' });
		}

		await scheduleCampaign(params.id, new Date(scheduledAt));

		return { success: true, message: 'Campaign scheduled' };
	},

	send: async ({ params, locals }) => {
		const user = await locals.getUser();
		// Permission check done in load

		const result = await sendCampaign(params.id);

		if (!result.success) {
			return fail(500, { error: 'Failed to send campaign' });
		}

		return {
			success: true,
			message: `Campaign sent to ${result.sent} recipients (${result.failed} failed)`,
		};
	},

	pause: async ({ params }) => {
		await updateCampaignStatus(params.id, 'paused');
		return { success: true, message: 'Campaign paused' };
	},

	resume: async ({ params }) => {
		await updateCampaignStatus(params.id, 'scheduled');
		return { success: true, message: 'Campaign resumed' };
	},
};
