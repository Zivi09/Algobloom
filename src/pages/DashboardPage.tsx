import React from 'react';
import {
  Sparkles,
  Flame,
  BookOpen,
  Award,
  ChevronRight,
  Play,
  Flower2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { UserProgress } from '../types';
import { CURRICULUM_LEVELS } from '../curriculum/levels';
import { getTodayChallenge } from '../services/dailyChallengeService';
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
  const todayChallenge = getTodayChallenge();
  const isChallengeDone = progress.dailyChallengeCompletedDates.includes(
    new Date().toISOString().split('T')[0]
  );

  const completedCount = progress.completedLessons.length;
  const masteredCount = progress.masteredAlgorithms.length;
  const bloomedFlowers = progress.gardenPlants.filter((p) => p.stage === 'bloomed').length;

  // Next recommended lesson: first uncompleted lesson
  const nextLesson = ALL_LESSONS.find((l) => !progress.completedLessons.includes(l.id)) || ALL_LESSONS[0];

  return (
    <div className="max-w-6xl mx-auto pb-16 flex flex-col gap-8">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-buttercream/40 via-dustyrose/30 to-softmauve/30 dark:from-buttercream/15 dark:via-dustyrose/15 dark:to-softmauve/15 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-garden-darkcard/70 border border-garden-cardborder text-xs font-semibold text-garden-text dark:text-garden-darktext">
            <span>🌸</span>
            <span>Welcome back, {progress.name}!</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight leading-tight">
            Learn algorithms. <br />
            <span className="text-dustyrose-600 dark:text-dustyrose-400">Bloom with confidence.</span>
          </h1>
          <p className="text-sm sm:text-base text-garden-secondary dark:text-garden-darksecondary max-w-lg leading-relaxed">
            Your learning garden is growing. Step into interactive algorithmic visualizers, master computer science fundamentals, and cultivate your skills.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="px-6 py-3 rounded-2xl bg-dustyrose text-garden-text font-bold text-sm hover:bg-dustyrose-400 active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              <Play size={16} className="fill-garden-text" />
              <span>START LEARNING ({nextLesson.title})</span>
            </button>
            <button
              onClick={() => onNavigate('learning-path')}
              className="px-5 py-3 rounded-2xl bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder dark:border-garden-darkcardborder text-garden-text font-semibold text-sm hover:bg-white transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Explore Curriculum</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Mascot Botanical Card */}
        <div className="w-56 h-56 rounded-3xl bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg p-5 flex flex-col items-center justify-center text-center relative group">
          <div className="w-24 h-24 rounded-full bg-buttercream/50 flex items-center justify-center text-5xl mb-2 animate-float">
            🌸
          </div>
          <h3 className="font-heading font-bold text-sm text-garden-text dark:text-garden-darktext">
            AlgoBuddy
          </h3>
          <p className="text-[11px] text-garden-secondary mt-1">
            "Your curiosity is the sunshine that makes your understanding blossom!"
          </p>
        </div>
      </section>

      {/* Stats Counter Row */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-buttercream/40 flex items-center justify-center text-2xl">
            🔥
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl text-garden-text dark:text-garden-darktext">
              {progress.streak} Days
            </div>
            <div className="text-xs text-garden-secondary font-medium">Learning Streak</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-dustyrose/30 flex items-center justify-center text-2xl">
            ✨
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl text-garden-text dark:text-garden-darktext">
              {progress.xp}
            </div>
            <div className="text-xs text-garden-secondary font-medium">Total Garden XP</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sagegreen/20 flex items-center justify-center text-2xl">
            🌱
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl text-garden-text dark:text-garden-darktext">
              {completedCount}
            </div>
            <div className="text-xs text-garden-secondary font-medium">Lessons Completed</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-softmauve/20 flex items-center justify-center text-2xl">
            🌸
          </div>
          <div>
            <div className="font-heading font-extrabold text-2xl text-garden-text dark:text-garden-darktext">
              {bloomedFlowers}
            </div>
            <div className="text-xs text-garden-secondary font-medium">Flowers Bloomed</div>
          </div>
        </div>
      </section>

      {/* Main 2-column section: Continue Learning & Daily Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 spans): Continue Learning & Recommended */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌿</span>
                <h2 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
                  Continue Your Learning
                </h2>
              </div>
              <span className="text-xs font-semibold text-garden-secondary">
                Recommended Next Step
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-buttercream/20 dark:bg-buttercream/10 border border-buttercream-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-buttercream text-amber-950 font-bold uppercase">
                    Level {nextLesson.level}
                  </span>
                  <span className="text-[10px] font-semibold text-garden-secondary">
                    {nextLesson.category}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
                  {nextLesson.title}
                </h3>
                <p className="text-xs text-garden-secondary mt-0.5 max-w-md">
                  {nextLesson.tagline}
                </p>
              </div>

              <button
                onClick={() => onSelectLesson(nextLesson.id)}
                className="px-5 py-2.5 rounded-xl bg-dustyrose text-garden-text font-bold text-xs sm:text-sm hover:bg-dustyrose-400 shadow-sm shrink-0 flex items-center gap-1.5"
              >
                <span>Jump In</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Featured Level Roadmap Previews */}
          <div className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
                Core Learning Levels
              </h2>
              <button
                onClick={() => onNavigate('learning-path')}
                className="text-xs font-semibold text-dustyrose-600 hover:text-dustyrose-800 flex items-center gap-1"
              >
                <span>View All 15 Levels</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CURRICULUM_LEVELS.slice(0, 4).map((lvl) => (
                <div
                  key={lvl.level}
                  onClick={() => onNavigate('learning-path')}
                  className="p-4 rounded-2xl bg-garden-bg/60 dark:bg-garden-darkbg/60 border border-garden-cardborder dark:border-garden-darkcardborder hover:border-dustyrose cursor-pointer transition-all flex flex-col justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-dustyrose-600 uppercase tracking-wider">
                        Level {lvl.level}
                      </span>
                      <span className="text-garden-secondary">{lvl.topicsCount} Topics</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-garden-text dark:text-garden-darktext group-hover:text-dustyrose-600 transition-colors">
                      {lvl.title}
                    </h4>
                    <p className="text-xs text-garden-secondary mt-1 line-clamp-2">
                      {lvl.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-garden-cardborder/40 text-garden-secondary">
                    <span>Area: {lvl.gardenArea}</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Daily Challenge & Quick Links */}
        <div className="space-y-6">
          {/* Daily Challenge Spotlight */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-buttercream/40 to-dustyrose/30 dark:from-buttercream/15 dark:to-dustyrose/15 border border-buttercream-400 shadow-garden flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-amber-800 dark:text-amber-300" />
                <h3 className="font-heading font-bold text-base text-garden-text dark:text-garden-darktext">
                  Daily Challenge
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/70 text-xs font-bold text-amber-900 border border-buttercream-400">
                +{todayChallenge.xpReward} XP
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-garden-text dark:text-garden-darktext mb-1">
                {todayChallenge.title}
              </h4>
              <p className="text-xs text-garden-secondary line-clamp-3 leading-relaxed">
                {todayChallenge.scenario}
              </p>
            </div>

            <button
              onClick={() => onNavigate('daily-challenges')}
              className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                isChallengeDone
                  ? 'bg-sagegreen text-white cursor-default'
                  : 'bg-white dark:bg-garden-darkcard text-garden-text hover:bg-garden-hover'
              }`}
            >
              {isChallengeDone ? (
                <>
                  <CheckCircle2 size={15} /> Completed Today
                </>
              ) : (
                <>Solve Challenge ➔</>
              )}
            </button>
          </div>

          {/* Quick Learning Garden Snapshot */}
          <div className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flower2 size={18} className="text-sagegreen" />
                <h3 className="font-heading font-bold text-base text-garden-text dark:text-garden-darktext">
                  My Garden
                </h3>
              </div>
              <button
                onClick={() => onNavigate('garden')}
                className="text-xs font-semibold text-dustyrose-600 hover:underline"
              >
                Visit Garden
              </button>
            </div>

            <p className="text-xs text-garden-secondary leading-relaxed">
              Every lesson you start plants a seed. Every algorithm you master blooms into a beautiful flower.
            </p>

            {/* Plants Preview Grid */}
            <div className="flex flex-wrap gap-2 pt-2">
              {progress.gardenPlants.slice(0, 6).map((plant) => (
                <div
                  key={plant.id}
                  title={`${plant.name} (${plant.stage})`}
                  className="w-11 h-11 rounded-xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer"
                >
                  {plant.stage === 'bloomed' ? '🌸' : plant.stage === 'sprout' ? '🌿' : '🌱'}
                </div>
              ))}
              {progress.gardenPlants.length === 0 && (
                <span className="text-xs text-garden-secondary italic">No seeds planted yet. Start a lesson!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
