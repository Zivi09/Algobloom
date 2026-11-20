import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  Play,
  ArrowRight,
  Compass,
  Clock,
  BookOpen,
  MapPin,
} from 'lucide-react';
import { CURRICULUM_LEVELS } from '../curriculum/levels';
import { UserProgress, TopicMetadata } from '../types';
import { ALL_LESSONS, LESSONS_BY_ID } from '../curriculum/lessons';
import { LivingGardenPathMap } from '../components/garden/LivingGardenPathMap';

interface LearningPathPageProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

export const LearningPathPage: React.FC<LearningPathPageProps> = ({
  progress,
  onSelectLesson,
}) => {
  // Find the next incomplete lesson
  const nextLesson =
    ALL_LESSONS.find((l) => !progress.completedLessons.includes(l.id)) || ALL_LESSONS[0];

  // Default to expanding the level where the learner is currently active
  const initialLevel = nextLesson ? nextLesson.level : 0;
  const [expandedLevel, setExpandedLevel] = useState<number>(initialLevel);

  // Fallback map to ensure every topic has a rich interactive lesson to explore
  const LEVEL_DEFAULT_LESSON: Record<number, string> = {
    0: 'what-is-an-algorithm',
    1: 'what-is-an-algorithm',
    2: 'binary-search',
    3: 'bubble-sort',
    4: 'big-o',
    5: 'bst',
    6: 'dp-fibonacci',
    7: 'bst',
    8: 'bfs',
    9: 'linear-search',
    10: 'dp-fibonacci',
    11: 'dijkstra',
    12: 'bst',
    13: 'dijkstra',
    14: 'big-o',
  };

  const handleTopicClick = (topic: TopicMetadata, lvlNum: number) => {
    if (topic.algorithmId && LESSONS_BY_ID[topic.algorithmId]) {
      onSelectLesson(topic.algorithmId);
    } else {
      const fallbackId = LEVEL_DEFAULT_LESSON[lvlNum] || 'what-is-an-algorithm';
      onSelectLesson(fallbackId);
    }
  };

  const getTopicStatus = (topic: TopicMetadata): 'not-started' | 'in-progress' | 'completed' | 'mastered' => {
    if (topic.algorithmId) {
      if (progress.masteredAlgorithms.includes(topic.algorithmId)) return 'mastered';
      if (progress.completedLessons.includes(topic.algorithmId)) return 'completed';
    }
    return 'not-started';
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 flex flex-col gap-6">
      {/* 1. COMPACT FRIENDLY PAGE HEADER */}
      <div className="space-y-1.5 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#74A250] dark:text-[#95CE64] uppercase tracking-wider">
          <span>🌷</span>
          <span>Your Learning Journey</span>
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2E3C27] dark:text-garden-darktext tracking-tight">
          Little steps, big blooms.
        </h1>

        <p className="text-xs sm:text-sm text-garden-secondary max-w-xl leading-relaxed">
          Follow your own path. Every lesson brings you closer to mastering algorithms.
        </p>
      </div>

      {/* 2. THE LIVING WATERCOLOR GARDEN PATH MAP */}
      <LivingGardenPathMap
        progress={progress}
        onSelectLesson={onSelectLesson}
        onExpandLevel={setExpandedLevel}
        currentLevel={initialLevel}
        levelDefaultLessons={LEVEL_DEFAULT_LESSON}
      />

      {/* 3. THE EXPANDED CURRENT LEARNING AREA & DESTINATIONS */}
      <div className="space-y-4">
        {CURRICULUM_LEVELS.map((lvl) => {
          const isExpanded = expandedLevel === lvl.level;
          const isCurrentActiveLevel = lvl.level === initialLevel;

          // Count completed algorithms in this level
          const completedInLevel = lvl.topics.filter(
            (t) => t.algorithmId && progress.completedLessons.includes(t.algorithmId)
          ).length;

          // Clean destination names matching botanical garden theme
          const destinationIcons: Record<number, string> = {
            0: '🌱',
            1: '🪴',
            2: '🌊',
            3: '🌷',
            4: '☀️',
            5: '🪜',
            6: '🪡',
            7: '🌳',
            8: '🌲',
            9: '📜',
            10: '🌸',
            11: '🌉',
            12: '🏛️',
            13: '🧪',
            14: '🏰',
          };

          const destinationIcon = destinationIcons[lvl.level] || '🌸';

          return (
            <div
              key={lvl.level}
              className={`rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-sm ${
                isExpanded
                  ? 'bg-white dark:bg-garden-darkcard border-[#74A250] shadow-garden'
                  : 'bg-white/85 dark:bg-garden-darkcard/85 border-[#DDE8C7] dark:border-garden-darkcardborder hover:border-[#74A250]/60'
              }`}
            >
              {/* Destination Header Row (Compact & Clean) */}
              <div
                onClick={() => setExpandedLevel(isExpanded ? -1 : lvl.level)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF6EC] dark:hover:bg-garden-darkbg/40 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 border ${
                      isCurrentActiveLevel
                        ? 'bg-[#EBF6D9] border-[#B8DC8B] shadow-sm'
                        : 'bg-[#F9F7EE] dark:bg-garden-darkbg border-[#E2DFC7]'
                    }`}
                  >
                    {destinationIcon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#74A250] dark:text-[#95CE64]">
                        Destination #{lvl.level}
                      </span>
                      {isCurrentActiveLevel && (
                        <span className="px-2 py-0.5 rounded-full bg-[#EBF6D9] text-[9px] font-bold text-[#55822F] border border-[#B8DC8B]">
                          You are here 🌱
                        </span>
                      )}
                      {completedInLevel > 0 && (
                        <span className="text-[10px] font-bold text-sagegreen flex items-center gap-0.5">
                          ✓ {completedInLevel} Bloomed
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-[#2E3C27] dark:text-garden-darktext">
                      {lvl.title}
                    </h3>

                    {!isExpanded && (
                      <p className="text-xs text-garden-secondary line-clamp-1 mt-0.5">
                        {lvl.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-garden-secondary hidden sm:inline font-medium">
                    {lvl.topicsCount} lessons
                  </span>
                  <div className="p-1.5 rounded-xl text-garden-secondary">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {/* 4. EXPANDED LESSON LIST (CLEAN VERTICAL LIST) */}
              {isExpanded && (
                <div className="p-4 sm:p-6 pt-0 border-t border-[#E8E4D0] bg-[#FAF8F0]/40 dark:bg-garden-darkbg/25 flex flex-col gap-4">
                  <p className="text-xs sm:text-sm text-garden-secondary italic font-serif pt-3">
                    "{lvl.description}"
                  </p>

                  <div className="space-y-2">
                    {lvl.topics.map((topic, topicIdx) => {
                      const status = getTopicStatus(topic);
                      const isNext = topic.algorithmId === nextLesson.id;

                      const formattedNum = String(topicIdx + 1).padStart(2, '0');

                      return (
                        <div
                          key={topic.id}
                          onClick={() => handleTopicClick(topic, lvl.level)}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                            isNext
                              ? 'bg-gradient-to-r from-[#F9A49E]/15 to-[#FFE0AF]/20 border-[#F9A49E] shadow-sm'
                              : 'bg-white dark:bg-garden-darkcard border-[#E2DFC7] hover:border-[#74A250] hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Step Milestone Number */}
                            <span className="font-mono text-xs font-bold text-garden-secondary/80 w-6 shrink-0">
                              {formattedNum}
                            </span>

                            {/* Status Icon */}
                            <div className="w-8 h-8 rounded-full bg-[#FAF6EC] dark:bg-garden-darkbg flex items-center justify-center text-sm shrink-0 border border-[#E2DFC7]">
                              {status === 'mastered' ? (
                                <span title="Mastered">✨🌸</span>
                              ) : status === 'completed' ? (
                                <span title="Completed">🌷</span>
                              ) : isNext ? (
                                <span title="Up Next">🌱</span>
                              ) : (
                                <span title="Not started" className="opacity-70">🌰</span>
                              )}
                            </div>

                            {/* Lesson Title & Single-Sentence Explanation */}
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-heading font-bold text-xs sm:text-sm text-[#2E3C27] dark:text-garden-darktext truncate group-hover:text-[#74A250] transition-colors">
                                  {topic.title}
                                </h4>
                                {isNext && (
                                  <span className="px-2 py-0.5 rounded-full bg-[#F9A49E] text-[9px] font-extrabold text-[#43201C]">
                                    Next Step
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] sm:text-xs text-garden-secondary truncate mt-0.5">
                                {topic.shortDescription}
                              </p>
                            </div>
                          </div>

                          {/* Quick Start / Review Action */}
                          <div className="shrink-0 flex items-center gap-2">
                            <span className="text-[11px] font-bold text-[#74A250] group-hover:translate-x-0.5 transition-transform hidden sm:inline">
                              {status === 'completed' ? 'Review' : 'Learn'}
                            </span>
                            <div className="p-1.5 rounded-xl bg-[#EBF6D9] text-[#55822F] group-hover:bg-[#74A250] group-hover:text-white transition-colors">
                              <Play size={12} className="fill-current" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ONE CLEAR CALL TO ACTION */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E8E4D0]">
                    <button
                      onClick={() => onSelectLesson(nextLesson.id)}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#74A250] hover:bg-[#628C40] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Continue Learning ({nextLesson.title})</span>
                      <ArrowRight size={15} />
                    </button>

                    <button
                      onClick={() => {
                        const nextLvl = (lvl.level + 1) % CURRICULUM_LEVELS.length;
                        setExpandedLevel(nextLvl);
                      }}
                      className="text-xs font-semibold text-garden-secondary hover:text-garden-text transition-colors"
                    >
                      Browse Next Destination →
                    </button>
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
