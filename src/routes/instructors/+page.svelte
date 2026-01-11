<script lang="ts">
	import { openApplyModal } from '$lib/stores/auth';

	let { data } = $props();

	function handleApply(e) {
		e.preventDefault();
		openApplyModal();
	}

	const instructors = [
		{
			name: "Josh V",
			role: "Founder & Lead Instructor",
			image: "/images/instructors/josh.jpg",
			specialty: "Full Stack & Architecture",
			bio: "Former CTO who has shipped 20+ products. Built and sold 2 SaaS companies. Specializes in rapid prototyping and system architecture. Believes that code is just a tool to solve human problems.",
			socials: {
				twitter: "https://twitter.com/joshva",
				linkedin: "https://linkedin.com/in/joshva",
				github: "https://github.com/joshva"
			},
			expertise: ["SvelteKit", "Supabase", "System Design", "Product Strategy", "AI Agents"]
		},
		{
			name: "Sarah Lim",
			role: "Senior Instructor",
			image: "/images/instructors/sarah.jpg",
			specialty: "Frontend & UX",
			bio: "Frontend wizard with a background in design. Worked at Grab and Mindvalley. Obsessed with performance and accessibility. Teaches you how to build interfaces that feel like magic.",
			socials: {
				twitter: "https://twitter.com/sarahlim",
				linkedin: "https://linkedin.com/in/sarahlim",
				github: "https://github.com/sarahlim"
			},
			expertise: ["UI/UX", "Tailwind CSS", "Animations", "React/Svelte", "Accessibility"]
		},
		{
			name: "Marcus Tan",
			role: "Instructor",
			image: "/images/instructors/marcus.jpg",
			specialty: "Growth & SEO",
			bio: "Grew organic traffic from zero to 1M+ monthly visitors for multiple startups. Specializes in content-led growth and technical SEO. Believes that distribution is half the battle — you can build the best product in the world, but it's worthless if no one knows about it.",
			socials: {
				twitter: "https://twitter.com/marcustan",
				linkedin: "https://linkedin.com/in/marcustan",
				github: "https://github.com/marcustan"
			},
			expertise: ["SEO", "Content Strategy", "Analytics", "Growth Marketing", "Automation"]
		}
	];
</script>

<svelte:head>
	<title>Instructors | code:zero</title>
	<meta name="description" content="Meet the builders who will teach you how to ship. Real practitioners, not academics." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-glow"></div>
	<div class="container hero-grid">
		<div class="hero-content">
			<div class="hero-badge">
				<span class="badge-icon">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 14l9-5-9-5-9 5 9 5z" />
						<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
						<path d="M12 14l9-5-9-5-9 5 9 5z" />
						<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
						<path d="M12 14l9-5-9-5-9 5 9 5z" />
						<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
					</svg>
				</span>
				Builders Teaching Builders
			</div>
			<h1 class="hero-heading">
				Learn from people who <br/>
				<span class="highlight">actually ship.</span>
			</h1>
			<p class="hero-subheading">
				No academics. No theorists. Your instructors are active founders and engineers who build products every day.
			</p>
		</div>
	</div>
</section>

<!-- Instructors Grid -->
<section class="section section-alt">
	<div class="container">
		<div class="instructors-grid">
			{#each instructors as instructor}
				<div class="instructor-card">
					<div class="card-image">
						<!-- Placeholder image logic if file missing -->
						<div class="image-placeholder" style="background-color: var(--bg-surface)">
							<span class="placeholder-initial">{instructor.name[0]}</span>
						</div>
						<!-- <img src={instructor.image} alt={instructor.name} /> -->
					</div>
					<div class="card-content">
						<div class="card-header">
							<div>
								<h3 class="instructor-name">{instructor.name}</h3>
								<p class="instructor-role">{instructor.role}</p>
							</div>
							<div class="social-links">
								{#if instructor.socials.twitter}
									<a href={instructor.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
										<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
											<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
										</svg>
									</a>
								{/if}
								{#if instructor.socials.linkedin}
									<a href={instructor.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
										<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
										</svg>
									</a>
								{/if}
							</div>
						</div>
						
						<div class="specialty-badge">
							<span class="dot"></span>
							{instructor.specialty}
						</div>

						<p class="instructor-bio">{instructor.bio}</p>

						<div class="expertise-list">
							<span class="list-label">Expertise:</span>
							<div class="tags">
								{#each instructor.expertise as skill}
									<span class="cred-tag">{skill}</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="final-cta section-dark">
	<div class="container">
		<div class="final-cta-content">
			<h2>Learn from the best.</h2>
			<p>Join the next cohort and get direct mentorship from these builders.</p>
			<button onclick={handleApply} class="btn btn-primary btn-lg">Apply Now</button>
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
		--radius-sm: 4px;
		--radius-md: 8px;
		--radius-lg: 12px;
		--radius-xl: 16px;
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

	.section-alt {
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

	.btn-lg {
		padding: var(--space-4) var(--space-8);
		font-size: 1rem;
		border-radius: var(--radius-lg);
	}

	/* Hero */
	.hero {
		position: relative;
		padding: calc(80px + var(--space-16)) 0 var(--space-16);
		overflow: hidden;
		background: var(--bg-base);
		text-align: center;
	}

	.hero-glow {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: 80%;
		background: radial-gradient(ellipse at center, rgba(4, 164, 89, 0.15) 0%, transparent 60%);
		filter: blur(80px);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 800px;
		margin: 0 auto;
	}

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
		font-size: clamp(2.5rem, 6vw, 4rem);
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
		margin: 0 auto;
		max-width: 600px;
	}

	/* Instructors Grid */
	.instructors-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
		gap: var(--space-8);
	}

	.instructor-card {
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-xl);
		overflow: hidden;
		transition: transform var(--duration-normal), box-shadow var(--duration-normal);
	}

	.instructor-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--border-default);
	}

	.card-image {
		height: 280px;
		background: var(--bg-elevated);
		overflow: hidden;
		position: relative;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-muted);
		font-size: 3rem;
		font-weight: 700;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.instructor-card:hover .card-image img {
		transform: scale(1.05);
	}

	.card-content {
		padding: var(--space-6);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-4);
	}

	.instructor-name {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0 0 var(--space-1);
	}

	.instructor-role {
		font-size: 0.875rem;
		color: var(--color-primary);
		font-weight: 500;
	}

	.social-links {
		display: flex;
		gap: var(--space-2);
	}

	.social-links a {
		color: var(--text-muted);
		transition: color var(--duration-fast);
	}

	.social-links a:hover {
		color: var(--text-primary);
	}

	.specialty-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.8125rem;
		color: var(--text-secondary);
		background: var(--bg-elevated);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
		margin-bottom: var(--space-4);
	}

	.specialty-badge .dot {
		width: 6px;
		height: 6px;
		background: var(--color-primary);
		border-radius: 50%;
	}

	.instructor-bio {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-6);
	}

	.expertise-list {
		border-top: 1px solid var(--border-subtle);
		padding-top: var(--space-4);
	}

	.list-label {
		display: block;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		font-weight: 600;
		margin-bottom: var(--space-3);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.cred-tag {
		font-size: 0.75rem;
		color: var(--text-secondary);
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-md);
	}

	/* Final CTA */
	.final-cta {
		text-align: center;
		padding: var(--space-24) 0;
	}

	.final-cta-content {
		max-width: 600px;
		margin: 0 auto;
	}

	.final-cta h2 {
		font-family: var(--font-heading);
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.final-cta p {
		font-size: 1.25rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-8);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.hero-heading {
			font-size: 2.25rem;
		}
	}
</style>