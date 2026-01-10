---
name: syllabus-architect
description: Plans course structure from scratch. Takes a topic and target audience, outputs learning journey map, module breakdown, time estimates, and prerequisites. Use when starting a new course, planning curriculum structure, or mapping learning paths. Triggers on "plan a course", "design curriculum for", "create syllabus structure", "map learning path for".
---

# Syllabus Architect

Designs comprehensive course structures from a topic and audience. Outputs ready-to-implement curriculum blueprints.

## WORKFLOW (4 Phases)

---

### Phase 1: Discovery

**Goal**: Understand scope, audience, and constraints.

**Gather Information**:

1. **Topic**: What is being taught?
2. **Target Audience**:
   - Current skill level (beginner/intermediate/advanced)
   - Background (developer, designer, non-technical, etc.)
   - Goals (career change, upskill, hobby)
3. **Constraints**:
   - Total duration available (4 weeks, 3 months, etc.)
   - Hours per week students can commit
   - Format (in-person, online, hybrid)
4. **Desired Outcome**: What can students DO after completing this?

**If not provided, ask**:
```
To design the best syllabus, I need:
1. Who is this for? (skill level, background)
2. How long is the program? (weeks/months, hours/week)
3. What should they be able to DO when finished?
```

---

### Phase 2: Learning Journey Map

**Goal**: Map the transformation from start to finish.

**Create Skill Progression**:

```
ENTRY STATE                    EXIT STATE
[What they know now]    →     [What they can do after]
         ↓                            ↑
    [Milestone 1]                     |
         ↓                            |
    [Milestone 2]                     |
         ↓                            |
    [Milestone 3] ────────────────────┘
```

**For each milestone**:
- What new capability do they gain?
- What can they build/do that they couldn't before?
- How does this build on previous milestones?

**Identify Dependencies**:
- Which concepts MUST come before others?
- What can be taught in parallel?
- Where are the "unlock" moments (learning X enables Y, Z, and W)?

**Output**: Visual journey map showing progression.

---

### Phase 3: Module Breakdown

**Goal**: Structure content into teachable modules.

**Module Design Principles**:
1. Each module = 1 major capability gained
2. Modules should be completable in 1-2 sessions
3. Every module produces a tangible artifact
4. Order respects dependencies from Phase 2

**For each module, define**:

```markdown
## Module [N]: [Title]

**Duration**: [X hours]

**Prerequisites**:
- Module [N-1] completed
- [Any specific prior knowledge]

**Learning Objectives** (students will be able to...):
1. [Verb] + [specific skill] + [context]
2. [Verb] + [specific skill] + [context]
3. [Verb] + [specific skill] + [context]

**Key Concepts**:
- [Concept 1]
- [Concept 2]
- [Concept 3]

**Hands-On Project**: [What they'll build]

**Deliverable**: [Tangible output proving completion]

**Success Criteria**: [How to verify they got it]
```

**Learning Objective Verbs** (Bloom's Taxonomy):
- Remember: Define, list, recall, identify
- Understand: Explain, describe, summarize
- Apply: Use, implement, execute, build
- Analyze: Compare, differentiate, examine
- Evaluate: Assess, critique, judge
- Create: Design, construct, develop, produce

**Prefer higher-level verbs** (Apply, Create) over lower (Remember, Understand).

---

### Phase 4: Time Allocation & Validation

**Goal**: Ensure the syllabus is realistic and achievable.

**Time Estimation**:

| Activity Type | Time Multiplier |
|---------------|-----------------|
| Concept introduction | 1x |
| Guided practice | 1.5x |
| Independent practice | 2x |
| Project work | 2-3x |
| Review/troubleshooting | 0.5x buffer |

**Calculate per module**:
```
Concepts: [N] concepts × 15 min = [X] min
Guided practice: [N] exercises × 20 min = [X] min
Project work: 1 project × [estimated] = [X] min
Buffer: 15% of total = [X] min
─────────────────────────────────
Module total: [X] hours
```

**Validation Checklist**:
- [ ] Total time fits within program duration
- [ ] Each module has clear prerequisites
- [ ] Every module produces a deliverable
- [ ] Complexity increases progressively
- [ ] No orphan concepts (everything builds on something or toward something)
- [ ] Assessment points are distributed throughout
- [ ] Final project uses skills from all modules

**Adjust if needed**:
- Too long? Combine related modules or cut non-essential content
- Too short? Add depth, more practice, or stretch projects
- Unbalanced? Redistribute time from concept-heavy to practice-heavy

---

## OUTPUT FORMAT

```markdown
# [Course Title] Syllabus

## Overview
- **Duration**: [X weeks/months]
- **Commitment**: [X hours/week]
- **Format**: [In-person/Online/Hybrid]
- **Target Audience**: [Description]

## Prerequisites
- [What students must know/have before starting]

## Learning Outcomes
By completing this course, students will be able to:
1. [Major outcome 1]
2. [Major outcome 2]
3. [Major outcome 3]

## Learning Journey

```
[Entry] → [Milestone 1] → [Milestone 2] → [Milestone 3] → [Exit]
```

## Module Breakdown

### Module 1: [Title]
[Full module details...]

### Module 2: [Title]
[Full module details...]

[...continue for all modules...]

## Assessment Strategy
- [How progress is measured]
- [Major checkpoints]
- [Final assessment/project]

## Time Summary
| Module | Hours | Cumulative |
|--------|-------|------------|
| 1      | X     | X          |
| 2      | X     | X          |
| ...    | ...   | ...        |
| Total  | X     | X          |
```

---

## OUTPUT LOCATION

Save syllabus to: `/syllabus/courses/{course-slug}/README.md`

Also create: `/syllabus/courses/{course-slug}/modules/` directory for individual module files.

---

## EXAMPLE

**Input**: "Plan a course on building AI agents for intermediate developers, 4 weeks"

**Output**:
- 4-week curriculum with 8 modules
- Learning journey from "knows Python" to "can build and deploy production AI agents"
- Clear prerequisites and dependencies
- Time-boxed modules with hands-on projects
- Final capstone: deploy a custom AI agent
