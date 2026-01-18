'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SpiderChartProps } from './SpiderChart.types';

/**
 * SpiderChart Component
 * 
 * An interactive radar/spider chart for displaying skills or attributes.
 * Features hover interactions and smooth animations.
 * 
 * @example
 * ```tsx
 * <SpiderChart
 *   skills={[
 *     { name: 'Design', value: 90 },
 *     { name: 'Strategy', value: 85 },
 *     { name: 'Research', value: 80 },
 *   ]}
 *   size={120}
 * />
 * ```
 */
export function SpiderChart({ 
  skills, 
  size = 120, 
  className = '',
  showLabels = true 
}: SpiderChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState(size);
  
  useEffect(() => {
    if (size === 0 && containerRef.current) {
      const updateSize = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setContainerSize(width || 200);
        }
      };
      
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    } else {
      setContainerSize(size);
    }
  }, [size]);
  
  const chartSize = containerSize;
  const centerX = chartSize / 2;
  const centerY = chartSize / 2;
  const radius = chartSize * 0.35;
  const numSkills = skills.length;
  const angleStep = (2 * Math.PI) / numSkills;
  
  // Calculate points for the polygon
  const getPoint = (index: number, value: number) => {
    const angle = (index * angleStep) - (Math.PI / 2); // Start from top
    const distance = (value / 100) * radius;
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);
    return { x, y };
  };
  
  // Create polygon path
  const createPolygonPath = (values: number[]) => {
    const points = values.map((value, index) => getPoint(index, value));
    const path = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';
    return path;
  };
  
  // Create grid circles with more levels for better definition
  const gridLevels = 10;
  const gridCircles = Array.from({ length: gridLevels }, (_, i) => {
    const level = i + 1;
    const r = (level / gridLevels) * radius;
    const isMajor = level % 2 === 0; // Every other level is major
    return { r, isMajor, value: (level / gridLevels) * 100 };
  });
  
  // Create axis lines
  const axes = skills.map((_, index) => {
    const angle = (index * angleStep) - (Math.PI / 2);
    const endX = centerX + radius * Math.cos(angle);
    const endY = centerY + radius * Math.sin(angle);
    return { x: endX, y: endY, angle };
  });
  
  // Value markers for axes (0%, 25%, 50%, 75%, 100%)
  const valueMarkers = [0, 25, 50, 75, 100];
  
  const values = skills.map(skill => skill.value);
  const polygonPath = createPolygonPath(values);
  
  return (
    <div ref={containerRef} className={`relative w-full h-full rounded-lg p-4 ${className}`}>
      <svg
        width={chartSize}
        height={chartSize}
        viewBox={`0 0 ${chartSize} ${chartSize}`}
        className="overflow-visible w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Grid circles - simple concentric circles */}
        {gridCircles.map((circle, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={circle.r}
            fill="none"
            stroke="rgba(0, 0, 0, 0.08)"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines - simple radial lines */}
        {axes.map((axis, index) => (
          <line
            key={index}
            x1={centerX}
            y1={centerY}
            x2={axis.x}
            y2={axis.y}
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth="1"
          />
        ))}
        
        {/* Skill polygon fill - solid pink */}
        <path
          d={polygonPath}
          fill="#f06292"
          fillOpacity="1"
        />
        
        {/* Skill polygon stroke - thin pink outline */}
        <path
          d={polygonPath}
          fill="none"
          stroke="#f06292"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        
        {/* Skill points - simple white circles */}
        {skills.map((skill, index) => {
          const point = getPoint(index, skill.value);
          const axis = axes[index];
          // Calculate label position - extend beyond the chart perimeter
          const labelDistance = radius + 35;
          const labelX = centerX + labelDistance * Math.cos(axis.angle);
          const labelY = centerY + labelDistance * Math.sin(axis.angle);
          
          return (
            <g key={index}>
              {/* White circular marker */}
              <circle
                cx={point.x}
                cy={point.y}
                r={3.5}
                fill="white"
                stroke="#f06292"
                strokeWidth="1"
              />
              
              {/* Label - positioned around perimeter with better contrast */}
              {showLabels && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  fontSize={Math.max(13, chartSize * 0.07)}
                  fill="rgba(0, 0, 0, 0.7)"
                  fontWeight="500"
                  className="pointer-events-none select-none lowercase"
                >
                  {skill.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default SpiderChart;

