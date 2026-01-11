# Exercise: Professional UI Polish

**Day 7 | Solo | 60 min**

Build a reusable modal system, toast notifications, and form validation to make your app feel professional.

---

## Learning Objectives

By completing this exercise, you will:
- Create accessible modal dialogs with animations
- Build a global toast notification system
- Implement real-time form validation
- Add micro-interactions for polish

---

## Prerequisites

Before starting:
- [ ] SvelteKit project running
- [ ] Basic understanding of Svelte stores
- [ ] Week 1 completed

---

## The Challenge

**Build a UI polish toolkit with:**
1. Modal system (base, confirm, form modals)
2. Toast notifications (success, error, info)
3. Form validation with real-time feedback

**Success criteria:**
- Modals animate smoothly and trap focus
- Toasts stack nicely and auto-dismiss
- Forms show validation as user types

---

## Starter Code

### 1. Modal Component

```svelte
<!-- src/lib/components/Modal.svelte -->
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let open = false;
  export let title = '';
  export let size: 'sm' | 'md' | 'lg' = 'md';

  const dispatch = createEventDispatcher();

  function close() {
    // TODO: Dispatch close event
  }

  function handleKeydown(e: KeyboardEvent) {
    // TODO: Close on Escape
  }

  function handleBackdropClick(e: MouseEvent) {
    // TODO: Close when clicking backdrop
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <!-- TODO: Add backdrop with fade transition -->
  <!-- TODO: Add modal content with scale transition -->
  <!-- TODO: Prevent body scroll when open -->
{/if}

<style>
  /* TODO: Style the modal */
</style>
```

### 2. Toast System

```typescript
// src/lib/stores/toast.ts
import { writable } from 'svelte/store';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration: number;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  return {
    subscribe,
    // TODO: Add success(), error(), info(), warning() methods
    // TODO: Add remove() method
    // TODO: Auto-remove after duration
  };
}

export const toast = createToastStore();
```

### 3. Form Validation

```typescript
// src/lib/validation.ts
export function createValidator<T extends Record<string, any>>(
  rules: Record<keyof T, (value: any) => string | null>
) {
  // TODO: Return validate function that checks all rules
  // TODO: Return errors object with per-field errors
  // TODO: Return isValid boolean
}

// Usage example:
// const { validate, errors, isValid } = createValidator({
//   email: (v) => !v ? 'Required' : !v.includes('@') ? 'Invalid email' : null,
//   password: (v) => !v ? 'Required' : v.length < 8 ? 'Too short' : null
// });
```

---

## Step-by-Step Instructions

### Step 1: Build the Modal (20 min)

Complete the Modal component:

```svelte
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  export let open = false;
  export let title = '';
  export let size: 'sm' | 'md' | 'lg' = 'md';

  const dispatch = createEventDispatcher();

  $: if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  function close() {
    dispatch('close');
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) close();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) close();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div
    class="backdrop"
    transition:fade={{ duration: 200 }}
    on:click={handleBackdropClick}
  >
    <div
      class="modal modal-{size}"
      transition:scale={{ duration: 200, start: 0.95 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <header class="modal-header">
        <h2 id="modal-title">{title}</h2>
        <button class="close-btn" on:click={close}>×</button>
      </header>
      <div class="modal-body">
        <slot />
      </div>
      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
{/if}
```

### Step 2: Create Toast Store (15 min)

```typescript
// src/lib/stores/toast.ts
import { writable } from 'svelte/store';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);

  function addToast(type: Toast['type'], message: string, duration = 5000) {
    const id = Math.random().toString(36).slice(2);
    update(toasts => [...toasts, { id, type, message }]);

    if (duration > 0) {
      setTimeout(() => remove(id), duration);
    }
  }

  function remove(id: string) {
    update(toasts => toasts.filter(t => t.id !== id));
  }

  return {
    subscribe,
    success: (msg: string) => addToast('success', msg),
    error: (msg: string) => addToast('error', msg),
    info: (msg: string) => addToast('info', msg),
    warning: (msg: string) => addToast('warning', msg),
    remove
  };
}

export const toast = createToastStore();
```

### Step 3: Build Toast Container (10 min)

```svelte
<!-- src/lib/components/ToastContainer.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { toast } from '$lib/stores/toast';
</script>

<div class="toast-container">
  {#each $toast as item (item.id)}
    <div
      class="toast toast-{item.type}"
      transition:fly={{ x: 300, duration: 300 }}
      animate:flip={{ duration: 300 }}
    >
      <span class="toast-message">{item.message}</span>
      <button class="toast-close" on:click={() => toast.remove(item.id)}>
        ×
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .toast-success { background: #10b981; color: white; }
  .toast-error { background: #ef4444; color: white; }
  .toast-info { background: #3b82f6; color: white; }
  .toast-warning { background: #f59e0b; color: white; }
</style>
```

### Step 4: Form Validation (15 min)

```typescript
// src/lib/validation.ts
import { writable, derived } from 'svelte/store';

type ValidationRule = (value: any) => string | null;

export function createFormValidator<T extends Record<string, any>>(
  rules: Record<keyof T, ValidationRule>
) {
  const values = writable<Partial<T>>({});
  const touched = writable<Record<string, boolean>>({});

  const errors = derived([values, touched], ([$values, $touched]) => {
    const result: Record<string, string | null> = {};
    for (const [field, rule] of Object.entries(rules)) {
      if ($touched[field]) {
        result[field] = (rule as ValidationRule)($values[field as keyof T]);
      }
    }
    return result;
  });

  const isValid = derived([values], ([$values]) => {
    return Object.entries(rules).every(([field, rule]) =>
      !(rule as ValidationRule)($values[field as keyof T])
    );
  });

  function setValue(field: keyof T, value: any) {
    values.update(v => ({ ...v, [field]: value }));
  }

  function setTouched(field: keyof T) {
    touched.update(t => ({ ...t, [field]: true }));
  }

  return { values, errors, isValid, setValue, setTouched };
}
```

---

## Hints

<details>
<summary>Hint 1: Modal not closing on backdrop?</summary>

Make sure you check `e.target === e.currentTarget` to only close when clicking the backdrop itself, not its children.
</details>

<details>
<summary>Hint 2: Toasts appearing behind content?</summary>

Ensure z-index is high enough (9999) and the container is at the root level.
</details>

<details>
<summary>Hint 3: Validation too aggressive?</summary>

Only show errors after the field has been "touched" (blurred):
```svelte
on:blur={() => setTouched('email')}
```
</details>

---

## Solution

<details>
<summary>Full Modal Solution</summary>

```svelte
<!-- Modal.svelte -->
<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let open = false;
  export let title = '';
  export let size: 'sm' | 'md' | 'lg' = 'md';

  const dispatch = createEventDispatcher();

  const widths = { sm: '400px', md: '500px', lg: '700px' };

  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function close() {
    dispatch('close');
  }
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && open && close()} />

{#if open}
  <div class="backdrop" transition:fade={{ duration: 200 }} on:click={close}>
    <div
      class="modal"
      style="max-width: {widths[size]}"
      transition:scale={{ duration: 200, start: 0.95 }}
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
    >
      <header>
        <h2>{title}</h2>
        <button on:click={close} aria-label="Close">×</button>
      </header>
      <div class="body"><slot /></div>
      {#if $$slots.footer}
        <footer><slot name="footer" /></footer>
      {/if}
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal {
    background: var(--bg-elevated, #242933);
    border-radius: 12px;
    width: 90%;
    max-height: 90vh;
    overflow: auto;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-subtle, #2e3440);
  }
  h2 { margin: 0; font-size: 1.25rem; }
  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: inherit;
  }
  .body { padding: 1.5rem; }
  footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--border-subtle, #2e3440);
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
</style>
```
</details>

---

## Common Mistakes

1. **Not preventing body scroll** — Modal should lock background
2. **Focus not trapped** — Tab should cycle within modal
3. **Missing aria attributes** — Accessibility matters
4. **Toast z-index too low** — Should be above everything

---

## Stretch Goals

- [ ] Add focus trap to modal (tab cycles inside)
- [ ] Add toast action buttons ("Undo")
- [ ] Add password strength meter
- [ ] Add form dirty state tracking

---

## Verification Checklist

- [ ] Modal opens/closes with animation
- [ ] Escape closes modal
- [ ] Clicking backdrop closes modal
- [ ] Toasts appear and auto-dismiss
- [ ] Form shows errors on blur
- [ ] Submit disabled when invalid
