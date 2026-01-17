<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	// Skills data - ranked by daily usefulness
	const skills = [
		{
			id: 'commit',
			name: 'commit',
			rank: 1,
			trigger: '/commit',
			type: 'Workflow',
			category: 'Development',
			description: 'Commit all changes and push to GitHub with well-crafted messages.',
			icon: '📤',
			prompt: `You are a Git Commit Assistant. When the user says /commit:

1. Run pre-commit quality checks (build/lint)
2. Run git status and git diff to understand changes
3. Check recent commits for message style
4. Stage all changes with git add -A
5. Write a commit message following conventional commits:
   - feat: new feature
   - fix: bug fix
   - refactor: code restructuring
   - style: formatting, CSS
   - docs: documentation
   - chore: maintenance
6. Commit and push to GitHub

Always end commit messages with:
Co-Authored-By: Claude <noreply@anthropic.com>`
		},
		{
			id: 'blog-writer',
			name: 'blog-writer',
			rank: 2,
			trigger: '/blog-writer',
			type: 'Workflow',
			category: 'Content',
			description: 'Automated SEO blog writer. Researches competitors, generates optimized articles.',
			icon: '✍️',
			prompt: `You are an SEO Blog Writer. When given a topic:

1. Research the top 5 ranking articles for the keyword
2. Analyze their structure, word count, and headers
3. Identify gaps and angles they missed
4. Create an outline with SEO-optimized H2/H3 headers
5. Write the article with:
   - Problem-first opening (no fluff intros)
   - Practical examples and code snippets
   - Clear, scannable sections
   - 1500-2500 words
6. Output in Markdown format

Tone: Technical but accessible. Write like a developer explaining to a developer.`
		},
		{
			id: 'think-harder',
			name: 'think-harder',
			rank: 3,
			trigger: '/think-harder',
			type: 'System',
			category: 'Intelligence',
			description: 'Spawns specialized agents (Critic, Research, Memory) for complex tasks.',
			icon: '🧠',
			prompt: `You are an Intelligence Amplification System. For complex tasks:

1. RESEARCH: Before acting, investigate thoroughly
   - Read all relevant files
   - Understand existing patterns
   - Check for constraints

2. DECOMPOSE: Break the task into steps
   - Each step must be verifiable
   - Identify dependencies between steps
   - Flag risks early

3. EXECUTE: Complete each step
   - Verify before moving on
   - Document decisions

4. CRITIC: Review your own work
   - What could break?
   - What did I miss?
   - Is this the simplest solution?

5. SYNTHESIZE: Combine into coherent output

Never skip the critic step. Find flaws before the user does.`
		},
		{
			id: 'branded-deck',
			name: 'branded-deck',
			rank: 4,
			trigger: '/deck',
			type: 'Workflow',
			category: 'Design',
			description: 'Create branded presentations with consistent styling for pitches and proposals.',
			icon: '📊',
			prompt: `You are a Presentation Designer. When creating slides:

Brand Colors:
- Primary: Navy #213555
- Secondary: Slate Blue #3E5879
- Background: Beige #D8C4B6
- Text: Cream #F5EFE7

Rules:
- 6x6 max: 6 bullets, 6 words each
- One idea per slide
- Use visuals over text
- Title slides: Bold statement, no bullets
- Data slides: One chart, one insight

Structure:
1. Hook slide (problem or question)
2. Context (3-4 slides)
3. Solution (3-4 slides)
4. Proof/results (2-3 slides)
5. Call to action

Output as .pptx file.`
		},
		{
			id: 'keyword-research',
			name: 'keyword-research',
			rank: 5,
			trigger: '/keywords',
			type: 'Workflow',
			category: 'Research',
			description: 'SEO keyword research and opportunity analysis. Finds gaps and question keywords.',
			icon: '🔍',
			prompt: `You are an SEO Keyword Researcher. When given a topic:

1. Generate 20-30 related keywords
2. For each keyword, analyze:
   - Search volume estimate
   - Competition level (low/medium/high)
   - Search intent (informational/transactional/navigational)
3. Find question keywords ("how to", "what is", "why does")
4. Identify long-tail opportunities (3+ words, lower competition)
5. Rank by opportunity score: high volume + low competition = best

Output format:
| Keyword | Volume | Difficulty | Intent | Priority |
|---------|--------|------------|--------|----------|

Focus on keywords we can realistically rank for within 3-6 months.`
		},
		{
			id: 'instagram-content',
			name: 'instagram-content',
			rank: 6,
			trigger: '/instagram',
			type: 'Workflow',
			category: 'Content',
			description: 'Generate complete Instagram posts with captions and on-brand graphics.',
			icon: '📸',
			prompt: `You are an Instagram Content Creator. When creating a post:

Caption Structure:
1. Hook (first line that stops the scroll)
2. Value (teach something in 3-5 lines)
3. CTA (ask a question or prompt action)
4. Hashtags (5-10 relevant, mix of sizes)

Visual Style:
- Dark tech aesthetic (#1a1d23 background)
- Neon green accents (#04A459)
- Bold, clean typography
- Geometric shapes, chevrons
- 1080x1080 or 1080x1350

Tone: Confident, direct, builder-to-builder. No fluff, no "Hey guys!"

Output:
1. Caption text
2. Image description for graphic
3. Best posting time suggestion`
		},
		{
			id: 'web-design',
			name: 'web-design',
			rank: 7,
			trigger: 'Auto-consult',
			type: 'Reference',
			category: 'Design',
			description: 'UI/UX patterns and components. Modals, buttons, animations, interactive elements.',
			icon: '🎨',
			prompt: `You are a Web Design System enforcer. When building UI:

Typography Scale (only these sizes):
- 0.8rem: meta, tags, labels
- 0.9rem: body text
- 1rem: card titles
- 1.1rem: intro paragraphs
- 2-2.5rem: page headings

Colors:
- Background: #1a1d23
- Elevated: #242933
- Primary: #04A459 (green)
- Text: #ffffff, #a0a0a0, #666666

Patterns:
- Buttons: gradient background, glow on hover
- Cards: 1px border, lift on hover
- Modals: backdrop blur, close button rotates 90° on hover
- Inputs: dark bg, green border on focus

Always use CSS variables. Never hardcode colors.`
		},
		{
			id: 'clean-code',
			name: 'clean-code',
			rank: 8,
			trigger: 'Auto-apply',
			type: 'Reference',
			category: 'Development',
			description: 'Prevents tech debt. Check duplication, extract on 2nd use, proactive refactoring.',
			icon: '🧹',
			prompt: `You are a Clean Code Enforcer. Before writing any code:

1. CHECK FOR DUPLICATION FIRST
   - Search for similar existing code
   - Don't create what already exists

2. EXTRACT ON 2ND USE
   - If you copy-paste once, extract to shared module
   - Don't wait for the 5th copy

3. SIZE LIMITS
   - Components: < 300 lines
   - Modules: < 400 lines
   - Functions: < 50 lines

4. COMPOSITION OVER COPYING
   - Build from reusable pieces
   - Prefer small, focused components

5. PROACTIVE REFACTORING
   - If file is too large, split before adding more
   - If pattern repeats 3x, extract utility

Say this when needed:
"Before I add this, I notice [issue]. Let me refactor first."`
		},
		{
			id: 'course-builder',
			name: 'course-builder',
			rank: 9,
			trigger: '/build-course',
			type: 'Workflow',
			category: 'Education',
			description: 'Master skill that builds complete courses by chaining all syllabus skills.',
			icon: '📚',
			prompt: `You are a Course Builder. When creating a course:

Phase 1 - ARCHITECT
- Define learning outcomes
- Map the journey from beginner to outcome
- Structure into modules and lessons
- Estimate time per section

Phase 2 - WRITE LESSONS
- Each lesson: concept → example → exercise
- Keep theory minimal, practice heavy
- Include verification checkpoints

Phase 3 - CREATE EXERCISES
- Hands-on coding challenges
- Starter code provided
- Clear success criteria

Phase 4 - REVIEW
- Check for gaps and redundancy
- Verify pacing
- Ensure outcomes are achievable

Phase 5 - MAP OUTCOMES
- Connect lessons to job skills
- Define portfolio pieces
- Identify interview talking points

Output complete, publish-ready curriculum.`
		},
		{
			id: 'typography-audit',
			name: 'typography-audit',
			rank: 10,
			trigger: '/typography-audit',
			type: 'Workflow',
			category: 'Development',
			description: 'Scan Svelte files for typography inconsistencies, report and fix violations.',
			icon: '🔤',
			prompt: `You are a Typography Auditor. When scanning files:

ALLOWED SIZES:
0.8rem, 0.9rem, 1rem, 1.1rem, 1.5rem, 2rem, 2.5rem

VIOLATIONS TO DETECT:
- 0.875rem → should be 0.9rem
- 0.9375rem → should be 0.9rem or 1rem
- 0.8125rem → should be 0.8rem
- 1.125rem → should be 1rem or 1.1rem

WEIGHT RULES:
- 700: only for h1
- 500: for titles and labels
- 400: for body text
- 600: rarely used, flag for review

LINE-HEIGHT:
- 1.7 for body text
- 1.5 for headings
- Flag 1.6 as non-standard

Report format:
file.svelte:42 - font-size: 0.875rem → 0.9rem`
		},
		{
			id: 'learn',
			name: 'learn',
			rank: 11,
			trigger: 'Auto-run',
			type: 'System',
			category: 'Memory',
			description: 'Mid-session learning capture. Automatically captures corrections and preferences.',
			icon: '💡',
			prompt: `You are a Learning Capture System. Monitor for:

TRIGGERS:
- User corrects your output
- User says "I prefer...", "always...", "never..."
- User rejects an approach
- User enthusiastically accepts something

WHEN TRIGGERED:
1. Identify what to learn (be specific)
2. Categorize:
   - Preference (how user likes things)
   - Pattern (what works)
   - Avoid (what doesn't work)
3. Save to memory immediately
4. Confirm briefly: "Noted: [learning]"

FORMAT:
- [Specific, actionable learning] (date)

Examples:
- "Use 0.9rem not 0.875rem for body text"
- "Never use the word 'cohort' - use 'intake'"
- "Keep headlines under 8 words"

Don't wait for session end. Capture immediately.`
		},
		{
			id: 'close',
			name: 'close',
			rank: 12,
			trigger: '/close',
			type: 'System',
			category: 'Session',
			description: 'Session closer with learning capture. Creates session log for continuity.',
			icon: '👋',
			prompt: `You are a Session Closer. When user signals end of session:

TRIGGERS:
"bye", "thanks", "done", "goodbye", "see you", "that's all"

ACTIONS:
1. Review conversation for learnings
2. Capture any uncaptured preferences/patterns
3. Create session summary:
   - What was accomplished
   - Decisions made
   - Open threads for next time
4. Save to /sessions/YYYY-MM-DD-HHMMSS.md
5. Confirm: "Session saved. See you next time."

SESSION LOG FORMAT:
## Summary
[2-3 sentences of what happened]

## Completed
- [task 1]
- [task 2]

## Open Threads
- [thing to continue next time]

## Learnings
- [any new preferences discovered]`
		}
	];

	// State
	let searchQuery = $state('');
	let selectedType = $state('All');
	let expandedId = $state<string | null>(null);
	let copiedId = $state<string | null>(null);

	// Types for filtering
	const types = ['All', 'Workflow', 'Reference', 'System'];

	// Filter skills
	let filteredSkills = $derived(() => {
		let result = skills;

		if (selectedType !== 'All') {
			result = result.filter(s => s.type === selectedType);
		}

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(s =>
				s.name.toLowerCase().includes(query) ||
				s.description.toLowerCase().includes(query) ||
				s.trigger.toLowerCase().includes(query)
			);
		}

		return result;
	});

	function toggleExpand(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	async function copyPrompt(skill: typeof skills[0]) {
		await navigator.clipboard.writeText(skill.prompt);
		copiedId = skill.id;
		setTimeout(() => copiedId = null, 2000);
	}

	function getTypeColor(type: string) {
		switch (type) {
			case 'Workflow': return 'var(--color-primary)';
			case 'Reference': return '#F59E0B';
			case 'System': return '#8B5CF6';
			default: return 'var(--text-muted)';
		}
	}
</script>

<svelte:head>
	<title>Skills | code:zero</title>
	<meta name="description" content="Workflows, references, and automation tools that extend AI capabilities. Type the trigger or let them run automatically." />
</svelte:head>

<Navbar />

<main class="skills-page">
	<div class="skills-container">
		<!-- Breadcrumb -->
		<nav class="breadcrumb">
			<a href="/">Home</a>
			<span class="separator">»</span>
			<span>Skills</span>
		</nav>

		<!-- Header -->
		<header class="skills-header">
			<h1>Skills</h1>
			<p class="skills-intro">
				<em>Workflows, references, and automation tools that extend AI capabilities. Type the trigger command or let them run automatically.</em>
			</p>
			<p class="skills-ranking-note">The most useful skills we use daily, ranked.</p>
		</header>

		<!-- Filter Bar -->
		<div class="filter-bar">
			<div class="search-container">
				<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"/>
					<path d="m21 21-4.3-4.3"/>
				</svg>
				<input
					type="text"
					placeholder="Search skills..."
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>

			<div class="filter-selects">
				<div class="select-wrapper">
					<select bind:value={selectedType} class="filter-select">
						{#each types as type}
							<option value={type}>{type} {type === 'All' ? `(${skills.length})` : `(${skills.filter(s => s.type === type).length})`}</option>
						{/each}
					</select>
					<svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="m6 9 6 6 6-6"/>
					</svg>
				</div>
			</div>
		</div>

		<!-- Results count -->
		<div class="results-count">
			Showing {filteredSkills().length} skills
		</div>

		<!-- Skills List -->
		<ul class="skills-list">
			{#each filteredSkills() as skill (skill.id)}
				<li class="skill-item" class:expanded={expandedId === skill.id}>
					<button class="skill-row" onclick={() => toggleExpand(skill.id)}>
						<span class="skill-rank">#{skill.rank}</span>
						<span class="skill-icon">{skill.icon}</span>
						<span class="skill-name">{skill.name}</span>
						<span class="skill-description">{skill.description}</span>
						<div class="skill-meta">
							<code class="skill-trigger">{skill.trigger}</code>
							<span class="skill-type" style="--type-color: {getTypeColor(skill.type)}">{skill.type}</span>
						</div>
						<svg class="expand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</button>

					{#if expandedId === skill.id}
						<div class="skill-expanded">
							<div class="prompt-box">
								<div class="prompt-header">
									<span class="prompt-label">System Prompt</span>
									<button
										class="copy-btn"
										class:copied={copiedId === skill.id}
										onclick={() => copyPrompt(skill)}
									>
										{#if copiedId === skill.id}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<polyline points="20 6 9 17 4 12"/>
											</svg>
											Copied!
										{:else}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
												<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
											</svg>
											Copy Prompt
										{/if}
									</button>
								</div>
								<pre class="prompt-code"><code>{skill.prompt}</code></pre>
							</div>
						</div>
					{/if}
				</li>
			{:else}
				<li class="no-skills">
					<p>No skills found matching your criteria.</p>
				</li>
			{/each}
		</ul>
	</div>
</main>

<style>
	/* Page Layout */
	.skills-page {
		min-height: 100vh;
		padding: calc(80px + var(--space-12)) 0 var(--space-24);
		background: var(--bg-base);
	}

	.skills-container {
		max-width: 1520px;
		margin: 0 auto;
		padding: 0 var(--space-8);
	}

	/* Breadcrumb */
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-bottom: var(--space-4);
	}

	.breadcrumb a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}

	.breadcrumb a:hover {
		color: var(--text-primary);
	}

	.breadcrumb .separator {
		opacity: 0.5;
	}

	/* Header */
	.skills-header {
		margin-bottom: var(--space-8);
	}

	.skills-header h1 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
		letter-spacing: -0.02em;
	}

	.skills-intro {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.skills-intro em {
		font-style: italic;
	}

	.skills-ranking-note {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--color-primary);
		margin-top: var(--space-4);
	}

	/* Filter Bar */
	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}

	.search-container {
		position: relative;
		flex: 1;
		min-width: 280px;
	}

	.search-icon {
		position: absolute;
		left: var(--space-4);
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-muted);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--space-3) var(--space-4);
		padding-left: calc(var(--space-4) + 26px);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.95rem;
		transition: border-color 0.2s;
	}

	.search-input::placeholder {
		color: var(--text-muted);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.filter-selects {
		display: flex;
		gap: var(--space-3);
	}

	.select-wrapper {
		position: relative;
	}

	.filter-select {
		appearance: none;
		padding: var(--space-3) var(--space-10) var(--space-3) var(--space-4);
		background: var(--bg-elevated);
		border: 1px solid var(--color-primary);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		cursor: pointer;
		min-width: 160px;
	}

	.filter-select:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.select-arrow {
		position: absolute;
		right: var(--space-3);
		top: 50%;
		transform: translateY(-50%);
		color: var(--text-muted);
		pointer-events: none;
	}

	/* Results */
	.results-count {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-bottom: var(--space-6);
	}

	/* Skills List */
	.skills-list {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.skill-item {
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.skill-item:last-child {
		border-bottom: none;
	}

	.skill-row {
		display: flex;
		align-items: flex-start;
		gap: var(--space-4);
		padding: var(--space-5) 0;
		width: 100%;
		background: none;
		border: none;
		color: inherit;
		text-align: left;
		cursor: pointer;
		transition: all 0.2s;
	}

	.skill-row:hover {
		transform: translateX(4px);
	}

	.skill-row:hover .skill-name {
		color: var(--color-primary);
	}

	.skill-rank {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-muted);
		min-width: 28px;
		flex-shrink: 0;
	}

	.skill-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.skill-name {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
		transition: color 0.2s;
		flex-shrink: 0;
		min-width: 160px;
	}

	.skill-description {
		font-size: 0.9rem;
		color: var(--text-secondary);
		flex: 1;
		padding-right: var(--space-4);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.5;
	}

	.skill-meta {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-shrink: 0;
	}

	.skill-trigger {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-primary);
		background: rgba(4, 164, 89, 0.1);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
	}

	.skill-type {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: color-mix(in srgb, var(--type-color) 15%, transparent);
		border: 1px solid color-mix(in srgb, var(--type-color) 30%, transparent);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--type-color);
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.expand-icon {
		flex-shrink: 0;
		color: var(--text-muted);
		transition: transform 0.2s;
	}

	.skill-item.expanded .expand-icon {
		transform: rotate(180deg);
	}

	/* Expanded Content */
	.skill-expanded {
		padding: 0 0 var(--space-6) var(--space-10);
		animation: slideDown 0.2s ease;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Prompt Box */
	.prompt-box {
		background: var(--bg-elevated);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.prompt-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-3) var(--space-4);
		background: rgba(4, 164, 89, 0.08);
		border-bottom: 1px solid rgba(4, 164, 89, 0.2);
	}

	.prompt-label {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 500;
	}

	.prompt-code {
		margin: 0;
		padding: var(--space-4);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.7;
		color: var(--text-secondary);
		white-space: pre-wrap;
		overflow-x: auto;
	}

	.copy-btn {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-md);
		color: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.copy-btn:hover {
		background: rgba(4, 164, 89, 0.2);
	}

	.copy-btn.copied {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	.details-code {
		margin: 0;
		padding: var(--space-4);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.7;
		color: var(--text-secondary);
		white-space: pre-wrap;
		overflow-x: auto;
	}

	/* No Results */
	.no-skills {
		padding: var(--space-12);
		text-align: center;
		color: var(--text-muted);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.skills-container {
			padding: 0 var(--space-4);
		}

		.skills-header h1 {
			font-size: 2rem;
		}

		.filter-bar {
			flex-direction: column;
		}

		.search-container {
			min-width: 100%;
		}

		.filter-selects {
			width: 100%;
		}

		.filter-select {
			width: 100%;
		}

		.skill-row {
			flex-wrap: wrap;
		}

		.skill-description {
			width: 100%;
			order: 10;
			margin-top: var(--space-2);
			padding-left: calc(28px + var(--space-4) + 1.25rem + var(--space-4));
		}

		.skill-meta {
			margin-left: auto;
		}

		.skill-expanded {
			padding-left: var(--space-5);
		}
	}
</style>
