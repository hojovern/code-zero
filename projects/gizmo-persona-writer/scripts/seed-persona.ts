import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/lib/server/db/schema';
import minimist from 'minimist';

const client = postgres(process.env.DATABASE_URL || "", { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
    const args = minimist(process.argv.slice(2));
    
    const name = args.name || "Codédex";
    const url = args.url || "https://www.codedex.io";
    
    console.log(`🌱 Seeding persona: ${name}...`);
    
    const styleProfile = {
        tone: args.tone || "Playful, whimsical, and highly encouraging.",
        rhythm: args.rhythm || "Short, punchy, and action-oriented.",
        vocabulary: (args.vocab || "Adventure, XP, Quest, Magic, Vibes").split(",").map((s: string) => s.trim()),
        emojis: (args.emojis || "⋆˙⟡, 🐍, ✨").split(",").map((s: string) => s.trim()),
        banned_phrases: (args.banned || "In the fast-paced world, Synergy").split(",").map((s: string) => s.trim())
    };

    const [persona] = await db.insert(schema.personas).values({
        name,
        baseUrl: url,
        styleProfile
    }).returning();

    console.log(`✅ Seeding complete for ${name}!`);
    process.exit(0);
}

seed();