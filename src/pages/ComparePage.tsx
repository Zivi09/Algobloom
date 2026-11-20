import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Columns, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ArrayBarVisualizer } from '../visualizations/ArrayBarVisualizer';
import { TraceStep } from '../types';
import { generateLinearSearchTrace, generateBinarySearchTrace } from '../algorithms/traces/searchTraces';
import { generateBubbleSortTrace, generateMergeSortTrace, generateQuickSortTrace } from '../algorithms/traces/sortTraces';

export const ComparePage: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<
    'linear-vs-binary' | 'bubble-vs-merge' | 'merge-vs-quick' | 'bfs-vs-dfs' | 'memo-vs-tab'
  >('linear-vs-binary');

  const [stepA, setStepA] = useState(0);
  const [stepB, setStepB] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<any>(null);

  const testArray = [12, 18, 24, 31, 45, 52, 67, 80];

  // Traces for comparison
  const [traceA, setTraceA] = useState<TraceStep[]>([]);
  const [traceB, setTraceB] = useState<TraceStep[]>([]);

  useEffect(() => {
    setIsPlaying(false);
    setStepA(0);
    setStepB(0);

    if (selectedPair === 'linear-vs-binary') {
      setTraceA(generateLinearSearchTrace(testArray, 67));
      setTraceB(generateBinarySearchTrace(testArray, 67));
    } else if (selectedPair === 'bubble-vs-merge') {
      const unsorted = [45, 12, 85, 32, 69, 22];
      setTraceA(generateBubbleSortTrace(unsorted));
      setTraceB(generateMergeSortTrace(unsorted));
    } else if (selectedPair === 'merge-vs-quick') {
      const unsorted = [45, 12, 85, 32, 69, 22];
      setTraceA(generateMergeSortTrace(unsorted));
      setTraceB(generateQuickSortTrace(unsorted));
    }
  }, [selectedPair]);

  // Synchronized playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepA((prevA) => Math.min(traceA.length - 1, prevA + 1));
        setStepB((prevB) => Math.min(traceB.length - 1, prevB + 1));

        if (stepA >= traceA.length - 1 && stepB >= traceB.length - 1) {
          setIsPlaying(false);
        }
      }, 900);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, traceA.length, traceB.length, stepA, stepB]);

  const currentStepA = traceA[stepA] || { step: 0, description: 'Ready' };
  const currentStepB = traceB[stepB] || { step: 0, description: 'Ready' };

  // Comparison Meta Matrix
  const COMPARISONS_DATA = {
    'linear-vs-binary': {
      titleA: 'Linear Search',
      titleB: 'Binary Search',
      timeA: 'O(n)',
      timeB: 'O(log n)',
      spaceA: 'O(1)',
      spaceB: 'O(1)',
      preconditionA: 'None (works on unsorted data)',
      preconditionB: 'Array MUST be sorted',
      winner: 'Binary Search for large datasets; Linear Search for one-off unsorted scans.',
    },
    'bubble-vs-merge': {
      titleA: 'Bubble Sort',
      titleB: 'Merge Sort',
      timeA: 'O(n²) worst / avg',
      timeB: 'O(n log n) guaranteed',
      spaceA: 'O(1) in-place',
      spaceB: 'O(n) auxiliary buffers',
      preconditionA: 'None',
      preconditionB: 'None',
      winner: 'Merge Sort wins drastically in time; Bubble Sort only wins in zero extra memory usage.',
    },
    'merge-vs-quick': {
      titleA: 'Merge Sort',
      titleB: 'Quick Sort',
      timeA: 'O(n log n) guaranteed',
      timeB: 'O(n log n) avg, O(n²) worst',
      spaceA: 'O(n) extra RAM',
      spaceB: 'O(log n) stack (in-place)',
      preconditionA: 'None',
      preconditionB: 'None',
      winner: 'QuickSort is faster in RAM with CPU caches; Merge Sort wins when guaranteed worst-case or stability is required.',
    },
    'bfs-vs-dfs': {
      titleA: 'Breadth-First Search (BFS)',
      titleB: 'Depth-First Search (DFS)',
      timeA: 'O(V + E)',
      timeB: 'O(V + E)',
      spaceA: 'O(V) Queue',
      spaceB: 'O(V) Stack',
      preconditionA: 'Unweighted graphs for shortest paths',
      preconditionB: 'None',
      winner: 'BFS for shortest paths and closest neighbors; DFS for topological sorting and maze backtracking.',
    },
    'memo-vs-tab': {
      titleA: 'Memoization (Top-Down DP)',
      titleB: 'Tabulation (Bottom-Up DP)',
      timeA: 'O(N)',
      timeB: 'O(N)',
      spaceA: 'O(N) cache + recursion stack',
      spaceB: 'O(N) or O(1) space optimized table',
      preconditionA: 'Recursive formulation',
      preconditionB: 'Iterative base-case ordering',
      winner: 'Tabulation wins on memory efficiency and stack safety; Memoization wins on ease of formulation.',
    },
  };

  const meta = COMPARISONS_DATA[selectedPair];

  return (
    <div className="max-w-6xl mx-auto pb-20 flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softmauve/30 border border-softmauve-400 text-xs font-semibold text-softmauve-900 dark:text-softmauve-100">
          <span>⚖️</span>
          <span>Side-by-Side Algorithm Comparison Lab</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Compare Algorithms
        </h1>
        <p className="text-sm sm:text-base text-garden-secondary max-w-xl">
          Observe how two different algorithmic approaches tackle the exact same data. Compare operations, complexities, and real-world trade-offs.
        </p>
      </div>

      {/* Comparison Selector Chips */}
      <div className="flex flex-wrap gap-2 border-b border-garden-cardborder pb-4">
        {[
          { id: 'linear-vs-binary', label: 'Linear Search vs Binary Search' },
          { id: 'bubble-vs-merge', label: 'Bubble Sort vs Merge Sort' },
          { id: 'merge-vs-quick', label: 'Merge Sort vs Quick Sort' },
          { id: 'bfs-vs-dfs', label: 'BFS vs DFS (Graph Traversal)' },
          { id: 'memo-vs-tab', label: 'Memoization vs Tabulation (DP)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedPair(tab.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
              selectedPair === tab.id
                ? 'bg-dustyrose text-garden-text font-bold shadow-sm'
                : 'bg-white dark:bg-garden-darkcard border border-garden-cardborder text-garden-secondary hover:text-garden-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Synchronized Visualizer Toolbar (for search & sort comparisons) */}
      {(selectedPair === 'linear-vs-binary' || selectedPair === 'bubble-vs-merge' || selectedPair === 'merge-vs-quick') && (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-garden-darkcard rounded-2xl border border-garden-cardborder shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (stepA >= traceA.length - 1 && stepB >= traceB.length - 1) {
                  setStepA(0);
                  setStepB(0);
                }
                setIsPlaying(!isPlaying);
              }}
              className="px-4 py-2 rounded-xl bg-dustyrose text-garden-text font-bold text-xs sm:text-sm hover:bg-dustyrose-400 flex items-center gap-1.5 shadow-sm"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-garden-text" />}
              <span>{isPlaying ? 'Pause Synchronized Race' : 'Run Synchronized Race'}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepA(0);
                setStepB(0);
              }}
              className="p-2 rounded-xl bg-garden-bg border border-garden-cardborder text-garden-secondary hover:text-garden-text"
            >
              <RotateCcw size={15} />
            </button>
          </div>

          <div className="text-xs font-semibold text-garden-secondary">
            Trace A: Step {stepA + 1}/{traceA.length} • Trace B: Step {stepB + 1}/{traceB.length}
          </div>
        </div>
      )}

      {/* Side-by-Side Dual Visualizers */}
      {(selectedPair === 'linear-vs-binary' || selectedPair === 'bubble-vs-merge' || selectedPair === 'merge-vs-quick') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Algorithm A */}
          <div className="flex flex-col gap-2">
            <div className="p-3 bg-mistylavender/30 rounded-xl border border-mistylavender font-heading font-bold text-sm text-garden-text flex items-center justify-between">
              <span>{meta.titleA}</span>
              <span className="font-mono text-xs">{meta.timeA}</span>
            </div>
            <ArrayBarVisualizer currentStep={currentStepA} speedMs={900} />
            <p className="text-xs text-garden-secondary p-2 bg-white dark:bg-garden-darkcard rounded-xl border border-garden-cardborder">
              {currentStepA.description}
            </p>
          </div>

          {/* Algorithm B */}
          <div className="flex flex-col gap-2">
            <div className="p-3 bg-buttercream/30 rounded-xl border border-buttercream font-heading font-bold text-sm text-amber-950 dark:text-amber-200 flex items-center justify-between">
              <span>{meta.titleB}</span>
              <span className="font-mono text-xs">{meta.timeB}</span>
            </div>
            <ArrayBarVisualizer currentStep={currentStepB} speedMs={900} />
            <p className="text-xs text-garden-secondary p-2 bg-white dark:bg-garden-darkcard rounded-xl border border-garden-cardborder">
              {currentStepB.description}
            </p>
          </div>
        </div>
      )}

      {/* Head-to-Head Comparison Matrix Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <h3 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
          Head-to-Head Specification Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-garden-cardborder">
                <th className="p-3 font-semibold text-garden-secondary">Metric</th>
                <th className="p-3 font-bold text-garden-text dark:text-garden-darktext">{meta.titleA}</th>
                <th className="p-3 font-bold text-dustyrose-600">{meta.titleB}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-garden-cardborder/60">
              <tr>
                <td className="p-3 font-semibold text-garden-secondary">Time Complexity</td>
                <td className="p-3 font-mono font-bold">{meta.timeA}</td>
                <td className="p-3 font-mono font-bold text-dustyrose-600">{meta.timeB}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-garden-secondary">Auxiliary Memory</td>
                <td className="p-3 font-mono">{meta.spaceA}</td>
                <td className="p-3 font-mono">{meta.spaceB}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-garden-secondary">Input Requirements</td>
                <td className="p-3">{meta.preconditionA}</td>
                <td className="p-3">{meta.preconditionB}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-sagegreen/10 border border-sagegreen/30 text-xs sm:text-sm leading-relaxed text-garden-text dark:text-garden-darktext">
          <strong className="text-sagegreen block mb-1">🏆 Botanical Verdict:</strong>
          {meta.winner}
        </div>
      </section>
    </div>
  );
};
