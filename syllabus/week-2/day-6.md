# Day 6: Real-Time Magic

> "Your app stops waiting. Everything updates instantly."

## The Challenge

**By end of day, your app updates in real-time across all users.**

No refresh button. No polling. When one user does something, everyone sees it INSTANTLY. Like Google Docs. Like Figma. Like the apps you actually love using.

This is the moment your product feels alive.

---

## What You're Building

| Feature | What It Does |
|---------|--------------|
| Real-time data | Changes appear instantly for all users |
| Presence | See who's online right now |
| Live notifications | Instant alerts when things happen |
| Activity feed | Real-time stream of what's happening |

**The WOW moment:** Open your app in two browser windows. Do something in one. Watch it appear in the other. Magic.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Realtime Concepts | Understand how it works |
| 9:30 - 10:30 | Add Realtime to Core Feature | Live data updates |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | Build Presence System | See who's online |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Show your realtime | Two windows, instant sync |
| 13:30 - 14:30 | Live Notifications | Instant alerts |
| 14:30 - 14:45 | Break | |
| 14:45 - 16:00 | Activity Feed | Real-time stream |
| 16:00 - 17:00 | Polish + Edge Cases | Production-ready |
| 17:00 - 17:30 | Ship | Deploy real-time product |

---

## Morning: Real-Time Data

### 1. Realtime Concepts (30 min)

**How traditional apps work:**
```
User A creates item → Saved to database → User A sees it
User B refreshes page → Fetches from database → User B finally sees it
```

**How real-time apps work:**
```
User A creates item → Saved to database → BROADCAST to all users
User B sees it INSTANTLY → No refresh needed
```

Supabase makes this easy with **Realtime subscriptions**.

**Tell Claude to explain:**
```
You: Explain how Supabase Realtime works. What are channels,
subscriptions, and broadcasts? Give me a mental model for
thinking about real-time data in my app.
```

**Key concepts:**

| Concept | What It Means |
|---------|---------------|
| Channel | A "room" where updates are broadcast |
| Subscription | Listening to a channel for updates |
| Broadcast | Sending a message to everyone in the channel |
| Presence | Tracking who's currently connected |
| Postgres Changes | Auto-broadcast when database changes |

### 2. Add Realtime to Core Feature (60 min)

**Tell Claude to add realtime:**
```
You: Add real-time updates to my [feature] page.

When any user creates, updates, or deletes a [item]:
- All other users should see the change instantly
- No page refresh needed
- The list should update smoothly (not flash/flicker)

Use Supabase Realtime with Postgres Changes.
Show me how to subscribe when the component mounts
and unsubscribe when it unmounts.
```

**Claude will:**
- Set up the Supabase Realtime subscription
- Listen for INSERT, UPDATE, DELETE events
- Update local state when events arrive
- Handle cleanup on component unmount

**Test it (the magic moment):**
1. Open your app in two browser windows
2. Log in as the same user (or two different users)
3. Create an item in window 1
4. Watch it appear INSTANTLY in window 2

**Iterate:**
```
You: When a new item appears, add a subtle highlight animation
so users notice something changed. Fade it in smoothly.
```

```
You: Also show a small toast notification when another user
makes a change: "John just added a new note"
```

### 3. Build Presence System (75 min)

**Presence = knowing who's online right now.**

```
You: Add a presence system to show who's currently online.

Create a component that:
- Shows avatars/names of online users
- Updates in real-time when users join/leave
- Shows a green dot for online status
- Displays in the header or sidebar

Use Supabase Realtime Presence. Track the user's profile
info (name, avatar) in the presence state.
```

**Claude will:**
- Set up Presence channel
- Track user state when they join
- Sync presence state across all clients
- Display online users component

**Test it:**
1. Open app in two browsers (different users)
2. See both users appear in "online" list
3. Close one browser
4. Watch that user disappear from the list

**Add presence to feature pages:**
```
You: On the [feature] page, show which other users are
currently viewing the same page. Display their cursors
or just a "3 others viewing" indicator.
```

---

## Afternoon: Notifications + Activity

### 4. Live Notifications (60 min)

**Build a notification system:**
```
You: Create a real-time notification system.

1. Create a notifications table:
   - id, user_id, message, type, read, created_at
   - Types: info, success, warning, action

2. Create a notification bell component:
   - Shows unread count badge
   - Dropdown with recent notifications
   - Click to mark as read
   - Real-time updates (new notifications appear instantly)

3. Trigger notifications when:
   - Someone interacts with user's content
   - System events happen
   - AI completes a task

Make the bell "ping" with animation when new notification arrives.
```

**Claude will:**
- Create the notifications table with RLS
- Build the notification bell UI
- Set up real-time subscription for new notifications
- Add animations for new notification arrival

**Test it:**
```
You: Create a test function that sends a notification to the
current user. I want to see the bell update in real-time.
```

### 5. Activity Feed (75 min)

**Build a live activity stream:**
```
You: Create a real-time activity feed for the dashboard.

1. Create an activity_log table:
   - id, user_id, action, entity_type, entity_id, metadata, created_at
   - Actions: created, updated, deleted, viewed, etc.

2. Automatically log activity when users:
   - Create/update/delete items
   - Complete AI tasks
   - Upload files

3. Build an activity feed component:
   - Shows recent activity in real-time
   - Grouped by time (Today, Yesterday, This Week)
   - Shows user avatar, action, and timestamp
   - New activities slide in from top with animation
   - "Load more" for history

4. Make it filterable:
   - All activity
   - Just my activity
   - By type (content, AI, system)

This should feel like a live stream of what's happening.
```

**Claude will:**
- Create activity logging infrastructure
- Build the feed UI with real-time updates
- Add filtering and grouping
- Implement smooth animations

**Test the full flow:**
1. Open dashboard in two windows
2. Create something in window 1
3. See activity appear in both feeds instantly

### 6. Polish + Edge Cases (60 min)

**Handle edge cases:**
```
You: Improve the real-time features with better edge case handling:

1. Connection status indicator:
   - Show when connected/disconnected
   - Auto-reconnect when connection drops
   - Queue changes while offline, sync when back

2. Optimistic updates:
   - Show changes immediately (don't wait for server)
   - Roll back if server rejects

3. Conflict resolution:
   - What if two users edit same item?
   - Show "Someone else is editing this" warning
   - Last-write-wins or merge strategy

4. Performance:
   - Throttle rapid updates
   - Batch multiple changes
   - Unsubscribe from unused channels
```

**Final checklist:**
- [ ] Real-time data sync working
- [ ] Presence shows online users
- [ ] Notifications arrive instantly
- [ ] Activity feed updates live
- [ ] Connection status visible
- [ ] Works on mobile
- [ ] No memory leaks (proper cleanup)

### 7. Ship (30 min)

**Deploy:**
```
You: Commit everything with message "Day 6: Real-time magic"
and push to GitHub.
```

**Test in production:**
- Open on phone and computer
- Make changes on one, see on other
- Test with a friend (different networks)
- Verify presence works across devices

---

## What You Built Today

| Feature | How |
|---------|-----|
| Real-time data | Supabase Realtime + Postgres Changes |
| Presence system | Supabase Presence API |
| Live notifications | Real-time subscription + UI |
| Activity feed | Activity logging + live stream |
| Connection handling | Reconnect logic + optimistic updates |

**Your app is ALIVE now.** It doesn't wait for users to refresh. It pushes updates to them. This is how modern apps feel.

---

## The Real-Time Pattern

What you built is reusable:

```
You: Create a realtime-features skill from what we built today.
Include:
- How to set up Supabase Realtime
- Presence system pattern
- Notification system pattern
- Activity feed pattern
- Connection handling best practices
```

---

## Why This Matters

Real-time isn't just a feature. It changes how users FEEL about your product:

| Without Real-Time | With Real-Time |
|-------------------|----------------|
| "Is this updated?" | "I see everything live" |
| Refresh, refresh, refresh | Just watch it happen |
| Feels like a form | Feels like an app |
| Working alone | Working together |

The products people love—Notion, Figma, Slack—are all real-time. Now yours is too.

---

## Day 6 Troubleshooting

| Problem | Solution |
|---------|----------|
| Updates not appearing | Check Realtime is enabled on table in Supabase |
| Presence not syncing | Verify channel name matches across clients |
| Memory leak warnings | Make sure to unsubscribe on component unmount |
| Too many updates | Add throttling/debouncing |
| Works locally, not in prod | Check Supabase Realtime is enabled in project settings |

---

*Tomorrow: Make your UI feel as professional as your features.*
