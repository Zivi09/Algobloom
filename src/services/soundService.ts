/**
 * AlgoBloom Acoustic Sonification Service
 * Pure Web Audio API botanical acoustic synthesizer.
 *
 * Implements Kalimba / Marimba acoustic physical modeling with harmonic overtones,
 * wooden mallet transients, pentatonic scale mapping, and browser autoplay compliance.
 *
 * Zero external audio files or network mp3 dependencies.
 */

import { ProgressService } from './progressService';

// Harmonious C Major / A Minor Pentatonic Scale across 3+ octaves (C4 to C7)
export const PENTATONIC_SCALE = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.0,  // G4
  440.0,  // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.0,  // A5
  1046.5, // C6
  1174.66,// D6
  1318.51,// E6
  1567.98,// G6
  1760.0, // A6
  2093.0, // C7
];

export interface PlayToneOptions {
  gain?: number;
  duration?: number;
  harmonicRatio?: number;
  harmonicGain?: number;
  type?: 'kalimba' | 'marimba' | 'chime';
  startTimeOffset?: number;
}

export class SoundService {
  private static instance: SoundService | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isLocallyMuted = false;
  private masterVolume = 0.35; // Comfortable listening baseline
  private hasRegisteredInteractionListeners = false;

  private constructor() {
    this.registerAutoResumeOnInteraction();
  }

  public static getInstance(): SoundService {
    if (!SoundService.instance) {
      SoundService.instance = new SoundService();
    }
    return SoundService.instance;
  }

  /**
   * Lazily initializes AudioContext and Master GainNode
   */
  private initContext(): boolean {
    if (typeof window === 'undefined') return false;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;

      try {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (err) {
        console.warn('AudioContext initialization failed:', err);
        return false;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Will resume on next user interaction
      });
    }

    return true;
  }

  /**
   * Registers global user interaction listeners to safely resume suspended AudioContext
   * in compliance with modern browser autoplay policies.
   */
  private registerAutoResumeOnInteraction(): void {
    if (typeof window === 'undefined' || this.hasRegisteredInteractionListeners) return;

    const resumeAudio = () => {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    };

    const events = ['click', 'keydown', 'touchstart', 'pointerdown'];
    events.forEach((evt) => {
      window.addEventListener(evt, resumeAudio, { passive: true, capture: true });
    });

    this.hasRegisteredInteractionListeners = true;
  }

  /**
   * Explicitly resume AudioContext upon user action
   */
  public resume(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Checks whether sound is enabled across progressService and local state
   */
  public isSoundEnabled(): boolean {
    if (this.isLocallyMuted) return false;
    try {
      const progress = ProgressService.getInstance().getProgress();
      return progress.settings.soundEnabled !== false;
    } catch {
      return true;
    }
  }

  /**
   * Toggle mute state and synchronize with user settings in ProgressService
   */
  public toggleMute(): boolean {
    const currentlyEnabled = this.isSoundEnabled();
    const nextState = !currentlyEnabled;

    try {
      ProgressService.getInstance().updateSettings({ soundEnabled: nextState });
    } catch {
      // Local fallback
    }

    this.isLocallyMuted = !nextState;

    if (nextState) {
      this.initContext();
      this.playChirp();
    }

    return nextState;
  }

  public setMuted(muted: boolean): void {
    this.isLocallyMuted = muted;
    try {
      ProgressService.getInstance().updateSettings({ soundEnabled: !muted });
    } catch {
      // Fallback
    }
  }

  public setMasterVolume(vol: number): void {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  /**
   * Maps an array value to a frequency in the harmonious pentatonic scale
   */
  public mapValueToFrequency(val: number, maxVal: number): number {
    const safeMax = Math.max(maxVal, 1);
    const ratio = Math.max(0, Math.min(1, val / safeMax));
    const scaleIndex = Math.min(PENTATONIC_SCALE.length - 1, Math.floor(ratio * PENTATONIC_SCALE.length));
    return PENTATONIC_SCALE[scaleIndex];
  }

  /**
   * Maps an index in an array to a frequency in the harmonious pentatonic scale
   */
  public mapIndexToFrequency(index: number, total: number): number {
    const safeTotal = Math.max(total, 1);
    const ratio = Math.max(0, Math.min(1, index / safeTotal));
    const scaleIndex = Math.min(PENTATONIC_SCALE.length - 1, Math.floor(ratio * PENTATONIC_SCALE.length));
    return PENTATONIC_SCALE[scaleIndex];
  }

  /**
   * Plays a physical botanical kalimba/marimba acoustic note
   */
  public playTone(frequency: number, options: PlayToneOptions = {}): void {
    if (!this.isSoundEnabled()) return;
    if (!this.initContext() || !this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime + (options.startTimeOffset || 0);
    const duration = options.duration || 0.28;
    const peakGain = (options.gain ?? 0.22);
    const harmonicRatio = options.harmonicRatio ?? 2.76; // Kalimba acoustic tine mode
    const harmonicGainFrac = options.harmonicGain ?? 0.18;
    const instrumentType = options.type || 'kalimba';

    // 1. Fundamental Oscillator
    const oscFund = ctx.createOscillator();
    oscFund.type = instrumentType === 'marimba' ? 'triangle' : 'sine';
    oscFund.frequency.setValueAtTime(frequency, now);

    // 2. Harmonic Overtone Oscillator (creates wooden/metal tine timbre)
    const oscHarm = ctx.createOscillator();
    oscHarm.type = 'sine';
    oscHarm.frequency.setValueAtTime(frequency * harmonicRatio, now);

    // 3. Transient Percussive Tap (wooden mallet / thumb plunk)
    const oscClick = ctx.createOscillator();
    oscClick.type = 'triangle';
    oscClick.frequency.setValueAtTime(frequency * 3.8, now);
    oscClick.frequency.exponentialRampToValueAtTime(frequency * 0.9, now + 0.015);

    // Envelopes
    const noteGain = ctx.createGain();
    const harmGain = ctx.createGain();
    const clickGain = ctx.createGain();

    // Fundamental Envelope: Fast attack ~0.008s, exponential decay ~0.25s
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peakGain, now + 0.008);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Harmonic Envelope: Faster decay ~0.09s
    harmGain.gain.setValueAtTime(0.0001, now);
    harmGain.gain.linearRampToValueAtTime(peakGain * harmonicGainFrac, now + 0.006);
    harmGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(0.12, duration * 0.45));

    // Click Transient Envelope: 0.012s click
    clickGain.gain.setValueAtTime(peakGain * 0.2, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    // Connections
    oscFund.connect(noteGain);
    oscHarm.connect(harmGain);
    oscClick.connect(clickGain);

    noteGain.connect(this.masterGain);
    harmGain.connect(this.masterGain);
    clickGain.connect(this.masterGain);

    // Start & Stop
    oscFund.start(now);
    oscHarm.start(now);
    oscClick.start(now);

    const stopTime = now + duration + 0.02;
    oscFund.stop(stopTime);
    oscHarm.stop(stopTime);
    oscClick.stop(stopTime);
  }

  /**
   * Plays a delicate dual comparison chime when comparing two array elements
   */
  public playComparison(valA: number, valB: number, maxVal: number): void {
    if (!this.isSoundEnabled()) return;

    const freqA = this.mapValueToFrequency(valA, maxVal);
    const freqB = this.mapValueToFrequency(valB, maxVal);

    // Staggered acoustic notes: Note A then Note B with 45ms delta
    this.playTone(freqA, {
      gain: 0.16,
      duration: 0.22,
      type: 'kalimba',
      startTimeOffset: 0,
    });

    this.playTone(freqB, {
      gain: 0.16,
      duration: 0.22,
      type: 'kalimba',
      startTimeOffset: 0.045,
    });
  }

  /**
   * Plays a tactile acoustic swap resonance when two elements exchange positions
   */
  public playSwap(valA: number, valB: number, maxVal: number): void {
    if (!this.isSoundEnabled()) return;

    const freqA = this.mapValueToFrequency(valA, maxVal);
    const freqB = this.mapValueToFrequency(valB, maxVal);

    // Richer marimba acoustic strike with warm wooden resonance
    this.playTone(freqA, {
      gain: 0.24,
      duration: 0.28,
      harmonicRatio: 3.0,
      harmonicGain: 0.22,
      type: 'marimba',
      startTimeOffset: 0,
    });

    this.playTone(freqB, {
      gain: 0.24,
      duration: 0.28,
      harmonicRatio: 3.0,
      harmonicGain: 0.22,
      type: 'marimba',
      startTimeOffset: 0.06,
    });
  }

  /**
   * Plays a crystalline sorted chime when an element locks into its final position
   */
  public playSortedChime(index: number, total: number): void {
    if (!this.isSoundEnabled()) return;

    const freq = this.mapIndexToFrequency(index, total);

    // Crisp crystalline bell chime
    this.playTone(freq, {
      gain: 0.26,
      duration: 0.42,
      harmonicRatio: 2.0, // Octave shimmer
      harmonicGain: 0.35,
      type: 'chime',
    });
  }

  /**
   * Plays a triumphant cascading victory arpeggio when algorithm execution finishes
   */
  public playVictoryArpeggio(): void {
    if (!this.isSoundEnabled()) return;

    // Upward cascading garden pentatonic progression: C5, E5, G5, A5, C6, D6, E6, G6, C7
    const victoryNotes = [523.25, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98, 2093.0];
    const noteGap = 0.065; // 65ms cadence

    victoryNotes.forEach((freq, idx) => {
      this.playTone(freq, {
        gain: 0.20 + (idx * 0.015), // Gently blooming dynamic swell
        duration: 0.55,
        harmonicRatio: 2.0,
        harmonicGain: 0.25,
        type: 'kalimba',
        startTimeOffset: idx * noteGap,
      });
    });
  }

  /**
   * Plays an organic water drop / bubble pop sound (e.g. for resets, UI clicks, small pops)
   */
  public playBubblePop(): void {
    if (!this.isSoundEnabled()) return;
    if (!this.initContext() || !this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Rapid upward pitch sweep
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(820, now + 0.05);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Plays a cheerful Sprout chirp (two sweet micro-warbles)
   */
  public playChirp(): void {
    if (!this.isSoundEnabled()) return;
    if (!this.initContext() || !this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Sprout warble 1
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(1420, now + 0.05);
    // Sprout warble 2
    osc.frequency.setValueAtTime(1200, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(1780, now + 0.13);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.19);
  }
}

export const soundService = SoundService.getInstance();
