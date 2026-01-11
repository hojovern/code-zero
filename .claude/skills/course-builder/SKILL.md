---
name: course-builder
description: Master skill that builds a complete course from scratch. Chains all syllabus skills in sequence (syllabus-architect → lesson-writer → exercise-generator → curriculum-critic → outcome-mapper). Use for end-to-end course creation. Triggers on "build a course on", "create complete course", "full course for", "build complete curriculum".
---

# Course Builder

Master orchestrator that chains all syllabus skills to build a complete course from a single prompt.

## WORKFLOW OVERVIEW

```
INPUT: Topic + Audience + Duration
         │
         ▼
┌─────────────────────────────────────┐
│  PHASE 1: SYLLABUS-ARCHITECT        │
│  Plan structure, modules, timeline  │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  PHASE 2: LESSON-WRITER             │
│  Write each lesson (loop)           │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  PHASE 3: EXERCISE-GENERATOR        │
│  Create exercises per lesson (loop) │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  PHASE 4: CURRICULUM-CRITIC         │
│  Review and fix issues              │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  PHASE 5: OUTCOME-MAPPER            │
│  Map to jobs, portfolio, interviews │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  PHASE 6: WEBSITE-SYNC              │
│  Create Svelte pages on website     │
└─────────────────────────────────────┘
         │
         ▼
OUTPUT: Complete course in /syllabus/ + /src/routes/learn/
```

---

## PHASE 1: Architecture

**Invoke**: syllabus-architect

**Input needed**:
- Topic
- Target audience (skill level, background)
- Duration (weeks, hours/week)
- Desired outcome

**If not provided, ask**:
```
To build your course, I need:

1. **Topic**: What are we teaching?
2. **Audience**: Who is this for? (beginner/intermediate/advanced, background)
3. **Duration**: How long? (e.g., 4 weeks, 10 hours/week)
4. **Outcome**: What should they be able to DO when finished?
```

**Output**:
- `/syllabus/courses/{slug}/README.md` — Course overview
- Module list with lesson counts
- Time allocations

**Checkpoint**: Show user the structure, ask for approval before continuing.

```
Here's the course structure:

## [Course Title]
- Duration: X weeks
- Modules: Y
- Lessons: Z total

### Modules:
1. [Module 1] - X lessons
2. [Module 2] - X lessons
...

Proceed with writing lessons? (yes/no/adjust)
```

---

## PHASE 2: Lesson Writing

**Invoke**: lesson-writer (loop for each lesson)

**Process**:
```
For each module:
  For each lesson in module:
    1. Invoke lesson-writer with:
       - Lesson topic
       - Prerequisites (previous lessons)
       - Learning objective (from syllabus)
       - Time allocation
    2. Save to /syllabus/courses/{slug}/lessons/{nn}-{lesson-slug}.md
    3. Track progress
```

**Progress updates**:
```
Writing lessons...
✓ Lesson 1.1: [Title]
✓ Lesson 1.2: [Title]
⏳ Lesson 2.1: [Title] (in progress)
○ Lesson 2.2: [Title]
...
```

**Output**:
- Individual lesson files in `/lessons/` folder
- Each lesson follows lesson-writer format

---

## PHASE 3: Exercise Generation

**Invoke**: exercise-generator (loop for each lesson)

**Process**:
```
For each lesson:
  1. Read lesson content
  2. Identify 1-2 exercise opportunities:
     - Guided exercise (during lesson)
     - Solo practice (end of lesson)
  3. Generate exercises
  4. Save to /syllabus/courses/{slug}/exercises/{lesson-slug}-exercise.md
```

**Exercise types per lesson**:
| Lesson Type | Exercises |
|-------------|-----------|
| Concept intro | 1 micro exercise |
| Hands-on build | 1 guided + 1 solo |
| Project lesson | 1 challenge |
| Capstone | 1 project |

**Output**:
- Exercise files in `/exercises/` folder
- Exercises linked from lesson files

---

## PHASE 4: Quality Review

**Invoke**: curriculum-critic

**Process**:
1. Review complete course structure
2. Check all lessons for consistency
3. Verify exercise coverage
4. Identify gaps and issues

**Auto-fix minor issues**:
- Missing prerequisites → Add them
- Unclear objectives → Rewrite
- Missing checkpoints → Add them

**Flag major issues for user**:
```
## Review Complete

### Auto-fixed (3 issues):
✓ Added missing prerequisite to Lesson 3.2
✓ Clarified objective in Lesson 2.1
✓ Added checkpoint to Lesson 4.3

### Needs your input (1 issue):
⚠️ Module 3 may be too long (estimated 6 hours vs 4 hour target)
   Options:
   a) Split into two modules
   b) Remove Lesson 3.4 (optional content)
   c) Keep as-is (students can take longer)

   Which do you prefer?
```

**Output**:
- Updated lesson files (auto-fixes applied)
- Review report in `/syllabus/courses/{slug}/review.md`

---

## PHASE 5: Outcome Mapping

**Invoke**: outcome-mapper

**Process**:
1. Extract all skills from lessons
2. Map to job requirements
3. Create portfolio guidance
4. Generate interview prep

**Output**:
- `/syllabus/courses/{slug}/outcome-map.md`
- Portfolio templates
- Interview talking points

---

## PHASE 6: Website Sync

**Purpose**: Create Svelte pages on the website that mirror the syllabus content.

**Process**:
```
For the course:
  1. Create overview page: /src/routes/learn/{week-slug}/+page.svelte
     - Hero section with week title and theme
     - Days overview with cards for each day
     - Learning outcomes
     - Tech stack highlights
     - Resources section
     - CTA to start

  2. For each lesson/day:
     Create: /src/routes/learn/{week-slug}/{day-slug}/+page.svelte
     - Navigation back to week
     - Breadcrumb navigation
     - Day badge with title
     - Challenge/goal section
     - Schedule table (morning/afternoon)
     - Content sections from syllabus
     - Code blocks for prompts
     - End-of-day checklist
     - Summary table
     - Practice exercise links
     - Navigation to prev/next day
```

**Page Structure Template**:
```svelte
<script lang="ts">
  // Schedule data
  // Checklist items
  // Other structured content
</script>

<svelte:head>
  <title>{Day Title} | code:zero</title>
  <meta name="description" content="{Day description}" />
  <!-- Font imports -->
</svelte:head>

<nav class="navbar">...</nav>

<article class="lesson">
  <div class="container">
    <nav class="breadcrumb">...</nav>
    <header class="lesson-header">...</header>

    <!-- Content sections -->
    <section class="content-section">...</section>

    <!-- Schedule tables -->
    <!-- Code blocks with prompts -->
    <!-- Info tables -->
    <!-- Checklists -->

    <!-- Practice exercises -->
    <section class="content-section">
      <h2>Practice Exercise</h2>
      <div class="exercises-grid">...</div>
    </section>

    <!-- Navigation -->
    <nav class="lesson-nav">...</nav>
  </div>
</article>

<style>
  /* CSS variables and component styles */
</style>
```

**Styling Requirements**:
- Use code:zero design system (see /brand/design-system.md)
- Primary color: `#04A459`
- Background: `#1a1d23`
- Cards: `#242933`
- Font heading: Plus Jakarta Sans
- Font body: Inter
- Font mono: JetBrains Mono

**File Naming**:
- Week overview: `/src/routes/learn/week-{n}/+page.svelte`
- Day lessons: `/src/routes/learn/week-{n}/day-{n}/+page.svelte`

**Navigation Links**:
- Each day links to previous/next day
- Week overview links back to `/learn`
- Final day of week links to next week overview

**Checkpoint**: After sync, verify all pages render correctly.

```
Website sync complete:
✓ /learn/week-2/+page.svelte (overview)
✓ /learn/week-2/day-6/+page.svelte
✓ /learn/week-2/day-7/+page.svelte
✓ /learn/week-2/day-8/+page.svelte
✓ /learn/week-2/day-9/+page.svelte
✓ /learn/week-2/day-10/+page.svelte

Run `npm run dev` to verify pages render.
```

---

## FINAL OUTPUT STRUCTURE

```
/syllabus/{week-slug}/
├── index.md                     # Week overview (from Phase 1)
├── day-{n}.md                   # Lesson files (from Phase 2)
├── outcome-map.md               # Career mapping (from Phase 5)
│
└── exercises/
    ├── {nn}-{topic}.md          # Exercise files (from Phase 3)
    └── ...

/src/routes/learn/{week-slug}/
├── +page.svelte                 # Week overview page (from Phase 6)
│
├── day-{n}/
│   └── +page.svelte             # Day lesson page (from Phase 6)
└── ...
```

---

## EXECUTION MODES

### Full Auto Mode (Default)
Run all phases with minimal interruption. Only pause for:
- Initial structure approval (Phase 1)
- Major issues requiring decision (Phase 4)

```
User: "Build a complete course on n8n automation for beginners, 4 weeks"
→ Runs all 6 phases
→ Outputs complete course + website pages
```

### Step-by-Step Mode
Pause after each phase for approval.

```
User: "Build a course on n8n automation, step by step"
→ Phase 1 → "Approve structure?" → yes
→ Phase 2 → "Lessons complete, continue?" → yes
→ Phase 3 → "Exercises complete, continue?" → yes
→ Phase 4 → "Review complete, continue?" → yes
→ Phase 5 → "Outcomes mapped, continue?" → yes
→ Phase 6 → "Website synced! Done!"
```

### Partial Mode
Run only specific phases.

```
User: "Just plan the structure for an n8n course" → Phase 1 only
User: "Write lessons for this syllabus" → Phase 2 only
User: "Add exercises to these lessons" → Phase 3 only
User: "Sync week 2 to website" → Phase 6 only
```

---

## CHECKPOINTS & USER INPUT

### Required Decisions

| Phase | Checkpoint | User Action |
|-------|------------|-------------|
| 1 | Structure approval | Approve / Adjust |
| 2 | None (auto) | — |
| 3 | None (auto) | — |
| 4 | Major issues only | Choose fix option |
| 5 | None (auto) | — |
| 6 | None (auto) | — |

### Progress Visibility

Show progress throughout:
```
🏗️ Building course: [Course Name]

Phase 1: Architecture ✓
Phase 2: Lessons [████████░░] 8/10
Phase 3: Exercises ○
Phase 4: Review ○
Phase 5: Outcomes ○
Phase 6: Website Sync ○

Currently: Writing Lesson 2.3 - "Connecting APIs"
```

---

## ERROR HANDLING

| Error | Action |
|-------|--------|
| Missing input (topic/audience/duration) | Ask for it |
| User rejects structure | Revise Phase 1 |
| Lesson too long | Split or trim |
| Exercise doesn't match lesson | Regenerate |
| Critical review issue | Pause for user decision |
| File write fails | Retry, then report |

---

## EXAMPLE INVOCATION

**User**: "Build a complete course on n8n automation for non-technical founders, 2 weeks, 2 hours per day"

**Execution**:

1. **Phase 1**: Create structure
   - 4 modules, 12 lessons
   - Progressive: basics → workflows → AI integration → deployment
   - User approves

2. **Phase 2**: Write 12 lessons
   - Each with demo, build, checkpoint
   - ~15 minutes of reading

3. **Phase 3**: Generate 12 exercises
   - Mix of guided and solo practice
   - Starter code included

4. **Phase 4**: Review
   - Auto-fix: 2 unclear objectives
   - Flag: Module 3 ambitious, suggest trim
   - User chooses to keep

5. **Phase 5**: Map outcomes
   - Jobs: Automation Specialist, Ops Manager
   - Portfolio: 3 deployed workflows
   - Interview prep: 5 talking points

6. **Phase 6**: Website sync
   - Create week overview page
   - Create 12 day lesson pages
   - All pages styled with code:zero design

**Output**: Complete course in `/syllabus/` + website pages in `/src/routes/learn/`

---

## QUICK START

Just say:
```
"Build a course on [TOPIC] for [AUDIENCE], [DURATION]"
```

Examples:
- "Build a course on AI agents for developers, 4 weeks"
- "Build a course on SvelteKit for designers, 2 weeks"
- "Build a course on prompt engineering for marketers, 1 week"
