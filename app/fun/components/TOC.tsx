'use client';

import { useState } from 'react';
import { TableOfContents, TocItem } from './toc/TableOfContents';
import './toc/TableOfContents.css';

const tocItems: TocItem[] = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  {
    id: 'examples',
    label: 'Examples',
    children: [
      { id: 'simple-area-chart', label: 'Simple Area Chart' },
      { id: 'double-area-chart', label: 'Double Area Chart' },
      { id: 'animated-area-chart', label: 'Animated Area Chart' },
    ],
  },
  { id: 'test-cases', label: 'Test Cases' },
  { id: 'props', label: 'Props' },
  { id: 'allowed-variables', label: 'Allowed Variables' },
  { id: 'usecases', label: 'Usecases' },
];

const TOC: React.FC = () => {
  const [activeId, setActiveId] = useState('examples');

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .toc {
            background-color: transparent !important;
          }
        `
      }} />
      <div className="flex items-center justify-center min-h-[400px] p-8" style={{ backgroundColor: 'transparent' }}>
        <TableOfContents
          items={tocItems}
          activeId={activeId}
          onItemClick={setActiveId}
        />
      </div>
    </>
  );
};

export default TOC;
