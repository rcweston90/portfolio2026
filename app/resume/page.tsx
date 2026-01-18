'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState, useMemo } from 'react';
import { AnimatedText } from '@/core/primitives';
import { useScrollSpy } from '@/core/hooks/useScrollSpy';
import { TimelineTOC } from './components/TimelineTOC';
import { CompanyGroup } from './components/CompanyGroup';
import { CompanyGroupData } from './components/TimelineItem.types';
import { ViewToggle } from './components/ViewToggle';
import { GanttChart } from './components/GanttChart';

const experience = [
  {
    role: 'Founding Designer, Member of Technical Staff',
    company: 'Traversal',
    period: 'May 2025 – Present',
    description: 'Founding designer building an AI SRE agentic platform for enterprise.',
    highlights: [
      'Founding designer building an AI SRE agentic platform for enterprise',
    ],
  },
  {
    role: 'Staff Designer',
    company: 'Instabase',
    period: 'Sep 2024 – May 2025',
    description: 'Building GenAI workflows around (un)structured data.',
    highlights: [
      'Building GenAI workflows around (un)structured data',
    ],
  },
  {
    role: 'Lead Designer (DRI), Confluence Growth',
    company: 'Atlassian',
    period: 'Aug 2023 – Sep 2024',
    description: 'Building experiments and driving impact across Confluence\'s Growth Land program. Focusing on identifying opportunities building experiences across Discovery, Signup, Onboarding, Trial, and Purchase.',
    highlights: [
      'Building experiments and driving impact across Confluence\'s Growth Land program',
      'Focusing on identifying opportunities building experiences across Discovery, Signup, Onboarding, Trial, and Purchase',
    ],
  },
  {
    role: 'Senior Designer (+ Co-Product Owner), Cloud Migrations',
    company: 'Atlassian',
    period: 'Oct 2021 – Aug 2023',
    description: 'Led a design team focused on the Cloud migration experience for customers hosted on Server & Data Center deployments.',
    highlights: [
      'Led a design team focused on the Cloud migration experience for customers hosted on Server & Data Center deployments',
    ],
  },
  {
    role: 'Senior Product Designer, Growth Monetization',
    company: 'Atlassian',
    period: 'Jan 2021 – Oct 2021',
    description: 'Built net-new flows + strategies to increase JSM, JSW, and Confluence trial activations.',
    highlights: [
      'Built net-new flows + strategies to increase JSM, JSW, and Confluence trial activations by 30% and generated a 7% revenue increase optimizing existing flows',
      'Authored thought-leadership for internal replication and scalability',
    ],
  },
  {
    role: 'Principal Product Designer',
    company: 'bttn',
    period: 'Apr 2022 – Dec 2022',
    description: 'Principal Product Designer role at bttn.',
    highlights: [],
  },
  {
    role: 'Design Lead, Hedge Fund Services',
    company: 'Northern Trust',
    period: 'Nov 2019 – Jan 2021',
    description: 'Worked across 9 product and engineering teams to redesign Northern Trust\'s Hedge Fund Services platform.',
    highlights: [
      'Worked across 9 product and engineering teams to redesign Northern Trust\'s Hedge Fund Services platform; resulting in improved performance, functionality, and usability (90% of internal users said experience had \'greatly improved\')',
      'Led cross-functional workshops to educate teams on UX best practices for scaling data-dense apps across Web + Mobile properties; in addition to advocating for accessibility, scrum frameworks, and usability testing',
      'Unified the platform\'s design language via Northern Trust\'s Design System and contributing +12 shared components and patterns that other teams adopted',
    ],
  },
  {
    role: 'Design Lead, Data Solutions',
    company: 'Northern Trust',
    period: 'July 2019 – Nov 2019',
    description: 'Drove redesign of a data-set focused product, built within MS Excel\'s third-party plugin ecosystem, to support clients aggregating large data sets.',
    highlights: [
      'Drove redesign of a data-set focused product, built within MS Excel\'s third-party plugin ecosystem, to support clients aggregating large data sets',
    ],
  },
  {
    role: 'Founding Designer',
    company: 'cohesion',
    period: 'Apr 2019 – July 2019',
    description: 'Led design for cohesion\'s \'intelligent building\' platform, which could act as a building\'s \'digital twin\', launching across Web + Mobile + Android + iOS.',
    highlights: [
      'Led design for cohesion\'s \'intelligent building\' platform, which could act as a building\'s \'digital twin\', launching across Web + Mobile + Android + iOS',
      '\'Most Intelligent Office Building\' Realcomm Digie Award (2020)',
    ],
  },
  {
    role: 'Design Lead, Tenant Representation',
    company: 'JLL',
    period: 'May 2018 – Apr 2019',
    description: 'Drove the design of a client-facing point of sale tool. Responsible for design strategy, research, and implementation.',
    highlights: [
      'Drove the design of a client-facing point of sale tool. Responsible for design strategy, research, and implementation. Led cross-functional teams through various workshops for alignment',
      'Managed a $500k budget to build an enterprise level design system, containing 27 components (sketch + react), with supporting documentation on governance and components',
      '\'JLL da Vinci Innovation\' Award (2018)',
    ],
  },
  {
    role: 'UX Strategist',
    company: 'Omobono',
    period: 'Jun 2017 – May 2018',
    description: 'Worked directly with JLL product teams, to create a strategy, information architecture, and usability testing protocols for an end-to-end broker admin platform.',
    highlights: [
      'Worked directly with JLL product teams, to create a strategy, information architecture, and usability testing protocols for an end-to-end broker admin platform, which upon launch improved internal efficiency by 2400%',
      'This initiative turned a 6-week consultancy turn into a 9-month retainer, with me ultimately leaving to work directly with JLL',
    ],
  },
  {
    role: 'Digital Strategist',
    company: 'Omobono',
    period: 'Feb 2016 – Jun 2017',
    description: 'The 1st IC strategy hire for Omobono\'s U.S. Headquarters in Chicago, a B2B consulting & marketing firm.',
    highlights: [
      'The 1st IC strategy hire for Omobono\'s U.S. Headquarters in Chicago, a B2B consulting & marketing firm that The Marketing Practice bought in 2021',
      'Led research studies from set-up to facilitation, analysis, synthesis, & shareout',
      'Facilitated client presentations, brainstorms, & workshops',
      'Created user-experience artifacts like journey maps, wireframes, prototypes, & service blueprints',
      'Provided recommendations on brand strategy, message houses, & channel strategies',
    ],
  },
  {
    role: 'Digital Content Strategist',
    company: 'Analyte Health',
    period: 'Nov 2014 – Feb 2016',
    description: 'Led content strategy for two consumer-facing products (Sexual Health and STD Test Express) and 150+ supporting submarket microsites.',
    highlights: [
      'Led content strategy for two consumer-facing products (Sexual Health and STD Test Express) and 150+ supporting submarket microsites',
      'Created messaging frameworks for our products and social media. Used A/B tests, analytics, user research, and usability tests to refine messaging strategies',
    ],
  },
];

const skills = {
  design: ['Research & Analysis', 'Design & Product Strategy', 'New Product Design', 'Legacy Product Design', 'Experimentation Design', 'Systems Design'],
  operations: ['Agile & Operations', 'Team Leadership', 'Design Systems', 'User Research', 'Product Strategy'],
  other: ['B2B Solutions', 'AI Experiences', 'Team Coaching', 'Cross-functional Collaboration'],
};

const education = [
  {
    degree: 'BFA in Advertising Design & Strategy',
    school: 'Savannah College of Art & Design',
    period: '',
    note: '',
  },
];

const certifications = [
  {
    name: 'Interaction Design Foundation',
    items: [
      'Gamification for UX',
      'Gestalt Psychology',
      'Usability Testing',
      'UX Strategy & Management',
    ],
  },
  {
    name: 'Scrum Alliance',
    items: [
      'Certified Scrum Master',
      'Certified Scrum Product Owner',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ResumePage() {
  const [viewMode, setViewMode] = useState<'timeline' | 'gantt'>('timeline');

  // Group experience by company
  const groupedExperience = useMemo(() => {
    const groups: CompanyGroupData[] = [];
    let currentGroup: CompanyGroupData | null = null;

    experience.forEach((entry) => {
      if (!currentGroup || currentGroup.company !== entry.company) {
        // New company - start new group
        currentGroup = {
          company: entry.company,
          roles: [],
        };
        groups.push(currentGroup);
      }
      // Add role to current group
      currentGroup.roles.push({
        role: entry.role,
        company: entry.company,
        period: entry.period,
        description: entry.description,
        highlights: entry.highlights,
      });
    });

    return groups;
  }, []);

  // Create refs for each timeline item (flattened for scroll tracking)
  const allRoles = groupedExperience.flatMap(group => group.roles);
  const timelineRefs = allRoles.map(() => useRef<HTMLDivElement>(null));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle page scroll to control experience container scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    const innerContainer = container?.querySelector('div') as HTMLDivElement;
    if (!container || !innerContainer) return;

    let isScrolling = false;
    let rafId: number | null = null;

    const handleWindowScroll = () => {
      if (isScrolling) return;
      
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;
      const viewportHeight = window.innerHeight;
      
      // Only control scroll when container is in viewport
      if (containerTop < viewportHeight && containerBottom > 0) {
        // Calculate how much of the container has scrolled past the viewport
        const scrollStart = containerTop;
        const scrollEnd = containerBottom - viewportHeight;
        const scrollRange = Math.abs(scrollEnd - scrollStart);
        
        if (scrollRange > 0) {
          // Calculate progress: 0 when container top reaches viewport, 1 when bottom reaches viewport
          const scrollProgress = Math.max(0, Math.min(1, -scrollStart / scrollRange));
          const maxScroll = innerContainer.scrollHeight - container.clientHeight;
          const targetScroll = scrollProgress * maxScroll;
          
          isScrolling = true;
          innerContainer.scrollTop = targetScroll;
          
          requestAnimationFrame(() => {
            isScrolling = false;
          });
        }
      }
    };

    const handleContainerScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;

        // Find which item is closest to the viewport center
        let closestIndex = 0;
        let closestDistance = Infinity;

        timelineRefs.forEach((ref, index) => {
          if (ref.current) {
            const itemRect = ref.current.getBoundingClientRect();
            const itemCenter = itemRect.top + itemRect.height / 2;
            const distance = Math.abs(itemCenter - viewportCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          }
        });

        setActiveIndex(closestIndex);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    innerContainer.addEventListener('scroll', handleContainerScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      innerContainer.removeEventListener('scroll', handleContainerScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Handle TOC item click - scroll to corresponding section
  const handleTOCClick = (index: number) => {
    const container = scrollContainerRef.current;
    const innerContainer = container?.querySelector('div') as HTMLDivElement;
    const targetRef = timelineRefs[index];
    
    if (innerContainer && targetRef.current) {
      const containerRect = container!.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      const scrollTop = innerContainer.scrollTop + (targetRect.top - containerRect.top) - (containerRect.height / 2 - targetRect.height / 2);
      
      innerContainer.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  };

  // Flatten experience for TOC (one entry per role)
  const flattenedExperience = useMemo(() => {
    return groupedExperience.flatMap(group => 
      group.roles.map(role => ({
        role: role.role,
        company: group.company,
        period: role.period,
      }))
    );
  }, [groupedExperience]);

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 pb-4 border-b border-[var(--border)]">
          <div>
            <AnimatedText
              text="Resume"
              as="h1"
              className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] uppercase tracking-tight"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 text-base text-[var(--foreground-muted)]"
            >
              Design Leader with 15+ years in product, strategy & design • 10+ years leading & coaching teams
            </motion.p>
          </div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            href="https://www.linkedin.com/in/richardcharlieweston"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 self-start md:self-auto"
          >
            VIEW_ON_LINKEDIN
          </motion.a>
        </div>

        {/* Experience Section - 2 Column Layout */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-mono text-xl font-bold text-[var(--foreground)] flex items-center gap-3 uppercase tracking-wide">
              <span className="w-8 h-0.5 bg-[var(--accent-primary)]" />
              EXPERIENCE
            </h2>
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>

          {viewMode === 'timeline' ? (
            /* Timeline View - 2 Column Grid: TOC (2/12) + Timeline (10/12) */
            <div className="grid grid-cols-12 gap-6">
              {/* TOC Column - 2/12 */}
              <div className="col-span-2 hidden md:block">
                <TimelineTOC
                  items={flattenedExperience}
                  activeIndex={activeIndex}
                  onItemClick={handleTOCClick}
                />
              </div>

              {/* Timeline Content Column - 10/12 */}
              <div className="col-span-12 md:col-span-10">
                <div 
                  ref={scrollContainerRef}
                  className="h-[calc(100vh-16rem)] overflow-hidden relative"
                >
                  <div className="h-full overflow-y-auto pr-4 scroll-smooth pb-4">
                    {groupedExperience.map((companyGroup, groupIndex) => {
                      // Calculate the starting index for refs in this group
                      const startIndex = groupedExperience
                        .slice(0, groupIndex)
                        .reduce((sum, group) => sum + group.roles.length, 0);

                      return (
                        <CompanyGroup
                          key={companyGroup.company}
                          company={companyGroup.company}
                          roles={companyGroup.roles}
                          isFirstGroup={groupIndex === 0}
                          roleRefs={timelineRefs}
                          startIndex={startIndex}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Gantt Chart View */
            <div className="grid grid-cols-12 gap-6">
              {/* TOC Column - 2/12 */}
              <div className="col-span-2 hidden md:block">
                <TimelineTOC
                  items={flattenedExperience}
                  activeIndex={activeIndex}
                  onItemClick={handleTOCClick}
                />
              </div>

              {/* Gantt Chart Column - 10/12 */}
              <div className="col-span-12 md:col-span-10">
                <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-sm">
                  <GanttChart
                    roles={allRoles.map((role, index) => ({
                      role: role.role,
                      company: role.company,
                      period: role.period,
                      index: index,
                    }))}
                    activeIndex={activeIndex}
                    onRoleClick={handleTOCClick}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2 className="font-mono text-xl font-bold text-[var(--foreground)] mb-8 flex items-center gap-3 uppercase tracking-wide">
            <span className="w-8 h-0.5 bg-[var(--accent-primary)]" />
            SKILLS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="p-6 rounded-sm bg-[var(--card-bg)] border border-[var(--border)]">
                <h3 className="text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider mb-4 font-mono">
                  [{category}]
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs rounded-sm bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] uppercase tracking-wide"
                    >
                      [{skill}]
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2 className="font-mono text-xl font-bold text-[var(--foreground)] mb-8 flex items-center gap-3 uppercase tracking-wide">
            <span className="w-8 h-0.5 bg-[var(--accent-primary)]" />
            CERTIFICATIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="p-6 rounded-sm bg-[var(--card-bg)] border border-[var(--border)]"
              >
                <h3 className="font-mono text-lg font-semibold text-[var(--foreground)] uppercase tracking-wide mb-4">
                  {cert.name}
                </h3>
                <ul className="space-y-2">
                  {cert.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[var(--foreground-muted)]"
                    >
                      <span className="text-[var(--accent-primary)] mt-1 font-mono">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2 className="font-mono text-xl font-bold text-[var(--foreground)] mb-8 flex items-center gap-3 uppercase tracking-wide">
            <span className="w-8 h-0.5 bg-[var(--accent-primary)]" />
            EDUCATION
          </h2>

          {education.map((edu, index) => (
            <div
              key={index}
              className="p-6 rounded-sm bg-[var(--card-bg)] border border-[var(--border)]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                <h3 className="font-mono text-lg font-semibold text-[var(--foreground)] uppercase tracking-wide">
                  {edu.degree}
                </h3>
                {edu.period && (
                  <span className="text-xs text-[var(--accent-primary)] font-medium font-mono uppercase tracking-wider">
                    {edu.period}
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--foreground-muted)]">{edu.school}</p>
              {edu.note && (
                <p className="text-xs text-[var(--foreground-muted)] mt-2">{edu.note}</p>
              )}
            </div>
          ))}
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center p-8 rounded-sm bg-[var(--card-bg)] border border-[var(--border)]"
        >
          <h2 className="font-mono text-xl md:text-2xl font-bold text-[var(--foreground)] uppercase tracking-wide">
            INTERESTED IN WORKING TOGETHER?
          </h2>
          <p className="mt-3 text-sm text-[var(--foreground-muted)]">
            I&apos;m always open to discussing new opportunities.
          </p>
          <motion.a
            href="mailto:charlie.rcweston@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 btn-primary inline-block"
          >
            GET_IN_TOUCH
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
