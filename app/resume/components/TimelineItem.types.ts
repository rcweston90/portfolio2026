export interface TimelineItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  isNewCompany?: boolean;
  isFirstInCompany?: boolean;
  isLastInCompany?: boolean;
  index: number;
}

export interface CompanyGroupData {
  company: string;
  roles: Omit<TimelineItemProps, 'isNewCompany' | 'isFirstInCompany' | 'isLastInCompany' | 'index'>[];
}

