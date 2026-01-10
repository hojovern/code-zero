---
name: close
description: AUTOMATIC session closer. Triggers when user signals end of session (bye, thanks, done, goodbye, see you, etc.). Creates a session log in /sessions/ for context continuity. Can also be triggered manually with "/close".
---

# Session Close & Handoff

**RUNS AUTOMATICALLY** when user signals session end. Creates a session summary file optimized for the next Claude instance to read and continue seamlessly.

## AUTO-TRIGGER PHRASES

Run this skill when user says:
- "bye", "goodbye", "see you", "later"
- "thanks", "thank you" (as sign-off, not mid-conversation)
- "done", "that's all", "I'm done"
- "gotta go", "wrapping up", "end session"
- "goodnight", "good morning" (as sign-off)

## INCREMENTAL SAVE (During Session)

**Silently update `/sessions/current.md` after each significant task.**

This protects against window closes. Format:

```markdown
# Current Session (Live)
Updated: YYYY-MM-DD HH:MM

## Done So Far
- [task 1]
- [task 2]

## Current State
[Where things are right now]

## Open Threads
- [ ] [unfinished 1]
- [ ] [unfinished 2]
```

Keep this updated throughout the session. No user confirmation needed.

---

## FULL CLOSE WORKFLOW

### Step 1: Analyze the Session

Review the entire conversation and extract:

1. **What was accomplished** - Concrete outputs, files created/modified
2. **Current state** - Where things stand right now
3. **Open threads** - Unfinished work, things left to do
4. **Key decisions** - Important choices made and why
5. **Blockers/Issues** - Problems encountered, unresolved issues
6. **User context** - Mood, priorities, upcoming deadlines mentioned

### Step 2: Generate Session File

1. Use `/sessions/current.md` as the base (already has incremental updates)
2. Expand it into full format
3. Save as: `/sessions/YYYY-MM-DD-HHMMSS.md`
4. Delete `/sessions/current.md` (it's now archived)

Use this exact format (optimized for Claude to parse):

```markdown
# Session: YYYY-MM-DD HH:MM

## TL;DR
[One sentence summary of what this session was about]

## Accomplished
- [Concrete output 1]
- [Concrete output 2]
- [Files: list any created/modified files]

## Current State
[2-3 sentences on where the project/task stands now]

## Open Threads
- [ ] [Unfinished task 1]
- [ ] [Unfinished task 2]
- [ ] [Thing user mentioned wanting to do]

## Decisions Made
- [Decision]: [Why]
- [Decision]: [Why]

## Context for Next Session
[Anything the next Claude instance needs to know to continue effectively. User preferences discovered, important background, relevant details.]

## Files Modified This Session
- `path/to/file1` - [what changed]
- `path/to/file2` - [what changed]

## User Intent
[What is the user ultimately trying to achieve? What's the bigger picture?]
```

### Step 3: Update Session Index

Add entry to `/sessions/index.md` under "Sessions by Date":

```markdown
| [YYYY-MM-DD](YYYY-MM-DD-topic.md) | [Brief topic] | [Key outcomes] |
```

### Step 4: Update Topic Files

For each major decision or topic discussed, update the relevant topic file in `/sessions/by-topic/`:

| Topic File | When to Update |
|------------|----------------|
| `pricing-decisions.md` | Any pricing changes or discussions |
| `product-strategy.md` | Course offerings, positioning, curriculum |
| `marketing-sales.md` | Marketing strategies, sales approaches |
| `technical-decisions.md` | Tech stack, tools, infrastructure |

**Format for topic updates:**
```markdown
### [Decision/Change]
*Set/Changed: YYYY-MM-DD*

[What was decided and why]

**Source:** Session YYYY-MM-DD-topic.md
```

### Step 5: Update CLAUDE.md Session Log

Add entry to `## Session Log` in CLAUDE.md:

```markdown
**YYYY-MM-DD** - [TL;DR from above]. See: sessions/YYYY-MM-DD-topic.md
```

### Step 6: Confirm Closure

Output:

```
Session saved: sessions/YYYY-MM-DD-topic.md

Summary: [TL;DR]

Topic files updated:
- pricing-decisions.md (if applicable)
- product-strategy.md (if applicable)

Open threads:
- [thread 1]
- [thread 2]

See you next time!
```

---

## FORMAT RATIONALE

This format is optimized for me (Claude) to:

1. **TL;DR** - Instantly understand session context
2. **Accomplished** - Know what's done, don't redo work
3. **Current State** - Understand where to pick up
4. **Open Threads** - Know what needs doing next
5. **Decisions Made** - Respect past choices, understand constraints
6. **Context** - Catch implicit knowledge that isn't in files
7. **Files Modified** - Know what changed recently
8. **User Intent** - Stay aligned with the bigger goal

---

## RULES

1. **Be specific** - "Created blog post about AI agents" not "worked on content"
2. **Include file paths** - Exact paths so next session can find things
3. **Capture intent** - Why, not just what
4. **Note blockers** - Don't lose track of issues
5. **Timestamp everything** - Use ISO format YYYY-MM-DD-HHMMSS

---

## EXAMPLE OUTPUT

```markdown
# Session: 2025-01-10 14:30

## TL;DR
Set up automatic learning system for Claude to improve across sessions.

## Accomplished
- Created `/learn` skill for automatic learning
- Updated CLAUDE.md with learning sections
- Created `/close` skill for session handoffs
- Created `/sessions/` folder for session logs

## Current State
Learning system is fully configured. Claude will now automatically capture learnings to CLAUDE.md and skill files. Session handoff system ready.

## Open Threads
- [ ] Test the learning system with actual content work
- [ ] Review other skills (blog-writer, branded-deck) for potential improvements
- [ ] Consider adding more skills based on common workflows

## Decisions Made
- Automatic learning without user prompts: User prefers zero-friction
- Silent "Noted: [x]" confirmations: Minimal interruption
- Session files in /sessions/: Keeps project root clean

## Context for Next Session
User wants Claude to continuously improve without manual intervention. Prefers direct communication, no fluff. Working on code:zero marketing materials.

## Files Modified This Session
- `CLAUDE.md` - Added Automatic Learning section and Session Learnings structure
- `.claude/skills/learn/SKILL.md` - Created automatic learning skill
- `.claude/skills/close/SKILL.md` - Created session close skill

## User Intent
Build a self-improving AI assistant for code:zero marketing that gets smarter with each session without requiring manual training.
```

---

## SESSION LEARNINGS

### Workflow

### Output Rules

### Avoid
