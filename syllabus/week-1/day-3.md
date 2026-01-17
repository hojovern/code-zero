# The Brain Link

> Setting up your first Vector Store for long-term memory. 🧠

## Learn

A regular database stores text. A **Vector Store** stores *meaning*. 🧬

By converting text into "Embeddings" (long lists of numbers), your AI can search for information by **concept** rather than just keywords. This is how Gizmo remembers your business context without you having to re-type it every time.

We'll be using **Google Gemini's Embedding Model** to turn your documents into vectors.

### Code Example

Generating an embedding for a simple string:

```typescript
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
const result = await model.embedContent("The CEO Command Centre is live.");
const embedding = result.embedding.values;

console.log(embedding.slice(0, 5)); // The first 5 dimensions of the "thought"
```

## Exercise

Create your first memory in the database.

### Instructions

1. Pick a piece of business context (e.g., your mission statement).
2. Use the embedding script to turn it into a vector.
3. Save that vector into your `memories` table.

---

**FEATURE UNLOCKED!** 🔓
The Brain Link is active!
+20 XP 🌟
