# Vercel Blob Storage Setup Guide

This guide will help you set up Vercel Blob Storage for optimized image delivery.

## Step 1: Install Dependencies

```bash
npm install @vercel/blob
```

## Step 2: Create a Blob Store in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project
3. Go to **Storage** tab
4. Click **Create Database/Store**
5. Select **Blob**
6. Give it a name (e.g., "images")
7. Copy the `BLOB_READ_WRITE_TOKEN`

## Step 3: Set Environment Variable

Add the token to your environment variables:

**For local development:**
Create a `.env.local` file in the root directory:

```env
BLOB_READ_WRITE_TOKEN=your_token_here
```

**For production:**
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `BLOB_READ_WRITE_TOKEN` with your token value

## Step 4: Usage

### Upload Images via API

```tsx
// Client-side upload
import { uploadImageFromBrowser } from '@/lib/image-upload';

const handleUpload = async (file: File) => {
  const url = await uploadImageFromBrowser(file, (progress) => {
    console.log(`Progress: ${progress}%`);
  });
  console.log('Image URL:', url);
};
```

### Use in Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src={blobUrl} // URL from Vercel Blob Storage
  alt="Description"
  width={800}
  height={600}
  quality={90}
/>
```

### Upload via Admin Page

The `ImageUploader` component is available in `app/admin/components/ImageUploader.tsx`:

```tsx
import { ImageUploader } from '@/app/admin/components/ImageUploader';

<ImageUploader
  onUploadComplete={(url) => {
    // Use the URL
    console.log('Uploaded:', url);
  }}
/>
```

## Benefits

- ✅ **Automatic Optimization**: Next.js automatically optimizes images
- ✅ **CDN Delivery**: Images served from Vercel's global CDN
- ✅ **WebP/AVIF**: Automatic format conversion for modern browsers
- ✅ **Responsive Images**: Automatic srcset generation
- ✅ **Lazy Loading**: Built-in lazy loading support

## Pricing

Vercel Blob Storage pricing:
- **Free Tier**: 1 GB storage, 100 GB bandwidth/month
- **Pro**: $0.15/GB storage, $0.40/GB bandwidth

## Migration from Local Images

To migrate existing local images:

1. Upload images to Vercel Blob Storage using the upload API
2. Update your image references to use blob URLs
3. Keep local images for static assets (logos, icons) that don't change

## Example: Updating Photos Page

```tsx
// Before (using placeholder service)
const photos = [
  { src: 'https://picsum.photos/800/1000?random=1', alt: 'Photo 1' }
];

// After (using Vercel Blob)
const photos = [
  { src: 'https://[your-blob-url].public.blob.vercel-storage.com/photo1.jpg', alt: 'Photo 1' }
];
```

The Next.js Image component will automatically optimize these URLs!

