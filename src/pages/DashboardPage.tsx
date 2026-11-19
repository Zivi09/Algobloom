import React from 'react';
import {
  Sparkles,
  ChevronRight,
  Play,
  Flower2,
  Clock,
  Compass,
  Sprout,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { UserProgress } from '../types';
import { ALL_LESSONS } from '../curriculum/lessons';

interface DashboardPageProps {
  progress: UserProgress;
  onNavigate: (page: string) => void;
  onSelectLesson: (lessonId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  progress,
  onNavigate,
  onSelectLesson,
}) => {
  const completedCount = progress.completedLessons.length;

  // Next recommended lesson: the first lesson the user has not completed yet
  const nextLesson =
    ALL_LESSONS.find((l) => !progress.completedLessons.includes(l.id)) || ALL_LESSONS[0];

  // 4 Simple Beginner Stages
  const journeyStages = [
    {
      id: 'basics',
      emoji: '🌱',
      title: 'Computer Science Basics',
      description: 'Start here and understand how algorithms work.',
      status: completedCount < 2 ? 'Active Journey' : 'Completed ✓',
      isCurrent: completedCount < 2,
      targetLessonId: 'what-is-an-algorithm',
    },
    {
      id: 'searching-sorting',
      emoji: '🌷',
      title: 'Searching & Sorting',
      description: 'Learn how computers find and organize information.',
      status: completedCount < 2 ? 'Up Next' : completedCount < 7 ? 'Active Journey' : 'Completed ✓',
      isCurrent: completedCount >= 2 && completedCount < 7,
      targetLessonId: 'binary-search',
    },
    {
      id: 'trees-graphs',
      emoji: '🌳',
      title: 'Trees & Graphs',
      description: 'Explore how information is connected in networks.',
      status: completedCount < 7 ? 'Waiting to Bloom' : completedCount < 12 ? 'Active Journey' : 'Completed ✓',
      isCurrent: completedCount >= 7 && completedCount < 12,
      targetLessonId: 'bst',
    },
    {
      id: 'advanced',
      emoji: '🌸',
      title: 'Advanced Algorithms',
      description: 'Discover more powerful problem-solving techniques.',
      status: completedCount < 12 ? 'Waiting to Bloom' : 'Active Journey',
      isCurrent: completedCount >= 12,
      targetLessonId: 'dp-fibonacci',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-24 flex flex-col gap-10">
      {/* 1. SIMPLIFIED FRIENDLY HERO SECTION */}
      <section className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-buttercream/35 via-dustyrose/25 to-softmauve/20 dark:from-buttercream/10 dark:via-dustyrose/10 dark:to-softmauve/10 border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder text-xs font-bold text-garden-text dark:text-garden-darktext shadow-sm">
            <span>🌸</span>
            <span>Hello, little learner!</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-garden-text dark:text-garden-darktext tracking-tight leading-tight">
            Ready to grow your <br className="hidden sm:inline" />
            <span className="text-dustyrose-600 dark:text-dustyrose-400">coding skills?</span>
          </h1>

          <p className="text-sm sm:text-base text-garden-secondary dark:text-garden-darksecondary max-w-lg leading-relaxed">
            Let's learn one tiny thing today. No pressure, just progress.
          </p>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center md:items-start gap-3">
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="px-8 py-4 rounded-2xl bg-dustyrose hover:bg-dustyrose-400 text-garden-text font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <Play size={18} className="fill-garden-text" />
              <span>Let's Start Learning</span>
            </button>
          </div>

          {/* First lesson indicator */}
          <p className="text-xs text-garden-secondary">
            Recommended step: <span className="font-semibold text-garden-text dark:text-garden-darktext">{nextLesson.title}</span> (~{nextLesson.estimatedMinutes} mins)
          </p>
        </div>

        {/* Cozy Botanical Watercolor Sprout Illustration */}
        <div className="relative shrink-0 flex items-center justify-center w-44 h-44 sm:w-52 sm:h-52">
          {/* Gentle background aura */}
          <div className="absolute inset-0 rounded-full bg-buttercream/40 dark:bg-buttercream/15 blur-2xl animate-pulseSubtle" />

          {/* Illustrated Sprout Pot */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/80 dark:bg-garden-darkcard/80 border-2 border-garden-cardborder shadow-garden-lg flex flex-col items-center justify-center text-center p-4">
            <span className="text-6xl sm:text-7xl animate-float">🌱</span>
            <span className="text-[11px] font-bold text-sagegreen mt-2">
              Ready to Bloom
            </span>
          </div>
        </div>
      </section>

      {/* 2. REDUCED STATISTICS (ONLY 2 STATS) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-garden-secondary">
            Look how far you've grown! 🌱
          </span>
          <button
            onClick={() => onNavigate('garden')}
            className="text-xs font-semibold text-dustyrose-600 dark:text-dustyrose-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Garden</span>
            <ChevronRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Lessons Completed */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-garden-darkcard border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sagegreen/20 flex items-center justify-center text-3xl shrink-0">
              🌱
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-garden-text dark:text-garden-darktext">
                {completedCount}
              </div>
              <div className="text-xs font-semibold text-garden-secondary">
                Lessons Completed
              </div>
            </div>
          </div>

          {/* Total Garden XP */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-garden-darkcard border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-softmauve/20 flex items-center justify-center text-3xl shrink-0">
              <Sparkles size={26} className="text-softmauve-500" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-garden-text dark:text-garden-darktext">
                {progress.xp}
              </div>
              <div className="text-xs font-semibold text-garden-secondary">
                Total Garden XP
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FRIENDLY NEXT-LESSON CARD (DYNAMIC BASED ON PROGRESS) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sagegreen/20 text-xs font-bold text-sagegreen-700 dark:text-sagegreen-300">
            <span>🌱</span>
            <span>Your next little adventure</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl text-garden-text dark:text-garden-darktext tracking-tight">
            {nextLesson.title}
          </h3>

          <p className="text-xs sm:text-sm text-garden-secondary max-w-lg leading-relaxed">
            {nextLesson.tagline}
          </p>

          <div className="flex items-center gap-3 pt-1 text-xs text-garden-secondary font-medium">
            <span className="flex items-center gap-1">
              <Clock size={13} /> ~{nextLesson.estimatedMinutes} minutes
            </span>
            <span>•</span>
            <span className="capitalize">{nextLesson.difficulty}</span>
            <span>•</span>
            <span className="text-sagegreen font-bold">+50 XP</span>
          </div>
        </div>

        <button
          onClick={() => onSelectLesson(nextLesson.id)}
          className="px-6 py-3.5 rounded-2xl bg-dustyrose hover:bg-dustyrose-400 text-garden-text font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Play size={16} className="fill-garden-text" />
          <span>Start Lesson</span>
        </button>
      </section>

      {/* 4. SIMPLE 4-STAGE LEARNING JOURNEY (PROGRESSIVE DISCLOSURE) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-garden-cardborder">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-garden-text dark:text-garden-darktext flex items-center gap-2">
              <span>🌿</span> Your Learning Journey
            </h2>
            <p className="text-xs text-garden-secondary mt-0.5">
              Take it one small step at a time. No rushing, just gentle curiosity.
            </p>
          </div>

          <button
            onClick={() => onNavigate('learning-path')}
            className="text-xs font-bold text-dustyrose-600 dark:text-dustyrose-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Explore All Topics</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 4 Approachable Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {journeyStages.map((stage) => (
            <div
              key={stage.id}
              onClick={() => onSelectLesson(stage.targetLessonId)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 group ${
                stage.isCurrent
                  ? 'bg-gradient-to-br from-buttercream/25 to-dustyrose/20 dark:from-buttercream/10 dark:to-dustyrose/10 border-dustyrose shadow-sm hover:scale-105'
                  : 'bg-garden-bg/40 dark:bg-garden-darkbg/40 border-garden-cardborder/70 hover:border-dustyrose'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-2xl">{stage.emoji}</span>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      stage.isCurrent
                        ? 'bg-dustyrose text-garden-text'
                        : stage.status.includes('✓')
                        ? 'bg-sagegreen/20 text-sagegreen'
                        : 'bg-garden-cardborder/60 text-garden-secondary'
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-base text-garden-text dark:text-garden-darktext group-hover:text-dustyrose-600 transition-colors">
                  {stage.title}
                </h4>

                <p className="text-xs text-garden-secondary mt-1 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-garden-cardborder/40 text-garden-secondary group-hover:text-garden-text">
                <span className="font-medium">
                  {stage.isCurrent ? 'Start this area' : 'View concepts'}
                </span>
                <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
