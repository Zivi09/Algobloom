import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Flame,
  Award,
  ChevronRight,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PredictionChallenge } from './predictionEngine';
import { ProgressService } from '../../services/progressService';

interface PredictStepChallengeProps {
  challenge: PredictionChallenge;
  stats: {
    correct: number;
    total: number;
    streak: number;
  };
  onAnswer: (isCorrect: boolean, selectedOptionId: string) => void;
  onContinue: () => void;
  onSkip?: () => void;
}

export const PredictStepChallenge: React.FC<PredictStepChallengeProps> = ({
  challenge,
  stats,
  onAnswer,
  onContinue,
  onSkip,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showXpBadge, setShowXpBadge] = useState<boolean>(false);

  // Reset state when challenge changes
  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowXpBadge(false);
  }, [challenge.id]);

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    const correct = optionId === challenge.correctOptionId;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    if (correct) {
      // Award XP via ProgressService
      try {
        ProgressService.getInstance().addXp(15);
      } catch (e) {
        console.warn('Could not add XP', e);
      }

      // Celebratory Confetti pop
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FFE0AF', '#F1B4B1', '#C6A8CE', '#939F7F'],
      });

      // Show floating +15 XP badge
      setShowXpBadge(true);
    }

    onAnswer(correct, optionId);
  };

  const isCorrect = selectedOptionId === challenge.correctOptionId;

  // Mascot expressive botanical face renderer
  const renderMascotFace = () => {
    if (!isAnswered) {
      // Pondering expression (curious eyes looking upward/side, tilted leaf)
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12 shrink-0 drop-shadow-sm select-none">
          <circle cx="32" cy="36" r="22" fill="#E8F2E6" stroke="#A0C29D" strokeWidth="2.5" />
          {/* Leaves on head */}
          <path
            d="M 32 14 C 28 6, 20 6, 22 14 C 24 18, 30 18, 32 16"
            fill="#939F7F"
            stroke="#64714F"
            strokeWidth="1.5"
            className="animate-pulse"
          />
          <path
            d="M 32 14 C 36 5, 46 7, 42 15 C 39 19, 34 18, 32 16"
            fill="#C6E374"
            stroke="#64714F"
            strokeWidth="1.5"
          />
          {/* Eyes looking up/side (pondering) */}
          <ellipse cx="25" cy="33" rx="3.5" ry="4" fill="#3D553F" />
          <circle cx="26.5" cy="31.5" r="1.5" fill="#FFFFFF" />
          <ellipse cx="39" cy="33" rx="3.5" ry="4" fill="#3D553F" />
          <circle cx="40.5" cy="31.5" r="1.5" fill="#FFFFFF" />
          {/* Cheeks */}
          <ellipse cx="20" cy="40" rx="3" ry="1.8" fill="#F1B4B1" opacity="0.6" />
          <ellipse cx="44" cy="40" rx="3" ry="1.8" fill="#F1B4B1" opacity="0.6" />
          {/* Pondering "o" mouth */}
          <ellipse cx="32" cy="43" rx="2.5" ry="3" fill="#3D553F" />
        </svg>
      );
    }

    if (isCorrect) {
      // Celebratory Joyful expression (^ _ ^ eyes, blooming head flower)
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12 shrink-0 drop-shadow-sm select-none animate-bounce">
          <circle cx="32" cy="36" r="22" fill="#FFF8EE" stroke="#EBB45B" strokeWidth="2.5" />
          {/* Blooming Head Blossom */}
          <circle cx="32" cy="12" r="5" fill="#FFE0AF" stroke="#EBB45B" strokeWidth="1.5" />
          <circle cx="26" cy="14" r="4.5" fill="#F1B4B1" />
          <circle cx="38" cy="14" r="4.5" fill="#F1B4B1" />
          <circle cx="32" cy="14" r="3" fill="#EBB45B" />
          {/* Happy ^ _ ^ eyes */}
          <path d="M 21 34 Q 25 30 29 34" stroke="#3D553F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 35 34 Q 39 30 43 34" stroke="#3D553F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Cheerful blush */}
          <ellipse cx="20" cy="40" rx="4" ry="2.2" fill="#F1B4B1" opacity="0.9" />
          <ellipse cx="44" cy="40" rx="4" ry="2.2" fill="#F1B4B1" opacity="0.9" />
          {/* Big happy open smile */}
          <path d="M 26 41 Q 32 48 38 41" stroke="#3D553F" strokeWidth="2.5" strokeLinecap="round" fill="#F1B4B1" />
        </svg>
      );
    }

    // Warm encouraging expression (supportive soft eyes, gentle smile)
    return (
      <svg viewBox="0 0 64 64" className="w-12 h-12 shrink-0 drop-shadow-sm select-none">
        <circle cx="32" cy="36" r="22" fill="#F4EDF6" stroke="#C6A8CE" strokeWidth="2.5" />
        {/* Soft leaf */}
        <path
          d="M 32 14 C 30 8, 22 8, 24 15 C 26 19, 31 18, 32 16"
          fill="#939F7F"
          stroke="#64714F"
          strokeWidth="1.5"
        />
        {/* Kind round eyes */}
        <ellipse cx="25" cy="34" rx="3.5" ry="4" fill="#3D553F" />
        <circle cx="26" cy="33" r="1.2" fill="#FFFFFF" />
        <ellipse cx="39" cy="34" rx="3.5" ry="4" fill="#3D553F" />
        <circle cx="40" cy="33" r="1.2" fill="#FFFFFF" />
        {/* Rosy blush */}
        <ellipse cx="20" cy="40" rx="3.5" ry="2" fill="#F1B4B1" opacity="0.7" />
        <ellipse cx="44" cy="40" rx="3.5" ry="2" fill="#F1B4B1" opacity="0.7" />
        {/* Warm gentle curved smile */}
        <path d="M 27 42 Q 32 46 37 42" stroke="#3D553F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-softmauve/40 bg-gradient-to-br from-white/95 via-buttercream/15 to-softmauve/20 dark:from-garden-darkcard dark:via-dustyrose/10 dark:to-softmauve/10 backdrop-blur-md shadow-garden-lg p-5 sm:p-7 transition-all duration-300 animate-fadeIn">
      {/* Floating +15 XP Badge when Correct */}
      {showXpBadge && (
        <div className="absolute top-4 right-6 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 text-amber-950 font-heading font-extrabold text-xs sm:text-sm shadow-garden-glow border border-amber-300 animate-bounce">
          <Sparkles size={16} className="text-amber-800" />
          <span>+15 XP Awarded! 🌸</span>
        </div>
      )}

      {/* Header Row: Mascot & Challenge Title + Stats Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-softmauve/25 dark:border-garden-darkcardborder">
        <div className="flex items-center gap-3">
          {renderMascotFace()}
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-softmauve/25 text-purple-900 dark:text-purple-200 border border-softmauve/30">
                🔮 Predict Mode
              </span>
              <span className="text-xs font-semibold text-garden-secondary dark:text-garden-darksecondary">
                Step {challenge.stepIndex + 1} Decision
              </span>
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-garden-text dark:text-garden-darktext tracking-tight mt-0.5">
              {!isAnswered
                ? "AlgoBuddy is Pondering... 🌱"
                : isCorrect
                ? "Blooming Brilliant! 🌸"
                : "A Gentle Stepping Stone 🌿"}
            </h3>
          </div>
        </div>

        {/* Prediction Session Stats Pill */}
        <div className="flex items-center gap-2">
          {stats.streak > 1 && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-300/80 text-amber-900 dark:text-amber-300 text-xs font-bold shadow-sm animate-pulse">
              <Flame size={14} className="text-amber-500 fill-amber-500" />
              <span>{stats.streak} Streak!</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 dark:bg-garden-darkcard/80 border border-softmauve/40 text-garden-text dark:text-garden-darktext text-xs font-semibold shadow-sm">
            <span>🎯</span>
            <span>
              {stats.correct} / {stats.total} Correct
              {stats.total > 0 && ` (${Math.round((stats.correct / stats.total) * 100)}%)`}
            </span>
          </div>
        </div>
      </div>

      {/* Prompt Question */}
      <div className="my-5">
        <p className="font-heading font-semibold text-sm sm:text-base text-garden-text dark:text-garden-darktext leading-relaxed">
          {challenge.question}
        </p>
        {challenge.hint && !isAnswered && (
          <p className="mt-1.5 text-xs text-garden-secondary dark:text-garden-darksecondary flex items-center gap-1.5 italic">
            <Info size={13} className="shrink-0 text-softmauve-500" />
            <span>Hint: {challenge.hint}</span>
          </p>
        )}
      </div>

      {/* Options Grid (Sunset Garden Styling) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {challenge.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isOptCorrect = opt.id === challenge.correctOptionId;

          let btnStyle =
            'border-garden-cardborder/70 dark:border-garden-darkcardborder bg-white/80 dark:bg-garden-darkcard/80 text-garden-text dark:text-garden-darktext hover:border-softmauve hover:bg-softmauve/15';

          if (isAnswered) {
            if (isOptCorrect) {
              btnStyle =
                'border-2 border-sagegreen bg-sagegreen/25 text-emerald-950 dark:text-emerald-100 ring-2 ring-sagegreen/30 shadow-sage-glow font-bold';
            } else if (isSelected && !isOptCorrect) {
              btnStyle =
                'border-2 border-dustyrose-400 bg-dustyrose/20 text-rose-950 dark:text-rose-200 line-through opacity-85';
            } else {
              btnStyle = 'opacity-40 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={isAnswered}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-1 shadow-sm ${btnStyle}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-xs sm:text-sm">{opt.label}</span>
                {isAnswered && isOptCorrect && (
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </div>
              {opt.sublabel && (
                <span className="text-[11px] sm:text-xs text-garden-secondary dark:text-garden-darksecondary">
                  {opt.sublabel}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Instant Feedback Area */}
      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed mb-5 animate-fadeIn flex flex-col gap-1.5 ${
            isCorrect
              ? 'bg-sagegreen/15 border-sagegreen/50 text-emerald-950 dark:text-emerald-100'
              : 'bg-buttercream/25 border-buttercream-400 text-amber-950 dark:text-amber-200'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5">
            {isCorrect ? (
              <>
                <Sparkles size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span>Correct! Algorithm Insight:</span>
              </>
            ) : (
              <>
                <HelpCircle size={16} className="text-amber-700 dark:text-amber-400" />
                <span>Gentle Explanation:</span>
              </>
            )}
          </div>
          <p>
            {isCorrect
              ? challenge.explanation
              : challenge.gentleExplanation || challenge.explanation}
          </p>
        </div>
      )}

      {/* Footer Controls: Continue Step Button & Skip Option */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {!isAnswered ? (
          <>
            <span className="text-xs text-garden-secondary dark:text-garden-darksecondary">
              Select what you think happens next to test your intuition!
            </span>
            {onSkip && (
              <button
                onClick={onSkip}
                className="text-xs font-semibold text-garden-secondary hover:text-garden-text underline underline-offset-2 transition-colors"
              >
                Skip Question
              </button>
            )}
          </>
        ) : (
          <div className="w-full flex items-center justify-between gap-3">
            <span className="text-xs text-garden-secondary dark:text-garden-darksecondary italic">
              Ready to witness the execution?
            </span>
            <button
              onClick={onContinue}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-dustyrose via-softmauve to-sagegreen hover:opacity-95 text-garden-text font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transform active:scale-95 transition-all"
            >
              <span>Continue Step</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
