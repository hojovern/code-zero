# Blog Post Template

Use this frontmatter structure for all blog posts. Hugo/Astro compatible.

---

## Frontmatter Template

```yaml
---
title: "${title}"
description: "${description}"
date: ${date}
lastmod: ${date}
slug: "${slug}"
author: "code:zero Content Team"
tags:
  - ${tag1}
  - ${tag2}
  - ${tag3}
categories:
  - ${category}
draft: false
seo:
  primary_keyword: "${primary_keyword}"
  secondary_keywords:
    - ${secondary1}
    - ${secondary2}
    - ${secondary3}
  search_volume: ${search_volume}
  difficulty: ${difficulty}
  intent: "${intent}"
sources:
  - title: "${source1_title}"
    url: "${source1_url}"
  - title: "${source2_title}"
    url: "${source2_url}"
---

![Hero Image — Description of visual](/images/blog/${slug}.jpg)

# {Title — H1, matches frontmatter title}

{Opening hook — 2-3 sentences, specific stat or bold claim}

{Brief overview of what reader will learn/achieve}

## {First H2 — Action-oriented}

{Content with specifics, code examples if relevant}

### {H3 if needed for sub-sections}

{Supporting content}

## {Second H2}

{Content}

## {Third H2}

{Content}

## {Conclusion H2 — e.g., "Start Building Today"}

{Summary of key points}

{Clear CTA}

---

*{Optional: Brief author note or related resources}*
```

---

## Example Completed Frontmatter

```yaml
---
title: "Build an AI Agent with Claude in 4 Hours"
description: "Step-by-step guide to building and deploying your first AI agent using Claude's API. Working code included. Ship this afternoon."
date: 2026-01-09
lastmod: 2026-01-09
slug: "build-ai-agent-claude-4-hours"
author: "code:zero Content Team"
tags:
  - ai-agents
  - claude-api
  - tutorials
  - automation
categories:
  - Tutorials
draft: false
image: "/images/blog/build-ai-agent-claude-4-hours.png"
seo:
  primary_keyword: "build AI agent Claude"
  secondary_keywords:
    - Claude API tutorial
    - AI agent development
    - MCP servers
  search_volume: 880
  difficulty: 32
  intent: "informational"
sources:
  - title: "Anthropic Claude Documentation"
    url: "https://docs.anthropic.com"
  - title: "Claude Code GitHub"
    url: "https://github.com/anthropics/claude-code"
---
```
