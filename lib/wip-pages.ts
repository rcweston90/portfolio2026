export interface WipPage {
  path: string;
  name: string;
  description?: string;
}

export function getWipPages(): WipPage[] {
  return [
    {
      path: '/preview',
      name: 'Preview',
      description: 'Component library preview and documentation',
    },
    {
      path: '/resume',
      name: 'Resume',
      description: 'Design leader resume with experience, skills, and certifications',
    },
  ];
}

