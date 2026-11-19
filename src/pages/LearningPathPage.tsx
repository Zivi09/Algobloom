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
  const [hoveredWaypoint, setHoveredWaypoint] = useState<number | null>(null);

  // Exact 15 waypoints carefully mapped along the winding path of sprout-garden-path.jpg (857x467)
  const PATH_WAYPOINTS = [
    { x: 350, y: 440, name: 'The Nursery Gate', level: 0 },
    { x: 290, y: 448, name: 'Lower Meadow Path', level: 0 },
    { x: 230, y: 442, name: 'Data Structure Basin', level: 1 },
    { x: 170, y: 418, name: 'Pond Bank Walkway', level: 1 },
    { x: 120, y: 372, name: 'Linear Search Shore', level: 2 },
    { x: 95, y: 310, name: 'Binary Search Curve', level: 2 },
    { x: 105, y: 245, name: 'Sorting Meadow Ridge', level: 3 },
    { x: 140, y: 190, name: 'Quick Sort Fork', level: 3 },
    { x: 195, y: 165, name: 'Complexity Ascent', level: 4 },
    { x: 260, y: 175, name: 'Recursion Glade', level: 5 },
    { x: 330, y: 195, name: 'Divide & Conquer Way', level: 6 },
    { x: 405, y: 170, name: 'The Treehouse Grove', level: 7 }, // The exact Sprout position in the painting!
    { x: 480, y: 230, name: 'Graphwood Forest', level: 8 },
    { x: 560, y: 275, name: 'Dynamic Bloom Gardens', level: 10 },
    { x: 640, y: 300, name: 'The Algorithmic Castle', level: 14 },
  ];

  const currentLevelIndex = Math.min(
    PATH_WAYPOINTS.length - 1,
    Math.max(0, initialLevel)
  );
  const currentPos = PATH_WAYPOINTS[currentLevelIndex];

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

      {/* 2. THE EXACT WATERCOLOR ILLUSTRATION WITH INTERACTIVE "YOU ARE HERE" TRAIL */}
      <div className="space-y-2">
        <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#D8E6BE] dark:border-[#2E3A32] shadow-garden bg-[#FAF3E3]">
          {/* High-Resolution Exact Reference Artwork (857x467) */}
          <img
            src="/sprout-garden-path.jpg"
            alt="You Are Here Garden Path"
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Precision Interactive SVG Overlay Layer */}
          <svg
            viewBox="0 0 857 467"
            className="absolute inset-0 w-full h-full pointer-events-auto"
            preserveAspectRatio="none"
          >
            {/* Interactive Milestone Stepping Stone Markers along the actual pink dotted path */}
            {PATH_WAYPOINTS.map((wp, i) => {
              const isPassed = i < currentLevelIndex;
              const isCurrent = i === currentLevelIndex;
              const isHovered = hoveredWaypoint === i;

              return (
                <g
                  key={`wp-${i}`}
                  className="cursor-pointer group"
                  onClick={() => {
                    setExpandedLevel(wp.level);
                    const lvl = CURRICULUM_LEVELS[wp.level];
                    const firstTopic = lvl?.topics.find((t) => t.algorithmId) || lvl?.topics[0];
                    if (firstTopic) handleTopicClick(firstTopic, wp.level);
                  }}
                  onMouseEnter={() => setHoveredWaypoint(i)}
                  onMouseLeave={() => setHoveredWaypoint(null)}
                >
                  {/* Outer Pulsing Glow on Current Milestone */}
                  {isCurrent && (
                    <circle
                      cx={wp.x}
                      cy={wp.y}
                      r="16"
                      fill="#F9A49E"
                      opacity="0.45"
                      className="animate-ping"
                      style={{ animationDuration: '2.5s' }}
                    />
                  )}

                  {/* Stepping Stone Disc */}
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r={isCurrent ? 9 : isHovered ? 8 : 6.5}
                    fill={isCurrent ? '#F9A49E' : isPassed ? '#FFAAA6' : '#FAF6E8'}
                    stroke={isCurrent ? '#DC6C66' : isPassed ? '#E2867F' : '#D1C6AC'}
                    strokeWidth={isCurrent ? '2.5' : '1.5'}
                    className="transition-all duration-200 drop-shadow-sm"
                  />

                  {/* Inner Bloomed Flower Center for completed stones */}
                  {isPassed && (
                    <circle cx={wp.x} cy={wp.y} r="2" fill="#FFE39A" />
                  )}

                  {/* Milestone Hover Tooltip */}
                  {isHovered && (
                    <g className="animate-fadeIn pointer-events-none">
                      <rect
                        x={wp.x - 70}
                        y={wp.y - 32}
                        width="140"
                        height="22"
                        rx="11"
                        fill="#FFFFFF"
                        stroke="#74A250"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
                      />
                      <text
                        x={wp.x}
                        y={wp.y - 17}
                        textAnchor="middle"
                        fill="#2E3C27"
                        fontSize="9.5"
                        fontWeight="700"
                        fontFamily="Inter, sans-serif"
                      >
                        {wp.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* FLOATING "YOU ARE HERE! 🌱" SPROUT BADGE DIRECTLY AT CURRENT POSITION */}
            <g
              transform={`translate(${currentPos.x}, ${currentPos.y})`}
              className="pointer-events-none"
            >
              {/* Floating Speech Bubble with Pointer */}
              <g transform="translate(0, -32)" className="animate-float">
                <rect
                  x="-46"
                  y="-15"
                  width="92"
                  height="24"
                  rx="12"
                  fill="#FFFFFF"
                  stroke="#74A250"
                  strokeWidth="2"
                  filter="drop-shadow(0 3px 6px rgba(0,0,0,0.18))"
                />
                <polygon points="-5,9 5,9 0,14" fill="#FFFFFF" stroke="#74A250" strokeWidth="1" />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="800"
                  fill="#2E3C27"
                  fontFamily="Inter, sans-serif"
                >
                  You are here! 🌱
                </text>
              </g>

              {/* Gentle Golden Sparkle around current avatar */}
              <circle cx="12" cy="-8" r="1.5" fill="#FFE39A" className="animate-ping" />
              <circle cx="-12" cy="-12" r="1.5" fill="#FFAAA6" className="animate-ping" style={{ animationDelay: '1s' }} />
            </g>
          </svg>
        </div>

        {/* Dynamic Sprout Trail Progress Caption */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2 text-xs text-garden-secondary">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#74A250] dark:text-[#95CE64]">
              🌱 Current Step:
            </span>
            <span className="font-semibold text-garden-text dark:text-garden-darktext">
              Destination #{initialLevel} — {CURRICULUM_LEVELS[initialLevel]?.title}
            </span>
          </div>

          <div className="flex items-center gap-3 font-medium">
            <span>
              Step {currentLevelIndex + 1} of {PATH_WAYPOINTS.length} on the Garden Trail
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EBF6D9] text-[#55822F] font-bold border border-[#CFE4A8]">
              {Math.round(((currentLevelIndex + 1) / PATH_WAYPOINTS.length) * 100)}% Explored
            </span>
          </div>
        </div>
      </div>

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
