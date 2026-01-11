<script>
  export let data = [];
</script>

<ul class="file-tree-list">
  {#each data as item}
    <li class="file-tree-item">
      {#if item.type === 'folder'}
        <details open={item.open}>
          <summary>
            <span class="caret">▸</span>
            <span class="icon folder">📁</span>
            <span class="name">{item.name}</span>
          </summary>
          {#if item.children}
            <svelte:self data={item.children} />
          {/if}
        </details>
      {:else}
        <div class="file">
          <span class="icon file">📄</span>
          <span class="name">{item.name}</span>
          {#if item.comment}
            <span class="comment">{item.comment}</span>
          {/if}
        </div>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .file-tree-list {
    list-style: none;
    padding-left: 1.2rem;
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .file-tree-item {
    margin: 0.2rem 0;
  }

  summary {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    user-select: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  .caret {
    display: inline-block;
    transition: transform 0.2s;
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  details[open] > summary .caret {
    transform: rotate(90deg);
  }

  .file {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding-left: 1.2rem; /* Indent files to align with folder content */
  }

  .icon {
    opacity: 0.8;
  }

  .name {
    color: var(--text-primary);
  }

  .comment {
    color: var(--text-muted);
    font-style: italic;
    margin-left: 0.5rem;
  }
</style>
