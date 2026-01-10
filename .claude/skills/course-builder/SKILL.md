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
OUTPUT: Complete course in /syllabus/courses/{slug}/
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

## FINAL OUTPUT STRUCTURE

```
/syllabus/courses/{course-slug}/
├── README.md                    # Course overview (from Phase 1)
├── outcome-map.md               # Career mapping (from Phase 5)
├── review.md                    # Quality review (from Phase 4)
│
├── lessons/
│   ├── 01-01-lesson-title.md    # Module 1, Lesson 1
│   ├── 01-02-lesson-title.md    # Module 1, Lesson 2
│   ├── 02-01-lesson-title.md    # Module 2, Lesson 1
│   └── ...
│
└── exercises/
    ├── 01-01-exercise.md        # Exercise for Lesson 1.1
    ├── 01-02-exercise.md        # Exercise for Lesson 1.2
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
→ Runs all 5 phases
→ Outputs complete course
```

### Step-by-Step Mode
Pause after each phase for approval.

```
User: "Build a course on n8n automation, step by step"
→ Phase 1 → "Approve structure?" → yes
→ Phase 2 → "Lessons complete, continue?" → yes
→ Phase 3 → "Exercises complete, continue?" → yes
→ Phase 4 → "Review complete, continue?" → yes
→ Phase 5 → "Done!"
```

### Partial Mode
Run only specific phases.

```
User: "Just plan the structure for an n8n course" → Phase 1 only
User: "Write lessons for this syllabus" → Phase 2 only
User: "Add exercises to these lessons" → Phase 3 only
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

### Progress Visibility

Show progress throughout:
```
🏗️ Building course: [Course Name]

Phase 1: Architecture ✓
Phase 2: Lessons [████████░░] 8/10
Phase 3: Exercises ○
Phase 4: Review ○
Phase 5: Outcomes ○

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

**Output**: Complete course in `/syllabus/courses/n8n-automation-foundations/`

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
