import { NextResponse } from 'next/server';
import { listImages } from '@/lib/blob';

export interface PhotoAdminResponse {
  url: string;
  pathname: string;
  uploadedAt: string;
  size: number;
}

export async function GET() {
  try {
    const images = await listImages();

    // Sort by upload date (newest first)
    const sortedImages = images.sort(
      (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
    );

    // Return detailed info for admin
    const photos: PhotoAdminResponse[] = sortedImages.map((img) => ({
      url: img.url,
      pathname: img.pathname,
      uploadedAt: img.uploadedAt.toISOString(),
      size: img.size,
    }));

    return NextResponse.json(photos);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch photos';

    if (message.includes('BLOB_READ_WRITE_TOKEN')) {
      return NextResponse.json({ error: 'Blob storage not configured' }, { status: 503 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
