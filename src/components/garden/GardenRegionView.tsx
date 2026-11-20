import React from 'react';
import { GardenRegionData, GardenMilestone } from './gardenData';
import { UserProgress } from '../../types';
import { Sparkles, Check, ChevronRight } from 'lucide-react';

interface Props {
  region: GardenRegionData;
  progress: UserProgress;
  onSelectMilestone: (milestone: GardenMilestone) => void;
  isFirst: boolean;
  isLast: boolean;
}

export const GardenRegionView: React.FC<Props> = ({
  region,
  progress,
  onSelectMilestone,
  isFirst,
  isLast,
}) => {
  const getMilestoneStatus = (milestone: GardenMilestone): 'not-started' | 'in-progress' | 'completed' | 'mastered' => {
    if (progress.masteredAlgorithms.includes(milestone.algorithmId)) {
      return 'mastered';
    }
    if (progress.completedLessons.includes(milestone.algorithmId)) {
      return 'completed';
    }
    const plant = progress.gardenPlants.find((p) => p.algorithmId === milestone.algorithmId);
    if (plant && (plant.stage === 'sprout' || plant.stage === 'bloomed')) {
      return plant.stage === 'bloomed' ? 'completed' : 'in-progress';
    }
    return 'not-started';
  };

  const getFlowerEmoji = (type: string, status: string) => {
    if (status === 'mastered') {
      switch (type) {
        case 'rose':
          return '🌹';
        case 'tulip':
          return '🌷';
        case 'sunflower':
          return '🌻';
        case 'orchid':
          return '🌺';
        case 'lotus':
          return '🪷';
        case 'cherry-blossom':
          return '🌸';
        default:
          return '🌸';
      }
    }
    if (status === 'completed') {
      return '🌷';
    }
    if (status === 'in-progress') {
      return '🌱';
    }
    return '🌰';
  };

  return (
    <div
      id={region.id}
      className="relative rounded-3xl overflow-hidden border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg bg-gradient-to-b from-[#BED6BC]/40 via-[#BED6BC]/20 to-[#BED6BC]/50 dark:from-[#1A231C] dark:via-[#151D17] dark:to-[#1A231C] p-6 sm:p-10 flex flex-col gap-8 transition-colors"
    >
      {/* Region Header Plaque */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-garden-cardborder/70 dark:border-garden-darkcardborder/70">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder flex items-center justify-center text-3xl shadow-sm">
            {region.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-dustyrose/30 border border-dustyrose-300 text-[10px] font-bold uppercase tracking-wider text-garden-text dark:text-garden-darktext">
                Area #{region.number} • {region.levelBadge}
              </span>
              <span className="text-xs font-semibold text-garden-secondary">
                {region.milestones.length} Milestones
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-garden-text dark:text-garden-darktext tracking-tight mt-0.5">
              {region.name}
            </h2>
            <p className="text-xs sm:text-sm text-garden-secondary font-medium">
              {region.subtitle}
            </p>
          </div>
        </div>

        {/* Region Flora Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          {region.floraTypes.map((flora, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-xl bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder text-[11px] font-medium text-garden-text dark:text-garden-darktext shadow-sm"
            >
              🌿 {flora}
            </span>
          ))}
        </div>
      </div>

      {/* Atmospheric Lore Intro */}
      <div className="p-4 rounded-2xl bg-white/60 dark:bg-garden-darkcard/60 border border-garden-cardborder text-xs sm:text-sm text-garden-secondary leading-relaxed italic font-serif">
        "{region.description}"
      </div>

      {/* Illustrated Interactive Pathway Trail (Winding Vertical Adventure Map) */}
      <div className="relative py-8 min-h-[420px] flex flex-col justify-between">
        {/* Continuous SVG Stepping Stone Winding Pathway Ribbon in Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle paper grain / watercolor blur filter */}
          <defs>
            <filter id={`wash-${region.id}`} x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
            </filter>
          </defs>

          {/* Winding Cobblestone Pathway Base */}
          <path
            d="M 50% 0 Q 30% 25%, 50% 50% T 50% 100%"
            fill="none"
            stroke="#C6BEA7"
            strokeWidth="38"
            strokeLinecap="round"
            opacity="0.4"
            filter={`url(#wash-${region.id})`}
          />

          {/* Winding Cobblestone Texture Dashes */}
          <path
            d="M 50% 0 Q 30% 25%, 50% 50% T 50% 100%"
            fill="none"
            stroke="#DFD7C7"
            strokeWidth="24"
            strokeLinecap="round"
            opacity="0.8"
          />

          <path
            d="M 50% 0 Q 30% 25%, 50% 50% T 50% 100%"
            fill="none"
            stroke="#B5A992"
            strokeWidth="8"
            strokeDasharray="6 10"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>

        {/* Milestone Nodes Placed Directly Along the Winding Trail */}
        <div className="relative z-10 flex flex-col gap-14 sm:gap-16 py-4">
          {region.milestones.map((milestone, index) => {
            const status = getMilestoneStatus(milestone);
            const isLeft = milestone.xPercent < 50;
            const isRight = milestone.xPercent > 50;

            return (
              <div
                key={milestone.id}
                className="relative flex items-center justify-center w-full"
                style={{
                  paddingLeft: isLeft ? `${Math.max(10, 50 - milestone.xPercent * 0.7)}%` : undefined,
                  paddingRight: isRight ? `${Math.max(10, (milestone.xPercent - 50) * 0.7)}%` : undefined,
                }}
              >
                {/* Interactive Milestone Stepping Stone Button */}
                <div
                  onClick={() => onSelectMilestone(milestone)}
                  className="group relative cursor-pointer flex flex-col items-center"
                  role="button"
                  tabIndex={0}
                  aria-label={`${milestone.title} - ${status}`}
                >
                  {/* Subtle Floating Flower Aura */}
                  <div
                    className={`absolute -inset-4 rounded-full transition-all duration-300 pointer-events-none ${
                      status === 'mastered'
                        ? 'bg-amber-300/40 blur-md group-hover:scale-125'
                        : status === 'completed'
                        ? 'bg-dustyrose/30 blur-sm group-hover:scale-115'
                        : status === 'in-progress'
                        ? 'bg-sagegreen/30 blur-sm group-hover:scale-110'
                        : 'bg-warmtaupe/20 group-hover:bg-warmtaupe/30'
                    }`}
                  />

                  {/* Stepping Stone Disc */}
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 flex flex-col items-center justify-center shadow-garden transition-all duration-300 group-hover:scale-110 group-active:scale-95 ${
                      status === 'mastered'
                        ? 'bg-gradient-to-br from-amber-100 via-buttercream to-amber-200 border-amber-400 text-amber-950 shadow-garden-glow'
                        : status === 'completed'
                        ? 'bg-gradient-to-br from-white via-dustyrose/40 to-dustyrose/70 border-dustyrose text-garden-text'
                        : status === 'in-progress'
                        ? 'bg-gradient-to-br from-white via-sagegreen/30 to-sagegreen/60 border-sagegreen text-garden-text'
                        : 'bg-white dark:bg-garden-darkcard border-garden-cardborder text-garden-secondary hover:border-dustyrose'
                    }`}
                  >
                    {/* Flower / Seed Center Icon */}
                    <span className="text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-115 animate-float">
                      {getFlowerEmoji(milestone.flowerType, status)}
                    </span>

                    {/* Step Number Badge */}
                    <span
                      className={`absolute -bottom-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border shadow-sm ${
                        status === 'mastered'
                          ? 'bg-amber-400 text-amber-950 border-amber-500'
                          : status === 'completed'
                          ? 'bg-dustyrose text-garden-text border-dustyrose-400'
                          : status === 'in-progress'
                          ? 'bg-sagegreen text-white border-sagegreen-600'
                          : 'bg-white dark:bg-garden-darkcard text-garden-secondary border-garden-cardborder'
                      }`}
                    >
                      Step {milestone.stepNumber}
                    </span>
                  </div>

                  {/* Title Plaque with Milestone Info */}
                  <div className="mt-4 px-4 py-2 rounded-2xl bg-white/90 dark:bg-garden-darkcard/90 backdrop-blur-md border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm text-center max-w-xs group-hover:border-dustyrose group-hover:shadow-garden transition-all">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-garden-text dark:text-garden-darktext line-clamp-1 group-hover:text-dustyrose-600 transition-colors">
                      {milestone.title}
                    </h4>
                    <div className="flex items-center justify-center gap-2 mt-0.5 text-[10px] text-garden-secondary">
                      <span className="font-semibold">{milestone.difficulty}</span>
                      <span>•</span>
                      <span className="text-sagegreen font-bold">+{milestone.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Garden Features Strip */}
      <div className="pt-4 border-t border-garden-cardborder/60 flex flex-wrap items-center justify-between text-xs text-garden-secondary">
        <div className="flex items-center gap-3">
          {region.decorations.map((dec, i) => (
            <span key={i} className="flex items-center gap-1 font-semibold text-garden-secondary">
              <span>🏡</span> {dec.name}
            </span>
          ))}
        </div>
        <div className="text-[11px] font-medium">
          Click any stepping stone to inspect lesson lore & start learning
        </div>
      </div>
    </div>
  );
};
