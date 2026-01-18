/**
 * Parse period string to Date objects
 * Examples: 
 * - "Oct 2021 – Aug 2023" -> { startDate: Date(2021-10-01), endDate: Date(2023-08-01) }
 * - "May 2025 – Present" -> { startDate: Date(2025-05-01), endDate: null }
 */
export function parsePeriodToDates(period: string): { startDate: Date; endDate: Date | null } {
  const monthMap: Record<string, number> = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11,
  };

  // Handle "Present" case
  if (period.includes('Present')) {
    const match = period.match(/(\w+)\s+(\d{4})/);
    if (match) {
      const monthName = match[1];
      const year = parseInt(match[2]);
      const month = monthMap[monthName];
      if (month !== undefined) {
        const startDate = new Date(year, month, 1);
        return { startDate, endDate: null }; // null = current date
      }
    }
  }

  // Handle date range
  const match = period.match(/(\w+)\s+(\d{4})\s+–\s+(\w+)\s+(\d{4})/);
  if (match) {
    const startMonthName = match[1];
    const startYear = parseInt(match[2]);
    const endMonthName = match[3];
    const endYear = parseInt(match[4]);
    
    const startMonth = monthMap[startMonthName];
    const endMonth = monthMap[endMonthName];
    
    if (startMonth !== undefined && endMonth !== undefined) {
      const startDate = new Date(startYear, startMonth, 1);
      const endDate = new Date(endYear, endMonth, 1);
      return { startDate, endDate };
    }
  }

  // Fallback - try to parse just start date
  const startMatch = period.match(/(\w+)\s+(\d{4})/);
  if (startMatch) {
    const monthName = startMatch[1];
    const year = parseInt(startMatch[2]);
    const month = monthMap[monthName];
    if (month !== undefined) {
      const startDate = new Date(year, month, 1);
      return { startDate, endDate: null };
    }
  }

  // Ultimate fallback
  return { startDate: new Date(), endDate: null };
}

/**
 * Calculate the total time span for all roles
 */
export function calculateTimeSpan(
  roles: Array<{ period: string }>
): { earliestDate: Date; latestDate: Date } {
  const dates = roles.map(role => parsePeriodToDates(role.period));
  const startDates = dates.map(d => d.startDate);
  const endDates = dates
    .map(d => d.endDate || new Date())
    .filter((d): d is Date => d !== null);

  const earliestDate = new Date(Math.min(...startDates.map(d => d.getTime())));
  const latestDate = new Date(Math.max(...endDates.map(d => d.getTime())));

  return { earliestDate, latestDate };
}

/**
 * Calculate bar position and width for a role in the Gantt chart
 */
export function calculateBarPosition(
  rolePeriod: string,
  earliestDate: Date,
  latestDate: Date,
  containerWidth: number
): { left: number; width: number } {
  const { startDate, endDate } = parsePeriodToDates(rolePeriod);
  const end = endDate || new Date();
  
  const totalSpan = latestDate.getTime() - earliestDate.getTime();
  const startOffset = startDate.getTime() - earliestDate.getTime();
  const duration = end.getTime() - startDate.getTime();
  
  const left = (startOffset / totalSpan) * containerWidth;
  const width = (duration / totalSpan) * containerWidth;
  
  return { left, width };
}

