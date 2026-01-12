---
name: design-critic
description: Quality checklist for UI work. Run mentally before delivering any significant UI.
---

# Design Critic Checklist

**Type:** Checklist (run before delivering UI)

**When:** Before showing ANY modal, page, or component to user.

---

## THE CHECKLIST

### 1. Visual Hierarchy
- [ ] Most important element is most prominent
- [ ] Clear reading order (F-pattern or Z-pattern)
- [ ] Headings use size AND weight to differentiate
- [ ] One primary CTA per view (not competing buttons)

### 2. Spacing & Alignment
- [ ] Consistent spacing (use `--space-*` tokens)
- [ ] Elements align to invisible grid
- [ ] Breathing room around text (not cramped)
- [ ] Related items grouped, unrelated separated

### 3. Typography
- [ ] Max 2 font families (heading + body)
- [ ] Line length 45-75 characters for readability
- [ ] Sufficient contrast (4.5:1 min for body text)
- [ ] Hierarchy clear: title > subtitle > body > caption

### 4. Color
- [ ] Brand green (`#04A459`) used for primary actions
- [ ] Not too many accent colors (max 2-3)
- [ ] Error states in red, success in green
- [ ] Text readable on background

### 5. Interactive States
- [ ] Hover state on all clickables
- [ ] Focus state visible (accessibility)
- [ ] Disabled state clearly different
- [ ] Loading state for async actions

### 6. Responsive
- [ ] Works at 1024px (tablet)
- [ ] Works at 640px (mobile)
- [ ] Touch targets min 44px
- [ ] No horizontal scroll

### 7. Conversion (for forms/CTAs)
- [ ] Value proposition clear
- [ ] Trust signals present (badges, testimonials)
- [ ] Friction minimized (fewer fields = better)
- [ ] Progress indicator for multi-step

### 8. Polish
- [ ] Animations subtle, not distracting
- [ ] No orphan words in headlines
- [ ] Icons consistent style/weight
- [ ] Images optimized, not stretched

---

## SEVERITY LEVELS

| Level | Action |
|-------|--------|
| **BLOCKER** | Fix before showing (broken, inaccessible, unusable) |
| **SHOULD FIX** | Fix before delivery (looks off, confusing) |
| **NICE TO HAVE** | Note for polish pass (minor improvements) |

---

## QUICK SELF-TEST

Before delivering, ask:
1. What's the ONE thing I want the user to do?
2. Is that action obvious within 3 seconds?
3. Would I trust this page with my credit card?

If any answer is "no" → fix it.

---

## SESSION LEARNINGS

### Common Issues Found

### Patterns That Pass
