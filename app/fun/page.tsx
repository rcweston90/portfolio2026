import { getFunProjects } from '@/lib/content';
import FunClient from './FunClient';

export default function FunPage() {
  const allProjects = getFunProjects();

  const projects = allProjects.map((p) => ({
    title: p.meta.title,
    description: p.meta.description,
    tags: p.meta.tags,
    slug: p.meta.slug,
  }));

  return <FunClient projects={projects} />;
}
