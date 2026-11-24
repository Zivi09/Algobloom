import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Compass,
  CheckCircle2,
  Award,
  Flower2,
  ArrowRight,
  Footprints,
} from 'lucide-react';
import { CURRICULUM_LEVELS } from '../../curriculum/levels';
import { UserProgress } from '../../types';
import { SproutAvatar } from './SproutAvatar';

export interface WaypointData {
  x: number;
  y: number;
  name: string;
  level: number;
  subtitle?: string;
  flowerType?: 'daisy' | 'tulip' | 'blossom' | 'sunflower' | 'lotus';
}

interface LivingGardenPathMapProps {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onExpandLevel?: (level: number) => void;
  currentLevel: number;
  levelDefaultLessons: Record<number, string>;
}

export const LivingGardenPathMap: React.FC<LivingGardenPathMapProps> = ({
  progress,
  onSelectLesson,
  onExpandLevel,
  currentLevel,
  levelDefaultLessons,
}) => {
  // 15 Waypoints precisely calibrated on the pink dotted cobblestone trail (857x467)
  const PATH_WAYPOINTS: WaypointData[] = [
    { x: 372, y: 447, name: 'The Nursery Gate', level: 0, subtitle: 'What is an Algorithm?', flowerType: 'daisy' },
    { x: 320, y: 405, name: 'Lower Meadow Path', level: 0, subtitle: 'Variables & Seed Packets', flowerType: 'daisy' },
    { x: 251, y: 419, name: 'Data Structure Basin', level: 1, subtitle: 'Arrays & Memory Pots', flowerType: 'tulip' },
    { x: 178, y: 419, name: 'Pond Bank Walkway', level: 1, subtitle: 'Stacks & Queues', flowerType: 'tulip' },
    { x: 104, y: 362, name: 'Linear Search Shore', level: 2, subtitle: 'Step-by-step river pebble search', flowerType: 'blossom' },
    { x: 75, y: 285, name: 'Binary Search Curve', level: 2, subtitle: 'Halving the stepping stones', flowerType: 'blossom' },
    { x: 75, y: 170, name: 'Sorting Meadow Ridge', level: 3, subtitle: 'Bubble & Selection Sort', flowerType: 'sunflower' },
    { x: 115, y: 145, name: 'Quick Sort Fork', level: 3, subtitle: 'Pivot & Partition Path', flowerType: 'sunflower' },
    { x: 176, y: 150, name: 'Complexity Ascent', level: 4, subtitle: 'Big-O Mountain Glade', flowerType: 'daisy' },
    { x: 244, y: 176, name: 'Recursion Glade', level: 5, subtitle: 'Mirrored Reflecting Pools', flowerType: 'lotus' },
    { x: 302, y: 203, name: 'Divide & Conquer Way', level: 6, subtitle: 'Subproblem Orchards', flowerType: 'blossom' },
    { x: 366, y: 220, name: 'Treehouse Grove', level: 7, subtitle: 'Sprout’s Botanical Perch', flowerType: 'lotus' },
    { x: 433, y: 250, name: 'Graphwood Forest', level: 8, subtitle: 'BFS & DFS Vine Networks', flowerType: 'blossom' },
    { x: 519, y: 280, name: 'Dynamic Bloom Gardens', level: 10, subtitle: 'Memoization & Tabulation', flowerType: 'sunflower' },
    { x: 583, y: 294, name: 'The Algorithmic Castle', level: 14, subtitle: 'Mastery & Grand Blossom', flowerType: 'lotus' },
  ];

  // Calculate the user's active waypoint along the trail
  const activeWaypointIndex = Math.min(
    PATH_WAYPOINTS.length - 1,
    Math.max(0, currentLevel)
  );

  // States
  const [characterWaypointIdx, setCharacterWaypointIdx] = useState<number>(activeWaypointIndex);
  const [hoveredWaypoint, setHoveredWaypoint] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isWalking, setIsWalking] = useState(false);
  const [sproutGreetingOpen, setSproutGreetingOpen] = useState(false);
  const [sproutMessageIdx, setSproutMessageIdx] = useState(0);

  // Synchronize character position when currentLevel prop updates
  useEffect(() => {
    if (activeWaypointIndex !== characterWaypointIdx) {
      setIsWalking(true);
      setCharacterWaypointIdx(activeWaypointIndex);
      const timer = setTimeout(() => setIsWalking(false), 850);
      return () => clearTimeout(timer);
    }
  }, [activeWaypointIndex]);

  const currentSproutPos = PATH_WAYPOINTS[characterWaypointIdx] || PATH_WAYPOINTS[0];
  const activeLevelData = CURRICULUM_LEVELS[currentSproutPos.level];

  const audioCtxRef = useRef<AudioContext | null>(null);

  const SPROUT_MESSAGES = [
    `You are at Destination #${currentSproutPos.level}: ${currentSproutPos.name}! Keep growing! 🌸`,
    "Every step on this trail brings your algorithms into bloom! 🌱",
    "Did you know? Even giant search trees start with a single root! 🌳",
    "Take your time, enjoy the garden, and let's bloom together! 🌼",
  ];

  // Web Audio Synthesizer for gentle botanical chimes (completely offline, zero dependencies)
  const playBotanicalChime = (type: 'step' | 'bloom' | 'chirp' = 'step') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';

      if (type === 'step') {
        const notes = [523.25, 587.33, 659.25, 783.99, 880.0];
        const freq = notes[characterWaypointIdx % notes.length];
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + 0.15);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'chirp') {
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
        osc.frequency.setValueAtTime(1046, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(1568, now + 0.2);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(f, now + idx * 0.07);
          g.gain.setValueAtTime(0.05, now + idx * 0.07);
          g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.45);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(now + idx * 0.07);
          o.stop(now + idx * 0.07 + 0.45);
        });
      }
    } catch {
      // Audio might be restricted until user gesture
    }
  };

  const handleWaypointClick = (wp: WaypointData, index: number) => {
    playBotanicalChime(index <= activeWaypointIndex ? 'bloom' : 'step');
    setIsWalking(true);
    setCharacterWaypointIdx(index);
    setTimeout(() => setIsWalking(false), 850);

    if (onExpandLevel) onExpandLevel(wp.level);

    const lvl = CURRICULUM_LEVELS[wp.level];
    const firstTopic = lvl?.topics.find((t) => t.algorithmId) || lvl?.topics[0];
    const lessonId = firstTopic?.algorithmId || levelDefaultLessons[wp.level] || 'what-is-an-algorithm';
    onSelectLesson(lessonId);
  };

  const handleSproutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBotanicalChime('chirp');
    setSproutMessageIdx((prev) => (prev + 1) % SPROUT_MESSAGES.length);
    setSproutGreetingOpen(true);
    setTimeout(() => setSproutGreetingOpen(false), 4500);
  };

  const handleResetToActiveRank = () => {
    setIsWalking(true);
    setCharacterWaypointIdx(activeWaypointIndex);
    playBotanicalChime('step');
    setTimeout(() => setIsWalking(false), 850);
  };

  return (
    <div className="space-y-3">
      {/* MAP CANVAS CONTAINER */}
      <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#D8E6BE] dark:border-[#2E3A32] shadow-garden bg-[#FAF3E3] select-none group">
        {/* Clean Healed Watercolor Garden Path Background (857x467) */}
        <img
          src="/sprout-garden-path-clean.jpg"
          alt="AlgoBloom Watercolor Garden Trail"
          className="w-full h-auto block select-none pointer-events-none"
          onError={(e) => {
            // Fallback to original image if clean file is not found
            (e.target as HTMLImageElement).src = '/sprout-garden-path.jpg';
          }}
        />

        {/* TOP CONTROLS TOOLBAR */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 backdrop-blur-md border border-[#D8E6BE] dark:border-[#2E3A32] shadow-sm text-xs">
          {/* Snap Back to Current Rank Button */}
          {characterWaypointIdx !== activeWaypointIndex && (
            <button
              onClick={handleResetToActiveRank}
              title="Return Sprout to Current Rank"
              className="px-2.5 py-1.5 rounded-xl bg-sagegreen text-white font-semibold text-xs flex items-center gap-1 shadow-sm hover:bg-sagegreen-600 transition-all animate-bounce"
            >
              <Footprints size={13} />
              <span>Snap to Rank</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playBotanicalChime('chirp');
            }}
            title={soundEnabled ? 'Mute Garden Chimes' : 'Enable Garden Chimes'}
            className={`p-2 rounded-xl transition-all ${
              soundEnabled
                ? 'bg-sagegreen text-white shadow-sm'
                : 'text-garden-secondary hover:text-garden-text hover:bg-garden-bg/50'
            }`}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Animation Toggle */}
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            title={animationsEnabled ? 'Pause Subtle Animations' : 'Resume Subtle Animations'}
            className={`p-2 rounded-xl transition-all ${
              animationsEnabled
                ? 'bg-buttercream text-amber-950 font-semibold'
                : 'text-garden-secondary hover:text-garden-text'
            }`}
          >
            <Sparkles size={15} className={animationsEnabled ? 'animate-spin' : ''} style={{ animationDuration: '6s' }} />
          </button>
        </div>

        {/* PRECISION INTERACTIVE SVG OVERLAY LAYER (857x467) */}
        <svg
          viewBox="0 0 857 467"
          className="absolute inset-0 w-full h-full pointer-events-auto"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Living Path Gradient */}
            <linearGradient id="livingTrailGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F1B4B1" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFE0AF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C6A8CE" stopOpacity="0.8" />
            </linearGradient>

            {/* Pond Water Shimmer Gradient */}
            <linearGradient id="waterShimmerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#9BD1E8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
            </linearGradient>

            {/* Soft Shadow Filter */}
            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. LIVING POND WATER RIPPLES */}
          {animationsEnabled && (
            <g className="pointer-events-none opacity-80">
              <ellipse cx="205" cy="325" rx="38" ry="18" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5">
                <animate attributeName="rx" values="15; 48; 65" dur="4.2s" repeatCount="indefinite" />
                <animate attributeName="ry" values="7; 22; 30" dur="4.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7; 0.35; 0" dur="4.2s" repeatCount="indefinite" />
              </ellipse>

              <ellipse cx="145" cy="335" rx="28" ry="14" fill="none" stroke="#E2F2F9" strokeWidth="1.2" opacity="0.4">
                <animate attributeName="rx" values="10; 36; 52" dur="5s" begin="1.5s" repeatCount="indefinite" />
                <animate attributeName="ry" values="5; 16; 24" dur="5s" begin="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6; 0.25; 0" dur="5s" begin="1.5s" repeatCount="indefinite" />
              </ellipse>

              <ellipse cx="265" cy="328" rx="24" ry="11" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.4">
                <animate attributeName="rx" values="8; 32; 46" dur="4.6s" begin="2.4s" repeatCount="indefinite" />
                <animate attributeName="ry" values="4; 14; 20" dur="4.6s" begin="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6; 0.3; 0" dur="4.6s" begin="2.4s" repeatCount="indefinite" />
              </ellipse>

              <ellipse cx="215" cy="322" rx="60" ry="24" fill="url(#waterShimmerGradient)" opacity="0.35">
                <animate attributeName="opacity" values="0.25; 0.55; 0.25" dur="3s" repeatCount="indefinite" />
              </ellipse>
            </g>
          )}

          {/* 2. WIND-BLOWN DRIFTING PETALS */}
          {animationsEnabled && (
            <g className="pointer-events-none">
              <g transform="translate(560, 240)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="490,210; 680,270; 780,310"
                  dur="7.5s"
                  repeatCount="indefinite"
                />
                <path d="M0,0 C3,-5 9,-4 8,2 C7,6 2,7 0,0 Z" fill="#F1B4B1" opacity="0.85">
                  <animateTransform attributeName="transform" type="rotate" values="0; 180; 360" dur="4s" repeatCount="indefinite" />
                </path>
              </g>

              <g transform="translate(530, 260)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="460,230; 640,290; 760,330"
                  dur="9s"
                  begin="2s"
                  repeatCount="indefinite"
                />
                <path d="M0,0 C4,-6 10,-3 9,3 C8,8 3,7 0,0 Z" fill="#FFE0AF" opacity="0.8">
                  <animateTransform attributeName="transform" type="rotate" values="0; -240; -360" dur="5s" repeatCount="indefinite" />
                </path>
              </g>

              <g transform="translate(590, 280)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="520,240; 700,305; 810,345"
                  dur="8.2s"
                  begin="4s"
                  repeatCount="indefinite"
                />
                <path d="M0,0 C3,-4 8,-2 7,3 C6,6 2,6 0,0 Z" fill="#C6A8CE" opacity="0.85">
                  <animateTransform attributeName="transform" type="rotate" values="0; 220; 360" dur="6s" repeatCount="indefinite" />
                </path>
              </g>
            </g>
          )}

          {/* 3. 15 INTERACTIVE STEPPING STONES */}
          {PATH_WAYPOINTS.map((wp, i) => {
            const isPassed = i < activeWaypointIndex;
            const isCurrentRank = i === activeWaypointIndex;
            const isCharacterHere = i === characterWaypointIdx;
            const isHovered = hoveredWaypoint === i;

            return (
              <g
                key={`wp-${i}`}
                className="cursor-pointer"
                onClick={() => handleWaypointClick(wp, i)}
                onMouseEnter={() => setHoveredWaypoint(i)}
                onMouseLeave={() => setHoveredWaypoint(null)}
              >
                {/* Generous, Invisible Stationary Hit Target (Eliminates all hover flicker & hit-test oscillations) */}
                <circle
                  cx={wp.x}
                  cy={wp.y}
                  r="20"
                  fill="transparent"
                  className="cursor-pointer"
                />

                {/* Active Rank Pulse Aura under the stone */}
                {isCurrentRank && animationsEnabled && !isCharacterHere && (
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r="15"
                    fill="#F9A49E"
                    opacity="0.38"
                    className="animate-ping pointer-events-none"
                    style={{ animationDuration: '2.8s' }}
                  />
                )}

                {/* Stepping Stone Disc: when Sprout is here, show a soft blooming ground ring so Sprout stands cleanly without disc clutter */}
                {isCharacterHere ? (
                  animationsEnabled && (
                    <circle
                      cx={wp.x}
                      cy={wp.y}
                      r="12"
                      fill="none"
                      stroke="#8ABF44"
                      strokeWidth="1.6"
                      strokeDasharray="3, 3"
                      opacity="0.75"
                      className="pointer-events-none animate-spin"
                      style={{ animationDuration: '12s' }}
                    />
                  )
                ) : (
                  <>
                    <circle
                      cx={wp.x}
                      cy={wp.y}
                      r={isHovered ? 8.5 : 6.8}
                      fill={
                        isCurrentRank
                          ? '#F9A49E'
                          : isPassed
                          ? '#FFAAA6'
                          : isHovered
                          ? '#FFEECB'
                          : '#FAF6E8'
                      }
                      stroke={
                        isCurrentRank
                          ? '#DC6C66'
                          : isPassed
                          ? '#E2867F'
                          : isHovered
                          ? '#74A250'
                          : '#D1C6AC'
                      }
                      strokeWidth={isHovered ? '2' : '1.5'}
                      className="transition-all duration-200 drop-shadow-sm pointer-events-none"
                    />

                    {/* Bloomed Flower Core on Passed Stones */}
                    {isPassed && (
                      <g transform={`translate(${wp.x}, ${wp.y})`} className="pointer-events-none">
                        <circle cx="0" cy="0" r="2.5" fill="#FFE39A" />
                        <circle cx="-3" cy="0" r="1" fill="#FFFFFF" opacity="0.9" />
                        <circle cx="3" cy="0" r="1" fill="#FFFFFF" opacity="0.9" />
                        <circle cx="0" cy="-3" r="1" fill="#FFFFFF" opacity="0.9" />
                        <circle cx="0" cy="3" r="1" fill="#FFFFFF" opacity="0.9" />
                      </g>
                    )}
                  </>
                )}
              </g>
            );
          })}

          {/* 5. DEDICATED HOVER PREVIEW CARD LAYER (Clamped inside map viewport, safe SVG fade, zero top-left jump) */}
          {(() => {
            if (hoveredWaypoint === null || hoveredWaypoint === characterWaypointIdx) return null;
            const wp = PATH_WAYPOINTS[hoveredWaypoint];
            if (!wp) return null;

            // Clamping so card is NEVER cut off at top, left, right, or bottom
            const cardX = Math.max(92, Math.min(765, wp.x));
            const isNearTop = wp.y < 115;
            const cardY = isNearTop ? wp.y + 38 : wp.y - 46;
            const arrowDx = wp.x - cardX;

            return (
              <g
                transform={`translate(${cardX}, ${cardY})`}
                className="pointer-events-none z-50 animate-svgFadeIn"
              >
                <rect
                  x="-85"
                  y="-22"
                  width="170"
                  height="44"
                  rx="14"
                  fill="#FFFFFF"
                  stroke="#74A250"
                  strokeWidth="1.8"
                  filter="drop-shadow(0 4px 10px rgba(0,0,0,0.22))"
                />
                <polygon
                  points={
                    isNearTop
                      ? `${arrowDx - 6},-22 ${arrowDx + 6},-22 ${arrowDx},-27`
                      : `${arrowDx - 6},22 ${arrowDx + 6},22 ${arrowDx},27`
                  }
                  fill="#FFFFFF"
                  stroke="#74A250"
                  strokeWidth="1"
                />
                <text x="-74" y="-7" fill="#74A250" fontSize="8" fontWeight="800" fontFamily="Inter, sans-serif">
                  DESTINATION #{wp.level}
                </text>
                <text x="-74" y="6" fill="#2E3C27" fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif">
                  {wp.name}
                </text>
                <text x="-74" y="16" fill="#6C8267" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif">
                  {wp.subtitle || 'Click to walk here →'}
                </text>
              </g>
            );
          })()}

          {/* 5. THE LIVING ANIMATED SPROUT CHARACTER AT CURRENT RANK / WAYPOINT */}
          <g
            transform={`translate(${currentSproutPos.x}, ${currentSproutPos.y})`}
            className="cursor-pointer group/sprout"
            style={{
              transition: 'transform 0.8s cubic-bezier(0.34, 1.3, 0.64, 1)',
            }}
            onClick={handleSproutClick}
          >
            {/* Ground Contact Shadow under Sprout's Feet */}
            <ellipse
              cx="0"
              cy="2"
              rx={isWalking ? 12 : 16}
              ry={isWalking ? 4 : 5.5}
              fill="#374E32"
              opacity="0.28"
              filter="url(#softGlow)"
              className="transition-all duration-300"
            />

            {/* HANDCRAFTED CRISP VECTOR SPROUT AVATAR */}
            <SproutAvatar isWalking={isWalking} animationsEnabled={animationsEnabled} scale={0.92} />

            {/* Walking Footstep Pollen / Glow Dust */}
            {animationsEnabled && (
              <g className="pointer-events-none">
                <circle cx="8" cy="-2" r="1.5" fill="#FFE39A" opacity="0.8">
                  <animate attributeName="cy" values="-2; -14" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8; 0" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="r" values="1.5; 0.4" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle cx="-9" cy="-3" r="1.5" fill="#F1B4B1" opacity="0.8">
                  <animate attributeName="cy" values="-3; -15" dur="1.9s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8; 0" dur="1.9s" begin="0.8s" repeatCount="indefinite" />
                  <animate attributeName="r" values="1.5; 0.4" dur="1.9s" begin="0.8s" repeatCount="indefinite" />
                </circle>
              </g>
            )}

            {/* FLOATING "YOU ARE HERE! 🌱" SPROUT BADGE (Above Head) */}
            <g
              transform="translate(0, -90)"
              className="pointer-events-none"
            >
              <rect
                x="-52"
                y="-13"
                width="104"
                height="24"
                rx="12"
                fill="#FFFFFF"
                stroke="#74A250"
                strokeWidth="2"
                filter="drop-shadow(0 3px 6px rgba(0,0,0,0.18))"
              />
              <polygon points="-5,11 5,11 0,16" fill="#FFFFFF" stroke="#74A250" strokeWidth="1" />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="800"
                fill="#2E3C27"
                fontFamily="Inter, sans-serif"
              >
                {characterWaypointIdx === activeWaypointIndex ? 'You are here! 🌱' : 'Exploring 🌿'}
              </text>
            </g>

            {/* INTERACTIVE SPROUT SPEECH BUBBLE (On Click) */}
            {sproutGreetingOpen && (
              <g transform="translate(0, -130)" className="animate-svgFadeIn pointer-events-none">
                <rect
                  x="-125"
                  y="-18"
                  width="250"
                  height="36"
                  rx="14"
                  fill="#FFFFFF"
                  stroke="#74A250"
                  strokeWidth="2"
                  filter="drop-shadow(0 6px 14px rgba(0,0,0,0.22))"
                />
                <polygon points="-6,18 6,18 0,24" fill="#FFFFFF" stroke="#74A250" strokeWidth="1" />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#2E3C27"
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  {SPROUT_MESSAGES[sproutMessageIdx]}
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* DYNAMIC PROGRESS CAPTION HUD */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2 text-xs text-garden-secondary">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#74A250] dark:text-[#95CE64] flex items-center gap-1">
            <span>🌱</span> Current Step:
          </span>
          <span className="font-semibold text-garden-text dark:text-garden-darktext">
            Destination #{currentSproutPos.level} — {activeLevelData?.title || currentSproutPos.name}
          </span>
        </div>

        <div className="flex items-center gap-3 font-medium">
          <span>
            Step {characterWaypointIdx + 1} of {PATH_WAYPOINTS.length} on the Garden Trail
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#EBF6D9] text-[#55822F] font-bold border border-[#CFE4A8]">
            {Math.round(((characterWaypointIdx + 1) / PATH_WAYPOINTS.length) * 100)}% Explored
          </span>
        </div>
      </div>
    </div>
  );
};
