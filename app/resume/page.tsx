'use client';

import { motion } from 'framer-motion';
import { AnimatedText } from '@/core/primitives';

const experience = [
  {
    role: 'Design Lead, Confluence Growth',
    company: 'Atlassian',
    period: 'Aug 2023 – Present',
    description: 'Leading design for Confluence Growth, driving improvements across the customer journey and managing a team of designers.',
    highlights: [
      'Drove 13% improvement in growth rates across the customer journey',
      'Led a team of 15 designers and 3 managers',
      'Collaborated with executives to develop strategies leveraging personalization and Atlassian Intelligence (AI)',
    ],
  },
  {
    role: 'Senior Product Designer, Cloud Migrations',
    company: 'Atlassian',
    period: 'Oct 2021 – Aug 2023',
    description: 'Co-led a team responsible for driving Server End-of-Support awareness and Cloud Migration activation.',
    highlights: [
      'Co-led team driving Server End-of-Support awareness and Cloud Migration activation',
      'Developed quarterly roadmaps',
      'Introduced practices that reduced project churn by 20%',
    ],
  },
  {
    role: 'Senior Product Designer, Monetization',
    company: 'Atlassian',
    period: 'Jan 2021 – Oct 2021',
    description: 'Designed growth experiments for Jira and Confluence Premium trial activations.',
    highlights: [
      'Designed growth experiments that increased Jira and Confluence Premium trial activations by 30%',
      'Contributed to a 7% revenue increase in FY21 Q2 & Q3',
    ],
  },
  {
    role: 'Design Lead, Hedge Fund Services',
    company: 'Northern Trust',
    period: 'July 2019 – Jan 2021',
    description: 'Worked across nine product and engineering teams to redesign the Hedge Fund Services platform.',
    highlights: [
      'Worked across nine product and engineering teams',
      'Redesigned Hedge Fund Services platform, resulting in significant improvements in performance, functionality, and usability',
    ],
  },
  {
    role: 'Design Lead, Data Direct',
    company: 'Northern Trust',
    period: 'July 2019 – Jan 2021',
    description: 'Drove the redesign of a data-focused product within MS Excel\'s third-party plugin ecosystem.',
    highlights: [
      'Drove redesign of data-focused product within MS Excel\'s third-party plugin ecosystem',
      'Supported clients in aggregating large data sets',
    ],
  },
  {
    role: 'Founding Designer & Product Design Lead',
    company: 'CohesionIB',
    period: 'April 2019 – July 2019',
    description: 'Contributed to early-stage development of property technology solutions.',
    highlights: [
      'Contributed to early-stage development of property technology solutions',
    ],
  },
  {
    role: 'Product Design Lead',
    company: 'JLL',
    period: 'May 2018 – April 2019',
    description: 'Focused on corporate real estate and property management solutions.',
    highlights: [
      'Focused on corporate real estate and property management solutions',
    ],
  },
  {
    role: 'Product Design Lead',
    company: 'Omobono',
    period: 'Feb 2016 – May 2018',
    description: 'Worked on B2B solutions within a consultancy environment.',
    highlights: [
      'Worked on B2B solutions within a consultancy environment',
    ],
  },
  {
    role: 'Digital Content Strategist',
    company: 'Analyte Health',
    period: 'Nov 2014 – Feb 2016',
    description: 'Contributed to growth initiatives within the telehealth sector.',
    highlights: [
      'Contributed to growth initiatives within the telehealth sector',
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
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
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
            href="https://www.linkedin.com/in/rcweston"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 self-start md:self-auto"
          >
            VIEW_ON_LINKEDIN
          </motion.a>
        </div>

        {/* Experience Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <h2 className="font-mono text-xl font-bold text-[var(--foreground)] mb-8 flex items-center gap-3 uppercase tracking-wide">
            <span className="w-8 h-0.5 bg-[var(--accent-primary)]" />
            EXPERIENCE
          </h2>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 border-l-2 border-[var(--border)] hover:border-[var(--accent-primary)] transition-colors"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--accent-primary)]" />

                <div className="pb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                    <h3 className="font-mono text-lg font-semibold text-[var(--foreground)] uppercase tracking-wide">
                      {job.role}
                    </h3>
                    <span className="text-xs text-[var(--accent-primary)] font-medium font-mono uppercase tracking-wider">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-[var(--foreground-muted)] font-medium mb-3 text-sm">
                    {job.company}
                  </p>
                  <p className="text-[var(--foreground-muted)] text-sm mb-4">
                    {job.description}
                  </p>
                  <ul className="space-y-2">
                    {job.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--foreground-muted)]"
                      >
                        <span className="text-[var(--accent-primary)] mt-1 font-mono">→</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
                <span className="text-xs text-[var(--accent-primary)] font-medium font-mono uppercase tracking-wider">
                  {edu.period}
                </span>
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
