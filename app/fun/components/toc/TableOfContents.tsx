import { useRef, useState, useLayoutEffect, useMemo, useEffect, useId } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import './TableOfContents.css';

export interface TocItem {
  id: string;
  label: string;
  children?: TocItem[];
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

interface FlatItem {
  item: TocItem;
  depth: number;
}

function flattenItems(items: TocItem[], depth = 0): FlatItem[] {
  const result: FlatItem[] = [];
  for (const item of items) {
    result.push({ item, depth });
    if (item.children) {
      result.push(...flattenItems(item.children, depth + 1));
    }
  }
  return result;
}

const BASE_X = 12;
const INDENT_WIDTH = 28;
const ANTICIPATION_DELAY = 50; // ms delay before movement starts

// Build SVG path with 45-degree diagonal transitions between depth levels
function buildFullPath(allPositions: { y: number; x: number }[]): string {
  if (allPositions.length === 0) return '';

  let path = `M ${allPositions[0].x} ${allPositions[0].y}`;
  let currentX = allPositions[0].x;
  let currentY = allPositions[0].y;

  for (let i = 1; i < allPositions.length; i++) {
    const targetX = allPositions[i].x;
    const targetY = allPositions[i].y;

    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;

    if (Math.abs(deltaX) > 0.5 && deltaY > 0) {
      if (deltaX > 0) {
        const diagonalDist = Math.min(Math.abs(deltaX), deltaY * 0.5);
        const verticalStop = targetY - diagonalDist;
        if (verticalStop > currentY + 1) {
          path += ` L ${currentX} ${verticalStop}`;
        }
        path += ` L ${targetX} ${targetY}`;
      } else {
        const diagonalDist = Math.min(Math.abs(deltaX), deltaY * 0.5);
        const diagonalEndY = currentY + diagonalDist;
        path += ` L ${targetX} ${diagonalEndY}`;
        if (targetY > diagonalEndY + 1) {
          path += ` L ${targetX} ${targetY}`;
        }
      }
    } else {
      path += ` L ${targetX} ${targetY}`;
    }

    currentX = targetX;
    currentY = targetY;
  }

  return path;
}

export function TableOfContents({ items, activeId, onItemClick }: TableOfContentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [showLine, setShowLine] = useState(false);
  const [fullPath, setFullPath] = useState('');
  const [totalLength, setTotalLength] = useState(0);

  // Single progress value from 0 to 1 - the node position along the path
  const progress = useMotionValue(0);

  // Node scale for pulse effect on arrival
  const nodeScale = useMotionValue(1);

  // Unique IDs for SVG defs (safe for multiple instances)
  const instanceId = useId();
  const gradientId = `trail-gradient-${instanceId}`;
  const filterId = `node-glow-${instanceId}`;

  const flatItems = useMemo(() => flattenItems(items), [items]);

  // Calculate length to each item waypoint
  const waypointLengthsRef = useRef<number[]>([]);

  // Timeout ref for cleanup
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compute node position and trail length from progress
  const nodeX = useMotionValue(BASE_X);
  const nodeY = useMotionValue(0);
  const trailLength = useMotionValue(0);

  // Update node position as progress changes
  useEffect(() => {
    const unsubscribe = progress.on('change', (p) => {
      if (pathRef.current && totalLength > 0) {
        const currentLength = p * totalLength;
        try {
          const point = pathRef.current.getPointAtLength(currentLength);
          nodeX.set(point.x);
          nodeY.set(point.y);
          trailLength.set(currentLength);
        } catch (e) {
          // Path not ready
        }
      }
    });
    return () => unsubscribe();
  }, [progress, totalLength, nodeX, nodeY, trailLength]);

  // Dashoffset for trail - reveals from start to current position
  const strokeDashoffset = useMotionValue(totalLength);

  // Update dashoffset when trailLength changes
  useEffect(() => {
    const unsubscribe = trailLength.on('change', (len) => {
      strokeDashoffset.set(totalLength - len);
    });
    return () => unsubscribe();
  }, [trailLength, totalLength, strokeDashoffset]);

  useLayoutEffect(() => {
    // Clean up any pending animation timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    if (!containerRef.current || !activeId) {
      setShowLine(false);
      return;
    }

    const activeIndex = flatItems.findIndex(f => f.item.id === activeId);
    if (activeIndex === -1) {
      setShowLine(false);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();

    // Build positions for ALL items
    const allPositions: { y: number; x: number }[] = [];
    for (let i = 0; i < flatItems.length; i++) {
      const el = itemRefs.current.get(flatItems[i].item.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const y = rect.top + rect.height / 2 - containerRect.top;
        const x = BASE_X + flatItems[i].depth * INDENT_WIDTH;
        allPositions.push({ y, x });
      }
    }

    if (allPositions.length === 0) {
      setShowLine(false);
      return;
    }

    // Build the FULL path (entire tree)
    const path = buildFullPath(allPositions);
    setFullPath(path);
    setShowLine(true);

    // Wait for path to render, then calculate lengths
    requestAnimationFrame(() => {
      if (pathRef.current) {
        const pathTotalLength = pathRef.current.getTotalLength();
        setTotalLength(pathTotalLength);

        // Calculate length to each waypoint
        const lengths: number[] = [];
        let accumulatedLength = 0;

        for (let i = 0; i < allPositions.length; i++) {
          if (i === 0) {
            lengths.push(0);
          } else {
            const prev = allPositions[i - 1];
            const curr = allPositions[i];
            const dx = curr.x - prev.x;
            const dy = curr.y - prev.y;

            let segmentLength = Math.sqrt(dx * dx + dy * dy);
            if (Math.abs(dx) > 0.5 && dy > 0) {
              const diagonalDist = Math.min(Math.abs(dx), dy * 0.5);
              segmentLength = (dy - diagonalDist) + Math.sqrt(2) * diagonalDist;
            }

            accumulatedLength += segmentLength;
            lengths.push(accumulatedLength);
          }
        }

        const scale = pathTotalLength / (accumulatedLength || 1);
        waypointLengthsRef.current = lengths.map(l => l * scale);

        const targetLength = waypointLengthsRef.current[activeIndex] || 0;
        const targetProgress = pathTotalLength > 0 ? targetLength / pathTotalLength : 0;

        const currentProgress = progress.get();
        const distance = Math.abs(targetProgress - currentProgress);

        // Snappier easing curve with slight overshoot feel
        // [0.22, 1.2, 0.36, 1] gives a slight "bounce" at the end
        const easeSnappy: [number, number, number, number] = [0.22, 1, 0.36, 1];

        // Duration scales with distance but stays snappy
        const duration = Math.max(0.25, Math.min(0.6, distance * 1.5));

        // Anticipation pulse - slight shrink
        animate(nodeScale, 0.85, {
          type: 'tween',
          duration: ANTICIPATION_DELAY / 1000,
          ease: 'easeOut',
        });

        // After anticipation, start the main animation
        animationTimeoutRef.current = setTimeout(() => {
          // Scale back up as we start moving
          animate(nodeScale, 1, {
            type: 'tween',
            duration: duration * 0.3,
            ease: 'easeOut',
          });

          // Main movement animation
          animate(progress, targetProgress, {
            type: 'tween',
            duration,
            ease: easeSnappy,
            onComplete: () => {
              // Arrival pulse - scale up then back to normal
              animate(nodeScale, 1.25, {
                type: 'tween',
                duration: 0.1,
                ease: 'easeOut',
              }).then(() => {
                animate(nodeScale, 1, {
                  type: 'tween',
                  duration: 0.15,
                  ease: [0.34, 1.56, 0.64, 1], // Bouncy settle
                });
              });
            },
          });
        }, ANTICIPATION_DELAY);
      }
    });
  }, [activeId, flatItems, progress, nodeScale]);

  const setItemRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(id, el);
    } else {
      itemRefs.current.delete(id);
    }
  };

  // Hexagon points (centered at 0,0 for easier positioning)
  const hexSize = 5;
  const hexagonPoints = `0,${-hexSize} ${hexSize * 0.866},${-hexSize * 0.5} ${hexSize * 0.866},${hexSize * 0.5} 0,${hexSize} ${-hexSize * 0.866},${hexSize * 0.5} ${-hexSize * 0.866},${-hexSize * 0.5}`;

  return (
    <nav className="toc">
      <div className="toc-header">
        <svg className="toc-icon" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <line x1="8" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="15" x2="13" y2="15" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="toc-title">On This Page</span>
      </div>
      <div className="toc-content" ref={containerRef}>
        <svg className="toc-track-svg" style={{ opacity: showLine ? 1 : 0 }}>
          {/* Gradient definition for trail fade */}
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fff" stopOpacity="1" />
            </linearGradient>
            {/* Glow filter for node */}
            <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Trail - the line behind the node with gradient */}
          <motion.path
            ref={pathRef}
            d={fullPath}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={totalLength || 1}
            style={{ strokeDashoffset }}
          />

          {/* Node - hexagon that leads the animation with glow */}
          <motion.g
            style={{
              x: nodeX,
              y: nodeY,
              scale: nodeScale,
            }}
            filter={`url(#${filterId})`}
          >
            <polygon
              points={hexagonPoints}
              fill="#fff"
              className="toc-node"
            />
          </motion.g>
        </svg>

        <div className="toc-items">
          {flatItems.map(({ item, depth }) => (
            <div
              key={item.id}
              ref={setItemRef(item.id)}
              className={`toc-row depth-${depth}`}
            >
              <button
                className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                style={{ paddingLeft: `${24 + depth * INDENT_WIDTH}px` }}
                onClick={() => onItemClick?.(item.id)}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default TableOfContents;
