# Session: 2025-01-10 18:30

## TL;DR
Added comprehensive agent routing rules to CLAUDE.md defining when to delegate tasks to each agent.

## Accomplished
- Reviewed all 9 skills in workspace (brand-voice, blog-writer, keyword-research, branded-deck, branded-social-visual, think-harder, learn, close, last)
- Reviewed all 7 agents (2 top-level: content-strategist, presentation-specialist; 5 think-harder sub-agents: research, decompose, critic, synthesis, memory)
- Created comprehensive "Agent Routing (WHEN TO DELEGATE)" section in CLAUDE.md
- Added quick reference table with spawn commands
- Documented each agent with trigger phrases, capabilities, use cases
- Added decision tree for agent selection
- Added "Agent vs Skill" comparison table
- Added skill quick lookup reference

## Current State
CLAUDE.md now has complete routing rules for both agents and skills. The system knows when to spawn specialized agents vs invoke skills based on user requests.

## Open Threads
- [ ] Fill in instructor bios in enterprise one-pager
- [ ] Register for HRDF
- [ ] Build n8n demo for taster sessions
- [ ] Decide on tech stack (SvelteKit vs Next.js)

## Decisions Made
- Brand-voice should be a skill (reference), not an agent: It's guidelines to follow, not a workflow to execute
- Agents are for autonomous specialized work; Skills are for defined workflows
- Top-level agents spawn via Task tool; Think-harder sub-agents activate automatically on complex tasks

## Context for Next Session
User is building code:zero marketing workspace with sophisticated agent/skill system. Prefers clear routing rules so Claude knows when to delegate. Distinction matters: agents = autonomous workers, skills = defined workflows.

## Files Modified This Session
- `CLAUDE.md` - Added "Agent Routing (WHEN TO DELEGATE)" section with full routing rules, decision tree, agent vs skill comparison
- `.claude/skills/brand-voice/SKILL.md` - Created in previous session (referenced this session)

## User Intent
Build a well-organized AI marketing workspace where Claude automatically knows which specialized agent or skill to use for different types of requests, without user needing to specify.
