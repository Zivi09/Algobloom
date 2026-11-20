import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  Sparkles,
  TreeDeciduous,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Award,
  Plus,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiClient } from '../services/apiClient';
import { Guild, GuildActivity } from '../types';

interface GuildsPageProps {
  onVisitGarden?: (username: string) => void;
  currentUserUsername?: string;
}

const MOCK_ACTIVITIES: GuildActivity[] = [
  {
    id: 'act-1',
    guildId: 'guild-binary-botanists',
    username: 'daisy_master',
    displayName: 'Daisy Chen',
    message: 'Mastered Dijkstra’s Shortest Path with 5/5 score!',
    timestamp: '12m ago',
    xpGained: 150,
    type: 'mastery',
  },
  {
    id: 'act-2',
    guildId: 'guild-binary-botanists',
    username: 'orchid_maya',
    displayName: 'Maya Patel',
    message: 'Bloomed a Golden Sunflower in the communal garden 🌻',
    timestamp: '45m ago',
    xpGained: 100,
    type: 'bloom',
  },
  {
    id: 'act-3',
    guildId: 'guild-graph-grove',
    username: 'lotus_coder',
    displayName: 'Leo Varma',
    message: 'Won an AlgoRace 1v1 duel against a rival botanist!',
    timestamp: '2h ago',
    xpGained: 80,
    type: 'quiz',
  },
  {
    id: 'act-4',
    guildId: 'guild-dp-blossom',
    username: 'rose_algorithmist',
    displayName: 'Sam Thorne',
    message: 'Welcomed 3 new apprentice gardeners to the greenhouse 🌱',
    timestamp: '3h ago',
    type: 'join',
  },
];

export const GuildsPage: React.FC<GuildsPageProps> = ({ onVisitGarden }) => {
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null);
  const [joinedGuildId, setJoinedGuildId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('algobloom_joined_guild') || 'guild-binary-botanists';
    } catch {
      return 'guild-binary-botanists';
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchGuilds = async () => {
      try {
        const data = await apiClient.guilds.getAll();
        if (isMounted) {
          setGuilds(data);
          const current = data.find((g) => g.id === joinedGuildId) || data[0];
          setSelectedGuild(current);
        }
      } catch (err) {
        console.error('Failed to load guilds', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchGuilds();
    return () => {
      isMounted = false;
    };
  }, [joinedGuildId]);

  const handleJoinGuild = async (guildId: string) => {
    try {
      await apiClient.guilds.join(guildId);
      setJoinedGuildId(guildId);
      localStorage.setItem('algobloom_joined_guild', guildId);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#92B890', '#F1B4B1', '#FFF6D6'],
      });
      // update state
      setGuilds((prev) =>
        prev.map((g) => (g.id === guildId ? { ...g, memberCount: g.memberCount + 1 } : g))
      );
    } catch (err) {
      console.error('Failed to join guild', err);
    }
  };

  const activeGuild = selectedGuild || guilds[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-100 dark:bg-sage-900/40 border border-[#92B890] text-[#2C4A2E] dark:text-[#C6DBBB] text-xs font-semibold">
          <Users size={14} className="text-[#527950]" />
          <span>Collaborative Study Circles</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Garden Guilds & Communal Greenhouse 🌿
        </h1>
        <p className="text-sm text-garden-secondary dark:text-garden-darksecondary max-w-xl mx-auto">
          Study with peers, pool your weekly algorithm XP, and nurture your Guild's Great Oak into full bloom!
        </p>
      </div>

      {/* Featured Greenhouse Showcase */}
      {activeGuild && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-garden-card/60 to-sage-50/50 dark:from-garden-darkcard dark:via-garden-darkcard/80 dark:to-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#92B890]/20 text-[#2E5A30] dark:text-[#C6DBBB] border border-[#92B890]/40">
                  Level {activeGuild.level} Greenhouse
                </span>
                <span className="text-xs text-garden-secondary">
                  {activeGuild.memberCount} active botanists
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-garden-text dark:text-garden-darktext">
                {activeGuild.name}
              </h2>
              <p className="text-sm text-garden-secondary italic">"{activeGuild.motto}"</p>

              {/* World Tree Progress Bar */}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-garden-text dark:text-garden-darktext flex items-center gap-1.5">
                    <TreeDeciduous size={15} className="text-[#527950]" />
                    <span>Communal Great Oak Growth</span>
                  </span>
                  <span className="text-garden-secondary">{activeGuild.communalProgress}% to Level {activeGuild.level + 1}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#92B890] via-dustyrose to-[#F3C68F] transition-all duration-500 rounded-full"
                    style={{ width: `${activeGuild.communalProgress}%` }}
                  />
                </div>
                <div className="text-[11px] text-garden-secondary flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-500" />
                  <span>Total Collective XP: <strong>{activeGuild.totalXp.toLocaleString()} XP</strong></span>
                </div>
              </div>
            </div>

            {/* Greenhouse Visual & Join Action */}
            <div className="flex flex-col items-center justify-center gap-4 bg-white/80 dark:bg-garden-darkcard/80 p-6 rounded-3xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm w-full md:w-auto shrink-0">
              <div className="text-6xl animate-bounce">🌳</div>
              <div className="text-center">
                <div className="font-bold text-sm text-garden-text dark:text-garden-darktext">
                  The Sacred Oak
                </div>
                <div className="text-xs text-garden-secondary">Stage: {activeGuild.sacredTreeStage}</div>
              </div>

              {joinedGuildId === activeGuild.id ? (
                <div className="px-5 py-2.5 rounded-2xl bg-sage-100 dark:bg-sage-900/40 border border-[#92B890] text-[#2C4A2E] dark:text-[#C6DBBB] text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={16} />
                  <span>Active Member 🌿</span>
                </div>
              ) : (
                <button
                  onClick={() => handleJoinGuild(activeGuild.id)}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-dustyrose to-softmauve hover:brightness-105 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Join Guild</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Guild Directory & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Guild Browser */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext flex items-center gap-2">
              <Shield size={18} className="text-dustyrose-500" />
              <span>Browse Active Guilds</span>
            </h3>
            <span className="text-xs text-garden-secondary">{guilds.length} available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guilds.map((g) => {
              const isSelected = selectedGuild?.id === g.id;
              const isMember = joinedGuildId === g.id;

              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedGuild(g)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'bg-white dark:bg-garden-darkcard border-dustyrose ring-2 ring-dustyrose/20 shadow-garden'
                      : 'bg-white/70 dark:bg-garden-darkcard/70 border-garden-cardborder dark:border-garden-darkcardborder hover:bg-white dark:hover:bg-garden-darkcard shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: g.bannerColor }}
                      />
                      <span className="text-[11px] font-semibold text-garden-secondary">
                        Lvl {g.level} • {g.memberCount} members
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-garden-text dark:text-garden-darktext">
                      {g.name}
                    </h4>
                    <p className="text-xs text-garden-secondary line-clamp-2">
                      {g.motto}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-garden-cardborder dark:border-garden-darkcardborder">
                    <div className="text-xs font-semibold text-garden-text dark:text-garden-darktext flex items-center gap-1">
                      <Sparkles size={13} className="text-amber-500" />
                      <span>{g.totalXp.toLocaleString()} XP</span>
                    </div>

                    {isMember ? (
                      <span className="text-[11px] font-bold text-green-700 dark:text-green-300">
                        Member ✓
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-dustyrose-600 flex items-center gap-0.5">
                        View <ChevronRight size={13} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Live Guild Activity Feed */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext flex items-center gap-2">
            <TrendingUp size={18} className="text-[#527950]" />
            <span>Greenhouse Activity Feed</span>
          </h3>

          <div className="bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden p-4 divide-y divide-garden-cardborder dark:divide-garden-darkcardborder">
            {MOCK_ACTIVITIES.map((act) => (
              <div key={act.id} className="py-3.5 first:pt-1 last:pb-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-garden-text dark:text-garden-darktext truncate">
                    {act.displayName}
                  </span>
                  <span className="text-[10px] text-garden-secondary">{act.timestamp}</span>
                </div>
                <p className="text-xs text-garden-secondary dark:text-garden-darksecondary">
                  {act.message}
                </p>
                {act.xpGained && (
                  <div className="text-[10px] font-semibold text-[#2E5A30] dark:text-[#C6DBBB] flex items-center gap-1 pt-0.5">
                    <span>+{act.xpGained} XP to Guild</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Guild Perk Tip Card */}
          <div className="p-4 rounded-3xl bg-buttercream/40 dark:bg-buttercream/10 border border-buttercream-300 dark:border-buttercream/20 text-xs text-amber-950 dark:text-amber-200 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <span>🌸 Guild Perk</span>
            </span>
            <p className="text-amber-900/80 dark:text-amber-200/80 leading-relaxed text-[11px]">
              Every level your Sacred Tree grows unlocks custom garden badges and a +5% XP multiplier for all members on weekly daily challenges!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GuildsPage;
