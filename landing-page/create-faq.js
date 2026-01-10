const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, LevelFormat, BorderStyle } = require('docx');
const fs = require('fs');

const faqs = [
  {
    q: "What is code:zero?",
    a: "code:zero is an AI-first coding and startup academy that teaches students to ship real products from day one. Unlike traditional bootcamps, we focus on building actual products using modern development workflows, AI-assisted coding, and agent-based systems."
  },
  {
    q: "Who is the target audience?",
    a: "Our primary audience includes aspiring founders who want to build their own MVP, indie hackers ready to ship products, designers transitioning into development, developers looking to 10x their output with AI tools, and anyone tired of tutorials who wants real outcomes."
  },
  {
    q: "What makes code:zero different from other coding bootcamps?",
    a: "Four key differentiators: (1) Ship > Think - students ship something in week one, not month one; (2) AI-Native - AI is woven into everything, not bolted on; (3) Practical over Academic - no theory you'll never use; (4) Small, composable systems - we avoid complex frameworks in favor of modular pieces students actually understand."
  },
  {
    q: "What will students actually build?",
    a: "Students build real, shippable products: landing pages that convert, full-stack web applications, AI-powered tools and automations, their own SaaS product, and agent workflows that do real work. Every lesson produces a tangible artifact, not exercises or toy apps."
  },
  {
    q: "How does the AI-first approach work?",
    a: "Students learn to use LLMs, code agents, and modern AI tools as true collaborators - not crutches or fancy autocomplete. They write code faster than they thought possible while actually understanding what they're building. AI is integrated into every step of the curriculum."
  },
  {
    q: "What is our brand tagline and how should I use it?",
    a: "Our tagline is 'Build your freedom.' Use it in all marketing materials and customer communications. The tone should be clear, direct, slightly edgy but professional - builder-to-builder communication with no fluff or hype."
  },
  {
    q: "What technology stack does code:zero teach?",
    a: "We focus on SvelteKit for frontend (preferred for speed and simplicity), Supabase and serverless APIs for backend, LLM-based agents and MCPs for AI integration, and markdown-first, Git-backed workflows for content."
  },
  {
    q: "How should sales position code:zero to prospects?",
    a: "Focus on outcomes, not features. Emphasize that students ship real products, not complete courses. Lead with the pain point: 'You've watched enough tutorials.' Position us as the antidote to tutorial hell and analysis paralysis. Use concrete examples of what they'll build."
  },
  {
    q: "What's the learning process like?",
    a: "Four steps: (1) Pick your project - students start with what they actually want to build; (2) Build with AI - learn to use LLMs and agents as collaborators; (3) Ship fast, iterate faster - get to working versions quickly and learn from real user feedback; (4) Stack skills as you go - learn frontend, backend, APIs, deployment when needed, not before."
  },
  {
    q: "What are the brand colors for marketing materials?",
    a: "Primary Green: #04A459 for CTAs and accents. Light Green: #2ECC71 for gradients and highlights. Background: #242933 (dark). Cards: #2e3440. Text: white (#ffffff) for primary, #a1a1a1 for secondary. We use a dark mode aesthetic with green accents."
  },
  {
    q: "What messaging should I avoid?",
    a: "Avoid: jargon, buzzwords, vague promises, academic language, and anything that sounds like a traditional bootcamp. Never promise 'learn to code' - instead promise 'ship real products.' Don't focus on curriculum length or number of lessons; focus on outcomes."
  },
  {
    q: "Where can I find more resources?",
    a: "Check the marketing-team workspace for brand guidelines (CLAUDE.md), landing page assets (landing-page/), and content templates. For questions about specific customer scenarios, reach out to the product team."
  }
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "04A459", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.LEFT } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "242933", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 100 }, outlineLevel: 0 } },
      { id: "subtitle", name: "Subtitle", basedOn: "Normal",
        run: { size: 24, color: "666666", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 400 } } },
      { id: "question", name: "Question", basedOn: "Normal",
        run: { size: 24, bold: true, color: "242933", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 100 } } },
      { id: "answer", name: "Answer", basedOn: "Normal",
        run: { size: 22, color: "4a4a4a", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, indent: { left: 0 } } }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      // Header
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("code:zero Launch FAQ")] }),

      new Paragraph({
        style: "subtitle",
        children: [new TextRun("Internal Reference for Sales & Customer Success Teams")]
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "Purpose: ", bold: true }),
          new TextRun("This document answers common questions about the code:zero launch. Use these responses when speaking with prospects, customers, or internal stakeholders.")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "Last Updated: ", bold: true }),
          new TextRun("January 2025")
        ],
        spacing: { after: 400 }
      }),

      // Divider
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "04A459" } },
        spacing: { after: 300 }
      }),

      // FAQs
      ...faqs.flatMap((faq, index) => [
        new Paragraph({
          style: "question",
          children: [new TextRun(`Q${index + 1}: ${faq.q}`)]
        }),
        new Paragraph({
          style: "answer",
          children: [new TextRun(faq.a)]
        })
      ]),

      // Footer
      new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: "04A459" } },
        spacing: { before: 400, after: 200 }
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "Questions? ", bold: true }),
          new TextRun("Reach out to the marketing team for additional resources or clarification on any of these points.")
        ]
      }),

      new Paragraph({
        children: [
          new TextRun({ text: "Remember: ", bold: true, color: "04A459" }),
          new TextRun("Focus on outcomes, not features. Show don't tell. Build your freedom.")
        ],
        spacing: { before: 200 }
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/jv/Coding/claude/code-day-one/marketing-team/landing-page/code-day-one-launch-faq.docx", buffer);
  console.log("FAQ document created: code-day-one-launch-faq.docx");
});
