'use client';

import { useState } from 'react';
import { AnimatedGrid } from './components/AnimatedGrid';
import { HexagonGridControls } from './components/HexagonGridControls';

export default function GridExplorePage() {
  const [gridSize, setGridSize] = useState(24);
  const [colorIntensity, setColorIntensity] = useState(0.15);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [pulseEnabled, setPulseEnabled] = useState(true);
  const [gap, setGap] = useState(0);

  const handleReset = () => {
    setGridSize(24);
    setColorIntensity(0.15);
    setAnimationSpeed(1);
    setPulseEnabled(true);
    setGap(0);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <AnimatedGrid
        variant={pulseEnabled ? 'pulsing' : undefined}
        gridSize={gridSize}
        colorIntensity={colorIntensity}
        animationSpeed={animationSpeed}
        gap={gap}
        className="w-full h-screen"
      />
      
      {/* Controls Panel */}
      <div className="fixed top-4 right-4 z-50">
        <HexagonGridControls
          gridSize={gridSize}
          colorIntensity={colorIntensity}
          animationSpeed={animationSpeed}
          pulseEnabled={pulseEnabled}
          gap={gap}
          onGridSizeChange={setGridSize}
          onColorIntensityChange={setColorIntensity}
          onAnimationSpeedChange={setAnimationSpeed}
          onPulseEnabledChange={setPulseEnabled}
          onGapChange={setGap}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
