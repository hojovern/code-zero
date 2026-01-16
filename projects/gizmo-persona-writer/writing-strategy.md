# Gizmo High-Fidelity Writing Strategy

To ensure Gizmo produces content "indistinguishable from the original," we move beyond simple prompting and implement a three-tier writing pipeline.

## 1. The "Pattern Extraction" Layer (The DNA)
Instead of just asking for a "tone," Gizmo analyzes the source corpus for:
- **Structural DNA:** Average paragraph length, sentence complexity (Flesch-Kincaid transition), and use of "hooks" (questions vs. bold statements).
- **The "Banned" List:** AI-isms to avoid (e.g., "In the fast-paced world," "Delve," "Leverage") and specific words the persona *never* uses.
- **The "Signature" List:** Words or phrases the persona uses frequently (e.g., Marc Lou's "Ship it," or "Minimalism is a superpower").

## 2. The "Topic Scout" (The Strategy)
A great writer knows *what* to write about.
- **Expertise Gap Analysis:** Gizmo looks at its "Brain" and identifies topics the source *hasn't* covered yet but would likely have an opinion on.
- **Trend Synthesis:** Gizmo consumes a news feed or trending topic and asks: "Based on this persona's values (stored in the style profile), what would be their unique take on this?"

## 3. The "Double-Pass" Editorial Workflow
1. **The Draft (The Ghostwriter):** Uses RAG to pull facts from the Brain and follows the structural DNA.
2. **The Polish (The Editor):** A second specialized prompt that *only* looks for style violations. It compares the draft against the "Voice Fingerprint" and rewrites "AI-sounding" sentences.

## 4. CLI Bridge Implementation Plan
A local script that allows the terminal agent (me) to:
- `gizmo search "topic"` -> Get raw facts from the persona's memory.
- `gizmo generate "prompt" --persona "name"` -> Get a draft using the full pipeline.
- `gizmo fingerprint "name"` -> View the current style rules for a persona.
