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
│   ├── built-from-terminal.md  # Master narrative of how I built this
│   └── lessons/           # Extracted teachable modules
├── content/               # Blog posts, articles, and content assets
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

The file `/syllabus/built-from-terminal.md` captures how code:zero was built from the terminal. This becomes the curriculum source.

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

**During significant work:** Add entries to `/syllabus/built-from-terminal.md` using this format:

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


### Patterns That Work
<!-- Successful approaches to reuse: content formats that performed well, processes that were efficient -->


### Avoid
<!-- Things that didn't work: approaches that missed the mark, formats to skip, common mistakes -->
- Don't use "cohort" — use "intake" instead (2025-01-10)


### Content Insights
<!-- Learnings about what resonates: audience reactions, messaging that landed, topics that engage -->


### Skill Improvements
<!-- Notes on how to improve specific skills: blog-writer, branded-deck, branded-social-visual -->


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

**Next Steps:**
1. **Critical:** n8n Demo for Taster Sessions (Deadline: Today)
2. **Infrastructure:** Set up Instagram Business/Meta/Cloudinary for social automation.
