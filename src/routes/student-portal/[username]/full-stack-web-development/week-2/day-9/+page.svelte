<script lang="ts">
	import { page } from '$app/stores';
	const username = $page.params.username;
	const schedule = {
		morning: [
			{ time: "9:00 - 9:30", activity: "n8n Introduction", outcome: "Understand the platform" },
			{ time: "9:30 - 10:30", activity: "Welcome Email Workflow", outcome: "First automation working" },
			{ time: "10:30 - 10:45", activity: "Break", outcome: "" },
			{ time: "10:45 - 12:00", activity: "Slack Notifications", outcome: "Team alerts automated" }
		],
		afternoon: [
			{ time: "13:00 - 13:30", activity: "Standup: Show your workflows", outcome: "Demo automations" },
			{ time: "13:30 - 14:30", activity: "Scheduled Workflows", outcome: "Time-based automation" },
			{ time: "14:30 - 14:45", activity: "Break", outcome: "" },
			{ time: "14:45 - 15:45", activity: "Webhook Integration", outcome: "Connect external services" },
			{ time: "15:45 - 16:30", activity: "Your Custom Workflow", outcome: "Build what you need" },
			{ time: "16:30 - 17:00", activity: "Error Handling + Monitoring", outcome: "Production-ready" },
			{ time: "17:00 - 17:30", activity: "Ship", outcome: "All workflows live" }
		]
	};

	const checklist = [
		"Welcome email sends on signup",
		"Slack notifications working",
		"Weekly digest scheduled",
		"Data backup scheduled",
		"Error handling in place",
		"Monitoring dashboard live"
	];
</script>

<svelte:head>
	<title>Day 9: Automate Everything | code:zero</title>
	<meta name="description" content="Your product starts working without you. Welcome emails, Slack alerts, scheduled tasks - all automated." />
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
		<span class="nav-title">Day 9: Automate Everything</span>
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
			<span class="current">Day 9</span>
		</nav>

		<!-- Lesson Header -->
		<header class="lesson-header">
			<div class="day-badge">Day 9</div>
			<h1 class="lesson-title">Automate Everything</h1>
			<p class="lesson-tagline">"Your product starts working without you."</p>
		</header>

		<!-- Challenge -->
		<section class="content-section">
			<div class="challenge-card">
				<h2>The Challenge</h2>
				<p><strong>By end of day, things happen automatically in your product.</strong></p>
				<p>Welcome emails send themselves. Slack gets notified. Data syncs. Reports generate. You build the workflow once, it runs forever.</p>
				<p class="emphasis">This is where your product stops being something you operate and starts being something that operates itself.</p>
			</div>
		</section>

		<!-- What You're Building -->
		<section class="content-section">
			<h2>What You're Building</h2>
			<div class="info-table">
				<div class="info-row header">
					<span>Workflow</span>
					<span>What It Does</span>
				</div>
				<div class="info-row">
					<span>Welcome email</span>
					<span>New user signup → personalized email</span>
				</div>
				<div class="info-row">
					<span>Slack notifications</span>
					<span>Important events → team alert</span>
				</div>
				<div class="info-row">
					<span>Weekly digest</span>
					<span>Scheduled → email summary to users</span>
				</div>
				<div class="info-row">
					<span>Data backup</span>
					<span>Scheduled → export to Google Sheets</span>
				</div>
				<div class="info-row">
					<span>Webhook handler</span>
					<span>External event → action in your app</span>
				</div>
			</div>
			<div class="highlight-box">
				<strong>The Unlock</strong>
				<p>Your product does work while you sleep.</p>
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
			<h2>Morning: First Automations</h2>

			<h3>1. n8n Introduction (30 min)</h3>

			<p><strong>What is n8n?</strong></p>
			<ul>
				<li>Visual workflow automation (like Zapier, but open source)</li>
				<li>Connects services together</li>
				<li>Triggers on events or schedules</li>
				<li>No code required (but can add code)</li>
			</ul>

			<p><strong>Set up n8n:</strong></p>
			<ol>
				<li>Go to <a href="https://n8n.cloud" target="_blank" rel="noopener">n8n.cloud</a> and create free account</li>
				<li>Or self-host (we'll use cloud for simplicity)</li>
			</ol>

			<p><strong>Key concepts:</strong></p>
			<div class="info-table">
				<div class="info-row">
					<span>Workflow</span>
					<span>A sequence of automated steps</span>
				</div>
				<div class="info-row">
					<span>Trigger</span>
					<span>What starts the workflow (webhook, schedule, event)</span>
				</div>
				<div class="info-row">
					<span>Node</span>
					<span>One step in the workflow (an action)</span>
				</div>
				<div class="info-row">
					<span>Execution</span>
					<span>One run of the workflow</span>
				</div>
				<div class="info-row">
					<span>Credentials</span>
					<span>Saved auth for external services</span>
				</div>
			</div>

			<h3>2. Welcome Email Workflow (60 min)</h3>

			<p><strong>Step 1: Create webhook in your app</strong></p>
			<div class="code-block prompt">
				<pre><code>You: Create a webhook endpoint that fires when a new user signs up.

Add to the signup flow:
1. After user created in Supabase Auth
2. After profile created
3. Call webhook with user data: { email, name, signup_date }

Create POST /api/webhooks/new-user that accepts this data
and forwards to an external URL (we'll add n8n URL later).

Also create an admin setting to enable/disable the webhook
and set the webhook URL.</code></pre>
			</div>

			<p><strong>Step 2: Build the n8n workflow</strong></p>
			<div class="code-block">
				<pre><code>In n8n:
1. Add Webhook trigger node
   - Method: POST
   - Copy the webhook URL

2. Add HTTP Request node (to get more user data if needed)
   - Or use the data from webhook directly

3. Add Email node (use n8n's email or connect SendGrid/Resend)
   - To: {`{{ $json.email }}`}
   - Subject: "Welcome to [Product Name]!"
   - Body: Personalized welcome message

4. Test the workflow
   - Click "Listen for test event"
   - Sign up in your app
   - See the workflow execute
   - Check your email</code></pre>
			</div>

			<h3>3. Slack Notifications (75 min)</h3>

			<p><strong>Set up Slack:</strong></p>
			<ol>
				<li>Create a Slack workspace (or use existing)</li>
				<li>Create a channel: <code>#product-alerts</code></li>
				<li>In n8n, add Slack credentials (OAuth)</li>
			</ol>

			<div class="code-block prompt">
				<pre><code>You: Create a notification service that sends events to n8n.

Create src/lib/notifications.ts with:
- notifyNewSignup(user)
- notifyNewContent(content)
- notifyError(error)

Each function POSTs to the n8n webhook with event type and data.
Call these at appropriate places in the app.</code></pre>
			</div>
		</section>

		<!-- Afternoon Content -->
		<section class="content-section">
			<h2>Afternoon: Advanced Automation</h2>

			<h3>4. Scheduled Workflows (60 min)</h3>

			<p><strong>Build a weekly digest:</strong></p>
			<div class="code-block">
				<pre><code>In n8n:
1. Add Schedule trigger
   - Every Monday at 9am

2. Add Supabase node
   - Query: Get all activity from last 7 days
   - Group by user

3. Add Loop node
   - For each user with activity

4. Add AI node (HTTP to Gemini)
   - Summarize user's week in 2-3 sentences

5. Add Email node
   - Send personalized digest to each user
   - Include: activity summary, AI insights, top content</code></pre>
			</div>

			<p><strong>Build a data backup workflow:</strong></p>
			<div class="code-block">
				<pre><code>In n8n:
1. Add Schedule trigger
   - Daily at 2am

2. Add Supabase node
   - Export tables you want backed up

3. Add Google Sheets node (or Airtable)
   - Append data to backup spreadsheet
   - One sheet per table

4. Add Slack notification
   - "✅ Daily backup complete: X rows exported"

Now you have automatic backups running every night.</code></pre>
			</div>

			<h3>5. Webhook Integration (60 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Set up webhook handlers for external services.

Create POST /api/webhooks/[service] endpoints for:
- Stripe: Payment events
- GitHub: Repo events
- Or any service relevant to your product

Each endpoint should:
1. Verify webhook signature (security)
2. Parse the event data
3. Take appropriate action in your app
4. Return 200 OK

Log all webhook events for debugging.</code></pre>
			</div>

			<h3>6. Your Custom Workflow (45 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: I want to automate [specific thing in my product].

Here's what should happen:
- Trigger: [when this happens]
- Action 1: [do this]
- Action 2: [then do this]
- Notification: [tell me/user about it]

Help me design this workflow in n8n.</code></pre>
			</div>

			<p><strong>Ideas based on your product:</strong></p>
			<ul>
				<li>AI generates weekly content on schedule</li>
				<li>User inactivity → re-engagement email</li>
				<li>High usage → upgrade suggestion</li>
				<li>Error spike → PagerDuty alert</li>
				<li>New feature → announcement to all users</li>
			</ul>

			<h3>7. Error Handling + Monitoring (30 min)</h3>

			<div class="code-block prompt">
				<pre><code>You: Add error handling to all my n8n workflows.

For each workflow:
1. Add Error Trigger node
   - Catches any failure in the workflow

2. On error:
   - Send Slack alert with error details
   - Log to error tracking (Supabase table)
   - Retry if appropriate (network errors)

3. Add execution logging:
   - Track every execution
   - Success/failure status
   - Duration

Also show me how to monitor workflows in n8n dashboard.</code></pre>
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
					<span class="summary-asset">Welcome email</span>
					<span class="summary-method">Personalized email sent on signup</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Slack alerts</span>
					<span class="summary-method">Team notified on events</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Weekly digest</span>
					<span class="summary-method">Users get summary every Monday</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Data backup</span>
					<span class="summary-method">Daily backup to Sheets</span>
				</div>
				<div class="summary-row">
					<span class="summary-asset">Custom workflow</span>
					<span class="summary-method">Your trigger → your action</span>
				</div>
			</div>
			<p class="emphasis">Your product operates itself now. Things happen without you clicking buttons.</p>
		</section>

		<!-- Why This Matters -->
		<section class="content-section">
			<div class="callout highlight">
				<h2>Why Automation Matters</h2>
				<div class="info-table" style="margin-top: 1rem;">
					<div class="info-row">
						<span>Without Automation</span>
						<span>With Automation</span>
					</div>
					<div class="info-row">
						<span>"I forgot to send the welcome email"</span>
						<span>Emails send automatically</span>
					</div>
					<div class="info-row">
						<span>"Let me check what happened today"</span>
						<span>Slack shows everything</span>
					</div>
					<div class="info-row">
						<span>"I need to export data manually"</span>
						<span>Backups run every night</span>
					</div>
					<div class="info-row">
						<span>You are the bottleneck</span>
						<span>Product runs itself</span>
					</div>
				</div>
				<p style="margin-top: 1rem;">Automation is how solo founders scale. Your time is too valuable to do repetitive tasks.</p>
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
					<span>Webhook not firing</span>
					<span>Check URL is correct, endpoint returns 200</span>
				</div>
				<div class="info-row">
					<span>n8n execution fails</span>
					<span>Check credentials, test each node individually</span>
				</div>
				<div class="info-row">
					<span>Emails going to spam</span>
					<span>Set up proper email domain (SPF, DKIM)</span>
				</div>
				<div class="info-row">
					<span>Slack not connecting</span>
					<span>Re-authenticate, check permissions</span>
				</div>
				<div class="info-row">
					<span>Schedule not running</span>
					<span>Verify timezone settings in n8n</span>
				</div>
			</div>
		</section>

		<!-- Practice Exercise -->
		<section class="content-section">
			<h2>Practice Exercise</h2>
			<p>Complete this exercise to solidify today's skills:</p>
			<div class="exercises-grid">
				<a href="/syllabus/week-2/exercises/09-n8n-automation.md" class="exercise-card" target="_blank">
					<div class="exercise-header">
						<span class="exercise-type">Guided</span>
						<span class="exercise-duration">90 min</span>
					</div>
					<h3>n8n Automation Workflows</h3>
					<ul>
						<li>Set up n8n and understand workflow concepts</li>
						<li>Create webhook-triggered workflows</li>
						<li>Build scheduled automation</li>
						<li>Connect n8n to your Supabase database</li>
					</ul>
				</a>
			</div>
		</section>

		<!-- Navigation -->
		<nav class="lesson-nav">
			<a href="/student-portal/{username}/full-stack-web-development/week-2/day-8" class="nav-prev">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				Day 8: Files & Media
			</a>
			<a href="/student-portal/{username}/full-stack-web-development/week-2/day-10" class="nav-next">
				Day 10: AI Agents On Autopilot
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
