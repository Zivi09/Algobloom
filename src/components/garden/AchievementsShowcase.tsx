import React from 'react';
import { Award, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { UserProgress } from '../../types';
import { ACHIEVEMENTS } from '../../services/progressService';

interface Props {
  progress: UserProgress;
}

export const AchievementsShowcase: React.FC<Props> = ({ progress }) => {
  const unlockedCount = progress.achievements.length;

  return (
    <section className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-garden-darkcard border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-garden-cardborder">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-garden-text dark:text-garden-darktext flex items-center gap-2">
            <span>🏆</span> Botanical Achievement Badges
          </h2>
          <p className="text-xs text-garden-secondary mt-1">
            Milestones unlocked through curious exploration, daily care, and algorithmic mastery.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-buttercream/50 dark:bg-buttercream/20 border border-buttercream-400 text-xs font-bold text-amber-900 dark:text-amber-200">
          <span>{unlockedCount} of {ACHIEVEMENTS.length} Badges Earned</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = progress.achievements.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between gap-4 relative overflow-hidden ${
                isUnlocked
                  ? 'bg-gradient-to-br from-white via-buttercream/15 to-dustyrose/20 dark:from-garden-darkcard dark:to-garden-darkbg border-dustyrose shadow-sm hover:scale-105'
                  : 'bg-garden-bg/40 dark:bg-garden-darkbg/40 border-garden-cardborder/60 opacity-60'
              }`}
            >
              {/* Badge Icon & Header */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0 border ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-buttercream to-dustyrose border-dustyrose-300'
                      : 'bg-warmtaupe/20 border-garden-cardborder'
                  }`}
                >
                  {ach.icon}
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-garden-text dark:text-garden-darktext leading-snug">
                    {ach.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Sparkles size={12} className="text-amber-500" />
                    <span className="text-[11px] font-bold text-sagegreen">
                      +{ach.xpReward} Garden XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-garden-secondary leading-relaxed">
                {ach.description}
              </p>

              {/* Flower Reward & Status Footer */}
              <div className="pt-3 border-t border-garden-cardborder/50 flex items-center justify-between text-[11px] font-semibold">
                <div className="flex items-center gap-1">
                  <span>Flower:</span>
                  <span className="capitalize font-bold text-dustyrose-600 dark:text-dustyrose-400">
                    {ach.flowerReward}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {isUnlocked ? (
                    <span className="text-sagegreen font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} /> Unlocked
                    </span>
                  ) : (
                    <span className="text-garden-secondary flex items-center gap-1">
                      <Lock size={12} /> Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
