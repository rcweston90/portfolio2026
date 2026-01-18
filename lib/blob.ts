/**
 * Vercel Blob Storage Utilities
 * 
 * Functions for uploading and managing images in Vercel Blob Storage.
 * Provides optimized image URLs that work with Next.js Image component.
 * 
 * Note: Requires @vercel/blob package to be installed.
 * Install with: npm install @vercel/blob
 */

export interface UploadImageOptions {
  filename?: string;
  contentType?: string;
  access?: 'public';
}

/**
 * Check if @vercel/blob package is available
 * Uses dynamic import to prevent build-time module resolution errors
 * 
 * This function uses a runtime-constructed import path to prevent
 * Next.js/Turbopack from statically analyzing the dependency.
 */
async function getBlobModule() {
  try {
    // Direct dynamic import - should work now that package is installed
    const blobModule = await import('@vercel/blob');
    
    if (!blobModule || typeof blobModule.put !== 'function') {
      throw new Error('Invalid blob module structure');
    }
    return blobModule;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Check if it's a module not found error
    if (errorMessage.includes('Cannot find module') || 
        errorMessage.includes('Module not found') ||
        errorMessage.includes('resolve') ||
        errorMessage.includes('ERR_MODULE_NOT_FOUND') ||
        errorMessage.includes("Can't resolve")) {
      throw new Error(
        '@vercel/blob package is not installed. Please run: npm install @vercel/blob'
      );
    }
    throw error;
  }
}

/**
 * Upload an image file to Vercel Blob Storage
 * 
 * @param file - File object or Buffer to upload
 * @param options - Upload options (filename, contentType, access)
 * @returns Promise resolving to the blob URL
 * 
 * @example
 * ```ts
 * const file = new File([...], 'photo.jpg', { type: 'image/jpeg' });
 * const url = await uploadImage(file, { filename: 'my-photo.jpg' });
 * ```
 */
export async function uploadImage(
  file: File | Buffer,
  options: UploadImageOptions = {}
): Promise<string> {
  const { filename, contentType, access = 'public' } = options;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      'BLOB_READ_WRITE_TOKEN environment variable is not set. ' +
      'Please add it to your .env.local file. See VERCEL_BLOB_SETUP.md for instructions.'
    );
  }

  const blobModule = await getBlobModule();
  const { put } = blobModule;

  const blob = await put(filename || 'image.jpg', file, {
    access,
    contentType: contentType || 'image/jpeg',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
}

/**
 * Get optimized image URL for Next.js Image component
 * 
 * Vercel Blob URLs work directly with Next.js Image optimization.
 * This helper ensures the URL format is correct.
 * 
 * @param blobUrl - The blob URL from Vercel Blob Storage
 * @returns The URL (can be used directly in Next.js Image src)
 */
export function getImageUrl(blobUrl: string): string {
  return blobUrl;
}

/**
 * Delete an image from Vercel Blob Storage
 * 
 * @param url - The blob URL to delete
 * @returns Promise resolving when deletion is complete
 */
export async function deleteImage(url: string): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not set');
  }

  const blobModule = await getBlobModule();
  const { del } = blobModule;

  await del(url, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

/**
 * Image metadata returned from listImages
 */
export interface BlobImage {
  url: string;
  pathname: string;
  uploadedAt: Date;
  size: number;
}

/**
 * List all images from Vercel Blob Storage
 *
 * @returns Promise resolving to array of image metadata
 *
 * @example
 * ```ts
 * const images = await listImages();
 * images.forEach(img => console.log(img.url, img.uploadedAt));
 * ```
 */
export async function listImages(): Promise<BlobImage[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not set');
  }

  const blobModule = await getBlobModule();
  const { list } = blobModule;

  const result = await list({
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return result.blobs.map((blob: { url: string; pathname: string; uploadedAt: Date; size: number }) => ({
    url: blob.url,
    pathname: blob.pathname,
    uploadedAt: new Date(blob.uploadedAt),
    size: blob.size,
  }));
}

