import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sliders,
  CheckCircle2,
  Compass,
  Lightbulb,
  Zap,
  HelpCircle,
  Volume2,
  BookOpen,
} from 'lucide-react';
import { AlgorithmDemoInfo, getAlgorithmDemo, PLAYGROUND_ALGORITHMS_DATA } from './playgroundDemoData';
import { soundService } from '../../services/soundService';

export interface PlaygroundTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLab: 'sorting' | 'graph' | 'tree' | 'search' | 'dp';
  selectedSortAlgo: string;
  selectedSearchAlgo: string;
  selectedGraphAlgo: string;
  treeAction: string;
  selectedDpProblem: string;
  onSelectSortAlgo: (algo: any) => void;
  onSelectSearchAlgo: (algo: any) => void;
  onSelectGraphAlgo: (algo: any) => void;
  onSelectTreeAction: (action: any) => void;
  onSelectDpProblem: (problem: any) => void;
  onTriggerDemoPlay: () => void;
  onResetTrace: () => void;
}

interface TourStep {
  targetId: string;
  title: string;
  subtitle: string;
  icon: string;
  content: React.ReactNode;
}

export const PlaygroundTourModal: React.FC<PlaygroundTourModalProps> = ({
  isOpen,
  onClose,
  activeLab,
  selectedSortAlgo,
  selectedSearchAlgo,
  selectedGraphAlgo,
  treeAction,
  selectedDpProblem,
  onSelectSortAlgo,
  onSelectSearchAlgo,
  onSelectGraphAlgo,
  onSelectTreeAction,
  onSelectDpProblem,
  onTriggerDemoPlay,
  onResetTrace,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [demoRunning, setDemoRunning] = useState(false);

  // Determine active algorithm key for demo information
  const getActiveAlgoKey = () => {
    if (activeLab === 'sorting') return selectedSortAlgo;
    if (activeLab === 'search') return selectedSearchAlgo;
    if (activeLab === 'graph') return selectedGraphAlgo;
    if (activeLab === 'tree') return treeAction === 'search' ? 'tree-search' : 'tree-inorder';
    if (activeLab === 'dp') return selectedDpProblem;
    return 'selection';
  };

  const activeAlgoKey = getActiveAlgoKey();
  const [inspectedAlgoKey, setInspectedAlgoKey] = useState<string>(activeAlgoKey);

  // Sync inspected algorithm with active one when lab or selection changes
  useEffect(() => {
    setInspectedAlgoKey(getActiveAlgoKey());
  }, [activeLab, selectedSortAlgo, selectedSearchAlgo, selectedGraphAlgo, treeAction, selectedDpProblem]);

  const algoDemo: AlgorithmDemoInfo =
    PLAYGROUND_ALGORITHMS_DATA[inspectedAlgoKey] || getAlgorithmDemo(activeAlgoKey, activeLab);

  // Handle switching algorithm from within the demo
  const handleSwitchAlgo = (newKey: string) => {
    setInspectedAlgoKey(newKey);
    soundService.playChirp();
    if (activeLab === 'sorting') onSelectSortAlgo(newKey);
    else if (activeLab === 'search') onSelectSearchAlgo(newKey);
    else if (activeLab === 'graph') onSelectGraphAlgo(newKey);
    else if (activeLab === 'tree') onSelectTreeAction(newKey === 'tree-search' ? 'search' : 'inorder');
    else if (activeLab === 'dp') onSelectDpProblem(newKey);
  };

  // Run quick live demonstration
  const handleRunMiniDemo = () => {
    setDemoRunning(true);
    soundService.playTone(659.25, { type: 'marimba', gain: 0.2 });
    onTriggerDemoPlay();
    setTimeout(() => {
      setDemoRunning(false);
    }, 3800);
  };

  // Define the guided steps
  const tourSteps: TourStep[] = [
    {
      targetId: 'tour-lab-tabs',
      title: 'Lab Mode Switcher',
      subtitle: 'Explore 5 Distinct Computer Science Sandboxes',
      icon: '🥼',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-garden-text dark:text-garden-darktext">
          <p>
            Welcome to the <strong>AlgoBloom Playground</strong>! Use these tabs to jump between five interactive algorithmic
            domains:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-buttercream/30 border border-amber-200 dark:border-amber-900/40">
              <span className="font-bold">📊 Sorting Sandbox:</span> Watch elements physically swap, partition, and merge.
            </div>
            <div className="p-2.5 rounded-xl bg-dustyrose/20 border border-dustyrose/30">
              <span className="font-bold">🕸️ Graph Lab:</span> Interactive node-dragging sandbox for BFS, DFS, and Dijkstra.
            </div>
            <div className="p-2.5 rounded-xl bg-sagegreen/20 border border-sagegreen/30">
              <span className="font-bold">🌲 Tree Lab:</span> Binary Search Tree operations and recursive traversals.
            </div>
            <div className="p-2.5 rounded-xl bg-softmauve/20 border border-softmauve/30">
              <span className="font-bold">🔍 Search Lab:</span> Compare sequential Linear Search with logarithmic Binary Search.
            </div>
            <div className="p-2.5 rounded-xl bg-warmtaupe/20 border border-warmtaupe/30 sm:col-span-2">
              <span className="font-bold">🧮 DP Recurrence Lab:</span> Watch optimal subproblems build solutions bottom-up.
            </div>
          </div>
        </div>
      ),
    },
    {
      targetId: 'tour-algo-select',
      title: `Algorithm Spotlight: ${algoDemo.name}`,
      subtitle: algoDemo.tagline,
      icon: algoDemo.icon,
      content: (
        <div className="space-y-3.5 text-xs sm:text-sm text-garden-text dark:text-garden-darktext">
          {/* Algorithm Quick Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-garden-bg border border-garden-cardborder">
            <span className="text-[11px] font-bold text-garden-secondary px-2">Select Algorithm:</span>
            {activeLab === 'sorting' && (
              <>
                {(['selection', 'bubble', 'insertion', 'quick', 'merge'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSwitchAlgo(key)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      inspectedAlgoKey === key
                        ? 'bg-dustyrose text-garden-text font-bold shadow-xs'
                        : 'text-garden-secondary hover:text-garden-text'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </>
            )}
            {activeLab === 'search' && (
              <>
                {(['binary', 'linear'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSwitchAlgo(key)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      inspectedAlgoKey === key
                        ? 'bg-dustyrose text-garden-text font-bold shadow-xs'
                        : 'text-garden-secondary hover:text-garden-text'
                    }`}
                  >
                    {key} Search
                  </button>
                ))}
              </>
            )}
            {activeLab === 'graph' && (
              <>
                {(['bfs', 'dfs', 'dijkstra'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSwitchAlgo(key)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold uppercase transition-all ${
                      inspectedAlgoKey === key
                        ? 'bg-dustyrose text-garden-text font-bold shadow-xs'
                        : 'text-garden-secondary hover:text-garden-text'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </>
            )}
            {activeLab === 'tree' && (
              <>
                {[
                  { id: 'tree-search', label: 'BST Search' },
                  { id: 'tree-inorder', label: 'Inorder' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSwitchAlgo(item.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                      inspectedAlgoKey === item.id
                        ? 'bg-dustyrose text-garden-text font-bold shadow-xs'
                        : 'text-garden-secondary hover:text-garden-text'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            )}
            {activeLab === 'dp' && (
              <>
                {[
                  { id: 'fibonacci', label: 'Fibonacci' },
                  { id: 'coin-change', label: 'Coin Change' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSwitchAlgo(item.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                      inspectedAlgoKey === item.id
                        ? 'bg-dustyrose text-garden-text font-bold shadow-xs'
                        : 'text-garden-secondary hover:text-garden-text'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Core Intuition Metaphor */}
          <div className="p-3 rounded-2xl bg-buttercream/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
            <div className="flex items-center gap-1.5 font-bold text-amber-950 dark:text-amber-200 text-xs mb-1">
              <Lightbulb size={14} className="text-amber-600" />
              <span>Intuitive Mental Model:</span>
            </div>
            <p className="text-xs text-amber-900 dark:text-amber-100 italic leading-relaxed">
              "{algoDemo.metaphor}"
            </p>
          </div>

          {/* Algorithm Mechanics */}
          <div className="space-y-1.5">
            <span className="font-bold text-xs uppercase tracking-wider text-garden-secondary">How It Works:</span>
            <ul className="space-y-1 text-xs">
              {algoDemo.howItWorks.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-sagegreen/20 text-sagegreen font-bold text-[10px] flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Complexity Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-garden-cardborder text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-softmauve/20 text-softmauve-600 dark:text-softmauve-300 font-mono font-semibold">
              Time: {algoDemo.timeComplexity.average}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-sagegreen/20 text-sagegreen-600 dark:text-sagegreen-300 font-mono font-semibold">
              Space: {algoDemo.spaceComplexity}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-dustyrose/20 text-dustyrose-600 dark:text-dustyrose-300 font-semibold">
              {algoDemo.badge}
            </span>
          </div>
        </div>
      ),
    },
    {
      targetId: 'tour-input-controls',
      title: 'Presets, Inputs & Parameters',
      subtitle: 'Customize Your Experimentation Data',
      icon: '🎛️',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-garden-text dark:text-garden-darktext">
          <p>
            Algorithms behave differently depending on the input arrangement. Use these controls to stress-test the
            algorithm:
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-garden-bg border border-garden-cardborder">
              <span className="p-1 rounded bg-buttercream text-amber-950 font-bold text-xs">Random</span>
              <div>
                <strong>Random Preset:</strong> Standard uniform distribution to observe average-case execution.
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-garden-bg border border-garden-cardborder">
              <span className="p-1 rounded bg-sagegreen/30 text-sagegreen font-bold text-xs">Nearly</span>
              <div>
                <strong>Nearly Sorted:</strong> Elements with minimal inversions. Watch adaptive algorithms (like Insertion &
                Bubble Sort) finish in near-linear O(n) time!
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-garden-bg border border-garden-cardborder">
              <span className="p-1 rounded bg-dustyrose/30 text-dustyrose-700 font-bold text-xs">Reverse</span>
              <div>
                <strong>Reverse Preset:</strong> Descending order to expose worst-case comparison and swap behavior.
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-garden-bg border border-garden-cardborder">
              <span className="p-1 rounded bg-softmauve/30 text-softmauve-700 font-bold text-xs">New Data</span>
              <div>
                <strong>Generate Fresh Array:</strong> Rolls a brand new set of values with one click.
              </div>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-sagegreen/10 border border-sagegreen/30 text-xs text-sagegreen-700 dark:text-sagegreen-300">
            💡 <strong>Pro Tip:</strong> {algoDemo.recommendedControls}
          </div>
        </div>
      ),
    },
    {
      targetId: 'tour-playback-controls',
      title: 'Step-by-Step Playback Engine',
      subtitle: 'Total Control Over Time & Execution',
      icon: '⏱️',
      content: (
        <div className="space-y-3.5 text-xs sm:text-sm text-garden-text dark:text-garden-darktext">
          <p>
            You have full control over the simulation clock. Here is how each button works:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-garden-bg border border-garden-cardborder">
              <span className="p-1.5 rounded-lg bg-white dark:bg-garden-darkcard shadow-xs">
                <SkipBack size={14} />
              </span>
              <div>
                <strong>Step Back ({"|<"})</strong>
                <p className="text-[11px] text-garden-secondary">Rewinds one single comparison or swap.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-dustyrose/20 border border-dustyrose/40">
              <span className="p-1.5 rounded-lg bg-dustyrose text-garden-text shadow-xs">
                <Play size={14} className="fill-garden-text" />
              </span>
              <div>
                <strong>Play / Pause</strong>
                <p className="text-[11px] text-garden-secondary">Auto-advances through steps with gentle chime audio.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-garden-bg border border-garden-cardborder">
              <span className="p-1.5 rounded-lg bg-white dark:bg-garden-darkcard shadow-xs">
                <SkipForward size={14} />
              </span>
              <div>
                <strong>Step Forward ({">|"})</strong>
                <p className="text-[11px] text-garden-secondary">Advances exactly one operation at a time.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-garden-bg border border-garden-cardborder">
              <span className="p-1.5 rounded-lg bg-white dark:bg-garden-darkcard shadow-xs">
                <RotateCcw size={14} />
              </span>
              <div>
                <strong>Reset (↺)</strong>
                <p className="text-[11px] text-garden-secondary">Restores array to the initial unsorted state.</p>
              </div>
            </div>
          </div>

          {/* Live Interactive Mini-Demo Action */}
          <div className="pt-2 border-t border-garden-cardborder flex items-center justify-between">
            <span className="text-xs text-garden-secondary">Want to see it in action right now?</span>
            <button
              onClick={handleRunMiniDemo}
              disabled={demoRunning}
              className="px-3.5 py-1.5 rounded-xl bg-sagegreen text-white font-bold text-xs hover:bg-sagegreen-600 transition-all shadow-sm flex items-center gap-1.5 animate-pulse"
            >
              <Zap size={13} />
              <span>{demoRunning ? 'Running Demo...' : '▶ Run Live Mini-Demo'}</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      targetId: 'tour-step-narration',
      title: 'Step Commentary & Metrics',
      subtitle: 'Real-Time Algorithmic Storytelling',
      icon: '💬',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-garden-text dark:text-garden-darktext">
          <p>
            AlgoBloom doesn't just animate values—it translates every single operation into plain, friendly English:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-garden-bg border border-garden-cardborder">
              <div className="font-bold text-garden-secondary text-[11px] mb-0.5">Step Counter & Narration:</div>
              <p className="font-mono text-xs text-garden-text dark:text-garden-darktext">
                "Step 4 / 43: Comparing adjacent elements at index 1 (12) and 2 (85)..."
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-garden-bg border border-garden-cardborder">
              <div className="font-bold text-garden-secondary text-[11px] mb-0.5">Live Operation Counters:</div>
              <p className="text-xs text-garden-secondary">
                Counts the exact number of <strong>Comparisons</strong> and <strong>Physical Swaps</strong> performed so far,
                allowing you to empirically verify theoretical Big-O complexity!
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-buttercream/20 border border-buttercream text-amber-950 dark:text-amber-200">
              <div className="font-bold flex items-center gap-1 text-[11px]">
                <Volume2 size={13} />
                <span>Web Audio Physical Sonification:</span>
              </div>
              <p className="text-[11px] text-amber-900/90 dark:text-amber-300">
                Comparisons play gentle Kalimba wooden tones, swaps trigger resonant chord sweeps, and completion triggers a
                glorious ascending pentatonic arpeggio!
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      targetId: 'tour-visualizer',
      title: 'The Living Visualizer Stage',
      subtitle: 'How to Read the Interactive Animation',
      icon: '🎨',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-garden-text dark:text-garden-darktext">
          <p>
            The canvas renders the physical mechanics of the active algorithm. Here is what to look for:
          </p>
          {/* Visual Cues Legend */}
          <div className="space-y-2 text-xs">
            {algoDemo.visualCues.map((cue, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-2 rounded-xl bg-garden-bg border border-garden-cardborder">
                <span
                  className="w-4 h-4 rounded-md shadow-xs flex-shrink-0"
                  style={{ backgroundColor: cue.color }}
                />
                <div>
                  <strong className="text-garden-text dark:text-garden-darktext">{cue.label}:</strong>{' '}
                  <span className="text-garden-secondary">{cue.description}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-dustyrose/20 border border-dustyrose/40 text-xs text-dustyrose-800 dark:text-dustyrose-200">
            🌸 <strong>Ready to Bloom:</strong> You're all set! Click <strong>Finish Tour</strong>, select any algorithm or preset,
            and watch the execution mechanics come to life!
          </div>
        </div>
      ),
    },
  ];

  const currentStep = tourSteps[currentStepIdx] || tourSteps[0];

  // Measure target DOM element bounding box
  useEffect(() => {
    if (!isOpen) return;

    const measureTarget = () => {
      const el = document.getElementById(currentStep.targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
        // Scroll element into view smoothly if not visible
        const isInView =
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
        if (!isInView) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            const updated = el.getBoundingClientRect();
            setTargetRect(updated);
          }, 350);
        }
      } else {
        setTargetRect(null);
      }
    };

    measureTarget();
    window.addEventListener('resize', measureTarget);
    window.addEventListener('scroll', measureTarget);

    return () => {
      window.removeEventListener('resize', measureTarget);
      window.removeEventListener('scroll', measureTarget);
    };
  }, [isOpen, currentStepIdx, currentStep.targetId]);

  // Keyboard navigation: Escape closes, Arrows navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIdx]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIdx < tourSteps.length - 1) {
      soundService.playTone(783.99, { type: 'kalimba', gain: 0.14 });
      setCurrentStepIdx((p) => p + 1);
    } else {
      soundService.playVictoryArpeggio();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      soundService.playTone(523.25, { type: 'kalimba', gain: 0.12 });
      setCurrentStepIdx((p) => p - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn select-none">
      {/* Semi-transparent Backdrop with SVG Cutout for Focused Spotlight */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Target Spotlight Highlight Ring */}
      {targetRect && (
        <div
          className="fixed pointer-events-none transition-all duration-300 z-50 rounded-2xl"
          style={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
            boxShadow: '0 0 0 9999px rgba(10, 20, 15, 0.65), 0 0 25px rgba(241, 180, 177, 0.85)',
            border: '2.5px solid #F1B4B1',
          }}
        />
      )}

      {/* Floating Interactive Tour Card */}
      <div
        className="relative z-50 w-full max-w-xl rounded-3xl p-6 sm:p-7 bg-[#FDFBF7] dark:bg-[#1E2520] border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-2xl flex flex-col gap-4 overflow-hidden animate-scaleUp"
        style={{
          backgroundImage: 'radial-gradient(rgba(147, 159, 127, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Step Indicator, Title & Close Button */}
        <div className="flex items-start justify-between gap-3 border-b border-garden-cardborder pb-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-buttercream/60 border border-buttercream text-[11px] font-bold text-amber-950">
              <span>{currentStep.icon}</span>
              <span>
                Step {currentStepIdx + 1} of {tourSteps.length} • Interactive Demo
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-garden-text dark:text-garden-darktext tracking-tight flex items-center gap-2">
              <span>{currentStep.title}</span>
            </h3>
            <p className="text-xs text-garden-secondary">{currentStep.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            title="Close Tour (Esc)"
            className="p-1.5 rounded-xl text-garden-secondary hover:text-garden-text hover:bg-garden-hover transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Content */}
        <div className="py-1 max-h-[58vh] overflow-y-auto pr-1">{currentStep.content}</div>

        {/* Bottom Navigation Toolbar */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-garden-cardborder">
          {/* Step Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {tourSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  soundService.playChirp();
                  setCurrentStepIdx(i);
                }}
                title={`Go to step ${i + 1}`}
                className={`transition-all ${
                  currentStepIdx === i
                    ? 'w-6 h-2 rounded-full bg-dustyrose shadow-xs'
                    : 'w-2 h-2 rounded-full bg-garden-cardborder hover:bg-garden-secondary'
                }`}
              />
            ))}
          </div>

          {/* Buttons: Previous & Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className="px-3 py-1.5 rounded-xl border border-garden-cardborder text-xs font-semibold text-garden-secondary hover:text-garden-text disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
            >
              <ChevronLeft size={14} />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xl bg-dustyrose text-garden-text font-bold text-xs sm:text-sm hover:bg-dustyrose-400 shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>{currentStepIdx === tourSteps.length - 1 ? 'Finish Tour 🌸' : 'Next Step'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
