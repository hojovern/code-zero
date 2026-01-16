import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from 'fs';
import * as path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const WATCH_DIR = "../../"; // Watch the root project

async function analyzeChange(filePath: string, content: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
        You are the Gizmo Intelligence Observer. 
        A developer just updated this file: ${filePath}
        
        FILE CONTENT (fragment):
        ${content.substring(0, 2000)}

        TASK: Should one of our AI staff members (Codédex, Code Zero Admin) take action?
        Actions could be: 
        - Drafting a blog post about this new feature.
        - Writing an educational lesson about this code.
        - Updating a persona's memory.

        If YES, return a JSON: { "action": true, "persona": "name", "suggestion": "description" }
        If NO, return { "action": false }
    `;

    try {
        const result = await model.generateContent(prompt);
        return JSON.parse(result.response.text().match(/\{[\s\S]*\}/)?.[0] || '{"action":false}');
    } catch (e) {
        return { action: false };
    }
}

console.log("🔭 Gizmo Stealth Observer is now watching your work...");

import { execSync } from 'child_process';

async function checkGitChanges() {
    try {
        const status = execSync('git status --short').toString();
        if (!status) return;

        const files = status.split('\n').filter(line => line.trim()).map(line => line.substring(3));
        
        for (const file of files) {
            // Only analyze meaningful files
            if (file.endsWith('.ts') || file.endsWith('.svelte') || file.endsWith('.md')) {
                const diff = execSync(`git diff ${file}`).toString();
                if (diff) {
                    const suggestion = await analyzeChange(file, diff);
                    if (suggestion.action) {
                        console.log(`\n💡 [GIZMO SUGGESTION]`);
                        console.log(`Persona: ${suggestion.persona}`);
                        console.log(`Action: ${suggestion.suggestion}`);
                        console.log(`Command: gizmowrite "${suggestion.persona}" "${suggestion.suggestion}"\n`);
                    }
                }
            }
        }
    } catch (e) {
        // Silently fail if not in git repo or other error
    }
}

console.log("🔭 Gizmo Stealth Observer is now watching your work...");

setInterval(async () => {
    await checkGitChanges();
}, 30000); // Check every 30 seconds
