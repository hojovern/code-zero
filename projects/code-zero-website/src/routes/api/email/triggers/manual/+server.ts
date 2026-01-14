import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createManualBrief, type CampaignType } from '$lib/server/email/triggers';

export interface ManualTriggerRequest {
	campaignType: CampaignType;
	targetSegment: Record<string, unknown>;
	notes?: string;
}

/**
 * POST /api/email/triggers/manual
 *
 * Admin endpoint to manually create a campaign brief.
 * Requires admin authentication.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	// Check authentication
	const session = await locals.auth();
	if (!session?.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	// Check for admin role
	const userRole = (session.user as { role?: string }).role;
	if (userRole !== 'super_admin' && userRole !== 'teacher') {
		return json({ error: 'Forbidden' }, { status: 403 });
	}

	try {
		const body = await request.json() as ManualTriggerRequest;
		const { campaignType, targetSegment, notes } = body;

		if (!campaignType) {
			return json({ error: 'campaignType is required' }, { status: 400 });
		}

		const validCampaignTypes: CampaignType[] = ['intake_promo', 'abandoned_cart', 're_engagement'];
		if (!validCampaignTypes.includes(campaignType)) {
			return json({ error: 'Invalid campaignType' }, { status: 400 });
		}

		const briefId = await createManualBrief({
			campaignType,
			targetSegment: targetSegment || {},
			notes,
		});

		return json({
			success: true,
			briefId,
			message: 'Campaign brief created. It will be processed by the AI generator.',
		});
	} catch (error) {
		console.error('Error creating manual brief:', error);
		return json({ error: 'Failed to create campaign brief' }, { status: 500 });
	}
};
