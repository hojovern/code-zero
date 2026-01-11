# Exercise: File Upload System

**Day 8 | Solo | 75 min**

Build a complete file upload system with drag-and-drop, image optimization, and secure storage using Supabase Storage.

---

## Learning Objectives

By completing this exercise, you will:
- Configure Supabase Storage buckets with RLS
- Build drag-and-drop file upload UX
- Implement client-side image optimization
- Create secure file access with signed URLs

---

## Prerequisites

Before starting:
- [ ] Supabase project set up
- [ ] Basic file/blob knowledge
- [ ] Week 1 + Day 6-7 completed

---

## The Challenge

**Build a file upload system that:**
1. Allows drag-and-drop file upload
2. Shows upload progress
3. Optimizes images before upload
4. Displays uploaded files in a gallery

**Success criteria:**
- Drag a file onto the page and see it upload
- Images are resized before upload
- Files display with proper thumbnails
- Users can only access their own files

---

## Starter Code

### 1. Storage Utility

```typescript
// src/lib/storage.ts
import { supabase } from './supabase';

export async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<string | null> {
  // TODO: Upload file to Supabase Storage
  // TODO: Return public URL or signed URL
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  // TODO: Delete file from storage
}

export function getPublicUrl(bucket: string, path: string): string {
  // TODO: Get public URL for file
}

export async function getSignedUrl(bucket: string, path: string): Promise<string> {
  // TODO: Get signed URL for private file
}
```

### 2. Drop Zone Component

```svelte
<!-- src/lib/components/DropZone.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let accept = 'image/*';
  export let maxSize = 5 * 1024 * 1024; // 5MB
  export let multiple = false;

  let isDragging = false;
  const dispatch = createEventDispatcher();

  function handleDragOver(e: DragEvent) {
    // TODO: Prevent default, set isDragging
  }

  function handleDragLeave(e: DragEvent) {
    // TODO: Reset isDragging
  }

  function handleDrop(e: DragEvent) {
    // TODO: Get files from drop event
    // TODO: Validate files
    // TODO: Dispatch 'files' event
  }

  function handleFileSelect(e: Event) {
    // TODO: Handle file input change
  }
</script>

<div
  class="dropzone"
  class:dragging={isDragging}
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
>
  <!-- TODO: Add file input and drop UI -->
</div>
```

### 3. Image Optimizer

```typescript
// src/lib/imageOptimizer.ts
export async function optimizeImage(
  file: File,
  maxWidth = 1920,
  quality = 0.8
): Promise<Blob> {
  // TODO: Create canvas
  // TODO: Draw resized image
  // TODO: Export as optimized blob
}

export async function createThumbnail(
  file: File,
  size = 200
): Promise<Blob> {
  // TODO: Create small square thumbnail
}
```

---

## Step-by-Step Instructions

### Step 1: Set Up Storage Bucket (10 min)

In Supabase Dashboard → Storage:

1. Create a bucket called `user-files`
2. Make it private (not public)
3. Add RLS policy for authenticated users:

```sql
-- Allow users to upload to their own folder
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'user-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow users to read own files
CREATE POLICY "Users can read own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'user-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow users to delete own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'user-files' AND (storage.foldername(name))[1] = auth.uid()::text);
```

### Step 2: Create Storage Utilities (15 min)

```typescript
// src/lib/storage.ts
import { supabase } from './supabase';

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  return data.path;
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  return !error;
}

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function getSignedUrl(
  bucket: string,
  path: string,
  expiresIn = 3600
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) return null;
  return data.signedUrl;
}
```

### Step 3: Build Drop Zone (20 min)

```svelte
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let accept = 'image/*';
  export let maxSize = 5 * 1024 * 1024;
  export let multiple = false;

  let isDragging = false;
  let fileInput: HTMLInputElement;

  const dispatch = createEventDispatcher<{ files: File[] }>();

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;

    const files = Array.from(e.dataTransfer?.files || []);
    processFiles(files);
  }

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    processFiles(files);
  }

  function processFiles(files: File[]) {
    const valid = files.filter(f => {
      if (f.size > maxSize) {
        alert(`${f.name} is too large. Max size: ${maxSize / 1024 / 1024}MB`);
        return false;
      }
      return true;
    });

    if (valid.length > 0) {
      dispatch('files', multiple ? valid : [valid[0]]);
    }
  }
</script>

<div
  class="dropzone"
  class:dragging={isDragging}
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
  on:click={() => fileInput.click()}
  role="button"
  tabindex="0"
>
  <input
    type="file"
    bind:this={fileInput}
    {accept}
    {multiple}
    on:change={handleFileSelect}
    hidden
  />

  <div class="dropzone-content">
    <span class="icon">📁</span>
    <p>Drag files here or click to browse</p>
    <p class="hint">Max size: {maxSize / 1024 / 1024}MB</p>
  </div>
</div>

<style>
  .dropzone {
    border: 2px dashed var(--border-subtle, #444);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 200ms;
  }

  .dropzone:hover,
  .dropzone.dragging {
    border-color: var(--color-primary, #04A459);
    background: rgba(4, 164, 89, 0.05);
  }

  .icon { font-size: 2rem; }
  .hint { font-size: 0.875rem; opacity: 0.6; }
</style>
```

### Step 4: Image Optimization (15 min)

```typescript
// src/lib/imageOptimizer.ts
export function optimizeImage(
  file: File,
  maxWidth = 1920,
  quality = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('Failed to create blob')),
        'image/jpeg',
        quality
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export function createThumbnail(file: File, size = 200): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d')!;

      // Center crop
      const min = Math.min(img.width, img.height);
      const sx = (img.width - min) / 2;
      const sy = (img.height - min) / 2;

      ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);

      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('Failed')),
        'image/jpeg',
        0.7
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
```

### Step 5: Put It Together (15 min)

Create a page that uses all components:

```svelte
<script lang="ts">
  import DropZone from '$lib/components/DropZone.svelte';
  import { uploadFile, getSignedUrl } from '$lib/storage';
  import { optimizeImage, createThumbnail } from '$lib/imageOptimizer';
  import { supabase } from '$lib/supabase';

  let files: Array<{ name: string; url: string }> = [];
  let uploading = false;

  async function handleFiles(e: CustomEvent<File[]>) {
    uploading = true;
    const user = (await supabase.auth.getUser()).data.user;

    for (const file of e.detail) {
      // Optimize if image
      let uploadBlob: Blob = file;
      if (file.type.startsWith('image/')) {
        uploadBlob = await optimizeImage(file);
      }

      const path = `${user!.id}/${Date.now()}-${file.name}`;
      const result = await uploadFile('user-files', path, uploadBlob as File);

      if (result) {
        const url = await getSignedUrl('user-files', result);
        files = [...files, { name: file.name, url: url! }];
      }
    }

    uploading = false;
  }
</script>

<h1>My Files</h1>

<DropZone on:files={handleFiles} multiple />

{#if uploading}
  <p>Uploading...</p>
{/if}

<div class="gallery">
  {#each files as file}
    <div class="file-card">
      <img src={file.url} alt={file.name} />
      <span>{file.name}</span>
    </div>
  {/each}
</div>
```

---

## Hints

<details>
<summary>Hint 1: Upload failing?</summary>

Check that:
- RLS policies are set correctly
- Path includes user ID: `{userId}/filename.jpg`
- Bucket exists and name is correct
</details>

<details>
<summary>Hint 2: Image quality too low?</summary>

Increase quality parameter: `optimizeImage(file, 1920, 0.9)`
</details>

<details>
<summary>Hint 3: Signed URL expired?</summary>

Increase expiration time or regenerate before display:
```typescript
const url = await getSignedUrl('bucket', path, 86400); // 24 hours
```
</details>

---

## Common Mistakes

1. **Not using user ID in path** — Files won't be isolated per user
2. **Uploading original images** — Can be huge, always optimize
3. **Using public bucket for private files** — Security issue
4. **Not handling upload errors** — Always show error feedback

---

## Stretch Goals

- [ ] Add upload progress bar
- [ ] Support video files
- [ ] Add file preview before upload
- [ ] Implement file renaming

---

## Verification Checklist

- [ ] Drag-and-drop works
- [ ] Click to browse works
- [ ] Images are resized before upload
- [ ] Files appear in gallery after upload
- [ ] Other users can't access your files
- [ ] Large files are rejected
