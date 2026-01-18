import { getProjects, getVaultedProjects } from '@/lib/content';
import WorkClient from './WorkClient';

export default function WorkPage() {
  const allProjects = getProjects();
  const vaultedProjects = getVaultedProjects();

  const projects = allProjects
    .filter((p) => !p.meta.vaulted)
    .slice(0, 3)
    .map((p) => ({
      title: p.meta.title,
      description: p.meta.description,
      tags: p.meta.tags,
      slug: p.meta.slug,
      image: p.meta.image,
      featured: p.meta.featured,
    }));

  const vaulted = vaultedProjects.map((p) => ({
    title: p.meta.title,
    description: p.meta.description,
    tags: p.meta.tags,
    slug: p.meta.slug,
    image: p.meta.image,
    featured: p.meta.featured,
  }));

  return <WorkClient projects={projects} vaultedProjects={vaulted} />;
}
