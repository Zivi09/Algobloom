import React, { useState } from 'react';
import { Search, Filter, Clock, Play, CheckCircle2, Bookmark } from 'lucide-react';
import { ALL_LESSONS } from '../curriculum/lessons';
import { Difficulty, Category, UserProgress } from '../types';

interface ExplorePageProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  progress,
  onSelectLesson,
}) => {
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = [
    'All',
    'Searching',
    'Sorting',
    'Graphs',
    'Shortest Path',
    'Trees',
    'Dynamic Programming',
    'Complexity',
    'Foundations',
  ];

  const filteredLessons = ALL_LESSONS.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.category.toLowerCase().includes(search.toLowerCase()) ||
      l.tagline.toLowerCase().includes(search.toLowerCase());

    const matchesDiff = difficultyFilter === 'All' || l.difficulty === difficultyFilter;
    const matchesCat = categoryFilter === 'All' || l.category === categoryFilter;

    return matchesSearch && matchesDiff && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto pb-20 flex flex-col gap-8">
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Explore All Algorithms
        </h1>
        <p className="text-sm sm:text-base text-garden-secondary max-w-xl">
          Search, filter, and inspect every algorithm and data structure in the AlgoBloom curriculum.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm flex flex-col gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-3 text-garden-secondary" />
          <input
            type="text"
            placeholder="Search by algorithm name, category, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder text-sm text-garden-text dark:text-garden-darktext focus:outline-none focus:ring-2 focus:ring-dustyrose"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  categoryFilter === cat
                    ? 'bg-dustyrose text-garden-text font-bold shadow-sm'
                    : 'bg-garden-bg dark:bg-garden-darkbg text-garden-secondary hover:text-garden-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-garden-secondary font-medium">Difficulty:</span>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder text-xs font-semibold text-garden-text focus:outline-none"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Algorithms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const isMastered = progress.masteredAlgorithms.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder hover:border-dustyrose hover:shadow-garden-lg cursor-pointer transition-all duration-300 flex flex-col justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-dustyrose-600">
                    Level {lesson.level} • {lesson.category}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      lesson.difficulty === 'Beginner'
                        ? 'bg-sagegreen/20 text-sagegreen-500'
                        : lesson.difficulty === 'Intermediate'
                        ? 'bg-buttercream/50 text-amber-900'
                        : 'bg-softmauve/30 text-softmauve-700'
                    }`}
                  >
                    {lesson.difficulty}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext group-hover:text-dustyrose-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs text-garden-secondary line-clamp-2 mt-1 italic">
                  "{lesson.tagline}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-garden-cardborder/60 text-xs">
                <span className="text-garden-secondary flex items-center gap-1">
                  <Clock size={13} /> {lesson.estimatedMinutes} mins
                </span>

                {isMastered ? (
                  <span className="px-2.5 py-1 rounded-full bg-sagegreen/20 text-sagegreen font-bold text-[11px] flex items-center gap-1">
                    🌸 Mastered
                  </span>
                ) : isCompleted ? (
                  <span className="px-2.5 py-1 rounded-full bg-buttercream/40 text-amber-900 font-bold text-[11px] flex items-center gap-1">
                    🌱 Bloomed
                  </span>
                ) : (
                  <span className="text-dustyrose-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Learn</span>
                    <Play size={11} className="fill-dustyrose-600" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder p-8">
          <p className="text-garden-secondary text-sm">
            No algorithms found matching your filter criteria. Try clearing the search query!
          </p>
        </div>
      )}
    </div>
  );
};
