import React, { useState, useEffect } from 'react';
import { Sidebar, NavPage } from './components/Sidebar';
import { Header } from './components/Header';
import { AlgoBuddy } from './components/AlgoBuddy';
import { DashboardPage } from './pages/DashboardPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { ExplorePage } from './pages/ExplorePage';
import { DataStructuresPage } from './pages/DataStructuresPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ComparePage } from './pages/ComparePage';
import { GardenPage } from './pages/GardenPage';
import { DailyChallengePage } from './pages/DailyChallengePage';
import { RevisionCenterPage } from './pages/RevisionCenterPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { SettingsPage } from './pages/SettingsPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { ProgressService } from './services/progressService';
import { UserProgress, AlgorithmLesson } from './types';
import { getLessonById } from './curriculum/lessons';

export const App: React.FC = () => {
  const progressService = ProgressService.getInstance();
  const [progress, setProgress] = useState<UserProgress>(progressService.getProgress());
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState<string>('binary-search');

  // Handle Dark mode class on root element
  useEffect(() => {
    if (progress.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.settings.darkMode]);

  const handleToggleDarkMode = () => {
    const updated = progressService.updateSettings({ darkMode: !progress.settings.darkMode });
    setProgress(updated);
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentPage('lesson-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeLesson: AlgorithmLesson | undefined = getLessonById(activeLessonId);

  // Render Page Content
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <DashboardPage
            progress={progress}
            onNavigate={(p) => setCurrentPage(p as NavPage)}
            onSelectLesson={handleSelectLesson}
          />
        );
      case 'learning-path':
        return (
          <LearningPathPage
            progress={progress}
            onSelectLesson={handleSelectLesson}
          />
        );
      case 'explore':
        return (
          <ExplorePage
            progress={progress}
            onSelectLesson={handleSelectLesson}
          />
        );
      case 'data-structures':
        return <DataStructuresPage />;
      case 'playground':
        return <PlaygroundPage />;
      case 'compare':
        return <ComparePage />;
      case 'garden':
        return (
          <GardenPage
            progress={progress}
            onSelectLesson={handleSelectLesson}
          />
        );
      case 'daily-challenges':
        return (
          <DailyChallengePage
            progress={progress}
            onChallengeSolved={() => setProgress(progressService.getProgress())}
          />
        );
      case 'revision':
        return (
          <RevisionCenterPage
            progress={progress}
            onSelectLesson={handleSelectLesson}
          />
        );
      case 'achievements':
        return <AchievementsPage progress={progress} />;
      case 'bookmarks':
        return (
          <BookmarksPage
            progress={progress}
            onSelectLesson={handleSelectLesson}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            progress={progress}
            onUpdateProgress={(u) => setProgress(u)}
          />
        );
      case 'lesson-detail':
        if (!activeLesson) {
          return (
            <div className="text-center py-20">
              <h2 className="text-xl font-bold">Lesson not found</h2>
              <button
                onClick={() => setCurrentPage('explore')}
                className="mt-4 px-4 py-2 rounded-xl bg-dustyrose font-bold text-sm"
              >
                Back to Explore
              </button>
            </div>
          );
        }
        return (
          <LessonDetailPage
            lesson={activeLesson}
            onBack={() => setCurrentPage('learning-path')}
            onQuizCompleted={() => setProgress(progressService.getProgress())}
          />
        );
      default:
        return (
          <DashboardPage
            progress={progress}
            onNavigate={(p) => setCurrentPage(p as NavPage)}
            onSelectLesson={handleSelectLesson}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-garden-bg dark:bg-garden-darkbg text-garden-text dark:text-garden-darktext garden-pattern transition-colors duration-300">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        streak={progress.streak}
        xp={progress.xp}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          streak={progress.streak}
          xp={progress.xp}
          darkMode={progress.settings.darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onSelectLesson={handleSelectLesson}
        />

        {/* Dynamic Route View */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10">
          {renderPage()}
        </main>
      </div>

      {/* AlgoBuddy Mascot Widget */}
      {progress.settings.buddyVisible && (
        <AlgoBuddy
          currentLessonId={currentPage === 'lesson-detail' ? activeLessonId : undefined}
          currentLessonTitle={currentPage === 'lesson-detail' ? activeLesson?.title : undefined}
          mood="happy"
        />
      )}
    </div>
  );
};
export default App;
