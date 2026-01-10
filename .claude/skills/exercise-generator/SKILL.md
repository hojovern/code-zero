---
name: exercise-generator
description: Creates practical coding exercises from lesson content. Generates starter code, step-by-step instructions, expected outputs, stretch goals, and common debugging tips. Use when creating hands-on practice, coding challenges, or lab exercises. Triggers on "create exercises for", "generate practice problems", "make coding challenges", "build exercises from".
---

# Exercise Generator

Creates hands-on coding exercises that reinforce learning through doing.

## EXERCISE TYPES

| Type | Duration | Purpose | When to Use |
|------|----------|---------|-------------|
| **Micro** | 5-10 min | Single concept check | After introducing one idea |
| **Guided** | 20-30 min | Follow-along build | Teaching new workflows |
| **Solo** | 30-45 min | Independent practice | After guided practice |
| **Challenge** | 1-2 hours | Stretch problem | End of module/course |
| **Project** | 2-4 hours | Real-world application | Capstone/portfolio |

---

## WORKFLOW (4 Phases)

### Phase 1: Exercise Design

**Goal**: Define what the exercise teaches and tests.

**Required inputs**:
1. **Lesson/Topic**: What was just taught?
2. **Learning Objective**: What skill should this reinforce?
3. **Exercise Type**: Micro/Guided/Solo/Challenge/Project
4. **Difficulty**: Beginner/Intermediate/Advanced

**Design the exercise**:
```markdown
## Exercise Design

**Title**: [Action verb] + [What they'll build]
**Type**: [Micro/Guided/Solo/Challenge/Project]
**Duration**: [X minutes]
**Difficulty**: [Beginner/Intermediate/Advanced]

**Learning Objective**:
After completing this exercise, students will be able to [specific skill].

**Prerequisites**:
- [Concept 1 from earlier lesson]
- [Concept 2 from earlier lesson]

**Skills Practiced**:
- [Skill 1]
- [Skill 2]
- [Skill 3]
```

---

### Phase 2: Starter Code

**Goal**: Give students a launchpad, not a blank page.

**Starter code principles**:
- Reduce boilerplate friction
- Focus attention on the learning objective
- Include helpful comments
- Set up the structure they'll fill in

**Starter code template**:
```markdown
## Starter Code

\`\`\`[language]
// ============================================
// Exercise: [Title]
// ============================================
//
// Your task: [One sentence description]
//
// Instructions:
// 1. [First thing to do]
// 2. [Second thing to do]
// 3. [Third thing to do]
//
// When done, you should see: [Expected result]
// ============================================

[Provided code with TODO comments marking where they work]

// TODO: [Specific instruction for what to add here]

[More provided code if needed]
\`\`\`
```

**What to include vs. leave out**:

| Include (Given) | Exclude (They Write) |
|-----------------|---------------------|
| Imports/setup | Core logic |
| Helper functions | Main functionality |
| Test cases | Implementation |
| File structure | Business logic |
| Config/boilerplate | The thing being learned |

---

### Phase 3: Instructions & Hints

**Goal**: Guide without giving away the answer.

**Instruction format**:
```markdown
## Instructions

### Task
[Clear, specific description of what to build]

### Requirements
- [ ] [Requirement 1 - specific and testable]
- [ ] [Requirement 2 - specific and testable]
- [ ] [Requirement 3 - specific and testable]

### Steps (Suggested Approach)

**Step 1: [Action]**
[Brief guidance]

**Step 2: [Action]**
[Brief guidance]

**Step 3: [Action]**
[Brief guidance]

### Hints

<details>
<summary>Hint 1: [Topic of hint]</summary>

[Helpful nudge without full solution]

</details>

<details>
<summary>Hint 2: [Topic of hint]</summary>

[More specific nudge]

</details>

<details>
<summary>Hint 3: Bigger hint</summary>

[Almost-solution level guidance]

</details>
```

**Hint progression**:
1. **Hint 1**: Conceptual direction ("Think about using X")
2. **Hint 2**: Approach guidance ("Try breaking it into Y and Z")
3. **Hint 3**: Near-solution ("The function signature looks like...")

---

### Phase 4: Solution & Verification

**Goal**: Provide correct answer and self-check mechanism.

**Solution format**:
```markdown
## Expected Output

When your solution is working, you should see:

\`\`\`
[Exact expected output]
\`\`\`

## Solution

<details>
<summary>Click to reveal solution</summary>

\`\`\`[language]
[Complete working solution with comments explaining key parts]
\`\`\`

**Key points**:
- [Why this approach works]
- [Common alternative that also works]
- [What to avoid and why]

</details>

## Self-Check

Before looking at the solution, verify:

- [ ] [Checkpoint 1 - observable result]
- [ ] [Checkpoint 2 - observable result]
- [ ] [Checkpoint 3 - observable result]

## Common Mistakes

**Mistake**: [What they might do wrong]
**Symptom**: [What they'll see]
**Fix**: [How to correct it]

**Mistake**: [Another common error]
**Symptom**: [What they'll see]
**Fix**: [How to correct it]
```

---

## STRETCH GOALS

For students who finish early:

```markdown
## Stretch Goals (Optional)

Finished? Level up with these challenges:

### Stretch 1: [Title]
[Harder variation using same concepts]

### Stretch 2: [Title]
[Add a new feature or constraint]

### Stretch 3: [Title]
[Real-world complexity addition]

**No solutions provided** — figure it out!
```

**Stretch goal principles**:
- Use same core concepts, higher difficulty
- Add realistic constraints (performance, edge cases)
- No solutions given (builds problem-solving muscle)
- Clearly marked as optional

---

## COMPLETE EXERCISE TEMPLATE

```markdown
# Exercise: [Title]

**Type**: [Micro/Guided/Solo/Challenge/Project]
**Duration**: [X minutes]
**Difficulty**: [Beginner/Intermediate/Advanced]

## Overview

[2-3 sentences describing what they'll build and why it matters]

## Learning Objective

After completing this exercise, you will be able to:
- [Specific skill]

## Prerequisites

- [What they need to know]
- [What they need installed]

---

## Starter Code

\`\`\`[language]
[Starter code with TODOs]
\`\`\`

---

## Instructions

### Task
[Clear description]

### Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

### Steps

1. [Step 1]
2. [Step 2]
3. [Step 3]

---

## Hints

<details>
<summary>Hint 1</summary>
[Nudge]
</details>

<details>
<summary>Hint 2</summary>
[Bigger nudge]
</details>

---

## Expected Output

\`\`\`
[What success looks like]
\`\`\`

---

## Self-Check

- [ ] [Verify 1]
- [ ] [Verify 2]
- [ ] [Verify 3]

---

## Solution

<details>
<summary>Reveal Solution</summary>

\`\`\`[language]
[Complete solution]
\`\`\`

</details>

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| [Error 1] | [What you see] | [How to fix] |
| [Error 2] | [What you see] | [How to fix] |

---

## Stretch Goals (Optional)

1. [Harder variation]
2. [Add feature]
3. [Real-world constraint]
```

---

## OUTPUT LOCATION

Save exercises to: `/syllabus/courses/{course-slug}/exercises/{exercise-slug}.md`

Example: `/syllabus/courses/ai-agents/exercises/build-first-tool.md`

---

## QUALITY CHECKLIST

- [ ] Exercise has clear, singular objective
- [ ] Starter code compiles/runs as-is
- [ ] TODOs clearly mark where to work
- [ ] Requirements are testable (not vague)
- [ ] Hints progress from vague to specific
- [ ] Solution is complete and commented
- [ ] Expected output is exact (copy-paste comparable)
- [ ] Common mistakes cover top 3 errors
- [ ] Stretch goals are optional and harder
- [ ] Duration estimate is realistic
