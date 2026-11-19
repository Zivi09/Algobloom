import React from 'react';
import { TraceStep } from '../types';

interface ArrayBarVisualizerProps {
  currentStep: TraceStep;
  maxVal?: number;
}

export const ArrayBarVisualizer: React.FC<ArrayBarVisualizerProps> = ({ currentStep, maxVal: propMax }) => {
  const array = currentStep.array || [10, 20, 30, 40, 50];
  const max = propMax || Math.max(...array, 50);

  // Helper to determine semantic bar color based on design system
  const getBarColor = (index: number) => {
    if (currentStep.sortedIndices?.includes(index)) {
      return 'bg-sagegreen text-white border-sagegreen-500 shadow-sage-glow'; // Completed: Sage Green #939F7F
    }
    if (currentStep.swappedIndices?.includes(index)) {
      return 'bg-dustyrose text-garden-text border-dustyrose-500 shadow-garden-glow animate-pulse'; // Swapped: Dusty Rose
    }
    if (currentStep.comparingIndices?.includes(index)) {
      return 'bg-buttercream text-garden-text border-amber-300 ring-2 ring-buttercream-400'; // Comparing: Buttercream
    }
    if (currentStep.highlightedIndices?.includes(index)) {
      return 'bg-softmauve text-white border-softmauve-400'; // Selected: Soft Mauve
    }
    return 'bg-mistylavender/70 dark:bg-mistylavender/30 text-garden-text dark:text-mistylavender-100 border-mistylavender-300 dark:border-mistylavender-600'; // Unvisited: Misty Lavender
  };

  return (
    <div className="w-full bg-white dark:bg-garden-darkcard rounded-2xl p-6 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col justify-between">
      {/* Counters & stats banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm">
        <div className="flex items-center gap-4">
          <span className="font-medium text-garden-secondary dark:text-garden-darksecondary">
            Array Length: <strong className="text-garden-text dark:text-garden-darktext">{array.length}</strong>
          </span>
          {currentStep.comparisonsCount !== undefined && (
            <span className="px-2.5 py-1 rounded-full bg-buttercream/50 text-amber-900 font-semibold border border-buttercream-400">
              Comparisons: {currentStep.comparisonsCount}
            </span>
          )}
          {currentStep.swapsCount !== undefined && (
            <span className="px-2.5 py-1 rounded-full bg-dustyrose/50 text-red-950 font-semibold border border-dustyrose-400">
              Swaps: {currentStep.swapsCount}
            </span>
          )}
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-mistylavender inline-block"></span> Unvisited
          </span>
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-buttercream inline-block"></span> Comparing
          </span>
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-dustyrose inline-block"></span> Active / Swap
          </span>
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-sagegreen inline-block"></span> Sorted
          </span>
        </div>
      </div>

      {/* Visualizer bars arena */}
      <div className="h-64 sm:h-72 w-full flex items-end justify-center gap-2 sm:gap-3 px-2 pt-8 pb-2">
        {array.map((value, idx) => {
          const heightPercent = Math.max(14, Math.round((value / max) * 88));
          const colorClass = getBarColor(idx);

          // Check if any pointers point to this index
          const activePointers = currentStep.pointers
            ? Object.entries(currentStep.pointers).filter(([_, targetIdx]) => targetIdx === idx)
            : [];

          return (
            <div key={idx} className="flex-1 flex flex-col items-center max-w-[56px] h-full justify-end relative group">
              {/* Pointer labels above bar */}
              {activePointers.length > 0 && (
                <div className="absolute -top-7 flex flex-col items-center z-10 animate-bounce">
                  <div className="flex gap-1">
                    {activePointers.map(([pointerName]) => (
                      <span
                        key={pointerName}
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-dustyrose text-garden-text shadow-sm"
                      >
                        {pointerName}
                      </span>
                    ))}
                  </div>
                  <span className="text-dustyrose text-[10px] leading-none">▼</span>
                </div>
              )}

              {/* Bar element */}
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-xl transition-all duration-300 border flex flex-col justify-between items-center py-2 ${colorClass}`}
              >
                <span className="font-semibold text-xs sm:text-sm">{value}</span>
              </div>

              {/* Index label below */}
              <span className="mt-2 text-[11px] font-mono text-garden-secondary dark:text-garden-darksecondary">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
