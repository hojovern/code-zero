import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { checkEventTriggers } from '$lib/server/email/triggers';
import { env } from '$env/dynamic/private';

/**
 * POST /api/email/triggers/check-events
 *
 * Called by n8n hourly to check for event-based email triggers.
 * Creates campaign briefs for:
 * - Abandoned cart (pricing view without application)
 * - Re-engagement (inactive students)
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
		const result = await checkEventTriggers();

		return json({
			success: true,
			briefsCreated: result.briefsCreated,
			details: result.details,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error('Error checking event triggers:', error);
		return json({ error: 'Failed to check event triggers' }, { status: 500 });
	}
};
