<script lang="ts">
	import { openLoginModal } from '$lib/stores/auth';

	let { data } = $props();

	let openFaq: number | null = null;

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	const faqs = [
		{
			question: "What level of programming experience do participants need?",
			answer: "Basic programming experience is sufficient. Your team should be comfortable writing code, but they don't need AI or machine learning backgrounds. We teach everything from fundamentals to deployment."
		},
		{
			question: "Can you come to our office?",
			answer: "Yes. We deliver on-site at your office anywhere in Malaysia, or you can bring your team to our training hub in Penang. On-site delivery at your location is included in the standard pricing."
		},
		{
			question: "How does HRDF claiming work?",
			answer: "We handle the paperwork. For SMEs, up to 100% of the training cost is claimable. For larger companies, partial claims apply. We'll guide you through the process — most clients have done this with us before."
		},
		{
			question: "What if our team has different skill levels?",
			answer: "The workshop is designed to accommodate mixed levels. Day 1 ensures everyone has the same foundation. Days 2-3 have breakout activities where more advanced participants can go deeper while others consolidate fundamentals."
		},
		{
			question: "What do we get after the 3 days?",
			answer: "Your team leaves with: working automations they built, all training materials, code templates, and 2 weeks of post-training support via Slack/email to help with implementation questions."
		},
		{
			question: "Can you customize the curriculum for our industry?",
			answer: "Absolutely. We adapt examples and the Day 3 project to your industry and tech stack. Past clients have customized for fintech, e-commerce, logistics, and SaaS applications."
		}
	];

	const agenda = [
		{
			day: 1,
			title: "AI Fundamentals + Prompt Engineering",
			description: "Understand the AI landscape, learn production-grade prompting, and build your first AI-powered feature.",
			outcomes: ["AI/LLM landscape overview", "Prompt engineering for production", "First working AI feature"]
		},
		{
			day: 2,
			title: "n8n + LLM Integration",
			description: "Hands-on workshop building real automation workflows. Connect LLMs to your existing tools and data.",
			outcomes: ["n8n workflow basics", "LLM API integration", "Multi-step automation chains"]
		},
		{
			day: 3,
			title: "Apply to Real Business Problem",
			description: "Your team builds an automation that solves a real problem from your company. Deploy before you leave.",
			outcomes: ["Custom business automation", "Deployed working solution", "Implementation roadmap"]
		}
	];

	const testimonials = [
		{
			quote: "Our team went from 'AI-curious' to shipping AI features in production within a month of the training. The hands-on approach made all the difference.",
			name: "Engineering Manager",
			company: "Fintech Startup",
			result: "3 AI features shipped in 30 days"
		},
		{
			quote: "Finally, training that isn't death by PowerPoint. Our developers actually built something useful and were excited to apply it.",
			name: "CTO",
			company: "E-commerce Platform",
			result: "40% reduction in manual reporting"
		},
		{
			quote: "The HRDF process was seamless. code:zero handled everything. Our team got world-class training at zero cost to us.",
			name: "HR Director",
			company: "Manufacturing SME",
			result: "100% HRDF claimed"
		}
	];
</script>

<svelte:head>
	<title>Enterprise Training - AI Automation Sprint | code:zero</title>
	<meta name="description" content="3-day AI automation workshop for dev teams. Hands-on, HRDF claimable. Your team ships real AI-powered solutions by Day 3." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-glow"></div>
	<div class="container hero-grid">
		<div class="hero-content">
			<div class="hero-badge">
				<span class="badge-icon">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<polyline points="22 4 12 14.01 9 11.01"/>
					</svg>
				</span>
				HRDF Claimable — Up to 100% for SMEs
			</div>
			<h1 class="hero-heading">
				Stop Googling "AI for devs".<br/>
				<span class="highlight">Start shipping AI features.</span>
			</h1>
			<p class="hero-subheading">
				3-day intensive workshop. Your team builds and deploys real AI-powered automations — not slides, not theory. Working solutions by Day 3.
			</p>
			<div class="hero-cta">
				<a href="#contact" class="btn btn-primary btn-lg">
					Request Free Taster Session
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
				<a href="#agenda" class="btn btn-secondary btn-lg">View Agenda</a>
			</div>
			<div class="hero-stats">
				<div class="stat">
					<span class="stat-value">3</span>
					<span class="stat-label">Days</span>
				</div>
				<div class="stat-divider"></div>
				<div class="stat">
					<span class="stat-value">8-12</span>
					<span class="stat-label">Team Size</span>
				</div>
				<div class="stat-divider"></div>
				<div class="stat">
					<span class="stat-value">100%</span>
					<span class="stat-label">HRDF (SME)</span>
				</div>
			</div>
		</div>
		<div class="hero-visual">
			<div class="hero-card-floating">
				<div class="card-header">
					<span class="card-dot"></span>
					<span class="card-dot"></span>
					<span class="card-dot"></span>
				</div>
				<div class="card-content">
					<code class="card-code">
						<span class="code-comment">// AI Automation Sprint</span><br>
						<span class="code-keyword">const</span> <span class="code-var">team</span> = <span class="code-num">12</span>;<br>
						<span class="code-keyword">const</span> <span class="code-var">days</span> = <span class="code-num">3</span>;<br>
						<span class="code-keyword">const</span> <span class="code-var">output</span> = <span class="code-string">"DEPLOYED"</span>;
					</code>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Problem Section -->
<section class="section section-elevated">
	<div class="container">
		<div class="problem-content">
			<span class="section-label section-label-dark">The Problem</span>
			<h2 class="section-heading dark-text">Your developers are Googling.<br/>Your competitors are shipping.</h2>
			<div class="problem-grid">
				<div class="problem-card">
					<div class="problem-icon problem-icon-bad">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"/>
							<line x1="12" y1="8" x2="12" y2="12"/>
							<line x1="12" y1="16" x2="12.01" y2="16"/>
						</svg>
					</div>
					<h3 class="problem-title">AI Knowledge Gap</h3>
					<p class="problem-text">Your team knows AI is important, but tutorials and ChatGPT experiments aren't translating to production features.</p>
				</div>
				<div class="problem-card">
					<div class="problem-icon problem-icon-bad">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"/>
							<line x1="12" y1="8" x2="12" y2="12"/>
							<line x1="12" y1="16" x2="12.01" y2="16"/>
						</svg>
					</div>
					<h3 class="problem-title">Wasted HRDF Levy</h3>
					<p class="problem-text">You're paying into HRDF every month. That money should be upskilling your team on AI, not collecting dust.</p>
				</div>
				<div class="problem-card">
					<div class="problem-icon problem-icon-bad">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"/>
							<line x1="12" y1="8" x2="12" y2="12"/>
							<line x1="12" y1="16" x2="12.01" y2="16"/>
						</svg>
					</div>
					<h3 class="problem-title">Training That Doesn't Stick</h3>
					<p class="problem-text">Past training was all slides and theory. Your team forgot everything within a week. This time needs to be different.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Solution Section -->
<section class="section section-dark">
	<div class="container">
		<div class="solution-header">
			<span class="section-label">The Solution</span>
			<h2 class="section-heading">AI Automation Sprint</h2>
			<p class="section-intro">3 days. Hands-on. Your team ships a real AI-powered automation before they leave.</p>
		</div>
		<div class="solution-features">
			<div class="feature-card">
				<div class="feature-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polygon points="12 2 2 7 12 12 22 7 12 2"/>
						<polyline points="2 17 12 22 22 17"/>
						<polyline points="2 12 12 17 22 12"/>
					</svg>
				</div>
				<h3 class="feature-title">LLM-Powered Internal Tools</h3>
				<p class="feature-text">Build AI assistants for your specific workflows — customer support, document processing, data analysis.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 20V10"/>
						<path d="M12 20V4"/>
						<path d="M6 20v-6"/>
					</svg>
				</div>
				<h3 class="feature-title">Automated Workflows</h3>
				<p class="feature-text">Connect AI to your existing tools with n8n. Automate reporting, data pipelines, and repetitive tasks.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
						<polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
						<line x1="12" y1="22.08" x2="12" y2="12"/>
					</svg>
				</div>
				<h3 class="feature-title">Production-Ready Output</h3>
				<p class="feature-text">Not demos. Not prototypes. Working solutions deployed to your infrastructure by Day 3.</p>
			</div>
			<div class="feature-card">
				<div class="feature-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
						<circle cx="9" cy="7" r="4"/>
						<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
						<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
					</svg>
				</div>
				<h3 class="feature-title">Post-Training Support</h3>
				<p class="feature-text">2 weeks of Slack/email support after the workshop. We help your team implement what they learned.</p>
			</div>
		</div>
	</div>
</section>

<!-- Agenda Section -->
<section class="section section-elevated" id="agenda">
	<div class="container">
		<div class="agenda-header">
			<span class="section-label section-label-dark">The Agenda</span>
			<h2 class="section-heading dark-text">3 days from zero to deployed</h2>
			<p class="section-intro dark-text-muted">Each day builds on the last. By Day 3, your team deploys a real solution.</p>
		</div>
		<div class="agenda-timeline">
			{#each agenda as day}
				<div class="agenda-day">
					<div class="day-marker">
						<span class="day-number">Day {day.day}</span>
					</div>
					<div class="day-content">
						<h3 class="day-title">{day.title}</h3>
						<p class="day-description">{day.description}</p>
						<ul class="day-outcomes">
							{#each day.outcomes as outcome}
								<li>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									{outcome}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
		<div class="agenda-note">
			<div class="note-icon">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<polyline points="12 6 12 12 16 14"/>
				</svg>
			</div>
			<div class="note-content">
				<strong>Schedule:</strong> 9:00am — 4:30pm each day. 50% hands-on building, 50% guided instruction. Lunch and refreshments included.
			</div>
		</div>
	</div>
</section>

<!-- Testimonials Section -->
<section class="section section-dark">
	<div class="container">
		<div class="testimonials-header">
			<span class="section-label">What Teams Say</span>
			<h2 class="section-heading">Results from past cohorts</h2>
		</div>
		<div class="testimonials-grid">
			{#each testimonials as testimonial}
				<div class="testimonial-card">
					<div class="testimonial-result">{testimonial.result}</div>
					<p class="testimonial-quote">"{testimonial.quote}"</p>
					<div class="testimonial-author">
						<div class="author-info">
							<span class="author-name">{testimonial.name}</span>
							<span class="author-company">{testimonial.company}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section class="section section-elevated" id="pricing">
	<div class="container">
		<div class="pricing-header">
			<span class="section-label section-label-dark">Investment</span>
			<h2 class="section-heading dark-text">Simple pricing. HRDF claimable.</h2>
		</div>
		<div class="pricing-card">
			<div class="pricing-header-card">
				<h3 class="pricing-name">AI Automation Sprint</h3>
				<p class="pricing-tagline">3-day intensive for your dev team</p>
			</div>
			<div class="pricing-price">
				<span class="price-amount">RM 38,000</span>
				<span class="price-period">per cohort</span>
			</div>
			<div class="pricing-hrdf">
				<div class="hrdf-row">
					<span class="hrdf-label">SME (100% claimable)</span>
					<span class="hrdf-value hrdf-free">RM 0</span>
				</div>
				<div class="hrdf-row">
					<span class="hrdf-label">Non-SME (partial claim)</span>
					<span class="hrdf-value">Reduced</span>
				</div>
			</div>
			<ul class="pricing-features">
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					8-12 participants per cohort
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					On-site at your office or our Penang hub
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					All training materials included
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					Certificate of completion
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					2 weeks post-training support
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					We handle HRDF paperwork
				</li>
			</ul>
			<a href="#contact" class="btn btn-primary btn-lg btn-full">Request Quote</a>
		</div>
		<div class="pilot-offer">
			<div class="pilot-badge">Pilot Program</div>
			<h4 class="pilot-title">New to code:zero?</h4>
			<p class="pilot-text">We offer discounted pilot pricing for companies willing to provide feedback and a testimonial. Ask us about pilot rates.</p>
		</div>
	</div>
</section>

<!-- Comparison Section -->
<section class="section section-dark">
	<div class="container">
		<div class="comparison-header">
			<span class="section-label">Why code:zero</span>
			<h2 class="section-heading">Training that actually works</h2>
		</div>
		<div class="comparison-table">
			<div class="comparison-column comparison-them">
				<h4 class="comparison-title">Traditional Training</h4>
				<ul class="comparison-list">
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 6L6 18M6 6l12 12"/>
						</svg>
						Weeks of theory
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 6L6 18M6 6l12 12"/>
						</svg>
						Academic instructors
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 6L6 18M6 6l12 12"/>
						</svg>
						Generic curriculum
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 6L6 18M6 6l12 12"/>
						</svg>
						No post-training support
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 6L6 18M6 6l12 12"/>
						</svg>
						Death by PowerPoint
					</li>
				</ul>
			</div>
			<div class="comparison-column comparison-us">
				<h4 class="comparison-title">code:zero</h4>
				<ul class="comparison-list">
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						3 days, ship something real
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						Working engineers who've shipped
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						Applied to YOUR business problems
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						2 weeks follow-up included
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						50% hands-on building
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="section section-elevated" id="faq">
	<div class="container">
		<div class="faq-header">
			<span class="section-label section-label-dark">FAQ</span>
			<h2 class="section-heading dark-text">Common questions</h2>
		</div>
		<div class="faq-list">
			{#each faqs as faq, index}
				<button
					class="faq-item"
					class:open={openFaq === index}
					onclick={() => toggleFaq(index)}
				>
					<div class="faq-question">
						<span>{faq.question}</span>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="faq-icon">
							<path d="M6 9l6 6 6-6"/>
						</svg>
					</div>
					{#if openFaq === index}
						<div class="faq-answer">
							<p>{faq.answer}</p>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Contact Section -->
<section class="section section-cta" id="contact">
	<div class="container">
		<div class="cta-content">
			<h2 class="cta-heading">Ready to upskill your team?</h2>
			<p class="cta-text">Start with a free 1-hour taster session. No commitment. See if it's a fit for your team.</p>
			<div class="cta-form">
				<div class="form-row">
					<input type="text" placeholder="Your name" class="input" />
					<input type="email" placeholder="Work email" class="input" />
				</div>
				<div class="form-row">
					<input type="text" placeholder="Company name" class="input" />
					<input type="text" placeholder="Team size" class="input" />
				</div>
				<button class="btn btn-primary btn-lg btn-full">Request Free Taster Session</button>
			</div>
			<p class="cta-note">We'll respond within 24 hours with available dates.</p>
		</div>
	</div>
</section>

<style>
	/* Variables */
	:global(:root) {
		--color-primary: #04A459;
		--color-primary-light: #2ECC71;
		--gradient-accent: linear-gradient(135deg, #04A459 0%, #2ECC71 100%);
		--bg-base: #1a1d23;
		--bg-elevated: #242933;
		--bg-surface: #2e3440;
		--bg-hover: #3b4252;
		--bg-light: #f8f9fa;
		--bg-light-elevated: #ffffff;
		--text-primary: #ffffff;
		--text-secondary: #a1a1a1;
		--text-muted: #6b7280;
		--text-on-light: #1a1d23;
		--text-on-light-muted: #4b5563;
		--border-subtle: #2e3440;
		--border-default: #3b4252;
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
		--space-24: 6rem;
		--space-32: 8rem;
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--radius-xl: 16px;
		--radius-full: 9999px;
		--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.25);
		--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.3);
		--shadow-glow-sm: 0 0 10px rgba(4, 164, 89, 0.2);
		--shadow-glow-md: 0 0 20px rgba(4, 164, 89, 0.3);
		--font-heading: 'Quicksand', system-ui, sans-serif;
		--font-body: 'Quicksand', system-ui, sans-serif;
		--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
		--duration-fast: 150ms;
		--duration-normal: 200ms;
	}

	:global(body) {
		margin: 0;
		font-family: var(--font-body);
		background: var(--bg-base);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Layout */
	.container {
		width: 100%;
		max-width: 1280px;
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

	.section-elevated {
		background: var(--bg-elevated);
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
		background: var(--bg-surface);
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
		min-height: 90vh;
		display: flex;
		align-items: center;
		padding: calc(var(--space-32) + 60px) 0 var(--space-16);
		overflow: hidden;
	}

	.hero-glow {
		position: absolute;
		top: 10%;
		right: -20%;
		width: 60%;
		height: 80%;
		background: radial-gradient(ellipse, rgba(4, 164, 89, 0.15) 0%, transparent 60%);
		filter: blur(80px);
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
		max-width: 800px;
	}

	.hero-visual {
		position: relative;
		display: none;
		justify-content: center;
		align-items: center;
		min-height: 400px;
	}

	@media (min-width: 1024px) {
		.hero-visual {
			display: flex;
		}
	}

	.hero-card-floating {
		position: relative;
		width: 320px;
		background: rgba(36, 41, 51, 0.95);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), var(--shadow-glow-md);
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
		font-size: 0.9rem;
		line-height: 1.8;
		color: var(--text-secondary);
	}

	.code-comment { color: var(--text-muted); }
	.code-keyword { color: #C792EA; }
	.code-var { color: #82AAFF; }
	.code-num { color: #F78C6C; }
	.code-string { color: #C3E88D; }

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: var(--space-6);
	}

	.badge-icon { display: flex; }

	.hero-heading {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--text-primary);
		margin: 0 0 var(--space-6);
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
		line-height: 1.6;
		margin: 0 0 var(--space-8);
		max-width: 600px;
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-bottom: var(--space-10);
	}

	.hero-stats {
		display: flex;
		align-items: center;
		gap: var(--space-6);
	}

	.stat { text-align: center; }

	.stat-value {
		display: block;
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1;
	}

	.stat-label {
		display: block;
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-top: var(--space-1);
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: var(--border-default);
	}

	/* Section Typography */
	.section-label {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-primary);
		margin-bottom: var(--space-4);
	}

	.section-label-dark { background: rgba(4, 164, 89, 0.15); }

	.section-heading {
		font-family: var(--font-heading);
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
	}

	.dark-text { color: var(--text-primary); }
	.dark-text-muted { color: var(--text-secondary); }

	.section-intro {
		font-size: 1.125rem;
		color: var(--text-secondary);
		max-width: 640px;
	}

	/* Problem Section */
	.problem-content {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.problem-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 768px) {
		.problem-grid { grid-template-columns: repeat(3, 1fr); }
	}

	.problem-card {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		text-align: center;
	}

	.problem-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-lg);
		margin: 0 auto var(--space-4);
	}

	.problem-icon-bad {
		background: rgba(239, 68, 68, 0.1);
		color: #EF4444;
	}

	.problem-title {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.problem-text {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.6;
	}

	/* Solution Section */
	.solution-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.solution-header .section-intro { margin: 0 auto; }

	.solution-features {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 640px) {
		.solution-features { grid-template-columns: repeat(2, 1fr); }
	}

	.feature-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		transition: transform var(--duration-normal), box-shadow var(--duration-normal), border-color var(--duration-normal);
	}

	.feature-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg), var(--shadow-glow-sm);
		border-color: var(--color-primary);
	}

	.feature-icon {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-lg);
		color: var(--color-primary);
		margin-bottom: var(--space-4);
	}

	.feature-title {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.feature-text {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.6;
	}

	/* Agenda Section */
	.agenda-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.agenda-header .section-intro { margin: 0 auto; }

	.agenda-timeline {
		max-width: 800px;
		margin: 0 auto;
	}

	.agenda-day {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: var(--space-6);
		margin-bottom: var(--space-8);
	}

	.day-marker { text-align: center; }

	.day-number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 72px;
		height: 72px;
		background: var(--gradient-accent);
		border-radius: var(--radius-lg);
		font-family: var(--font-heading);
		font-size: 0.875rem;
		font-weight: 700;
		color: white;
	}

	.day-content {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.day-title {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.day-description {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0 0 var(--space-4);
		line-height: 1.6;
	}

	.day-outcomes {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.day-outcomes li {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: var(--bg-hover);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		color: var(--text-secondary);
	}

	.day-outcomes svg { color: var(--color-primary); }

	.agenda-note {
		display: flex;
		gap: var(--space-4);
		padding: var(--space-5);
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		margin-top: var(--space-8);
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	.note-icon {
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.note-content {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Testimonials */
	.testimonials-header {
		text-align: center;
		margin-bottom: var(--space-10);
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 768px) {
		.testimonials-grid { grid-template-columns: repeat(3, 1fr); }
	}

	.testimonial-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
	}

	.testimonial-result {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: var(--space-4);
	}

	.testimonial-quote {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.7;
		margin: 0 0 var(--space-4);
	}

	.testimonial-author { display: flex; align-items: center; }

	.author-info { display: flex; flex-direction: column; }

	.author-name {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.9375rem;
	}

	.author-company {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	/* Pricing */
	.pricing-header {
		text-align: center;
		margin-bottom: var(--space-10);
	}

	.pricing-card {
		max-width: 480px;
		margin: 0 auto;
		background: var(--bg-surface);
		border: 2px solid var(--color-primary);
		border-radius: var(--radius-xl);
		padding: var(--space-8);
	}

	.pricing-header-card {
		text-align: center;
		margin-bottom: var(--space-6);
	}

	.pricing-name {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-1);
	}

	.pricing-tagline {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.pricing-price {
		text-align: center;
		margin-bottom: var(--space-4);
	}

	.price-amount {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.price-period {
		font-size: 1rem;
		color: var(--text-secondary);
		margin-left: var(--space-2);
	}

	.pricing-hrdf {
		background: rgba(4, 164, 89, 0.05);
		border: 1px solid rgba(4, 164, 89, 0.2);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		margin-bottom: var(--space-6);
	}

	.hrdf-row {
		display: flex;
		justify-content: space-between;
		padding: var(--space-2) 0;
	}

	.hrdf-row:not(:last-child) {
		border-bottom: 1px solid rgba(4, 164, 89, 0.1);
	}

	.hrdf-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.hrdf-value {
		font-weight: 600;
		color: var(--text-primary);
	}

	.hrdf-free {
		color: var(--color-primary);
		font-size: 1.125rem;
	}

	.pricing-features {
		list-style: none;
		padding: 0;
		margin: 0 0 var(--space-6);
	}

	.pricing-features li {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) 0;
		font-size: 0.9375rem;
		color: var(--text-secondary);
		border-bottom: 1px solid var(--border-subtle);
	}

	.pricing-features li:last-child { border-bottom: none; }
	.pricing-features svg { color: var(--color-primary); flex-shrink: 0; }

	.pilot-offer {
		max-width: 600px;
		margin: var(--space-10) auto 0;
		padding: var(--space-6);
		background: rgba(4, 164, 89, 0.05);
		border: 1px dashed rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-lg);
		text-align: center;
	}

	.pilot-badge {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: var(--color-primary);
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		color: white;
		margin-bottom: var(--space-3);
	}

	.pilot-title {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.pilot-text {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0;
	}

	/* Comparison */
	.comparison-header {
		text-align: center;
		margin-bottom: var(--space-10);
	}

	.comparison-table {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
		max-width: 800px;
		margin: 0 auto;
	}

	@media (min-width: 768px) {
		.comparison-table { grid-template-columns: 1fr 1fr; }
	}

	.comparison-column {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.comparison-title {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		margin: 0 0 var(--space-4);
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--border-subtle);
	}

	.comparison-them .comparison-title { color: var(--text-muted); }
	.comparison-us .comparison-title { color: var(--color-primary); }
	.comparison-us { border-color: var(--color-primary); }

	.comparison-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.comparison-list li {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-2) 0;
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.comparison-them .comparison-list svg { color: #EF4444; }
	.comparison-us .comparison-list svg { color: var(--color-primary); }

	/* FAQ */
	.faq-header {
		text-align: center;
		margin-bottom: var(--space-10);
	}

	.faq-list {
		max-width: 800px;
		margin: 0 auto;
	}

	.faq-item {
		width: 100%;
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		margin-bottom: var(--space-3);
		padding: 0;
		text-align: left;
		cursor: pointer;
		transition: border-color var(--duration-normal);
	}

	.faq-item:hover, .faq-item.open { border-color: var(--color-primary); }

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-5);
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.faq-icon {
		flex-shrink: 0;
		color: var(--text-muted);
		transition: transform var(--duration-normal);
	}

	.faq-item.open .faq-icon { transform: rotate(180deg); }

	.faq-answer { padding: 0 var(--space-5) var(--space-5); }

	.faq-answer p {
		margin: 0;
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	/* CTA Section */
	.section-cta {
		background: linear-gradient(180deg, var(--bg-base) 0%, #0f1115 100%);
		padding: var(--space-24) 0;
	}

	.cta-content {
		max-width: 560px;
		margin: 0 auto;
		text-align: center;
	}

	.cta-heading {
		font-family: var(--font-heading);
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
	}

	.cta-text {
		font-size: 1.125rem;
		color: var(--text-secondary);
		margin: 0 0 var(--space-8);
	}

	.cta-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-4);
	}

	@media (min-width: 640px) {
		.form-row { grid-template-columns: 1fr 1fr; }
	}

	.input {
		padding: var(--space-4);
		background: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		color: var(--text-primary);
		font-family: var(--font-body);
		font-size: 1rem;
	}

	.input::placeholder { color: var(--text-muted); }

	.input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(4, 164, 89, 0.15);
	}

	.cta-note {
		font-size: 0.875rem;
		color: var(--text-muted);
		margin: var(--space-4) 0 0;
	}
</style>
