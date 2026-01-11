<script lang="ts">
	const schedule = {
		morning: [
			{ time: "9:00 - 9:30", activity: "Realtime Concepts", outcome: "Understand how it works" },
			{ time: "9:30 - 10:30", activity: "Add Realtime to Core Feature", outcome: "Live data updates" },
			{ time: "10:30 - 10:45", activity: "Break", outcome: "" },
			{ time: "10:45 - 12:00", activity: "Build Presence System", outcome: "See who's online" }
		],
		afternoon: [
			{ time: "13:00 - 13:30", activity: "Standup: Show your realtime", outcome: "Two windows, instant sync" },
			{ time: "13:30 - 14:30", activity: "Live Notifications", outcome: "Instant alerts" },
			{ time: "14:30 - 14:45", activity: "Break", outcome: "" },
			{ time: "14:45 - 16:00", activity: "Activity Feed", outcome: "Real-time stream" },
			{ time: "16:00 - 17:00", activity: "Polish + Edge Cases", outcome: "Production-ready" },
			{ time: "17:00 - 17:30", activity: "Ship", outcome: "Deploy real-time product" }
		]
	};

	const checklist = [
		"Real-time data sync working",
		"Presence shows online users",
		"Notifications arrive instantly",
		"Activity feed updates live",
		"Connection status visible",
		"Works on mobile",
		"No memory leaks (proper cleanup)"
	];
</script>

<svelte:head>
	<title>Day 6: Real-Time Magic | code:zero</title>
	<meta name="description" content="Make your app update in real-time across all users. No refresh button. No polling. Instant updates." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/learn/week-2" class="nav-back">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
		</a>
		<span class="nav-title">Day 6: Real-Time Magic</span>
		<div class="nav-spacer"></div>
	</div>
</nav>

<article class="lesson">
	<div class="container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/learn">Learn</a>
			<span class="sep">/</span>
			<a href="/learn/week-2">Week 2</a>
			<span class="sep">/</span>
			<span class="current">Day 6</span>
		</nav>

		<!-- Lesson Header -->
		<header class="lesson-header">
			<div class="day-badge">Day 6</div>
			<h1 class="lesson-title">Real-Time Magic</h1>
			<p class="lesson-tagline">"Your app stops waiting. Everything updates instantly."</p>
		</header>

		<!-- Challenge -->
		<section class="content-section">
			<div class="challenge-card">
				<h2>The Challenge</h2>
				<p><strong>By end of day, your app updates in real-time across all users.</strong></p>
				<p>No refresh button. No polling. When one user does something, everyone sees it INSTANTLY. Like Google Docs. Like Figma. Like the apps you actually love using.</p>
				<p class="emphasis">This is the moment your product feels alive.</p>
			</div>
		</section>

		<!-- What You're Building -->
		<section class="content-section">
			<h2>What You're Building</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Feature</span>
					<span>What It Does</span>
				</div>
				<div class="info-row">
					<span>Real-time data</span>
					<span>Changes appear instantly for all users</span>
				</div>
				<div class="info-row">
					<span>Presence</span>
					<span>See who's online right now</span>
				</div>
				<div class="info-row">
					<span>Live notifications</span>
					<span>Instant alerts when things happen</span>
				</div>
				<div class="info-row">
					<span>Activity feed</span>
					<span>Real-time stream of what's happening</span>
				</div>
			</div>
			<div class="highlight-box">
				<strong>The WOW Moment</strong>
				<p>Open your app in two browser windows. Do something in one. Watch it appear in the other. Magic.</p>
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
			<h2>Morning: Real-Time Data</h2>

			<h3>1. Realtime Concepts (30 min)</h3>

			<p><strong>How traditional apps work:</strong></p>
			<div class="comparison">
				<div class="comparison-item old">
					<span class="comparison-label">Traditional</span>
					<code>User A creates item → Saved to database → User A sees it<br/>User B refreshes page → Fetches from database → User B finally sees it</code>
				</div>
				<div class="comparison-item new">
					<span class="comparison-label">Real-time</span>
					<code>User A creates item → Saved to database → BROADCAST to all users<br/>User B sees it INSTANTLY → No refresh needed</code>
				</div>
			</div>

			<p>Supabase makes this easy with <strong>Realtime subscriptions</strong>.</p>

			<p><strong>Tell Claude to explain:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Explain how Supabase Realtime works. What are channels,
subscriptions, and broadcasts? Give me a mental model for
thinking about real-time data in my app.</code></pre>
			</div>

			<p><strong>Key concepts:</strong></p>
			<div class="info-table">
				<div class="info-row">
					<span>Channel</span>
					<span>A "room" where updates are broadcast</span>
				</div>
				<div class="info-row">
					<span>Subscription</span>
					<span>Listening to a channel for updates</span>
				</div>
				<div class="info-row">
					<span>Broadcast</span>
					<span>Sending a message to everyone in the channel</span>
				</div>
				<div class="info-row">
					<span>Presence</span>
					<span>Tracking who's currently connected</span>
				</div>
				<div class="info-row">
					<span>Postgres Changes</span>
					<span>Auto-broadcast when database changes</span>
				</div>
			</div>

			<h3>2. Add Realtime to Core Feature (60 min)</h3>

			<p><strong>Tell Claude to add realtime:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Add real-time updates to my [feature] page.

When any user creates, updates, or deletes a [item]:
- All other users should see the change instantly
- No page refresh needed
- The list should update smoothly (not flash/flicker)

Use Supabase Realtime with Postgres Changes.
Show me how to subscribe when the component mounts
and unsubscribe when it unmounts.</code></pre>
			</div>

			<p><strong>Test it (the magic moment):</strong></p>
			<ol>
				<li>Open your app in two browser windows</li>
				<li>Log in as the same user (or two different users)</li>
				<li>Create an item in window 1</li>
				<li>Watch it appear INSTANTLY in window 2</li>
			</ol>

			<p><strong>Iterate:</strong></p>
			<div class="code-block prompt">
				<pre><code>You: When a new item appears, add a subtle highlight animation
so users notice something changed. Fade it in smoothly.</code></pre>
			</div>

			<h3>3. Build Presence System (75 min)</h3>

			<p><strong>Presence = knowing who's online right now.</strong></p>

			<div class="code-block prompt">
				<pre><code>You: Add a presence system to show who's currently online.

Create a component that:
- Shows avatars/names of online users
- Updates in real-time when users join/leave
- Shows a green dot for online status
- Displays in the header or sidebar

Use Supabase Realtime Presence. Track the user's profile
info (name, avatar) in the presence state.</code></pre>
			</div>

			<p><strong>Test it:</strong></p>
			<ol>
				<li>Open app in two browsers (different users)</li>
				<li>See both users appear in "online" list</li>
				<li>Close one browser</li>
				<li>Watch that user disappear from the list</li>
			</ol>
		</section>

		<!-- Afternoon Content -->
		<section class="content-section">
			<h2>Afternoon: Notifications + Activity</h2>

			<h3>4. Live Notifications (60 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Create a real-time notification system.

1. Create a notifications table:
   - id, user_id, message, type, read, created_at
   - Types: info, success, warning, action

2. Create a notification bell component:
   - Shows unread count badge
   - Dropdown with recent notifications
   - Click to mark as read
   - Real-time updates (new notifications appear instantly)

3. Trigger notifications when:
   - Someone interacts with user's content
   - System events happen
   - AI completes a task

Make the bell "ping" with animation when new notification arrives.</code></pre>
			</div>

			<h3>5. Activity Feed (75 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Create a real-time activity feed for the dashboard.

1. Create an activity_log table:
   - id, user_id, action, entity_type, entity_id, metadata, created_at

2. Automatically log activity when users:
   - Create/update/delete items
   - Complete AI tasks
   - Upload files

3. Build an activity feed component:
   - Shows recent activity in real-time
   - Grouped by time (Today, Yesterday, This Week)
   - New activities slide in from top with animation
   - "Load more" for history

This should feel like a live stream of what's happening.</code></pre>
			</div>

			<h3>6. Polish + Edge Cases (60 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Improve the real-time features with better edge case handling:

1. Connection status indicator:
   - Show when connected/disconnected
   - Auto-reconnect when connection drops
   - Queue changes while offline, sync when back

2. Optimistic updates:
   - Show changes immediately (don't wait for server)
   - Roll back if server rejects

3. Conflict resolution:
   - What if two users edit same item?
   - Show "Someone else is editing this" warning

4. Performance:
   - Throttle rapid updates
   - Batch multiple changes
   - Unsubscribe from unused channels</code></pre>
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
					<span class="summary-asset">Real-time data</span>
					<span class="summary-method">Supabase Realtime + Postgres Changes</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Presence system</span>
					<span class="summary-method">Supabase Presence API</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Live notifications</span>
					<span class="summary-method">Real-time subscription + UI</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Activity feed</span>
					<span class="summary-method">Activity logging + live stream</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Connection handling</span>
					<span class="summary-method">Reconnect logic + optimistic updates</span>
				</div>
			</div>
			<p class="emphasis">Your app is ALIVE now. It doesn't wait for users to refresh. It pushes updates to them.</p>
		</section>

		<!-- Why This Matters -->
		<section class="content-section">
			<div class="callout highlight">
				<h2>Why This Matters</h2>
				<p>Real-time isn't just a feature. It changes how users FEEL about your product:</p>
				<div class="info-table" style="margin-top: 1rem;">
					<div class="info-row">
						<span>Without Real-Time</span>
						<span>With Real-Time</span>
					</div>
					<div class="info-row">
						<span>"Is this updated?"</span>
						<span>"I see everything live"</span>
					</div>
					<div class="info-row">
						<span>Refresh, refresh, refresh</span>
						<span>Just watch it happen</span>
					</div>
					<div class="info-row">
						<span>Feels like a form</span>
						<span>Feels like an app</span>
					</div>
					<div class="info-row">
						<span>Working alone</span>
						<span>Working together</span>
					</div>
				</div>
				<p style="margin-top: 1rem;">The products people love—Notion, Figma, Slack—are all real-time. Now yours is too.</p>
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
					<span>Updates not appearing</span>
					<span>Check Realtime is enabled on table in Supabase</span>
				</div>
				<div class="info-row">
					<span>Presence not syncing</span>
					<span>Verify channel name matches across clients</span>
				</div>
				<div class="info-row">
					<span>Memory leak warnings</span>
					<span>Make sure to unsubscribe on component unmount</span>
				</div>
				<div class="info-row">
					<span>Too many updates</span>
					<span>Add throttling/debouncing</span>
				</div>
				<div class="info-row">
					<span>Works locally, not in prod</span>
					<span>Check Supabase Realtime is enabled in project settings</span>
				</div>
			</div>
		</section>

		<!-- Practice Exercise -->
		<section class="content-section">
			<h2>Practice Exercise</h2>
			<p>Complete this exercise to solidify today's skills:</p>
			<div class="exercises-grid">
				<a href="/syllabus/week-2/exercises/06-realtime-features.md" class="exercise-card" target="_blank">
					<div class="exercise-header">
						<span class="exercise-type">Solo</span>
						<span class="exercise-duration">75 min</span>
					</div>
					<h3>Build Real-Time Features</h3>
					<ul>
						<li>Set up Supabase Realtime subscriptions</li>
						<li>Implement live data sync across browser windows</li>
						<li>Build a presence system showing online users</li>
						<li>Handle connection states and cleanup</li>
					</ul>
				</a>
			</div>
		</section>

		<!-- Navigation -->
		<nav class="lesson-nav">
			<a href="/learn/week-2" class="nav-prev">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Week 2 Overview
			</a>
			<a href="/learn/week-2/day-7" class="nav-next">
				Day 7: Polish Like a Pro
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

	.nav-spacer { width: 40px; }

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

	.comparison-item.old { border-left: 3px solid #ef4444; }
	.comparison-item.new { border-left: 3px solid var(--color-primary); }

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
		font-size: 1.25rem;
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

	.nav-next { margin-left: auto; }

	/* Exercises Grid */
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
