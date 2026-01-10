---
# Instagram Queue File Template
# Copy this file and rename to: YYYY-MM-DD-topic-slug.md

id: YYYY-MM-DD-topic-slug          # Unique identifier (matches filename)
platform: instagram                 # instagram | twitter | linkedin
format: square                      # square (1080x1080) | portrait (1080x1350) | story (1080x1920) | reel
status: draft                       # draft | approved | posting | posted | failed
scheduled_date: YYYY-MM-DD          # When to post (n8n checks daily)
image: filename.png                 # Local filename in /social-media/
image_url: null                     # Cloudinary URL (filled after upload)
caption_length: 0                   # Auto-calculated
hashtag_count: 0                    # Auto-calculated (max 30)
created_at: null                    # ISO timestamp when created
posted_at: null                     # ISO timestamp when posted (filled by n8n)
instagram_media_id: null            # Instagram's ID for the post (filled by n8n)
error: null                         # Error message if failed
---

# Post Title (not posted, just for reference)

Your caption goes here. Write naturally, include line breaks for readability.

Key rules:
- Max 2,200 characters
- Max 30 hashtags
- First line is most important (shows in feed preview)
- Include a call-to-action (question, save prompt, etc.)

#hashtag1 #hashtag2 #hashtag3
