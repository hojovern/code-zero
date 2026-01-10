const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, LevelFormat, ExternalHyperlink,
        ShadingType, VerticalAlign, PageNumber } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "04A459", font: "Arial" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.LEFT } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "04A459", font: "Arial" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: "242933", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "242933", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "criteria-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "codezero-features",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "codezero-profile",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "sigma-curriculum",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "sigma-pros",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "sigma-cons",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "next-curriculum",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "next-pros",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "next-cons",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "42-how",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "42-pros",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "42-cons",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "moose-curriculum",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "moose-pros",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "moose-cons",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "code:zero", color: "04A459", bold: true }), new TextRun({ text: " | Best Coding Academies Malaysia", color: "666666" })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Page ", color: "666666" }), new TextRun({ children: [PageNumber.CURRENT], color: "666666" }), new TextRun({ text: " | codezero.academy", color: "666666" })]
      })] })
    },
    children: [
      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("5 Best Coding Academies in Malaysia (2025)")] }),
      new Paragraph({ children: [new TextRun({ text: "From Zero to Shipped Products", italics: true, size: 28, color: "666666" })] }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // Intro
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Looking to break into tech in Malaysia? With the government investing RM700 million in digital skills and aiming to create 500,000 tech jobs, there's never been a better time to learn to code.")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("But here's the problem: most coding academies teach you "), new TextRun({ text: "how to code", italics: true }), new TextRun(". They don't teach you "), new TextRun({ text: "how to ship", italics: true }), new TextRun(".")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("After researching dozens of programs, we've ranked the 5 best coding academies in Malaysia based on what actually matters: "), new TextRun({ text: "real outcomes, practical skills, and your ability to build and launch products", bold: true }), new TextRun(".")] }),

      // What We Looked For
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("What We Looked For")] }),
      new Paragraph({ numbering: { reference: "criteria-list", level: 0 }, children: [new TextRun({ text: "Outcome-focused curriculum", bold: true }), new TextRun(" — Do graduates actually ship products?")] }),
      new Paragraph({ numbering: { reference: "criteria-list", level: 0 }, children: [new TextRun({ text: "Modern tech stack", bold: true }), new TextRun(" — Are they teaching tools used in 2025, including AI?")] }),
      new Paragraph({ numbering: { reference: "criteria-list", level: 0 }, children: [new TextRun({ text: "Job placement & support", bold: true }), new TextRun(" — What happens after you graduate?")] }),
      new Paragraph({ numbering: { reference: "criteria-list", level: 0 }, children: [new TextRun({ text: "Value for money", bold: true }), new TextRun(" — Is the investment worth it?")] }),
      new Paragraph({ numbering: { reference: "criteria-list", level: 0 }, spacing: { after: 300 }, children: [new TextRun({ text: "Student reviews & reputation", bold: true }), new TextRun(" — What do real students say?")] }),

      // #1 code:zero
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. code:zero — Best for Builders Who Want to Ship Fast")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Rating: ", bold: true }), new TextRun({ text: "★★★★★", color: "04A459" }),
        new TextRun("  |  "),
        new TextRun({ text: "Duration: ", bold: true }), new TextRun("Self-paced modules + live cohorts"),
        new TextRun("  |  "),
        new TextRun({ text: "Focus: ", bold: true }), new TextRun("AI-first development, shipping real products")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Best For: ", bold: true }), new TextRun("Aspiring founders, indie hackers, designers who want to build")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Why code:zero Ranks #1")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("While other bootcamps teach you to "), new TextRun({ text: "code", italics: true }), new TextRun(", code:zero teaches you to "), new TextRun({ text: "ship", bold: true }), new TextRun(". This isn't your typical \"learn HTML in 12 weeks\" program. It's a modern academy built for the AI era.")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "What makes it different:", bold: true })] }),
      new Paragraph({ numbering: { reference: "codezero-features", level: 0 }, children: [new TextRun({ text: "AI-first curriculum", bold: true }), new TextRun(" — Learn to build with AI agents, LLMs, and modern tools like Claude, Cursor, and automation workflows. You're not just learning to code—you're learning to build 10x faster.")] }),
      new Paragraph({ numbering: { reference: "codezero-features", level: 0 }, children: [new TextRun({ text: "Ship from day one", bold: true }), new TextRun(" — Every lesson produces a tangible artifact. No theory dumps. No tutorial hell. You build real products that go live.")] }),
      new Paragraph({ numbering: { reference: "codezero-features", level: 0 }, children: [new TextRun({ text: "Modern stack", bold: true }), new TextRun(" — SvelteKit, Supabase, serverless architectures. The tools startups actually use in 2025.")] }),
      new Paragraph({ numbering: { reference: "codezero-features", level: 0 }, spacing: { after: 200 }, children: [new TextRun({ text: "Founder mindset", bold: true }), new TextRun(" — Beyond code, learn to think like a builder. Validate ideas, ship MVPs, iterate based on feedback.")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Ideal Student Profile:", bold: true })] }),
      new Paragraph({ numbering: { reference: "codezero-profile", level: 0 }, children: [new TextRun("You have ideas but can't build them")] }),
      new Paragraph({ numbering: { reference: "codezero-profile", level: 0 }, children: [new TextRun("You're tired of tutorials that lead nowhere")] }),
      new Paragraph({ numbering: { reference: "codezero-profile", level: 0 }, children: [new TextRun("You want to launch a startup or freelance business")] }),
      new Paragraph({ numbering: { reference: "codezero-profile", level: 0 }, spacing: { after: 200 }, children: [new TextRun("You value speed and practical outcomes over certificates")] }),

      new Paragraph({ shading: { fill: "E8F5E9", type: ShadingType.CLEAR }, spacing: { after: 300 }, children: [new TextRun({ text: "The code:zero Philosophy: ", bold: true, color: "04A459" }), new TextRun({ text: "Build your freedom. Turn ideas into shipped products as fast as possible.", italics: true })] }),

      // #2 Sigma School
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Sigma School — Best Job Guarantee Program")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Rating: ", bold: true }), new TextRun("4.89/5 (67+ reviews)"),
        new TextRun("  |  "),
        new TextRun({ text: "Duration: ", bold: true }), new TextRun("16 weeks"),
        new TextRun("  |  "),
        new TextRun({ text: "Cost: ", bold: true }), new TextRun("USD 2,400–5,000")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Best For: ", bold: true }), new TextRun("Career switchers seeking employment guarantees")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Overview")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Sigma School has built a strong reputation in Malaysia's bootcamp scene. Their headline feature? "), new TextRun({ text: "100% tuition refund if you don't get a job after graduating", bold: true }), new TextRun(".")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Curriculum highlights:", bold: true })] }),
      new Paragraph({ numbering: { reference: "sigma-curriculum", level: 0 }, children: [new TextRun("HTML, CSS, JavaScript, React, Node.js")] }),
      new Paragraph({ numbering: { reference: "sigma-curriculum", level: 0 }, children: [new TextRun("PostgreSQL, Firebase, AWS deployment")] }),
      new Paragraph({ numbering: { reference: "sigma-curriculum", level: 0 }, children: [new TextRun("100+ coding challenges, 25 real-world projects")] }),
      new Paragraph({ numbering: { reference: "sigma-curriculum", level: 0 }, spacing: { after: 200 }, children: [new TextRun("800+ hours of curriculum")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Pros:", bold: true, color: "04A459" })] }),
      new Paragraph({ numbering: { reference: "sigma-pros", level: 0 }, children: [new TextRun("Job guarantee reduces financial risk")] }),
      new Paragraph({ numbering: { reference: "sigma-pros", level: 0 }, children: [new TextRun("Working professional instructors")] }),
      new Paragraph({ numbering: { reference: "sigma-pros", level: 0 }, children: [new TextRun("Strong hiring partner network (Grab, OCBC Bank, Axrail)")] }),
      new Paragraph({ numbering: { reference: "sigma-pros", level: 0 }, spacing: { after: 150 }, children: [new TextRun("Physical campus in Puchong for in-person learning")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Cons:", bold: true, color: "CC0000" })] }),
      new Paragraph({ numbering: { reference: "sigma-cons", level: 0 }, children: [new TextRun("Traditional curriculum — less focus on AI tools")] }),
      new Paragraph({ numbering: { reference: "sigma-cons", level: 0 }, children: [new TextRun("Primarily employment-focused (less suited for founders)")] }),
      new Paragraph({ numbering: { reference: "sigma-cons", level: 0 }, spacing: { after: 300 }, children: [new TextRun("Fixed cohort schedule may not suit all learners")] }),

      // #3 NEXT Academy
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. NEXT Academy — Best for Networking & Industry Connections")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Rating: ", bold: true }), new TextRun("4.05/5 (596 reviews)"),
        new TextRun("  |  "),
        new TextRun({ text: "Duration: ", bold: true }), new TextRun("10–12 weeks"),
        new TextRun("  |  "),
        new TextRun({ text: "Location: ", bold: true }), new TextRun("Kuala Lumpur")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Best For: ", bold: true }), new TextRun("Those who value industry connections and alumni networks")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Overview")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Established in 2014, NEXT Academy is one of Malaysia's OG bootcamps. Their partnership with MaGIC (Malaysian Global Innovation & Creative Centre) and corporate connections give graduates a leg up in the job market.")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Key stats:", bold: true })] }),
      new Paragraph({ numbering: { reference: "next-curriculum", level: 0 }, children: [new TextRun("99% of graduates launch companies or land tech roles")] }),
      new Paragraph({ numbering: { reference: "next-curriculum", level: 0 }, children: [new TextRun("90% placement rate within 3–6 months")] }),
      new Paragraph({ numbering: { reference: "next-curriculum", level: 0 }, spacing: { after: 200 }, children: [new TextRun("Alumni at GrabTaxi, Mindvalley, Uber, AirAsia")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Pros:", bold: true, color: "04A459" })] }),
      new Paragraph({ numbering: { reference: "next-pros", level: 0 }, children: [new TextRun("Extensive alumni network")] }),
      new Paragraph({ numbering: { reference: "next-pros", level: 0 }, children: [new TextRun("Strong corporate partnerships (Google, AirAsia)")] }),
      new Paragraph({ numbering: { reference: "next-pros", level: 0 }, children: [new TextRun("Income Share Agreement (ISA) payment option")] }),
      new Paragraph({ numbering: { reference: "next-pros", level: 0 }, spacing: { after: 150 }, children: [new TextRun("Established track record since 2014")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Cons:", bold: true, color: "CC0000" })] }),
      new Paragraph({ numbering: { reference: "next-cons", level: 0 }, children: [new TextRun("Lower rating compared to newer competitors")] }),
      new Paragraph({ numbering: { reference: "next-cons", level: 0 }, children: [new TextRun("Curriculum could be more modern")] }),
      new Paragraph({ numbering: { reference: "next-cons", level: 0 }, spacing: { after: 300 }, children: [new TextRun("Higher price point for what's offered")] }),

      // #4 42 KL
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. 42 Kuala Lumpur — Best Free Option")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Rating: ", bold: true }), new TextRun("Highly respected globally"),
        new TextRun("  |  "),
        new TextRun({ text: "Duration: ", bold: true }), new TextRun("2–3 years"),
        new TextRun("  |  "),
        new TextRun({ text: "Cost: ", bold: true }), new TextRun({ text: "FREE", bold: true, color: "04A459" })
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Best For: ", bold: true }), new TextRun("Self-motivated learners who thrive without structure")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Overview")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("42KL is part of a global network spanning 54 cities. The catch? No teachers, no lectures, no tuition—just you and your peers solving increasingly complex problems.")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "How it works:", bold: true })] }),
      new Paragraph({ numbering: { reference: "42-how", level: 0 }, children: [new TextRun("26-day \"Piscine\" (intensive trial bootcamp)")] }),
      new Paragraph({ numbering: { reference: "42-how", level: 0 }, children: [new TextRun("Peer-to-peer learning model")] }),
      new Paragraph({ numbering: { reference: "42-how", level: 0 }, children: [new TextRun("Project-based progression")] }),
      new Paragraph({ numbering: { reference: "42-how", level: 0 }, spacing: { after: 200 }, children: [new TextRun("No prerequisites—60% start with zero coding knowledge")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Pros:", bold: true, color: "04A459" })] }),
      new Paragraph({ numbering: { reference: "42-pros", level: 0 }, children: [new TextRun("Completely free tuition")] }),
      new Paragraph({ numbering: { reference: "42-pros", level: 0 }, children: [new TextRun("Accessible: 40% of students from B40 backgrounds")] }),
      new Paragraph({ numbering: { reference: "42-pros", level: 0 }, children: [new TextRun("Builds strong problem-solving skills")] }),
      new Paragraph({ numbering: { reference: "42-pros", level: 0 }, spacing: { after: 150 }, children: [new TextRun("Global network and recognition")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Cons:", bold: true, color: "CC0000" })] }),
      new Paragraph({ numbering: { reference: "42-cons", level: 0 }, children: [new TextRun("Extremely self-directed (not for everyone)")] }),
      new Paragraph({ numbering: { reference: "42-cons", level: 0 }, children: [new TextRun("Takes 2–3 years for full program")] }),
      new Paragraph({ numbering: { reference: "42-cons", level: 0 }, children: [new TextRun("No job guarantee or placement services")] }),
      new Paragraph({ numbering: { reference: "42-cons", level: 0 }, spacing: { after: 300 }, children: [new TextRun("Less focused on modern web development")] }),

      // #5 Moose Academy
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. The Moose Academy — Best for Deep Technical Skills")] }),
      new Paragraph({ spacing: { after: 100 }, children: [
        new TextRun({ text: "Rating: ", bold: true }), new TextRun("Respected in local tech community"),
        new TextRun("  |  "),
        new TextRun({ text: "Duration: ", bold: true }), new TextRun("12 weeks – 2 years"),
        new TextRun("  |  "),
        new TextRun({ text: "Location: ", bold: true }), new TextRun("Selangor")
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Best For: ", bold: true }), new TextRun("Those wanting comprehensive technical depth")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Overview")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("The Moose Academy offers both a 12-week intensive bootcamp and a 2-year industry-based software engineering program. Their curriculum goes deeper into DevOps and cloud computing than most Malaysian bootcamps.")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Curriculum covers:", bold: true })] }),
      new Paragraph({ numbering: { reference: "moose-curriculum", level: 0 }, children: [new TextRun("Full-stack web development")] }),
      new Paragraph({ numbering: { reference: "moose-curriculum", level: 0 }, children: [new TextRun("Mobile app development")] }),
      new Paragraph({ numbering: { reference: "moose-curriculum", level: 0 }, children: [new TextRun("Data structures & algorithms")] }),
      new Paragraph({ numbering: { reference: "moose-curriculum", level: 0 }, children: [new TextRun("AWS, cloud computing, DevOps")] }),
      new Paragraph({ numbering: { reference: "moose-curriculum", level: 0 }, spacing: { after: 200 }, children: [new TextRun("System programming, Bash")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Pros:", bold: true, color: "04A459" })] }),
      new Paragraph({ numbering: { reference: "moose-pros", level: 0 }, children: [new TextRun("Comprehensive technical curriculum")] }),
      new Paragraph({ numbering: { reference: "moose-pros", level: 0 }, children: [new TextRun("Covers DevOps and cloud (rare for bootcamps)")] }),
      new Paragraph({ numbering: { reference: "moose-pros", level: 0 }, children: [new TextRun("2-year program option for deeper learning")] }),
      new Paragraph({ numbering: { reference: "moose-pros", level: 0 }, spacing: { after: 150 }, children: [new TextRun("Strong fundamentals focus")] }),

      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Cons:", bold: true, color: "CC0000" })] }),
      new Paragraph({ numbering: { reference: "moose-cons", level: 0 }, children: [new TextRun("Less known than larger competitors")] }),
      new Paragraph({ numbering: { reference: "moose-cons", level: 0 }, children: [new TextRun("Limited public reviews available")] }),
      new Paragraph({ numbering: { reference: "moose-cons", level: 0 }, spacing: { after: 300 }, children: [new TextRun("May be overkill for those wanting quick job placement")] }),

      // Comparison Table
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Comparison Table")] }),
      new Table({
        columnWidths: [1800, 1500, 1800, 1800, 2460],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, shading: { fill: "04A459", type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Academy", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: "04A459", type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Duration", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: "04A459", type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Cost", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: "04A459", type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Job Guarantee", bold: true, color: "FFFFFF" })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: "04A459", type: ShadingType.CLEAR }, width: { size: 2460, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Best For", bold: true, color: "FFFFFF" })] })] }),
            ]
          }),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "code:zero", bold: true, color: "04A459" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Self-paced")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Contact")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Focus on shipping")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2460, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Founders & builders")] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Sigma School", bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("16 weeks")] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("USD 2,400–5,000")] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Yes (100% refund)")] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 2460, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Career switchers")] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "NEXT Academy", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("10–12 weeks")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("ISA available")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("90% placement")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2460, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Networking")] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "42 KL", bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("2–3 years")] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Free", color: "04A459", bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("No")] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, width: { size: 2460, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Self-starters")] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Moose Academy", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("12 wks – 2 yrs")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Contact")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("No")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2460, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun("Technical depth")] })] }),
          ]}),
        ]
      }),
      new Paragraph({ spacing: { after: 300 }, children: [] }),

      // Bottom Line
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("The Bottom Line")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Malaysia's coding bootcamp scene is thriving, but most programs follow the same playbook: learn to code, get a job, repeat.")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "code:zero takes a different approach.", bold: true }), new TextRun(" Instead of optimizing for employment at someone else's company, we optimize for "), new TextRun({ text: "your ability to build and ship your own products", bold: true }), new TextRun(". In the age of AI, the ability to turn ideas into reality—fast—is the ultimate skill.")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Whether you choose code:zero or another academy, the most important thing is to "), new TextRun({ text: "start building", bold: true }), new TextRun(". The best time to learn was yesterday. The second best time is now.")] }),

      // CTA
      new Paragraph({ shading: { fill: "E8F5E9", type: ShadingType.CLEAR }, spacing: { before: 300, after: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ready to build your freedom?", bold: true, size: 28, color: "04A459" })] }),
      new Paragraph({ shading: { fill: "E8F5E9", type: ShadingType.CLEAR }, alignment: AlignmentType.CENTER, children: [
        new ExternalHyperlink({ children: [new TextRun({ text: "Join code:zero today", style: "Hyperlink", bold: true, size: 24 })], link: "https://codezero.academy" })
      ]}),
      new Paragraph({ spacing: { after: 300 }, children: [] }),

      // Footer
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Last updated: January 2025", italics: true, color: "666666", size: 20 })] }),
      new Paragraph({ children: [new TextRun({ text: "Sources: Nucamp, Sigma School, Course Report, Career Karma", italics: true, color: "666666", size: 20 })] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/jv/Coding/claude/code-day-one/marketing-team/content/blog-articles/best-coding-academies-malaysia/best-coding-academies-malaysia.docx", buffer);
  console.log("DOCX created successfully!");
});
