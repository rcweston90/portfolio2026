import { getProjects } from '@/lib/content';
import WorkClient from './WorkClient';

export default function WorkPage() {
  const allProjects = getProjects();

  const projects = allProjects.map((p) => ({
    title: p.meta.title,
    description: p.meta.description,
    tags: p.meta.tags,
    slug: p.meta.slug,
    image: p.meta.image,
    featured: p.meta.featured,
  }));

  return <WorkClient projects={projects} />;
}
