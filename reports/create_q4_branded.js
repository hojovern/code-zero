const PptxGenJS = require('pptxgenjs');

// Brand colors from branded-deck skill (NO # prefix)
const COLORS = {
  primaryGreen: '04A459',
  lightGreen: '2ECC71',
  bgDark: '242933',
  cardBg: '2e3440',
  textPrimary: 'FFFFFF',
  textSecondary: 'a1a1a1',
  border: '3b4252'
};

const pptx = new PptxGenJS();

// Match template dimensions: 10" x 5.625" (16:9)
pptx.defineLayout({ name: 'BRANDED', width: 10, height: 5.625 });
pptx.layout = 'BRANDED';
pptx.title = 'code:zero Q4 2025 Business Review';
pptx.author = 'code:zero Marketing Team';

// Helper: Add slide header with green accent bar and underline
function addSlideHeader(slide, title) {
  // Top accent bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: '100%', h: 0.15,
    fill: { color: COLORS.primaryGreen }
  });
  // Title
  slide.addText(title, {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
  });
  // Underline accent
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 1.5, h: 0.05,
    fill: { color: COLORS.primaryGreen }
  });
}

// Helper: Add metric card
function addMetricCard(slide, x, y, w, h, value, label, sublabel) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, pt: 1 }
  });
  slide.addText(value, {
    x, y: y + 0.15, w, h: 0.5,
    fontSize: 32, bold: true, color: COLORS.primaryGreen, align: 'center', fontFace: 'Arial'
  });
  slide.addText(label, {
    x, y: y + 0.65, w, h: 0.3,
    fontSize: 12, color: COLORS.textPrimary, align: 'center', fontFace: 'Arial'
  });
  if (sublabel) {
    slide.addText(sublabel, {
      x, y: y + 0.95, w, h: 0.25,
      fontSize: 10, color: COLORS.lightGreen, align: 'center', fontFace: 'Arial'
    });
  }
}

// Helper: Add content card
function addContentCard(slide, x, y, w, h, greenBorder = false) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: COLORS.cardBg },
    line: { color: greenBorder ? COLORS.primaryGreen : COLORS.border, pt: greenBorder ? 2 : 1 }
  });
}

// ============ SLIDE 1: Title Slide ============
let slide1 = pptx.addSlide();
slide1.background = { color: COLORS.bgDark };

// Top green bar
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: COLORS.primaryGreen } });
// Bottom green bar
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 5.475, w: '100%', h: 0.15, fill: { color: COLORS.primaryGreen } });

// Brand name
slide1.addText('code:zero', {
  x: 0.5, y: 1.5, w: 9, h: 0.8,
  fontSize: 54, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});

// Tagline
slide1.addText('Build your freedom.', {
  x: 0.5, y: 2.3, w: 9, h: 0.5,
  fontSize: 18, italic: true, color: COLORS.primaryGreen, fontFace: 'Arial'
});

// Presentation title
slide1.addText('Q4 2025 Business Review', {
  x: 0.5, y: 3.2, w: 9, h: 0.6,
  fontSize: 28, color: COLORS.textPrimary, fontFace: 'Arial'
});

// Subtitle
slide1.addText('Executive Team Presentation | January 2025', {
  x: 0.5, y: 3.9, w: 9, h: 0.4,
  fontSize: 14, color: COLORS.textSecondary, fontFace: 'Arial'
});

// ============ SLIDE 2: Executive Summary (Market Overview style) ============
let slide2 = pptx.addSlide();
slide2.background = { color: COLORS.bgDark };
addSlideHeader(slide2, 'Executive Summary');

// Metric cards - row 1
addMetricCard(slide2, 0.5, 1.2, 2.1, 1.3, '841K', 'Total Views', '+32% QoQ');
addMetricCard(slide2, 2.7, 1.2, 2.1, 1.3, '20', 'Content Pieces', 'Published');
addMetricCard(slide2, 4.9, 1.2, 2.1, 1.3, '16.7%', 'Avg Engagement', 'Above benchmark');
addMetricCard(slide2, 7.1, 1.2, 2.1, 1.3, '$0.02', 'Cost per View', 'Efficient spend');

// Key highlights section
slide2.addText('Q4 Highlights', {
  x: 0.5, y: 2.7, w: 4, h: 0.35,
  fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});

const highlights = [
  '90% of dev teams now use AI in workflows',
  '41% of all code is AI-generated globally',
  'YouTube tutorials drove 62.5% of total views',
  'Email lead magnets achieved 45% engagement',
  'AI content outperformed average by +9.1%'
];

highlights.forEach((h, i) => {
  slide2.addText(h, {
    x: 0.5, y: 3.1 + (i * 0.4), w: 5, h: 0.35,
    fontSize: 12, color: COLORS.textSecondary, fontFace: 'Arial',
    bullet: { type: 'bullet', color: COLORS.primaryGreen }
  });
});

// Market context card (right side)
addContentCard(slide2, 5.7, 2.7, 3.8, 2.55, true);
slide2.addText('Market Context', {
  x: 5.9, y: 2.85, w: 3.4, h: 0.35,
  fontSize: 14, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial'
});
slide2.addText('AI Education Market', {
  x: 5.9, y: 3.25, w: 3.4, h: 0.25,
  fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial'
});
slide2.addText('$6.9B → $41B by 2030', {
  x: 5.9, y: 3.5, w: 3.4, h: 0.3,
  fontSize: 14, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});
slide2.addText('42.8% CAGR', {
  x: 5.9, y: 3.8, w: 3.4, h: 0.25,
  fontSize: 12, color: COLORS.lightGreen, fontFace: 'Arial'
});
slide2.addText('Coding Bootcamp Market', {
  x: 5.9, y: 4.15, w: 3.4, h: 0.25,
  fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial'
});
slide2.addText('$2.65B → $14B by 2032', {
  x: 5.9, y: 4.4, w: 3.4, h: 0.3,
  fontSize: 14, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});
slide2.addText('23.2% CAGR', {
  x: 5.9, y: 4.7, w: 3.4, h: 0.25,
  fontSize: 12, color: COLORS.lightGreen, fontFace: 'Arial'
});

// ============ SLIDE 3: Channel Performance (Market Comparison style) ============
let slide3 = pptx.addSlide();
slide3.background = { color: COLORS.bgDark };
addSlideHeader(slide3, 'Channel Performance');

// Performance table
const channelData = [
  [{ text: 'Channel', options: { bold: true, color: COLORS.textPrimary, fill: { color: COLORS.primaryGreen } }},
   { text: 'Content', options: { bold: true, color: COLORS.textPrimary, fill: { color: COLORS.primaryGreen } }},
   { text: 'Views', options: { bold: true, color: COLORS.textPrimary, fill: { color: COLORS.primaryGreen } }},
   { text: 'Engagement', options: { bold: true, color: COLORS.textPrimary, fill: { color: COLORS.primaryGreen } }},
   { text: 'Cost/View', options: { bold: true, color: COLORS.textPrimary, fill: { color: COLORS.primaryGreen } }}],
  ['YouTube', '5', '526K', '9.0%', '$0.025'],
  ['Instagram', '4', '176K', '13.0%', '$0.009'],
  ['LinkedIn', '4', '74.5K', '15.9%', '$0.016'],
  ['Reddit', '3', '33K', '17.8%', '$0.016'],
  ['Email', '4', '31.7K', '30.1%', '$0.044']
];

slide3.addTable(channelData, {
  x: 0.5, y: 1.2, w: 9, h: 2.2,
  fontFace: 'Arial',
  fontSize: 11,
  color: COLORS.textSecondary,
  fill: { color: COLORS.cardBg },
  border: { pt: 0.5, color: COLORS.border },
  colW: [1.8, 1.2, 1.5, 1.8, 1.5],
  rowH: 0.36,
  align: 'center',
  valign: 'middle'
});

// Insights box
addContentCard(slide3, 0.5, 3.6, 9, 1.7, true);
slide3.addText('Key Channel Insights', {
  x: 0.7, y: 3.75, w: 8.6, h: 0.3,
  fontSize: 14, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial'
});

const channelInsights = [
  'YouTube: Highest reach (526K) but lowest engagement — optimize for retention',
  'Email: Highest engagement (30.1%) — expand lead magnet strategy',
  'Reddit: Best cost efficiency with strong community engagement (17.8%)'
];

channelInsights.forEach((insight, i) => {
  slide3.addText(insight, {
    x: 0.7, y: 4.1 + (i * 0.38), w: 8.6, h: 0.35,
    fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial',
    bullet: { type: 'bullet', color: COLORS.lightGreen }
  });
});

// ============ SLIDE 4: Top Content (Competitive Landscape style) ============
let slide4 = pptx.addSlide();
slide4.background = { color: COLORS.bgDark };
addSlideHeader(slide4, 'Top Performing Content');

// Top by Reach card
addContentCard(slide4, 0.5, 1.2, 4.3, 2.6);
slide4.addText('Top by Reach', {
  x: 0.7, y: 1.35, w: 3.9, h: 0.35,
  fontSize: 14, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial'
});

const topReach = [
  { title: 'How to Price Your First Client Project', views: '124K' },
  { title: 'AI Tools Every Creative Should Know', views: '115K' },
  { title: 'How I Tripled My Rates in 90 Days', views: '102K' },
  { title: 'The 5-Step Client Acquisition System', views: '98K' },
  { title: 'Your First $10K Month Blueprint', views: '87K' }
];

topReach.forEach((item, i) => {
  slide4.addText(item.title, {
    x: 0.7, y: 1.75 + (i * 0.38), w: 3.2, h: 0.35,
    fontSize: 10, color: COLORS.textSecondary, fontFace: 'Arial'
  });
  slide4.addText(item.views, {
    x: 3.9, y: 1.75 + (i * 0.38), w: 0.8, h: 0.35,
    fontSize: 10, bold: true, color: COLORS.primaryGreen, align: 'right', fontFace: 'Arial'
  });
});

// Top by Engagement card
addContentCard(slide4, 5.2, 1.2, 4.3, 2.6);
slide4.addText('Top by Engagement', {
  x: 5.4, y: 1.35, w: 3.9, h: 0.35,
  fontSize: 14, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial'
});

const topEngagement = [
  { title: 'The Ultimate Proposal Template', rate: '45.0%' },
  { title: 'November Success Stories Roundup', rate: '28.0%' },
  { title: 'Workshop Replay: Pricing Mastery', rate: '25.5%' },
  { title: 'Business Skills Workshop Invitation', rate: '22.0%' },
  { title: 'Reddit AMA Highlights Compilation', rate: '19.8%' }
];

topEngagement.forEach((item, i) => {
  slide4.addText(item.title, {
    x: 5.4, y: 1.75 + (i * 0.38), w: 3.2, h: 0.35,
    fontSize: 10, color: COLORS.textSecondary, fontFace: 'Arial'
  });
  slide4.addText(item.rate, {
    x: 8.6, y: 1.75 + (i * 0.38), w: 0.8, h: 0.35,
    fontSize: 10, bold: true, color: COLORS.lightGreen, align: 'right', fontFace: 'Arial'
  });
});

// Differentiation box at bottom
addContentCard(slide4, 0.5, 4.0, 9, 1.3, true);
slide4.addText('code:zero Content Differentiation', {
  x: 0.7, y: 4.15, w: 8.6, h: 0.3,
  fontSize: 12, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial'
});
slide4.addText('AI-focused content shows strong market alignment  •  Tutorial videos dominate reach  •  Lead magnets convert 3-5x higher  •  Community content delivers best ROI', {
  x: 0.7, y: 4.5, w: 8.6, h: 0.6,
  fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial'
});

// ============ SLIDE 5: Market Opportunity (Growth Strategy style - 3 columns) ============
let slide5 = pptx.addSlide();
slide5.background = { color: COLORS.bgDark };
addSlideHeader(slide5, 'Market Opportunity');

// Three market columns
const markets = [
  { title: 'AI Education', current: '$6.9B', future: '$41B', cagr: '42.8%', year: 'by 2030' },
  { title: 'Coding Bootcamp', current: '$2.65B', future: '$14B', cagr: '23.2%', year: 'by 2032' },
  { title: 'AI Code Tools', current: '$6.4B', future: '$122B', cagr: '30.7%', year: 'by 2035' }
];

markets.forEach((m, i) => {
  const x = 0.5 + (i * 3.1);
  addContentCard(slide5, x, 1.2, 2.9, 2.0);
  slide5.addText(m.title, {
    x, y: 1.35, w: 2.9, h: 0.35,
    fontSize: 14, bold: true, color: COLORS.primaryGreen, align: 'center', fontFace: 'Arial'
  });
  slide5.addText(m.current + ' → ' + m.future, {
    x, y: 1.75, w: 2.9, h: 0.4,
    fontSize: 13, bold: true, color: COLORS.textPrimary, align: 'center', fontFace: 'Arial'
  });
  slide5.addText(m.cagr + ' CAGR', {
    x, y: 2.2, w: 2.9, h: 0.3,
    fontSize: 12, color: COLORS.lightGreen, align: 'center', fontFace: 'Arial'
  });
  slide5.addText(m.year, {
    x, y: 2.55, w: 2.9, h: 0.25,
    fontSize: 10, color: COLORS.textSecondary, align: 'center', fontFace: 'Arial'
  });
});

// Key indicators row
const indicators = [
  { value: '90%', label: 'Teams using AI' },
  { value: '41%', label: 'Code AI-generated' },
  { value: '76%', label: 'Devs adopting AI' },
  { value: '4:1', label: 'Citizen vs Pro devs' }
];

indicators.forEach((ind, i) => {
  const x = 0.5 + (i * 2.35);
  slide5.addText(ind.value, {
    x, y: 3.4, w: 2.15, h: 0.4,
    fontSize: 24, bold: true, color: COLORS.primaryGreen, align: 'center', fontFace: 'Arial'
  });
  slide5.addText(ind.label, {
    x, y: 3.8, w: 2.15, h: 0.25,
    fontSize: 10, color: COLORS.textSecondary, align: 'center', fontFace: 'Arial'
  });
});

// Positioning statement
addContentCard(slide5, 0.5, 4.2, 9, 1.1, true);
slide5.addText('Our Opportunity: First AI-native coding academy for founders & builders', {
  x: 0.7, y: 4.35, w: 8.6, h: 0.3,
  fontSize: 12, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial'
});
slide5.addText('"Vibe coding" named Word of Year 2025 — traditional bootcamps still adapting — first-mover advantage available', {
  x: 0.7, y: 4.7, w: 8.6, h: 0.4,
  fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial'
});

// ============ SLIDE 6: Q4 Metrics (Traction style) ============
let slide6 = pptx.addSlide();
slide6.background = { color: COLORS.bgDark };
addSlideHeader(slide6, 'Q4 Performance Metrics');

// Metric cards
const q4Metrics = [
  { value: '841K', label: 'Total Views', sub: '+32% QoQ' },
  { value: '$17.9K', label: 'Production Cost', sub: 'Total investment' },
  { value: '18.2K', label: 'Total Shares', sub: 'Organic reach' },
  { value: '47:1', label: 'Views per Dollar', sub: 'Cost efficiency' }
];

q4Metrics.forEach((m, i) => {
  const x = 0.5 + (i * 2.35);
  addMetricCard(slide6, x, 1.2, 2.15, 1.2, m.value, m.label, m.sub);
});

// Milestones
slide6.addText('Key Milestones', {
  x: 0.5, y: 2.6, w: 9, h: 0.35,
  fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});

addContentCard(slide6, 0.5, 3.0, 9, 2.3);

const milestones = [
  'YouTube channel established as primary reach engine (526K views)',
  'Email lead magnet strategy validated (45% engagement on Proposal Template)',
  'AI-focused content resonating with market ("AI Tools" video: 115K views, 9.1% engagement)',
  'Community presence built on Reddit (17.8% engagement, best ROI)',
  'Content production pipeline scaled to 20 pieces across 5 channels'
];

milestones.forEach((m, i) => {
  slide6.addText(m, {
    x: 0.7, y: 3.15 + (i * 0.4), w: 8.6, h: 0.35,
    fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial',
    bullet: { type: 'bullet', color: COLORS.primaryGreen }
  });
});

// ============ SLIDE 7: Strategic Recommendations (Financials style) ============
let slide7 = pptx.addSlide();
slide7.background = { color: COLORS.bgDark };
addSlideHeader(slide7, 'Strategic Recommendations');

// Investment priorities (left side)
slide7.addText('Investment Priorities', {
  x: 0.5, y: 1.2, w: 4.5, h: 0.35,
  fontSize: 14, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});

const investments = [
  [{ text: 'Priority', options: { bold: true, fill: { color: COLORS.primaryGreen }, color: COLORS.textPrimary }},
   { text: 'Investment', options: { bold: true, fill: { color: COLORS.primaryGreen }, color: COLORS.textPrimary }},
   { text: 'Impact', options: { bold: true, fill: { color: COLORS.primaryGreen }, color: COLORS.textPrimary }}],
  ['YouTube Production', '+$5K/mo', '+200K views'],
  ['Lead Magnets', '+$2K/mo', '+15% conv'],
  ['AI Curriculum', '$25K', 'Core launch'],
  ['Community', '+$3K/mo', '1K members'],
  ['Corporate', '$15K', 'B2B revenue']
];

slide7.addTable(investments, {
  x: 0.5, y: 1.6, w: 4.5, h: 2.2,
  fontFace: 'Arial',
  fontSize: 10,
  color: COLORS.textSecondary,
  fill: { color: COLORS.cardBg },
  border: { pt: 0.5, color: COLORS.border },
  colW: [1.8, 1.3, 1.4],
  rowH: 0.36,
  align: 'left',
  valign: 'middle'
});

// Content Strategy (right side)
slide7.addText('Q1 2025 Content Strategy', {
  x: 5.2, y: 1.2, w: 4.3, h: 0.35,
  fontSize: 14, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});

addContentCard(slide7, 5.2, 1.55, 4.3, 2.25);

const contentStrategy = [
  'Double down on YouTube tutorials',
  'Launch AI-focused content series',
  'Expand email lead magnet library',
  'Increase Reddit community presence',
  'Create "Ship in a Week" challenge'
];

contentStrategy.forEach((s, i) => {
  slide7.addText(s, {
    x: 5.4, y: 1.7 + (i * 0.4), w: 3.9, h: 0.35,
    fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial',
    bullet: { type: 'bullet', color: COLORS.lightGreen }
  });
});

// Bottom summary
addContentCard(slide7, 0.5, 4.0, 9, 1.3, true);
slide7.addText('Recommended Q1 Budget Increase: +$10K/month', {
  x: 0.7, y: 4.15, w: 8.6, h: 0.35,
  fontSize: 14, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial'
});
slide7.addText('Use of Funds: 50% Content Production  •  30% Curriculum Development  •  20% Community & Ops', {
  x: 0.7, y: 4.55, w: 8.6, h: 0.5,
  fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial'
});

// ============ SLIDE 8: Summary (Summary style with CTA) ============
let slide8 = pptx.addSlide();
slide8.background = { color: COLORS.bgDark };
addSlideHeader(slide8, 'Summary');

// Why code:zero box
addContentCard(slide8, 0.5, 1.2, 9, 2.2);
slide8.addText('Why code:zero?', {
  x: 0.7, y: 1.35, w: 8.6, h: 0.35,
  fontSize: 14, bold: true, color: COLORS.primaryGreen, fontFace: 'Arial'
});

const whyPoints = [
  '$177B+ combined TAM across AI education, bootcamps, and AI code tools',
  'First-mover in AI-native education — 90% of teams now use AI, but no bootcamp teaches it properly',
  'Q4 content performance validates strategy: 841K views, 16.7% engagement, $0.02 cost/view',
  'Strong unit economics potential: Email converts at 30%+, community content delivers best ROI'
];

whyPoints.forEach((p, i) => {
  slide8.addText(p, {
    x: 0.7, y: 1.75 + (i * 0.4), w: 8.6, h: 0.35,
    fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial',
    bullet: { type: 'bullet', color: COLORS.lightGreen }
  });
});

// CTA button
slide8.addShape(pptx.shapes.RECTANGLE, {
  x: 2.5, y: 3.6, w: 5, h: 0.7,
  fill: { color: COLORS.primaryGreen }
});
slide8.addText('Approve Q1 Content & Curriculum Investment', {
  x: 2.5, y: 3.7, w: 5, h: 0.5,
  fontSize: 14, bold: true, color: COLORS.textPrimary, align: 'center', fontFace: 'Arial'
});

// Contact info
slide8.addText('hello@codedayone.com  |  codedayone.com', {
  x: 0.5, y: 4.6, w: 9, h: 0.3,
  fontSize: 12, color: COLORS.textSecondary, align: 'center', fontFace: 'Arial'
});

// Bottom green bar
slide8.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 5.475, w: '100%', h: 0.15, fill: { color: COLORS.primaryGreen } });

// Tagline
slide8.addText('Build your freedom.', {
  x: 0.5, y: 5.1, w: 9, h: 0.3,
  fontSize: 14, italic: true, color: COLORS.primaryGreen, align: 'center', fontFace: 'Arial'
});

// Save
pptx.writeFile({ fileName: '/Users/jv/Coding/claude/code-day-one/marketing-team/reports/CodeDayOne_Q4_Business_Review_Branded.pptx' })
  .then(() => console.log('Branded presentation created successfully!'))
  .catch(err => console.error(err));
