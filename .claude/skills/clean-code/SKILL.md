# Clean Code & Architecture

**Type:** Reference (auto-apply to ALL code work)

**Purpose:** Ensure every piece of code follows best practices, maintains clean architecture, and avoids tech debt from the start.

---

## CORE PRINCIPLES

### 1. DRY (Don't Repeat Yourself)

**Trigger:** When I'm about to write something similar to existing code.

**Action:**
- If I'm copying code from another file → STOP → Extract to shared module
- If same pattern appears 2+ times → Extract immediately
- If same component structure in 2+ pages → Create reusable component

**Examples:**
```
BAD:  Copy nav HTML into new page
GOOD: Import <Navbar /> component

BAD:  Duplicate API error handling in each endpoint
GOOD: Create shared error handler utility

BAD:  Same form validation in 3 components
GOOD: Create validation utility or shared hook
```

### 2. Single Responsibility

**Each file/function/component does ONE thing.**

**Triggers:**
- File > 200 lines → Consider splitting
- Function > 50 lines → Break into smaller functions
- Component doing fetch + render + business logic → Separate concerns

**Action:**
- Extract business logic to utilities
- Extract data fetching to server files or hooks
- Keep components focused on rendering

### 3. Composition Over Duplication

**Build from small, reusable pieces.**

**Page Structure:**
```svelte
<!-- GOOD: Composed from components -->
<Navbar />
<Hero title="..." subtitle="..." />
<Features items={features} />
<Testimonials items={testimonials} />
<CTA />
<Footer />

<!-- BAD: 800 lines of inline HTML -->
<nav>...100 lines...</nav>
<section>...200 lines...</section>
...
```

---

## PROACTIVE REFACTORING TRIGGERS

**Before adding new code, check these conditions:**

| Condition | Action |
|-----------|--------|
| Creating 2nd page with same layout | Extract shared layout/components FIRST |
| Adding 3rd similar function | Extract to utility module FIRST |
| File exceeds 300 lines | Split before adding more |
| Copy-pasting > 10 lines | Extract to shared module instead |
| Same prop drilling in 3+ components | Consider context/store |
| Inline styles repeated | Extract to CSS class or component |

**Say this to the user:**
> "Before I add this, I notice [duplication/size issue]. Let me refactor first to keep the code clean."

---

## FILE SIZE GUIDELINES

| File Type | Ideal | Max | Action if exceeded |
|-----------|-------|-----|-------------------|
| Svelte component | < 150 lines | 300 lines | Split into sub-components |
| TypeScript module | < 200 lines | 400 lines | Split by responsibility |
| API endpoint | < 100 lines | 200 lines | Extract to service layer |
| CSS/styles | < 200 lines | 400 lines | Split by component/section |

---

## ARCHITECTURE PATTERNS

### SvelteKit Structure

```
src/
├── lib/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Generic (Button, Modal, Card)
│   │   ├── layout/          # Layout (Navbar, Footer, Sidebar)
│   │   └── features/        # Feature-specific (CourseCard, StudentRow)
│   ├── server/              # Server-only code
│   │   ├── db/              # Database schema, connection
│   │   ├── services/        # Business logic
│   │   └── utils/           # Server utilities
│   ├── stores/              # Svelte stores
│   ├── utils/               # Shared utilities
│   └── types/               # TypeScript types
├── routes/
│   ├── +layout.svelte       # Global layout (nav, footer HERE)
│   ├── +page.svelte         # Pages import components, minimal logic
│   └── api/                 # API routes call services
```

### Component Extraction Rules

**Extract when:**
- Used in 2+ places
- Self-contained functionality
- Over 50 lines of markup
- Has its own styles
- Could be tested independently

**Naming:**
```
Generic:     Button.svelte, Modal.svelte, Card.svelte
Layout:      Navbar.svelte, Footer.svelte, Sidebar.svelte
Feature:     CourseCard.svelte, StudentTable.svelte
Page-specific: HeroSection.svelte (only if reused)
```

### Service Layer Pattern

**Don't put business logic in +page.server.ts or +server.ts**

```typescript
// BAD: Logic in endpoint
// src/routes/api/users/+server.ts
export async function POST({ request }) {
  const data = await request.json();
  // 50 lines of validation, transformation, DB calls...
}

// GOOD: Endpoint calls service
// src/routes/api/users/+server.ts
import { createUser } from '$lib/server/services/users';
export async function POST({ request }) {
  const data = await request.json();
  return json(await createUser(data));
}

// src/lib/server/services/users.ts
export async function createUser(data: CreateUserInput) {
  // All logic here, testable, reusable
}
```

---

## CODE QUALITY CHECKLIST

Before completing any code task, verify:

### Structure
- [ ] No duplicated code (DRY)
- [ ] Files under size limits
- [ ] Clear separation of concerns
- [ ] Reusable components extracted

### TypeScript
- [ ] Types defined (no `any` unless necessary)
- [ ] Interfaces for data structures
- [ ] Proper error types

### Components
- [ ] Props have types
- [ ] Single responsibility
- [ ] No inline styles (unless one-off)
- [ ] Accessible (aria labels, semantic HTML)

### Functions
- [ ] Clear, descriptive names
- [ ] Single purpose
- [ ] Return types specified
- [ ] Error handling

---

## REFACTORING PROMPTS

**Use these to suggest refactoring:**

When I see duplication:
> "I notice the nav/footer is duplicated across pages. Let me extract these to `$lib/components/` first, then add the new page."

When file is too large:
> "This file is 400+ lines. Before adding more, let me split it into focused modules."

When pattern repeats:
> "This is the 3rd endpoint with the same error handling. Let me create a shared utility first."

When architecture is unclear:
> "The business logic is mixed with the API handler. Let me extract a service layer for cleaner separation."

---

## TECH DEBT PREVENTION

### Red Flags (Stop and Fix)
- Copy-pasting more than 20 lines
- Adding to a file over 400 lines
- Creating 3rd instance of similar code
- Inline styles in multiple places
- Same validation logic repeated

### Yellow Flags (Note and Plan)
- File approaching 300 lines
- 2nd instance of similar pattern
- Growing prop drilling
- Increasing import complexity

### Green Practices
- Extract early (2nd use, not 5th)
- Small, focused files
- Clear naming conventions
- Consistent patterns across codebase

---

## WHEN TO BREAK RULES

Sometimes pragmatism wins:

- **Prototype/MVP:** Ship first, refactor after validation
- **One-off script:** Doesn't need perfect architecture
- **Time-critical fix:** Fix now, refactor in follow-up
- **User explicitly says:** "Just make it work, we'll clean up later"

**But always flag it:**
> "I'm keeping this inline for speed, but we should extract it later. Adding to tech debt backlog."

---

## SESSION LEARNINGS

### Patterns Discovered

### Improvements Made

### Avoid

