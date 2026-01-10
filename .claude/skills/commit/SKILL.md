---
name: commit
description: Commit all changes and push to GitHub. Creates a well-crafted commit message based on staged changes.
---

# Commit & Push

**Commits all staged/unstaged changes and pushes to GitHub in one command.**

## WORKFLOW

### Step 1: Check Status

Run these commands in parallel:
- `git status` - See all changes
- `git diff --stat` - See what's changed (summary)
- `git log -3 --oneline` - See recent commit style

### Step 2: Stage All Changes

```bash
git add -A
```

### Step 3: Analyze Changes

Review the staged changes to understand:
- What files were modified/added/deleted
- What the changes accomplish
- Whether this is a feature, fix, refactor, docs, etc.

### Step 4: Create Commit Message

Write a clear, concise commit message:
- First line: imperative verb + what changed (max 72 chars)
- If needed: blank line + body explaining why
- End with co-author tag

**Format:**
```
[type] Short description of what changed

Optional longer explanation if the changes are complex.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructuring
- `style:` - Formatting, CSS
- `docs:` - Documentation
- `chore:` - Maintenance, config
- `content:` - Content updates (blog, copy)

### Step 5: Commit

Use HEREDOC for proper formatting:

```bash
git commit -m "$(cat <<'EOF'
feat: Add user authentication

Implemented Google OAuth via Supabase Auth.
Added login page with branded styling.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### Step 6: Push to GitHub

```bash
git push
```

If the branch has no upstream:
```bash
git push -u origin HEAD
```

### Step 7: Confirm

Output the result:
```
Committed: [commit message first line]
Pushed to: [branch name]
```

---

## RULES

1. **Always stage all changes** - Use `git add -A` to include everything
2. **Write meaningful messages** - Describe what and why, not just what files
3. **Use conventional commits** - Prefix with type (feat, fix, etc.)
4. **Always push** - This skill commits AND pushes in one action
5. **Never force push** - Unless explicitly requested
6. **Check for secrets** - Warn if .env or credentials files are staged

---

## EXAMPLE

User: `/commit`

Claude:
1. Runs `git status`, `git diff --stat`, `git log -3 --oneline`
2. Runs `git add -A`
3. Reviews changes: "Added login page, updated navigation buttons"
4. Creates commit:
   ```
   feat: Add login page with Google OAuth

   - Created branded /login page with Google Sign-In
   - Updated all "Apply Now" buttons to link to login
   - Configured Supabase Auth integration

   Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
   ```
5. Runs `git push`
6. Outputs: "Committed: feat: Add login page with Google OAuth | Pushed to: main"

---

## SESSION LEARNINGS

### Workflow

### Output Rules

### Avoid
