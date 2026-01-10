# Exercise: Build Your AI Workspace

**Type**: Guided
**Duration**: 45 minutes
**Difficulty**: Beginner

## Overview

Set up Claude Code, create your first CLAUDE.md file, and verify your AI workspace can understand and respond to project-specific questions.

## Learning Objective

After completing this exercise, you will be able to:
- Configure Claude Code as your AI development partner
- Create a CLAUDE.md file that captures your project context
- Verify AI understands your project by asking context-specific questions

## Prerequisites

- Terminal/command line basics
- Node.js 18+ installed
- Anthropic API key

---

## Starter Code

Create a new folder and initialize your project:

```bash
# Create project folder
mkdir my-first-product
cd my-first-product

# Initialize (creates package.json)
npm init -y
```

---

## Instructions

### Task
Create an AI workspace where Claude knows about YOUR specific product idea.

### Requirements
- [ ] Claude Code is installed and running
- [ ] CLAUDE.md file exists in project root
- [ ] CLAUDE.md contains: product name, audience, problem, and voice
- [ ] Claude can correctly answer "What is this project about?"

### Steps

**Step 1: Install and launch Claude Code**
```bash
npm install -g @anthropic-ai/claude-code
claude
```

**Step 2: Create your CLAUDE.md**
Tell Claude:
```
Create a CLAUDE.md file for a product called [YOUR IDEA].
It helps [YOUR AUDIENCE] with [THEIR PROBLEM].
The tone should be [YOUR VOICE - e.g., friendly and direct].
```

**Step 3: Verify context works**
Ask Claude these questions:
- "What is this project about?"
- "Who is our target audience?"
- "Write a one-line tagline for us"

All answers should reflect YOUR specific product, not generic responses.

---

## Hints

<details>
<summary>Hint 1: What goes in CLAUDE.md?</summary>

Think of it as a briefing document. Include:
- Project name and one-line description
- Target audience (be specific: "busy parents" not "everyone")
- The problem you solve
- Brand voice guidelines (words you use, words you avoid)

</details>

<details>
<summary>Hint 2: Claude's answers are too generic</summary>

Your CLAUDE.md may not be specific enough. Instead of "helps people save time", try "helps freelance designers track billable hours without switching apps."

</details>

<details>
<summary>Hint 3: Testing context</summary>

Ask a question only YOUR product could answer correctly:
"What specific problem do we solve for [your audience]?"

If Claude gives a generic answer, your CLAUDE.md needs more detail.

</details>

---

## Expected Output

After completing this exercise:

```
my-first-product/
├── CLAUDE.md          # Your project context
└── package.json       # Node.js project file
```

When you ask "What is this project about?", Claude should respond with YOUR product details, not a generic answer.

---

## Self-Check

- [ ] `claude` command launches without errors
- [ ] CLAUDE.md file exists and contains 4+ sections
- [ ] Claude answers product questions correctly (not generically)
- [ ] You can explain what your product does in one sentence

---

## Solution

<details>
<summary>Reveal Solution</summary>

Example CLAUDE.md for a habit tracker:

```markdown
# StreakKeeper

## Project Overview
StreakKeeper helps busy professionals build better habits by tracking daily streaks with minimal friction. One tap to log, visual streak counters, and smart reminders.

## Target Audience
- Busy professionals (25-40)
- Want to build habits but forget or get overwhelmed
- Value simplicity over features
- Already use their phone for everything

## Problem We Solve
Habit apps are too complex. Users want to track 2-3 habits, not manage a productivity system. We're the "just works" option.

## Brand Voice
- Direct and encouraging
- Use: "simple", "just", "done", "streak"
- Avoid: "optimize", "maximize", "productivity hack"
- Tone: Like a supportive friend, not a drill sergeant

## Tech Stack
- Frontend: SvelteKit
- Backend: Supabase
- Deploy: Vercel
```

**Verification test:**
```
You: What's the main problem we solve?
Claude: "Habit apps are too complex. StreakKeeper is the simple option for busy professionals who want to track 2-3 habits without managing a whole productivity system."
```

</details>

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| CLAUDE.md too vague | Claude gives generic answers | Add specific details about your unique angle |
| Missing voice section | Claude's tone is inconsistent | Add brand voice guidelines |
| Wrong file location | Claude doesn't see context | CLAUDE.md must be in project root |

---

## Stretch Goals (Optional)

1. **Add a competitor section** to CLAUDE.md explaining how you're different
2. **Create a decisions log** section to track important choices
3. **Test with 5 different questions** and verify all answers are product-specific
