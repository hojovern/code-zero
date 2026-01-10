import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_EMAILS = ['jv@codezero.my'];

async function isAdmin(session: any): Promise<boolean> {
	if (!session?.user?.email) return false;
	if (ADMIN_EMAILS.includes(session.user.email)) return true;

	try {
		const user = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
		return user[0]?.isAdmin === true;
	} catch {
		return false;
	}
}

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();

	if (!session) {
		throw redirect(303, '/login?callbackUrl=/admin');
	}

	const admin = await isAdmin(session);
	if (!admin) {
		throw redirect(303, '/');
	}

	return {
		user: session.user
	};
};
