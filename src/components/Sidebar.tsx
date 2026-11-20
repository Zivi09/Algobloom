import React from 'react';
import {
  Home,
  Map,
  Compass,
  Boxes,
  PlayCircle,
  Columns,
  Calendar,
  Flower2,
  RotateCcw,
  Award,
  Bookmark,
  Settings,
  X,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

export type NavPage =
  | 'home'
  | 'learning-path'
  | 'explore'
  | 'data-structures'
  | 'playground'
  | 'compare'
  | 'daily-challenges'
  | 'garden'
  | 'revision'
  | 'achievements'
  | 'bookmarks'
  | 'settings'
  | 'leaderboard'
  | 'guilds'
  | 'algo-race'
  | 'lesson-detail';

export interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  isCompact?: boolean;
  onToggleCompact?: () => void;
  streak: number;
  xp: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  mobileOpen,
  onCloseMobile,
  isCompact = false,
  onToggleCompact,
  streak,
  xp,
}) => {
  // 3 Clear Beginner-Friendly Navigation Sections
  const navSections = [
    {
      title: 'LEARN',
      items: [
        { id: 'home' as NavPage, label: 'Home', icon: Home, badge: null },
        { id: 'learning-path' as NavPage, label: 'My Learning Path', icon: Map, badge: '15 Levels' },
        { id: 'explore' as NavPage, label: 'Explore Algorithms', icon: Compass, badge: null },
        { id: 'data-structures' as NavPage, label: 'Data Structures', icon: Boxes, badge: 'Interactive' },
      ],
    },
    {
      title: 'PRACTICE',
      items: [
        { id: 'playground' as NavPage, label: 'Playground', icon: PlayCircle, badge: 'Sandbox' },
        { id: 'algo-race' as NavPage, label: 'Algo Race', icon: Zap, badge: 'Live' },
        { id: 'compare' as NavPage, label: 'Compare Lab', icon: Columns, badge: null },
        { id: 'daily-challenges' as NavPage, label: 'Daily Challenges', icon: Calendar, badge: 'XP' },
        { id: 'revision' as NavPage, label: 'Revision Center', icon: RotateCcw, badge: null },
      ],
    },
    {
      title: 'YOUR GARDEN & COMMUNITY',
      items: [
        { id: 'garden' as NavPage, label: 'My Learning Garden', icon: Flower2, badge: '🌷' },
        { id: 'leaderboard' as NavPage, label: 'Leaderboard', icon: Trophy, badge: null },
        { id: 'guilds' as NavPage, label: 'Guilds', icon: Users, badge: null },
        { id: 'achievements' as NavPage, label: 'Achievements', icon: Award, badge: null },
        { id: 'bookmarks' as NavPage, label: 'Bookmarks', icon: Bookmark, badge: null },
        { id: 'settings' as NavPage, label: 'Settings', icon: Settings, badge: null },
      ],
    },
  ];

  const handleItemClick = (page: NavPage) => {
    onNavigate(page);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop with Smooth Fade */}
      <div
        onClick={onCloseMobile}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ease-in-out ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Main Sidebar Drawer / Desktop Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#AFD0AC] dark:bg-garden-darkcard border-r border-[#92B890] dark:border-garden-darkcardborder flex flex-col justify-between transition-all duration-300 ease-in-out shadow-lg lg:shadow-none overflow-hidden ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full'
        } ${
          isCompact ? 'lg:translate-x-0 lg:w-20' : 'lg:translate-x-0 lg:w-64'
        }`}
      >
        {/* Top Header & Brand */}
        <div>
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-garden-cardborder/60 dark:border-garden-darkcardborder/60 min-h-[73px]">
            {/* Main Logo & Brand - Click to toggle between collapsed and expanded panel */}
            <button
              onClick={onToggleCompact}
              className={`flex items-center gap-2.5 group cursor-pointer text-left transition-all ${
                isCompact ? 'lg:justify-center lg:w-full' : 'flex-1'
              }`}
              title={isCompact ? 'Click to expand panel' : 'Click to collapse panel'}
              aria-label={isCompact ? 'Expand panel' : 'Collapse panel'}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-buttercream via-dustyrose to-softmauve flex items-center justify-center text-xl shadow-sm group-hover:scale-105 active:scale-95 transition-all flex-shrink-0">
                🌸
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isCompact ? 'lg:w-0 lg:opacity-0 lg:hidden' : 'w-auto opacity-100'
                }`}
              >
                <h1 className="font-heading font-bold text-lg leading-tight text-garden-text dark:text-garden-darktext tracking-tight whitespace-nowrap group-hover:text-dustyrose-600 dark:group-hover:text-dustyrose-400 transition-colors">
                  AlgoBloom
                </h1>
                <p className="text-[10px] text-garden-secondary dark:text-garden-darksecondary font-medium whitespace-nowrap">
                  Bloom with confidence
                </p>
              </div>
            </button>

            {/* Close button on mobile only */}
            <button
              onClick={onCloseMobile}
              title="Close menu"
              aria-label="Close menu"
              className="lg:hidden p-1.5 rounded-xl text-garden-secondary hover:text-garden-text hover:bg-garden-bg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick stats mini-bar */}
          <div
            className={`transition-all duration-300 mx-3 my-3 rounded-2xl bg-white/70 dark:bg-garden-darkbg/50 border border-garden-cardborder/60 dark:border-garden-darkcardborder/60 text-xs ${
              isCompact
                ? 'lg:mx-2 lg:my-3 lg:p-2.5 lg:flex lg:flex-col lg:items-center lg:gap-1.5'
                : 'px-4 py-3 flex items-center justify-around'
            }`}
            title={`Current Streak: ${streak} days | Total XP: ${xp}`}
          >
            {isCompact ? (
              <div className="hidden lg:flex flex-col items-center gap-1">
                <span className="text-amber-500 font-bold text-xs" title={`${streak}d Streak`}>
                  🔥 {streak}
                </span>
                <div className="w-5 h-px bg-garden-cardborder dark:bg-garden-darkcardborder" />
                <span className="text-dustyrose-600 dark:text-dustyrose-400 font-bold text-[11px]" title={`${xp} XP`}>
                  ✨ {xp}
                </span>
              </div>
            ) : null}

            <div className={`flex items-center gap-1.5 ${isCompact ? 'lg:hidden' : ''}`}>
              <span className="text-amber-500 font-bold">🔥</span>
              <span className="font-semibold text-garden-text dark:text-garden-darktext whitespace-nowrap">
                {streak}d Streak
              </span>
            </div>
            <div className={`h-4 w-px bg-garden-cardborder dark:bg-garden-darkcardborder ${isCompact ? 'lg:hidden' : ''}`} />
            <div className={`flex items-center gap-1.5 ${isCompact ? 'lg:hidden' : ''}`}>
              <Sparkles size={14} className="text-dustyrose-500" />
              <span className="font-semibold text-garden-text dark:text-garden-darktext whitespace-nowrap">
                {xp} XP
              </span>
            </div>
          </div>

          {/* Grouped Nav Sections */}
          <nav className="px-2 sm:px-3 py-1 space-y-3 overflow-y-auto max-h-[calc(100vh-230px)] scrollbar-thin">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                {/* Section title (hidden when compact) */}
                <div
                  className={`text-[10px] font-extrabold uppercase tracking-wider text-garden-secondary/80 dark:text-garden-darksecondary/80 px-3.5 pt-1 pb-1 transition-all ${
                    isCompact ? 'lg:hidden' : 'block'
                  }`}
                >
                  {section.title}
                </div>

                {isCompact && (
                  <div className="hidden lg:block my-2 border-t border-garden-cardborder/40 dark:border-garden-darkcardborder/40 first:hidden" />
                )}

                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  const tooltipText = `${item.label}${item.badge ? ` (${item.badge})` : ''}`;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      title={isCompact ? tooltipText : undefined}
                      className={`w-full flex items-center rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 relative group ${
                        isCompact ? 'lg:justify-center lg:px-2 lg:py-2.5' : 'justify-between px-3.5 py-2'
                      } ${
                        isActive
                          ? 'bg-dustyrose text-garden-text font-semibold shadow-sm'
                          : 'text-garden-secondary dark:text-garden-darksecondary hover:text-garden-text dark:hover:text-garden-darktext hover:bg-white/60 dark:hover:bg-garden-darkhover'
                      }`}
                    >
                      <div className={`flex items-center gap-3 ${isCompact ? 'lg:justify-center' : ''}`}>
                        <Icon
                          size={17}
                          className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-garden-text' : 'text-garden-secondary dark:text-garden-darksecondary group-hover:text-garden-text'
                          }`}
                        />
                        <span
                          className={`whitespace-nowrap transition-all duration-200 ${
                            isCompact ? 'lg:hidden' : 'inline'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap transition-all duration-200 ${
                            isCompact ? 'lg:hidden' : 'inline'
                          } ${
                            isActive
                              ? 'bg-white/40 text-garden-text'
                              : 'bg-garden-cardborder/60 dark:bg-garden-darkcardborder text-garden-secondary dark:text-garden-darksecondary'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Botanical Footer Motto / Compact Footer */}
        <div
          className={`border-t border-garden-cardborder/60 dark:border-garden-darkcardborder/60 text-center transition-all duration-300 ${
            isCompact ? 'lg:p-2.5' : 'p-4'
          }`}
        >
          {isCompact ? (
            <div
              title="One tiny step today. Let's bloom together. 🌸"
              className="hidden lg:flex justify-center items-center cursor-default text-lg"
            >
              🌸
            </div>
          ) : null}
          <p
            className={`text-[11px] text-garden-secondary dark:text-garden-darksecondary italic ${
              isCompact ? 'lg:hidden' : 'block'
            }`}
          >
            "One tiny step today. Let's bloom together. 🌸"
          </p>
        </div>
      </aside>
    </>
  );
};
