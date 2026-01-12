<script lang="ts">
	import { showTasterModal, closeTasterModal } from '$lib/stores/auth';

	let step = $state(1);
	let loading = $state(false);
	let success = $state(false);

	// Form data
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let company = $state('');
	let teamSize = $state('');
	let errors = $state<Record<string, string>>({});

	const teamSizeOptions = ['2-10', '11-50', '51-200', '200+'];

	function validateStep1() {
		errors = {};
		if (!name.trim()) errors.name = 'Required';
		if (!email.trim()) errors.email = 'Required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email';
		return Object.keys(errors).length === 0;
	}

	function validateStep2() {
		errors = {};
		if (!company.trim()) errors.company = 'Required';
		if (!teamSize) errors.teamSize = 'Required';
		return Object.keys(errors).length === 0;
	}

	function nextStep() {
		if (step === 1 && validateStep1()) step = 2;
	}

	function prevStep() {
		if (step > 1) step--;
	}

	async function handleSubmit() {
		if (!validateStep2()) return;
		loading = true;
		await new Promise(resolve => setTimeout(resolve, 1500));
		console.log('Enterprise taster:', { name, email, phone, company, teamSize });
		loading = false;
		success = true;
	}

	function handleClose() {
		closeTasterModal();
		setTimeout(() => {
			step = 1;
			success = false;
			name = email = phone = company = teamSize = '';
			errors = {};
		}, 300);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') handleClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $showTasterModal}
	<div class="modal-overlay" role="dialog" aria-modal="true">
		<!-- Animated background -->
		<div class="bg-layer">
			<div class="gradient-bg"></div>
			<div class="glow glow-1"></div>
			<div class="glow glow-2"></div>
			<div class="glow glow-3"></div>
			<div class="grid-overlay"></div>
		</div>

		<!-- Close button -->
		<button class="modal-close" onclick={handleClose} aria-label="Close">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6L6 18M6 6l12 12" />
			</svg>
		</button>

		<div class="modal-container">
			{#if success}
				<!-- Success State -->
				<div class="success-card">
					<div class="success-icon">
						<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
							<polyline points="22 4 12 14.01 9 11.01"/>
						</svg>
					</div>
					<h2>You're all set, {name.split(' ')[0]}!</h2>
					<p>We'll reach out within 24 hours to schedule your live build session.</p>
					<div class="success-features">
						<div class="feature-pill">
							<span class="pill-icon">📧</span>
							Check your inbox
						</div>
						<div class="feature-pill">
							<span class="pill-icon">🎯</span>
							Custom demo prep
						</div>
						<div class="feature-pill">
							<span class="pill-icon">⚡</span>
							20-min session
						</div>
					</div>
					<button class="btn-done" onclick={handleClose}>Done</button>
				</div>
			{:else}
				<div class="modal-content">
					<!-- Left: Hero Image -->
					<div class="hero-section">
						<div class="hero-image">
							<img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team collaboration" />
							<div class="hero-overlay"></div>
						</div>
						<div class="hero-content">
							<div class="hero-badge">
								<span class="badge-dot"></span>
								HRDF Claimable
							</div>
							<h1>See AI build<br/><span class="highlight">your tool</span><br/>in 20 minutes</h1>
							<p>Live coding session using your company's actual documentation. No slides. No theory.</p>
						</div>
						<!-- Floating pills -->
						<div class="floating-pills">
							<div class="pill pill-1">
								<span>🔥</span> Live Demo
							</div>
							<div class="pill pill-2">
								<span>✨</span> Keep the Code
							</div>
							<div class="pill pill-3">
								<span>🚀</span> Zero Commitment
							</div>
						</div>
					</div>

					<!-- Right: Form -->
					<div class="form-section">
						<div class="form-card">
							<div class="form-header">
								<div class="logo">
									<span class="logo-text">code<span class="logo-accent">:zero</span></span>
									<span class="logo-badge">Enterprise</span>
								</div>
								<div class="step-indicator">
									<span class="step-dot" class:active={step >= 1}></span>
									<span class="step-line" class:active={step >= 2}></span>
									<span class="step-dot" class:active={step >= 2}></span>
								</div>
							</div>

							<h2>Book your free session</h2>
							<p class="form-subtitle">No credit card. No obligation. Just results.</p>

							{#if step === 1}
								<div class="form-step">
									<div class="input-group" class:error={errors.name}>
										<label for="name">Full name</label>
										<input type="text" id="name" bind:value={name} placeholder="Jane Doe" />
										{#if errors.name}<span class="error-msg">{errors.name}</span>{/if}
									</div>
									<div class="input-group" class:error={errors.email}>
										<label for="email">Work email</label>
										<input type="email" id="email" bind:value={email} placeholder="jane@company.com" />
										{#if errors.email}<span class="error-msg">{errors.email}</span>{/if}
									</div>
									<div class="input-group">
										<label for="phone">WhatsApp <span class="optional">(optional)</span></label>
										<input type="tel" id="phone" bind:value={phone} placeholder="+60 12-345 6789" />
									</div>
									<button class="btn-primary" onclick={nextStep}>
										Continue
										<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
											<path d="M5 12h14M12 5l7 7-7 7"/>
										</svg>
									</button>
								</div>
							{/if}

							{#if step === 2}
								<div class="form-step">
									<div class="input-group" class:error={errors.company}>
										<label for="company">Company name</label>
										<input type="text" id="company" bind:value={company} placeholder="Acme Sdn Bhd" />
										{#if errors.company}<span class="error-msg">{errors.company}</span>{/if}
									</div>
									<div class="input-group" class:error={errors.teamSize}>
										<label>Team size</label>
										<div class="size-chips">
											{#each teamSizeOptions as size}
												<button
													type="button"
													class="chip"
													class:selected={teamSize === size}
													onclick={() => teamSize = size}
												>
													{size}
												</button>
											{/each}
										</div>
										{#if errors.teamSize}<span class="error-msg">{errors.teamSize}</span>{/if}
									</div>
									<div class="btn-row">
										<button class="btn-back" onclick={prevStep}>
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
												<path d="M19 12H5M12 19l-7-7 7-7"/>
											</svg>
										</button>
										<button class="btn-primary" onclick={handleSubmit} disabled={loading}>
											{#if loading}
												<span class="loader"></span>
											{:else}
												Get my free session
											{/if}
										</button>
									</div>
								</div>
							{/if}

							<div class="form-footer">
								<div class="trust-row">
									<span class="trust-item">
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
										</svg>
										No spam
									</span>
									<span class="trust-item">
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<circle cx="12" cy="12" r="10"/>
											<polyline points="12 6 12 12 16 14"/>
										</svg>
										Reply in 24h
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* Base overlay */
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	/* Animated background */
	.bg-layer {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.gradient-bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0a0f 100%);
	}

	.glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.5;
		animation: float 8s ease-in-out infinite;
	}

	.glow-1 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(4, 164, 89, 0.3) 0%, transparent 70%);
		top: -200px;
		left: -200px;
		animation-delay: 0s;
	}

	.glow-2 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
		bottom: -150px;
		right: -150px;
		animation-delay: -3s;
	}

	.glow-3 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 70%);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-delay: -5s;
	}

	@keyframes float {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33% { transform: translate(30px, -30px) scale(1.05); }
		66% { transform: translate(-20px, 20px) scale(0.95); }
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
		background-size: 60px 60px;
	}

	/* Close button */
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
		transition: all 0.2s;
	}

	.modal-close:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		transform: rotate(90deg);
	}

	/* Container */
	.modal-container {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	/* Main content */
	.modal-content {
		display: flex;
		width: 100%;
		max-width: 1100px;
		gap: 3rem;
		align-items: center;
	}

	/* Hero section */
	.hero-section {
		flex: 1;
		position: relative;
	}

	.hero-image {
		position: relative;
		border-radius: 24px;
		overflow: hidden;
		aspect-ratio: 4/3;
	}

	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(4, 164, 89, 0.4) 0%,
			rgba(10, 10, 15, 0.8) 100%
		);
	}

	.hero-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 2rem;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: 100px;
		font-size: 0.7rem;
		font-weight: 600;
		color: #34D399;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 1rem;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		background: #34D399;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.hero-content h1 {
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		font-size: 2.5rem;
		font-weight: 800;
		color: white;
		line-height: 1.1;
		margin: 0 0 1rem;
		text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
	}

	.highlight {
		background: linear-gradient(135deg, #04A459, #34D399);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-content p {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.5;
		margin: 0;
		max-width: 300px;
	}

	/* Floating pills */
	.floating-pills {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.pill {
		position: absolute;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 100px;
		font-size: 0.8rem;
		font-weight: 500;
		color: white;
		animation: floatPill 6s ease-in-out infinite;
	}

	.pill-1 {
		top: 1rem;
		right: 1rem;
		animation-delay: 0s;
	}

	.pill-2 {
		top: 40%;
		right: -1rem;
		animation-delay: -2s;
	}

	.pill-3 {
		bottom: 30%;
		right: 0;
		animation-delay: -4s;
	}

	@keyframes floatPill {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	/* Form section */
	.form-section {
		flex: 0.9;
	}

	.form-card {
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 24px;
		padding: 2.5rem;
	}

	.form-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo-text {
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		font-size: 1.125rem;
		font-weight: 700;
		color: white;
	}

	.logo-accent {
		color: #04A459;
	}

	.logo-badge {
		padding: 0.25rem 0.5rem;
		background: rgba(4, 164, 89, 0.15);
		border: 1px solid rgba(4, 164, 89, 0.3);
		border-radius: 4px;
		font-size: 0.6rem;
		font-weight: 600;
		color: #34D399;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.step-indicator {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.step-dot {
		width: 8px;
		height: 8px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		transition: all 0.3s;
	}

	.step-dot.active {
		background: #04A459;
		box-shadow: 0 0 12px rgba(4, 164, 89, 0.5);
	}

	.step-line {
		width: 24px;
		height: 2px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1px;
		transition: all 0.3s;
	}

	.step-line.active {
		background: #04A459;
	}

	.form-card h2 {
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		margin: 0 0 0.5rem;
	}

	.form-subtitle {
		font-size: 0.95rem;
		color: rgba(255, 255, 255, 0.5);
		margin: 0 0 2rem;
	}

	/* Form inputs */
	.form-step {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		animation: slideIn 0.25s ease;
	}

	@keyframes slideIn {
		from { opacity: 0; transform: translateX(10px); }
		to { opacity: 1; transform: translateX(0); }
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-group label {
		font-size: 0.85rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.7);
	}

	.input-group .optional {
		color: rgba(255, 255, 255, 0.35);
		font-weight: 400;
	}

	.input-group input {
		padding: 0.875rem 1rem;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: white;
		font-family: inherit;
		font-size: 0.95rem;
		transition: all 0.2s;
	}

	.input-group input::placeholder {
		color: rgba(255, 255, 255, 0.25);
	}

	.input-group input:focus {
		outline: none;
		border-color: #04A459;
		background: rgba(4, 164, 89, 0.05);
		box-shadow: 0 0 0 3px rgba(4, 164, 89, 0.1);
	}

	.input-group.error input {
		border-color: #EF4444;
	}

	.error-msg {
		font-size: 0.75rem;
		color: #EF4444;
	}

	/* Size chips */
	.size-chips {
		display: flex;
		gap: 0.5rem;
	}

	.chip {
		flex: 1;
		padding: 0.75rem 0.5rem;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: rgba(255, 255, 255, 0.6);
		font-family: inherit;
		font-size: 0.85rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.15s;
	}

	.chip:hover {
		border-color: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.chip.selected {
		background: rgba(4, 164, 89, 0.15);
		border-color: #04A459;
		color: white;
	}

	/* Buttons */
	.btn-primary {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		background: linear-gradient(135deg, #04A459 0%, #10B981 100%);
		border: none;
		border-radius: 10px;
		color: white;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		margin-top: 0.5rem;
		box-shadow: 0 4px 20px rgba(4, 164, 89, 0.3);
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 30px rgba(4, 164, 89, 0.4);
	}

	.btn-primary:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.btn-row {
		display: flex;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.btn-back {
		width: 52px;
		height: 52px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: rgba(255, 255, 255, 0.6);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
	}

	.btn-back:hover {
		background: rgba(255, 255, 255, 0.08);
		color: white;
	}

	.btn-row .btn-primary {
		flex: 1;
		margin-top: 0;
	}

	.loader {
		width: 20px;
		height: 20px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* Form footer */
	.form-footer {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.trust-row {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
	}

	.trust-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.4);
	}

	.trust-item svg {
		color: rgba(255, 255, 255, 0.3);
	}

	/* Success state */
	.success-card {
		max-width: 480px;
		text-align: center;
		padding: 3rem;
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 24px;
		animation: scaleIn 0.4s ease;
	}

	@keyframes scaleIn {
		from { opacity: 0; transform: scale(0.95); }
		to { opacity: 1; transform: scale(1); }
	}

	.success-icon {
		color: #04A459;
		margin-bottom: 1.5rem;
		filter: drop-shadow(0 0 20px rgba(4, 164, 89, 0.4));
	}

	.success-card h2 {
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		font-size: 2rem;
		font-weight: 700;
		color: white;
		margin: 0 0 0.75rem;
	}

	.success-card > p {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.6;
		margin: 0 0 2rem;
	}

	.success-features {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.feature-pill {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 100px;
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.8);
	}

	.pill-icon {
		font-size: 1rem;
	}

	.btn-done {
		width: 100%;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: white;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s;
	}

	.btn-done:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.modal-content {
			flex-direction: column;
			max-width: 500px;
		}

		.hero-section {
			width: 100%;
		}

		.hero-image {
			aspect-ratio: 16/9;
		}

		.hero-content h1 {
			font-size: 2rem;
		}

		.floating-pills {
			display: none;
		}

		.form-section {
			width: 100%;
		}
	}

	@media (max-width: 640px) {
		.modal-container {
			padding: 1rem;
		}

		.form-card {
			padding: 1.5rem;
		}

		.hero-content h1 {
			font-size: 1.5rem;
		}

		.hero-content p {
			font-size: 0.9rem;
		}

		.modal-close {
			top: 1rem;
			right: 1rem;
			width: 40px;
			height: 40px;
		}
	}
</style>
