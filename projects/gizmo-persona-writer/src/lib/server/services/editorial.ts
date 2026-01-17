import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "$env/dynamic/private";
import { db } from '$lib/server/db';
import { personas } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");

export async function runMultiAgentPipeline(primaryPersonaId: string, prompt: string, context: string[], editorPersonaId?: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // 1. Fetch Personas for the Board
    const primary = await db.query.personas.findFirst({ where: eq(personas.id, primaryPersonaId) });
    
    let salesEditor;
    if (editorPersonaId) {
        salesEditor = await db.query.personas.findFirst({ where: eq(personas.id, editorPersonaId) });
    }

    if (!primary) throw new Error("Primary persona not found");

    console.log(`🎬 Board of Personas assembled for: ${primary.name}. Editor: ${salesEditor?.name || "None"}`);

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

    // --- PASS 2: THE HOOK & SALES POLISH (Selected Editor) ---
    let salesPolished = initialDraft;
    
    // Only run this pass if we have a valid editor AND it's not the same person as the author
    if (salesEditor && primary.id !== salesEditor.id) {
        console.log(`🔥 Pass 2: ${salesEditor.name} is polishing the hooks...`);
        const polishPrompt = `
            ROLE: You are ${salesEditor.name} (The Editor).
            STYLE: ${JSON.stringify(salesEditor.styleProfile)}
            DRAFT TO POLISH: 
            ${initialDraft}

            TASK: 
            1. Rewrite the headline to be high-velocity and benefit-driven (in your style).
            2. Make all subheaders punchier.
            3. Sharpen the CTA.
            4. Keep the technical body content from the original draft intact, but apply your tone.
            
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

export async function trainPersonaFromEdit(personaId: string, originalText: string, editedText: string, explicitFeedback?: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const persona = await db.query.personas.findFirst({ where: eq(personas.id, personaId) });
    if (!persona) throw new Error("Persona not found");

    const analysisPrompt = `
        You are a Style Architect. 
        Update the persona's style profile based on USER BEHAVIOR (edits) and USER INSTRUCTIONS.

        1. EXPLICIT INSTRUCTIONS (High Priority):
        ${explicitFeedback ? `USER SAYS: "${explicitFeedback}"` : "None provided."}

        2. ANALYSIS OF EDITS:
        ORIGINAL AI GENERATION:
        ${originalText ? originalText.substring(0, 3000) : "(No original text)"}

        USER EDITED VERSION:
        ${editedText ? editedText.substring(0, 3000) : "(No edited text)"}

        ACTION:
        - If instructions are provided, update the profile to strictly adhere to them (e.g., if "more code", increase technical depth).
        - If the user made edits, analyze the diff (e.g., "User shortened sentences", "User removed emojis") and merge that into the style.
        
        Identify 3 key style updates.
        Return a JSON object with a new "styleProfile" that merges the existing profile with these new insights.
        
        Existing Profile: ${JSON.stringify(persona.styleProfile)}

        Return ONLY the JSON.
    `;

    try {
        const result = await model.generateContent(analysisPrompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            const newStyle = JSON.parse(jsonMatch[0]);
            await db.update(personas)
                .set({ styleProfile: newStyle, updatedAt: new Date() })
                .where(eq(personas.id, personaId));
            return { success: true, newStyle };
        }
    } catch (e) {
        console.error("Training failed", e);
        return { success: false };
    }
}
