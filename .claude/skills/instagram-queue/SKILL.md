---
name: instagram-queue
description: Manage the Instagram posting queue. Use for viewing pending posts, approving content, validating queue files, and preparing batches for automated posting via n8n.
---

# Instagram Queue Management

Manage the content queue for automated Instagram posting. Posts are stored as markdown files with YAML frontmatter in `/social-media/queue/`.

## QUEUE LOCATION

```
/social-media/
├── queue/      # Pending posts (draft, approved)
├── posted/     # Archive of published posts
├── failed/     # Posts that failed to publish
└── *.png       # Generated graphics
```

## QUEUE FILE FORMAT

Each post is a markdown file named `YYYY-MM-DD-topic-slug.md`:

```yaml
---
id: 2026-01-12-ai-tools
platform: instagram
format: square              # square | portrait | story | reel
status: draft               # draft | approved | posting | posted | failed
scheduled_date: 2026-01-12  # When n8n should post
image: filename.png         # Local file in /social-media/
image_url: null             # Cloudinary URL (required for posting)
caption_length: 412         # Auto-calculated
hashtag_count: 12           # Max 30
created_at: 2026-01-10T19:00:00Z
posted_at: null             # Filled by n8n after posting
instagram_media_id: null    # Filled by n8n after posting
error: null                 # Error message if failed
---

Caption content goes here...

#hashtags #at #the #end
```

## COMMANDS

### show_queue
List all posts in the queue with their status.

**Action**: Read all `.md` files in `/social-media/queue/` (excluding _template.md), parse frontmatter, display as table:

| ID | Status | Scheduled | Hashtags | Image |
|----|--------|-----------|----------|-------|

### show_week
Show posts scheduled for the current week (next 7 days).

**Action**: Filter queue by `scheduled_date` within next 7 days. Show detailed view with caption preview (first 100 chars).

### approve [id]
Approve a specific post for publishing.

**Action**:
1. Find file matching id
2. Validate the post (see validation rules)
3. If valid, update `status: approved`
4. If invalid, show errors

### approve_all
Approve all draft posts scheduled for this week.

**Action**:
1. Find all posts with `status: draft` and `scheduled_date` in next 7 days
2. Validate each
3. Approve valid posts, list invalid ones with errors

### validate [id]
Check a queue file for issues without approving.

**Action**: Run all validation rules, report pass/fail for each.

### preview [id]
Show full post details including complete caption.

**Action**: Display formatted view of the post with:
- All frontmatter fields
- Full caption with formatting
- Character and hashtag counts
- Validation status

## VALIDATION RULES

Before approving, check:

| Rule | Requirement |
|------|-------------|
| Caption length | Max 2,200 characters |
| Hashtag count | Max 30 hashtags |
| Image file | `image` field set AND file exists in /social-media/ |
| Image URL | `image_url` must be set (Cloudinary URL) |
| Scheduled date | Must be today or in the future |
| Required fields | id, platform, format, status, scheduled_date |

### Validation Output Format

```
Validating: 2026-01-12-ai-tools

[PASS] Caption length: 412/2200 characters
[PASS] Hashtag count: 12/30
[PASS] Image file exists: instagram-ai-tools.png
[FAIL] Image URL not set (required for n8n to post)
[PASS] Scheduled date: 2026-01-12 (2 days from now)

Status: NEEDS ATTENTION
- Upload image to Cloudinary and set image_url
```

## WORKFLOW

### Weekly Content Review (Sunday)

1. Run `show_week` to see upcoming posts
2. Run `validate` on each to check for issues
3. Fix any validation errors (upload images, adjust captions)
4. Run `approve_all` to approve the batch
5. n8n handles posting automatically Mon-Fri

### Adding New Posts

1. Create graphic with `branded-social-visual` skill
2. Upload to Cloudinary (get public URL)
3. Create queue file from template
4. Fill in frontmatter and caption
5. Run `validate` to check
6. Leave as draft until ready to approve

## IMPLEMENTATION NOTES

When executing commands:

1. **Reading queue**: Use Glob to find `*.md` files, Read to parse each
2. **Parsing frontmatter**: Split on `---`, parse YAML header
3. **Updating status**: Use Edit to change `status:` field
4. **Counting hashtags**: Regex for `#\w+` patterns in caption body
5. **Counting characters**: Length of content after frontmatter (exclude hashtags for readability check)

## ERROR HANDLING

If a post fails validation:
- Do NOT approve it
- List all failing rules
- Suggest fixes

If user tries to approve without image_url:
- Warn that n8n cannot post without a public URL
- Suggest uploading to Cloudinary first
