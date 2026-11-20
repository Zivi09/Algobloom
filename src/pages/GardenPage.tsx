import React, { useState } from 'react';
import { UserProgress } from '../types';
import { GARDEN_REGIONS, GardenMilestone } from '../components/garden/gardenData';
import { GardenStatsHeader } from '../components/garden/GardenStatsHeader';
import { GardenRegionView } from '../components/garden/GardenRegionView';
import { MilestoneModal } from '../components/garden/MilestoneModal';
import { AchievementsShowcase } from '../components/garden/AchievementsShowcase';
import { IllustratedGardenMap } from '../components/garden/IllustratedGardenMap';
import { Map, Footprints, Award, Sparkles, Compass } from 'lucide-react';

interface GardenPageProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

export const GardenPage: React.FC<GardenPageProps> = ({ progress, onSelectLesson }) => {
  const [activeTab, setActiveTab] = useState<'illustrated-map' | 'adventure-path' | 'achievements'>('illustrated-map');
  const [selectedMilestone, setSelectedMilestone] = useState<GardenMilestone | null>(null);
  const [activeRegionId, setActiveRegionId] = useState<string>('nursery');

  const handleJumpToRegion = (regionId: string) => {
    setActiveRegionId(regionId);
    if (activeTab !== 'adventure-path') {
      setActiveTab('adventure-path');
    }
    setTimeout(() => {
      const el = document.getElementById(regionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const getMilestoneStatus = (milestone: GardenMilestone | null): 'not-started' | 'in-progress' | 'completed' | 'mastered' => {
    if (!milestone) return 'not-started';
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

  return (
    <div className="max-w-6xl mx-auto pb-28 flex flex-col gap-8">
      {/* Botanical World Progress Header */}
      <GardenStatsHeader
        progress={progress}
        onJumpToRegion={handleJumpToRegion}
        activeRegionId={activeRegionId}
      />

      {/* Primary Experience Mode Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/80 dark:bg-garden-darkcard/80 border-2 border-garden-cardborder w-fit shadow-sm">
        <button
          onClick={() => setActiveTab('illustrated-map')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'illustrated-map'
              ? 'bg-dustyrose text-garden-text shadow-sm scale-105'
              : 'text-garden-secondary hover:text-garden-text hover:bg-white/60'
          }`}
        >
          <Compass size={16} />
          <span>Illustrated Storybook Garden Map 🌸</span>
        </button>

        <button
          onClick={() => setActiveTab('adventure-path')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'adventure-path'
              ? 'bg-dustyrose text-garden-text shadow-sm scale-105'
              : 'text-garden-secondary hover:text-garden-text hover:bg-white/60'
          }`}
        >
          <Footprints size={16} />
          <span>Regional Winding Pathway (7 Areas)</span>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'achievements'
              ? 'bg-dustyrose text-garden-text shadow-sm scale-105'
              : 'text-garden-secondary hover:text-garden-text hover:bg-white/60'
          }`}
        >
          <Award size={16} />
          <span>Botanical Badges ({progress.achievements.length})</span>
        </button>
      </div>

      {/* MODE 1: ILLUSTRATED STORYBOOK GARDEN MAP (Matching the Exact Reference Art) */}
      {activeTab === 'illustrated-map' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2">
            <div>
              <h2 className="font-heading font-extrabold text-2xl text-garden-text dark:text-garden-darktext flex items-center gap-2">
                <span>🌸</span> The Storybook Botanical Garden World
              </h2>
              <p className="text-xs sm:text-sm text-garden-secondary mt-0.5">
                Twin wooden bridges, white river stepping stones, winding stone pathways, and the sacred cherry blossom shrine of mastery.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-sagegreen">
              <span className="w-2.5 h-2.5 rounded-full bg-sagegreen animate-ping" />
              <span>Click any stepping stone milestone to open lore & start learning</span>
            </div>
          </div>

          {/* Interactive Illustrated Reference Map Canvas */}
          <IllustratedGardenMap progress={progress} onSelectLesson={onSelectLesson} />
        </div>
      )}

      {/* MODE 2: THE WINDING ADVENTURE GARDEN PATHWAY (Detailed 7 Regions View) */}
      {activeTab === 'adventure-path' && (
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="font-heading font-extrabold text-2xl text-garden-text dark:text-garden-darktext flex items-center gap-2">
                <span>🌷</span> The 7 Botanical Learning Regions
              </h2>
              <p className="text-xs sm:text-sm text-garden-secondary mt-0.5">
                Scroll through the 7 garden regions connected by a winding cobblestone trail. Each stepping stone is a milestone that grows from seed to full bloom.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs text-garden-secondary font-semibold">
              <span className="flex items-center gap-1.5">
                <span>🌰</span> Seed
              </span>
              <span className="flex items-center gap-1.5">
                <span>🌱</span> Sprout
              </span>
              <span className="flex items-center gap-1.5">
                <span>🌷</span> Bloomed
              </span>
              <span className="flex items-center gap-1.5">
                <span>✨🌸</span> Mastered
              </span>
            </div>
          </div>

          {/* Sequential 7 Garden Regions along the Winding Trail */}
          <div className="flex flex-col gap-12">
            {GARDEN_REGIONS.map((region, idx) => (
              <GardenRegionView
                key={region.id}
                region={region}
                progress={progress}
                onSelectMilestone={(m) => setSelectedMilestone(m)}
                isFirst={idx === 0}
                isLast={idx === GARDEN_REGIONS.length - 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* MODE 3: BOTANICAL ACHIEVEMENTS SHOWCASE */}
      {activeTab === 'achievements' && (
        <AchievementsShowcase progress={progress} />
      )}

      {/* Interactive Milestone Storybook Popup Modal for Adventure View */}
      {selectedMilestone && (
        <MilestoneModal
          milestone={selectedMilestone}
          status={getMilestoneStatus(selectedMilestone)}
          onClose={() => setSelectedMilestone(null)}
          onStartLesson={(algoId) => onSelectLesson(algoId)}
        />
      )}
    </div>
  );
};
