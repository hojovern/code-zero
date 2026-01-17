import { db } from '$lib/server/db';
import { personas } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const persona = await db.query.personas.findFirst({
		where: eq(personas.id, params.id)
	});

	if (!persona) throw error(404, 'Persona not found');

	return {
		persona
	};
};

export const actions = {
    updateInstagram: async ({ request, params }) => {
        const formData = await request.formData();
        const accessToken = formData.get('accessToken') as string;
        const userId = formData.get('userId') as string;

        const persona = await db.query.personas.findFirst({
            where: eq(personas.id, params.id)
        });

        if (!persona) return fail(404, { message: "Persona not found" });

        // Merge with existing integrations
        const currentIntegrations = (persona.integrations as Record<string, any>) || {};
        const newIntegrations = {
            ...currentIntegrations,
            instagram: {
                accessToken,
                userId
            }
        };

        await db.update(personas)
            .set({ integrations: newIntegrations, updatedAt: new Date() })
            .where(eq(personas.id, params.id));

        return { success: true };
    }
};
