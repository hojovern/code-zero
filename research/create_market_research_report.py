#!/usr/bin/env python3
"""
code:zero Marketing Research Report Generator
Creates a professional PDF report with market analysis data
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, ListFlowable, ListItem
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib import colors

# Brand colors
PRIMARY_GREEN = HexColor('#04A459')
LIGHT_GREEN = HexColor('#2ECC71')
BG_DARK = HexColor('#242933')
TEXT_PRIMARY = HexColor('#1a1a1a')
TEXT_SECONDARY = HexColor('#4a4a4a')
BORDER_COLOR = HexColor('#e0e0e0')

def create_styles():
    """Create custom paragraph styles for the report"""
    styles = getSampleStyleSheet()

    # Title style
    styles.add(ParagraphStyle(
        name='ReportTitle',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=PRIMARY_GREEN,
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    ))

    # Subtitle style
    styles.add(ParagraphStyle(
        name='ReportSubtitle',
        parent=styles['Normal'],
        fontSize=14,
        textColor=TEXT_SECONDARY,
        spaceAfter=40,
        alignment=TA_CENTER,
        fontName='Helvetica'
    ))

    # Section heading style
    styles.add(ParagraphStyle(
        name='SectionHeading',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=PRIMARY_GREEN,
        spaceBefore=20,
        spaceAfter=12,
        fontName='Helvetica-Bold'
    ))

    # Subsection heading style
    styles.add(ParagraphStyle(
        name='SubsectionHeading',
        parent=styles['Heading3'],
        fontSize=14,
        textColor=TEXT_PRIMARY,
        spaceBefore=16,
        spaceAfter=8,
        fontName='Helvetica-Bold'
    ))

    # Body text style - override existing
    styles['BodyText'].fontSize = 11
    styles['BodyText'].textColor = TEXT_PRIMARY
    styles['BodyText'].spaceAfter = 10
    styles['BodyText'].alignment = TA_JUSTIFY
    styles['BodyText'].leading = 16
    styles['BodyText'].fontName = 'Helvetica'

    # Highlight text style
    styles.add(ParagraphStyle(
        name='Highlight',
        parent=styles['Normal'],
        fontSize=12,
        textColor=PRIMARY_GREEN,
        spaceBefore=8,
        spaceAfter=8,
        fontName='Helvetica-Bold'
    ))

    # Bullet point style
    styles.add(ParagraphStyle(
        name='BulletText',
        parent=styles['Normal'],
        fontSize=11,
        textColor=TEXT_PRIMARY,
        leftIndent=20,
        spaceAfter=6,
        leading=14,
        fontName='Helvetica'
    ))

    # Quote/callout style
    styles.add(ParagraphStyle(
        name='Callout',
        parent=styles['Normal'],
        fontSize=12,
        textColor=TEXT_SECONDARY,
        leftIndent=30,
        rightIndent=30,
        spaceBefore=12,
        spaceAfter=12,
        leading=18,
        fontName='Helvetica-Oblique',
        borderColor=PRIMARY_GREEN,
        borderWidth=2,
        borderPadding=10
    ))

    # Footer style
    styles.add(ParagraphStyle(
        name='Footer',
        parent=styles['Normal'],
        fontSize=9,
        textColor=TEXT_SECONDARY,
        alignment=TA_CENTER,
        fontName='Helvetica'
    ))

    return styles

def create_table_style():
    """Create table styling"""
    return TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY_GREEN),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('TEXTCOLOR', (0, 1), (-1, -1), TEXT_PRIMARY),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, HexColor('#f8f9fa')]),
    ])

def build_report():
    """Build the complete PDF report"""

    doc = SimpleDocTemplate(
        "/Users/jv/Coding/claude/code-day-one/marketing-team/research/CodeDayOne_Marketing_Research_Report_2025.pdf",
        pagesize=letter,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72
    )

    styles = create_styles()
    story = []

    # ===== COVER PAGE =====
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("code:zero", styles['ReportTitle']))
    story.append(Paragraph("Market Research Report", styles['ReportTitle']))
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph("AI-First Coding Academy Market Analysis", styles['ReportSubtitle']))
    story.append(Paragraph("January 2025", styles['ReportSubtitle']))
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("Build your freedom", styles['Highlight']))
    story.append(PageBreak())

    # ===== EXECUTIVE SUMMARY =====
    story.append(Paragraph("Executive Summary", styles['SectionHeading']))
    story.append(Paragraph(
        "The AI-first coding education market represents a transformative opportunity in 2025. "
        "With the global AI in education market projected to grow from $6.9 billion to $41 billion by 2030 "
        "(42.83% CAGR), and the coding bootcamp market expanding from $2.65 billion to $14 billion by 2032, "
        "code:zero is positioned at the intersection of two explosive growth sectors.",
        styles['BodyText']
    ))
    story.append(Paragraph(
        "This report analyzes key market trends, competitive landscape, target audience demographics, "
        "and strategic opportunities for code:zero to capture market share in the emerging AI-native "
        "development education space.",
        styles['BodyText']
    ))

    # Key findings callout
    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph("Key Findings:", styles['SubsectionHeading']))

    key_findings = [
        "41% of all code is now AI-generated or AI-assisted globally",
        "76% of developers use or plan to adopt AI coding tools",
        "25% of Y Combinator W25 startups have 95%+ AI-generated codebases",
        "Coding bootcamp market growing at 23.19% CAGR",
        "Citizen developers will outnumber professional developers 4:1 by 2025",
        "'Vibe coding' named Collins Dictionary Word of the Year 2025"
    ]

    for finding in key_findings:
        story.append(Paragraph(f"• {finding}", styles['BulletText']))

    story.append(PageBreak())

    # ===== MARKET OVERVIEW =====
    story.append(Paragraph("1. Market Overview", styles['SectionHeading']))

    story.append(Paragraph("1.1 AI in Education Market", styles['SubsectionHeading']))
    story.append(Paragraph(
        "The AI in education market is experiencing unprecedented growth, driven by demand for personalized "
        "learning experiences, automation of educational processes, and the integration of intelligent tutoring systems.",
        styles['BodyText']
    ))

    # Market size table
    market_data = [
        ['Metric', 'Value', 'Source'],
        ['2025 Market Size', '$6.9 - $9.7 Billion', 'Multiple research firms'],
        ['2030 Projection', '$41 - $92.5 Billion', 'Mordor Intelligence / ResearchAndMarkets'],
        ['2034 Projection', '$112.3 Billion', 'Precedence Research'],
        ['CAGR (2025-2030)', '32.6% - 42.83%', 'Industry consensus'],
        ['Deep Learning CAGR', '48.30%', 'Market analysis'],
    ]

    market_table = Table(market_data, colWidths=[2*inch, 2*inch, 2.5*inch])
    market_table.setStyle(create_table_style())
    story.append(market_table)
    story.append(Spacer(1, 0.3*inch))

    story.append(Paragraph("1.2 Coding Bootcamp Market", styles['SubsectionHeading']))
    story.append(Paragraph(
        "The coding bootcamp industry continues its rapid expansion, with increasing focus on AI-native curricula "
        "and practical, outcome-driven education models.",
        styles['BodyText']
    ))

    bootcamp_data = [
        ['Metric', 'Value'],
        ['2024 Market Size', '$2.65 Billion'],
        ['2025 Projected Size', '$3.28 Billion'],
        ['2029 Growth', '+$3.98 Billion'],
        ['2032 Projection', '$14.07 Billion'],
        ['CAGR', '23.19%'],
        ['Online Bootcamp Share', '62.9%'],
    ]

    bootcamp_table = Table(bootcamp_data, colWidths=[3*inch, 3*inch])
    bootcamp_table.setStyle(create_table_style())
    story.append(bootcamp_table)
    story.append(Spacer(1, 0.3*inch))

    story.append(Paragraph("1.3 AI Code Tools Market", styles['SubsectionHeading']))
    story.append(Paragraph(
        "The AI code generation and assistance market is growing exponentially, fundamentally changing "
        "how software is developed and creating new educational requirements.",
        styles['BodyText']
    ))

    ai_tools_data = [
        ['Metric', 'Value'],
        ['2024 Market Size', '$6.43 - $6.7 Billion'],
        ['2030 Projection', '$25.7 - $30.1 Billion'],
        ['2035 Projection', '$122.1 Billion'],
        ['CAGR (2024-2035)', '30.69%'],
        ['AI Code Assistance Market (Gartner 2025)', '$3.0 - $3.5 Billion'],
    ]

    ai_tools_table = Table(ai_tools_data, colWidths=[3.5*inch, 2.5*inch])
    ai_tools_table.setStyle(create_table_style())
    story.append(ai_tools_table)

    story.append(PageBreak())

    # ===== INDUSTRY TRENDS =====
    story.append(Paragraph("2. Industry Trends", styles['SectionHeading']))

    story.append(Paragraph("2.1 The Rise of Vibe Coding", styles['SubsectionHeading']))
    story.append(Paragraph(
        "Coined by Andrej Karpathy in February 2025, 'vibe coding' describes an AI-assisted development approach "
        "where developers guide AI to generate code through natural language prompts rather than writing code "
        "line-by-line. The term was named Collins Dictionary Word of the Year for 2025.",
        styles['BodyText']
    ))

    story.append(Paragraph(
        "Key vibe coding statistics:",
        styles['SubsectionHeading']
    ))

    vibe_findings = [
        "25% of Y Combinator Winter 2025 startups have codebases that are 95%+ AI-generated",
        "By July 2025, vibe coding entered commercial use cases across professional software engineering",
        "Microsoft describes it as 'outcome-driven development' - focusing on 'what' instead of 'how'",
        "The approach is evolving toward 'context engineering' for production environments"
    ]

    for finding in vibe_findings:
        story.append(Paragraph(f"• {finding}", styles['BulletText']))

    story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph("2.2 AI Coding Assistant Adoption", styles['SubsectionHeading']))
    story.append(Paragraph(
        "AI coding assistants have achieved mainstream adoption in 2025, fundamentally changing developer workflows "
        "and creating new skill requirements in the job market.",
        styles['BodyText']
    ))

    adoption_data = [
        ['Metric', '2025 Value'],
        ['Teams using AI in workflows', '90% (up from 61% in 2024)'],
        ['Code assistant adoption', '69% (peaked at 72.8%)'],
        ['AI-generated/assisted code globally', '41%'],
        ['Developers using or planning AI tools', '76%'],
        ['GitHub Copilot users', '20 million'],
        ['Fortune 100 Copilot adoption', '90%'],
        ['Google Gemini developer usage', '47%'],
        ['Anthropic Claude developer usage', '41%'],
    ]

    adoption_table = Table(adoption_data, colWidths=[3.5*inch, 2.5*inch])
    adoption_table.setStyle(create_table_style())
    story.append(adoption_table)
    story.append(Spacer(1, 0.3*inch))

    story.append(Paragraph("2.3 No-Code/Low-Code Revolution", styles['SubsectionHeading']))
    story.append(Paragraph(
        "The low-code/no-code ecosystem has matured into a $45.5 billion market, enabling non-technical founders "
        "to build real products. This trend creates both opportunity and competition for coding education.",
        styles['BodyText']
    ))

    nocode_findings = [
        "70% of new enterprise applications will use low-code/no-code by 2025",
        "Citizen developers will outnumber professional developers 4:1",
        "AI-driven development accelerates prototyping by 40-50%",
        "Companies save 40% in development costs using low-code tools",
        "84% of businesses leverage these solutions to fill the developer talent gap"
    ]

    for finding in nocode_findings:
        story.append(Paragraph(f"• {finding}", styles['BulletText']))

    story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph("2.4 Agentic Development & MCP", styles['SubsectionHeading']))
    story.append(Paragraph(
        "The Model Context Protocol (MCP), introduced by Anthropic in 2024, became the fastest-adopted standard "
        "RedMonk has ever tracked. By year-end 2025, it was donated to the Linux Foundation's Agentic AI Foundation, "
        "with adoption by OpenAI, Google DeepMind, Microsoft, and AWS.",
        styles['BodyText']
    ))

    story.append(Paragraph(
        "Developer expectations have shifted dramatically: In 2023, developers wanted better autocomplete. "
        "In 2024, they wanted multi-file editing. In 2025, they delegate entire workflows to agents.",
        styles['BodyText']
    ))

    story.append(PageBreak())

    # ===== COMPETITIVE LANDSCAPE =====
    story.append(Paragraph("3. Competitive Landscape", styles['SectionHeading']))

    story.append(Paragraph("3.1 Traditional Coding Education", styles['SubsectionHeading']))

    competitors_data = [
        ['Platform', 'Category', 'Positioning'],
        ['Codecademy', 'Interactive Learning', 'Structured courses, established brand'],
        ['freeCodeCamp', 'Free/Community', 'Open source, certification-focused'],
        ['Coursera', 'Academic', 'University partnerships, degrees'],
        ['Udemy', 'Marketplace', 'Wide course selection, price competition'],
        ['Pluralsight', 'Enterprise', 'Skills assessment, corporate training'],
        ['General Assembly', 'Bootcamp', 'In-person + online, career services'],
        ['Replit', 'IDE/Learning', 'Browser-based coding, AI integration'],
    ]

    competitors_table = Table(competitors_data, colWidths=[1.5*inch, 1.5*inch, 3.5*inch])
    competitors_table.setStyle(create_table_style())
    story.append(competitors_table)
    story.append(Spacer(1, 0.3*inch))

    story.append(Paragraph("3.2 AI-Native Education Platforms", styles['SubsectionHeading']))
    story.append(Paragraph(
        "A new wave of AI-focused coding education has emerged in 2025, directly teaching vibe coding, "
        "prompt engineering, and AI-first development workflows.",
        styles['BodyText']
    ))

    ai_platforms = [
        "Cursor AI - Reimagined IDE for AI-first development",
        "Nucamp - Top 10 AI coding bootcamps ranking",
        "Springboard - Hybrid bootcamp model with AI integration (March 2025)",
        "Various bootcamps teaching prompt engineering and AI code review"
    ]

    for platform in ai_platforms:
        story.append(Paragraph(f"• {platform}", styles['BulletText']))

    story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph("3.3 Market Positioning Gap", styles['SubsectionHeading']))
    story.append(Paragraph(
        "There is a significant market gap for education that combines:",
        styles['BodyText']
    ))

    gap_items = [
        "AI-first development methodology (vibe coding, agentic workflows)",
        "Founder/builder mindset (ship > think, practical outcomes)",
        "Modern tooling (Claude Code, MCP servers, AI agents)",
        "Speed-to-market focus (real products, not just exercises)",
        "Community of builders (indie hacker ethos)"
    ]

    for item in gap_items:
        story.append(Paragraph(f"• {item}", styles['BulletText']))

    story.append(PageBreak())

    # ===== TARGET AUDIENCE =====
    story.append(Paragraph("4. Target Audience Analysis", styles['SectionHeading']))

    story.append(Paragraph("4.1 Primary Segments", styles['SubsectionHeading']))

    audience_data = [
        ['Segment', 'Characteristics', 'Opportunity'],
        ['Aspiring Founders', 'Non-technical with product ideas', 'Bridge idea-to-execution gap'],
        ['Indie Hackers', 'Solo builders, bootstrap mindset', 'Speed up shipping, add AI skills'],
        ['Career Changers', 'Transitioning to tech', 'Modern AI-first entry point'],
        ['Designers', 'Visual thinkers, UX background', 'Enable full-stack capability'],
        ['Developers', 'Traditional coders', 'AI augmentation, agent workflows'],
    ]

    audience_table = Table(audience_data, colWidths=[1.3*inch, 2.2*inch, 2.5*inch])
    audience_table.setStyle(create_table_style())
    story.append(audience_table)
    story.append(Spacer(1, 0.3*inch))

    story.append(Paragraph("4.2 Indie Hacker Community Insights", styles['SubsectionHeading']))
    story.append(Paragraph(
        "The indie hacker movement represents a key target demographic for code:zero, with strong alignment "
        "to the academy's 'ship > think' philosophy.",
        styles['BodyText']
    ))

    indie_stats = [
        "Indie Hackers X (Twitter) following: ~142,000",
        "r/indiehackers subreddit: ~115,000-117,000 members",
        "Movement has evolved: AI and no-code enable launching businesses in weeks vs months",
        "Solo founders now account for rapidly growing share of new startups",
        "Success stories: Non-coders building $28k/month SaaS portfolios after learning to code"
    ]

    for stat in indie_stats:
        story.append(Paragraph(f"• {stat}", styles['BulletText']))

    story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph("4.3 Market Demand Signals", styles['SubsectionHeading']))

    demand_signals = [
        "AI bootcamp graduates landing jobs with salaries up to $154,460",
        "AI usage among university students rose from 66% (2024) to 92% (2025)",
        "Corporate Training and Skill Development posts fastest growth at 44.80% CAGR",
        "Accenture acquired Udacity for $1B to build LearnVantage AI credentials",
        "2025 legislation expanded 529 plans to cover coding bootcamps"
    ]

    for signal in demand_signals:
        story.append(Paragraph(f"• {signal}", styles['BulletText']))

    story.append(PageBreak())

    # ===== STRATEGIC OPPORTUNITIES =====
    story.append(Paragraph("5. Strategic Opportunities", styles['SectionHeading']))

    story.append(Paragraph("5.1 Differentiation Strategy", styles['SubsectionHeading']))
    story.append(Paragraph(
        "code:zero can differentiate by positioning as the first AI-native coding academy specifically "
        "designed for founders and builders who want to ship products, not just learn concepts.",
        styles['BodyText']
    ))

    diff_points = [
        "AI-first curriculum: Teach vibe coding, Claude Code, MCP servers, agent workflows",
        "Outcome-focused: Every lesson produces a tangible, shippable artifact",
        "Speed emphasis: Build and ship from day one, iterate publicly",
        "Builder community: Connect learners with indie hackers and founders",
        "Modern stack: Focus on tools that 10x productivity (Cursor, Claude, Supabase)"
    ]

    for point in diff_points:
        story.append(Paragraph(f"• {point}", styles['BulletText']))

    story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph("5.2 Market Timing Advantage", styles['SubsectionHeading']))
    story.append(Paragraph(
        "2025 represents an optimal market entry point due to several converging factors:",
        styles['BodyText']
    ))

    timing_factors = [
        "Vibe coding has achieved mainstream recognition (Collins Word of the Year)",
        "MCP standardization creates teachable, portable skills",
        "Traditional bootcamps are still adapting to AI-first workflows",
        "Developer expectations have shifted to agentic, delegated workflows",
        "Rising 'vibe coding hangover' creates demand for structured best practices"
    ]

    for factor in timing_factors:
        story.append(Paragraph(f"• {factor}", styles['BulletText']))

    story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph("5.3 Revenue Model Opportunities", styles['SubsectionHeading']))

    revenue_data = [
        ['Model', 'Opportunity'],
        ['Cohort-based courses', 'Premium pricing, community value'],
        ['Self-paced curriculum', 'Scalable, global reach'],
        ['Corporate training', 'Fastest-growing segment (44.80% CAGR)'],
        ['Community membership', 'Recurring revenue, network effects'],
        ['Certification', '529 plan eligibility, employer validation'],
    ]

    revenue_table = Table(revenue_data, colWidths=[2.5*inch, 4*inch])
    revenue_table.setStyle(create_table_style())
    story.append(revenue_table)

    story.append(PageBreak())

    # ===== REGIONAL ANALYSIS =====
    story.append(Paragraph("6. Regional Market Analysis", styles['SectionHeading']))

    story.append(Paragraph("6.1 Geographic Opportunities", styles['SubsectionHeading']))

    regional_data = [
        ['Region', 'Market Share/Growth', 'Key Factors'],
        ['North America', '38.4% market share', 'High demand in tech hubs (SF, NYC, Boston)'],
        ['Asia-Pacific', '44.20% CAGR (fastest)', 'Government AI mandates, expanding IT sectors'],
        ['Europe', 'Significant growth', 'Startup ecosystem, remote work adoption'],
        ['South Korea', '$740M government investment', '2024-2026 teacher AI training programs'],
    ]

    regional_table = Table(regional_data, colWidths=[1.5*inch, 1.8*inch, 3*inch])
    regional_table.setStyle(create_table_style())
    story.append(regional_table)
    story.append(Spacer(1, 0.3*inch))

    story.append(Paragraph("6.2 Delivery Mode Trends", styles['SubsectionHeading']))
    story.append(Paragraph(
        "Online bootcamps dominate with 62.9% market share, driven by accessibility and flexibility. "
        "Hybrid models combining online learning with in-person mentorship are emerging as premium offerings.",
        styles['BodyText']
    ))

    story.append(PageBreak())

    # ===== RISKS & CHALLENGES =====
    story.append(Paragraph("7. Risks and Challenges", styles['SectionHeading']))

    story.append(Paragraph("7.1 Market Risks", styles['SubsectionHeading']))

    risks = [
        ("AI Tool Volatility",
         "Rapid evolution of AI coding tools may require constant curriculum updates"),
        ("Vibe Coding Backlash",
         "September 2025 reports of 'vibe coding hangover' and 'development hell' with AI-generated code"),
        ("Security Concerns",
         "May 2025: Lovable (vibe coding app) found to have vulnerabilities in 170 of 1,645 apps created"),
        ("Competition",
         "Established players (Codecademy, Coursera) are integrating AI curricula"),
        ("Skill Devaluation Perception",
         "Some view AI coding as reducing need for traditional programming skills"),
    ]

    for risk_title, risk_desc in risks:
        story.append(Paragraph(f"<b>{risk_title}:</b> {risk_desc}", styles['BodyText']))

    story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph("7.2 Mitigation Strategies", styles['SubsectionHeading']))

    mitigations = [
        "Teach responsible AI coding: debugging, security review, understanding generated code",
        "Focus on 'context engineering' - the evolution beyond pure vibe coding",
        "Emphasize human-in-the-loop best practices",
        "Build curriculum around principles, not just tools",
        "Position as 'AI-augmented' rather than 'AI-replaced' development"
    ]

    for mitigation in mitigations:
        story.append(Paragraph(f"• {mitigation}", styles['BulletText']))

    story.append(PageBreak())

    # ===== RECOMMENDATIONS =====
    story.append(Paragraph("8. Strategic Recommendations", styles['SectionHeading']))

    story.append(Paragraph("8.1 Immediate Actions (Q1 2025)", styles['SubsectionHeading']))

    q1_actions = [
        "Launch core curriculum focused on Claude Code, vibe coding, and shipping products",
        "Build founding community of early adopter builders and indie hackers",
        "Create 'Ship in a Week' challenge to demonstrate outcome-focused approach",
        "Establish content marketing presence in indie hacker communities"
    ]

    for action in q1_actions:
        story.append(Paragraph(f"• {action}", styles['BulletText']))

    story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph("8.2 Medium-term Goals (Q2-Q4 2025)", styles['SubsectionHeading']))

    medium_actions = [
        "Develop corporate training offering for enterprise AI coding adoption",
        "Create certification program eligible for 529 plan coverage",
        "Build MCP server library and teaching resources",
        "Launch cohort-based premium programs with live instruction",
        "Expand into Asia-Pacific markets leveraging online delivery"
    ]

    for action in medium_actions:
        story.append(Paragraph(f"• {action}", styles['BulletText']))

    story.append(Spacer(1, 0.2*inch))

    story.append(Paragraph("8.3 Long-term Vision", styles['SubsectionHeading']))
    story.append(Paragraph(
        "Position code:zero as the definitive educational pathway for the AI-native developer, "
        "where graduates are recognized for their ability to ship real products using modern AI tools "
        "and agentic workflows. Build a community and alumni network that becomes a talent pipeline "
        "for startups and enterprises adopting AI-first development.",
        styles['BodyText']
    ))

    story.append(PageBreak())

    # ===== CONCLUSION =====
    story.append(Paragraph("9. Conclusion", styles['SectionHeading']))
    story.append(Paragraph(
        "The convergence of AI coding assistants, vibe coding methodology, and the indie hacker movement "
        "creates a unique market opportunity for code:zero. With 41% of code now AI-generated, "
        "76% of developers adopting AI tools, and a $45+ billion no-code/low-code market enabling "
        "non-technical founders, the demand for AI-first coding education has never been higher.",
        styles['BodyText']
    ))

    story.append(Paragraph(
        "The academy's positioning around shipping real products, AI-augmented development, and builder "
        "community aligns perfectly with market trends. By focusing on outcomes over theory and modern "
        "tools over legacy approaches, code:zero can capture significant market share in the "
        "rapidly expanding AI coding education space.",
        styles['BodyText']
    ))

    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph(
        "<b>Total Addressable Market Opportunity:</b> The combined AI education ($41B by 2030), "
        "coding bootcamp ($14B by 2032), and AI code tools ($122B by 2035) markets represent "
        "a massive growth opportunity for specialized, AI-first coding education.",
        styles['Highlight']
    ))

    story.append(PageBreak())

    # ===== SOURCES =====
    story.append(Paragraph("Sources & References", styles['SectionHeading']))

    sources = [
        "Mordor Intelligence - AI in Education Market Size & Industry Trends Report 2030",
        "Precedence Research - AI in Education Market Size to Surge USD 112.30 Bn by 2034",
        "Market Research Future - AI Code Tool Market Size, Share, Trends and Analysis 2034",
        "ResearchAndMarkets - Coding Bootcamp Market Trends 2025-2032",
        "Technavio - Coding Bootcamp Market Growth Analysis 2025-2029",
        "Gartner - AI Code Assistant Market Estimates 2025",
        "Index.dev - AI Pair Programming Statistics 2025",
        "Second Talent - AI Coding Assistant Statistics & Trends 2025",
        "Jellyfish - 2025 AI Metrics in Review",
        "Wikipedia - Vibe Coding",
        "IBM - What is Vibe Coding?",
        "MIT Technology Review - From Vibe Coding to Context Engineering",
        "Google Cloud - Vibe Coding Explained",
        "Anthropic - Building Agents with Claude Agent SDK",
        "Anthropic - Claude Code Best Practices",
        "RedMonk - 10 Things Developers Want from Agentic IDEs 2025",
        "Adalo - No-Code Market Growth Statistics 2025",
        "Index.dev - No-Code and Low-Code Statistics 2025",
        "Coherent Market Insights - Coding Bootcamp Market Size & Trends 2032",
        "Indie Hackers - Community and Resources",
        "Calmops - What Is an Indie Hacker Complete Guide 2025",
        "VentureBeat - Claude Code Creator Workflow Reveal",
        "Course Report - 2025 Year in Review Coding Bootcamp News"
    ]

    for i, source in enumerate(sources, 1):
        story.append(Paragraph(f"{i}. {source}", styles['BulletText']))

    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph(
        "Report prepared for code:zero | January 2025",
        styles['Footer']
    ))
    story.append(Paragraph(
        "Build your freedom",
        styles['Footer']
    ))

    # Build the PDF
    doc.build(story)
    print("PDF report created successfully!")

if __name__ == "__main__":
    build_report()
