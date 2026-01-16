import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const client = postgres(process.env.DATABASE_URL || "", { prepare: false });
const db = drizzle(client, { schema });

async function getEmbeddings(text: string) {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
}

async function listPersonas() {
    const all = await db.select().from(schema.personas);
    console.log("\n👥 AVAILABLE PERSONAS:");
    console.table(all.map(p => ({
        ID: p.id.substring(0, 8) + "...",
        Name: p.name,
        Memory: "Active",
        URL: p.baseUrl
    })));
}

async function queryBrain(name: string, query: string) {
    const persona = await db.query.personas.findFirst({
        where: eq(schema.personas.name, name)
    });

    if (!persona) {
        console.error(`❌ Persona "${name}" not found.`);
        return;
    }

    console.log(`🧠 Querying Brain for ${name}: "${query}"...`);
    // Placeholder for vector search logic
    const results = await db.query.memories.findMany({
        where: eq(schema.memories.personaId, persona.id),
        limit: 5
    });

    console.log("\n📖 RETRIEVED CONTEXT:");
    results.forEach((r, i) => console.log(`[${i+1}] ${r.content.substring(0, 300)}...`));
}

async function writeArticle(name: string, prompt: string) {
    const persona = await db.query.personas.findFirst({
        where: eq(schema.personas.name, name)
    });

    if (!persona) {
        console.error(`❌ Persona "${name}" not found.`);
        return;
    }

    console.log(`✍️  Gizmo is assuming persona: ${name}...`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const systemPrompt = `
        You are Gizmo, an elite content engine.
        PERSONA: ${persona.name}
        STYLE PROFILE: ${JSON.stringify(persona.styleProfile)}
        TASK: ${prompt}
        RULES: Strictly follow the voice fingerprint. No corporate jargon.
    `;

    const result = await model.generateContent(systemPrompt);
    console.log("\n📄 GENERATED CONTENT:");
    console.log("--------------------------------------------------");
    console.log(result.response.text());
    console.log("--------------------------------------------------");
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    try {
        switch (command) {
            case 'list':
                await listPersonas();
                break;
            case 'brain':
                await queryBrain(args[1], args.slice(2).join(' '));
                break;
            case 'write':
                await writeArticle(args[1], args.slice(2).join(' '));
                break;
            default:
                console.log(`
🚀 GIZMO CLI
Usage:
  npx tsx scripts/gizmo.ts list                # List all personas
  npx tsx scripts/gizmo.ts brain [name] [q]    # Search a persona's memory
  npx tsx scripts/gizmo.ts write [name] [p]    # Write content as persona
                `);
        }
    } catch (error) {
        console.error("❌ CLI Error:", error);
    } finally {
        process.exit(0);
    }
}

main();
