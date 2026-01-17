---
name: web-design
description: UI/UX patterns and components for code:zero website. Reference when building modals, buttons, animations, and interactive elements.
---

# Web Design Patterns

**Type:** Reference (auto-consult when building UI)

**Tokens:** Read `src/app.css` for colors, spacing, typography, shadows.

---

## TYPOGRAPHY STANDARD

**Full reference:** See `/.claude/skills/typography-audit/SKILL.md` for the complete standard.

**Quick reference:**

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Page h1 | 2-2.5rem | 700 | `--font-heading` |
| Intro | 1.1rem | 400 | body |
| Card titles | 1rem | 500 | `--font-mono` |
| Body text | 0.9rem | 400 | body |
| Meta/tags | 0.8rem | 400-500 | `--font-mono` |

**Allowed sizes:** 0.8rem, 0.9rem, 1rem, 1.1rem, 1.5rem, 2rem, 2.5rem

**Never use:** 0.875rem, 0.9375rem, 0.8125rem, 1.125rem (non-standard)

**Run `/typography-audit` to check for violations.**

---

## COMPONENT PATTERNS

### Modal Close Button (Standard)
```css
.modal-close {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10001;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: rotate(90deg);
}
```

### Animated Background (Floating Glows)
```html
<div class="bg-layer">
  <div class="gradient-bg"></div>
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>
  <div class="glow glow-3"></div>
  <div class="grid-overlay"></div>
</div>
```
- `.glow`: 400-600px circles, `filter: blur(80px)`, `opacity: 0.5`
- Colors: `rgba(4, 164, 89, 0.3)`, `rgba(16, 185, 129, 0.25)`, `rgba(52, 211, 153, 0.2)`
- Animation: `float 8s ease-in-out infinite` with staggered delays

### Floating Pills
```css
.pill {
  position: absolute;
  padding: 0.625rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 0.8rem;
  color: white;
  animation: floatPill 6s ease-in-out infinite;
}
```

### Pulsing Dot (Live Indicator)
```css
.pulse-dot {
  width: 6px;
  height: 6px;
  background: #34D399;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

### Form Input (Dark)
```css
input {
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  transition: all 0.2s;
}
input:focus {
  border-color: #04A459;
  background: rgba(4, 164, 89, 0.05);
  box-shadow: 0 0 0 3px rgba(4, 164, 89, 0.1);
}
```

### Selection Chips
```css
.chip {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}
.chip.selected {
  background: rgba(4, 164, 89, 0.15);
  border-color: #04A459;
  color: white;
}
```

### Step Indicator
```css
.step-dot { width: 8px; height: 8px; background: rgba(255,255,255,0.2); border-radius: 50%; }
.step-dot.active { background: #04A459; box-shadow: 0 0 12px rgba(4, 164, 89, 0.5); }
.step-line { width: 24px; height: 2px; background: rgba(255,255,255,0.1); }
.step-line.active { background: #04A459; }
```

### Loading Spinner
```css
.loader {
  width: 20px; height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
```

---

## ANIMATION KEYFRAMES

```css
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
@keyframes float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(0, -10px); } }
@keyframes spin { to { transform: rotate(360deg); } }
```

---

## MOBILE BREAKPOINTS

```css
@media (max-width: 1024px) { /* Tablet: stack layouts, reduce font sizes */ }
@media (max-width: 640px) { /* Mobile: single column, touch-friendly (44px min tap) */ }
```

---

## SESSION LEARNINGS

### Patterns
- Full-screen modals work well for high-intent actions (Apply, Taster)
- Rotating close button (90°) adds polish

### Preferences

### Avoid
