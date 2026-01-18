'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { parsePeriodToDates, calculateTimeSpan } from '../utils/dateParsing';

interface GanttRole {
  role: string;
  company: string;
  period: string;
  index: number;
}

interface GanttChartProps {
  roles: GanttRole[];
  activeIndex: number;
  onRoleClick?: (index: number) => void;
}

// Generate color for company (simple hash-based)
function getCompanyColor(company: string): string {
  const colors = [
    'bg-[var(--accent-primary)]',
    'bg-[var(--accent-secondary)]',
    'bg-[var(--foreground-muted)]/40',
    'bg-[var(--foreground-muted)]/30',
    'bg-[var(--foreground-muted)]/50',
  ];
  
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = company.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

export function GanttChart({ roles, activeIndex, onRoleClick }: GanttChartProps) {

  // Calculate time span
  const { earliestDate, latestDate } = useMemo(() => {
    if (!roles || roles.length === 0) {
      const now = new Date();
      return { earliestDate: now, latestDate: now };
    }
    return calculateTimeSpan(roles);
  }, [roles]);

  // Sort roles by start date (newest first)
  const sortedRoles = useMemo(() => {
    return [...roles].sort((a, b) => {
      const dateA = parsePeriodToDates(a.period).startDate;
      const dateB = parsePeriodToDates(b.period).startDate;
      return dateB.getTime() - dateA.getTime();
    });
  }, [roles]);

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Generate time scale labels
  const timeScaleLabels = useMemo(() => {
    const labels: Array<{ date: Date; label: string }> = [];
    const yearSpan = latestDate.getFullYear() - earliestDate.getFullYear();
    const interval = yearSpan > 10 ? 2 : 1; // Show every 2 years if span > 10 years
    
    for (let year = earliestDate.getFullYear(); year <= latestDate.getFullYear(); year += interval) {
      labels.push({
        date: new Date(year, 0, 1),
        label: year.toString(),
      });
    }
    
    return labels;
  }, [earliestDate, latestDate]);

  const handleRoleClick = (index: number) => {
    if (onRoleClick) {
      onRoleClick(index);
    }
  };

  return (
    <div className="w-full">
      {/* Time Scale */}
      <div className="relative mb-4 h-8 border-b border-[var(--border)]">
        {timeScaleLabels.map(({ date, label }) => {
          const totalSpan = latestDate.getTime() - earliestDate.getTime();
          const offset = date.getTime() - earliestDate.getTime();
          const left = (offset / totalSpan) * 100;
          
          return (
            <div
              key={label}
              className="absolute top-0 transform -translate-x-1/2"
              style={{ left: `${left}%` }}
            >
              <span className="text-[10px] font-mono text-[var(--foreground-muted)] uppercase tracking-wider">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Gantt Bars */}
      <div className="relative min-h-[400px]">
        {sortedRoles.length === 0 ? (
          <div className="text-center text-[var(--foreground-muted)] font-mono text-sm py-8">
            No roles to display
          </div>
        ) : (
          sortedRoles.map((role, displayIndex) => {
            const { startDate, endDate } = parsePeriodToDates(role.period);
            const end = endDate || new Date();
            
            const totalSpan = latestDate.getTime() - earliestDate.getTime();
            if (totalSpan <= 0) {
              return null;
            }
            
            const startOffset = startDate.getTime() - earliestDate.getTime();
            const duration = end.getTime() - startDate.getTime();
            
            const leftPercent = Math.max(0, (startOffset / totalSpan) * 100);
            const widthPercent = Math.max(1, (duration / totalSpan) * 100);
            const isActive = role.index === activeIndex;
            const companyColor = getCompanyColor(role.company);

          return (
            <div
              key={role.index}
              className="relative mb-3 h-12 flex items-center"
            >
              {/* Role Label */}
              <div className="w-32 md:w-40 flex-shrink-0 pr-4">
                <div className="text-xs font-mono text-[var(--foreground)] uppercase tracking-wide truncate">
                  {role.company}
                </div>
                <div className="text-[10px] font-mono text-[var(--foreground-muted)] truncate">
                  {role.role}
                </div>
              </div>

              {/* Bar Container */}
              <div className="flex-1 relative h-full">
                {/* Bar */}
                <motion.button
                  onClick={() => handleRoleClick(role.index)}
                  className={`
                    absolute top-1/2 -translate-y-1/2 h-6 rounded-sm
                    ${companyColor}
                    ${isActive ? 'ring-2 ring-[var(--accent-primary)] ring-offset-2' : ''}
                    hover:opacity-90 transition-opacity cursor-pointer
                    flex items-center px-2
                  `}
                  style={{
                    left: `${leftPercent}%`,
                    width: `${Math.max(widthPercent, 5)}%`, // Minimum 5% width for readability
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: displayIndex * 0.05 }}
                >
                  {/* Company name inside bar (if wide enough) */}
                  {widthPercent > 8 && (
                    <span className="text-[10px] font-mono text-white uppercase tracking-wider truncate">
                      {role.company}
                    </span>
                  )}
                </motion.button>

                {/* Date labels on bar ends */}
                {widthPercent > 8 && (
                  <>
                    <span
                      className="absolute top-full mt-1 text-[9px] font-mono text-[var(--foreground-muted)] whitespace-nowrap"
                      style={{ left: `${leftPercent}%` }}
                    >
                      {formatDate(startDate)}
                    </span>
                    {endDate && (
                      <span
                        className="absolute top-full mt-1 text-[9px] font-mono text-[var(--foreground-muted)] whitespace-nowrap"
                        style={{ left: `${leftPercent + widthPercent}%`, transform: 'translateX(-100%)' }}
                      >
                        {formatDate(endDate)}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          );
          })
        )}
      </div>
    </div>
  );
}

