import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route for uploading images to Vercel Blob Storage
 * 
 * POST /api/upload-image
 * 
 * Body: FormData with 'file' field
 * 
 * @example
 * ```ts
 * const formData = new FormData();
 * formData.append('file', file);
 * const response = await fetch('/api/upload-image', {
 *   method: 'POST',
 *   body: formData,
 * });
 * const { url } = await response.json();
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob - dynamically import to prevent build-time errors
    const { uploadImage } = await import('@/lib/blob');
    const url = await uploadImage(file, {
      filename: file.name,
      contentType: file.type,
      access: 'public',
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error uploading image:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
    
    // Provide helpful error messages for common issues
    if (errorMessage.includes('@vercel/blob package is not installed')) {
      return NextResponse.json(
        { 
          error: 'Vercel Blob package not installed',
          message: 'Please run: npm install @vercel/blob',
          details: errorMessage
        },
        { status: 503 }
      );
    }
    
    if (errorMessage.includes('BLOB_READ_WRITE_TOKEN')) {
      return NextResponse.json(
        { 
          error: 'Blob storage not configured',
          message: 'Please set BLOB_READ_WRITE_TOKEN in your environment variables',
          details: errorMessage
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to upload image',
        message: errorMessage
      },
      { status: 500 }
    );
  }
}

