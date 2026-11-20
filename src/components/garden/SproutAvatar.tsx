import React from 'react';

interface SproutAvatarProps {
  isWalking?: boolean;
  animationsEnabled?: boolean;
  scale?: number;
}

export const SproutAvatar: React.FC<SproutAvatarProps> = ({
  isWalking = false,
  animationsEnabled = true,
  scale = 1,
}) => {
  return (
    <g
      className={`select-none ${
        animationsEnabled
          ? isWalking
            ? 'animate-bounce'
            : 'animate-float'
          : ''
      }`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      <defs>
        {/* Head Gradient (Soft watercolor lighting: light lime at top-left to sage at base) */}
        <radialGradient id="sproutHeadGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#E5F4A8" />
          <stop offset="45%" stopColor="#C6E374" />
          <stop offset="85%" stopColor="#A8CC56" />
          <stop offset="100%" stopColor="#92B344" />
        </radialGradient>

        {/* Overalls Gradient (Forest Green) */}
        <linearGradient id="sproutOverallsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#679140" />
          <stop offset="100%" stopColor="#486D2B" />
        </linearGradient>

        {/* Left Leaf Gradient */}
        <linearGradient id="sproutLeafGradL" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#5E8C34" />
          <stop offset="100%" stopColor="#87BE49" />
        </linearGradient>

        {/* Right Leaf Gradient */}
        <linearGradient id="sproutLeafGradR" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#6C9B3C" />
          <stop offset="100%" stopColor="#9BD455" />
        </linearGradient>

        {/* Pearl Stepping Stone Gradient */}
        <radialGradient id="pearlStoneGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#FAF6EB" />
          <stop offset="100%" stopColor="#E2D9C2" />
        </radialGradient>

        {/* Soft Drop Shadow for Sprout */}
        <filter id="sproutSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
          <feOffset dx="0" dy="1.5" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* SPROUT CHARACTER BODY CONTAINER */}
      <g filter="url(#sproutSoftShadow)">
        {/* 1. FEET & LEGS (Positioned at bottom y: -6 to 0) */}
        <g id="sprout-legs">
          {/* Left Foot (Back leg) */}
          <ellipse
            cx="-7"
            cy="-3"
            rx="5.5"
            ry="3.8"
            fill="#4F7530"
            stroke="#385421"
            strokeWidth="1.2"
            transform={isWalking ? 'rotate(-15 -7 -3)' : 'rotate(0)'}
            className="transition-transform duration-300"
          />

          {/* Right Foot (Front leg taking step forward) */}
          <ellipse
            cx="7"
            cy="-2"
            rx="6"
            ry="4"
            fill="#5A8437"
            stroke="#385421"
            strokeWidth="1.2"
            transform={isWalking ? 'rotate(18 7 -2)' : 'rotate(8 7 -2)'}
            className="transition-transform duration-300"
          />
        </g>

        {/* 2. BODY & GARDENER OVERALLS (y: -22 to -6) */}
        <g id="sprout-body">
          {/* Overalls Torso */}
          <path
            d="M -11,-20 C -12,-14 -11,-7 -8,-6 C -4,-5 4,-5 8,-6 C 11,-7 12,-14 11,-20 C 8,-23 -8,-23 -11,-20 Z"
            fill="url(#sproutOverallsGrad)"
            stroke="#385421"
            strokeWidth="1.4"
          />

          {/* Overalls Straps */}
          <line x1="-7" y1="-22" x2="-6" y2="-15" stroke="#3D5E24" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="7" y1="-22" x2="6" y2="-15" stroke="#3D5E24" strokeWidth="2.2" strokeLinecap="round" />

          {/* Overalls Brass/Wood Buttons */}
          <circle cx="-6" cy="-15" r="1.2" fill="#E6D3A3" stroke="#8A6E32" strokeWidth="0.6" />
          <circle cx="6" cy="-15" r="1.2" fill="#E6D3A3" stroke="#8A6E32" strokeWidth="0.6" />
        </g>

        {/* 3. ARMS & HELD PEARL STONE */}
        <g id="sprout-arms">
          {/* Right Arm (Back) */}
          <path
            d="M 10,-20 C 13,-17 14,-13 11,-10 C 9,-11 8,-15 10,-20 Z"
            fill="#A8CC56"
            stroke="#385421"
            strokeWidth="1.2"
          />

          {/* Held Glowing Stepping Stone Disc (Pearl in hand) */}
          <circle
            cx="-7"
            cy="-11"
            r="5.5"
            fill="url(#pearlStoneGrad)"
            stroke="#C4B89F"
            strokeWidth="1.2"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))"
          />

          {/* Left Arm (Holding the stone) */}
          <path
            d="M -9,-20 C -14,-17 -13,-11 -9,-9 C -7,-11 -8,-15 -9,-20 Z"
            fill="#B5D66F"
            stroke="#385421"
            strokeWidth="1.2"
          />
        </g>

        {/* 4. CHIBI ROUND HEAD (Center at y: -38, radius: 19) */}
        <g id="sprout-head">
          {/* Main Round Head Sphere */}
          <circle
            cx="0"
            cy="-38"
            r="19"
            fill="url(#sproutHeadGrad)"
            stroke="#385421"
            strokeWidth="1.6"
          />

          {/* Cute Rosy Pink Blush Cheeks */}
          <ellipse cx="-11.5" cy="-33" rx="3.5" ry="2.2" fill="#F7A09C" opacity="0.68" />
          <ellipse cx="11.5" cy="-33" rx="3.5" ry="2.2" fill="#F7A09C" opacity="0.68" />

          {/* Left Eye (Shiny Chibi Oval Eye) */}
          <ellipse cx="-7.5" cy="-37" rx="2.2" ry="3.2" fill="#24331A" />
          {/* Left Eye Sparkle Catchlight */}
          <circle cx="-6.8" cy="-38.2" r="0.9" fill="#FFFFFF" />
          {animationsEnabled && (
            <circle cx="-6.8" cy="-38.2" r="1.1" fill="#FFFFFF" opacity="0.9">
              <animate attributeName="opacity" values="0.95; 0.95; 0; 0.95" keyTimes="0; 0.88; 0.92; 1" dur="4.2s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Right Eye (Shiny Chibi Oval Eye) */}
          <ellipse cx="7.5" cy="-37" rx="2.2" ry="3.2" fill="#24331A" />
          {/* Right Eye Sparkle Catchlight */}
          <circle cx="8.2" cy="-38.2" r="0.9" fill="#FFFFFF" />
          {animationsEnabled && (
            <circle cx="8.2" cy="-38.2" r="1.1" fill="#FFFFFF" opacity="0.9">
              <animate attributeName="opacity" values="0.95; 0.95; 0; 0.95" keyTimes="0; 0.88; 0.92; 1" dur="4.2s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Sweet Chibi Smile */}
          <path
            d="M -3.2,-31 C -1.5,-29 1.5,-29 3.2,-31"
            fill="none"
            stroke="#2E4221"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* 5. SPROUT HEAD LEAVES WITH NATURAL BREEZE SWAY */}
        <g
          id="sprout-head-leaves"
          transform="translate(0, -57)"
          className={animationsEnabled ? 'origin-bottom' : ''}
          style={{ transformOrigin: '0px 0px' }}
        >
          {/* Tiny stem base */}
          <line x1="0" y1="0" x2="0" y2="-4" stroke="#385421" strokeWidth="2.5" strokeLinecap="round" />

          {/* Left Leaf */}
          <g>
            {animationsEnabled && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="-5 0 -4; 6 0 -4; -5 0 -4"
                dur="3.2s"
                repeatCount="indefinite"
              />
            )}
            <path
              d="M 0,-4 C -8,-10 -15,-18 -4,-26 C 2,-20 2,-11 0,-4 Z"
              fill="url(#sproutLeafGradL)"
              stroke="#385421"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Left Leaf Center Vein */}
            <path
              d="M -1,-5 C -4,-12 -6,-17 -3,-22"
              fill="none"
              stroke="#9AD357"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </g>

          {/* Right Leaf (Taller, graceful arch) */}
          <g>
            {animationsEnabled && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="6 0 -4; -6 0 -4; 6 0 -4"
                dur="3.6s"
                repeatCount="indefinite"
              />
            )}
            <path
              d="M 0,-4 C 9,-10 16,-19 7,-28 C 0,-21 0,-11 0,-4 Z"
              fill="url(#sproutLeafGradR)"
              stroke="#385421"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Right Leaf Center Vein */}
            <path
              d="M 1,-5 C 5,-12 7,-18 5,-24"
              fill="none"
              stroke="#B3E672"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </g>
  );
};
