# Blog Post Quality Checklist

Run all checks before saving. Fix any failures before output.

---

## SEO Checks

### Keyword Placement
- [ ] **Title**: Primary keyword appears in title
- [ ] **First 100 words**: Primary keyword in opening paragraph
- [ ] **H2 headers**: Primary keyword in at least one H2
- [ ] **Conclusion**: Primary keyword in final section
- [ ] **Slug**: Primary keyword in URL slug

### Meta Description
- [ ] Length: 150-160 characters (HARD LIMIT)
- [ ] Includes primary keyword naturally
- [ ] Compelling value proposition
- [ ] No truncation issues

### Technical SEO
- [ ] Title length: 50-60 characters ideal
- [ ] Slug is lowercase and hyphenated
- [ ] No duplicate content flags
- [ ] Image alt text includes keyword (if images used)

---

## Structure Checks

### Required Sections
- [ ] **Minimum 3 H2 sections** (excluding conclusion)
- [ ] **Opening hook**: First paragraph grabs attention
- [ ] **Clear hierarchy**: H2 → H3 (no skipping levels)
- [ ] **Conclusion section**: Summarizes + CTA

### Content Depth
- [ ] **Word count**: 2,000-3,500 words
- [ ] **Each H2 has substance**: 2+ paragraphs minimum
- [ ] **Actionable content**: Reader can DO something after each section

### Formatting
- [ ] Bullet points for lists (3+ items)
- [ ] Code blocks with language specified (if code present)
- [ ] Short paragraphs (3-4 sentences max)
- [ ] Subheadings every 300-400 words

---

## Brand Voice Checks

### Buzzword Scan
Fail if any of these appear:
- [ ] ~~Revolutionary~~
- [ ] ~~Game-changing~~
- [ ] ~~Cutting-edge~~
- [ ] ~~Best-in-class~~
- [ ] ~~World-class~~
- [ ] ~~Synergy~~
- [ ] ~~Leverage~~ (as verb)
- [ ] ~~Unlock your potential~~
- [ ] ~~Transform your business~~
- [ ] ~~Take it to the next level~~

### Fluffy Intro Scan
Fail if article starts with:
- [ ] ~~"In today's..."~~
- [ ] ~~"Have you ever wondered..."~~
- [ ] ~~"It's no secret that..."~~
- [ ] ~~"When it comes to..."~~

### Positive Indicators
- [ ] **Action verbs in headers**: Build, Ship, Create, Deploy, etc.
- [ ] **Specific numbers**: Timelines, costs, metrics
- [ ] **Concrete examples**: Tool names, code snippets, real scenarios
- [ ] **Direct address**: Uses "you" and "your"
- [ ] **Builder tone**: Peer-to-peer, not salesy

---

## Technical Checks

### Frontmatter Validation
- [ ] Valid YAML syntax
- [ ] All required fields present:
  - title, description, date, slug, author, tags, categories, draft, seo
- [ ] Date format: YYYY-MM-DD
- [ ] Tags are array format
- [ ] SEO object has: primary_keyword, secondary_keywords, intent

### Markdown Syntax
- [ ] No broken links (if internal links used)
- [ ] Code blocks properly fenced (```)
- [ ] No orphaned formatting (unclosed **/__ etc.)
- [ ] Headers use # syntax (not underlines)

### Output
- [ ] File saves to `/content/` directory
- [ ] Filename matches slug: `{slug}.md`
- [ ] No special characters in filename

---

## Pre-Flight Summary

Before saving, confirm:

| Check | Status |
|-------|--------|
| Primary keyword in title | |
| Primary keyword in first 100 words | |
| Meta description 150-160 chars | |
| 3+ H2 sections | |
| 2,000-3,500 words | |
| No buzzwords | |
| Action verbs in headers | |
| Specific numbers present | |
| Clear CTA | |
| Valid frontmatter | |

---

## Failure Actions

| Issue | Fix |
|-------|-----|
| Keyword missing from title | Rewrite title to include naturally |
| Meta description too long | Trim to 160 chars, keep value prop |
| Word count too low | Expand sections with examples |
| Buzzword detected | Replace with specific alternative |
| Fluffy intro | Rewrite with hook (stat/bold claim) |
| Missing CTA | Add clear action in conclusion |
| Invalid YAML | Fix syntax errors, validate structure |
