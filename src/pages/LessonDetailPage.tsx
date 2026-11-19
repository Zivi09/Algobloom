import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Clock,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Share2,
  Copy,
  Check,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Award,
  RefreshCw,
  Baby,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AlgorithmLesson, TraceStep } from '../types';
import { ArrayBarVisualizer } from '../visualizations/ArrayBarVisualizer';
import { GraphVisualizer } from '../visualizations/GraphVisualizer';
import { TreeVisualizer } from '../visualizations/TreeVisualizer';
import { DpTableVisualizer } from '../visualizations/DpTableVisualizer';
import { generateLinearSearchTrace, generateBinarySearchTrace } from '../algorithms/traces/searchTraces';
import {
  generateBubbleSortTrace,
  generateSelectionSortTrace,
  generateInsertionSortTrace,
  generateMergeSortTrace,
  generateQuickSortTrace,
} from '../algorithms/traces/sortTraces';
import { generateBfsTrace, generateDfsTrace, generateDijkstraTrace } from '../algorithms/traces/graphTraces';
import { generateBstSearchTrace } from '../algorithms/traces/treeTraces';
import { generateFibonacciDpTrace } from '../algorithms/traces/dpTraces';
import { ProgressService } from '../services/progressService';

interface LessonDetailPageProps {
  lesson: AlgorithmLesson;
  onBack: () => void;
  onQuizCompleted: () => void;
}

export const LessonDetailPage: React.FC<LessonDetailPageProps> = ({
  lesson,
  onBack,
  onQuizCompleted,
}) => {
  const progressService = ProgressService.getInstance();
  const currentProgress = progressService.getProgress();

  // State: Bookmarked
  const [isBookmarked, setIsBookmarked] = useState(
    currentProgress.bookmarks.includes(lesson.id)
  );

  // State: ELI5 Toggle
  const [showEli5, setShowEli5] = useState(false);

  // State: Code Language tab
  const [activeCodeLang, setActiveCodeLang] = useState<'python' | 'javascript' | 'cpp' | 'java'>('python');
  const [copiedCode, setCopiedCode] = useState(false);

  // State: Try It Yourself custom input
  const [customArrayInput, setCustomArrayInput] = useState(
    Array.isArray(lesson.defaultInput) ? lesson.defaultInput.join(', ') : '29, 10, 45, 12, 85, 32'
  );
  const [customTargetInput, setCustomTargetInput] = useState('42');

  // State: Execution Trace
  const [traceSteps, setTraceSteps] = useState<TraceStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms per step
  const timerRef = useRef<any>(null);

  // State: Quiz
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // State: Relearn Mode Modal
  const [relearnModalOpen, setRelearnModalOpen] = useState(false);
  const [miniQuizAnswers, setMiniQuizAnswers] = useState<Record<number, number>>({});

  // Generate deterministic trace based on algorithm ID
  const generateTrace = (arr?: number[], targetVal?: number) => {
    const rawArr = arr || (Array.isArray(lesson.defaultInput) ? [...lesson.defaultInput] : [45, 12, 85, 32, 89, 39]);
    const target = targetVal !== undefined ? targetVal : 42;

    switch (lesson.id) {
      case 'linear-search':
        return generateLinearSearchTrace(rawArr, target);
      case 'binary-search':
        return generateBinarySearchTrace(rawArr, target);
      case 'bubble-sort':
        return generateBubbleSortTrace(rawArr);
      case 'selection-sort':
        return generateSelectionSortTrace(rawArr);
      case 'insertion-sort':
        return generateInsertionSortTrace(rawArr);
      case 'merge-sort':
        return generateMergeSortTrace(rawArr);
      case 'quick-sort':
        return generateQuickSortTrace(rawArr);
      case 'breadth-first-search':
        return generateBfsTrace();
      case 'depth-first-search':
        return generateDfsTrace();
      case 'dijkstra':
        return generateDijkstraTrace();
      case 'binary-search-tree':
        return generateBstSearchTrace();
      case 'dp-fibonacci':
        return generateFibonacciDpTrace(7);
      default:
        // Default conceptual trace
        return [
          {
            step: 0,
            description: `Concept demonstration for ${lesson.title}. Ready to trace instructions.`,
            array: rawArr,
            activeLine: 1,
          },
          {
            step: 1,
            description: `Analyzing inputs and preconditions for ${lesson.title}.`,
            array: rawArr,
            activeLine: 2,
          },
          {
            step: 2,
            description: `Executing deterministic step sequence for ${lesson.title}.`,
            array: rawArr,
            activeLine: 3,
            isComplete: true,
          },
        ];
    }
  };

  // Initialize Trace
  useEffect(() => {
    progressService.startLesson(lesson.id, lesson.flowerType);
    const initialTrace = generateTrace();
    setTraceSteps(initialTrace);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [lesson.id]);

  // Handle Playback Interval
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < traceSteps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, traceSteps.length, playbackSpeed]);

  // Controls
  const handlePlayPause = () => {
    if (currentStepIdx >= traceSteps.length - 1) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.max(0, prev - 1));
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentStepIdx((prev) => Math.min(traceSteps.length - 1, prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleApplyCustomInput = () => {
    try {
      const parsedArr = customArrayInput
        .split(',')
        .map((s) => Number(s.trim()))
        .filter((n) => !isNaN(n));
      const targetVal = Number(customTargetInput.trim()) || 42;

      if (parsedArr.length >= 2) {
        const newTrace = generateTrace(parsedArr, targetVal);
        setTraceSteps(newTrace);
        setCurrentStepIdx(0);
        setIsPlaying(false);
      }
    } catch (e) {
      console.warn('Invalid custom input');
    }
  };

  const handleCopyCode = () => {
    const codeToCopy = lesson.code[activeCodeLang];
    navigator.clipboard.writeText(codeToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleToggleBookmark = () => {
    const b = progressService.toggleBookmark(lesson.id);
    setIsBookmarked(b);
  };

  // Submit 5-question quiz
  const handleSubmitQuiz = () => {
    let score = 0;
    const incorrectIds: string[] = [];

    lesson.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      } else {
        incorrectIds.push(q.id);
      }
    });

    setQuizScore(score);
    setQuizSubmitted(true);

    // Record score in progress service
    progressService.recordQuizScore(lesson.id, score, incorrectIds, lesson.flowerType);
    onQuizCompleted();

    // If 5/5 Bloomed!
    if (score === 5) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFE0AF', '#F1B4B1', '#C6A8CE', '#939F7F'],
      });
    } else if (score < 3) {
      // Auto-prompt Relearn Mode
      setTimeout(() => setRelearnModalOpen(true), 1200);
    }
  };

  const currentStep = traceSteps[currentStepIdx] || { step: 0, description: 'Ready' };

  // Render Visualizer depending on category
  const renderVisualizerArea = () => {
    if (lesson.category === 'Graphs' || lesson.category === 'Shortest Path') {
      return <GraphVisualizer currentStep={currentStep} />;
    }
    if (lesson.category === 'Trees') {
      return <TreeVisualizer currentStep={currentStep} />;
    }
    if (lesson.category === 'Dynamic Programming') {
      return <DpTableVisualizer currentStep={currentStep} />;
    }
    return <ArrayBarVisualizer currentStep={currentStep} />;
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 flex flex-col gap-10">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-garden-secondary hover:text-garden-text transition-colors"
        >
          <span>← Back to Learning Path</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
              isBookmarked
                ? 'bg-dustyrose/30 border-dustyrose text-dustyrose-700 dark:text-dustyrose-300'
                : 'bg-white dark:bg-garden-darkcard border-garden-cardborder dark:border-garden-darkcardborder text-garden-secondary hover:text-garden-text'
            }`}
          >
            <Bookmark size={15} className={isBookmarked ? 'fill-dustyrose' : ''} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* ================================================== */}
      {/* SECTION 1: INTRODUCTION HERO                       */}
      {/* ================================================== */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-buttercream/30 via-dustyrose/20 to-softmauve/20 dark:from-buttercream/10 dark:via-dustyrose/10 dark:to-softmauve/10 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/70 dark:bg-garden-darkcard/70 border border-garden-cardborder dark:border-garden-darkcardborder text-garden-text dark:text-garden-darktext">
              Level {lesson.level} • {lesson.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-dustyrose/50 text-red-950 border border-dustyrose-400">
              {lesson.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-garden-darkcard/70 border border-garden-cardborder dark:border-garden-darkcardborder text-garden-secondary flex items-center gap-1">
              <Clock size={13} /> {lesson.estimatedMinutes} mins
            </span>
          </div>

          {/* Plant Flower Icon */}
          <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder flex items-center justify-center text-2xl shadow-sm">
            🌸
          </div>
        </div>

        <div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight mb-2">
            {lesson.title}
          </h1>
          <p className="text-base sm:text-lg text-garden-secondary dark:text-garden-darksecondary italic">
            "{lesson.tagline}"
          </p>
        </div>

        {/* Prerequisites & Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-garden-cardborder/60 dark:border-garden-darkcardborder/60 text-xs sm:text-sm">
          <div>
            <h4 className="font-bold text-garden-text dark:text-garden-darktext mb-1.5 flex items-center gap-1.5">
              <span>🌱 Prerequisites:</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {lesson.prerequisites.map((p, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/60 dark:bg-garden-darkcard/60 border border-garden-cardborder/50 text-garden-secondary">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-garden-text dark:text-garden-darktext mb-1.5 flex items-center gap-1.5">
              <span>🎯 Learning Objectives:</span>
            </h4>
            <ul className="space-y-1 text-garden-secondary dark:text-garden-darksecondary">
              {lesson.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-sagegreen font-bold">✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 2: EXPLAIN IT SIMPLY & ELI5               */}
      {/* ================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
              Explain It Simply
            </h2>
          </div>

          {/* ELI5 Toggle Button */}
          <button
            onClick={() => setShowEli5(!showEli5)}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showEli5
                ? 'bg-buttercream border-amber-300 text-amber-950 shadow-sm'
                : 'bg-garden-bg dark:bg-garden-darkbg border-garden-cardborder text-garden-secondary hover:text-garden-text'
            }`}
          >
            <Baby size={15} />
            <span>Explain Like I'm Five (ELI5)</span>
          </button>
        </div>

        {showEli5 ? (
          <div className="p-5 rounded-2xl bg-buttercream/30 dark:bg-buttercream/10 border border-buttercream-400 text-garden-text dark:text-garden-darktext leading-relaxed text-sm sm:text-base animate-fadeIn">
            <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">🧸 In Kindergarten Terms:</span>
            <p>{lesson.eli5}</p>
          </div>
        ) : (
          <p className="text-sm sm:text-base text-garden-text dark:text-garden-darktext leading-relaxed">
            {lesson.simpleExplanation}
          </p>
        )}
      </section>

      {/* ================================================== */}
      {/* SECTION 3 & 4: WHY DO WE NEED THIS? & REAL ANALOGY */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Why Do We Need This */}
        <section className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
              Why Do We Need This?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-garden-text dark:text-garden-darktext leading-relaxed">
            {lesson.whyNeeded.problemSolved}
          </p>
          <div className="mt-2 text-xs text-garden-secondary leading-relaxed border-t border-garden-cardborder/60 pt-3">
            <strong>Historical Context:</strong> {lesson.whyNeeded.historicalContext}
          </div>
        </section>

        {/* Real-Life Analogy */}
        <section className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
              Real-Life Analogy: {lesson.realLifeAnalogy.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-garden-text dark:text-garden-darktext leading-relaxed">
            {lesson.realLifeAnalogy.story}
          </p>
          <div className="mt-auto p-2.5 rounded-xl bg-sagegreen/10 border border-sagegreen/30 text-xs font-semibold text-sagegreen-500">
            🌱 Moral: {lesson.realLifeAnalogy.moral}
          </div>
        </section>
      </div>

      {/* ================================================== */}
      {/* SECTION 5: STEP-BY-STEP EXPLANATION                */}
      {/* ================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🪜</span>
          <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
            Step-by-Step Breakdown
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lesson.steps.map((st, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-garden-bg/50 dark:bg-garden-darkbg/50 border border-garden-cardborder dark:border-garden-darkcardborder flex flex-col gap-1.5"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-dustyrose-600">
                {st.phase}
              </div>
              <h4 className="font-semibold text-xs sm:text-sm text-garden-text dark:text-garden-darktext">
                {st.description}
              </h4>
              <p className="text-xs text-garden-secondary dark:text-garden-darksecondary leading-relaxed">
                {st.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 6: THE INTERACTIVE VISUALIZATION ENGINE    */}
      {/* ================================================== */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
              Interactive Visualization
            </h2>
          </div>

          {/* Playback Controls Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStepBack}
              disabled={currentStepIdx === 0}
              title="Previous Step"
              className="p-2.5 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-garden-text disabled:opacity-40 hover:bg-garden-bg shadow-sm"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={handlePlayPause}
              title={isPlaying ? 'Pause' : 'Play'}
              className="px-4 py-2.5 rounded-xl bg-dustyrose text-garden-text font-bold text-sm hover:bg-dustyrose-400 shadow-md flex items-center gap-1.5"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-garden-text" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              onClick={handleStepForward}
              disabled={currentStepIdx >= traceSteps.length - 1}
              title="Next Step"
              className="p-2.5 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-garden-text disabled:opacity-40 hover:bg-garden-bg shadow-sm"
            >
              <SkipForward size={16} />
            </button>
            <button
              onClick={handleReset}
              title="Restart from Step 0"
              className="p-2.5 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-garden-secondary hover:text-garden-text shadow-sm"
            >
              <RotateCcw size={16} />
            </button>

            {/* Speed Selector */}
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="px-2.5 py-2 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-xs font-semibold text-garden-text focus:outline-none"
            >
              <option value={1600}>0.5x Slow</option>
              <option value={1000}>1x Normal</option>
              <option value={400}>2x Fast</option>
            </select>
          </div>
        </div>

        {/* Current Execution State Callout */}
        <div className="p-4 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-dustyrose/30 text-garden-text font-mono text-xs font-bold">
              Step {currentStepIdx + 1} / {traceSteps.length}
            </span>
            <p className="text-xs sm:text-sm font-medium text-garden-text dark:text-garden-darktext">
              {currentStep.description}
            </p>
          </div>
          {currentStep.isComplete && (
            <span className="px-3 py-1 rounded-full bg-sagegreen/30 text-sagegreen-600 font-bold text-xs shrink-0 flex items-center gap-1">
              <CheckCircle2 size={14} /> Completed
            </span>
          )}
        </div>

        {/* Visualizer Renderer Container */}
        {renderVisualizerArea()}
      </section>

      {/* ================================================== */}
      {/* SECTION 7: TRY IT YOURSELF (CUSTOM INPUTS)         */}
      {/* ================================================== */}
      <section className="p-6 rounded-3xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎛️</span>
          <h3 className="font-heading font-bold text-base sm:text-lg text-garden-text dark:text-garden-darktext">
            Try It Yourself: Customize Inputs
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          <div className="flex-1 min-w-[240px] flex items-center gap-2">
            <span className="text-garden-secondary shrink-0 font-medium">Array:</span>
            <input
              type="text"
              value={customArrayInput}
              onChange={(e) => setCustomArrayInput(e.target.value)}
              placeholder="e.g. 14, 29, 8, 42, 19, 31"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-garden-text focus:outline-none focus:ring-2 focus:ring-dustyrose font-mono"
            />
          </div>

          {(lesson.category === 'Searching' || lesson.category === 'Trees') && (
            <div className="flex items-center gap-2">
              <span className="text-garden-secondary shrink-0 font-medium">Target:</span>
              <input
                type="text"
                value={customTargetInput}
                onChange={(e) => setCustomTargetInput(e.target.value)}
                placeholder="42"
                className="w-20 px-3 py-2 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-garden-text focus:outline-none focus:ring-2 focus:ring-dustyrose font-mono"
              />
            </div>
          )}

          <button
            onClick={handleApplyCustomInput}
            className="px-4 py-2 rounded-xl bg-dustyrose text-garden-text font-semibold hover:bg-dustyrose-400 transition-colors shadow-sm"
          >
            Run Custom Trace
          </button>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 8 & 9: PSEUDOCODE & MULTI-LANGUAGE CODE    */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 8: Pseudocode synced with step line */}
        <section className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-garden-cardborder">
            <h3 className="font-heading font-bold text-base text-garden-text dark:text-garden-darktext flex items-center gap-2">
              <span>📜</span> Pseudocode (Synced to Step)
            </h3>
            {currentStep.activeLine && (
              <span className="text-xs font-mono font-bold text-dustyrose-600">
                Line {currentStep.activeLine} Active
              </span>
            )}
          </div>

          <div className="space-y-1 font-mono text-xs overflow-x-auto py-2">
            {lesson.pseudocode.map((line) => {
              const isActive = currentStep.activeLine === line.line;
              return (
                <div
                  key={line.line}
                  className={`p-2 rounded-lg transition-all duration-200 flex items-start gap-2 ${
                    isActive
                      ? 'bg-dustyrose/40 text-garden-text font-bold border-l-4 border-dustyrose-500 shadow-sm'
                      : 'text-garden-secondary hover:bg-garden-bg'
                  }`}
                >
                  <span className="w-5 text-right opacity-50 select-none">{line.line}</span>
                  <div className="flex-1">
                    <div>{line.code}</div>
                    {isActive && (
                      <div className="text-[11px] font-sans font-normal text-dustyrose-700 dark:text-dustyrose-300 mt-0.5">
                        ➜ {line.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 9: Multi-Language Code */}
        <section className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-garden-cardborder">
            <h3 className="font-heading font-bold text-base text-garden-text dark:text-garden-darktext flex items-center gap-2">
              <span>💻</span> Code Implementation
            </h3>

            {/* Language tabs */}
            <div className="flex items-center gap-1">
              {(['python', 'javascript', 'cpp', 'java'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveCodeLang(lang)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase transition-all ${
                    activeCodeLang === lang
                      ? 'bg-dustyrose text-garden-text font-bold'
                      : 'text-garden-secondary hover:text-garden-text'
                  }`}
                >
                  {lang === 'cpp' ? 'C++' : lang}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={handleCopyCode}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/20 text-white hover:bg-black/40 text-xs flex items-center gap-1"
            >
              {copiedCode ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="p-4 rounded-2xl bg-garden-darkcard dark:bg-black/50 text-garden-darktext font-mono text-xs overflow-x-auto max-h-80 leading-relaxed">
              <code>{lesson.code[activeCodeLang]}</code>
            </pre>
          </div>
        </section>
      </div>

      {/* ================================================== */}
      {/* SECTION 10: TIME & SPACE COMPLEXITY                */}
      {/* ================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">⏱️</span>
          <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
            Time & Space Complexity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Best Case */}
          <div className="p-4 rounded-2xl bg-sagegreen/10 border border-sagegreen/30 flex flex-col gap-1">
            <span className="text-[11px] uppercase font-bold text-sagegreen">Best Case Time</span>
            <span className="font-heading font-extrabold text-2xl text-sagegreen">
              {lesson.complexity.bestTime}
            </span>
            <p className="text-xs text-garden-secondary mt-1">{lesson.complexity.bestReason}</p>
          </div>

          {/* Average Case */}
          <div className="p-4 rounded-2xl bg-buttercream/30 border border-buttercream-400 flex flex-col gap-1">
            <span className="text-[11px] uppercase font-bold text-amber-800 dark:text-amber-300">Average Case Time</span>
            <span className="font-heading font-extrabold text-2xl text-amber-900 dark:text-amber-200">
              {lesson.complexity.averageTime}
            </span>
            <p className="text-xs text-garden-secondary mt-1">{lesson.complexity.averageReason}</p>
          </div>

          {/* Worst Case */}
          <div className="p-4 rounded-2xl bg-dustyrose/20 border border-dustyrose-400 flex flex-col gap-1">
            <span className="text-[11px] uppercase font-bold text-red-900 dark:text-red-300">Worst Case Time</span>
            <span className="font-heading font-extrabold text-2xl text-red-950 dark:text-red-200">
              {lesson.complexity.worstTime}
            </span>
            <p className="text-xs text-garden-secondary mt-1">{lesson.complexity.worstReason}</p>
          </div>

          {/* Space */}
          <div className="p-4 rounded-2xl bg-softmauve/20 border border-softmauve-400 flex flex-col gap-1">
            <span className="text-[11px] uppercase font-bold text-softmauve-700 dark:text-softmauve-300">Auxiliary Space</span>
            <span className="font-heading font-extrabold text-2xl text-softmauve-900 dark:text-softmauve-100">
              {lesson.complexity.auxiliarySpace}
            </span>
            <p className="text-xs text-garden-secondary mt-1">{lesson.complexity.spaceReason}</p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 11 & 12: WHEN TO USE & COMMON MISTAKES     */}
      {/* ================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 11: When to Use */}
        <section className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
              When to Use It
            </h3>
          </div>
          <div className="space-y-3">
            {lesson.whenToUsePractical.map((pr, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-garden-bg/60 dark:bg-garden-darkbg/60 border border-garden-cardborder text-xs leading-relaxed">
                <div className="font-bold text-garden-text dark:text-garden-darktext mb-1">
                  Scenario: {pr.scenario}
                </div>
                <div className="text-garden-secondary mb-1">Reason: {pr.reason}</div>
                <div className="font-semibold text-sagegreen">➜ {pr.recommendation}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 12: Common Mistakes */}
        <section className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
              Common Mistakes to Avoid
            </h3>
          </div>
          <div className="space-y-3">
            {lesson.commonMistakes.map((mis, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-dustyrose/10 border border-dustyrose/30 text-xs leading-relaxed">
                <div className="font-bold text-red-900 dark:text-red-300 mb-1 flex items-center gap-1">
                  <AlertTriangle size={13} /> {mis.mistake}
                </div>
                <div className="text-garden-secondary mb-1">Why it happens: {mis.whyItHappens}</div>
                <div className="font-semibold text-sagegreen">How to fix: {mis.howToFix}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ================================================== */}
      {/* SECTION 13: THE 5-QUESTION QUIZ ENGINE             */}
      {/* ================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-garden-cardborder">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <div>
              <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
                Knowledge Check Quiz
              </h2>
              <p className="text-xs text-garden-secondary">
                5 unique questions: definition, concept, trace, practical, complexity.
              </p>
            </div>
          </div>

          {quizSubmitted && quizScore !== null && (
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm ${
                  quizScore === 5
                    ? 'bg-sagegreen text-white shadow-sage-glow'
                    : quizScore >= 3
                    ? 'bg-buttercream text-amber-950'
                    : 'bg-dustyrose text-red-950'
                }`}
              >
                {quizScore === 5 ? '🌸 5/5 Bloomed!' : quizScore >= 3 ? `🌱 ${quizScore}/5 Good Effort!` : `🥀 ${quizScore}/5 Needs Review`}
              </span>
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {lesson.quiz.map((q, qIdx) => {
            const hasChosen = selectedAnswers[qIdx] !== undefined;
            const chosenOption = selectedAnswers[qIdx];
            const isCorrect = chosenOption === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-garden-bg/40 dark:bg-garden-darkbg/40 border border-garden-cardborder dark:border-garden-darkcardborder flex flex-col gap-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-dustyrose-600">
                    Question {qIdx + 1} • {q.type}
                  </span>
                  {quizSubmitted && (
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isCorrect ? 'text-sagegreen' : 'text-red-500'
                      }`}
                    >
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </div>

                <p className="font-semibold text-sm sm:text-base text-garden-text dark:text-garden-darktext">
                  {q.question}
                </p>

                {/* 4 Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = chosenOption === oIdx;
                    let optStyle =
                      'bg-white dark:bg-garden-darkcard border-garden-cardborder dark:border-garden-darkcardborder text-garden-text dark:text-garden-darktext hover:bg-garden-hover';

                    if (quizSubmitted) {
                      if (oIdx === q.correctIndex) {
                        optStyle = 'bg-sagegreen/20 border-sagegreen text-sagegreen-500 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'bg-red-100 dark:bg-red-950/40 border-red-400 text-red-600 font-semibold';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-dustyrose/40 border-dustyrose text-garden-text font-bold shadow-sm';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: oIdx })}
                        className={`p-3 rounded-xl border text-xs sm:text-sm text-left transition-all ${optStyle}`}
                      >
                        <span className="font-mono font-bold mr-2">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Detailed explanation after submission */}
                {quizSubmitted && (
                  <div className="mt-2 p-3 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder text-xs leading-relaxed text-garden-secondary">
                    <strong className="text-garden-text dark:text-garden-darktext block mb-1">
                      Explanation:
                    </strong>
                    <p>{q.explanation}</p>
                    {q.miniExample && (
                      <p className="mt-1 font-mono text-dustyrose-600">
                        Example: {q.miniExample}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Retry Quiz Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-garden-cardborder">
          <span className="text-xs text-garden-secondary">
            {Object.keys(selectedAnswers).length} of {lesson.quiz.length} answered
          </span>

          <div className="flex items-center gap-3">
            {quizSubmitted ? (
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setQuizSubmitted(false);
                  setQuizScore(null);
                }}
                className="px-4 py-2 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder font-semibold text-xs sm:text-sm hover:bg-garden-bg transition-colors flex items-center gap-1.5"
              >
                <RotateCcw size={15} /> Retake Quiz
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < lesson.quiz.length}
                className="px-6 py-2.5 rounded-xl bg-dustyrose text-garden-text font-bold text-sm hover:bg-dustyrose-400 disabled:opacity-40 transition-colors shadow-md"
              >
                Submit Answers
              </button>
            )}

            {/* Relearn Mode Button */}
            <button
              onClick={() => setRelearnModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-buttercream text-amber-950 font-bold text-xs sm:text-sm hover:bg-buttercream-400 transition-colors flex items-center gap-1.5"
            >
              <span>🌷 Relearn Mode</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 14: RECAP & TAKEAWAYS                      */}
      {/* ================================================== */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-buttercream/20 via-dustyrose/20 to-sagegreen/20 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
            Lesson Recap & Final Botanical Bloom
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div>
            <h4 className="font-bold text-garden-text dark:text-garden-darktext mb-2">
              5 Key Takeaways:
            </h4>
            <ul className="space-y-1.5 text-garden-secondary dark:text-garden-darksecondary">
              {lesson.recap.takeaways.map((tak, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-dustyrose font-bold">🌸</span>
                  <span>{tak}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-garden-text dark:text-garden-darktext mb-2">
              Key Terminology:
            </h4>
            <div className="space-y-2">
              {lesson.recap.keyTerms.map((term, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/70 dark:bg-garden-darkcard/70 border border-garden-cardborder/60">
                  <strong className="text-garden-text dark:text-garden-darktext">{term.term}:</strong>{' '}
                  <span className="text-garden-secondary dark:text-garden-darksecondary">{term.definition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Challenge Prompt */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sagegreen">
              Challenge Question:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-garden-text dark:text-garden-darktext mt-0.5">
              {lesson.recap.finalChallengePrompt}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* RELEARN MODE MODAL (PART 8 SPECIFICATION)          */}
      {/* ================================================== */}
      {relearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-garden-cardborder">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌷</span>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-garden-text dark:text-garden-darktext">
                    Relearn Mode: {lesson.relearn.simplifiedTitle}
                  </h3>
                  <p className="text-xs text-garden-secondary">
                    A fresh, simpler perspective with baby steps and no pressure.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRelearnModalOpen(false)}
                className="p-1.5 rounded-full text-garden-secondary hover:text-garden-text hover:bg-garden-bg"
              >
                ✕
              </button>
            </div>

            {/* Encouraging Mascot Message */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-buttercream/40 to-dustyrose/30 border border-dustyrose-300 text-xs sm:text-sm font-medium text-garden-text leading-relaxed">
              "{lesson.relearn.buddyEncouragement}"
            </div>

            {/* Simpler Everyday Analogy */}
            <div>
              <h4 className="font-bold text-sm text-garden-text dark:text-garden-darktext mb-1">
                A Brand New Analogy:
              </h4>
              <p className="text-xs sm:text-sm text-garden-secondary leading-relaxed p-4 rounded-2xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder">
                {lesson.relearn.differentAnalogy}
              </p>
            </div>

            {/* Baby Steps */}
            <div>
              <h4 className="font-bold text-sm text-garden-text dark:text-garden-darktext mb-2">
                Bite-Sized Baby Steps:
              </h4>
              <div className="space-y-1.5 text-xs sm:text-sm text-garden-secondary">
                {lesson.relearn.babySteps.map((st, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder flex items-start gap-2">
                    <span className="text-dustyrose font-bold">🌸</span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Worked Example */}
            <div>
              <h4 className="font-bold text-sm text-garden-text dark:text-garden-darktext mb-1">
                Worked Micro-Example:
              </h4>
              <pre className="p-4 rounded-2xl bg-garden-bg dark:bg-black/40 text-garden-text dark:text-garden-darktext font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {lesson.relearn.workedExample}
              </pre>
            </div>

            {/* Mini Practice Quiz (3 questions) */}
            <div>
              <h4 className="font-bold text-sm text-garden-text dark:text-garden-darktext mb-2">
                Quick 3-Question Practice Check:
              </h4>
              <div className="space-y-4">
                {lesson.relearn.miniPractice.map((mq, mIdx) => (
                  <div key={mq.id} className="p-3.5 rounded-xl bg-garden-bg/50 border border-garden-cardborder text-xs flex flex-col gap-2">
                    <p className="font-semibold text-garden-text dark:text-garden-darktext">
                      {mIdx + 1}. {mq.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mq.options.map((opt, oIdx) => {
                        const isChosen = miniQuizAnswers[mIdx] === oIdx;
                        const isCorrect = oIdx === mq.correctIndex;
                        let btnStyle = 'bg-white border-garden-cardborder text-garden-text';
                        if (isChosen) {
                          btnStyle = isCorrect
                            ? 'bg-sagegreen/30 border-sagegreen text-sagegreen font-bold'
                            : 'bg-red-100 border-red-300 text-red-600';
                        }
                        return (
                          <button
                            key={oIdx}
                            onClick={() => setMiniQuizAnswers({ ...miniQuizAnswers, [mIdx]: oIdx })}
                            className={`p-2 rounded-lg border text-left text-xs ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Close / Return to Lesson */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-garden-cardborder">
              <button
                onClick={() => setRelearnModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-dustyrose text-garden-text font-bold text-sm hover:bg-dustyrose-400 transition-colors shadow-sm"
              >
                I'm Ready to Try Again! 🌸
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
