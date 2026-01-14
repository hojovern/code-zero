# Binky's Magic Image Organizer - Learnings

Last updated: 2026-01-14

## Patterns That Work
- **Service-Oriented Architecture (SOA) for Streamlit:** Decoupling business logic into a standalone `core.py` and a FastAPI `server.py` background service.
- **Persistent Metadata Layer (SQLite/SQLAlchemy):** Relational database for fast metadata queries.
- **Local Face Recognition Pipeline:** MTCNN for detection, FaceNet for embeddings, DBSCAN for unsupervised clustering.
- **Thumbnail Engine for Mobile Performance:** Serving WebP thumbnails via FastAPI.
- **Native macOS .app Bundling:** Using `osacompile` for launch scripts.
- **Streamlit "Logic-First, Render-Second" Callback Pattern:** Moving state logic to callbacks to avoid instantiation errors.

## Avoid
- **Full-Resolution Gallery Previews on iPad:** Use thumbnails to avoid browser crashes.
- **Native OS Dialogs in Web Apps:** Use web-based explorers for remote compatibility.
- **Aggressive Auto-Scanning:** Use manual triggers for heavy AI tasks.

## Project Conventions
- **Thin Client Streamlit:** UI handles state, FastAPI backend handles data.
- **Structured AI Renaming:** `YYYY-MM-DD_Category_Subject_Original.ext`.
- **Binky's Persona:** Cute Sugar Glider, glider-themed verbs ("Glide", "Tuck").

## Tool & Integration Notes
- **OpenAI CLIP:** Local classification/search on `mps` device.
- **Salesforce BLIP:** Local captioning.
- **EasyOCR:** Text sniffing.
- **macOS Full Disk Access:** Required for `/Volumes` access.
- **Geopy:** Reverse geocoding.
