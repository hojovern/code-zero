import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as cheerio from 'cheerio';

const dbUrl = process.env.DATABASE_URL || "";
const apiKey = process.env.GEMINI_API_KEY || "";

const client = postgres(dbUrl, { prepare: false });
const db = drizzle(client, { schema });
const genAI = new GoogleGenerativeAI(apiKey);

async function getEmbeddings(text: string) {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
}

async function ingestLessons() {
    console.log("🚀 Starting Deep Lesson Ingestion for: Dex");

    const persona = await db.query.personas.findFirst({ where: eq(schema.personas.name, 'Dex') });
    if (!persona) {
        console.error("Dex persona not found. Please seed it first.");
        process.exit(1);
    }

    const lessonUrls = [
        "https://www.codedex.io/python/01-setting-up",
        "https://www.codedex.io/python/02-hello-world",
        "https://www.codedex.io/python/03-pattern",
        "https://www.codedex.io/python/04-initials",
        "https://www.codedex.io/python/05-snail-mail",
        "https://www.codedex.io/html/01-shooting-star",
        "https://www.codedex.io/html/02-elemental",
        "https://www.codedex.io/html/03-newspaper",
        "https://www.codedex.io/css/01-picasso",
        "https://www.codedex.io/css/02-syntax",
        "https://www.codedex.io/javascript/01-setting-up",
        "https://www.codedex.io/javascript/02-the-console"
    ];

    for (const url of lessonUrls) {
        try {
            console.log(`📡 Fetching Lesson: ${url}`);
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            const html = await response.text();
            const $ = cheerio.load(html);

            const title = $('title').text() || url;
            
            // Extract the core lesson sections
            // Codedex lessons usually have sections for Learn, Example, Exercise
            // We'll capture the whole body but focus on identifying the patterns
            $('nav, footer, script, style, aside').remove();
            const content = $('body').text().replace(/\s+/g, ' ').trim();

            const [doc] = await db.insert(schema.documents).values({
                personaId: persona.id,
                url: url,
                title: title,
                content: content
            }).returning();

            // Split into sections if possible, otherwise by paragraph
            const chunks = content.split(/(?=Learn|Example|Exercise)/i).filter(c => c.length > 50);
            
            for (const chunk of chunks) {
                try {
                    const embedding = await getEmbeddings(chunk);
                    await db.insert(schema.memories).values({
                        personaId: persona.id,
                        documentId: doc.id,
                        content: chunk.trim(),
                        embedding: embedding
                    });
                } catch (e) {
                    console.error("Embedding failed for chunk, skipping...");
                }
            }
            console.log(`✅ Ingested: ${title}`);

        } catch (error) {
            console.error(`❌ Failed to ingest ${url}:`, error);
        }
    }

    console.log("🏁 Deep Lesson Ingestion complete!");
    process.exit(0);
}

ingestLessons();
