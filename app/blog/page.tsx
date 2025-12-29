import { getBlogPosts } from '@/lib/content';
import BlogClient from './BlogClient';

export default function BlogPage() {
  const blogPosts = getBlogPosts().map((post) => ({
    slug: post.meta.slug,
    title: post.meta.title,
    description: post.meta.description,
    date: post.meta.date,
    readingTime: post.meta.readingTime,
    tags: post.meta.tags,
  }));

  return <BlogClient blogPosts={blogPosts} />;
}
