import React from 'react';
import { RotateCcw, AlertTriangle, BookOpen, Bookmark, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../types';
import { ALL_LESSONS } from '../curriculum/lessons';

interface RevisionCenterPageProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

export const RevisionCenterPage: React.FC<RevisionCenterPageProps> = ({
  progress,
  onSelectLesson,
}) => {
  const revisionItems = progress.revisionQueue;
  const bookmarkedLessons = ALL_LESSONS.filter((l) => progress.bookmarks.includes(l.id));

  return (
    <div className="max-w-5xl mx-auto pb-20 flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dustyrose/30 border border-dustyrose text-xs font-semibold text-garden-text">
          <RotateCcw size={13} />
          <span>Personal Spaced Repetition Center</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Revision Center
        </h1>
        <p className="text-sm sm:text-base text-garden-secondary max-w-xl">
          Review concepts that challenged you, re-attempt missed quiz questions, and reinforce weak algorithmic intuition.
        </p>
      </div>

      {/* Review Queue Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-garden-cardborder">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-garden-text dark:text-garden-darktext">
              Topics Marked for Revision ({revisionItems.length})
            </h2>
          </div>
          <span className="text-xs text-garden-secondary">Auto-added from quiz scores &lt; 4/5</span>
        </div>

        {revisionItems.length === 0 ? (
          <div className="text-center py-10 bg-garden-bg/40 dark:bg-garden-darkbg/40 rounded-2xl border border-garden-cardborder p-6 flex flex-col items-center gap-2">
            <span className="text-4xl">🌸</span>
            <h3 className="font-heading font-bold text-base text-garden-text dark:text-garden-darktext">
              All Clear in Your Revision Queue!
            </h3>
            <p className="text-xs text-garden-secondary max-w-md">
              You currently have no concepts marked for review. When you take quizzes and need concept reinforcement, topics will automatically appear here!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {revisionItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-garden-bg/50 dark:bg-garden-darkbg/50 border border-garden-cardborder flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-dustyrose/30 text-red-950 font-bold uppercase">
                      Needs Practice
                    </span>
                    <span className="text-[11px] text-garden-secondary">
                      {new Date(item.dateAdded).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-garden-text dark:text-garden-darktext">
                    {item.algorithmTitle}
                  </h4>
                  <p className="text-xs text-garden-secondary mt-0.5">{item.reason}</p>
                </div>

                <button
                  onClick={() => onSelectLesson(item.lessonId)}
                  className="px-4 py-2 rounded-xl bg-dustyrose text-garden-text font-bold text-xs sm:text-sm hover:bg-dustyrose-400 transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <span>Practice Lesson</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bookmarked Lessons Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-garden-cardborder">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔖</span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-garden-text dark:text-garden-darktext">
              Bookmarked Lessons for Quick Revision ({bookmarkedLessons.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarkedLessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className="p-4 rounded-2xl bg-garden-bg/50 dark:bg-garden-darkbg/50 border border-garden-cardborder hover:border-dustyrose cursor-pointer transition-all flex flex-col justify-between gap-3 group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-dustyrose-600 block mb-1">
                  Level {lesson.level} • {lesson.category}
                </span>
                <h4 className="font-heading font-bold text-sm text-garden-text dark:text-garden-darktext group-hover:text-dustyrose-600 transition-colors">
                  {lesson.title}
                </h4>
                <p className="text-xs text-garden-secondary line-clamp-2 mt-1">
                  {lesson.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-garden-cardborder/40 text-xs font-semibold text-dustyrose-600">
                <span>Open Lesson</span>
                <Play size={11} className="fill-dustyrose-600" />
              </div>
            </div>
          ))}

          {bookmarkedLessons.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-garden-secondary italic">
              No lessons bookmarked yet. Click the bookmark icon on any lesson page to save it for quick revision!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
