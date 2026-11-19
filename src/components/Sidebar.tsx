import React from 'react';
import {
  Home,
  Map,
  Compass,
  Boxes,
  PlayCircle,
  Calendar,
  Flower2,
  RotateCcw,
  Award,
  Bookmark,
  Settings,
  X,
  Sparkles,
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
  | 'lesson-detail';

interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  streak: number;
  xp: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  mobileOpen,
  onCloseMobile,
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
        { id: 'data-structures' as NavPage, label: 'Data Structures', icon: Boxes, badge: null },
      ],
    },
    {
      title: 'PRACTICE',
      items: [
        { id: 'playground' as NavPage, label: 'Playground', icon: PlayCircle, badge: 'Sandbox' },
        { id: 'daily-challenges' as NavPage, label: 'Daily Challenges', icon: Calendar, badge: null },
        { id: 'revision' as NavPage, label: 'Revision Center', icon: RotateCcw, badge: null },
      ],
    },
    {
      title: 'YOUR GARDEN',
      items: [
        { id: 'garden' as NavPage, label: 'My Learning Garden', icon: Flower2, badge: '🌷' },
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
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-fadeIn"
        />
      )}

      {/* Main Sidebar Drawer / Desktop Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#AFD0AC] dark:bg-garden-darkcard border-r border-[#92B890] dark:border-garden-darkcardborder flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Logo & Brand */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-garden-cardborder/60 dark:border-garden-darkcardborder/60">
            <div
              onClick={() => handleItemClick('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-buttercream via-dustyrose to-softmauve flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
                🌸
              </div>
              <div>
                <h1 className="font-heading font-bold text-lg leading-tight text-garden-text dark:text-garden-darktext tracking-tight flex items-center gap-1">
                  AlgoBloom
                </h1>
                <p className="text-[10px] text-garden-secondary dark:text-garden-darksecondary font-medium">
                  Bloom with confidence
                </p>
              </div>
            </div>

            {/* Close button on mobile */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-xl text-garden-secondary hover:text-garden-text hover:bg-garden-bg"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick stats mini-bar */}
          <div className="px-4 py-3 mx-3 my-3 rounded-2xl bg-white/70 dark:bg-garden-darkbg/50 border border-garden-cardborder/60 dark:border-garden-darkcardborder/60 flex items-center justify-around text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500 font-bold">🔥</span>
              <span className="font-semibold text-garden-text dark:text-garden-darktext">{streak}d Streak</span>
            </div>
            <div className="h-4 w-px bg-garden-cardborder dark:bg-garden-darkcardborder" />
            <div className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-dustyrose-500" />
              <span className="font-semibold text-garden-text dark:text-garden-darktext">{xp} XP</span>
            </div>
          </div>

          {/* Grouped Nav Sections */}
          <nav className="px-3 py-1 space-y-4 overflow-y-auto max-h-[calc(100vh-230px)] scrollbar-thin">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-1">
                {/* Subtle Section Label */}
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-garden-secondary/80 dark:text-garden-darksecondary/80 px-3.5 pt-1 pb-1">
                  {section.title}
                </div>

                {/* Section Nav Items */}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-dustyrose text-garden-text font-semibold shadow-sm'
                          : 'text-garden-secondary dark:text-garden-darksecondary hover:text-garden-text dark:hover:text-garden-darktext hover:bg-white/60 dark:hover:bg-garden-hover'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className={isActive ? 'text-garden-text' : 'text-garden-secondary'} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? 'bg-white/40 text-garden-text'
                              : 'bg-garden-cardborder/60 dark:bg-garden-darkcardborder text-garden-secondary'
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

        {/* Botanical Footer Motto */}
        <div className="p-4 border-t border-garden-cardborder/60 dark:border-garden-darkcardborder/60 text-center">
          <p className="text-[11px] text-garden-secondary dark:text-garden-darksecondary italic">
            "One tiny step today. Let's bloom together. 🌸"
          </p>
        </div>
      </aside>
    </>
  );
};
