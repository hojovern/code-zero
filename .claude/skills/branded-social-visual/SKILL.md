---
name: branded-social-visual
description: Create on-brand social media graphics for code:zero AI coding academy. Use when creating Instagram posts, stories, promotional banners, or any social media visual. Style uses dark tech aesthetic with neon accents, geometric chevrons, and bold typography. Outputs PNG files to /social-media folder.
---

# code:zero Branded Social Media Visuals

Create high-impact social media graphics using Python/Pillow. The brand aesthetic is already defined - skip to canvas creation.

## BRAND SPECIFICATIONS (Your Design Philosophy)

### Color Palette
```
Primary Dark:     (10, 10, 26)    #0a0a1a - deep space blue-black
Secondary Dark:   (26, 26, 46)    #1a1a2e - midnight blue
Accent Cyan:      (0, 212, 255)   #00d4ff - electric cyan
Accent Magenta:   (255, 0, 255)   #ff00ff - neon magenta
Accent Purple:    (139, 92, 246)  #8b5cf6 - vivid purple
Accent Pink:      (236, 72, 153)  #ec4899 - hot pink
White:            (255, 255, 255) #ffffff - headlines
Muted:            (100, 116, 139) #64748b - secondary text
```

### Typography
- **Headlines**: Outfit Bold from `assets/fonts/Outfit-Bold.ttf`
- **Body/Subheadlines**: Outfit Regular from `assets/fonts/Outfit-Regular.ttf`
- Headlines should be UPPERCASE, bold, white
- Subheadlines in accent colors

### Visual Style Elements
- **Backgrounds**: Dark gradients (blue-black to purple-black, vertical)
- **Decorative**: Double chevrons (>>) pointing right - represents forward motion, shipping
- **Glow Effects**: Soft neon glows behind accent elements (gaussian blur, low opacity circles)
- **Corner Accents**: Thin cyan lines forming L-shapes in corners
- **Composition**: Centered text, asymmetric decorative elements

### Canvas Dimensions
- Instagram Post (Square): 1080 x 1080
- Instagram Portrait: 1080 x 1350
- Instagram Story: 1080 x 1920
- Twitter/X: 1200 x 675
- LinkedIn: 1200 x 627

---

## CANVAS CREATION

When creating a graphic, write Python code using Pillow that expresses the brand specifications above. Do NOT use pre-built scripts - write fresh code for each request to tailor the composition to the specific content.

### Required Elements

Every graphic MUST include:
1. **Dark gradient background** - vertical gradient from dark_bg to slightly lighter
2. **At least one set of double chevrons** - signature brand element
3. **Proper text hierarchy** - large headline, smaller subheadline in accent color
4. **Tagline** - "Build your freedom" in muted color at bottom
5. **Corner accent lines** - thin cyan lines

### Code Structure Pattern

```python
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

# Brand constants
COLORS = {
    "dark_bg": (10, 10, 26),
    "accent_cyan": (0, 212, 255),
    "accent_magenta": (255, 0, 255),
    "accent_purple": (139, 92, 246),
    "white": (255, 255, 255),
    "muted": (100, 116, 139),
}

# Load fonts from skill assets
FONTS_DIR = Path("/Users/jv/Coding/claude/marketing-team/.claude/skills/branded-social-visual/assets/fonts")
font_headline = ImageFont.truetype(str(FONTS_DIR / "Outfit-Bold.ttf"), SIZE)
font_body = ImageFont.truetype(str(FONTS_DIR / "Outfit-Regular.ttf"), SIZE)

# Create canvas, draw elements, save to /social-media/
```

### Craftsmanship Requirements

**CRITICAL**: Create work that looks meticulously crafted by an expert designer:
- Perfect alignment and spacing
- Nothing overlaps unintentionally
- All elements have breathing room
- Text readable at thumbnail size
- Glow effects subtle, not overwhelming
- Chevrons crisp and properly spaced

### Refinement Pass

After generating initial code, review and refine:
- Are the proportions balanced?
- Is there enough contrast for readability?
- Do the glow effects enhance or distract?
- Is the composition dynamic but not cluttered?

---

## OUTPUT

- Format: PNG (RGB mode)
- Location: Save to `/social-media/` directory
- Naming: `{platform}-{topic}-{date}.png` (lowercase, hyphenated)

After generating the graphic, display it so it can be reviewed.
