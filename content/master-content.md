# Built From Terminal

> How I built code:zero entirely from the command line using AI agents, modern tools, and a ship-first mentality.

This document captures the complete journey of building a real business from the terminal—every decision, tool, mistake, and breakthrough. It's raw, it's real, and it's everything I learned shipping an AI-first coding academy.

**What this covers:**
- Technical build (SvelteKit, Supabase, Cloudflare)
- AI infrastructure (Claude Code, MCP servers, multi-agent systems)
- Full business operations (marketing, email automation, content systems)
- Business admin (SSM registration, domains, payments)
- Lessons learned (the expensive ones)

**Who this is for:**
- Founders who want to build without a team
- Developers adopting AI-first workflows
- Anyone curious how to run a business from the terminal

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

### Phase 10: Social Media Automation System (2026-01-10)

**Context:** Needed a way to create and schedule Instagram content without leaving the terminal. Manual posting breaks flow and doesn't scale.

**What was built:**

1. **Queue-Based Architecture**
   - [TOOL] Created `/social-media/queue/` — pending posts awaiting approval
   - [TOOL] Created `/social-media/posted/` — archive of sent content
   - [TOOL] Created `/social-media/failed/` — posts that failed (for debugging)
   - [DECISION] YAML format for post metadata — human-readable, version-controlled
   - [WIN] All social content lives in git, fully auditable

2. **Instagram Queue Skill**
   - [TOOL] Created `/.claude/skills/instagram-queue/SKILL.md`
   - View pending posts, approve content, validate queue files
   - Prepares batches for automated posting via n8n
   - [LESSON] Never auto-post — always human approval in the loop

3. **Instagram Content Generator Skill**
   - [TOOL] Created `/.claude/skills/instagram-content-generator/SKILL.md`
   - Generates captions using brand voice
   - Creates graphics using branded-social-visual skill
   - Outputs complete post packages ready for queue

4. **n8n Integration**
   - [DECISION] Claude Code creates content, n8n handles scheduling/posting
   - Separation of concerns: AI for creativity, automation for execution
   - [LESSON] Don't make AI do what cron jobs do better

**Lesson:** [LESSON] Content creation and content distribution are different problems. AI excels at creation. Automation tools excel at scheduling. Don't conflate them.

**Lesson:** [LESSON] Queue systems with human approval prevent AI from posting garbage. The friction is a feature, not a bug.

**Tags:** [TOOL] [DECISION] [WIN]

---

### Phase 11: Authentication & User System (2026-01-10)

**Context:** Needed real users in the database with proper authentication. Building on SvelteKit + Supabase stack.

**What was built:**

1. **Database Schema**
   - [TOOL] Used Drizzle ORM for type-safe schema definition
   - Tables: user, account, session, verificationToken, authenticator
   - [DECISION] Auth.js compatible schema — battle-tested patterns
   - [MISTAKE] Initially forgot to disable prepared statements for Supabase pooler

2. **Google OAuth Login**
   - [TOOL] Created branded `/login` page with Google Sign-In
   - [DECISION] Google OAuth first — lowest friction for users
   - Styled to match code:zero brand (dark theme, green accents)
   - [WIN] One-click signup eliminates password friction

3. **Supabase Pooler Fix**
   - [MISTAKE] Database queries failed with "prepared statement already exists"
   - [TOOL] Fixed in `src/lib/server/db/index.ts` — `prepare: false` for Neon adapter
   - [LESSON] Supabase Transaction Pooler doesn't support prepared statements. Must disable them.

4. **Navigation Updates**
   - Updated all "Apply Now" buttons site-wide to route to `/login`
   - [WIN] Clear user journey: see course → click apply → sign in → enrolled

**Lesson:** [LESSON] Connection poolers (PgBouncer, Supabase Pooler) break prepared statements. Always check if your database proxy supports them before debugging for hours.

**Lesson:** [LESSON] OAuth > passwords for MVPs. Less code, better UX, fewer security headaches.

**Tags:** [TOOL] [DECISION] [MISTAKE] [WIN]

---

### Phase 12: Curriculum Expansion & Enterprise Courses (2026-01-11)

**Context:** Needed to expand beyond the consumer course. Built Week 2 curriculum and a premium enterprise offering.

**What was built:**

1. **Week 2 Learning Portal**
   - Created 5 additional day pages (day-6 through day-10)
   - Svelte pages mirror the syllabus structure
   - [DECISION] Website auto-syncs with syllabus folder structure
   - Added Phase 6 to course-builder skill: automatic website sync

2. **CEO AI Command Center Course**
   - [TOOL] Premium enterprise offering — RM 7,800, 5-hour intensive
   - Target: CEOs/executives who want AI leverage without technical skills
   - [DECISION] Executives don't want to code — they want results
   - [WIN] Higher margin, shorter delivery, different market segment

3. **Course Package Contents**
   - Full facilitator guide with 5 training blocks
   - 4 AI agent skill templates (daily briefing, competitive intel, board prep, email ghostwriter)
   - 4 n8n workflow guides (Zoom→Slack, email triage, news digest, document analyzer)
   - CEO AI Playbook template + quick reference cheatsheet
   - Hands-on exercises for each block
   - [LESSON] Enterprise courses need more supporting materials — templates, checklists, reference guides

4. **Course Naming**
   - [DECISION] Renamed "Ship Sprint" to "Full Stack Web Development"
   - More descriptive, better SEO, clearer value proposition
   - Updated across website and database seed

**Lesson:** [LESSON] Enterprise training isn't about teaching — it's about enabling. Executives want templates they can use Monday morning, not theory they'll forget by lunch.

**Lesson:** [LESSON] One curriculum, multiple products. The same AI skills taught differently for developers vs executives.

**Tags:** [TOOL] [DECISION] [WIN]

---

### Phase 13: Business Registration & Admin (2026-01-12)

**Context:** Needed to make the business official. SSM registration, domain setup, payment infrastructure.

**What was built:**

1. **SSM Registration (Malaysia)**
   - [TOOL] Registered with SSM (Suruhanjaya Syarikat Malaysia)
   - Business name: "code zero"
   - MSIC code: 85499 (Other Education)
   - [DECISION] Sole proprietorship for speed — can convert to Sdn Bhd later
   - [WIN] Legally operating in under a day

2. **Domain Strategy**
   - [DECISION] codezero.my — .my domain for Malaysian market trust
   - [TOOL] Exabytes for domain purchase (Malaysian registrar for .my)
   - [TOOL] Cloudflare for DNS management and CDN
   - [LESSON] .my domains must be bought from Malaysian registrars, but DNS can be anywhere

3. **Deployment Stack**
   - [DECISION] Cloudflare Pages for SvelteKit deployment
   - Free tier, global CDN, automatic deployments from git
   - [TOOL] Cloudflare + Supabase + SvelteKit = modern full-stack
   - [LESSON] Vercel is great but Cloudflare Pages is free and just as fast

4. **Financial Documentation**
   - [TOOL] Committed SSM payment receipt to `/financial-documents/`
   - [DECISION] Keep all business documents in git — auditable, searchable, backed up
   - [LESSON] Version control isn't just for code — it's for your entire business

**Lesson:** [LESSON] Business registration is faster than you think. SSM online takes hours, not weeks. Don't let paperwork be an excuse.

**Lesson:** [LESSON] Your git repo can be your entire business filing system. Receipts, contracts, documents — all version-controlled.

**Tags:** [TOOL] [DECISION] [WIN]

---

### Phase 14: Autonomous Email Marketing System (2026-01-12)

**Context:** Wanted email campaigns that write themselves. Not templates — actual AI-generated campaigns based on business events and schedules.

**What was built:**

1. **Database Schema for Automation**
   - [TOOL] Added 5 new tables to Supabase:
     - `intakes` — course cohorts with dates and capacity
     - `userEvents` — behavioral triggers (signup, purchase, abandon)
     - `campaignBriefs` — AI-generated campaign specs
     - `aiGenerationLogs` — audit trail of AI outputs
     - `emailPatterns` — learned patterns from successful campaigns
   - [DECISION] Store everything — can't improve what you don't measure

2. **Trigger System**
   - Scheduled triggers: daily 9am (tips), weekly Monday (roundup), pre-intake reminders
   - Event triggers: welcome series, cart abandonment, milestone celebrations
   - [TOOL] n8n handles scheduling, Claude API handles generation
   - [DECISION] Triggers create briefs, briefs become emails, emails get reviewed

3. **AI Generation Pipeline**
   - Brief → Claude API → Draft with confidence score
   - Confidence < 0.7 → flags for human review
   - [DECISION] AI proposes, human approves — no auto-send
   - [LESSON] Confidence scoring lets AI self-triage its uncertainty

4. **Pattern Learner**
   - Analyzes sent campaigns for open rates, click rates
   - Extracts patterns from winners (subject lines, send times, content types)
   - Feeds patterns back into generation prompts
   - [WIN] System gets smarter over time without manual tuning

5. **Admin Review Queue**
   - UI shows AI-generated campaigns pending approval
   - One-click approve or reject with feedback
   - Rejections feed back into learning
   - [LESSON] The review queue is the training interface

**Lesson:** [LESSON] Autonomous doesn't mean unsupervised. The best AI systems propose actions and wait for approval. Remove the human from the loop only after trust is established.

**Lesson:** [LESSON] Every rejection is training data. Build feedback loops into AI systems from day one.

**Tags:** [TOOL] [DECISION] [WIN]

---

### Phase 15: Browser Automation & MCP Ecosystem (2026-01-12)

**Context:** Some tasks require a browser — OAuth flows, admin panels, third-party integrations. Wanted AI to handle these too.

**What was built:**

1. **Chrome MCP Integration**
   - [TOOL] Claude-in-Chrome extension for browser automation
   - AI can navigate, click, type, screenshot — full browser control
   - [WIN] Set up Brevo account entirely through AI browser control

2. **Brevo Email Integration**
   - [TOOL] Transactional email service (300 free/month)
   - Logged into Brevo via Google OAuth using browser automation
   - Generated API key "code-zero-transactional"
   - Added `BREVO_API_KEY` to environment
   - [DECISION] Brevo for transactional (receipts, confirmations), later add marketing

3. **MCP Server Ecosystem**
   - [TOOL] Supabase MCP — AI queries database directly
   - [TOOL] Brevo MCP — AI sends emails directly
   - [TOOL] SEO Research MCP — AI does keyword research directly
   - [TOOL] Chrome MCP — AI controls browser directly
   - [WIN] AI has direct access to all business systems

4. **OAuth vs Token Authentication**
   - [DECISION] Remote MCP servers (Supabase, etc.) use OAuth — simpler, no token management
   - Local MCP servers use tokens — faster, no network hop
   - [LESSON] OAuth for remote services, tokens for local services

5. **Security Cleanup**
   - [MISTAKE] Accidentally committed API keys in `.gemini/settings.json`
   - [TOOL] Added to `.gitignore`, removed from git tracking
   - [LESSON] Always `.gitignore` config files that might contain secrets

**Lesson:** [LESSON] MCP turns AI from "assistant" to "operator." With database, email, browser, and search access, AI can execute — not just suggest.

**Lesson:** [LESSON] Browser automation unlocks everything web-based. OAuth flows, admin panels, dashboards — anything you can click, AI can click.

**Tags:** [TOOL] [DECISION] [MISTAKE] [WIN]

---

### Phase 16: Student Onboarding Automation (2026-01-12)

**Context:** Creating students manually was tedious. Wanted automatic credential emails when admins create student accounts.

**What was built:**

1. **Auto-Email on Student Creation**
   - [TOOL] Integrated Brevo API into student creation flow
   - When admin creates student → automatic welcome email with credentials
   - [DECISION] Transactional email, not marketing — immediate delivery
   - [WIN] Admin creates account, student gets email, zero manual steps

2. **Student Portal Fixes**
   - [MISTAKE] Course cards were overlapping on student dashboard
   - Fixed CSS grid/flex issues for proper card layout
   - [LESSON] Always test responsive layouts — they break in unexpected ways

**Lesson:** [LESSON] Every manual step is a scaling bottleneck. If you do it more than twice, automate it.

**Tags:** [TOOL] [WIN] [MISTAKE]

---

## The Tech Stack

Everything I used to build code:zero from the terminal:

### Core Development
| Tool | Purpose | Why I Chose It |
|------|---------|----------------|
| **SvelteKit** | Frontend framework | Fast, simple, great DX |
| **Supabase** | Database + Auth | Postgres with superpowers, generous free tier |
| **Drizzle ORM** | Database queries | Type-safe, SQL-like, no magic |
| **Cloudflare Pages** | Hosting | Free, fast, automatic deploys |

### AI Infrastructure
| Tool | Purpose | Why I Chose It |
|------|---------|----------------|
| **Claude Code** | AI terminal assistant | Best coding AI, runs locally |
| **Supabase MCP** | Database access for AI | AI queries DB directly |
| **Brevo MCP** | Email access for AI | AI sends emails directly |
| **Chrome MCP** | Browser control for AI | AI handles OAuth, admin tasks |
| **SEO Research MCP** | Keyword research | AI does SEO research directly |

### Automation
| Tool | Purpose | Why I Chose It |
|------|---------|----------------|
| **n8n** | Workflow automation | Self-hosted, visual, powerful |
| **Brevo** | Transactional email | 300 free/month, good deliverability |

### Business Admin
| Tool | Purpose | Why I Chose It |
|------|---------|----------------|
| **Exabytes** | .my domain registration | Required for Malaysian domains |
| **Cloudflare** | DNS + CDN | Free tier, great performance |
| **SSM Online** | Business registration | Official Malaysian portal |

---

## Key Lessons (The Expensive Ones)

### On AI-First Development

1. **AI workspace setup is day zero.** CLAUDE.md + skills + memory = AI that actually knows your project.

2. **Multi-agent beats single-pass.** Research → Generate → Critique → Revise catches issues single-pass misses.

3. **MCP is the unlock.** Database + email + browser + search access transforms AI from assistant to operator.

4. **Autonomous ≠ unsupervised.** Best pattern: AI proposes, human approves. Remove human only after trust.

### On Building Fast

5. **Ship before lunch on day one.** Immediate wins build momentum. Theory doesn't.

6. **OAuth > passwords for MVPs.** Less code, better UX, fewer security headaches.

7. **Every manual step is a scaling bottleneck.** If you do it twice, automate it.

8. **Connection poolers break prepared statements.** Hours of debugging in one sentence.

### On Business Operations

9. **Git is your filing cabinet.** Receipts, contracts, documents — all version-controlled.

10. **Business registration is faster than you think.** SSM online takes hours, not weeks.

11. **.my domains need Malaysian registrars.** But DNS can be anywhere (Cloudflare).

12. **Enterprise training needs templates.** Executives want tools they can use Monday morning.

### On Content & Marketing

13. **Creation and distribution are different problems.** AI for creativity, automation for scheduling.

14. **Queue systems with human approval prevent disasters.** The friction is a feature.

15. **Every rejection is training data.** Build feedback loops from day one.

---

## What's Next

- [ ] Cloudflare Pages deployment (production launch)
- [ ] codezero.my domain setup
- [ ] Custom email domain in Brevo (better deliverability)
- [ ] Payment integration (Stripe? Local options?)
- [ ] First intake enrollment open

---

<!-- Continue adding entries chronologically -->
