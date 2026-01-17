import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '';
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function analyzeVoice(content: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
        Analyze the following text and extract a detailed "Voice Fingerprint" for Gizmo.
        Focus on:
        1. Tone: (e.g., authoritative, witty, empathetic)
        2. Rhythm: (e.g., punchy, academic, conversational)
        3. Vocabulary: (e.g., jargon used, simple English)
        4. Formatting: (e.g., lists, bolding)

        Text: ${content.substring(0, 10000)}

        Return a JSON object.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : { tone: "Standard" };
    } catch (e) {
        return { tone: "Standard" };
    }
}