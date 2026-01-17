import { db } from '$lib/server/db';
import { personas, memories, drafts } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { error, fail } from '@sveltejs/kit';
import { scoutTopics } from '$lib/server/services/scout';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "$env/dynamic/private";
import { runMultiAgentPipeline, trainPersonaFromEdit } from '$lib/server/services/editorial';
import { postToInstagram } from '$lib/server/services/instagram';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");

export const load = async ({ params }) => {
	const persona = await db.query.personas.findFirst({
		where: eq(personas.id, params.id)
	});

	if (!persona) throw error(404, 'Persona not found');

    const allPersonas = await db.query.personas.findMany({
        columns: {
            id: true,
            name: true,
        }
    });

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
        allPersonas,
		topics
	};
};

export const actions = {
	generate: async ({ request, params }) => {
		const formData = await request.formData();
		const prompt = formData.get('prompt') as string;
		const topic = formData.get('topic') as string;
        const editorPersonaId = formData.get('editorPersonaId') as string;

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
				recentMemories.map(m => m.content),
                editorPersonaId
			);

            // Save the draft
            const draftTitle = topic || (prompt.length > 50 ? prompt.substring(0, 50) + "..." : prompt);
            const [newDraft] = await db.insert(drafts).values({
                personaId: persona.id,
                title: draftTitle,
                content: pipelineResult.polished,
                status: 'pending_review'
            }).returning();

			return {
				success: true,
				content: pipelineResult.polished,
				initial: pipelineResult.initial,
				agents: pipelineResult.agents,
                draftId: newDraft.id
			};
		} catch (error) {
			console.error("Pipeline failed:", error);
			return fail(500, { message: 'Generation pipeline failed' });
		}
	},

    learn: async ({ request, params }) => {
        const formData = await request.formData();
        const original = formData.get('original') as string;
        const edited = formData.get('edited') as string;
        const feedback = formData.get('feedback') as string;
        const draftId = formData.get('draftId') as string;

        if (!original && !edited && !feedback) return fail(400, { message: "Missing content or feedback" });

        // Update draft if it exists
        if (draftId && edited) {
            try {
                await db.update(drafts)
                    .set({ 
                        content: edited,
                        updatedAt: new Date()
                    })
                    .where(eq(drafts.id, draftId));
            } catch (e) {
                console.error("Failed to update draft", e);
                // Continue to training even if draft save fails, though ideally we'd warn
            }
        }

        try {
            await trainPersonaFromEdit(params.id, original || "", edited || "", feedback || "");
            return { success: true, learned: true };
        } catch (e) {
            console.error("Learning failed", e);
            return fail(500, { message: "Learning failed" });
        }
    },

    publishToInstagram: async ({ request, params }) => {
        const formData = await request.formData();
        const caption = formData.get('caption') as string;
        const imageUrl = formData.get('imageUrl') as string;

        if (!caption || !imageUrl) return fail(400, { message: "Caption and Image URL are required" });

        const persona = await db.query.personas.findFirst({
            where: eq(personas.id, params.id)
        });

        if (!persona) return fail(404, { message: "Persona not found" });

        const integrations = (persona.integrations as Record<string, any>) || {};
        const instagram = integrations.instagram || {};
        
        // Fallback to env vars if not in DB (for backward compatibility/dev)
        const token = instagram.accessToken || env.INSTAGRAM_ACCESS_TOKEN;
        const userId = instagram.userId || env.INSTAGRAM_USER_ID;

        if (!token || !userId) {
            return fail(500, { message: "Instagram not connected. Please go to Settings." });
        }

        try {
            const id = await postToInstagram(imageUrl, caption, userId, token);
            return { success: true, published: true, platform: 'Instagram', id };
        } catch (e: any) {
            console.error("Publish failed", e);
            return fail(500, { message: e.message || "Publish failed" });
        }
    }
};