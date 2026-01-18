'use client';

import { motion } from 'framer-motion';
import { TimelineItem } from './TimelineItem';
import { CompanyGroupData } from './TimelineItem.types';

interface CompanyGroupProps {
  company: string;
  roles: CompanyGroupData['roles'];
  isFirstGroup?: boolean;
  roleRefs?: React.RefObject<HTMLDivElement | null>[];
  startIndex?: number;
}

const groupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function CompanyGroup({ company, roles, isFirstGroup = false, roleRefs, startIndex = 0 }: CompanyGroupProps) {
  return (
    <motion.div
      variants={groupVariants}
      initial="hidden"
      animate="visible"
      className={isFirstGroup ? '' : 'mt-6 md:mt-8'}
    >
      {/* Company Header - show for all groups */}
      <div className="mb-4 pb-2 border-b border-[var(--border)]">
        <h2 className="font-mono text-base md:text-lg font-bold text-[var(--foreground)] uppercase tracking-wide">
          {company}
        </h2>
      </div>

      {/* Timeline Items for this company */}
      <div className="flex flex-col gap-3 md:gap-4">
        {roles.map((role, index) => {
          const globalIndex = startIndex + index;
          const ref = roleRefs?.[globalIndex];
          
          return (
            <TimelineItem
              key={index}
              ref={ref}
              {...role}
              isNewCompany={index === 0}
              isFirstInCompany={index === 0}
              isLastInCompany={index === roles.length - 1}
              index={index}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

