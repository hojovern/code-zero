<script>
  // Landing page - converted from static HTML
  import { onMount } from "svelte";
  import { openLoginModal, openApplyModal } from "$lib/stores/auth";

  let { data } = $props();

  // Typing animation for "freedom."
  let typedText = $state("");
  const fullText = "freedom.";

  onMount(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        typedText = fullText.slice(0, i + 1);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 120);

    return () => clearInterval(typeInterval);
  });

  function handleApply(e) {
    e.preventDefault();
    openApplyModal();
  }

  function handleStudentPortal(e) {
    e.preventDefault();
    if (data.isLoggedIn) {
      window.location.href = "/student-portal";
    } else {
      openLoginModal();
    }
  }
</script>

<svelte:head>
  <title>code:zero — Learn Full Stack & Ship Your AI App in 4 Weeks</title>
  <meta
    name="description"
    content="Master the fundamentals of coding and AI leverage. Ship your own AI app in 4 weeks with 12 builders in Penang. Learn faster by building."
  />
</svelte:head>

<!-- HERO -->
<section class="hero-stunning">
  <div class="hero-bg-glow"></div>
  <div class="container hero-container">
    <!-- Left: Content & Trust -->
    <div class="hero-text-content">
      <!-- Trust Signal: Intake Status -->
      <div class="intake-status-badge">
        <span class="status-dot"></span>
        <span class="status-text"
          >Next Intake: <strong>March 2026</strong></span
        >
      </div>

      <h1 class="stunning-heading">
        Learn full stack. <span class="text-gradient">Ship in 4 weeks.</span><span class="typing-cursor">|</span>
      </h1>

      <p class="stunning-subhead">
        Master the fundamentals of modern web development and <strong>leverage AI</strong> to accelerate your build. 
        Go from zero to a shipped AI app in just 28 days.
        <span class="text-highlight">Learn in weeks, not months.</span>
      </p>

      <div class="hero-actions">
        <button onclick={handleApply} class="btn btn-primary btn-xl">
          Start Your Journey
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><line x1="5" y1="12" x2="19" y2="12"></line><polyline
              points="12 5 19 12 12 19"
            ></polyline></svg
          >
        </button>
        <a href="#curriculum" class="btn btn-glass btn-xl">How it works</a>
      </div>

      <!-- Trust Signal: Social Proof Stack -->
      <div class="trust-stack">
        <div class="avatar-group">
          <!-- CSS-generated placeholders for performance/reliability -->
          <div
            class="avatar"
            style="background-image: url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces')"
          ></div>
          <div
            class="avatar"
            style="background-image: url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces')"
          ></div>
          <div
            class="avatar"
            style="background-image: url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces')"
          ></div>
          <div class="avatar-count">+200</div>
        </div>
        <div class="trust-text">
          <div class="stars">★★★★★</div>
          <span>Mastered the stack & shipped</span>
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
        />

        <!-- Overlay Card: The Code -->
        <div class="code-floater">
          <div class="floater-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="floater-body">
            <div class="code-line">
              <span class="c-purple">const</span>
              <span class="c-blue">future</span>
              = <span class="c-purple">await</span>
              <span class="c-yellow">build</span>(&#123;
            </div>
            <div class="code-line indent">
              location: <span class="c-green">'Penang 🇲🇾'</span>,
            </div>
            <div class="code-line indent">
              focus: <span class="c-orange">100</span>,
            </div>
            <div class="code-line indent">
              outcome: <span class="c-green">'SHIPPED'</span>
            </div>
            <div class="code-line">&#125;);</div>
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
      <h2 class="section-heading">Master the Stack. Ship the App.</h2>
      <p class="section-intro">
        Learn the fundamentals of coding while building with AI.
      </p>
    </div>
    <div class="pricing-grid">
      <!-- Full Stack Web Development Card -->
      <div class="pricing-card pricing-card-primary">
        <div class="pricing-badge">Intake Open</div>
        <div class="pricing-header-card">
          <h3 class="pricing-name">Full Stack + AI Development</h3>
          <p class="pricing-tagline">
            4-week accelerated learning & shipping sprint
          </p>
        </div>
        <div class="pricing-price">
          <span class="price-amount">RM 14,800</span>
          <span class="price-period">Early Bird Access</span>
        </div>
        <ul class="pricing-features">
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Master JS/TS, SvelteKit & Supabase fundamentals
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Learn to code 10x faster using AI agents
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Build and ship your own AI app in 28 days
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Daily 1-on-1 mentor guidance in Penang
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Understand the 'Why' behind every line
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Lifetime access to the builder community
          </li>
        </ul>
        <button onclick={handleApply} class="btn btn-primary btn-lg btn-full"
          >Enroll Now 🧑‍💻</button
        >
        <p class="pricing-note">Limited to 12 select builders per intake.</p>
      </div>

      <!-- Enterprise Card -->
      <div class="pricing-card pricing-card-enterprise">
        <div class="pricing-header-card">
          <h3 class="pricing-name">The AI Transformation</h3>
          <p class="pricing-tagline">
            3-day high-impact training for your team
          </p>
        </div>
        <div class="pricing-price">
          <span class="price-amount">RM 38,000</span>
          <span class="price-period">per team (Up to 12 pax)</span>
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Upskill your team with AI fundamentals
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Build internal AI tools live
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Automate high-value workflows
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Master Prompt Engineering & Agents
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            We handle the HRDF paperwork
          </li>
          <li>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Continuous post-training support
          </li>
        </ul>
        <a href="/enterprise" class="btn btn-secondary btn-lg btn-full"
          >Learn More</a
        >
        <p class="pricing-note">
          Modernize your business at the speed of AI.
        </p>
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
        <h2>Traditional learning is slow 🐢</h2>
        <ul class="problem-list">
          <li class="problem-item">6-month bootcamps that cost a fortune.</li>
          <li class="problem-item">Theoretical concepts with no application.</li>
          <li class="problem-item">Manually writing boilerplate code for days.</li>
          <li class="problem-item">Ignoring the power of AI assistance.</li>
          <li class="problem-item">Learning in a vacuum with zero feedback.</li>
        </ul>
      </div>
      <div class="solution-column">
        <h2>The CodeFast Way 🚀</h2>
        <ul class="solution-list">
          <li class="solution-item">4-week intensive building sprint.</li>
          <li class="solution-item">Master fundamentals + AI leverage.</li>
          <li class="solution-item">Use AI agents to build 10x faster.</li>
          <li class="solution-item">12 builders collaborating in person.</li>
          <li class="solution-item">Understand the code, own the product.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- WHAT YOU GET -->
<section class="section section-dark" id="features">
  <div class="container">
    <div class="section-header">
      <h2>Master the Stack. Ship the App.</h2>
      <p>
        Learn how to build modern web applications using the latest AI-powered tools.
      </p>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🧑‍💻</div>
        <h3>Core Fundamentals</h3>
        <p>
          Master JS/TS, SvelteKit, and Database design. Understand the foundation 
          that powers every great app.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🤖</div>
        <h3>AI-Powered Build</h3>
        <p>
          Learn to use AI agents to write code, debug errors, and architect 
          features in record time.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">✨</div>
        <h3>Real World Ship</h3>
        <p>
          Don't build clones. Ship your own unique AI application live to 
          real users by the end of week 4.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📚</div>
        <h3>Vector Memory</h3>
        <p>
          Master RAG and Vector databases. Learn how to give your apps 
          long-term memory and deep context.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📧</div>
        <h3>Growth Engine</h3>
        <p>
          Implement automated marketing and analytics. Learn how to scale 
          your product once it's live.
        </p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🚀</div>
        <h3>Penang Hub</h3>
        <p>
          4 weeks of undistracted focus in a tropical paradise. The ultimate 
          environment for high-speed learning.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- CURRICULUM -->
<section class="section section-alt" id="curriculum">
  <div class="container">
    <div class="section-header">
      <h2>The 4-Week Sprint</h2>
      <p>
        Weekdays only. Mornings async, afternoons live. Weekends off to explore
        Penang.
      </p>
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

<!-- LOCATION EXPERIENCE -->
<section class="section section-alt location-experience" id="location">
  <div class="container location-grid">
    <div class="location-content">
      <div class="location-badge">The Setting</div>
      <h2 class="location-heading">
        The Builder's Retreat: <span class="text-gradient">Penang.</span>
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
            <span>Build from a modern space in a historic UNESCO district.</span
            >
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

<!-- TESTIMONIALS -->
<section class="section section-dark" id="testimonials">
  <div class="container">
    <div class="section-header">
      <h2>Mastered the Stack.</h2>
      <p>Real builders who went from zero to full stack in 4 weeks</p>
    </div>
    <div class="testimonial-grid">
      <div class="testimonial-card">
        <p class="testimonial-quote">
          "I finally understand the 'why' behind the code. code:zero didn't just teach me how to copy-paste; it taught me how to architect and build with AI leverage."
        </p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
              alt="Sarah L."
            />
          </div>
          <div class="testimonial-info">
            <h4>Sarah L.</h4>
            <p>Developer, PrepAI</p>
            <span class="testimonial-badge">Career pivot complete</span>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <p class="testimonial-quote">
          "Building with 12 other makers was the highlight. Using AI to debug and scaffold allowed me to focus on the business logic and fundamentals."
        </p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Marcus T."
            />
          </div>
          <div class="testimonial-info">
            <h4>Marcus T.</h4>
            <p>Full Stack Builder</p>
            <span class="testimonial-badge">Shipped in 28 days</span>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <p class="testimonial-quote">
          "The most high-efficiency learning environment I've ever been in. Mastered the fundamentals and shipped my first AI SaaS. Unforgettable experience."
        </p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face"
              alt="Aisha R."
            />
          </div>
          <div class="testimonial-info">
            <h4>Aisha R.</h4>
            <p>Founder, FlowStream</p>
            <span class="testimonial-badge">Mastered the Stack</span>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <p class="testimonial-quote">
          "I'd been sitting on my SaaS idea for 2 years. I shipped it in 28 days with code:zero and got my first paying customer before I even left Penang."
        </p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
              alt="Jason V."
            />
          </div>
          <div class="testimonial-info">
            <h4>Jason V.</h4>
            <p>Solo Founder</p>
            <span class="testimonial-badge">First paying customer</span>
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
      <h2>The Accelerated Path</h2>
      <p>From zero to full stack mastery in 3 steps</p>
    </div>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-number">1</div>
        <h3>The Intake</h3>
        <p>
          Apply and share your vision. We select 12 builders ready to master the stack and ship.
        </p>
      </div>
      <div class="step-card">
        <div class="step-number">2</div>
        <h3>The Sprint</h3>
        <p>
          4 weeks in Penang. Master the fundamentals, leverage AI, and build your product.
        </p>
      </div>
      <div class="step-card">
        <div class="step-number">3</div>
        <h3>The Ship</h3>
        <p>Launch your product to the world and join our lifetime community of builders. ✨</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section section-dark" id="faq">
  <div class="container">
    <div class="section-header">
      <h2>Curious about CodeFast?</h2>
    </div>
    <div class="faq-grid">
      <div class="faq-item">
        <h3 class="faq-question">What fundamentals do you cover?</h3>
        <p class="faq-answer">
          We master JavaScript/TypeScript, SvelteKit, Supabase (Auth, DB, Storage), and CSS. You'll understand how data flows and how to architect scalable apps.
        </p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">How do we use AI?</h3>
        <p class="faq-answer">
          You'll learn to use AI as a high-powered pairing partner. From architecting code to debugging and automated testing, you'll learn to build 10x faster.
        </p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">Do I need to be a math genius?</h3>
        <p class="faq-answer">
          No. You need logic and grit. We simplify the complex and focus on practical application. If you can think clearly, you can code.
        </p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">Is the app really mine?</h3>
        <p class="faq-answer">
          Yes. You own 100% of the code and the intellectual property. We just help you build it faster and better.
        </p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">What's the Penang hub like?</h3>
        <p class="faq-answer">
          It's a high-focus environment in Georgetown. Modern equipment, high-speed fiber, and surrounded by 11 other ambitious builders.
        </p>
      </div>
      <div class="faq-item">
        <h3 class="faq-question">Why 4 weeks?</h3>
        <p class="faq-answer">
          It's the ultimate forcing function. Long enough to master the stack, short enough to stay focused. Pressure creates diamonds.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta section-dark" id="apply">
  <div class="container">
    <div class="final-cta-content">
      <h2>Master the fundamentals.<br />Leverage AI. Ship.</h2>
      <p>
        4 weeks. 12 builders. Your own AI product.<br />The smart way to learn full stack is here.
      </p>
      <div class="final-cta-buttons">
        <button onclick={handleApply} class="btn btn-primary btn-lg"
          >Start Your Journey 🚀</button
        >
        <a href="mailto:hello@codezero.my" class="btn btn-secondary btn-lg"
          >Talk to a Mentor</a
        >
      </div>
    </div>
  </div>
</section>

<style>
  /* ========================================
     TYPING CURSOR ANIMATION
     ======================================== */
  .typing-cursor {
    color: var(--color-primary);
    animation: blink 1s step-end infinite;
    font-weight: 400;
    margin-left: 4px;
    font-size: inherit;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

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
    transition:
      color var(--duration-fast) var(--ease-default),
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
    .mobile-menu-btn {
      display: none;
    }
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
    transition:
      background var(--duration-fast),
      color var(--duration-fast);
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
    content: "";
    position: absolute;
    top: 0;
    right: -20%;
    width: 70%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(4, 164, 89, 0.12) 0%,
      transparent 60%
    );
    filter: blur(80px);
    pointer-events: none;
  }

  .hero::after {
    content: "";
    position: absolute;
    bottom: 10%;
    left: -15%;
    width: 50%;
    height: 60%;
    background: radial-gradient(
      ellipse at center,
      rgba(46, 204, 113, 0.08) 0%,
      transparent 60%
    );
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
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-12px);
    }
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

  .card-dot:nth-child(1) {
    background: #ef4444;
  }
  .card-dot:nth-child(2) {
    background: #f59e0b;
  }
  .card-dot:nth-child(3) {
    background: #10b981;
  }

  .card-content {
    padding: var(--space-6);
  }

  .card-code {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.85rem;
    line-height: 1.7;
    color: var(--text-secondary);
  }

  .code-comment {
    color: var(--text-muted);
  }
  .code-keyword {
    color: #c792ea;
  }
  .code-var {
    color: #82aaff;
  }
  .code-num {
    color: #f78c6c;
  }
  .code-string {
    color: #c3e88d;
  }

  .hero-image::before {
    content: "";
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
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
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
    content: "✕";
    color: #ef4444;
    font-weight: 600;
    flex-shrink: 0;
  }

  .solution-item::before {
    content: "✓";
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
    content: "→";
    color: var(--color-primary);
    font-weight: 600;
  }

  /* ========================================
     LOCATION BANNER
     ======================================== */
  /* ========================================
     LOCATION EXPERIENCE
     ======================================== */
  .location-experience {
    overflow: hidden;
  }

  .location-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  @media (min-width: 1024px) {
    .location-grid {
      grid-template-columns: 1.1fr 0.9fr;
    }
  }

  .location-badge {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    background: rgba(4, 164, 89, 0.1);
    color: var(--color-primary);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-4);
  }

  .location-heading {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: var(--space-6);
  }

  .location-text {
    font-size: 1.25rem;
    color: var(--text-primary);
    line-height: 1.4;
    margin-bottom: var(--space-4);
    font-weight: 500;
  }

  .location-description {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-8);
  }

  .location-highlights {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .location-highlights li {
    display: flex;
    gap: var(--space-4);
    align-items: flex-start;
  }

  .highlight-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .highlight-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .highlight-text strong {
    font-size: 1rem;
    color: var(--text-primary);
  }

  .highlight-text span {
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .location-visual {
    position: relative;
  }

  .location-image-wrapper {
    position: relative;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    aspect-ratio: 4/5;
  }

  .location-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .location-image-wrapper:hover .location-img {
    transform: scale(1.05);
  }

  .location-caption {
    position: absolute;
    bottom: var(--space-6);
    left: var(--space-6);
    background: rgba(26, 29, 35, 0.8);
    backdrop-filter: blur(12px);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .location-caption .dot {
    width: 6px;
    height: 6px;
    background: #2ecc71;
    border-radius: 50%;
    box-shadow: 0 0 10px #2ecc71;
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
    transition:
      transform var(--duration-normal),
      box-shadow var(--duration-normal);
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
    content: "";
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
    background: radial-gradient(
      circle,
      rgba(4, 164, 89, 0.15) 0%,
      transparent 70%
    );
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
    background-color: #04a459;
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
    background: linear-gradient(135deg, #2ecc71 0%, #04a459 100%);
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

  .avatar:first-child {
    margin-left: 0;
  }

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
    color: #f59e0b;
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
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
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
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    width: 280px;
    transform: translateZ(20px); /* Parallax feel */
    animation: float 5s ease-in-out infinite;
  }

  .floater-header {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .red {
    background: #ef4444;
  }
  .yellow {
    background: #f59e0b;
  }
  .green {
    background: #10b981;
  }

  .floater-body {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.8rem;
    line-height: 1.6;
    color: #a1a1a1;
  }

  .code-line {
    white-space: nowrap;
  }
  .indent {
    padding-left: 16px;
  }

  .c-purple {
    color: #c792ea;
  }
  .c-blue {
    color: #82aaff;
  }
  .c-yellow {
    color: #ffcb6b;
  }
  .c-green {
    color: #c3e88d;
  }
  .c-orange {
    color: #f78c6c;
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
    font-size: 0.8rem;
  }

  .location-text strong {
    font-weight: 700;
    line-height: 1.2;
  }
  .location-text span {
    color: #666;
    font-size: 0.75rem;
  }

  @keyframes float-delayed {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @media (max-width: 768px) {
    /* Hero Stunning - Mobile Refinements */
    .stunning-heading {
      font-size: 2.25rem; /* Reduced for better balance */
      margin-bottom: var(--space-4);
    }

    .intake-status-badge {
      margin-top: var(--space-2);
      margin-bottom: var(--space-4);
      padding: 6px 14px;
      font-size: 0.8rem;
    }

    .stunning-subhead {
      font-size: 1rem;
      line-height: 1.65;
      margin-bottom: var(--space-6);
    }

    .hero-actions {
      margin-bottom: var(--space-6);
    }

    .btn-xl {
      padding: 14px 24px;
      font-size: 1rem;
    }

    .trust-stack {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-3);
      padding-top: var(--space-4);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .avatar {
      width: 36px;
      height: 36px;
    }

    .avatar-count {
      width: 36px;
      height: 36px;
      font-size: 0.7rem;
    }

    .code-floater {
      left: 10px;
      bottom: 20px;
      width: 240px;
    }
    .location-floater {
      right: 0;
      top: 20px;
    }
    .visual-card-wrapper {
      max-width: 100%;
      transform: scale(0.9);
    }
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
      gap: var(--space-6);
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

    /* === MOBILE DESIGN IMPROVEMENTS === */

    /* 1. Hero Buttons - Stack vertically for better touch targets */
    .hero-actions {
      flex-direction: column;
      gap: var(--space-3);
    }

    .hero-actions .btn-xl {
      width: 100%;
      justify-content: center;
    }

    /* 2. Text Contrast - Boost secondary text visibility */
    .stunning-subhead {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.1rem;
    }

    .location-description {
      color: rgba(255, 255, 255, 0.75);
    }

    .highlight-text span {
      color: rgba(255, 255, 255, 0.65);
    }

    .testimonial-quote {
      color: rgba(255, 255, 255, 0.75);
    }

    /* 3. Sharper Card Corners - More professional feel */
    .feature-card,
    .week-card,
    .testimonial-card,
    .faq-item {
      border-radius: var(--radius-lg);
    }

    .pricing-card {
      border-radius: var(--radius-lg);
    }

    .visual-img {
      border-radius: 16px;
    }

    /* 4. Card Padding - More breathing room */
    .feature-card,
    .testimonial-card {
      padding: var(--space-6);
    }

    .faq-item {
      padding: var(--space-4) var(--space-5);
    }

    /* 5. Pricing Card Refinement - Lighter touch on mobile */
    .pricing-card-primary {
      border-width: 1px;
      box-shadow: 0 8px 24px rgba(4, 164, 89, 0.12);
    }

    /* 6. Testimonial Grid - Single column to prevent overflow */
    .testimonial-grid {
      grid-template-columns: 1fr;
    }

    /* 7. Features Grid - Better mobile fit */
    .features-grid {
      grid-template-columns: 1fr;
    }

    /* 8. Final CTA - Better mobile spacing */
    .final-cta-buttons {
      flex-direction: column;
      gap: var(--space-3);
    }

    .final-cta-buttons .btn {
      width: 100%;
      justify-content: center;
    }
  }

  /* Section scroll offset - Fix sticky header overlap */
  section[id] {
    scroll-margin-top: 100px;
  }
</style>
