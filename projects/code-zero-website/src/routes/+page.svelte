<script lang="ts">
	import { onMount } from 'svelte';
	import { openApplyModal } from '$lib/stores/auth';
	import Navbar from '$lib/components/Navbar.svelte';

	// FAQ accordion state
	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	const faqs = [
		{
			question: "I'm not technical. Can I still join?",
			answer: "Yes. We've had successful students from marketing, design, sales, and even hospitality backgrounds. What matters is your commitment to show up and build. We teach you everything from scratch — the 'technical enough' comes from doing, not from prerequisites."
		},
		{
			question: "What if I can't finish my product in 4 weeks?",
			answer: "In 4 years of running cohorts, we've had a 94% ship rate. The structure, accountability, and daily progress checks make it nearly impossible NOT to ship. You'll have a working, deployed product by Week 4. We make sure of it."
		},
		{
			question: "Is this for beginners or experienced developers?",
			answer: "Both. Beginners build their first real product with AI-powered features. Experienced developers finally ship that side project they've been 'meaning to build' for years. The curriculum adapts to your level — what matters is that everyone ships."
		},
		{
			question: "What tech stack will I learn?",
			answer: "SvelteKit for frontend (fast, modern, actually enjoyable), Supabase for backend (auth, database, storage in minutes), and AI tools including LLM APIs and n8n for automation. These are the tools real indie hackers use to ship fast."
		},
		{
			question: "Can I work on my own project idea?",
			answer: "Absolutely. In fact, we encourage it. You'll apply everything you learn to YOUR product — not some fake tutorial project. By Week 4, you'll have your own idea deployed and live."
		},
		{
			question: "What's the daily schedule like?",
			answer: "Mornings (9am-12pm): Online async work — videos, exercises, building. Afternoons (2pm-6pm): Live in-person sessions in Penang — workshops, code reviews, pair programming. Weekends off. This hybrid format prevents burnout and lets you actually absorb what you learn."
		},
		{
			question: "I'm not in Malaysia. Can I join remotely?",
			answer: "The afternoon sessions are in-person in Penang — that's where the magic happens. Many international students treat it as a 'builder's retreat' — 4 weeks in Penang, shipping a product while experiencing Southeast Asia. Some of our best cohorts had students from 5+ countries."
		},
		{
			question: "What's included in the RM 9,800?",
			answer: "Everything: 4 weeks of curriculum, daily live sessions, 1-on-1 code reviews, lifetime access to materials, alumni community, and post-program support. The only thing not included is accommodation — but Penang has great options from RM 1,500-3,000/month."
		}
	];

	const testimonials = [
		{
			quote: "I'd been stuck on my SaaS idea for 2 years. In 4 weeks, I finally shipped it. The accountability and structure made all the difference.",
			name: "Sarah Chen",
			role: "Founder, DataPulse",
			avatar: "/images/testimonials/placeholder-1.svg",
			result: "Launched SaaS with 50+ paying users"
		},
		{
			quote: "As a designer, I always wanted to build my own products. code:zero gave me the technical skills without the 'learn to code' fluff. I built and shipped a real tool.",
			name: "Marcus Lee",
			role: "Product Designer turned Founder",
			avatar: "/images/testimonials/placeholder-2.svg",
			result: "Built design-to-code tool, acquired 6 months later"
		},
		{
			quote: "The instructors aren't just teachers — they're builders who've shipped real products. That perspective changed everything for me.",
			name: "Aisha Rahman",
			role: "Software Engineer",
			avatar: "/images/testimonials/placeholder-3.svg",
			result: "Promoted to Tech Lead after applying learnings"
		},
		{
			quote: "I flew in from Singapore. Best investment I've made. Shipped my MVP, made friends for life, and fell in love with Penang.",
			name: "James Tan",
			role: "Former Consultant, now Indie Hacker",
			avatar: "/images/testimonials/placeholder-4.svg",
			result: "Quit corporate job, now full-time on his product"
		}
	];

	const curriculum = [
		{
			week: 1,
			title: "Foundation & First Deploy",
			description: "Set up your stack, build your first pages, and deploy to production on Day 1. Yes, Day 1.",
			outcomes: ["Development environment set up", "Core pages built", "Live on the internet by Friday"]
		},
		{
			week: 2,
			title: "Backend & Data",
			description: "Add authentication, database, and real functionality. Your app starts doing things.",
			outcomes: ["User auth working", "Database connected", "Core features functional"]
		},
		{
			week: 3,
			title: "AI Integration",
			description: "Add AI-powered features that make your product actually useful. LLMs, automation, the works.",
			outcomes: ["AI features integrated", "Automation workflows built", "Product differentiation"]
		},
		{
			week: 4,
			title: "Polish & Ship",
			description: "Refine, test, and launch. You'll present your product to the cohort. Demo day is real.",
			outcomes: ["Product polished", "Bugs squashed", "Launched and live"]
		}
	];

	// Intersection Observer for animations
	let observedElements: HTMLElement[] = [];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
					}
				});
			},
			{ threshold: 0.1 }
		);

		observedElements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>code:zero — Learn Full Stack & Ship Your AI App in 4 Weeks</title>
	<meta name="description" content="Master the fundamentals of coding and AI leverage. Ship your own AI app in 4 weeks with 12 builders in Penang. Learn faster by building." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<Navbar />

<!-- Hero Section -->
<section class="hero">
	<div class="hero-glow"></div>
	<div class="hero-glow-secondary"></div>
	<div class="container">
		<div class="hero-content">
			<div class="intake-status-badge">
				<span class="status-dot"></span>
				<span class="status-text">Next Intake: <strong>March 2026</strong></span>
			</div>
			<h1 class="hero-heading">
				Learn full stack.<br/>
				<span class="highlight">Ship in 4 weeks.</span>
			</h1>
			<p class="hero-subheading">
				Master the fundamentals of modern web development and <strong>leverage AI</strong> to accelerate your build. Go from zero to a shipped AI app in just 28 days. <span class="text-highlight">Learn in weeks, not months.</span>
			</p>
			<div class="hero-actions">
				<button onclick={handleApply} class="btn btn-primary btn-xl">
					Start Your Journey
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
				</button>
				<a href="#curriculum" class="btn btn-glass btn-xl">How it works</a>
			</div>
			<div class="trust-stack">
				<div class="avatar-group">
					<div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces')"></div>
					<div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces')"></div>
					<div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces')"></div>
					<div class="avatar-count">+200</div>
				</div>
				<div class="trust-text">
					<div class="stars">★★★★★</div>
					<span>Mastered the stack & shipped</span>
				</div>
			</div>
		</div>
		<div class="hero-visual">
			<div class="visual-card-wrapper">
				<img
					src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
					alt="code:zero builders collaborating"
					class="visual-img"
				/>

				<!-- Overlay Card: The Code -->
				<div class="hero-card">
					<div class="card-header">
						<span class="card-dot"></span>
						<span class="card-dot"></span>
						<span class="card-dot"></span>
					</div>
					<div class="card-content">
						<code class="card-code">
							<span class="code-comment">// Week 4: You shipped this</span><br/>
							<span class="code-keyword">const</span> <span class="code-var">myProduct</span> = {'{'}<br/>
							&nbsp;&nbsp;deployed: <span class="code-bool">true</span>,<br/>
							&nbsp;&nbsp;users: <span class="code-num">127</span>,<br/>
							&nbsp;&nbsp;aiPowered: <span class="code-bool">true</span>,<br/>
							&nbsp;&nbsp;builtIn: <span class="code-string">"4 weeks"</span><br/>
							{'}'};
						</code>
					</div>
				</div>

				<!-- Overlay Card: The Location -->
				<div class="location-floater">
					<div class="location-icon">📍</div>
					<div class="location-text">
						<strong>Georgetown, Penang</strong>
						<span>Builder's Paradise</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Trust Stats Bar -->
<section class="trust-bar">
	<div class="container">
		<div class="trust-stats">
			<div class="trust-stat">
				<span class="stat-value">94%</span>
				<span class="stat-label">Ship Rate</span>
			</div>
			<div class="trust-stat">
				<span class="stat-value">51+</span>
				<span class="stat-label">Products Launched</span>
			</div>
			<div class="trust-stat">
				<span class="stat-value">12</span>
				<span class="stat-label">Countries Represented</span>
			</div>
			<div class="trust-stat">
				<span class="stat-value">4</span>
				<span class="stat-label">Weeks to Ship</span>
			</div>
		</div>
	</div>
</section>

<!-- Problem Section -->
<section class="section section-elevated">
	<div class="container">
		<div class="problem-grid">
			<div class="problem-content">
				<span class="section-label">The Problem</span>
				<h2 class="section-heading light-text">You've bought the courses.<br/>You haven't shipped the product.</h2>
				<p class="section-text light-text-muted">
					CodeFast. ShipFast. Udemy. YouTube tutorials. You've got a folder full of half-finished projects and a Notion page of "someday" ideas.
				</p>
				<p class="section-text light-text-muted">
					The courses aren't broken. <strong>You just need a forcing function.</strong>
				</p>
				<ul class="problem-list">
					<li>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 6L6 18M6 6l12 12"/>
						</svg>
						<span>Self-paced means self-abandoned</span>
					</li>
					<li>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 6L6 18M6 6l12 12"/>
						</svg>
						<span>Alone at your computer, no accountability</span>
					</li>
					<li>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 6L6 18M6 6l12 12"/>
						</svg>
						<span>Tutorial hell — learning without shipping</span>
					</li>
				</ul>
			</div>
			<div class="problem-visual">
				<div class="abandoned-stack">
					<div class="abandoned-item">udemy-course-2023.zip</div>
					<div class="abandoned-item">my-saas-idea-v2</div>
					<div class="abandoned-item">learn-react-final-FINAL</div>
					<div class="abandoned-item">startup-mvp-WIP</div>
					<div class="abandoned-item abandoned-highlight">ship-sprint-SHIPPED</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Solution Section -->
<section class="section section-dark">
	<div class="container">
		<div class="solution-content">
			<span class="section-label">The Solution</span>
			<h2 class="section-heading">Full Stack Web Development: Your forcing function</h2>
			<p class="section-intro">
				4 weeks. 12 builders. Daily accountability. You WILL ship — we make sure of it.
			</p>
		</div>
		<div class="solution-grid">
			<div class="solution-card">
				<div class="solution-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
						<circle cx="9" cy="7" r="4"/>
						<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
						<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
					</svg>
				</div>
				<h3 class="solution-title">Cohort Accountability</h3>
				<p class="solution-text">12 builders, same mission. Daily standups. You can't ghost — people are counting on you.</p>
			</div>
			<div class="solution-card">
				<div class="solution-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
						<line x1="16" y1="2" x2="16" y2="6"/>
						<line x1="8" y1="2" x2="8" y2="6"/>
						<line x1="3" y1="10" x2="21" y2="10"/>
					</svg>
				</div>
				<h3 class="solution-title">Structured Schedule</h3>
				<p class="solution-text">Mornings online, afternoons live in Penang. Weekends off. No burnout, just consistent progress.</p>
			</div>
			<div class="solution-card">
				<div class="solution-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
					</svg>
				</div>
				<h3 class="solution-title">Real Instructors</h3>
				<p class="solution-text">Not tutorial readers. Founders, CTOs, engineers who've shipped real products. They teach what works.</p>
			</div>
			<div class="solution-card">
				<div class="solution-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
						<polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
						<line x1="12" y1="22.08" x2="12" y2="12"/>
					</svg>
				</div>
				<h3 class="solution-title">Ship Your Project</h3>
				<p class="solution-text">Not a fake tutorial app. YOUR idea, with AI features, deployed and live by Week 4.</p>
			</div>
			<div class="solution-card">
				<div class="solution-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
						<path d="M2 12h20"/>
						<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
					</svg>
				</div>
				<h3 class="solution-title">Penang Experience</h3>
				<p class="solution-text">Work from a beautiful island in Southeast Asia. Food, culture, beaches — and a shipped product.</p>
			</div>
			<div class="solution-card">
				<div class="solution-icon">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 20h9"/>
						<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
					</svg>
				</div>
				<h3 class="solution-title">AI-Powered Features</h3>
				<p class="solution-text">LLM integrations, n8n automation, the tools that make products actually useful. Not theory — implementation.</p>
			</div>
		</div>
	</div>
</section>

<!-- What You'll Build Section -->
<section class="section section-elevated" id="outcomes">
	<div class="container">
		<div class="outcomes-header">
			<span class="section-label section-label-dark">What You'll Build</span>
			<h2 class="section-heading light-text">Real products. Shipped by real people.</h2>
			<p class="section-intro light-text-muted">Every graduate walks away with a deployed product. Here's what's possible in 4 weeks.</p>
		</div>
		<div class="outcomes-grid">
			<div class="outcome-card">
				<div class="outcome-image">
					<div class="outcome-placeholder">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
							<line x1="8" y1="21" x2="16" y2="21"/>
							<line x1="12" y1="17" x2="12" y2="21"/>
						</svg>
					</div>
				</div>
				<div class="outcome-content">
					<span class="outcome-type">SaaS</span>
					<h3 class="outcome-title">AI Writing Assistant</h3>
					<p class="outcome-description">Email and content generator with brand voice training. Integrated LLM, user auth, and Stripe billing.</p>
				</div>
			</div>
			<div class="outcome-card">
				<div class="outcome-image">
					<div class="outcome-placeholder">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
						</svg>
					</div>
				</div>
				<div class="outcome-content">
					<span class="outcome-type">Internal Tool</span>
					<h3 class="outcome-title">Customer Support Bot</h3>
					<p class="outcome-description">RAG-powered chatbot trained on company docs. Reduced ticket volume by 40%.</p>
				</div>
			</div>
			<div class="outcome-card">
				<div class="outcome-image">
					<div class="outcome-placeholder">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<line x1="18" y1="20" x2="18" y2="10"/>
							<line x1="12" y1="20" x2="12" y2="4"/>
							<line x1="6" y1="20" x2="6" y2="14"/>
						</svg>
					</div>
				</div>
				<div class="outcome-content">
					<span class="outcome-type">Analytics</span>
					<h3 class="outcome-title">SEO Dashboard</h3>
					<p class="outcome-description">Real-time keyword tracking with AI-generated content briefs. Automated weekly reports via n8n.</p>
				</div>
			</div>
			<div class="outcome-card">
				<div class="outcome-image">
					<div class="outcome-placeholder">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
							<polyline points="22,6 12,13 2,6"/>
						</svg>
					</div>
				</div>
				<div class="outcome-content">
					<span class="outcome-type">Automation</span>
					<h3 class="outcome-title">Email Marketing Suite</h3>
					<p class="outcome-description">Automated sequences with AI personalization. Full CRM integration and analytics.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Curriculum Section -->
<section class="section section-dark" id="curriculum">
	<div class="container">
		<div class="curriculum-header">
			<span class="section-label">The Curriculum</span>
			<h2 class="section-heading">4 weeks. 4 milestones. 1 shipped product.</h2>
			<p class="section-intro">Each week builds on the last. By the end, you'll have a complete, deployed product.</p>
		</div>
		<div class="curriculum-timeline">
			{#each curriculum as week, index}
				<div class="curriculum-week">
					<div class="week-marker">
						<span class="week-number">Week {week.week}</span>
						<div class="week-line"></div>
					</div>
					<div class="week-content">
						<h3 class="week-title">{week.title}</h3>
						<p class="week-description">{week.description}</p>
						<ul class="week-outcomes">
							{#each week.outcomes as outcome}
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
		<div class="curriculum-note">
			<div class="note-icon">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<line x1="12" y1="16" x2="12" y2="12"/>
					<line x1="12" y1="8" x2="12.01" y2="8"/>
				</svg>
			</div>
			<div class="note-content">
				<strong>Daily structure:</strong> Mornings (9am-12pm) are online async work. Afternoons (2pm-6pm) are live in-person sessions. This hybrid format prevents burnout while maintaining momentum.
			</div>
		</div>
	</div>
</section>

<!-- Instructors Section -->
<section class="section section-elevated" id="instructors">
	<div class="container">
		<div class="instructors-header">
			<span class="section-label section-label-dark">Your Instructors</span>
			<h2 class="section-heading light-text">Builders, not lecturers</h2>
			<p class="section-intro light-text-muted">Our instructors have shipped real products, built real companies, and made real mistakes. They teach what works.</p>
		</div>
		<div class="instructors-grid">
			<div class="instructor-card">
				<div class="instructor-image">
					<div class="instructor-placeholder"></div>
				</div>
				<h3 class="instructor-name">Lead Instructor</h3>
				<p class="instructor-role">Full Stack & AI</p>
				<p class="instructor-bio">10+ years building products. Former CTO. Shipped 3 startups. Obsessed with developer experience.</p>
				<div class="instructor-creds">
					<span class="cred-tag">SvelteKit</span>
					<span class="cred-tag">AI/LLMs</span>
					<span class="cred-tag">Product</span>
				</div>
			</div>
			<div class="instructor-card">
				<div class="instructor-image">
					<div class="instructor-placeholder"></div>
				</div>
				<h3 class="instructor-name">Co-Instructor</h3>
				<p class="instructor-role">Design & Frontend</p>
				<p class="instructor-bio">Design-to-code specialist. Built products used by millions. Teaches practical design systems.</p>
				<div class="instructor-creds">
					<span class="cred-tag">UI/UX</span>
					<span class="cred-tag">CSS</span>
					<span class="cred-tag">Figma</span>
				</div>
			</div>
			<div class="instructor-card">
				<div class="instructor-image">
					<div class="instructor-placeholder"></div>
				</div>
				<h3 class="instructor-name">Guest Instructor</h3>
				<p class="instructor-role">Growth & SEO</p>
				<p class="instructor-bio">Grew organic traffic from 0 to 1M/month. Teaches distribution strategies that actually work.</p>
				<div class="instructor-creds">
					<span class="cred-tag">SEO</span>
					<span class="cred-tag">Content</span>
					<span class="cred-tag">Analytics</span>
				</div>
			</div>
		</div>
		<div class="instructors-cta">
			<a href="/instructors" class="btn btn-secondary">View full instructor profiles</a>
		</div>
	</div>
</section>

<!-- LOCATION EXPERIENCE - Builder's Retreat -->
<section class="section section-alt location-experience" id="location">
	<div class="container location-grid">
		<div class="location-content">
			<div class="location-badge">The Setting</div>
			<h2 class="location-heading">
				The Builder's Retreat: <span class="highlight">Penang.</span>
			</h2>
			<p class="location-text">
				Escape the noise. Build in a UNESCO World Heritage tropical hub where
				high-performance meets low-stress.
			</p>
			<p class="location-description">
				There's a reason builders flock to Georgetown. Beyond the world-class
				street food and vibrant culture, it's the ultimate forcing function for
				deep work. Spend 4 weeks in a boutique space surrounded by 12 select
				builders, where the atmosphere keeps your creativity flowing and your
				focus sharp.
			</p>
			<ul class="location-highlights">
				<li>
					<span class="highlight-icon">🌴</span>
					<div class="highlight-text">
						<strong>Tropical Deep Work</strong>
						<span>4 weeks of undistracted focus in a tropical paradise.</span>
					</div>
				</li>
				<li>
					<span class="highlight-icon">🍜</span>
					<div class="highlight-text">
						<strong>Culinary Capital</strong>
						<span>Fuel your build with the world's best RM 5 street food.</span>
					</div>
				</li>
				<li>
					<span class="highlight-icon">🏰</span>
					<div class="highlight-text">
						<strong>Heritage Hub</strong>
						<span>Build from a modern space in a historic UNESCO district.</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="location-visual">
			<div class="location-image-wrapper">
				<img
					src="/images/code-zero-penang-love-lane.png"
					alt="Love Lane, Georgetown, Penang"
					class="location-img"
				/>
				<div class="location-caption">
					<span class="dot"></span> Love Lane, Georgetown
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Testimonials Section -->
<section class="section section-dark">
	<div class="container">
		<div class="testimonials-header">
			<span class="section-label">What Builders Say</span>
			<div class="testimonials-stat">51+</div>
			<p class="testimonials-sublabel">products shipped by our graduates</p>
		</div>
		<div class="testimonials-carousel">
			{#each testimonials as testimonial}
				<div class="testimonial-card">
					<div class="testimonial-result">{testimonial.result}</div>
					<p class="testimonial-quote">"{testimonial.quote}"</p>
					<div class="testimonial-author">
						<div class="author-avatar">
							<div class="avatar-placeholder"></div>
						</div>
						<div class="author-info">
							<span class="author-name">{testimonial.name}</span>
							<span class="author-role">{testimonial.role}</span>
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
			<h2 class="section-heading light-text">One price. Everything included.</h2>
			<p class="section-intro light-text-muted">No hidden fees. No upsells. Just 4 weeks of focused building.</p>
		</div>
		<div class="pricing-card">
			<div class="pricing-badge">Most Popular</div>
			<div class="pricing-header-card">
				<h3 class="pricing-name">Full Stack Web Development</h3>
				<p class="pricing-tagline">4 weeks to ship your product</p>
			</div>
			<div class="pricing-price">
				<span class="price-amount">RM 9,800</span>
				<span class="price-period">one-time</span>
			</div>
			<div class="pricing-conversion">~$2,100 USD</div>
			<ul class="pricing-features">
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					4 weeks of intensive curriculum
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					Daily live sessions in Penang
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					1-on-1 code reviews
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					AI tools & integrations covered
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					Lifetime access to materials
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					Alumni community access
				</li>
				<li>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					Post-program support
				</li>
			</ul>
			<button onclick={handleApply} class="btn btn-primary btn-lg btn-full">Start Learning</button>
			<p class="pricing-note">Only 12 spots per intake. Applications reviewed within 48 hours.</p>
		</div>
		<div class="pricing-guarantee">
			<div class="guarantee-icon">
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
					<polyline points="9 12 11 14 15 10"/>
				</svg>
			</div>
			<div class="guarantee-content">
				<h4 class="guarantee-title">Ship or Refund Guarantee</h4>
				<p class="guarantee-text">If you show up every day, do the work, and still don't ship a working product by Week 4, we'll refund your full tuition. No questions asked.</p>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="section section-dark" id="faq">
	<div class="container">
		<div class="faq-header">
			<span class="section-label">FAQ</span>
			<h2 class="section-heading">Common questions</h2>
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

<!-- Final CTA Section -->
<section class="section section-cta" id="apply">
	<div class="container">
		<div class="cta-content">
			<h2 class="cta-heading">Ready to finally ship?</h2>
			<p class="cta-text">Join 12 builders in Penang. 4 weeks. 1 product. Stop buying courses. Start shipping.</p>
			<div class="cta-form">
				<div class="form-group">
					<button onclick={handleApply} class="btn btn-primary btn-lg" style="width: 100%;">Start Learning</button>
				</div>
				<p class="form-note">We'll send you the application form. No spam, ever.</p>
			</div>
			<div class="cta-urgency">
				<span class="urgency-badge">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
						<polyline points="12 6 12 12 16 14"/>
					</svg>
					March 2025 intake: 4 spots remaining
				</span>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<span class="logo-text">code<span class="logo-accent">:zero</span></span>
				<p class="footer-tagline">Build your freedom.</p>
			</div>
			<div class="footer-links">
				<a href="/instructors">Instructors</a>
				<a href="#curriculum">Curriculum</a>
				<a href="#faq">FAQ</a>
				<a href="/enterprise">Enterprise Training</a>
			</div>
			<div class="footer-social">
				<a href="#" aria-label="Twitter">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
				</a>
				<a href="#" aria-label="Instagram">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
						<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
					</svg>
				</a>
				<a href="#" aria-label="LinkedIn">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				</a>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; 2025 code:zero. All rights reserved.</p>
			<p class="footer-location">Based in Penang, Malaysia</p>
		</div>
	</div>
</footer>

<style>
	/* ===================================
	   CSS Variables (Design System)
	   =================================== */
	:global(:root) {
		/* Core Brand */
		--color-primary: #04A459;
		--color-primary-light: #2ECC71;
		--color-primary-dark: #038544;

		/* Gradients */
		--gradient-accent: linear-gradient(135deg, #04A459 0%, #2ECC71 100%);
		--gradient-glow: radial-gradient(ellipse at center, rgba(4, 164, 89, 0.15) 0%, transparent 70%);

		/* Dark Backgrounds */
		--bg-base: #1a1d23;
		--bg-elevated: #242933;
		--bg-surface: #2e3440;
		--bg-hover: #3b4252;

		/* Light Backgrounds */
		--bg-light: #f8f9fa;
		--bg-light-elevated: #ffffff;

		/* Text */
		--text-primary: #ffffff;
		--text-secondary: #a1a1a1;
		--text-muted: #6b7280;
		--text-on-light: #1a1d23;
		--text-on-light-muted: #4b5563;

		/* Borders */
		--border-subtle: #2e3440;
		--border-default: #3b4252;

		/* Spacing */
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

		/* Radii */
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--radius-xl: 16px;
		--radius-2xl: 24px;
		--radius-full: 9999px;

		/* Shadows */
		--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
		--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.25);
		--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.3);
		--shadow-glow-sm: 0 0 10px rgba(4, 164, 89, 0.2);
		--shadow-glow-md: 0 0 20px rgba(4, 164, 89, 0.3);

		/* Typography */
		--font-heading: 'Quicksand', system-ui, sans-serif;
		--font-body: 'Quicksand', system-ui, sans-serif;

		/* Transitions */
		--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
		--duration-fast: 150ms;
		--duration-normal: 200ms;
	}

	/* ===================================
	   Base Styles
	   =================================== */
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family: var(--font-body);
		background: var(--bg-base);
		color: var(--text-secondary);
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
	}

	/* ===================================
	   Layout
	   =================================== */
	.container {
		width: 100%;
		max-width: 1520px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	@media (min-width: 640px) {
		.container {
			padding: 0 var(--space-6);
		}
	}

	@media (min-width: 1024px) {
		.container {
			padding: 0 var(--space-8);
		}
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

	/* ===================================
	   Buttons
	   =================================== */
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

	.btn-full {
		width: 100%;
	}

	/* ===================================
	   Hero Section
	   =================================== */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: calc(80px + var(--space-12)) 0 var(--space-20);
		overflow: hidden;
	}

	.hero .container {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-12);
		align-items: center;
	}

	@media (min-width: 1024px) {
		.hero .container {
			grid-template-columns: 1.2fr 1fr;
		}
	}

	.hero-glow {
		position: absolute;
		top: 10%;
		right: -20%;
		width: 60%;
		height: 80%;
		background: radial-gradient(ellipse, rgba(4, 164, 89, 0.2) 0%, transparent 60%);
		filter: blur(80px);
		pointer-events: none;
	}

	.hero-glow-secondary {
		position: absolute;
		bottom: 20%;
		left: -10%;
		width: 40%;
		height: 60%;
		background: radial-gradient(ellipse, rgba(46, 204, 113, 0.15) 0%, transparent 60%);
		filter: blur(60px);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
	}

	.intake-status-badge {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 8px 16px;
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.25);
		border-radius: 100px;
		margin-bottom: var(--space-6);
		backdrop-filter: blur(4px);
	}

	.status-dot {
		width: 8px;
		height: 8px;
		background-color: #04a459;
		border-radius: 50%;
		box-shadow: 0 0 0 2px rgba(4, 164, 89, 0.2);
		animation: pulse-green 2s infinite;
	}

	.status-text {
		font-size: 0.9rem;
		color: var(--color-primary);
		font-weight: 500;
	}

	.status-text strong {
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@keyframes pulse-green {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(4, 164, 89, 0.7);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 6px rgba(4, 164, 89, 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(4, 164, 89, 0);
		}
	}

	.hero-heading {
		font-family: var(--font-heading);
		font-size: clamp(2.25rem, 5vw + 1rem, 3.75rem);
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
		max-width: 540px;
	}

	.text-highlight {
		color: var(--text-primary);
		font-weight: 500;
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
	}

	.hero-proof {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.proof-avatars {
		display: flex;
	}

	.proof-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px solid var(--bg-base);
		margin-right: -12px;
		background: var(--bg-surface);
	}

	.proof-avatar-more {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-primary);
		background: var(--bg-elevated);
	}

	.proof-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.proof-rating {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-weight: 600;
		color: var(--text-primary);
	}

	.proof-rating svg {
		color: #F59E0B;
	}

	.proof-count {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	/* Hero Actions */
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-bottom: var(--space-10);
	}

	.btn-xl {
		padding: 16px 32px;
		font-size: 1.1rem;
	}

	.btn-glass {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: white;
		backdrop-filter: blur(10px);
	}

	.btn-glass:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: white;
	}

	/* Trust Stack */
	.trust-stack {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding-top: var(--space-6);
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.avatar-group {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px solid var(--bg-base);
		background-size: cover;
		background-position: center;
		margin-left: -12px;
	}

	.avatar:first-child {
		margin-left: 0;
	}

	.avatar-count {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #242933;
		border: 2px solid var(--bg-base);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		font-weight: 700;
		color: white;
		margin-left: -12px;
	}

	.trust-text {
		display: flex;
		flex-direction: column;
		font-size: 0.9rem;
		line-height: 1.3;
	}

	.stars {
		color: #f59e0b;
		letter-spacing: 2px;
		font-size: 0.8rem;
	}

	.trust-text span {
		color: var(--text-muted);
	}

	/* Hero Visual */
	.hero-visual {
		display: none;
		position: relative;
		z-index: 1;
	}

	@media (min-width: 1024px) {
		.hero-visual {
			display: block;
		}
	}

	.hero-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--shadow-lg);
	}

	.card-header {
		display: flex;
		gap: 6px;
		padding: var(--space-3) var(--space-4);
		background: var(--bg-surface);
		border-bottom: 1px solid var(--border-subtle);
	}

	.card-dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--border-default);
	}

	.card-dot:first-child {
		background: #EF4444;
	}

	.card-dot:nth-child(2) {
		background: #F59E0B;
	}

	.card-dot:nth-child(3) {
		background: #10B981;
	}

	.card-content {
		padding: var(--space-6);
	}

	.card-code {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.9rem;
		line-height: 1.8;
		color: var(--text-secondary);
	}

	.code-comment {
		color: var(--text-muted);
	}

	.code-keyword {
		color: #C792EA;
	}

	.code-var {
		color: #82AAFF;
	}

	.code-bool {
		color: var(--color-primary);
	}

	.code-num {
		color: #F78C6C;
	}

	.code-string {
		color: #C3E88D;
	}

	/* Visual Card Wrapper (Hero Image) */
	.visual-card-wrapper {
		position: relative;
		width: 100%;
		max-width: 600px;
		aspect-ratio: 4/5;
	}

	.visual-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-lg);
		filter: brightness(0.9) contrast(1.1);
		transform: rotate(-2deg);
		transition: transform 0.5s ease;
	}

	.visual-card-wrapper:hover .visual-img {
		transform: rotate(0deg) scale(1.02);
	}

	.visual-card-wrapper .hero-card {
		position: absolute;
		bottom: 40px;
		left: -40px;
		width: 280px;
		animation: float 5s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	.location-floater {
		position: absolute;
		top: 40px;
		right: -20px;
		background: white;
		color: #0f1115;
		padding: 12px 20px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 12px;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
		animation: float-delayed 6s ease-in-out infinite;
	}

	.location-icon {
		font-size: 1.5rem;
	}

	.location-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 0.8rem;
		gap: 2px;
		transform: translateY(7px);
	}

	.location-text strong {
		font-weight: 700;
		line-height: 1;
		color: #0f1115;
	}

	.location-text span {
		color: #04A459;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1;
	}

	@keyframes float-delayed {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	@media (max-width: 1024px) {
		.visual-card-wrapper .hero-card {
			left: 10px;
			bottom: 20px;
			width: 240px;
		}

		.location-floater {
			right: 0;
			top: 20px;
		}
	}

	/* ===================================
	   Trust Stats Bar
	   =================================== */
	.trust-bar {
		background: var(--bg-elevated);
		border-top: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
	}

	.trust-stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-6);
		padding: var(--space-8) 0;
	}

	@media (min-width: 768px) {
		.trust-stats {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.trust-stat {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-family: var(--font-heading);
		font-size: 2.5rem;
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

	/* ===================================
	   Section Typography
	   =================================== */
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

	.section-label-dark {
		background: rgba(4, 164, 89, 0.15);
	}

	.section-heading {
		font-family: var(--font-heading);
		font-size: clamp(1.875rem, 4vw, 2.5rem);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
	}

	.light-text {
		color: var(--text-primary);
	}

	.light-text-muted {
		color: var(--text-secondary);
	}

	.section-intro {
		font-size: 1.125rem;
		color: var(--text-secondary);
		max-width: 640px;
	}

	.section-text {
		font-size: 1.125rem;
		line-height: 1.7;
		margin: 0 0 var(--space-4);
	}

	/* ===================================
	   Problem Section
	   =================================== */
	.problem-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-12);
		align-items: center;
	}

	@media (min-width: 1024px) {
		.problem-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.problem-list {
		list-style: none;
		padding: 0;
		margin: var(--space-6) 0 0;
	}

	.problem-list li {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) 0;
		font-size: 1.125rem;
		color: var(--text-secondary);
	}

	.problem-list svg {
		color: #EF4444;
		flex-shrink: 0;
	}

	.abandoned-stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.abandoned-item {
		padding: var(--space-4) var(--space-5);
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.9rem;
		color: var(--text-muted);
		opacity: 0.6;
	}

	.abandoned-highlight {
		background: rgba(4, 164, 89, 0.15);
		border-color: var(--color-primary);
		color: var(--color-primary);
		opacity: 1;
		font-weight: 600;
	}

	/* ===================================
	   Solution Section
	   =================================== */
	.solution-content {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.solution-content .section-intro {
		margin: 0 auto;
	}

	.solution-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 640px) {
		.solution-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.solution-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.solution-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		transition: transform var(--duration-normal) var(--ease-default),
					box-shadow var(--duration-normal) var(--ease-default),
					border-color var(--duration-normal) var(--ease-default);
	}

	.solution-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg), var(--shadow-glow-sm);
		border-color: var(--color-primary);
	}

	.solution-icon {
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

	.solution-title {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.solution-text {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.6;
	}

	/* ===================================
	   Outcomes Section
	   =================================== */
	.outcomes-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.outcomes-header .section-intro {
		margin: 0 auto;
	}

	.outcomes-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 640px) {
		.outcomes-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.outcome-card {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition: transform var(--duration-normal) var(--ease-default),
					box-shadow var(--duration-normal) var(--ease-default),
					border-color var(--duration-normal) var(--ease-default);
	}

	.outcome-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg), var(--shadow-glow-sm);
		border-color: var(--color-primary);
	}

	.outcome-image {
		aspect-ratio: 16 / 9;
		background: linear-gradient(135deg, var(--bg-hover) 0%, var(--bg-surface) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.outcome-placeholder {
		color: var(--text-muted);
		opacity: 0.5;
	}

	.outcome-content {
		padding: var(--space-5);
	}

	.outcome-type {
		display: inline-block;
		padding: var(--space-1) var(--space-2);
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-sm);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-primary);
		margin-bottom: var(--space-2);
	}

	.outcome-title {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.outcome-description {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.6;
	}

	/* ===================================
	   Curriculum Section
	   =================================== */
	.curriculum-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.curriculum-header .section-intro {
		margin: 0 auto;
	}

	.curriculum-timeline {
		max-width: 800px;
		margin: 0 auto;
	}

	.curriculum-week {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-6);
		margin-bottom: var(--space-8);
	}

	.week-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.week-number {
		display: flex;
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
		text-align: center;
	}

	.week-line {
		width: 2px;
		flex: 1;
		background: var(--border-default);
		margin-top: var(--space-4);
	}

	.curriculum-week:last-child .week-line {
		display: none;
	}

	.week-content {
		padding-top: var(--space-3);
	}

	.week-title {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.week-description {
		font-size: 1rem;
		color: var(--text-secondary);
		margin: 0 0 var(--space-4);
		line-height: 1.6;
	}

	.week-outcomes {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.week-outcomes li {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: var(--bg-surface);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.week-outcomes svg {
		color: var(--color-primary);
	}

	.curriculum-note {
		display: flex;
		gap: var(--space-4);
		padding: var(--space-5);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		margin-top: var(--space-8);
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

	/* ===================================
	   Instructors Section
	   =================================== */
	.instructors-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.instructors-header .section-intro {
		margin: 0 auto;
	}

	.instructors-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 768px) {
		.instructors-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.instructor-card {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		text-align: center;
		transition: transform var(--duration-normal) var(--ease-default),
					border-color var(--duration-normal) var(--ease-default);
	}

	.instructor-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-primary);
	}

	.instructor-image {
		margin-bottom: var(--space-4);
	}

	.instructor-placeholder {
		width: 96px;
		height: 96px;
		background: linear-gradient(135deg, var(--bg-hover) 0%, var(--bg-surface) 100%);
		border-radius: 50%;
		margin: 0 auto;
	}

	.instructor-name {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-1);
	}

	.instructor-role {
		font-size: 0.875rem;
		color: var(--color-primary);
		font-weight: 500;
		margin: 0 0 var(--space-3);
	}

	.instructor-bio {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0 0 var(--space-4);
		line-height: 1.6;
	}

	.instructor-creds {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-2);
	}

	.cred-tag {
		padding: var(--space-1) var(--space-2);
		background: var(--bg-hover);
		border-radius: var(--radius-sm);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-muted);
	}

	.instructors-cta {
		text-align: center;
		margin-top: var(--space-8);
	}

	/* ===================================
	   Testimonials Section
	   =================================== */
	.testimonials-header {
		text-align: center;
		margin-bottom: var(--space-10);
	}

	.testimonials-stat {
		font-family: var(--font-heading);
		font-size: 4rem;
		font-weight: 700;
		color: var(--color-primary);
		line-height: 1;
		margin: var(--space-2) 0;
	}

	.testimonials-sublabel {
		font-size: 1.125rem;
		color: var(--text-muted);
		margin: 0;
	}

	.testimonials-carousel {
		display: flex;
		gap: var(--space-6);
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		padding: var(--space-4) 0;
		-webkit-overflow-scrolling: touch;
	}

	.testimonials-carousel::-webkit-scrollbar {
		display: none;
	}

	.testimonial-card {
		flex: 0 0 340px;
		scroll-snap-align: start;
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
		font-size: 1rem;
		color: var(--text-secondary);
		line-height: 1.7;
		margin: 0 0 var(--space-4);
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.author-avatar {
		flex-shrink: 0;
	}

	.avatar-placeholder {
		width: 44px;
		height: 44px;
		background: var(--bg-surface);
		border-radius: 50%;
	}

	.author-info {
		display: flex;
		flex-direction: column;
	}

	.author-name {
		font-weight: 600;
		color: var(--text-primary);
	}

	.author-role {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	/* ===================================
	   Pricing Section
	   =================================== */
	.pricing-header {
		text-align: center;
		margin-bottom: var(--space-10);
	}

	.pricing-header .section-intro {
		margin: 0 auto;
	}

	.pricing-card {
		max-width: 480px;
		margin: 0 auto;
		background: var(--bg-surface);
		border: 2px solid var(--color-primary);
		border-radius: var(--radius-xl);
		padding: var(--space-8);
		position: relative;
	}

	.pricing-badge {
		position: absolute;
		top: -14px;
		left: 50%;
		transform: translateX(-50%);
		padding: var(--space-2) var(--space-4);
		background: var(--gradient-accent);
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: white;
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
		margin-bottom: var(--space-1);
	}

	.price-amount {
		font-family: var(--font-heading);
		font-size: 3rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.price-period {
		font-size: 1rem;
		color: var(--text-secondary);
		margin-left: var(--space-2);
	}

	.pricing-conversion {
		text-align: center;
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-bottom: var(--space-6);
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

	.pricing-features li:last-child {
		border-bottom: none;
	}

	.pricing-features svg {
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.pricing-note {
		text-align: center;
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-top: var(--space-4);
	}

	.pricing-guarantee {
		max-width: 600px;
		margin: var(--space-10) auto 0;
		display: flex;
		gap: var(--space-4);
		padding: var(--space-5);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-lg);
	}

	.guarantee-icon {
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.guarantee-title {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-1);
	}

	.guarantee-text {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.6;
	}

	/* ===================================
	   FAQ Section
	   =================================== */
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
		transition: border-color var(--duration-normal) var(--ease-default);
	}

	.faq-item:hover,
	.faq-item.open {
		border-color: var(--color-primary);
	}

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
		transition: transform var(--duration-normal) var(--ease-default);
	}

	.faq-item.open .faq-icon {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 var(--space-5) var(--space-5);
	}

	.faq-answer p {
		margin: 0;
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	/* ===================================
	   Final CTA Section
	   =================================== */
	.section-cta {
		background: linear-gradient(180deg, var(--bg-base) 0%, #0f1115 100%);
		padding: var(--space-24) 0;
	}

	.cta-content {
		max-width: 640px;
		margin: 0 auto;
		text-align: center;
	}

	.cta-heading {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 4vw, 3rem);
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
		margin-bottom: var(--space-6);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	@media (min-width: 640px) {
		.form-group {
			flex-direction: row;
		}
	}

	.input {
		flex: 1;
		padding: var(--space-4);
		background: var(--bg-surface);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-lg);
		color: var(--text-primary);
		font-family: var(--font-body);
		font-size: 1rem;
	}

	.input::placeholder {
		color: var(--text-muted);
	}

	.input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(4, 164, 89, 0.15);
	}

	.input-lg {
		padding: var(--space-4) var(--space-5);
	}

	.form-note {
		font-size: 0.875rem;
		color: var(--text-muted);
		margin: var(--space-3) 0 0;
	}

	.cta-urgency {
		display: flex;
		justify-content: center;
	}

	.urgency-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: rgba(245, 158, 11, 0.1);
		border: 1px solid rgba(245, 158, 11, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 500;
		color: #F59E0B;
	}

	/* ===================================
	   Footer
	   =================================== */
	.footer {
		background: var(--bg-elevated);
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-12) 0 var(--space-8);
	}

	.footer-content {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-8);
		margin-bottom: var(--space-8);
	}

	@media (min-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr auto auto;
			align-items: start;
		}
	}

	.footer-tagline {
		font-size: 0.9375rem;
		color: var(--text-muted);
		margin: var(--space-2) 0 0;
	}

	.footer-links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.footer-links a {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9375rem;
		transition: color var(--duration-fast) var(--ease-default);
	}

	.footer-links a:hover {
		color: var(--color-primary);
	}

	.footer-social {
		display: flex;
		gap: var(--space-3);
	}

	.footer-social a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--bg-surface);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		transition: background var(--duration-fast) var(--ease-default),
					color var(--duration-fast) var(--ease-default);
	}

	.footer-social a:hover {
		background: var(--color-primary);
		color: white;
	}

	.footer-bottom {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding-top: var(--space-6);
		border-top: 1px solid var(--border-subtle);
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	@media (min-width: 640px) {
		.footer-bottom {
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.footer-bottom p {
		margin: 0;
	}

	/* ===================================
	   Builder's Retreat / Location Section
	   =================================== */
	.location-experience {
		background: var(--bg-surface);
	}

	.location-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-12);
		align-items: center;
	}

	@media (min-width: 1024px) {
		.location-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.location-content {
		max-width: 540px;
	}

	.location-badge {
		display: inline-block;
		padding: var(--space-2) var(--space-4);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-primary);
		margin-bottom: var(--space-4);
	}

	.location-heading {
		font-family: var(--font-heading);
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		line-height: 1.2;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
	}

	.location-heading .highlight {
		background: var(--gradient-accent);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.location-text {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.7;
		margin: 0 0 var(--space-4);
	}

	.location-description {
		font-size: 0.9rem;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0 0 var(--space-6);
	}

	.location-highlights {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.location-highlights li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
	}

	.highlight-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.highlight-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.highlight-text strong {
		font-weight: 600;
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.highlight-text span {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.location-visual {
		display: flex;
		justify-content: center;
	}

	.location-image-wrapper {
		position: relative;
		width: 100%;
		max-width: 500px;
	}

	.location-img {
		width: 100%;
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-lg);
	}

	.location-caption {
		position: absolute;
		bottom: var(--space-4);
		left: var(--space-4);
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(10px);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		font-size: 0.75rem;
		color: white;
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.location-caption .dot {
		width: 6px;
		height: 6px;
		background: #10B981;
		border-radius: 50%;
	}
</style>
