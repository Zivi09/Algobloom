import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Sparkles, Flower2, Shield, ArrowUpRight, Crown, Medal } from 'lucide-react';
import { apiClient } from '../services/apiClient';
import { LeaderboardEntry, LeagueTier } from '../types';

interface LeaderboardPageProps {
  onVisitGarden: (username: string) => void;
  currentUserUsername?: string;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
  onVisitGarden,
  currentUserUsername,
}) => {
  const [tab, setTab] = useState<'weekly' | 'all-time'>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<LeagueTier>('BUDDING');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchLeaderboard = async () => {
      try {
        const data =
          tab === 'weekly'
            ? await apiClient.leaderboard.getWeekly()
            : await apiClient.leaderboard.getAllTime();
        if (isMounted) {
          setEntries(data);
        }
      } catch (err) {
        console.error('Failed to load leaderboard', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchLeaderboard();
    return () => {
      isMounted = false;
    };
  }, [tab]);

  const tiers: { id: LeagueTier; name: string; color: string; desc: string; icon: string }[] = [
    { id: 'SEEDLING', name: 'Seedling League', color: '#D4A373', desc: 'Entry grove for fresh botanists', icon: '🌱' },
    { id: 'SPROUT', name: 'Sprout League', color: '#A3B18A', desc: 'Cultivating consistency and daily streaks', icon: '🌿' },
    { id: 'BUDDING', name: 'Budding Grove', color: '#F3C68F', desc: 'Active algorithmic growth and problem solving', icon: '🌷' },
    { id: 'BLOSSOM', name: 'Blossom Sanctuary', color: '#E29578', desc: 'Elite algorithmic mastery and speedrun traces', icon: '🌸' },
    { id: 'ANCIENT_GROVE', name: 'Ancient Grove', color: '#92B890', desc: 'Grandmasters with complete curriculum mastery', icon: '🌳' },
  ];

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm shadow-sm border border-amber-300">
            🥇
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm shadow-sm border border-slate-300">
            🥈
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm shadow-sm border border-amber-200">
            🥉
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-garden-bg dark:bg-garden-darkbg text-garden-secondary flex items-center justify-center font-bold text-xs">
            #{rank}
          </div>
        );
    }
  };

  const getFlowerEmoji = (type?: string) => {
    switch (type) {
      case 'sunflower':
        return '🌻';
      case 'lotus':
        return '🪷';
      case 'orchid':
        return '🌺';
      case 'rose':
        return '🌹';
      case 'tulip':
        return '🌷';
      case 'lavender':
        return '🪻';
      default:
        return '🌸';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-buttercream/50 dark:bg-buttercream/20 border border-buttercream-400 text-amber-900 dark:text-amber-200 text-xs font-semibold">
          <Trophy size={14} className="text-amber-500" />
          <span>Botanical Mastery Standings</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Botanical League & Leaderboards 🌸
        </h1>
        <p className="text-sm text-garden-secondary dark:text-garden-darksecondary max-w-xl mx-auto">
          Celebrate continuous dedication, high streak stamina, and deep algorithmic understanding.
          Top 5 learners promote each Sunday midnight UTC!
        </p>
      </div>

      {/* League Tier Showcase Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {tiers.map((t) => {
          const isSelected = selectedTier === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTier(t.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-white dark:bg-garden-darkcard border-dustyrose ring-2 ring-dustyrose/30 shadow-garden'
                  : 'bg-white/60 dark:bg-garden-darkcard/60 border-garden-cardborder dark:border-garden-darkcardborder hover:bg-white dark:hover:bg-garden-darkcard'
              }`}
            >
              <div className="text-2xl mb-1">{t.icon}</div>
              <div className="text-xs font-bold text-garden-text dark:text-garden-darktext truncate">
                {t.name}
              </div>
              <div className="text-[10px] text-garden-secondary line-clamp-2 mt-0.5">
                {t.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Selector & Promotion Rule Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden">
        <div className="flex p-1 rounded-2xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder w-full sm:w-auto">
          <button
            onClick={() => setTab('weekly')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'weekly'
                ? 'bg-white dark:bg-garden-darkcard text-garden-text dark:text-garden-darktext shadow-sm'
                : 'text-garden-secondary hover:text-garden-text'
            }`}
          >
            Weekly Sprint
          </button>
          <button
            onClick={() => setTab('all-time')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === 'all-time'
                ? 'bg-white dark:bg-garden-darkcard text-garden-text dark:text-garden-darktext shadow-sm'
                : 'text-garden-secondary hover:text-garden-text'
            }`}
          >
            All-Time Grove
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-garden-secondary">
          <Crown size={15} className="text-amber-500" />
          <span>Top 5 promote to higher grove in <strong>3 days</strong></span>
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-dustyrose border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-garden-secondary font-medium">Gathering blossom scores...</p>
          </div>
        ) : (
          <div className="divide-y divide-garden-cardborder dark:divide-garden-darkcardborder">
            {entries.map((entry) => {
              const isCurrentUser =
                entry.username.toLowerCase() === currentUserUsername?.toLowerCase();

              return (
                <div
                  key={entry.userId}
                  className={`p-4 sm:px-6 flex items-center justify-between gap-4 transition-colors ${
                    isCurrentUser
                      ? 'bg-buttercream/20 dark:bg-buttercream/10'
                      : 'hover:bg-garden-bg/40 dark:hover:bg-garden-hover'
                  }`}
                >
                  {/* Left: Rank & User Info */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {getRankBadge(entry.rank)}

                    <div className="w-10 h-10 rounded-2xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder flex items-center justify-center text-xl shrink-0">
                      {getFlowerEmoji(entry.avatarFlower)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-garden-text dark:text-garden-darktext truncate">
                          {entry.displayName}
                        </span>
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 rounded-full bg-dustyrose/30 text-red-950 dark:text-red-200 text-[10px] font-bold">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-garden-secondary">
                        <span>@{entry.username}</span>
                        <span>•</span>
                        <span className="hidden sm:inline">{entry.leagueTier}</span>
                        <span>•</span>
                        <span>{entry.bloomedCount} bloomed 🌷</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Stats & Visit Action */}
                  <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                      <Flame size={14} className="text-amber-500 fill-amber-500" />
                      <span>{entry.streak}d</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-900 dark:text-red-200 min-w-[70px] justify-end">
                      <Sparkles size={14} className="text-dustyrose-500" />
                      <span>{entry.totalXp} XP</span>
                    </div>

                    <button
                      onClick={() => onVisitGarden(entry.username)}
                      className="px-3 py-1.5 rounded-xl bg-garden-bg dark:bg-garden-darkbg hover:bg-dustyrose/20 dark:hover:bg-dustyrose/20 border border-garden-cardborder dark:border-garden-darkcardborder text-xs font-semibold text-garden-text dark:text-garden-darktext flex items-center gap-1 transition-all"
                    >
                      <Flower2 size={13} className="text-dustyrose-500" />
                      <span className="hidden sm:inline">Visit Garden</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default LeaderboardPage;
