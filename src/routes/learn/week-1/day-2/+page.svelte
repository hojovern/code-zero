<script lang="ts">
	const schedule = {
		morning: [
			{ time: "9:00 - 9:15", activity: "Standup: Show your live site", outcome: "Day 1 wins" },
			{ time: "9:15 - 10:15", activity: "Supabase Setup", outcome: "Project created + connected" },
			{ time: "10:15 - 10:30", activity: "Break", outcome: "" },
			{ time: "10:30 - 11:30", activity: "Build Auth Pages", outcome: "Sign up + login working" },
			{ time: "11:30 - 12:00", activity: "Protected Routes", outcome: "Dashboard only for logged-in users" }
		],
		afternoon: [
			{ time: "13:00 - 13:30", activity: "Standup: Auth working?", outcome: "Troubleshoot blockers" },
			{ time: "13:30 - 14:30", activity: "Database Fundamentals", outcome: "Tables, queries, RLS" },
			{ time: "14:30 - 14:45", activity: "Break", outcome: "" },
			{ time: "14:45 - 16:00", activity: "User Profiles Table", outcome: "Store + display user data" },
			{ time: "16:00 - 17:00", activity: "Create Auth Skill", outcome: "Reusable pattern" },
			{ time: "17:00 - 17:30", activity: "Ship Check", outcome: "Deploy with auth" }
		]
	};

	const checklist = [
		"Can sign up on live site",
		"Can log in",
		"Dashboard shows profile",
		"Can edit and save profile",
		"Another user can't see my data"
	];
</script>

<svelte:head>
	<title>Day 2: Users Are Real | code:zero</title>
	<meta name="description" content="Add authentication and database to your app. Users can create accounts on YOUR product." />
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
		<span class="nav-title">Day 2: Users Are Real</span>
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
			<span class="current">Day 2</span>
		</nav>

		<header class="lesson-header">
			<div class="day-badge">Day 2</div>
			<h1 class="lesson-title">Users Are Real</h1>
			<p class="lesson-tagline">"Today your app learns who's using it."</p>
		</header>

		<section class="content-section">
			<div class="challenge-card">
				<h2>The Challenge</h2>
				<p><strong>By end of day, users can create accounts on YOUR app.</strong></p>
				<p>Real email addresses. Real passwords. Real users. Your product stops being a demo and starts being software.</p>
			</div>
		</section>

		<section class="content-section">
			<h2>What Changes Today</h2>
			<p>Yesterday you had a website. Today you have an <strong>app</strong>.</p>
			<div class="info-table">
				<div class="info-row header">
					<span>Website</span>
					<span>App</span>
				</div>
				<div class="info-row">
					<span>Same for everyone</span>
					<span>Personalized to each user</span>
				</div>
				<div class="info-row">
					<span>No memory</span>
					<span>Remembers who you are</span>
				</div>
				<div class="info-row">
					<span>Static content</span>
					<span>Dynamic data</span>
				</div>
				<div class="info-row">
					<span>Viewer</span>
					<span>User</span>
				</div>
			</div>
		</section>

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

		<section class="content-section">
			<h2>Morning: Authentication</h2>

			<h3>1. Supabase Setup (60 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Set up Supabase for this project. Create a new project, install the
packages, and configure the environment variables. Follow the tech stack
in CLAUDE.md.</code></pre>
			</div>

			<p><strong>Manual steps (Claude will guide you):</strong></p>
			<ol>
				<li>Go to <a href="https://supabase.com" target="_blank">supabase.com</a></li>
				<li>Create new project (name it after your product)</li>
				<li>Wait for provisioning (~2 min)</li>
				<li>Copy Project URL and anon key from Settings → API</li>
			</ol>

			<h3>2. Build Auth Pages (60 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Create signup and login pages for our app. Use Supabase auth.
Include:
- /signup route with email + password form
- /login route with email + password form
- Proper error handling
- Redirect to /dashboard on success
- Links between signup and login pages

Use our brand styling from CLAUDE.md and the existing Tailwind setup.</code></pre>
			</div>

			<h3>3. Protected Routes (30 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Create a protected /dashboard page that:
- Redirects to /login if not authenticated
- Shows the user's email when logged in
- Has a logout button
- Uses a clean layout</code></pre>
			</div>
		</section>

		<section class="content-section">
			<h2>Afternoon: Database</h2>

			<h3>4. Database Fundamentals (60 min)</h3>
			<div class="info-table">
				<div class="info-row header">
					<span>Concept</span>
					<span>What It Is</span>
				</div>
				<div class="info-row">
					<span>Table</span>
					<span>Collection of related data (profiles, posts)</span>
				</div>
				<div class="info-row">
					<span>Row</span>
					<span>One record (one user's profile)</span>
				</div>
				<div class="info-row">
					<span>Column</span>
					<span>A field (email, name, bio)</span>
				</div>
				<div class="info-row">
					<span>RLS</span>
					<span>Row Level Security — users only see their own data</span>
				</div>
			</div>

			<h3>5. User Profiles Table (75 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Create a profiles table in Supabase with:
- id (references auth.users)
- email
- full_name
- bio
- avatar_url
- created_at

Include:
- RLS policies so users can only see/edit their own profile
- A trigger that creates a profile when a user signs up
- TypeScript types for the profile

Then update the dashboard to:
- Fetch and display the user's profile
- Allow editing name and bio
- Save changes to the database</code></pre>
			</div>

			<h3>6. Create Auth Skill (60 min)</h3>
			<div class="code-block prompt">
				<pre><code>You: Create an auth-setup skill in .claude/skills/auth-setup/
It should document how to:
- Set up Supabase auth in a SvelteKit project
- Create signup/login pages
- Protect routes
- Create user profiles table with RLS</code></pre>
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
				<h2>The Pattern</h2>
				<p>Notice what happened today:</p>
				<ol>
					<li>You told Claude what you needed</li>
					<li>Claude wrote the code</li>
					<li>You reviewed and tested</li>
					<li>You asked for changes</li>
					<li>Claude iterated</li>
				</ol>
				<p>This is AI-first development. You're not writing code from scratch—you're directing AI to build what you need.</p>
				<p><strong>And you created a skill.</strong> Next time you need auth, you have a template.</p>
			</div>
		</section>

		<!-- Practice Exercise -->
		<section class="content-section">
			<h2>Practice Exercise</h2>
			<p>Complete this exercise to solidify today's skills:</p>
			<div class="exercises-grid">
				<a href="/syllabus/week-1/exercises/02-supabase-auth.md" class="exercise-card" target="_blank">
					<div class="exercise-header">
						<span class="exercise-type">Solo</span>
						<span class="exercise-duration">45 min</span>
					</div>
					<h3>Add User Authentication</h3>
					<ul>
						<li>Connect Supabase to your project</li>
						<li>Build signup/login pages</li>
						<li>Create protected routes</li>
						<li>Test the complete auth flow</li>
					</ul>
				</a>
			</div>
		</section>

		<nav class="lesson-nav">
			<a href="/learn/week-1/day-1" class="nav-prev">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Day 1: AI Workspace
			</a>
			<a href="/learn/week-1/day-3" class="nav-next">
				Day 3: Build the Thing
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
		--text-primary: #ffffff;
		--text-secondary: #a1a1a1;
		--text-muted: #6b7280;
		--border-subtle: #2e3440;
		--font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
		--font-body: 'Inter', system-ui, sans-serif;
		--font-mono: 'JetBrains Mono', monospace;
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--space-1: 0.25rem;
		--space-2: 0.5rem;
		--space-3: 0.75rem;
		--space-4: 1rem;
		--space-6: 1.5rem;
		--space-8: 2rem;
		--space-12: 3rem;
		--space-20: 5rem;
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
	.lesson-title { font-family: var(--font-heading); font-size: clamp(1.75rem, 5vw, 2.5rem); font-weight: 800; color: var(--text-primary); margin: 0 0 var(--space-3); letter-spacing: -0.02em; line-height: 1.2; }
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

	.code-block { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin: var(--space-4) 0; overflow: hidden; }
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

	.schedule-table { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; margin: var(--space-4) 0; }
	.schedule-row { display: grid; grid-template-columns: 120px 1fr 1fr; border-bottom: 1px solid var(--border-subtle); }
	.schedule-row:last-child { border-bottom: none; }
	.schedule-row.break { background: var(--bg-surface); opacity: 0.6; }
	.schedule-time, .schedule-activity, .schedule-outcome { padding: var(--space-3) var(--space-4); font-size: 0.875rem; }
	.schedule-time { font-family: var(--font-mono); font-size: 0.8125rem; color: var(--text-muted); border-right: 1px solid var(--border-subtle); }
	.schedule-activity { font-weight: 500; color: var(--text-primary); border-right: 1px solid var(--border-subtle); }
	.schedule-outcome { color: var(--color-primary); font-size: 0.8125rem; }

	.checklist { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-4); }
	.checklist-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); cursor: pointer; border-radius: var(--radius-md); }
	.checklist-item:hover { background: var(--bg-surface); }
	.checklist-item input { width: 20px; height: 20px; accent-color: var(--color-primary); }
	.checklist-item span { font-size: 0.9375rem; color: var(--text-secondary); }

	.callout { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-left: 3px solid var(--color-primary); border-radius: var(--radius-md); padding: var(--space-4); margin: var(--space-4) 0; }
	.callout.highlight { background: linear-gradient(135deg, rgba(4, 164, 89, 0.1) 0%, rgba(4, 164, 89, 0.05) 100%); border: 1px solid rgba(4, 164, 89, 0.3); border-left: 3px solid var(--color-primary); }
	.callout h2 { border: none; padding-top: 0; margin-top: 0; font-size: 1.25rem; }

	.lesson-nav { display: flex; justify-content: space-between; gap: var(--space-4); padding-top: var(--space-8); border-top: 1px solid var(--border-subtle); margin-top: var(--space-12); }
	.lesson-nav a { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-4); background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); text-decoration: none; color: var(--text-secondary); font-weight: 500; transition: all 150ms; }
	.lesson-nav a:hover { border-color: var(--color-primary); color: var(--text-primary); }
	.nav-next { margin-left: auto; }

	/* Exercises Grid */
	.exercises-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-4); margin-top: var(--space-4); }
	@media (min-width: 640px) { .exercises-grid { grid-template-columns: repeat(2, 1fr); } }
	.exercise-card { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-5); text-decoration: none; transition: all 200ms; }
	.exercise-card:hover { border-color: var(--color-primary); transform: translateY(-2px); }
	.exercise-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3); }
	.exercise-type { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary); background: rgba(4, 164, 89, 0.15); padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); }
	.exercise-duration { font-size: 0.8125rem; color: var(--text-muted); }
	.exercise-card h3 { font-family: var(--font-heading); font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0 0 var(--space-3); }
	.exercise-card ul { list-style: none; padding: 0; margin: 0; }
	.exercise-card li { font-size: 0.875rem; color: var(--text-secondary); padding: var(--space-1) 0; padding-left: var(--space-4); position: relative; }
	.exercise-card li::before { content: "→"; position: absolute; left: 0; color: var(--text-muted); }
</style>
