---
title: "Build a Free AI Blog Writing Agent with Claude Code"
description: "Create your own SEO-optimized blog writer using Claude Code and MCP. Zero monthly fees, full customization. Complete setup guide with code."
date: 2026-01-10
lastmod: 2026-01-10
slug: "build-free-ai-blog-writing-agent-claude-code"
author: "code:zero Content Team"
tags:
  - ai-agents
  - claude-code
  - mcp
  - tutorials
  - content-automation
categories:
  - Tutorials
draft: false
seo:
  primary_keyword: "build ai blog writing agent"
  secondary_keywords:
    - ai content writer free
    - mcp blog writer
    - claude code tutorial
    - ai blog generator
  search_volume: 600
  difficulty: 66
  intent: "informational"
  competitor_benchmark:
    top_word_count: 6500
    target_word_count: 6500
sources:
  - title: "Claude Code Documentation"
    url: "https://docs.anthropic.com/en/docs/claude-code"
  - title: "Model Context Protocol"
    url: "https://modelcontextprotocol.io"
---

# Build a Free AI Blog Writing Agent with Claude Code

AI blog writing tools cost $30-100/month. Jasper charges $49/month for their Creator plan. Copy.ai wants $49/month. Writesonic starts at $20/month. That's $240-1,200/year just to generate blog posts.

Here's the thing: you can build a better system yourself in 30 minutes. For free.

![AI Agent Builder](/images/blog/ai-agent-build.jpg)

This tutorial shows you how to create a fully-automated AI blog writing agent using Claude Code and MCP (Model Context Protocol). The result: a system that researches keywords, analyzes competitors, checks content depth, and generates SEO-optimized blog posts—all from a single command in your terminal.

No subscriptions. Full control. Unlimited usage. And because you own the system, you can customize every aspect: the voice, the structure, the output format, even which AI model powers it.

By the end of this guide, you'll have a production-ready blog writing system that rivals (and in many ways exceeds) what the paid tools offer.

## What You'll Build

Let's be specific about what this system does. By the end of this tutorial, you'll have:

### SEO Research Integration

Your blog writer will connect to real SEO data through the Model Context Protocol. This means:

- **Keyword difficulty scores** - Know how hard it is to rank before you write
- **Search volume estimates** - Target keywords people actually search for
- **SERP analysis** - See what's ranking and why
- **Competitor domain ratings** - Understand the authority you're competing against

This isn't guesswork. It's the same data SEO professionals pay hundreds of dollars per month to access through tools like Ahrefs or SEMrush.

### Automated 5-Phase Workflow

The system runs a complete content creation pipeline:

1. **Keyword Research** - Find the best keyword to target
2. **Competitive Analysis** - Analyze what's ranking and find gaps
3. **Content Depth Analysis** - Measure competitor word counts and structure
4. **Content Brief** - Create an outline optimized for the target keyword
5. **Article Generation** - Write the full post in your brand voice
6. **Quality Control** - Validate SEO requirements before saving

Each phase feeds into the next. The keyword research informs the competitive analysis. The competitive analysis sets the content depth targets. The depth targets guide the writing. It's a closed loop that produces consistently high-quality output.

### Content Depth Matching

This is the feature that separates this system from basic AI writers. Before writing a single word, the agent:

1. Fetches the top 3 ranking articles for your keyword
2. Analyzes their word count, section structure, and content elements
3. Sets dynamic targets based on what's actually ranking
4. Writes to match or exceed the top competitor

If the #1 result has 6,500 words, 10 sections, and an FAQ—your article will too. No more guessing whether 2,000 words is enough.

### Multi-Format Output

Every article is saved in multiple formats:

- **Markdown** (.md) - With Hugo/Astro-compatible frontmatter for your blog
- **Word Document** (.docx) - For sharing with editors or clients
- **HTML** (.html) - For quick preview or direct publishing

Each article gets its own folder with all formats included.

### Brand Voice Enforcement

The system includes a voice guide that enforces your brand's tone across every article. Define rules like:

- Use imperatives (Build, Ship, Launch)
- Lead with outcomes
- No buzzwords
- Specific timelines and costs

The agent checks its output against these rules before saving.

## Prerequisites

Before we start building, make sure you have these installed:

### Required

**1. Claude Code**

Claude Code is Anthropic's official CLI tool. Install it with:

```bash
npm install -g @anthropic-ai/claude-code
```

Or if you prefer:

```bash
brew install claude-code
```

After installation, authenticate with your Anthropic API key:

```bash
claude auth
```

**2. Python 3.10+**

The SEO research MCP requires Python. Check your version:

```bash
python3 --version
```

If you need to install or upgrade, use [pyenv](https://github.com/pyenv/pyenv) or download from [python.org](https://python.org).

**3. CapSolver API Key**

The SEO MCP uses CapSolver to handle CAPTCHAs when fetching keyword data. The free tier is generous—enough for hundreds of lookups.

1. Go to [capsolver.com](https://capsolver.com)
2. Create a free account
3. Navigate to your dashboard
4. Copy your API key

Keep this key handy. You'll need it in a few minutes.

### Optional (But Helpful)

- **A static site generator** (Hugo, Astro, Next.js) - For publishing the markdown output
- **Node.js 18+** - For generating DOCX files
- **pandoc** - For converting markdown to HTML (`brew install pandoc`)

## Understanding MCP: The Power Behind the System

Before we install anything, let's understand what makes this system powerful.

MCP (Model Context Protocol) is a standard that lets AI assistants connect to external tools and data sources. Think of it as a plugin system for Claude.

Without MCP, Claude can only work with what's in the conversation. With MCP, Claude can:

- Query live SEO databases
- Fetch web pages
- Read and write files
- Connect to APIs
- Access databases

For our blog writer, MCP provides the bridge between Claude's writing ability and real-world SEO data.

### How MCP Differs from Web Search

You might wonder: "Can't Claude just search the web for keyword data?"

Here's the difference:

| | **Web Search** | **SEO MCP** |
|---|----------------|-------------|
| Data type | Unstructured snippets | Structured JSON |
| Keyword difficulty | Can't get this | Exact score (0-100) |
| Search volume | Can't get this | Monthly estimates |
| SERP analysis | Just titles/URLs | Domain ratings, traffic |
| Programmatic | Agent has to guess | Reliable parsing |

Web search tells you *what* ranks. MCP tells you *why* it ranks and *how hard* it is to compete.

### The MCP Architecture

Here's how the pieces fit together:

```
┌─────────────────────────────────────────────────────┐
│  YOU                                                │
│  "Write a blog post about AI agents"                │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│  CLAUDE CODE (the agent)                            │
│  - Interprets your request                          │
│  - Loads the blog-writer skill                      │
│  - Executes the 5-phase workflow                    │
│  - Calls MCP tools when needed                      │
│  - Writes the final output                          │
└──────────────────────┬──────────────────────────────┘
                       │ calls
                       ▼
┌─────────────────────────────────────────────────────┐
│  SEO RESEARCH MCP (tool server)                     │
│  - keyword_generator()                              │
│  - keyword_difficulty()                             │
│  - get_traffic()                                    │
│  - get_backlinks_list()                             │
└─────────────────────────────────────────────────────┘
```

Claude Code is the brain. MCP is the hands. The skill file is the instructions that tell the brain how to use the hands.

## Install the SEO Research MCP

Now let's set up the SEO data connection.

### Step 1: Install the MCP Package

Open your terminal and run:

```bash
pip install seo-mcp
```

This installs the SEO research MCP server. It's a Python package that runs locally and connects to SEO data APIs.

### Step 2: Configure the MCP in Claude Code

Add the MCP to Claude Code:

```bash
claude mcp add seo-research
```

When prompted for the configuration, enter:

```json
{
  "command": "python",
  "args": ["-m", "seo_mcp"],
  "env": {
    "CAPSOLVER_API_KEY": "your-actual-key-here"
  }
}
```

Replace `your-actual-key-here` with the CapSolver API key you got earlier.

### Step 3: Verify the Installation

Let's make sure everything works. Start Claude Code:

```bash
claude
```

Then test the MCP:

```
What's the keyword difficulty for "ai writing tools"?
```

You should get back something like:

```
Keyword: ai writing tools
Difficulty: 72
SERP Results:
1. jasper.ai (DR: 71, traffic: 12,400)
2. copy.ai (DR: 68, traffic: 8,200)
3. writesonic.com (DR: 65, traffic: 6,800)
...
```

If you see difficulty scores and SERP data, the MCP is working.

### Step 4: Understand the Available Tools

The SEO MCP provides four tools:

**keyword_generator(keyword)**
- Input: A seed keyword
- Output: Related keywords with search volumes and difficulty scores
- Use: Finding keyword opportunities

**keyword_difficulty(keyword)**
- Input: A target keyword
- Output: Difficulty score (0-100), SERP analysis with domain ratings and traffic
- Use: Evaluating competition, finding competitor URLs for content analysis

**get_traffic(domain)**
- Input: A domain name
- Output: Traffic estimates, top pages, ranking keywords
- Use: Analyzing competitors, finding content gaps

**get_backlinks_list(domain)**
- Input: A domain name
- Output: Backlink sources with authority scores
- Use: Understanding why sites rank, finding link opportunities

For blog writing, you'll primarily use `keyword_difficulty`—it gives you both the competition data and the URLs you need for content depth analysis.

## Create the Blog Writer Skill

Claude Code uses "skills" to define specialized workflows. A skill is just a markdown file with instructions that Claude follows.

### Step 1: Create the Skill Directory

```bash
mkdir -p .claude/skills/blog-writer/assets
```

This creates the folder structure:

```
.claude/
└── skills/
    └── blog-writer/
        ├── skill.md          # Main skill file (we'll create this)
        └── assets/
            ├── voice-guide.md    # Brand voice rules
            └── post-template.md  # Output template
```

### Step 2: Create the Main Skill File

Create `.claude/skills/blog-writer/skill.md` with this content:

```markdown
---
name: blog-writer
description: Automated SEO blog writer. Takes a seed keyword and generates optimized articles in multiple formats.
---

# Blog Writer

Input a seed keyword, get a complete blog post optimized for search.

## WORKFLOW

### Phase 1: Keyword Research

1. Call `keyword_generator(seed_keyword)` for related keywords
2. Call `keyword_difficulty(top_candidate)` for SERP analysis
3. Select primary keyword (volume 500-5000, difficulty <40 preferred)
4. Identify 3-5 secondary keywords

### Phase 2: Competitive Analysis + Content Depth

1. Get top 3 URLs from keyword_difficulty results
2. Fetch each URL with WebFetch
3. Analyze:
   - Word count
   - Number of sections (H2/H3)
   - FAQ present? How many questions?
   - Code examples?
   - Step-by-step guides?
4. Set targets:
   - Word count: Match or exceed top educational article
   - Sections: Match structure of #1 result
   - Include all elements found in top 3

### Phase 3: Content Brief

- Hook that differentiates from competitors
- Outline matching target structure
- Key points for each section
- Statistics to include (with sources)

### Phase 4: Write the Article

- Match word count target from Phase 2
- Include all structural elements identified
- Follow voice guide
- Add FAQ if competitors have one

### Phase 5: Output

Save to `/blog-articles/{slug}/`:
- {slug}.md (with frontmatter)
- {slug}.docx (via docx skill)
- {slug}.html (via pandoc)
```

This is a simplified version. The full skill file has more detail—you can expand each phase as needed.

### Step 3: Create the Voice Guide

Create `.claude/skills/blog-writer/assets/voice-guide.md`:

```markdown
# Brand Voice Guide

Write like a builder talking to another builder. Direct, specific, no fluff.

## DO

### Use Imperatives
- Build, Ship, Launch, Deploy, Create
- "Build your first agent" not "You could consider building an agent"

### Lead with Outcomes
- "Ship in 2 weeks, not 2 months"
- "Cut deploy time from 4 hours to 15 minutes"

### Give Specifics
- Tool names: "Use Supabase for auth"
- Timelines: "Setup takes 30 minutes"
- Costs: "Free tier handles 10K requests/month"

### Be Direct
- "Here's exactly how to..."
- "The code looks like this..."

## DON'T

### No Buzzwords
Banned: revolutionary, game-changing, cutting-edge, best-in-class, synergy, leverage, unlock, unleash, empower

### No Vague Promises
Avoid: "unlock your potential", "transform your business", "take it to the next level"

### No Fluffy Intros
Never start with: "In today's fast-paced world...", "Have you ever wondered...", "It's no secret that..."

## Headline Patterns

Good:
- "Build [X] in [Time]" — "Build an AI Agent in 4 Hours"
- "How to [Action] Without [Pain]" — "How to Ship Weekly Without Burnout"

Bad:
- "Unlocking the Power of..."
- "The Ultimate Guide to Everything About..."
```

### Step 4: Create the Post Template

Create `.claude/skills/blog-writer/assets/post-template.md`:

```markdown
# Post Template

## Frontmatter

```yaml
---
title: "{title}"
description: "{150-160 char description}"
date: {YYYY-MM-DD}
slug: "{slug}"
author: "Your Name"
tags:
  - {tag1}
  - {tag2}
categories:
  - {category}
seo:
  primary_keyword: "{keyword}"
  secondary_keywords:
    - {kw1}
    - {kw2}
  competitor_benchmark:
    top_word_count: {number}
    target_word_count: {number}
---
```

## Structure

1. Hook (2-3 sentences, specific stat or bold claim)
2. Overview of what reader will achieve
3. Sections (match competitor depth)
4. FAQ (if competitors have one)
5. Conclusion with CTA
```

## Test the Blog Writer

Let's run it. Open Claude Code:

```bash
claude
```

Then invoke the skill:

```
Write a blog post about building chatbots with Claude
```

The system will:

1. **Research keywords** - Query the MCP for difficulty and volume
2. **Fetch competitors** - Get the top 3 ranking URLs
3. **Analyze depth** - Count words and sections in each
4. **Set targets** - Determine optimal length and structure
5. **Write the post** - Generate content matching targets
6. **Save files** - Output to `/blog-articles/{slug}/`

Watch the process. You'll see each phase execute, with the agent showing its work.

## How the Content Depth Analysis Works

This is the key innovation that makes this system competitive with paid tools. Let's break it down.

### The Problem with Static Word Counts

Most AI writing tools say "write 2,000 words" or "write a long-form article." But what if:

- The top result for your keyword is 6,500 words?
- The #1 article has 10 sections and yours has 4?
- Every competitor has an FAQ and you don't?

You'll lose. Google rewards comprehensive content that matches search intent. If searchers expect depth, you need depth.

### The Solution: Analyze Before Writing

Before writing a single word, the blog writer:

**1. Gets SERP data from the MCP**

```
keyword_difficulty("ai blog writer free")
→ Returns top 10 URLs with domain ratings
```

**2. Fetches the top 3 articles**

```
WebFetch(url1) → content analysis
WebFetch(url2) → content analysis
WebFetch(url3) → content analysis
```

**3. Measures each article**

For each competitor, the agent counts:
- Total word count
- Number of H2 sections
- Number of H3 subsections
- FAQ present? How many questions?
- Code examples present?
- Tables/comparisons present?
- Step-by-step numbered lists?

**4. Creates a benchmark table**

| Rank | URL | Words | Sections | FAQs | Code |
|------|-----|-------|----------|------|------|
| #1 | ryrob.com | 6,500 | 10 | 6 | Yes |
| #2 | hubspot.com | 1,200 | 4 | 0 | No |
| #3 | grammarly.com | 1,400 | 5 | 4 | No |

**5. Sets dynamic targets**

The agent identifies that:
- ryrob.com is an educational article (our type)
- hubspot.com and grammarly.com are product pages (different intent)

So the target becomes:
- **Word count**: 6,500+ (match ryrob)
- **Sections**: 10+ (match ryrob)
- **FAQs**: 6 questions (match ryrob)
- **Code examples**: Yes (match ryrob)

### Why This Matters

Without depth analysis, you might write a 2,000-word article and wonder why it doesn't rank. With depth analysis, you know exactly what the bar is before you start.

This is the same process professional SEO content teams use—except automated.

## Customize the System for Your Brand

The skill files are just markdown. Edit them to match your needs.

### Change the Target Audience

Update the voice guide for your audience:

```markdown
## Our Audience
- Technical founders building AI products
- Prefer code examples over screenshots
- Assume familiarity with APIs and CLIs
- Don't over-explain basics
```

### Add Topic Restrictions

Add guidelines to the skill file:

```markdown
## Topic Guidelines
- Focus: AI agents, automation, developer productivity
- Avoid: Crypto, politics, medical advice
- Always include: Working code examples, GitHub links
- Perspective: Practical builder, not academic researcher
```

### Modify the Output Format

Change the frontmatter for your CMS:

```yaml
# For Next.js MDX
---
title: "{title}"
publishedAt: "{date}"
summary: "{description}"
image: "/blog/{slug}/cover.png"
readingTime: "{calculated}"
---
```

### Add Custom Quality Checks

Extend the quality checklist:

```markdown
## Custom Checks
- [ ] At least 3 code blocks
- [ ] External links to authoritative sources
- [ ] Internal link to related article
- [ ] Call-to-action mentions newsletter
```

## Advanced: Extend with More MCPs

The SEO MCP is just the beginning. You can add more tools:

### Web Search MCP

For real-time research and fact-checking:

```bash
claude mcp add web-search
```

Now your agent can search the web during the research phase to find statistics, quotes, and recent developments.

### Database MCP

Store and query past articles:

```bash
claude mcp add sqlite
```

Use this to:
- Track which keywords you've already targeted
- Find internal linking opportunities
- Measure content performance over time

### Image Generation MCP

Auto-generate cover images:

```bash
claude mcp add image-gen
```

Add to your skill:

```markdown
### Phase 6: Cover Image
Generate a cover image using the article title and save to {slug}/cover.png
```

### Custom MCPs

You can build your own MCPs for:
- CMS integration (auto-publish to WordPress)
- Analytics (pull performance data)
- Social media (generate tweet threads)
- Email (create newsletter versions)

## Troubleshooting Common Issues

### MCP Not Responding

**Symptom**: Claude says it can't access SEO data.

**Fix**:

1. Check the MCP is listed:
```bash
claude mcp list
```

2. If missing, re-add it:
```bash
claude mcp remove seo-research
claude mcp add seo-research
```

3. Verify your CapSolver key is correct in the config.

### Keyword Data Returns Empty

**Symptom**: keyword_generator returns no results.

**Causes**:
- CapSolver credits exhausted
- Very niche keyword with no data
- API rate limiting

**Fixes**:
1. Check CapSolver dashboard for remaining credits
2. Try a broader keyword
3. Wait a few minutes and retry
4. Fall back to web search for keyword research

### Content Comes Out Too Short

**Symptom**: Article is 2,000 words but target was 6,000.

**Causes**:
- Agent didn't complete all sections
- Sections are too brief
- Missing elements (FAQ, examples)

**Fixes**:
1. Add explicit length requirements to skill file:
```markdown
## Length Requirements
- If target is 5,000+ words, each H2 section must be 500+ words
- FAQ section must have 6+ questions with detailed answers
- Include at least 5 code examples
```

2. Ask Claude to expand specific sections after generation.

### Voice Doesn't Match Brand

**Symptom**: Output sounds generic despite voice guide.

**Fixes**:
1. Add more examples to voice guide:
```markdown
## Examples

WRONG: "This innovative solution leverages cutting-edge AI."
RIGHT: "This tool uses Claude's API. Here's the code."

WRONG: "In today's competitive landscape..."
RIGHT: "Your competitors ship faster. Here's how to catch up."
```

2. Include sample paragraphs in the style you want.

3. Add negative examples: "Never write sentences like..."

### WebFetch Fails for Competitor URLs

**Symptom**: Can't analyze competitor content depth.

**Causes**:
- Site blocks automated requests
- URL requires authentication
- Rate limiting

**Fixes**:
1. The skill should skip failed URLs and use remaining data
2. If all fail, default to 3,000 word target
3. Manually provide competitor URLs if needed

## Frequently Asked Questions

### How much does this cost to run?

**$0/month for the infrastructure.** You only pay for Claude API usage, which is:
- ~$0.01-0.03 per blog post for Claude Sonnet
- ~$0.05-0.15 per blog post for Claude Opus

Compare to $49-100/month for Jasper or Copy.ai.

### Can I use a different AI model?

Yes. Claude Code supports multiple models:
- `claude-3-sonnet` - Fast, cost-effective (default)
- `claude-3-opus` - Higher quality, slower
- `claude-3-haiku` - Fastest, cheapest

Change with:
```bash
claude config set model claude-3-opus
```

### How does this compare to ChatGPT + plugins?

| Feature | This System | ChatGPT + Plugins |
|---------|-------------|-------------------|
| SEO data | Real-time via MCP | Limited plugins |
| Content depth | Automated analysis | Manual |
| Output formats | MD, DOCX, HTML | Copy/paste |
| Customization | Full control | Plugin-dependent |
| Cost | API usage only | $20/month + API |
| Brand voice | Enforceable rules | Prompt-dependent |

### Is the content original?

Yes. Claude generates original content based on:
- Your keyword and topic
- Competitor analysis (structure, not content)
- Your brand voice guide
- The specific outline created

It doesn't copy competitor text—it matches their depth and structure while creating original content.

### Can I use this for client work?

Absolutely. Common workflows:
1. Create one skill per client (with their voice guide)
2. Generate drafts in bulk
3. Export DOCX for client review
4. Apply edits and publish

The multi-format output makes client collaboration easy.

### How do I add images to articles?

Currently, you need to add images manually after generation. Options:
1. Add an image MCP for auto-generation
2. Create a post-processing step
3. Use placeholder syntax: `![Alt text](image-placeholder-1.png)`

## What You've Built

Let's recap. You now have a blog writing system that:

**Researches like a pro**
- Real keyword difficulty scores
- Search volume data
- Competitor domain analysis
- Content depth benchmarking

**Writes to rank**
- Dynamic word count targets
- Structure matching top results
- FAQ sections when competitors have them
- All elements needed to compete

**Outputs professionally**
- Markdown with SEO frontmatter
- Word documents for sharing
- HTML for preview
- Organized in per-article folders

**Costs nothing**
- No monthly subscriptions
- No per-article fees
- Only standard API usage
- Full ownership of the system

Compare this to the alternatives:

| Tool | Monthly Cost | Your System |
|------|-------------|-------------|
| Jasper | $49-125 | $0 |
| Copy.ai | $49+ | $0 |
| Writesonic | $20-99 | $0 |
| Content at Scale | $250+ | $0 |

And you get more control, better customization, and the ability to extend with additional MCPs.

## Start Writing Today

Here's your action plan:

### Quick Start (30 minutes)

1. **Install Claude Code** - 5 minutes
```bash
npm install -g @anthropic-ai/claude-code
claude auth
```

2. **Get CapSolver API key** - 5 minutes
   - Sign up at capsolver.com
   - Copy key from dashboard

3. **Install SEO MCP** - 5 minutes
```bash
pip install seo-mcp
claude mcp add seo-research
```

4. **Create the skill files** - 10 minutes
   - Copy the skill.md, voice-guide.md, post-template.md from this article

5. **Generate your first post** - 5 minutes
```bash
claude
> Write a blog post about [your topic]
```

### First Week

1. **Generate 3-5 articles** to test the system
2. **Refine your voice guide** based on output quality
3. **Adjust the skill workflow** for your needs
4. **Set up your blog** to accept the markdown output

### First Month

1. **Publish consistently** using the system
2. **Monitor rankings** for your target keywords
3. **Iterate on the process** based on results
4. **Add more MCPs** as needed (images, analytics, etc.)

### The Builder's Advantage

Most people will read this article and think "that's cool" but never build it.

You're different. You're a builder. You see a system that can be constructed, and you construct it.

Thirty minutes from now, you could have a blog writing system that rivals $100/month tools. Six months from now, you could have a library of ranking content—all generated by a system you own and control.

The best time to start was yesterday. The second best time is now.

Open your terminal. Run the commands. Build the system. Ship the content.

That's how builders work.

---

*Want to build more AI-powered systems like this? [code:zero](https://codezero.academy) teaches you to ship AI products from day one. No theory, just building.*
