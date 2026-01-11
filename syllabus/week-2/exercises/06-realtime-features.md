# Exercise: Build Real-Time Features

**Day 6 | Solo | 75 min**

Build a real-time data sync system and presence indicators using Supabase Realtime.

---

## Learning Objectives

By completing this exercise, you will:
- Set up Supabase Realtime subscriptions
- Implement live data sync across browser windows
- Build a presence system showing online users
- Handle connection states and cleanup

---

## Prerequisites

Before starting:
- [ ] Supabase project with auth working
- [ ] At least one database table with data
- [ ] Basic SvelteKit component knowledge
- [ ] Week 1 completed

---

## The Challenge

**Build a real-time sync system that:**
1. Updates data instantly across all connected users
2. Shows who's currently online
3. Handles connection drops gracefully

**Success criteria:**
- Open your app in two browser windows
- Make a change in one window
- See it appear instantly in the other (no refresh)
- See both users in the "online" indicator

---

## Starter Code

### 1. Realtime Subscription Setup

```typescript
// src/lib/realtime.ts
import { supabase } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function subscribeToTable(
  tableName: string,
  callback: (payload: any) => void
): RealtimeChannel {
  // TODO: Create a channel for the table
  // TODO: Listen for INSERT, UPDATE, DELETE events
  // TODO: Call callback with the payload
  // TODO: Return the channel for cleanup
}

export function unsubscribe(channel: RealtimeChannel) {
  // TODO: Remove the channel subscription
}
```

### 2. Component Integration

```svelte
<!-- src/routes/[feature]/+page.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { subscribeToTable, unsubscribe } from '$lib/realtime';
  import type { RealtimeChannel } from '@supabase/supabase-js';

  let items: any[] = [];
  let channel: RealtimeChannel;

  onMount(async () => {
    // TODO: Fetch initial data

    // TODO: Subscribe to realtime updates
    channel = subscribeToTable('your_table', (payload) => {
      // TODO: Handle INSERT - add to items
      // TODO: Handle UPDATE - update in items
      // TODO: Handle DELETE - remove from items
    });
  });

  onDestroy(() => {
    // TODO: Cleanup subscription
  });
</script>
```

### 3. Presence System

```typescript
// src/lib/presence.ts
import { supabase } from './supabase';
import { writable } from 'svelte/store';

export const onlineUsers = writable<any[]>([]);

export function setupPresence(userId: string, userInfo: any) {
  // TODO: Create a presence channel
  // TODO: Track this user's presence state
  // TODO: Subscribe to presence sync events
  // TODO: Update onlineUsers store when users join/leave
}

export function leavePresence() {
  // TODO: Remove user from presence channel
}
```

---

## Step-by-Step Instructions

### Step 1: Enable Realtime on Your Table (10 min)

In Supabase Dashboard:
1. Go to Database → Replication
2. Enable replication for your table
3. Or run: `ALTER PUBLICATION supabase_realtime ADD TABLE your_table;`

### Step 2: Create the Subscription (20 min)

Complete the `subscribeToTable` function:

```typescript
export function subscribeToTable(
  tableName: string,
  callback: (payload: any) => void
): RealtimeChannel {
  const channel = supabase
    .channel(`${tableName}-changes`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events
        schema: 'public',
        table: tableName
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return channel;
}
```

### Step 3: Handle Events in Component (20 min)

Update the component to handle different event types:

```typescript
channel = subscribeToTable('your_table', (payload) => {
  const { eventType, new: newRecord, old: oldRecord } = payload;

  switch (eventType) {
    case 'INSERT':
      items = [...items, newRecord];
      break;
    case 'UPDATE':
      items = items.map(item =>
        item.id === newRecord.id ? newRecord : item
      );
      break;
    case 'DELETE':
      items = items.filter(item => item.id !== oldRecord.id);
      break;
  }
});
```

### Step 4: Build Presence System (25 min)

Complete the presence setup:

```typescript
export function setupPresence(userId: string, userInfo: any) {
  const channel = supabase.channel('online-users', {
    config: {
      presence: { key: userId }
    }
  });

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      const users = Object.values(state).flat();
      onlineUsers.set(users);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track(userInfo);
      }
    });

  return channel;
}
```

---

## Hints

<details>
<summary>Hint 1: Subscription not working?</summary>

Check that:
- Replication is enabled on the table
- You're using the correct table name
- The channel is subscribed (not just created)
- You're calling `.subscribe()` at the end
</details>

<details>
<summary>Hint 2: Presence not syncing?</summary>

Make sure:
- You're calling `channel.track()` after subscription
- The presence key is unique per user
- You're listening to the 'sync' event
</details>

<details>
<summary>Hint 3: Memory leaks?</summary>

Always cleanup in `onDestroy`:
```typescript
onDestroy(() => {
  if (channel) {
    supabase.removeChannel(channel);
  }
});
```
</details>

---

## Solution

<details>
<summary>Full Solution</summary>

### realtime.ts
```typescript
import { supabase } from './supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function subscribeToTable(
  tableName: string,
  callback: (payload: any) => void
): RealtimeChannel {
  const channel = supabase
    .channel(`${tableName}-changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: tableName
      },
      callback
    )
    .subscribe();

  return channel;
}

export function unsubscribe(channel: RealtimeChannel) {
  supabase.removeChannel(channel);
}
```

### presence.ts
```typescript
import { supabase } from './supabase';
import { writable } from 'svelte/store';

export const onlineUsers = writable<any[]>([]);
let presenceChannel: RealtimeChannel | null = null;

export function setupPresence(userId: string, userInfo: any) {
  presenceChannel = supabase.channel('online-users', {
    config: { presence: { key: userId } }
  });

  presenceChannel
    .on('presence', { event: 'sync' }, () => {
      const state = presenceChannel!.presenceState();
      const users = Object.values(state).flat();
      onlineUsers.set(users);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await presenceChannel!.track(userInfo);
      }
    });
}

export function leavePresence() {
  if (presenceChannel) {
    supabase.removeChannel(presenceChannel);
    presenceChannel = null;
  }
}
```

### Component
```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { subscribeToTable, unsubscribe } from '$lib/realtime';
  import { setupPresence, leavePresence, onlineUsers } from '$lib/presence';
  import type { RealtimeChannel } from '@supabase/supabase-js';

  let items: any[] = [];
  let channel: RealtimeChannel;

  onMount(async () => {
    // Fetch initial data
    const { data } = await supabase.from('items').select('*');
    items = data || [];

    // Subscribe to changes
    channel = subscribeToTable('items', (payload) => {
      const { eventType, new: newRecord, old: oldRecord } = payload;

      if (eventType === 'INSERT') {
        items = [...items, newRecord];
      } else if (eventType === 'UPDATE') {
        items = items.map(i => i.id === newRecord.id ? newRecord : i);
      } else if (eventType === 'DELETE') {
        items = items.filter(i => i.id !== oldRecord.id);
      }
    });

    // Setup presence
    const user = (await supabase.auth.getUser()).data.user;
    if (user) {
      setupPresence(user.id, { name: user.email });
    }
  });

  onDestroy(() => {
    if (channel) unsubscribe(channel);
    leavePresence();
  });
</script>

<div class="online-users">
  {#each $onlineUsers as user}
    <span class="user-badge">{user.name}</span>
  {/each}
</div>

<ul>
  {#each items as item (item.id)}
    <li>{item.name}</li>
  {/each}
</ul>
```
</details>

---

## Common Mistakes

1. **Forgetting to enable replication** — Must be enabled per-table in Supabase
2. **Not cleaning up subscriptions** — Always unsubscribe in onDestroy
3. **Wrong event structure** — Use `new` and `old`, not `record`
4. **Presence key not unique** — Each user needs a unique key

---

## Stretch Goals

- [ ] Add typing indicators ("User is typing...")
- [ ] Show cursor positions for other users
- [ ] Add connection status indicator (connected/reconnecting)
- [ ] Implement optimistic updates with rollback

---

## Verification Checklist

- [ ] Changes sync between browser windows instantly
- [ ] Online users list updates when users join/leave
- [ ] No console errors about subscriptions
- [ ] Subscriptions clean up properly on page leave
- [ ] Works when refreshing the page
