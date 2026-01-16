import {
    GoogleGenerativeAI
} from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const crawledContent = `
About: Codédex presents a tone that is encouraging, friendly, and engaging, particularly aimed at beginners in coding. It uses phrases like "Start Your Coding Adventure," "The most fun and beginner-friendly way to learn to code," and "Level up your learning." The style is interactive and gamified, with mentions of gaining XP, collecting badges, and completing quests. It emphasizes community and practical application through "code challenges and project tutorials".
Challenges: The platform heavily emphasizes gamification, encouraging users to "earn experience points (XP)," "unlock new regions," and "collect all the badges" at their own pace. This approach extends to its "Challenge Packs," where users "practice coding reps while earning XP" to test their knowledge.
Community: Codedex fosters a vibrant and collaborative community where members are encouraged to "make magic together". The community features leaderboards, project showcases, monthly challenges, and diverse channels for discussion, including technical help, career advice, and even lighthearted topics like memes and pets.
Tone Markers: Playful, encouraging, enthusiastic, and highly supportive. Whimsical Language: "fantasy land," "Chief Vibes Officer," and "Let's make magic together". Informal and Friendly: (づ｡◕‿‿◕｡)づ:・ﾟ✧, 🌟, 🌱, ♡.
`;

async function runGizmosisTest() {
    console.log("🚀 Starting Gizmosis Test for: codedex.io");
    console.log("📡 Simulating deep crawl of 5 pages...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Step 1: Voice Analysis
    console.log("🧠 Analyzing Voice Fingerprint...");
    const voicePrompt = `
        Analyze the following text and extract a detailed "Voice Fingerprint" for Gizmo.
        Text: ${crawledContent}
        
        Return JSON:
        {
            "tone": string,
            "rhythm": "short/punchy" | "flowing" | "academic",
            "vocabulary": string[],
            "emojis": string[],
            "formatting": string[],
            "banned_phrases": string[]
        }
    `;
    const voiceResult = await model.generateContent(voicePrompt);
    const voiceFingerprint = voiceResult.response.text();
    console.log("\n✅ VOICE FINGERPRINT EXTRACTED:");
    console.log(voiceFingerprint);

    // Step 2: Topic Scouting
    console.log("\n🔭 Scouting high-impact topics...");
    const scoutPrompt = `
        Based on this Voice Fingerprint: ${voiceFingerprint}
        Suggest 3 well-written article titles and brief outlines that Codedex would cover next.
        Focus on the "Expertise Gap" (what's missing?).
    `;
    const scoutResult = await model.generateContent(scoutPrompt);
    console.log("\n🎯 SCOUTED TOPICS:");
    console.log(scoutResult.response.text());
}

runGizmosisTest();
