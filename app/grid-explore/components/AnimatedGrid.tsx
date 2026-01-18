'use client';

import { useState, useEffect, useRef, CSSProperties, type ReactElement } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';

export interface AnimatedGridProps {
  variant?: 'pulsing' | 'flowing-edges' | 'mouse-trail' | 'scroll-wave' | 'interactive-cells' | 'gradient-flow';
  gridSize?: number;
  colorIntensity?: number;
  animationSpeed?: number;
  gap?: number; // Gap between hexagons in pixels (positive = gap, negative = overlap)
  className?: string;
  style?: CSSProperties;
}

export function AnimatedGrid({
  variant = 'pulsing',
  gridSize = 24,
  colorIntensity = 0.03,
  animationSpeed = 1,
  gap = 0,
  className = '',
  style,
}: AnimatedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mousePosition = useMousePosition();
  const scrollPosition = useScrollPosition();

  // Hexagon grid calculations - VERIFIED MATHEMATICALLY
  // For pointy-top hexagons (pointing upward):
  // - gridSize = width (flat-to-flat distance) = 2 * radius
  // - radius = distance from center to any vertex
  const radius = gridSize / 2;
  
  // Height of hexagon (point-to-point) = 2 * radius * sqrt(3) / 2 = radius * sqrt(3)
  // But since radius = gridSize/2, height = gridSize * sqrt(3)
  const hexHeight = gridSize * Math.sqrt(3);
  
  // Horizontal spacing: centers are 1.5 * width apart for proper tessellation
  // Add gap to create spacing between hexagons (gap is applied to both dimensions)
  const baseHorizontalSpacing = gridSize * 1.5;
  const horizontalSpacing = baseHorizontalSpacing + gap;
  
  // Vertical spacing: CRITICAL - for hexagons to touch edge-to-edge,
  // centers must be exactly half the height apart vertically
  // This is: verticalSpacing = hexHeight / 2 = gridSize * sqrt(3) / 2
  // Add gap to create spacing between hexagons
  const baseVerticalSpacing = hexHeight / 2;
  const verticalSpacing = baseVerticalSpacing + gap;

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const container = containerRef.current;
    container.style.setProperty('--grid-size', `${gridSize}px`);
    container.style.setProperty('--grid-color', `rgba(64, 64, 64, ${colorIntensity})`);
    container.style.setProperty('--animation-speed', `${animationSpeed}`);
    container.style.setProperty('--hex-radius', `${radius}px`);
    container.style.setProperty('--hex-height', `${hexHeight}px`);
    container.style.setProperty('--horizontal-spacing', `${horizontalSpacing}px`);
    container.style.setProperty('--vertical-spacing', `${verticalSpacing}px`);
  }, [gridSize, colorIntensity, animationSpeed, radius, hexHeight, horizontalSpacing, verticalSpacing]);

  // Generate hexagon points (pointy-top orientation)
  // Vertices are calculated starting from top point and going clockwise
  const getHexagonPoints = (centerX: number, centerY: number, r: number): string => {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      // Start from top vertex: angle = -90° (or 270°)
      // Each vertex is 60° apart: angle = (i * 60°) - 90°
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      // Use high precision to avoid rounding errors
      points.push(`${x.toFixed(6)},${y.toFixed(6)}`);
    }
    return points.join(' ');
  };

  // Render hexagon grid
  const renderHexagonGrid = () => {
    if (!containerRef.current || !svgRef.current) return null;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate grid dimensions with extra coverage for edges
    const cols = Math.ceil(width / horizontalSpacing) + 4;
    const rows = Math.ceil(height / verticalSpacing) + 4;

    const hexagons: ReactElement[] = [];

    // Render hexagons starting from negative indices to ensure full coverage
    for (let row = -2; row < rows + 2; row++) {
      for (let col = -2; col < cols + 2; col++) {
        // Staggered layout: odd rows are offset horizontally by half spacing
        const offsetX = row % 2 === 0 ? 0 : horizontalSpacing / 2;
        
        // Calculate hexagon center position
        // X: column spacing with offset for staggered rows
        const centerX = col * horizontalSpacing + offsetX + radius;
        
        // Y: row spacing - start from hexHeight/2 to account for top point
        // Each row is verticalSpacing apart, which equals hexHeight/2
        const centerY = row * verticalSpacing + hexHeight / 2;

        // Only render if hexagon is visible (with margin for edge hexagons)
        if (centerX > -radius * 3 && centerX < width + radius * 3 && 
            centerY > -radius * 3 && centerY < height + radius * 3) {
          const points = getHexagonPoints(centerX, centerY, radius);
          hexagons.push(
            <polygon
              key={`${row}-${col}`}
              points={points}
              fill="none"
              stroke={`rgba(64, 64, 64, ${colorIntensity})`}
              strokeWidth="1"
              className="hexagon-cell"
              vectorEffect="non-scaling-stroke"
            />
          );
        }
      }
    }

    return hexagons;
  };

  const getGridStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      ...style,
    };

    switch (variant) {
      case 'pulsing':
        return {
          ...baseStyle,
        };
      case 'scroll-wave':
        return {
          ...baseStyle,
          transform: `translateY(${scrollPosition.y * 0.1}px)`,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`animated-grid ${className}`}
        style={getGridStyle()}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{
            opacity: variant === 'pulsing' ? 1 : 1,
            animation: variant === 'pulsing' 
              ? `pulseGrid calc(2s / var(--animation-speed)) ease-in-out infinite`
              : undefined,
          }}
        >
          {renderHexagonGrid()}
        </svg>
      </div>
      {variant === 'flowing-edges' && (
        <FlowingEdgesOverlay
          gridSize={gridSize}
          radius={radius}
          horizontalSpacing={horizontalSpacing}
          verticalSpacing={verticalSpacing}
          hexHeight={hexHeight}
          mousePosition={mousePosition}
          containerRef={containerRef}
          animationSpeed={animationSpeed}
        />
      )}
      {variant === 'mouse-trail' && (
        <MouseTrailOverlay
          gridSize={gridSize}
          radius={radius}
          horizontalSpacing={horizontalSpacing}
          verticalSpacing={verticalSpacing}
          hexHeight={hexHeight}
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
      )}
      {variant === 'gradient-flow' && (
        <GradientFlowOverlay
          gridSize={gridSize}
          radius={radius}
          horizontalSpacing={horizontalSpacing}
          verticalSpacing={verticalSpacing}
          animationSpeed={animationSpeed}
        />
      )}
    </>
  );
}

// Flowing Edges Overlay Component
function FlowingEdgesOverlay({
  gridSize,
  radius,
  horizontalSpacing,
  verticalSpacing,
  hexHeight,
  mousePosition,
  containerRef,
  animationSpeed,
}: {
  gridSize: number;
  radius: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  hexHeight: number;
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
  animationSpeed: number;
}) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; progress: number }>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const cols = Math.ceil(rect.width / horizontalSpacing) + 2;
    const rows = Math.ceil(rect.height / verticalSpacing) + 2;

    const newParticles: Array<{ id: number; x: number; y: number; progress: number }> = [];
    
    // Create particles along edges
    const spacing = Math.max(2, Math.floor(cols / 12));
    for (let i = 0; i < cols; i += spacing) {
      const offsetX = 0;
      const x = i * horizontalSpacing + offsetX + radius;
      newParticles.push({
        id: i,
        x,
        y: 0,
        progress: Math.random(),
      });
      newParticles.push({
        id: i + cols * 1000,
        x,
        y: rect.height,
        progress: Math.random(),
      });
    }

    for (let i = 0; i < rows; i += spacing) {
      const offsetX = i % 2 === 0 ? 0 : horizontalSpacing / 2;
      newParticles.push({
        id: i + cols * 2000,
        x: 0 + offsetX + radius,
        y: i * verticalSpacing + hexHeight / 2,
        progress: Math.random(),
      });
      newParticles.push({
        id: i + cols * 3000,
        x: rect.width + offsetX + radius,
        y: i * verticalSpacing + hexHeight / 2,
        progress: Math.random(),
      });
    }

    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          progress: (p.progress + 0.003 * animationSpeed) % 1,
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, [gridSize, horizontalSpacing, verticalSpacing, radius, hexHeight, containerRef, animationSpeed]);

  if (!containerRef.current) return null;
  const rect = containerRef.current.getBoundingClientRect();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" style={{ opacity: 0.5 }}>
        {particles.map((particle) => {
          const glowRadius = Math.sin(particle.progress * Math.PI * 2) * 2 + 1.5;
          const intensity = Math.sin(particle.progress * Math.PI * 2) * 0.3 + 0.2;
          
          return (
            <circle
              key={particle.id}
              cx={particle.x}
              cy={particle.y}
              r={glowRadius}
              fill={`rgba(0, 85, 204, ${intensity})`}
              style={{
                filter: 'blur(1.5px)',
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

// Mouse Trail Overlay Component
function MouseTrailOverlay({
  gridSize,
  radius,
  horizontalSpacing,
  verticalSpacing,
  hexHeight,
  mousePosition,
  containerRef,
}: {
  gridSize: number;
  radius: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  hexHeight: number;
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; opacity: number }>>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    if (
      mousePosition.x < rect.left ||
      mousePosition.x > rect.right ||
      mousePosition.y < rect.top ||
      mousePosition.y > rect.bottom
    ) {
      return;
    }

    const x = mousePosition.x - rect.left;
    const y = mousePosition.y - rect.top;

    // Snap to nearest hexagon center
    const row = Math.round((y - hexHeight / 2) / verticalSpacing);
    const offsetX = row % 2 === 0 ? 0 : horizontalSpacing / 2;
    const col = Math.round((x - offsetX - radius) / horizontalSpacing);
    const gridX = col * horizontalSpacing + offsetX + radius;
    const gridY = row * verticalSpacing + hexHeight / 2;

    setTrail((prev) => {
      const newTrail = [{ x: gridX, y: gridY, opacity: 1 }, ...prev.slice(0, 5)];
      return newTrail.map((point, i) => ({
        ...point,
        opacity: 1 - i * 0.15,
      }));
    });
  }, [mousePosition, horizontalSpacing, verticalSpacing, radius, hexHeight, containerRef]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        {trail.map((point, index) => {
          if (index === 0) return null;
          const prev = trail[index - 1];
          return (
            <line
              key={index}
              x1={prev.x}
              y1={prev.y}
              x2={point.x}
              y2={point.y}
              stroke="rgba(0, 85, 204, 0.5)"
              strokeWidth="2"
              opacity={point.opacity}
              style={{
                filter: 'blur(1px)',
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

// Gradient Flow Overlay Component
function GradientFlowOverlay({
  gridSize,
  radius,
  horizontalSpacing,
  verticalSpacing,
  animationSpeed,
}: {
  gridSize: number;
  radius: number;
  horizontalSpacing: number;
  verticalSpacing: number;
  animationSpeed: number;
}) {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `linear-gradient(135deg, rgba(0, 85, 204, 0.05) 0%, transparent 50%, rgba(250, 150, 25, 0.05) 100%)`,
        backgroundSize: '200% 200%',
        animation: `gradientFlow calc(10s / ${animationSpeed}) ease-in-out infinite`,
      }}
    />
  );
}
