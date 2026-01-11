import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { checkScheduledTriggers } from '$lib/server/email/triggers';
import { env } from '$env/dynamic/private';

/**
 * POST /api/email/triggers/check-scheduled
 *
 * Called by n8n daily cron at 9am to check for scheduled email triggers.
 * Creates campaign briefs for intake countdown emails.
 *
 * Security: Requires N8N_WEBHOOK_SECRET header for authentication.
 */
export const POST: RequestHandler = async ({ request }) => {
	// Verify webhook secret
	const authHeader = request.headers.get('x-webhook-secret');
	if (env.N8N_WEBHOOK_SECRET && authHeader !== env.N8N_WEBHOOK_SECRET) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const result = await checkScheduledTriggers();

		return json({
			success: true,
			briefsCreated: result.briefsCreated,
			details: result.details,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error('Error checking scheduled triggers:', error);
		return json({ error: 'Failed to check scheduled triggers' }, { status: 500 });
	}
};
