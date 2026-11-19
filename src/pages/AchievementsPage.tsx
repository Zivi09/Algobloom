import React from 'react';
import { Award, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { ACHIEVEMENTS } from '../services/progressService';
import { UserProgress } from '../types';

interface AchievementsPageProps {
  progress: UserProgress;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ progress }) => {
  const unlockedCount = ACHIEVEMENTS.filter((a) => progress.achievements.includes(a.id)).length;

  return (
    <div className="max-w-5xl mx-auto pb-20 flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buttercream/50 border border-buttercream text-xs font-semibold text-amber-950">
          <Award size={13} />
          <span>Botanical Honors</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Achievements & Badges
        </h1>
        <p className="text-sm sm:text-base text-garden-secondary max-w-xl">
          Earn distinctive botanical badges as you master algorithms, keep your streak, and solve challenges.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
          <span className="text-garden-text dark:text-garden-darktext">
            Achievements Unlocked: {unlockedCount} / {ACHIEVEMENTS.length}
          </span>
          <span className="text-dustyrose-600 font-bold">
            {Math.round((unlockedCount / ACHIEVEMENTS.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-garden-bg border border-garden-cardborder overflow-hidden">
          <div
            style={{ width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-buttercream via-dustyrose to-sagegreen rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = progress.achievements.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between gap-4 ${
                isUnlocked
                  ? 'bg-white dark:bg-garden-darkcard border-dustyrose shadow-garden hover:scale-105'
                  : 'bg-garden-bg/40 dark:bg-garden-darkbg/40 border-garden-cardborder/60 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-14 h-14 rounded-2xl bg-buttercream/40 flex items-center justify-center text-3xl shadow-sm">
                  {ach.icon}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-sagegreen/20 text-sagegreen-500 font-bold text-xs">
                  +{ach.xpReward} XP
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-garden-text dark:text-garden-darktext mb-1">
                  {ach.title}
                </h3>
                <p className="text-xs text-garden-secondary leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-garden-cardborder/40 text-xs font-semibold flex items-center justify-between">
                <span className={isUnlocked ? 'text-sagegreen font-bold flex items-center gap-1' : 'text-garden-secondary'}>
                  {isUnlocked ? <><CheckCircle2 size={13} /> Unlocked</> : <><Lock size={13} /> Locked</>}
                </span>
                <span className="text-garden-secondary text-[11px]">Flower: {ach.flowerReward}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
