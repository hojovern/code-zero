import { db } from '$lib/server/db';
import { personas, memories } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';
import { scoutTopics } from '$lib/server/services/scout';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "$env/dynamic/private";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");

export const load = async ({ params }) => {
	const persona = await db.query.personas.findFirst({
		where: eq(personas.id, params.id)
	});

	if (!persona) throw error(404, 'Persona not found');

	const recentMemories = await db.query.memories.findMany({
		where: eq(memories.personaId, persona.id),
		limit: 10,
		orderBy: [desc(memories.createdAt)]
	});

	// Get scouted topics if they don't exist or are old
    // For now, we'll scout them on every load for the demo
	const topics = await scoutTopics(
        persona.id, 
        persona.styleProfile, 
        recentMemories.map(m => m.content)
    );

	return {
		persona,
		topics
	};
};

export const actions = {
	generate: async ({ request, params }) => {
		const formData = await request.formData();
		const prompt = formData.get('prompt') as string;
		const topic = formData.get('topic') as string;

		if (!prompt && !topic) return fail(400, { message: 'Prompt or Topic is required' });

		const persona = await db.query.personas.findFirst({
			where: eq(personas.id, params.id)
		});

		if (!persona) return fail(404, { message: 'Persona not found' });

		const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const systemPrompt = `
            You are Gizmo, an elite content engine. You are currently assuming the following persona:
            NAME: ${persona.name}
            STYLE PROFILE: ${JSON.stringify(persona.styleProfile)}

            TASK: Write a high-quality article or post based on the user's request.
            RULES:
            1. Adhere strictly to the Voice Fingerprint (tone, rhythm, formatting).
            2. NEVER use banned phrases.
            3. Use signature vocabulary and emojis.
            4. Make it indistinguishable from the original source.
        `;

		const result = await model.generateContent([
            systemPrompt,
            `USER REQUEST: ${prompt || 'Write an article about: ' + topic}`
        ]);

		return {
			success: true,
			content: result.response.text()
		};
	}
};
