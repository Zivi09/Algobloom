import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Sun, Moon, Sparkles, Flame, X } from 'lucide-react';
import { ALL_LESSONS } from '../curriculum/lessons';
import { AlgorithmLesson } from '../types';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  streak: number;
  xp: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  streak,
  xp,
  darkMode,
  onToggleDarkMode,
  onSelectLesson,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (lessonId: string) => {
    onSelectLesson(lessonId);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-garden-bg/90 dark:bg-garden-darkbg/90 backdrop-blur-md border-b border-garden-cardborder dark:border-garden-darkcardborder flex items-center justify-between px-4 sm:px-8">
      {/* Left: Mobile hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-xl text-garden-secondary hover:text-garden-text hover:bg-garden-cardborder/40 transition-colors"
        >
          <Menu size={22} />
        </button>

        {/* Global Search Bar */}
        <div ref={searchRef} className="relative w-48 sm:w-80">
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

      {/* Right Controls: Streak, XP, Dark mode toggle */}
      <div className="flex items-center gap-3">
        {/* Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-buttercream/50 dark:bg-buttercream/20 border border-buttercream-400 text-xs font-semibold text-amber-900 dark:text-amber-200">
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
          className="px-3.5 py-1.5 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder text-garden-text dark:text-garden-darktext shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-semibold text-xs"
        >
          {darkMode ? (
            <>
              <Sun size={16} className="text-amber-400" />
              <span>Pastel Green</span>
            </>
          ) : (
            <>
              <Moon size={16} className="text-softmauve-500 fill-softmauve-400" />
              <span>Dark Mode 🌙</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
