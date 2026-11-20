import React from 'react';
import { Play, Sparkles, Clock, Compass, X, CheckCircle, BookOpen } from 'lucide-react';
import { GardenMilestone } from './gardenData';

interface Props {
  milestone: GardenMilestone | null;
  onClose: () => void;
  onStartLesson: (algorithmId: string) => void;
  status: 'not-started' | 'in-progress' | 'completed' | 'mastered';
}

export const MilestoneModal: React.FC<Props> = ({
  milestone,
  onClose,
  onStartLesson,
  status,
}) => {
  if (!milestone) return null;

  const getStatusBadge = () => {
    switch (status) {
      case 'mastered':
        return {
          icon: '✨🌸',
          label: 'Mastered & Blooming',
          classes: 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300',
        };
      case 'completed':
        return {
          icon: '🌷',
          label: 'Completed & Growing',
          classes: 'bg-sagegreen/20 text-sagegreen-500 border-sagegreen/40',
        };
      case 'in-progress':
        return {
          icon: '🌱',
          label: 'In Progress / Sprouting',
          classes: 'bg-dustyrose/20 text-dustyrose-700 dark:text-dustyrose-300 border-dustyrose/40',
        };
      default:
        return {
          icon: '🌰',
          label: 'Unexplored Seed',
          classes: 'bg-warmtaupe/20 text-warmtaupe-500 border-warmtaupe/40',
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#FDFBF7] dark:bg-[#1E2520] border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-2xl relative flex flex-col gap-5 overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: 'radial-gradient(rgba(147, 159, 127, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
      >
        {/* Top Header Strip */}
        <div className="flex items-start justify-between gap-4 border-b border-garden-cardborder pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-buttercream via-dustyrose to-softmauve flex items-center justify-center text-3xl shadow-sm shrink-0">
              {status === 'mastered' ? '🌸' : status === 'completed' ? '🌷' : status === 'in-progress' ? '🌱' : '🌰'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusBadge.classes}`}>
                  {statusBadge.icon} {statusBadge.label}
                </span>
                <span className="text-[10px] font-bold text-garden-secondary">
                  Step #{milestone.stepNumber}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-garden-text dark:text-garden-darktext tracking-tight mt-1">
                {milestone.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-garden-cardborder/40 text-garden-secondary hover:text-garden-text transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Short Lesson Overview */}
        <p className="text-xs sm:text-sm text-garden-secondary leading-relaxed">
          {milestone.shortDescription}
        </p>

        {/* Storybook Lore Passage */}
        <div className="p-4 rounded-2xl bg-[#F6EFE2] dark:bg-[#161D18] border border-[#E5DAC9] dark:border-[#2E3A32] text-xs sm:text-sm text-[#4E443B] dark:text-[#D5E2D4] leading-relaxed italic font-serif">
          "{milestone.storybookLore}"
        </div>

        {/* Metadata Badges: Difficulty, Duration, XP */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder text-center">
            <span className="text-[10px] font-bold text-garden-secondary uppercase block">
              Difficulty
            </span>
            <span className="font-bold text-xs text-garden-text dark:text-garden-darktext mt-0.5 block">
              {milestone.difficulty}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder text-center">
            <span className="text-[10px] font-bold text-garden-secondary uppercase block flex items-center justify-center gap-1">
              <Clock size={11} /> Duration
            </span>
            <span className="font-bold text-xs text-garden-text dark:text-garden-darktext mt-0.5 block">
              ~{milestone.durationMinutes} mins
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder text-center">
            <span className="text-[10px] font-bold text-garden-secondary uppercase block flex items-center justify-center gap-1">
              <Sparkles size={11} className="text-amber-500" /> Reward
            </span>
            <span className="font-bold text-xs text-dustyrose-600 dark:text-dustyrose-400 mt-0.5 block">
              +{milestone.xpReward} XP
            </span>
          </div>
        </div>

        {/* Botanical Concepts Cultivated */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-garden-secondary block mb-1.5">
            Key Concepts Cultivated
          </span>
          <div className="flex flex-wrap gap-1.5">
            {milestone.concepts.map((concept, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-garden-darkcard border border-garden-cardborder text-[11px] font-medium text-garden-text dark:text-garden-darktext"
              >
                🌿 {concept}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button: Start Learning */}
        <div className="pt-2 border-t border-garden-cardborder flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-garden-cardborder text-xs font-semibold text-garden-secondary hover:text-garden-text transition-colors"
          >
            Back to Garden
          </button>

          <button
            onClick={() => {
              onStartLesson(milestone.algorithmId);
              onClose();
            }}
            className="px-6 py-3 rounded-2xl bg-dustyrose hover:bg-dustyrose-400 text-garden-text font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Play size={15} className="fill-garden-text" />
            <span>
              {status === 'mastered' || status === 'completed'
                ? 'Review Lesson 🌸'
                : 'Start Learning 🌸'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
