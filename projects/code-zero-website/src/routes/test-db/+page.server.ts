import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';

export const load = async () => {
    try {
        const testUser = await db.select().from(users).limit(1);
        return { success: true, count: testUser.length };
    } catch (e) {
        console.error('DB Test Error:', e);
        throw error(500, `DB Connection Failed: ${e.message}`);
    }
};
