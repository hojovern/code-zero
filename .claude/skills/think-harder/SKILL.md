---
name: think-harder
description: Intelligence amplification system. Spawns specialized agents (Critic, Research, Memory, Decompose, Synthesis) to tackle complex tasks more rigorously. Use when facing non-trivial problems, when you want higher quality output, or when the user explicitly invokes /think-harder. This system forces verification over generation.
---

# Think Harder - Intelligence Amplification System

**STATUS: DEFAULT BEHAVIOR**

This is NOT an optional skill to invoke. This is how Claude operates by default in this workspace. The multi-agent pipeline runs automatically on all non-trivial tasks.

See `CLAUDE.md` → "How I Think (MANDATORY)" for trigger conditions.

This file documents the agent specifications and can be referenced when spawning agents.

## PHILOSOPHY

**Verification > Generation**

The biggest gains don't come from generating better—they come from *verifying better*. This system creates multiple "minds" that check each other's work.

Single-pass (default):
```
Task → Generate → Output
```

Think-harder (this system):
```
Task → Research → Decompose → Generate → Critique → Revise → Synthesize → Output
```

## THE FIVE AGENTS

### 1. Research Agent
**Purpose**: Gather context before acting
**When**: Always runs first on complex tasks
**Spawns via**: `Task` tool with `subagent_type: Explore`
**Instructions**: See `agents/research.md`

### 2. Decompose Agent
**Purpose**: Break complex tasks into explicit steps
**When**: After research, before generation
**Spawns via**: `Task` tool with `subagent_type: Plan`
**Instructions**: See `agents/decompose.md`

### 3. Critic Agent
**Purpose**: Find flaws in outputs before delivery
**When**: After any significant generation
**Spawns via**: `Task` tool with `subagent_type: general-purpose`
**Instructions**: See `agents/critic.md`

### 4. Memory Agent
**Purpose**: Persist and retrieve learnings
**When**: At session start (retrieve) and after corrections (persist)
**Spawns via**: Direct file operations (not a subprocess)
**Instructions**: See `agents/memory.md`

### 5. Synthesis Agent
**Purpose**: Combine outputs into coherent whole
**When**: After multiple agents have contributed
**Spawns via**: `Task` tool with `subagent_type: general-purpose`
**Instructions**: See `agents/synthesis.md`

## WORKFLOW

### Phase 1: Activation Check

Determine if think-harder should activate. **YES** if any of:
- User explicitly invoked `/think-harder`
- Task is non-trivial (affects multiple files, requires design decisions)
- Task has multiple valid approaches
- Task involves unfamiliar domain
- Previous attempt failed or was rejected
- High stakes (production code, user-facing content)

If **NO**, proceed normally. If **YES**, continue to Phase 2.

### Phase 2: Research

**Goal**: Gather all relevant context before acting.

1. Spawn Research Agent via Task tool:
```
Task(
  subagent_type: "Explore",
  prompt: "[Read agents/research.md for full instructions]

  TASK: {original_task}

  Research this thoroughly. Find:
  - Relevant existing code/patterns
  - Similar solutions in codebase
  - External context if needed (docs, best practices)
  - Constraints and requirements

  Return structured findings."
)
```

2. Wait for research results before proceeding.

### Phase 3: Decompose

**Goal**: Break task into explicit, verifiable steps.

1. Spawn Decompose Agent via Task tool:
```
Task(
  subagent_type: "Plan",
  prompt: "[Read agents/decompose.md for full instructions]

  TASK: {original_task}
  RESEARCH: {research_results}

  Break this into:
  - Explicit steps with clear boundaries
  - Dependencies between steps
  - Verification criteria for each step
  - Risk points where things might go wrong

  Return structured plan."
)
```

2. Review plan. If plan reveals need for more research, loop back to Phase 2.

### Phase 4: Execute with Critique Loop

**Goal**: Generate outputs with adversarial verification.

For each step in the plan:

1. **Generate**: Produce the output for this step

2. **Critique**: Spawn Critic Agent:
```
Task(
  subagent_type: "general-purpose",
  prompt: "[Read agents/critic.md for full instructions]

  TASK: {current_step}
  OUTPUT: {generated_output}
  CRITERIA: {verification_criteria}

  Review this critically. Find:
  - Logical errors
  - Missing edge cases
  - Unstated assumptions
  - Security issues
  - Deviations from requirements

  Return specific, actionable critique."
)
```

3. **Revise**: If critique found issues, fix them and re-critique

4. **Proceed**: Move to next step only when critique passes

### Phase 5: Synthesize

**Goal**: Combine all outputs into coherent whole.

1. Spawn Synthesis Agent:
```
Task(
  subagent_type: "general-purpose",
  prompt: "[Read agents/synthesis.md for full instructions]

  ORIGINAL TASK: {original_task}
  OUTPUTS: {all_step_outputs}

  Synthesize into:
  - Coherent final output
  - Verify it addresses original task
  - Check nothing was lost between steps
  - Ensure consistent style/approach

  Return final synthesized output."
)
```

### Phase 6: Memory Update

**Goal**: Persist learnings for future sessions.

1. If task succeeded: Note patterns that worked
2. If task had issues: Note what to avoid
3. Update `/.claude/memory/learnings.md`

See `agents/memory.md` for persistence format.

## WHEN TO USE WHICH AGENTS

| Situation | Agents to Spawn |
|-----------|-----------------|
| Simple question | None (skip think-harder) |
| Code change in familiar area | Critic only |
| Code change in unfamiliar area | Research → Critic |
| New feature | Research → Decompose → Critic → Synthesis |
| Bug fix | Research → Critic |
| Architecture decision | Research → Decompose → Critic → Synthesis |
| Content creation | Research → Critic |
| Refactoring | Research → Decompose → Critic |

## QUICK MODE

For `/think-harder quick` - lightweight verification:
1. Skip Research (use existing context)
2. Skip Decompose (work from task directly)
3. Run Critic only
4. Skip Synthesis (output directly)

## PARALLEL EXECUTION

When steps are independent, spawn agents in parallel:

```
// These can run simultaneously
Task(Research Agent for component A)
Task(Research Agent for component B)

// Wait for both, then
Task(Critic on combined output)
```

## ERROR HANDLING

| Scenario | Action |
|----------|--------|
| Agent times out | Proceed with partial results, note gap |
| Agent returns garbage | Re-spawn with clarified prompt |
| Critique loops > 3x | Accept with caveats, flag for human review |
| Research finds nothing | Proceed with explicit uncertainty |

## EXAMPLE INVOCATION

**User**: `/think-harder` Add a caching layer to the API

**Execution**:
1. **Research Agent** explores:
   - Current API structure
   - Existing caching patterns in codebase
   - Best practices for API caching

2. **Decompose Agent** plans:
   - Step 1: Choose caching strategy (Redis vs in-memory)
   - Step 2: Implement cache wrapper
   - Step 3: Add cache invalidation
   - Step 4: Update API endpoints
   - Step 5: Add tests

3. **Execute with Critique**:
   - Generate Step 1 → Critic reviews → Approved
   - Generate Step 2 → Critic finds race condition → Fix → Re-critique → Approved
   - ... continue through steps

4. **Synthesis Agent** combines:
   - Verifies all pieces work together
   - Checks nothing was missed
   - Produces final coherent output

5. **Memory Update**:
   - Notes: "Redis caching pattern worked well for this API structure"

## OUTPUT

The final output is:
1. The actual deliverable (code, content, etc.)
2. A brief summary of the process (what was researched, what was caught by critic)
3. Any caveats or areas of uncertainty

## SESSION LEARNINGS

### Workflow

### Output Rules

### Avoid
