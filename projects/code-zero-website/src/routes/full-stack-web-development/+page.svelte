<script lang="ts">
	import { openLoginModal, openApplyModal } from '$lib/stores/auth';

	let { data } = $props();

	function handleApply(e) {
		e.preventDefault();
		openApplyModal();
	}

	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	const faqs = [
		{
			question: "Do I need coding experience?",
			answer: "Some basics help, but you don't need to be a developer. If you can follow a tutorial and Google your way through errors, you're ready. We teach the stack from scratch — what matters is your commitment to finish."
		},
		{
			question: "What's the time commitment?",
			answer: "Weekdays 9am-5pm for 4 weeks. Mornings are async (online materials), afternoons are live building in Penang. Weekends are yours to explore."
		},
		{
			question: "Do I need a product idea?",
			answer: "Ideally yes — you'll get more out of it if you're building something you care about. But if you're not sure, we'll help you find an idea in the first few days."
		},
		{
			question: "Is there a payment plan?",
			answer: "Yes. We offer 2-part and 3-part payment plans. Just mention it in your application and we'll work something out."
		},
		{
			question: "What if I can't keep up?",
			answer: "The intake is small (max 12) so instructors can give you personal attention. Daily standups catch problems early. Everyone finishes."
		},
		{
			question: "Where do I stay in Penang?",
			answer: "Accommodation isn't included, but we'll recommend affordable options near our space. Many past builders shared apartments. Penang is very affordable — expect RM 1,500-2,500/month for a nice room."
		}
	];

	const weeks = [
		{
			number: 1,
			title: "Foundation + Your Idea",
			description: "Set up your stack, scope your MVP, and ship v0.1.",
			outcomes: ["Tech stack configured", "MVP scope defined", "First working prototype"]
		},
		{
			number: 2,
			title: "Core Features",
			description: "Build the heart of your product. Real functionality, real code.",
			outcomes: ["Core features working", "Database set up", "User auth implemented"]
		},
		{
			number: 3,
			title: "AI Integration",
			description: "Add the magic. LLM features, automations, smart workflows.",
			outcomes: ["AI features integrated", "n8n workflows live", "Automations running"]
		},
		{
			number: 4,
			title: "Polish + Launch",
			description: "Launch it. Deploy, get users, celebrate.",
			outcomes: ["Product deployed", "First users onboarded", "Launch complete"]
		}
	];
</script>

<svelte:head>
	<title>Full Stack Web Development | code:zero</title>
	<meta name="description" content="4-week intensive coding bootcamp in Penang. Build and launch your own product with SvelteKit, Supabase, and AI." />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-glow"></div>
	<div class="container hero-grid">
		<div class="hero-content">
			<div class="hero-eyebrow">
				<span class="dot"></span>
				February 2025 intake — 4 spots left
			</div>
			<h1 class="hero-heading">
				<span class="highlight">Build your freedom.</span><br>Full stack in 4 weeks.
			</h1>
			<p class="hero-subheading">
				Join 12 builders in Penang. Learn to code with AI. Launch your product. Walk away with skills that pay forever.
			</p>
			<div class="hero-cta">
				<button onclick={handleApply} class="btn btn-primary btn-lg">Start Learning</button>
				<a href="#curriculum" class="btn btn-secondary btn-lg">See Curriculum</a>
			</div>
			<div class="hero-proof">
				<div class="hero-proof-item">
					<span class="hero-proof-value">4 weeks</span>
					<span class="hero-proof-label">Intensive sprint</span>
				</div>
				<div class="hero-proof-item">
					<span class="hero-proof-value">12 max</span>
					<span class="hero-proof-label">Per intake</span>
				</div>
				<div class="hero-proof-item">
					<span class="hero-proof-value">100%</span>
					<span class="hero-proof-label">Completion rate</span>
				</div>
			</div>
		</div>
		<div class="hero-image">
			<img src="/images/hero-workshop.jpg" alt="code:zero Full Stack Web Development Workshop in Penang">
			<div class="hero-card-floating">
				<div class="card-header">
					<span class="card-dot"></span>
					<span class="card-dot"></span>
					<span class="card-dot"></span>
				</div>
				<div class="card-content">
					<code class="card-code">
						<span class="code-comment">// Go full stack</span><br>
						<span class="code-keyword">const</span> <span class="code-var">status</span> = <span class="code-string">"DEPLOYED"</span>;<br>
						<span class="code-keyword">const</span> <span class="code-var">builders</span> = <span class="code-num">12</span>;<br>
						<span class="code-keyword">const</span> <span class="code-var">days</span> = <span class="code-num">28</span>;
					</code>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Curriculum -->
<section class="section section-alt" id="curriculum">
	<div class="container">
		<div class="section-header">
			<h2>The 4-Week Sprint</h2>
			<p>Weekdays only. Mornings async, afternoons live. Weekends off to explore Penang.</p>
		</div>
		<div class="curriculum-grid">
			{#each weeks as week}
				<div class="week-card">
					<span class="week-number">WEEK {week.number}</span>
					<h3>{week.title}</h3>
					<p>{week.description}</p>
					<ul class="week-outcomes">
						{#each week.outcomes as outcome}
							<li>{outcome}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Features -->
<section class="section section-dark" id="features">
	<div class="container">
		<div class="section-header">
			<h2>What You'll Build</h2>
			<p>By week 4, you'll have a deployed, working product — not a tutorial clone</p>
		</div>
		<div class="features-grid">
			<div class="feature-card">
				<div class="feature-icon">🚀</div>
				<h3>Your Own Product</h3>
				<p>Build the thing you've been putting off. Your idea, your tech, deployed and live with real users.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">🤖</div>
				<h3>AI-Powered Features</h3>
				<p>Integrate LLMs, build chatbots, automate workflows. Build AI features your users can actually use.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">⚡</div>
				<h3>n8n Automations</h3>
				<p>Build no-code workflows that save you hours. Connect APIs, automate tasks, scale yourself.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">📊</div>
				<h3>Analytics Dashboard</h3>
				<p>Track what matters. Build data pipelines and dashboards that help you make decisions.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">📧</div>
				<h3>Email Marketing</h3>
				<p>Set up automated email sequences. Capture leads, nurture users, drive conversions.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">🌏</div>
				<h3>Penang Experience</h3>
				<p>Work from a tropical hub. Great food, low cost, builder-friendly. Part sprint, part adventure.</p>
			</div>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="section section-alt" id="faq">
	<div class="container">
		<div class="section-header">
			<h2>Frequently Asked Questions</h2>
		</div>
		<div class="faq-grid">
			{#each faqs as faq, index}
				<div class="faq-item">
					<button 
						class="faq-question" 
						onclick={() => toggleFaq(index)}
						aria-expanded={openFaq === index}
					>
						{faq.question}
						<span class="faq-icon" class:open={openFaq === index}>+</span>
					</button>
					{#if openFaq === index}
						<div class="faq-answer">
							<p>{faq.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Final CTA -->
<section class="final-cta section-dark" id="apply">
	<div class="container">
		<div class="final-cta-content">
			<h2>Stop Collecting Courses.<br>Go Full Stack.</h2>
			<p>4 weeks. 12 builders. Full stack skills.<br>Early Bird: <strong>RM 14,800</strong> (List: RM 18,800)</p>
			<div class="final-cta-buttons">
				<button onclick={handleApply} class="btn btn-primary btn-lg">Start Learning</button>
				<a href="mailto:hello@codezero.my" class="btn btn-secondary btn-lg">Have Questions?</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* Layout */
	.container {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 var(--space-4);
	}

	@media (min-width: 640px) {
		.container { padding: 0 var(--space-6); }
	}

	@media (min-width: 1024px) {
		.container { padding: 0 var(--space-8); }
	}

	.section {
		padding: var(--space-20) 0;
	}

	.section-dark {
		background: var(--bg-base);
	}

	.section-alt {
		background: var(--bg-elevated);
	}

	.section-header {
		text-align: center;
		max-width: 700px;
		margin: 0 auto var(--space-12);
	}

	.section-header h2 {
		font-family: var(--font-heading);
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.section-header p {
		font-size: 1.125rem;
		color: var(--text-secondary);
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		font-family: var(--font-body);
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		cursor: pointer;
		text-decoration: none;
		transition: all var(--duration-normal) var(--ease-default);
		border: none;
	}

	.btn-primary {
		background: var(--gradient-accent);
		color: white;
		box-shadow: var(--shadow-glow-sm), var(--shadow-md);
	}

	.btn-primary:hover {
		box-shadow: var(--shadow-glow-md), var(--shadow-lg);
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: transparent;
		color: var(--text-primary);
		border: 1px solid var(--border-default);
	}

	.btn-secondary:hover {
		background: var(--bg-hover);
		border-color: var(--color-primary);
	}

	.btn-lg {
		padding: var(--space-4) var(--space-8);
		font-size: 1rem;
		border-radius: var(--radius-lg);
	}

	.btn-full { width: 100%; }

	/* Hero */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: var(--space-24) 0;
		padding-top: calc(80px + var(--space-12));
		overflow: hidden;
		background: var(--bg-base);
	}

	.hero::before {
		content: '';
		position: absolute;
		top: 0;
		right: -20%;
		width: 70%;
		height: 100%;
		background: radial-gradient(ellipse at center, rgba(4, 164, 89, 0.12) 0%, transparent 60%);
		filter: blur(80px);
		pointer-events: none;
	}

	.hero::after {
		content: '';
		position: absolute;
		bottom: 10%;
		left: -15%;
		width: 50%;
		height: 60%;
		background: radial-gradient(ellipse at center, rgba(46, 204, 113, 0.08) 0%, transparent 60%);
		filter: blur(60px);
		pointer-events: none;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-12);
		align-items: center;
	}

	@media (min-width: 1024px) {
		.hero-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.hero-content {
		position: relative;
		z-index: 1;
	}

	.hero-visual {
		position: relative;
		z-index: 1;
		display: none;
	}

	@media (min-width: 1024px) {
		.hero-visual {
			display: block;
		}
	}

	.hero-visual img {
		width: 100%;
		height: 540px;
		object-fit: cover;
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-lg);
		filter: brightness(0.9) contrast(1.1);
	}

	.hero-visual::before {
		content: '';
		position: absolute;
		inset: -4px;
		background: var(--gradient-accent);
		border-radius: calc(var(--radius-xl) + 4px);
		z-index: -1;
		opacity: 0.5;
	}

	.hero-card-floating {
		position: absolute;
		bottom: var(--space-8);
		right: calc(-1 * var(--space-4));
		width: 280px;
		background: rgba(36, 41, 51, 0.95);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--shadow-glow-md);
		animation: float 6s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-12px); }
	}

	.card-header {
		display: flex;
		gap: 6px;
		padding: var(--space-3) var(--space-4);
		background: var(--bg-surface);
		border-bottom: 1px solid var(--border-subtle);
	}

	.card-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.card-dot:nth-child(1) { background: #EF4444; }
	.card-dot:nth-child(2) { background: #F59E0B; }
	.card-dot:nth-child(3) { background: #10B981; }

	.card-content {
		padding: var(--space-6);
	}

	.card-code {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.85rem;
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.code-comment { color: var(--text-muted); }
	.code-keyword { color: #C792EA; }
	.code-var { color: #82AAFF; }
	.code-num { color: #F78C6C; }
	.code-string { color: #C3E88D; }

	.hero-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-primary);
		margin-bottom: var(--space-6);
	}

	.hero-eyebrow .dot {
		width: 8px;
		height: 8px;
		background: var(--color-primary);
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.hero-heading {
		font-family: var(--font-heading);
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 800;
		line-height: 1.1;
		margin-bottom: var(--space-6);
		color: var(--text-primary);
	}

	.hero-heading .highlight {
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subheading {
		font-size: 1.25rem;
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--space-8);
		max-width: 600px;
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-bottom: var(--space-10);
	}

	.hero-proof {
		display: flex;
		align-items: center;
		gap: var(--space-6);
		padding-top: var(--space-8);
		border-top: 1px solid var(--border-subtle);
	}

	.hero-proof-item {
		display: flex;
		flex-direction: column;
	}

	.hero-proof-value {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.hero-proof-label {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	/* Curriculum */
	.curriculum-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 640px) {
		.curriculum-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.curriculum-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.week-card {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		transition: all var(--duration-normal) var(--ease-default);
		contain: layout style;
	}

	.week-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-primary);
		box-shadow: var(--shadow-lg), var(--shadow-glow-sm);
	}

	.week-number {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: var(--gradient-accent);
		color: white;
		font-size: 0.75rem;
		font-weight: 700;
		border-radius: var(--radius-full);
		margin-bottom: var(--space-4);
	}

	.week-card h3 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-3);
	}

	.week-card p {
		font-size: 0.95rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-4);
	}

	.week-outcomes {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.week-outcomes li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.week-outcomes li::before {
		content: '→';
		color: var(--color-primary);
		font-weight: 600;
	}

	/* Features */
	.features-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 640px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.feature-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-8);
		transition: all var(--duration-normal) var(--ease-default);
		contain: layout style;
	}

	.feature-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-primary);
		box-shadow: var(--shadow-lg), var(--shadow-glow-sm);
	}

	.feature-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-lg);
		font-size: 1.5rem;
		margin-bottom: var(--space-4);
	}

	.feature-card h3 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.feature-card p {
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	/* FAQ */
	.faq-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
		max-width: 1000px;
		margin: 0 auto;
	}

	@media (min-width: 768px) {
		.faq-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.faq-item {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		contain: layout style;
	}

	.faq-question {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-6);
		background: transparent;
		border: none;
		color: var(--text-primary);
		font-family: var(--font-heading);
		font-size: 1.1rem;
		font-weight: 600;
		text-align: left;
		cursor: pointer;
	}

	.faq-icon {
		font-size: 1.5rem;
		font-weight: 400;
		color: var(--text-muted);
		transition: transform var(--duration-normal);
	}

	.faq-icon.open {
		transform: rotate(45deg);
	}

	.faq-answer {
		padding: 0 var(--space-6) var(--space-6);
		color: var(--text-secondary);
		font-size: 0.95rem;
		line-height: 1.6;
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: var(--space-24) 0;
		position: relative;
		overflow: hidden;
		background: var(--bg-base);
	}

	.final-cta::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 150%;
		height: 150%;
		background: var(--gradient-glow);
		filter: blur(100px);
		opacity: 0.5;
		pointer-events: none;
	}

	.final-cta-content {
		position: relative;
		z-index: 1;
		max-width: 700px;
		margin: 0 auto;
	}

	.final-cta h2 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--text-primary);
		margin-bottom: var(--space-6);
	}

	.final-cta p {
		font-size: 1.25rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-8);
	}

	.final-cta-buttons {
		display: flex;
		justify-content: center;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-heading {
			font-size: 2.25rem;
		}

		.hero-proof {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-4);
		}

		.trust-stats {
			gap: var(--space-8);
		}

		.trust-stat-value {
			font-size: 2rem;
		}

		.section-header h2 {
			font-size: 1.75rem;
		}

		.pricing-price {
			font-size: 2.5rem;
		}

		.final-cta h2 {
			font-size: 1.75rem;
		}
	}
</style>