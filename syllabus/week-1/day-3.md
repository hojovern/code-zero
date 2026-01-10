# Day 3: Build the Thing

> "Today you build what makes your product YOUR product."

## The Challenge

**By end of day, your product does something useful.**

Not just auth. Not just a landing page. The CORE FEATURE—the reason your product exists.

---

## What's Your Core Feature?

Before we start, identify yours:

| Product Type | Core Feature Example |
|--------------|---------------------|
| Habit tracker | Log a habit, see streaks |
| Note-taking app | Create, edit, list notes |
| Job board | Post a job, browse jobs |
| Expense tracker | Add expense, see totals |
| Link shortener | Shorten URL, track clicks |
| Meal planner | Add meals, generate shopping list |
| Flashcard app | Create cards, quiz mode |
| Portfolio site | Project showcase, contact form |

**Your core feature = the minimum thing that delivers value.**

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Feature Scoping | Define exactly what you're building |
| 9:30 - 10:30 | Data Modeling with Claude | Database table(s) created |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | AI Builds the Backend | CRUD operations working |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Show your data model | Get feedback |
| 13:30 - 15:00 | AI Builds the UI | Forms, lists, interactions |
| 15:00 - 15:15 | Break | |
| 15:15 - 16:30 | Polish the Flow | Complete user journey |
| 16:30 - 17:30 | Ship + Demo Prep | Deploy, test, show |

---

## Morning: The Backend

### 1. Feature Scoping (30 min)

**Answer these questions:**

1. **What's the ONE thing your app must do?**
   - Not three things. ONE thing.
   - Example: "Users can create and view notes"

2. **What data do you need to store?**
   - What fields? What types?
   - Example: Note has `title`, `content`, `user_id`, `created_at`

3. **What can the user do?**
   - Create? Read? Update? Delete?
   - Start with Create and Read. Add Update/Delete if time.

**Write it down and tell Claude:**
```
You: My product is [name]. The core feature is [description].
Users need to be able to [actions].
I need to store: [fields and types].
Help me design this feature.
```

### 2. Data Modeling with Claude (60 min)

**Tell Claude what you need:**
```
You: Create a database table for [your feature] in Supabase.

The table should store:
- [field 1]: [type and purpose]
- [field 2]: [type and purpose]
- etc.

Include:
- RLS policies so users only see their own data
- Proper foreign key to auth.users
- created_at timestamp

Give me the SQL to run in Supabase SQL Editor.
```

**Claude will generate:**
- The complete SQL for your table
- RLS policies for select, insert, update, delete
- Explanation of what each policy does

**Example for a Notes app:**
```
You: Create a database table for notes in Supabase.

The table should store:
- title: text, required
- content: text, optional
- user_id: linked to the logged-in user
- created_at: when it was created

Include RLS so users only see their own notes.
```

Claude generates the SQL. You copy it to Supabase SQL Editor and run it.

**Key concepts Claude is teaching you:**

| Concept | What It Means |
|---------|---------------|
| Primary Key | Unique ID for each row (usually `id uuid`) |
| Foreign Key | Links to another table (`user_id references auth.users`) |
| RLS Policy | Rule for who can see/edit what data |
| `auth.uid()` | Built-in function that returns current user's ID |

### 3. AI Builds the Backend (75 min)

**Tell Claude to create your feature's logic:**
```
You: Create a TypeScript file for managing [feature] data.

Put it in src/lib/[feature].ts

Include functions for:
- Get all [items] for the current user
- Create a new [item]
- Update an [item]
- Delete an [item]

Use the Supabase client from src/lib/supabase.ts.
Include TypeScript types for the [item].
```

Claude will create:
- Type definitions for your data
- Functions for each CRUD operation
- Proper error handling
- User authentication checks

**Test it works:**
```
You: Help me test these functions. Add a simple console.log in the dashboard
that creates a test [item], fetches all [items], and logs them.
```

Check the browser console. See your data? You have a working backend.

---

## Afternoon: The UI

### 4. AI Builds the UI (90 min)

**This is where the magic happens.**

```
You: Create a page for managing [feature] at /[feature].

The page should:
- Be protected (redirect to /login if not authenticated)
- Show a list of all user's [items]
- Have a button to create new [item]
- Show a form when creating (with fields for [your fields])
- Allow deleting [items]
- Show loading states
- Show empty state when no [items] exist

Use our brand styling from CLAUDE.md. Match the dark theme
with green accents we've been using.
```

Claude will create the complete page with:
- Authentication check
- State management
- Create form
- List display
- Delete functionality
- Loading and empty states
- Proper styling

**Review and iterate:**
```
You: The form should have [specific change]. Also, show the
created date in a nicer format like "2 days ago".
```

```
You: Add an edit button that lets users modify existing [items].
When clicked, show the form pre-filled with current values.
```

```
You: The delete should ask for confirmation before deleting.
```

**The pattern:**
1. Describe what you want
2. Claude builds it
3. You review in browser
4. You request specific changes
5. Claude iterates

### 5. Polish the Flow (75 min)

**Add navigation:**
```
You: Update the navigation to include a link to /[feature].
Show it in the logged-in nav alongside Dashboard.
Also make sure clicking the logo goes to home.
```

**Complete the user journey:**
```
You: Walk me through the complete user journey and make sure
everything connects:

1. Landing page has clear CTA to sign up
2. After signup, redirect to dashboard
3. Dashboard shows profile + link to [feature]
4. [Feature] page is fully functional
5. Navigation works everywhere
6. Logged out users get redirected properly

Fix any gaps you find.
```

**Test the complete flow:**
- [ ] Landing page → Sign up → Dashboard → Feature
- [ ] Can create new item
- [ ] Item appears in list immediately
- [ ] Can edit item
- [ ] Can delete item (with confirmation)
- [ ] Refresh page — data persists
- [ ] Log in as different user — can't see other user's data

### 6. Ship + Demo Prep (60 min)

**Deploy:**
```
You: Commit everything with message "Day 3: [Feature] complete"
and push to GitHub.
```

Vercel auto-deploys. Test in production.

**Test in production:**
- Full user journey on live site
- Create real data
- Verify RLS is working (can't see other users' data)

**Prep for tomorrow's standup:**
- What does your feature do?
- Show: Create → Display → Edit → Delete flow
- What would make it better? (save for tomorrow)

---

## What You Built Today

| Asset | How |
|-------|-----|
| Database table | Claude wrote the SQL, you ran it |
| RLS policies | Claude configured security |
| Backend functions | Claude wrote the TypeScript |
| Feature UI | Claude built the Svelte components |
| Complete CRUD | Create, Read, Update, Delete working |

**Your product now DOES something.** It's not a landing page. It's not just auth. It's functional software that stores data and serves users.

---

## The AI-First Pattern

Notice what you did today:

| Old Way | Your Way |
|---------|----------|
| Google "how to create Supabase table" | Tell Claude what data you need |
| Copy tutorial code, modify it | Claude writes code for YOUR feature |
| Debug for hours | Ask Claude to fix issues |
| Read docs to understand RLS | Claude explains while building |

You're learning by building, with AI as your pair programmer.

---

## Day 3 Troubleshooting

| Problem | Solution |
|---------|----------|
| RLS blocks all queries | Tell Claude: "My queries are blocked, check the RLS policies" |
| Data doesn't persist | Tell Claude: "Data isn't saving, check the insert function" |
| UI doesn't update after create | Tell Claude: "After creating, the list doesn't update" |
| Works for one user, breaks for two | Tell Claude: "Test RLS—can other users see my data?" |

**When stuck, describe the problem to Claude.** Include what you expected vs what happened. Claude will debug with you.

---

## Skills You're Building

Today isn't just about your feature. You're learning:

1. **Data modeling** — How to structure information
2. **CRUD operations** — The foundation of all apps
3. **Row Level Security** — How real apps protect user data
4. **AI-assisted debugging** — Describing problems clearly
5. **Iterative development** — Build, review, refine

These skills transfer to any product you build.

---

*Tomorrow: AI makes your product intelligent.*
