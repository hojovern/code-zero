import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "$env/dynamic/private";
import { db } from '$lib/server/db';
import { personas } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");

export async function runMultiAgentPipeline(primaryPersonaId: string, prompt: string, context: string[]) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // 1. Fetch Personas for the Board
    const primary = await db.query.personas.findFirst({ where: eq(personas.id, primaryPersonaId) });
    const salesEditor = await db.query.personas.findFirst({ where: eq(personas.name, "Marc Lou") });
    const technicalEditor = await db.query.personas.findFirst({ where: eq(personas.name, "Alex") });

    if (!primary) throw new Error("Primary persona not found");

    console.log(`🎬 Board of Personas assembled for: ${primary.name}`);

    // --- PASS 1: THE DRAFT (Primary Persona) ---
    console.log("📝 Pass 1: Generating technical draft...");
    const draftPrompt = `
        ROLE: You are ${primary.name}. 
        STYLE: ${JSON.stringify(primary.styleProfile)}
        CONTEXT: ${context.join("\n")}
        TASK: ${prompt}
        GOAL: Write a high-quality, factually grounded first draft.
    `;
    const draftResult = await model.generateContent(draftPrompt);
    const initialDraft = draftResult.response.text();

    // --- PASS 2: THE HOOK & SALES POLISH (Marc Lou) ---
    let salesPolished = initialDraft;
    if (salesEditor && primary.name !== "Marc Lou") {
        console.log("🔥 Pass 2: Marc Lou is polishing the hooks...");
        const polishPrompt = `
            ROLE: You are Marc Lou (The Sales & Hook Expert).
            STYLE: ${JSON.stringify(salesEditor.styleProfile)}
            DRAFT TO POLISH: 
            ${initialDraft}

            TASK: 
            1. Rewrite the headline to be high-velocity and benefit-driven.
            2. Make all subheaders punchier (use "X not Y" rhythm where possible).
            3. Sharpen the CTA.
            4. Keep the technical body content from the original draft intact.
            
            Return the full updated article.
        `;
        const polishResult = await model.generateContent(polishPrompt);
        salesPolished = polishResult.response.text();
    }

    // --- PASS 3: THE STYLE & SOUL AUDIT (Final Pass) ---
    console.log("🧪 Pass 3: Final style and soul audit...");
    const finalPrompt = `
        ROLE: Elite Editorial Director.
        TASK: Review this draft for "AI-isms" and soul.
        DRAFT:
        ${salesPolished}

        RULES:
        1. Remove words like: "In the fast-paced world", "comprehensive", "leverage", "delve".
        2. Ensure the rhythm is human and slightly opinionated.
        3. Add signature emojis from the original persona: ${JSON.stringify(primary.styleProfile.emojis)}
        
        Return the final polished version.
    `;
    const finalResult = await model.generateContent(finalPrompt);
    
    return {
        initial: initialDraft,
        polished: finalResult.response.text(),
        agents: [primary.name, salesEditor?.name, "Editorial Director"].filter(Boolean)
    };
}
