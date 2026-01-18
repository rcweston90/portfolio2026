'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedGrid } from './AnimatedGrid';

export interface GridVariationsProps {
  gridSize: number;
  colorIntensity: number;
  animationSpeed: number;
  enabledVariations: Set<string>;
}

const variations = [
  {
    id: 'pulsing',
    title: 'Pulsing Grid',
    description: 'Subtle pulsing animation on grid lines that creates a gentle breathing effect.',
    variant: 'pulsing' as const,
  },
  {
    id: 'flowing-edges',
    title: 'Flowing Edges',
    description: 'Animated particles flowing along grid edges with mouse-reactive glow effects.',
    variant: 'flowing-edges' as const,
  },
  {
    id: 'mouse-trail',
    title: 'Mouse Trail',
    description: 'Grid lines that subtly follow and react to mouse movement across the page.',
    variant: 'mouse-trail' as const,
  },
  {
    id: 'scroll-wave',
    title: 'Scroll Wave',
    description: 'Grid lines that animate and shift based on scroll position, creating a wave effect.',
    variant: 'scroll-wave' as const,
  },
  {
    id: 'interactive-cells',
    title: 'Interactive Cells',
    description: 'Individual grid cells that respond to hover and click interactions.',
    variant: 'interactive-cells' as const,
  },
  {
    id: 'gradient-flow',
    title: 'Gradient Flow',
    description: 'Animated gradient that flows across grid lines, creating a dynamic color movement.',
    variant: 'gradient-flow' as const,
  },
];

export function GridVariations({
  gridSize,
  colorIntensity,
  animationSpeed,
  enabledVariations,
}: GridVariationsProps) {
  return (
    <>
      {variations.map((variation, index) => {
        const isEnabled = enabledVariations.has(variation.id);
        
        return (
          <motion.section
            key={variation.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            <div className="mb-6">
              <h2 className="font-mono text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                {variation.title}
              </h2>
              <p className="text-[var(--foreground-muted)] max-w-2xl">
                {variation.description}
              </p>
            </div>

            <div 
              className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--background)]"
              data-interactive-grid-container
            >
              {isEnabled ? (
                <AnimatedGrid
                  variant={variation.variant}
                  gridSize={gridSize}
                  colorIntensity={colorIntensity}
                  animationSpeed={animationSpeed}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--foreground-muted)]">
                  <p>Animation disabled</p>
                </div>
              )}
              
              {/* Overlay for interactive cells variant */}
              {variation.variant === 'interactive-cells' && isEnabled && (
                <InteractiveCellsOverlay gridSize={gridSize} />
              )}
            </div>
          </motion.section>
        );
      })}
    </>
  );
}

function InteractiveCellsOverlay({ gridSize }: { gridSize: number }) {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('[data-interactive-grid-container]');
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Hexagonal grid calculations
  const radius = gridSize / 2;
  const hexHeight = radius * Math.sqrt(3);
  const hexWidth = gridSize;
  const horizontalSpacing = hexWidth * 1.5;
  const verticalSpacing = hexHeight;
  
  const cols = Math.ceil(dimensions.width / horizontalSpacing) + 2;
  const rows = Math.ceil(dimensions.height / verticalSpacing) + 2;

  // Generate hexagon points
  const getHexPoints = (centerX: number, centerY: number, r: number): string => {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="absolute inset-0 pointer-events-auto">
      <svg className="w-full h-full">
        {Array.from({ length: rows * cols }).map((_, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const isHovered = hoveredCell?.row === row && hoveredCell?.col === col;
          
          // Calculate hexagon center position with proper staggering
          const offsetX = row % 2 === 0 ? 0 : horizontalSpacing / 2;
          const centerX = col * horizontalSpacing + offsetX + radius;
          const centerY = row * verticalSpacing + radius * Math.sqrt(3);

          return (
            <motion.polygon
              key={`${row}-${col}`}
              points={getHexPoints(centerX, centerY, radius)}
              fill={isHovered ? 'rgba(0, 85, 204, 0.1)' : 'transparent'}
              stroke={isHovered ? 'rgba(0, 85, 204, 0.3)' : 'transparent'}
              strokeWidth="1"
              onMouseEnter={() => setHoveredCell({ row, col })}
              onMouseLeave={() => setHoveredCell(null)}
              style={{ cursor: 'pointer' }}
              animate={{
                fill: isHovered ? 'rgba(0, 85, 204, 0.1)' : 'transparent',
                stroke: isHovered ? 'rgba(0, 85, 204, 0.3)' : 'transparent',
              }}
              transition={{ duration: 0.2 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

import { useEffect } from 'react';

