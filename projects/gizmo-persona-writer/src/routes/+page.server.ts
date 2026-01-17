import { fail } from '@sveltejs/kit';
import { crawlWebsite, getEmbeddings } from '$lib/server/services/ai';
import { analyzeVoice } from '$lib/server/services/voice';
import { db } from '$lib/server/db';
import { personas, documents, memories, schedules, drafts } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load = async () => {
	const allPersonas = await db.query.personas.findMany({
		with: {
			schedules: true,
			drafts: {
				limit: 5,
				orderBy: [desc(drafts.createdAt)]
			}
		},
		orderBy: [desc(personas.createdAt)]
	});

	return {
		personas: allPersonas
	};
};

export const actions = {
	gizmosis: async ({ request }) => {
		const formData = await request.formData();
		const url = formData.get('url') as string;

		if (!url) {
			return fail(400, { message: 'URL is required' });
		}

		try {
			// 1. Create or get Persona
			const [persona] = await db.insert(personas).values({
				name: new URL(url).hostname,
				baseUrl: url,
			}).returning();

			// 2. Crawl website
			const pages = await crawlWebsite(url);
			let allContent = "";

			for (const page of pages) {
				allContent += page.content + "\n\n";
				// 3. Save document
				const [doc] = await db.insert(documents).values({
					personaId: persona.id,
					url: page.url,
					title: page.title,
					content: page.content,
				}).returning();

				// 4. Generate embeddings and save to memory
				const embedding = await getEmbeddings(page.content);
				
				await db.insert(memories).values({
					personaId: persona.id,
					documentId: doc.id,
					content: page.content,
					embedding: embedding,
				});
			}

			// 5. Analyze Voice Fingerprint
			const voiceProfile = await analyzeVoice(allContent);
			await db.update(personas)
				.set({ styleProfile: voiceProfile })
				.where(eq(personas.id, persona.id));

			return { success: true, personaId: persona.id };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Gizmosis failed' });
		}
	},

	createSchedule: async ({ request }) => {
		const formData = await request.formData();
		const personaId = formData.get('personaId') as string;
		const frequency = formData.get('frequency') as string;
		const channel = formData.get('channel') as string;

		if (!personaId || !frequency || !channel) {
			return fail(400, { message: 'All fields are required' });
		}

		await db.insert(schedules).values({
			personaId,
			frequency,
			targetChannel: channel,
			nextRunAt: new Date() // Run immediately
		});

		return { success: true };
	}
};
