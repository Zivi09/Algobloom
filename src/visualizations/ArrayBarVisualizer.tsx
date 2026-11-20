import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, ArrowLeftRight } from 'lucide-react';
import { TraceStep } from '../types';
import { soundService } from '../services/soundService';
import { ProgressService } from '../services/progressService';
import { FlipArrayBar } from './FlipArrayBar';

export interface ArrayBarVisualizerProps {
  currentStep: TraceStep;
  maxVal?: number;
  speedMs?: number;
  animationSpeed?: 'slow' | 'normal' | 'fast';
  showSoundToggle?: boolean;
}

interface SwapArcState {
  isActive: boolean;
  idxA: number;
  idxB: number;
  xA: number;
  xB: number;
  deltaX: number;
}

export const ArrayBarVisualizer: React.FC<ArrayBarVisualizerProps> = ({
  currentStep,
  maxVal: propMax,
  speedMs,
  animationSpeed: propSpeed,
  showSoundToggle = true,
}) => {
  const array = currentStep.array || [10, 20, 30, 40, 50];
  const max = propMax || Math.max(...array, 50);

  // Sound state
  const [soundEnabled, setSoundEnabled] = useState(() => soundService.isSoundEnabled());

  const handleToggleSound = () => {
    const nextState = soundService.toggleMute();
    setSoundEnabled(nextState);
  };

  // DOM Refs for FLIP Physics calculation
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevPositionsRef = useRef<Map<number, number>>(new Map());
  const prevStepIdxRef = useRef<number | null>(null);
  const activeAnimationsRef = useRef<Animation[]>([]);
  const swapTimeoutRef = useRef<any>(null);

  // Visual Swap Arc State for SVG overlay
  const [swapArc, setSwapArc] = useState<SwapArcState | null>(null);

  // Determine animation duration respecting props or settings
  const getDuration = (): number => {
    if (speedMs !== undefined && speedMs > 0) {
      // Scale animation to take ~65% of the step interval, clamped between 180ms and 750ms
      return Math.max(180, Math.min(Math.round(speedMs * 0.65), 750));
    }
    const speedSetting =
      propSpeed ||
      (() => {
        try {
          return ProgressService.getInstance().getProgress().settings.animationSpeed;
        } catch {
          return 'normal';
        }
      })();

    switch (speedSetting) {
      case 'slow':
        return 720;
      case 'fast':
        return 280;
      case 'normal':
      default:
        return 460;
    }
  };

  // Helper to determine semantic bar color based on design system
  const getBarColor = (index: number) => {
    if (currentStep.sortedIndices?.includes(index)) {
      return 'bg-sagegreen text-white border-sagegreen-500 shadow-sage-glow'; // Completed: Sage Green #939F7F
    }
    if (currentStep.swappedIndices?.includes(index)) {
      return 'bg-dustyrose text-garden-text border-dustyrose-500 shadow-garden-glow'; // Swapped: Dusty Rose #F1B4B1
    }
    if (currentStep.comparingIndices?.includes(index)) {
      return 'bg-buttercream text-garden-text border-amber-300 ring-2 ring-buttercream-400'; // Comparing: Buttercream
    }
    if (currentStep.highlightedIndices?.includes(index)) {
      return 'bg-softmauve text-white border-softmauve-400'; // Selected: Soft Mauve
    }
    return 'bg-mistylavender/70 dark:bg-mistylavender/30 text-garden-text dark:text-mistylavender-100 border-mistylavender-300 dark:border-mistylavender-600'; // Unvisited: Misty Lavender
  };

  // FLIP (First-Last-Invert-Play) Physical Swap Animation Engine
  useLayoutEffect(() => {
    const isStepChange = prevStepIdxRef.current !== currentStep.step;
    prevStepIdxRef.current = currentStep.step;

    // Clear any previous swap clear timeout
    if (swapTimeoutRef.current) {
      clearTimeout(swapTimeoutRef.current);
      swapTimeoutRef.current = null;
    }

    // Cancel running Web Animations to avoid transform residue on rapid scrub/play
    activeAnimationsRef.current.forEach((anim) => {
      try {
        anim.cancel();
      } catch {
        // Ignore if already finished
      }
    });
    activeAnimationsRef.current = [];

    const duration = getDuration();
    const springEasing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

    // Check if current step includes a swap pair
    const swapped = currentStep.swappedIndices;
    const hasSwap = Boolean(swapped && swapped.length >= 2 && isStepChange);

    if (hasSwap && swapped) {
      const idxA = Math.min(swapped[0], swapped[1]);
      const idxB = Math.max(swapped[0], swapped[1]);

      const slotElA = slotRefs.current[idxA];
      const slotElB = slotRefs.current[idxB];
      const barElA = barRefs.current[idxA];
      const barElB = barRefs.current[idxB];

      if (slotElA && slotElB && barElA && barElB) {
        const rectA = slotElA.getBoundingClientRect();
        const rectB = slotElB.getBoundingClientRect();

        // Calculate exact horizontal delta between slots:
        // Element now at slot A came from slot B: deltaA = oldLeft (B) - newLeft (A)
        const deltaA = rectB.left - rectA.left;
        // Element now at slot B came from slot A: deltaB = oldLeft (A) - newLeft (B)
        const deltaB = rectA.left - rectB.left;

        // Calculate arena-relative coordinates for SVG bridge overlay
        if (arenaRef.current) {
          const arenaRect = arenaRef.current.getBoundingClientRect();
          const centerA = rectA.left + rectA.width / 2 - arenaRect.left;
          const centerB = rectB.left + rectB.width / 2 - arenaRect.left;

          setSwapArc({
            isActive: true,
            idxA,
            idxB,
            xA: centerA,
            xB: centerB,
            deltaX: Math.abs(deltaA),
          });

          // Clear arc after animation finishes
          swapTimeoutRef.current = setTimeout(() => {
            setSwapArc((prev) => (prev ? { ...prev, isActive: false } : null));
          }, duration + 50);
        }

        // Apply physical FLIP translation via Web Animations API with spring physics
        const playFlip = (
          element: HTMLDivElement,
          deltaX: number,
          isHigher: boolean
        ) => {
          const liftY = isHigher ? -12 : -5;
          const scaleVal = isHigher ? 1.07 : 1.02;

          if (typeof element.animate === 'function') {
            const animation = element.animate(
              [
                // Invert (First position displacement)
                {
                  transform: `translateX(${deltaX}px) translateY(0px) scale(1)`,
                  boxShadow: '0 0 0 rgba(241, 180, 177, 0)',
                  filter: 'blur(0px)',
                },
                // Mid-flight physical arc lift, motion blur, and Dusty Rose elevated glow
                {
                  transform: `translateX(${deltaX * 0.52}px) translateY(${liftY}px) scale(${scaleVal})`,
                  boxShadow: isHigher
                    ? '0 16px 32px -4px rgba(241, 180, 177, 0.75), 0 0 24px rgba(241, 180, 177, 0.55)'
                    : '0 8px 18px -2px rgba(241, 180, 177, 0.5), 0 0 16px rgba(241, 180, 177, 0.35)',
                  filter: 'blur(0.35px)',
                  offset: 0.48,
                },
                // Play to destination (Last natural slot) with organic spring settling
                {
                  transform: 'translateX(0px) translateY(0px) scale(1)',
                  boxShadow: '0 0 0 rgba(241, 180, 177, 0)',
                  filter: 'blur(0px)',
                },
              ],
              {
                duration,
                easing: springEasing,
                fill: 'forwards',
              }
            );

            activeAnimationsRef.current.push(animation);
            animation.onfinish = () => {
              element.style.transform = '';
            };
          } else {
            // CSS Fallback if Web Animations API is absent
            element.style.transform = `translateX(${deltaX}px) translateY(0) scale(1)`;
            element.style.transition = 'none';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                element.style.transition = `transform ${duration}ms ${springEasing}`;
                element.style.transform = 'translateX(0) translateY(0) scale(1)';
              });
            });
          }
        };

        // Bar A lifts in the foreground (higher), Bar B passes underneath
        playFlip(barElA, deltaA, true);
        playFlip(barElB, deltaB, false);
      }
    } else if (!hasSwap) {
      setSwapArc(null);
    }

    // Record slot positions for future displacement queries
    slotRefs.current.forEach((el, idx) => {
      if (el) {
        prevPositionsRef.current.set(idx, el.getBoundingClientRect().left);
      }
    });
  }, [currentStep.step, currentStep.swappedIndices, speedMs, propSpeed]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (swapTimeoutRef.current) {
        clearTimeout(swapTimeoutRef.current);
      }
    };
  }, []);

  const isSwappingIndex = (idx: number) => Boolean(currentStep.swappedIndices?.includes(idx));

  return (
    <div className="w-full bg-white dark:bg-garden-darkcard rounded-2xl p-6 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col justify-between relative overflow-hidden">
      {/* Counters & stats banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
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

          {/* Active FLIP Physics Badge */}
          {swapArc?.isActive && (
            <span className="px-2.5 py-1 rounded-full bg-dustyrose text-garden-text font-bold text-xs flex items-center gap-1.5 shadow-sm border border-dustyrose-400 animate-pulse">
              <ArrowLeftRight size={12} />
              <span>FLIP Swap: [{swapArc.idxA}] ⇄ [{swapArc.idxB}]</span>
            </span>
          )}
        </div>

        {/* Legend pills & acoustic sound toggle */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          {showSoundToggle && (
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? 'Mute Sonification' : 'Enable Kalimba Sonification'}
              className={`px-2.5 py-1 rounded-xl border transition-all flex items-center gap-1.5 font-medium ${
                soundEnabled
                  ? 'bg-sagegreen/20 border-sagegreen text-sagegreen-800 dark:text-sagegreen-200'
                  : 'bg-garden-bg dark:bg-garden-darkbg border-garden-cardborder dark:border-garden-darkcardborder text-garden-secondary'
              }`}
            >
              {soundEnabled ? (
                <Volume2 size={13} className="text-sagegreen-600 dark:text-sagegreen-400" />
              ) : (
                <VolumeX size={13} />
              )}
              <span className="text-[11px] hidden sm:inline">{soundEnabled ? 'Acoustic ON' : 'Muted'}</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2">
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
      </div>

      {/* Visualizer bars arena */}
      <div
        ref={arenaRef}
        className="h-64 sm:h-72 w-full flex items-end justify-center gap-1.5 sm:gap-3 px-2 pt-10 pb-2 relative"
      >
        {/* SVG Swap Arc Bridge Overlay */}
        {swapArc?.isActive && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
            <defs>
              <linearGradient id="swapArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F1B4B1" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#DC6C66" stopOpacity="1" />
                <stop offset="100%" stopColor="#F1B4B1" stopOpacity="0.9" />
              </linearGradient>
              <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Bezier trajectory arc */}
            {(() => {
              const startX = swapArc.xA;
              const endX = swapArc.xB;
              const midX = (startX + endX) / 2;
              const arcY = 24;
              const apexY = Math.max(2, arcY - Math.min(36, Math.abs(endX - startX) * 0.22));

              return (
                <g filter="url(#arcGlow)">
                  <path
                    d={`M ${startX} ${arcY} Q ${midX} ${apexY} ${endX} ${arcY}`}
                    fill="none"
                    stroke="url(#swapArcGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    className="animate-pulse"
                  />
                  {/* Interchange Badge at Arc Apex */}
                  <g transform={`translate(${midX}, ${apexY - 2})`}>
                    <circle r="9" fill="#F1B4B1" stroke="#DC6C66" strokeWidth="1.5" />
                    <text
                      textAnchor="middle"
                      dy="3.5"
                      fontSize="9"
                      fontWeight="bold"
                      fill="#1B2B1D"
                    >
                      ⇄
                    </text>
                  </g>
                </g>
              );
            })()}
          </svg>
        )}

        {/* Array Bars */}
        {array.map((value, idx) => {
          const heightPercent = Math.max(14, Math.round((value / max) * 88));
          const colorClass = getBarColor(idx);
          const isSwapping = isSwappingIndex(idx);

          // Determine swap role for depth layering
          let swapRole: 'higher' | 'lower' | null = null;
          if (isSwapping && currentStep.swappedIndices) {
            const minIdx = Math.min(...currentStep.swappedIndices);
            swapRole = idx === minIdx ? 'higher' : 'lower';
          }

          // Check if any pointers point to this index
          const activePointers = currentStep.pointers
            ? Object.entries(currentStep.pointers).filter(([_, targetIdx]) => targetIdx === idx)
            : [];

          return (
            <FlipArrayBar
              key={idx}
              value={value}
              index={idx}
              heightPercent={heightPercent}
              colorClass={colorClass}
              isSwapping={isSwapping}
              swapRole={swapRole}
              activePointers={activePointers as [string, number][]}
              onSlotRef={(el) => {
                slotRefs.current[idx] = el;
              }}
              onBarRef={(el) => {
                barRefs.current[idx] = el;
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
