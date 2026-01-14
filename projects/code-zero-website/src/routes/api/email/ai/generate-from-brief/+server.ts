import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateEmailFromBrief, processAllPendingBriefs } from '$lib/server/email/ai-generator';
import { env } from '$env/dynamic/private';

/**
 * POST /api/email/ai/generate-from-brief
 *
 * Generate email content from a campaign brief using Claude AI.
 *
 * Body options:
 * - { briefId: string } - Generate for a specific brief
 * - { processAll: true } - Process all pending briefs
 *
 * Security: Requires either N8N_WEBHOOK_SECRET or admin authentication.
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	// Check authentication - either webhook secret or admin session
	const webhookSecret = request.headers.get('x-webhook-secret');
	const isWebhookAuth = env.N8N_WEBHOOK_SECRET && webhookSecret === env.N8N_WEBHOOK_SECRET;

	if (!isWebhookAuth) {
		const session = await locals.auth();
		if (!session?.user) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const userRole = (session.user as { role?: string }).role;
		if (userRole !== 'super_admin' && userRole !== 'teacher') {
			return json({ error: 'Forbidden' }, { status: 403 });
		}
	}

	try {
		const body = await request.json() as { briefId?: string; processAll?: boolean };

		if (body.processAll) {
			// Process all pending briefs
			const result = await processAllPendingBriefs();

			return json({
				success: true,
				processed: result.processed,
				succeeded: result.succeeded,
				failed: result.failed,
				results: result.results,
				timestamp: new Date().toISOString(),
			});
		} else if (body.briefId) {
			// Process a specific brief
			const result = await generateEmailFromBrief(body.briefId);

			if (result.success) {
				return json({
					success: true,
					campaignId: result.campaignId,
					message: 'Email generated and ready for review',
				});
			} else {
				return json({
					success: false,
					error: result.error,
				}, { status: 400 });
			}
		} else {
			return json({ error: 'Either briefId or processAll is required' }, { status: 400 });
		}
	} catch (error) {
		console.error('Error in AI generation endpoint:', error);
		return json({ error: 'Failed to generate email' }, { status: 500 });
	}
};
