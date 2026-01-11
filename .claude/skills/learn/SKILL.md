---
name: learn
description: Mid-session learning capture. Use to manually capture learnings before session ends. Note - /close automatically includes learning capture, so this is only needed for mid-session saves.
---

# Mid-Session Learning Capture

Use this skill to capture learnings mid-session without closing.

**Note:** `/close` automatically captures learnings, so you only need `/learn` if you want to save learnings before the session ends.

## TRIGGER CONDITIONS

Auto-invoke when ANY of these occur:

- User corrects output (tone, length, format, style)
- User expresses preference ("I prefer...", "always...", "never...")
- User rejects an approach or asks for changes
- Output is accepted enthusiastically
- A skill workflow produces notably good or bad results

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

### Step 3: Confirm Briefly

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
5. **Be actionable** - Must change future behavior
6. **No approval needed** - Just do it

---

## EXAMPLES

**User says**: "Make it shorter"
**Action**: Update CLAUDE.md → Preferences Discovered
**Output**: `Noted: Prefers concise output`

**User says**: "The blog intro is too long"
**Action**: Update blog-writer/SKILL.md → Output Rules
**Output**: `Noted: Blog intros should be shorter`

**User says**: "Perfect, this carousel format works great"
**Action**: Update branded-social-visual/SKILL.md → Workflow
**Output**: `Noted: Carousel format works well`

**User corrects tone twice to be more direct**
**Action**: Update CLAUDE.md → Preferences Discovered
**Output**: `Noted: Prefers direct tone, no softening`

---

## FILE LOCATIONS

```
/CLAUDE.md                                    # Global learnings
/.claude/skills/blog-writer/SKILL.md          # Blog skill learnings
/.claude/skills/branded-deck/SKILL.md         # Deck skill learnings
/.claude/skills/branded-social-visual/SKILL.md # Social skill learnings
/.claude/skills/learn/SKILL.md                # This skill (meta-learning)
```

---

## SESSION LEARNINGS

Improvements to this skill discovered through usage.

### Workflow

### Output Rules

### Avoid
