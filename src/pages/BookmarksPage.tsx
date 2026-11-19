import React from 'react';
import { Bookmark, Clock, Play } from 'lucide-react';
import { ALL_LESSONS } from '../curriculum/lessons';
import { UserProgress } from '../types';

interface BookmarksPageProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({ progress, onSelectLesson }) => {
  const bookmarkedLessons = ALL_LESSONS.filter((l) => progress.bookmarks.includes(l.id));

  return (
    <div className="max-w-5xl mx-auto pb-20 flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softmauve/30 border border-softmauve text-xs font-semibold text-garden-text">
          <Bookmark size={13} />
          <span>Saved Lessons</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Your Bookmarks
        </h1>
        <p className="text-sm sm:text-base text-garden-secondary max-w-xl">
          Quickly access the algorithms and lessons you have pinned for study, interview prep, or deep-dive experimentation.
        </p>
      </div>

      {bookmarkedLessons.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder shadow-sm flex flex-col items-center gap-3">
          <span className="text-4xl">🔖</span>
          <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
            No Bookmarks Yet
          </h3>
          <p className="text-xs sm:text-sm text-garden-secondary max-w-md">
            When exploring algorithms, click the "Bookmark" button at the top of any lesson page to add it to this collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarkedLessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder hover:border-dustyrose hover:shadow-garden-lg cursor-pointer transition-all duration-300 flex flex-col justify-between gap-4 group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-dustyrose-600 block mb-1">
                  Level {lesson.level} • {lesson.category}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-garden-text dark:text-garden-darktext group-hover:text-dustyrose-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-xs text-garden-secondary line-clamp-2 mt-1 italic">
                  "{lesson.tagline}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-garden-cardborder/60 text-xs">
                <span className="text-garden-secondary flex items-center gap-1">
                  <Clock size={13} /> {lesson.estimatedMinutes} mins
                </span>
                <span className="text-dustyrose-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Learn</span>
                  <Play size={11} className="fill-dustyrose-600" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
