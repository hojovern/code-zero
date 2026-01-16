# Gizmo the Persona Writer

Gizmo is an AI-powered content engine that clones a brand's digital persona by crawling their website and building a high-fidelity vector memory.

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy `.env.example` to `.env` and fill in your keys.
   ```bash
   cp .env.example .env
   ```
   - `DATABASE_URL`: Your Supabase Postgres connection string.
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `FIRE_CRAWL_API_KEY`: (Optional) For high-quality recursive crawling.

3. **Database Migration:**
   ```bash
   npm run db:push
   ```

4. **Run Dev Server:**
   ```bash
   npm run dev
   ```

## Features
- **Gizmosis:** Crawl any URL to build a persona memory.
- **The Brain:** Vector-based retrieval of expertise.
- **Voice Fingerprinting:** Analysis of tone, rhythm, and vocabulary.
- **Writer Studio:** Generate content that sounds exactly like the persona.
