<script>
  export let size = 24; // This will effectively control the font size
</script>

<div class="logo" style="--size: {size}px">
  code<span class="accent">:zero</span>
</div>

<style>
  .logo {
    font-family: var(--font-heading);
    font-size: var(--size);
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    line-height: 1;
    user-select: none;
    display: inline-block;
  }

  .accent {
    color: var(--color-primary);
  }
</style>