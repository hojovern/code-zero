const PptxGenJS = require('pptxgenjs');

// Brand colors
const COLORS = {
  primaryGreen: '04A459',
  lightGreen: '2ECC71',
  bgDark: '242933',
  cardBg: '2e3440',
  textPrimary: 'FFFFFF',
  textSecondary: 'a1a1a1',
  textMuted: '666666',
  border: '3b4252',
  accent: '04A459'
};

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'CUSTOM', width: 13.33, height: 7.5 });
pptx.layout = 'CUSTOM';
pptx.title = 'code:zero Q4 2025 Business Review';
pptx.author = 'code:zero Marketing Team';

// ============ SLIDE 1: Title Slide ============
let slide1 = pptx.addSlide();
slide1.background = { color: COLORS.bgDark };

// Accent bar top
slide1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.15, fill: { color: COLORS.primaryGreen } });

// Company name
slide1.addText('code:zero', { x: 0.5, y: 2.2, w: 12.33, h: 0.8, fontSize: 48, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial' });

// Title
slide1.addText('Q4 2025 Business Review', { x: 0.5, y: 3.0, w: 12.33, h: 0.7, fontSize: 36, color: COLORS.textPrimary, fontFace: 'Arial' });

// Subtitle
slide1.addText('Executive Team Presentation | January 2025', { x: 0.5, y: 3.8, w: 12.33, h: 0.5, fontSize: 18, color: COLORS.textSecondary, fontFace: 'Arial' });

// Tagline
slide1.addText('Build your freedom', { x: 0.5, y: 6.5, w: 12.33, h: 0.4, fontSize: 16, italic: true, color: COLORS.lightGreen, fontFace: 'Arial' });

// ============ SLIDE 2: Executive Summary ============
let slide2 = pptx.addSlide();
slide2.background = { color: COLORS.bgDark };
slide2.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.8, fill: { color: COLORS.primaryGreen } });
slide2.addText('Executive Summary', { x: 0.5, y: 0.15, w: 12, h: 0.5, fontSize: 28, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

// Key metrics boxes
const metrics = [
  { label: 'Total Views', value: '841K', delta: '+32% QoQ' },
  { label: 'Content Pieces', value: '20', delta: 'Published' },
  { label: 'Avg Engagement', value: '16.7%', delta: 'Above benchmark' },
  { label: 'Cost per View', value: '$0.02', delta: 'Efficient' }
];

metrics.forEach((m, i) => {
  const x = 0.5 + (i * 3.1);
  slide2.addShape(pptx.ShapeType.rect, { x: x, y: 1.2, w: 2.9, h: 1.6, fill: { color: COLORS.cardBg }, line: { color: COLORS.border, pt: 1 } });
  slide2.addText(m.value, { x: x, y: 1.35, w: 2.9, h: 0.7, fontSize: 32, bold: true, color: COLORS.primaryGreen, align: 'center', fontFace: 'Arial' });
  slide2.addText(m.label, { x: x, y: 2.0, w: 2.9, h: 0.4, fontSize: 14, color: COLORS.textPrimary, align: 'center', fontFace: 'Arial' });
  slide2.addText(m.delta, { x: x, y: 2.4, w: 2.9, h: 0.3, fontSize: 11, color: COLORS.lightGreen, align: 'center', fontFace: 'Arial' });
});

// Key highlights
slide2.addText('Q4 Highlights', { x: 0.5, y: 3.2, w: 12, h: 0.4, fontSize: 18, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

const highlights = [
  'YouTube tutorial videos drove 62.5% of total views (526K)',
  'Email lead magnets achieved highest engagement (45% for Proposal Template)',
  'AI-focused content outperformed average (+9.1% engagement)',
  'Production investment: $17,870 | ROI: 47 views per dollar spent'
];

highlights.forEach((h, i) => {
  slide2.addText(h, { x: 0.7, y: 3.7 + (i * 0.45), w: 12, h: 0.4, fontSize: 14, color: COLORS.textSecondary, bullet: { type: 'bullet', color: COLORS.primaryGreen }, fontFace: 'Arial' });
});

// Market context box
slide2.addShape(pptx.ShapeType.rect, { x: 0.5, y: 5.6, w: 12.33, h: 1.4, fill: { color: '1a2a1a' }, line: { color: COLORS.primaryGreen, pt: 2 } });
slide2.addText('Market Context: AI coding education market growing at 42.8% CAGR ($6.9B to $41B by 2030)', { x: 0.7, y: 5.75, w: 12, h: 0.35, fontSize: 13, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial' });
slide2.addText('76% of developers now use AI tools | 41% of code is AI-generated | "Vibe coding" named Word of Year 2025', { x: 0.7, y: 6.15, w: 12, h: 0.35, fontSize: 12, color: COLORS.textSecondary, fontFace: 'Arial' });
slide2.addText('code:zero is positioned at the intersection of two explosive growth sectors.', { x: 0.7, y: 6.55, w: 12, h: 0.35, fontSize: 12, italic: true, color: COLORS.textMuted, fontFace: 'Arial' });

// ============ SLIDE 3: Channel Performance ============
let slide3 = pptx.addSlide();
slide3.background = { color: COLORS.bgDark };
slide3.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.8, fill: { color: COLORS.primaryGreen } });
slide3.addText('Channel Performance', { x: 0.5, y: 0.15, w: 12, h: 0.5, fontSize: 28, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

// Views by Channel Bar Chart
slide3.addText('Views by Channel', { x: 0.5, y: 1.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

slide3.addChart(pptx.ChartType.bar, [
  { name: 'Views (K)', labels: ['YouTube', 'Instagram', 'LinkedIn', 'Reddit', 'Email'], values: [526, 176, 74.5, 33, 31.7] }
], {
  x: 0.5, y: 1.4, w: 6, h: 2.8,
  showLegend: false,
  showTitle: false,
  barDir: 'bar',
  barGapWidthPct: 50,
  chartColors: [COLORS.primaryGreen],
  catAxisLabelColor: COLORS.textSecondary,
  catAxisLabelFontSize: 11,
  valAxisLabelColor: COLORS.textSecondary,
  valAxisLabelFontSize: 10,
  dataLabelColor: COLORS.textPrimary,
  showValue: true,
  dataLabelPosition: 'outEnd',
  dataLabelFontSize: 10,
  gridLineColor: COLORS.border,
  valAxisLineShow: false,
  catAxisLineShow: false
});

// Engagement by Channel Bar Chart
slide3.addText('Engagement Rate by Channel', { x: 7, y: 1.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

slide3.addChart(pptx.ChartType.bar, [
  { name: 'Engagement %', labels: ['Email', 'Reddit', 'LinkedIn', 'Instagram', 'YouTube'], values: [30.1, 17.8, 15.9, 13.0, 9.0] }
], {
  x: 7, y: 1.4, w: 5.8, h: 2.8,
  showLegend: false,
  showTitle: false,
  barDir: 'bar',
  barGapWidthPct: 50,
  chartColors: [COLORS.lightGreen],
  catAxisLabelColor: COLORS.textSecondary,
  catAxisLabelFontSize: 11,
  valAxisLabelColor: COLORS.textSecondary,
  valAxisLabelFontSize: 10,
  dataLabelColor: COLORS.textPrimary,
  showValue: true,
  dataLabelPosition: 'outEnd',
  dataLabelFontSize: 10,
  dataLabelFormatCode: '0.0"%"',
  gridLineColor: COLORS.border,
  valAxisLineShow: false,
  catAxisLineShow: false
});

// Channel insights
slide3.addText('Key Insights', { x: 0.5, y: 4.5, w: 12, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

const channelInsights = [
  'YouTube: Highest reach (526K views) but lowest engagement (9%) - optimize for retention',
  'Email: Highest engagement (30.1%) - expand lead magnet strategy',
  'LinkedIn: Strong thought leadership performance (15.9% engagement) - increase frequency',
  'Reddit: Best cost efficiency ($0.016/view) with strong community engagement (17.8%)'
];

channelInsights.forEach((insight, i) => {
  slide3.addText(insight, { x: 0.7, y: 5.0 + (i * 0.5), w: 12, h: 0.45, fontSize: 13, color: COLORS.textSecondary, bullet: { type: 'bullet', color: COLORS.primaryGreen }, fontFace: 'Arial' });
});

// ============ SLIDE 4: Top Performing Content ============
let slide4 = pptx.addSlide();
slide4.background = { color: COLORS.bgDark };
slide4.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.8, fill: { color: COLORS.primaryGreen } });
slide4.addText('Top Performing Content', { x: 0.5, y: 0.15, w: 12, h: 0.5, fontSize: 28, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

// Top by Views
slide4.addText('Top 5 by Reach', { x: 0.5, y: 1.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

const topViews = [
  ['Content', 'Channel', 'Views'],
  ['How to Price Your First Client Project', 'YouTube', '124K'],
  ['AI Tools Every Creative Should Know', 'YouTube', '115K'],
  ['How I Tripled My Rates in 90 Days', 'YouTube', '102K'],
  ['The 5-Step Client Acquisition System', 'YouTube', '98K'],
  ['Your First $10K Month Blueprint', 'YouTube', '87K']
];

slide4.addTable(topViews, {
  x: 0.5, y: 1.4, w: 6.2, h: 2.5,
  fontFace: 'Arial',
  fontSize: 10,
  color: COLORS.textSecondary,
  fill: { color: COLORS.cardBg },
  border: { pt: 0.5, color: COLORS.border },
  colW: [3.5, 1.2, 0.8],
  rowH: 0.4,
  align: 'left',
  valign: 'middle'
});

// Top by Engagement
slide4.addText('Top 5 by Engagement', { x: 7, y: 1.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

const topEngagement = [
  ['Content', 'Channel', 'Rate'],
  ['The Ultimate Proposal Template', 'Email', '45.0%'],
  ['November Success Stories Roundup', 'Email', '28.0%'],
  ['Workshop Replay: Pricing Mastery', 'Email', '25.5%'],
  ['Business Skills Workshop Invitation', 'Email', '22.0%'],
  ['Reddit AMA Highlights Compilation', 'Reddit', '19.8%']
];

slide4.addTable(topEngagement, {
  x: 7, y: 1.4, w: 5.8, h: 2.5,
  fontFace: 'Arial',
  fontSize: 10,
  color: COLORS.textSecondary,
  fill: { color: COLORS.cardBg },
  border: { pt: 0.5, color: COLORS.border },
  colW: [3.3, 1.0, 0.8],
  rowH: 0.4,
  align: 'left',
  valign: 'middle'
});

// Content performance insights
slide4.addShape(pptx.ShapeType.rect, { x: 0.5, y: 4.2, w: 12.33, h: 2.8, fill: { color: COLORS.cardBg }, line: { color: COLORS.border, pt: 1 } });
slide4.addText('Content Strategy Insights', { x: 0.7, y: 4.4, w: 12, h: 0.4, fontSize: 16, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial' });

const contentInsights = [
  'Tutorial videos dominate reach - YouTube algorithm favors "How to" and pricing content',
  'AI-focused content ("AI Tools Every Creative Should Know") shows strong market alignment',
  'Email lead magnets convert at 3-5x higher rates than social content',
  'Case studies and testimonials drive both reach AND engagement - expand production',
  'Community content (Reddit AMAs) provides highest ROI per dollar spent'
];

contentInsights.forEach((insight, i) => {
  slide4.addText(insight, { x: 0.9, y: 4.9 + (i * 0.45), w: 11.5, h: 0.4, fontSize: 12, color: COLORS.textSecondary, bullet: { type: 'bullet', color: COLORS.lightGreen }, fontFace: 'Arial' });
});

// ============ SLIDE 5: Market Opportunity ============
let slide5 = pptx.addSlide();
slide5.background = { color: COLORS.bgDark };
slide5.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.8, fill: { color: COLORS.primaryGreen } });
slide5.addText('Market Opportunity', { x: 0.5, y: 0.15, w: 12, h: 0.5, fontSize: 28, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

// TAM chart
slide5.addText('Total Addressable Market Growth', { x: 0.5, y: 1.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

slide5.addChart(pptx.ChartType.bar, [
  { name: '2025', labels: ['AI Education', 'Bootcamp', 'AI Code Tools'], values: [6.9, 2.65, 6.4] },
  { name: '2030+', labels: ['AI Education', 'Bootcamp', 'AI Code Tools'], values: [41, 14, 122] }
], {
  x: 0.5, y: 1.4, w: 6.2, h: 3.0,
  showLegend: true,
  legendPos: 'b',
  legendColor: COLORS.textSecondary,
  legendFontSize: 10,
  barDir: 'bar',
  barGrouping: 'clustered',
  barGapWidthPct: 30,
  chartColors: [COLORS.primaryGreen, COLORS.lightGreen],
  catAxisLabelColor: COLORS.textSecondary,
  catAxisLabelFontSize: 11,
  valAxisLabelColor: COLORS.textSecondary,
  valAxisLabelFontSize: 10,
  valAxisTitle: 'Market Size ($B)',
  valAxisTitleColor: COLORS.textMuted,
  valAxisTitleFontSize: 9,
  showValue: true,
  dataLabelColor: COLORS.textPrimary,
  dataLabelFontSize: 9,
  dataLabelPosition: 'outEnd',
  gridLineColor: COLORS.border
});

// Key market stats
slide5.addText('Key Market Indicators', { x: 7, y: 1.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

const marketStats = [
  { stat: '42.8%', label: 'AI Education CAGR' },
  { stat: '23.2%', label: 'Bootcamp CAGR' },
  { stat: '30.7%', label: 'AI Code Tools CAGR' },
  { stat: '90%', label: 'Teams using AI' },
  { stat: '41%', label: 'Code AI-generated' },
  { stat: '76%', label: 'Devs adopting AI tools' }
];

marketStats.forEach((m, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 7 + (col * 2.9);
  const y = 1.5 + (row * 1.1);
  slide5.addShape(pptx.ShapeType.rect, { x: x, y: y, w: 2.7, h: 0.95, fill: { color: COLORS.cardBg }, line: { color: COLORS.border, pt: 1 } });
  slide5.addText(m.stat, { x: x, y: y + 0.1, w: 2.7, h: 0.45, fontSize: 22, bold: true, color: COLORS.primaryGreen, align: 'center', fontFace: 'Arial' });
  slide5.addText(m.label, { x: x, y: y + 0.55, w: 2.7, h: 0.3, fontSize: 10, color: COLORS.textSecondary, align: 'center', fontFace: 'Arial' });
});

// Market positioning
slide5.addText('Strategic Positioning', { x: 0.5, y: 4.7, w: 12, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

const positioning = [
  'Gap identified: No AI-native coding academy focused on founders/builders shipping real products',
  '"Vibe coding" mainstream recognition creates demand for structured education',
  'Traditional bootcamps still adapting - first-mover advantage available',
  'MCP standardization creates teachable, portable skills curriculum opportunity'
];

positioning.forEach((p, i) => {
  slide5.addText(p, { x: 0.7, y: 5.2 + (i * 0.5), w: 12, h: 0.45, fontSize: 13, color: COLORS.textSecondary, bullet: { type: 'bullet', color: COLORS.primaryGreen }, fontFace: 'Arial' });
});

// ============ SLIDE 6: Competitive Landscape ============
let slide6 = pptx.addSlide();
slide6.background = { color: COLORS.bgDark };
slide6.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.8, fill: { color: COLORS.primaryGreen } });
slide6.addText('Competitive Landscape', { x: 0.5, y: 0.15, w: 12, h: 0.5, fontSize: 28, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

// Competitor table
const competitors = [
  ['Platform', 'Category', 'Positioning', 'Gap vs code:zero'],
  ['Codecademy', 'Interactive', 'Structured courses', 'No AI-first, no shipping focus'],
  ['freeCodeCamp', 'Free/Community', 'Open source, certs', 'No AI curriculum, slow pace'],
  ['Coursera', 'Academic', 'University degrees', 'Theory-heavy, not builder-focused'],
  ['General Assembly', 'Bootcamp', 'Career services', 'Traditional stack, high cost'],
  ['Replit', 'IDE/Learning', 'Browser coding', 'Tool-focused, not outcome-focused']
];

slide6.addTable(competitors, {
  x: 0.5, y: 1.1, w: 12.33, h: 2.8,
  fontFace: 'Arial',
  fontSize: 11,
  color: COLORS.textSecondary,
  fill: { color: COLORS.cardBg },
  border: { pt: 0.5, color: COLORS.border },
  colW: [1.8, 1.5, 2.8, 3.5],
  rowH: 0.45,
  align: 'left',
  valign: 'middle'
});

// Our differentiation
slide6.addText('code:zero Differentiation', { x: 0.5, y: 4.2, w: 12, h: 0.4, fontSize: 16, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial' });

const diff = [
  { title: 'AI-First Curriculum', desc: 'Vibe coding, Claude Code, MCP servers, agent workflows' },
  { title: 'Outcome-Focused', desc: 'Every lesson produces a tangible, shippable artifact' },
  { title: 'Builder Community', desc: 'Connect learners with indie hackers and founders' },
  { title: 'Modern Stack', desc: 'Tools that 10x productivity (Cursor, Claude, Supabase)' }
];

diff.forEach((d, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.5 + (col * 6.4);
  const y = 4.7 + (row * 1.2);
  slide6.addShape(pptx.ShapeType.rect, { x: x, y: y, w: 6.2, h: 1.0, fill: { color: COLORS.cardBg }, line: { color: COLORS.primaryGreen, pt: 1 } });
  slide6.addText(d.title, { x: x + 0.15, y: y + 0.1, w: 5.9, h: 0.35, fontSize: 13, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial' });
  slide6.addText(d.desc, { x: x + 0.15, y: y + 0.5, w: 5.9, h: 0.4, fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial' });
});

// ============ SLIDE 7: Strategic Recommendations ============
let slide7 = pptx.addSlide();
slide7.background = { color: COLORS.bgDark };
slide7.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.8, fill: { color: COLORS.primaryGreen } });
slide7.addText('Strategic Recommendations', { x: 0.5, y: 0.15, w: 12, h: 0.5, fontSize: 28, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

// Content Strategy
slide7.addText('Content Strategy - Q1 2025', { x: 0.5, y: 1.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial' });

const contentRecs = [
  'Double down on YouTube tutorials - proven reach engine',
  'Launch AI-focused content series (market demand signal)',
  'Expand email lead magnet library (45% engagement)',
  'Increase Reddit community presence (best ROI)',
  'Create "Ship in a Week" challenge campaign'
];

contentRecs.forEach((r, i) => {
  slide7.addText(r, { x: 0.7, y: 1.5 + (i * 0.45), w: 5.8, h: 0.4, fontSize: 12, color: COLORS.textSecondary, bullet: { type: 'bullet', color: COLORS.lightGreen }, fontFace: 'Arial' });
});

// Business Strategy
slide7.addText('Business Strategy - 2025', { x: 7, y: 1.0, w: 6, h: 0.4, fontSize: 16, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial' });

const bizRecs = [
  'Launch core curriculum: Claude Code + shipping focus',
  'Build founding community of indie hackers',
  'Develop corporate training offering (44.8% CAGR)',
  'Create certification for 529 plan eligibility',
  'Expand to Asia-Pacific (fastest growth region)'
];

bizRecs.forEach((r, i) => {
  slide7.addText(r, { x: 7.2, y: 1.5 + (i * 0.45), w: 5.6, h: 0.4, fontSize: 12, color: COLORS.textSecondary, bullet: { type: 'bullet', color: COLORS.lightGreen }, fontFace: 'Arial' });
});

// Investment priorities
slide7.addText('Investment Priorities', { x: 0.5, y: 4.0, w: 12, h: 0.4, fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

const investments = [
  ['Priority', 'Investment', 'Expected Impact', 'Timeline'],
  ['YouTube Production', '+$5K/mo', '+200K views/mo', 'Q1'],
  ['Email/Lead Magnets', '+$2K/mo', '+15% conversion', 'Q1'],
  ['AI Curriculum Dev', '$25K', 'Core product launch', 'Q1-Q2'],
  ['Community Building', '+$3K/mo', '1K founding members', 'Q1-Q2'],
  ['Corporate Training', '$15K', 'B2B revenue stream', 'Q2-Q3']
];

slide7.addTable(investments, {
  x: 0.5, y: 4.5, w: 12.33, h: 2.4,
  fontFace: 'Arial',
  fontSize: 11,
  color: COLORS.textSecondary,
  fill: { color: COLORS.cardBg },
  border: { pt: 0.5, color: COLORS.border },
  colW: [3.5, 2.5, 3.5, 1.5],
  rowH: 0.38,
  align: 'left',
  valign: 'middle'
});

// ============ SLIDE 8: Closing ============
let slide8 = pptx.addSlide();
slide8.background = { color: COLORS.bgDark };

// Large accent shape
slide8.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 3.5, fill: { color: COLORS.primaryGreen } });

slide8.addText('code:zero', { x: 0.5, y: 1.0, w: 12.33, h: 0.8, fontSize: 42, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });
slide8.addText('Positioned to capture the AI-first coding education market', { x: 0.5, y: 1.9, w: 12.33, h: 0.6, fontSize: 20, color: COLORS.textPrimary, fontFace: 'Arial' });

// Key numbers recap
const finalStats = [
  { num: '$177B+', label: 'Combined TAM by 2035' },
  { num: '841K', label: 'Q4 Content Views' },
  { num: '16.7%', label: 'Avg Engagement' },
  { num: '42.8%', label: 'Market CAGR' }
];

finalStats.forEach((s, i) => {
  const x = 0.5 + (i * 3.2);
  slide8.addShape(pptx.ShapeType.rect, { x: x, y: 4.0, w: 3.0, h: 1.4, fill: { color: COLORS.cardBg }, line: { color: COLORS.primaryGreen, pt: 2 } });
  slide8.addText(s.num, { x: x, y: 4.15, w: 3.0, h: 0.7, fontSize: 26, bold: true, color: COLORS.primaryGreen, align: 'center', fontFace: 'Arial' });
  slide8.addText(s.label, { x: x, y: 4.85, w: 3.0, h: 0.4, fontSize: 11, color: COLORS.textSecondary, align: 'center', fontFace: 'Arial' });
});

// Call to action
slide8.addText('Next Steps: Approve Q1 content budget increase and curriculum development investment', { x: 0.5, y: 5.8, w: 12.33, h: 0.5, fontSize: 14, bold: true, color: COLORS.textPrimary, fontFace: 'Arial' });

// Tagline
slide8.addText('Build your freedom', { x: 0.5, y: 6.7, w: 12.33, h: 0.4, fontSize: 18, italic: true, color: COLORS.primaryGreen, fontFace: 'Arial' });

// Save
pptx.writeFile('/Users/jv/Coding/claude/code-day-one/marketing-team/reports/CodeDayOne_Q4_Business_Review.pptx')
  .then(() => console.log('Presentation created successfully!'))
  .catch(err => console.error(err));
