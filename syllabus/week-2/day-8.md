# Day 8: Files & Media

> "Your app handles more than text now."

## The Challenge

**By end of day, users can upload files to your product.**

Profile pictures. Attachments. Images. Documents. Whatever your product needs—users can upload it, you can store it, and your app can display it.

---

## What You're Building

| Feature | What It Does |
|---------|--------------|
| Profile pictures | Users upload and display avatars |
| File attachments | Attach files to your core feature |
| Image gallery | Display and manage uploaded images |
| Drag & drop upload | Modern, intuitive upload UX |
| Image optimization | Resize, compress, generate thumbnails |

**The unlock:** Your product handles real user content, not just text.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Supabase Storage Setup | Bucket configured |
| 9:30 - 10:30 | Profile Pictures | Avatar upload working |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | File Attachments | Attach files to items |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Show uploads | Demo file handling |
| 13:30 - 14:30 | Drag & Drop UX | Modern upload experience |
| 14:30 - 14:45 | Break | |
| 14:45 - 15:45 | Image Optimization | Thumbnails + compression |
| 15:45 - 16:30 | Gallery Component | Display uploaded media |
| 16:30 - 17:00 | Security + Cleanup | Secure access, remove orphans |
| 17:00 - 17:30 | Ship | Deploy with file handling |

---

## Morning: Core Upload System

### 1. Supabase Storage Setup (30 min)

**Configure storage in Supabase:**

1. Go to Supabase Dashboard → Storage
2. Create buckets (Claude will tell you which ones)

**Tell Claude to set it up:**
```
You: Set up Supabase Storage for my app.

I need buckets for:
- avatars: User profile pictures (public)
- attachments: Files attached to [my feature] (private per user)

Create:
- The bucket configuration
- RLS policies so users only access their own files
- A storage utility file with upload/download/delete functions

Explain the difference between public and private buckets.
```

**Claude will create:**
- Bucket creation SQL
- RLS policies for secure access
- `src/lib/storage.ts` with utility functions
- Public URL generation for public files
- Signed URL generation for private files

**Key concepts:**

| Concept | What It Means |
|---------|---------------|
| Bucket | Container for files (like a folder) |
| Public bucket | Anyone with URL can view |
| Private bucket | Requires authentication |
| Signed URL | Temporary access URL with expiration |
| RLS on Storage | Same security as database tables |

### 2. Profile Pictures (60 min)

**Add avatar upload to profile:**
```
You: Add profile picture upload to the user profile/dashboard.

Create:
1. Avatar display component:
   - Show current avatar (or placeholder if none)
   - Circular crop display
   - Click to change

2. Avatar upload flow:
   - Click avatar opens file picker
   - Only allow images (jpg, png, webp)
   - Max file size: 2MB
   - Show preview before upload
   - Upload to avatars bucket
   - Update profile table with avatar URL
   - Show loading state during upload

3. Store avatar URL in profiles table:
   - Add avatar_url column if not exists
   - Update when new avatar uploaded

Make the experience smooth—preview, upload, done.
```

**Claude will:**
- Create avatar display component
- Build file input with restrictions
- Handle upload to Supabase Storage
- Update user profile with new URL
- Show loading/error states

**Test the flow:**
1. Click your avatar placeholder
2. Select an image
3. See preview
4. Confirm upload
5. Avatar updates everywhere it's displayed

### 3. File Attachments (75 min)

**Add file attachments to your core feature:**
```
You: Add file attachments to [my feature - e.g., notes, tasks].

1. Update database:
   - Add attachments column (array of file objects)
   - Each attachment: { name, url, type, size, uploaded_at }

2. Create attachment component:
   - Show list of attached files
   - Display file icon based on type (image, pdf, doc, etc.)
   - Click to download/view
   - Delete button for each

3. Create upload button:
   - "Add attachment" button
   - Multiple file select
   - Show upload progress per file
   - Max 5 files, 10MB each

4. Handle different file types:
   - Images: Show thumbnail preview
   - PDFs: Show PDF icon
   - Documents: Show doc icon
   - Other: Generic file icon

Integrate this into the [feature] create/edit form.
```

**Claude will:**
- Update database schema
- Create file type detection
- Build attachment list UI
- Handle multi-file upload with progress
- Generate appropriate icons/previews

**Test attachments:**
- Upload multiple files at once
- Mix images and documents
- Delete an attachment
- Verify files persist after refresh

---

## Afternoon: Polish & Advanced Features

### 4. Drag & Drop UX (60 min)

**Modern upload experience:**
```
You: Add drag-and-drop upload support.

1. Create a DropZone component:
   - Visual drop area with dashed border
   - "Drag files here or click to browse"
   - Highlight when dragging over (change border color)
   - Support multiple files
   - Show file previews after drop

2. Add global drop support:
   - Drag file anywhere on the page
   - Full-page overlay appears
   - Drop to upload to current context

3. Paste support:
   - Ctrl+V to paste images from clipboard
   - Auto-upload pasted images

4. Progress UI:
   - Show each file with progress bar
   - Cancel button per file
   - Success/error state per file
   - "Upload complete" summary

Make it feel modern and intuitive.
```

**Test drag & drop:**
- Drag a file from desktop
- Drop zone highlights
- Drop and see progress
- Try pasting an image

### 5. Image Optimization (60 min)

**Don't store full-size images:**
```
You: Add image optimization before upload.

1. Client-side resize:
   - Before uploading, resize images to max 1920px width
   - Maintain aspect ratio
   - Use canvas API for resize
   - Compress to 80% quality

2. Generate thumbnails:
   - Create 200px thumbnail version
   - Upload both original and thumbnail
   - Store both URLs

3. Progressive loading:
   - Show thumbnail first (blur)
   - Load full image in background
   - Fade to full when loaded

4. Format optimization:
   - Convert to WebP if browser supports
   - Fall back to JPEG

This keeps storage costs down and improves load times.
```

**Claude will:**
- Create image resize utility
- Generate thumbnails client-side
- Implement progressive image loading
- Handle format conversion

### 6. Gallery Component (45 min)

**Display uploaded media beautifully:**
```
You: Create a reusable image gallery component.

Features:
1. Grid layout:
   - Responsive grid of thumbnails
   - Masonry-style or uniform grid
   - Lazy load images as user scrolls

2. Lightbox:
   - Click image to open full-size
   - Navigate between images (arrows/swipe)
   - Close on backdrop click or Escape
   - Zoom support

3. Actions:
   - Download button
   - Delete button (with confirmation)
   - Share/copy link button

4. Empty state:
   - "No images yet" with upload CTA

Use this for displaying attachments and any image collections.
```

### 7. Security + Cleanup (30 min)

**Lock it down and clean up:**
```
You: Add security and cleanup for file storage.

1. Validate uploads:
   - Check file type on server (not just extension)
   - Enforce size limits
   - Scan for malicious files (or reject executables)

2. Secure access:
   - Private files: Use signed URLs with expiration
   - Validate user owns file before generating URL
   - Log file access for audit

3. Cleanup orphaned files:
   - When item deleted, delete its attachments
   - Function to find orphaned files (no DB reference)
   - Scheduled cleanup job (or manual)

4. Storage limits:
   - Track storage per user
   - Warn when approaching limit
   - Enforce limit on upload

Make sure no one can access files they shouldn't.
```

### 8. Ship (30 min)

**Deploy:**
```
You: Commit everything with message "Day 8: Files & media"
and push to GitHub.
```

**Test in production:**
- [ ] Avatar upload works
- [ ] File attachments work
- [ ] Drag & drop works
- [ ] Images display correctly
- [ ] Private files require auth
- [ ] Mobile upload works

---

## What You Built Today

| Feature | How |
|---------|-----|
| Profile pictures | Avatar upload to public bucket |
| File attachments | Multi-file upload to private bucket |
| Drag & drop | Modern upload UX |
| Image optimization | Client-side resize + thumbnails |
| Gallery | Lightbox + grid display |
| Security | RLS + signed URLs + validation |

**Your app handles real content now.** Users can upload their stuff, and your product stores and displays it properly.

---

## The Storage Pattern

Save this for future projects:
```
You: Create a file-storage skill from what we built today.
Include:
- Supabase Storage setup
- Upload utilities with progress
- Image optimization pipeline
- Drag & drop component
- Gallery component
- Security best practices
```

---

## Why Files Matter

| Before | After |
|--------|-------|
| Text-only profiles | Rich profiles with photos |
| Links to external files | Native file management |
| "Upload to Dropbox first" | Upload directly in your app |
| Basic product | Full-featured platform |

File handling is table stakes for real products. Now you have it.

---

## Day 8 Troubleshooting

| Problem | Solution |
|---------|----------|
| Upload fails silently | Check bucket RLS policies |
| "File too large" | Implement client-side resize first |
| Images not displaying | Check if bucket is public or use signed URLs |
| CORS error on upload | Verify Supabase project CORS settings |
| Slow uploads | Add compression before upload |

---

## Practice Exercise

Complete this exercise to solidify today's skills:

**[File Upload System](exercises/08-file-uploads.md)** (75 min)
- Configure Supabase Storage buckets with RLS
- Build drag-and-drop file upload UX
- Implement client-side image optimization
- Create secure file access with signed URLs

---

*Tomorrow: Your app starts doing things automatically.*
