import { NextResponse } from 'next/server';
import { listImages, deleteImage } from '@/lib/blob';

export interface PhotoResponse {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PhotoAdminResponse {
  url: string;
  pathname: string;
  uploadedAt: string;
  size: number;
}

/**
 * Convert filename to readable alt text
 * e.g., 'sunset-beach.jpg' → 'sunset beach'
 */
function filenameToAlt(pathname: string): string {
  // Get just the filename without path
  const filename = pathname.split('/').pop() || pathname;
  // Remove extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  // Replace dashes and underscores with spaces
  return nameWithoutExt.replace(/[-_]/g, ' ');
}

export async function GET() {
  try {
    const images = await listImages();

    // Sort by upload date (newest first)
    const sortedImages = images.sort(
      (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
    );

    // Convert to Photo format for PhotoCollage component
    const photos: PhotoResponse[] = sortedImages.map((img) => ({
      src: img.url,
      alt: filenameToAlt(img.pathname),
      // Default dimensions - the PhotoCollage component will handle actual sizing
      width: 800,
      height: 1000,
    }));

    return NextResponse.json(photos);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch photos';

    // Return empty array if token not configured (graceful degradation)
    if (message.includes('BLOB_READ_WRITE_TOKEN')) {
      return NextResponse.json([]);
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    await deleteImage(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete photo';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
