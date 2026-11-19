import React from 'react';
import { Sparkles, Flame, Flower2, Sprout, MapPin } from 'lucide-react';
import { UserProgress } from '../../types';
import { GARDEN_REGIONS } from './gardenData';

interface Props {
  progress: UserProgress;
  onJumpToRegion: (regionId: string) => void;
  activeRegionId?: string;
}

export const GardenStatsHeader: React.FC<Props> = ({
  progress,
  onJumpToRegion,
  activeRegionId,
}) => {
  const bloomedCount = progress.gardenPlants.filter((p) => p.stage === 'bloomed').length;
  const sproutCount = progress.gardenPlants.filter((p) => p.stage === 'sprout').length;
  const seedCount = progress.gardenPlants.filter((p) => p.stage === 'seed').length;
  const butterfliesCount = Math.max(1, Math.floor(progress.streak * 1.5));

  return (
    <section className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-buttercream/40 via-dustyrose/25 to-sagegreen/30 dark:from-buttercream/15 dark:via-dustyrose/15 dark:to-sagegreen/15 border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
      {/* Top Banner Content */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder text-xs font-semibold text-garden-text dark:text-garden-darktext shadow-sm">
            <span>🌷</span>
            <span>Interactive Botanical Adventure Map</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
            My Learning Garden
          </h1>
          <p className="text-xs sm:text-sm text-garden-secondary dark:text-garden-darksecondary leading-relaxed">
            Follow the winding garden pathway through 7 enchanted computational regions. Every algorithm you master awakens new stepping stones, blooms vibrant flora, and expands your personal learning world.
          </p>
        </div>

        {/* Real Dynamic Botanical Statistics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto">
          {/* Bloomed Flowers */}
          <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 border border-garden-cardborder text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-lg">🌸</span>
              <span className="font-heading font-extrabold text-xl text-dustyrose-600 dark:text-dustyrose-400">
                {bloomedCount}
              </span>
            </div>
            <span className="text-[11px] font-bold text-garden-secondary">Bloomed Flora</span>
          </div>

          {/* Seeds & Sprouts */}
          <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 border border-garden-cardborder text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-lg">🌱</span>
              <span className="font-heading font-extrabold text-xl text-sagegreen">
                {sproutCount + seedCount}
              </span>
            </div>
            <span className="text-[11px] font-bold text-garden-secondary">Sprouts In Soil</span>
          </div>

          {/* Butterflies Attracted (Streak Based) */}
          <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 border border-buttercream-400 text-center shadow-sm relative group">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-lg animate-float">🦋</span>
              <span className="font-heading font-extrabold text-xl text-amber-600">
                {butterfliesCount}
              </span>
            </div>
            <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
              {progress.streak}d Streak
            </span>
          </div>

          {/* Total Garden XP */}
          <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 border border-softmauve-300 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Sparkles size={16} className="text-softmauve-500" />
              <span className="font-heading font-extrabold text-xl text-softmauve-700 dark:text-softmauve-300">
                {progress.xp}
              </span>
            </div>
            <span className="text-[11px] font-bold text-garden-secondary">Total Garden XP</span>
          </div>
        </div>
      </div>

      {/* Region Quick-Jump Navigator Pills */}
      <div className="pt-2 border-t border-garden-cardborder/60 dark:border-garden-darkcardborder/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-garden-secondary shrink-0">
          <MapPin size={14} className="text-dustyrose-500" />
          <span>Jump to Garden Region:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
          {GARDEN_REGIONS.map((region) => {
            const isActive = activeRegionId === region.id;
            return (
              <button
                key={region.id}
                onClick={() => onJumpToRegion(region.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-dustyrose border-dustyrose text-garden-text font-bold shadow-sm scale-105'
                    : 'bg-white/80 dark:bg-garden-darkcard/80 border-garden-cardborder text-garden-secondary hover:text-garden-text hover:bg-white'
                }`}
              >
                <span>{region.icon}</span>
                <span>{region.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
