<script lang="ts">
	import { showApplyModal, closeApplyModal } from '$lib/stores/auth';

	let step = $state(1);
	let loading = $state(false);
	let success = $state(false);

	// Form data
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let projectIdea = $state('');
	let experience = $state('');
	let heardFrom = $state('');
	let errors = $state<Record<string, string>>({});

	const experienceLevels = [
		{ value: 'complete-beginner', label: 'Complete Beginner', desc: 'Never written code before' },
		{ value: 'some-experience', label: 'Some Experience', desc: 'Done tutorials, built small projects' },
		{ value: 'intermediate', label: 'Intermediate', desc: 'Can build basic apps independently' },
		{ value: 'advanced', label: 'Advanced Developer', desc: 'Professional experience, want to ship faster' }
	];

	const heardFromOptions = [
		'Google Search',
		'Instagram',
		'LinkedIn',
		'Friend/Referral',
		'YouTube',
		'Twitter/X',
		'Other'
	];

	function validateStep1() {
		errors = {};
		if (!name.trim()) errors.name = 'Name is required';
		if (!email.trim()) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
		return Object.keys(errors).length === 0;
	}

	function validateStep2() {
		errors = {};
		if (!experience) errors.experience = 'Please select your experience level';
		if (!projectIdea.trim()) errors.projectIdea = 'Tell us what you want to build';
		return Object.keys(errors).length === 0;
	}

	function nextStep() {
		if (step === 1 && validateStep1()) {
			step = 2;
		}
	}

	function prevStep() {
		if (step > 1) step--;
	}

	async function handleSubmit() {
		if (!validateStep2()) return;

		loading = true;

		// Simulate API call - replace with actual form submission
		await new Promise(resolve => setTimeout(resolve, 1500));

		// TODO: Submit to your backend/CRM
		console.log('Application submitted:', { name, email, phone, projectIdea, experience, heardFrom });

		loading = false;
		success = true;
	}

	function handleClose() {
		closeApplyModal();
		// Reset form after animation
		setTimeout(() => {
			step = 1;
			success = false;
			name = email = phone = projectIdea = experience = heardFrom = '';
			errors = {};
		}, 300);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') handleClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $showApplyModal}
	<div class="modal-overlay" role="dialog" aria-modal="true">
		<button class="modal-close" onclick={handleClose} aria-label="Close">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6L6 18M6 6l12 12" />
			</svg>
		</button>

		<div class="modal-container">
			<!-- Left Side: Sales Content -->
			<div class="modal-left">
				<div class="sales-content">
					<div class="logo">
						<span class="logo-text">code<span class="logo-accent">:zero</span></span>
					</div>

					<h1 class="headline">
						Go from idea to<br/>
						<span class="highlight">shipped product</span><br/>
						in 4 weeks.
					</h1>

					<p class="subheadline">
						Join 12 builders in Penang. Learn to code with AI. Ship something real.
					</p>

					<!-- Trust Stats -->
					<div class="trust-stats">
						<div class="stat">
							<span class="stat-value">94%</span>
							<span class="stat-label">Ship Rate</span>
						</div>
						<div class="stat">
							<span class="stat-value">200+</span>
							<span class="stat-label">Graduates</span>
						</div>
						<div class="stat">
							<span class="stat-value">4.9/5</span>
							<span class="stat-label">Rating</span>
						</div>
					</div>

					<!-- Testimonial -->
					<div class="testimonial">
						<div class="testimonial-quote">
							"I'd been stuck on my SaaS idea for 2 years. In 4 weeks, I finally shipped it. The accountability made all the difference."
						</div>
						<div class="testimonial-author">
							<div class="author-avatar">SC</div>
							<div class="author-info">
								<span class="author-name">Sarah Chen</span>
								<span class="author-role">Founder, DataPulse</span>
							</div>
						</div>
					</div>

					<!-- Trust Badges -->
					<div class="trust-badges">
						<div class="badge">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
								<path d="M9 12l2 2 4-4"/>
							</svg>
							<span>Money-back guarantee</span>
						</div>
						<div class="badge">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"/>
								<path d="M12 6v6l4 2"/>
							</svg>
							<span>Lifetime access to materials</span>
						</div>
						<div class="badge">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
								<circle cx="9" cy="7" r="4"/>
								<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
								<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
							</svg>
							<span>Alumni network access</span>
						</div>
					</div>

					<!-- Urgency -->
					<div class="urgency-banner">
						<span class="urgency-dot"></span>
						<span>March 2025 intake — Only 4 spots remaining</span>
					</div>
				</div>
			</div>

			<!-- Right Side: Form -->
			<div class="modal-right">
				{#if success}
					<!-- Success State -->
					<div class="success-state">
						<div class="success-icon">
							<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"/>
								<path d="M9 12l2 2 4-4"/>
							</svg>
						</div>
						<h2>Application Received!</h2>
						<p>Thank you, {name.split(' ')[0]}! We've received your application and will review it within 24 hours.</p>
						<p class="success-next">Check your inbox at <strong>{email}</strong> for next steps.</p>
						<button class="btn-primary" onclick={handleClose}>Done</button>
					</div>
				{:else}
					<div class="form-wrapper">
						<!-- Form Header -->
						<div class="form-header">
							<h2>Join the intake</h2>
							<p>No commitment. We'll reach out within 24 hours.</p>
							<div class="step-indicator">
								<div class="step" class:active={step >= 1} class:completed={step > 1}>
									<span class="step-number">1</span>
									<span class="step-label">Your Info</span>
								</div>
								<div class="step-line" class:active={step > 1}></div>
								<div class="step" class:active={step >= 2}>
									<span class="step-number">2</span>
									<span class="step-label">Your Goals</span>
								</div>
							</div>
						</div>

						<!-- Step 1: Basic Info -->
						{#if step === 1}
						<div class="form-step">
							<div class="form-group">
								<label for="name">Full Name *</label>
								<input
									type="text"
									id="name"
									bind:value={name}
									placeholder="John Smith"
									class:error={errors.name}
								/>
								{#if errors.name}<span class="error-text">{errors.name}</span>{/if}
							</div>

							<div class="form-group">
								<label for="email">Email Address *</label>
								<input
									type="email"
									id="email"
									bind:value={email}
									placeholder="john@example.com"
									class:error={errors.email}
								/>
								{#if errors.email}<span class="error-text">{errors.email}</span>{/if}
							</div>

							<div class="form-group">
								<label for="phone">Phone / WhatsApp <span class="optional">(optional)</span></label>
								<input
									type="tel"
									id="phone"
									bind:value={phone}
									placeholder="+60 12 345 6789"
								/>
								<span class="field-hint">For faster communication</span>
							</div>

							<button class="btn-primary btn-full" onclick={nextStep}>
								Continue
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M5 12h14M12 5l7 7-7 7"/>
								</svg>
							</button>

							<p class="privacy-note">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
									<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
								</svg>
								Your data is secure. We never share or sell your information.
							</p>
						</div>
					{/if}

					<!-- Step 2: Goals -->
					{#if step === 2}
						<div class="form-step">
							<div class="form-group">
								<label>Your coding experience *</label>
								<div class="radio-cards">
									{#each experienceLevels as level}
										<label class="radio-card" class:selected={experience === level.value}>
											<input
												type="radio"
												name="experience"
												value={level.value}
												bind:group={experience}
											/>
											<span class="radio-label">{level.label}</span>
											<span class="radio-desc">{level.desc}</span>
										</label>
									{/each}
								</div>
								{#if errors.experience}<span class="error-text">{errors.experience}</span>{/if}
							</div>

							<div class="form-group">
								<label for="projectIdea">What do you want to build? *</label>
								<textarea
									id="projectIdea"
									bind:value={projectIdea}
									placeholder="E.g., A marketplace for local freelancers, an AI writing tool, a SaaS for restaurants..."
									rows="3"
									class:error={errors.projectIdea}
								></textarea>
								{#if errors.projectIdea}<span class="error-text">{errors.projectIdea}</span>{/if}
								<span class="field-hint">Don't worry if it's not fully formed yet!</span>
							</div>

							<div class="form-group">
								<label for="heardFrom">How did you hear about us? <span class="optional">(optional)</span></label>
								<select id="heardFrom" bind:value={heardFrom}>
									<option value="">Select an option</option>
									{#each heardFromOptions as option}
										<option value={option}>{option}</option>
									{/each}
								</select>
							</div>

							<div class="form-actions">
								<button class="btn-secondary" onclick={prevStep}>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M19 12H5M12 19l-7-7 7-7"/>
									</svg>
									Back
								</button>
								<button class="btn-primary" onclick={handleSubmit} disabled={loading}>
									{#if loading}
										<span class="spinner"></span>
										Submitting...
									{:else}
										Start Learning
									{/if}
								</button>
							</div>

							<p class="privacy-note">
								By starting, you agree to receive emails about your application. Unsubscribe anytime.
							</p>
						</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 10000;
		background: var(--bg-base);
		display: flex;
		align-items: stretch;
		animation: fadeIn 0.3s ease;
		overflow-y: auto;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.modal-close {
		position: fixed;
		top: 1.5rem;
		right: 1.5rem;
		z-index: 10001;
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.6);
		width: 48px;
		height: 48px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.modal-close:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		transform: rotate(90deg);
	}

	.modal-container {
		display: flex;
		width: 100%;
		min-height: 100vh;
	}

	/* Left Side - Sales */
	.modal-left {
		flex: 1;
		background: linear-gradient(135deg, #0a0f14 0%, #111820 50%, #0d1117 100%);
		padding: var(--space-12);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.modal-left::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle at 30% 30%, rgba(4, 164, 89, 0.08) 0%, transparent 50%);
		pointer-events: none;
	}

	.sales-content {
		max-width: 500px;
		position: relative;
		z-index: 1;
	}

	.logo {
		margin-bottom: var(--space-8);
	}

	.logo-text {
		font-family: var(--font-heading);
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo-accent {
		color: var(--color-primary);
	}

	.headline {
		font-family: var(--font-heading);
		font-size: 2.75rem;
		font-weight: 800;
		color: var(--text-primary);
		line-height: 1.15;
		margin-bottom: var(--space-5);
	}

	.highlight {
		color: var(--color-primary);
	}

	.subheadline {
		font-size: 1.25rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-8);
	}

	.trust-stats {
		display: flex;
		gap: var(--space-8);
		margin-bottom: var(--space-8);
		padding: var(--space-5) 0;
		border-top: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
	}

	.stat {
		display: flex;
		flex-direction: column;
	}

	.stat-value {
		font-family: var(--font-heading);
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--color-primary);
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.testimonial {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: var(--space-5);
		margin-bottom: var(--space-6);
	}

	.testimonial-quote {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.7;
		font-style: italic;
		margin-bottom: var(--space-4);
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.author-avatar {
		width: 40px;
		height: 40px;
		border-radius: var(--radius-full);
		background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		font-size: 0.875rem;
	}

	.author-info {
		display: flex;
		flex-direction: column;
	}

	.author-name {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.author-role {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.trust-badges {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.badge {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.badge svg {
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.urgency-banner {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4);
		background: rgba(4, 164, 89, 0.1);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-primary);
	}

	.urgency-dot {
		width: 8px;
		height: 8px;
		background: var(--color-primary);
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	/* Right Side - Form */
	.modal-right {
		flex: 1;
		background: var(--bg-elevated);
		padding: var(--space-12);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.form-wrapper {
		width: 100%;
		max-width: 420px;
	}

	.form-header {
		text-align: center;
		margin-bottom: var(--space-6);
	}

	.form-header h2 {
		font-family: var(--font-heading);
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.form-header p {
		color: var(--text-secondary);
		font-size: 0.9rem;
		line-height: 1.7;
		margin-bottom: var(--space-6);
	}

	.step-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
	}

	.step {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		opacity: 0.5;
		transition: opacity 0.2s ease;
	}

	.step.active {
		opacity: 1;
	}

	.step-number {
		width: 28px;
		height: 28px;
		border-radius: var(--radius-full);
		background: var(--bg-surface);
		border: 2px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--text-muted);
		transition: all 0.2s ease;
	}

	.step.active .step-number {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	.step.completed .step-number {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	.step-label {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.step.active .step-label {
		color: var(--text-primary);
	}

	.step-line {
		width: 40px;
		height: 2px;
		background: var(--border-subtle);
		transition: background 0.2s ease;
	}

	.step-line.active {
		background: var(--color-primary);
	}

	.form-step {
		width: 100%;
		animation: slideIn 0.3s ease;
	}

	@keyframes slideIn {
		from { opacity: 0; transform: translateX(20px); }
		to { opacity: 1; transform: translateX(0); }
	}

	.form-group {
		margin-bottom: var(--space-5);
	}

	.form-group label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.optional {
		font-weight: 400;
		color: var(--text-muted);
	}

	.form-group input,
	.form-group textarea,
	.form-group select {
		width: 100%;
		padding: var(--space-3) var(--space-4);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 1rem;
		font-family: var(--font-body);
		transition: all 0.15s ease;
	}

	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: var(--text-muted);
	}

	.form-group input:focus,
	.form-group textarea:focus,
	.form-group select:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(4, 164, 89, 0.1);
	}

	.form-group input.error,
	.form-group textarea.error {
		border-color: #ef4444;
	}

	.error-text {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: #ef4444;
		margin-top: var(--space-2);
	}

	.field-hint {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-top: var(--space-2);
	}

	.radio-cards {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.radio-card {
		display: flex;
		flex-direction: column;
		padding: var(--space-4);
		background: var(--bg-base);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.radio-card:hover {
		border-color: var(--color-primary);
	}

	.radio-card.selected {
		border-color: var(--color-primary);
		background: rgba(4, 164, 89, 0.05);
	}

	.radio-card input {
		display: none;
	}

	.radio-label {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	.radio-desc {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-top: 2px;
	}

	.form-actions {
		display: flex;
		gap: var(--space-3);
		margin-top: var(--space-6);
	}

	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-6);
		font-size: 1rem;
		font-weight: 600;
		border-radius: var(--radius-md);
		border: none;
		cursor: pointer;
		transition: all 0.15s ease;
		font-family: var(--font-body);
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
		flex: 1;
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--color-primary-light);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(4, 164, 89, 0.3);
	}

	.btn-primary:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.btn-secondary {
		background: var(--bg-base);
		color: var(--text-secondary);
		border: 1px solid var(--border-subtle);
	}

	.btn-secondary:hover {
		background: var(--bg-surface);
		color: var(--text-primary);
	}

	.btn-full {
		width: 100%;
	}

	.spinner {
		width: 18px;
		height: 18px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.privacy-note {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		margin-top: var(--space-5);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		text-align: center;
	}

	/* Success State */
	.success-state {
		text-align: center;
		max-width: 400px;
		animation: slideIn 0.3s ease;
	}

	.success-icon {
		color: var(--color-primary);
		margin-bottom: var(--space-6);
	}

	.success-state h2 {
		font-family: var(--font-heading);
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.success-state p {
		color: var(--text-secondary);
		font-size: 0.9rem;
		line-height: 1.7;
		margin-bottom: var(--space-4);
	}

	.success-next {
		padding: var(--space-4);
		background: var(--bg-base);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-6);
	}

	.success-next strong {
		color: var(--text-primary);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.modal-container {
			flex-direction: column;
		}

		.modal-left {
			padding: var(--space-8) var(--space-6);
			min-height: auto;
		}

		.headline {
			font-size: 2rem;
		}

		.trust-stats {
			gap: var(--space-6);
		}

		.modal-right {
			padding: var(--space-8) var(--space-6);
		}
	}

	@media (max-width: 640px) {
		.modal-close {
			top: var(--space-4);
			right: var(--space-4);
			width: 40px;
			height: 40px;
		}

		.headline {
			font-size: 1.75rem;
		}

		.trust-stats {
			flex-wrap: wrap;
			gap: var(--space-4);
		}

		.stat {
			flex: 1;
			min-width: 80px;
		}

		.form-actions {
			flex-direction: column;
		}

		.btn-secondary {
			order: 1;
		}
	}
</style>
