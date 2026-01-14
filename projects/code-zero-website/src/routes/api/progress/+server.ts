import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { completeLesson, getUserStats } from '$lib/server/services/xp';

/**
 * POST /api/progress
 * Mark a lesson as complete and award XP
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = await locals.getUser();
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { lessonId } = await request.json();

		if (!lessonId) {
			return json({ error: 'Lesson ID is required' }, { status: 400 });
		}

		const result = await completeLesson(user.id, lessonId);

		return json({
			success: true,
			xpEarned: result.xpEarned,
			newXP: result.newXP,
			newLevel: result.newLevel,
			leveledUp: result.leveledUp,
			newAchievements: result.newAchievements
		});
	} catch (error) {
		console.error('Error completing lesson:', error);
		return json(
			{ error: error instanceof Error ? error.message : 'Failed to complete lesson' },
			{ status: 500 }
		);
	}
};

/**
 * GET /api/progress
 * Get user's progress stats
 */
export const GET: RequestHandler = async ({ locals }) => {
	const user = await locals.getUser();
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const stats = await getUserStats(user.id);

		if (!stats) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		return json(stats);
	} catch (error) {
		console.error('Error getting user stats:', error);
		return json({ error: 'Failed to get stats' }, { status: 500 });
	}
};
