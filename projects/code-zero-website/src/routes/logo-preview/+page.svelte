<script>
  import LogoConcept1 from '$lib/components/logos/LogoConcept1.svelte';
  import LogoConcept2 from '$lib/components/logos/LogoConcept2.svelte';
  import LogoConcept3 from '$lib/components/logos/LogoConcept3.svelte';
  import LogoConcept4 from '$lib/components/logos/LogoConcept4.svelte';
</script>

<svelte:head>
  <title>Logo Preview | code:zero</title>
</svelte:head>

<div class="preview-page">
  <h1>Logo Concepts</h1>
  <p class="subtitle">Hover over each logo to see animations</p>

  <div class="concepts-grid">
    <!-- Concept 1: Quantum Zero -->
    <div class="concept-card">
      <div class="logo-display">
        <LogoConcept1 size={64} showText={true} />
      </div>
      <div class="concept-info">
        <h2>1. The Quantum Zero</h2>
        <p>A geometric zero with an orbital ring, suggesting infinite potential and the quantum nature of code. The orbiting ellipse animates on hover.</p>
        <div class="variations">
          <div class="variation">
            <span class="label">Icon only:</span>
            <LogoConcept1 size={48} showText={false} />
          </div>
          <div class="variation">
            <span class="label">Small:</span>
            <LogoConcept1 size={32} showText={true} />
          </div>
        </div>
      </div>
    </div>

    <!-- Concept 2: Terminal Zero -->
    <div class="concept-card">
      <div class="logo-display">
        <LogoConcept2 size={64} showText={true} />
      </div>
      <div class="concept-info">
        <h2>2. The Terminal Zero</h2>
        <p>A zero formed by code brackets/chevrons - the essence of programming. The brackets spread apart on hover, revealing the code within.</p>
        <div class="variations">
          <div class="variation">
            <span class="label">Icon only:</span>
            <LogoConcept2 size={48} showText={false} />
          </div>
          <div class="variation">
            <span class="label">Small:</span>
            <LogoConcept2 size={32} showText={true} />
          </div>
        </div>
      </div>
    </div>

    <!-- Concept 3: Hex Zero -->
    <div class="concept-card">
      <div class="logo-display">
        <LogoConcept3 size={64} showText={true} />
      </div>
      <div class="concept-info">
        <h2>3. The Hex Zero</h2>
        <p>A hexagonal zero with a power symbol inside - code meets energy. Circuit nodes at the vertices pulse on hover, suggesting digital connectivity.</p>
        <div class="variations">
          <div class="variation">
            <span class="label">Icon only:</span>
            <LogoConcept3 size={48} showText={false} />
          </div>
          <div class="variation">
            <span class="label">Small:</span>
            <LogoConcept3 size={32} showText={true} />
          </div>
        </div>
      </div>
    </div>

    <!-- Concept 4: Minimal Zero -->
    <div class="concept-card">
      <div class="logo-display">
        <LogoConcept4 size={64} showText={true} />
      </div>
      <div class="concept-info">
        <h2>4. The Minimal Zero</h2>
        <p>Ultra-clean and bold - a slashed zero with subtle gradient glow. Unique two-line text treatment: "code" in monospace above, ":zero" bold below. The glow intensifies on hover.</p>
        <div class="variations">
          <div class="variation">
            <span class="label">Icon only:</span>
            <LogoConcept4 size={48} showText={false} />
          </div>
          <div class="variation">
            <span class="label">Small:</span>
            <LogoConcept4 size={32} showText={true} />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="comparison-section">
    <h2>Size Comparison</h2>
    <div class="size-row">
      <div class="size-item">
        <span class="size-label">Large (64px)</span>
        <div class="logos-row">
          <LogoConcept1 size={64} showText={false} />
          <LogoConcept2 size={64} showText={false} />
          <LogoConcept3 size={64} showText={false} />
          <LogoConcept4 size={64} showText={false} />
        </div>
      </div>
      <div class="size-item">
        <span class="size-label">Medium (48px)</span>
        <div class="logos-row">
          <LogoConcept1 size={48} showText={false} />
          <LogoConcept2 size={48} showText={false} />
          <LogoConcept3 size={48} showText={false} />
          <LogoConcept4 size={48} showText={false} />
        </div>
      </div>
      <div class="size-item">
        <span class="size-label">Small (32px)</span>
        <div class="logos-row">
          <LogoConcept1 size={32} showText={false} />
          <LogoConcept2 size={32} showText={false} />
          <LogoConcept3 size={32} showText={false} />
          <LogoConcept4 size={32} showText={false} />
        </div>
      </div>
      <div class="size-item">
        <span class="size-label">Tiny (24px)</span>
        <div class="logos-row">
          <LogoConcept1 size={24} showText={false} />
          <LogoConcept2 size={24} showText={false} />
          <LogoConcept3 size={24} showText={false} />
          <LogoConcept4 size={24} showText={false} />
        </div>
      </div>
    </div>
  </div>

  <div class="context-section">
    <h2>In Context: Navbar Preview</h2>
    <div class="fake-navbar">
      <LogoConcept4 size={40} showText={true} />
      <div class="nav-links">
        <span>Courses</span>
        <span>About</span>
        <span>Blog</span>
        <button class="cta-btn">Apply Now</button>
      </div>
    </div>
  </div>
</div>

<style>
  .preview-page {
    min-height: 100vh;
    background: var(--bg-base, #1a1d23);
    padding: 4rem 2rem;
    color: var(--text-primary, #f5f5f7);
  }

  h1 {
    font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    text-align: center;
    color: var(--text-secondary, #9ca3af);
    margin-bottom: 3rem;
  }

  h2 {
    font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .concepts-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto 4rem;
  }

  @media (min-width: 1024px) {
    .concepts-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .concept-card {
    background: var(--bg-card, #242933);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    contain: layout style;
  }

  .concept-card:hover {
    border-color: var(--color-primary, #04A459);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .logo-display {
    background: var(--bg-base, #1a1d23);
    border-radius: 12px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    min-height: 120px;
  }

  .concept-info p {
    color: var(--text-secondary, #9ca3af);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .variations {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .variation {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .label {
    font-size: 0.875rem;
    color: var(--text-tertiary, #6b7280);
  }

  .comparison-section {
    max-width: 1400px;
    margin: 0 auto 4rem;
    background: var(--bg-card, #242933);
    border-radius: 16px;
    padding: 2rem;
  }

  .comparison-section h2 {
    margin-bottom: 2rem;
  }

  .size-row {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .size-item {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .size-label {
    font-size: 0.875rem;
    color: var(--text-tertiary, #6b7280);
    min-width: 120px;
  }

  .logos-row {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .context-section {
    max-width: 1400px;
    margin: 0 auto;
  }

  .context-section h2 {
    margin-bottom: 1.5rem;
  }

  .fake-navbar {
    background: rgba(26, 29, 35, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: var(--text-secondary, #9ca3af);
    font-size: 0.9rem;
  }

  .nav-links span:hover {
    color: var(--text-primary, #f5f5f7);
  }

  .cta-btn {
    background: linear-gradient(135deg, #04A459, #2ECC71);
    color: white;
    border: none;
    padding: 0.6rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(4, 164, 89, 0.3);
  }

  @media (max-width: 768px) {
    .concepts-grid {
      grid-template-columns: 1fr;
    }

    .logos-row {
      gap: 1.5rem;
    }

    .size-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
