import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sliders,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  GitBranch,
  Boxes,
  HelpCircle,
} from 'lucide-react';
import { ArrayBarVisualizer } from '../visualizations/ArrayBarVisualizer';
import { GraphVisualizer } from '../visualizations/GraphVisualizer';
import { TreeVisualizer } from '../visualizations/TreeVisualizer';
import { DpTableVisualizer } from '../visualizations/DpTableVisualizer';
import { PlaygroundTourModal } from '../components/playground/PlaygroundTourModal';
import { TraceStep } from '../types';
import { soundService } from '../services/soundService';
import {
  generateBubbleSortTrace,
  generateSelectionSortTrace,
  generateInsertionSortTrace,
  generateMergeSortTrace,
  generateQuickSortTrace,
} from '../algorithms/traces/sortTraces';
import { generateLinearSearchTrace, generateBinarySearchTrace } from '../algorithms/traces/searchTraces';
import { generateBfsTrace, generateDfsTrace, generateDijkstraTrace, DEFAULT_GRAPH } from '../algorithms/traces/graphTraces';
import { generateBstSearchTrace, generateTreeTraversalTrace } from '../algorithms/traces/treeTraces';
import { generateFibonacciDpTrace, generateCoinChangeTrace } from '../algorithms/traces/dpTraces';

export const PlaygroundPage: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'sorting' | 'graph' | 'tree' | 'search' | 'dp'>('sorting');
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Common Playback States
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(800);
  const [steps, setSteps] = useState<TraceStep[]>([]);
  const timerRef = useRef<any>(null);

  // 1. Sorting Playground State
  const [selectedSortAlgo, setSelectedSortAlgo] = useState<'bubble' | 'selection' | 'insertion' | 'merge' | 'quick'>('bubble');
  const [sortArray, setSortArray] = useState<number[]>([45, 12, 85, 32, 89, 39, 69, 22]);
  const [arrayPreset, setArrayPreset] = useState<'random' | 'nearly' | 'reverse'>('random');

  // 2. Search Playground State
  const [searchTarget, setSearchTarget] = useState(31);
  const [selectedSearchAlgo, setSelectedSearchAlgo] = useState<'linear' | 'binary'>('binary');

  // 3. Graph Playground State
  const [selectedGraphAlgo, setSelectedGraphAlgo] = useState<'bfs' | 'dfs' | 'dijkstra'>('bfs');
  const [graphStartNode, setGraphStartNode] = useState('A');

  // 4. Tree Playground State
  const [treeAction, setTreeAction] = useState<'search' | 'inorder' | 'preorder' | 'postorder'>('search');
  const [treeSearchVal, setTreeSearchVal] = useState(60);

  // 5. DP Playground State
  const [selectedDpProblem, setSelectedDpProblem] = useState<'fibonacci' | 'coin-change'>('fibonacci');
  const [fibN, setFibN] = useState(7);
  const [coinAmount, setCoinAmount] = useState(7);

  // Array Generator Helpers
  const generateNewArray = (type: 'random' | 'nearly' | 'reverse', len = 8) => {
    let arr: number[] = [];
    if (type === 'random') {
      arr = Array.from({ length: len }, () => Math.floor(Math.random() * 80) + 10);
    } else if (type === 'nearly') {
      arr = [10, 20, 30, 25, 50, 60, 70, 65];
    } else {
      arr = [90, 80, 70, 60, 50, 40, 30, 20];
    }
    setSortArray(arr);
    return arr;
  };

  // Re-run the active lab trace
  const loadActiveTrace = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);

    if (activeLab === 'sorting') {
      let tr: TraceStep[] = [];
      if (selectedSortAlgo === 'bubble') tr = generateBubbleSortTrace(sortArray);
      else if (selectedSortAlgo === 'selection') tr = generateSelectionSortTrace(sortArray);
      else if (selectedSortAlgo === 'insertion') tr = generateInsertionSortTrace(sortArray);
      else if (selectedSortAlgo === 'merge') tr = generateMergeSortTrace(sortArray);
      else if (selectedSortAlgo === 'quick') tr = generateQuickSortTrace(sortArray);
      setSteps(tr);
    } else if (activeLab === 'search') {
      let tr: TraceStep[] = [];
      if (selectedSearchAlgo === 'linear') tr = generateLinearSearchTrace(sortArray, searchTarget);
      else tr = generateBinarySearchTrace(sortArray, searchTarget);
      setSteps(tr);
    } else if (activeLab === 'graph') {
      let tr: TraceStep[] = [];
      if (selectedGraphAlgo === 'bfs') tr = generateBfsTrace(DEFAULT_GRAPH, graphStartNode);
      else if (selectedGraphAlgo === 'dfs') tr = generateDfsTrace(DEFAULT_GRAPH, graphStartNode);
      else tr = generateDijkstraTrace(DEFAULT_GRAPH, graphStartNode);
      setSteps(tr);
    } else if (activeLab === 'tree') {
      let tr: TraceStep[] = [];
      if (treeAction === 'search') tr = generateBstSearchTrace(undefined, treeSearchVal);
      else tr = generateTreeTraversalTrace(undefined, treeAction as any);
      setSteps(tr);
    } else if (activeLab === 'dp') {
      let tr: TraceStep[] = [];
      if (selectedDpProblem === 'fibonacci') tr = generateFibonacciDpTrace(fibN);
      else tr = generateCoinChangeTrace([1, 2, 5], coinAmount);
      setSteps(tr);
    }
  };

  useEffect(() => {
    loadActiveTrace();
  }, [
    activeLab,
    selectedSortAlgo,
    sortArray,
    selectedSearchAlgo,
    searchTarget,
    selectedGraphAlgo,
    graphStartNode,
    treeAction,
    treeSearchVal,
    selectedDpProblem,
    fibN,
    coinAmount,
  ]);

  // Interval loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speed]);

  // Sonification hook for playground simulations
  const prevStepIdxRef = useRef<number>(-1);
  useEffect(() => {
    if (steps.length === 0) return;
    const prevIdx = prevStepIdxRef.current;
    prevStepIdxRef.current = currentStepIdx;

    if (prevIdx === -1 && currentStepIdx === 0) return;

    if (currentStepIdx === 0 && prevIdx > 0) {
      soundService.playBubblePop();
      return;
    }

    if (currentStepIdx > prevIdx) {
      const step = steps[currentStepIdx];
      if (!step) return;

      const arr = step.array || [];
      const max = Math.max(...arr, 50);

      const allSorted = Boolean(step.sortedIndices && arr.length > 0 && step.sortedIndices.length === arr.length);
      if (step.isComplete || allSorted) {
        soundService.playVictoryArpeggio();
      } else if (step.swappedIndices && step.swappedIndices.length >= 2) {
        const idxA = step.swappedIndices[0];
        const idxB = step.swappedIndices[1];
        soundService.playSwap(arr[idxA] ?? 0, arr[idxB] ?? 0, max);
      } else if (step.comparingIndices && step.comparingIndices.length >= 2) {
        const idxA = step.comparingIndices[0];
        const idxB = step.comparingIndices[1];
        soundService.playComparison(arr[idxA] ?? 0, arr[idxB] ?? 0, max);
      } else if (step.sortedIndices && step.sortedIndices.length > 0) {
        const latestIdx = step.sortedIndices[step.sortedIndices.length - 1];
        soundService.playSortedChime(latestIdx, arr.length || 10);
      } else if (step.highlightedIndices && step.highlightedIndices.length > 0) {
        const freq = soundService.mapIndexToFrequency(step.highlightedIndices[0], arr.length || 10);
        soundService.playTone(freq, { gain: 0.16, type: 'kalimba' });
      }
    }
  }, [currentStepIdx, steps]);

  const currentStep = steps[currentStepIdx] || { step: 0, description: 'Initializing...' };

  return (
    <div className="max-w-6xl mx-auto pb-20 flex flex-col gap-8">
      {/* Page Title & Guided Demo Tour Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buttercream/50 border border-buttercream text-xs font-semibold text-amber-950">
            <span>🧪</span>
            <span>Interactive Experimentation Sandbox</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
            Algorithm Playground
          </h1>
          <p className="text-sm sm:text-base text-garden-secondary max-w-xl">
            Build inputs, modify parameters, change presets, and watch the execution mechanics step-by-step.
          </p>
        </div>

        {/* Guided Tour & Demo Button (App-Style Walkthrough) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundService.playChirp();
              setIsTourOpen(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-dustyrose hover:bg-dustyrose-400 text-garden-text font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all flex items-center gap-2 group animate-pulse hover:animate-none"
            title="Interactive Demo & Feature Walkthrough"
          >
            <Sparkles size={16} className="text-amber-900 group-hover:rotate-12 transition-transform" />
            <span>Interactive Demo & Tour</span>
            <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/30 text-[10px] font-black tracking-wider uppercase text-amber-950 dark:text-amber-200">
              How to Use
            </span>
          </button>
        </div>
      </div>

      {/* Lab Switcher Tabs */}
      <div
        id="tour-lab-tabs"
        className="flex flex-wrap gap-2 border-b border-garden-cardborder dark:border-garden-darkcardborder pb-4"
      >
        {[
          { id: 'sorting', label: 'Sorting Sandbox', icon: '📊' },
          { id: 'graph', label: 'Graph Lab', icon: '🕸️' },
          { id: 'tree', label: 'Tree Lab', icon: '🌲' },
          { id: 'search', label: 'Search Lab', icon: '🔍' },
          { id: 'dp', label: 'DP Recurrence Lab', icon: '🧮' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveLab(tab.id as any);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeLab === tab.id
                ? 'bg-dustyrose text-garden-text font-bold shadow-sm'
                : 'bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-garden-secondary hover:text-garden-text'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Control Panel Specific to Active Lab */}
      <div className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* SORTING CONTROLS */}
        {activeLab === 'sorting' && (
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div id="tour-algo-select" className="flex items-center gap-1.5">
              <span className="font-semibold text-garden-secondary">Algorithm:</span>
              <select
                value={selectedSortAlgo}
                onChange={(e) => setSelectedSortAlgo(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-garden-cardborder bg-garden-bg font-semibold text-garden-text focus:outline-none"
              >
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="quick">Quick Sort</option>
              </select>
              <button
                onClick={() => {
                  soundService.playChirp();
                  setIsTourOpen(true);
                }}
                title="Explain this algorithm"
                className="p-1 rounded-lg text-garden-secondary hover:text-garden-text hover:bg-garden-hover"
              >
                <HelpCircle size={15} />
              </button>
            </div>

            <div id="tour-input-controls" className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-garden-secondary">Preset:</span>
                {(['random', 'nearly', 'reverse'] as const).map((pr) => (
                  <button
                    key={pr}
                    onClick={() => {
                      setArrayPreset(pr);
                      generateNewArray(pr);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold capitalize border ${
                      arrayPreset === pr
                        ? 'bg-buttercream border-amber-300 text-amber-950 font-bold'
                        : 'border-garden-cardborder text-garden-secondary hover:text-garden-text'
                    }`}
                  >
                    {pr}
                  </button>
                ))}
              </div>

              <button
                onClick={() => generateNewArray(arrayPreset)}
                className="p-2 rounded-xl bg-garden-bg border border-garden-cardborder text-garden-text hover:bg-garden-hover flex items-center gap-1 text-xs font-semibold"
              >
                <RefreshCw size={13} /> New Data
              </button>
            </div>
          </div>
        )}

        {/* SEARCH CONTROLS */}
        {activeLab === 'search' && (
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <div id="tour-algo-select" className="flex items-center gap-2">
              <span className="font-semibold text-garden-secondary">Method:</span>
              <select
                value={selectedSearchAlgo}
                onChange={(e) => setSelectedSearchAlgo(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-garden-cardborder bg-garden-bg font-semibold text-garden-text focus:outline-none"
              >
                <option value="binary">Binary Search (O(log n))</option>
                <option value="linear">Linear Search (O(n))</option>
              </select>
              <button
                onClick={() => {
                  soundService.playChirp();
                  setIsTourOpen(true);
                }}
                title="Explain this search method"
                className="p-1 rounded-lg text-garden-secondary hover:text-garden-text hover:bg-garden-hover"
              >
                <HelpCircle size={15} />
              </button>
            </div>

            <div id="tour-input-controls" className="flex items-center gap-2">
              <span className="font-semibold text-garden-secondary">Target Value:</span>
              <input
                type="number"
                value={searchTarget}
                onChange={(e) => setSearchTarget(Number(e.target.value))}
                className="w-20 px-3 py-1.5 rounded-xl border border-garden-cardborder bg-garden-bg text-garden-text font-mono focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* GRAPH CONTROLS */}
        {activeLab === 'graph' && (
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <div id="tour-algo-select" className="flex items-center gap-2">
              <span className="font-semibold text-garden-secondary">Algorithm:</span>
              <select
                value={selectedGraphAlgo}
                onChange={(e) => setSelectedGraphAlgo(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-garden-cardborder bg-garden-bg font-semibold text-garden-text focus:outline-none"
              >
                <option value="bfs">Breadth-First Search (BFS)</option>
                <option value="dfs">Depth-First Search (DFS)</option>
                <option value="dijkstra">Dijkstra's Shortest Path</option>
              </select>
              <button
                onClick={() => {
                  soundService.playChirp();
                  setIsTourOpen(true);
                }}
                title="Explain this graph algorithm"
                className="p-1 rounded-lg text-garden-secondary hover:text-garden-text hover:bg-garden-hover"
              >
                <HelpCircle size={15} />
              </button>
            </div>

            <div id="tour-input-controls" className="flex items-center gap-2">
              <span className="font-semibold text-garden-secondary">Start Vertex:</span>
              {(['A', 'B', 'C', 'D'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setGraphStartNode(v)}
                  className={`w-7 h-7 rounded-lg border text-xs font-bold ${
                    graphStartNode === v
                      ? 'bg-dustyrose text-garden-text border-dustyrose-500'
                      : 'border-garden-cardborder text-garden-secondary'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TREE CONTROLS */}
        {activeLab === 'tree' && (
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <div id="tour-algo-select" className="flex items-center gap-2">
              <span className="font-semibold text-garden-secondary">Operation:</span>
              <select
                value={treeAction}
                onChange={(e) => setTreeAction(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-garden-cardborder bg-garden-bg font-semibold text-garden-text focus:outline-none"
              >
                <option value="search">Search Value</option>
                <option value="inorder">Inorder Traversal (Left, Root, Right)</option>
                <option value="preorder">Preorder Traversal</option>
                <option value="postorder">Postorder Traversal</option>
              </select>
              <button
                onClick={() => {
                  soundService.playChirp();
                  setIsTourOpen(true);
                }}
                title="Explain this tree operation"
                className="p-1 rounded-lg text-garden-secondary hover:text-garden-text hover:bg-garden-hover"
              >
                <HelpCircle size={15} />
              </button>
            </div>

            <div id="tour-input-controls">
              {treeAction === 'search' && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-garden-secondary">Target:</span>
                  <input
                    type="number"
                    value={treeSearchVal}
                    onChange={(e) => setTreeSearchVal(Number(e.target.value))}
                    className="w-20 px-3 py-1.5 rounded-xl border border-garden-cardborder bg-garden-bg text-garden-text font-mono focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* DP CONTROLS */}
        {activeLab === 'dp' && (
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
            <div id="tour-algo-select" className="flex items-center gap-2">
              <span className="font-semibold text-garden-secondary">Problem:</span>
              <select
                value={selectedDpProblem}
                onChange={(e) => setSelectedDpProblem(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-garden-cardborder bg-garden-bg font-semibold text-garden-text focus:outline-none"
              >
                <option value="fibonacci">Fibonacci Number</option>
                <option value="coin-change">Coin Change Minimum Coins</option>
              </select>
              <button
                onClick={() => {
                  soundService.playChirp();
                  setIsTourOpen(true);
                }}
                title="Explain this DP problem"
                className="p-1 rounded-lg text-garden-secondary hover:text-garden-text hover:bg-garden-hover"
              >
                <HelpCircle size={15} />
              </button>
            </div>

            <div id="tour-input-controls">
              {selectedDpProblem === 'fibonacci' ? (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-garden-secondary">N (up to 12):</span>
                  <input
                    type="number"
                    min={2}
                    max={12}
                    value={fibN}
                    onChange={(e) => setFibN(Math.min(12, Math.max(2, Number(e.target.value))))}
                    className="w-16 px-2 py-1.5 rounded-xl border border-garden-cardborder bg-garden-bg text-garden-text font-mono focus:outline-none"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-garden-secondary">Target Amount ($):</span>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={coinAmount}
                    onChange={(e) => setCoinAmount(Math.min(12, Math.max(1, Number(e.target.value))))}
                    className="w-16 px-2 py-1.5 rounded-xl border border-garden-cardborder bg-garden-bg text-garden-text font-mono focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Universal Playback Controls */}
        <div id="tour-playback-controls" className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIdx((p) => Math.max(0, p - 1))}
            disabled={currentStepIdx === 0}
            className="p-2 rounded-xl bg-garden-bg border border-garden-cardborder text-garden-text disabled:opacity-40"
          >
            <SkipBack size={15} />
          </button>
          <button
            onClick={() => {
              if (currentStepIdx >= steps.length - 1) setCurrentStepIdx(0);
              setIsPlaying(!isPlaying);
            }}
            className="px-4 py-2 rounded-xl bg-dustyrose text-garden-text font-bold text-xs sm:text-sm hover:bg-dustyrose-400 shadow-sm flex items-center gap-1.5"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-garden-text" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => setCurrentStepIdx((p) => Math.min(steps.length - 1, p + 1))}
            disabled={currentStepIdx >= steps.length - 1}
            className="p-2 rounded-xl bg-garden-bg border border-garden-cardborder text-garden-text disabled:opacity-40"
          >
            <SkipForward size={15} />
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(0);
              soundService.playBubblePop();
            }}
            className="p-2 rounded-xl bg-garden-bg border border-garden-cardborder text-garden-secondary hover:text-garden-text"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Step Description Banner */}
      <div
        id="tour-step-narration"
        className="p-4 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder shadow-sm flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-dustyrose/30 text-garden-text font-mono text-xs font-bold">
            Step {currentStepIdx + 1} / {steps.length}
          </span>
          <p className="text-xs sm:text-sm font-medium text-garden-text dark:text-garden-darktext">
            {currentStep.description}
          </p>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div id="tour-visualizer" className="w-full">
        {activeLab === 'sorting' || activeLab === 'search' ? (
          <ArrayBarVisualizer currentStep={currentStep} speedMs={speed} />
        ) : activeLab === 'graph' ? (
          <GraphVisualizer currentStep={currentStep} />
        ) : activeLab === 'tree' ? (
          <TreeVisualizer currentStep={currentStep} />
        ) : (
          <DpTableVisualizer currentStep={currentStep} />
        )}
      </div>

      {/* Interactive App-Style Guided Demo & Walkthrough Modal */}
      <PlaygroundTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        activeLab={activeLab}
        selectedSortAlgo={selectedSortAlgo}
        selectedSearchAlgo={selectedSearchAlgo}
        selectedGraphAlgo={selectedGraphAlgo}
        treeAction={treeAction}
        selectedDpProblem={selectedDpProblem}
        onSelectSortAlgo={setSelectedSortAlgo}
        onSelectSearchAlgo={setSelectedSearchAlgo}
        onSelectGraphAlgo={setSelectedGraphAlgo}
        onSelectTreeAction={setTreeAction}
        onSelectDpProblem={setSelectedDpProblem}
        onTriggerDemoPlay={() => {
          setCurrentStepIdx(0);
          setIsPlaying(true);
        }}
        onResetTrace={() => {
          setIsPlaying(false);
          setCurrentStepIdx(0);
          soundService.playBubblePop();
        }}
      />
    </div>
  );
};
