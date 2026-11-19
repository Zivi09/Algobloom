import React, { useState } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';
import { UserProgress } from '../types';
import { ProgressService } from '../services/progressService';

interface SettingsPageProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ progress, onUpdateProgress }) => {
  const progressService = ProgressService.getInstance();
  const [copiedExport, setCopiedExport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleToggleTheme = () => {
    const updated = progressService.updateSettings({ darkMode: !progress.settings.darkMode });
    onUpdateProgress(updated);
  };

  const handleSpeedChange = (speed: 'slow' | 'normal' | 'fast') => {
    const updated = progressService.updateSettings({ animationSpeed: speed });
    onUpdateProgress(updated);
  };

  const handleToggleSound = () => {
    const updated = progressService.updateSettings({ soundEnabled: !progress.settings.soundEnabled });
    onUpdateProgress(updated);
  };

  const handleToggleBuddy = () => {
    const updated = progressService.updateSettings({ buddyVisible: !progress.settings.buddyVisible });
    onUpdateProgress(updated);
  };

  const handleExport = () => {
    const json = progressService.exportJson();
    navigator.clipboard.writeText(json);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2500);
  };

  const handleImport = () => {
    const success = progressService.importJson(importText);
    if (success) {
      setImportStatus('Progress imported successfully! 🌸');
      onUpdateProgress(progressService.getProgress());
      setImportText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Failed to import JSON: Invalid structure.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all learning progress? This will clear XP and garden plants.')) {
      const reset = progressService.resetProgress();
      onUpdateProgress(reset);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mistylavender/40 border border-mistylavender text-xs font-semibold text-garden-text">
          <Settings size={13} />
          <span>Application Preferences</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Settings & Data
        </h1>
        <p className="text-sm sm:text-base text-garden-secondary max-w-xl">
          Personalize your learning garden theme, animation pace, mascot preferences, and manage your progress backups.
        </p>
      </div>

      {/* Preferences Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <h2 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext pb-3 border-b border-garden-cardborder">
          Appearance & Playback
        </h2>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="font-semibold text-sm text-garden-text dark:text-garden-darktext">
              Color Theme
            </h4>
            <p className="text-xs text-garden-secondary">
              Switch between Pastel Sage Garden (Light) and Twilight Forest (Dark) mode.
            </p>
          </div>
          <button
            onClick={handleToggleTheme}
            className="px-4 py-2 rounded-2xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder flex items-center gap-2 text-xs font-semibold hover:border-dustyrose transition-colors"
          >
            {progress.settings.darkMode ? (
              <>
                <Moon size={15} className="text-amber-300" />
                <span>Twilight (Dark)</span>
              </>
            ) : (
              <>
                <Sun size={15} className="text-sagegreen-500" />
                <span>Pastel Sage (Light)</span>
              </>
            )}
          </button>
        </div>

        {/* Animation Speed */}
        <div className="flex items-center justify-between py-2 border-t border-garden-cardborder/60">
          <div>
            <h4 className="font-semibold text-sm text-garden-text dark:text-garden-darktext">
              Default Visualizer Animation Speed
            </h4>
            <p className="text-xs text-garden-secondary">
              Sets the pacing for algorithm execution steps in visualizers.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {(['slow', 'normal', 'fast'] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => handleSpeedChange(spd)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize border ${
                  progress.settings.animationSpeed === spd
                    ? 'bg-dustyrose border-dustyrose text-garden-text font-bold shadow-sm'
                    : 'border-garden-cardborder text-garden-secondary hover:text-garden-text'
                }`}
              >
                {spd}
              </button>
            ))}
          </div>
        </div>

        {/* AlgoBuddy Mascot */}
        <div className="flex items-center justify-between py-2 border-t border-garden-cardborder/60">
          <div>
            <h4 className="font-semibold text-sm text-garden-text dark:text-garden-darktext">
              Show AlgoBuddy Floating Mascot
            </h4>
            <p className="text-xs text-garden-secondary">
              Enable the interactive floral companion for tutor queries and hints.
            </p>
          </div>
          <button
            onClick={handleToggleBuddy}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              progress.settings.buddyVisible
                ? 'bg-sagegreen text-white shadow-sm'
                : 'bg-garden-bg text-garden-secondary border border-garden-cardborder'
            }`}
          >
            {progress.settings.buddyVisible ? 'Enabled' : 'Hidden'}
          </button>
        </div>
      </section>

      {/* Data Management Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
        <h2 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext pb-3 border-b border-garden-cardborder">
          Progress Backup & Migration
        </h2>

        {/* Export JSON */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-sm text-garden-text dark:text-garden-darktext">
              Export Progress Backup
            </h4>
            <p className="text-xs text-garden-secondary">
              Copy your entire learning garden, XP, and completed lessons as JSON.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-xl bg-dustyrose text-garden-text font-semibold text-xs sm:text-sm hover:bg-dustyrose-400 transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            {copiedExport ? <Check size={15} /> : <Download size={15} />}
            <span>{copiedExport ? 'Copied to Clipboard!' : 'Copy Progress JSON'}</span>
          </button>
        </div>

        {/* Import JSON */}
        <div className="flex flex-col gap-3 pt-4 border-t border-garden-cardborder/60">
          <div>
            <h4 className="font-semibold text-sm text-garden-text dark:text-garden-darktext">
              Import Progress Backup
            </h4>
            <p className="text-xs text-garden-secondary">
              Paste your exported JSON below to restore progress on another browser.
            </p>
          </div>
          <textarea
            rows={3}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste your JSON backup here..."
            className="w-full p-3 rounded-2xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder text-xs font-mono text-garden-text focus:outline-none focus:ring-2 focus:ring-dustyrose"
          />
          {importStatus && (
            <p className="text-xs font-semibold text-sagegreen">{importStatus}</p>
          )}
          <div className="flex justify-end">
            <button
              onClick={handleImport}
              disabled={!importText.trim()}
              className="px-4 py-2 rounded-xl bg-softmauve text-white font-semibold text-xs sm:text-sm hover:bg-softmauve-400 disabled:opacity-40 transition-colors"
            >
              Restore from JSON
            </button>
          </div>
        </div>

        {/* Reset Progress */}
        <div className="flex items-center justify-between pt-4 border-t border-garden-cardborder/60">
          <div>
            <h4 className="font-semibold text-sm text-red-600">
              Reset All Progress
            </h4>
            <p className="text-xs text-garden-secondary">
              Clears all XP, bloomed flowers, and resets your learning garden to day 1.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-xs transition-colors"
          >
            Reset Progress
          </button>
        </div>
      </section>
    </div>
  );
};
