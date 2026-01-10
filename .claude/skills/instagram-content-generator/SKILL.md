---
name: instagram-content-generator
description: Generate complete Instagram posts for code:zero including captions and graphics. Use when creating social media content. Integrates with brand-voice for captions and branded-social-visual for graphics.
---

# Instagram Content Generator

Generate complete Instagram posts for code:zero. This skill combines caption writing with graphic creation and queue file creation.

## WORKFLOW

```
Input: Topic + Content Type
        ↓
1. Generate caption (brand-voice)
        ↓
2. Create graphic (branded-social-visual)
        ↓
3. Upload to Cloudinary (when available)
        ↓
4. Create queue file
        ↓
Output: Ready-to-approve post in /social-media/queue/
```

## CONTENT TYPES

### 1. Educational
Teach something valuable. Position code:zero as the expert.

**Structure:**
- Hook (problem or surprising statement)
- 3-5 bullet points or numbered tips
- Call-to-action (save, share, comment)
- Hashtags

**Example topics:**
- Tool comparisons ("5 AI tools for solo founders")
- How-to tips ("How to ship faster with Claude")
- Myth-busting ("You don't need to learn syntax first")
- Trends ("What's changing in AI coding")

### 2. Promotional
Announce launches, openings, or events.

**Structure:**
- What's happening
- Why it matters to the builder
- What they get / transformation
- Clear CTA (link in bio, DM, etc.)
- Hashtags

**Example topics:**
- Intake opening
- Course launch
- Free resources
- Events/webinars

### 3. Behind-the-Scenes
Show the journey of building code:zero. Builds trust and relatability.

**Structure:**
- What happened
- What we learned
- How it connects to the builder's journey
- Hashtags

**Example topics:**
- Building the website
- Creating course content
- Wins and milestones
- Failures and lessons

### 4. Testimonial
Showcase student success stories and transformations.

**Structure:**
- Before state (struggling, stuck)
- After state (shipped, earning, building)
- Quote or specific result
- CTA for aspiring builders
- Hashtags

### 5. Engagement
Posts designed to spark conversation and boost algorithm.

**Structure:**
- Question or hot take
- Brief context
- Invite opinions
- Hashtags

**Example topics:**
- "What's your biggest fear about learning to code?"
- "AI will replace developers. Agree or disagree?"
- "This or that" choices

---

## CAPTION GUIDELINES

### Apply Brand Voice

Every caption must follow `/brand-voice` principles:
- Clear over clever
- Action-oriented (Build, Ship, Launch, Learn, Create)
- Outcome-focused
- Builder-to-builder tone
- Concise by default

### Caption Structure

```
[HOOK - First line is most important]

[BODY - 3-7 short sentences or bullet points]

[CTA - Question or instruction]

[HASHTAGS - 8-15 relevant tags]
```

### First Line Rules

The first line shows in the feed preview. Make it count:
- Under 125 characters
- Creates curiosity or states bold claim
- No "Hi friends!" or "Hey everyone!"

**Good first lines:**
- "Stop paying for enterprise software."
- "Most people spend months learning to code."
- "This AI stack costs $0."
- "You don't need to be a developer."

### Hashtag Strategy

Use 8-15 hashtags. Mix of:

**Brand hashtags (always include):**
- #codezero
- #buildyourfreedom

**Topic hashtags (pick relevant):**
- #buildinpublic
- #solofounder
- #indiehacker
- #learntocode
- #shipfast
- #aitools
- #aicoding
- #techstack
- #startup
- #founder
- #nocode
- #lowcode
- #webdev
- #appdevelopment

**Trending (if relevant):**
- Check current trends
- Use sparingly

---

## GRAPHIC GUIDELINES

### Visual Style
Use `branded-social-visual` skill to create graphics. Key elements:
- Dark tech aesthetic (#0a0a1a background)
- Neon accents (cyan, magenta, purple)
- Bold typography (Outfit font)
- Double chevrons (>>) brand mark
- "Build your freedom" tagline

### Format Selection

| Format | Dimensions | Best For |
|--------|------------|----------|
| Square | 1080x1080 | Feed posts, carousels |
| Portrait | 1080x1350 | Higher engagement, more real estate |
| Story | 1080x1920 | Stories, temporary content |

**Default to square** unless content benefits from portrait.

### Text on Graphics

- Keep text minimal (headline + 1-2 bullets max)
- The caption carries the detail
- Graphic is for stopping the scroll

---

## IMPLEMENTATION

### Generate a Post

When user says "Create a post about [topic]":

1. **Determine content type** (ask if unclear)
2. **Write caption** following guidelines above
3. **Create graphic** using branded-social-visual
4. **Get filename** from graphic output
5. **Create queue file** with all metadata

### Queue File Creation

```python
# Generate the queue file
import datetime

today = datetime.date.today()
scheduled = today + datetime.timedelta(days=2)  # Default: 2 days out

filename = f"{scheduled.isoformat()}-{slug}.md"
```

### Frontmatter Template

```yaml
---
id: {scheduled_date}-{topic_slug}
platform: instagram
format: {square|portrait}
status: draft
scheduled_date: {YYYY-MM-DD}
image: {graphic_filename}
image_url: null  # Set after Cloudinary upload
caption_length: {calculated}
hashtag_count: {calculated}
created_at: {now_iso}
posted_at: null
instagram_media_id: null
error: null
---
```

---

## EXAMPLES

### Example 1: Educational Post

**Input:** "Create a post about AI tools for founders"

**Caption:**
```
AI Tools Every Solo Founder Needs in 2026

Stop paying for enterprise software. Here's the lean AI stack that lets you build like a 10-person team:

1. Claude Code - Your AI dev partner
2. Cursor - AI-native IDE
3. v0 - UI generation
4. Supabase - Backend in minutes
5. Vercel - Ship instantly

The best part? Most have generous free tiers.

Save this for when you're ready to build.

What's in your AI stack? Drop it below

#buildinpublic #solofounder #aitools #indiehacker #startup #codezero #buildyourfreedom #learntocode #shipfast #techstack #aidev #nocode
```

### Example 2: Engagement Post

**Input:** "Create an engagement post about learning to code fears"

**Caption:**
```
What's the #1 thing stopping you from learning to code?

I'll go first: I thought I needed to be "technical" to build software.

Turns out, with AI tools today, you need curiosity and persistence. The syntax? Claude writes that.

What's your blocker? Drop it below and let's solve it together.

#learntocode #codezero #buildyourfreedom #techfear #buildinpublic #solofounder #aicoding #startup
```

---

## BATCH GENERATION

To create a week's worth of content:

**User:** "Generate 4 posts for next week"

**Action:**
1. Ask for topics or suggest a mix (2 educational, 1 engagement, 1 promotional)
2. Generate each post sequentially
3. Space scheduled dates (e.g., Mon, Wed, Fri, Sun)
4. Create all queue files
5. Run validation on each
6. Report summary

---

## POST-GENERATION CHECKLIST

After creating each post, verify:

- [ ] First line is compelling (under 125 chars)
- [ ] Caption follows brand voice
- [ ] 8-15 hashtags (includes #codezero #buildyourfreedom)
- [ ] Graphic created and saved
- [ ] Queue file has all required fields
- [ ] Caption under 2,200 characters
- [ ] Scheduled date is appropriate

---

## SESSION LEARNINGS

<!-- Add learnings specific to content generation as they emerge -->
