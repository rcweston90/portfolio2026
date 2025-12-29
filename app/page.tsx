import { getFeaturedProjects, getProjects } from '@/lib/content';
import HomeClient from './HomeClient';

export default function Home() {
  // Get featured projects, fallback to first 3 if none are featured
  let featuredProjects = getFeaturedProjects();
  
  if (featuredProjects.length === 0) {
    featuredProjects = getProjects().slice(0, 3);
  }

  const projects = featuredProjects.map((p) => ({
    title: p.meta.title,
    description: p.meta.description,
    tags: p.meta.tags,
    slug: p.meta.slug,
    image: p.meta.image,
    featured: p.meta.featured,
  }));

  return <HomeClient featuredProjects={projects} />;
}
