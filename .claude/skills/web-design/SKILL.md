---
name: web-design
description: UI/UX patterns and components for code:zero website. Reference when building modals, buttons, animations, and interactive elements.
---

# Web Design Patterns

**Type:** Reference (auto-consult when building UI components)

**Purpose:** Ensure consistent, high-quality UI across the code:zero website.

---

## MODAL CLOSE BUTTON

**The standard close button for all modals and overlays.**

### HTML/Svelte

```svelte
<button class="modal-close" onclick={handleClose} aria-label="Close">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
</button>
```

### CSS

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
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: rotate(90deg);
}
```

### Key Features

- **Glassmorphic style**: Semi-transparent with backdrop blur
- **Rotate animation**: 90° rotation on hover for visual feedback
- **Fixed position**: Always top-right of viewport
- **Accessible**: Includes `aria-label` for screen readers

### Mobile Responsive

```css
@media (max-width: 640px) {
  .modal-close {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}
```

---

## ANIMATED BACKGROUND (Floating Glows)

**Used for full-screen modals and hero sections.**

### HTML/Svelte

```svelte
<div class="bg-layer">
  <div class="gradient-bg"></div>
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>
  <div class="glow glow-3"></div>
  <div class="grid-overlay"></div>
</div>
```

### CSS

```css
.bg-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.gradient-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0a0f 100%);
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 8s ease-in-out infinite;
}

.glow-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(4, 164, 89, 0.3) 0%, transparent 70%);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.glow-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
  bottom: -150px;
  right: -150px;
  animation-delay: -3s;
}

.glow-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -5s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

---

## FLOATING PILLS

**Animated floating badges/tags for visual interest.**

### HTML/Svelte

```svelte
<div class="floating-pills">
  <div class="pill pill-1">
    <span>🔥</span> Live Demo
  </div>
  <div class="pill pill-2">
    <span>✨</span> Keep the Code
  </div>
  <div class="pill pill-3">
    <span>🚀</span> Zero Commitment
  </div>
</div>
```

### CSS

```css
.floating-pills {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.pill {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  animation: floatPill 6s ease-in-out infinite;
}

.pill-1 { top: 1rem; right: 1rem; animation-delay: 0s; }
.pill-2 { top: 40%; right: -1rem; animation-delay: -2s; }
.pill-3 { bottom: 30%; right: 0; animation-delay: -4s; }

@keyframes floatPill {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

---

## GLASSMORPHIC CARD

**Semi-transparent card with backdrop blur.**

```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2.5rem;
}
```

---

## PULSING DOT

**Used for "live" or status indicators.**

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

---

## PRIMARY BUTTON (Green Gradient)

```css
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #04A459 0%, #10B981 100%);
  border: none;
  border-radius: 10px;
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(4, 164, 89, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(4, 164, 89, 0.4);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
```

---

## LOADING SPINNER

```css
.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## FORM INPUT (Dark Theme)

```css
.input-group input {
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.input-group input:focus {
  outline: none;
  border-color: #04A459;
  background: rgba(4, 164, 89, 0.05);
  box-shadow: 0 0 0 3px rgba(4, 164, 89, 0.1);
}
```

---

## STEP INDICATOR DOTS

```css
.step-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-dot {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s;
}

.step-dot.active {
  background: #04A459;
  box-shadow: 0 0 12px rgba(4, 164, 89, 0.5);
}

.step-line {
  width: 24px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  transition: all 0.3s;
}

.step-line.active {
  background: #04A459;
}
```

---

## SELECTION CHIPS

```css
.chip {
  flex: 1;
  padding: 0.75rem 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.chip:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.chip.selected {
  background: rgba(4, 164, 89, 0.15);
  border-color: #04A459;
  color: white;
}
```

---

## COLOR REFERENCE

| Name | Hex | Usage |
|------|-----|-------|
| Primary Green | `#04A459` | Buttons, accents, highlights |
| Primary Light | `#10B981` | Gradients, hover states |
| Primary Pale | `#34D399` | Badges, subtle accents |
| Background Dark | `#0a0a0f` | Modal backgrounds |
| Background Mid | `#0d1117` | Gradient midpoints |
| Text Primary | `white` | Headlines, important text |
| Text Secondary | `rgba(255,255,255,0.6)` | Body text |
| Text Muted | `rgba(255,255,255,0.4)` | Labels, hints |
| Border Subtle | `rgba(255,255,255,0.1)` | Card borders, dividers |

---

## SESSION LEARNINGS

### Patterns Discovered

### Improvements Made

### Avoid
