<script lang="ts">
	import { page } from '$app/stores';
	const username = $page.params.username;
	const schedule = {
		morning: [
			{ time: "9:00 - 9:30", activity: "Audit Current UX", outcome: "List everything that feels rough" },
			{ time: "9:30 - 10:30", activity: "Modal System", outcome: "Reusable modal component" },
			{ time: "10:30 - 10:45", activity: "Break", outcome: "" },
			{ time: "10:45 - 12:00", activity: "Toast Notifications", outcome: "Global feedback system" }
		],
		afternoon: [
			{ time: "13:00 - 13:30", activity: "Standup: Show your modals", outcome: "Clean, animated dialogs" },
			{ time: "13:30 - 14:30", activity: "Form Validation", outcome: "Real-time, helpful feedback" },
			{ time: "14:30 - 14:45", activity: "Break", outcome: "" },
			{ time: "14:45 - 15:45", activity: "Loading States", outcome: "Skeletons + progress" },
			{ time: "15:45 - 16:30", activity: "Micro-interactions", outcome: "Hover, transitions, details" },
			{ time: "16:30 - 17:00", activity: "Error Handling", outcome: "Graceful failures" },
			{ time: "17:00 - 17:30", activity: "Ship", outcome: "Deploy polished product" }
		]
	};

	const checklist = [
		"All modals animate smoothly",
		"Toasts appear for all actions",
		"Forms validate helpfully",
		"Loading states everywhere",
		"Hover/focus states on all interactive elements",
		"Errors are friendly",
		"Mobile experience is smooth"
	];
</script>

<svelte:head>
	<title>Day 7: Polish Like a Pro | code:zero</title>
	<meta name="description" content="The difference between a project and a product is polish. Make your app feel professional." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/student-portal/{username}/full-stack-web-development/week-2" class="nav-back">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</a>
		<span class="nav-title">Day 7: Polish Like a Pro</span>
		<div class="nav-spacer"></div>
	</div>
</nav>

<article class="lesson">
	<div class="container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/student-portal/{username}">Learn</a>
			<span class="sep">/</span>
			<a href="/student-portal/{username}/full-stack-web-development/week-2">Week 2</a>
			<span class="sep">/</span>
			<span class="current">Day 7</span>
		</nav>

		<!-- Lesson Header -->
		<header class="lesson-header">
			<div class="day-badge">Day 7</div>
			<h1 class="lesson-title">Polish Like a Pro</h1>
			<p class="lesson-tagline">"The difference between a project and a product is polish."</p>
		</header>

		<!-- Challenge -->
		<section class="content-section">
			<div class="challenge-card">
				<h2>The Challenge</h2>
				<p><strong>By end of day, your app feels professional.</strong></p>
				<p>Not "good for a beginner." Actually professional. The kind of polish that makes users trust your product and want to use it.</p>
				<p class="emphasis">Details matter. Today we obsess over them.</p>
			</div>
		</section>

		<!-- What You're Building -->
		<section class="content-section">
			<h2>What You're Building</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Pattern</span>
					<span>What It Does</span>
				</div>
				<div class="info-row">
					<span>Modal system</span>
					<span>Clean dialogs for forms and confirmations</span>
				</div>
				<div class="info-row">
					<span>Toast notifications</span>
					<span>Subtle feedback for user actions</span>
				</div>
				<div class="info-row">
					<span>Form validation</span>
					<span>Real-time feedback, clear errors</span>
				</div>
				<div class="info-row">
					<span>Loading states</span>
					<span>Skeletons, spinners, progress</span>
				</div>
				<div class="info-row">
					<span>Error boundaries</span>
					<span>Graceful failure handling</span>
				</div>
				<div class="info-row">
					<span>Micro-interactions</span>
					<span>Hover, focus, click feedback</span>
				</div>
			</div>
			<div class="highlight-box">
				<strong>The Transformation</strong>
				<p>Your app goes from "it works" to "it feels good."</p>
			</div>
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
			<h2>Morning: Core Patterns</h2>

			<h3>1. Audit Current UX (30 min)</h3>

			<p><strong>Before adding polish, find what's rough:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Audit my app's user experience. Go through every page and interaction.
List everything that:
- Feels janky or unfinished
- Lacks feedback (clicking with no response)
- Has no loading state
- Shows raw errors
- Looks inconsistent

Be harsh. I want to know every rough edge.</code></pre>
			</div>

			<p><strong>Common issues:</strong></p>
			<ul>
				<li>Buttons with no hover state</li>
				<li>Forms with no validation feedback</li>
				<li>Actions with no confirmation</li>
				<li>Errors showing technical messages</li>
				<li>No indication when something is loading</li>
				<li>Inconsistent spacing/colors</li>
			</ul>

			<h3>2. Modal System (60 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Create a reusable modal system for the app.

Build a Modal component that:
- Appears centered with backdrop overlay
- Has smooth enter/exit animations (fade + scale)
- Closes on backdrop click or Escape key
- Traps focus inside (accessibility)
- Prevents body scroll when open
- Supports different sizes (sm, md, lg)

Also create specialized variants:
- ConfirmModal: "Are you sure?" with cancel/confirm
- FormModal: Modal with form inside, handles submit
- AlertModal: Simple message with OK button

Use Svelte transitions for animations.</code></pre>
			</div>

			<p><strong>Replace all your confirm() calls:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Find everywhere I'm using browser confirm() or alert()
and replace with our new modal system. Make the confirmations
feel intentional and branded.</code></pre>
			</div>

			<h3>3. Toast Notifications (75 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Create a toast notification system.

Build:
1. A ToastContainer component (renders at app root)
2. A toast store that any component can use
3. Toast types: success, error, warning, info
4. Auto-dismiss after 5 seconds (configurable)
5. Manual dismiss with X button
6. Stack multiple toasts (newest on top)
7. Smooth enter/exit animations (slide in from right)

Create a simple API:
- toast.success('Item created!')
- toast.error('Something went wrong')
- toast.info('New feature available', {'{'} duration: 10000 {'}'})

Style them to match our brand colors.</code></pre>
			</div>

			<p><strong>Add toasts everywhere:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Add toast notifications for all user actions:
- Creating items: "Note created" (success)
- Deleting items: "Note deleted" (success)
- Errors: Show the error message (error)
- AI completions: "Summary generated" (success)
- Copying to clipboard: "Copied!" (info)

Replace any alert() calls with toasts.</code></pre>
			</div>
		</section>

		<!-- Afternoon Content -->
		<section class="content-section">
			<h2>Afternoon: Details That Matter</h2>

			<h3>4. Form Validation (60 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Improve all forms in the app with proper validation.

For each form:
1. Real-time validation (validate as user types, debounced)
2. Clear error messages below each field
3. Visual states: default, focus, error, success
4. Disable submit until form is valid
5. Show validation on blur (don't yell at users while typing)

Validation rules to add:
- Required fields: "This field is required"
- Email format: "Please enter a valid email"
- Password strength: Show strength meter
- Min/max length: "Must be at least X characters"

Use red for errors, green for valid. Add icons (✓ and ✗).</code></pre>
			</div>

			<h3>5. Loading States (60 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Add comprehensive loading states throughout the app.

1. Skeleton loaders:
   - Create skeleton components for lists, cards, text
   - Show skeletons while data loads
   - Animate with subtle pulse

2. Button loading:
   - Show spinner in button while action processes
   - Disable button to prevent double-clicks
   - Change text: "Save" → "Saving..."

3. Page transitions:
   - Add loading bar at top of page during navigation
   - Smooth fade between pages

4. AI loading:
   - Show progress for multi-step AI operations
   - "Generating..." with animated dots

5. Image loading:
   - Blur placeholder while image loads
   - Fade in when loaded

Replace every loading = true check with proper skeleton/spinner.</code></pre>
			</div>

			<h3>6. Micro-interactions (45 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Add micro-interactions throughout the app.

1. Hover states:
   - Buttons: subtle lift/shadow
   - Cards: slight scale + shadow
   - Links: underline animation

2. Focus states:
   - Visible focus ring (accessibility)
   - Smooth transition on focus

3. Click feedback:
   - Button press effect (scale down slightly)
   - Ripple effect on clickable items

4. Transitions:
   - Page elements fade/slide in on load
   - Lists animate when items added/removed
   - Smooth height transitions for accordions

Keep animations subtle (200-300ms). Nothing should feel slow.</code></pre>
			</div>

			<h3>7. Error Handling (30 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Add comprehensive error handling.

1. Error boundary component:
   - Catches JavaScript errors
   - Shows friendly error message
   - "Something went wrong" + retry button
   - Logs error for debugging

2. API error handling:
   - Network errors: "Connection lost. Retrying..."
   - 400 errors: Show validation message
   - 401 errors: Redirect to login
   - 500 errors: "Server error. Please try again."

3. Empty states:
   - When no data: Show helpful message + CTA
   - When search has no results: "No matches found"
   - When error loading: "Couldn't load. Retry?"

4. Offline handling:
   - Detect offline status
   - Show banner: "You're offline"
   - Queue actions to sync when back online

No more raw error messages. Everything user-friendly.</code></pre>
			</div>
		</section>

		<!-- End-of-Day Checklist -->
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
					<span class="summary-asset">Modal system</span>
					<span class="summary-method">Clean, accessible dialogs</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Toast notifications</span>
					<span class="summary-method">Instant feedback</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Form validation</span>
					<span class="summary-method">Helpful, real-time</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Loading states</span>
					<span class="summary-method">Perceived performance</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Micro-interactions</span>
					<span class="summary-method">Delight in details</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Error handling</span>
					<span class="summary-method">Graceful failures</span>
				</div>
			</div>
			<p class="emphasis">Your app feels professional now. Not because you added features—because you added care.</p>
		</section>

		<!-- Why This Matters -->
		<section class="content-section">
			<div class="callout highlight">
				<h2>Why Polish Matters</h2>
				<div class="info-table" style="margin-top: 1rem;">
					<div class="info-row">
						<span>Unpolished</span>
						<span>Polished</span>
					</div>
					<div class="info-row">
						<span>User wonders if it worked</span>
						<span>Toast confirms action</span>
					</div>
					<div class="info-row">
						<span>User refreshes to check</span>
						<span>Real-time update shows it</span>
					</div>
					<div class="info-row">
						<span>User sees "Error: 500"</span>
						<span>User sees "Try again"</span>
					</div>
					<div class="info-row">
						<span>User waits at blank screen</span>
						<span>User sees loading skeleton</span>
					</div>
					<div class="info-row">
						<span>User questions if button clicked</span>
						<span>Button shows pressed state</span>
					</div>
				</div>
				<p style="margin-top: 1rem;">Polish isn't extra. It's trust. It's professionalism. It's the difference between "this is a demo" and "this is a product."</p>
			</div>
		</section>

		<!-- Troubleshooting -->
		<section class="content-section">
			<h2>Troubleshooting</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Problem</span>
					<span>Solution</span>
				</div>
				<div class="info-row">
					<span>Modal not closing on Escape</span>
					<span>Check event listener is on window</span>
				</div>
				<div class="info-row">
					<span>Toasts appearing behind content</span>
					<span>Verify z-index and portal placement</span>
				</div>
				<div class="info-row">
					<span>Animations janky</span>
					<span>Use transform/opacity only, avoid animating layout</span>
				</div>
				<div class="info-row">
					<span>Focus trap not working</span>
					<span>Check focusable element selector</span>
				</div>
				<div class="info-row">
					<span>Validation too aggressive</span>
					<span>Add debounce, validate on blur not input</span>
				</div>
			</div>
		</section>

		<!-- Practice Exercise -->
		<section class="content-section">
			<h2>Practice Exercise</h2>
			<p>Complete this exercise to solidify today's skills:</p>
			<div class="exercises-grid">
				<a href="/syllabus/week-2/exercises/07-ui-polish.md" class="exercise-card" target="_blank">
					<div class="exercise-header">
						<span class="exercise-type">Solo</span>
						<span class="exercise-duration">60 min</span>
					</div>
					<h3>Professional UI Polish</h3>
					<ul>
						<li>Create accessible modal dialogs with animations</li>
						<li>Build a global toast notification system</li>
						<li>Implement real-time form validation</li>
						<li>Add micro-interactions for polish</li>
					</ul>
				</a>
			</div>
		</section>

		<!-- Navigation -->
		<nav class="lesson-nav">
			<a href="/student-portal/{username}/full-stack-web-development/week-2/day-6" class="nav-prev">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Day 6: Real-Time Magic
			</a>
			<a href="/student-portal/{username}/full-stack-web-development/week-2/day-8" class="nav-next">
				Day 8: Files & Media
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

	.nav-spacer { width: 40px; }

	.lesson {
		padding: calc(var(--space-20) + 60px) 0 var(--space-20);
	}

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

	.content-section p { margin: 0 0 var(--space-4); }

	.content-section ul, .content-section ol {
		margin: 0 0 var(--space-4);
		padding-left: var(--space-6);
	}

	.content-section li { margin-bottom: var(--space-2); }
	.content-section a { color: var(--color-primary); }

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

	.info-row:last-child { border-bottom: none; }

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

	.info-row span:last-child { color: var(--text-secondary); }

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

	.schedule-row:last-child { border-bottom: none; }

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
		font-size: 1.25rem;
		color: white;
		margin-bottom: var(--space-2);
	}

	.highlight-box p {
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
	}

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

	.checklist-item:hover { background: var(--bg-surface); }

	.checklist-item input {
		width: 20px;
		height: 20px;
		accent-color: var(--color-primary);
	}

	.checklist-item span {
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

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

	.summary-row:last-child { border-bottom: none; }

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

	.summary-method { color: var(--text-secondary); }

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

	.nav-next { margin-left: auto; }

	.exercises-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);
		margin-top: var(--space-4);
	}

	.exercise-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		text-decoration: none;
		transition: all 200ms;
	}

	.exercise-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
	}

	.exercise-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-3);
	}

	.exercise-type {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.15);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
	}

	.exercise-duration {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	.exercise-card h3 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-3);
	}

	.exercise-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.exercise-card li {
		font-size: 0.875rem;
		color: var(--text-secondary);
		padding: var(--space-1) 0;
		padding-left: var(--space-4);
		position: relative;
	}

	.exercise-card li::before {
		content: "→";
		position: absolute;
		left: 0;
		color: var(--text-muted);
	}
</style>
