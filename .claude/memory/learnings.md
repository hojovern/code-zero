# code:zero Project Learnings

Last updated: 2026-01-14

## Session Learnings (2026-01-14)

### Penang Launch Strategy
- **Venue Strategy**: Negotiate "Off-Peak Residency" at Hundred Years (Muntri St) for Mon-Fri, 2pm-6pm. Target budget: RM 2,500 - RM 3,000/mo.
- **Target Audiences**: 
    1. **Digital Nomads**: Focus on "Stop selling hours, build machines" narrative.
    2. **Bayan Lepas Tech Execs**: Focus on "Reclaiming technical authority" and preventing obsolescence.
- **Photoshoot**: Planned "Staged Success" shoot with 6-8 friends to create social proof for the website.
- **Recruitment**: Use a "Visiting Fellow" model for senior KL-based partners to maintain legitimacy with low overhead.

### Real Estate Strategy (KL Flip)
- **Property**: I-Zen Kiara 1 (804 sq ft).
- **The "Flipper's Fix"**: 
    - **Budget**: ~RM 8,500.
    - **Bathroom**: Epoxy tile paint (White/Grey), Matte Black fixtures, One-piece toilet, Aluminum floating vanity.
    - **Main Area**: Rip out moldy cabinets/wardrobes to show space; paint "Brilliant White"; replace yellowed switches with modern white rockers.
    - **Goal**: List at RM 620k (Target RM 600k net) vs RM 520k "as-is" price.

### Technical Updates
- **Environment Setup**: Added `python-docx`, `openpyxl`, and `python-pptx` to the curriculum setup page.
- **Gemini CLI**: Corrected install command to `pip install -q -U google-generativeai`.

## Preferences
- Multi-agent thinking should be automatic, not invoked.
- Accept higher token usage for quality.

## Patterns That Work

### Web Architecture (SvelteKit/Supabase)
- **Parallel Data Fetching:** Always use `Promise.all` for portal data fetching to ensure near-instant load times.
- **SSR Safety:** Guard all `document` and `window` access with `browser` checks from `$app/environment`.
- **Clean Layout Transitions:** Use `data-sveltekit-reload` for links between significantly different layouts (e.g., Super Admin to Student Portal).

### AI & Python Services (Binky Engine)
- **Service-Oriented Architecture (SOA) for Streamlit:** Decoupling business logic into a standalone `core.py` and a FastAPI `server.py` background service.
- **Persistent Metadata Layer (SQLite/SQLAlchemy):** Relational database for fast metadata queries.
- **Local Face Recognition Pipeline:** MTCNN for detection, FaceNet for embeddings, DBSCAN for unsupervised clustering.
- **Thumbnail Engine for Mobile Performance:** Serving WebP thumbnails via FastAPI proxy.
- **Native macOS .app Bundling:** Using `osacompile` for launch scripts.
- **Streamlit "Logic-First, Render-Second" Callback Pattern:** Moving state logic to callbacks to avoid instantiation errors.
- **Meeting Intelligence Wingman Pattern:** Using MCP to bridge real-time calendar data with relational history (SQLite) and search (Google Search MCP) to provide executive context briefs before meetings.

## Design Engineering (Luna Protocol)
- **Vision-First Requirement:** Never claim to "see" or "analyze" a screenshot unless I have actually used a tool (like `read_file`) to process the pixels. Hallucinating design details from a filename is a critical failure.
- **Source of Truth Hierarchy:** User-provided screenshots are the absolute Source of Truth. They override AI automated summaries (`web_fetch`) or general knowledge.
- **No Persona-Driven Hallucinations:** Avoid adding "cute" or "persona-driven" styling (e.g., comic book borders, retro shadows) unless they are explicitly visible in the reference material.
- **Breakpoint Rigor:** Always analyze layout across 3 breakpoints (Mobile, Tablet, Wide Desktop). A "3-column" layout on Wide Desktop often appears as 2-column on standard screens; do not let automated tools mislead the layout architecture.

## Avoid
- **ReferenceErrors:** Do not access browser globals outside of `onMount` or `if (browser)` blocks.
- **Hallucinating Visuals:** Never promise to "use a screenshot" and then proceed to guess its contents.
- **Stylistic Assumptions:** Do not assume a "gamified" brand implies a specific aesthetic (like Neo-Brutalism) without visual confirmation.
- **Full-Resolution Previews on Mobile:** Loading 10MB+ originals directly crashes mobile browsers. Always use a thumbnail proxy.
- **"Cohort":** Never use this word. Use **"Intake"**.

## Brand Domain Knowledge
- **code:zero** is an AI-first coding academy.
- **Binky's Persona:** A helpful Sugar Glider. Copywriting should be cute, protective of "treats" (files), and use glider-themed verbs ("Glide", "Tuck", "Snuggle").
- Philosophy: Ship > Think, AI as collaborator.
- Tone: Direct, slightly edgy, builder-to-builder.

## Tool & Integration Notes
- **OpenAI CLIP:** Local classification/search on `mps` device.
- **EasyOCR:** Text sniffing from screenshots.
- **macOS Full Disk Access:** Required for script access to `/Volumes`.

## Corporate Decisions
- **Super Admin:** Master admin title.
- **8-Intake Model:** 6-week cycles (4 weeks bootcamp + 2 weeks gap).
- **Investor Payback:** RM 90k target, March 2026 milestone.
