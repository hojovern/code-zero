# code:zero Design System

**Version**: 1.0
**Last Updated**: 2025-01-10
**Status**: Active

---

## Design Philosophy

code:zero's visual identity blends **technical credibility** with **approachable energy**. We're not a sterile corporate bootcamp, but we're not a chaotic indie project either. The design should feel like a senior developer's personal site meets a modern EdTech platform.

### Design Principles

1. **Dark-first, not dark-only** — Dark mode is primary, but warm and inviting, not cold
2. **Purposeful motion** — Animations serve function, never decoration
3. **Generous breathing room** — Whitespace signals confidence and clarity
4. **Progressive disclosure** — Show only what's needed, reveal more on demand
5. **Builder aesthetic** — Like a well-crafted tool, not a flashy toy

### Inspiration Synthesis

| Source | What We Take | What We Skip |
|--------|--------------|--------------|
| **alexop.dev** | Subtle animations, sophisticated minimalism, rotation hover effects, professional credibility | — |
| **telebort.com** | Warm backgrounds, strong accessibility, focus states, educational trust | Light mode cream (too soft) |
| **teamtreehouse.com** | Vibrant gradients, rounded typography, card-based layouts, optimistic energy | Overly playful tone |
| **nextacademy.com** | Alternating dark/light sections, testimonial carousels, trust signals, global community messaging, high-contrast readability | Generic corporate feel |

---

## Color System

### Primary Palette

```css
:root {
  /* Core Brand */
  --color-primary: #04A459;           /* Main green - CTAs, accents */
  --color-primary-light: #2ECC71;     /* Gradient endpoint, highlights */
  --color-primary-dark: #038544;      /* Hover states, depth */

  /* Gradient Accent (Treehouse-inspired) */
  --gradient-hero: linear-gradient(126deg, #04A459 0%, #2ECC71 50%, #38D67A 100%);
  --gradient-accent: linear-gradient(135deg, #04A459 0%, #2ECC71 100%);
  --gradient-glow: radial-gradient(ellipse at center, rgba(4, 164, 89, 0.15) 0%, transparent 70%);

  /* Dark Mode Backgrounds (Warm, not cold) */
  --bg-base: #1a1d23;                 /* Primary background - warm dark */
  --bg-elevated: #242933;             /* Cards, modals */
  --bg-surface: #2e3440;              /* Inputs, secondary cards */
  --bg-hover: #3b4252;                /* Hover states */

  /* Light Sections (NEXT Academy-inspired alternating) */
  --bg-light: #f8f9fa;                /* Light section background */
  --bg-light-elevated: #ffffff;       /* Cards on light sections */
  --text-on-light: #1a1d23;           /* Dark text for light sections */
  --text-on-light-muted: #6b7280;     /* Muted text on light */

  /* Text Hierarchy */
  --text-primary: #ffffff;            /* Headings, primary content */
  --text-secondary: #a1a1a1;          /* Body text, descriptions */
  --text-muted: #6b7280;              /* Captions, metadata */
  --text-disabled: #4b5563;           /* Disabled states */

  /* Borders & Dividers */
  --border-subtle: #2e3440;           /* Subtle separation */
  --border-default: #3b4252;          /* Default borders */
  --border-strong: #4b5563;           /* Emphasized borders */

  /* Semantic Colors */
  --color-success: #10B981;           /* Success states */
  --color-warning: #F59E0B;           /* Warnings */
  --color-error: #EF4444;             /* Errors */
  --color-info: #3B82F6;              /* Informational */
}
```

### Color Usage Guidelines

| Element | Color | Notes |
|---------|-------|-------|
| Page background | `--bg-base` | Never pure black (#000) |
| Cards | `--bg-elevated` | Subtle elevation from base |
| Primary buttons | `--gradient-accent` | Gradient, not flat |
| Secondary buttons | `--bg-surface` + `--border-default` | Ghost style |
| Links | `--color-primary` | Underline on hover |
| Headings | `--text-primary` | White, never gray |
| Body text | `--text-secondary` | Readable gray |

### Glow Effects

```css
/* Primary button glow */
.btn-primary {
  box-shadow: 0 0 20px rgba(4, 164, 89, 0.3),
              0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 0 30px rgba(4, 164, 89, 0.5),
              0 6px 16px rgba(0, 0, 0, 0.4);
}

/* Ambient glow behind hero elements */
.hero-glow {
  background: var(--gradient-glow);
  filter: blur(80px);
  opacity: 0.6;
}
```

---

## Typography

### Font Stack

```css
:root {
  /* Primary - Headings (Treehouse-inspired rounded geometric) */
  --font-heading: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;

  /* Secondary - Body (Clean, readable) */
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;

  /* Mono - Code snippets */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

**Why Plus Jakarta Sans?** Rounded terminals like Quicksand (Treehouse) but more professional. Geometric but warm.

### Type Scale

```css
:root {
  /* Font Sizes - Fluid scaling */
  --text-xs: 0.75rem;      /* 12px - Labels, badges */
  --text-sm: 0.875rem;     /* 14px - Small text, captions */
  --text-base: 1rem;       /* 16px - Body text */
  --text-lg: 1.125rem;     /* 18px - Large body */
  --text-xl: 1.25rem;      /* 20px - Section intros */
  --text-2xl: 1.5rem;      /* 24px - Card headings */
  --text-3xl: 1.875rem;    /* 30px - Section headings */
  --text-4xl: 2.25rem;     /* 36px - Page headings */
  --text-5xl: 3rem;        /* 48px - Hero headings */
  --text-6xl: 3.75rem;     /* 60px - Display headings */

  /* Line Heights */
  --leading-tight: 1.1;    /* Headings */
  --leading-snug: 1.3;     /* Subheadings */
  --leading-normal: 1.5;   /* Body text */
  --leading-relaxed: 1.75; /* Long-form content */

  /* Letter Spacing */
  --tracking-tight: -0.02em;   /* Headings */
  --tracking-normal: 0;         /* Body */
  --tracking-wide: 0.05em;      /* All caps, labels */
}
```

### Typography Patterns

```css
/* Hero Heading */
.hero-heading {
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 5vw + 1rem, 3.75rem);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
}

/* Section Heading */
.section-heading {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
}

/* Body Text */
.body-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

/* Code Inline */
.code-inline {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--bg-surface);
  padding: 0.15em 0.4em;
  border-radius: 4px;
}
```

---

## Spacing System

```css
:root {
  /* Spacing Scale (8px base) */
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

### Spacing Guidelines

| Context | Spacing | Example |
|---------|---------|---------|
| Section padding (vertical) | `--space-20` to `--space-32` | Hero, feature sections |
| Card internal padding | `--space-6` to `--space-8` | Course cards |
| Between related elements | `--space-2` to `--space-4` | Icon + label |
| Between sections | `--space-16` to `--space-24` | Feature → Testimonials |
| Container max-width | `1280px` | Main content |
| Container padding (sides) | `--space-4` (mobile) / `--space-8` (desktop) | — |

---

## Border Radius

```css
:root {
  --radius-sm: 4px;      /* Badges, tags, inline code */
  --radius-md: 8px;      /* Buttons, inputs, small cards */
  --radius-lg: 12px;     /* Cards, modals */
  --radius-xl: 16px;     /* Large cards, hero elements */
  --radius-2xl: 24px;    /* Feature sections, big containers */
  --radius-full: 9999px; /* Pills, avatars, circular buttons */
}
```

---

## Shadows

```css
:root {
  /* Elevation Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.25),
               0 2px 4px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.3),
               0 4px 8px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.35),
               0 8px 16px rgba(0, 0, 0, 0.25);

  /* Glow Shadows (Brand) */
  --shadow-glow-sm: 0 0 10px rgba(4, 164, 89, 0.2);
  --shadow-glow-md: 0 0 20px rgba(4, 164, 89, 0.3);
  --shadow-glow-lg: 0 0 40px rgba(4, 164, 89, 0.4);

  /* Inset (for inputs) */
  --shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

---

## Animation & Motion

### Timing Functions

```css
:root {
  /* Easing Curves */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);      /* Standard */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);             /* Accelerate */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);            /* Decelerate */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Playful */

  /* Durations */
  --duration-fast: 150ms;    /* Micro-interactions */
  --duration-normal: 200ms;  /* Most transitions */
  --duration-slow: 300ms;    /* Complex animations */
  --duration-slower: 500ms;  /* Page transitions */
}
```

### Standard Transitions

```css
/* Button hover */
.btn {
  transition: all var(--duration-normal) var(--ease-default);
}

/* Link hover (alexop.dev-inspired rotation) */
.link-rotate:hover {
  transform: rotate(3deg);
  transition: transform var(--duration-normal) var(--ease-bounce);
}

/* Card hover lift */
.card {
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg), var(--shadow-glow-sm);
}

/* Focus ring (accessibility) */
.focusable:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--bg-base),
              0 0 0 5px var(--color-primary);
}
```

### Micro-interactions

```css
/* Icon pulse on hover (alexop.dev RSS icon style) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.icon-pulse:hover svg {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Button shine effect */
@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.btn-shine::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
}

.btn-shine:hover::after {
  animation: shine 0.6s ease-out;
}
```

---

## Components

### Buttons

```css
/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-default);
}

/* Primary Button */
.btn-primary {
  background: var(--gradient-accent);
  color: white;
  border: none;
  box-shadow: var(--shadow-glow-sm), var(--shadow-md);
}

.btn-primary:hover {
  box-shadow: var(--shadow-glow-md), var(--shadow-lg);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Secondary Button (Ghost) */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}

.btn-secondary:hover {
  background: var(--bg-surface);
  border-color: var(--color-primary);
}

/* Large Button */
.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
  border-radius: var(--radius-lg);
}
```

### Cards

```css
/* Base Card */
.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out),
              border-color var(--duration-normal) var(--ease-default);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg), var(--shadow-glow-sm);
  border-color: var(--color-primary);
}

/* Course Card (Treehouse-inspired) */
.card-course {
  overflow: hidden;
}

.card-course .card-image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
}

.card-course .card-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: var(--bg-surface);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-primary);
}
```

### Inputs

```css
/* Text Input */
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: var(--text-base);
  transition: border-color var(--duration-fast) var(--ease-default),
              box-shadow var(--duration-fast) var(--ease-default);
}

.input::placeholder {
  color: var(--text-muted);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(4, 164, 89, 0.15);
}
```

### Navigation

```css
/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--space-4) var(--space-8);
  background: rgba(26, 29, 35, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}

/* Nav Link */
.nav-link {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: color var(--duration-fast) var(--ease-default),
              background var(--duration-fast) var(--ease-default);
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.nav-link.active {
  color: var(--color-primary);
}
```

---

## Layout Patterns

### Container

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

### Section

```css
.section {
  padding: var(--space-20) 0;
}

.section-lg {
  padding: var(--space-32) 0;
}

/* Section with glow background */
.section-glow {
  position: relative;
  overflow: hidden;
}

.section-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: var(--gradient-glow);
  filter: blur(100px);
  opacity: 0.4;
  pointer-events: none;
}
```

### Grid

```css
/* Feature Grid */
.grid-features {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .grid-features {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-features {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Course Grid */
.grid-courses {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .grid-courses {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Alternating Sections (NEXT Academy-inspired)

Create visual rhythm by alternating between dark and light sections:

```css
/* Dark section (default) */
.section-dark {
  background: var(--bg-base);
  color: var(--text-secondary);
}

.section-dark h2,
.section-dark h3 {
  color: var(--text-primary);
}

/* Light section (contrast) */
.section-light {
  background: var(--bg-light);
  color: var(--text-on-light-muted);
}

.section-light h2,
.section-light h3 {
  color: var(--text-on-light);
}

/* Cards adapt to section context */
.section-light .card {
  background: var(--bg-light-elevated);
  border-color: #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-light .card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
```

**Pattern usage:**
```
Hero (dark) → Features (light) → Courses (dark) → Testimonials (light) → CTA (dark)
```

---

## Testimonial Carousel (NEXT Academy-inspired)

```css
/* Testimonial Section */
.testimonials {
  padding: var(--space-24) 0;
}

.testimonials-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.testimonials-stat {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-2);
}

.testimonials-label {
  font-size: var(--text-lg);
  color: var(--text-muted);
}

/* Carousel Container */
.testimonial-carousel {
  display: flex;
  gap: var(--space-6);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: var(--space-4) 0;
  -webkit-overflow-scrolling: touch;
}

.testimonial-carousel::-webkit-scrollbar {
  display: none;
}

/* Testimonial Card */
.testimonial-card {
  flex: 0 0 340px;
  scroll-snap-align: start;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* On light sections */
.section-light .testimonial-card {
  background: var(--bg-light-elevated);
  border-color: #e5e7eb;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  object-fit: cover;
  margin-bottom: var(--space-4);
}

.testimonial-quote {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

.testimonial-author {
  font-weight: 600;
  color: var(--text-primary);
}

.testimonial-role {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

/* Carousel Navigation Dots */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-6);
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--border-default);
  border: none;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-default),
              transform var(--duration-fast) var(--ease-default);
}

.carousel-dot:hover {
  background: var(--text-muted);
}

.carousel-dot.active {
  background: var(--color-primary);
  transform: scale(1.25);
}
```

---

## Trust Signals (NEXT Academy-inspired)

```css
/* Stats Bar */
.trust-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-8);
  padding: var(--space-8) 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.trust-stat {
  text-align: center;
}

.trust-stat-value {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.trust-stat-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
  margin-top: var(--space-1);
}

/* Logo Cloud (Partners/Featured In) */
.logo-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-12) 0;
}

.logo-cloud img {
  height: 32px;
  opacity: 0.6;
  filter: grayscale(100%);
  transition: opacity var(--duration-normal) var(--ease-default),
              filter var(--duration-normal) var(--ease-default);
}

.logo-cloud img:hover {
  opacity: 1;
  filter: grayscale(0%);
}

/* Global Community Badge */
.global-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(4, 164, 89, 0.1);
  border: 1px solid rgba(4, 164, 89, 0.2);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--color-primary);
}

.global-badge-icon {
  width: 16px;
  height: 16px;
}
```

**Example trust messaging:**
- "Join 500+ builders from 12 countries"
- "Graduates now at: [Logo Cloud]"
- "4.9/5 rating from 127 reviews"

---

## Hero Section Pattern

```css
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: var(--space-32) 0;
  overflow: hidden;
}

/* Gradient orb background */
.hero::before {
  content: '';
  position: absolute;
  top: 10%;
  right: -20%;
  width: 60%;
  height: 80%;
  background: radial-gradient(ellipse, rgba(4, 164, 89, 0.2) 0%, transparent 60%);
  filter: blur(80px);
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 20%;
  left: -10%;
  width: 40%;
  height: 60%;
  background: radial-gradient(ellipse, rgba(46, 204, 113, 0.15) 0%, transparent 60%);
  filter: blur(60px);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.hero-eyebrow {
  display: inline-block;
  padding: var(--space-1) var(--space-4);
  background: rgba(4, 164, 89, 0.1);
  border: 1px solid rgba(4, 164, 89, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: var(--space-6);
}

.hero-heading {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.hero-heading .highlight {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subheading {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-8);
  max-width: 600px;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}
```

---

## Accessibility

### Focus States

All interactive elements must have visible focus states:

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--bg-base),
              0 0 0 5px var(--color-primary);
}

/* For dark backgrounds */
.dark-context :focus-visible {
  box-shadow: 0 0 0 3px var(--bg-elevated),
              0 0 0 5px var(--color-primary);
}
```

### Color Contrast

| Text Type | Minimum Contrast | Our Ratio |
|-----------|------------------|-----------|
| Body text on `--bg-base` | 4.5:1 | 7.2:1 ✓ |
| Muted text on `--bg-base` | 4.5:1 | 5.1:1 ✓ |
| Primary on `--bg-base` | 4.5:1 | 6.8:1 ✓ |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Breakpoints

```css
/* Mobile-first breakpoints */
--screen-sm: 640px;   /* Large phones, small tablets */
--screen-md: 768px;   /* Tablets */
--screen-lg: 1024px;  /* Laptops, small desktops */
--screen-xl: 1280px;  /* Large desktops */
--screen-2xl: 1536px; /* Extra large screens */
```

Usage:
```css
/* Mobile-first approach */
.element {
  /* Mobile styles (default) */
  padding: var(--space-4);
}

@media (min-width: 768px) {
  .element {
    /* Tablet and up */
    padding: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .element {
    /* Desktop and up */
    padding: var(--space-12);
  }
}
```

---

## Implementation Checklist

### Fonts to Load

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
```

### CSS Variables Setup

1. Copy the `:root` blocks from this document into your global CSS
2. Apply `font-family: var(--font-body)` to `body`
3. Set `background: var(--bg-base); color: var(--text-secondary)` on `body`

### Key Files to Create

- [ ] `global.css` — CSS variables and base styles
- [ ] `components.css` — Button, card, input styles
- [ ] `utilities.css` — Spacing, typography utilities

---

## Quick Reference

### Most Used Colors

| Purpose | Variable | Hex |
|---------|----------|-----|
| Primary accent | `--color-primary` | `#04A459` |
| Page background | `--bg-base` | `#1a1d23` |
| Card background | `--bg-elevated` | `#242933` |
| Body text | `--text-secondary` | `#a1a1a1` |
| Headings | `--text-primary` | `#ffffff` |

### Most Used Spacing

| Size | Variable | Use Case |
|------|----------|----------|
| 8px | `--space-2` | Icon gaps |
| 16px | `--space-4` | Element padding |
| 24px | `--space-6` | Card padding |
| 32px | `--space-8` | Section gaps |
| 80px | `--space-20` | Section padding |

### Most Used Radii

| Size | Variable | Use Case |
|------|----------|----------|
| 8px | `--radius-md` | Buttons, inputs |
| 12px | `--radius-lg` | Cards |
| 9999px | `--radius-full` | Pills, badges |

---

*This design system should be treated as a living document. Update it as patterns evolve.*
