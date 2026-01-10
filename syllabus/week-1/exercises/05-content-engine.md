# Exercise: Build Your Content Engine

**Type**: Project
**Duration**: 2 hours
**Difficulty**: Advanced

## Overview

Build an AI system that generates blog posts, social media snippets, and email drafts—all in your brand voice. This is your capstone project for Week 1.

## Learning Objective

After completing this exercise, you will be able to:
- Chain multiple AI calls in a pipeline
- Store generated content in a database
- Build a content management dashboard
- Present a working demo

## Prerequisites

- Completed Days 1-4
- AI integration working
- Blog-writer skill created
- Database with auth working

---

## What You're Building

```
Content Engine
├── Input: Topic
├── Generate: Blog post (1000+ words)
├── Extract: 5 social snippets (<280 chars each)
├── Draft: Email newsletter
├── Store: All content in database
└── Display: Management dashboard
```

---

## Instructions

### Task
Build a complete content generation pipeline that creates multiple content pieces from a single topic.

### Requirements
- [ ] Content table stores: topic, blog_post, social_snippets, email_draft, status
- [ ] Can generate all content from one topic input
- [ ] Progress indicator shows each generation step
- [ ] Dashboard lists all generated content
- [ ] Can view full content for each piece
- [ ] Social snippets have copy buttons
- [ ] Can mark content as "reviewed" or "published"

### Phase 1: Database Setup (15 min)

Create the content table:
```
You: Create a content table in Supabase with:
- id, user_id, created_at (standard)
- topic (text)
- blog_post (text, markdown)
- social_snippets (text array or JSON)
- email_draft (text)
- status (text: draft/reviewed/published)

Include RLS for user isolation.
```

### Phase 2: Generation Functions (45 min)

**Blog generator:**
```
You: Create a generateBlogPost function that:
- Takes a topic
- Uses CLAUDE.md for brand voice
- Returns 1000-1500 word markdown blog post
- Has clear structure: hook, sections, CTA
```

**Social snippet extractor:**
```
You: Create a generateSocialSnippets function that:
- Takes the blog post text
- Extracts 5 tweet-length insights
- Each under 280 characters
- Each standalone (makes sense without context)
- Returns array of strings
```

**Email drafter:**
```
You: Create a generateEmailDraft function that:
- Takes the blog post text
- Creates newsletter version
- Includes: subject line, personal hook, key insights, CTA
- 200-300 words
- Feels personal, not promotional
```

**Pipeline function:**
```
You: Create generateAllContent that:
- Takes topic
- Calls all three generators in sequence
- Saves everything to database
- Returns complete content object
- Handles partial failures gracefully
```

### Phase 3: Dashboard UI (45 min)

```
You: Create a /content page with:

1. Topic input form
   - Text field
   - "Generate Content" button
   - Progress modal showing steps

2. Content list
   - Cards showing topic, status, date
   - Click to expand

3. Content detail view
   - Rendered blog post
   - Social snippets with copy buttons
   - Email draft
   - Status change buttons
```

### Phase 4: Polish (15 min)

```
You: Add finishing touches:
- Empty state when no content
- Error handling for each generation step
- Loading states
- Mobile responsive
- Character count on snippets
- Word count on blog post
```

---

## Hints

<details>
<summary>Hint 1: Generation order matters</summary>

Generate blog first, then use it as input for snippets and email:
```javascript
const blog = await generateBlogPost(topic)
const snippets = await generateSocialSnippets(blog)
const email = await generateEmailDraft(blog)
```

</details>

<details>
<summary>Hint 2: Social snippets format</summary>

Store as JSON array in database:
```javascript
const snippets = ['snippet 1', 'snippet 2', ...]
// Store as JSON: JSON.stringify(snippets)
// Retrieve: JSON.parse(data.social_snippets)
```

</details>

<details>
<summary>Hint 3: Progress indicator</summary>

Track state for each step:
```javascript
let steps = {
  blog: 'pending',      // pending | loading | done | error
  snippets: 'pending',
  email: 'pending',
  save: 'pending'
}
```

</details>

---

## Expected Output

A working content engine where:
1. Enter a topic → Click "Generate"
2. See progress: "Generating blog..." → "Creating snippets..." → "Drafting email..." → "Saving..."
3. All content appears in dashboard
4. Can view full blog post, copy snippets, read email draft
5. Can mark as reviewed/published

---

## Self-Check

- [ ] Can generate content from topic input
- [ ] All three content types are created
- [ ] Progress shows during generation
- [ ] Content saves to database
- [ ] Can view each content piece
- [ ] Copy button works on snippets
- [ ] Status changes persist
- [ ] Works on deployed site

---

## Demo Preparation

Your 2-minute demo should show:

| Section | Time | What to Show |
|---------|------|--------------|
| Hook | 15s | "Content takes hours. I built a machine." |
| Generate | 60s | Live: Enter topic → Watch AI create |
| Output | 30s | Show blog + snippets + email |
| Close | 15s | "Week 1: AI workspace to content engine." |

**Practice:**
- Generate content for 2-3 topics before demo
- Have backup content ready if live generation fails
- Know exactly what you'll say

---

## Solution

<details>
<summary>Reveal Solution</summary>

**Database SQL:**
```sql
CREATE TABLE content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic TEXT NOT NULL,
  blog_post TEXT,
  social_snippets JSONB,
  email_draft TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'reviewed', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own content" ON content
  FOR ALL USING (auth.uid() = user_id);
```

**Generation pipeline (simplified):**
```typescript
export async function generateAllContent(topic: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Generate blog
  const blogPost = await generateBlogPost(topic)

  // Generate snippets from blog
  const socialSnippets = await generateSocialSnippets(blogPost)

  // Generate email from blog
  const emailDraft = await generateEmailDraft(blogPost)

  // Save to database
  const { data, error } = await supabase
    .from('content')
    .insert({
      user_id: user.id,
      topic,
      blog_post: blogPost,
      social_snippets: socialSnippets,
      email_draft: emailDraft,
      status: 'draft'
    })
    .select()
    .single()

  if (error) throw error
  return data
}
```

</details>

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Calling AI in parallel | Rate limit errors | Chain calls sequentially |
| Not saving partial results | Lost work on failure | Save after each step |
| Snippets stored as string | Can't iterate in UI | Store as JSON array |
| No copy feedback | User unsure if copied | Show "Copied!" toast |

---

## Stretch Goals (Optional)

1. **Add regenerate button** for individual pieces
2. **Add topic suggestions** based on your niche
3. **Export to markdown** download button
4. **Schedule publishing** with future dates
5. **Analytics** track which content gets published
