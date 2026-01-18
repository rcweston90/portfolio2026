'use client';

import { Button } from '@/core/primitives';

export interface GridControlsProps {
  gridSize: number;
  colorIntensity: number;
  animationSpeed: number;
  enabledVariations: Set<string>;
  onGridSizeChange: (size: number) => void;
  onColorIntensityChange: (intensity: number) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onEnabledVariationsChange: (variations: Set<string>) => void;
}

const variationOptions = [
  { id: 'pulsing', label: 'Pulsing' },
  { id: 'flowing-edges', label: 'Flowing Edges' },
  { id: 'mouse-trail', label: 'Mouse Trail' },
  { id: 'scroll-wave', label: 'Scroll Wave' },
  { id: 'interactive-cells', label: 'Interactive Cells' },
  { id: 'gradient-flow', label: 'Gradient Flow' },
];

export function GridControls({
  gridSize,
  colorIntensity,
  animationSpeed,
  enabledVariations,
  onGridSizeChange,
  onColorIntensityChange,
  onAnimationSpeedChange,
  onEnabledVariationsChange,
}: GridControlsProps) {
  const toggleVariation = (id: string) => {
    const newSet = new Set(enabledVariations);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    onEnabledVariationsChange(newSet);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-mono text-xl font-bold text-[var(--foreground)]">
        Grid Controls
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Grid Size */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Grid Size: {gridSize}px
          </label>
          <input
            type="range"
            min="12"
            max="48"
            step="4"
            value={gridSize}
            onChange={(e) => onGridSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
            <span>12px</span>
            <span>48px</span>
          </div>
        </div>

        {/* Color Intensity */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Color Intensity: {(colorIntensity * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0.01"
            max="0.15"
            step="0.01"
            value={colorIntensity}
            onChange={(e) => onColorIntensityChange(Number(e.target.value))}
            className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
            <span>1%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Animation Speed */}
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Animation Speed: {animationSpeed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.25"
            max="3"
            step="0.25"
            value={animationSpeed}
            onChange={(e) => onAnimationSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--foreground-muted)] mt-1">
            <span>0.25x</span>
            <span>3x</span>
          </div>
        </div>
      </div>

      {/* Variation Toggles */}
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-3">
          Enable Variations
        </label>
        <div className="flex flex-wrap gap-2">
          {variationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleVariation(option.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                enabledVariations.has(option.id)
                  ? 'bg-[var(--accent-primary)] text-white'
                  : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[var(--accent-primary)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

