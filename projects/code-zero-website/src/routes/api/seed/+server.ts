import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { seedAll } from '$lib/server/seed';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hasPermission, type Role } from '$lib/config/roles';

/**
 * POST /api/seed
 * Run database seed (super admin only)
 */
export const POST: RequestHandler = async ({ locals }) => {
	const user = await locals.getUser();
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 403 });
	}

	const [dbUser] = await db.select({ role: users.role }).from(users).where(eq(users.id, user.id));
	if (!hasPermission(dbUser?.role as Role, 'canSeedDatabase')) {
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
