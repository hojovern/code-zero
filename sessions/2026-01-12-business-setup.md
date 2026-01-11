# Session: 2026-01-12 15:30

## TL;DR
Fixed student portal UI, added auto-email for student credentials, planned business infrastructure (SSM, domain, deployment).

## Accomplished
- Fixed overlapping course cards in student portal (CSS: align-items, z-index, removed transform)
- Added auto-email when creating students - sends login credentials via Brevo
- Updated success message UI to show email sent status
- Clarified auth system: Already email/password via Supabase (no Google OAuth to remove)
- Connected Supabase MCP server to Claude Code
- Committed SSM payment receipt to financial-documents/
- Files: `src/routes/admin/students/+page.server.ts`, `+page.svelte`, `src/routes/student-portal/[username]/+page.svelte`, `my-courses/+page.svelte`

## Current State
- Student portal cards display correctly
- New students receive email with login credentials automatically
- Business officially registered with SSM (receipt saved)
- MCP servers configured: SEO + Supabase (restart Claude to activate Supabase)
- Ready for domain purchase and deployment setup

## Open Threads
- [ ] Buy domain codezero.my from Exabytes
- [ ] Set up Cloudflare Pages for deployment
- [ ] Configure Cloudflare DNS after domain purchase
- [ ] Restart Claude Code to activate Supabase MCP server
- [ ] Delete "Full Stack Sprint" course from admin (old duplicate)

## Decisions Made
- **Deployment**: Cloudflare Pages (free, fast, SvelteKit native) + Cloudflare DNS
- **Domain registrar**: Exabytes for .my domain (reliable, local support)
- **SSM business code**: 85499 (Other Education N.E.C.) - fits coding academy
- **SSM business name**: "code zero" (not "code zero academy") - cleaner, more flexible
- **Auth stays as-is**: Email/password via Supabase (no changes needed)

## Context for Next Session
User is setting up official business infrastructure for code:zero:
- SSM registered (receipt in financial-documents/)
- Next: Buy codezero.my domain, then deploy to Cloudflare
- Business address: Can use home address initially, change to shoplot later
- User prefers practical business advice alongside technical work

## Files Modified This Session
- `src/routes/admin/students/+page.server.ts` - Added sendEmail after student creation
- `src/routes/admin/students/+page.svelte` - Updated success message with email status
- `src/routes/student-portal/[username]/+page.svelte` - Fixed CSS for course cards
- `src/routes/student-portal/[username]/my-courses/+page.svelte` - Fixed CSS for course cards
- `src/routes/admin/courses/+page.svelte` - Refactored to content editor
- `financial-documents/code-zero-ssm-payment-receipt.pdf` - Added SSM receipt
- `~/.claude.json` - Added Supabase MCP server config

## User Intent
Build code:zero as a legitimate business - get domain, deploy website, accept students. Moving from development to launch phase.
