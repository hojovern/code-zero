---
name: learn
description: Mid-session learning capture. Use to manually capture learnings before session ends. Note - /close automatically includes learning capture, so this is only needed for mid-session saves. This skill also powers the Automatic Syllabus Documentation.
---

# Mid-Session Learning Capture & Documentation

Use this skill to capture learnings mid-session and document teachable moments for the Academy.

**Note:** `/close` automatically captures learnings, so you only need `/learn` if you want to save learnings before the session ends.

## TRIGGER CONDITIONS

Auto-invoke when ANY of these occur:

- User corrects output (tone, length, format, style)
- User expresses preference ("I prefer...", "always...", "never...")
- User rejects an approach or asks for changes
- Output is accepted enthusiastically
- A skill workflow produces notably good or bad results
- **Teachable Moment:** A significant problem is solved, a new tool is used, or an architecture decision is made.

## WORKFLOW

### Step 1: Classify the Learning

**Global → CLAUDE.md**
- General preferences (tone, format, workflow)
- Cross-skill patterns
- Things to always do or avoid

**Skill-specific → [skill]/SKILL.md**
- Workflow changes for that skill
- Output format adjustments
- Skill-specific rules

### Step 2: Update Files Immediately

**For CLAUDE.md:**
1. Read the file
2. Add to the appropriate section under `## Session Learnings`:
   - `### Preferences Discovered`
   - `### Patterns That Work`
   - `### Avoid`
   - `### Content Insights`
   - `### Skill Improvements`

**For skill files:**
1. Read `/.claude/skills/[skill-name]/SKILL.md`
2. If no `## SESSION LEARNINGS` section exists, add one at the end
3. Add learning to appropriate subsection:
   - `### Workflow`
   - `### Output Rules`
   - `### Avoid`

### Step 3: Automatic Syllabus Documentation (Omni-Brain Loop)

If the learning is a "Teachable Moment" (technical win, mistake fixed, tool discovered):
1. Open `/content/master-content.md`.
2. Append a new entry using the standard format:
   ```markdown
   ### YYYY-MM-DD: [Title]
   **Context:** ...
   **What I did:** ...
   **What happened:** ...
   **Lesson:** [LESSON] ...
   **Tags:** [TOOL] [DECISION] [MISTAKE] [WIN]
   ```
3. This ensures the "Academy-as-Code" is always up to date.

### Step 4: Confirm Briefly

After updating, output ONE line:

```
Noted: [specific learning in 5-10 words]
```

Nothing more. Don't interrupt the flow.

---

## FORMAT

All learnings use this format:

```markdown
- [Specific, actionable learning] (YYYY-MM-DD)
```

---

## RULES

1. **Silent operation** - Just "Noted: [x]" - no lengthy explanations
2. **Immediate updates** - Don't batch, don't wait for session end
3. **No duplicates** - Check existing learnings first
4. **Be specific** - "Max 8 words in headlines" not "shorter headlines"
5. **Omni-Brain Vision** - Proactively document technical wins from Binky or Website as lessons for the Academy.

---

## FILE LOCATIONS

```
/CLAUDE.md                                    # Global learnings
/.claude/skills/blog-writer/SKILL.md          # Blog skill learnings
/.claude/skills/learn/SKILL.md                # This skill (meta-learning)
/content/master-content.md                    # Academy Syllabus Source
```

---

## SESSION LEARNINGS

### Workflow
- Integrated Automatic Syllabus Documentation into the learning capture loop (2026-01-14)