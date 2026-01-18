'use client';

import { Button } from '@/core/primitives';

export interface HexagonGridControlsProps {
  gridSize: number;
  colorIntensity: number;
  animationSpeed: number;
  pulseEnabled: boolean;
  gap: number;
  onGridSizeChange: (size: number) => void;
  onColorIntensityChange: (intensity: number) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onPulseEnabledChange: (enabled: boolean) => void;
  onGapChange: (gap: number) => void;
  onReset: () => void;
}

export function HexagonGridControls({
  gridSize,
  colorIntensity,
  animationSpeed,
  pulseEnabled,
  gap,
  onGridSizeChange,
  onColorIntensityChange,
  onAnimationSpeedChange,
  onPulseEnabledChange,
  onGapChange,
  onReset,
}: HexagonGridControlsProps) {
  return (
    <div className="bg-[var(--background)]/95 backdrop-blur-sm border border-[var(--border)] rounded-lg shadow-lg p-6 space-y-6 min-w-[280px] transition-all duration-300">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--border)]">
        <h2 className="font-mono text-lg font-bold text-[var(--foreground)]">
          Grid Controls
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs hover:bg-[var(--background-secondary)] transition-colors"
        >
          Reset
        </Button>
      </div>

      {/* Grid Size */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-[var(--foreground)]">
            Grid Size
          </label>
          <span className="text-xs font-mono text-[var(--foreground-muted)]">
            {gridSize}px
          </span>
        </div>
        <input
          type="range"
          min="12"
          max="48"
          step="2"
          value={gridSize}
          onChange={(e) => onGridSizeChange(Number(e.target.value))}
          className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)] transition-all hover:bg-[var(--border-hover)]"
        />
        <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
          <span>12px</span>
          <span>48px</span>
        </div>
      </div>

      {/* Color Intensity */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-[var(--foreground)]">
            Color Intensity
          </label>
          <span className="text-xs font-mono text-[var(--foreground-muted)]">
            {(colorIntensity * 100).toFixed(0)}%
          </span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.3"
          step="0.01"
          value={colorIntensity}
          onChange={(e) => onColorIntensityChange(Number(e.target.value))}
          className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)] transition-all hover:bg-[var(--border-hover)]"
        />
        <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
          <span>1%</span>
          <span>30%</span>
        </div>
      </div>

      {/* Pulse Animation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[var(--foreground)]">
            Pulse Animation
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pulseEnabled}
              onChange={(e) => onPulseEnabledChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[var(--border)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--accent-primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-primary)]"></div>
          </label>
        </div>
        {pulseEnabled && (
          <div className="transition-all duration-300 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-[var(--foreground-muted)]">
                Speed
              </label>
              <span className="text-xs font-mono text-[var(--foreground-muted)]">
                {animationSpeed.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.25"
              max="3"
              step="0.25"
              value={animationSpeed}
              onChange={(e) => onAnimationSpeedChange(Number(e.target.value))}
              className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)] transition-all hover:bg-[var(--border-hover)]"
            />
            <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
              <span>0.25x</span>
              <span>3x</span>
            </div>
          </div>
        )}
      </div>

      {/* Distance/Gap */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-[var(--foreground)]">
            Distance / Gap
          </label>
          <span className="text-xs font-mono text-[var(--foreground-muted)]">
            {gap > 0 ? `+${gap.toFixed(1)}px` : `${gap.toFixed(1)}px`}
          </span>
        </div>
        <input
          type="range"
          min="-2"
          max="10"
          step="0.5"
          value={gap}
          onChange={(e) => onGapChange(Number(e.target.value))}
          className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)] transition-all hover:bg-[var(--border-hover)]"
        />
        <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
          <span>-2px</span>
          <span className="text-[var(--foreground-muted)]">0px (touch)</span>
          <span>10px</span>
        </div>
        <p className="text-xs text-[var(--foreground-muted)] mt-2">
          {gap === 0 
            ? 'Hexagons touch edge-to-edge'
            : gap > 0 
            ? 'Adds gap between hexagons'
            : 'Overlaps hexagons'}
        </p>
      </div>
    </div>
  );
}

