<script lang="ts">
	const productExamples = [
		{ type: "Habit tracker", feature: "Log a habit, see streaks" },
		{ type: "Note-taking app", feature: "Create, edit, list notes" },
		{ type: "Job board", feature: "Post a job, browse jobs" },
		{ type: "Expense tracker", feature: "Add expense, see totals" },
		{ type: "Meal planner", feature: "Add meals, generate shopping list" }
	];

	const checklist = [
		"Landing page → Sign up → Dashboard → Feature",
		"Can create new item",
		"Item appears in list immediately",
		"Can edit item",
		"Can delete item (with confirmation)",
		"Data persists on refresh",
		"RLS working (other users can't see my data)"
	];
</script>

<svelte:head>
	<title>Day 3: Build the Thing | code:zero</title>
	<meta name="description" content="Build your product's core feature. The reason your product exists." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<nav class="navbar">
	<div class="nav-container">
		<a href="/learn/week-1" class="nav-back">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</a>
		<span class="nav-title">Day 3: Build the Thing</span>
		<div class="nav-spacer"></div>
	</div>
</nav>

<article class="lesson">
	<div class="container">
		<nav class="breadcrumb">
			<a href="/learn">Learn</a>
			<span class="sep">/</span>
			<a href="/learn/week-1">Week 1</a>
			<span class="sep">/</span>
			<span class="current">Day 3</span>
		</nav>

		<header class="lesson-header">
			<div class="day-badge">Day 3</div>
			<h1 class="lesson-title">Build the Thing</h1>
			<p class="lesson-tagline">"Today you build what makes your product YOUR product."</p>
		</header>

		<section class="content-section">
			<div class="challenge-card">
				<h2>The Challenge</h2>
				<p><strong>By end of day, your product does something useful.</strong></p>
				<p>Not just auth. Not just a landing page. The CORE FEATURE—the reason your product exists.</p>
			</div>
		</section>

		<section class="content-section">
			<h2>What's Your Core Feature?</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Product Type</span>
					<span>Core Feature Example</span>
				</div>
				{#each productExamples as example}
					<div class="info-row">
						<span>{example.type}</span>
						<span>{example.feature}</span>
					</div>
				{/each}
			</div>
			<p><strong>Your core feature = the minimum thing that delivers value.</strong></p>
		</section>

		<section class="content-section">
			<h2>Morning: The Backend</h2>

			<h3>1. Feature Scoping (30 min)</h3>
			<p>Answer these questions:</p>
			<ol>
				<li><strong>What's the ONE thing your app must do?</strong> Not three things. ONE.</li>
				<li><strong>What data do you need to store?</strong> What fields? What types?</li>
				<li><strong>What can the user do?</strong> Create? Read? Update? Delete?</li>
			</ol>

			<div class="code-block prompt">
				<pre><code>You: My product is [name]. The core feature is [description].
Users need to be able to [actions].
I need to store: [fields and types].
Help me design this feature.</code></pre>
			</div>

			<h3>2. Data Modeling with Claude (60 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Create a database table for [your feature] in Supabase.

The table should store:
- [field 1]: [type and purpose]
- [field 2]: [type and purpose]
- etc.

Include:
- RLS policies so users only see their own data
- Proper foreign key to auth.users
- created_at timestamp

Give me the SQL to run in Supabase SQL Editor.</code></pre>
			</div>

			<h3>3. AI Builds the Backend (75 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Create a TypeScript file for managing [feature] data.

Put it in src/lib/[feature].ts

Include functions for:
- Get all [items] for the current user
- Create a new [item]
- Update an [item]
- Delete an [item]

Use the Supabase client from src/lib/supabase.ts.
Include TypeScript types for the [item].</code></pre>
			</div>
		</section>

		<section class="content-section">
			<h2>Afternoon: The UI</h2>

			<h3>4. AI Builds the UI (90 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Create a page for managing [feature] at /[feature].

The page should:
- Be protected (redirect to /login if not authenticated)
- Show a list of all user's [items]
- Have a button to create new [item]
- Show a form when creating (with fields for [your fields])
- Allow deleting [items]
- Show loading states
- Show empty state when no [items] exist

Use our brand styling from CLAUDE.md. Match the dark theme
with green accents we've been using.</code></pre>
			</div>

			<h3>5. Polish the Flow (75 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Walk me through the complete user journey and make sure
everything connects:

1. Landing page has clear CTA to sign up
2. After signup, redirect to dashboard
3. Dashboard shows profile + link to [feature]
4. [Feature] page is fully functional
5. Navigation works everywhere
6. Logged out users get redirected properly

Fix any gaps you find.</code></pre>
			</div>
		</section>

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

		<section class="content-section">
			<div class="callout highlight">
				<h2>Skills You're Building</h2>
				<p>Today isn't just about your feature. You're learning:</p>
				<ul>
					<li><strong>Data modeling</strong> — How to structure information</li>
					<li><strong>CRUD operations</strong> — The foundation of all apps</li>
					<li><strong>Row Level Security</strong> — How real apps protect user data</li>
					<li><strong>AI-assisted debugging</strong> — Describing problems clearly</li>
					<li><strong>Iterative development</strong> — Build, review, refine</li>
				</ul>
				<p>These skills transfer to any product you build.</p>
			</div>
		</section>

		<nav class="lesson-nav">
			<a href="/learn/week-1/day-2" class="nav-prev">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Day 2: Users Are Real
			</a>
			<a href="/learn/week-1/day-4" class="nav-next">
				Day 4: AI Does the Work
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
		--gradient-accent: linear-gradient(135deg, #04A459 0%, #2ECC71 100%);
		--bg-base: #1a1d23;
		--bg-elevated: #242933;
		--bg-surface: #2e3440;
		--text-primary: #ffffff;
		--text-secondary: #a1a1a1;
		--text-muted: #6b7280;
		--border-subtle: #2e3440;
		--font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
		--font-body: 'Inter', system-ui, sans-serif;
		--font-mono: 'JetBrains Mono', monospace;
		--radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px;
		--space-2: 0.5rem; --space-3: 0.75rem; --space-4: 1rem; --space-6: 1.5rem; --space-8: 2rem; --space-12: 3rem; --space-20: 5rem;
	}
	:global(*, *::before, *::after) { box-sizing: border-box; }
	:global(body) { margin: 0; font-family: var(--font-body); background: var(--bg-base); color: var(--text-secondary); line-height: 1.7; }
	.container { width: 100%; max-width: 800px; margin: 0 auto; padding: 0 var(--space-4); }
	.navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: var(--space-4) 0; background: rgba(26, 29, 35, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-subtle); }
	.nav-container { position: relative; max-width: 1280px; margin: 0 auto; padding: 0 var(--space-4); display: flex; align-items: center; justify-content: space-between; }
	.nav-back { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; color: var(--text-secondary); text-decoration: none; border-radius: var(--radius-md); transition: color 150ms, background 150ms; }
	.nav-back:hover { color: var(--text-primary); background: var(--bg-hover); }
	.nav-title { position: absolute; left: 50%; transform: translateX(-50%); font-family: var(--font-heading); font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); letter-spacing: 0.02em; white-space: nowrap; }
	.nav-spacer { width: 40px; }
	.lesson { padding: calc(var(--space-20) + 60px) 0 var(--space-20); }
	.breadcrumb { display: flex; align-items: center; gap: var(--space-2); font-size: 0.875rem; margin-bottom: var(--space-8); }
	.breadcrumb a { color: var(--text-muted); text-decoration: none; }
	.breadcrumb a:hover { color: var(--color-primary); }
	.breadcrumb .sep { color: var(--text-muted); }
	.breadcrumb .current { color: var(--text-secondary); }
	.lesson-header { margin-bottom: var(--space-12); padding-bottom: var(--space-8); border-bottom: 1px solid var(--border-subtle); }
	.day-badge { display: inline-block; padding: var(--space-2) var(--space-4); background: var(--gradient-accent); border-radius: var(--radius-md); font-size: 0.875rem; font-weight: 700; color: white; margin-bottom: var(--space-4); }
	.lesson-title { font-family: var(--font-heading); font-size: clamp(1.75rem, 5vw, 2.5rem); font-weight: 800; color: var(--text-primary); margin: 0 0 var(--space-3); line-height: 1.2; }
	.lesson-tagline { font-size: 1.125rem; font-style: italic; color: var(--text-secondary); margin: 0; }
	.content-section { margin-bottom: var(--space-12); }
	.content-section h2 { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin: 0 0 var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--border-subtle); }
	.content-section h3 { font-family: var(--font-heading); font-size: 1.125rem; font-weight: 600; color: var(--text-primary); margin: var(--space-8) 0 var(--space-3); }
	.content-section p { margin: 0 0 var(--space-4); }
	.content-section ol, .content-section ul { margin: 0 0 var(--space-4); padding-left: var(--space-6); }
	.content-section li { margin-bottom: var(--space-2); }
	.challenge-card { background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%); border: 1px solid rgba(4, 164, 89, 0.3); border-radius: var(--radius-lg); padding: var(--space-6); }
	.challenge-card h2 { border: none; padding-top: 0; margin-top: 0; }
	.code-block { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin: var(--space-4) 0; }
	.code-block pre { margin: 0; padding: var(--space-4); overflow-x: auto; }
	.code-block code { font-family: var(--font-mono); font-size: 0.875rem; line-height: 1.6; color: var(--text-secondary); }
	.code-block.prompt { border-left: 3px solid var(--color-primary); }
	.code-block.prompt code { color: var(--text-primary); }
	.info-table { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; margin: var(--space-4) 0; }
	.info-row { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border-subtle); }
	.info-row:last-child { border-bottom: none; }
	.info-row.header span { font-weight: 600; color: var(--text-primary); background: var(--bg-surface); }
	.info-row span { padding: var(--space-3) var(--space-4); font-size: 0.875rem; }
	.info-row span:first-child { border-right: 1px solid var(--border-subtle); color: var(--text-muted); }
	.info-row span:last-child { color: var(--text-secondary); }
	.checklist { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-4); }
	.checklist-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); cursor: pointer; border-radius: var(--radius-md); }
	.checklist-item:hover { background: var(--bg-surface); }
	.checklist-item input { width: 20px; height: 20px; accent-color: var(--color-primary); }
	.checklist-item span { font-size: 0.9375rem; color: var(--text-secondary); }
	.callout.highlight { background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%); border: 1px solid rgba(4, 164, 89, 0.3); border-left: 3px solid var(--color-primary); border-radius: var(--radius-md); padding: var(--space-4); }
	.callout.highlight h2 { border: none; padding-top: 0; margin-top: 0; font-size: 1.25rem; }
	.lesson-nav { display: flex; justify-content: space-between; gap: var(--space-4); padding-top: var(--space-8); border-top: 1px solid var(--border-subtle); margin-top: var(--space-12); }
	.lesson-nav a { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-4); background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); text-decoration: none; color: var(--text-secondary); font-weight: 500; }
	.lesson-nav a:hover { border-color: var(--color-primary); color: var(--text-primary); }
	.nav-next { margin-left: auto; }
</style>
