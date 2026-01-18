/**
 * Image Asset Paths
 * 
 * Centralized location for all image asset paths used throughout the application.
 * Supports both local images (public/images) and Vercel Blob Storage URLs.
 * 
 * For production photos, use Vercel Blob Storage for optimal performance.
 * For static assets (logos, icons), use local public/images directory.
 */

/**
 * Headshot image path
 * Place your headshot at: public/images/about/converted.svg
 * Or use a Vercel Blob Storage URL for optimized delivery
 */
export const HEADSHOT_IMAGE = '/images/about/converted.svg';

/**
 * Alternate headshot image path (for coin flip effect)
 * Place your alternate headshot at: public/images/about/headshot-alt.svg (or .png, .jpg, etc.)
 * Or use a Vercel Blob Storage URL
 */
export const HEADSHOT_ALT_IMAGE = '/images/about/headshot-alt.svg';

/**
 * Logo image path
 * Place your logo at: public/images/logos/logo.svg
 */
export const LOGO_IMAGE = '/images/logos/logo.svg';

/**
 * Helper function to determine if an image URL is from Vercel Blob Storage
 */
export function isBlobUrl(url: string): boolean {
  return url.includes('public.blob.vercel-storage.com');
}

/**
 * Helper function to get optimized image URL
 * Works with both local paths and blob URLs
 */
export function getOptimizedImageUrl(url: string): string {
  // If it's already a full URL (blob or external), return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If it's a local path, return as-is (Next.js will handle optimization)
  return url;
}

