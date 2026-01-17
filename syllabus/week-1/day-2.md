# First Signal

> connecting your local environment to a live Postgres database. 📡

## Learn

Every Command Centre needs a memory. We use **Postgres** because it's the gold standard for data, and with the **pgvector** extension, it can store AI embeddings (actual "thoughts"). 🧠

Today, we're making the "First Signal" — connecting your local code to a cloud database using **Drizzle ORM**. This allows us to write TypeScript instead of raw SQL, making our development 10x faster.

### Code Example

Testing the connection in your `db.ts` file:

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

console.log("📡 Signal established!");
```

## Exercise

Connect your local environment to your Supabase project.

### Instructions

1. Grab your **DATABASE_URL** from the Supabase dashboard.
2. Add it to your `.env` file in the `command-centre` folder.
3. Run a simple `db.select()` to verify the signal is live.

---

**FEATURE UNLOCKED!** 🔓
You've established the First Signal!
+15 XP 🌟
