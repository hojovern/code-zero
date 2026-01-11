# Built From Terminal

> How I built code:zero entirely from the command line using AI agents, modern tools, and a ship-first mentality.

This document is the **source of truth** for the code:zero curriculum. It captures the chronological journey of building a real business from the terminal—every decision, tool, mistake, and breakthrough.

**What this covers:**
- Technical build (website, backend, infrastructure)
- Full business operations (marketing, content, brand, strategy)
- AI workflows and agent systems

**Who this is for:**
- Complete beginners learning terminal fundamentals
- Developers adopting AI-first workflows
- Non-technical founders who want to build without code

---

## How This Works

**This document is written automatically by Claude as we work.** No manual documentation required.

- Claude adds entries as significant work happens
- Entries are tagged with `[LESSON]` for curriculum extraction
- The messy parts (mistakes, pivots, dead ends) are included—they're valuable
- Chronological format shows cause → effect

**For curriculum development:** Entries marked `[LESSON]` get extracted into standalone lessons in `/syllabus/lessons/`.

**For context continuity:** Claude reads this to understand how decisions were made and why.

---

## Legend

- `[LESSON]` — Extract this into a standalone lesson
- `[TOOL]` — Specific tool or technology used
- `[DECISION]` — Key decision point with reasoning
- `[MISTAKE]` — What went wrong and what I learned
- `[WIN]` — What worked well and why

---

## The Journey

*Reconstructed from session logs, memory files, and artifacts created.*

---

### Phase 1: AI Workspace Foundation (2025-01-10)

**Context:** Needed a way to run an entire business from the terminal using AI. Traditional tools (Notion, Google Docs, manual processes) were slow and fragmented. The insight: if Claude Code can write code, it can write everything—marketing, strategy, sales materials.

**What was built:**

1. **CLAUDE.md Project Instructions**
   - [TOOL] Created `CLAUDE.md` as the AI's "brain" for this project
   - Defined brand context, voice, target audience
   - Set up agent behavior rules
   - [DECISION] Made this the single source of truth for all AI operations

2. **Session Continuity System**
   - [TOOL] Created `/sessions/` folder structure
   - Built automatic session logging (current.md → timestamped archives)
   - [DECISION] Sessions auto-save on "bye", "thanks", "done" to prevent context loss
   - [WIN] No more "starting fresh" every conversation

3. **Memory System**
   - [TOOL] Created `/.claude/memory/` for persistent knowledge
   - `business-context.md` — Master business knowledge
   - `learnings.md` — What works, what to avoid
   - [LESSON] AI memory isn't magic—you have to build the infrastructure

**Lesson:** [LESSON] An AI workspace needs explicit memory architecture. Session files + memory files + CLAUDE.md = persistent intelligence across conversations.

**Tags:** [TOOL] [DECISION] [WIN]

---

### Phase 2: Business Strategy from Terminal (2025-01-10)

**Context:** Had a vague idea for a coding academy. Needed to crystallize it into a real business model with pricing, positioning, and product definition. Did this entirely through conversation with Claude.

**What was built:**

1. **Founder Questionnaire Process**
   - [TOOL] Used structured Q&A to extract tacit knowledge
   - Claude asked probing questions, I answered
   - Built comprehensive business context from conversation
   - [WIN] Faster than writing a business plan manually

2. **Two-Product Strategy**
   - [DECISION] Consumer course: "Full Stack Web Development" — 4 weeks, RM 9,800
   - [DECISION] Enterprise course: "AI Automation Sprint" — 3 days, RM 38,000/cohort
   - [DECISION] Start consumer (builds case studies), layer enterprise later
   - Inspired by Marc Lou's model but differentiated (live cohort + location + accountability)

3. **Pricing Strategy**
   - [MISTAKE] Initially priced consumer at 6 weeks / RM 13,800 — too long, lower unit economics
   - [DECISION] Pivoted to 4 weeks — better revenue/day (RM 4,900 vs RM 4,600)
   - [LESSON] "Ship fast" positioning = premium, not discount
   - Enterprise: RM 38,000/cohort (~$2,700/day) — must be premium to be taken seriously
   - [LESSON] "Too cheap" is a red flag for enterprise buyers

4. **Business Context File**
   - Created `/.claude/memory/business-context.md` — 400+ lines of crystallized business knowledge
   - Includes: customer profiles, pain points, competitive positioning, revenue projections
   - [WIN] Every future conversation has full business context

**Lesson:** [LESSON] You can do serious business strategy work through AI conversation. The key is structured extraction—questionnaires, follow-up questions, writing down decisions as you make them.

**Lesson:** [LESSON] Duration and pricing are linked to positioning. Shorter + same price = higher perceived value IF you position it as "focused" not "insufficient."

**Tags:** [DECISION] [MISTAKE] [WIN]

---

### Phase 3: Multi-Agent Intelligence System (2025-01-10)

**Context:** Single-pass AI outputs weren't good enough for high-stakes work. Needed a way to make Claude "think harder" on complex tasks.

**What was built:**

1. **Think-Harder Skill**
   - [TOOL] Created `/.claude/skills/think-harder/` with 5 specialized agents
   - Philosophy: "Verification > Generation" — biggest gains from checking, not generating

2. **The Five Agents**
   - **Research Agent** — Gathers context before acting (never modify what you haven't understood)
   - **Decompose Agent** — Breaks complex tasks into explicit, verifiable steps
   - **Critic Agent** — Finds flaws in outputs before delivery
   - **Synthesis Agent** — Combines multiple outputs into coherent whole
   - **Memory Agent** — Persists learnings to avoid repeating mistakes

3. **Pipeline Architecture**
   ```
   Task → Research → Decompose → Generate → Critique → Revise → Synthesize → Output
   ```

4. **Key Decision**
   - [DECISION] Made it DEFAULT behavior, not opt-in
   - User preference: quality over token efficiency
   - [LESSON] If you have to remember to invoke quality measures, you won't

**Lesson:** [LESSON] Multi-agent systems work by creating adversarial verification. One agent generates, another critiques. The critique loop catches issues that single-pass misses.

**Lesson:** [LESSON] Quality systems must be automatic. Opt-in quality = inconsistent quality.

**Tags:** [TOOL] [DECISION] [WIN]

---

### Phase 4: Brand & Design System (2025-01-10)

**Context:** Needed consistent visual identity and copy voice. Traditional approach: hire designer, iterate for weeks. Terminal approach: analyze competitors, extract patterns, codify into system.

**What was built:**

1. **Competitive Analysis**
   - [TOOL] Used WebFetch to analyze 4 competitor sites
   - alexop.dev → Subtle animations, sophisticated minimalism
   - telebort.com → Warm backgrounds, strong accessibility
   - teamtreehouse.com → Vibrant gradients, rounded typography
   - nextacademy.com → Alternating sections, testimonials, trust signals

2. **Design System Document**
   - Created `/brand/design-system.md` — 1,100+ lines of CSS specs
   - Color palette with semantic meanings
   - Typography scale with fluid sizing
   - Component patterns (buttons, cards, inputs)
   - Animation timing and easing curves
   - [WIN] Any future page can be built consistently

3. **Content System Document**
   - Created `/brand/content-system.md` — 600+ lines of copy frameworks
   - Page flow: Hero → Trust → Problem/Solution → Features → Social Proof → Pricing → FAQ → CTA
   - Headline formulas, CTA patterns, objection handling
   - Anti-patterns to avoid ("Learn to code", "Revolutionary", stock photos)
   - [LESSON] Avoid "cohort" — use "intake" instead (sounds less academic)

4. **Brand Voice**
   - Created `/.claude/skills/brand-voice/SKILL.md`
   - Builder-to-builder tone, no fluff
   - Specific over vague, outcome over process
   - [WIN] Every piece of content auto-applies voice guidelines

**Lesson:** [LESSON] Design systems aren't just for code—they're for everything. Codifying brand decisions into documents means AI can apply them consistently without asking.

**Lesson:** [LESSON] Competitive analysis via terminal is fast. Fetch, analyze, extract patterns, synthesize. What takes a design agency weeks takes a few hours.

**Tags:** [TOOL] [DECISION] [WIN]

---

### Phase 5: Marketing Automation Skills (2025-01-10)

**Context:** Needed repeatable processes for content creation, not one-off asks. Built skills that automate entire workflows.

**What was built:**

1. **Blog Writer Skill**
   - [TOOL] Created `/.claude/skills/blog-writer/SKILL.md`
   - 5-phase automated workflow: Keyword Research → Competitive Analysis → Brief → Content → Quality Control
   - Integrates with SEO Research MCP for keyword data
   - Outputs to `/blog-articles/{slug}/` in MD, DOCX, HTML formats
   - [WIN] "Write a blog about X" → full SEO-optimized article

2. **Keyword Research Skill**
   - [TOOL] Created `/.claude/skills/keyword-research/SKILL.md`
   - Finds keyword opportunities, question keywords, competitive gaps
   - Outputs research report to `/research/keywords/`
   - [DECISION] Run keyword research BEFORE blog writing for better results

3. **Branded Deck Skill**
   - [TOOL] Created `/.claude/skills/branded-deck/SKILL.md`
   - Creates code:zero branded presentations
   - Applies brand colors, typography, layouts
   - Outputs PPTX files

4. **Branded Social Visual Skill**
   - [TOOL] Created `/.claude/skills/branded-social-visual/SKILL.md`
   - Creates Instagram posts, stories, banners
   - Dark tech aesthetic with neon accents
   - Outputs to `/social-media/`

5. **System Skills**
   - `learn` — Auto-captures corrections and preferences
   - `close` — Auto-saves session on goodbye
   - `last` — Retrieves previous session context

**Lesson:** [LESSON] Skills are reusable workflows. Instead of explaining the process each time, you encode it once and invoke it by name. The AI follows the same steps every time.

**Lesson:** [LESSON] The power is in chaining: keyword research → feeds blog writer → applies brand voice → outputs multiple formats. Each step builds on the last.

**Tags:** [TOOL] [WIN]

---

### Phase 6: Enterprise Sales Materials (2025-01-10)

**Context:** Needed B2B sales materials for enterprise course. Created from terminal without designers or copywriters.

**What was built:**

1. **Enterprise One-Pager**
   - [TOOL] Created `/enterprise/one-pager.md`
   - Problem → Solution → Outcomes → What's Included → Pricing
   - HRDF claimable highlighted (Malaysia tax incentive)
   - Leave-behind for corporate prospects

2. **Taster Session Outline**
   - [TOOL] Created `/enterprise/taster-session-outline.md`
   - Free 1-hour workshop to demonstrate value
   - Agenda, demo structure, close technique
   - [DECISION] Free taster = lower risk for enterprise buyers

3. **Enterprise Insights**
   - [LESSON] Enterprise day rates are $1,000-3,500/day — pricing at $2,700/day is competitive
   - [LESSON] HRDF is a "cheat code" for Malaysian market — training becomes "free"
   - [LESSON] No case studies = no enterprise deals. Consumer builds proof for enterprise.

**Lesson:** [LESSON] B2B sales materials follow predictable patterns. Problem → Solution → Proof → Price → CTA. AI can generate these quickly if you provide the inputs.

**Tags:** [TOOL] [DECISION] [WIN]

---

### Phase 7: Agent Routing System (2025-01-10)

**Context:** Had multiple agents and skills, but no clear rules for when to use which. Created routing documentation.

**What was built:**

1. **Agent Routing Rules**
   - Added "Agent Routing (WHEN TO DELEGATE)" section to CLAUDE.md
   - Documented 2 top-level agents + 5 think-harder sub-agents
   - Trigger phrases for each agent
   - Decision tree for agent selection

2. **Agent vs Skill Distinction**
   - [DECISION] Agents = autonomous workers with specialized expertise (spawn via Task tool)
   - [DECISION] Skills = workflows with defined steps (invoke directly)
   - Created lookup tables for quick reference

3. **Automatic Triggers**
   - Content strategy → content-strategist agent
   - Transform to slides → presentation-specialist agent
   - Complex tasks → think-harder pipeline activates automatically

**Lesson:** [LESSON] Routing rules prevent decision fatigue. Instead of "which agent should I use?", the system knows based on trigger phrases. Document the routing once, follow it forever.

**Tags:** [DECISION] [WIN]

---

### Phase 8: Syllabus Auto-Documentation System (2025-01-10)

**Context:** Realized the way I built code:zero IS the curriculum. The terminal-first, AI-augmented approach is exactly what students need to learn. But manual documentation creates friction and gets skipped.

**What was built:**

1. **Syllabus Folder Structure**
   - Created `/syllabus/` folder
   - `built-from-terminal.md` — Master narrative (this file)
   - `/lessons/` — For extracted teachable modules

2. **Automatic Documentation Rules**
   - Added to CLAUDE.md: auto-document on tool usage, decisions, problems solved, wins, mistakes
   - [DECISION] Single master file over modular lessons — compounding context makes AI smarter
   - [DECISION] Chronological to show cause → effect
   - Silent by default — don't announce every entry

3. **Backfill Process**
   - Reconstructed Phases 1-7 from session logs, memory files, and artifacts
   - [WIN] Complete journey documented without manual effort

**Lesson:** [LESSON] The best curriculum comes from documenting real work as it happens, automatically. Let AI do the recording while humans do the building.

**Lesson:** [LESSON] A single master document with compounding context is more valuable than modular files. The AI sees how decisions connect across time.

**Tags:** [TOOL] [DECISION] [WIN]



---

## Entry Template

Use this format for new entries:

```markdown
### YYYY-MM-DD: [Title]

**Context:** What was happening, what problem needed solving

**What I did:**
- Step by step, tools used, commands run

**What happened:**
- Results, surprises, issues

**Lesson:** [LESSON] The teachable insight

**Tags:** [TOOL] [DECISION] [MISTAKE] [WIN]
```

---

## Ongoing Entries

<!-- New entries added below as work happens. The Phases above document the major milestones. Entries here capture day-to-day work. -->

### 2025-01-10: Backfilled Complete Journey

**Context:** Syllabus system was created but only had placeholder phases. Needed to reconstruct what was actually built.

**What I did:**
- Read session logs (`/sessions/2025-01-10-*.md`)
- Read memory files (`/.claude/memory/business-context.md`)
- Read brand documents (`/brand/design-system.md`, `/brand/content-system.md`)
- Read skill files (`/.claude/skills/*/SKILL.md`)
- Synthesized into 8 comprehensive phases

**What happened:**
- [WIN] Complete journey documented: 8 phases covering workspace setup, business strategy, intelligence system, brand, marketing automation, enterprise sales, agent routing, and syllabus system
- Each phase has: context, what was built, lessons learned, tags
- 20+ `[LESSON]` markers ready for curriculum extraction

**Lesson:** [LESSON] Backfilling from artifacts works. If you have the files, you can reconstruct the story. Session logs + memory files + created documents = full context recovery.

**Tags:** [WIN]

---

### 2025-01-10: Designed Week 1 Syllabus

**Context:** Needed to create the first week curriculum for Full Stack Web Development. The goal: wow students from Day 1 by having them ship something real before lunch.

**What I did:**
- Created `/syllabus/overview.md` — course philosophy and structure
- Created `/syllabus/week-1/index.md` — week overview and daily outcomes
- Created 5 detailed day plans:
  - Day 1: Ship Before Lunch (SvelteKit + Vercel deploy)
  - Day 2: Users Are Real (Supabase auth + database)
  - Day 3: Build the Thing (core feature CRUD)
  - Day 4: AI Does the Work (Gemini/ChatGPT integration)
  - Day 5: Demo Day Zero (present to cohort)

**What happened:**
- [DECISION] "Ship before lunch on Day 1" — forces immediate wins, breaks fear barrier
- [DECISION] Free AI stack first (Gemini, ChatGPT) then Claude — accessibility over premium
- [DECISION] Demo Day Zero on Day 5 — validates that everyone shipped, creates accountability
- [DECISION] File structure: week folders with day files — easy to update, easy to reference
- Each day has: schedule, learning blocks, code examples, troubleshooting guide, homework

**Lesson:** [LESSON] The wow factor comes from immediate tangible results. Day 1 isn't about learning—it's about proving they can ship. Everything else builds on that confidence.

**Lesson:** [LESSON] Syllabi work best when each day has clear deliverables. Not "learn about X" but "ship Y." Students need to see progress.

**Lesson:** [LESSON] Demo Days create social accountability. If you know you're presenting Friday, you can't coast on Wednesday.

**Tags:** [TOOL] [DECISION] [WIN]

---

### 2025-01-10: Rewrote Week 1 as AI-First Curriculum

**Context:** Initial Week 1 started with "deploy a website before lunch" — traditional bootcamp approach. User corrected: Day 1 should teach students how to set up AI agent workspaces, create skills, and use AI to build everything else. This is the meta-skill.

**What changed:**

1. **Day 1: Your AI Agent Workspace**
   - [DECISION] Teach CLAUDE.md and skills FIRST
   - Students create blog-writer skill on Day 1
   - Output: Configured AI workspace + first AI-generated content
   - [WIN] This is how code:zero was actually built — students learn the real workflow

2. **Day 2: AI Builds Your Product**
   - Students use their workspace to build the website
   - Claude writes the code, students direct
   - Landing page skill created as reusable pattern
   - [DECISION] "You direct, AI writes" is the core teaching

**New Week 1 Arc:**
| Day | Title | Core Teaching |
|-----|-------|---------------|
| 1 | AI Agent Workspace | CLAUDE.md + Skills = AI that knows your project |
| 2 | AI Builds Your Product | Directing AI to build websites |
| 3 | Users Are Real | Auth + database (AI-assisted) |
| 4 | AI Does the Work | AI features in the product |
| 5 | Demo Day Zero | Present what you built |

**Lesson:** [LESSON] The meta-skill isn't "how to code" — it's "how to build with AI." Teach the system first, then use the system to build everything else.

**Lesson:** [LESSON] Day 1 sets the mental model. If Day 1 is "write code," students think the course is about coding. If Day 1 is "set up AI workspace," students think the course is about building systems. The second is more valuable.

**Tags:** [DECISION] [WIN]

---

### Phase 9: Database & AI Infrastructure (2026-01-10)

**Context:** Needed to bridge the gap between the local AI workspace and the remote database. The goal: allow AI agents to interact directly with Supabase to manage data, buckets, and edge functions.

**What was built:**

1. **Supabase CLI Installation**
   - [TOOL] Installed `supabase` CLI via Homebrew (`brew install supabase/tap/supabase`)
   - [DECISION] Initialized Supabase locally (`supabase init`) to manage migrations and config
   - [LESSON] Global npm installation of Supabase CLI is deprecated; use Homebrew or direct binary instead.

2. **MCP Server Integration**
   - [TOOL] Configured Supabase MCP server URL in `.gemini/settings.json`
   - URL: `https://mcp.supabase.com/mcp?project_ref=pwwebxuyagtounoilmnx`
   - [DECISION] Using the remote MCP server allows agents to query the database without needing local Postgres running.
   - [WIN] AI can now "see" the database schema and perform operations directly.

3. **Schema Push**
   - [TOOL] Used `drizzle-kit push` to sync the local schema (`src/lib/server/db/schema.ts`) to the remote Supabase database.
   - [WIN] Database now has `user`, `account`, `session`, `verificationToken`, `authenticator` tables ready for Auth.js.

**Lesson:** [LESSON] MCP (Model Context Protocol) is the "USB port" for AI agents. By connecting Supabase as an MCP server, the AI gains direct access to the database, making it a much more powerful collaborator.

**Lesson:** [LESSON] Use the official Supabase CLI for infrastructure management. It handles everything from local development to remote deployments and linking projects.

**Tags:** [TOOL] [DECISION] [WIN]

---

<!-- Continue adding entries chronologically -->
