# code:zero Content System

**Purpose:** A systematic framework for creating website copy and content that converts, based on analysis of alexop.dev, telebort.com, teamtreehouse.com, and nextacademy.com.

**Last Updated:** 2025-01-10

---

## Content Philosophy

### The code:zero Voice

Blend the best of each inspiration:

| Source | Voice Element | How We Apply It |
|--------|---------------|-----------------|
| **alexop.dev** | Personal, authentic, developer-to-developer | Instructors have real names and stories |
| **telebort.com** | Aspirational yet accessible, outcome-focused | "Future builders" not "students" |
| **teamtreehouse.com** | Conversational authority, specific metrics | Concrete numbers, time estimates |
| **nextacademy.com** | Transformation narrative, community-first | Before → After stories, network value |

### Core Voice Principles

1. **Builder-to-builder** — We're practitioners, not academics
2. **Specific over vague** — Numbers, names, outcomes
3. **Outcome over process** — What you'll ship, not what you'll learn
4. **Confident but not arrogant** — We know our stuff, but we're approachable
5. **Anti-fluff** — Every word earns its place

---

## Page Flow Framework

### The Conversion Flow (Proven Pattern)

```
┌─────────────────────────────────────────────────────────┐
│  1. HERO                                                │
│     Hook → Promise → Primary CTA                        │
│     (Dark section)                                      │
├─────────────────────────────────────────────────────────┤
│  2. TRUST BAR                                           │
│     Numbers + Logo cloud                                │
│     (Transition element)                                │
├─────────────────────────────────────────────────────────┤
│  3. PROBLEM → SOLUTION                                  │
│     Pain points they recognize → How we solve them      │
│     (Light section)                                     │
├─────────────────────────────────────────────────────────┤
│  4. WHAT YOU GET                                        │
│     Program details, curriculum, outcomes               │
│     (Dark section)                                      │
├─────────────────────────────────────────────────────────┤
│  5. SOCIAL PROOF                                        │
│     Testimonials, transformation stories                │
│     (Light section)                                     │
├─────────────────────────────────────────────────────────┤
│  6. HOW IT WORKS                                        │
│     Simple 3-step process                               │
│     (Dark section)                                      │
├─────────────────────────────────────────────────────────┤
│  7. PRICING / OFFER                                     │
│     Clear pricing, what's included, scarcity           │
│     (Light section)                                     │
├─────────────────────────────────────────────────────────┤
│  8. FAQ                                                 │
│     Objection handling                                  │
│     (Dark section)                                      │
├─────────────────────────────────────────────────────────┤
│  9. FINAL CTA                                           │
│     Inspirational close + action                        │
│     (Dark section with glow)                            │
└─────────────────────────────────────────────────────────┘
```

---

## Section-by-Section Framework

### 1. HERO Section

**Goal:** Hook attention, communicate core promise, drive first action.

**Formula:**
```
[Eyebrow: Credibility/context]
[Headline: Transformation promise]
[Subheadline: How + proof]
[Primary CTA] [Secondary CTA]
```

**Patterns from research:**

| Site | Headline Pattern |
|------|------------------|
| alexop.dev | Personal intro: "Hi there! I'm Alex" |
| telebort.com | Vision statement: "Build Future Together" |
| teamtreehouse.com | Contrarian hook: "Learn First, Prompt Later" |
| nextacademy.com | Social proof lead: "Thousands from 57 Countries..." |

**code:zero Hero Formula:**

```markdown
Eyebrow: [Credibility signal or current cohort status]
Example: "Next cohort starts February 2025 · 4 spots left"

Headline: [Outcome + Timeframe + Differentiator]
Example: "Ship your product in 4 weeks with 12 builders in Penang"

Subheadline: [Pain point acknowledgment + Solution]
Example: "Bought courses but never finished? We're the forcing function.
Daily structure, live instructors, and a cohort that holds you accountable."

Primary CTA: "Apply Now" or "Join the Waitlist"
Secondary CTA: "See the curriculum" or "Watch a demo"
```

**Headline Templates:**

1. **Outcome-first:** "Ship your [product type] in [timeframe]"
2. **Pain-solution:** "[Pain point]? [Solution in X weeks]"
3. **Social proof lead:** "[Number] builders from [X] countries shipped with us"
4. **Contrarian:** "Stop learning. Start shipping."
5. **Transformation:** "From [before state] to [after state] in [timeframe]"

---

### 2. TRUST BAR

**Goal:** Instant credibility before they scroll further.

**Elements (pick 3-4):**

```
┌────────────┬────────────┬────────────┬────────────┐
│  [Number]  │  [Number]  │  [Number]  │  [Number]  │
│  Builders  │  Countries │  Products  │   Rating   │
│   trained  │            │   shipped  │            │
└────────────┴────────────┴────────────┴────────────┘
```

**Copy patterns:**

| Metric | Format |
|--------|--------|
| Students | "500+ builders trained" |
| Geography | "From 12 countries" |
| Outcomes | "200+ products shipped" |
| Rating | "4.9/5 from 127 reviews" |
| Time | "Since 2024" or "3 cohorts completed" |

**Logo cloud (if applicable):**
- "Graduates now work at: [logos]"
- "Featured in: [media logos]"
- "Trusted by teams from: [company logos]"

---

### 3. PROBLEM → SOLUTION Section

**Goal:** Show you understand their pain, then present the solution.

**Framework:**

```markdown
## The Problem (They nod along)

[3-4 pain points they immediately recognize]

## The Solution (You're different)

[How code:zero solves each pain point]
```

**Pain Point Templates (from research):**

| Pain Point | Source Pattern |
|------------|----------------|
| Unfinished courses | "Bought courses but never finished" |
| Learning alone | "Figuring it out alone isn't working" |
| Theory overload | "Tired of tutorials that don't stick" |
| No accountability | "No one holding you to ship" |
| Outdated content | "Learning yesterday's stack" |
| No real outcomes | "Certificates but no portfolio" |

**Solution Framing:**

Don't just list features. Use **"Not X, but Y"** pattern:

```markdown
❌ Not another course you won't finish
✅ A 4-week sprint with a cohort that holds you accountable

❌ Not theory-heavy lectures
✅ Build your actual product from day one

❌ Not alone at your computer
✅ 12 builders + daily standups + instructors who shipped
```

---

### 4. WHAT YOU GET Section

**Goal:** Concrete details about the program.

**Framework:**

```markdown
## What You'll Build

[Specific, tangible outcomes — not vague skills]

## How It Works

[Format, schedule, structure]

## What's Included

[Itemized list of everything they get]
```

**Outcome patterns (from research):**

| Site | Outcome Framing |
|------|-----------------|
| telebort | "Built her first mobile app in 3 months" |
| teamtreehouse | "Go from blank screen to live app in 30 minutes" |
| nextacademy | "Run multi-million dollar businesses" |

**code:zero Outcome Copy:**

```markdown
## What You'll Ship

By Week 4, you'll have:

- ✅ A deployed, working product (not a tutorial clone)
- ✅ AI-powered features your users can actually use
- ✅ Automated workflows saving you hours/week
- ✅ A portfolio piece that proves you can ship

Not "learn to code." Ship something real.
```

**Program Details Pattern:**

```markdown
## The 4-Week Sprint

| Week | Focus | You'll Ship |
|------|-------|-------------|
| 1 | Foundation + Your Idea | Tech stack set up, MVP scoped |
| 2 | Core Features | Working prototype |
| 3 | AI Integration | LLM features, automations |
| 4 | Polish + Launch | Deployed product, live users |

**Format:**
- Weekdays only (weekends off)
- Mornings: Async learning
- Afternoons: Live building in Penang
- Daily standups + code reviews
```

---

### 5. SOCIAL PROOF Section

**Goal:** Show transformation through real stories.

**Framework:**

```markdown
## From [Before State] to [After State]

[Testimonial carousel with transformation arcs]
```

**Testimonial Structure (NEXT Academy pattern):**

```markdown
"[Quote about transformation or outcome]"

— [Name], [Role/Company]
  [Before]: [What they were doing before]
  [After]: [What they achieved/built]
```

**Example:**

```markdown
"I'd bought 5 courses and finished none. code:zero was different —
I couldn't NOT ship. The daily standups and cohort pressure changed everything."

— Sarah L., Founder of Mealprep.io
  Before: Marketing manager with 3 failed side projects
  After: Shipped her SaaS in 4 weeks, 200 paying users
```

**Social Proof Hierarchy:**

1. **Transformation stories** (highest impact)
2. **Specific outcomes** ("Raised $500K", "500 users in first month")
3. **Credibility by association** ("Now at Google", "Featured in TechCrunch")
4. **Ratings/reviews** (4.9/5 from X reviews)
5. **Numbers** (500+ builders, 12 countries)

---

### 6. HOW IT WORKS Section

**Goal:** Make the process feel simple and achievable.

**Framework: 3 Steps Max**

```markdown
## How It Works

1. **Apply** — Tell us about your product idea (5 min)
2. **Get Accepted** — We review fit and schedule a call
3. **Ship** — Join the cohort and launch in 4 weeks
```

**Pattern from telebort:** Multiple entry points for different stages:

```markdown
## Ready to Start?

[Apply Now] — Ready to commit
[Book a Call] — Have questions first
[Download Syllabus] — Need more details
```

---

### 7. PRICING Section

**Goal:** Clear value, remove friction, create urgency.

**Framework:**

```markdown
## Investment

[Price]
[What's included - itemized]
[Guarantee or risk reversal]
[Scarcity/urgency element]
[CTA]
```

**Pricing Display Pattern:**

```markdown
## Ship Sprint — RM 9,800

Everything you need to ship in 4 weeks:

✅ 20 days of live instruction
✅ Daily code reviews
✅ 1:1 mentor sessions
✅ Lifetime community access
✅ Post-program office hours
✅ Certificate of completion

[Apply Now — 4 spots left for Feb cohort]
```

**Urgency Patterns (from telebort):**

- "8 spots left" (scarcity)
- "Next cohort: Feb 5, 2025" (deadline)
- "Early bird: RM 8,800 until Jan 15" (time-limited)
- "Only 12 per cohort" (exclusivity)

---

### 8. FAQ Section

**Goal:** Handle objections before they become blockers.

**Must-answer questions:**

| Objection | FAQ Question |
|-----------|--------------|
| "I'm not technical enough" | "Do I need coding experience?" |
| "I don't have time" | "What's the time commitment?" |
| "It's expensive" | "Is there a payment plan?" |
| "Will it work for me?" | "What if I can't keep up?" |
| "What if I don't have an idea?" | "Do I need a product idea to join?" |
| "Is it worth it?" | "What do graduates say?" |

**FAQ Answer Pattern:**

```markdown
**Q: Do I need coding experience?**

Some basics help, but you don't need to be a developer.
If you can follow a tutorial and Google your way through errors,
you're ready. We teach the stack from scratch — what matters is
your commitment to ship.
```

---

### 9. FINAL CTA Section

**Goal:** Emotional close + clear action.

**Framework:**

```markdown
[Inspirational statement about transformation]
[Restate the core promise]
[Primary CTA]
```

**Example:**

```markdown
## Stop Collecting Courses. Start Shipping.

4 weeks. 12 builders. 1 shipped product.

Your idea has been waiting long enough.

[Apply for the February Cohort]

Questions? [Book a 15-min call] or email hello@codezero.my
```

---

## Copy Formulas

### Headlines

| Type | Formula | Example |
|------|---------|---------|
| Outcome | [Verb] your [outcome] in [time] | "Ship your product in 4 weeks" |
| Pain-agitate | [Pain point]? [Solution]. | "Courses not working? Try building." |
| Social proof | [Number] [people] [achieved X] | "500+ builders shipped with us" |
| Contrarian | [Stop X]. [Start Y]. | "Stop learning. Start shipping." |
| Transformation | From [before] to [after] | "From idea to live product" |

### Subheadlines

| Type | Formula |
|------|---------|
| Expand | [Who it's for] + [What they get] + [Differentiator] |
| Pain-solution | [Acknowledge pain] + [How we're different] |
| Proof | [Specific outcome] + [Social proof element] |

### CTAs

| Stage | CTA Copy |
|-------|----------|
| High intent | "Apply Now", "Join the Cohort", "Enroll" |
| Medium intent | "Book a Call", "Get the Syllabus", "See Pricing" |
| Low intent | "Learn More", "Watch Demo", "Read Success Stories" |

### Body Copy

**The "So you can" bridge:**

```
We do [feature/method] so you can [benefit/outcome].
```

Example:
```
We cap cohorts at 12 so you can get daily feedback from instructors.
```

**The "Not X, Y" contrast:**

```
❌ Not [common approach / competitor weakness]
✅ [How you're different / better]
```

**The "While others" comparison:**

```
While other bootcamps [do X], we [do Y].
```

---

## Trust Signal Checklist

Use at least 5 per page:

- [ ] Specific numbers (students, countries, products shipped)
- [ ] Named testimonials with photos
- [ ] Company logos (employers of graduates or media features)
- [ ] Ratings/reviews with source
- [ ] Instructor credentials (names, backgrounds)
- [ ] Time in business / cohorts completed
- [ ] Guarantee or risk reversal
- [ ] Certifications / official registrations
- [ ] "As seen in" media mentions
- [ ] Real student work / portfolio examples

---

## Urgency & Scarcity Checklist

Use 2-3 per page (authentic only):

- [ ] Limited spots per cohort ("Only 12 spots")
- [ ] Next cohort date ("Starts Feb 5, 2025")
- [ ] Spots remaining ("4 spots left")
- [ ] Early bird pricing with deadline
- [ ] Application deadline
- [ ] Waitlist mention ("Join waitlist for March")

---

## Content Modules Library

### Module: Instructor Bio Card

```markdown
### [Name]

**[Title/Role]**

[1-2 sentence background highlighting real-world experience]

**Built:** [Notable product/company]
**Expertise:** [3-4 skills]
```

### Module: Outcome Card

```markdown
### [What they built]

[1 sentence description]

**Builder:** [Name]
**Cohort:** [Month Year]
**Now:** [Current status - users, revenue, job, etc.]
```

### Module: Weekly Breakdown

```markdown
### Week [N]: [Theme]

**Focus:** [What they're learning]
**Building:** [What they're shipping]
**Outcome:** [Tangible deliverable]
```

### Module: Comparison Table

```markdown
| | code:zero | Traditional Bootcamp | Online Courses |
|--|-----------|---------------------|----------------|
| Duration | 4 weeks | 12-16 weeks | Self-paced (∞) |
| Outcome | Shipped product | Portfolio projects | Certificates |
| Accountability | Daily cohort | Weekly check-ins | None |
| Location | Penang + remote | Major cities | Anywhere |
| Price | RM 9,800 | RM 30-50K | RM 200-2000 |
```

---

## Page-Specific Guidelines

### Homepage

- Hero with strongest headline
- Trust bar immediately after
- All 9 sections in order
- Both consumer and enterprise paths (if applicable)

### Course Page (Consumer)

- Hero focused on specific program
- Detailed curriculum breakdown
- Week-by-week outcomes
- Instructor bios
- More testimonials
- FAQ heavy on logistics

### Enterprise Page

- Different hero (team upskilling angle)
- ROI-focused copy
- Bulk/team pricing
- Case study from company (when available)
- HRDF mention prominent
- "Book a Demo" as primary CTA

### About Page

- Founder/instructor stories
- Origin story of code:zero
- Philosophy and values
- Team photos
- Media mentions

---

## Copy Review Checklist

Before publishing any page:

- [ ] Does the headline promise a specific outcome?
- [ ] Is there social proof above the fold?
- [ ] Are there at least 3 CTAs visible without scrolling far?
- [ ] Does every section earn its place?
- [ ] Are numbers specific (not "many" or "lots")?
- [ ] Are testimonials from real, named people?
- [ ] Is there urgency without being manipulative?
- [ ] Does the copy sound like a builder, not a marketer?
- [ ] Would I forward this to a friend if it fit their situation?

---

## Anti-Patterns (What to Avoid)

From research, these patterns underperform:

| Avoid | Why | Instead |
|-------|-----|---------|
| "Learn to code" | Too generic, low intent | "Ship your product" |
| "Comprehensive curriculum" | Sounds academic | "You'll build X, Y, Z" |
| "Revolutionary" | Hype word, no meaning | Specific differentiator |
| Vague testimonials | "Great course!" | Specific transformation story |
| No urgency | No reason to act now | Intake dates, limited spots |
| Hidden pricing | Friction, distrust | Clear, visible pricing |
| Stock photos | Feels fake | Real photos of intake, space |
| Long paragraphs | Won't be read | Bullets, short sentences |
| "Cohort" | Too academic/corporate | Use "intake" instead |

---

## Implementation Priority

### Phase 1: Core Pages

1. **Homepage** — Full flow, all sections
2. **Consumer Course Page** — Ship Sprint details
3. **Apply Page** — Simple form, trust signals

### Phase 2: Support Pages

4. **About Page** — Team, story, philosophy
5. **FAQ Page** — Comprehensive objection handling
6. **Enterprise Page** — B2B positioning

### Phase 3: Content

7. **Blog** — SEO content, thought leadership
8. **Success Stories** — Individual graduate pages
9. **Curriculum Detail** — Week-by-week breakdown

---

*This system should be used as a reference when creating any website copy. Update with learnings as pages are built and tested.*
