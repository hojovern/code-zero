# Testing Guide

**Type:** Reference (apply when writing features, fixing bugs, before PR)

**Purpose:** Ensure appropriate test coverage without over-testing.

---

## WHEN TO WRITE TESTS

### Always Test

| Code Type | Test Type | Why |
|-----------|-----------|-----|
| Business logic (services) | Unit tests | Core functionality must work |
| API endpoints | Integration tests | Contracts must be verified |
| Auth/permissions | Unit + integration | Security-critical |
| Data transformations | Unit tests | Edge cases matter |
| Complex algorithms | Unit tests | Logic must be verified |

### Skip Tests (Pragmatically)

| Code Type | Why Skip |
|-----------|----------|
| Simple CRUD with no logic | ORM handles it |
| UI styling only | Visual, not logical |
| Configuration files | No logic to test |
| One-off scripts | Throwaway code |
| Prototypes/MVPs | Validate idea first |

---

## SVELTEKIT TESTING STACK

### Setup (if not exists)

```bash
npm install -D vitest @testing-library/svelte jsdom
```

**vite.config.ts:**
```typescript
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
  },
});
```

**package.json:**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

---

## TEST PATTERNS

### Unit Test (Service/Utility)

```typescript
// src/lib/server/services/users.test.ts
import { describe, it, expect, vi } from 'vitest';
import { createUser, validateEmail } from './users';

describe('validateEmail', () => {
  it('accepts valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(validateEmail('not-an-email')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});
```

### API Endpoint Test

```typescript
// src/routes/api/users/users.test.ts
import { describe, it, expect, vi } from 'vitest';
import { POST } from './+server';

describe('POST /api/users', () => {
  it('creates user with valid data', async () => {
    const request = new Request('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', name: 'Test' }),
    });

    const response = await POST({ request, locals: mockLocals });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user.email).toBe('test@example.com');
  });

  it('rejects unauthenticated request', async () => {
    const request = new Request('http://localhost/api/users', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const response = await POST({ request, locals: { auth: () => null } });
    expect(response.status).toBe(401);
  });
});
```

### Component Test

```typescript
// src/lib/components/Button.test.ts
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders with text', () => {
    const { getByText } = render(Button, { props: { text: 'Click me' } });
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(Button, { props: { text: 'Click', onClick } });

    await fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

---

## TEST FILE NAMING

```
src/
├── lib/
│   ├── server/
│   │   └── services/
│   │       ├── users.ts
│   │       └── users.test.ts      # Co-located
│   └── components/
│       ├── Button.svelte
│       └── Button.test.ts         # Co-located
└── routes/
    └── api/
        └── users/
            ├── +server.ts
            └── users.test.ts      # Co-located
```

---

## WHAT TO TEST

### Do Test

```typescript
// Business logic
expect(calculateDiscount(100, 0.2)).toBe(80);

// Validation
expect(isValidEmail('bad')).toBe(false);

// Edge cases
expect(divideNumbers(10, 0)).toThrow('Division by zero');

// State changes
await createUser(data);
expect(await getUser(id)).toBeDefined();

// Error handling
await expect(fetchUser('invalid-id')).rejects.toThrow();
```

### Don't Test

```typescript
// Don't test the framework
expect(svelteRenders).toBe(true); // Svelte works

// Don't test external libraries
expect(drizzleInserts).toBe(true); // Trust Drizzle

// Don't test implementation details
expect(internalVariable).toBe(5); // Test behavior, not internals
```

---

## COVERAGE GUIDELINES

| Layer | Target | Notes |
|-------|--------|-------|
| Services (business logic) | 80%+ | Critical path |
| API endpoints | 70%+ | Main flows |
| Utilities | 90%+ | Pure functions |
| Components | 50%+ | Key interactions |
| Pages | Low priority | E2E better |

**Don't chase 100%** — it leads to testing implementation details.

---

## MOCKING

### Mock Database

```typescript
import { vi } from 'vitest';

vi.mock('$lib/server/db', () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue([{ id: '1', name: 'Test' }])
      })
    })
  }
}));
```

### Mock Auth

```typescript
const mockLocals = {
  auth: () => Promise.resolve({
    user: { id: 'user-1', email: 'test@example.com', role: 'admin' }
  })
};
```

### Mock External APIs

```typescript
vi.mock('$lib/server/email/brevo', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true })
}));
```

---

## RUNNING TESTS

```bash
# Run all tests
npm run test

# Watch mode (during development)
npm run test:watch

# Run specific file
npm run test -- users.test.ts

# Run with coverage
npm run test -- --coverage
```

---

## WHEN CLAUDE SHOULD SUGGEST TESTS

| Situation | Action |
|-----------|--------|
| New service function | "Let me add a test for this" |
| Bug fix | "Adding a test to prevent regression" |
| Complex logic | "This needs test coverage" |
| Auth/security code | "Critical path - must test" |
| Simple CRUD | Skip unless asked |

---

## SESSION LEARNINGS

### Patterns Discovered

### Improvements Made

### Avoid

