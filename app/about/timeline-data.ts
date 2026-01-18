import { TimelineItem } from '@/core/composites/Timeline';
import { getFeaturedProjects } from '@/lib/content';

/**
 * Parse period string to date for sorting
 * Examples: "Aug 2023 – Present" -> "2023-08", "Oct 2021 – Aug 2023" -> "2021-10"
 */
function parsePeriodToDate(period: string): string {
  const monthMap: Record<string, string> = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
  };

  // Handle "Present" case - use current date to ensure it sorts to the top
  if (period.includes('Present')) {
    const match = period.match(/(\w{3})\s+(\d{4})/);
    if (match) {
      // Use the start date for "Present" items (they're already current)
      return `${match[2]}-${monthMap[match[1]]}`;
    }
    // Fallback to current date
    return new Date().toISOString().split('T')[0];
  }

  // Handle date range - use start date
  const match = period.match(/(\w{3})\s+(\d{4})/);
  if (match) {
    return `${match[2]}-${monthMap[match[1]]}`;
  }

  return new Date().toISOString().split('T')[0];
}

/**
 * Timeline data combining career, education, and key projects
 */
export function getTimelineData(): TimelineItem[] {
  const projects = getFeaturedProjects();
  
  const timelineItems: TimelineItem[] = [
    // Career milestones
    {
      type: 'career',
      date: parsePeriodToDate('Aug 2023 – Present'),
      title: 'Design Lead, Confluence Growth',
      subtitle: 'Atlassian',
      description: 'Leading design for Confluence Growth, driving improvements across the customer journey and managing a team of designers.',
      highlights: [
        'Drove 13% improvement in growth rates across the customer journey',
        'Led a team of 15 designers and 3 managers',
        'Collaborated with executives to develop strategies leveraging personalization and Atlassian Intelligence (AI)',
      ],
      icon: '💼',
      color: 'primary',
      url: 'https://www.atlassian.com/software/confluence',
    },
    {
      type: 'career',
      date: parsePeriodToDate('Oct 2021 – Aug 2023'),
      title: 'Senior Product Designer, Cloud Migrations',
      subtitle: 'Atlassian',
      description: 'Co-led a team responsible for driving Server End-of-Support awareness and Cloud Migration activation.',
      highlights: [
        'Co-led team driving Server End-of-Support awareness and Cloud Migration activation',
        'Developed quarterly roadmaps',
        'Introduced practices that reduced project churn by 20%',
      ],
      icon: '💼',
      color: 'primary',
      url: 'https://www.atlassian.com/migration',
    },
    {
      type: 'career',
      date: parsePeriodToDate('Jan 2021 – Oct 2021'),
      title: 'Senior Product Designer, Monetization',
      subtitle: 'Atlassian',
      description: 'Designed growth experiments for Jira and Confluence Premium trial activations.',
      highlights: [
        'Designed growth experiments that increased Jira and Confluence Premium trial activations by 30%',
        'Contributed to a 7% revenue increase in FY21 Q2 & Q3',
      ],
      icon: '💼',
      color: 'primary',
    },
    {
      type: 'career',
      date: parsePeriodToDate('July 2019 – Jan 2021'),
      title: 'Design Lead, Hedge Fund Services',
      subtitle: 'Northern Trust',
      description: 'Worked across nine product and engineering teams to redesign the Hedge Fund Services platform.',
      highlights: [
        'Worked across nine product and engineering teams',
        'Redesigned Hedge Fund Services platform, resulting in significant improvements in performance, functionality, and usability',
      ],
      icon: '💼',
      color: 'primary',
    },
    {
      type: 'career',
      date: parsePeriodToDate('July 2019 – Jan 2021'),
      title: 'Design Lead, Data Direct',
      subtitle: 'Northern Trust',
      description: 'Drove the redesign of a data-focused product within MS Excel\'s third-party plugin ecosystem.',
      highlights: [
        'Drove redesign of data-focused product within MS Excel\'s third-party plugin ecosystem',
        'Supported clients in aggregating large data sets',
      ],
      icon: '💼',
      color: 'secondary',
    },
    {
      type: 'career',
      date: parsePeriodToDate('April 2019 – July 2019'),
      title: 'Founding Designer & Product Design Lead',
      subtitle: 'CohesionIB',
      description: 'Contributed to early-stage development of property technology solutions.',
      highlights: [
        'Contributed to early-stage development of property technology solutions',
      ],
      icon: '💼',
      color: 'primary',
    },
    {
      type: 'career',
      date: parsePeriodToDate('May 2018 – April 2019'),
      title: 'Product Design Lead',
      subtitle: 'JLL',
      description: 'Focused on corporate real estate and property management solutions.',
      highlights: [
        'Focused on corporate real estate and property management solutions',
      ],
      icon: '💼',
      color: 'primary',
    },
    {
      type: 'career',
      date: parsePeriodToDate('Feb 2016 – May 2018'),
      title: 'Product Design Lead',
      subtitle: 'Omobono',
      description: 'Worked on B2B solutions within a consultancy environment.',
      highlights: [
        'Worked on B2B solutions within a consultancy environment',
      ],
      icon: '💼',
      color: 'primary',
    },
    {
      type: 'career',
      date: parsePeriodToDate('Nov 2014 – Feb 2016'),
      title: 'Digital Content Strategist',
      subtitle: 'Analyte Health',
      description: 'Contributed to growth initiatives within the telehealth sector.',
      highlights: [
        'Contributed to growth initiatives within the telehealth sector',
      ],
      icon: '💼',
      color: 'primary',
    },
    
    // Education
    {
      type: 'education',
      date: '2010-09', // Estimated based on career timeline
      title: 'BFA in Advertising Design & Strategy',
      subtitle: 'Savannah College of Art & Design',
      description: 'Completed Bachelor of Fine Arts degree focusing on advertising design and strategic thinking.',
      icon: '🎓',
      color: 'secondary',
    },
    
    // Key Projects (featured projects from content system)
    ...projects.map((project) => ({
      type: 'project' as const,
      date: project.meta.date,
      title: project.meta.title,
      subtitle: project.meta.role || 'Project',
      description: project.meta.description,
      icon: '🚀',
      color: 'secondary' as const,
      url: project.meta.url || `/work/${project.meta.slug}`,
    })),
  ];

  return timelineItems;
}

