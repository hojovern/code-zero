---
name: branded-deck
description: Create branded company presentations for code:zero with consistent styling. Use when user requests branded presentations, pitch decks, investor decks, client proposals, quarterly reports, or any company slides. Triggers on phrases like "branded presentation", "company deck", "pitch deck with our branding", "client proposal deck", "quarterly results presentation", or "slides with brand template".
---

# code:zero Branded Deck

Create presentations with code:zero brand styling. Reference the `pptx` skill for presentation creation logic.

## Brand Specifications

### Colors (PptxGenJS format - NO # prefix)

| Name | Hex | Usage |
|------|-----|-------|
| Primary Green | `04A459` | Accent bars, CTAs, highlights, key metrics |
| Light Green | `2ECC71` | Gradient endpoints, secondary highlights |
| Background Dark | `242933` | Slide backgrounds |
| Card Background | `2e3440` | Content boxes, cards |
| Text Primary | `FFFFFF` | Headings, primary text |
| Text Secondary | `a1a1a1` | Body text, descriptions |
| Border | `3b4252` | Card borders, dividers |

### Typography

- **Font**: Arial (web-safe)
- **Title**: 54pt bold, white
- **Slide Headers**: 32pt bold, white
- **Subheaders**: 16-18pt bold, white or primary green
- **Body Text**: 12-14pt, text secondary (`a1a1a1`)
- **Metrics/Numbers**: 32-48pt bold, primary green

### Layout Patterns

**Slide Header Structure:**
```javascript
// Top accent bar
slide.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: '100%', h: 0.15,
  fill: { color: '04A459' }
});

// Title
slide.addText('Slide Title', {
  x: 0.5, y: 0.4, w: 9, h: 0.6,
  fontSize: 32, bold: true, color: 'FFFFFF', fontFace: 'Arial'
});

// Underline accent
slide.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 1.0, w: 1.5, h: 0.05,
  fill: { color: '04A459' }
});
```

**Content Card:**
```javascript
slide.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 1.4, w: 4.5, h: 3.8,
  fill: { color: '2e3440' },
  line: { color: '3b4252', pt: 1 }
});
```

**Highlighted Card (for CTAs/key info):**
```javascript
slide.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 4.1, w: 9, h: 1.1,
  fill: { color: '2e3440' },
  line: { color: '04A459', pt: 2 }  // Green border
});
```

**CTA Button:**
```javascript
slide.addShape(pptx.shapes.RECTANGLE, {
  x: 2.5, y: 4.4, w: 5, h: 0.8,
  fill: { color: '04A459' }
});
slide.addText('Call to Action', {
  x: 2.5, y: 4.5, w: 5, h: 0.6,
  fontSize: 20, bold: true, color: 'FFFFFF',
  fontFace: 'Arial', align: 'center'
});
```

### Spacing Rules

- **Margins**: 0.5" from slide edges
- **Card padding**: 0.2" internal
- **Between elements**: 0.2-0.3" vertical gap
- **Column gap**: 0.2" for multi-column layouts

### Standard Slide Types

1. **Title Slide**: Top/bottom green bars, centered brand name, tagline in green italic
2. **Content Slide**: Header with underline, two-column layout (stats left, bullets right)
3. **Comparison Slide**: Table with green header row
4. **Grid Slide**: 2x2 or 3-column card layout
5. **Metrics Slide**: 4 metric cards at top, content box below
6. **Summary Slide**: Key takeaways box, CTA button, contact info

### Visual Hierarchy

1. Green accent bar (top of every slide)
2. White bold header with green underline
3. Dark cards (`2e3440`) for content grouping
4. Green highlights for key numbers/CTAs
5. Gray text (`a1a1a1`) for body content

## Usage

1. Invoke the `pptx` skill for presentation creation workflow
2. Apply brand colors and layouts from this skill
3. Use `assets/template.pptx` as visual reference
4. Maintain consistent header structure across all slides

## Template Reference

See `assets/template.pptx` for a complete 8-slide example with:
- Title slide
- Market Overview (two-column with metrics)
- Market Comparison (table layout)
- Competitive Landscape (grid layout)
- Growth Strategy (three-column phases)
- Traction (metrics + milestones)
- Financials (projections + unit economics)
- Summary (takeaways + CTA)
