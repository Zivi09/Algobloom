import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  Unlock,
  Sparkles,
  Play,
  Flower2,
  ArrowRight,
} from 'lucide-react';
import { CURRICULUM_LEVELS } from '../curriculum/levels';
import { UserProgress } from '../types';
import { LESSONS_BY_ID } from '../curriculum/lessons';

interface LearningPathPageProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

export const LearningPathPage: React.FC<LearningPathPageProps> = ({
  progress,
  onSelectLesson,
}) => {
  const [expandedLevels, setExpandedLevels] = useState<number[]>([0, 1, 2, 3]);

  const toggleLevel = (lvlNum: number) => {
    if (expandedLevels.includes(lvlNum)) {
      setExpandedLevels(expandedLevels.filter((n) => n !== lvlNum));
    } else {
      setExpandedLevels([...expandedLevels, lvlNum]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mistylavender/40 border border-mistylavender text-xs font-semibold text-garden-text dark:text-garden-darktext">
          <span>🗺️</span>
          <span>Structured Computer Science Curriculum</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          The AlgoBloom Learning Path
        </h1>
        <p className="text-sm sm:text-base text-garden-secondary dark:text-garden-darksecondary max-w-xl mx-auto leading-relaxed">
          From absolute zero knowledge to advanced algorithmic thinking across 15 structured botanical levels.
        </p>
      </div>

      {/* Progressive Roadmap Stack */}
      <div className="space-y-6 relative">
        {CURRICULUM_LEVELS.map((lvl, idx) => {
          const isExpanded = expandedLevels.includes(lvl.level);
          const isUnlocked = progress.unlockedLevels.includes(lvl.level) || lvl.level <= 3;

          // Count completed algorithms in this level
          const completedInLevel = lvl.topics.filter(
            (t) => t.algorithmId && progress.completedLessons.includes(t.algorithmId)
          ).length;

          return (
            <div
              key={lvl.level}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-garden ${
                isUnlocked
                  ? 'bg-white dark:bg-garden-darkcard border-garden-cardborder dark:border-garden-darkcardborder'
                  : 'bg-garden-bg/40 dark:bg-garden-darkbg/40 border-garden-cardborder/40 opacity-80'
              }`}
            >
              {/* Level Header Bar */}
              <div
                onClick={() => toggleLevel(lvl.level)}
                className="p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-garden-bg/50 dark:hover:bg-garden-darkbg/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Level Number Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-buttercream via-dustyrose to-softmauve flex items-center justify-center font-heading font-black text-lg text-garden-text shadow-sm shrink-0">
                    {lvl.level}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-dustyrose-600">
                        Level {lvl.level}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-garden-bg dark:bg-garden-darkbg text-garden-secondary">
                        Area: {lvl.gardenArea}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-garden-text dark:text-garden-darktext">
                      {lvl.title}
                    </h3>
                    <p className="text-xs text-garden-secondary mt-0.5 italic">
                      "{lvl.subtitle}" — {lvl.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Progress Pill */}
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-semibold text-garden-text dark:text-garden-darktext block">
                      {lvl.topicsCount} Topics ({lvl.algorithmsCount} Algorithms)
                    </span>
                    {completedInLevel > 0 && (
                      <span className="text-[11px] text-sagegreen font-bold">
                        {completedInLevel} Completed
                      </span>
                    )}
                  </div>

                  {/* Expand Chevron */}
                  <div className="p-2 rounded-xl text-garden-secondary hover:text-garden-text">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              {/* Collapsible Topics Accordion */}
              {isExpanded && (
                <div className="p-6 pt-0 border-t border-garden-cardborder/60 dark:border-garden-darkcardborder/60 bg-garden-bg/20 dark:bg-garden-darkbg/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                    {lvl.topics.map((t) => {
                      const hasLesson = t.algorithmId && LESSONS_BY_ID[t.algorithmId];
                      const isCompleted = t.algorithmId && progress.completedLessons.includes(t.algorithmId);

                      return (
                        <div
                          key={t.id}
                          className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                            hasLesson
                              ? 'bg-white dark:bg-garden-darkcard border-garden-cardborder dark:border-garden-darkcardborder hover:border-dustyrose hover:shadow-sm cursor-pointer'
                              : 'bg-garden-bg/50 dark:bg-garden-darkbg/50 border-garden-cardborder/40'
                          }`}
                          onClick={() => {
                            if (t.algorithmId && hasLesson) {
                              onSelectLesson(t.algorithmId);
                            }
                          }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                {t.isAlgorithm ? (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-dustyrose/30 text-red-950 font-bold">
                                    Algorithm
                                  </span>
                                ) : (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-buttercream/50 text-amber-950 font-medium">
                                    Foundation
                                  </span>
                                )}
                                {isCompleted && (
                                  <span className="text-[10px] text-sagegreen font-bold flex items-center gap-0.5">
                                    <CheckCircle2 size={12} /> Bloomed
                                  </span>
                                )}
                              </div>
                              <h4 className="font-heading font-bold text-xs sm:text-sm text-garden-text dark:text-garden-darktext">
                                {t.title}
                              </h4>
                            </div>

                            {hasLesson && (
                              <button
                                title="Open Lesson"
                                className="p-1.5 rounded-lg bg-dustyrose/40 text-garden-text hover:bg-dustyrose"
                              >
                                <Play size={12} className="fill-garden-text" />
                              </button>
                            )}
                          </div>

                          <p className="text-[11px] text-garden-secondary line-clamp-2">
                            {t.shortDescription}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
