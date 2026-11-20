import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Flame,
  Award,
  Flower2,
  Share2,
  Check,
  Heart,
  Droplet,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiClient } from '../../services/apiClient';
import { PublicGardenProfile, GardenReactionType } from '../../types';

interface PublicGardenModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export const PublicGardenModal: React.FC<PublicGardenModalProps> = ({
  isOpen,
  onClose,
  username,
}) => {
  const [profile, setProfile] = useState<PublicGardenProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reactions, setReactions] = useState<{ blossom: number; bee: number; water: number }>({
    blossom: 0,
    bee: 0,
    water: 0,
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [userReacted, setUserReacted] = useState<Record<GardenReactionType, boolean>>({
    blossom: false,
    bee: false,
    water: false,
  });

  useEffect(() => {
    if (!isOpen || !username) return;

    let isMounted = true;
    setIsLoading(true);

    const loadGarden = async () => {
      try {
        const data = await apiClient.social.getUserGarden(username);
        if (isMounted) {
          setProfile(data);
          setReactions(data.reactions);
        }
      } catch (err) {
        console.error('Failed to load user garden', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadGarden();
    return () => {
      isMounted = false;
    };
  }, [isOpen, username]);

  if (!isOpen) return null;

  const handleReact = async (type: GardenReactionType) => {
    if (userReacted[type]) return;

    setUserReacted((prev) => ({ ...prev, [type]: true }));
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#F1B4B1', '#C6DBBB', '#FFF6D6'],
    });

    try {
      await apiClient.social.reactToGarden(username, type);
    } catch (err) {
      console.warn('Reaction offline or failed to sync', err);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/garden/@${username}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getFlowerEmoji = (type?: string) => {
    switch (type) {
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
      case 'rose':
        return '🌹';
      default:
        return '🌼';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close public garden view"
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 dark:bg-garden-darkcard/80 border border-garden-cardborder text-garden-secondary hover:text-garden-text transition-all"
        >
          <X size={18} />
        </button>

        {isLoading || !profile ? (
          <div className="py-28 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-dustyrose border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-garden-secondary">Visiting @{username}'s blooming garden...</p>
          </div>
        ) : (
          <div>
            {/* Garden Cover Header */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-buttercream/60 via-dustyrose/20 to-sage-100/40 dark:from-garden-darkbg dark:to-garden-darkcard border-b border-garden-cardborder dark:border-garden-darkcardborder">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder flex items-center justify-center text-3xl shadow-sm">
                    {getFlowerEmoji(profile.avatarFlower)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading font-extrabold text-2xl text-garden-text dark:text-garden-darktext">
                        {profile.displayName}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-dustyrose/30 text-red-950 dark:text-red-200 text-[10px] font-bold">
                        {profile.leagueTier}
                      </span>
                    </div>
                    <p className="text-xs text-garden-secondary">@{profile.username}</p>
                    <p className="text-xs text-garden-secondary mt-1 max-w-md italic">
                      "{profile.bio}"
                    </p>
                  </div>
                </div>

                {/* Share Link Button */}
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder hover:bg-garden-bg text-xs font-semibold text-garden-text dark:text-garden-darktext shadow-sm flex items-center gap-1.5 transition-all"
                >
                  {copiedLink ? (
                    <>
                      <Check size={14} className="text-green-600" />
                      <span className="text-green-700 dark:text-green-300">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={14} className="text-dustyrose-500" />
                      <span>Share Garden</span>
                    </>
                  )}
                </button>
              </div>

              {/* Garden Stats & Reactions Pill Bar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-garden-cardborder/60">
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                    <Flame size={15} className="text-amber-500 fill-amber-500" />
                    <span>{profile.streak} Day Streak</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-red-900 dark:text-red-200">
                    <Sparkles size={14} className="text-dustyrose-500" />
                    <span>{profile.totalXp} Total XP</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-garden-secondary">
                    <Flower2 size={14} className="text-dustyrose-500" />
                    <span>{profile.flowers.length} Bloomed Flowers</span>
                  </div>
                </div>

                {/* Daily Botanical Reactions */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-garden-secondary mr-1">
                    Give Reaction:
                  </span>
                  <button
                    onClick={() => handleReact('blossom')}
                    disabled={userReacted.blossom}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                      userReacted.blossom
                        ? 'bg-dustyrose/20 border-dustyrose text-red-950 dark:text-red-200'
                        : 'bg-white dark:bg-garden-darkcard border-garden-cardborder hover:scale-105 active:scale-95'
                    }`}
                  >
                    <span>🌸</span>
                    <span>{reactions.blossom}</span>
                  </button>

                  <button
                    onClick={() => handleReact('bee')}
                    disabled={userReacted.bee}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                      userReacted.bee
                        ? 'bg-buttercream/40 border-buttercream-400 text-amber-950 dark:text-amber-200'
                        : 'bg-white dark:bg-garden-darkcard border-garden-cardborder hover:scale-105 active:scale-95'
                    }`}
                  >
                    <span>🐝</span>
                    <span>{reactions.bee}</span>
                  </button>

                  <button
                    onClick={() => handleReact('water')}
                    disabled={userReacted.water}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                      userReacted.water
                        ? 'bg-blue-50 border-blue-300 text-blue-900 dark:text-blue-200'
                        : 'bg-white dark:bg-garden-darkcard border-garden-cardborder hover:scale-105 active:scale-95'
                    }`}
                  >
                    <span>💧</span>
                    <span>{reactions.water}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bloomed Flowers Showcase */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext flex items-center gap-2">
                  <Flower2 size={18} className="text-dustyrose-500" />
                  <span>Cultivated Floral Blossoms</span>
                </h3>
                <span className="text-xs text-garden-secondary">
                  Mastered through rigorous algorithm traces
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {profile.flowers.map((fl) => (
                  <div
                    key={fl.algorithmId}
                    className="p-4 rounded-2xl bg-garden-bg/50 dark:bg-garden-darkbg/50 border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex items-center gap-3.5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder flex items-center justify-center text-2xl shrink-0">
                      {getFlowerEmoji(fl.flowerType)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-garden-text dark:text-garden-darktext truncate">
                        {fl.plantName}
                      </h4>
                      <p className="text-[11px] text-garden-secondary capitalize">
                        {fl.flowerType} • {fl.stage}
                      </p>
                      {fl.bestScore && (
                        <div className="text-[10px] font-semibold text-green-700 dark:text-green-300 flex items-center gap-1 mt-0.5">
                          <CheckCircle2 size={11} />
                          <span>Mastery {fl.bestScore}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Botanical Badges */}
              {profile.badges && profile.badges.length > 0 && (
                <div className="pt-4 border-t border-garden-cardborder dark:border-garden-darkcardborder space-y-3">
                  <h4 className="font-heading font-bold text-sm text-garden-text dark:text-garden-darktext flex items-center gap-2">
                    <Award size={16} className="text-amber-500" />
                    <span>Botanical Badges & Accolades</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.badges.map((b) => (
                      <span
                        key={b}
                        className="px-3 py-1 rounded-full bg-buttercream/40 dark:bg-buttercream/20 border border-buttercream-300 dark:border-buttercream/30 text-amber-950 dark:text-amber-200 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <span>🎖️</span>
                        <span>{b}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PublicGardenModal;
