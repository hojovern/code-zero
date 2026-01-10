---
name: lesson-writer
description: Creates individual lessons with clear learning objectives, minimal theory, hands-on exercises, and verification checkpoints. Use when writing lesson content, creating tutorials, or developing instructional material. Triggers on "write a lesson on", "create lesson for", "develop tutorial about", "lesson content for".
---

# Lesson Writer

Creates production-ready lessons with the code:zero philosophy: minimal theory, maximum doing.

## CORE PRINCIPLES

1. **Show, don't tell** — Demonstrate before explaining
2. **Do, then understand** — Students code first, grasp concepts after
3. **One thing at a time** — Each lesson = one clear skill gained
4. **Verify constantly** — Students should know if they're on track

---

## LESSON STRUCTURE

Every lesson follows this format:

```
┌─────────────────────────────────────┐
│  HOOK (2 min)                       │
│  Why this matters, what you'll build│
├─────────────────────────────────────┤
│  DEMO (5 min)                       │
│  Watch it work first                │
├─────────────────────────────────────┤
│  BUILD (20-30 min)                  │
│  Follow along, then solo            │
├─────────────────────────────────────┤
│  CHECKPOINT (5 min)                 │
│  Verify you got it                  │
├─────────────────────────────────────┤
│  EXTEND (optional)                  │
│  For fast finishers                 │
└─────────────────────────────────────┘
```

---

## WORKFLOW (5 Phases)

### Phase 1: Lesson Scope

**Goal**: Define exactly what this lesson teaches.

**Required inputs**:
1. **Topic**: What specific skill/concept?
2. **Context**: Where does this fit in the curriculum?
3. **Prerequisites**: What must they already know?
4. **Time box**: How long should this take? (default: 45 min)

**Define the singular outcome**:
```
After this lesson, students will be able to:
[ONE specific, observable action]
```

**Good examples**:
- "Deploy a SvelteKit app to Vercel"
- "Create an API endpoint that calls Claude"
- "Set up authentication with Supabase"

**Bad examples**:
- "Understand deployment" (not observable)
- "Learn about APIs" (too vague)
- "Master authentication" (too broad)

---

### Phase 2: Demo First

**Goal**: Show the end result before teaching how.

**Create the "destination" demo**:
1. What does the finished thing look like?
2. What does it DO that's impressive/useful?
3. How long does it take to show this working?

**Demo script format**:
```markdown
## Demo: [Title]

**Setup**: [What's already in place]

**Watch this**:
1. [Action 1] → [Result]
2. [Action 2] → [Result]
3. [Action 3] → [Final result]

**What just happened**: [One sentence explanation]

**Your turn**: By the end of this lesson, you'll build this yourself.
```

**Demo principles**:
- Under 5 minutes
- Shows the WOW moment upfront
- No explanation of HOW yet — just WHAT
- Creates desire to learn the skill

---

### Phase 3: Hands-On Build

**Goal**: Guide students through building it themselves.

**Two-part structure**:

**Part A: Guided Build (Follow Along)**
```markdown
## Build: [Title]

### Step 1: [Action verb + specific task]

[Brief context — 1-2 sentences MAX]

\`\`\`[language]
[Exact code to write]
\`\`\`

**What this does**: [One sentence]

**You should see**: [Expected result/output]

---

### Step 2: [Action verb + specific task]
[Continue pattern...]
```

**Part B: Solo Practice**
```markdown
## Practice: [Variation on what they just learned]

Now do it yourself with a twist:

**Task**: [Clear instruction]

**Hints** (if stuck):
- [Hint 1]
- [Hint 2]

**Solution** (collapsed):
<details>
<summary>Click to reveal</summary>
[Solution code]
</details>
```

**Writing rules**:
- Every step produces a visible result
- Steps are atomic (one action each)
- Code is copy-paste ready
- Expected outputs are explicit
- Errors are anticipated ("If you see X, check Y")

---

### Phase 4: Checkpoint

**Goal**: Verify students actually learned the skill.

**Checkpoint format**:
```markdown
## Checkpoint: Did it work?

### Quick Test
[Simple verification they can do in < 1 min]

### You should have:
- [ ] [Observable outcome 1]
- [ ] [Observable outcome 2]
- [ ] [Observable outcome 3]

### Common Issues

**Problem**: [Symptom]
**Fix**: [Solution]

**Problem**: [Symptom]
**Fix**: [Solution]

### Not working?
[Debugging steps or link to help]
```

**Checkpoint types**:
1. **Output check**: "Your terminal should show X"
2. **Behavior check**: "Click Y, you should see Z"
3. **Code review**: "Your file should look like this"
4. **Quiz**: Quick conceptual verification (use sparingly)

---

### Phase 5: Extension (Optional)

**Goal**: Keep fast finishers engaged.

**Extension format**:
```markdown
## Stretch Goal (Optional)

Finished early? Try this:

**Challenge**: [Harder variation]

**Hints**:
- [Hint 1]
- [Hint 2]

**No solution provided** — figure it out!
```

**Extension principles**:
- Clearly marked as optional
- Harder but uses same concepts
- No solution given (builds problem-solving)
- Doesn't block progress if skipped

---

## OUTPUT FORMAT

```markdown
# Lesson [N]: [Title]

**Duration**: [X minutes]
**Prerequisites**: [What they need to know]
**Outcome**: After this lesson, you will be able to [specific action].

---

## Why This Matters

[1-2 sentences on real-world relevance]

---

## Demo

[Demo section from Phase 2]

---

## Build

[Guided build from Phase 3A]

---

## Practice

[Solo practice from Phase 3B]

---

## Checkpoint

[Verification from Phase 4]

---

## Stretch Goal (Optional)

[Extension from Phase 5]

---

## Key Takeaways

- [Takeaway 1]
- [Takeaway 2]
- [Takeaway 3]

---

## Next Up

[What the next lesson covers and how it builds on this one]
```

---

## OUTPUT LOCATION

Save lessons to: `/syllabus/courses/{course-slug}/lessons/{lesson-number}-{lesson-slug}.md`

Example: `/syllabus/courses/ai-agents/lessons/03-tool-calling.md`

---

## QUALITY CHECKLIST

Before finalizing, verify:

- [ ] Lesson has exactly ONE clear outcome
- [ ] Demo is under 5 minutes and shows the end result
- [ ] Every code block is copy-paste ready
- [ ] Every step has an expected result
- [ ] Checkpoint verifies the stated outcome
- [ ] Common errors are anticipated
- [ ] Extension is clearly optional
- [ ] No unexplained jargon
- [ ] Fits within time box

---

## ANTI-PATTERNS (Avoid)

| Don't | Do Instead |
|-------|------------|
| Long explanations before coding | Demo first, explain after |
| "Now you understand X" | "Now you can DO X" |
| Abstract examples | Real, working code |
| Multiple concepts per lesson | One concept, mastered |
| "Read the docs" | Link to specific section |
| Assuming prior knowledge | State prerequisites explicitly |
| Walls of text | Short paragraphs, lots of code |
