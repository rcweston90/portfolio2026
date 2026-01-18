/**
 * Client-side image upload utilities
 * 
 * Helper functions for uploading images from the browser to Vercel Blob Storage.
 */

export interface UploadResult {
  url: string;
  error?: string;
}

/**
 * Upload an image file from the browser
 * 
 * @param file - File object from input element
 * @param onProgress - Optional progress callback (0-100)
 * @returns Promise resolving to the uploaded image URL
 * 
 * @example
 * ```tsx
 * const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const file = e.target.files?.[0];
 *   if (!file) return;
 *   
 *   const url = await uploadImageFromBrowser(file, (progress) => {
 *     console.log(`Upload progress: ${progress}%`);
 *   });
 *   console.log('Image uploaded:', url);
 * };
 * ```
 */
export async function uploadImageFromBrowser(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          onProgress(progress);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response.url);
        } catch (error) {
          reject(new Error('Failed to parse response'));
        }
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error.error || 'Upload failed'));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.open('POST', '/api/upload-image');
    xhr.send(formData);
  });
}

/**
 * Validate image file before upload
 * 
 * @param file - File to validate
 * @returns Error message if invalid, null if valid
 */
export function validateImageFile(file: File): string | null {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return 'File must be an image';
  }

  // Check file size (10MB max)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return 'File size must be less than 10MB';
  }

  return null;
}

