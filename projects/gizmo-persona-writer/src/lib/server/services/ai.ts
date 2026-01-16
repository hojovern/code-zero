import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "$env/dynamic/private";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || "");

export async function getEmbeddings(text: string) {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
}

export async function crawlWebsite(url: string) {
    // Simulated crawl for demo
    return [
        {
            url: `${url}/about`,
            title: "About",
            content: "This is a whimsical world of coding where adventure awaits around every corner."
        },
        {
            url: `${url}/blog/start`,
            title: "Starting Your Journey",
            content: "The first step in your coding adventure is unlocking your primary language spell."
        }
    ];
}