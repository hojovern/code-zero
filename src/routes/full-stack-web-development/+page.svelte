<script lang="ts">
	import { openLoginModal, openApplyModal } from '$lib/stores/auth';

	let { data } = $props();

	let mobileMenuOpen = $state(false);
	let openFaq = $state<number | null>(null);

	function handleApply(e: MouseEvent) {
		e.preventDefault();
		mobileMenuOpen = false;
		openApplyModal();
	}

	function handleStudentPortal(e: MouseEvent) {
		e.preventDefault();
		mobileMenuOpen = false;
		if (data.isLoggedIn) {
			window.location.href = '/student-portal';
		} else {
			openLoginModal();
		}
	}

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}

	const stats = [
		{ value: '94%', label: 'Ship Rate', description: 'Students who complete the program ship a working product' },
		{ value: '200+', label: 'Graduates', description: 'Builders who\'ve gone through our programs' },
		{ value: '4.9/5', label: 'Rating', description: 'Average student satisfaction score' },
		{ value: '47', label: 'Products Launched', description: 'Real products shipped by our students' }
	];

	const problems = [
		{ icon: '📚', title: 'Tutorial Hell', description: 'You\'ve bought courses, watched videos, followed along... but never built anything real.' },
		{ icon: '🔄', title: 'Endless Planning', description: 'Your Notion is full of product ideas, but none of them have seen the light of day.' },
		{ icon: '😰', title: 'Imposter Syndrome', description: 'You don\'t feel "ready" to build, so you keep learning instead of doing.' },
		{ icon: '🏝️', title: 'Building Alone', description: 'No accountability, no feedback, no one to unstick you when you\'re blocked.' }
	];

	const curriculum = [
		{
			week: 1,
			title: 'Foundation & First Deploy',
			emoji: '🚀',
			description: 'Set up your development environment, build your first pages, and deploy to production. Yes, on Day 1.',
			outcomes: [
				'Development environment configured',
				'SvelteKit fundamentals mastered',
				'Core pages built and styled',
				'Live on the internet by Friday'
			],
			highlight: 'You\'ll have a live website within 48 hours'
		},
		{
			week: 2,
			title: 'Backend & Data',
			emoji: '🗄️',
			description: 'Add authentication, database, and real functionality. Your app goes from static to dynamic.',
			outcomes: [
				'User authentication working',
				'Database connected with Supabase',
				'CRUD operations implemented',
				'Core features functional'
			],
			highlight: 'Users can sign up and use your product'
		},
		{
			week: 3,
			title: 'AI Integration',
			emoji: '🤖',
			description: 'Add AI-powered features that make your product actually useful. LLMs, automation, the works.',
			outcomes: [
				'LLM APIs integrated',
				'AI features that solve real problems',
				'Automation workflows with n8n',
				'Product differentiation achieved'
			],
			highlight: 'Your product does things competitors can\'t'
		},
		{
			week: 4,
			title: 'Polish & Ship',
			emoji: '✨',
			description: 'Refine UX, squash bugs, and launch. Demo day is real — you\'ll present to the cohort.',
			outcomes: [
				'UI/UX polished and professional',
				'Edge cases handled',
				'Performance optimized',
				'Launched and ready for users'
			],
			highlight: 'Walk away with a product you can show anyone'
		}
	];

	const testimonials = [
		{
			quote: "I'd been stuck on my SaaS idea for 2 years. In 4 weeks, I finally shipped it. The accountability and structure made all the difference.",
			name: 'Sarah Chen',
			role: 'Founder, DataPulse',
			avatar: 'SC',
			result: 'Launched SaaS with 50+ paying users',
			rating: 5
		},
		{
			quote: "As a designer, I always wanted to build my own products. code:zero gave me the technical skills without the 'learn to code' fluff.",
			name: 'Marcus Lee',
			role: 'Product Designer → Founder',
			avatar: 'ML',
			result: 'Built tool, acquired 6 months later',
			rating: 5
		},
		{
			quote: "The instructors aren't just teachers — they're builders who've shipped real products. That perspective changed everything.",
			name: 'Aisha Rahman',
			role: 'Software Engineer',
			avatar: 'AR',
			result: 'Promoted to Tech Lead',
			rating: 5
		},
		{
			quote: "I flew in from Singapore. Best investment I've made. Shipped my MVP, made friends for life, and fell in love with Penang.",
			name: 'James Tan',
			role: 'Ex-Consultant → Indie Hacker',
			avatar: 'JT',
			result: 'Now full-time on his product',
			rating: 5
		}
	];

	const whatYouGet = [
		{ icon: '🎓', title: '4 Weeks Live Training', description: 'Daily sessions with experienced builders' },
		{ icon: '👨‍💻', title: '1-on-1 Code Reviews', description: 'Personal feedback on your actual code' },
		{ icon: '🤝', title: 'Cohort of 12 Builders', description: 'Accountability partners and future collaborators' },
		{ icon: '📚', title: 'Lifetime Access', description: 'All materials, updates, and recordings forever' },
		{ icon: '🌐', title: 'Alumni Network', description: 'Private community of 200+ graduates' },
		{ icon: '🆘', title: 'Post-Program Support', description: '30 days of async support after you ship' }
	];

	const faqs = [
		{
			question: "I'm not technical. Can I still join?",
			answer: "Yes. We've had successful students from marketing, design, sales, and hospitality backgrounds. What matters is your commitment to show up and build. We teach everything from scratch — the 'technical enough' comes from doing, not from prerequisites."
		},
		{
			question: "What if I can't finish my product in 4 weeks?",
			answer: "In 4 years of running cohorts, we've had a 94% ship rate. The structure, accountability, and daily progress checks make it nearly impossible NOT to ship. You'll have a working, deployed product by Week 4."
		},
		{
			question: "Is this for beginners or experienced developers?",
			answer: "Both. Beginners build their first real product with AI features. Experienced developers finally ship that side project they've been 'meaning to build' for years. The curriculum adapts to your level."
		},
		{
			question: "What tech stack will I learn?",
			answer: "SvelteKit for frontend (fast, modern, enjoyable), Supabase for backend (auth, database, storage), and AI tools including LLM APIs and n8n for automation. These are tools real indie hackers use to ship fast."
		},
		{
			question: "Can I work on my own project idea?",
			answer: "Absolutely — we encourage it. You'll apply everything you learn to YOUR product, not some fake tutorial project. By Week 4, you'll have your own idea deployed and live."
		},
		{
			question: "What's the daily schedule?",
			answer: "Mornings (9am-12pm): Online async work — videos, exercises, building. Afternoons (2pm-6pm): Live in-person sessions in Penang — workshops, code reviews, pair programming. Weekends off."
		},
		{
			question: "I'm not in Malaysia. Can I join remotely?",
			answer: "The afternoon sessions are in-person in Penang. Many international students treat it as a 'builder's retreat' — 4 weeks in Penang, shipping a product while experiencing Southeast Asia."
		},
		{
			question: "What's included in the price?",
			answer: "Everything: 4 weeks of curriculum, daily live sessions, 1-on-1 code reviews, lifetime access to materials, alumni community, and post-program support. Accommodation is separate — Penang has great options from RM 1,500-3,000/month."
		}
	];

	const logos = ['YC', 'Grab', 'Shopee', 'Google', 'Meta'];
</script>

<svelte:head>
	<title>Full Stack Web Development — Ship Your Product in 4 Weeks | code:zero</title>
	<meta name="description" content="Stop buying courses you won't finish. Join 12 builders in Penang for 4 weeks. Ship a real product with AI features. 94% ship rate." />
	<meta property="og:title" content="Full Stack Web Development — Ship Your Product in 4 Weeks" />
	<meta property="og:description" content="Stop buying courses. Start shipping products. 4 weeks in Penang with 12 builders." />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="nav-logo">
			<span class="logo-text">code<span class="logo-accent">:zero</span></span>
		</a>
		<div class="nav-links">
			<a href="/full-stack-web-development" class="nav-link active">Full Stack Web Development</a>
			<a href="/enterprise" class="nav-link">Enterprise</a>
			<a href="/student-portal" onclick={handleStudentPortal} class="nav-link">Student Portal</a>
			<a href="/instructors" class="nav-link">Instructors</a>
			<a href="/blog" class="nav-link">Blog</a>
		</div>
		<button onclick={handleApply} class="btn btn-primary btn-nav">Apply Now</button>

		<button class="mobile-menu-btn" onclick={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Toggle menu">
			{#if mobileMenuOpen}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 6L6 18M6 6l12 12"/>
				</svg>
			{:else}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M3 12h18M3 6h18M3 18h18"/>
				</svg>
			{/if}
		</button>
	</div>

	{#if mobileMenuOpen}
		<div class="mobile-menu">
			<a href="/full-stack-web-development" class="mobile-link" onclick={() => mobileMenuOpen = false}>Full Stack Web Development</a>
			<a href="/enterprise" class="mobile-link" onclick={() => mobileMenuOpen = false}>Enterprise</a>
			<a href="/student-portal" onclick={handleStudentPortal} class="mobile-link">Student Portal</a>
			<a href="/instructors" class="mobile-link" onclick={() => mobileMenuOpen = false}>Instructors</a>
			<a href="/blog" class="mobile-link" onclick={() => mobileMenuOpen = false}>Blog</a>
			<button onclick={handleApply} class="btn btn-primary btn-full">Apply Now</button>
		</div>
	{/if}
</nav>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-bg">
		<div class="hero-gradient"></div>
		<div class="hero-grid"></div>
	</div>
	<div class="container">
		<div class="hero-badge">
			<span class="badge-dot"></span>
			<span>March 2025 Intake — Only 4 Spots Left</span>
		</div>

		<h1 class="hero-heading">
			Stop buying courses.<br/>
			<span class="gradient-text">Start shipping products.</span>
		</h1>

		<p class="hero-subheading">
			4 weeks in Penang. 12 builders. 1 mission: ship your product with AI-powered features — deployed, live, and real. Not another tutorial you won't finish.
		</p>

		<div class="hero-cta">
			<button onclick={handleApply} class="btn btn-primary btn-lg btn-glow">
				Apply for March Intake
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</button>
			<a href="#curriculum" class="btn btn-secondary btn-lg">See Curriculum</a>
		</div>

		<div class="hero-proof">
			<div class="proof-avatars">
				<div class="avatar">SC</div>
				<div class="avatar">ML</div>
				<div class="avatar">AR</div>
				<div class="avatar">JT</div>
				<div class="avatar avatar-more">+47</div>
			</div>
			<p class="proof-text">Join 200+ builders who've shipped real products</p>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section class="stats-section">
	<div class="container">
		<div class="stats-grid">
			{#each stats as stat}
				<div class="stat-card">
					<div class="stat-value">{stat.value}</div>
					<div class="stat-label">{stat.label}</div>
					<div class="stat-description">{stat.description}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Problem Section -->
<section class="section problem-section">
	<div class="container">
		<div class="section-header">
			<span class="section-eyebrow">Sound Familiar?</span>
			<h2 class="section-heading">You've tried everything.<br/><span class="text-muted">Nothing stuck.</span></h2>
		</div>

		<div class="problems-grid">
			{#each problems as problem}
				<div class="problem-card">
					<span class="problem-icon">{problem.icon}</span>
					<h3 class="problem-title">{problem.title}</h3>
					<p class="problem-description">{problem.description}</p>
				</div>
			{/each}
		</div>

		<div class="problem-cta">
			<p class="problem-lead">The problem isn't you. It's the approach.</p>
			<p class="problem-solution">You don't need more tutorials. You need a <strong>forcing function</strong> — structure, accountability, and a deadline that actually matters.</p>
		</div>
	</div>
</section>

<!-- Solution Section -->
<section class="section solution-section">
	<div class="container">
		<div class="section-header">
			<span class="section-eyebrow">The Solution</span>
			<h2 class="section-heading">4 weeks to ship.<br/><span class="gradient-text">No excuses.</span></h2>
		</div>

		<div class="solution-content">
			<div class="solution-main">
				<p class="solution-lead">code:zero is not an online course. It's a 4-week immersive program where you build and ship a real product — in person, with 12 other builders, in Penang.</p>

				<div class="solution-features">
					<div class="feature">
						<div class="feature-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
								<circle cx="9" cy="7" r="4"/>
								<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
								<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
							</svg>
						</div>
						<div class="feature-content">
							<h4>Small Cohorts</h4>
							<p>12 builders max. Everyone gets attention. Everyone ships.</p>
						</div>
					</div>
					<div class="feature">
						<div class="feature-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
								<line x1="16" y1="2" x2="16" y2="6"/>
								<line x1="8" y1="2" x2="8" y2="6"/>
								<line x1="3" y1="10" x2="21" y2="10"/>
							</svg>
						</div>
						<div class="feature-content">
							<h4>Daily Accountability</h4>
							<p>Morning standups. Afternoon sessions. Progress every single day.</p>
						</div>
					</div>
					<div class="feature">
						<div class="feature-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
							</svg>
						</div>
						<div class="feature-content">
							<h4>Real Outcomes</h4>
							<p>94% ship rate. Not completion certificates — working products.</p>
						</div>
					</div>
				</div>
			</div>

			<div class="solution-visual">
				<div class="visual-card">
					<div class="visual-header">
						<span class="visual-badge">What You'll Build</span>
					</div>
					<ul class="visual-list">
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Full-stack web application
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							User authentication & database
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							AI-powered features (LLMs)
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Automation workflows
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Deployed to production
						</li>
					</ul>
					<div class="visual-footer">
						<span class="visual-note">Your idea. Your product. Live on the internet.</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Curriculum Section -->
<section class="section curriculum-section" id="curriculum">
	<div class="container">
		<div class="section-header">
			<span class="section-eyebrow">The Curriculum</span>
			<h2 class="section-heading">Week by week.<br/><span class="gradient-text">From zero to shipped.</span></h2>
		</div>

		<div class="curriculum-timeline">
			{#each curriculum as week, i}
				<div class="curriculum-week">
					<div class="week-marker">
						<span class="week-emoji">{week.emoji}</span>
						<span class="week-number">Week {week.week}</span>
					</div>
					<div class="week-content">
						<h3 class="week-title">{week.title}</h3>
						<p class="week-description">{week.description}</p>
						<ul class="week-outcomes">
							{#each week.outcomes as outcome}
								<li>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="20 6 9 17 4 12"/>
									</svg>
									{outcome}
								</li>
							{/each}
						</ul>
						<div class="week-highlight">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
							</svg>
							{week.highlight}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- What You Get Section -->
<section class="section benefits-section">
	<div class="container">
		<div class="section-header">
			<span class="section-eyebrow">What's Included</span>
			<h2 class="section-heading">Everything you need.<br/><span class="text-muted">Nothing you don't.</span></h2>
		</div>

		<div class="benefits-grid">
			{#each whatYouGet as benefit}
				<div class="benefit-card">
					<span class="benefit-icon">{benefit.icon}</span>
					<h3 class="benefit-title">{benefit.title}</h3>
					<p class="benefit-description">{benefit.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Testimonials Section -->
<section class="section testimonials-section">
	<div class="container">
		<div class="section-header">
			<span class="section-eyebrow">Success Stories</span>
			<h2 class="section-heading">They shipped.<br/><span class="gradient-text">You can too.</span></h2>
		</div>

		<div class="testimonials-grid">
			{#each testimonials as testimonial}
				<div class="testimonial-card">
					<div class="testimonial-stars">
						{#each Array(testimonial.rating) as _}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
							</svg>
						{/each}
					</div>
					<blockquote class="testimonial-quote">"{testimonial.quote}"</blockquote>
					<div class="testimonial-result">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
							<polyline points="22 4 12 14.01 9 11.01"/>
						</svg>
						{testimonial.result}
					</div>
					<div class="testimonial-author">
						<div class="author-avatar">{testimonial.avatar}</div>
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
<section class="section pricing-section" id="pricing">
	<div class="container">
		<div class="pricing-card">
			<div class="pricing-header">
				<span class="pricing-badge">March 2025 Intake</span>
				<div class="pricing-amount">
					<span class="currency">RM</span>
					<span class="price">9,800</span>
				</div>
				<p class="pricing-note">One-time payment. No hidden fees.</p>
			</div>

			<div class="pricing-includes">
				<h4>Everything included:</h4>
				<ul>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						4 weeks of live, in-person training
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						Daily workshops and code reviews
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						1-on-1 mentorship sessions
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						Lifetime access to all materials
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						Alumni community access
					</li>
					<li>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
						30 days post-program support
					</li>
				</ul>
			</div>

			<button onclick={handleApply} class="btn btn-primary btn-lg btn-full btn-glow">
				Apply for March Intake
			</button>

			<p class="pricing-spots">
				<span class="spots-indicator"></span>
				Only 4 spots remaining
			</p>

			<div class="pricing-guarantee">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
					<polyline points="9 12 11 14 15 10"/>
				</svg>
				<div>
					<strong>Ship or Money Back</strong>
					<p>If you complete the program and don't ship a working product, we'll refund you in full.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="section faq-section" id="faq">
	<div class="container">
		<div class="section-header">
			<span class="section-eyebrow">FAQ</span>
			<h2 class="section-heading">Questions?<br/><span class="text-muted">We've got answers.</span></h2>
		</div>

		<div class="faq-list">
			{#each faqs as faq, i}
				<div class="faq-item" class:open={openFaq === i}>
					<button class="faq-question" onclick={() => toggleFaq(i)}>
						<span>{faq.question}</span>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="6 9 12 15 18 9"/>
						</svg>
					</button>
					{#if openFaq === i}
						<div class="faq-answer">
							<p>{faq.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Final CTA Section -->
<section class="section final-cta-section">
	<div class="container">
		<div class="final-cta-content">
			<h2 class="final-cta-heading">Ready to finally ship?</h2>
			<p class="final-cta-text">Join 12 builders in Penang. 4 weeks. Your product, deployed and live.</p>

			<button onclick={handleApply} class="btn btn-primary btn-xl btn-glow">
				Apply for March 2025
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</button>

			<p class="final-cta-note">Applications reviewed within 48 hours</p>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<div class="footer-brand">
				<span class="footer-logo">code<span>:zero</span></span>
				<p>Build your freedom.</p>
			</div>
			<div class="footer-links">
				<a href="/full-stack-web-development">Course</a>
				<a href="/instructors">Instructors</a>
				<a href="/blog">Blog</a>
				<a href="/enterprise">Enterprise</a>
			</div>
			<div class="footer-social">
				<a href="#" aria-label="Instagram">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
						<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
					</svg>
				</a>
				<a href="#" aria-label="Twitter">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
					</svg>
				</a>
				<a href="#" aria-label="LinkedIn">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
						<rect x="2" y="9" width="4" height="12"/>
						<circle cx="4" cy="4" r="2"/>
					</svg>
				</a>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; 2025 code:zero. All rights reserved.</p>
		</div>
	</div>
</footer>

<style>
	/* Base Styles */
	:global(body) {
		background: var(--bg-base);
		color: var(--text-primary);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	/* Navigation */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: rgba(26, 29, 35, 0.8);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid var(--border-subtle);
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-4) var(--space-6);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-logo {
		text-decoration: none;
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo-accent {
		color: var(--color-primary);
	}

	.nav-links {
		display: flex;
		gap: var(--space-6);
	}

	.nav-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9375rem;
		font-weight: 500;
		transition: color 0.2s;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--text-primary);
	}

	.mobile-menu-btn {
		display: none;
		background: none;
		border: none;
		color: var(--text-primary);
		cursor: pointer;
		padding: var(--space-2);
	}

	.mobile-menu {
		display: none;
		flex-direction: column;
		padding: var(--space-4) var(--space-6) var(--space-6);
		gap: var(--space-4);
		border-top: 1px solid var(--border-subtle);
	}

	.mobile-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 1rem;
		padding: var(--space-2) 0;
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		font-family: var(--font-body);
		font-weight: 600;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.2s;
		text-decoration: none;
	}

	.btn-nav {
		padding: var(--space-2) var(--space-4);
		font-size: 0.875rem;
	}

	.btn-lg {
		padding: var(--space-4) var(--space-6);
		font-size: 1rem;
	}

	.btn-xl {
		padding: var(--space-5) var(--space-8);
		font-size: 1.125rem;
	}

	.btn-full {
		width: 100%;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background: var(--color-primary-light);
		transform: translateY(-2px);
	}

	.btn-glow {
		box-shadow: 0 4px 20px rgba(4, 164, 89, 0.3);
	}

	.btn-glow:hover {
		box-shadow: 0 8px 30px rgba(4, 164, 89, 0.4);
	}

	.btn-secondary {
		background: var(--bg-elevated);
		color: var(--text-primary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover {
		background: var(--bg-surface);
		border-color: var(--color-primary);
	}

	/* Hero Section */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: calc(80px + var(--space-12)) 0 var(--space-16);
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero-gradient {
		position: absolute;
		top: -50%;
		left: -25%;
		width: 150%;
		height: 150%;
		background: radial-gradient(ellipse at 30% 20%, rgba(4, 164, 89, 0.15) 0%, transparent 50%),
					radial-gradient(ellipse at 70% 80%, rgba(4, 164, 89, 0.08) 0%, transparent 40%);
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
						  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
	}

	.hero .container {
		position: relative;
		z-index: 1;
		text-align: center;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-full);
		color: var(--color-primary);
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: var(--space-8);
	}

	.badge-dot {
		width: 8px;
		height: 8px;
		background: var(--color-primary);
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.5; transform: scale(0.9); }
	}

	.hero-heading {
		font-family: var(--font-heading);
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 800;
		line-height: 1.1;
		margin-bottom: var(--space-6);
		color: var(--text-primary);
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--color-primary) 0%, #06d66b 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subheading {
		font-size: clamp(1.125rem, 2vw, 1.375rem);
		color: var(--text-secondary);
		line-height: 1.6;
		max-width: 700px;
		margin: 0 auto var(--space-8);
	}

	.hero-cta {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: var(--space-10);
	}

	.hero-proof {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
	}

	.proof-avatars {
		display: flex;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), #06d66b);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
		color: white;
		border: 2px solid var(--bg-base);
		margin-left: -10px;
	}

	.avatar:first-child {
		margin-left: 0;
	}

	.avatar-more {
		background: var(--bg-elevated);
		color: var(--text-secondary);
	}

	.proof-text {
		font-size: 0.9375rem;
		color: var(--text-muted);
	}

	/* Stats Section */
	.stats-section {
		padding: var(--space-12) 0;
		background: var(--bg-elevated);
		border-top: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-6);
	}

	.stat-card {
		text-align: center;
		padding: var(--space-4);
	}

	.stat-value {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--color-primary);
		margin-bottom: var(--space-1);
	}

	.stat-label {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.stat-description {
		font-size: 0.8125rem;
		color: var(--text-muted);
		line-height: 1.4;
	}

	/* Section Styles */
	.section {
		padding: var(--space-20) 0;
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.section-eyebrow {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: var(--space-4);
	}

	.section-heading {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 800;
		line-height: 1.2;
		color: var(--text-primary);
	}

	.text-muted {
		color: var(--text-muted);
	}

	/* Problem Section */
	.problem-section {
		background: var(--bg-base);
	}

	.problems-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-6);
		margin-bottom: var(--space-12);
	}

	.problem-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		transition: border-color 0.2s;
	}

	.problem-card:hover {
		border-color: rgba(239, 68, 68, 0.3);
	}

	.problem-icon {
		font-size: 2rem;
		margin-bottom: var(--space-4);
		display: block;
	}

	.problem-title {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.problem-description {
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.problem-cta {
		text-align: center;
		max-width: 600px;
		margin: 0 auto;
	}

	.problem-lead {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.problem-solution {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.problem-solution strong {
		color: var(--color-primary);
	}

	/* Solution Section */
	.solution-section {
		background: var(--bg-elevated);
	}

	.solution-content {
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: var(--space-12);
		align-items: start;
	}

	.solution-lead {
		font-size: 1.25rem;
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--space-8);
	}

	.solution-features {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.feature {
		display: flex;
		gap: var(--space-4);
	}

	.feature-icon {
		width: 48px;
		height: 48px;
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.feature-content h4 {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.feature-content p {
		color: var(--text-secondary);
		font-size: 0.9375rem;
	}

	.visual-card {
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.visual-header {
		padding: var(--space-4);
		background: rgba(4, 164, 89, 0.1);
		border-bottom: 1px solid var(--border-subtle);
	}

	.visual-badge {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary);
	}

	.visual-list {
		list-style: none;
		padding: var(--space-6);
		margin: 0;
	}

	.visual-list li {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) 0;
		color: var(--text-primary);
		font-size: 0.9375rem;
		border-bottom: 1px solid var(--border-subtle);
	}

	.visual-list li:last-child {
		border-bottom: none;
	}

	.visual-list svg {
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.visual-footer {
		padding: var(--space-4);
		background: var(--bg-elevated);
		border-top: 1px solid var(--border-subtle);
	}

	.visual-note {
		font-size: 0.8125rem;
		color: var(--text-muted);
		font-style: italic;
	}

	/* Curriculum Section */
	.curriculum-section {
		background: var(--bg-base);
	}

	.curriculum-timeline {
		max-width: 800px;
		margin: 0 auto;
	}

	.curriculum-week {
		display: flex;
		gap: var(--space-6);
		padding: var(--space-8) 0;
		border-bottom: 1px solid var(--border-subtle);
	}

	.curriculum-week:last-child {
		border-bottom: none;
	}

	.week-marker {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		min-width: 100px;
	}

	.week-emoji {
		font-size: 2.5rem;
	}

	.week-number {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.week-content {
		flex: 1;
	}

	.week-title {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.week-description {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-4);
	}

	.week-outcomes {
		list-style: none;
		padding: 0;
		margin: 0 0 var(--space-4);
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-2);
	}

	.week-outcomes li {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.week-outcomes svg {
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.week-highlight {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-primary);
	}

	/* Benefits Section */
	.benefits-section {
		background: var(--bg-elevated);
	}

	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
	}

	.benefit-card {
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		text-align: center;
		transition: all 0.2s;
	}

	.benefit-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-4px);
	}

	.benefit-icon {
		font-size: 2.5rem;
		margin-bottom: var(--space-4);
		display: block;
	}

	.benefit-title {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.benefit-description {
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	/* Testimonials Section */
	.testimonials-section {
		background: var(--bg-base);
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-6);
	}

	.testimonial-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
	}

	.testimonial-stars {
		display: flex;
		gap: 2px;
		margin-bottom: var(--space-4);
		color: #fbbf24;
	}

	.testimonial-quote {
		font-size: 1rem;
		color: var(--text-primary);
		line-height: 1.7;
		margin-bottom: var(--space-4);
		font-style: italic;
	}

	.testimonial-result {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-sm);
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--color-primary);
		margin-bottom: var(--space-4);
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.author-avatar {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), #06d66b);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		font-weight: 600;
		color: white;
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
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	/* Pricing Section */
	.pricing-section {
		background: var(--bg-elevated);
	}

	.pricing-card {
		max-width: 500px;
		margin: 0 auto;
		background: var(--bg-base);
		border: 2px solid var(--color-primary);
		border-radius: var(--radius-xl);
		padding: var(--space-8);
		text-align: center;
	}

	.pricing-header {
		margin-bottom: var(--space-6);
		padding-bottom: var(--space-6);
		border-bottom: 1px solid var(--border-subtle);
	}

	.pricing-badge {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: var(--color-primary);
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		border-radius: var(--radius-sm);
		margin-bottom: var(--space-4);
	}

	.pricing-amount {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: var(--space-1);
		margin-bottom: var(--space-2);
	}

	.currency {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.price {
		font-family: var(--font-heading);
		font-size: 4rem;
		font-weight: 800;
		color: var(--text-primary);
	}

	.pricing-note {
		font-size: 0.9375rem;
		color: var(--text-muted);
	}

	.pricing-includes {
		text-align: left;
		margin-bottom: var(--space-6);
	}

	.pricing-includes h4 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--space-4);
	}

	.pricing-includes ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.pricing-includes li {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-2) 0;
		color: var(--text-primary);
		font-size: 0.9375rem;
	}

	.pricing-includes svg {
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.pricing-spots {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		margin-top: var(--space-4);
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--color-primary);
	}

	.spots-indicator {
		width: 8px;
		height: 8px;
		background: var(--color-primary);
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.pricing-guarantee {
		display: flex;
		align-items: flex-start;
		gap: var(--space-4);
		margin-top: var(--space-6);
		padding: var(--space-4);
		background: rgba(4, 164, 89, 0.05);
		border: 1px solid rgba(4, 164, 89, 0.2);
		border-radius: var(--radius-md);
		text-align: left;
	}

	.pricing-guarantee svg {
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.pricing-guarantee strong {
		display: block;
		color: var(--text-primary);
		font-size: 0.9375rem;
		margin-bottom: var(--space-1);
	}

	.pricing-guarantee p {
		font-size: 0.8125rem;
		color: var(--text-secondary);
		line-height: 1.5;
		margin: 0;
	}

	/* FAQ Section */
	.faq-section {
		background: var(--bg-base);
	}

	.faq-list {
		max-width: 700px;
		margin: 0 auto;
	}

	.faq-item {
		border-bottom: 1px solid var(--border-subtle);
	}

	.faq-question {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-5) 0;
		background: none;
		border: none;
		text-align: left;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		cursor: pointer;
		transition: color 0.2s;
	}

	.faq-question:hover {
		color: var(--color-primary);
	}

	.faq-question svg {
		transition: transform 0.2s;
		color: var(--text-muted);
		flex-shrink: 0;
	}

	.faq-item.open .faq-question svg {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 0 var(--space-5);
	}

	.faq-answer p {
		color: var(--text-secondary);
		line-height: 1.7;
	}

	/* Final CTA Section */
	.final-cta-section {
		background: linear-gradient(180deg, var(--bg-elevated) 0%, var(--bg-base) 100%);
		padding: var(--space-20) 0;
	}

	.final-cta-content {
		text-align: center;
		max-width: 600px;
		margin: 0 auto;
	}

	.final-cta-heading {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 800;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.final-cta-text {
		font-size: 1.25rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-8);
	}

	.final-cta-note {
		margin-top: var(--space-4);
		font-size: 0.9375rem;
		color: var(--text-muted);
	}

	/* Footer */
	.footer {
		background: var(--bg-base);
		border-top: 1px solid var(--border-subtle);
		padding: var(--space-12) 0 var(--space-6);
	}

	.footer-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-8);
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.footer-logo {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.footer-logo span {
		color: var(--color-primary);
	}

	.footer-brand p {
		font-size: 0.875rem;
		color: var(--text-muted);
	}

	.footer-links {
		display: flex;
		gap: var(--space-6);
	}

	.footer-links a {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9375rem;
		transition: color 0.2s;
	}

	.footer-links a:hover {
		color: var(--text-primary);
	}

	.footer-social {
		display: flex;
		gap: var(--space-4);
	}

	.footer-social a {
		color: var(--text-muted);
		transition: color 0.2s;
	}

	.footer-social a:hover {
		color: var(--color-primary);
	}

	.footer-bottom {
		text-align: center;
		padding-top: var(--space-6);
		border-top: 1px solid var(--border-subtle);
	}

	.footer-bottom p {
		font-size: 0.8125rem;
		color: var(--text-muted);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.nav-links {
			display: none;
		}

		.mobile-menu-btn {
			display: block;
		}

		.mobile-menu {
			display: flex;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.solution-content {
			grid-template-columns: 1fr;
		}

		.solution-visual {
			order: -1;
		}

		.benefits-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.problems-grid {
			grid-template-columns: 1fr;
		}

		.week-outcomes {
			grid-template-columns: 1fr;
		}

		.testimonials-grid {
			grid-template-columns: 1fr;
		}

		.benefits-grid {
			grid-template-columns: 1fr;
		}

		.footer-content {
			flex-direction: column;
			gap: var(--space-6);
			text-align: center;
		}

		.curriculum-week {
			flex-direction: column;
			gap: var(--space-4);
		}

		.week-marker {
			flex-direction: row;
			justify-content: flex-start;
		}
	}

	@media (max-width: 480px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}

		.hero-cta {
			flex-direction: column;
		}

		.hero-cta .btn {
			width: 100%;
		}

		.price {
			font-size: 3rem;
		}
	}
</style>
