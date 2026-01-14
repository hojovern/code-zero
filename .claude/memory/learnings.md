# code:zero Project Learnings

Last updated: 2026-01-14

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

## Avoid
- **ReferenceErrors:** Do not access browser globals outside of `onMount` or `if (browser)` blocks.
- **Full-Resolution Previews on Mobile:** Loading 10MB+ originals directly crashes mobile browsers. Always use a thumbnail proxy.
- **Native OS Dialogs in Web Apps:** Avoid `osascript` or `tkinter` for remote use; use web-based explorers.
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