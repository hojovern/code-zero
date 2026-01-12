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
	let url = $state('');
	let teamSize = $state('');
	let errors = $state<Record<string, string>>({});

	const teamSizeOptions = [
		'1-5 Developers',
		'6-20 Developers',
		'21-50 Developers',
		'50+ Developers'
	];

	function validateStep1() {
		errors = {};
		if (!name.trim()) errors.name = 'Name is required';
		if (!email.trim()) errors.email = 'Work email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email';
		return Object.keys(errors).length === 0;
	}

	function validateStep2() {
		errors = {};
		if (!company.trim()) errors.company = 'Company name is required';
		if (!url.trim()) errors.url = 'Website or docs URL is required';
		if (!teamSize) errors.teamSize = 'Please select your team size';
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

		// Simulate API call - will be connected to +page.server.ts
		await new Promise(resolve => setTimeout(resolve, 1500));

		console.log('Taster request submitted:', { name, email, phone, company, url, teamSize });

		loading = false;
		success = true;
	}

	function handleClose() {
		closeTasterModal();
		// Reset form after animation
		setTimeout(() => {
			step = 1;
			success = false;
			name = email = phone = company = url = teamSize = '';
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
		<button class="modal-close" onclick={handleClose} aria-label="Close">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6L6 18M6 6l12 12" />
			</svg>
		</button>

		<div class="modal-container">
			<!-- Left Side: Offer Content -->
			<div class="modal-left">
				<div class="sales-content">
					<div class="logo">
						<span class="logo-text">code<span class="logo-accent">:zero</span></span>
					</div>

					<h1 class="headline">
						The 20-Minute<br/>
						<span class="highlight">Live Build</span>
					</h1>

					<p class="subheadline">
						Stop watching slides. See us build a custom AI tool for your company, live on the call.
					</p>

					<div class="offer-bullets">
						<div class="offer-item">
							<span class="icon">💻</span>
							<div class="text">
								<strong>Live Coding</strong>
								<span>We build a RAG agent using your own documentation.</span>
							</div>
						</div>
						<div class="offer-item">
							<span class="icon">🛠️</span>
							<div class="text">
								<strong>Tool Audit</strong>
								<span>We identify 3 bottlenecks AI can solve for your team today.</span>
							</div>
						</div>
						<div class="offer-item">
							<span class="icon">📜</span>
							<div class="text">
								<strong>You Keep the Code</strong>
								<span>Everything we build is yours to deploy immediately.</span>
							</div>
						</div>
					</div>

					<div class="trust-footer">
						<div class="badge">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
							</svg>
							<span>Zero commitment session</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Side: Form -->
			<div class="modal-right">
				{#if success}
					<div class="success-state">
						<div class="success-icon">
							<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"/>
								<path d="M9 12l2 2 4-4"/>
							</svg>
						</div>
						<h2>Session Requested!</h2>
						<p>Thank you, {name.split(' ')[0]}! We'll reach out within 2 hours to schedule your live build session.</p>
						<button class="btn-primary" onclick={handleClose}>Done</button>
					</div>
				{:else}
					<div class="form-wrapper">
						<div class="form-header">
							<h2>Book Your Session</h2>
							<p>Request a free taster session for your engineering team.</p>
							<div class="step-indicator">
								<div class="step" class:active={step >= 1} class:completed={step > 1}>
									<span class="step-number">1</span>
								</div>
								<div class="step-line" class:active={step > 1}></div>
								<div class="step" class:active={step >= 2}>
									<span class="step-number">2</span>
								</div>
							</div>
						</div>

						{#if step === 1}
							<div class="form-step">
								<div class="form-group">
									<label for="taster-name">Your Name *</label>
									<input type="text" id="taster-name" bind:value={name} placeholder="Jane Doe" class:error={errors.name} />
									{#if errors.name}<span class="error-text">{errors.name}</span>{/if}
								</div>
								<div class="form-group">
									<label for="taster-email">Work Email *</label>
									<input type="email" id="taster-email" bind:value={email} placeholder="jane@company.com" class:error={errors.email} />
									{#if errors.email}<span class="error-text">{errors.email}</span>{/if}
								</div>
								<div class="form-group">
									<label for="taster-phone">Phone / WhatsApp (Optional)</label>
									<input type="tel" id="taster-phone" bind:value={phone} placeholder="+60 ..." />
								</div>
								<button class="btn-primary btn-full" onclick={nextStep}>
									Next Step
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M5 12h14M12 5l7 7-7 7"/>
									</svg>
								</button>
							</div>
						{/if}

						{#if step === 2}
							<div class="form-step">
								<div class="form-group">
									<label for="taster-company">Company Name *</label>
									<input type="text" id="taster-company" bind:value={company} placeholder="Acme Inc" class:error={errors.company} />
									{#if errors.company}<span class="error-text">{errors.company}</span>{/if}
								</div>
								<div class="form-group">
									<label for="taster-url">Company Website / Docs *</label>
									<input type="url" id="taster-url" bind:value={url} placeholder="https://..." class:error={errors.url} />
									<span class="field-hint">We use this to prepare your live AI demo.</span>
									{#if errors.url}<span class="error-text">{errors.url}</span>{/if}
								</div>
								<div class="form-group">
									<label for="taster-size">Team Size *</label>
									<select id="taster-size" bind:value={teamSize} class:error={errors.teamSize}>
										<option value="">Select size...</option>
										{#each teamSizeOptions as option}
											<option value={option}>{option}</option>
										{/each}
									</select>
									{#if errors.teamSize}<span class="error-text">{errors.teamSize}</span>{/if}
								</div>
								<div class="form-actions">
									<button class="btn-secondary" onclick={prevStep}>Back</button>
									<button class="btn-primary" onclick={handleSubmit} disabled={loading}>
										{#if loading}
											<span class="spinner"></span>
										{:else}
											Book Free Build
										{/if}
									</button>
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	/* Sharing styles from ApplyModal but customized */
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

	@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

	.modal-close {
		position: fixed;
		top: var(--space-6);
		right: var(--space-6);
		z-index: 10001;
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		color: var(--text-secondary);
		width: 48px;
		height: 48px;
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.modal-container { display: flex; width: 100%; min-height: 100vh; }

	.modal-left {
		flex: 1;
		background: linear-gradient(135deg, #0a0f14 0%, #111820 100%);
		padding: var(--space-12);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sales-content { max-width: 500px; }
	.logo { margin-bottom: var(--space-8); }
	.logo-text { font-family: var(--font-heading); font-size: 1.75rem; font-weight: 700; color: white; }
	.logo-accent { color: var(--color-primary); }

	.headline {
		font-family: var(--font-heading);
		font-size: 3rem;
		font-weight: 800;
		color: white;
		line-height: 1.1;
		margin-bottom: var(--space-6);
	}

	.highlight { color: var(--color-primary); }
	.subheadline { font-size: 1.25rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-10); }

	.offer-bullets { display: flex; flex-direction: column; gap: var(--space-6); margin-bottom: var(--space-10); }
	.offer-item { display: flex; gap: var(--space-4); }
	.offer-item .icon { font-size: 1.5rem; }
	.offer-item .text { display: flex; flex-direction: column; }
	.offer-item strong { color: white; font-size: 1.1rem; }
	.offer-item span { color: var(--text-secondary); font-size: 0.95rem; }

	.trust-footer { padding-top: var(--space-6); border-top: 1px solid rgba(255,255,255,0.05); }
	.badge { display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 0.9rem; }
	.badge svg { color: var(--color-primary); }

	.modal-right { flex: 1; background: var(--bg-elevated); padding: var(--space-12); display: flex; align-items: center; justify-content: center; }
	.form-wrapper { width: 100%; max-width: 400px; }
	.form-header { text-align: center; margin-bottom: var(--space-8); }
	.form-header h2 { font-family: var(--font-heading); font-size: 1.75rem; font-weight: 700; color: white; margin-bottom: 8px; }
	.form-header p { color: var(--text-secondary); font-size: 1rem; }

	.step-indicator { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 24px; }
	.step-number { width: 32px; height: 32px; border-radius: 50%; background: var(--bg-surface); border: 2px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--text-muted); }
	.step.active .step-number { background: var(--color-primary); border-color: var(--color-primary); color: white; }
	.step.completed .step-number { background: var(--color-primary); border-color: var(--color-primary); color: white; }
	.step-line { width: 40px; height: 2px; background: var(--border-subtle); }
	.step-line.active { background: var(--color-primary); }

	.form-group { margin-bottom: 24px; }
	.form-group label { display: block; font-size: 0.9rem; font-weight: 600; color: white; margin-bottom: 8px; }
	.form-group input, .form-group select { width: 100%; padding: 12px 16px; background: var(--bg-base); border: 1px solid var(--border-subtle); border-radius: 8px; color: white; font-family: var(--font-body); }
	.form-group input:focus { border-color: var(--color-primary); outline: none; }
	.form-group input.error { border-color: #ef4444; }
	.error-text { color: #ef4444; font-size: 0.8rem; margin-top: 4px; display: block; }
	.field-hint { color: var(--text-muted); font-size: 0.8rem; margin-top: 4px; display: block; }

	.form-actions { display: flex; gap: 12px; margin-top: 32px; }
	.btn-primary { background: var(--color-primary); color: white; border: none; padding: 14px 24px; border-radius: 8px; font-weight: 700; flex: 1; cursor: pointer; }
	.btn-secondary { background: var(--bg-surface); color: white; border: 1px solid var(--border-subtle); padding: 14px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; }

	.success-state { text-align: center; }
	.success-icon { color: var(--color-primary); margin-bottom: 24px; }
	.success-state h2 { font-family: var(--font-heading); font-size: 1.75rem; color: white; margin-bottom: 16px; }
	.success-state p { color: var(--text-secondary); margin-bottom: 32px; }

	.spinner { width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite; display: inline-block; }
	@keyframes spin { to { transform: rotate(360deg); } }

	@media (max-width: 1024px) {
		.modal-container { flex-direction: column; }
		.modal-left { padding: var(--space-8); }
		.headline { font-size: 2rem; }
	}
</style>
