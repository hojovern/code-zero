---
name: keyword-research
description: Standalone SEO keyword research and opportunity analysis. Finds keyword opportunities, question keywords for AI search, and competitive gaps. Use BEFORE blog-writer to research first, then write. Triggers on "research keywords for", "find keyword opportunities", "what questions are people asking about", "content opportunities for", or "/keyword-research [topic]". Outputs research report to /research/keywords/.
---

# Keyword Research & Opportunity Analysis

Standalone research skill. Run this BEFORE blog-writer to make informed content decisions.

## WORKFLOW

### Phase 1: Keyword Discovery

**Goal**: Find all relevant keywords with metrics.

**Using SEO Research MCP:**

1. Call `keyword_generator(seed_keyword)` to get:
   - Related keywords (20-30)
   - Search volumes
   - Difficulty scores (KD)

2. Call `keyword_difficulty(seed_keyword)` to get:
   - SERP overview
   - Top 10 ranking URLs
   - Competition analysis

3. If seed is broad, also run `keyword_generator()` on 2-3 variations:
   - "[seed] tutorial"
   - "[seed] guide"
   - "[seed] tools"
   - "how to [seed]"
   - "best [seed]"

**Fallback (if MCP unavailable):**
- Web search: "[seed] keyword research"
- Web search: "[seed] search volume"
- Web search: "[seed] related searches"

**Output**: Raw keyword list with metrics

---

### Phase 2: Question Mining

**Goal**: Find questions people ask about this topic.

**Methods:**

1. **From keyword_generator results**: Filter for question patterns
   - "how to..."
   - "what is..."
   - "why does..."
   - "can you..."
   - "should I..."

2. **Web search for questions**:
   - "[seed] questions"
   - "[seed] People Also Ask"
   - "[seed] FAQ"
   - "reddit [seed] questions"

3. **Classify question intent**:
   - **Informational**: "what is X" - learning
   - **Navigational**: "X login" - finding
   - **Transactional**: "best X for Y" - buying/deciding
   - **Problem-solving**: "how to fix X" - immediate need

**Prioritize by**:
- Search volume (higher = more demand)
- Relevance to code:zero audience
- Transactional/problem-solving intent (higher value)

**Output**: Top 10-15 question keywords with intent labels

---

### Phase 3: Opportunity Scoring

**Goal**: Identify quick wins and best opportunities.

**Calculate Opportunity Score (1-100):**

```
Opportunity Score = (Volume Score × 0.4) + (Difficulty Score × 0.4) + (Intent Score × 0.2)

Volume Score:
- 5000+ = 100
- 2000-5000 = 80
- 1000-2000 = 60
- 500-1000 = 40
- 100-500 = 20
- <100 = 10

Difficulty Score (inverse):
- KD 0-20 = 100
- KD 21-30 = 80
- KD 31-40 = 60
- KD 41-50 = 40
- KD 51-70 = 20
- KD 70+ = 10

Intent Score:
- Transactional = 100
- Problem-solving = 80
- Informational = 50
- Navigational = 20
```

**Flag "Quick Wins":**
- Volume 500+ AND KD < 35 AND Opportunity Score > 60

**Flag "High Value":**
- Transactional or problem-solving intent
- Relevant to code:zero offerings

---

### Phase 4: Competitive Context

**Goal**: Understand what's ranking for top opportunities.

**For top 5 keyword opportunities:**

1. Get SERP data from `keyword_difficulty()` or web search
2. Note content types ranking:
   - Blog posts vs product pages
   - Long-form vs short-form
   - Tutorial vs listicle vs comparison

3. Identify gaps:
   - What angle is NO ONE taking?
   - What's outdated in current results?
   - Where can code:zero differentiate?

**Output**: Brief competitive notes per keyword

---

### Phase 5: Output Report

**Goal**: Structured report for decision-making.

**Save to**: `/research/keywords/[topic-slug]-YYYY-MM-DD.md`

**Report Format:**

```markdown
# Keyword Research: [Topic]
Generated: YYYY-MM-DD

## Summary
[2-3 sentence strategic overview of findings]

## Quick Wins (Action Now)
| Keyword | Volume | KD | Score | Rationale |
|---------|--------|----|----- |-----------|
| [kw1]   | 1,200  | 28 | 78   | Low comp, high intent |
| [kw2]   | 800    | 32 | 72   | Question format, trending |

## All Keyword Opportunities
| Keyword | Volume | KD | Intent | Score | Notes |
|---------|--------|----|----- --|-------|-------|
| ... | ... | ... | ... | ... | ... |

## Question Keywords (AI Search Optimization)
| Question | Volume | Intent | Priority |
|----------|--------|--------|----------|
| How to [x]? | 2,400 | Problem-solving | HIGH |
| What is [x]? | 1,800 | Informational | MEDIUM |

## Competitive Landscape
[Brief notes on what's ranking, gaps identified]

## Recommended Content Strategy
1. **Priority 1**: [Keyword] - [Why, what angle]
2. **Priority 2**: [Keyword] - [Why, what angle]
3. **Priority 3**: [Keyword] - [Why, what angle]

## Questions to Target (Featured Snippets / AI Answers)
- [Question 1]
- [Question 2]
- [Question 3]

---
*Use this research with `/blog-writer` to create content.*
*Example: "Write a blog post targeting [keyword from above]"*
```

---

## INTEGRATION WITH BLOG-WRITER

After running `/keyword-research`:

1. Review the report
2. Choose a keyword opportunity
3. Run blog-writer: "Write a blog post targeting [chosen keyword]"
4. Blog-writer will use this research as input (skip its own Phase 1)

**Blog-writer integration**: If a research file exists for the topic, blog-writer should read it and skip to Phase 2.

---

## EXAMPLE INVOCATION

**User**: "Research keywords for AI coding assistants"

**Execution**:

1. **Keyword Discovery**
   - keyword_generator("AI coding assistants") → 25 keywords
   - keyword_generator("AI code completion") → 18 keywords
   - keyword_generator("best AI for coding") → 22 keywords

2. **Question Mining**
   - "how to use AI for coding" (vol: 2,400, KD: 35)
   - "is GitHub Copilot worth it" (vol: 1,800, KD: 42)
   - "best AI coding assistant 2025" (vol: 3,200, KD: 48)

3. **Opportunity Scoring**
   - Quick wins identified: 4 keywords
   - High value: 6 keywords

4. **Output**
   - Saved: `/research/keywords/ai-coding-assistants-2025-01-10.md`

**Summary output to user**:
```
Research complete: ai-coding-assistants-2025-01-10.md

Quick wins found: 4 keywords
- "AI pair programming tools" (vol: 890, KD: 28) ← Best opportunity
- "cursor vs copilot" (vol: 1,200, KD: 32)
- "free AI coding assistant" (vol: 2,100, KD: 34)
- "AI code review tools" (vol: 720, KD: 25)

Top questions for AI search:
- "How to use AI for coding?" (2,400/mo)
- "Is GitHub Copilot worth it?" (1,800/mo)

Ready to write? Say: "Write a blog post targeting [keyword]"
```

---

## ERROR HANDLING

| Scenario | Action |
|----------|--------|
| MCP tools unavailable | Use web search fallback |
| Low volume keywords | Still include, note as "niche" |
| No question keywords found | Web search for "[topic] questions reddit" |
| High competition only | Flag as "long-term plays", look for long-tail variants |

---

## OUTPUT LOCATION

All research saves to: `/research/keywords/[topic-slug]-YYYY-MM-DD.md`

---

## SESSION LEARNINGS

### Workflow

### Output Rules

### Avoid
