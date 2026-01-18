'use client';

import { useState, useRef, useEffect } from 'react';
import { uploadImageFromBrowser, validateImageFile } from '@/lib/image-upload';

/**
 * Image Uploader Component
 * 
 * Component for uploading images to Vercel Blob Storage with drag & drop support.
 * Use this in admin pages or anywhere you need image upload functionality.
 * 
 * @example
 * ```tsx
 * <ImageUploader
 *   onUploadComplete={(url) => console.log('Uploaded:', url)}
 * />
 * ```
 */
export function ImageUploader({
  onUploadComplete,
  label = 'Upload Image',
}: {
  onUploadComplete?: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [setupStatus, setSetupStatus] = useState<'checking' | 'ready' | 'missing-package' | 'missing-token'>('checking');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check setup status on mount
  useEffect(() => {
    const checkSetup = async () => {
      try {
        // Try to make a test request to see if the API is configured
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: new FormData(), // Empty form data to trigger validation
        });
        
        const data = await response.json();
        
        if (response.status === 503) {
          if (data.message?.includes('npm install')) {
            setSetupStatus('missing-package');
          } else if (data.message?.includes('BLOB_READ_WRITE_TOKEN')) {
            setSetupStatus('missing-token');
          } else {
            setSetupStatus('missing-package');
          }
        } else {
          setSetupStatus('ready');
        }
      } catch (error) {
        // If we can't reach the API, assume package might be missing
        setSetupStatus('missing-package');
      }
    };

    checkSetup();
  }, []);

  const processFile = async (file: File) => {
    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      const url = await uploadImageFromBrowser(file, (prog) => {
        setProgress(prog);
      });

      setUploadedUrl(url);
      onUploadComplete?.(url);
      // Copy to clipboard
      navigator.clipboard.writeText(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      
      // Update setup status based on error
      if (errorMessage.includes('@vercel/blob package is not installed') || 
          errorMessage.includes('npm install')) {
        setSetupStatus('missing-package');
      } else if (errorMessage.includes('BLOB_READ_WRITE_TOKEN')) {
        setSetupStatus('missing-token');
      }
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (uploading) return;

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    await processFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-mono text-[var(--foreground)] uppercase tracking-wider mb-2">
          {label}
        </label>
        
        {/* Setup Status Indicator */}
        {setupStatus === 'missing-package' && (
          <div className="mb-4 p-4 rounded-md bg-yellow-500/10 border-2 border-yellow-500/30">
            <p className="text-sm font-mono text-yellow-600 font-semibold mb-2">
              ⚠️ Setup Required
            </p>
            <p className="text-xs text-[var(--foreground-muted)] font-mono mb-2">
              The @vercel/blob package is not installed.
            </p>
            <code className="block text-xs bg-[var(--background-secondary)] p-2 rounded border border-[var(--border)] font-mono">
              npm install @vercel/blob
            </code>
            <p className="text-xs text-[var(--foreground-muted)] font-mono mt-2">
              See VERCEL_BLOB_SETUP.md for full instructions.
            </p>
          </div>
        )}
        
        {setupStatus === 'missing-token' && (
          <div className="mb-4 p-4 rounded-md bg-yellow-500/10 border-2 border-yellow-500/30">
            <p className="text-sm font-mono text-yellow-600 font-semibold mb-2">
              ⚠️ Configuration Required
            </p>
            <p className="text-xs text-[var(--foreground-muted)] font-mono mb-2">
              BLOB_READ_WRITE_TOKEN environment variable is not set.
            </p>
            <p className="text-xs text-[var(--foreground-muted)] font-mono">
              Add it to your .env.local file. See VERCEL_BLOB_SETUP.md for instructions.
            </p>
          </div>
        )}
        
        {setupStatus === 'ready' && (
          <div className="mb-4 p-2 rounded-md bg-green-500/10 border border-green-500/30">
            <p className="text-xs font-mono text-green-600">
              ✓ Blob storage configured and ready
            </p>
          </div>
        )}
        
        {/* Drag and Drop Zone */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`
            relative border-2 border-dashed rounded-md p-8 text-center transition-all cursor-pointer
            ${isDragging
              ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
              : 'border-[var(--foreground-muted)] bg-[var(--card-bg)] hover:border-[var(--accent-primary)] hover:bg-[var(--background-secondary)]'
            }
            ${uploading ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-[var(--foreground-muted)]"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm font-mono text-[var(--foreground)]">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </div>
            <p className="text-xs text-[var(--foreground-muted)] font-mono">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="w-full bg-[var(--background-secondary)] rounded-full h-2">
            <div
              className="bg-[var(--accent-primary)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[var(--foreground-muted)] font-mono">
            Uploading... {progress}%
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 font-mono">{error}</p>
      )}

      {uploadedUrl && (
        <div className="space-y-2">
          <p className="text-sm text-green-600 font-mono">
            Uploaded successfully! Image will appear on the /photos page.
          </p>
          <div className="p-3 rounded-md bg-[var(--card-bg)] border border-[var(--border)]">
            <p className="text-xs text-[var(--foreground-muted)] mb-1 font-mono">
              URL (copied to clipboard):
            </p>
            <input
              type="text"
              value={uploadedUrl}
              readOnly
              className="w-full px-2 py-1 text-xs font-mono bg-[var(--background-secondary)] border border-[var(--border)] rounded text-[var(--foreground)]"
              onClick={(e) => e.currentTarget.select()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

