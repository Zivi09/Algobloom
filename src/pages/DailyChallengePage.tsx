import React, { useState } from 'react';
import { Calendar, Sparkles, CheckCircle2, RotateCcw, Lightbulb, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getTodayChallenge, DAILY_CHALLENGES } from '../services/dailyChallengeService';
import { ProgressService } from '../services/progressService';
import { UserProgress, DailyChallenge } from '../types';

interface DailyChallengePageProps {
  progress: UserProgress;
  onChallengeSolved: () => void;
}

export const DailyChallengePage: React.FC<DailyChallengePageProps> = ({
  progress,
  onChallengeSolved,
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<DailyChallenge>(getTodayChallenge());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const progressService = ProgressService.getInstance();
  const isAlreadyDone = progress.dailyChallengeCompletedDates.includes(
    new Date().toISOString().split('T')[0]
  );

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);

    if (selectedOption === selectedChallenge.correctIndex) {
      confetti({
        particleCount: 70,
        spread: 60,
        colors: ['#FFE0AF', '#F1B4B1', '#939F7F'],
      });
      progressService.completeDailyChallenge(selectedChallenge.id, selectedChallenge.xpReward);
      onChallengeSolved();
    }
  };

  const isCorrect = submitted && selectedOption === selectedChallenge.correctIndex;

  return (
    <div className="max-w-4xl mx-auto pb-20 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buttercream/50 border border-buttercream text-xs font-semibold text-amber-950">
          <Calendar size={13} />
          <span>Daily Botanical Puzzle</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Daily Algorithmic Challenge
        </h1>
        <p className="text-sm sm:text-base text-garden-secondary max-w-xl mx-auto">
          Keep your mental flora vibrant! Solve one curated conceptual or trace challenge every day to extend your learning streak.
        </p>
      </div>

      {/* Main Challenge Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-garden-cardborder">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <div>
              <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
                {selectedChallenge.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-garden-secondary mt-0.5">
                <span>{selectedChallenge.category}</span>
                <span>•</span>
                <span className="font-semibold text-dustyrose-600">{selectedChallenge.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-buttercream/40 text-amber-950 font-bold text-xs border border-buttercream">
              +{selectedChallenge.xpReward} XP Reward
            </span>
            {isAlreadyDone && (
              <span className="px-3 py-1 rounded-full bg-sagegreen/20 text-sagegreen-500 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 size={13} /> Completed Today
              </span>
            )}
          </div>
        </div>

        {/* Scenario description */}
        <div className="p-5 rounded-2xl bg-garden-bg/50 dark:bg-garden-darkbg/50 border border-garden-cardborder text-xs sm:text-sm text-garden-text dark:text-garden-darktext leading-relaxed">
          <strong className="block mb-1 font-heading text-dustyrose-600">The Scenario:</strong>
          <p>{selectedChallenge.scenario}</p>
        </div>

        {/* Question */}
        <div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-garden-text dark:text-garden-darktext mb-4">
            {selectedChallenge.question}
          </h3>

          {/* 4 Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedChallenge.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let style = 'bg-white dark:bg-garden-darkcard border-garden-cardborder hover:bg-garden-hover';

              if (submitted) {
                if (idx === selectedChallenge.correctIndex) {
                  style = 'bg-sagegreen/20 border-sagegreen text-sagegreen-500 font-bold';
                } else if (isSelected) {
                  style = 'bg-red-100 border-red-400 text-red-600 font-bold';
                }
              } else if (isSelected) {
                style = 'bg-dustyrose/40 border-dustyrose font-bold text-garden-text shadow-sm';
              }

              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => setSelectedOption(idx)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all ${style}`}
                >
                  <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="p-4 rounded-2xl bg-buttercream/20 border border-buttercream text-xs leading-relaxed text-amber-950 flex items-start gap-2 animate-fadeIn">
            <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-0.5 font-bold">AlgoBuddy Hint:</strong>
              {selectedChallenge.hint}
            </div>
          </div>
        )}

        {/* Solution Explanation after submission */}
        {submitted && (
          <div className="p-5 rounded-2xl bg-garden-bg/60 border border-garden-cardborder text-xs sm:text-sm text-garden-secondary leading-relaxed animate-fadeIn">
            <strong className="block mb-1 text-garden-text font-bold">
              {isCorrect ? '🎉 Splendidly Done! Explanation:' : '💡 Not quite, but learning is a process! Explanation:'}
            </strong>
            <p>{selectedChallenge.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-garden-cardborder">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-semibold text-garden-secondary hover:text-garden-text flex items-center gap-1.5"
          >
            <Lightbulb size={14} className="text-amber-500" />
            <span>{showHint ? 'Hide Hint' : 'Show AlgoBuddy Hint'}</span>
          </button>

          <div className="flex items-center gap-3">
            {submitted ? (
              <button
                onClick={() => {
                  setSelectedOption(null);
                  setSubmitted(false);
                }}
                className="px-4 py-2 rounded-xl bg-garden-bg border border-garden-cardborder text-xs font-semibold text-garden-text hover:bg-garden-hover flex items-center gap-1.5"
              >
                <RotateCcw size={14} /> Try Again
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-dustyrose text-garden-text font-bold text-sm hover:bg-dustyrose-400 disabled:opacity-40 shadow-sm transition-all"
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Challenge Archive Selector */}
      <div className="space-y-3">
        <h3 className="font-heading font-bold text-base text-garden-text dark:text-garden-darktext">
          More Daily Challenges
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DAILY_CHALLENGES.map((ch) => (
            <div
              key={ch.id}
              onClick={() => {
                setSelectedChallenge(ch);
                setSelectedOption(null);
                setSubmitted(false);
                setShowHint(false);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedChallenge.id === ch.id
                  ? 'bg-buttercream/30 border-amber-300 font-bold'
                  : 'bg-white dark:bg-garden-darkcard border-garden-cardborder hover:border-dustyrose'
              }`}
            >
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-garden-text dark:text-garden-darktext">
                  {ch.title}
                </h4>
                <span className="text-[11px] text-garden-secondary">{ch.category}</span>
              </div>
              <span className="text-[11px] text-dustyrose-600 font-bold">+{ch.xpReward} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
