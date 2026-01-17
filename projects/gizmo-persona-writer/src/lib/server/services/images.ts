import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "$env/dynamic/private";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");

export async function generateImagePrompt(content: string, styleProfile: any) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
        You are a Visual Director. 
        Read the following social media content and create a highly descriptive, cinematic image prompt for an AI generator (like Stable Diffusion/Flux).
        
        CONTENT:
        ${content.substring(0, 2000)}

        PERSONA STYLE:
        ${JSON.stringify(styleProfile)}

        RULES:
        1. Keep the prompt under 75 words.
        2. Focus on lighting, composition, and mood.
        3. Do not use buzzwords like "photorealistic". Use descriptive terms like "85mm lens", "soft morning light", "minimalist aesthetic".
        4. Match the vibe of the persona.
        
        Return ONLY the image prompt text.
    `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (e) {
        console.error("Failed to generate image prompt", e);
        return "A minimalist high-tech workspace, clean aesthetic, cinematic lighting";
    }
}

export function getPollinationsUrl(prompt: string) {
    // Pollinations format: https://image.pollinations.ai/prompt/{prompt}?width={width}&height={height}&seed={seed}&nologo=true
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 1000000);
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1080&height=1080&seed=${seed}&nologo=true`;
}
