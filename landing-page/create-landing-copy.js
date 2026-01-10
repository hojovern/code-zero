const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, LevelFormat, BorderStyle } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 72, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: "1a1a1a", font: "Arial" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "333333", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "tagline", name: "Tagline", basedOn: "Normal",
        run: { size: 32, italics: true, color: "444444", font: "Arial" },
        paragraph: { spacing: { before: 100, after: 300 }, alignment: AlignmentType.CENTER } },
      { id: "bodyLarge", name: "Body Large", basedOn: "Normal",
        run: { size: 26, color: "333333", font: "Arial" },
        paragraph: { spacing: { before: 100, after: 150 } } },
      { id: "cta", name: "CTA", basedOn: "Normal",
        run: { size: 28, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, alignment: AlignmentType.CENTER } },
      { id: "sectionNote", name: "Section Note", basedOn: "Normal",
        run: { size: 20, italics: true, color: "666666", font: "Arial" },
        paragraph: { spacing: { before: 50, after: 200 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      // ========== HERO SECTION ==========
      new Paragraph({ style: "sectionNote", children: [new TextRun("[HERO SECTION]")] }),

      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("code:zero")] }),

      new Paragraph({ style: "tagline", children: [new TextRun("Build your freedom.")] }),

      new Paragraph({
        style: "bodyLarge",
        alignment: AlignmentType.CENTER,
        children: [new TextRun("The AI-first coding academy where you ship real products from day one. No fluff. No endless tutorials. Just building.")]
      }),

      new Paragraph({ style: "cta", spacing: { before: 400 }, children: [new TextRun("[Start Building Today]")] }),

      // ========== PROBLEM SECTION ==========
      new Paragraph({ style: "sectionNote", children: [new TextRun("[PROBLEM SECTION]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("You've watched enough tutorials.")] }),

      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("You've bookmarked courses you'll never finish. Saved GitHub repos you'll never clone. Read documentation that leads to more documentation.")]
      }),

      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("Meanwhile, your ideas sit in a notes app. Waiting.")]
      }),

      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("The gap between knowing and shipping has never felt wider. Traditional bootcamps move too slow. Self-learning spirals into analysis paralysis. And somewhere along the way, learning to code became a goal instead of a tool.")]
      }),

      new Paragraph({
        style: "bodyLarge",
        children: [
          new TextRun({ text: "Here's the truth: ", bold: true }),
          new TextRun("You don't need to learn more. You need to build more.")
        ]
      }),

      // ========== SOLUTION SECTION ==========
      new Paragraph({ style: "sectionNote", children: [new TextRun("[SOLUTION SECTION]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("What is code:zero?")] }),

      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("code:zero is an AI-first coding and startup academy. We teach you to ship real products using modern development workflows, AI-assisted building, and agent-based systems.")]
      }),

      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("No curriculum that was outdated before it was published. No instructors reading slides. No group projects with strangers who ghost you.")]
      }),

      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("Just you, AI tools that actually work, and a clear path from idea to launched product.")]
      }),

      // ========== OUTCOMES SECTION ==========
      new Paragraph({ style: "sectionNote", children: [new TextRun("[OUTCOMES SECTION]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("What you'll actually build")] }),

      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("Every lesson produces something real. Not exercises. Not toy apps. Products you can show, sell, or scale.")]
      }),

      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Landing pages that convert")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Full-stack web applications")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("AI-powered tools and automations")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Your own SaaS product")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Agent workflows that do real work")] }),

      new Paragraph({
        style: "bodyLarge",
        spacing: { before: 200 },
        children: [new TextRun("By the end, you won't just know how to code. You'll have a portfolio of shipped products proving it.")]
      }),

      // ========== HOW IT WORKS SECTION ==========
      new Paragraph({ style: "sectionNote", children: [new TextRun("[HOW IT WORKS SECTION]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("How it works")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1. Pick your project")] }),
      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("Start with what you actually want to build. A side project. A business idea. A tool you wish existed. Your motivation stays high because the outcome matters to you.")]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2. Build with AI")] }),
      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("Learn to use LLMs, code agents, and modern tools as collaborators. Not crutches. You'll write code faster than you thought possible while actually understanding what you're building.")]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3. Ship fast, iterate faster")] }),
      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("Get to a working version quickly. Put it in front of real users. Learn from feedback, not theory. Repeat.")]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4. Stack skills as you go")] }),
      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("Frontend. Backend. Databases. APIs. Deployment. You learn each piece when you need it, not before. Context makes concepts stick.")]
      }),

      // ========== WHO THIS IS FOR SECTION ==========
      new Paragraph({ style: "sectionNote", children: [new TextRun("[WHO THIS IS FOR SECTION]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Who this is for")] }),

      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Aspiring founders ", bold: true }),
        new TextRun("who want to build their MVP without hiring a dev team")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Indie hackers ", bold: true }),
        new TextRun("ready to ship products instead of planning them")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Designers ", bold: true }),
        new TextRun("transitioning into development who want to own the full stack")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Developers ", bold: true }),
        new TextRun("looking to 10x their output with AI agents and modern workflows")
      ]}),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [
        new TextRun({ text: "Anyone ", bold: true }),
        new TextRun("tired of tutorials who's ready for real outcomes")
      ]}),

      // ========== DIFFERENTIATION SECTION ==========
      new Paragraph({ style: "sectionNote", children: [new TextRun("[DIFFERENTIATION SECTION]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("What makes us different")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Ship > Think")] }),
      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("We bias toward action. You'll ship something in your first week, not your first month. Iteration beats perfection.")]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("AI-native, not AI-adjacent")] }),
      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("AI isn't a module we bolted on. It's woven into everything. You'll learn to build with AI as a true collaborator, not a fancy autocomplete.")]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Practical over academic")] }),
      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("No computer science theory you'll never use. No academic exercises. Every concept connects to something you're building.")]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Small, composable systems")] }),
      new Paragraph({
        style: "bodyLarge",
        children: [new TextRun("We avoid complex frameworks and monolithic architectures. You'll learn to build with simple, modular pieces that you actually understand.")]
      }),

      // ========== FINAL CTA SECTION ==========
      new Paragraph({ style: "sectionNote", children: [new TextRun("[FINAL CTA SECTION]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER, children: [new TextRun("Stop learning. Start building.")] }),

      new Paragraph({
        style: "bodyLarge",
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Your ideas deserve to exist in the world. Not in a notes app.")]
      }),

      new Paragraph({ style: "cta", spacing: { before: 300 }, children: [new TextRun("[Join code:zero]")] }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [new TextRun({ text: "Limited spots. No waitlist. Just start.", size: 22, color: "666666" })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/jv/Coding/claude/code-day-one/marketing-team/landing-page/landing-page-copy.docx", buffer);
  console.log("Landing page copy created: landing-page-copy.docx");
});
