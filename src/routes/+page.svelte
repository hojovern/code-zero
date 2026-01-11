<script>
  // Landing page - converted from static HTML
  import { openLoginModal, openApplyModal } from '$lib/stores/auth';

  let { data } = $props();

  // Mobile menu state
  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function handleApply(e) {
    e.preventDefault();
    mobileMenuOpen = false;
    openApplyModal();
  }

  function handleStudentPortal(e) {
    e.preventDefault();
    mobileMenuOpen = false;
    if (data.isLoggedIn) {
      window.location.href = '/student-portal';
    } else {
      openLoginModal();
    }
  }
</script>

<svelte:head>
  <title>code:zero — Go Full Stack in 4 Weeks</title>
  <meta name="description" content="Bought courses but never finished? Go full stack in 4 weeks with 12 builders in Penang. The forcing function you need." />
</svelte:head>

<!-- Navigation -->
<nav class="navbar">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <span class="logo-text">code<span class="logo-accent">:zero</span></span>
    </a>
    <div class="nav-links">
      <a href="/full-stack-web-development" class="nav-link">Full Stack Web Development</a>
      <a href="/enterprise" class="nav-link">Enterprise</a>
      <a href="/student-portal" onclick={handleStudentPortal} class="nav-link">Student Portal</a>
      <a href="/instructors" class="nav-link">Instructors</a>
      <a href="/prompts" class="nav-link">Prompts</a>
      <a href="/blog" class="nav-link">Blog</a>
    </div>
    <button onclick={handleApply} class="btn btn-primary btn-nav">Apply Now</button>

    <!-- Mobile Menu Button -->
    <button class="mobile-menu-btn" onclick={toggleMobileMenu} aria-label="Toggle menu">
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
      <a href="/full-stack-web-development" class="mobile-link" onclick={() => mobileMenuOpen = false}>Full Stack Web Development</a>
      <a href="/enterprise" class="mobile-link" onclick={() => mobileMenuOpen = false}>Enterprise</a>
      <a href="/student-portal" onclick={handleStudentPortal} class="mobile-link">Student Portal</a>
      <a href="/instructors" class="mobile-link" onclick={() => mobileMenuOpen = false}>Instructors</a>
      <a href="/prompts" class="mobile-link" onclick={() => mobileMenuOpen = false}>Prompts</a>
      <a href="/blog" class="mobile-link" onclick={() => mobileMenuOpen = false}>Blog</a>
      <button onclick={handleApply} class="btn btn-primary btn-full">Apply Now</button>
    </div>
  {/if}
</nav>

<!-- HERO -->
<section class="hero-stunning">
  <div class="hero-bg-glow"></div>
  <div class="container hero-container">
    
    <!-- Left: Content & Trust -->
    <div class="hero-text-content">
      
      <!-- Trust Signal: Intake Status -->
      <div class="intake-status-badge">
        <span class="status-dot"></span>
        <span class="status-text">Feb 2025 Intake: <strong>4 Spots Left</strong></span>
      </div>

      <h1 class="stunning-heading">
        Code your way to <br>
        <span class="text-gradient">freedom.</span>
      </h1>
      
      <p class="stunning-subhead">
        The 4-week full-stack retreat in Penang, Malaysia. 
        Join 12 select builders. Ship your product. 
        <span class="text-highlight">Never do a tutorial again.</span>
      </p>

      <div class="hero-actions">
        <button onclick={handleApply} class="btn btn-primary btn-xl">
          Apply Now
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
        <a href="#curriculum" class="btn btn-glass btn-xl">View Curriculum</a>
      </div>

      <!-- Trust Signal: Social Proof Stack -->
      <div class="trust-stack">
        <div class="avatar-group">
          <!-- CSS-generated placeholders for performance/reliability -->
          <div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces')"></div>
          <div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces')"></div>
          <div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces')"></div>
          <div class="avatar-count">+200</div>
        </div>
        <div class="trust-text">
          <div class="stars">★★★★★</div>
          <span>builders shipped products</span>
        </div>
      </div>
    </div>

    <!-- Right: Visual Immersion -->
    <div class="hero-visual-content">
      <div class="visual-card-wrapper">
        <!-- Main 'Stunning' Image: Coding in a tropical/focused environment -->
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
          alt="code:zero builders collaborating" 
          class="visual-img"
        >
        
        <!-- Overlay Card: The Code -->
        <div class="code-floater">
          <div class="floater-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="floater-body">
            <div class="code-line"><span class="c-purple">const</span> <span class="c-blue">future</span> = <span class="c-purple">await</span> <span class="c-yellow">build</span>({</div>
            <div class="code-line indent">location: <span class="c-green">'Penang 🇲🇾'</span>,</div>
            <div class="code-line indent">focus: <span class="c-orange">100</span>,</div>
            <div class="code-line indent">outcome: <span class="c-green">'SHIPPED'</span></div>
            <div class="code-line">});</div>
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

<!-- PRICING -->
<section class="section section-alt" id="pricing">
  <div class="container">
    <div class="pricing-header">
      <h2 class="section-heading">Choose Your Path</h2>
      <p class="section-intro">Whether you're an individual builder or training a team</p>
    </div>
    <div class="pricing-grid">
      <!-- Full Stack Web Development Card -->
      <div class="pricing-card pricing-card-primary">
        <div class="pricing-badge">Most Popular</div>
        <div class="pricing-header-card">
          <h3 class="pricing-name">Full Stack Web Development</h3>
          <p class="pricing-tagline">4-week intensive for individual builders</p>
        </div>
        <div class="pricing-price">
          <span class="price-amount">RM 9,800</span>
          <span class="price-period">per person</span>
        </div>
        <ul class="pricing-features">
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            20 days of live instruction
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Daily code reviews & feedback
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            1:1 mentor sessions
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            AI & automation curriculum
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Lifetime community access
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Certificate of completion
          </li>
        </ul>
        <button onclick={handleApply} class="btn btn-primary btn-lg btn-full">Apply for February Intake</button>
        <p class="pricing-note">Only 4 spots left. Payment plans available.</p>
      </div>

      <!-- Enterprise Card -->
      <div class="pricing-card pricing-card-enterprise">
        <div class="pricing-header-card">
          <h3 class="pricing-name">Enterprise</h3>
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
            On-site or at our Penang hub
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
            2 weeks post-training support
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            We handle HRDF paperwork
          </li>
          <li>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Certificate of completion
          </li>
        </ul>
        <a href="/enterprise" class="btn btn-secondary btn-lg btn-full">Learn More</a>
        <p class="pricing-note">HRDF claimable for Malaysian companies</p>
      </div>
    </div>
  </div>
</section>

<!-- TRUST BAR -->
<section class="trust-bar section-dark">
  <div class="container">
    <div class="trust-stats">
      <div class="trust-stat">
        <div class="trust-stat-value">500+</div>
        <div class="trust-stat-label">Builders trained</div>
      </div>
      <div class="trust-stat">
        <div class="trust-stat-value">12</div>
        <div class="trust-stat-label">Countries</div>
      </div>
      <div class="trust-stat">
        <div class="trust-stat-value">200+</div>
        <div class="trust-stat-label">Products launched</div>
      </div>
      <div class="trust-stat">
        <div class="trust-stat-value">4.9/5</div>
        <div class="trust-stat-label">Rating</div>
      </div>
    </div>
  </div>
</section>

<!-- PROBLEM / SOLUTION -->
<section class="section section-alt" id="problem">
  <div class="container">
    <div class="problem-grid">
      <div class="problem-column">
        <h2>Sound familiar?</h2>
        <ul class="problem-list">
          <li class="problem-item">Bought 5 courses, finished zero</li>
          <li class="problem-item">Tutorial hell — watching, not building</li>
          <li class="problem-item">Side project stuck for months</li>
          <li class="problem-item">No one holding you accountable</li>
          <li class="problem-item">Learning alone isn't working</li>
        </ul>
      </div>
      <div class="solution-column">
        <h2>How we're different</h2>
        <ul class="solution-list">
          <li class="solution-item">4-week sprint — you can't NOT finish</li>
          <li class="solution-item">Build YOUR product from day one</li>
          <li class="solution-item">Daily standups + code reviews</li>
          <li class="solution-item">12 builders who hold you accountable</li>
          <li class="solution-item">Live in Penang with your intake</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- WHAT YOU GET -->
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

<!-- CURRICULUM -->
<section class="section section-alt" id="curriculum">
  <div class="container">
    <div class="section-header">
      <h2>The 4-Week Sprint</h2>
      <p>Weekdays only. Mornings async, afternoons live. Weekends off to explore Penang.</p>
    </div>
    <div class="curriculum-grid">
      <div class="week-card">
        <span class="week-number">WEEK 1</span>
        <h3>Foundation + Your Idea</h3>
        <p>Set up your stack, scope your MVP, launch v0.1</p>
        <ul class="week-outcomes">
          <li>Tech stack configured</li>
          <li>MVP scope defined</li>
          <li>First working prototype</li>
        </ul>
      </div>
      <div class="week-card">
        <span class="week-number">WEEK 2</span>
        <h3>Core Features</h3>
        <p>Build the heart of your product. Real functionality, real code.</p>
        <ul class="week-outcomes">
          <li>Core features working</li>
          <li>Database set up</li>
          <li>User auth implemented</li>
        </ul>
      </div>
      <div class="week-card">
        <span class="week-number">WEEK 3</span>
        <h3>AI Integration</h3>
        <p>Add the magic. LLM features, automations, smart workflows.</p>
        <ul class="week-outcomes">
          <li>AI features integrated</li>
          <li>n8n workflows live</li>
          <li>Automations running</li>
        </ul>
      </div>
      <div class="week-card">
        <span class="week-number">WEEK 4</span>
        <h3>Polish + Launch</h3>
        <p>Launch it. Deploy, get users, celebrate.</p>
        <ul class="week-outcomes">
          <li>Product deployed</li>
          <li>First users onboarded</li>
          <li>Launch complete</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- LOCATION BANNER -->
<section class="location-banner">
  <img src="https://images.unsplash.com/photo-1620488212381-dea91f7dd69a?w=1600&h=600&fit=crop" alt="Kek Lok Si Temple, Penang">
  <div class="location-banner-content">
    <div class="container">
      <h3>Build from Penang, Malaysia</h3>
      <p>Great food. Low cost. UNESCO heritage. Your builder's retreat awaits.</p>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="section section-dark" id="testimonials">
  <div class="container">
    <div class="section-header">
      <h2>From "Stuck" to "Full Stack"</h2>
      <p>Real builders who finally finished what they started</p>
    </div>
    <div class="testimonial-grid">
      <div class="testimonial-card">
        <p class="testimonial-quote">"I'd bought 5 courses and finished none. code:zero was different — I couldn't NOT finish. The daily standups and intake pressure changed everything."</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" alt="Sarah L.">
          </div>
          <div class="testimonial-info">
            <h4>Sarah L.</h4>
            <p>Founder, Mealprep.io</p>
            <span class="testimonial-badge">200 users in first month</span>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <p class="testimonial-quote">"Came with an idea I'd been sitting on for 2 years. Left with a working product and my first paying customer. The accountability is real."</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Marcus T.">
          </div>
          <div class="testimonial-info">
            <h4>Marcus T.</h4>
            <p>Solo Founder</p>
            <span class="testimonial-badge">First $1K MRR</span>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <p class="testimonial-quote">"The AI and automation skills alone were worth it. I'm now building tools for my team that save us 10+ hours a week."</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face" alt="Aisha R.">
          </div>
          <div class="testimonial-info">
            <h4>Aisha R.</h4>
            <p>Product Manager → Builder</p>
            <span class="testimonial-badge">Career pivot</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="section section-alt" id="how">
  <div class="container">
    <div class="section-header">
      <h2>How It Works</h2>
      <p>From application to full stack in 3 steps</p>
    </div>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-number">1</div>
        <h3>Apply</h3>
        <p>Tell us about your product idea and why you're ready to build. Takes 5 minutes.</p>
      </div>
      <div class="step-card">
        <div class="step-number">2</div>
        <h3>Get Accepted</h3>
        <p>We review your application and schedule a quick call to confirm fit.</p>
      </div>
      <div class="step-card">
        <div class="step-number">3</div>
        <h3>Build</h3>
        <p>Join your intake in Penang. Build every day. Launch by week 4.</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section section-dark" id="faq">
  <div class="container">
    <div class="section-header">
      <h2>Frequently Asked Questions</h2>
    </div>
    <div class="faq-grid">
      <div class="faq-item">
        <h3 class="faq-question">Do I need coding experience?</h3>
        <p class="faq-answer">Some basics help, but you don't need to be a developer. If you can follow a tutorial and Google your way through errors, you're ready. We teach the stack from scratch — what matters is your commitment to finish.</p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">What's the time commitment?</h3>
        <p class="faq-answer">Weekdays 9am-5pm for 4 weeks. Mornings are async (online materials), afternoons are live building in Penang. Weekends are yours to explore.</p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">Do I need a product idea?</h3>
        <p class="faq-answer">Ideally yes — you'll get more out of it if you're building something you care about. But if you're not sure, we'll help you find an idea in the first few days.</p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">Is there a payment plan?</h3>
        <p class="faq-answer">Yes. We offer 2-part and 3-part payment plans. Just mention it in your application and we'll work something out.</p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">What if I can't keep up?</h3>
        <p class="faq-answer">The intake is small (max 12) so instructors can give you personal attention. Daily standups catch problems early. Everyone finishes.</p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">Where do I stay in Penang?</h3>
        <p class="faq-answer">Accommodation isn't included, but we'll recommend affordable options near our space. Many past builders shared apartments. Penang is very affordable — expect RM 1,500-2,500/month for a nice room.</p>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta section-dark" id="apply">
  <div class="container">
    <div class="final-cta-content">
      <h2>Stop Collecting Courses.<br>Go Full Stack.</h2>
      <p>4 weeks. 12 builders. Full stack skills.<br>Your idea has been waiting long enough.</p>
      <div class="final-cta-buttons">
        <button onclick={handleApply} class="btn btn-primary btn-lg">Apply for February 2025</button>
        <a href="mailto:hello@codezero.my" class="btn btn-secondary btn-lg">Have Questions?</a>
      </div>
    </div>
  </div>
</section>

<style>
  /* ========================================
     NAVBAR
     ======================================== */
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
    .nav-links {
      display: flex;
    }
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--space-2) var(--space-3);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: var(--radius-md);
    transition: color var(--duration-fast) var(--ease-default),
          background var(--duration-fast) var(--ease-default);
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }

  .btn-nav {
    display: none;
  }

  @media (min-width: 768px) {
    .btn-nav {
      display: inline-flex;
    }
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

  .btn-full {
    width: 100%;
    justify-content: center;
  }

  /* ========================================
     HERO SECTION
     ======================================== */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: var(--space-24) 0;
    padding-top: calc(var(--space-24) + 80px);
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

  .hero .container {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  @media (min-width: 1024px) {
    .hero .container {
      grid-template-columns: 1fr 1fr;
    }
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }

  .hero-image {
    position: relative;
    z-index: 1;
    display: none;
  }

  @media (min-width: 1024px) {
    .hero-image {
      display: block;
    }
  }

  .hero-image img {
    width: 100%;
    height: 540px;
    object-fit: cover;
    border-radius: var(--radius-2xl, var(--radius-xl));
    box-shadow: var(--shadow-lg);
    filter: brightness(0.9) contrast(1.1);
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
    box-shadow: var(--shadow-2xl, 0 25px 50px rgba(0, 0, 0, 0.4));
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

  .hero-image::before {
    content: '';
    position: absolute;
    inset: -4px;
    background: var(--gradient-accent);
    border-radius: calc(var(--radius-xl) + 4px);
    z-index: -1;
    opacity: 0.5;
  }

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
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: var(--space-6);
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

  /* ========================================
     TRUST BAR
     ======================================== */
  .trust-bar {
    padding: var(--space-10) 0;
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg-base);
  }

  .trust-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-12);
  }

  .trust-stat {
    text-align: center;
  }

  .trust-stat-value {
    font-family: var(--font-heading);
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
  }

  .trust-stat-label {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-top: var(--space-2);
  }

  /* ========================================
     SECTIONS
     ======================================== */
  .section-dark {
    background: var(--bg-base);
  }

  .section-alt {
    background: var(--bg-alt);
  }

  .section-header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto var(--space-12);
  }

  .section-header h2 {
    font-size: 2.25rem;
    margin-bottom: var(--space-4);
  }

  .section-header p {
    font-size: 1.125rem;
    color: var(--text-secondary);
  }

  /* ========================================
     PROBLEM / SOLUTION
     ======================================== */
  .problem-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-16);
    align-items: start;
  }

  @media (min-width: 768px) {
    .problem-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .problem-column h2,
  .solution-column h2 {
    font-size: 1.75rem;
    margin-bottom: var(--space-6);
  }

  .problem-list,
  .solution-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .problem-item,
  .solution-item {
    display: flex;
    gap: var(--space-3);
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .problem-item::before {
    content: '✕';
    color: #EF4444;
    font-weight: 600;
    flex-shrink: 0;
  }

  .solution-item::before {
    content: '✓';
    color: var(--color-primary);
    font-weight: 600;
    flex-shrink: 0;
  }

  /* ========================================
     FEATURES GRID
     ======================================== */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
  }

  .feature-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    transition: all var(--duration-normal) var(--ease-default);
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
    margin-bottom: var(--space-2);
  }

  .feature-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  /* ========================================
     CURRICULUM
     ======================================== */
  .curriculum-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-6);
  }

  .week-card {
    background: var(--bg-alt-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    transition: all var(--duration-normal) var(--ease-default);
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

  /* ========================================
     LOCATION BANNER
     ======================================== */
  .location-banner {
    position: relative;
    height: 400px;
    overflow: hidden;
  }

  .location-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .location-banner::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(26, 29, 35, 0.3) 0%, rgba(26, 29, 35, 0.8) 100%);
  }

  .location-banner-content {
    position: absolute;
    bottom: var(--space-10);
    left: 0;
    right: 0;
    z-index: 1;
    text-align: center;
  }

  .location-banner h3 {
    font-size: 2rem;
    color: var(--text-primary);
    margin-bottom: var(--space-2);
  }

  .location-banner p {
    font-size: 1.125rem;
    color: var(--text-secondary);
  }

  /* ========================================
     TESTIMONIALS
     ======================================== */
  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--space-6);
  }

  .testimonial-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    transition: all var(--duration-normal) var(--ease-default);
  }

  .testimonial-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .testimonial-quote {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: var(--space-6);
    font-style: italic;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .testimonial-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }

  .testimonial-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .testimonial-info h4 {
    font-size: 1rem;
    color: var(--text-primary);
    margin-bottom: var(--space-1);
  }

  .testimonial-info p {
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .testimonial-badge {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    background: rgba(4, 164, 89, 0.1);
    color: var(--color-primary);
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: var(--radius-full);
    margin-top: var(--space-2);
  }

  /* ========================================
     STEPS
     ======================================== */
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-8);
  }

  .step-card {
    text-align: center;
    padding: var(--space-6);
  }

  .step-number {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gradient-accent);
    color: white;
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 700;
    border-radius: 50%;
    margin: 0 auto var(--space-6);
    box-shadow: var(--shadow-glow-sm);
  }

  .step-card h3 {
    font-size: 1.25rem;
    color: var(--text-primary);
    margin-bottom: var(--space-3);
  }

  .step-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  /* ========================================
     PRICING
     ======================================== */
  .pricing-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .pricing-header .section-heading {
    margin-bottom: var(--space-4);
  }

  .section-intro {
    font-size: 1.125rem;
    color: var(--text-secondary);
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
    max-width: 900px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .pricing-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .pricing-card {
    position: relative;
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    transition: transform var(--duration-normal), box-shadow var(--duration-normal);
  }

  .pricing-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .pricing-card-primary {
    border: 2px solid var(--color-primary);
    box-shadow: 0 10px 40px rgba(4, 164, 89, 0.15);
  }

  .pricing-card-enterprise {
    border-color: var(--border-default);
  }

  .pricing-badge {
    position: absolute;
    top: calc(-1 * var(--space-3));
    left: 50%;
    transform: translateX(-50%);
    padding: var(--space-1) var(--space-4);
    background: var(--gradient-accent);
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--radius-full);
    white-space: nowrap;
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
    margin-bottom: var(--space-6);
  }

  .price-amount {
    font-family: var(--font-heading);
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .price-period {
    display: block;
    font-size: 0.9375rem;
    color: var(--text-muted);
    margin-top: var(--space-1);
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
    margin: 0 0 var(--space-6);
    padding: 0;
  }

  .pricing-features li {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--border-subtle);
    color: var(--text-secondary);
    font-size: 0.9375rem;
  }

  .pricing-features li:last-child {
    border-bottom: none;
  }

  .pricing-features svg {
    color: var(--color-primary);
    flex-shrink: 0;
  }

  .btn-full {
    width: 100%;
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

  .pricing-note {
    margin-top: var(--space-4);
    font-size: 0.875rem;
    color: var(--text-muted);
    text-align: center;
  }

  /* ========================================
     FAQ
     ======================================== */
  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: var(--space-6);
    max-width: 1000px;
    margin: 0 auto;
  }

  @media (max-width: 500px) {
    .faq-grid {
      grid-template-columns: 1fr;
    }
  }

  .faq-item {
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
  }

  .faq-question {
    font-family: var(--font-heading);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--space-3);
  }

  .faq-answer {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  /* ========================================
     FINAL CTA
     ======================================== */
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
    font-size: 2.5rem;
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


  /* ========================================
     STUNNING HERO (Redesign)
     ======================================== */
  .hero-stunning {
    position: relative;
    min-height: 100vh; /* Full screen immersion */
    background: #0f1115; /* Deep dark base */
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-top: 80px; /* Offset for fixed nav */
  }

  /* Ambient background glow */
  .hero-bg-glow {
    position: absolute;
    top: -20%;
    right: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(4, 164, 89, 0.15) 0%, transparent 70%);
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
  }

  .hero-container {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: center;
    padding-bottom: var(--space-12);
  }

  @media (min-width: 1024px) {
    .hero-container {
      grid-template-columns: 1.1fr 0.9fr;
      height: 100%;
    }
  }

  /* Text Content */
  .hero-text-content {
    max-width: 650px;
  }

  /* Intake Badge */
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
    background-color: #04A459;
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(4, 164, 89, 0.2);
    animation: pulse-green 2s infinite;
  }

  .status-text {
    font-size: 0.875rem;
    color: var(--color-primary);
    font-weight: 500;
  }

  .status-text strong {
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  @keyframes pulse-green {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(4, 164, 89, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(4, 164, 89, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(4, 164, 89, 0); }
  }

  /* Heading */
  .stunning-heading {
    font-family: var(--font-heading);
    font-size: clamp(3rem, 6vw, 5rem); /* Massive text */
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: white;
    margin-bottom: var(--space-6);
  }

  .text-gradient {
    background: linear-gradient(135deg, #2ECC71 0%, #04A459 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stunning-subhead {
    font-size: 1.25rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: var(--space-8);
    max-width: 540px;
  }

  .text-highlight {
    color: white;
    font-weight: 500;
  }

  /* Actions */
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    margin-bottom: var(--space-10);
  }

  .btn-xl {
    padding: 16px 32px;
    font-size: 1.125rem;
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
    border: 2px solid #0f1115;
    background-size: cover;
    background-position: center;
    margin-left: -12px;
  }
  
  .avatar:first-child { margin-left: 0; }

  .avatar-count {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #242933;
    border: 2px solid #0f1115;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    margin-left: -12px;
  }

  .trust-text {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
    line-height: 1.3;
  }

  .stars {
    color: #F59E0B;
    letter-spacing: 2px;
    font-size: 0.8rem;
  }

  .trust-text span {
    color: var(--text-muted);
  }

  /* Visual Immersion */
  .hero-visual-content {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .visual-card-wrapper {
    position: relative;
    width: 100%;
    max-width: 500px; /* Constrain slightly */
    aspect-ratio: 4/5;
  }

  .visual-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    /* Subtle filter to blend */
    filter: brightness(0.9) contrast(1.1);
    transform: rotate(-2deg);
    transition: transform 0.5s ease;
  }

  .visual-card-wrapper:hover .visual-img {
    transform: rotate(0deg) scale(1.02);
  }

  /* Floating Elements */
  .code-floater {
    position: absolute;
    bottom: 40px;
    left: -40px;
    background: rgba(26, 29, 35, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    width: 280px;
    transform: translateZ(20px); /* Parallax feel */
    animation: float 5s ease-in-out infinite;
  }

  .floater-header {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
  }

  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .red { background: #EF4444; }
  .yellow { background: #F59E0B; }
  .green { background: #10B981; }

  .floater-body {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    line-height: 1.6;
    color: #a1a1a1;
  }
  
  .code-line { white-space: nowrap; }
  .indent { padding-left: 16px; }
  
  .c-purple { color: #C792EA; }
  .c-blue { color: #82AAFF; }
  .c-yellow { color: #FFCB6B; }
  .c-green { color: #C3E88D; }
  .c-orange { color: #F78C6C; }

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
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    animation: float-delayed 6s ease-in-out infinite;
  }

  .location-icon { font-size: 1.5rem; }
  
  .location-text {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
  }
  
  .location-text strong { font-weight: 700; line-height: 1.2; }
  .location-text span { color: #666; font-size: 0.75rem; }

  @keyframes float-delayed {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 768px) {
    .stunning-heading { font-size: 2.75rem; }
    .code-floater { left: 10px; bottom: 20px; width: 240px; }
    .location-floater { right: 0; top: 20px; }
    .visual-card-wrapper { max-width: 100%; transform: scale(0.9); }
    .trust-stack { flex-direction: column; align-items: flex-start; }
  }

  /* ========================================
     END HERO STUNNING
     ======================================== */

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
