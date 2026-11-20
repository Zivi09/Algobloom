import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, CheckCircle2, AlertCircle, ArrowRight, Flower2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storageAdapter } from '../../services/storageAdapter';
import { UserProgress, UserProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestProgress: UserProgress;
  onAuthSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  guestProgress,
  onAuthSuccess,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (tab === 'signup') {
        if (!username.trim()) {
          throw new Error('Please choose a username for your public garden.');
        }
        const user = await storageAdapter.register(
          email,
          password,
          username.trim(),
          displayName.trim() || username.trim(),
          guestProgress
        );
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F1B4B1', '#C6DBBB', '#FFF6D6', '#E29578'],
        });
        onAuthSuccess(user);
        onClose();
      } else {
        const user = await storageAdapter.login(email, password);
        onAuthSuccess(user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const bloomedCount = guestProgress.gardenPlants.filter((p) => p.stage === 'bloomed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg overflow-hidden transition-all duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Banner */}
        <div className="relative p-6 bg-gradient-to-br from-buttercream/60 via-dustyrose/20 to-softmauve/20 border-b border-garden-cardborder dark:border-garden-darkcardborder">
          <button
            onClick={onClose}
            aria-label="Close authentication modal"
            className="absolute top-4 right-4 p-2 rounded-full text-garden-secondary hover:text-garden-text hover:bg-white/60 dark:hover:bg-garden-darkhover transition-colors"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-garden-darkcard flex items-center justify-center shadow-sm text-2xl">
              🌸
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-garden-text dark:text-garden-darktext">
                {tab === 'signup' ? 'Join AlgoBloom Garden' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-garden-secondary dark:text-garden-darksecondary">
                {tab === 'signup'
                  ? 'Preserve your botanical growth in the cloud'
                  : 'Continue your algorithm bloom journey'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-garden-cardborder dark:border-garden-darkcardborder px-6 pt-3 bg-garden-bg/40 dark:bg-garden-darkbg/40">
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setError(null);
            }}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all mr-6 ${
              tab === 'signup'
                ? 'border-dustyrose-500 text-garden-text dark:text-garden-darktext'
                : 'border-transparent text-garden-secondary hover:text-garden-text'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setError(null);
            }}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all ${
              tab === 'signin'
                ? 'border-dustyrose-500 text-garden-text dark:text-garden-darktext'
                : 'border-transparent text-garden-secondary hover:text-garden-text'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Guest Progress Notice */}
          {tab === 'signup' && guestProgress.xp > 0 && (
            <div className="p-3.5 rounded-2xl bg-buttercream/40 dark:bg-buttercream/10 border border-buttercream-300 dark:border-buttercream/30 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
              <Sparkles size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">🌸 Guest progress detected!</span>
                <p className="mt-0.5 text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                  Your <strong>{guestProgress.xp} XP</strong> and {bloomedCount} bloomed flowers
                  will be automatically saved to your cloud account upon signing up.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {tab === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-garden-text dark:text-garden-darktext mb-1.5">
                  Display Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-garden-secondary" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-garden-bg/50 dark:bg-garden-darkbg/50 border border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm text-garden-text dark:text-garden-darktext focus:outline-none focus:ring-2 focus:ring-dustyrose"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-garden-text dark:text-garden-darktext mb-1.5">
                  Public Handle (@username)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-garden-secondary font-bold text-xs">@</span>
                  <input
                    type="text"
                    required
                    placeholder="botanist_maya"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-2xl bg-garden-bg/50 dark:bg-garden-darkbg/50 border border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm text-garden-text dark:text-garden-darktext focus:outline-none focus:ring-2 focus:ring-dustyrose"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-garden-text dark:text-garden-darktext mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-3 text-garden-secondary" />
              <input
                type="email"
                required
                placeholder="you@algobloom.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-garden-bg/50 dark:bg-garden-darkbg/50 border border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm text-garden-text dark:text-garden-darktext focus:outline-none focus:ring-2 focus:ring-dustyrose"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-garden-text dark:text-garden-darktext mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-3 text-garden-secondary" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-garden-bg/50 dark:bg-garden-darkbg/50 border border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm text-garden-text dark:text-garden-darktext focus:outline-none focus:ring-2 focus:ring-dustyrose"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-dustyrose to-softmauve hover:brightness-105 active:scale-[0.99] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting Garden...
              </span>
            ) : tab === 'signup' ? (
              <>
                <span>Create Cloud Account</span>
                <ArrowRight size={16} />
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="p-4 bg-garden-bg/40 dark:bg-garden-darkbg/40 border-t border-garden-cardborder dark:border-garden-darkcardborder text-center text-[11px] text-garden-secondary">
          Protected by botanical end-to-end encryption 🌸 Free forever
        </div>
      </div>
    </div>
  );
};
