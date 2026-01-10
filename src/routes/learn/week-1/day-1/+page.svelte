<script lang="ts">
	const schedule = {
		morning: [
			{ time: "9:00 - 9:30", activity: "Welcome + Philosophy", outcome: "Understand AI-first development" },
			{ time: "9:30 - 10:15", activity: "Terminal + Claude Code Setup", outcome: "AI agent running" },
			{ time: "10:15 - 10:30", activity: "Break", outcome: "" },
			{ time: "10:30 - 11:15", activity: "Create CLAUDE.md", outcome: "AI knows your project" },
			{ time: "11:15 - 12:00", activity: "Build Blog Writer Skill", outcome: "First skill complete" }
		],
		afternoon: [
			{ time: "13:00 - 13:30", activity: "Standup: Show your CLAUDE.md", outcome: "See others' approaches" },
			{ time: "13:30 - 14:30", activity: "AI Creates SvelteKit Project", outcome: "Scaffolded + configured" },
			{ time: "14:30 - 14:45", activity: "Break", outcome: "" },
			{ time: "14:45 - 16:00", activity: "AI Builds Landing Page", outcome: "Complete homepage" },
			{ time: "16:00 - 16:45", activity: "Deploy to Vercel", outcome: "LIVE ON THE INTERNET" },
			{ time: "16:45 - 17:30", activity: "Generate First Blog Post + Ship", outcome: "Content live on site" }
		]
	};

	const checklist = [
		"CLAUDE.md captures your project",
		"Blog writer skill exists and works",
		"Landing page live at Vercel URL",
		"At least one blog post published",
		"Mobile responsive (check on phone)"
	];
</script>

<svelte:head>
	<title>Day 1: AI Workspace → Live Website | code:zero</title>
	<meta name="description" content="Set up your AI workspace, create your first skill, and deploy a live website - all in one day." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/learn/week-1" class="nav-back">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</a>
		<span class="nav-title">Day 1: AI Workspace → Live Website</span>
		<div class="nav-spacer"></div>
	</div>
</nav>

<article class="lesson">
	<div class="container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/learn">Learn</a>
			<span class="sep">/</span>
			<a href="/learn/week-1">Week 1</a>
			<span class="sep">/</span>
			<span class="current">Day 1</span>
		</nav>

		<!-- Lesson Header -->
		<header class="lesson-header">
			<div class="day-badge">Day 1</div>
			<h1 class="lesson-title">AI Workspace → Live Website</h1>
			<p class="lesson-tagline">"Set up the system. Use the system. Ship before you leave."</p>
		</header>

		<!-- Challenge -->
		<section class="content-section">
			<div class="challenge-card">
				<h2>The Challenge</h2>
				<p><strong>By end of day:</strong></p>
				<ol>
					<li>AI workspace configured (Claude knows YOUR project)</li>
					<li>Blog writer skill created (reusable forever)</li>
					<li>Live website deployed (real URL anyone can visit)</li>
				</ol>
				<p class="emphasis">All in one day. This is the pace.</p>
			</div>
		</section>

		<!-- Why This Order -->
		<section class="content-section">
			<h2>Why This Order?</h2>
			<p>Most bootcamps: "Here's how to code. Now code for 4 weeks."</p>
			<p>We flip it:</p>
			<ol>
				<li><strong>First hour:</strong> Set up AI that knows your project</li>
				<li><strong>Rest of day:</strong> AI helps build everything</li>
			</ol>
			<p>The AI workspace isn't a nice-to-have. It's the foundation that makes everything else faster.</p>
		</section>

		<!-- Schedule -->
		<section class="content-section">
			<h2>Schedule</h2>

			<h3>Morning Block (9:00 - 12:00)</h3>
			<div class="schedule-table">
				{#each schedule.morning as item}
					<div class="schedule-row" class:break={item.activity === 'Break'}>
						<span class="schedule-time">{item.time}</span>
						<span class="schedule-activity">{item.activity}</span>
						<span class="schedule-outcome">{item.outcome}</span>
					</div>
				{/each}
			</div>

			<h3>Lunch (12:00 - 13:00)</h3>

			<h3>Afternoon Block (13:00 - 17:30)</h3>
			<div class="schedule-table">
				{#each schedule.afternoon as item}
					<div class="schedule-row" class:break={item.activity === 'Break'}>
						<span class="schedule-time">{item.time}</span>
						<span class="schedule-activity">{item.activity}</span>
						<span class="schedule-outcome">{item.outcome}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- Morning Content -->
		<section class="content-section">
			<h2>Morning: The AI Workspace</h2>

			<h3>1. Philosophy: AI-First Development (30 min)</h3>

			<div class="comparison">
				<div class="comparison-item old">
					<span class="comparison-label">The old way:</span>
					<code>Idea → Learn to code → Code everything → Debug → Ship (eventually)</code>
				</div>
				<div class="comparison-item new">
					<span class="comparison-label">The AI-first way:</span>
					<code>Idea → Set up AI workspace → AI helps build → Ship (today)</code>
				</div>
			</div>

			<p><strong>Key insight:</strong> The skill isn't coding. The skill is directing AI effectively.</p>

			<div class="info-table">
				<div class="info-row">
					<span class="info-old">Old Thinking</span>
					<span class="info-new">New Thinking</span>
				</div>
				<div class="info-row">
					<span>"I need to learn everything"</span>
					<span>"I need to direct AI effectively"</span>
				</div>
				<div class="info-row">
					<span>"Write code from scratch"</span>
					<span>"Describe what I want, refine output"</span>
				</div>
				<div class="info-row">
					<span>"AI is a search engine"</span>
					<span>"AI is a collaborator with memory"</span>
				</div>
				<div class="info-row">
					<span>"One-off prompts"</span>
					<span>"Reusable skills and workflows"</span>
				</div>
			</div>

			<p><strong>What makes AI actually useful:</strong></p>
			<ol>
				<li><strong>Context</strong> — AI knows about YOUR project (not generic)</li>
				<li><strong>Memory</strong> — AI remembers decisions you've made</li>
				<li><strong>Skills</strong> — AI follows YOUR workflows, not generic ones</li>
				<li><strong>Structure</strong> — AI outputs in YOUR formats</li>
			</ol>

			<h3>2. Terminal + Claude Code Setup (45 min)</h3>

			<p><strong>Install Claude Code:</strong></p>
			<div class="code-block">
				<pre><code># Install via npm
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version</code></pre>
			</div>

			<p><strong>Create your project:</strong></p>
			<div class="code-block">
				<pre><code>cd ~/Projects
mkdir my-product
cd my-product
claude</code></pre>
			</div>

			<p><strong>What you see:</strong></p>
			<ul>
				<li>Terminal interface for conversation with Claude</li>
				<li>Claude can read/write files in your project</li>
				<li>Claude can run commands</li>
				<li>Claude remembers context within the session</li>
			</ul>

			<p><strong>Quick test:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Create a file called hello.txt that says "My AI workspace is ready"</code></pre>
			</div>

			<p>Claude creates the file. Verify: <code>cat hello.txt</code></p>

			<div class="callout">
				<strong>This is different from ChatGPT:</strong>
				<ul>
					<li>Claude is IN your project folder</li>
					<li>Claude can create, edit, read files directly</li>
					<li>Claude sees your folder structure</li>
					<li>Claude can run terminal commands</li>
				</ul>
			</div>

			<h3>3. Create CLAUDE.md — Your Project's Brain (45 min)</h3>

			<p><strong>The CLAUDE.md file is your AI's memory.</strong></p>

			<div class="code-block prompt">
				<pre><code>You: Create a CLAUDE.md file for my project. I'll tell you about it.</code></pre>
			</div>

			<p>Then tell Claude:</p>
			<ul>
				<li>What your product does</li>
				<li>Who it's for</li>
				<li>What problem it solves</li>
				<li>What voice/tone to use</li>
			</ul>

			<p><strong>Template structure:</strong></p>
			<div class="code-block">
				<pre><code># [Product Name]

## Project Overview
[One paragraph: What is this? What problem does it solve?]

## Target Audience
- [Who is this for?]
- [What do they struggle with?]
- [What do they want?]

## Brand Voice
- [Tone: Direct? Friendly? Technical?]
- [Words we use]
- [Words we avoid]

## Tech Stack
- Frontend: SvelteKit
- Backend: Supabase
- AI: Gemini (free), Claude
- Deploy: Vercel</code></pre>
			</div>

			<p><strong>Test that Claude knows your project:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: What is this project about?
You: Write a one-line description for our homepage.
You: Who is our target audience?</code></pre>
			</div>

			<p>Claude should answer correctly based on CLAUDE.md.</p>

			<h3>4. Build Blog Writer Skill (45 min)</h3>

			<p><strong>Why build a skill?</strong></p>

			<div class="comparison">
				<div class="comparison-item old">
					<span class="comparison-label">Without skills:</span>
					<code>You: Write a blog post about [topic]. Make it SEO-friendly. Use our brand voice. Include a hook, 3 main sections, and a CTA. Around 1500 words. Format with proper headings...</code>
					<p class="note">Every. Single. Time.</p>
				</div>
				<div class="comparison-item new">
					<span class="comparison-label">With skills:</span>
					<code>You: Write a blog post about [topic]</code>
					<p class="note">The skill contains all the instructions. Claude follows them automatically.</p>
				</div>
			</div>

			<p><strong>Create the skill:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Create a blog-writer skill in .claude/skills/blog-writer/
It should:
- Read CLAUDE.md for brand voice
- Create SEO-friendly blog posts
- Include: hook, problem, solution sections, CTA
- Output 1200-1800 words
- Save to /content/blog/[slug].md with frontmatter</code></pre>
			</div>

			<p>Claude creates the folder and SKILL.md file.</p>

			<p><strong>Your skill structure:</strong></p>
			<div class="code-block">
				<pre><code>.claude/
└── skills/
    └── blog-writer/
        ├── SKILL.md         # The workflow
        └── assets/
            └── voice-guide.md  # Optional: detailed voice rules</code></pre>
			</div>
		</section>

		<!-- Afternoon Content -->
		<section class="content-section">
			<h2>Afternoon: Build + Ship</h2>

			<h3>5. AI Creates SvelteKit Project (60 min)</h3>

			<p><strong>Now use your workspace to build:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Create a SvelteKit project with TypeScript and Tailwind CSS.
Set it up for Vercel deployment. Follow the tech stack in CLAUDE.md.</code></pre>
			</div>

			<p>Claude will:</p>
			<ol>
				<li>Run the create commands</li>
				<li>Install dependencies</li>
				<li>Configure Tailwind</li>
				<li>Set up the structure</li>
			</ol>

			<p><strong>Verify it works:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Start the dev server</code></pre>
			</div>

			<p>Open <code>http://localhost:5173</code> — default SvelteKit page appears.</p>

			<h3>6. AI Builds Landing Page (75 min)</h3>

			<p><strong>This is where the magic happens.</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Build a landing page based on CLAUDE.md. Include:
- Hero section with headline, subheadline, and CTA
- Problem section (what our users struggle with)
- Solution section (how we solve it)
- Features section (3-4 key features)
- Final CTA section

Use our brand voice. Make it professional with Tailwind.
Dark theme with a green primary color.</code></pre>
			</div>

			<p>Claude will:</p>
			<ol>
				<li>Read CLAUDE.md for context</li>
				<li>Write copy in your voice</li>
				<li>Generate SvelteKit component</li>
				<li>Apply Tailwind styling</li>
				<li>Save to <code>src/routes/+page.svelte</code></li>
			</ol>

			<p><strong>Review at <code>http://localhost:5173</code></strong></p>

			<p><strong>Iterate:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: The headline is too generic. Our audience is [specific].
Make it speak directly to their main frustration.</code></pre>
			</div>

			<div class="info-table">
				<div class="info-row header">
					<span>Weak direction</span>
					<span>Strong direction</span>
				</div>
				<div class="info-row">
					<span>"Make it better"</span>
					<span>"The headline doesn't address our specific pain point"</span>
				</div>
				<div class="info-row">
					<span>"Fix the styling"</span>
					<span>"Add py-20 padding between sections, make buttons green-500"</span>
				</div>
				<div class="info-row">
					<span>"Not quite right"</span>
					<span>"The tone is too casual, make it more confident but still friendly"</span>
				</div>
			</div>

			<h3>7. Deploy to Vercel (45 min)</h3>

			<p><strong>Set up Git:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Initialize git, create a proper .gitignore, and commit everything
with message "Day 1: AI workspace + landing page"</code></pre>
			</div>

			<p><strong>Push to GitHub:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Push to GitHub. Create a new repo called [your-product-name].</code></pre>
			</div>

			<p><strong>Deploy:</strong></p>
			<ol>
				<li>Go to <a href="https://vercel.com/new" target="_blank" rel="noopener">vercel.com/new</a></li>
				<li>Import your GitHub repo</li>
				<li>Click Deploy</li>
				<li>Wait ~60 seconds</li>
			</ol>

			<div class="highlight-box">
				<strong>YOUR SITE IS LIVE.</strong>
				<p>Share the URL. Screenshot it. This is real.</p>
			</div>

			<h3>8. Generate Blog Post + Final Ship (45 min)</h3>

			<p><strong>Use your blog writer skill:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Write a blog post about [topic relevant to your product]</code></pre>
			</div>

			<p>Claude follows your skill workflow and creates the post.</p>

			<p><strong>Add blog to site:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Create a simple /blog page that shows this post.
Add a link to it in the navigation.</code></pre>
			</div>

			<p><strong>Final deploy:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Commit the blog addition and push to GitHub</code></pre>
			</div>

			<p>Vercel auto-deploys. Your site now has content.</p>
		</section>

		<!-- End of Day Checklist -->
		<section class="content-section">
			<h2>End-of-Day Checklist</h2>
			<div class="checklist">
				{#each checklist as item}
					<label class="checklist-item">
						<input type="checkbox" />
						<span>{item}</span>
					</label>
				{/each}
			</div>
		</section>

		<!-- What You Built -->
		<section class="content-section">
			<h2>What You Built Today</h2>
			<div class="summary-table">
				<div class="summary-row">
					<span class="summary-asset">AI Workspace</span>
					<span class="summary-method">CLAUDE.md + skills folder</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Blog Writer Skill</span>
					<span class="summary-method">Reusable workflow for content</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Landing Page</span>
					<span class="summary-method">AI-generated from your context</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Live Website</span>
					<span class="summary-method">Deployed to Vercel</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">First Blog Post</span>
					<span class="summary-method">Generated by your skill</span>
				</div>
			</div>
			<p class="emphasis">Everything after the first hour was AI-assisted. That's the point.</p>
		</section>

		<!-- Meta Lesson -->
		<section class="content-section">
			<div class="callout highlight">
				<h2>The Meta-Lesson</h2>
				<p>Today wasn't about learning to code. It was about learning to <strong>build systems that build things.</strong></p>
				<ul>
					<li><strong>CLAUDE.md</strong> = Your project's brain</li>
					<li><strong>Skills</strong> = Your repeatable workflows</li>
					<li><strong>AI-assisted building</strong> = 10x faster than manual</li>
				</ul>
				<p>Tomorrow you add users. But Claude already knows your project. The hard part is done.</p>
			</div>
		</section>

		<!-- Navigation -->
		<nav class="lesson-nav">
			<a href="/learn/week-1" class="nav-prev">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Week 1 Overview
			</a>
			<a href="/learn/week-1/day-2" class="nav-next">
				Day 2: Users Are Real
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</a>
		</nav>
	</div>
</article>

<style>
	:global(:root) {
		--color-primary: #04A459;
		--color-primary-light: #2ECC71;
		--gradient-accent: linear-gradient(135deg, #04A459 0%, #2ECC71 100%);
		--bg-base: #1a1d23;
		--bg-elevated: #242933;
		--bg-surface: #2e3440;
		--bg-hover: #3b4252;
		--text-primary: #ffffff;
		--text-secondary: #a1a1a1;
		--text-muted: #6b7280;
		--border-subtle: #2e3440;
		--border-default: #3b4252;
		--font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
		--font-body: 'Inter', system-ui, sans-serif;
		--font-mono: 'JetBrains Mono', monospace;
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--radius-xl: 16px;
		--space-1: 0.25rem;
		--space-2: 0.5rem;
		--space-3: 0.75rem;
		--space-4: 1rem;
		--space-5: 1.25rem;
		--space-6: 1.5rem;
		--space-8: 2rem;
		--space-10: 2.5rem;
		--space-12: 3rem;
		--space-16: 4rem;
		--space-20: 5rem;
	}

	:global(*, *::before, *::after) { box-sizing: border-box; }

	:global(body) {
		margin: 0;
		font-family: var(--font-body);
		background: var(--bg-base);
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	/* Navigation */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: var(--space-4) 0;
		background: rgba(26, 29, 35, 0.95);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border-subtle);
	}

	.nav-container {
		position: relative;
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 var(--space-4);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-back {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		color: var(--text-secondary);
		text-decoration: none;
		border-radius: var(--radius-md);
		transition: color 150ms, background 150ms;
	}

	.nav-back:hover {
		color: var(--text-primary);
		background: var(--bg-hover);
	}

	.nav-title {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--font-heading);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		letter-spacing: 0.02em;
		white-space: nowrap;
	}

	.nav-spacer {
		width: 40px;
	}

	/* Article */
	.lesson {
		padding: calc(var(--space-20) + 60px) 0 var(--space-20);
	}

	/* Breadcrumb */
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		margin-bottom: var(--space-8);
	}

	.breadcrumb a {
		color: var(--text-muted);
		text-decoration: none;
	}

	.breadcrumb a:hover { color: var(--color-primary); }

	.breadcrumb .sep { color: var(--text-muted); }

	.breadcrumb .current { color: var(--text-secondary); }

	/* Lesson Header */
	.lesson-header {
		margin-bottom: var(--space-12);
		padding-bottom: var(--space-8);
		border-bottom: 1px solid var(--border-subtle);
	}

	.day-badge {
		display: inline-block;
		padding: var(--space-2) var(--space-4);
		background: var(--gradient-accent);
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 700;
		color: white;
		margin-bottom: var(--space-4);
	}

	.lesson-title {
		font-family: var(--font-heading);
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		font-weight: 800;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.lesson-tagline {
		font-size: 1.125rem;
		font-style: italic;
		color: var(--text-secondary);
		margin: 0;
	}

	/* Content Sections */
	.content-section {
		margin-bottom: var(--space-12);
	}

	.content-section h2 {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.content-section h3 {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: var(--space-8) 0 var(--space-3);
	}

	.content-section p {
		margin: 0 0 var(--space-4);
	}

	.content-section ul, .content-section ol {
		margin: 0 0 var(--space-4);
		padding-left: var(--space-6);
	}

	.content-section li {
		margin-bottom: var(--space-2);
	}

	.content-section a {
		color: var(--color-primary);
	}

	.content-section code {
		font-family: var(--font-mono);
		font-size: 0.875em;
		padding: var(--space-1) var(--space-2);
		background: var(--bg-surface);
		border-radius: var(--radius-sm);
		color: var(--color-primary-light);
	}

	.emphasis {
		font-weight: 600;
		color: var(--text-primary);
	}

	/* Challenge Card */
	.challenge-card {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.challenge-card h2 {
		border: none;
		padding-top: 0;
		margin-top: 0;
	}

	/* Code Blocks */
	.code-block {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		margin: var(--space-4) 0;
		overflow: hidden;
	}

	.code-block pre {
		margin: 0;
		padding: var(--space-4);
		overflow-x: auto;
	}

	.code-block code {
		font-family: var(--font-mono);
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--text-secondary);
		background: none;
		padding: 0;
	}

	.code-block.prompt {
		border-left: 3px solid var(--color-primary);
	}

	.code-block.prompt code {
		color: var(--text-primary);
	}

	/* Comparison */
	.comparison {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin: var(--space-6) 0;
	}

	.comparison-item {
		background: var(--bg-elevated);
		border-radius: var(--radius-md);
		padding: var(--space-4);
	}

	.comparison-item.old {
		border-left: 3px solid #ef4444;
	}

	.comparison-item.new {
		border-left: 3px solid var(--color-primary);
	}

	.comparison-label {
		display: block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		margin-bottom: var(--space-2);
	}

	.comparison-item code {
		display: block;
		font-size: 0.875rem;
		background: none;
		padding: 0;
	}

	.comparison-item .note {
		font-size: 0.8125rem;
		font-style: italic;
		color: var(--text-muted);
		margin: var(--space-2) 0 0;
	}

	/* Info Table */
	.info-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-4) 0;
	}

	.info-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-bottom: 1px solid var(--border-subtle);
	}

	.info-row:last-child {
		border-bottom: none;
	}

	.info-row.header span {
		font-weight: 600;
		color: var(--text-primary);
		background: var(--bg-surface);
	}

	.info-row span {
		padding: var(--space-3) var(--space-4);
		font-size: 0.875rem;
	}

	.info-row span:first-child {
		border-right: 1px solid var(--border-subtle);
		color: var(--text-muted);
	}

	.info-row span:last-child {
		color: var(--text-secondary);
	}

	.info-old, .info-new {
		font-weight: 600;
		color: var(--text-primary) !important;
		background: var(--bg-surface);
	}

	/* Schedule Table */
	.schedule-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-4) 0;
	}

	.schedule-row {
		display: grid;
		grid-template-columns: 120px 1fr 1fr;
		border-bottom: 1px solid var(--border-subtle);
	}

	.schedule-row:last-child {
		border-bottom: none;
	}

	.schedule-row.break {
		background: var(--bg-surface);
		opacity: 0.6;
	}

	.schedule-time, .schedule-activity, .schedule-outcome {
		padding: var(--space-3) var(--space-4);
		font-size: 0.875rem;
	}

	.schedule-time {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		color: var(--text-muted);
		border-right: 1px solid var(--border-subtle);
	}

	.schedule-activity {
		font-weight: 500;
		color: var(--text-primary);
		border-right: 1px solid var(--border-subtle);
	}

	.schedule-outcome {
		color: var(--color-primary);
		font-size: 0.8125rem;
	}

	/* Callout */
	.callout {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-left: 3px solid var(--color-primary);
		border-radius: var(--radius-md);
		padding: var(--space-4);
		margin: var(--space-4) 0;
	}

	.callout.highlight {
		background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-left: 3px solid var(--color-primary);
	}

	.callout h2 {
		border: none;
		padding-top: 0;
		margin-top: 0;
		font-size: 1.25rem;
	}

	.callout ul {
		margin-bottom: 0;
	}

	/* Highlight Box */
	.highlight-box {
		background: var(--gradient-accent);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		text-align: center;
		margin: var(--space-6) 0;
	}

	.highlight-box strong {
		display: block;
		font-family: var(--font-heading);
		font-size: 1.5rem;
		color: white;
		margin-bottom: var(--space-2);
	}

	.highlight-box p {
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
	}

	/* Checklist */
	.checklist {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
	}

	.checklist-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3);
		cursor: pointer;
		border-radius: var(--radius-md);
		transition: background 150ms;
	}

	.checklist-item:hover {
		background: var(--bg-surface);
	}

	.checklist-item input {
		width: 20px;
		height: 20px;
		accent-color: var(--color-primary);
	}

	.checklist-item span {
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	/* Summary Table */
	.summary-table {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		overflow: hidden;
		margin: var(--space-4) 0;
	}

	.summary-row {
		display: grid;
		grid-template-columns: 160px 1fr;
		border-bottom: 1px solid var(--border-subtle);
	}

	.summary-row:last-child {
		border-bottom: none;
	}

	.summary-asset, .summary-method {
		padding: var(--space-3) var(--space-4);
		font-size: 0.9375rem;
	}

	.summary-asset {
		font-weight: 600;
		color: var(--text-primary);
		background: var(--bg-surface);
		border-right: 1px solid var(--border-subtle);
	}

	.summary-method {
		color: var(--text-secondary);
	}

	/* Lesson Nav */
	.lesson-nav {
		display: flex;
		justify-content: space-between;
		gap: var(--space-4);
		padding-top: var(--space-8);
		border-top: 1px solid var(--border-subtle);
		margin-top: var(--space-12);
	}

	.lesson-nav a {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		text-decoration: none;
		color: var(--text-secondary);
		font-weight: 500;
		transition: all 150ms;
	}

	.lesson-nav a:hover {
		border-color: var(--color-primary);
		color: var(--text-primary);
	}

	.nav-next {
		margin-left: auto;
	}
</style>
