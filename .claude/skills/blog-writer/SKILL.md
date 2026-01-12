---
name: blog-writer
description: Automated SEO blog writer for code:zero. Takes a seed keyword, performs SEO research via MCP, analyzes competitors, and generates blog posts in multiple formats (DOCX, MD, HTML). Use when creating blog content, SEO articles, tutorials, or educational posts. Triggers on phrases like "write a blog post", "create an article about", "blog about", or "SEO content for". Outputs to /blog-articles/{slug}/ folder with all format versions.
---

# code:zero Blog Writer

Fully-automated blog writing system. Input a seed keyword, get blog posts in multiple formats (DOCX, MD, HTML).

## MASTER CONTENT SOURCE

**Before writing any blog post**, consult `/content/master-content.md` for:

1. **Topic Ideas**: The document contains 16+ phases of building code:zero from scratch—each phase is a potential blog post or series
2. **Authentic Experiences**: Real lessons learned, mistakes made, and wins achieved
3. **Tech Stack Details**: Exact tools, commands, and configurations used
4. **Teaching Moments**: Every `[LESSON]` tag marks a teachable insight

**How to Use**:
- If user provides a keyword → Still check master-content for relevant real-world examples
- If user asks "what should I write about" → Extract topics from master-content phases
- If writing tutorials → Pull actual commands/code from master-content
- For thought leadership → Use the "Key Lessons" section for authentic takes

**Topic Extraction Examples**:
| Master Content Phase | Blog Post Angle |
|---------------------|-----------------|
| Phase 4: Student Portal | "How to Build a Student Dashboard with SvelteKit" |
| Phase 10: Social Media Automation | "Automate Your Social Media with AI + n8n" |
| Phase 14: Email Marketing System | "Build an AI Email Marketing Engine from Scratch" |
| Phase 15: Browser Automation | "Chrome Automation with Claude Code MCP" |
| Key Lessons: AI-First | "Why I Let AI Write 80% of My Code" |

This ensures all code:zero blog content is grounded in **real experience**, not generic advice.

---

## WRITING STYLE (alexop.dev Pattern)

**Reference**: alexop.dev articles demonstrate the exact tone we want—techy, lengthy, well-written, simple language.

### Core Principles

1. **Problem-First Opening**
   - Open with a relatable pain point or problem
   - Make the reader nod and think "yes, I've experienced this"
   - NO generic "In today's fast-paced world..." intros
   - Example: "You've probably spent hours debugging a race condition that shouldn't exist."

2. **Layered Explanations**
   - Structure: Definition → Diagram/Visual → Code → Trade-offs
   - Don't dump code first. Build understanding first.
   - Each layer adds depth: concept → visual → implementation → gotchas

3. **Code-as-Reinforcement**
   - Code appears AFTER the conceptual explanation, never before
   - Code blocks should be minimal and focused (one concept per block)
   - Follow every code block with a plain language explanation
   - Bad: "Here's how to do X: [50 lines of code]"
   - Good: "The key insight is [concept]. Here's what that looks like: [10 lines]. Notice how [specific detail]."

4. **First-Person Accessible Voice**
   - Use "I" and "you" liberally—it's a conversation, not a textbook
   - "I spent two days figuring this out so you don't have to"
   - Admit when something was hard or confusing
   - Share the journey, not just the destination

5. **Honest Trade-offs**
   - ALWAYS acknowledge limitations and edge cases
   - "This approach works great for X, but breaks down when Y"
   - Builds credibility—readers trust you more when you're honest
   - Never oversell a solution

6. **Persona Humanization**
   - Introduce characters to illustrate points: "Sarah, a solo founder..."
   - Makes abstract concepts concrete through scenarios
   - Helps readers see themselves in the content

### Sentence Rhythm

Vary sentence length deliberately:

- **Short punchy**: "It failed." / "That's the key." / "Here's why."
- **Medium explanatory**: "The problem is that most tutorials skip this critical step."
- **Long multi-clause**: "When you combine the event loop's single-threaded nature with the async/await syntax that JavaScript developers have grown comfortable with, you get a pattern that looks synchronous but behaves very differently under load."

Mix all three. Monotonous sentence length = boring reads.

### Structure Guidelines

**For tutorials (1500-3000 words)**:
1. Problem setup (why this matters)
2. Conceptual foundation (how it works)
3. Step-by-step implementation (code + explanation pairs)
4. Common pitfalls (what breaks and why)
5. Where to go next

**For thought leadership (1000-2000 words)**:
1. Hot take or controversial premise
2. Evidence and examples
3. Counter-arguments addressed honestly
4. Practical implications
5. Call to action or reflection

### What to AVOID

- Generic SEO filler ("In this comprehensive guide...")
- Over-explaining obvious things
- Walls of code without context
- Hedging language ("might", "could potentially", "it's possible that")
- Corporate tone ("leverage", "utilize", "facilitate")
- Clickbait that doesn't deliver

### Quality Bar

Before publishing, ask:
- Would a developer at alexop.dev publish this?
- Does the opening hook the reader in the first sentence?
- Is every code block preceded by conceptual explanation?
- Did I admit at least one limitation or trade-off?
- Is the sentence rhythm varied?
- Would I actually read this?

---

## WORKFLOW (6 Phases)

### Phase 0: Performance Intelligence (SEO MCP)

**Goal**: Learn what's working before writing anything new.

**Run this phase when**:
- User asks "what should I write about?"
- User wants topic ideas
- Starting a new content planning session

**Using SEO Research MCP**:

1. **Check Our Traffic** (what's working for us):
   ```
   get_traffic("codezero.my")
   ```
   - Which pages get the most traffic?
   - What topics are resonating?
   - Where are we ranking well?

2. **Check Competitor Traffic** (what's working for them):
   ```
   get_traffic("competitor-domain.com")
   ```
   Run on 2-3 competitors in our space:
   - buildinpublic.com, indiehackers.com, freecodecamp.org
   - What are their top-performing pages?
   - What topics drive their traffic?

3. **Find Trending Keywords** (what's growing):
   ```
   keyword_generator("ai coding")
   keyword_generator("learn to code with ai")
   keyword_generator("ship side projects")
   ```
   - Look for rising search volumes
   - Identify emerging topics before competition

4. **Backlink Opportunities** (what earns links):
   ```
   get_backlinks_list("competitor-domain.com")
   ```
   - What content types earn the most backlinks?
   - Resource pages, tutorials, tools, or thought leadership?

**Output**: Topic recommendations with data:

| Topic Idea | Source | Evidence |
|------------|--------|----------|
| "Build with Claude MCP" | Keyword trend | 2,400 vol, +180% YoY |
| "AI coding workflow" | Competitor traffic | #3 page on freecodecamp |
| "Ship in a weekend" | Our traffic | Top 5 page, high engagement |
| "No-code vs AI-code" | Backlink analysis | 47 referring domains |

**Then**: User picks a topic → proceed to Phase 1 (Keyword Research)

Execute all phases automatically unless the user requests a checkpoint.

---

### Phase 1: Keyword Research

**Goal**: Find the optimal primary keyword and supporting secondary keywords.

**FIRST: Check for existing research**

1. Look in `/research/keywords/` for a recent file matching the topic
2. If found (created within last 7 days), use that research:
   - Read the file
   - Extract primary keyword from "Quick Wins" or user's choice
   - Extract secondary keywords from "All Keyword Opportunities"
   - Extract questions from "Question Keywords"
   - Skip to Phase 2

3. If no research exists, inform the user:
   ```
   No keyword research found for this topic.

   Options:
   1. Run `/keyword-research [topic]` first (recommended)
   2. Continue with basic keyword research (less data)
   ```

   If user chooses to continue without research, proceed below.

**Using SEO Research MCP** (if available):
1. Call `keyword_generator(seed_keyword)` to get:
   - Related keywords
   - Search volumes
   - Difficulty scores

2. Call `keyword_difficulty(top_candidate)` to get:
   - SERP analysis
   - Competition level

**Selection Criteria**:
- Prefer search volume 500-5,000 monthly (sweet spot)
- Target difficulty score <40 (achievable ranking)
- Align with code:zero audience (builders, founders, developers)

**Fallback** (if MCP unavailable):
- Use web search for "[seed keyword] related keywords"
- Use web search for "[seed keyword] search volume"
- Proceed with best available data

**Output**:
- Primary keyword (1)
- Secondary keywords (3-5)
- Search intent classification (informational/transactional/navigational)
- Question keywords to address in content (if from research file)

---

### Phase 2: Competitive Analysis + Content Depth Analysis

**Goal**: Understand what's ranking, analyze content depth, and find differentiation opportunities.

**Part A: SERP Analysis**
1. Get top 5 SERP results from `keyword_difficulty()` or web search
2. Note content types:
   - Product/landing pages (short, authority-based)
   - Educational articles (long, content-based)
3. Identify which type matches our intent

**Part B: Content Depth Analysis** (CRITICAL)
Fetch and analyze the top 3 ranking URLs using WebFetch:

```
For each top URL:
1. Fetch the page content
2. Count approximate word count
3. Analyze structure:
   - Number of H2/H3 sections
   - FAQ section (yes/no, how many questions)
   - Code examples (yes/no)
   - Step-by-step sections (yes/no)
   - Images/diagrams mentioned
   - Tables/comparisons
```

**Create Content Benchmark Table**:
| Rank | URL | Words | Sections | FAQs | Code | Type |
|------|-----|-------|----------|------|------|------|
| #1 | example.com | 6,500 | 10 | 6 | Yes | Educational |
| #2 | other.com | 1,200 | 4 | 0 | No | Product page |
| #3 | third.com | 4,200 | 8 | 4 | Yes | Educational |

**Set Dynamic Targets** based on analysis:
- **Target word count**: Match or exceed top educational article (not product pages)
- **Required sections**: Match structure of #1 ranking content
- **Must include**: Any elements present in top 3 (FAQs, code, tables, etc.)

**Part C: Gap Analysis**
1. What topics do ALL top results cover? (table stakes)
2. What are they NOT covering? (opportunity)
3. What unique angle can code:zero take? (differentiation)

**Output**:
- Competitive summary
- **Target word count** (from content depth analysis)
- **Required structural elements** (FAQs, code, etc.)
- Recommended content format
- Unique angle for code:zero

---

### Phase 3: Content Brief

**Goal**: Create internal structure for the blog post, including image planning.

**Reference**: `/templates/content-brief-template.md` for structure patterns.

**Generate**:
1. **Hook**: Opening statement that differentiates from competitors
2. **Outline**: H2/H3 structure with key points per section
3. **Statistics**: 3-5 data points to include (with sources)
4. **Examples**: Concrete code snippets or step-by-step instructions
5. **CTA**: What action should readers take?
6. **Image Plan**: Visual content strategy for the article

**Image Planning** (REQUIRED):

Plan images for maximum impact and SEO value:

| Image Type | Placement | Purpose |
|------------|-----------|---------|
| Featured Image | Top/thumbnail | Hero visual, social sharing |
| Section Images | After H2 headings | Break up text, illustrate concepts |
| Diagrams | Complex concepts | Explain workflows, architecture |
| Screenshots | Tutorials/how-tos | Show exact steps |
| Code Output | Code sections | Show results |

**Image Requirements Per Article**:
- **Minimum**: 3 images (featured + 2 section images)
- **Recommended**: 1 image per 500 words
- **Maximum**: Don't overload - images should add value

**Image Brief Format**:
```
Image 1 (Featured):
- Purpose: Hero image for social/thumbnail
- Subject: [What it should show]
- Style: [Photo/illustration/diagram]
- Search terms: "[keyword] + [style]"

Image 2 (Section: [H2 Title]):
- Purpose: Illustrate [concept]
- Subject: [What it should show]
- Style: [Photo/illustration/diagram]
- Search terms: "[specific terms]"
```

**Note**: Brief is internal only (not saved unless requested).

---

### Phase 4: Content Generation

**Goal**: Write the full blog post in code:zero brand voice, matching or exceeding competitor depth.

**Specifications** (from Phase 2 analysis):
- Word count: **Use target from Phase 2** (match top educational article)
- Structure: Match section count from top competitor
- Voice: See [voice-guide.md](assets/voice-guide.md)
- Include: All structural elements identified in Phase 2 (FAQs, code, tables, etc.)

**Required Elements**:
1. **Opening hook** (first paragraph)
   - Specific stat, bold claim, or pattern interrupt
   - NO "In today's world..." or generic intros

2. **Structured sections** (match competitor depth)
   - Each section delivers actionable value
   - Include code examples where relevant
   - Use bullet points for scanability
   - **Add FAQ section** if competitors have one
   - **Add step-by-step guides** if competitors have them

3. **Concrete specifics**
   - Tools with names and links
   - Timelines ("takes 30 minutes", not "quick")
   - Costs where applicable
   - Real examples, not hypotheticals

4. **Conclusion with CTA**
   - Summarize key takeaway
   - Clear next action for reader
   - Link to code:zero offering where appropriate

**Content Depth Checklist** (verify against Phase 2 targets):
- [ ] Word count meets or exceeds target from Phase 2
- [ ] Section count matches top competitor
- [ ] All required structural elements included (FAQs, code, etc.)
- [ ] Covers all "table stakes" topics from competitor analysis
- [ ] Includes unique angle/differentiation

**Brand Voice Enforcement**:
- Read [voice-guide.md](assets/voice-guide.md) before writing
- Apply DO rules, avoid DON'T violations
- If uncertain, choose the more direct option

---

### Phase 4B: Image Sourcing

**Goal**: Acquire all images from the Image Plan created in Phase 3.

**Image Sources (in order of preference)**:

1. **Unsplash** (Free, high-quality photos)
   - URL: `https://unsplash.com/s/photos/{search-term}`
   - Use WebFetch to find appropriate images
   - Download URL format: `https://images.unsplash.com/photo-{id}?w=1200`
   - Attribution required (include in frontmatter)

2. **Pexels** (Free stock photos)
   - URL: `https://www.pexels.com/search/{search-term}/`
   - Good for people, lifestyle, tech imagery
   - Attribution appreciated but not required

3. **AI Image Generation** (When stock doesn't fit)
   - Use for: Custom diagrams, conceptual illustrations, unique visuals
   - Describe the image clearly for generation
   - Style consistency: Modern, clean, tech-forward

4. **Screenshots** (For tutorials)
   - Capture actual UI/code output
   - Annotate with arrows/highlights as needed
   - Crop to focus on relevant area

**Image Sourcing Process**:

```
For each image in the Image Plan:

1. Search primary source (Unsplash) with search terms
2. Evaluate results:
   - Relevant to content?
   - High quality (min 1200px wide)?
   - Appropriate for code:zero brand (modern, clean)?
3. If found: Download and save
4. If not found: Try secondary source (Pexels)
5. If still not found: Generate via AI or create diagram
```

**Image Specifications**:
- **Featured image**: 1200x630px (social sharing optimized)
- **Section images**: 1200px wide minimum
- **Format**: WebP preferred, fallback to JPG
- **File naming**: `{slug}-{number}-{description}.webp`

**Embedding Images in Content**:
Insert image markdown after relevant sections:

```markdown
## Section Heading

Content paragraph here...

![Alt text describing the image](/blog-articles/{slug}/images/{filename})
*Caption: Brief description of what the image shows*

More content...
```

**Alt Text Requirements** (SEO critical):
- Describe what's IN the image
- Include primary keyword naturally (if relevant)
- Keep under 125 characters
- Don't start with "Image of..." or "Picture of..."

---

### Phase 5: Quality Control & Output

**Goal**: Validate and save CMS-ready markdown.

**Run Quality Checklist** (see [quality-checklist.md](assets/quality-checklist.md)):

**SEO Checks**:
- [ ] Primary keyword in title
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in at least one H2
- [ ] Primary keyword in conclusion
- [ ] Meta description 150-160 characters

**Structure Checks**:
- [ ] Section count matches Phase 2 target
- [ ] Word count meets Phase 2 target (based on competitor analysis)
- [ ] Opening hook present
- [ ] CTA in final section
- [ ] FAQ section included (if competitors have one)
- [ ] All structural elements from Phase 2 present

**Brand Voice Checks**:
- [ ] No buzzwords (revolutionary, game-changing, etc.)
- [ ] Action verbs in headers
- [ ] Concrete examples present
- [ ] Builder-to-builder tone

**Image Checks**:
- [ ] Minimum 3 images included (featured + 2 section)
- [ ] Featured image is 1200x630px
- [ ] All images have descriptive alt text
- [ ] Alt text includes keyword where natural
- [ ] Images are relevant to surrounding content
- [ ] Image captions add context (not repeat alt text)
- [ ] Images saved in `/images/` subfolder
- [ ] Frontmatter includes image credits/attribution

**Generate Frontmatter** using [post-template.md](assets/post-template.md).

**Image Frontmatter Fields**:
```yaml
image:
  src: "/blog-articles/{slug}/images/{slug}-featured.webp"
  alt: "Descriptive alt text with keyword"
  caption: "Optional caption for featured image"
images:
  - src: "/blog-articles/{slug}/images/{slug}-1-description.webp"
    alt: "Alt text for image 1"
    section: "Section heading where used"
  - src: "/blog-articles/{slug}/images/{slug}-2-description.webp"
    alt: "Alt text for image 2"
    section: "Section heading where used"
image_credits:
  - source: "Unsplash"
    photographer: "Name"
    url: "https://unsplash.com/photos/xxx"
```

**Output Structure**:
Each article gets its own folder in `/blog-articles/`:

```
/blog-articles/{slug}/
├── {slug}.md          # Markdown with frontmatter (primary)
├── {slug}.docx        # Word document for sharing/editing
├── {slug}.html        # HTML version for web preview
└── images/
    ├── {slug}-featured.webp       # Featured/hero image (1200x630)
    ├── {slug}-1-description.webp  # Section image 1
    ├── {slug}-2-description.webp  # Section image 2
    └── ...                         # Additional images as needed
```

**Steps**:
1. Create folder: `/blog-articles/{slug}/`
2. Create images subfolder: `/blog-articles/{slug}/images/`
3. Source and save all images from Image Plan (Phase 4B)
4. Save markdown file with frontmatter (including image references)
5. Use the `document-skills:docx` skill to create DOCX version
6. Convert to HTML using `markdown-it` via Node.js:
   ```bash
   npm install markdown-it && node -e "
   const md = require('markdown-it')();
   const fs = require('fs');
   const content = fs.readFileSync('{slug}.md', 'utf8').replace(/^---[\s\S]*?---\n/, '');
   const html = '<html>...' + md.render(content) + '</html>';
   fs.writeFileSync('{slug}.html', html);
   "
   ```

- Slug: lowercase, hyphenated, derived from title
- Example folder: `build-ai-agent-4-hours/`

---

## ERROR HANDLING

| Scenario | Action |
|----------|--------|
| MCP keyword_generator fails | Use web search for related keywords |
| MCP keyword_difficulty fails | Set difficulty as "unknown", proceed |
| No search volume data | Flag in frontmatter, continue |
| Web search rate limited | Retry 3x with backoff |
| WebFetch fails for competitor URL | Skip that URL, analyze remaining competitors |
| All WebFetch calls fail | Default to 3,000 word target, standard structure |
| Content too short (below Phase 2 target) | Expand sections, add FAQ, add examples |
| Brand voice violation found | Rewrite flagged sections |
| Unsplash search returns no results | Try Pexels, then AI generation |
| Pexels search fails | Fall back to AI image generation |
| Image download fails | Retry 3x, then use placeholder with TODO note |
| Image too small (< 1200px) | Find alternative or upscale if minor |
| No suitable stock images found | Generate via AI or create custom diagram |
| AI image generation unavailable | Use text-based diagram (ASCII/Mermaid) as placeholder |
| Missing image attribution | Add "Source: Unknown" and flag for manual review |

---

## MCP SETUP REQUIREMENTS

The SEO Research MCP enhances keyword research but is optional.

**Prerequisites**:
- Python 3.10+
- CapSolver API key (free tier available at capsolver.com)

**Installation**:
```bash
pip install seo-mcp
```

**Claude Code Configuration**:
Add to MCP settings (`claude mcp add`):
```json
{
  "seo-research": {
    "command": "python",
    "args": ["-m", "seo_mcp"],
    "env": {
      "CAPSOLVER_API_KEY": "your-key-here"
    }
  }
}
```

**Available MCP Tools**:
- `keyword_generator(keyword)` - Related keywords, volumes, difficulty
- `keyword_difficulty(keyword)` - SERP analysis, competition
- `get_traffic(domain)` - Traffic estimates, top pages
- `get_backlinks_list(domain)` - Backlink analysis

---

## EXAMPLE INVOCATION

**User**: "Write a blog post about building AI agents with Claude"

**Execution**:

1. **Keyword Research**
   - Primary: "building AI agents Claude" (vol: 880, diff: 32)
   - Secondary: "Claude API tutorial", "AI agent development", "MCP servers"
   - Intent: Informational/Tutorial

2. **Competitive Analysis + Content Depth**
   - SERP Analysis: Anthropic docs (#1), Medium article (#2), Dev.to tutorial (#3)
   - **Content Depth Analysis**:
     | Rank | URL | Words | Sections | FAQs | Code |
     |------|-----|-------|----------|------|------|
     | #1 | anthropic.com | 4,200 | 8 | 0 | Yes |
     | #2 | medium.com | 2,800 | 6 | 0 | Yes |
     | #3 | dev.to | 3,500 | 7 | 5 | Yes |
   - **Target**: 4,500+ words, 8+ sections, FAQ section, code examples
   - Gap: No practical "ship today" guide
   - Angle: "Ship your first AI agent in 4 hours"

3. **Content Brief**
   - Hook: "Most AI tutorials are theory. Here's working code."
   - Sections: Setup, Core Loop, Tools, Deployment, Real Example, Troubleshooting, FAQ
   - Target: 4,500 words (exceeds #1 competitor)
   - **Image Plan**:
     - Featured: Developer at terminal with code on screen
     - Section 2: Architecture diagram showing agent flow
     - Section 4: Screenshot of deployment dashboard
     - Section 6: Code output showing agent response

4. **Content Generation**
   - 4,800 words with code snippets
   - 8 H2 sections + FAQ (6 questions)
   - Specific tool recommendations
   - 4-hour timeline with milestones

5. **Image Sourcing**
   - Featured: Unsplash "developer coding terminal" → downloaded
   - Architecture: AI-generated workflow diagram → created
   - Deployment: Screenshot placeholder (marked for capture)
   - Code output: Terminal screenshot → captured

6. **Output**
   - Folder: `/blog-articles/build-ai-agent-claude-4-hours/`
   - Files: `.md`, `.docx`, `.html`
   - Images: `/images/` with 4 images + attributions
   - All quality checks passed ✓
   - Word count exceeds competitor benchmark ✓
   - Image count meets minimum (4 images) ✓

---

## OUTPUT LOCATION

All blog posts save to: `/blog-articles/{slug}/`

Each article folder contains:
- `{slug}.md` - Markdown with Hugo/Astro compatible frontmatter
- `{slug}.docx` - Word document for sharing/collaboration
- `{slug}.html` - HTML preview version
- `images/` - Folder containing:
  - `{slug}-featured.webp` - Featured/hero image (1200x630px)
  - `{slug}-{n}-{description}.webp` - Section images
  - Attribution data embedded in frontmatter
