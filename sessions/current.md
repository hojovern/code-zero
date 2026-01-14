# Current Session: Repository Restructuring

## Goals
- [x] Restructure repository into 3 isolated buckets
- [x] Separate Technical context from Business context
- [x] Preserve git history for all projects

## Actions Taken
- **Relocated Binky:** Renamed `projects/image-organizer` to `projects/binkys-magic-image-organizer`.
- **Relocated Website:** Created `projects/code-zero-website` and moved all SvelteKit/Supabase files there.
- **Context Isolation:** 
    - Created `.claude/memory` folders in each project directory.
    - Split `learnings.md` into technical (project-specific) and business (root) versions.
    - Split `business-context.md` to provide project-relevant info.
- **Root Cleanup:** Updated `CLAUDE.md` to reflect the "Core Business Hub" model.

## Current State
- **Root:** Strategy, Brand, Financials, Global Sessions.
- **Projects:** Isolated technical buckets with their own memory and standards.

## Open Threads
- None. Restructuring complete.
