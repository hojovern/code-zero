# Gizmo the Persona Writer: Project Plan

## 1. Overview
Gizmo is an AI-powered content creation engine designed to "clone" a brand or individual's digital persona. By crawling existing content (blogs, websites, social feeds), Gizmo builds a high-fidelity vector memory and style profile, allowing it to generate new content that is indistinguishable in tone, expertise, and style from the original.

Gizmo is the second product in the "Code Zero Suite," intended for standalone sale and integration into the **CEO Command Centre**.

## 2. Core Features

### Phase 1: The "Gizmosis" Process (Ingestion)
- **Recursive Deep Crawl:** Input a URL, and Gizmo recursively scrapes all sub-pages, extracting text content while ignoring noise (headers, footers, ads).
- **Vector Memory (The Brain):** Stores crawled data in a Supabase `pgvector` database. This ensures every piece of content generated is grounded in the source's actual expertise.
- **Voice Fingerprinting:** An AI analyzer identifies:
    - **Tone:** (e.g., Sarcastic, Professional, Academic, Visionary)
    - **Rhythm:** Sentence length distribution and complexity.
    - **Vocabulary:** Frequently used industry jargon or unique "catchphrases."
    - **Formatting Preferences:** Use of bullet points, emojis, bolding, etc.

### Phase 2: Writer Studio
- **Persona Management:** Create and save multiple personas (e.g., "CEO Professional," "Product Blog," "Personal Newsletter").
- **Smart Drafting:**
    - **Context Injection:** When writing a new post, Gizmo automatically retrieves the most relevant "expertise" from its memory.
    - **Human-in-the-Loop:** Toggle for "Draft Only" or "Interactive Chat" mode.
- **Quality Assurance:** A "Persona Consistency" score that flags sentences that sound "out of character."

### Phase 3: Distribution & Integrations
- **CMS Connect:** One-click export to WordPress, Ghost, or Substack.
- **Markdown Export:** Clean, formatted output for local storage.
- **Command Centre Integration:** A widget for the CEO Command Centre that shows "Persona Health" (last crawled date, memory size) and a quick-write box.

## 3. Technical Stack

| Layer | Technology | Reason |
| :--- | :--- | :--- |
| **Frontend** | SvelteKit + Tailwind CSS | Consistency with Code Zero projects; fast, modern DX. |
| **Backend** | Supabase (Auth/DB) | Built-in authentication and `pgvector` for RAG memory. |
| **AI (LLM)** | Gemini 1.5 Pro / GPT-4o | High context windows for analyzing large amounts of crawled text. |
| **Scraping** | Firecrawl or Custom Playwright | Handles JS-heavy sites and provides clean markdown output. |
| **Hosting** | Vercel / Supabase Edge | Scalable serverless architecture. |

## 4. Roadmap

### Step 1: MVP (Internal Use)
- [ ] Basic SvelteKit dashboard.
- [ ] Integration with Firecrawl for URL scraping.
- [ ] Supabase `pgvector` setup for "The Brain."
- [ ] Basic "Style Prompt" generator.
- [ ] Simple text editor that generates content based on a single URL source.

### Step 2: Productization (Sellable App)
- [ ] Multi-persona support (Workspace logic).
- [ ] Credit-based system (for scraping pages/words generated).
- [ ] Enhanced UI with "Marc Lou" style minimalism and polish.
- [ ] Public-facing landing page for Gizmo.

### Step 3: Ecosystem Integration
- [ ] API for external access.
- [ ] CEO Command Centre dashboard widget.
- [ ] "Cross-Persona" knowledge sharing (optional).

## 5. Monetization Strategy (The Marc Lou Model)
- **One-time Purchase (LTD):** $99 for 1 Persona + Lifetime updates (Limited time).
- **Subscription (SaaS):**
    - **Hobbyist ($19/mo):** 3 Personas, 500 pages memory.
    - **Agency ($49/mo):** Unlimited Personas, API access, Team collaboration.
