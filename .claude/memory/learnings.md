# Project Learnings

Last updated: 2024-01-10

This file persists learnings across sessions. The Memory Agent reads and writes to this file to make Claude smarter over time.

---

## Preferences
<!-- User-stated preferences: formatting choices, style preferences, workflow habits -->
- Multi-agent thinking should be automatic, not invoked - user wants smarter by default (2025-01-10)
- Accept higher token usage for quality - full agent pipeline, not lite version (2025-01-10)


## Patterns That Work
<!-- Successful approaches to reuse: code patterns, content formats, processes -->
- **Service-Oriented Architecture (SOA) for Streamlit:** Decoupling business logic into a standalone `core.py` and a FastAPI `server.py` background service. This allows Streamlit to act as a thin client, improving responsiveness and enabling heavy AI processing or thumbnail serving in the background. (2026-01-14)
- **Persistent Metadata Layer (SQLite/SQLAlchemy):** Replacing CSV/JSON indexing with a professional database. This enables fast relational queries (e.g., "Find all photos of Person A at the Beach") and handles thousands of images with minimal latency. (2026-01-14)
- **Local Face Recognition Pipeline:** Using MTCNN for detection, FaceNet for 512-d embeddings, and DBSCAN for unsupervised clustering. This allows "Organize by People" without pre-labeled data. (2026-01-14)
- **Thumbnail Engine for Mobile Performance:** Serving dynamically generated WebP thumbnails via a dedicated FastAPI endpoint. This resolves the significant lag when viewing large galleries on remote devices like iPads over WiFi. (2026-01-14)
- **Native macOS .app Bundling:** Using `osacompile` to wrap a launch script into a double-clickable `.app` bundle. This simplifies the user experience by hiding the terminal and environment activation. (2026-01-14)
- **Streamlit "Logic-First, Render-Second" Callback Pattern:** To avoid `StreamlitAPIException` (modifying state after instantiation), move all state-altering logic (Up, Home, Navigation) into `on_click` or `on_change` callbacks. This ensures data is updated *before* the UI script reruns and hits the widgets.

## Avoid
<!-- Things that didn't work: approaches that missed the mark, formats to skip -->
- **Full-Resolution Gallery Previews on iPad:** Loading 10MB+ originals directly into a Streamlit `st.image` component crashes mobile browsers or causes extreme scroll lag. Always use a thumbnail proxy. (2026-01-14)
- **Native OS Dialogs in Web Apps:** Avoid `osascript` or `tkinter` for file pickers if the app is intended for remote use (iPad). These open on the *host* machine's monitor, creating a "Ghost Hand" bug where the remote user sees nothing. Use web-based folder explorers for cross-device compatibility.
- **Aggressive Auto-Scanning:** Don't trigger heavy AI scans automatically on every path change; it creates lag while the user is still navigating. Use a manual "Start Glide" button but keep the results cached.

## Project Conventions
<!-- Discovered codebase patterns: naming, structure, architecture -->
- **Thin Client Streamlit:** Streamlit scripts should primarily handle UI layout and state, delegating all data fetching and processing to a FastAPI backend. (2026-01-14)
- **Structured AI Renaming:** Standardized filename format `YYYY-MM-DD_Category_Subject_Original.ext` ensures perfect chronological and thematic sorting in any file explorer.

## Domain Knowledge
<!-- Project-specific context: terminology, business logic, key concepts -->
- code:zero is an AI-first coding academy focused on shipping real products
- Target audience: aspiring founders, indie hackers, designers transitioning to dev
- Brand philosophy: Ship > Think, practical over academic, AI as collaborator
- Tone: Direct, slightly edgy, no fluff, builder-to-builder
- **Binky's Persona:** A helpful Sugar Glider. Copywriting should be cute, protective of "treats" (files), and use glider-themed verbs ("Glide", "Tuck", "Snuggle").

## Past Decisions
<!-- Important decisions and their rationale -->
- **SQLite over CSV:** Switched to relational database for Binky 3.0 to support complex face and OCR metadata relationships. (2026-01-14)
- **"Magic" over "Manual":** Replaced complex AI toggles and folder hierarchy dropdowns with a single Natural Language organization bar. This reduced UI cognitive load while increasing power (users can now invent their own sorting rules).

## Tool & Integration Notes
<!-- Notes about APIs, services, tools used -->
- **OpenAI CLIP:** Used for local image classification and semantic search without API costs. Efficient on M-series Mac chips via `mps` device.
- **Salesforce BLIP:** Used for local image-to-text captioning to power descriptive renaming. Requires ~1GB disk space.
- **FaceNet/MTCNN:** High-performance local face detection and embedding extraction. (2026-01-14)
- **EasyOCR:** Integrated for "Sniffing" text from screenshots and documents. (2026-01-14)
- **macOS Full Disk Access:** Scripts accessing `/Volumes` (External Drives) require the host terminal to have "Full Disk Access" enabled in System Settings, or they will throw "Permission Denied".
- **Geopy (Nominatim):** Used for reverse geocoding EXIF GPS coordinates into City/Country names.

---

## Memory Index

For quick retrieval, key topics covered:

**AI Vision**: CLIP classification, BLIP captioning, Face Recognition, OCR (2026-01-14)
**Streamlit**: SOA architecture, FastAPI integration, Thumbnail serving (2026-01-14)
**macOS**: App bundling, Full Disk Access, External drive handling (/Volumes) (2026-01-14)
**Product Design**: Magic UI, Natural Language Organization, Binky Branding (2026-01-14)
**Content**: "How I built an app in 3 hours..." blog framework (2026-01-13)
