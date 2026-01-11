# Email Writer Skill

AI-powered email generation for code:zero marketing campaigns. Analyzes past performance data to write high-converting emails.

## When to Use

Trigger on phrases like:
- "write an email about..."
- "create email campaign for..."
- "generate marketing email..."
- "email for [intake/course/announcement]"
- "/email-writer [topic]"

## Master Content Source

**Before writing any email**, check `/content/master-content.md` for:

1. **Course Progress Updates**: Real milestones to announce to students
2. **New Features**: Recently built tools/systems to highlight
3. **Teaching Moments**: `[LESSON]` tags become educational email content
4. **Authentic Stories**: Behind-the-scenes content for engagement emails

**Segment → Master Content Mapping**:

| Segment | Pull From Master Content |
|---------|--------------------------|
| Prospects | Tech stack benefits, transformation stories |
| New Students | Recent phases as "what you'll learn" |
| Active Students | Latest tools/features they can try |
| At-Risk | Relatable struggle stories, wins to inspire |
| Alumni | Advanced topics, new capabilities |

This ensures emails are grounded in real progress, not generic marketing speak.

---

## Workflow

### Phase 1: Performance Analysis

Before writing any email, analyze past performance:

1. **Query the API for insights**
   ```
   GET /api/email/ai?days=90
   ```

2. **Extract winning patterns:**
   - Subject line patterns with highest open rates
   - Best send times (day + hour)
   - Optimal content length
   - High-performing CTAs
   - Patterns to avoid

3. **Document findings** for application in Phase 3.

### Phase 2: Audience Analysis

Understand who we're writing to:

1. **Identify the segment:**
   - New students (enrolled < 30 days)
   - Active students (activity in last 7 days)
   - At-risk students (no activity 14+ days)
   - Alumni (completed course)
   - Prospects (not enrolled)

2. **Match content to segment:**
   - New: Welcome, orientation, getting started
   - Active: Tips, advanced topics, community
   - At-risk: Re-engagement, support, check-in
   - Alumni: Referral, advanced courses, events
   - Prospects: Value prop, social proof, urgency

### Phase 3: Content Generation

Apply insights to generate the email:

1. **Subject Line (generate 3 variants for A/B testing):**
   - Apply winning patterns from Phase 1
   - Keep under 50 characters
   - Include personalization ({{firstName}}) if pattern shows high performance
   - Avoid spam trigger words

2. **Preview Text:**
   - Complement the subject, don't repeat it
   - Keep under 90 characters
   - Create curiosity or urgency

3. **Body Content:**
   - Use code:zero brand voice (see voice-guide.md)
   - Keep to 150-300 words
   - One clear CTA above the fold
   - Use {{firstName}} for personalization
   - Mobile-friendly formatting

4. **CTA:**
   - Use high-performing CTAs from analysis
   - Make it action-oriented
   - Create urgency without being pushy

### Phase 4: Quality Control

Before outputting, verify:

- [ ] Subject line < 50 characters
- [ ] Preview text < 90 characters
- [ ] CTA is clear and above fold
- [ ] {{unsubscribeUrl}} placeholder present
- [ ] No spam trigger words (FREE, ACT NOW, etc.)
- [ ] Mobile-responsive HTML
- [ ] Plain text version included
- [ ] Brand voice is consistent

## Output Format

```markdown
## Email Campaign: [Campaign Name]

### Subject Line Variants (for A/B testing)
1. [Primary subject - recommended]
2. [Alternative 1]
3. [Alternative 2]

### Preview Text
[Preview text here]

### Recommended Send Time
[Day] at [Time] (based on historical performance)

### Expected Performance
- Open Rate: [X-Y%]
- Click Rate: [X-Y%]

### HTML Content
```html
[Full HTML email content]
```

### Plain Text Content
```
[Plain text version]
```

### Targeting Recommendation
- Segment: [Segment name]
- Estimated recipients: [Number]
- Exclusions: [Who to exclude]
```

## Brand Voice for Emails

### Tone
- Direct and clear
- Builder-to-builder communication
- Slightly edgy but professional
- Action-oriented
- No fluff, no hype

### Language Patterns
- Use "you" and "your" (focus on reader)
- Active voice
- Short sentences
- Concrete examples over abstract promises

### CTAs That Work
- "Apply Now" - for intake promotions
- "Start Building" - for course engagement
- "Join Us" - for community/events
- "Get Started" - for onboarding

### Words to Avoid
- "Revolutionary", "Game-changing", "Cutting-edge"
- ALL CAPS for emphasis
- Excessive exclamation marks!!!
- "Free" (spam trigger)
- "Act now", "Limited time" (unless genuinely true)

## Example Prompts

**Good prompts:**
- "Write an email promoting the March intake to prospects who viewed pricing"
- "Create a re-engagement email for students inactive for 2 weeks"
- "Generate a welcome email for new enrollees"

**What you'll get:**
- 3 subject line variants with performance predictions
- Full HTML email with code:zero styling
- Plain text fallback
- Send time recommendation
- Targeting suggestions

## Integration

This skill integrates with:
- `/api/email/ai` - Performance analysis and generation
- Email campaign editor at `/admin/emails/campaigns/new?ai=1`
- Database tables: `emailCampaigns`, `emailSends`, `emailEvents`

## Session Learnings

<!-- Learnings from email writing sessions -->
- [Add learnings as they emerge]
