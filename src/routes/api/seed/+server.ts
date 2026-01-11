import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { seedAll } from '$lib/server/seed';

const ADMIN_EMAILS = ['hojovern@gmail.com'];

/**
 * POST /api/seed
 * Run database seed (admin only)
 */
export const POST: RequestHandler = async ({ locals }) => {
	const user = await locals.getUser();

	if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	try {
		await seedAll();
		return json({ success: true, message: 'Database seeded successfully' });
	} catch (error) {
		console.error('Seed error:', error);
		return json(
			{ error: error instanceof Error ? error.message : 'Seed failed' },
			{ status: 500 }
		);
	}
};
