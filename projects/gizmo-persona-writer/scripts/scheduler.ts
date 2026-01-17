import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/lib/server/db/schema';
import { eq, lt, or, isNull } from 'drizzle-orm';
import { scoutTopics } from '../src/lib/server/services/scout';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const client = postgres(process.env.DATABASE_URL || "", { prepare: false });
const db = drizzle(client, { schema });

async function runScheduler() {
    console.log("⏰ Gizmo Auto-Scheduler waking up...");

    const now = new Date();
    
    // 1. Find schedules that need to run
    const dueSchedules = await db.query.schedules.findMany({
        where: or(
            lt(schema.schedules.nextRunAt, now),
            isNull(schema.schedules.nextRunAt)
        ),
        with: {
            persona: true
        }
    });

    console.log(`Found ${dueSchedules.length} schedules due for execution.`);

    for (const schedule of dueSchedules) {
        try {
            console.log(`🚀 Executing schedule for persona: ${schedule.persona.name}`);

            // 2. Scout for a topic
            const recentMemories = await db.query.memories.findMany({
                where: eq(schema.memories.personaId, schedule.personaId),
                limit: 5
            });

            const topics = await scoutTopics(
                schedule.personaId, 
                schedule.persona.styleProfile, 
                recentMemories.map(m => m.content)
            );

            if (topics.length === 0) {
                console.warn(`No topics scouted for ${schedule.persona.name}. Skipping.`);
                continue;
            }

            const bestTopic = topics[0];
            console.log(`🎯 Scouted Topic: ${bestTopic.title}`);

            // 3. Generate Draft
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const systemPrompt = `
                You are Gizmo, an elite content engine. 
                Persona: ${schedule.persona.name}
                Style Profile: ${JSON.stringify(schedule.persona.styleProfile)}
                Task: Write a high-quality ${schedule.targetChannel} post.
                Topic: ${bestTopic.title}
                Background: ${bestTopic.reasoning}
                RULES: No fluff, no BS, strictly follow voice DNA.
            `;

            const result = await model.generateContent(systemPrompt);
            const content = result.response.text();

            // 4. Save Draft
            await db.insert(schema.drafts).values({
                personaId: schedule.personaId,
                title: bestTopic.title,
                content: content,
                status: 'pending_review'
            });

            console.log(`✅ Draft saved for ${schedule.persona.name}`);

            // 5. Update Schedule
            const nextRun = new Date();
            if (schedule.frequency === 'daily') nextRun.setDate(now.getDate() + 1);
            else if (schedule.frequency === 'weekly') nextRun.setDate(now.getDate() + 7);
            else nextRun.setMonth(now.getMonth() + 1);

            await db.update(schema.schedules)
                .set({ 
                    lastRunAt: now,
                    nextRunAt: nextRun
                })
                .where(eq(schema.schedules.id, schedule.id));

        } catch (error) {
            console.error(`❌ Failed to execute schedule for ${schedule.persona.name}:`, error);
        }
    }

    console.log("😴 Scheduler going back to sleep.");
    process.exit(0);
}

runScheduler();
