# Exercise: Create Your First Skill

**Type**: Guided
**Duration**: 30 minutes
**Difficulty**: Beginner

## Overview

Build a reusable blog-writer skill that generates SEO-friendly blog posts in your brand voice. This skill will save you hours on every piece of content you create.

## Learning Objective

After completing this exercise, you will be able to:
- Create a Claude Code skill with proper structure
- Define skill triggers and workflow steps
- Use a skill to generate consistent content

## Prerequisites

- Completed Exercise 01-ai-workspace
- CLAUDE.md file with brand voice defined

---

## Starter Code

Your skill folder structure:

```
.claude/
└── skills/
    └── blog-writer/
        └── SKILL.md
```

---

## Instructions

### Task
Create a blog-writer skill that generates blog posts following YOUR brand voice and a consistent structure.

### Requirements
- [ ] Skill folder exists at `.claude/skills/blog-writer/`
- [ ] SKILL.md defines the workflow
- [ ] Skill references CLAUDE.md for brand voice
- [ ] Skill produces posts with: hook, 3 sections, CTA
- [ ] Generated post saves to `/content/blog/[slug].md`

### Steps

**Step 1: Create the skill structure**
```
You: Create a blog-writer skill in .claude/skills/blog-writer/
```

**Step 2: Define the skill workflow**
Tell Claude the skill should:
- Read brand voice from CLAUDE.md
- Generate SEO-friendly blog posts
- Include: hook, problem, solution, CTA
- Output 1000-1500 words
- Save with proper frontmatter

**Step 3: Test the skill**
```
You: Write a blog post about [topic relevant to your product]
```

**Step 4: Verify output quality**
- Does it match your brand voice?
- Does it have proper structure?
- Is the frontmatter correct?

---

## Hints

<details>
<summary>Hint 1: What goes in SKILL.md?</summary>

A skill file contains:
- Frontmatter with name and description
- Workflow phases (research, outline, write, quality check)
- Output format specification
- Quality checklist

</details>

<details>
<summary>Hint 2: Output isn't in my voice</summary>

Make sure your skill explicitly says:
"Read the brand voice section from CLAUDE.md and match that tone throughout."

</details>

<details>
<summary>Hint 3: Posts missing frontmatter</summary>

Specify the exact frontmatter format in your skill:
```yaml
---
title: "[Title]"
slug: "[url-friendly-slug]"
description: "[SEO description]"
date: "[YYYY-MM-DD]"
---
```

</details>

---

## Expected Output

After running the skill:

```
content/
└── blog/
    └── your-topic-slug.md
```

The file should contain:
- YAML frontmatter (title, slug, description, date)
- Hook paragraph
- 3 main sections with headers
- Call-to-action
- 1000-1500 words

---

## Self-Check

- [ ] Skill folder and SKILL.md exist
- [ ] Can trigger skill with "Write a blog post about..."
- [ ] Generated post has correct structure
- [ ] Voice matches your brand
- [ ] File saves to correct location

---

## Solution

<details>
<summary>Reveal Solution</summary>

Example SKILL.md:

```markdown
---
name: blog-writer
description: Generates SEO-friendly blog posts in brand voice. Triggers on "write a blog post", "create an article about", "blog about".
---

# Blog Writer Skill

## Workflow

### Phase 1: Context
1. Read CLAUDE.md for brand voice and audience
2. Note key terms and tone guidelines

### Phase 2: Research
1. Identify main keyword from topic
2. Consider what the audience struggles with
3. Plan the unique angle

### Phase 3: Write
Generate a blog post with this structure:

1. **Hook** (2-3 sentences)
   - Start with a pain point or bold statement
   - Make the reader feel understood

2. **The Problem** (1-2 paragraphs)
   - Expand on the struggle
   - Show you understand

3. **The Solution** (3 sections)
   - Each section: header + 2-3 paragraphs
   - Actionable advice
   - Examples when possible

4. **CTA** (1 paragraph)
   - Clear next step
   - Connect to your product naturally

### Phase 4: Quality Check
- [ ] Matches brand voice from CLAUDE.md
- [ ] 1000-1500 words
- [ ] Headers are scannable
- [ ] CTA is clear

## Output Format

Save to: `/content/blog/[slug].md`

```yaml
---
title: "[Title - under 60 characters]"
slug: "[url-friendly]"
description: "[SEO description - under 160 characters]"
date: "[YYYY-MM-DD]"
---

[Content here]
```
```

</details>

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Skill doesn't trigger | Claude ignores your skill | Check trigger phrases in description |
| Generic voice | Posts sound like ChatGPT | Explicitly reference CLAUDE.md in workflow |
| No file output | Content only in chat | Add "Save to" instruction in Output Format |

---

## Stretch Goals (Optional)

1. **Add keyword research step** that checks search intent
2. **Create a quality scoring rubric** in the skill
3. **Generate 3 posts** on different topics and compare consistency
