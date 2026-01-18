'use client';

import ComponentShow from './ComponentShow';

interface FunProject {
  title: string;
  description: string;
  tags: string[];
  slug: string;
}

interface FunClientProps {
  projects: FunProject[];
}

export default function FunClient({ projects }: FunClientProps) {
  return <ComponentShow />;
}

