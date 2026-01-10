<script lang="ts">
	// Mobile menu state
	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	const instructors = [
		{
			name: "Instructor Name",
			title: "Lead Instructor",
			specialty: "Full Stack & AI",
			image: "/images/instructors/placeholder-1.jpg",
			bio: "With over 10 years of experience building products, our lead instructor has worn every hat — developer, CTO, founder. Built and shipped 3 startups, including one that scaled to 100k+ users. Obsessed with developer experience and making complex concepts simple.",
			credentials: [
				"Former CTO at [Company Name]",
				"Built products used by 100,000+ users",
				"10+ years full-stack development",
				"Speaker at [Conference Names]"
			],
			expertise: ["SvelteKit", "Node.js", "AI/LLMs", "System Design", "Product Strategy"],
			philosophy: "Code is a tool, not the goal. The goal is shipping products that people use. Everything I teach is oriented toward that outcome.",
			social: {
				twitter: "#",
				linkedin: "#",
				github: "#"
			}
		},
		{
			name: "Instructor Name",
			title: "Co-Instructor",
			specialty: "Design & Frontend",
			image: "/images/instructors/placeholder-2.jpg",
			bio: "A designer who codes (or a developer who designs — depending on the day). Spent 8 years at the intersection of design and engineering, building products that look as good as they work. Believes that great UX is a competitive advantage, not a nice-to-have.",
			credentials: [
				"Design Lead at [Company Name]",
				"Products used by millions of users",
				"8+ years design & frontend",
				"Published in [Publication Names]"
			],
			expertise: ["UI/UX Design", "CSS/Tailwind", "Figma", "Design Systems", "Animation"],
			philosophy: "Good design is invisible. It just works. I teach practical design that ships — not portfolio pieces that never see users.",
			social: {
				twitter: "#",
				linkedin: "#",
				dribbble: "#"
			}
		},
		{
			name: "Instructor Name",
			title: "Guest Instructor",
			specialty: "Growth & SEO",
			image: "/images/instructors/placeholder-3.jpg",
			bio: "Grew organic traffic from zero to 1M+ monthly visitors for multiple startups. Specializes in content-led growth and technical SEO. Believes that distribution is half the battle — you can build the best product in the world, but it's worthless if no one knows about it.",
			credentials: [
				"Grew traffic 0 to 1M/month",
				"Head of Growth at [Company Name]",
				"SEO consultant for funded startups",
				"Built content engines that drive revenue"
			],
			expertise: ["SEO", "Content Strategy", "Analytics", "Growth Marketing", "Automation"],
			philosophy: "Traffic without conversion is vanity. I teach distribution strategies that actually drive revenue, not just pageviews.",
			social: {
				twitter: "#",
				linkedin: "#"
			}
		}
	];

	const teamValues = [
		{
			icon: "ship",
			title: "We Ship",
			description: "Every instructor has shipped real products. Not tutorials about products. Actual deployed, used, revenue-generating software."
		},
		{
			icon: "cross-functional",
			title: "Cross-Functional",
			description: "Our team spans development, design, growth, and sales. We teach the full picture of building products, not just the code."
		},
		{
			icon: "practitioner",
			title: "Practitioners First",
			description: "We're builders who teach, not teachers who build. There's a difference. We're still in the trenches."
		},
		{
			icon: "real-talk",
			title: "Real Talk",
			description: "No academic fluff. No outdated textbooks. We teach what actually works in 2025, battle-tested on real products."
		}
	];
</script>

<svelte:head>
	<title>Our Instructors | code:zero</title>
	<meta name="description" content="Meet the builders behind code:zero. Engineers, designers, and growth experts who've shipped real products and teach what actually works." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="nav-logo">
			<span class="logo-text">code<span class="logo-accent">:zero</span></span>
		</a>
		<div class="nav-links">
			<a href="/learn" class="nav-link">Student Portal</a>
			<a href="/full-stack-web-development" class="nav-link">Full Stack Web Development</a>
			<a href="/enterprise" class="nav-link">Enterprise</a>
			<a href="/instructors" class="nav-link active">Instructors</a>
			<a href="/prompts" class="nav-link">Prompts</a>
			<a href="/blog" class="nav-link">Blog</a>
		</div>
		<a href="/full-stack-web-development#apply" class="btn btn-primary btn-nav">Apply Now</a>

		<!-- Mobile Menu Button -->
		<button class="mobile-menu-btn" on:click={toggleMobileMenu} aria-label="Toggle menu">
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

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="mobile-menu">
			<a href="/blog" class="mobile-link" on:click={() => mobileMenuOpen = false}>Blog</a>
			<a href="/prompts" class="mobile-link" on:click={() => mobileMenuOpen = false}>Prompts</a>
			<a href="/learn" class="mobile-link" on:click={() => mobileMenuOpen = false}>Student Portal</a>
			<a href="/full-stack-web-development" class="mobile-link" on:click={() => mobileMenuOpen = false}>Full Stack Web Development</a>
			<a href="/enterprise" class="mobile-link" on:click={() => mobileMenuOpen = false}>Enterprise</a>
			<a href="/instructors" class="mobile-link" on:click={() => mobileMenuOpen = false}>Instructors</a>
			<a href="/full-stack-web-development#apply" class="btn btn-primary btn-full" on:click={() => mobileMenuOpen = false}>Apply Now</a>
		</div>
	{/if}
</nav>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-glow"></div>
	<div class="container">
		<div class="hero-content">
			<span class="hero-eyebrow">Our Team</span>
			<h1 class="hero-heading">
				Builders who teach.<br/>
				<span class="highlight">Not teachers who build.</span>
			</h1>
			<p class="hero-subheading">
				Our instructors have shipped real products, built real companies, and made real mistakes. They teach what works because they've done it.
			</p>
		</div>
	</div>
</section>

<!-- Team Values Section -->
<section class="section section-dark values-section">
	<div class="container">
		<div class="values-grid">
			{#each teamValues as value}
				<div class="value-card">
					<div class="value-icon">
						{#if value.icon === 'ship'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
								<polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
								<line x1="12" y1="22.08" x2="12" y2="12"/>
							</svg>
						{:else if value.icon === 'cross-functional'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"/>
								<line x1="2" y1="12" x2="22" y2="12"/>
								<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
							</svg>
						{:else if value.icon === 'practitioner'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
							</svg>
						{:else}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
							</svg>
						{/if}
					</div>
					<h3 class="value-title">{value.title}</h3>
					<p class="value-description">{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Instructors Section -->
<section class="section section-elevated">
	<div class="container">
		<div class="instructors-list">
			{#each instructors as instructor, index}
				<div class="instructor-profile" class:reverse={index % 2 === 1}>
					<div class="instructor-image-wrapper">
						<div class="instructor-image-placeholder">
							<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
								<circle cx="12" cy="7" r="4"/>
							</svg>
						</div>
						<div class="instructor-badge">{instructor.title}</div>
					</div>
					<div class="instructor-content">
						<div class="instructor-header">
							<h2 class="instructor-name">{instructor.name}</h2>
							<p class="instructor-specialty">{instructor.specialty}</p>
						</div>
						<p class="instructor-bio">{instructor.bio}</p>

						<div class="instructor-details">
							<div class="detail-section">
								<h4 class="detail-title">Credentials</h4>
								<ul class="credentials-list">
									{#each instructor.credentials as credential}
										<li>
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
												<polyline points="20 6 9 17 4 12"/>
											</svg>
											{credential}
										</li>
									{/each}
								</ul>
							</div>

							<div class="detail-section">
								<h4 class="detail-title">Expertise</h4>
								<div class="expertise-tags">
									{#each instructor.expertise as skill}
										<span class="expertise-tag">{skill}</span>
									{/each}
								</div>
							</div>
						</div>

						<blockquote class="instructor-philosophy">
							<p>"{instructor.philosophy}"</p>
						</blockquote>

						<div class="instructor-social">
							{#if instructor.social.twitter}
								<a href={instructor.social.twitter} aria-label="Twitter" class="social-link">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
									</svg>
								</a>
							{/if}
							{#if instructor.social.linkedin}
								<a href={instructor.social.linkedin} aria-label="LinkedIn" class="social-link">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
									</svg>
								</a>
							{/if}
							{#if instructor.social.github}
								<a href={instructor.social.github} aria-label="GitHub" class="social-link">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
									</svg>
								</a>
							{/if}
							{#if instructor.social.dribbble}
								<a href={instructor.social.dribbble} aria-label="Dribbble" class="social-link">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/>
									</svg>
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Team Philosophy Section -->
<section class="section section-dark">
	<div class="container">
		<div class="philosophy-content">
			<span class="section-label">Our Philosophy</span>
			<h2 class="section-heading">We teach like business people,<br/>not coding monkeys.</h2>
			<p class="philosophy-text">
				Most coding education treats code as the end goal. We don't. Code is just a tool to ship products that people use.
				Everything we teach is oriented toward that outcome — building real things, for real users, that generate real value.
			</p>
			<div class="philosophy-comparison">
				<div class="comparison-column">
					<h4 class="comparison-title comparison-them">Traditional Bootcamps</h4>
					<ul class="comparison-list">
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M18 6L6 18M6 6l12 12"/>
							</svg>
							Textbook concepts
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M18 6L6 18M6 6l12 12"/>
							</svg>
							Outdated tech stacks
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M18 6L6 18M6 6l12 12"/>
							</svg>
							Fresh grads teaching
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M18 6L6 18M6 6l12 12"/>
							</svg>
							Learn to code for corporations
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M18 6L6 18M6 6l12 12"/>
							</svg>
							Theory first, maybe build later
						</li>
					</ul>
				</div>
				<div class="comparison-column">
					<h4 class="comparison-title comparison-us">code:zero</h4>
					<ul class="comparison-list">
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Battle-tested workflows
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Latest tech used by real entrepreneurs
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Working engineers, CTOs, founders
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Learn to build products and businesses
						</li>
						<li>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							Build something usable immediately
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="section section-cta">
	<div class="container">
		<div class="cta-content">
			<h2 class="cta-heading">Learn from builders who ship</h2>
			<p class="cta-text">Join the next Ship Sprint intake. 4 weeks. 12 builders. Your product, shipped.</p>
			<div class="cta-buttons">
				<a href="/ship-sprint" class="btn btn-primary btn-lg">View Ship Sprint</a>
				<a href="/ship-sprint#apply" class="btn btn-secondary btn-lg">Apply Now</a>
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
				<a href="/ship-sprint">Ship Sprint</a>
				<a href="/instructors">Instructors</a>
				<a href="/enterprise">Enterprise</a>
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
	   CSS Variables
	   =================================== */
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
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--radius-xl: 16px;
		--radius-2xl: 24px;
		--radius-full: 9999px;
		--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.25);
		--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.3);
		--shadow-glow-sm: 0 0 10px rgba(4, 164, 89, 0.2);
		--shadow-glow-md: 0 0 20px rgba(4, 164, 89, 0.3);
		--font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
		--font-body: 'Inter', system-ui, sans-serif;
		--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
		--duration-fast: 150ms;
		--duration-normal: 200ms;
	}

	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family: var(--font-body);
		background: var(--bg-base);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* ===================================
	   Layout
	   =================================== */
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

	/* ===================================
	   Navigation
	   =================================== */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: var(--space-4) 0;
		background: rgba(26, 29, 35, 0.9);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--border-subtle);
	}

	.nav-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 var(--space-4);
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
		display: none;
		gap: var(--space-2);
	}

	@media (min-width: 768px) {
		.nav-links { display: flex; }
	}

	.nav-link {
		color: var(--text-secondary);
		text-decoration: none;
		padding: var(--space-2) var(--space-3);
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: var(--radius-md);
		transition: color var(--duration-fast), background var(--duration-fast);
	}

	.nav-link:hover, .nav-link.active {
		color: var(--text-primary);
	}

	.nav-link.active {
		color: var(--color-primary);
	}

	.btn-nav {
		display: none;
	}

	@media (min-width: 768px) {
		.btn-nav { display: inline-flex; }
	}

	/* Mobile Menu */
	.mobile-menu-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background: transparent;
		border: none;
		color: var(--text-primary);
		cursor: pointer;
	}

	@media (min-width: 768px) {
		.mobile-menu-btn { display: none; }
	}

	.mobile-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: var(--bg-elevated);
		border-bottom: 1px solid var(--border-subtle);
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.mobile-link {
		color: var(--text-secondary);
		text-decoration: none;
		padding: var(--space-3) var(--space-4);
		font-size: 1rem;
		font-weight: 500;
		border-radius: var(--radius-md);
		transition: background var(--duration-fast), color var(--duration-fast);
	}

	.mobile-link:hover {
		background: var(--bg-surface);
		color: var(--text-primary);
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

	/* ===================================
	   Hero Section
	   =================================== */
	.hero {
		position: relative;
		padding: calc(var(--space-32) + 60px) 0 var(--space-16);
		overflow: hidden;
	}

	.hero-glow {
		position: absolute;
		top: 0;
		right: -20%;
		width: 60%;
		height: 100%;
		background: radial-gradient(ellipse, rgba(4, 164, 89, 0.15) 0%, transparent 60%);
		filter: blur(80px);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 800px;
	}

	.hero-eyebrow {
		display: inline-block;
		padding: var(--space-1) var(--space-4);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-full);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-primary);
		margin-bottom: var(--space-6);
	}

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
		margin: 0;
		max-width: 600px;
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

	.section-heading {
		font-family: var(--font-heading);
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--text-primary);
		margin: 0 0 var(--space-6);
	}

	/* ===================================
	   Values Section
	   =================================== */
	.values-section {
		padding: var(--space-16) 0;
		background: var(--bg-elevated);
	}

	.values-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 640px) {
		.values-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-width: 1024px) {
		.values-grid { grid-template-columns: repeat(4, 1fr); }
	}

	.value-card {
		text-align: center;
		padding: var(--space-6);
	}

	.value-icon {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(4, 164, 89, 0.1);
		border-radius: var(--radius-lg);
		color: var(--color-primary);
		margin: 0 auto var(--space-4);
	}

	.value-title {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
	}

	.value-description {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.6;
	}

	/* ===================================
	   Instructor Profiles
	   =================================== */
	.instructors-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-16);
	}

	.instructor-profile {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-8);
		align-items: start;
	}

	@media (min-width: 768px) {
		.instructor-profile {
			grid-template-columns: 300px 1fr;
		}

		.instructor-profile.reverse {
			grid-template-columns: 1fr 300px;
		}

		.instructor-profile.reverse .instructor-image-wrapper {
			order: 2;
		}
	}

	.instructor-image-wrapper {
		position: relative;
	}

	.instructor-image-placeholder {
		width: 100%;
		aspect-ratio: 1;
		max-width: 300px;
		background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-hover) 100%);
		border-radius: var(--radius-xl);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);
		opacity: 0.5;
	}

	.instructor-badge {
		position: absolute;
		bottom: var(--space-4);
		left: var(--space-4);
		padding: var(--space-2) var(--space-4);
		background: var(--gradient-accent);
		border-radius: var(--radius-full);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: white;
	}

	.instructor-content {
		padding: var(--space-4) 0;
	}

	.instructor-header {
		margin-bottom: var(--space-4);
	}

	.instructor-name {
		font-family: var(--font-heading);
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-1);
	}

	.instructor-specialty {
		font-size: 1rem;
		color: var(--color-primary);
		font-weight: 600;
		margin: 0;
	}

	.instructor-bio {
		font-size: 1.0625rem;
		color: var(--text-secondary);
		line-height: 1.7;
		margin: 0 0 var(--space-6);
	}

	.instructor-details {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
		margin-bottom: var(--space-6);
	}

	@media (min-width: 640px) {
		.instructor-details {
			grid-template-columns: 1fr 1fr;
		}
	}

	.detail-section {
		padding: var(--space-4);
		background: var(--bg-surface);
		border-radius: var(--radius-lg);
	}

	.detail-title {
		font-family: var(--font-heading);
		font-size: 0.875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		margin: 0 0 var(--space-3);
	}

	.credentials-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.credentials-list li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
		padding: var(--space-2) 0;
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.credentials-list svg {
		color: var(--color-primary);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.expertise-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.expertise-tag {
		padding: var(--space-1) var(--space-3);
		background: var(--bg-hover);
		border: 1px solid var(--border-default);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--text-secondary);
	}

	.instructor-philosophy {
		padding: var(--space-5);
		background: rgba(4, 164, 89, 0.05);
		border-left: 3px solid var(--color-primary);
		border-radius: 0 var(--radius-md) var(--radius-md) 0;
		margin: 0 0 var(--space-6);
	}

	.instructor-philosophy p {
		margin: 0;
		font-size: 1rem;
		font-style: italic;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.instructor-social {
		display: flex;
		gap: var(--space-3);
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--bg-surface);
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		transition: background var(--duration-fast), color var(--duration-fast);
	}

	.social-link:hover {
		background: var(--color-primary);
		color: white;
	}

	/* ===================================
	   Philosophy Section
	   =================================== */
	.philosophy-content {
		max-width: 900px;
		margin: 0 auto;
		text-align: center;
	}

	.philosophy-text {
		font-size: 1.125rem;
		color: var(--text-secondary);
		line-height: 1.7;
		margin: 0 0 var(--space-12);
	}

	.philosophy-comparison {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	@media (min-width: 768px) {
		.philosophy-comparison {
			grid-template-columns: 1fr 1fr;
		}
	}

	.comparison-column {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-6);
		text-align: left;
	}

	.comparison-title {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		margin: 0 0 var(--space-4);
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--border-subtle);
	}

	.comparison-them {
		color: var(--text-muted);
	}

	.comparison-us {
		color: var(--color-primary);
	}

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

	.comparison-column:first-child .comparison-list svg {
		color: #EF4444;
	}

	.comparison-column:last-child .comparison-list svg {
		color: var(--color-primary);
	}

	/* ===================================
	   CTA Section
	   =================================== */
	.section-cta {
		background: linear-gradient(180deg, var(--bg-base) 0%, #0f1115 100%);
		padding: var(--space-20) 0;
	}

	.cta-content {
		max-width: 640px;
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

	.cta-buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-4);
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
		transition: color var(--duration-fast);
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
		transition: background var(--duration-fast), color var(--duration-fast);
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
</style>
