---
name: typography-audit
description: Scan Svelte files for typography inconsistencies and report/fix violations against the code:zero standard.
---

# Typography Audit

**Type:** Workflow (active audit/fix tool)

**Triggers:**
- `/typography-audit`
- "audit typography"
- "check typography"
- "typography inconsistencies"

---

## TYPOGRAPHY STANDARD (SOURCE OF TRUTH)

Based on the standardization work across blog, prompts, setup, enterprise, full-stack, and instructors pages.

### The Scale

| Element Type | Font Family | Size | Weight | Line Height | Color |
|--------------|-------------|------|--------|-------------|-------|
| **Page h1** | `--font-heading` | 2-2.5rem | 700 | 1.1 | `--text-primary` |
| **Intro paragraph** | (body) | 1.1rem | 400 | 1.7 | `--text-secondary` |
| **Card/item titles** | `--font-mono` | 1rem | 500 | — | `--text-primary` |
| **Body text** | (body) | 0.9rem | 400 | 1.7 | `--text-secondary` |
| **Meta/tags/dates** | `--font-mono` | 0.8rem | 400-500 | — | `--text-muted` |
| **Labels** | `--font-mono` | 0.8-0.9rem | 500 | — | `--text-primary` |

### Allowed Font Sizes

```
0.8rem   → Meta, tags, small labels
0.9rem   → Body text, descriptions
1rem     → Card titles, normal labels
1.1rem   → Intro paragraphs
1.5rem   → Section headings (h3)
2rem     → Page headings (h1 on smaller pages)
2.5rem   → Page headings (h1 on main pages)
```

### Common Violations

```css
/* BAD: Non-standard sizes */
font-size: 0.875rem;    /* → Should be 0.9rem */
font-size: 0.9375rem;   /* → Should be 0.9rem or 1rem */
font-size: 0.8125rem;   /* → Should be 0.8rem */
font-size: 1.125rem;    /* → Should be 1rem or 1.1rem */
font-size: 1.0625rem;   /* → Should be 1rem or 1.1rem */

/* BAD: Missing font-mono on UI elements */
.tag { font-size: 0.8rem; }  /* Missing font-family: var(--font-mono) */

/* BAD: Wrong weight */
font-weight: 600;  /* → Should be 500 for titles, 700 for h1 only */

/* BAD: Wrong line-height */
line-height: 1.6;  /* → Should be 1.7 for body text */
line-height: 1.5;  /* → Should be 1.7 for body text */
```

---

## WORKFLOW

```
User: /typography-audit [path] [--fix]

Claude:
1. Identify target files:
   - If path provided → audit that file/folder
   - If no path → audit src/routes/**/*.svelte + src/lib/components/**/*.svelte

2. For each file, grep for typography patterns:
   - font-size declarations
   - font-weight declarations
   - font-family declarations
   - line-height declarations

3. Compare against standard, flag violations:
   - Non-standard sizes (0.875rem, 0.9375rem, 0.8125rem, 1.125rem, etc.)
   - Weight 600 where 500 expected (except h1)
   - Line-height 1.5 or 1.6 where 1.7 expected
   - Missing font-mono on tags, labels, dates, badges

4. Output report with:
   - File path + line number
   - Current value → Recommended value
   - Severity (SHOULD FIX / NICE TO HAVE)

5. If --fix mode:
   - Make edits automatically
   - Run build to verify
   - Report changes made
```

---

## DETECTION PATTERNS

```bash
# Non-standard font sizes (violations)
grep -nE "font-size:\s*(0\.875|0\.9375|0\.8125|1\.125|1\.0625|0\.75)rem"

# Font-weight potential issues (600 should be 500)
grep -nE "font-weight:\s*600[^0-9]"

# Line-height issues (1.5 or 1.6 should be 1.7)
grep -nE "line-height:\s*1\.[56][^0-9]"

# Classes that should have font-mono (check if missing)
grep -nE "\.(tag|label|meta|date|badge|stat-label|step|category)"
```

---

## OUTPUT FORMAT

### Report Mode (Default)

```
Typography Audit Report
━━━━━━━━━━━━━━━━━━━━━━

Scanned: 12 files
Issues: 8 found

src/routes/about/+page.svelte
├─ Line 45: font-size: 0.875rem → 0.9rem
├─ Line 67: font-weight: 600 → 500
└─ Line 89: .tag missing font-mono

src/lib/components/Card.svelte
├─ Line 23: line-height: 1.6 → 1.7
└─ Line 34: font-size: 0.8125rem → 0.8rem

Summary:
• 3 size violations
• 2 weight violations
• 2 missing font-mono
• 1 line-height violation

Run `/typography-audit --fix` to auto-fix.
```

### Fix Mode

```
Typography Audit - Fix Mode
━━━━━━━━━━━━━━━━━━━━━━━━━━

Fixed 8 issues across 2 files:

src/routes/about/+page.svelte
✓ Line 45: 0.875rem → 0.9rem
✓ Line 67: 600 → 500
✓ Line 89: added font-mono

Build: ✓ Passed
```

---

## SEVERITY LEVELS

| Level | Issues | Action |
|-------|--------|--------|
| **SHOULD FIX** | Non-standard sizes, wrong weights | Fix before delivery |
| **NICE TO HAVE** | Missing font-mono on UI elements | Note for polish pass |

---

## SIZE MAPPING (AUTO-FIX)

When fixing, use these mappings:

```
0.75rem    → 0.8rem   (too small)
0.8125rem  → 0.8rem   (round down)
0.875rem   → 0.9rem   (round up)
0.9375rem  → 0.9rem   (round down)
1.0625rem  → 1rem     (round down)
1.125rem   → 1.1rem   (match intro size)
```

---

## FONT-MONO RULES

Elements that MUST use `font-family: var(--font-mono)`:
- `.tag`, `.badge`, `.label`
- `.meta`, `.date`, `.timestamp`
- `.stat-label`, `.stat-value`
- `.step-number`, `.step-label`
- `.category`, `.type`
- Any small uppercase text

Elements that should NOT use font-mono:
- Page titles (h1, h2)
- Body paragraphs
- Intro text
- Modal titles

---

## SESSION LEARNINGS

### Patterns Discovered

### Improvements Made

### Avoid
