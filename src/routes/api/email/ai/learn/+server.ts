import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { learnFromAnalytics, getCurrentPatterns } from '$lib/server/email/pattern-learner';
import { env } from '$env/dynamic/private';

/**
 * POST /api/email/ai/learn
 *
 * Analyze recent email performance and extract patterns.
 * Called by n8n daily cron at 2am.
 *
 * Security: Requires N8N_WEBHOOK_SECRET header.
 */
export const POST: RequestHandler = async ({ request }) => {
	// Verify webhook secret
	const authHeader = request.headers.get('x-webhook-secret');
	if (env.N8N_WEBHOOK_SECRET && authHeader !== env.N8N_WEBHOOK_SECRET) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const result = await learnFromAnalytics();

		return json({
			success: true,
			campaignsAnalyzed: result.campaignsAnalyzed,
			patternsUpdated: result.patternsUpdated,
			patterns: result.details,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error('Error in learning loop:', error);
		return json({ error: 'Failed to analyze patterns' }, { status: 500 });
	}
};

/**
 * GET /api/email/ai/learn
 *
 * Get current learned patterns.
 * Requires admin authentication.
 */
export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth();
	if (!session?.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userRole = (session.user as { role?: string }).role;
	if (userRole !== 'super_admin' && userRole !== 'teacher') {
		return json({ error: 'Forbidden' }, { status: 403 });
	}

	try {
		const patterns = await getCurrentPatterns();

		return json({
			success: true,
			patterns,
		});
	} catch (error) {
		console.error('Error fetching patterns:', error);
		return json({ error: 'Failed to fetch patterns' }, { status: 500 });
	}
};
