# Block 4: Build Your Dashboard

It's time to visualize your empire. 🕹️ Every CEO needs a **Single Source of Truth**.

## Learn

A dashboard is your **Visual Cockpit**. Instead of checking 10 apps, you check one screen.

We are building this using **SvelteKit** and **SQLite**. Why? Because it's fast, private, and runs entirely on your machine. Your business data never leaves your sight. 🛡️

Your dashboard will have 3 main views:
1. **The Pulse**: Real-time stats from your business.
2. **The Agent Hub**: Where you see what your agents are currently doing.
3. **The Quick Capture**: A scratchpad that the AI reads to learn your new ideas.

### Code Example (Dashboard Component)

```svelte
<h1>CEO Command Centre</h1>
<div class="stats">
  <StatCard label="Agent Tasks" value={activeTasks} />
  <StatCard label="VIP Emails" value={unreadVips} />
</div>
```

## Exercise

Customize your **Command View**.

### Instructions

1. Choose the **Top 3 Metrics** you want to see every morning.
2. Link your Dashboard to your SQLite database.
3. Add a "Quick Capture" note and see it appear on your screen instantly.

---

**FEATURE UNLOCKED!** 🔓
Dashboard Online. You have a Single Source of Truth.
+200 XP 🌟
