'use client';

import React, { useState } from 'react';
import TOC from './components/TOC';
import VideoPlayer from './components/VideoPlayer';

type ComponentId = 'toc' | 'video-player';

interface Component {
  id: ComponentId;
  name: string;
  category: string;
  component: React.ReactNode;
}

const ComponentShow: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentId>('toc');

  const components: Component[] = [
    {
      id: 'toc',
      name: 'Table of Contents',
      category: 'Component',
      component: <TOC />,
    },
    {
      id: 'video-player',
      name: 'The Doll',
      category: 'Media',
      component: <VideoPlayer />,
    },
  ];

  const selected = components.find(c => c.id === selectedComponent);

  return (
    <>
      {/* Mobile Warning - Visible only on mobile */}
      <div className="md:hidden min-h-screen flex flex-col items-center justify-center bg-[var(--card-bg)] text-center px-6">
        <h2 className="font-serif text-3xl font-bold mb-4 text-[var(--foreground)]">
          Desktop View Required
        </h2>
        <p className="font-mono text-sm text-[var(--foreground-muted)] max-w-xs">
          Please turn on desktop view to explore the interactive component library.
        </p>
      </div>

      {/* Desktop Interface - Hidden on mobile */}
      <div className="hidden md:flex min-h-screen flex-row">

        {/* Sidebar */}
        <aside className="w-full md:w-64 border-b-2 md:border-b-0 md:border-r-2 border-[var(--border)] bg-transparent flex-shrink-0">
          <div className="p-6 md:sticky md:top-0">
            <nav className="flex overflow-x-auto md:overflow-visible md:block gap-6 md:gap-0 pb-2 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
              {/* Group by category */}
              {Array.from(new Set(components.map(c => c.category))).map(category => (
                <div key={category} className="mb-0 md:mb-6 min-w-[200px] md:min-w-0">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground-muted)] mb-2 px-2 hidden md:block">
                    {category}
                  </h3>
                  <ul className="space-y-1">
                    {components
                      .filter(c => c.category === category)
                      .map(component => (
                        <li key={component.id}>
                          <button
                            onClick={() => setSelectedComponent(component.id)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors whitespace-nowrap md:whitespace-normal ${
                              selectedComponent === component.id
                                ? 'bg-[var(--accent-primary)] text-white font-medium'
                                : 'text-[var(--foreground-muted)] hover:bg-[var(--background-secondary)] hover:text-[var(--foreground)]'
                            }`}
                          >
                            {component.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Preview Section */}
        <main className="flex-1 bg-transparent min-w-0">
          <div className="p-4 sm:p-8 md:p-12">
            {/* Header */}
            <div className="mb-8 md:mb-12 pb-6 border-b-2 border-[var(--border)]">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4 sm:mb-2">
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--foreground)]">
                  {selected?.name}
                </h2>
                <span className="text-xs font-mono text-[var(--foreground-muted)] uppercase tracking-wider">
                  {selected?.category}
                </span>
              </div>
              <p className="text-sm text-[var(--foreground-muted)] font-mono">
                Interactive component demonstration
              </p>
            </div>

            {/* Footer Info */}
            <div className="mb-2">
              <p className="text-[10px] font-mono text-[var(--foreground-muted)] uppercase tracking-wider">
                Component Preview • Interact to see animations
              </p>
            </div>

            {/* Component Preview */}
            <div className={`rounded-lg border-2 border-[var(--border)] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden relative bg-black p-4 sm:p-8 md:p-12`}>
              <div className="w-full max-w-2xl">
                {selected?.component}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ComponentShow;

