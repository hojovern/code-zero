# Pre-Commit Quality Gate

**Type:** Workflow (runs before `/commit`)

**Purpose:** Ensure code quality, security, and tests pass before committing.

---

## WHEN TO USE

**Automatically before every `/commit`:**

The `/commit` skill should invoke this checklist before staging and committing.

**Manually when requested:**
- "check the code before commit"
- "run pre-commit checks"
- "is this ready to commit?"

---

## THE CHECKLIST

### 1. Build Check

```bash
npm run check
```

**Must pass:**
- [ ] No TypeScript errors
- [ ] No Svelte compilation errors

**Action if fails:** Fix errors before proceeding.

### 2. Security Scan

**Quick checks:**
```bash
# Check for secrets in staged files
git diff --cached --name-only | xargs grep -l -E "(sk-|api_key|password|secret)" 2>/dev/null
```

**Review:**
- [ ] No API keys or secrets in code
- [ ] No `.env` files staged
- [ ] No credentials.json or similar

**Action if fails:** Remove secrets, add to `.gitignore`.

### 3. Code Quality

**From clean-code skill:**
- [ ] No files over 400 lines added
- [ ] No obvious code duplication
- [ ] New components are in `$lib/components/`
- [ ] Business logic in services, not endpoints

**Quick check:**
```bash
# Find large files being committed
git diff --cached --stat | grep -E "\+[0-9]{3,}"
```

### 4. Test Check (if tests exist)

```bash
npm run test
```

**Must pass:**
- [ ] All existing tests pass
- [ ] New features have tests (if test file exists)

**Action if fails:** Fix failing tests or explain why skipping.

### 5. Lint Check (if configured)

```bash
npm run lint
```

**Should pass:**
- [ ] No linting errors
- [ ] Warnings reviewed

---

## WORKFLOW

```
User: /commit

Claude:
1. Read this skill (pre-commit)
2. Run checks:
   a. npm run check → Must pass
   b. Security scan → Must pass
   c. Code quality review → Flag issues
   d. npm run test → Should pass (if exists)
3. If all pass → Proceed with commit
4. If issues → Report and ask user how to proceed
```

---

## OUTPUT FORMAT

### All Checks Pass

```
Pre-commit checks:
✓ Build: No TypeScript/Svelte errors
✓ Security: No secrets detected
✓ Quality: Files within size limits
✓ Tests: All passing

Ready to commit.
```

### Issues Found

```
Pre-commit checks:
✓ Build: Passed
✗ Security: Found potential API key in src/lib/api.ts:42
✓ Quality: Passed
⚠ Tests: 2 failing tests

Issues to resolve:
1. [BLOCKING] Remove API key from src/lib/api.ts:42
2. [WARNING] Fix failing tests or confirm skip

Proceed anyway? (not recommended)
```

---

## BLOCKING vs WARNING

| Type | Issues | Action |
|------|--------|--------|
| **BLOCKING** | Secrets in code, build fails | Must fix before commit |
| **WARNING** | Large files, failing tests, lint errors | Flag to user, can proceed |
| **INFO** | Style suggestions, minor improvements | Note for future |

---

## SKIP CONDITIONS

User can skip checks with:
- "commit anyway"
- "skip checks"
- "just commit it"

**But always warn:**
> "Skipping pre-commit checks. Note: [list of skipped issues]"

---

## INTEGRATION WITH /commit

Update the commit skill to call pre-commit first:

```markdown
## WORKFLOW (Updated)

### Step 0: Pre-Commit Checks (NEW)
1. Run pre-commit checklist
2. If blocking issues → Stop and report
3. If warnings → Report and ask to proceed
4. If clean → Continue to Step 1

### Step 1: Check Status
...rest of commit workflow...
```

---

## QUICK COMMANDS

```bash
# Full check
npm run check && npm run test && npm run lint

# Just build
npm run check

# Security grep (manual)
grep -rn "sk-\|api_key\|password\|secret" src/ --include="*.ts" --include="*.svelte"

# Large files
find src -name "*.svelte" -o -name "*.ts" | xargs wc -l | sort -n | tail -20
```

---

## SESSION LEARNINGS

### Patterns Discovered

### Improvements Made

### Avoid

