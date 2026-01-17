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

## Repository Structure (3-Bucket Model)

- **`/` (Root):** **Core Business HQ**. Strategy, Brand, Financials, and Master Session Logs.
- **`projects/code-zero-website/`:** **Technical Bucket 1**. Student portal, landing page, and enrollment system (SvelteKit/Supabase).
- **`projects/binkys-magic-image-organizer/`:** **Technical Bucket 2**. AI Vision tool (Python/FastAPI/Streamlit).

---

## Operating Instructions

### Workspace Boundaries
Each directory has its own `.claude` context to prevent technical noise from mixing (e.g., Python AI patterns shouldn't leak into SvelteKit web work). 
- When working on a specific project, **reference the patterns and memory in that project's sub-folder.**
- Broad brand decisions stay in the root.

### Folder Structure (Root)

```
code-zero/
├── CLAUDE.md              # Global project instructions
├── projects/              # Isolated technical projects
│   ├── code-zero-website/
│   └── binkys-magic-image-organizer/
├── syllabus/              # Course curriculum
├── content/               # Blog posts and master content
├── financials/            # Projections and documents
├── brand/                 # Design and content systems
└── sessions/              # Global session logs
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
| `keyword-research` | `keyword-research` | SEO keyword research, runs on Sonnet (5x cheaper than Opus) |
| `content-strategist` | `content-strategist` | Content strategy, competitive analysis, topic research, content briefs |
| `presentation-specialist` | `presentation-specialist` | Transform documents/data into polished slide decks |

**Token-saving tip**: Add `model: "haiku"` to any Task for simple searches/lookups (60x cheaper).

---

### 0. Token-Saving Strategy — Use Haiku for Simple Tasks

**How it works**: Add `model: "haiku"` to any Task call to use the cheap model.

**USE HAIKU BY DEFAULT** for any simple task. Only use Opus for complex reasoning.

**Trigger phrases** (use Haiku for these):
- "find files that..."
- "where is the..."
- "list all..."
- "count how many..."
- "quick search for..."
- "what does X do?"
- Any simple lookup or search

**Cost comparison**:
```
Opus:  $15 input / $75 output per 1M tokens
Haiku: $0.25 input / $1.25 output per 1M tokens
Savings: 60x cheaper
```

**Example — Search with Haiku**:
```
Task(
  subagent_type: "Explore",
  model: "haiku",
  prompt: "Find all files that import from '$lib/auth'",
  description: "Find auth imports"
)
```

**Example — Quick lookup with Haiku**:
```
Task(
  subagent_type: "general-purpose",
  model: "haiku",
  prompt: "What database is this project using?",
  description: "Check database"
)
```

**When to use which model**:
| Task Type | Model | Why |
|-----------|-------|-----|
| File searches | haiku | Simple pattern matching |
| Code lookups | haiku | Just needs to find things |
| Quick questions | haiku | Factual, not creative |
| Complex debugging | opus | Needs deep reasoning |
| Architecture decisions | opus | Needs careful analysis |
| Content writing | opus | Needs creativity |

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
| `web-design` | Reference | **Auto-apply** to ALL UI work (modals, pages, components) |
| `design-critic` | Checklist | **Auto-run** before delivering ANY UI |
| `conversion` | Reference | Apply to forms, CTAs, modals, landing pages |
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

## Think-Harder System (OPT-IN)

Use `/think-harder` for complex tasks that need rigorous multi-agent analysis.

### When to Use `/think-harder`
- Architecture decisions affecting multiple systems
- Debugging complex issues with unclear root cause
- Content requiring brand/legal review
- Multi-file refactors

### Memory is Always On

Persist learnings automatically:
- User corrections → Avoid section
- User preferences → Preferences section
- Successful patterns → Patterns section

**Memory locations**: `/.claude/memory/learnings.md`, `/.claude/sessions/current.md`

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
- Supabase connection string format for pooler: `postgres.[project-ref]:[password]@aws-[X]-[region].pooler.supabase.com:6543/postgres` (2026-01-15)
- Debug DB connections: Add console.log in layout.server.ts to trace auth → DB query → result flow (2026-01-15)
- When DB fails, test with psql first: `psql "connection-string" -c "SELECT 1"` to isolate app vs connection issue (2026-01-15)
- Use `gemini-1.5-flash` for high-quota background agents (1,500/day vs 50 for Pro) (2026-01-17)
- MCP servers should use lazy initialization for DB/AI clients to ensure fast, safe startup (2026-01-17)
- Student portal architecture: Session-based auth (no username in URL) is cleaner and more secure (2026-01-17)
- Prevent layout jank: Fixed-height panels + CSS `contain: strict` + explicit grid columns (not auto-fit) (2026-01-17)
- Persistent sidebar pattern: Layout shell that never unmounts, only content area swaps (like Notion/Discord) (2026-01-17)
- UI consistency standard: All pages use `calc(80px + var(--space-12))` top padding for navbar offset (2026-01-17)
- Page title pattern: Breadcrumb → h1 (2.5rem, 700, text-primary) → intro (text-muted, font-style: normal) (2026-01-17)
- Use CSS variables (e.g., `var(--bg-base)`) instead of hardcoded colors for cross-page consistency (2026-01-17)


### Avoid
<!-- Things that didn't work: approaches that missed the mark, formats to skip, common mistakes -->
- Don't use "cohort" — use "intake" instead (2025-01-10)
- Never use `$` or special chars in DB passwords without URL encoding (`$` → `%24`) (2026-01-15)
- Don't change Supabase password multiple times quickly - pooler circuit breaker trips, wait 5 mins between attempts (2026-01-15)
- Don't assume DNS works - always test hostname resolution with `ping` before debugging code (2026-01-15)
- Check for multiple .env files in monorepo - root vs project folder can have different configs (2026-01-15)
- Don't omit `inputSchema` in MCP tool definitions, even if the tool takes no arguments (2026-01-17)
- Don't forget to restart the Gemini CLI session after modifying `.gemini/settings.json` to reload MCP configurations (2026-01-17)


### Content Insights
<!-- Learnings about what resonates: audience reactions, messaging that landed, topics that engage -->


### Skill Improvements
<!-- Notes on how to improve specific skills: blog-writer, branded-deck, branded-social-visual -->
- course-builder: Added Phase 6 (website sync) - all courses should auto-generate Svelte pages (2026-01-11)


---

## Session Log

<!-- Keep last 3 sessions only. Older entries: /sessions/archive.md -->

**2026-01-12 (Part 5)** - Added performance intelligence to writing skills. Phase 0 for blog-writer and instagram-content-generator.

**2026-01-12 (Part 6)** - Completed autonomous email system. See: sessions/2026-01-12-125006.md

**2026-01-15** - Fixed Supabase connection (3hr debug). Created debugging blog post + syllabus content. See: sessions/2026-01-15-221500.md

**Next Steps:**
1. Set up n8n workflows for email automation
2. Buy codezero.my domain from Exabytes
3. Set up Cloudflare Pages deployment
4. Publish Supabase debugging blog post to website
