# Technical Decisions

Tech stack, tools, and infrastructure decisions.

---

## Internal Tool: Binky's Magic Image Organizer

The primary tool for managing project visual assets.

### Stack (v3.0 - 2026-01-14)

| Component | Technology | Why |
|-----------|------------|-----|
| **Backend** | FastAPI | High-performance async service for background AI & thumbnails. |
| **Frontend** | Streamlit | Rapid prototyping, built-in layout for data exploration. |
| **Database** | SQLite + SQLAlchemy | Persistent, relational metadata without external dependencies. |
| **Face Detection**| MTCNN | Robust local face detection. |
| **Face Embeds** | FaceNet | 512-d embeddings for clustering/recognition. |
| **Vision Model** | OpenAI CLIP | Semantic search and zero-shot classification. |
| **OCR** | EasyOCR | Local text extraction from screenshots/documents. |
| **Bundling** | osacompile | Native macOS .app launcher for non-technical users. |

---

## Curriculum Tech Stack

### Decided

| Tool | Use Case | Why |
|------|----------|-----|
| **n8n** | Workflow automation | Visual, powerful, self-hostable |
| **OpenAI / LLMs** | AI integration | Industry standard, accessible API |

### Still TBD

| Decision Needed | Options | Notes |
|-----------------|---------|-------|
| Frontend framework | SvelteKit, Next.js, etc. | Need to decide before curriculum |
| Backend approach | Supabase, custom, etc. | Mentioned Supabase in brand context |
| Hosting/deployment | Vercel, Railway, etc. | Students need to deploy by end |
| Database | Supabase, PlanetScale, etc. | — |

---

## What Students Build With

The curriculum focuses on:
- Email marketing automation
- Data analytics dashboards
- LLM-powered content generation
- n8n workflow automation

**Principle:** Students ship a real, deployed product. Tech choices should enable fast shipping, not comprehensive learning.

---

## Enterprise Demo Setup

For taster sessions:

| Component | Status | Notes |
|-----------|--------|-------|
| n8n instance | Not set up | Need cloud or self-hosted |
| Demo workflow | Not built | Form → OpenAI → Slack/email |
| Backup video | Not recorded | For when live demo fails |

**Demo flow:**
1. Trigger: Webhook or form submission
2. Action: OpenAI summarizes/categorizes
3. Output: Posts to Slack or sends email

---

## Infrastructure Needed

| Item | Purpose | Status |
|------|---------|--------|
| n8n cloud or self-hosted | Demo + teaching | Not set up |
| OpenAI API account | LLM demos | Likely exists |
| Physical venue | In-person teaching | TBD |
| Projector/screen | Presentations | TBD |

---

## Claude Intelligence System

Built 2025-01-10:

| Component | Location | Purpose |
|-----------|----------|---------|
| Orchestrator | `/.claude/skills/think-harder/SKILL.md` | Main coordination |
| Critic agent | `/.claude/skills/think-harder/agents/critic.md` | Review outputs |
| Research agent | `/.claude/skills/think-harder/agents/research.md` | Gather context |
| Decompose agent | `/.claude/skills/think-harder/agents/decompose.md` | Break down tasks |
| Synthesis agent | `/.claude/skills/think-harder/agents/synthesis.md` | Combine outputs |
| Memory agent | `/.claude/skills/think-harder/agents/memory.md` | Persist learnings |

**Configuration:** Runs automatically (default behavior), not opt-in.

---

*Last updated: 2025-01-10*
