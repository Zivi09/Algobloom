import React, { useState } from 'react';
import {
  Flower2,
  Sparkles,
  Flame,
  Award,
  Sun,
  Droplets,
  Sprout,
  Compass,
  Map,
  Boxes,
} from 'lucide-react';
import { UserProgress } from '../types';
import { ACHIEVEMENTS } from '../services/progressService';
import { WatercolorGardenMap } from '../components/WatercolorGardenMap';

interface GardenPageProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

export const GardenPage: React.FC<GardenPageProps> = ({ progress, onSelectLesson }) => {
  const [activeTab, setActiveTab] = useState<'storybook-map' | 'flowerbeds' | 'achievements'>('storybook-map');
  const [selectedGardenPlot, setSelectedGardenPlot] = useState<string>('all');

  const bloomedCount = progress.gardenPlants.filter((p) => p.stage === 'bloomed').length;
  const sproutCount = progress.gardenPlants.filter((p) => p.stage === 'sprout').length;
  const seedCount = progress.gardenPlants.filter((p) => p.stage === 'seed').length;

  const getFlowerEmoji = (type: string, stage: string) => {
    if (stage === 'seed') return '🌱';
    if (stage === 'sprout') return '🌿';
    switch (type) {
      case 'rose':
        return '🌹';
      case 'cherry-blossom':
        return '🌸';
      case 'lotus':
        return '🪷';
      case 'sunflower':
        return '🌻';
      case 'tulip':
        return '🌷';
      case 'orchid':
        return '🌺';
      case 'daisy':
        return '🌼';
      default:
        return '🌸';
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 flex flex-col gap-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-buttercream/40 via-dustyrose/30 to-sagegreen/30 dark:from-buttercream/15 dark:via-dustyrose/15 dark:to-sagegreen/15 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-garden-darkcard/70 border border-garden-cardborder text-xs font-semibold text-garden-text">
            <span>🎨🌷</span>
            <span>Watercolor Storybook Learning World</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
            My Learning Garden
          </h1>
          <p className="text-sm sm:text-base text-garden-secondary max-w-xl leading-relaxed">
            Welcome to your living computer science sanctuary. Every algorithm you master cultivates winding pathways, blooms vibrant flowers, and awakens enchanted landmarks across the storybook landscape.
          </p>
        </div>

        {/* Garden Statistics Wheel */}
        <div className="flex items-center gap-3">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder text-center shadow-sm">
            <span className="font-heading font-extrabold text-2xl text-sagegreen block">
              {bloomedCount}
            </span>
            <span className="text-[11px] font-semibold text-garden-secondary">Bloomed 🌸</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder text-center shadow-sm">
            <span className="font-heading font-extrabold text-2xl text-dustyrose block">
              {sproutCount}
            </span>
            <span className="text-[11px] font-semibold text-garden-secondary">Sprouting 🌿</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder text-center shadow-sm">
            <span className="font-heading font-extrabold text-2xl text-amber-600 block">
              {progress.streak}d
            </span>
            <span className="text-[11px] font-semibold text-garden-secondary">Butterflies 🦋</span>
          </div>
        </div>
      </section>

      {/* Butterflies and Bees Flutter Banner when streak >= 3 */}
      {progress.streak >= 3 && (
        <div className="p-4 rounded-2xl bg-buttercream/30 border border-buttercream-400 flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-amber-950 animate-pulseSubtle shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦋 🐝 🦋</span>
            <span>
              Your {progress.streak}-day streak has attracted butterflies and honeybees to pollinate your watercolor garden!
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-buttercream font-bold">
            Garden Flora Thriving
          </span>
        </div>
      )}

      {/* Garden Experience Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/70 dark:bg-garden-darkcard/70 border border-garden-cardborder w-fit shadow-sm">
        <button
          onClick={() => setActiveTab('storybook-map')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'storybook-map'
              ? 'bg-dustyrose text-garden-text shadow-sm'
              : 'text-garden-secondary hover:text-garden-text hover:bg-white/60'
          }`}
        >
          <Map size={16} />
          <span>Interactive Storybook Map 🎨</span>
        </button>

        <button
          onClick={() => setActiveTab('flowerbeds')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'flowerbeds'
              ? 'bg-dustyrose text-garden-text shadow-sm'
              : 'text-garden-secondary hover:text-garden-text hover:bg-white/60'
          }`}
        >
          <Flower2 size={16} />
          <span>Cultivated Flowerbeds ({progress.gardenPlants.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'achievements'
              ? 'bg-dustyrose text-garden-text shadow-sm'
              : 'text-garden-secondary hover:text-garden-text hover:bg-white/60'
          }`}
        >
          <Award size={16} />
          <span>Botanical Badges ({progress.achievements.length}/{ACHIEVEMENTS.length})</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE WATERCOLOR STORYBOOK GARDEN MAP */}
      {activeTab === 'storybook-map' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext flex items-center gap-2">
                <span>📖</span> The AlgoBloom Storybook Realm
              </h2>
              <p className="text-xs text-garden-secondary mt-0.5">
                Explore hand-painted watercolor hills, winding stone pathways, bubbling streams, and enchanted algorithmic landmarks.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-garden-secondary">
              <span className="w-2 h-2 rounded-full bg-sagegreen animate-ping" />
              <span>Click any marker to inspect landmark lore & start lessons</span>
            </div>
          </div>

          {/* The Primary Watercolor Garden Canvas Component */}
          <WatercolorGardenMap progress={progress} onSelectLesson={onSelectLesson} />
        </section>
      )}

      {/* TAB 2: CULTIVATED FLOWERBEDS GRID */}
      {activeTab === 'flowerbeds' && (
        <section className="p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-garden-cardborder">
            <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext flex items-center gap-2">
              <span>🌿</span> Cultivated Flowerbeds
            </h2>
            <span className="text-xs text-garden-secondary font-medium">
              {progress.gardenPlants.length} Plants in Soil
            </span>
          </div>

          {/* Flowerbeds Canvas Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {progress.gardenPlants.map((plant) => (
              <div
                key={plant.id}
                onClick={() => onSelectLesson(plant.algorithmId)}
                className="p-4 rounded-2xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder hover:border-dustyrose hover:shadow-garden-lg cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-2 group relative"
              >
                {/* Floating Flower Icon */}
                <div className="w-16 h-16 rounded-full bg-white dark:bg-garden-darkcard border border-garden-cardborder/80 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                  {getFlowerEmoji(plant.flowerType, plant.stage)}
                </div>

                {/* Plant Name */}
                <h4 className="font-heading font-bold text-xs text-garden-text dark:text-garden-darktext line-clamp-1 group-hover:text-dustyrose-600 transition-colors">
                  {plant.name}
                </h4>

                {/* Stage Badge */}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    plant.stage === 'bloomed'
                      ? 'bg-sagegreen/20 text-sagegreen-500'
                      : plant.stage === 'sprout'
                      ? 'bg-dustyrose/20 text-dustyrose-700'
                      : 'bg-buttercream/50 text-amber-900'
                  }`}
                >
                  {plant.stage}
                </span>
              </div>
            ))}

            {/* Plant Seed Placeholder slot */}
            <div
              onClick={() => onSelectLesson('binary-search')}
              className="p-4 rounded-2xl border-2 border-dashed border-garden-cardborder hover:border-dustyrose flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-colors p-6 min-h-[140px]"
            >
              <div className="w-12 h-12 rounded-full bg-garden-bg flex items-center justify-center text-xl text-garden-secondary">
                +
              </div>
              <span className="text-xs font-semibold text-garden-secondary">Plant New Seed</span>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: BOTANICAL ACHIEVEMENTS SHOWCASE */}
      {activeTab === 'achievements' && (
        <section className="p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
          <div className="pb-4 border-b border-garden-cardborder flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext flex items-center gap-2">
              <span>🏆</span> Botanical Achievement Badges
            </h2>
            <span className="text-xs font-bold text-sagegreen">
              {progress.achievements.length} of {ACHIEVEMENTS.length} Badges Earned
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((ach) => {
              const isUnlocked = progress.achievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-white to-garden-bg dark:from-garden-darkcard dark:to-garden-darkbg border-dustyrose shadow-sm'
                      : 'bg-garden-bg/40 dark:bg-garden-darkbg/40 border-garden-cardborder/60 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-buttercream/40 flex items-center justify-center text-2xl shadow-sm shrink-0">
                      {ach.icon}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-garden-text dark:text-garden-darktext">
                        {ach.title}
                      </h4>
                      <span className="text-[10px] text-sagegreen font-bold">+{ach.xpReward} XP</span>
                    </div>
                  </div>

                  <p className="text-xs text-garden-secondary leading-relaxed">
                    {ach.description}
                  </p>

                  <div className="pt-2 border-t border-garden-cardborder/40 text-[11px] font-semibold flex items-center justify-between">
                    <span className={isUnlocked ? 'text-sagegreen font-bold' : 'text-garden-secondary'}>
                      {isUnlocked ? '✓ Unlocked' : 'Locked'}
                    </span>
                    <span>Flower: {ach.flowerReward}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
