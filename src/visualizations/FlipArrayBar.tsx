import React from 'react';

export interface FlipArrayBarProps {
  value: number;
  index: number;
  heightPercent: number;
  colorClass: string;
  isSwapping: boolean;
  swapRole?: 'higher' | 'lower' | null;
  activePointers?: [string, number][];
  onSlotRef: (el: HTMLDivElement | null) => void;
  onBarRef: (el: HTMLDivElement | null) => void;
}

export const FlipArrayBar: React.FC<FlipArrayBarProps> = ({
  value,
  index,
  heightPercent,
  colorClass,
  isSwapping,
  swapRole,
  activePointers = [],
  onSlotRef,
  onBarRef,
}) => {
  return (
    <div
      ref={onSlotRef}
      data-index={index}
      className="flex-1 flex flex-col items-center max-w-[56px] min-w-[24px] h-full justify-end relative select-none group"
    >
      {/* Active pointer tags above bar */}
      {activePointers.length > 0 && (
        <div className="absolute -top-7 flex flex-col items-center z-20 animate-bounce pointer-events-none">
          <div className="flex gap-1 flex-wrap justify-center">
            {activePointers.map(([pointerName]) => (
              <span
                key={pointerName}
                className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-dustyrose text-garden-text shadow-sm border border-dustyrose-400"
              >
                {pointerName}
              </span>
            ))}
          </div>
          <span className="text-dustyrose text-[10px] leading-none">▼</span>
        </div>
      )}

      {/* Physical Motion Wrapper for FLIP Translation & Arc Lift */}
      <div
        ref={onBarRef}
        data-bar-index={index}
        className={`w-full flex flex-col items-center justify-end relative will-change-transform ${
          isSwapping ? (swapRole === 'higher' ? 'z-40' : 'z-30') : 'z-10'
        }`}
        style={{
          transformOrigin: 'bottom center',
        }}
      >
        {/* Swap motion trail / glow ring cue */}
        {isSwapping && (
          <div
            className={`absolute inset-x-0 bottom-0 pointer-events-none rounded-t-xl animate-pulse transition-opacity duration-300 ${
              swapRole === 'higher' ? 'opacity-70' : 'opacity-40'
            }`}
            style={{
              height: `${heightPercent}%`,
              boxShadow: '0 0 20px 4px rgba(241, 180, 177, 0.65)',
            }}
          />
        )}

        {/* The Bar Pillar */}
        <div
          style={{ height: `${heightPercent}%` }}
          className={`w-full rounded-t-xl transition-colors duration-200 border flex flex-col justify-between items-center py-2 relative overflow-hidden ${colorClass} ${
            isSwapping ? 'shadow-garden-glow border-dustyrose-400 ring-2 ring-dustyrose/50' : ''
          }`}
        >
          {/* Subtle botanical highlight sheen */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-white/30 rounded-t-xl pointer-events-none" />

          {/* Bar value badge */}
          <span className="font-semibold text-xs sm:text-sm tracking-tight z-10 drop-shadow-sm">
            {value}
          </span>

          {/* Subtle vertical wood/stem grain texture */}
          <div className="w-0.5 h-1/3 bg-white/20 rounded-full my-auto pointer-events-none" />
        </div>

        {/* Physical ground contact shadow underneath the bar */}
        <div
          className={`w-4/5 h-1.5 rounded-full mt-0.5 transition-all duration-300 ${
            isSwapping
              ? 'bg-dustyrose-400/40 blur-[1px] scale-90'
              : 'bg-garden-text/15 dark:bg-black/30'
          }`}
        />
      </div>

      {/* Index label below slot */}
      <span className="mt-1 text-[10px] sm:text-[11px] font-mono text-garden-secondary dark:text-garden-darksecondary">
        [{index}]
      </span>
    </div>
  );
};
