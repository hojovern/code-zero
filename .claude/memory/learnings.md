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
- **Streamlit "Logic-First, Render-Second" Callback Pattern:** To avoid `StreamlitAPIException` (modifying state after instantiation), move all state-altering logic (Up, Home, Navigation) into `on_click` or `on_change` callbacks. This ensures data is updated *before* the UI script reruns and hits the widgets.
- **Zero-Shot Concept Expansion:** Mapping natural language queries (e.g., "Sort by vibe") to hardcoded concrete bucket lists (e.g., ["Happy", "Calm", "Dark"]) before passing them to a vision model like CLIP for flexible organization without expensive LLM calls.
- **Hybrid Local-Remote Architecture:** Designing desktop apps as web servers (localhost) allows instant iPad "Remote Control" capability over local WiFi without needing an App Store deployment.

## Avoid
<!-- Things that didn't work: approaches that missed the mark, formats to skip -->
- **Native OS Dialogs in Web Apps:** Avoid `osascript` or `tkinter` for file pickers if the app is intended for remote use (iPad). These open on the *host* machine's monitor, creating a "Ghost Hand" bug where the remote user sees nothing. Use web-based folder explorers for cross-device compatibility.
- **Aggressive Auto-Scanning:** Don't trigger heavy AI scans automatically on every path change; it creates lag while the user is still navigating. Use a manual "Start Glide" button but keep the results cached.

## Project Conventions
<!-- Discovered codebase patterns: naming, structure, architecture -->
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
- **"Magic" over "Manual":** Replaced complex AI toggles and folder hierarchy dropdowns with a single Natural Language organization bar. This reduced UI cognitive load while increasing power (users can now invent their own sorting rules).

## Tool & Integration Notes
<!-- Notes about APIs, services, tools used -->
- **OpenAI CLIP:** Used for local image classification and semantic search without API costs. Efficient on M-series Mac chips via `mps` device.
- **Salesforce BLIP:** Used for local image-to-text captioning to power descriptive renaming. Requires ~1GB disk space.
- **macOS Full Disk Access:** Scripts accessing `/Volumes` (External Drives) require the host terminal to have "Full Disk Access" enabled in System Settings, or they will throw "Permission Denied".
- **Geopy (Nominatim):** Used for reverse geocoding EXIF GPS coordinates into City/Country names.

---

## Memory Index

For quick retrieval, key topics covered:

**AI Vision**: CLIP classification, BLIP captioning, Vector search (2026-01-13)
**Streamlit**: State management, Callback patterns, Remote device tunneling (2026-01-13)
**macOS**: Full Disk Access, External drive handling (/Volumes), osascript (2026-01-13)
**Product Design**: Magic UI, Natural Language Organization, Binky Branding (2026-01-13)
**Content**: "How I built an app in 3 hours..." blog framework (2026-01-13)
