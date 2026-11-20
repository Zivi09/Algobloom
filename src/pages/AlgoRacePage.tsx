import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Swords,
  Timer,
  Trophy,
  Users,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RaceQuestion, RacePlayer } from '../types';

interface AlgoRacePageProps {
  onEarnXp?: (amount: number) => void;
}

const RACE_QUESTIONS: RaceQuestion[] = [
  {
    id: 'race-q1',
    algorithmName: 'Binary Search',
    question: 'In an array of 64 sorted items, what is the maximum number of comparisons Binary Search needs?',
    options: ['6 comparisons', '7 comparisons', '8 comparisons', '32 comparisons'],
    correctIndex: 0,
    timeLimit: 12,
    explanation: 'log2(64) = 6 comparisons. Each comparison halves the search space!',
  },
  {
    id: 'race-q2',
    algorithmName: 'Merge Sort',
    question: 'What is the worst-case time complexity of Merge Sort on an array of size n?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctIndex: 1,
    timeLimit: 12,
    explanation: 'Merge sort always divides into halves and merges in linear time: O(n log n) in all cases.',
  },
  {
    id: 'race-q3',
    algorithmName: 'Breadth-First Search',
    question: 'Which underlying data structure guarantees BFS visits nodes in order of shortest unweighted distance?',
    options: ['Stack (LIFO)', 'Queue (FIFO)', 'Priority Queue', 'Binary Tree'],
    correctIndex: 1,
    timeLimit: 12,
    explanation: 'A FIFO Queue ensures nodes discovered earliest are explored first layer-by-layer.',
  },
  {
    id: 'race-q4',
    algorithmName: 'Dijkstra’s Algorithm',
    question: 'Dijkstra’s algorithm fails or may produce incorrect shortest paths when graphs contain what?',
    options: ['Cycles', 'Multiple components', 'Negative edge weights', 'Directed edges'],
    correctIndex: 2,
    timeLimit: 12,
    explanation: 'Negative weights can cause greedily finalized vertices to be re-relaxed with shorter paths.',
  },
  {
    id: 'race-q5',
    algorithmName: 'Dynamic Programming',
    question: 'What two properties indicate that a problem can be solved using Dynamic Programming?',
    options: [
      'Divide & conquer and randomness',
      'Optimal substructure and overlapping subproblems',
      'Greedy choice and linearity',
      'Sorting and binary reduction',
    ],
    correctIndex: 1,
    timeLimit: 12,
    explanation: 'Optimal substructure means optimal solutions contain optimal sub-solutions, and overlapping subproblems allow memoization.',
  },
];

export const AlgoRacePage: React.FC<AlgoRacePageProps> = ({ onEarnXp }) => {
  const [gameState, setGameState] = useState<'lobby' | 'matchmaking' | 'racing' | 'podium'>('lobby');
  const [roomCode, setRoomCode] = useState('');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(12);
  const [isAnswered, setIsAnswered] = useState(false);

  // Player and Opponent states
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const opponentIntervalRef = useRef<any>(null);

  // Matchmaking simulation
  const startMatchmaking = () => {
    setGameState('matchmaking');
    setTimeout(() => {
      startRace();
    }, 2200);
  };

  const startRace = () => {
    setGameState('racing');
    setCurrentQIndex(0);
    setPlayerScore(0);
    setOpponentProgress(0);
    setOpponentScore(0);
    setTimeLeft(12);
    setSelectedOption(null);
    setIsAnswered(false);

    // Simulate opponent progression in real-time
    if (opponentIntervalRef.current) clearInterval(opponentIntervalRef.current);
    opponentIntervalRef.current = setInterval(() => {
      setOpponentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(opponentIntervalRef.current);
          return 100;
        }
        // Random incremental progress
        const inc = Math.random() > 0.4 ? 12 : 5;
        const next = Math.min(100, prev + inc);
        if (next >= 100) {
          setOpponentScore((s) => s + (Math.random() > 0.3 ? 80 : 50));
        }
        return next;
      });
    }, 1800);
  };

  // Timer loop for question
  useEffect(() => {
    if (gameState !== 'racing' || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time ran out on this question
          handleSelectAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentQIndex, isAnswered]);

  const handleSelectAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(optionIdx);

    const currentQ = RACE_QUESTIONS[currentQIndex];
    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      const speedBonus = timeLeft * 3;
      setPlayerScore((prev) => prev + 100 + speedBonus);
    }

    setTimeout(() => {
      if (currentQIndex < RACE_QUESTIONS.length - 1) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        setTimeLeft(12);
      } else {
        // Finished race!
        endRace();
      }
    }, 1400);
  };

  const endRace = () => {
    if (opponentIntervalRef.current) clearInterval(opponentIntervalRef.current);
    setGameState('podium');
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F1B4B1', '#C6DBBB', '#FFF6D6', '#E29578'],
    });
    if (onEarnXp) {
      onEarnXp(80);
    }
  };

  const currentQ = RACE_QUESTIONS[currentQIndex];
  const playerPercent = Math.round(((currentQIndex + (isAnswered ? 1 : 0)) / RACE_QUESTIONS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-950/40 border border-dustyrose-400 text-red-900 dark:text-red-200 text-xs font-semibold">
          <Swords size={14} className="text-dustyrose-600" />
          <span>Real-time 1v1 Algorithmic Duel</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          AlgoRace Arena ⚡🌸
        </h1>
        <p className="text-sm text-garden-secondary dark:text-garden-darksecondary max-w-lg mx-auto">
          Challenge peers in rapid algorithm prediction duels. Solve trace questions quickly to bloom your digital garden first!
        </p>
      </div>

      {/* LOBBY VIEW */}
      {gameState === 'lobby' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Match Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-dustyrose/20 text-dustyrose-600 flex items-center justify-center text-2xl">
                ⚡
              </div>
              <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
                Quick Match Duel
              </h2>
              <p className="text-xs text-garden-secondary leading-relaxed">
                Automatically match with a fellow botanist of similar league tier for a 5-question speedrun challenge.
              </p>
            </div>

            <button
              onClick={startMatchmaking}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-dustyrose to-softmauve hover:brightness-105 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Zap size={16} />
              <span>Find Match (1v1)</span>
            </button>
          </div>

          {/* Private Room Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#92B890]/20 text-[#2E5A30] dark:text-[#C6DBBB] flex items-center justify-center text-2xl">
                🗝️
              </div>
              <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
                Private Duel Room
              </h2>
              <p className="text-xs text-garden-secondary leading-relaxed">
                Enter a 6-character room code or generate an invite code to duel a classmate or study partner.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter 6-char Room Code"
                maxLength={6}
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-2.5 rounded-2xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm font-mono tracking-widest text-center text-garden-text dark:text-garden-darktext uppercase focus:outline-none focus:ring-2 focus:ring-dustyrose"
              />
              <button
                onClick={startMatchmaking}
                disabled={!roomCode.trim()}
                className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder hover:bg-garden-bg text-garden-text dark:text-garden-darktext font-bold text-xs shadow-sm transition-all disabled:opacity-50"
              >
                Join Private Duel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MATCHMAKING VIEW */}
      {gameState === 'matchmaking' && (
        <div className="py-20 text-center space-y-6 bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden">
          <div className="w-16 h-16 border-4 border-dustyrose border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
              Matching with a Botanist...
            </h3>
            <p className="text-xs text-garden-secondary">
              Searching active learners in Budding Grove & Blossom Sanctuary
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-buttercream/50 text-amber-900 text-xs font-semibold">
            <span>Opponent found: <strong>Leo Varma (@lotus_coder)</strong></span>
            <span>🪷</span>
          </div>
        </div>
      )}

      {/* RACING VIEW */}
      {gameState === 'racing' && (
        <div className="space-y-6">
          {/* Synchronized Live Track Banner */}
          <div className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden space-y-5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2 text-garden-text dark:text-garden-darktext">
                <span>🌸 You (Cherry Coder)</span>
                <span className="text-dustyrose-600 font-extrabold">{playerScore} pts</span>
              </span>
              <span className="flex items-center gap-2 text-garden-secondary">
                <span>Leo Varma (@lotus_coder) 🪷</span>
                <span>{opponentScore} pts</span>
              </span>
            </div>

            {/* Dual Progress Bars */}
            <div className="space-y-3">
              {/* You */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-garden-secondary">
                  <span>Your Flower Bloom</span>
                  <span>{playerPercent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-dustyrose to-softmauve transition-all duration-300 rounded-full"
                    style={{ width: `${playerPercent}%` }}
                  />
                </div>
              </div>

              {/* Opponent */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-garden-secondary">
                  <span>Opponent Bloom</span>
                  <span>{opponentProgress}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#92B890] to-buttercream transition-all duration-300 rounded-full"
                    style={{ width: `${opponentProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Current Question Arena */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden space-y-6">
            {/* Top Question Header */}
            <div className="flex items-center justify-between border-b border-garden-cardborder dark:border-garden-darkcardborder pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-dustyrose-600 dark:text-dustyrose-300">
                  {currentQ.algorithmName}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-garden-text dark:text-garden-darktext">
                  Question {currentQIndex + 1} of {RACE_QUESTIONS.length}
                </h3>
              </div>

              {/* Timer Pill */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  timeLeft <= 4
                    ? 'bg-red-100 text-red-700 animate-pulse'
                    : 'bg-buttercream/50 dark:bg-buttercream/20 text-amber-900 dark:text-amber-200'
                }`}
              >
                <Timer size={14} />
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Prompt */}
            <p className="text-sm sm:text-base font-medium text-garden-text dark:text-garden-darktext leading-relaxed">
              {currentQ.question}
            </p>

            {/* 4 Rapid Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle =
                  'bg-garden-bg/60 dark:bg-garden-darkbg/60 border-garden-cardborder dark:border-garden-darkcardborder hover:border-dustyrose';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-green-100 dark:bg-green-950/40 border-green-500 text-green-900 dark:text-green-200';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-100 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={16} className="text-green-600 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={16} className="text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation reveal */}
            {isAnswered && (
              <div className="p-3.5 rounded-2xl bg-dustyrose/10 border border-dustyrose-300 dark:border-dustyrose/20 text-xs text-garden-text dark:text-garden-darktext animate-fadeIn">
                <span className="font-bold">Insight:</span> {currentQ.explanation}
              </div>
            )}
          </div>
        </div>
      )}

      {/* PODIUM VIEW */}
      {gameState === 'podium' && (
        <div className="p-8 sm:p-12 text-center bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg space-y-6">
          <div className="text-6xl animate-bounce">🏆</div>
          <div className="space-y-2">
            <h2 className="font-heading font-extrabold text-3xl text-garden-text dark:text-garden-darktext">
              {playerScore >= opponentScore ? 'Victory! You Bloomed First! 🌸' : 'Good Duel! Flower Blooming! 🌿'}
            </h2>
            <p className="text-sm text-garden-secondary">
              Final Score: <strong>{playerScore} pts</strong> vs Opponent <strong>{opponentScore} pts</strong>
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-buttercream/60 dark:bg-buttercream/20 text-amber-900 dark:text-amber-200 text-xs font-bold">
            <Sparkles size={16} className="text-amber-500" />
            <span>Awarded +80 AlgoRace XP & Floral Laurel Badge!</span>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={startMatchmaking}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-dustyrose to-softmauve hover:brightness-105 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw size={15} />
              <span>Rematch / New Duel</span>
            </button>
            <button
              onClick={() => setGameState('lobby')}
              className="px-6 py-3 rounded-2xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder hover:bg-garden-hover text-garden-text dark:text-garden-darktext font-bold text-xs transition-all"
            >
              Back to Arena Lobby
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AlgoRacePage;
