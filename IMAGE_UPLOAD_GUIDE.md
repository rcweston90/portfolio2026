# Image Upload Guide

## Where to Upload Images

### Option 1: Admin Page (Recommended)
Go to `/admin` and authenticate with your 6-digit passcode. You'll see an **Image Upload** section at the top where you can:
- Click "Choose File" to select an image
- Upload progress will be shown
- The URL will be automatically copied to your clipboard
- Copy the URL and use it in your code

### Option 2: Programmatic Upload
Use the `uploadImageFromBrowser` function in your components:

```tsx
import { uploadImageFromBrowser } from '@/lib/image-upload';

const handleUpload = async (file: File) => {
  const url = await uploadImageFromBrowser(file, (progress) => {
    console.log(`Upload progress: ${progress}%`);
  });
  console.log('Image URL:', url);
};
```

## How to Use Uploaded Images

### 1. In Photo Collage (Photos Page)

Update `app/photos/PhotosClient.tsx`:

```tsx
const photos: Photo[] = [
  { 
    src: 'https://[your-blob-url].public.blob.vercel-storage.com/photo1.jpg', 
    alt: 'Photo 1', 
    width: 800, 
    height: 1000 
  },
  // ... more photos
];
```

### 2. In Project Cards

Update project metadata in `content/projects/*.mdx`:

```mdx
---
title: "My Project"
image: "https://[your-blob-url].public.blob.vercel-storage.com/project-hero.jpg"
---
```

### 3. In Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="https://[your-blob-url].public.blob.vercel-storage.com/image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={90}
/>
```

## Workflow

1. **Upload**: Go to `/admin` → Upload image → Copy URL
2. **Use**: Paste URL in your code (photos array, MDX frontmatter, etc.)
3. **Optimize**: Next.js automatically optimizes images from Vercel Blob URLs

## File Organization Tips

### Naming Convention
Use descriptive names with categories:
- `photos/photo-1.jpg`
- `projects/project-hero.jpg`
- `blog/blog-featured.jpg`

### Storing URLs

**Option A: In Code (for photos page)**
```tsx
// app/photos/PhotosClient.tsx
const photos: Photo[] = [
  { src: 'blob-url-1', alt: 'Photo 1' },
  { src: 'blob-url-2', alt: 'Photo 2' },
];
```

**Option B: In MDX Frontmatter (for projects/blog)**
```mdx
---
title: "Project Name"
image: "blob-url"
---
```

**Option C: In a JSON/TypeScript file**
```ts
// lib/photos.ts
export const photos = [
  { src: 'blob-url-1', alt: 'Photo 1' },
  { src: 'blob-url-2', alt: 'Photo 2' },
];
```

## Best Practices

1. **Upload once, use everywhere**: Upload an image once, then reference the URL
2. **Use descriptive filenames**: Makes it easier to find images later
3. **Keep URLs organized**: Store them in a central location (like `lib/photos.ts`)
4. **Optimize before upload**: Compress large images before uploading (aim for < 2MB)
5. **Use appropriate formats**: JPEG for photos, PNG for graphics with transparency

## Example: Complete Workflow

1. Take a photo or find an image
2. Go to `/admin` and authenticate
3. Upload the image in the "Image Upload" section
4. Copy the URL that appears
5. Add it to your photos array or MDX file:

```tsx
// In PhotosClient.tsx
const photos: Photo[] = [
  {
    src: 'https://[copied-url]',
    alt: 'My Photo',
    width: 2000,
    height: 1500
  }
];
```

The image will automatically be optimized by Next.js!

