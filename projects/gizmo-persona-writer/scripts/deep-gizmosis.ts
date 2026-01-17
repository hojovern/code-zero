import 'dotenv/config';
import { crawlWebsite, getEmbeddings } from '../src/lib/server/services/ai';
import { analyzeVoice } from '../src/lib/server/services/voice';
import { db } from '../src/lib/server/db';
import { personas, documents, memories } from '../src/lib/server/db/schema';
import { eq } from 'drizzle-orm';
import minimist from 'minimist';

async function deepGizmosis() {
    const args = minimist(process.argv.slice(2));
    const name = args.name;
    const url = args.url;

    if (!name || !url) {
        console.error("Usage: npx tsx scripts/deep-gizmosis.ts --name 'Persona Name' --url 'https://site.com'");
        process.exit(1);
    }

    try {
        console.log(`🚀 Starting Deep Gizmosis for: ${name} (${url})`);

        // 1. Create or get Persona
        let persona = await db.query.personas.findFirst({ where: eq(personas.name, name) });
        
        if (!persona) {
            [persona] = await db.insert(personas).values({
                name,
                baseUrl: url,
            }).returning();
        }

        // 2. Deep Crawl
        const pages = await crawlWebsite(url, 200); // Ingest up to 200 pages for full blog history
        let allContent = "";

        for (const page of pages) {
            console.log(`📄 Ingesting: ${page.title}`);
            allContent += page.content + "\n\n";

            const [doc] = await db.insert(documents).values({
                personaId: persona!.id,
                url: page.url,
                title: page.title,
                content: page.content,
            }).returning();

            // Simple chunking logic for larger documents
            const chunks = page.content.match(/[^.!?]+[.!?]+/g) || [page.content];
            // Batch process in smaller groups if needed, for now 1 by 1
            for (const chunk of chunks) {
                if (chunk.length < 50) continue; // Skip tiny chunks
                try {
                    const embedding = await getEmbeddings(chunk);
                    await db.insert(memories).values({
                        personaId: persona!.id,
                        documentId: doc.id,
                        content: chunk.trim(),
                        embedding: embedding,
                    });
                } catch (e) {
                    console.error("Embedding failed for chunk, skipping...");
                }
            }
        }

        // 3. Update Voice Profile
        console.log("🧠 Finalizing Voice Fingerprint...");
        const voiceProfile = await analyzeVoice(allContent);
        await db.update(personas)
            .set({ styleProfile: voiceProfile })
            .where(eq(personas.id, persona!.id));

        console.log(`✅ Deep Gizmosis complete for ${name}!`);
    } catch (error) {
        console.error("❌ Deep Gizmosis failed:", error);
    } finally {
        process.exit(0);
    }
}

deepGizmosis();
