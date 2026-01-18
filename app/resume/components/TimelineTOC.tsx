'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';

interface TimelineItem {
  role: string;
  company: string;
  period: string;
}

interface TimelineTOCProps {
  items: TimelineItem[];
  activeIndex: number;
  onItemClick?: (index: number) => void;
}

// Parse period string and calculate tenure in months
function calculateTenureMonths(period: string): number {
  const monthMap: Record<string, number> = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'April': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'July': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
  };

  // Handle "Present" case
  if (period.includes('Present')) {
    const startMatch = period.match(/(\w+)\s+(\d{4})/);
    if (startMatch) {
      const startMonth = monthMap[startMatch[1]];
      const startYear = parseInt(startMatch[2]);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      
      return (currentYear - startYear) * 12 + (currentMonth - startMonth);
    }
  }

  // Handle date range
  const match = period.match(/(\w+)\s+(\d{4})\s+–\s+(\w+)\s+(\d{4})/);
  if (match) {
    const startMonth = monthMap[match[1]];
    const startYear = parseInt(match[2]);
    const endMonth = monthMap[match[3]];
    const endYear = parseInt(match[4]);
    
    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }

  return 1; // Default to 1 month if parsing fails
}

export function TimelineTOC({ items, activeIndex, onItemClick }: TimelineTOCProps) {
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set());

  // Calculate tenures and normalize widths
  const { tenures, maxTenure, widths } = useMemo(() => {
    const tenures = items.map(item => calculateTenureMonths(item.period));
    const maxTenure = Math.max(...tenures, 1);
    const widths = tenures.map(tenure => (tenure / maxTenure) * 100);
    
    return { tenures, maxTenure, widths };
  }, [items]);

  // Group items by company for visual separation
  const groupedItems = useMemo(() => {
    const groups: { 
      company: string; 
      items: { item: TimelineItem; index: number }[];
      totalTenure: number;
      companyWidth: number;
    }[] = [];
    let currentGroup: typeof groups[0] | null = null;

    items.forEach((item, index) => {
      if (!currentGroup || currentGroup.company !== item.company) {
        currentGroup = {
          company: item.company,
          items: [],
          totalTenure: 0,
          companyWidth: 0,
        };
        groups.push(currentGroup);
      }
      const tenure = calculateTenureMonths(item.period);
      currentGroup.items.push({ item, index });
      currentGroup.totalTenure += tenure;
    });

    // Calculate company-level widths with minimum width
    const maxTenure = Math.max(...groups.map(g => g.totalTenure), 1);
    const longestCompanyName = Math.max(...groups.map(g => g.company.length), 0);
    // Calculate minimum width: ensure longest company name fits (approximately 1.5% per character, minimum 20%)
    const minWidthPercent = Math.max(20, Math.min(25, longestCompanyName * 1.5));
    
    groups.forEach(group => {
      const calculatedWidth = (group.totalTenure / maxTenure) * 100;
      group.companyWidth = Math.max(calculatedWidth, minWidthPercent);
    });

    return groups;
  }, [items]);

  const handleClick = (index: number) => {
    if (onItemClick) {
      onItemClick(index);
    }
  };

  const toggleCompany = (company: string) => {
    setExpandedCompanies(prev => {
      const next = new Set(prev);
      if (next.has(company)) {
        next.delete(company);
      } else {
        next.add(company);
      }
      return next;
    });
  };

  // Check if any role in a company is active
  const isCompanyActive = (group: typeof groupedItems[0]) => {
    return group.items.some(({ index }) => index === activeIndex);
  };

  return (
    <div className="sticky top-24 h-fit w-full">
      <div className="flex flex-col gap-1">
        {groupedItems.map((group, groupIndex) => {
          const isExpanded = expandedCompanies.has(group.company);
          const hasMultipleRoles = group.items.length > 1;
          const isActive = isCompanyActive(group);
          const firstItemIndex = group.items[0].index;

          return (
            <div key={group.company} className={groupIndex > 0 ? 'mt-2' : ''}>
              {/* Company bar - clickable if multiple roles */}
              <div className="mb-1">
                <motion.button
                  onClick={() => hasMultipleRoles && toggleCompany(group.company)}
                  className={`relative group w-full ${hasMultipleRoles ? 'cursor-pointer' : ''}`}
                  aria-label={hasMultipleRoles ? `Toggle ${group.company} roles` : group.company}
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.98,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Company aggregate bar with label inside */}
                  <div className="relative">
                    <div
                      className={`
                        h-6 rounded-sm transition-all duration-300 relative overflow-hidden
                        ${isActive 
                          ? 'bg-[var(--accent-primary)]' 
                          : 'bg-[var(--foreground-muted)]/30 hover:bg-[var(--foreground-muted)]/50'
                        }
                      `}
                      style={{ width: `${group.companyWidth}%` }}
                    >
                      {/* Company name inside bar - visible when expanded or on hover */}
                      <span 
                        className={`
                          absolute inset-0 flex items-center px-2 text-[10px] font-mono uppercase tracking-wider
                          transition-opacity duration-200
                          ${isExpanded || isActive
                            ? 'opacity-100 text-white'
                            : 'opacity-0 group-hover:opacity-100 text-white'
                          }
                        `}
                      >
                        {group.company}
                      </span>
                      
                      {/* Expand/collapse indicator */}
                      {hasMultipleRoles && (
                        <motion.span
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs transition-opacity duration-200 ${
                            isExpanded || isActive
                              ? 'opacity-100 text-white'
                              : 'opacity-0 group-hover:opacity-100 text-white'
                          }`}
                        >
                          →
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Expanded individual role bars */}
              <AnimatePresence>
                {isExpanded && hasMultipleRoles && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1 mt-1"
                  >
                    {group.items.map(({ item, index }) => {
                      const isRoleActive = index === activeIndex;
                      const width = widths[index];
                      
                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleClick(index)}
                          className="relative group w-full"
                          aria-label={`Scroll to ${item.role} at ${item.company}`}
                          initial={false}
                          animate={{
                            scale: isRoleActive ? 1 : 0.98,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* Individual role bar */}
                          <div
                            className={`
                              h-1.5 rounded-full transition-all duration-300
                              ${isRoleActive 
                                ? 'bg-[var(--accent-primary)]' 
                                : 'bg-[var(--foreground-muted)]/20 hover:bg-[var(--foreground-muted)]/40'
                              }
                            `}
                            style={{ width: `${width}%` }}
                          />
                          
                          {/* Tooltip on hover */}
                          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                            <div className="px-2 py-1 text-xs font-mono text-[var(--foreground)] bg-[var(--card-bg)] border border-[var(--border)] rounded-sm shadow-sm">
                              {item.role}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

