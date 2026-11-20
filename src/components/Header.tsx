import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Sun,
  Moon,
  Sparkles,
  Flame,
  X,
  ChevronDown,
  LogOut,
  Flower2,
  Award,
  Cloud,
} from 'lucide-react';
import { ALL_LESSONS } from '../curriculum/lessons';
import { AlgorithmLesson, UserProfile } from '../types';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  streak: number;
  xp: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onSelectLesson: (lessonId: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: () => void;
  onOpenMyGarden?: (username: string) => void;
  onLogout?: () => void;
  onNavigatePage?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  streak,
  xp,
  darkMode,
  onToggleDarkMode,
  onSelectLesson,
  currentUser,
  onOpenAuthModal,
  onOpenMyGarden,
  onLogout,
  onNavigatePage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Filter lessons matching query
  const searchResults: AlgorithmLesson[] = searchQuery.trim()
    ? ALL_LESSONS.filter(
        (l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (lessonId: string) => {
    onSelectLesson(lessonId);
    setSearchQuery('');
    setIsSearchOpen(false);
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
    <header className="sticky top-0 z-30 h-16 bg-garden-bg/90 dark:bg-garden-darkbg/90 backdrop-blur-md border-b border-garden-cardborder dark:border-garden-darkcardborder flex items-center justify-between px-4 sm:px-8 transition-colors duration-300">
      {/* Left: Mobile hamburger & Search */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-xl text-garden-secondary hover:text-garden-text hover:bg-garden-cardborder/40 transition-colors"
        >
          <Menu size={22} />
        </button>

        {/* Global Search Bar */}
        <div ref={searchRef} className="relative w-40 sm:w-72 md:w-80">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-garden-secondary pointer-events-none" />
            <input
              type="text"
              placeholder="Search algorithms, categories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-8 py-2 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm text-garden-text dark:text-garden-darktext placeholder:text-garden-secondary/70 focus:outline-none focus:ring-2 focus:ring-dustyrose shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-garden-secondary hover:text-garden-text"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-white dark:bg-garden-darkcard rounded-2xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg p-2 max-h-72 overflow-y-auto z-50">
              <div className="text-[10px] font-bold uppercase tracking-wider text-garden-secondary px-3 py-1">
                Matching Lessons ({searchResults.length})
              </div>
              {searchResults.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => handleResultClick(lesson.id)}
                  className="p-2.5 rounded-xl hover:bg-garden-bg dark:hover:bg-garden-hover cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-garden-text dark:text-garden-darktext">
                      {lesson.title}
                    </h4>
                    <p className="text-[11px] text-garden-secondary">{lesson.category} • Level {lesson.level}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-buttercream/50 text-amber-900 font-medium">
                    {lesson.difficulty}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Streak, XP, Dark mode toggle, User Profile Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Badge */}
        <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-buttercream/50 dark:bg-buttercream/20 border border-buttercream-400 text-xs font-semibold text-amber-900 dark:text-amber-200">
          <Flame size={15} className="text-amber-500 fill-amber-500" />
          <span>{streak}d</span>
        </div>

        {/* XP Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dustyrose/40 dark:bg-dustyrose/20 border border-dustyrose-400 text-xs font-semibold text-red-950 dark:text-red-200">
          <Sparkles size={14} className="text-dustyrose-600" />
          <span>{xp} XP</span>
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          aria-label="Toggle theme mode"
          title={darkMode ? "Switch to Pastel Green mode" : "Switch to Dark mode"}
          className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-garden-text dark:text-garden-darktext shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-semibold text-xs"
        >
          {darkMode ? (
            <>
              <Sun size={15} className="text-amber-400" />
              <span className="hidden md:inline">Pastel Green</span>
            </>
          ) : (
            <>
              <Moon size={15} className="text-softmauve-500 fill-softmauve-400" />
              <span className="hidden md:inline">Dark</span>
            </>
          )}
        </button>

        {/* User Profile / Auth Action */}
        {currentUser ? (
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
              aria-label="User profile menu"
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-xs font-semibold text-garden-text dark:text-garden-darktext hover:border-dustyrose shadow-sm transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-buttercream/60 dark:bg-buttercream/20 flex items-center justify-center text-sm">
                {getFlowerEmoji(currentUser.avatarFlower)}
              </div>
              <span className="max-w-[100px] truncate hidden sm:inline">
                {currentUser.displayName || currentUser.username}
              </span>
              <ChevronDown size={14} className="text-garden-secondary" />
            </button>

            {/* Profile Dropdown */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-12 w-56 bg-white dark:bg-garden-darkcard rounded-2xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg py-2 z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b border-garden-cardborder dark:border-garden-darkcardborder">
                  <p className="text-xs font-bold text-garden-text dark:text-garden-darktext truncate">
                    {currentUser.displayName}
                  </p>
                  <p className="text-[11px] text-garden-secondary truncate">@{currentUser.username}</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-dustyrose-600 dark:text-dustyrose-300">
                    <span>{currentUser.leagueTier} League</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      if (onOpenMyGarden) onOpenMyGarden(currentUser.username);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-garden-text dark:text-garden-darktext hover:bg-garden-bg dark:hover:bg-garden-hover flex items-center gap-2.5 transition-colors"
                  >
                    <Flower2 size={15} className="text-dustyrose-500" />
                    <span>My Public Garden 🌷</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      if (onNavigatePage) onNavigatePage('achievements');
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-garden-text dark:text-garden-darktext hover:bg-garden-bg dark:hover:bg-garden-hover flex items-center gap-2.5 transition-colors"
                  >
                    <Award size={15} className="text-amber-500" />
                    <span>Profile & Stats ✨</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2.5 transition-colors"
                  >
                    <LogOut size={15} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-dustyrose/20 to-softmauve/20 hover:from-dustyrose/30 hover:to-softmauve/30 border border-dustyrose-400 text-red-950 dark:text-red-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <Cloud size={14} className="text-dustyrose-600" />
            <span className="hidden sm:inline">Sign In / Cloud Save</span>
            <span className="sm:hidden">Sign In</span>
            <span>🌸</span>
          </button>
        )}
      </div>
    </header>
  );
};
export default Header;
