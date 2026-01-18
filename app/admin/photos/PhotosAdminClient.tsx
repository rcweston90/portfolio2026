'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useAdminAuth } from '@/core/hooks/useAdminAuth';
import { ImageUploader } from '../components/ImageUploader';

interface PhotoAdmin {
  url: string;
  pathname: string;
  uploadedAt: string;
  size: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getFilename(pathname: string): string {
  return pathname.split('/').pop() || pathname;
}

export default function PhotosAdminClient() {
  const { isAuthenticated, isChecking } = useAdminAuth();
  const [photos, setPhotos] = useState<PhotoAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    try {
      setError(null);
      const response = await fetch('/api/admin/photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch photos');
      }
    } catch (err) {
      setError('Failed to fetch photos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPhotos();
    }
  }, [isAuthenticated]);

  const handleDelete = async (url: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    setDeleting(url);
    try {
      const response = await fetch('/api/photos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        setPhotos((prev) => prev.filter((p) => p.url !== url));
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete photo');
      }
    } catch (err) {
      alert('Failed to delete photo');
    } finally {
      setDeleting(null);
    }
  };

  const handleUploadComplete = () => {
    fetchPhotos();
  };

  if (isChecking) {
    return (
      <div className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="text-center text-[var(--foreground-muted)] font-mono text-sm uppercase tracking-wider">
          Loading...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[var(--foreground-muted)] font-mono mb-4">
            You need to be authenticated to manage photos.
          </p>
          <Link
            href="/admin"
            className="px-6 py-3 rounded-md bg-[var(--accent-primary)] text-white font-mono text-sm uppercase tracking-wider hover:bg-[var(--accent-secondary)] transition-colors font-semibold"
          >
            Go to Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 pb-6 border-b-2 border-[var(--foreground-muted)]/30">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin"
              className="text-[var(--foreground-muted)] hover:text-[var(--accent-primary)] transition-colors font-mono text-sm"
            >
              ← Back to Admin
            </Link>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-mono text-3xl md:text-4xl font-bold text-[var(--foreground)] uppercase tracking-wide">
                Manage Photos
              </h1>
              <p className="mt-2 text-sm text-[var(--foreground)]/80 font-medium">
                {photos.length} photo{photos.length !== 1 ? 's' : ''} in storage
              </p>
            </div>
            <Link
              href="/photos"
              className="px-4 py-2 rounded-md border-2 border-[var(--foreground-muted)] text-[var(--foreground)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors font-mono text-xs uppercase tracking-wider font-semibold"
            >
              View Gallery →
            </Link>
          </div>
        </div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 rounded-md bg-[var(--card-bg)] border-2 border-[var(--foreground-muted)]/30"
        >
          <h2 className="font-mono text-xl font-bold text-[var(--foreground)] uppercase tracking-wide mb-4">
            Upload New Photo
          </h2>
          <ImageUploader
            label="Upload Image (Max 10MB)"
            onUploadComplete={handleUploadComplete}
          />
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 rounded-md bg-red-500/10 border-2 border-red-500/30">
            <p className="text-sm font-mono text-red-600">{error}</p>
          </div>
        )}

        {/* Photos Grid */}
        {loading ? (
          <div className="text-center py-12 text-[var(--foreground-muted)] font-mono text-sm uppercase tracking-wider">
            Loading photos...
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12 text-[var(--foreground-muted)] font-mono text-sm">
            No photos uploaded yet. Use the uploader above to add photos.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-md bg-[var(--card-bg)] border-2 border-[var(--foreground-muted)]/30 overflow-hidden"
              >
                {/* Image Preview */}
                <div className="relative aspect-square bg-[var(--background-secondary)]">
                  <Image
                    src={photo.url}
                    alt={getFilename(photo.pathname)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <p className="font-mono text-sm text-[var(--foreground)] truncate font-semibold">
                    {getFilename(photo.pathname)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] font-mono">
                    <span>{formatBytes(photo.size)}</span>
                    <span>{formatDate(photo.uploadedAt)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(photo.url)}
                      className="flex-1 px-3 py-2 rounded-md border border-[var(--foreground-muted)] text-[var(--foreground)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors font-mono text-xs uppercase tracking-wider"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(photo.url)}
                      disabled={deleting === photo.url}
                      className="px-3 py-2 rounded-md border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors font-mono text-xs uppercase tracking-wider disabled:opacity-50"
                    >
                      {deleting === photo.url ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
