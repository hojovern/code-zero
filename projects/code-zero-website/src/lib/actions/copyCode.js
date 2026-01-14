export function copyCode(node) {
  // Find all pre tags within the markdown content
  const codeBlocks = node.querySelectorAll('pre');

  codeBlocks.forEach((block) => {
    // Check if button already exists (in case of updates)
    if (block.querySelector('.copy-btn')) return;

    // Make parent relative for positioning
    block.style.position = 'relative';

    // Create the button
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `;
    button.ariaLabel = 'Copy code';

    // Add click handler
    button.addEventListener('click', async () => {
      const code = block.querySelector('code')?.innerText || block.innerText;
      
      try {
        await navigator.clipboard.writeText(code);
        
        // Success state
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        button.classList.add('copied');

        // Reset after 2s
        setTimeout(() => {
          button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          `;
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });

    // Add to DOM
    block.appendChild(button);
  });

  return {
    destroy() {
      // Cleanup if needed (browsers handle listener cleanup on removal mostly)
    }
  };
}
