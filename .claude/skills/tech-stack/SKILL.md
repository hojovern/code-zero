---
name: tech-stack
description: Reference for JV's preferred tech stack. Auto-consulted when making technology decisions, writing code, or suggesting tools.
---

# Tech Stack Reference

**Always use these tools and patterns unless explicitly told otherwise.**

---

## Frontend

| Tool | Version | Purpose |
|------|---------|---------|
| **SvelteKit** | 2.x | Full-stack framework |
| **Svelte** | 5.x | UI framework (uses runes: `$state`, `$derived`, `$props`) |
| **Vite** | 6.x | Build tool and dev server |
| **TypeScript** | 5.x | Type safety |
| **MDsveX** | 0.12.x | Markdown in Svelte components |
| **Shiki** | 1.x | Code syntax highlighting |

### Svelte 5 Patterns
```svelte
<script lang="ts">
  // Props
  let { data }: { data: PageData } = $props();

  // Reactive state
  let count = $state(0);

  // Derived values
  let doubled = $derived(count * 2);
</script>
```

---

## Backend & Database

| Tool | Purpose |
|------|---------|
| **Supabase** | Auth, PostgreSQL database, storage, realtime |
| **Drizzle ORM** | Type-safe database queries |
| **PostgreSQL** | Database (via Supabase) |

### Database Commands
```bash
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

### Supabase Auth Pattern
```typescript
// Get user in +page.server.ts
const user = await locals.getUser();
if (!user) throw redirect(303, '/login');
```

---

## AI & Development Tools

| Tool | Purpose |
|------|---------|
| **Claude CLI** | AI coding assistant (primary) |
| **Gemini CLI** | AI assistant (secondary) |
| **iTerm2** | Terminal emulator |
| **GitHub** | Version control, CI/CD |
| **VS Code** | Editor (when not using terminal) |

### Claude CLI Skills
Custom skills in `/.claude/skills/`:
- `/commit` - Commit and push to GitHub
- `/blog-writer` - SEO blog post creation
- `/branded-social-visual` - Instagram graphics
- `/think-harder` - Multi-agent reasoning

---

## Content & Markdown

| Tool | Purpose |
|------|---------|
| **MDsveX** | Markdown processing |
| **rehype-slug** | Auto-generate heading IDs |
| **rehype-autolink-headings** | Link headings |
| **Shiki** | Code block highlighting (github-dark theme) |

### Supported Languages
`javascript`, `typescript`, `svelte`, `html`, `css`, `json`, `bash`, `python`, `markdown`, `yaml`, `shell`

---

## Project Structure

```
code-zero/
├── src/
│   ├── routes/           # SvelteKit routes
│   ├── lib/              # Shared utilities
│   │   ├── server/       # Server-only code
│   │   │   ├── db/       # Drizzle schema & connection
│   │   │   └── queue.ts  # Content queue utilities
│   │   └── posts.js      # Blog post utilities
│   ├── content/          # Markdown content
│   └── auth.ts           # Supabase auth config
├── supabase/             # Supabase config
├── drizzle/              # Database migrations
├── social-media/         # Social content queue
├── syllabus/             # Course curriculum
├── .claude/skills/       # Claude CLI skills
└── sessions/             # Session continuity logs
```

---

## Environment Variables

Required in `.env`:
```bash
# Supabase
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Database (Transaction Pooler for serverless)
DATABASE_URL=postgresql://...?sslmode=require

# Google OAuth (configured in Supabase dashboard)
```

---

## Deployment

| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting (auto-deploy from GitHub) |
| **Supabase** | Backend services |
| **Cloudinary** | Image CDN (for social media) |

---

## Preferred Patterns

### File-based content
- Social posts: `/social-media/queue/*.md`
- Blog posts: `/src/content/blog/*.md`
- Lessons: `/syllabus/week-*/day-*.md`

### Admin routes
- Protected by email allowlist
- Consistent sidebar navigation
- Cards for modules, stats for quick overview

### Styling
- CSS custom properties (design tokens)
- Component-scoped styles
- Mobile-first responsive

---

## When Suggesting Tools

**Always prefer:**
1. SvelteKit over Next.js/Nuxt
2. Supabase over Firebase/Auth0
3. Drizzle over Prisma
4. PostgreSQL over MongoDB
5. Terminal-based workflows over GUI
6. Markdown over rich text editors
7. File-based content over CMS

**Never suggest:**
- React (use Svelte)
- Express (use SvelteKit API routes)
- MongoDB (use PostgreSQL)
- Firebase (use Supabase)
- Paid services when free alternatives exist

---

## Quick Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run check        # TypeScript check

# Database
npm run db:push      # Push schema changes
npm run db:studio    # Open Drizzle Studio

# Git (via /commit skill)
/commit              # Stage, commit, push

# Supabase CLI
supabase start       # Start local
supabase db push     # Push migrations
```
