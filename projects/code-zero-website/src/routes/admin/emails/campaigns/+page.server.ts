import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { emailCampaigns } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import { getCampaignMetrics } from '$lib/server/email/analytics';

export const load: PageServerLoad = async () => {
	const campaigns = await db
		.select()
		.from(emailCampaigns)
		.orderBy(desc(emailCampaigns.createdAt));

	// Get metrics for each campaign
	const campaignsWithMetrics = await Promise.all(
		campaigns.map(async (campaign) => {
			const metrics = await getCampaignMetrics(campaign.id);
			return {
				...campaign,
				metrics,
			};
		})
	);

	return {
		campaigns: campaignsWithMetrics,
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Campaign ID required' });
		}

		await db.delete(emailCampaigns).where(eq(emailCampaigns.id, id));

		return { success: true };
	},

	duplicate: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!id) {
			return fail(400, { error: 'Campaign ID required' });
		}

		const [campaign] = await db
			.select()
			.from(emailCampaigns)
			.where(eq(emailCampaigns.id, id));

		if (!campaign) {
			return fail(404, { error: 'Campaign not found' });
		}

		await db.insert(emailCampaigns).values({
			name: `${campaign.name} (Copy)`,
			subject: campaign.subject,
			previewText: campaign.previewText,
			templateId: campaign.templateId,
			htmlContent: campaign.htmlContent,
			textContent: campaign.textContent,
			status: 'draft',
			segmentRules: campaign.segmentRules,
		});

		return { success: true };
	},
};
