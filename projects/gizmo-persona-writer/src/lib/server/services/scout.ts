import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "$env/dynamic/private";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");

export async function scoutTopics(personaId: string, styleProfile: any, recentMemories: string[]) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
        You are the "Topic Scout" for an elite AI persona writer.
        
        PERSONA STYLE PROFILE:
        ${JSON.stringify(styleProfile, null, 2)}

        RECENT COVERED TOPICS/FACTS:
        ${recentMemories.join("\n")}

        TASK:
        Based on this persona's unique voice and expertise, suggest 3 high-impact article topics.
        The topics should:
        1. Fill an "Expertise Gap" (something they haven't covered but should).
        2. Align with their values (e.g., if they value minimalism, suggest a minimalist take on a complex trend).
        3. Be catchy and "in-character".

        Return a JSON array of objects with "title", "reasoning", and "suggested_outline".
        Wrap the JSON in [].
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonMatch = text.match(/[\[\s\S]*\]/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (e) {
        console.error("Scouting failed:", e);
        return [
            { title: "The Future of AI Learning", reasoning: "Automatic fallback topic.", suggested_outline: "" },
            { title: "Mastering the Code Adventure", reasoning: "Automatic fallback topic.", suggested_outline: "" }
        ];
    }
}