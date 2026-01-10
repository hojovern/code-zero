# Session: 2025-01-10 - Business Planning & Strategy

## Summary

Comprehensive business planning session for code:zero. Built an AI intelligence system for Claude, established business context, designed two course offerings (Consumer + Enterprise), set pricing strategy, and created enterprise sales materials. Major pivot from 6-week to 4-week consumer course inspired by Marc Lou's model.

---

## Key Decisions

### Intelligence System
- **Decision**: Built multi-agent "think-harder" system with 5 agents (Research, Decompose, Critic, Synthesis, Memory)
- **Rationale**: Makes Claude smarter by forcing verification over generation
- **Decision**: Made it automatic/default behavior, not opt-in
- **Rationale**: User preference - quality over token efficiency

### Product Strategy
- **Decision**: Two course offerings - Consumer (Ship Sprint) + Enterprise (AI Automation Sprint)
- **Rationale**: Different buyer needs, different sales cycles, halo effect between them

### Consumer Course (Ship Sprint)
- **Decision**: 4 weeks, RM 9,800/person
- **Previous**: Was 6 weeks at RM 13,800
- **Rationale**:
  - Inspired by Marc Lou (CodeFast/ShipFast)
  - Better unit economics (RM 4,900/day vs RM 4,600/day)
  - "Ship fast" positioning = premium, not discount
  - Easier commitment for students
- **Decision**: Renamed from "Full Stack + AI" to "Ship Sprint"
- **Rationale**: "Full Stack in 6 weeks" wasn't credible. "Ship Sprint" is intentionally focused.
- **Positioning**: "Forcing function for people who buy courses but don't finish"

### Enterprise Course
- **Decision**: 3 days, RM 38,000/cohort (8-12 people)
- **Rationale**:
  - Enterprise wants short disruption (2-5 days max)
  - $2,700/day rate is competitive enterprise pricing
  - HRDF claimable makes it "free" for Malaysian SMEs
- **Decision**: 6 hours instruction/day, 50% hands-on, 9am-4:30pm
- **Rationale**: Combats fatigue, respects their time

### Pricing Philosophy
- **Decision**: Consumer at RM 9,800 (~$2,100), Enterprise at RM 38,000/cohort
- **Rationale**:
  - Consumer: 5-10x Marc Lou's digital products (justified by live + cohort + location)
  - Enterprise: Must be premium enough to be taken seriously ($2,700/day)
- **Insight**: "Too cheap" is a red flag for enterprise - signals amateur

### Sales Strategy
- **Decision**: Start Consumer first, layer Enterprise once proof exists
- **Rationale**: Consumer builds case studies needed for enterprise sales
- **Decision**: Free 1-hour taster session for enterprise prospects
- **Rationale**: Demonstrates value, builds relationship, lowers risk perception

---

## Action Items

- [x] Create intelligence system (think-harder skill + agents)
- [x] Create business context file
- [x] Create enterprise sales materials (one-pager, taster outline)
- [x] Update business context with 4-week model
- [ ] Fill in instructor bios in one-pager
- [ ] Register for HRDF (critical for enterprise sales)
- [ ] Build the n8n demo for taster sessions
- [ ] Create consumer course landing page

---

## Files Created/Modified

### Created
- `/.claude/skills/think-harder/SKILL.md` - Intelligence system orchestrator
- `/.claude/skills/think-harder/agents/critic.md` - Adversarial reviewer agent
- `/.claude/skills/think-harder/agents/research.md` - Context gathering agent
- `/.claude/skills/think-harder/agents/decompose.md` - Task breakdown agent
- `/.claude/skills/think-harder/agents/synthesis.md` - Output combination agent
- `/.claude/skills/think-harder/agents/memory.md` - Learning persistence agent
- `/.claude/memory/learnings.md` - Project learnings persistence
- `/.claude/memory/business-context.md` - Master business context file
- `/enterprise/one-pager.md` - Enterprise sales leave-behind
- `/enterprise/taster-session-outline.md` - Free workshop playbook
- `/sessions/index.md` - Session log master index
- `/sessions/2025-01-10-business-planning.md` - This file

### Modified
- `/CLAUDE.md` - Added "How I Think" section for automatic intelligence system

---

## Key Insights

### On Enterprise Sales
- Enterprise day rates are $1,000-3,500/day - code:zero's $2,700 is competitive
- HRDF is a "cheat code" for Malaysian market - makes training "free"
- No case studies = no enterprise deals. Must build proof first.
- "Dream app" language is B2C. Enterprise wants "upskill my team for business outcomes"

### On Consumer Positioning
- "Full Stack in 6 weeks" isn't credible (industry standard is 9-16 weeks)
- Reframe as "Ship Sprint" - intentionally focused, not insufficient
- Compete on outcome (shipped product) not hours (curriculum depth)
- Marc Lou's model: Self-paced at $200-400. code:zero's value: accountability + cohort + location

### On Pricing
- Consumer: RM 9,800 = ~$500/week, premium but accessible
- Enterprise: Too cheap signals amateur. RM 38,000 is "taken seriously" territory
- For enterprise, "affordable" often means "amateur"

### On Duration
- Enterprise: 2-5 days max. 9 days is too disruptive.
- Consumer: 4 weeks is focused sprint. 6 weeks was unnecessarily long.
- Shorter duration at similar price = higher perceived value (if positioned right)

---

## Open Threads

- Tech stack to teach (SvelteKit? Next.js?) - not yet decided
- Instructor bios needed for enterprise materials
- Venue/space details for Penang location
- Launch timeline target
- Session logging system being implemented (this session)

---

## Raw Notes

### Business Context Established
- Location: Penang, Malaysia (tourist destination enables "builder's retreat" angle)
- Target: Career changers, entrepreneurs, developers, international travelers
- Philosophy: "Ship > Think", "We teach like business people, not coding monkeys"
- Team: Multiple founders with cross-functional experience (dev, design, SEO, sales)

### Revenue Potential Calculated
| Scenario | Consumer | Enterprise | Combined |
|----------|----------|------------|----------|
| Conservative | RM 980K | RM 456K | RM 1.4M |
| Moderate | RM 1.47M | RM 912K | RM 2.4M |
| Aggressive | RM 1.96M | RM 1.8M | RM 3.8M |

### Enterprise Research Findings
- Malaysian employers: 90% want AI expertise
- Government invested RM 700M in digital skills
- HRDF: Up to 100% claimable for SMEs
- Target companies: Tech (50-200 employees), digital agencies, banks, MNCs in Penang

---

*Session duration: Extended planning session*
*Next session: TBD*
