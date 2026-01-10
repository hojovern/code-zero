---
name: outcome-mapper
description: Maps syllabus content to real-world outcomes including job skills, portfolio pieces, interview talking points, and practical applications. Use when connecting curriculum to career outcomes, creating portfolio guidance, or preparing students for job readiness. Triggers on "map outcomes for", "connect to job skills", "create portfolio mapping", "what can they do after".
---

# Outcome Mapper

Connects curriculum to real-world value: jobs, portfolios, and practical skills.

## PURPOSE

Students ask: "What can I actually DO with this?"

This skill answers that by mapping every lesson/module to:
1. **Job Skills** — What employers want
2. **Portfolio Pieces** — What to show
3. **Interview Talking Points** — What to say
4. **Real-World Applications** — Where to use it

---

## WORKFLOW (4 Phases)

### Phase 1: Curriculum Inventory

**Goal**: List all learnable skills from the syllabus.

**Extract from syllabus**:
```markdown
## Skill Inventory

| Module | Lesson | Core Skill | Deliverable |
|--------|--------|------------|-------------|
| 1 | 1.1 | [Skill] | [What they build] |
| 1 | 1.2 | [Skill] | [What they build] |
| 2 | 2.1 | [Skill] | [What they build] |
| ... | ... | ... | ... |
```

**Skill extraction rules**:
- Focus on DOING verbs (build, deploy, integrate, automate)
- Be specific ("Deploy to Vercel" not "Understand deployment")
- Include tools/technologies by name
- Note the artifact produced

---

### Phase 2: Job Skills Mapping

**Goal**: Connect skills to what employers actually hire for.

**Research job market**:
1. Search job postings for relevant roles
2. Identify common requirements
3. Match curriculum skills to job requirements

**Job skills matrix**:
```markdown
## Job Skills Mapping

### Role: [Job Title]

| Curriculum Skill | Job Requirement | Match Strength |
|-----------------|-----------------|----------------|
| [From Module X] | [From job posting] | Strong/Partial |
| [From Module Y] | [From job posting] | Strong/Partial |

### Role: [Another Job Title]

| Curriculum Skill | Job Requirement | Match Strength |
|-----------------|-----------------|----------------|
| [From Module X] | [From job posting] | Strong/Partial |
```

**Common role mappings for code:zero**:
- Full-Stack Developer
- AI/ML Engineer
- Automation Engineer
- Technical Founder
- Product Engineer

**For each role, identify**:
- Must-have skills (from curriculum)
- Nice-to-have skills (from curriculum)
- Gaps (not in curriculum — note for transparency)

---

### Phase 3: Portfolio Mapping

**Goal**: Tell students exactly what to showcase and how.

**Portfolio piece template**:
```markdown
## Portfolio Piece: [Title]

**From**: Module [X], Lesson [Y]
**Type**: [Project/Component/Integration/Automation]

### What It Shows
- [Skill 1 demonstrated]
- [Skill 2 demonstrated]
- [Skill 3 demonstrated]

### How to Present It

**Title**: [Suggested portfolio title]

**Description** (2-3 sentences for portfolio):
> [Ready-to-use description they can copy]

**Key Features to Highlight**:
1. [Feature 1 + why it matters]
2. [Feature 2 + why it matters]
3. [Feature 3 + why it matters]

**Technical Details to Mention**:
- Stack: [Technologies used]
- Integrations: [APIs, services]
- Deployment: [Where it lives]

### Screenshots/Demo
- [ ] Homepage/landing view
- [ ] Key feature in action
- [ ] Admin/backend view (if applicable)
- [ ] Mobile responsive view

### GitHub README Template
\`\`\`markdown
# [Project Name]

[One-liner description]

## Features
- [Feature 1]
- [Feature 2]
- [Feature 3]

## Tech Stack
- [Tech 1]
- [Tech 2]

## Live Demo
[Link]

## Installation
[Steps]
\`\`\`
```

**Portfolio priority levels**:
| Priority | Criteria | Recommendation |
|----------|----------|----------------|
| Must-Have | Core skill, impressive, complete | Lead portfolio piece |
| Should-Have | Supporting skill, polished | Secondary showcase |
| Nice-to-Have | Extra credit, incomplete OK | GitHub only |

---

### Phase 4: Interview Preparation

**Goal**: Give students words to describe what they learned.

**Interview talking points template**:
```markdown
## Interview Talking Points

### Skill: [From curriculum]

**When asked**: "Tell me about your experience with [skill]"

**Response framework**:
> "In [project name], I [action verb] [specific thing] using [technology].
> The challenge was [problem]. I solved it by [approach].
> The result was [measurable outcome]."

**Concrete example**:
> "In my AI chatbot project, I integrated the Claude API to handle customer
> support queries. The challenge was managing conversation context across
> multiple turns. I solved it by implementing a sliding window memory system.
> The result was a 40% reduction in support tickets for common questions."

**Follow-up questions to prepare for**:
1. [Likely follow-up] → [Suggested answer direction]
2. [Likely follow-up] → [Suggested answer direction]
3. [Likely follow-up] → [Suggested answer direction]

**Technical depth questions**:
- "How does [underlying technology] work?"
  - [Key points to mention]
- "What would you do differently?"
  - [Thoughtful reflection point]
- "How would you scale this?"
  - [Growth considerations]
```

**STAR format for each major project**:
```markdown
### Project: [Name]

**Situation**: [Context — 1 sentence]
**Task**: [Your responsibility — 1 sentence]
**Action**: [What you did — 2-3 sentences with specifics]
**Result**: [Outcome — quantify if possible]
```

---

## COMPLETE OUTPUT FORMAT

```markdown
# Outcome Map: [Course Name]

## Overview

This document maps [Course Name] curriculum to real-world outcomes.

**Total Skills Covered**: [N]
**Portfolio Pieces**: [N]
**Job Roles Prepared For**: [List]

---

## Job Skills Matrix

### [Role 1]: [Title]

**Match Score**: [X/10]

| Curriculum | Job Requirement | Notes |
|------------|-----------------|-------|
| [Skill] | [Requirement] | [Match type] |

**Gaps to Address Independently**:
- [Skill not covered but often required]

---

### [Role 2]: [Title]

[Same format]

---

## Portfolio Guide

### Must-Have Pieces

#### 1. [Project Name]
[Full portfolio piece template]

#### 2. [Project Name]
[Full portfolio piece template]

### Should-Have Pieces

#### 3. [Project Name]
[Full portfolio piece template]

---

## Interview Prep

### Technical Skills

#### [Skill 1]
[Full talking points template]

#### [Skill 2]
[Full talking points template]

### Project Deep-Dives

#### [Project 1]
[STAR format]

#### [Project 2]
[STAR format]

---

## Real-World Applications

| Skill | Where It's Used | Example |
|-------|-----------------|---------|
| [Skill] | [Industry/Context] | [Specific use case] |

---

## Quick Reference Card

### Elevator Pitch
> "[One paragraph summary of what you can do after this course]"

### Top 5 Skills
1. [Skill + one-liner]
2. [Skill + one-liner]
3. [Skill + one-liner]
4. [Skill + one-liner]
5. [Skill + one-liner]

### Proof Points
- Built [X] using [Y]
- Deployed [A] to [B]
- Integrated [C] with [D]
```

---

## OUTPUT LOCATION

Save outcome maps to: `/syllabus/courses/{course-slug}/outcome-map.md`

Example: `/syllabus/courses/ai-agents/outcome-map.md`

---

## QUALITY CHECKLIST

- [ ] Every module has at least one job skill mapped
- [ ] Portfolio pieces have ready-to-use descriptions
- [ ] Interview talking points use specific examples
- [ ] STAR format covers major projects
- [ ] Job role gaps are honestly noted
- [ ] Real-world applications are concrete, not abstract
- [ ] Quick reference card is copy-paste ready
