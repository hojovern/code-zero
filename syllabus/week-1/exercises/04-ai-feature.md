# Exercise: Add AI to Your Product

**Type**: Solo
**Duration**: 60 minutes
**Difficulty**: Intermediate

## Overview

Add an AI-powered feature that solves a real problem for your users. This isn't a chatbot—it's AI that does useful work.

## Learning Objective

After completing this exercise, you will be able to:
- Connect to an AI API (Gemini) from a SvelteKit app
- Write effective prompts that constrain output
- Handle AI responses in your UI
- Build graceful error handling for API calls

## Prerequisites

- Completed Day 3 (core feature working)
- Google AI Studio account (free)
- Understanding of async/await

---

## AI Feature Ideas by Product Type

| Your Product | AI Feature | Input → Output |
|--------------|-----------|----------------|
| Notes app | Summarize note | Full note → 1 sentence |
| Expense tracker | Categorize expense | Description → Category |
| Habit tracker | Generate encouragement | Streak data → Motivational message |
| Job board | Write job description | Job title → Full description |
| Flashcards | Generate cards | Topic → Q&A pairs |
| Meal planner | Suggest recipe | Ingredients → Recipe |

---

## Instructions

### Task
Add an AI feature that makes your product smarter and saves users time.

### Requirements
- [ ] Gemini API connected (server-side, key not exposed)
- [ ] AI function takes specific input and returns specific output
- [ ] Prompt constrains the response format
- [ ] UI has loading state while AI processes
- [ ] Errors display gracefully (not technical messages)
- [ ] Feature integrates naturally into existing UI

### Steps

**Step 1: Plan your AI feature**
Answer:
- What user friction does this solve?
- What data goes TO the AI?
- What comes BACK from the AI?
- Where in the UI does this appear?

**Step 2: Get your API key**
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click "Get API key"
3. Create a key for your project

**Step 3: Set up server-side AI route**
```
You: Set up Gemini AI for this project.
My API key is: [key]
Create a server-side API route so the key isn't exposed.
```

**Step 4: Create your specific AI function**
```
You: Create an AI function that [your specific use case].
Input: [what you send]
Output: [what you expect back]
The prompt should constrain the response to [format requirements].
```

**Step 5: Integrate into UI**
```
You: Add a "[Action] with AI" button to [component/page].
When clicked, show loading, call the AI function, display result.
Handle errors gracefully.
```

---

## Hints

<details>
<summary>Hint 1: AI response is inconsistent</summary>

Constrain the output format explicitly:
```
"Reply with ONLY the category name. No explanation, no punctuation.
Choose from: Food, Transport, Shopping, Bills, Entertainment, Other"
```

</details>

<details>
<summary>Hint 2: Getting CORS errors</summary>

You're calling the AI from the client. Create a server route instead:
```
src/routes/api/ai/+server.ts
```
Then call `/api/ai` from your component.

</details>

<details>
<summary>Hint 3: Response takes too long</summary>

Add a timeout and loading state:
```javascript
const controller = new AbortController()
setTimeout(() => controller.abort(), 30000) // 30s timeout
```

</details>

---

## Expected Output

A working AI feature that:
1. User clicks an AI action button
2. Loading indicator appears
3. AI processes and returns result
4. Result displays in the UI
5. User can dismiss or use the result

---

## Self-Check

- [ ] AI API key is NOT exposed in client code
- [ ] Can trigger AI feature from UI
- [ ] Loading state shows during processing
- [ ] AI response is formatted correctly
- [ ] Errors show friendly message, not stack trace
- [ ] Works on deployed site (env var in Vercel)

---

## Solution

<details>
<summary>Reveal Solution</summary>

**src/routes/api/summarize/+server.ts:**
```typescript
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export const POST: RequestHandler = async ({ request }) => {
  const { content } = await request.json()

  if (!content) {
    return json({ error: 'Content is required' }, { status: 400 })
  }

  const prompt = `Summarize the following text in exactly one sentence.
Capture the main point. Be concise. Do not start with "This text is about" or similar.

Text to summarize:
${content}

One-sentence summary:`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    const data = await response.json()
    const summary = data.candidates[0].content.parts[0].text.trim()

    return json({ summary })
  } catch (error) {
    console.error('AI error:', error)
    return json({ error: 'Failed to generate summary' }, { status: 500 })
  }
}
```

**Component usage:**
```svelte
<script>
  let loading = false
  let summary = ''
  let error = ''

  async function summarize(content) {
    loading = true
    error = ''

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })

      const data = await res.json()

      if (data.error) {
        error = data.error
      } else {
        summary = data.summary
      }
    } catch (e) {
      error = 'Something went wrong. Please try again.'
    } finally {
      loading = false
    }
  }
</script>

<button on:click={() => summarize(noteContent)} disabled={loading}>
  {loading ? 'Summarizing...' : 'Summarize with AI'}
</button>

{#if summary}
  <div class="summary">
    <span>AI Summary:</span> {summary}
  </div>
{/if}

{#if error}
  <div class="error">{error}</div>
{/if}
```

</details>

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| API key in client code | Key visible in network tab | Use server-side route |
| No rate limiting | Too many requests error | Add debounce or cooldown |
| Unparseable response | Crashes when reading result | Check response structure, add fallbacks |
| No timeout | Hangs forever | Add AbortController with timeout |

---

## Stretch Goals (Optional)

1. **Add retry logic** - automatically retry once on failure
2. **Cache results** - save AI responses to database, don't regenerate
3. **Add feedback** - let users rate if AI output was helpful
4. **Multiple AI actions** - add a second AI feature
