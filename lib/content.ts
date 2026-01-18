import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  vaulted?: boolean;
  date: string;
  role?: string;
  duration?: string;
  url?: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  image?: string;
}

export interface ContentData<T> {
  meta: T;
  content: string;
}

function getContentFromDirectory<T>(directory: string): ContentData<T>[] {
  const fullPath = path.join(contentDirectory, directory);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);
  
  const content = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(fullPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = file.replace(/\.mdx?$/, '');

      return {
        meta: {
          ...data,
          slug,
        } as T,
        content,
      };
    })
    .sort((a, b) => {
      const dateA = new Date((a.meta as { date?: string }).date || 0);
      const dateB = new Date((b.meta as { date?: string }).date || 0);
      return dateB.getTime() - dateA.getTime();
    });

  return content;
}

export function getProjects(): ContentData<ProjectMeta>[] {
  return getContentFromDirectory<ProjectMeta>('projects');
}

export function getFunProjects(): ContentData<ProjectMeta>[] {
  return getContentFromDirectory<ProjectMeta>('fun');
}

export function getBlogPosts(): ContentData<BlogMeta>[] {
  const posts = getContentFromDirectory<BlogMeta>('blog');
  
  return posts.map((post) => ({
    ...post,
    meta: {
      ...post.meta,
      readingTime: readingTime(post.content).text,
    },
  }));
}

export function getProjectBySlug(slug: string): ContentData<ProjectMeta> | null {
  const projects = getProjects();
  return projects.find((p) => p.meta.slug === slug) || null;
}

export function getFunProjectBySlug(slug: string): ContentData<ProjectMeta> | null {
  const projects = getFunProjects();
  return projects.find((p) => p.meta.slug === slug) || null;
}

export function getBlogPostBySlug(slug: string): ContentData<BlogMeta> | null {
  const posts = getBlogPosts();
  return posts.find((p) => p.meta.slug === slug) || null;
}

export function getFeaturedProjects(): ContentData<ProjectMeta>[] {
  return getProjects().filter((p) => p.meta.featured);
}

export function getVaultedProjects(): ContentData<ProjectMeta>[] {
  return getProjects().filter((p) => p.meta.vaulted);
}

