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

import { runMultiAgentPipeline } from '$lib/server/services/editorial';

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

		const recentMemories = await db.query.memories.findMany({
			where: eq(memories.personaId, persona.id),
			limit: 5
		});

		try {
			const pipelineResult = await runMultiAgentPipeline(
				persona.id, 
				prompt || `Write a blog post about: ${topic}`,
				recentMemories.map(m => m.content)
			);

			return {
				success: true,
				content: pipelineResult.polished,
				initial: pipelineResult.initial,
				agents: pipelineResult.agents
			};
		} catch (error) {
			console.error("Pipeline failed:", error);
			return fail(500, { message: 'Generation pipeline failed' });
		}
	}
};
