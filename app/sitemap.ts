import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourportfolio.com'; // Update with your actual domain

  // Static pages
  const staticPages = [
    '',
    '/work',
    '/fun',
    '/about',
    '/resume',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In production, you'd dynamically generate these from your content
  const projectPages = [
    '/work/design-system',
    '/work/ecommerce-platform',
    '/work/mobile-banking',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogPages = [
    '/blog/designing-for-ai',
    '/blog/design-systems-at-scale',
    '/blog/side-projects',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}

