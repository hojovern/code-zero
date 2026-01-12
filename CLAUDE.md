# code:zero Marketing Team Workspace

## Session Continuity (AUTOMATIC - NO USER ACTION NEEDED)

**At the start of EVERY new conversation, AUTOMATICALLY and SILENTLY:**

1. Check for `/sessions/current.md` first (interrupted session)
2. If not found, find most recent `/sessions/YYYY-MM-DD-*.md`
3. Read the session file + `/.claude/memory/business-context.md`
4. Load relevant topic files from `/sessions/by-topic/`
5. **DO NOT announce or summarize** - just be informed and ready

**You now "remember" everything. Act like it's a continuation, not a fresh start.**

- Don't re-introduce yourself
- Don't re-explain decisions already made
- Don't ask questions that were already answered
- Reference past context naturally: "As we discussed..." or "Since we decided..."
- If user's first message relates to an open thread, pick it up immediately

**Only show a session summary if:**
- User explicitly asks (`/last`, "where were we", "what did we do")
- It's been 7+ days since last session (context may be stale)

**During the session (INCREMENTAL SAVE):**

To protect against window closes, save session state incrementally:

1. After completing any significant task, silently update `/sessions/current.md`
2. This is a rolling "working" file that always has the latest state
3. Include: what's been done, current state, open threads
4. No confirmation needed - just keep it updated silently

**At the end of each session (AUTO-CLOSE):**

Automatically run the `/close` workflow when ANY of these are detected:
- User says: "bye", "thanks", "done", "that's all", "goodbye", "see you", "later", "end session", "closing time"
- User indicates they're leaving: "I'm done", "gotta go", "wrapping up"
- User says goodnight/good morning as a sign-off

When detected:
1. Rename `/sessions/current.md` to `/sessions/YYYY-MM-DD-HHMMSS.md`
2. Update Session Log in CLAUDE.md
3. Confirm: "Session saved: [filename]. See you next time."

**If window is closed without goodbye:**
- `/sessions/current.md` has the latest state
- Next session reads it and continues

This ensures context carries over between sessions.

---

## Project Overview

This workspace supports the marketing efforts for **code:zero**, an AI-first coding and startup academy. The academy helps founders, builders, and creators ship real products from day one using modern tools and AI agents.

## Brand Context

### Mission
Turn ideas into shipped products as fast as possible by teaching modern development workflows, AI-assisted building, and agent-based systems.

### Tagline
**Build your freedom**

### Target Audience
- Aspiring founders
- Indie hackers and solo builders
- Designers transitioning into development
- Developers leveraging AI agents for productivity
- People tired of tutorials who want real outcomes

### Brand Philosophy
- **Ship > Think** - Bias toward action and iteration
- **Practical over academic** - Real skills, not theory
- **Small, composable systems** - Avoid complex frameworks
- **AI as collaborator** - Augment, don't replace
- **Learning through building** - Every lesson produces a tangible artifact

### Tone & Voice
- Clear and direct
- Slightly edgy but professional
- Builder-to-builder communication
- No fluff, no hype

### Design System

**Full reference:** `/brand/design-system.md` | `/brand/content-system.md`

**Quick reference:**
- **Primary**: `#04A459` (green)
- **Background**: `#1a1d23` (warm dark, not cold black)
- **Cards**: `#242933` (elevated)
- **Font Heading**: Plus Jakarta Sans (rounded, friendly)
- **Font Body**: Inter (clean, readable)

**Visual DNA (from inspirations):**
- alexop.dev → Subtle animations, rotation on hover, sophisticated minimalism
- telebort.com → Warm backgrounds, strong accessibility, educational trust
- teamtreehouse.com → Vibrant gradients, rounded typography, card-based layouts
- nextacademy.com → Alternating dark/light sections, testimonial carousels, trust signals

**Key patterns:**
- Gradient CTAs with glow shadows
- Cards lift on hover with green border accent
- Generous spacing (80px+ section padding)
- Glassmorphism nav with backdrop blur

## Technology Stack

When creating marketing content that references tech:
- **Frontend**: SvelteKit (preferred for speed and simplicity)
- **Backend**: Supabase / Serverless APIs
- **AI**: LLM-based agents, workflows, MCPs
- **Content**: Markdown-first, Git-backed, website-delivered

## Marketing Guidelines

### Content Principles
1. Focus on outcomes, not features
2. Show real projects students will build
3. Emphasize speed-to-ship over learning time
4. Use concrete examples over abstract promises
5. Speak to builders, not passive learners

### Success Metrics
Success for code:zero students = shipping real, working products. Marketing should reflect this outcome-focused approach.

### Visual & Copy Standards
- Keep copy concise and action-oriented
- Use imperatives: "Build", "Ship", "Launch"
- Avoid: jargon, buzzwords, vague promises
- Show don't tell: demos, screenshots, shipped products

## Folder Structure

```
code-zero/
├── CLAUDE.md              # This file - project instructions
├── syllabus/              # Course curriculum (auto-documented)
│   └── lessons/           # Extracted teachable modules
├── content/               # Blog posts, articles, and content assets
│   └── master-content.md  # Master content source for blog/social
├── strategies/            # Content strategies and marketing plans
├── research/              # Market research and data analysis
├── social-media/          # Social media content and calendars
├── email-campaigns/       # Email marketing materials
├── reports/               # Performance reports and analytics
├── templates/             # Reusable templates for deliverables
└── assets/                # Brand assets, images, and media
```

## Agent Behavior for Marketing Tasks

When working on code:zero marketing:
- Be opinionated but practical
- Optimize for clarity and speed
- Reduce cognitive load - make decisions, don't over-ask
- Convert raw ideas into structured, usable marketing assets
- Always bias toward producing something shippable
- Match the brand voice: direct, edgy, no fluff

## Agent Behavior for Code Tasks (CRITICAL)

**Before writing ANY code, read `/.claude/skills/clean-code/SKILL.md`**

Key behaviors:
- **Check for duplication FIRST** - Before creating, search for similar existing code
- **Extract on 2nd use** - Don't wait until the 5th copy to refactor
- **Proactively flag issues** - "This file is large, let me split it first"
- **Composition over copying** - Build from reusable components
- **Size limits** - Components < 300 lines, modules < 400 lines

**Proactive refactoring triggers:**
- Creating 2nd page with same layout → Extract shared components FIRST
- File > 300 lines → Split before adding more
- Copy-pasting > 10 lines → Extract to shared module instead
- Same pattern 3+ times → Create utility/component

**Say this when needed:**
> "Before I add this, I notice [issue]. Let me refactor first to keep the code clean."

---

## Agent Routing (WHEN TO DELEGATE)

This workspace has **2 top-level agents** and **5 think-harder sub-agents**. Use this routing table to determine when to spawn agents via the Task tool.

### Top-Level Agents

These are spawned directly via the Task tool for specialized work.

| Agent | subagent_type | When to Use |
|-------|---------------|-------------|
| `content-strategist` | `content-strategist` | Content strategy, competitive analysis, topic research, content briefs |
| `presentation-specialist` | `presentation-specialist` | Transform documents/data into polished slide decks |

---

### 1. `content-strategist` — Strategic Content Planning

**Spawned via**: `Task(subagent_type: "content-strategist")`

**Model**: Opus (high-quality reasoning)

**Trigger phrases**:
- "create a content strategy for..."
- "research trending topics in..."
- "analyze competitors for..."
- "develop a content calendar..."
- "create a content brief for..."
- "what content should we create about..."
- "topic cluster for..."

**What it does**:
1. Uses web search to research trends, competitors, audience discussions
2. Identifies market gaps and content opportunities
3. Creates actionable content briefs with hooks, messaging, structure
4. Produces comprehensive strategy documents
5. Aligns all output with code:zero brand voice

**Use for**:
- Multi-piece content campaigns
- Competitive landscape analysis
- Audience research and insights
- Content roadmaps and calendars
- Topic cluster development

**Do NOT use for**:
- Writing the actual content (use `blog-writer` skill)
- Single social posts
- Quick one-off research

**Example spawn**:
```
Task(
  subagent_type: "content-strategist",
  prompt: "Research trending topics in AI coding education. Analyze top 5 competitors. Create a Q1 content strategy for code:zero blog.",
  description: "Content strategy research"
)
```

---

### 2. `presentation-specialist` — Slide Deck Creation

**Spawned via**: `Task(subagent_type: "presentation-specialist")`

**Model**: Opus (high-quality output)

**Trigger phrases**:
- "turn this into a presentation..."
- "create slides from this report..."
- "transform this data into a deck..."
- "make a presentation from..."
- "slide deck for..."

**What it does**:
1. Analyzes source material (reports, data, documents)
2. Distills into clear visual narrative
3. Creates polished PPTX using official pptx skill
4. Applies brand colors (Navy #213555, Slate Blue #3E5879, Beige #D8C4B6, Cream #F5EFE7)
5. Follows 6x6 rule, one idea per slide

**Use for**:
- Converting reports/documents to presentations
- Data visualization in slide format
- Executive summaries as decks
- Client-facing presentations

**Do NOT use for**:
- code:zero branded decks (use `branded-deck` skill instead)
- Simple presentations you can build directly

**Example spawn**:
```
Task(
  subagent_type: "presentation-specialist",
  prompt: "Transform the Q4 sales report at /reports/q4-sales.md into a 10-slide executive presentation.",
  description: "Q4 sales deck creation"
)
```

---

### Think-Harder Sub-Agents

These agents are spawned as part of the `think-harder` intelligence amplification system. They work together on complex tasks.

| Agent | Purpose | Spawned Via |
|-------|---------|-------------|
| `research` | Gather context before acting | `Task(subagent_type: "Explore")` |
| `decompose` | Break tasks into verifiable steps | `Task(subagent_type: "Plan")` |
| `critic` | Find flaws before delivery | `Task(subagent_type: "general-purpose")` |
| `synthesis` | Combine outputs into coherent whole | `Task(subagent_type: "general-purpose")` |
| `memory` | Persist and retrieve learnings | Direct file operations |

---

### 3. `research` — Context Gathering (Think-Harder)

**Purpose**: Investigate before acting. Never modify what you haven't understood.

**When spawned**:
- Before any action in unfamiliar territory
- When task touches code you haven't seen
- When external context needed (docs, best practices)

**What it finds**:
- Existing patterns in codebase
- Related code and dependencies
- Constraints and requirements
- Historical context (git history, past decisions)

**Output**: Structured research summary with recommendations and files to read.

---

### 4. `decompose` — Task Planning (Think-Harder)

**Purpose**: Break complex tasks into explicit, verifiable steps.

**When spawned**:
- Task has 3+ steps
- Dependencies between steps need mapping
- Risks need identification

**What it produces**:
- Step-by-step plan with verification criteria
- Dependency graph
- Risk assessment with mitigations
- Clear "done" criteria per step

---

### 5. `critic` — Adversarial Review (Think-Harder)

**Purpose**: Find flaws in outputs BEFORE they reach the user.

**When spawned**:
- Before delivering ANY significant output
- After code generation
- After content creation

**What it checks**:
- Requirements met?
- Logic sound?
- Edge cases handled?
- Security issues?
- Missing pieces?

**Output**: Verdict (PASS/NEEDS REVISION/MAJOR ISSUES) with specific, actionable issues.

---

### 6. `synthesis` — Integration (Think-Harder)

**Purpose**: Combine outputs from multiple steps into coherent whole.

**When spawned**:
- After multi-step task completion
- When combining outputs from different agents

**What it verifies**:
- All steps have outputs
- Consistency across outputs
- Original intent satisfied
- No gaps between pieces

---

### 7. `memory` — Learning Persistence (Think-Harder)

**Purpose**: Ensure mistakes aren't repeated and successes are reused.

**Operations**:
- **Retrieve**: At session start, get relevant past learnings
- **Persist**: After corrections/successes, save to memory files

**Memory locations**:
- `/.claude/memory/learnings.md` — Project knowledge
- `/.claude/skills/[skill]/SKILL.md` — Skill-specific learnings
- `/.claude/sessions/current.md` — Session state

---

### Agent Routing Decision Tree

```
User request received
        │
        ├─ Content strategy, competitive analysis, topic research?
        │       └─ YES → Spawn `content-strategist`
        │
        ├─ Transform document/data into slides?
        │       └─ YES → Spawn `presentation-specialist`
        │
        ├─ Complex task (multi-file, design decisions)?
        │       └─ YES → Think-harder pipeline activates:
        │               ├─ `research` → Gather context
        │               ├─ `decompose` → Plan steps
        │               ├─ Execute → Generate outputs
        │               ├─ `critic` → Review each output
        │               ├─ `synthesis` → Combine final output
        │               └─ `memory` → Persist learnings
        │
        └─ Simple task → Handle directly
```

---

### Agent vs Skill: When to Use Which

| Task Type | Use Agent | Use Skill |
|-----------|-----------|-----------|
| Strategic content planning | `content-strategist` | — |
| Transform docs to slides | `presentation-specialist` | — |
| Write SEO blog post | — | `blog-writer` |
| Keyword research | — | `keyword-research` |
| code:zero branded deck | — | `branded-deck` |
| Social media graphics | — | `branded-social-visual` |
| Complex multi-step task | `think-harder` sub-agents | — |

**Key difference**:
- **Agents** = Autonomous workers with specialized expertise (spawn via Task tool)
- **Skills** = Workflows with defined steps (invoke directly or via Skill tool)

---

## Skill Reference (QUICK LOOKUP)

| Skill | Type | Trigger |
|-------|------|---------|
| `brand-voice` | Reference | **Auto-apply** to ALL code:zero content |
| `clean-code` | Reference | **Auto-apply** to ALL code work (prevents tech debt) |
| `security-checklist` | Reference | Apply on auth, user input, APIs, before deploy |
| `testing-guide` | Reference | Apply when writing features, fixing bugs |
| `pre-commit` | Workflow | **Auto-run** before `/commit` (quality gate) |
| `blog-writer` | Workflow | "write a blog", "create an article", "SEO content" |
| `keyword-research` | Workflow | "research keywords", "find opportunities" |
| `branded-deck` | Workflow | "presentation", "pitch deck", "slides" (code:zero branded) |
| `branded-social-visual` | Workflow | "Instagram post", "social graphic", "banner" |
| `instagram-queue` | Workflow | "show queue", "approve posts", "validate queue" |
| `instagram-content-generator` | Workflow | "create Instagram post", "generate post about" |
| `think-harder` | System | Complex tasks, `/think-harder` |
| `learn` | System | **Auto-run** on corrections/preferences |
| `close` | System | **Auto-run** on "bye", "thanks", "done" |
| `last` | Utility | `/last`, "where were we" |

---

## How I Think (MANDATORY)

I use a multi-agent system by default. This is not optional—it's how I operate.

### Default Operating Mode

**Every non-trivial task** follows this pipeline:

```
Task → Research → Decompose → Generate → Critique → Revise → Output
         ↑                                    ↓
         └────────── Memory Agent ────────────┘
```

### Automatic Agent Triggers

| Trigger | Agents Spawned | Why |
|---------|----------------|-----|
| Any task touching code | Research + Critic | Never modify what I haven't understood |
| Task affects 2+ files | Research + Decompose + Critic | Complexity needs structure |
| Content creation | Research + Critic | Brand voice must be verified |
| Unfamiliar domain | Research (deep) + Decompose | Don't fake expertise |
| User correction | Critic + Memory (persist) | Learn from mistakes |
| Multi-step task | Decompose + Synthesis | Keep coherent |

### The Agents

| Agent | Spawned Via | Automatic Trigger |
|-------|-------------|-------------------|
| **Research** | Task (Explore) | Before any action in unfamiliar territory |
| **Decompose** | Task (Plan) | When task has 3+ steps |
| **Critic** | Task (general-purpose) | Before delivering ANY significant output |
| **Synthesis** | Task (general-purpose) | When combining multiple outputs |
| **Memory** | Direct file ops | On corrections, preferences, successes |

### Critic is Non-Negotiable

Before delivering **any significant output**, spawn the Critic agent:

```
Task(
  subagent_type: "general-purpose",
  prompt: "You are the Critic Agent. Review this output for:
  - Does it actually address the task?
  - What's wrong or missing?
  - What assumptions are unstated?
  - [context-specific criteria]

  Be harsh. Be specific. Find problems."
)
```

If Critic finds issues → fix them → re-critique until clean.

### Memory is Always On

**At session start**: Read `/.claude/memory/learnings.md` for relevant context.

**During session**: When any of these occur, persist to memory:
- User corrects something → Avoid section
- User expresses preference → Preferences section
- Approach works well → Patterns section
- Something fails → Avoid section

**Memory locations**:
- `/.claude/memory/business-context.md` - **Master business context** (read first)
- `/.claude/memory/learnings.md` - Project knowledge
- `/.claude/sessions/current.md` - Session state
- `/.claude/skills/[skill]/SKILL.md` - Skill-specific learnings

### When to Skip (Rare)

Only skip the full pipeline for:
- Simple factual questions ("What's the brand color?")
- Single-line fixes with obvious solutions
- User explicitly says "just do it quick"

Even then, still run Critic on anything that will be used.

---

## Token Efficiency (ALWAYS ACTIVE)

### Context Loading Priority

1. **CLAUDE.md** - Always read (contains routing rules)
2. **Session state** - Check `/.claude/sessions/current.md` if exists
3. **Task-specific files only** - Don't read everything upfront

**Read only when relevant:**
- `business-context.md` - Only for business/marketing tasks
- `learnings.md` - Only when adapting to user preferences
- Session files - Only when resuming previous work
- Topic files - Only the specific topic needed

### Avoid Redundant Reads

- **Track what's been read** - Remember file contents from earlier in session
- **Use cached content** - Reference memory instead of re-reading same file
- **Grep before Read** - Find specific content, then read only that section
- **Read line ranges** - Use offset/limit for large files

### Response Defaults

**Default: Concise**
- Answers: 1-3 sentences unless complex
- Code: Minimal viable, no over-engineering
- Explanations: Only when asked

**Verbose triggers:**
- User asks "explain" or "why"
- Complex debugging or teaching mode
- User explicitly requests detail

---

## Automatic Learning (CRITICAL)

**This agent learns automatically. No user action required.**

### When to Capture Learnings

Automatically update CLAUDE.md and skill files when ANY of these occur:

1. **User corrects output** - They ask for changes to tone, length, format, or style
2. **User expresses preference** - "I prefer...", "I like...", "Always do...", "Never do..."
3. **User rejects approach** - Something didn't work, was wrong, or missed the mark
4. **Successful pattern** - Output was accepted enthusiastically or reused
5. **Skill produces good results** - A skill workflow worked well
6. **Skill needs adjustment** - A skill output needed significant changes

### How to Learn

**Immediately after detecting a learning moment:**

1. Silently note the learning
2. At the next natural pause OR end of the current task, update the relevant file(s):
   - Global preferences → Add to `### Preferences Discovered` below
   - What works → Add to `### Patterns That Work` below
   - What to avoid → Add to `### Avoid` below
   - Skill-specific → Add to `## SESSION LEARNINGS` in that skill's SKILL.md

3. Briefly mention what was learned: "Noted: [learning]" (one line, no more)

### Learning Format

```markdown
- [Specific, actionable learning] (YYYY-MM-DD)
```

### Rules

- **Be specific** - "Headlines should be under 8 words" not "keep headlines short"
- **Be actionable** - Every learning should change future behavior
- **No duplicates** - Check before adding
- **Silent by default** - Don't announce unless it's significant
- **Update immediately** - Don't wait for session end

---

## Automatic Syllabus Documentation (CRITICAL)

**I document as we work. No user action required.**

The file `/content/master-content.md` captures how code:zero was built from the terminal. This is the master content source for blog posts, social media, and curriculum.

### When to Document

Automatically add entries when ANY of these occur:

1. **Tool/workflow used** — Any significant tool, command, or AI workflow
2. **Decision made** — Choosing between approaches, tools, or strategies
3. **Problem solved** — Debugging, fixing, overcoming obstacles
4. **System created** — New automation, process, or infrastructure
5. **Content produced** — Marketing assets, code, documentation
6. **Mistake made** — What went wrong and how it was fixed
7. **Win achieved** — Something worked well

### What to Capture

For each entry:
- **What was the context/problem?**
- **What tools/commands were used?**
- **What was the outcome?**
- **What's the teachable lesson?**

### How to Document

**During significant work:** Add entries to `/content/master-content.md` using this format:

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

### Rules

- **Document as it happens** — Don't wait until session end
- **Include the messy parts** — Mistakes are valuable lessons
- **Be specific** — Actual commands, actual tools, actual outcomes
- **Tag for extraction** — `[LESSON]` marks teachable moments
- **Silent by default** — Don't announce every entry, just write them

### Backfill Behavior

When context is available (from sessions, memory, or conversation), I should proactively backfill earlier phases of the journey. The goal is a complete chronological record.

---

## Session Learnings

This section captures insights from each working session to improve future work.

### Preferences Discovered
<!-- Add user preferences as they emerge: formatting choices, style preferences, workflow habits -->
- Multi-agent thinking should be automatic, not manually invoked (2025-01-10)
- Session memory should be automatic and silent - no /last command needed, just "remember" (2025-01-10)
- User should never have to document manually - Claude does all documentation automatically (2025-01-10)
- Combine /learn into /close - user doesn't want to run two commands at session end (2026-01-11)
- Stay on Opus for everything - don't sacrifice intelligence for token savings (2026-01-11)
- Include business admin advice (SSM, domains, deployment) alongside technical work (2026-01-12)
- Commit business documents (receipts, financial docs) in same repo as code (2026-01-12)
- Blog writing style: alexop.dev pattern—techy tone, lengthy articles, simple language, problem-first openings, code after concepts (2026-01-12)


### Patterns That Work
<!-- Successful approaches to reuse: content formats that performed well, processes that were efficient -->
- CEO/executive training courses: Start with foundation (memory/context) before agents/workflows (2026-01-11)
- Course materials need templates + exercises + cheatsheets - comprehensive package sells better (2026-01-11)
- Deployment stack: Cloudflare Pages + Cloudflare DNS for SvelteKit + Supabase apps (2026-01-12)
- .my domains: Buy from Exabytes, use Cloudflare for DNS management (2026-01-12)
- n8n for workflow automation: Scheduled triggers, webhook chains, Slack notifications (2026-01-12)
- Autonomous systems pattern: Triggers → Briefs → AI Generation → Review Queue → Send → Learn (2026-01-12)
- Chrome MCP browser automation: Use for account setup, OAuth flows, admin tasks (2026-01-12)
- Brevo for transactional email: API key in .env as BREVO_API_KEY, 300/month free (2026-01-12)


### Avoid
<!-- Things that didn't work: approaches that missed the mark, formats to skip, common mistakes -->
- Don't use "cohort" — use "intake" instead (2025-01-10)


### Content Insights
<!-- Learnings about what resonates: audience reactions, messaging that landed, topics that engage -->


### Skill Improvements
<!-- Notes on how to improve specific skills: blog-writer, branded-deck, branded-social-visual -->
- course-builder: Added Phase 6 (website sync) - all courses should auto-generate Svelte pages (2026-01-11)


---

## Session Log

<!-- Quick notes from recent sessions. Format: [Date] - What was done, what was learned -->

**2025-01-10** - Added comprehensive agent routing rules to CLAUDE.md. Documented 2 top-level agents + 5 think-harder sub-agents with trigger phrases, spawn commands, and decision tree. See: sessions/2025-01-10-agent-routing.md

**2026-01-10** - Built Instagram posting system infrastructure. Created queue system (/social-media/queue/, /posted/, /failed/), instagram-queue skill for management, instagram-content-generator skill for content creation, social-media-guidelines.md. Architecture: Claude Code for content creation + n8n for automated posting.

**2026-01-10 (Part 2)** - Configured Supabase infrastructure. Installed Supabase CLI via Homebrew, initialized local project, and integrated Supabase MCP server for AI-to-database interaction. Updated `.env` with transaction pooler URL and pushed Drizzle schema.

**2026-01-10 (Part 3)** - Fixed authentication and navigation.
1. Disabled prepared statements in `src/lib/server/db/index.ts` to support Supabase Transaction Pooler.
2. Created branded `/login` page (`src/routes/login/+page.svelte`) with Google Sign-In.
3. Updated all "Apply Now" buttons across the site to lead to the new `/login` page.
4. Cleaned up temporary database test scripts.

**2026-01-11** - Created Week 2 learning portal and CEO AI Command Center course.
1. Week 2 website sync: Created 5 day pages (day-6 through day-10) with Svelte pages mirroring syllabus
2. Updated course-builder skill with Phase 6 (auto website sync)
3. Built complete CEO AI Command Center course (RM 7,800, 5-hour premium training)
   - Full facilitator guide with 5 blocks
   - 4 AI agent skill templates (daily briefing, competitive intel, board prep, email ghostwriter)
   - 4 n8n workflow guides (Zoom→Slack, email triage, news digest, document analyzer)
   - CEO AI Playbook template, quick reference cheatsheet
   - Hands-on exercises for all 4 blocks

**2026-01-11 (Part 2)** - Renamed "Ship Sprint" to "Full Stack Web Development", added token efficiency, merged /learn into /close.
1. Updated course name across all website pages and seed.ts
2. Added Token Efficiency section to CLAUDE.md (context loading, concise responses)
3. Merged /learn into /close skill - single command captures learnings + saves session
4. Decision: Stay on Opus everywhere (no model routing for token savings)

**2026-01-12** - Business setup and student portal fixes.
1. Fixed overlapping course cards in student portal (CSS fixes)
2. Added auto-email when creating students - sends credentials via Brevo
3. Connected Supabase MCP server to Claude Code
4. Decided: Cloudflare Pages for deployment, Exabytes for codezero.my domain
5. SSM registered with code 85499 (Other Education), name "code zero"
6. Committed SSM payment receipt to financial-documents/

**2026-01-12 (Part 2)** - Built autonomous AI email marketing system.
1. Added 5 database tables: intakes, userEvents, campaignBriefs, aiGenerationLogs, emailPatterns
2. Created trigger system (scheduled + event-based) for auto-generating campaigns
3. Built Claude API integration for AI email generation with confidence scoring
4. Created pattern learner that extracts best practices from analytics
5. Enhanced admin queue UI with AI review section (approve/reject workflow)
6. Decision: Use n8n for scheduled triggers (daily 9am, hourly, nightly 2am)

**2026-01-12 (Part 3)** - Set up Brevo email integration via Chrome browser automation.
1. Demonstrated Chrome MCP browser control (navigate, click, type)
2. Logged into Brevo via Google OAuth using browser automation
3. Generated API key "code-zero-transactional" for transactional emails
4. Added BREVO_API_KEY to .env
5. Connected Brevo MCP server to Claude Code (.mcp.json)
6. Fixed git push (removed API keys from .gemini/, added to .gitignore)

**2026-01-12 (Part 4)** - Fixed Supabase MCP connection.
1. Diagnosed why Supabase MCP failed (was never configured in .mcp.json)
2. Added Supabase remote MCP using same approach as Gemini (`mcp.supabase.com/mcp`)
3. Removed .gemini/settings.json from git tracking (was exposing API keys)

**2026-01-12 (Part 5)** - Added performance intelligence to writing skills.
1. Added Phase 0 Performance Intelligence to blog-writer (SEO MCP for trending topics)
2. Added Phase 0 to instagram-content-generator (SEO MCP + queue analysis + engagement tracking)
3. Added Master Content Source to email-writer skill
4. Renamed syllabus/built-from-terminal.md to content/master-content.md
5. Extracted Day1/Day2 lessons into reusable Svelte components
See: sessions/2026-01-12-performance-intelligence.md
4. Decision: Remote MCP (OAuth) vs local MCP (token) - same LLM token usage, simpler auth

**2026-01-12 (Part 6)** - Completed autonomous email system, learned n8n setup.
1. Finished implementation of AI email marketing system
2. Build check passed for new code
3. Committed to GitHub (23 files, 2077 insertions)
4. Documented how n8n fits in (scheduler for API endpoints)
5. Provided complete n8n workflow setup guide
See: sessions/2026-01-12-125006.md

**Next Steps:**
1. Set up n8n workflows for email automation (3 workflows)
2. Add ANTHROPIC_API_KEY and N8N_WEBHOOK_SECRET to production
3. Create first intake in database to test flow
4. Buy codezero.my domain from Exabytes
5. Set up Cloudflare Pages deployment
