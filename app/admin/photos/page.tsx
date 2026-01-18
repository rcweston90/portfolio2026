import type { Metadata } from 'next';
import PhotosAdminClient from './PhotosAdminClient';

export const metadata: Metadata = {
  title: 'Manage Photos - Admin',
  description: 'Admin page for managing photos',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PhotosAdminPage() {
  return <PhotosAdminClient />;
}
