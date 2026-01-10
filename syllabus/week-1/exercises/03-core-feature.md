# Exercise: Build Your Core Feature

**Type**: Solo
**Duration**: 90 minutes
**Difficulty**: Intermediate

## Overview

Build the ONE feature that makes your product useful. This is full CRUD (Create, Read, Update, Delete) with database storage and proper security.

## Learning Objective

After completing this exercise, you will be able to:
- Design a database table for your feature
- Implement Row Level Security (RLS) policies
- Build CRUD operations with Supabase
- Create a functional UI for your feature

## Prerequisites

- Completed Day 2 (auth working)
- Clear idea of your core feature
- Supabase project with auth configured

---

## Starter Templates

Pick the template closest to your product:

### Template A: Notes/Items
```
Table: items
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- title (text, required)
- content (text, optional)
- created_at (timestamp)
```

### Template B: Tracker/Logger
```
Table: entries
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- category (text, required)
- value (numeric or text)
- notes (text, optional)
- logged_at (timestamp)
```

### Template C: Resource/Collection
```
Table: resources
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- name (text, required)
- url (text, optional)
- tags (text array)
- created_at (timestamp)
```

---

## Instructions

### Task
Build your product's core feature with full CRUD operations and proper security.

### Requirements
- [ ] Database table created with appropriate fields
- [ ] RLS policies prevent users from seeing others' data
- [ ] Can CREATE new items
- [ ] Can READ (list) all your items
- [ ] Can UPDATE existing items
- [ ] Can DELETE items (with confirmation)
- [ ] UI shows loading and empty states

### Steps

**Step 1: Design your data model**
Decide what fields you need. Tell Claude:
```
You: My product is [name]. The core feature needs to store [what].
Each record needs: [list your fields and types]
Help me design the database table.
```

**Step 2: Create table with RLS**
```
You: Create SQL for this table in Supabase with:
- Proper primary key and foreign key to auth.users
- RLS policies so users only see their own data
- All CRUD policies (select, insert, update, delete)
```

Run the SQL in Supabase SQL Editor.

**Step 3: Create TypeScript functions**
```
You: Create a lib file for managing [feature] data.
Include functions for: getAll, create, update, delete
Use Supabase client and include TypeScript types.
```

**Step 4: Build the UI**
```
You: Create a page at /[feature] that:
- Lists all items for the current user
- Has a form to create new items
- Each item has edit and delete buttons
- Shows loading and empty states
- Matches our brand styling
```

**Step 5: Test thoroughly**
- Create 3-4 items
- Edit one
- Delete one
- Refresh page (data persists)
- Log in as different user (can't see first user's data)

---

## Hints

<details>
<summary>Hint 1: RLS blocking all queries</summary>

Your policy likely has a syntax error. The most common pattern:
```sql
CREATE POLICY "Users can view own items"
ON items FOR SELECT
USING (auth.uid() = user_id);
```

Make sure your column is called `user_id` and references `auth.uid()`.

</details>

<details>
<summary>Hint 2: Data saves but list doesn't update</summary>

After inserting, you need to refresh the list. Either:
1. Re-fetch after insert: `items = await getAll()`
2. Optimistically add to array: `items = [...items, newItem]`

</details>

<details>
<summary>Hint 3: Delete not confirming</summary>

Add a confirmation before delete:
```javascript
if (confirm('Delete this item?')) {
  await deleteItem(id)
}
```

</details>

---

## Expected Output

A fully functional feature page where users can:
1. See their items listed (or empty state if none)
2. Create new items via form
3. Edit existing items
4. Delete items with confirmation
5. Never see other users' data

---

## Self-Check

- [ ] Table exists in Supabase with correct columns
- [ ] RLS is enabled on the table
- [ ] Can create items (appear in Supabase dashboard)
- [ ] Can see only MY items, not others'
- [ ] Edit updates in real-time
- [ ] Delete removes with confirmation
- [ ] Empty state shows when no items
- [ ] Loading state shows during fetch

---

## Solution

<details>
<summary>Reveal Solution</summary>

**SQL for notes table:**
```sql
-- Create table
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own notes" ON notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON notes
  FOR DELETE USING (auth.uid() = user_id);
```

**src/lib/notes.ts:**
```typescript
import { supabase } from './supabase'

export interface Note {
  id: string
  user_id: string
  title: string
  content: string | null
  created_at: string
}

export async function getNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createNote(title: string, content?: string): Promise<Note> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('notes')
    .insert({ title, content, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateNote(id: string, updates: Partial<Note>): Promise<Note> {
  const { data, error } = await supabase
    .from('notes')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

  if (error) throw error
}
```

</details>

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| RLS not enabled | Can see all users' data | Run: `ALTER TABLE x ENABLE ROW LEVEL SECURITY` |
| No user_id on insert | Insert fails | Include `user_id: user.id` in insert call |
| Stale data after action | List doesn't update | Re-fetch or update local state after mutations |
| Missing error handling | Silent failures | Add try/catch and display errors to user |

---

## Stretch Goals (Optional)

1. **Add search/filter** by title or content
2. **Add sorting** options (newest, oldest, alphabetical)
3. **Add bulk delete** for multiple items
4. **Add item count** in the UI
