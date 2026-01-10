# Day 4: AI Does the Work

> "Today your product gets a brain."

## The Challenge

**By end of day, AI is working inside YOUR product.**

Not a chatbot you made for fun. AI solving a REAL problem for YOUR users.

---

## AI Feature Ideas by Product Type

| Product | AI Feature | Value |
|---------|-----------|-------|
| Notes app | Summarize long notes | Save reading time |
| Expense tracker | Categorize expenses automatically | No manual tagging |
| Job board | Generate job descriptions | Faster posting |
| Meal planner | Suggest recipes from ingredients | Reduce food waste |
| Habit tracker | Motivational messages | Encouragement |
| Portfolio | Generate project descriptions | Better copy |
| Link shortener | Suggest better link titles | SEO help |
| Flashcards | Generate cards from text | Faster creation |

**Your AI feature should:** Solve a real friction point, not just be cool.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | AI Feature Planning | Define what AI will do |
| 9:30 - 10:30 | API Setup with Claude | Working Gemini connection |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | AI Builds the AI Function | Your feature works |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: AI feature demo | Show your prompt working |
| 13:30 - 14:30 | Integrate into Product | AI in your UI |
| 14:30 - 14:45 | Break | |
| 14:45 - 16:00 | Error Handling + Polish | Graceful failures, loading states |
| 16:00 - 17:00 | Create AI Integration Skill | Reusable pattern |
| 17:00 - 17:30 | Ship | Deploy AI-powered product |

---

## Morning: Connect to AI

### 1. AI Feature Planning (30 min)

**Answer these questions:**

1. **What's the user friction?**
   - What takes time or is annoying?
   - Example: "Writing descriptions for each note"

2. **How can AI help?**
   - What would AI generate/analyze/transform?
   - Example: "Summarize the note in one sentence"

3. **What's the input?**
   - What data goes TO the AI?
   - Example: The full note content

4. **What's the output?**
   - What comes BACK from the AI?
   - Example: A one-sentence summary

**Tell Claude your plan:**
```
You: I want to add an AI feature to my [product].

The friction: [what annoys users]
AI will: [what it does]
Input: [what goes to AI]
Output: [what comes back]

Help me design this.
```

### 2. API Setup with Claude (60 min)

**Get your API key:**
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API key"
3. Create a key (free tier: 60 requests/minute)

**Tell Claude to set it up:**
```
You: Set up Gemini AI for this project.

My API key is: [your key]

Create:
- Environment variable setup
- A reusable AI utility function in src/lib/ai.ts
- A test function to verify it works

Use the Gemini 1.5 Flash model. Make sure the API key
isn't exposed to the client (server-side only).
```

**Claude will:**
- Add the key to `.env`
- Create a server-side API route
- Set up the fetch to Gemini
- Handle errors properly
- Explain how it works

**Test the connection:**
```
You: Add a quick test. When I go to /api/test-ai, it should
call Gemini with "Say hello in 3 languages" and return the response.
```

Visit `/api/test-ai` in your browser. See the response? AI is connected.

### 3. AI Builds the AI Function (75 min)

**Tell Claude exactly what you need:**
```
You: Create my [feature name] AI function.

It should:
- Take [input description] as input
- Send a prompt to Gemini that [what the prompt should do]
- Return [expected output]

The prompt should be specific about the format I want back.
Put it in src/lib/ai.ts alongside the general Gemini function.
```

**Example for a Note Summarizer:**
```
You: Create a summarizeNote function.

It should:
- Take the note content as input
- Ask Gemini to summarize it in exactly one sentence
- Return just the summary text

Make the prompt specific: capture the main point, be concise,
don't add fluff like "This note is about..."
```

**Example for an Expense Categorizer:**
```
You: Create a categorizeExpense function.

It should:
- Take the expense description as input
- Have Gemini pick from these categories: Food, Transport, Shopping, Bills, Entertainment, Health, Other
- Return ONLY the category name, nothing else

The prompt should constrain the output so I always get a clean category.
```

**Claude will:**
- Write the specific function
- Craft a good prompt
- Handle the response parsing
- Explain prompt engineering choices

**Test it:**
```
You: Add a test endpoint at /api/test-[feature] that I can use
to verify my AI function works with sample data.
```

---

## Afternoon: Integrate & Polish

### 4. Integrate into Product (60 min)

**Tell Claude to add AI to your UI:**
```
You: Add my AI [feature] to the [page/component].

Add a button that says "[action with AI]".
When clicked:
- Show a loading state
- Call the AI function
- Display the result
- Let the user dismiss or use the result

Make it feel smooth and professional.
```

**Example for Notes:**
```
You: Add a "Summarize with AI" button to each note card.

When clicked:
- Button shows "Summarizing..."
- Call the summarizeNote function
- Show the summary in a highlighted box below the note content
- Add a small "✨" icon to indicate it's AI-generated

If it fails, show "Couldn't generate summary" gracefully.
```

**Review and iterate:**
```
You: The loading state should have a subtle animation.
Also, save the summary to the database so I don't have to
regenerate it every time.
```

```
You: Add a "Regenerate" button in case the user wants a different summary.
```

### 5. Error Handling + Polish (75 min)

**Make it production-ready:**
```
You: Improve the AI integration with proper error handling:

1. Rate limiting - if user clicks too fast, debounce
2. API errors - show friendly message, not technical error
3. Timeout - if AI takes too long, show message and allow retry
4. Empty input - don't call AI if there's nothing to process
5. Loading states - make sure user knows something is happening

Also add retry logic: if the call fails, try once more before giving up.
```

**Claude will:**
- Add debouncing
- Create error states
- Implement timeout handling
- Add retry logic
- Improve the UX

**Test edge cases:**
- Click the AI button rapidly (should debounce)
- Test with very long input
- Test with empty input
- Disconnect wifi and try (should handle gracefully)

### 6. Create AI Integration Skill (60 min)

**Codify what you learned:**
```
You: Create an ai-integration skill in .claude/skills/ai-integration/

It should document:
- How to set up Gemini API in a SvelteKit project
- How to create server-side API routes for AI
- Prompt engineering patterns that work
- Error handling best practices
- Example AI features (summarize, categorize, generate)

Include the actual code templates we used today.
```

**Your skill structure:**
```
.claude/
└── skills/
    ├── blog-writer/
    ├── auth-setup/
    └── ai-integration/
        ├── SKILL.md
        └── templates/
            ├── ai-route.ts
            ├── ai-functions.ts
            └── prompt-patterns.md
```

Now you have a reusable pattern for adding AI to any project.

### 7. Ship (30 min)

**Deploy:**
```
You: Commit everything with message "Day 4: AI integration"
and push to GitHub.
```

**Add environment variable to Vercel:**
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add `GEMINI_API_KEY`

**Test in production:**
- AI feature works on deployed site
- Loading states visible
- Error handling works
- Response times acceptable

**Demo prep:**
- Show the AI feature in action
- Explain what problem it solves
- Show how it improves user experience

---

## What You Built Today

| Asset | How |
|-------|-----|
| AI API connection | Claude set up Gemini integration |
| Custom AI function | Claude wrote prompt + handling |
| UI integration | Claude added AI to your interface |
| Error handling | Claude made it production-ready |
| AI skill | Reusable template for future projects |

**Your product is intelligent now.** It doesn't just store data—it thinks, analyzes, generates. This is what separates a database with a UI from a real product.

---

## The AI-First Pattern

Notice what happened:

| Old Way | Your Way |
|---------|----------|
| Read Gemini docs for hours | Tell Claude to set it up |
| Trial-and-error prompts | Claude writes effective prompts |
| Debug API integration | Claude handles edge cases |
| Write error handling from scratch | Claude adds production-ready UX |

You're not just building—you're building WITH AI, about AI, for AI-powered products.

---

## Day 4 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid API key" | Tell Claude: "API key isn't working, debug this" |
| CORS error | Tell Claude: "Getting CORS error, need server-side route" |
| Rate limited | Tell Claude: "Getting rate limited, add debouncing" |
| AI response is weird | Tell Claude: "The AI response isn't formatted right, improve the prompt" |
| Slow response | Tell Claude: "AI is slow, add loading states and timeout" |

**When AI behaves unexpectedly:** Show Claude the prompt and the response. Ask for improvements.

---

## Prompt Engineering Tips

Things Claude taught you today:

| Principle | Example |
|-----------|---------|
| Be specific about output format | "Reply with ONLY the category name" |
| Constrain responses | "Choose from: [list of options]" |
| Give examples | "Like this: 'Fixed bug in login' → 'Bug Fix'" |
| Set the role | "You are a helpful assistant that summarizes text" |
| Limit length | "In exactly one sentence" or "In under 50 words" |

These patterns work with any AI API.

---

## Optional: Add ChatGPT as Backup

**If you want a fallback:**
```
You: Add ChatGPT as a backup if Gemini fails.

Get an OpenAI API key from platform.openai.com
Create a unified askAI function that:
1. Tries Gemini first (free)
2. Falls back to ChatGPT if Gemini fails
3. Returns the response from whichever works

This way my app stays working even if one API is down.
```

Claude will set up both APIs with graceful fallback.

---

## Practice Exercise

Complete this exercise to solidify today's skills:

**[Add AI to Your Product](exercises/04-ai-feature.md)** (60 min)
- Connect to Gemini API (server-side)
- Write constrained prompts
- Integrate AI into your UI
- Handle errors gracefully

---

*Tomorrow: Demo Day Zero. Show what you built.*
