# 🌸 AlgoBloom Development TODO & Visualization Roadmap

This file tracks all ongoing, planned, and completed tasks for AlgoBloom. Agents and contributors must update this file when starting, finishing, or modifying tasks.

---

## 📌 Master Visualization & Experience Tasks

- [x] **Task 1: Interactive Living Garden Trail Map (Completed & Polished)**
  - *Assigned:* Lead Agent
  - *Completed Date:* 2026-11-20
  - *Implementation Details:*
    - Created `LivingGardenPathMap.tsx` and integrated into `LearningPathPage.tsx`.
    - Handcrafted pure vector SVG `SproutAvatar.tsx` (infinitely sharp, anime catchlight eyes, watercolor gradient shading, gardener overalls, brass buttons, held pearl stone, and breeze-swaying leaves).
    - [x] Executed texture synthesis healing on the background map (`public/sprout-garden-path-clean.jpg` and `dist/sprout-garden-path-clean.jpg`) — 100% eliminated the pink/salmon smudge (0 residual pink pixels in former head/body area) with pristine preservation of surrounding trees and meadow.
    - [x] Replaced artificial blurred/patchy stamps on the right side with an organic watercolor hill wash that continues naturally across the top right, paired with alpha-matted watercolor companion trees and lower meadow shrubs with zero box halos.
    - [x] Calibrated all 15 milestone waypoint coordinates (WP 0 through WP 14) so every single milestone lies 100% centered on the genuine cobblestone trail.
    - [x] Removed artificial neon dashed path wire that was cutting across grass and flower petals, letting the authentic hand-painted watercolor cobblestones shine cleanly.
    - [x] Refined milestone stepping stone aesthetics: eliminated the awkward disc directly under Sprout's feet (Sprout now stands cleanly on a gentle rotating bloom ring), and gave all stones a soft watercolor pearl look with flower blossom cores on completed steps.
    - [x] Fixed top-left popup bug: replaced transform-colliding CSS animation with safe `animate-svgFadeIn` and added boundary-aware viewport clamping so tooltips never clip off-screen.
    - [x] Eliminated hover flickering with stationary, generous `r=20` invisible hit targets.
    - [x] Sprout character is fully dynamic and positioned directly at the learner's active rank / milestone.
    - [x] Smooth walking animation (`transition: transform 0.8s cubic-bezier(0.34, 1.3, 0.64, 1)`) along the 15 trail stepping stones when current rank changes or when clicking any destination.
    - [x] Idle breathing bounce + stepping foot hop + dynamic ground contact shadow.
    - [x] Floating "You are here! 🌱" speech bubble directly above Sprout's head.
    - [x] Interactive Sprout dialogue on click with cheerful encouraging tips and Web Audio chime chirps.
    - [x] "Snap to Rank" button in the toolbar when exploring other waypoints.
    - [x] Living pond water ripples and drifting wind-blown watercolor petals.

- [x] **Task 9: Interactive App-Style Guided Demo & Walkthrough System (Completed)**
  - *Assigned:* Lead UI/UX & Pedagogy Engineer
  - *Completed Date:* 2026-11-23
  - *Implementation Details:*
    - Created `src/components/playground/PlaygroundTourModal.tsx` and `src/components/playground/playgroundDemoData.ts`.
    - **App-Style Spotlight & Anchored Walkthrough:**
      - Darkened backdrop overlay with dynamic SVG cutout and glowing rose focus ring (`ring-4 ring-dustyrose-400` + box shadow) centered directly on the active target element.
      - Smooth auto-scrolls target elements into viewport center if offscreen.
      - 6 interactive guided steps:
        1. *Lab Mode Switcher* (`#tour-lab-tabs`): Explaining all 5 computer science sandboxes (Sorting, Graph, Tree, Search, DP).
        2. *Algorithm Spotlight & Intuitive Mechanics* (`#tour-algo-select`): Deep explanation tailored to every single algorithm (real-world metaphors, step mechanics, Big-O complexities, and in-tour algorithm switcher).
        3. *Presets, Inputs & Parameters* (`#tour-input-controls`): Explaining Random, Nearly Sorted, Reversed, and custom value inputs.
        4. *Step-by-Step Playback Engine* (`#tour-playback-controls`): Explaining Step Back, Play/Pause, Step Forward, and Reset buttons, plus a **"▶ Run Live Mini-Demo"** button that runs 4 steps live on screen.
        5. *Step Commentary & Metrics* (`#tour-step-narration`): Highlighting real-time operation counters, plain-English narrations, and Web Audio acoustic chimes.
        6. *The Living Visualizer Stage* (`#tour-visualizer`): Reading the physical animation (FLIP swap arcs, node dragging, DP tables, and color meanings).
    - **Covers All Algorithms Across All 5 Labs:**
      - Sorting: Bubble, Selection, Insertion, Merge, Quick Sort.
      - Searching: Binary Search, Linear Search.
      - Graphs: BFS, DFS, Dijkstra's Shortest Path.
      - Trees: BST Search, Inorder, Preorder, Postorder Traversals.
      - Dynamic Programming: Fibonacci numbers, Coin Change minimum coins.
    - **Mobile & Desktop Controls:**
      - Step indicator dots, Previous / Next navigation, Skip / Close button (`✕`), and keyboard shortcuts (`Esc` to close, `ArrowRight`/`ArrowLeft` to navigate).
      - Prominent **"✨ Interactive Demo & Tour"** button in playground header with pulsing badge, plus direct `(?)` help triggers on the algorithm selector.
    - Clean production build (`npm run build`) passing with 0 TypeScript/JSX errors.

- [ ] **Task 2: Synchronized Code-Line Execution Stepper (Planned)**
  - *Description:* Dual-view synchronizer highlighting the exact line of code (Python/JS) as each algorithm trace step advances in LessonDetailPage.

- [ ] **Task 3: Botanical "Garden Meadow" Floral View (Planned)**
  - *Description:* Thematic mode toggle for ArrayBarVisualizer where array values render as growing flower stems and blossoms.

- [x] **Task 4: Acoustic Sonification via Web Audio API (Completed)**
  - *Assigned:* Audio & Acoustics Systems Engineer
  - *Completed Date:* 2026-11-20
  - *Implementation Details:*
    - Created `src/services/soundService.ts`:
      - 100% pure Web Audio API synthesis without external audio files, samples, or network mp3 dependencies.
      - Acoustic physical modeling: Kalimba and Marimba wooden bar acoustics using fundamental sine/triangle oscillators, harmonic overtone nodes (2.76x / 3.0x harmonic ratios), fast mallet transient click attacks (~0.008s), and smooth exponential gain decay (~0.22s–0.28s).
      - Scale mapping: Harmonics strictly mapped to a consonant 16-note C Major / A Minor Pentatonic scale across 3+ octaves (C4 to C7), completely preventing any harsh dissonances.
      - Implemented methods: `playComparison(valA, valB, maxVal)`, `playSwap(valA, valB, maxVal)`, `playSortedChime(index, total)`, `playVictoryArpeggio()`, `playBubblePop()`, `playChirp()`, and flexible `playTone()`.
      - Autoplay compliance: Lazy context initialization with auto-resumption on browser user gestures (`click`, `keydown`, `touchstart`, `pointerdown`).
      - Full synchronization with `progressService` settings (`soundEnabled`) and master volume controls.
    - Integrated with `ArrayBarVisualizer.tsx`:
      - Added interactive acoustic sound toggle button in the header bar with `Volume2` / `VolumeX` icons and live status.
    - Integrated with `LessonDetailPage.tsx`:
      - Reactive sonification hook: plays comparison chimes during element comparisons, rich wooden tactile notes on swaps, crystalline ascending chimes on newly sorted indices, and cascading victory arpeggios on algorithm completion or 5/5 quiz completion.
      - Reset action acoustic feedback (`playBubblePop`).
      - Quick sound toggle button added to the playback controls toolbar.
    - Integrated with `PlaygroundPage.tsx`:
      - Step synchronization for interactive algorithm experimentation sandbox.
    - Verification: Zero TypeScript or Vite build errors (`npm run build` completed cleanly).

- [x] **Task 5: Smooth Physical Swap Animations (FLIP Physics) (Completed)**
  - *Assigned:* Animation Physics Engineer
  - *Completed Date:* 2026-11-20
  - *Implementation Details:*
    - **Physical Swap Animation Architecture:**
      - Created dedicated `src/visualizations/FlipArrayBar.tsx` and re-architected `src/visualizations/ArrayBarVisualizer.tsx`.
      - Implemented First-Last-Invert-Play (FLIP) physics engine measuring real-time DOM geometry using `getBoundingClientRect()` across slot containers (`slotRefs`) and motion bar containers (`barRefs`).
      - Invert calculation: `deltaA = rectB.left - rectA.left` and `deltaB = rectA.left - rectB.left` (measuring the exact physical screen distance between origin and destination slots).
      - Applied lively, organic spring easing curve: `cubic-bezier(0.34, 1.56, 0.64, 1)`.
      - Physical 3D Depth Layering & Arc Lift:
        - Foreground leaping bar lifts with `translateY(-12px)`, `scale(1.07)`, and `z-index: 40`.
        - Under-crossing bar arcs with `translateY(-5px)`, `scale(1.02)`, and `z-index: 30`.
        - Bars physically cross over each other without flat overlap or clipping.
      - Dynamic Visual Cues:
        - Elevated shadow glow rendered in Dusty Rose (`#F1B4B1` / `rgba(241, 180, 177, 0.75)`).
        - High-velocity motion blur (`filter: blur(0.35px)`) during mid-flight translation.
        - Ground contact shadow squash-and-stretch: shadow softens and contracts as bar lifts, settling back into crisp ground contact upon landing.
        - Dynamic SVG Swap Arc Bridge: bezier trajectory curve overlay rendered in Dusty Rose gradient with dashed path and glowing `⇄` interchange apex badge.
        - Status banner pill badge: `FLIP Swap: [i] ⇄ [j]` during active physical exchanges.
      - Web Animations API & Fallback:
        - Primary animation executed via Web Animations API with clean cancellation of prior step animations on rapid scrub/pause/step.
        - Automatic requestAnimationFrame CSS transition fallback for environments lacking Web Animations API.
    - **Speed & Responsiveness:**
      - Full responsiveness from 320px mobile screens to ultrawide desktop monitors; displacement scales with real viewport layout.
      - Respects playback speed settings (`slow`: 720ms, `normal`: 460ms, `fast`: 280ms) and dynamically scales to `speedMs` props across `LessonDetailPage`, `PlaygroundPage`, and `ComparePage`.
    - **Trace Enhancement:**
      - Added `swappedIndices` tracking to QuickSort pivot final swap in `src/algorithms/traces/sortTraces.ts`.
    - **Verification:**
      - 0 TypeScript errors (`tsc --noEmit`).
      - Full production build passes with 0 errors (`npm run build`).

- [x] **Task 6: "Predict the Next Step" Active Challenge Mode (Completed & Refined)**
  - *Assigned:* Interactive Pedagogy & Gamification Engineer
  - *Completed Date:* 2026-11-20
  - *Implementation Details:*
    - **Contextual Algorithmic Prediction Engine (`src/components/visualization/predictionEngine.ts`):**
      - Automatically detects critical algorithmic decision points across traces for sorting, searching, graphs, trees, and dynamic programming.
      - **Sorting Algorithms (Bubble, Selection, Insertion, Quick, Merge):**
        - Bubble Sort: Identifies adjacent element comparisons and prompts *"Will index i (valA) and index j (valB) swap?"* with explicit mathematical and pedagogical rationales.
        - Selection Sort: Evaluates candidate vs. current minimum and asks *"Will the minimum index update?"*.
        - Insertion Sort: Asks *"Will element shift right to make room for key?"*.
        - Quick Sort / Merge Sort: Evaluates partition comparisons and subarray merges.
      - **Searching (Binary Search & Linear Search):**
        - Binary Search: Pinpoints midpoint calculations and challenges *"Which half will be eliminated next?"* with options for Left Half `[low..mid]` eliminated, Right Half `[mid..high]` eliminated, or Target found at mid.
        - Linear Search: Prompts match verification against target.
      - **Graphs & Trees (BFS, DFS, Dijkstra, BST):**
        - BFS: Evaluates FIFO queue states and asks *"Which vertex will be dequeued from the queue next?"*.
        - DFS: Evaluates LIFO call stack states and prompts *"Which vertex will be popped from the stack next when backtracking?"*.
        - Dijkstra: Evaluates tentative distance tables and asks which unvisited vertex will be greedily selected next.
        - BST: Tests binary search tree branch invariants (Left subtree vs. Right subtree vs. Match).
      - **Dynamic Programming (Fibonacci):**
        - Prompts memoized recurrence combination `F(n) = F(n-1) + F(n-2)`.
    - **Botanical UI & Gamified Feedback Component (`src/components/visualization/PredictStepChallenge.tsx`):**
      - Handcrafted vector SVG AlgoBuddy mascot with 3 reactive expressions:
        - *Pondering:* Curious eyes looking upward, breathing leaves, wondering mouth.
        - *Joyful Celebration:* Cheerful `^ _ ^` anime eyes, blushing cheeks, blooming flower on head, celebratory bounce animation.
        - *Warm Encouragement:* Kind gentle smile and supportive flower petal for mistakes.
      - Sunset Garden styled choice cards utilizing Buttercream (`#FFE0AF`), Soft Mauve (`#C6A8CE`), Dusty Rose (`#F1B4B1`), and Sage Green (`#939F7F`).
      - Instant feedback with green glowing highlight, celebratory confetti pop (`canvas-confetti`), floating animated `+15 XP` badge, and automatic XP award via `ProgressService.getInstance().addXp(15)`.
      - Gentle, non-punitive instructional explanations for incorrect choices without penalizing user progress.
      - Prominent "Continue Step" button to resume trace progression.
    - **Lesson Detail Page Integration (`src/pages/LessonDetailPage.tsx`):**
      - "🔮 Predict Mode" toggle pill added directly to the visualization controls toolbar with active state glow (`shadow-garden-glow`).
      - Real-time session prediction stats: Tracks correct vs. total answers (`3/3 Correct (100%)`) and active streaks (`🔥 Streak`).
      - Automatic playback pause when entering an unanswered challenge step.
      - Anti-spoiler safeguard on execution description callout while a challenge is active.
      - Completed step badge banner when scrubbing backward/forward through previously solved steps.
    - **Verification:**
      - Clean production build (`npm run build`) passing with 0 TypeScript and JSX errors.

- [ ] **Task 7: Timeline Scrubber with Semantic Phase Markers (Planned)**
  - *Description:* Clickable timeline scrubber allowing learners to jump directly to key algorithm phases.

- [x] **Task 8: Draggable & Dynamic Graph/Tree Canvas Sandbox (Completed & Refined)**
  - *Assigned:* Canvas & Graph Physics Engineer
  - *Completed Date:* 2026-11-20
  - *Implementation Details:*
    - **Interactive Physics Canvas Sandbox (`GraphVisualizer.tsx` & `TreeVisualizer.tsx`):**
      - **Real-Time 60 FPS Node Dragging:**
        - Users can click and drag any vertex or tree node freely across the canvas via mouse or touch (`PointerEvents` with native pointer capture on `SVGSVGElement`).
        - Connecting dynamic SVG edges (in `GraphVisualizer`) and tree branch lines (in `TreeVisualizer`) update their endpoints in real time at 60 FPS without transition lag.
        - Graph edge midpoint weight badges recalculate coordinates continuously while dragging connecting vertices.
        - Drag displacement state is maintained in local component state (`nodePositions`), persisting user custom layouts throughout step playback and algorithm trace execution.
        - Clean drag vs. click thresholding (`Math.hypot(dx, dy) > 4px`): clean clicks trigger `onNodeClick(nodeId)` while drags seamlessly move nodes without spurious click events.
      - **Canvas Panning:**
        - Dragging on empty canvas space pans the entire graph/tree scene viewport with 1:1 physical screen-to-SVG cursor tracking via CTM inversion and scale factoring.
        - Invisible background layer ensures smooth drag capture across negative and positive SVG coordinate space.
      - **Smooth Zooming & Focal Point Tracking:**
        - Wheel zoom on canvas with non-passive event listening (`preventDefault()` preventing outer page scroll) and cursor focal-point centering so the point under the mouse remains invariant while zooming.
        - Floating canvas controls with explicit `+` (Zoom In) and `-` (Zoom Out) buttons, clamped smoothly between 0.5x and 2.5x.
        - Live zoom percentage indicator badge (`Math.round(zoom * 100)}%`).
      - **Reset View & Canonical Layouts:**
        - "Reset Layout 🔄" button in floating canvas toolbar instantly restores canonical node coordinates, resets pan offset to `(0, 0)`, and resets zoom scale to `1.0`.
      - **Botanical Aesthetic & Spring-Back Physics:**
        - Custom SVG filters: soft botanical drop-shadow (`#3B322C` with stdDeviation 3.5) and elevated lifted shadow (`stdDeviation 6` and `scale(1.08)`) when picked up or dragged.
        - Out-of-bounds spring-back: if a node is released beyond canvas bounds (`[minX, maxX]`, `[minY, maxY]`), an easing spring animation (`requestAnimationFrame` with cubic ease-out `1 - (1 - progress)^3`) smoothly snaps the node back within the garden boundaries.
        - Tactile cursor transitions (`cursor-grab` on hover, `cursor-grabbing` during active drag or pan).
        - Floating subtle hint pill: *"🌱 Drag nodes • Pan canvas • Scroll to zoom"*.
    - **Verification:**
      - 0 TypeScript / JSX errors verified via `npx tsc --noEmit`.
      - Full production build succeeds cleanly (`npm run build`).

---

## 📝 Change Log & Completed Milestones
*(Agents: Record completed milestones and dates below)*

- **2026-11-20:** Project TODO list initialized and Living Garden Path Map animation designed.
- **2026-11-20:** Task 4 (Acoustic Sonification via Web Audio API) completed with Kalimba/Marimba physical timbre modeling, Pentatonic scale mapping, autoplay compliance, visualizer & lesson detail integration.
- **2026-11-20:** Task 5 (Smooth Physical Swap Animations with FLIP Physics) completed with First-Last-Invert-Play spring kinematics, vertical arc lift depth layering, Dusty Rose elevated shadow glow, SVG swap arc bridge, and multi-speed responsiveness.
- **2026-11-20:** Task 6 ("Predict the Next Step" Active Challenge Mode) completed with decision point detection engine, Sunset Garden botanical choice card, AlgoBuddy reactive expressions, celebratory confetti & +15 XP rewards, non-punitive feedback, and streak/accuracy tracking.
- **2026-11-20:** Task 8 (Draggable & Dynamic Graph/Tree Canvas Sandbox) completed with 60 FPS real-time vertex/node dragging, dynamic SVG edge/branch tracking, 1:1 canvas panning, mousewheel focal-zoom + clamp floating toolbar, layout reset, botanical soft drop shadows, and cubic ease-out spring-back physics.
