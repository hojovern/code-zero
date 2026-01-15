/**
 * Scroll Reveal Action
 * Adds fade-in animations to elements when they enter the viewport
 *
 * Usage: <div use:scrollReveal> or <div use:scrollReveal={{ delay: 200 }}>
 */

export function scrollReveal(node, options = {}) {
  const {
    threshold = 0.1,
    delay = 0,
    duration = 600,
    distance = 30,
    once = true
  } = options;

  // Set initial styles
  node.style.opacity = '0';
  node.style.transform = `translateY(${distance}px)`;
  node.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
  node.style.transitionDelay = `${delay}ms`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';

          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          node.style.opacity = '0';
          node.style.transform = `translateY(${distance}px)`;
        }
      });
    },
    { threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}

/**
 * Stagger children animation
 * Animates child elements with staggered delays
 *
 * Usage: <div use:staggerReveal> (children get staggered animation)
 */
export function staggerReveal(node, options = {}) {
  const {
    threshold = 0.1,
    baseDelay = 0,
    staggerDelay = 100,
    duration = 500,
    distance = 20,
    selector = ':scope > *'
  } = options;

  const children = node.querySelectorAll(selector);

  children.forEach((child, index) => {
    child.style.opacity = '0';
    child.style.transform = `translateY(${distance}px)`;
    child.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    child.style.transitionDelay = `${baseDelay + (index * staggerDelay)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          });
          observer.unobserve(node);
        }
      });
    },
    { threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}

/**
 * Counter animation
 * Animates a number from 0 to target value
 *
 * Usage: <span use:countUp={500}>0</span>
 */
export function countUp(node, target) {
  let hasAnimated = false;
  const duration = 2000;
  const start = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;

          const startTime = performance.now();

          function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            node.textContent = current.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              node.textContent = target.toLocaleString();
            }
          }

          requestAnimationFrame(animate);
          observer.unobserve(node);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
