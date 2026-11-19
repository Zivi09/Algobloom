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

  // Exact pathway waypoints along the winding garden trail (15 levels from left to right)
  const PATH_WAYPOINTS = [
    { x: 95, y: 178, name: 'Seedling Nursery' },
    { x: 155, y: 165, name: 'Basic Data Structures' },
    { x: 215, y: 154, name: 'Searching Brook' },
    { x: 280, y: 148, name: 'Sorting Meadows' },
    { x: 350, y: 149, name: 'Complexity Knoll' },
    { x: 420, y: 152, name: 'Recursion Glade' },
    { x: 495, y: 135, name: 'Divide & Conquer Bridge' },
    { x: 555, y: 132, name: 'Treehouse Grove' },
    { x: 620, y: 126, name: 'Graphwood Forest' },
    { x: 675, y: 118, name: 'String Meadow' },
    { x: 725, y: 112, name: 'Dynamic Bloom Gardens' },
    { x: 770, y: 104, name: 'Deep Graphwood' },
    { x: 810, y: 98, name: 'Grand Conservatory' },
    { x: 845, y: 105, name: 'Alchemist Lab' },
    { x: 875, y: 115, name: 'Algorithm Castle' },
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
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-dustyrose-600 dark:text-dustyrose-400 uppercase tracking-wider">
          <span>🌷</span>
          <span>Your Learning Journey</span>
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-garden-text dark:text-garden-darktext tracking-tight">
          Little steps, big blooms.
        </h1>

        <p className="text-xs sm:text-sm text-garden-secondary max-w-xl leading-relaxed">
          Follow your own path. Every lesson brings you closer to mastering algorithms.
        </p>
      </div>

      {/* 2. COMPACT WATERCOLOR GARDEN JOURNEY ILLUSTRATION BANNER WITH "YOU ARE HERE" SPROUT */}
      <div className="space-y-2">
        <div className="relative w-full h-44 sm:h-52 rounded-3xl overflow-hidden border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-garden bg-[#BED6BC]">
          <svg
            viewBox="0 0 900 230"
            className="w-full h-full object-cover select-none pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="water-path-blur" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
              </filter>
            </defs>

            {/* Rolling Soft Sage & Pastel Green Hills */}
            <rect width="900" height="230" fill="#BED6BC" />
            <path d="M 0,140 Q 200,90 450,130 T 900,100 L 900,0 L 0,0 Z" fill="#A8C9A6" opacity="0.75" />
            <path d="M 0,110 Q 350,60 700,100 L 900,70 L 900,0 L 0,0 Z" fill="#9CBF9A" opacity="0.6" />

            {/* Serene Central Water Lily Pond (Inspired by Reference Art) */}
            <ellipse cx="360" cy="180" rx="75" ry="24" fill="#6FA6A0" opacity="0.85" filter="url(#water-path-blur)" />
            <ellipse cx="360" cy="180" rx="65" ry="19" fill="#84BFB8" />
            {/* Pond Water Lily Pads & Lotus */}
            <circle cx="335" cy="178" r="6" fill="#588A52" />
            <circle cx="380" cy="183" r="8" fill="#6A9D64" />
            <circle cx="382" cy="182" r="3" fill="#F1B4B1" />
            <ellipse cx="355" cy="182" rx="20" ry="6" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />

            {/* Winding Turquoise Stream */}
            <path
              d="M 460,230 C 480,180 500,140 530,90 T 560,0"
              fill="none"
              stroke="#5DA39D"
              strokeWidth="28"
              strokeLinecap="round"
              opacity="0.85"
              filter="url(#water-path-blur)"
            />
            <path
              d="M 460,230 C 480,180 500,140 530,90 T 560,0"
              fill="none"
              stroke="#7CBFB8"
              strokeWidth="18"
              strokeLinecap="round"
            />

            {/* Winding Cobblestone Pathway Base */}
            <path
              d="M 60,195 Q 220,150 420,155 T 750,110 Q 820,90 880,120"
              fill="none"
              stroke="#DFD7C7"
              strokeWidth="24"
              strokeLinecap="round"
              filter="url(#water-path-blur)"
            />
            <path
              d="M 60,195 Q 220,150 420,155 T 750,110 Q 820,90 880,120"
              fill="none"
              stroke="#EFE8D8"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Dotted Stepping Stones (Pink/Cream Dots from Reference Image) */}
            {PATH_WAYPOINTS.map((wp, i) => {
              const isPassed = i <= currentLevelIndex;
              return (
                <g key={`dot-${i}`}>
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r={isPassed ? 5 : 3.5}
                    fill={isPassed ? '#F1B4B1' : '#DFD7C7'}
                    stroke={isPassed ? '#DC6C66' : '#C6BEA7'}
                    strokeWidth="1.2"
                  />
                  {isPassed && i < currentLevelIndex && (
                    <circle cx={wp.x} cy={wp.y} r="1.5" fill="#FFE0AF" />
                  )}
                </g>
              );
            })}

            {/* Wooden Arch Bridge over stream */}
            <path d="M 470,142 Q 500,128 530,142" fill="none" stroke="#A88B68" strokeWidth="11" strokeLinecap="round" />
            <line x1="470" y1="137" x2="530" y2="137" stroke="#7A6040" strokeWidth="2.5" />

            {/* Soft Green Rounded Trees & Bushes */}
            {[
              { x: 190, y: 90, r: 26 },
              { x: 235, y: 105, r: 20 },
              { x: 440, y: 95, r: 18 },
              { x: 620, y: 70, r: 28 },
              { x: 670, y: 85, r: 22 },
            ].map((bush, i) => (
              <g key={`bush-${i}`}>
                <circle cx={bush.x} cy={bush.y} r={bush.r} fill="#94B88E" opacity="0.9" />
                <circle cx={bush.x - 3} cy={bush.y - 3} r={bush.r * 0.75} fill="#A6CA9F" />
              </g>
            ))}

            {/* Seedling Nursery Cottage (Left) */}
            <g transform="translate(45, 120)">
              <rect x="0" y="25" width="46" height="32" rx="3" fill="#EFE8D8" stroke="#877561" strokeWidth="1.5" />
              <polygon points="-5,28 23,-5 51,28" fill="#E2BD7E" stroke="#8A6B34" strokeWidth="1.5" />
              <rect x="18" y="38" width="10" height="19" rx="2" fill="#8C5C35" />
              <circle cx="23" cy="-12" r="4" fill="#FFFFFF" opacity="0.4" />
            </g>

            {/* Fluffy Pink Cherry Blossom Trees (Right) */}
            <g transform="translate(740, 45)">
              <circle cx="30" cy="40" r="32" fill="#F1B4B1" opacity="0.85" />
              <circle cx="55" cy="30" r="36" fill="#F7D7D5" opacity="0.9" />
              <circle cx="75" cy="45" r="28" fill="#F1B4B1" opacity="0.85" />
              <line x1="55" y1="50" x2="55" y2="110" stroke="#6B523E" strokeWidth="4" />
            </g>

            {/* Distant Castle Spire (Top Right) */}
            <g transform="translate(820, 18)">
              <rect x="10" y="25" width="26" height="40" rx="2" fill="#DFD7CE" stroke="#877561" strokeWidth="1.5" />
              <polygon points="6,25 23,-8 40,25" fill="#AC80B6" stroke="#6F4878" strokeWidth="1.5" />
            </g>

            {/* Pastel Flower Clusters dotted along the path */}
            {[
              { x: 120, y: 155, c: '#F1B4B1' },
              { x: 180, y: 135, c: '#FFE0AF' },
              { x: 250, y: 172, c: '#C6A8CE' },
              { x: 310, y: 132, c: '#F1B4B1' },
              { x: 440, y: 168, c: '#FFE0AF' },
              { x: 580, y: 112, c: '#F1B4B1' },
              { x: 645, y: 148, c: '#C6A8CE' },
              { x: 710, y: 92, c: '#FFE0AF' },
              { x: 790, y: 126, c: '#F1B4B1' },
            ].map((fl, i) => (
              <g key={`flower-${i}`} transform={`translate(${fl.x}, ${fl.y})`}>
                <circle cx="0" cy="0" r="3.5" fill={fl.c} />
                <circle cx="-2.5" cy="-2" r="2.5" fill={fl.c} opacity="0.9" />
                <circle cx="2.5" cy="-2" r="2.5" fill={fl.c} opacity="0.9" />
                <circle cx="0" cy="0" r="1.2" fill="#FFE0AF" />
              </g>
            ))}

            {/* THE CUTE "YOU ARE HERE" SPROUT TRAVELER CHARACTER */}
            <g
              transform={`translate(${currentPos.x}, ${currentPos.y})`}
              className="pointer-events-none"
            >
              {/* Floating "You are here!" speech bubble */}
              <g transform="translate(0, -48)" className="animate-float">
                <rect
                  x="-42"
                  y="-14"
                  width="84"
                  height="22"
                  rx="11"
                  fill="#FFFFFF"
                  stroke="#7DB850"
                  strokeWidth="2"
                  filter="drop-shadow(0 3px 6px rgba(0,0,0,0.18))"
                />
                <polygon points="-4,8 4,8 0,13" fill="#FFFFFF" stroke="#7DB850" strokeWidth="1" />
                <text
                  x="0"
                  y="1.5"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="800"
                  fill="#1B2B1D"
                  fontFamily="Inter, sans-serif"
                >
                  You are here! 🌱
                </text>
              </g>

              {/* Ground Shadow */}
              <ellipse cx="0" cy="6" rx="12" ry="4" fill="#425E33" opacity="0.3" />

              {/* Walking Feet */}
              <ellipse cx="-5" cy="5" rx="3.5" ry="2" fill="#588536" />
              <ellipse cx="5" cy="4" rx="3.5" ry="2" fill="#4B722C" />

              {/* Green Body / Overalls */}
              <rect x="-7" y="-7" width="14" height="11" rx="5" fill="#6EA044" />
              <line x1="-4" y1="-6" x2="-2" y2="-1" stroke="#4B722C" strokeWidth="1.2" />
              <line x1="4" y1="-6" x2="2" y2="-1" stroke="#4B722C" strokeWidth="1.2" />

              {/* Cute Round Lime Sprout Head */}
              <circle cx="0" cy="-14" r="13" fill="#BEE87F" stroke="#7CB642" strokeWidth="1.5" />

              {/* Rosy Blush Cheeks */}
              <ellipse cx="-6" cy="-11" rx="2.2" ry="1.4" fill="#F8A5B5" opacity="0.9" />
              <ellipse cx="6" cy="-11" rx="2.2" ry="1.4" fill="#F8A5B5" opacity="0.9" />

              {/* Happy Eyes with highlights */}
              <circle cx="-3.5" cy="-14" r="1.4" fill="#1C2E17" />
              <circle cx="3.5" cy="-14" r="1.4" fill="#1C2E17" />
              <circle cx="-3" cy="-14.5" r="0.5" fill="#FFFFFF" />
              <circle cx="4" cy="-14.5" r="0.5" fill="#FFFFFF" />

              {/* Sweet Smile */}
              <path d="M -2,-10 Q 0,-8 2,-10" fill="none" stroke="#1C2E17" strokeWidth="1.2" strokeLinecap="round" />

              {/* Twin Leaf Sprouts on top of head */}
              <g className="animate-pulseSubtle" style={{ transformOrigin: '0px -27px' }}>
                <path d="M 0,-26 C -7,-30 -8,-38 0,-38 C 3,-33 2,-29 0,-26 Z" fill="#6EA044" stroke="#4B722C" strokeWidth="0.9" />
                <path d="M 0,-26 C 7,-30 8,-38 0,-38 C -3,-33 -2,-29 0,-26 Z" fill="#88C454" stroke="#4B722C" strokeWidth="0.9" />
                <line x1="0" y1="-27" x2="0" y2="-25" stroke="#4B722C" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </div>

        {/* Dynamic Sprout Trail Progress Caption */}
        <div className="flex items-center justify-between px-2 text-xs text-garden-secondary">
          <div className="flex items-center gap-2">
            <span className="font-bold text-dustyrose-600 dark:text-dustyrose-400">
              🌱 Sprout Location:
            </span>
            <span className="font-semibold text-garden-text dark:text-garden-darktext">
              Destination #{initialLevel} — {CURRICULUM_LEVELS[initialLevel]?.title}
            </span>
          </div>
          <span className="font-medium hidden sm:inline">
            Step {currentLevelIndex + 1} of {PATH_WAYPOINTS.length} on the Garden Trail
          </span>
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
                  ? 'bg-white dark:bg-garden-darkcard border-dustyrose shadow-garden'
                  : 'bg-white/80 dark:bg-garden-darkcard/80 border-garden-cardborder/70 hover:border-dustyrose/60'
              }`}
            >
              {/* Destination Header Row (Compact & Clean) */}
              <div
                onClick={() => setExpandedLevel(isExpanded ? -1 : lvl.level)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-garden-bg/40 dark:hover:bg-garden-darkbg/40 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 border ${
                      isCurrentActiveLevel
                        ? 'bg-gradient-to-br from-buttercream to-dustyrose border-dustyrose-300 shadow-sm'
                        : 'bg-garden-bg dark:bg-garden-darkbg border-garden-cardborder'
                    }`}
                  >
                    {destinationIcon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-dustyrose-600 dark:text-dustyrose-400">
                        Destination #{lvl.level}
                      </span>
                      {isCurrentActiveLevel && (
                        <span className="px-2 py-0.5 rounded-full bg-dustyrose/20 text-[9px] font-bold text-dustyrose-700 dark:text-dustyrose-300">
                          Current Area
                        </span>
                      )}
                      {completedInLevel > 0 && (
                        <span className="text-[10px] font-bold text-sagegreen flex items-center gap-0.5">
                          ✓ {completedInLevel} Bloomed
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-garden-text dark:text-garden-darktext">
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
                <div className="p-4 sm:p-6 pt-0 border-t border-garden-cardborder/60 bg-garden-bg/25 dark:bg-garden-darkbg/25 flex flex-col gap-4">
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
                              ? 'bg-gradient-to-r from-dustyrose/20 to-buttercream/20 border-dustyrose shadow-sm'
                              : 'bg-white dark:bg-garden-darkcard border-garden-cardborder hover:border-dustyrose hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Step Milestone Number */}
                            <span className="font-mono text-xs font-bold text-garden-secondary/80 w-6 shrink-0">
                              {formattedNum}
                            </span>

                            {/* Status Icon */}
                            <div className="w-8 h-8 rounded-full bg-garden-bg dark:bg-garden-darkbg flex items-center justify-center text-sm shrink-0 border border-garden-cardborder/70">
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
                                <h4 className="font-heading font-bold text-xs sm:text-sm text-garden-text dark:text-garden-darktext truncate group-hover:text-dustyrose-600 transition-colors">
                                  {topic.title}
                                </h4>
                                {isNext && (
                                  <span className="px-2 py-0.5 rounded-full bg-dustyrose text-[9px] font-extrabold text-garden-text">
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
                            <span className="text-[11px] font-bold text-dustyrose-600 group-hover:translate-x-0.5 transition-transform hidden sm:inline">
                              {status === 'completed' ? 'Review' : 'Learn'}
                            </span>
                            <div className="p-1.5 rounded-xl bg-dustyrose/30 text-garden-text group-hover:bg-dustyrose transition-colors">
                              <Play size={12} className="fill-garden-text" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ONE CLEAR CALL TO ACTION */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-garden-cardborder/50">
                    <button
                      onClick={() => onSelectLesson(nextLesson.id)}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-dustyrose hover:bg-dustyrose-400 text-garden-text font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
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
