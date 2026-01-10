# Day 1: AI Workspace → Live Website

> "Set up the system. Use the system. Ship before you leave."

## The Challenge

**By end of day:**
1. AI workspace configured (Claude knows YOUR project)
2. Blog writer skill created (reusable forever)
3. Live website deployed (real URL anyone can visit)

All in one day. This is the pace.

---

## Why This Order?

Most bootcamps: "Here's how to code. Now code for 4 weeks."

We flip it:
1. **First hour:** Set up AI that knows your project
2. **Rest of day:** AI helps build everything

The AI workspace isn't a nice-to-have. It's the foundation that makes everything else faster.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Welcome + Philosophy | Understand AI-first development |
| 9:30 - 10:15 | Terminal + Claude Code Setup | AI agent running |
| 10:15 - 10:30 | Break | |
| 10:30 - 11:15 | Create CLAUDE.md | AI knows your project |
| 11:15 - 12:00 | Build Blog Writer Skill | First skill complete |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Show your CLAUDE.md | See others' approaches |
| 13:30 - 14:30 | AI Creates SvelteKit Project | Scaffolded + configured |
| 14:30 - 14:45 | Break | |
| 14:45 - 16:00 | AI Builds Landing Page | Complete homepage |
| 16:00 - 16:45 | Deploy to Vercel | **LIVE ON THE INTERNET** |
| 16:45 - 17:30 | Generate First Blog Post + Ship | Content live on site |

---

## Morning: The AI Workspace

### 1. Philosophy: AI-First Development (30 min)

**The old way:**
```
Idea → Learn to code → Code everything → Debug → Ship (eventually)
```

**The AI-first way:**
```
Idea → Set up AI workspace → AI helps build → Ship (today)
```

**Key insight:** The skill isn't coding. The skill is directing AI effectively.

| Old Thinking | New Thinking |
|--------------|--------------|
| "I need to learn everything" | "I need to direct AI effectively" |
| "Write code from scratch" | "Describe what I want, refine output" |
| "AI is a search engine" | "AI is a collaborator with memory" |
| "One-off prompts" | "Reusable skills and workflows" |

**What makes AI actually useful:**
1. **Context** — AI knows about YOUR project (not generic)
2. **Memory** — AI remembers decisions you've made
3. **Skills** — AI follows YOUR workflows, not generic ones
4. **Structure** — AI outputs in YOUR formats

### 2. Terminal + Claude Code Setup (45 min)

**Install Claude Code:**
```bash
# Install via npm
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

**Create your project:**
```bash
cd ~/Projects
mkdir my-product
cd my-product
claude
```

**What you see:**
- Terminal interface for conversation with Claude
- Claude can read/write files in your project
- Claude can run commands
- Claude remembers context within the session

**Quick test:**
```
You: Create a file called hello.txt that says "My AI workspace is ready"
```

Claude creates the file. Verify: `cat hello.txt`

**This is different from ChatGPT:**
- Claude is IN your project folder
- Claude can create, edit, read files directly
- Claude sees your folder structure
- Claude can run terminal commands

### 3. Create CLAUDE.md — Your Project's Brain (45 min)

**The CLAUDE.md file is your AI's memory.**

```
You: Create a CLAUDE.md file for my project. I'll tell you about it.
```

Then tell Claude:
- What your product does
- Who it's for
- What problem it solves
- What voice/tone to use

**Template structure:**

```markdown
# [Product Name]

## Project Overview
[One paragraph: What is this? What problem does it solve?]

## Target Audience
- [Who is this for?]
- [What do they struggle with?]
- [What do they want?]

## Brand Voice
- [Tone: Direct? Friendly? Technical?]
- [Words we use]
- [Words we avoid]

## Tech Stack
- Frontend: SvelteKit
- Backend: Supabase
- AI: Gemini (free), Claude
- Deploy: Vercel

## Folder Structure
```
my-product/
├── CLAUDE.md
├── .claude/skills/
├── content/
├── src/
└── brand/
```
```

**Fill it out:**
```
You: Let me tell you about my product. It's called [name]. It helps [audience]
with [problem]. The tone should be [description]. Update CLAUDE.md with this.
```

**Test that Claude knows your project:**
```
You: What is this project about?
You: Write a one-line description for our homepage.
You: Who is our target audience?
```

Claude should answer correctly based on CLAUDE.md.

### 4. Build Blog Writer Skill (45 min)

**Why build a skill?**

Without skills:
```
You: Write a blog post about [topic]. Make it SEO-friendly. Use our brand voice.
Include a hook, 3 main sections, and a CTA. Around 1500 words. Format with
proper headings...
```
Every. Single. Time.

With skills:
```
You: Write a blog post about [topic]
```
The skill contains all the instructions. Claude follows them automatically.

**Create the skill:**
```
You: Create a blog-writer skill in .claude/skills/blog-writer/
It should:
- Read CLAUDE.md for brand voice
- Create SEO-friendly blog posts
- Include: hook, problem, solution sections, CTA
- Output 1200-1800 words
- Save to /content/blog/[slug].md with frontmatter
```

Claude creates the folder and SKILL.md file.

**Review and refine:**
```
You: Show me the SKILL.md file
```

Make sure it includes:
- Workflow phases (research, outline, write, quality check)
- Voice guidelines reference
- Output format with frontmatter
- Quality checklist

**Your skill structure:**
```
.claude/
└── skills/
    └── blog-writer/
        ├── SKILL.md         # The workflow
        └── assets/
            └── voice-guide.md  # Optional: detailed voice rules
```

---

## Afternoon: Build + Ship

### 5. AI Creates SvelteKit Project (60 min)

**Now use your workspace to build:**

```
You: Create a SvelteKit project with TypeScript and Tailwind CSS.
Set it up for Vercel deployment. Follow the tech stack in CLAUDE.md.
```

Claude will:
1. Run the create commands
2. Install dependencies
3. Configure Tailwind
4. Set up the structure

**Verify it works:**
```
You: Start the dev server
```

Open `http://localhost:5173` — default SvelteKit page appears.

### 6. AI Builds Landing Page (75 min)

**This is where the magic happens.**

```
You: Build a landing page based on CLAUDE.md. Include:
- Hero section with headline, subheadline, and CTA
- Problem section (what our users struggle with)
- Solution section (how we solve it)
- Features section (3-4 key features)
- Final CTA section

Use our brand voice. Make it professional with Tailwind.
Dark theme with a green primary color.
```

Claude will:
1. Read CLAUDE.md for context
2. Write copy in your voice
3. Generate SvelteKit component
4. Apply Tailwind styling
5. Save to `src/routes/+page.svelte`

**Review at `http://localhost:5173`**

**Iterate:**
```
You: The headline is too generic. Our audience is [specific].
Make it speak directly to their main frustration.
```

```
You: Add more spacing between sections. It feels cramped.
```

```
You: Change the CTA to say "[your specific action]"
```

**Key skill: Directing AI**

| Weak direction | Strong direction |
|----------------|------------------|
| "Make it better" | "The headline doesn't address our specific pain point" |
| "Fix the styling" | "Add py-20 padding between sections, make buttons green-500" |
| "Not quite right" | "The tone is too casual, make it more confident but still friendly" |

### 7. Deploy to Vercel (45 min)

**Set up Git:**
```
You: Initialize git, create a proper .gitignore, and commit everything
with message "Day 1: AI workspace + landing page"
```

**Push to GitHub:**
```
You: Push to GitHub. Create a new repo called [your-product-name].
```

(You may need to authenticate with GitHub if not already set up)

**Deploy:**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Click Deploy
4. Wait ~60 seconds

**YOUR SITE IS LIVE.**

Share the URL. Screenshot it. This is real.

### 8. Generate Blog Post + Final Ship (45 min)

**Use your blog writer skill:**
```
You: Write a blog post about [topic relevant to your product]
```

Claude follows your skill workflow and creates the post.

**Add blog to site:**
```
You: Create a simple /blog page that shows this post.
Add a link to it in the navigation.
```

**Final deploy:**
```
You: Commit the blog addition and push to GitHub
```

Vercel auto-deploys. Your site now has content.

**End-of-day checklist:**
- [ ] CLAUDE.md captures your project
- [ ] Blog writer skill exists and works
- [ ] Landing page live at Vercel URL
- [ ] At least one blog post published
- [ ] Mobile responsive (check on phone)

---

## What You Built Today

| Asset | Method |
|-------|--------|
| AI Workspace | CLAUDE.md + skills folder |
| Blog Writer Skill | Reusable workflow for content |
| Landing Page | AI-generated from your context |
| Live Website | Deployed to Vercel |
| First Blog Post | Generated by your skill |

**Everything after the first hour was AI-assisted.** That's the point.

---

## Day 1 Troubleshooting

| Problem | Solution |
|---------|----------|
| `claude` command not found | Check npm path, try `npx @anthropic-ai/claude-code` |
| Claude doesn't know project context | Make sure CLAUDE.md is in project root |
| Skill doesn't work | Check SKILL.md syntax, especially frontmatter |
| Deploy fails | Check Vercel build logs, usually missing dependency |
| Content too generic | Give Claude more specific context in CLAUDE.md |

---

## The Meta-Lesson

Today wasn't about learning to code. It was about learning to **build systems that build things.**

- CLAUDE.md = Your project's brain
- Skills = Your repeatable workflows
- AI-assisted building = 10x faster than manual

Tomorrow you add users. But Claude already knows your project. The hard part is done.

---

## Practice Exercises

Complete these exercises to solidify today's skills:

1. **[Build Your AI Workspace](exercises/01-ai-workspace.md)** (45 min)
   - Set up Claude Code properly
   - Create a CLAUDE.md that captures your project
   - Verify AI understands your context

2. **[Create Your First Skill](exercises/01-blog-skill.md)** (30 min)
   - Build a reusable blog-writer skill
   - Test it generates consistent content
   - Save your first AI-generated blog post

---

## Homework (Optional)

Tonight:
1. **Share your URL** — Post somewhere, get reactions
2. **Generate 2 more blog posts** — Test your skill's consistency
3. **Refine CLAUDE.md** — Add anything you learned about your product today
4. **Add one more page** — About or Features, using AI

---

*Tomorrow: Users sign up for your app. Auth + database, AI-assisted.*
