# code:zero Social Media Guidelines

Guidelines for Instagram, Twitter/X, and LinkedIn content. Supplements the main brand-voice and design-system.

## Platform Strategy

### Instagram (Primary)
**Purpose:** Brand awareness, community building, visual storytelling
**Frequency:** 3-4 posts per week
**Best times:** 9am, 12pm, 6pm (test and adjust)
**Content mix:**
- 50% Educational (tips, tools, how-tos)
- 25% Engagement (questions, polls, discussions)
- 15% Behind-the-scenes (journey, wins, lessons)
- 10% Promotional (launches, offers, CTAs)

### Twitter/X (Secondary)
**Purpose:** Thought leadership, real-time engagement, networking
**Frequency:** 1-2 tweets per day
**Best times:** 8am, 12pm, 5pm
**Content:** Threads, quick tips, hot takes, retweets of builder community

### LinkedIn (Secondary)
**Purpose:** Professional credibility, long-form insights
**Frequency:** 2-3 posts per week
**Content:** Career stories, industry insights, course announcements

---

## Caption Templates

### Educational Post
```
[Bold statement or question]

[Problem they face]

[3-5 tips or solutions, numbered]

[Call-to-action: Save this / Share with a friend]

[Question to spark comments]

#hashtags
```

### Engagement Post
```
[Controversial statement or question]

[Brief context - 1-2 sentences]

[Your take - optional]

[Invite their opinion]

#hashtags
```

### Promotional Post
```
[What's happening - exciting news]

[Why it matters to them]

[What they get / transformation]

[Clear CTA - Link in bio / DM us / etc.]

#hashtags
```

### Behind-the-Scenes Post
```
[What we just did / learned / failed at]

[The story - what happened]

[The lesson - what we took away]

[How it connects to their journey]

#hashtags
```

### Testimonial Post
```
[Transformation hook: "From X to Y"]

[Who they were before]

[What changed]

[Result / quote]

[CTA for aspiring builders]

#hashtags
```

---

## Hashtag Library

### Always Include (Brand Tags)
```
#codezero
#buildyourfreedom
```

### Topic Tags (Pick 5-8 Relevant)
```
# Builder/Founder
#buildinpublic
#solofounder
#indiehacker
#founder
#entrepreneur
#startup

# Learning/Development
#learntocode
#webdev
#appdevelopment
#coding
#programming

# AI/Tech
#aitools
#aicoding
#techstack
#nocode
#lowcode

# Mindset/Action
#shipfast
#mindset
#builder
#maker
```

### Niche Tags (Use Sparingly)
```
#saas
#mvp
#productdev
#techeducation
#careerchange
#selftaught
```

---

## Visual Standards

### Instagram Feed Aesthetic
Maintain consistent look when viewed as a grid:
- Dark backgrounds (brand dark #0a0a1a)
- Neon accent colors (cyan, magenta, purple)
- Bold, readable typography
- Consistent placement of brand elements

### Image Formats
| Type | Dimensions | Use |
|------|------------|-----|
| Square | 1080x1080 | Standard posts, carousels |
| Portrait | 1080x1350 | Higher engagement posts |
| Story | 1080x1920 | Stories, time-sensitive |
| Carousel | 1080x1080 each | Multi-slide educational content |

### Typography on Graphics
- Headlines: 48-72px Outfit Bold
- Body: 32-48px Outfit Regular
- Keep text minimal — caption carries detail
- Ensure readable at thumbnail size

---

## Content Calendar Framework

### Weekly Rhythm (3-4 posts)
| Day | Content Type | Goal |
|-----|-------------|------|
| Monday | Educational | Start week with value |
| Wednesday | Engagement | Mid-week conversation |
| Friday | Behind-the-scenes / Promo | End week with personality |
| (Optional) Sunday | Educational or Engagement | Prep for next week |

### Monthly Themes
Plan content around monthly themes:
- Product launches
- Seasonal relevance (New Year = fresh starts)
- Industry events
- Community milestones

---

## Engagement Guidelines

### Respond to Comments
- Reply within 24 hours
- Ask follow-up questions
- Be helpful, not salesy
- Use their name when appropriate

### Community Building
- Like and comment on builder posts
- Share relevant community content
- Celebrate wins in the space
- Support, don't compete

### Handling Criticism
- Don't delete negative comments (unless spam/abuse)
- Respond professionally and helpfully
- Take legitimate feedback seriously
- Move heated discussions to DMs

---

## Don'ts

- Don't use "cohort" — use "intake"
- Don't say "students" — say "builders"
- Don't post without a clear purpose
- Don't use more than 30 hashtags
- Don't buy followers or engagement
- Don't post and ghost — engage!
- Don't oversell — provide value first
- Don't use stock photos — brand graphics only
- Don't copy competitors' exact format

---

## Performance Tracking

### Key Metrics
- **Reach:** How many unique accounts saw the post
- **Engagement Rate:** (Likes + Comments + Saves + Shares) / Reach
- **Saves:** Indicates valuable content worth returning to
- **Profile Visits:** Content driving curiosity about the brand
- **Link Clicks:** Direct conversion metric

### Benchmarks to Target
| Metric | Target |
|--------|--------|
| Engagement Rate | 3-6% |
| Save Rate | 2%+ |
| Comment Rate | 0.5%+ |

### Review Cadence
- Weekly: Quick engagement check
- Monthly: Content performance review, adjust strategy
- Quarterly: Deep analysis, update guidelines

---

## Queue System Integration

All posts go through the queue at `/social-media/queue/`:

1. **Generate** content (caption + graphic)
2. **Create** queue file with frontmatter
3. **Upload** image to Cloudinary
4. **Validate** using instagram-queue skill
5. **Approve** during weekly review
6. **n8n** posts automatically

See `/instagram-queue` and `/instagram-content-generator` skills for workflow details.
