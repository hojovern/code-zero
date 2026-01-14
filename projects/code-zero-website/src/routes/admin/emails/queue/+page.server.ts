import type { PageServerLoad, Actions } from './$types';
import { getEmailQueue, updateCampaignStatus, sendCampaign } from '$lib/server/email/queue';
import { getBriefsForReview } from '$lib/server/email/triggers';
import { db } from '$lib/server/db';
import { emailCampaigns, campaignBriefs } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { hasPermission, type Role } from '$lib/config/roles';

export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();
	const queue = await getEmailQueue();

	// Get AI-generated briefs awaiting review
	const aiReviewBriefs = await getBriefsForReview();

	// Get associated campaigns for the briefs
	const briefsWithCampaigns = await Promise.all(
		aiReviewBriefs.map(async (brief) => {
			let campaign = null;
			if (brief.generatedCampaignId) {
				const [c] = await db
					.select()
					.from(emailCampaigns)
					.where(eq(emailCampaigns.id, brief.generatedCampaignId))
					.limit(1);
				campaign = c;
			}
			return { brief, campaign };
		})
	);

	return {
		queue,
		aiReviewQueue: briefsWithCampaigns,
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

	approveBrief: async ({ request }) => {
		const formData = await request.formData();
		const briefId = formData.get('briefId') as string;

		if (!briefId) {
			return fail(400, { error: 'Brief ID required' });
		}

		// Get the brief
		const [brief] = await db
			.select()
			.from(campaignBriefs)
			.where(eq(campaignBriefs.id, briefId))
			.limit(1);

		if (!brief || !brief.generatedCampaignId) {
			return fail(404, { error: 'Brief or campaign not found' });
		}

		// Update campaign to scheduled
		await updateCampaignStatus(brief.generatedCampaignId, 'scheduled');

		// Update brief to approved
		await db
			.update(campaignBriefs)
			.set({ status: 'approved', updatedAt: new Date() })
			.where(eq(campaignBriefs.id, briefId));

		return { success: true, message: 'Campaign approved and scheduled' };
	},

	rejectBrief: async ({ request }) => {
		const formData = await request.formData();
		const briefId = formData.get('briefId') as string;
		const reason = formData.get('reason') as string;

		if (!briefId) {
			return fail(400, { error: 'Brief ID required' });
		}

		// Get the brief
		const [brief] = await db
			.select()
			.from(campaignBriefs)
			.where(eq(campaignBriefs.id, briefId))
			.limit(1);

		if (!brief) {
			return fail(404, { error: 'Brief not found' });
		}

		// Delete the generated campaign if exists
		if (brief.generatedCampaignId) {
			await db.delete(emailCampaigns).where(eq(emailCampaigns.id, brief.generatedCampaignId));
		}

		// Update brief to rejected with reason
		await db
			.update(campaignBriefs)
			.set({
				status: 'rejected',
				rejectionReason: reason || 'No reason provided',
				generatedCampaignId: null,
				updatedAt: new Date(),
			})
			.where(eq(campaignBriefs.id, briefId));

		return { success: true, message: 'Campaign rejected' };
	},
};
