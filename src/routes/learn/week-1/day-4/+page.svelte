<script lang="ts">
	const aiFeatures = [
		{ product: "Notes app", feature: "Summarize long notes", value: "Save reading time" },
		{ product: "Expense tracker", feature: "Categorize expenses automatically", value: "No manual tagging" },
		{ product: "Job board", feature: "Generate job descriptions", value: "Faster posting" },
		{ product: "Meal planner", feature: "Suggest recipes from ingredients", value: "Reduce food waste" },
		{ product: "Habit tracker", feature: "Motivational messages", value: "Encouragement" }
	];

	const promptTips = [
		{ principle: "Be specific about output format", example: '"Reply with ONLY the category name"' },
		{ principle: "Constrain responses", example: '"Choose from: [list of options]"' },
		{ principle: "Give examples", example: '"Like this: Fixed bug → Bug Fix"' },
		{ principle: "Set the role", example: '"You are a helpful assistant that..."' },
		{ principle: "Limit length", example: '"In exactly one sentence"' }
	];

	const checklist = [
		"AI feature works on deployed site",
		"Loading states visible",
		"Error handling works",
		"Response times acceptable"
	];
</script>

<svelte:head>
	<title>Day 4: AI Does the Work | code:zero</title>
	<meta name="description" content="Add AI to your product. Make it intelligent. AI solves a real problem for users." />
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
		<span class="nav-title">Day 4: AI Does the Work</span>
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
			<span class="current">Day 4</span>
		</nav>

		<header class="lesson-header">
			<div class="day-badge">Day 4</div>
			<h1 class="lesson-title">AI Does the Work</h1>
			<p class="lesson-tagline">"Today your product gets a brain."</p>
		</header>

		<section class="content-section">
			<div class="challenge-card">
				<h2>The Challenge</h2>
				<p><strong>By end of day, AI is working inside YOUR product.</strong></p>
				<p>Not a chatbot you made for fun. AI solving a REAL problem for YOUR users.</p>
			</div>
		</section>

		<section class="content-section">
			<h2>AI Feature Ideas</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Product</span>
					<span>AI Feature</span>
				</div>
				{#each aiFeatures as item}
					<div class="info-row">
						<span>{item.product}</span>
						<span>{item.feature}</span>
					</div>
				{/each}
			</div>
			<p><strong>Your AI feature should:</strong> Solve a real friction point, not just be cool.</p>
		</section>

		<section class="content-section">
			<h2>Morning: Connect to AI</h2>

			<h3>1. AI Feature Planning (30 min)</h3>
			<p>Answer these questions:</p>
			<ol>
				<li><strong>What's the user friction?</strong> What takes time or is annoying?</li>
				<li><strong>How can AI help?</strong> What would AI generate/analyze/transform?</li>
				<li><strong>What's the input?</strong> What data goes TO the AI?</li>
				<li><strong>What's the output?</strong> What comes BACK from the AI?</li>
			</ol>

			<h3>2. API Setup with Claude (60 min)</h3>
			<p><strong>Get your API key:</strong></p>
			<ol>
				<li>Go to <a href="https://aistudio.google.com" target="_blank">Google AI Studio</a></li>
				<li>Click "Get API key"</li>
				<li>Create a key (free tier: 60 requests/minute)</li>
			</ol>

			<div class="code-block prompt">
				<pre><code>You: Set up Gemini AI for this project.

My API key is: [your key]

Create:
- Environment variable setup
- A reusable AI utility function in src/lib/ai.ts
- A test function to verify it works

Use the Gemini 1.5 Flash model. Make sure the API key
isn't exposed to the client (server-side only).</code></pre>
			</div>

			<h3>3. AI Builds the AI Function (75 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Create my [feature name] AI function.

It should:
- Take [input description] as input
- Send a prompt to Gemini that [what the prompt should do]
- Return [expected output]

The prompt should be specific about the format I want back.
Put it in src/lib/ai.ts alongside the general Gemini function.</code></pre>
			</div>
		</section>

		<section class="content-section">
			<h2>Afternoon: Integrate & Polish</h2>

			<h3>4. Integrate into Product (60 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Add my AI [feature] to the [page/component].

Add a button that says "[action with AI]".
When clicked:
- Show a loading state
- Call the AI function
- Display the result
- Let the user dismiss or use the result

Make it feel smooth and professional.</code></pre>
			</div>

			<h3>5. Error Handling + Polish (75 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Improve the AI integration with proper error handling:

1. Rate limiting - if user clicks too fast, debounce
2. API errors - show friendly message, not technical error
3. Timeout - if AI takes too long, show message and allow retry
4. Empty input - don't call AI if there's nothing to process
5. Loading states - make sure user knows something is happening

Also add retry logic: if the call fails, try once more.</code></pre>
			</div>
		</section>

		<section class="content-section">
			<h2>Prompt Engineering Tips</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Principle</span>
					<span>Example</span>
				</div>
				{#each promptTips as tip}
					<div class="info-row">
						<span>{tip.principle}</span>
						<span>{tip.example}</span>
					</div>
				{/each}
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
				<h2>The AI-First Pattern</h2>
				<p>Notice what happened:</p>
				<ul>
					<li>Read Gemini docs for hours → <strong>Tell Claude to set it up</strong></li>
					<li>Trial-and-error prompts → <strong>Claude writes effective prompts</strong></li>
					<li>Debug API integration → <strong>Claude handles edge cases</strong></li>
					<li>Write error handling from scratch → <strong>Claude adds production-ready UX</strong></li>
				</ul>
				<p>You're not just building—you're building WITH AI, about AI, for AI-powered products.</p>
			</div>
		</section>

		<nav class="lesson-nav">
			<a href="/learn/week-1/day-3" class="nav-prev">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Day 3: Build the Thing
			</a>
			<a href="/learn/week-1/day-5" class="nav-next">
				Day 5: Content Engine
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
	.content-section a { color: var(--color-primary); }
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
