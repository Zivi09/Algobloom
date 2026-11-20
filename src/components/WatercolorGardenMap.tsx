import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  CheckCircle2,
  Lock,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Flower2,
  BookOpen,
  MapPin,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { UserProgress } from '../types';

export interface GardenLandmark {
  id: string;
  name: string;
  region: 'nursery' | 'searching' | 'sorting' | 'complexity' | 'treehouse' | 'graphwood' | 'pond' | 'castle';
  regionName: string;
  algorithmId: string;
  lessonTitle: string;
  level: number;
  levelBadge: string;
  x: number; // SVG viewBox coordinate X (0-1400)
  y: number; // SVG viewBox coordinate Y (0-900)
  icon: string;
  flowerType: string;
  storybookLore: string;
  concepts: string[];
  complexity: string;
  xpReward: number;
}

export const GARDEN_LANDMARKS: GardenLandmark[] = [
  {
    id: 'nursery-gate',
    name: 'The Seedling Nursery Cottage',
    region: 'nursery',
    regionName: 'Seedling Nursery',
    algorithmId: 'what-is-an-algorithm',
    lessonTitle: 'What is an Algorithm?',
    level: 0,
    levelBadge: 'Foundations',
    x: 210,
    y: 720,
    icon: '🏡',
    flowerType: 'daisy',
    storybookLore:
      'Where every algorithmic journey takes root. In this sunlit cottage surrounded by terracotta seedling trays, aspiring gardeners learn that algorithms are step-by-step botanical recipes for bringing ideas into bloom.',
    concepts: ['Algorithmic Thinking', 'Step-by-step Logic', 'Inputs & Outputs', 'Determinism'],
    complexity: 'O(1) Concept',
    xpReward: 50,
  },
  {
    id: 'nursery-beds',
    name: 'Potted Arrays & Seed Trays',
    region: 'nursery',
    regionName: 'Seedling Nursery',
    algorithmId: 'what-is-an-algorithm',
    lessonTitle: 'Basic Data Structures',
    level: 1,
    levelBadge: 'Data Structures',
    x: 320,
    y: 760,
    icon: '🪴',
    flowerType: 'daisy',
    storybookLore:
      'Neatly arranged flowerbed trenches and stacked seedling trays. Like data in computer memory, each pot has its own numbered address and slot.',
    concepts: ['Array Indexing', 'Continuous Memory', 'Stacks & Queues', 'Hash Pots'],
    complexity: 'O(1) Access',
    xpReward: 60,
  },
  {
    id: 'brook-linear',
    name: 'The Stepping Stone Brook',
    region: 'searching',
    regionName: 'Searching Brook',
    algorithmId: 'linear-search',
    lessonTitle: 'Linear Search',
    level: 2,
    levelBadge: 'Searching',
    x: 450,
    y: 690,
    icon: '🌊',
    flowerType: 'daisy',
    storybookLore:
      'A winding crystal brook lined with smooth river pebbles. A seeker inspects each stone one after another from the water’s edge until the target is found.',
    concepts: ['Sequential Traversal', 'Unsorted Data', 'Target Match', 'Worst Case Scenarios'],
    complexity: 'O(n) Linear',
    xpReward: 50,
  },
  {
    id: 'terrace-binary',
    name: 'Binary Search Stone Terraces',
    region: 'searching',
    regionName: 'Searching Brook',
    algorithmId: 'binary-search',
    lessonTitle: 'Binary Search',
    level: 2,
    levelBadge: 'Searching',
    x: 550,
    y: 610,
    icon: '🪜',
    flowerType: 'cherry-blossom',
    storybookLore:
      'Ascending terraces carved into the hill. By leaping straight to the middle stone, wise gardeners eliminate half the remaining landscape with every breath.',
    concepts: ['Divide and Conquer', 'Sorted Arrays', 'Midpoint Calculation', 'Logarithmic Growth'],
    complexity: 'O(log n) Logarithmic',
    xpReward: 75,
  },
  {
    id: 'complexity-sundial',
    name: 'Hilltop Complexity Sundial',
    region: 'complexity',
    regionName: 'Complexity Knoll',
    algorithmId: 'big-o',
    lessonTitle: 'Time & Space Complexity',
    level: 4,
    levelBadge: 'Analysis',
    x: 160,
    y: 440,
    icon: '☀️',
    flowerType: 'sunflower',
    storybookLore:
      'High on the grassy knoll stands an antique stone sundial. Its carved spirals chart how growth unfolds—from constant breezes to exponential storms—as data gardens expand.',
    concepts: ['Big O Notation', 'Input Scaling (N)', 'Worst vs Average Case', 'Auxiliary Space'],
    complexity: 'O(1) to O(N!)',
    xpReward: 70,
  },
  {
    id: 'bubble-meadow',
    name: 'Bubble Sort Blossom Rows',
    region: 'sorting',
    regionName: 'Sorting Meadows',
    algorithmId: 'bubble-sort',
    lessonTitle: 'Bubble Sort',
    level: 3,
    levelBadge: 'Sorting',
    x: 680,
    y: 520,
    icon: '🫧',
    flowerType: 'tulip',
    storybookLore:
      'A radiant flowerbed where taller blossoms gently rise like bubbles, trading places with their neighbors until harmony is achieved across the entire row.',
    concepts: ['Adjacent Comparisons', 'Element Swapping', 'Inner & Outer Passes', 'Stable Sorting'],
    complexity: 'O(n²) Quadratic',
    xpReward: 60,
  },
  {
    id: 'insertion-cart',
    name: 'The Florist’s Wooden Cart',
    region: 'sorting',
    regionName: 'Sorting Meadows',
    algorithmId: 'insertion-sort',
    lessonTitle: 'Insertion Sort',
    level: 3,
    levelBadge: 'Sorting',
    x: 770,
    y: 550,
    icon: '🛒',
    flowerType: 'tulip',
    storybookLore:
      'A cozy hand-painted flower cart where newly harvested stems are slid one by one into their rightful spot among an already sorted bouquet.',
    concepts: ['Incremental Construction', 'Shift & Insert', 'Adaptive Efficiency', 'Small Data Sets'],
    complexity: 'O(n²) Worst / O(n) Best',
    xpReward: 65,
  },
  {
    id: 'selection-stage',
    name: 'Selection Sort Stone Pedestal',
    region: 'sorting',
    regionName: 'Sorting Meadows',
    algorithmId: 'selection-sort',
    lessonTitle: 'Selection Sort',
    level: 3,
    levelBadge: 'Sorting',
    x: 730,
    y: 440,
    icon: '🏺',
    flowerType: 'tulip',
    storybookLore:
      'A quiet stone pedestal in the meadow. Gardeners scan the entire field to find the absolute smallest bud, placing it with ceremony at the beginning of the path.',
    concepts: ['Minimum Selection', 'Repeated Sweeps', 'Boundary Tracking', 'Unstable Swaps'],
    complexity: 'O(n²) Comparisons',
    xpReward: 60,
  },
  {
    id: 'merge-bridge',
    name: 'Merge Sort Twin Streams',
    region: 'sorting',
    regionName: 'Sorting Meadows',
    algorithmId: 'merge-sort',
    lessonTitle: 'Merge Sort',
    level: 3,
    levelBadge: 'Sorting',
    x: 850,
    y: 490,
    icon: '🪡',
    flowerType: 'cherry-blossom',
    storybookLore:
      'Where two bubbling streams flow parallel, their sorted waters interweaving cleanly into a single grand river without ever disrupting order.',
    concepts: ['Recursive Splitting', 'Merge Subroutine', 'Guaranteed O(n log n)', 'Auxiliary Array Space'],
    complexity: 'O(n log n) Guaranteed',
    xpReward: 85,
  },
  {
    id: 'quick-fork',
    name: 'Quick Sort Pivot Crossing',
    region: 'sorting',
    regionName: 'Sorting Meadows',
    algorithmId: 'quick-sort',
    lessonTitle: 'Quick Sort',
    level: 3,
    levelBadge: 'Sorting',
    x: 930,
    y: 430,
    icon: '⚡',
    flowerType: 'cherry-blossom',
    storybookLore:
      'A bustling fork in the pathway. Gardeners choose a single pivot flower: smaller petals stream to the left, grander blooms march to the right, and the world is sorted.',
    concepts: ['Pivot Selection', 'Lomuto Partitioning', 'In-Place Recursion', 'Average-case Mastery'],
    complexity: 'O(n log n) Average',
    xpReward: 90,
  },
  {
    id: 'treehouse-spiral',
    name: 'The Great Oak Spiral Stairs',
    region: 'treehouse',
    regionName: 'Treehouse Grove',
    algorithmId: 'bst',
    lessonTitle: 'Recursion & The Call Stack',
    level: 5,
    levelBadge: 'Recursion',
    x: 320,
    y: 280,
    icon: '🪜',
    flowerType: 'orchid',
    storybookLore:
      'A hand-carved spiral staircase wrapping around the ancient Great Oak. Each upward step is a recursive call; only when the top base-case platform is reached does the descent begin.',
    concepts: ['Base Cases', 'Recursive Descent', 'Call Stack Frames', 'Stack Overflow Limits'],
    complexity: 'O(depth) Stack Space',
    xpReward: 70,
  },
  {
    id: 'bst-canopy',
    name: 'The Binary Search Treehouse',
    region: 'treehouse',
    regionName: 'Treehouse Grove',
    algorithmId: 'bst',
    lessonTitle: 'Binary Search Trees (BST)',
    level: 7,
    levelBadge: 'Tree Structures',
    x: 400,
    y: 190,
    icon: '🌳',
    flowerType: 'orchid',
    storybookLore:
      'A majestic wooden lookout nestled high in the green canopy. Every left rope bridge leads to lesser values, while every right bridge climbs toward greater wonders.',
    concepts: ['Root, Leaves & Nodes', 'BST Invariant', 'In-Order Traversal', 'Tree Height Balance'],
    complexity: 'O(log n) Balanced',
    xpReward: 95,
  },
  {
    id: 'graphwood-arch',
    name: 'Graphwood Entry Archway',
    region: 'graphwood',
    regionName: 'Graphwood Forest',
    algorithmId: 'bfs',
    lessonTitle: 'Breadth-First Search (BFS)',
    level: 8,
    levelBadge: 'Graphs',
    x: 690,
    y: 240,
    icon: '🏮',
    flowerType: 'lotus',
    storybookLore:
      'Stone lanterns illuminate the mossy woodland entrance. Explorers send out rings of light that reveal every adjacent clearing before venturing deeper into the forest.',
    concepts: ['Queue (FIFO)', 'Shortest Unweighted Path', 'Level-order Rings', 'Visited Node Set'],
    complexity: 'O(V + E) Linear Time',
    xpReward: 80,
  },
  {
    id: 'deep-graphwood',
    name: 'Deep Graphwood Winding Trail',
    region: 'graphwood',
    regionName: 'Graphwood Forest',
    algorithmId: 'dfs',
    lessonTitle: 'Depth-First Search (DFS)',
    level: 8,
    levelBadge: 'Graphs',
    x: 790,
    y: 160,
    icon: '🌲',
    flowerType: 'lotus',
    storybookLore:
      'A mystical path flanked by ancient birches. Adventurers follow a single trail to its deepest dead end before retracing their footprints to explore unexplored forks.',
    concepts: ['Recursion / Stack (LIFO)', 'Cycle Detection', 'Topological Ordering', 'Maze Solving'],
    complexity: 'O(V + E) Linear Time',
    xpReward: 80,
  },
  {
    id: 'stone-bridge',
    name: 'Dijkstra’s Arched Stone Bridge',
    region: 'graphwood',
    regionName: 'Graphwood Forest',
    algorithmId: 'dijkstra',
    lessonTitle: 'Dijkstra’s Shortest Path',
    level: 8,
    levelBadge: 'Graphs',
    x: 900,
    y: 250,
    icon: '🌉',
    flowerType: 'lotus',
    storybookLore:
      'An ancient ivy-draped bridge crossing the roaring gorge. Inscribed milestone stones continually calculate the path of least fatigue across weighted trails.',
    concepts: ['Priority Queue (Min-Heap)', 'Edge Weights', 'Greedy Relaxation', 'Shortest Route Guarantee'],
    complexity: 'O((V + E) log V)',
    xpReward: 100,
  },
  {
    id: 'lily-pavilion',
    name: 'Water Lily Dynamic Pavilion',
    region: 'pond',
    regionName: 'Water Lily Pond',
    algorithmId: 'dp-fibonacci',
    lessonTitle: 'Dynamic Programming (Fibonacci)',
    level: 6,
    levelBadge: 'Dynamic Programming',
    x: 1080,
    y: 470,
    icon: '🪷',
    flowerType: 'lotus',
    storybookLore:
      'An open-air cedar pavilion beside shimmering turquoise water. Solutions to past subproblems are recorded upon broad lotus leaves so no flower petal is ever calculated twice.',
    concepts: ['Overlapping Subproblems', 'Optimal Substructure', 'Memoization & Tabulation', 'Exponential to Linear'],
    complexity: 'O(n) Time / O(1) Space',
    xpReward: 95,
  },
  {
    id: 'algorithm-castle',
    name: 'The Algorithmic Citadel & Lavender Fields',
    region: 'castle',
    regionName: 'Algorithm Castle',
    algorithmId: 'dijkstra',
    lessonTitle: 'Mastery of Algorithms',
    level: 14,
    levelBadge: 'Grand Master',
    x: 1220,
    y: 200,
    icon: '🏰',
    flowerType: 'rose',
    storybookLore:
      'The crown jewel of AlgoBloom. Its watercolor turrets rise above fragrant lavender hills, celebrating the learners who have nurtured their curiosity from fragile seeds to grand mastery.',
    concepts: ['Algorithmic Synthesis', 'NP-Completeness', 'Optimization Artistry', 'Lifetime Blooming'],
    complexity: 'Complete Curriculum',
    xpReward: 150,
  },
];

interface Props {
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
}

export const WatercolorGardenMap: React.FC<Props> = ({ progress, onSelectLesson }) => {
  const [selectedLandmark, setSelectedLandmark] = useState<GardenLandmark | null>(null);
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [ambientSound, setAmbientSound] = useState<boolean>(true);
  const [hoveredLandmark, setHoveredLandmark] = useState<GardenLandmark | null>(null);

  // Region Focus Definitions (viewBox centers)
  const REGION_BOUNDS: Record<string, { x: number; y: number; zoom: number }> = {
    all: { x: 0, y: 0, zoom: 1 },
    nursery: { x: 50, y: 450, zoom: 1.4 },
    searching: { x: 250, y: 400, zoom: 1.4 },
    sorting: { x: 500, y: 280, zoom: 1.35 },
    treehouse: { x: 150, y: 50, zoom: 1.4 },
    graphwood: { x: 550, y: 50, zoom: 1.35 },
    pond: { x: 800, y: 280, zoom: 1.4 },
    castle: { x: 900, y: 50, zoom: 1.4 },
  };

  const handleRegionClick = (regionId: string) => {
    setActiveRegionFilter(regionId);
    if (REGION_BOUNDS[regionId]) {
      setZoomLevel(REGION_BOUNDS[regionId].zoom);
    }
  };

  const isLandmarkCompleted = (landmark: GardenLandmark) => {
    return progress.completedLessons.includes(landmark.algorithmId);
  };

  const isLandmarkMastered = (landmark: GardenLandmark) => {
    return progress.masteredAlgorithms.includes(landmark.algorithmId);
  };

  const filteredLandmarks =
    activeRegionFilter === 'all'
      ? GARDEN_LANDMARKS
      : GARDEN_LANDMARKS.filter((l) => l.region === activeRegionFilter);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg bg-[#BED6BC] select-none">
      {/* Paper texture overlay and watercolor filter definitions */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Watercolor displacement filter */}
          <filter id="watercolor-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="0.4" result="blurred" />
            <feBlend in="SourceGraphic" in2="blurred" mode="multiply" />
          </filter>

          {/* Paper grain pattern */}
          <pattern id="paper-grain" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="#B8D5B6" opacity="0.4" />
            <circle cx="20" cy="30" r="1.5" fill="#939F7F" opacity="0.25" />
            <circle cx="70" cy="60" r="1.2" fill="#7D9475" opacity="0.2" />
            <circle cx="45" cy="85" r="1.8" fill="#A5BFA0" opacity="0.3" />
            <circle cx="85" cy="15" r="1.4" fill="#C6A8CE" opacity="0.2" />
          </pattern>
        </defs>
      </svg>

      {/* Top Map Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Region Pills Navigator */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 backdrop-blur-md border border-garden-cardborder shadow-sm overflow-x-auto max-w-[80vw] scrollbar-none">
          {[
            { id: 'all', label: 'Whole Garden', icon: '🗺️' },
            { id: 'nursery', label: 'Seedling Nursery', icon: '🏡' },
            { id: 'searching', label: 'Searching Brook', icon: '🌊' },
            { id: 'sorting', label: 'Sorting Meadows', icon: '🌾' },
            { id: 'treehouse', label: 'Treehouse Grove', icon: '🌳' },
            { id: 'graphwood', label: 'Graphwood Forest', icon: '🌲' },
            { id: 'pond', label: 'Lotus Pond', icon: '🪷' },
            { id: 'castle', label: 'Algorithm Castle', icon: '🏰' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => handleRegionClick(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeRegionFilter === r.id
                  ? 'bg-dustyrose text-garden-text font-bold shadow-sm'
                  : 'text-garden-secondary hover:text-garden-text hover:bg-white/60'
              }`}
            >
              <span>{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {/* Zoom & Sound Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 backdrop-blur-md border border-garden-cardborder shadow-sm">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
              className="p-1.5 text-garden-secondary hover:text-garden-text rounded-lg hover:bg-white/60 transition-colors"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
              className="p-1.5 text-garden-secondary hover:text-garden-text rounded-lg hover:bg-white/60 transition-colors"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setActiveRegionFilter('all');
              }}
              className="p-1.5 text-garden-secondary hover:text-garden-text rounded-lg hover:bg-white/60 transition-colors"
              title="Reset View"
              aria-label="Reset map view"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <button
            onClick={() => setAmbientSound(!ambientSound)}
            className="p-2 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 backdrop-blur-md border border-garden-cardborder text-garden-secondary hover:text-garden-text shadow-sm"
            title={ambientSound ? 'Garden Breeze Active' : 'Garden Breeze Muted'}
            aria-label="Toggle ambient garden ambiance"
          >
            {ambientSound ? (
              <span className="flex items-center gap-1 text-xs font-bold text-sagegreen">
                <Volume2 size={16} />
                <span className="hidden sm:inline">Breeze 🍃</span>
              </span>
            ) : (
              <VolumeX size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Storybook Illustrated Watercolor Canvas (SVG) */}
      <div className="relative w-full overflow-hidden transition-transform duration-500 ease-out">
        <svg
          viewBox="0 0 1400 900"
          className="w-full h-auto block"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin:
              activeRegionFilter === 'all'
                ? 'center center'
                : `${(REGION_BOUNDS[activeRegionFilter]?.x || 0) + 300}px ${(REGION_BOUNDS[activeRegionFilter]?.y || 0) + 200}px`,
            transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {/* BASE WATERCOLOR TERRAIN (Layer 0) */}
          <rect width="1400" height="900" fill="#BED6BC" />

          {/* Watercolor Paper Texture Layer */}
          <rect width="1400" height="900" fill="url(#paper-grain)" opacity="0.65" />

          {/* ROLLING HILLS (Layer 1 - Distant Backing Hills) */}
          {/* Distant soft sage & misty lavender mountain contours */}
          <path
            d="M 0,320 Q 250,220 500,280 T 1000,210 Q 1200,160 1400,240 L 1400,0 L 0,0 Z"
            fill="#A9C7A7"
            opacity="0.85"
            filter="url(#watercolor-filter)"
          />
          <path
            d="M 0,260 Q 350,140 700,220 T 1400,150 L 1400,0 L 0,0 Z"
            fill="#B4CEB2"
            opacity="0.6"
            filter="url(#watercolor-filter)"
          />

          {/* Lavender Castle Terraces in Upper Right */}
          <path
            d="M 950,300 C 1050,220 1200,180 1400,200 L 1400,400 C 1280,380 1100,380 950,300 Z"
            fill="#B9AEC8"
            opacity="0.5"
            filter="url(#watercolor-filter)"
          />

          {/* MIDDLE HILLS & MEADOWS (Layer 2) */}
          {/* Treehouse Grove Elevation (Top-Left) */}
          <path
            d="M 120,400 C 180,260 420,180 560,260 C 620,310 580,420 480,460 C 350,510 180,480 120,400 Z"
            fill="#8EA88B"
            opacity="0.75"
            filter="url(#watercolor-filter)"
          />

          {/* Complexity Knoll (Left) */}
          <path
            d="M 40,540 C 60,420 220,380 320,450 C 380,490 350,580 260,610 C 160,640 40,610 40,540 Z"
            fill="#9CB598"
            opacity="0.85"
            filter="url(#watercolor-filter)"
          />

          {/* Sorting Meadows Center Plateau */}
          <path
            d="M 520,620 C 580,460 840,400 1020,480 C 1120,540 1050,680 880,720 C 720,750 540,710 520,620 Z"
            fill="#A7C4A4"
            opacity="0.85"
            filter="url(#watercolor-filter)"
          />

          {/* Nursery Basin (Bottom-Left) */}
          <path
            d="M 80,880 C 120,720 380,680 480,760 C 540,810 500,900 360,900 L 80,900 Z"
            fill="#B1CCAE"
            opacity="0.9"
            filter="url(#watercolor-filter)"
          />

          {/* WATER BODIES & RIVERS (Layer 3) */}
          {/* Graphwood Forest Stream to Pond */}
          <path
            d="M 760,120 Q 820,200 870,250 T 940,360 Q 980,420 1020,450"
            fill="none"
            stroke="#5DA39D"
            strokeWidth="28"
            strokeLinecap="round"
            opacity="0.8"
            filter="url(#watercolor-filter)"
          />
          <path
            d="M 760,120 Q 820,200 870,250 T 940,360 Q 980,420 1020,450"
            fill="none"
            stroke="#7CBFB8"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Searching Brook flowing past Nursery */}
          <path
            d="M 580,560 Q 520,640 450,700 T 360,840 Q 320,900 300,900"
            fill="none"
            stroke="#5DA39D"
            strokeWidth="32"
            strokeLinecap="round"
            opacity="0.75"
            filter="url(#watercolor-filter)"
          />
          <path
            d="M 580,560 Q 520,640 450,700 T 360,840 Q 320,900 300,900"
            fill="none"
            stroke="#81C7C0"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Shimmering Turquoise Water Lily Pond */}
          <path
            d="M 980,440 C 1040,390 1200,410 1250,480 C 1290,540 1240,640 1150,660 C 1050,680 960,610 950,530 C 940,480 960,450 980,440 Z"
            fill="#569892"
            opacity="0.85"
            filter="url(#watercolor-filter)"
          />
          <path
            d="M 1000,460 C 1050,420 1170,430 1210,490 C 1240,540 1200,610 1130,630 C 1050,640 980,590 980,520 Z"
            fill="#79BFB7"
            opacity="0.9"
          />

          {/* Floating Water Lily Pads on Pond */}
          {[
            { cx: 1040, cy: 500, r: 16 },
            { cx: 1110, cy: 530, r: 22 },
            { cx: 1070, cy: 580, r: 19 },
            { cx: 1170, cy: 560, r: 24 },
            { cx: 1190, cy: 490, r: 15 },
          ].map((pad, i) => (
            <g key={`pad-${i}`}>
              <circle cx={pad.cx} cy={pad.cy} r={pad.r} fill="#628E63" opacity="0.85" />
              <circle cx={pad.cx} cy={pad.cy} r={pad.r * 0.75} fill="#75A476" opacity="0.9" />
              {/* Pink Lotus Blossom */}
              <circle cx={pad.cx + 2} cy={pad.cy - 2} r={pad.r * 0.4} fill="#F1B4B1" />
              <circle cx={pad.cx + 2} cy={pad.cy - 2} r={pad.r * 0.2} fill="#FFE0AF" />
            </g>
          ))}

          {/* Water ripples */}
          <ellipse cx="1120" cy="520" rx="45" ry="18" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.45" />
          <ellipse cx="1060" cy="560" rx="35" ry="14" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.35" />

          {/* WINDING STONE & COBBLESTONE PATHWAYS (Layer 4) */}
          {/* Main Spine Pathway connecting the entire garden */}
          {/* 1. Nursery to Searching Terraces */}
          <path
            d="M 230,710 Q 330,680 440,685"
            fill="none"
            stroke="#DFD4C0"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.85"
            filter="url(#watercolor-filter)"
          />
          <path
            d="M 230,710 Q 330,680 440,685"
            fill="none"
            stroke="#EFE6D6"
            strokeWidth="10"
            strokeDasharray="4 6"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* 2. Searching Brook Stepping Stones across river */}
          {[
            { cx: 450, cy: 690, r: 14 },
            { cx: 480, cy: 670, r: 13 },
            { cx: 515, cy: 645, r: 15 },
            { cx: 550, cy: 615, r: 14 },
          ].map((stone, i) => (
            <g key={`stone-${i}`}>
              <circle cx={stone.cx} cy={stone.cy} r={stone.r} fill="#C6BEA7" stroke="#A89E84" strokeWidth="2" opacity="0.95" />
              <circle cx={stone.cx - 2} cy={stone.cy - 2} r={stone.r * 0.6} fill="#E5DAC9" />
              <circle cx={stone.cx + 2} cy={stone.cy + 1} r={stone.r * 0.3} fill="#939F7F" opacity="0.7" />
            </g>
          ))}

          {/* 3. Terraces to Sorting Meadows */}
          <path
            d="M 550,610 Q 600,560 670,530"
            fill="none"
            stroke="#DFD4C0"
            strokeWidth="15"
            strokeLinecap="round"
            opacity="0.85"
            filter="url(#watercolor-filter)"
          />
          <path
            d="M 550,610 Q 600,560 670,530"
            fill="none"
            stroke="#EFE6D6"
            strokeWidth="9"
            strokeDasharray="4 6"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* 4. Sorting Meadows Spine Paths */}
          <path
            d="M 680,520 Q 730,460 760,540 T 850,490 Q 900,450 930,430"
            fill="none"
            stroke="#DFD4C0"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.85"
            filter="url(#watercolor-filter)"
          />
          <path
            d="M 680,520 Q 730,460 760,540 T 850,490 Q 900,450 930,430"
            fill="none"
            stroke="#EFE6D6"
            strokeWidth="10"
            strokeDasharray="5 7"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* 5. Pathway up to Treehouse Grove */}
          <path
            d="M 230,690 Q 180,550 170,450 T 260,360 Q 300,320 320,290"
            fill="none"
            stroke="#DFD4C0"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.8"
            filter="url(#watercolor-filter)"
          />
          <path
            d="M 230,690 Q 180,550 170,450 T 260,360 Q 300,320 320,290"
            fill="none"
            stroke="#EFE6D6"
            strokeWidth="8"
            strokeDasharray="4 5"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* 6. Treehouse Bridge to Graphwood */}
          <path
            d="M 420,200 Q 540,190 680,240"
            fill="none"
            stroke="#DFD4C0"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.8"
            filter="url(#watercolor-filter)"
          />

          {/* 7. Graphwood to Castle via Arched Stone Bridge */}
          <path
            d="M 690,240 Q 760,190 870,250 T 1020,300 Q 1120,270 1210,215"
            fill="none"
            stroke="#DFD4C0"
            strokeWidth="15"
            strokeLinecap="round"
            opacity="0.85"
            filter="url(#watercolor-filter)"
          />
          <path
            d="M 690,240 Q 760,190 870,250 T 1020,300 Q 1120,270 1210,215"
            fill="none"
            stroke="#EFE6D6"
            strokeWidth="9"
            strokeDasharray="4 6"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* 8. Path Branching down to Water Lily Pavilion */}
          <path
            d="M 930,430 Q 990,440 1060,470"
            fill="none"
            stroke="#DFD4C0"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 1020,300 Q 1060,380 1070,460"
            fill="none"
            stroke="#DFD4C0"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* STONE ARCH BRIDGE ACROSS GORGE (Dijkstra) */}
          <g>
            {/* Bridge shadow */}
            <path d="M 870,230 Q 900,265 930,230" fill="none" stroke="#3E6B65" strokeWidth="12" opacity="0.6" />
            {/* Bridge arch */}
            <path d="M 865,225 Q 900,210 935,225 L 940,245 Q 900,230 860,245 Z" fill="#C6BEA7" stroke="#8A7E68" strokeWidth="2" />
            {/* Bridge parapet stones */}
            <line x1="865" y1="223" x2="935" y2="223" stroke="#8A7E68" strokeWidth="3" />
            <line x1="860" y1="247" x2="940" y2="247" stroke="#8A7E68" strokeWidth="3" />
          </g>

          {/* VEGETATION, TREES & LANDSCAPE OBJECTS (Layer 5) */}
          {/* THE GREAT OAK TREE (Treehouse Grove) */}
          <g filter="url(#watercolor-filter)">
            {/* Massive hand-painted trunk */}
            <path
              d="M 330,320 C 340,270 320,230 350,170 C 360,140 370,120 380,80 L 400,80 C 410,130 430,220 420,270 C 430,300 450,330 460,350 L 330,350 Z"
              fill="#7A614A"
            />
            {/* Giant leafy watercolor canopies */}
            <circle cx="340" cy="140" r="70" fill="#6B8863" opacity="0.85" />
            <circle cx="420" cy="120" r="85" fill="#7C9974" opacity="0.9" />
            <circle cx="370" cy="90" r="75" fill="#8FA88B" opacity="0.85" />
            <circle cx="450" cy="160" r="60" fill="#5D7A56" opacity="0.85" />
            <circle cx="390" cy="150" r="50" fill="#9CB598" opacity="0.9" />

            {/* Cozy Wooden Treehouse */}
            <rect x="360" y="160" width="65" height="50" rx="6" fill="#A88B68" stroke="#5F4B35" strokeWidth="2" />
            {/* Pitched Shingle Roof */}
            <polygon points="350,165 392,125 435,165" fill="#DC6C66" stroke="#9E4641" strokeWidth="2" />
            {/* Window with warm glow */}
            <rect x="375" y="175" width="16" height="18" rx="2" fill="#FFE0AF" stroke="#5F4B35" strokeWidth="1.5" />
            <line x1="383" y1="175" x2="383" y2="193" stroke="#5F4B35" strokeWidth="1" />
            <line x1="375" y1="184" x2="391" y2="184" stroke="#5F4B35" strokeWidth="1" />
            {/* Hanging Rope Bridge */}
            <path d="M 425,185 Q 480,210 535,185" fill="none" stroke="#7A614A" strokeWidth="3" strokeDasharray="3 3" />
          </g>

          {/* GRAPHWOOD PINES & BROADLEAF FOREST (Layer 5) */}
          <g filter="url(#watercolor-filter)">
            {[
              { x: 670, y: 140, h: 70, w: 40, c: '#4E6B4B' },
              { x: 710, y: 110, h: 80, w: 45, c: '#3D553C' },
              { x: 750, y: 130, h: 75, w: 42, c: '#587754' },
              { x: 810, y: 100, h: 85, w: 48, c: '#3D553C' },
              { x: 860, y: 140, h: 70, w: 40, c: '#4E6B4B' },
              { x: 780, y: 80, h: 90, w: 50, c: '#324731' },
            ].map((pine, i) => (
              <g key={`pine-${i}`}>
                {/* Trunk */}
                <rect x={pine.x - 3} y={pine.y} width={6} height={pine.h * 0.4} fill="#5C4735" />
                {/* Pine layers */}
                <polygon
                  points={`${pine.x},${pine.y - pine.h * 0.7} ${pine.x - pine.w * 0.5},${pine.y} ${pine.x + pine.w * 0.5},${pine.y}`}
                  fill={pine.c}
                />
                <polygon
                  points={`${pine.x},${pine.y - pine.h * 0.85} ${pine.x - pine.w * 0.4},${pine.y - pine.h * 0.25} ${pine.x + pine.w * 0.4},${pine.y - pine.h * 0.25}`}
                  fill={pine.c}
                />
                <polygon
                  points={`${pine.x},${pine.y - pine.h} ${pine.x - pine.w * 0.3},${pine.y - pine.h * 0.5} ${pine.x + pine.w * 0.3},${pine.y - pine.h * 0.5}`}
                  fill={pine.c}
                />
              </g>
            ))}

            {/* Glowing Fairy Lanterns on Graphwood arch */}
            <circle cx="688" cy="225" r="5" fill="#FFE0AF" />
            <circle cx="688" cy="225" r="9" fill="#FFE0AF" opacity="0.35" />
          </g>

          {/* SEEDLING NURSERY COTTAGE & FLOWERBEDS (Bottom-Left) */}
          <g filter="url(#watercolor-filter)">
            {/* Cozy Thatched Cottage Base */}
            <rect x="175" y="685" width="70" height="50" rx="4" fill="#EFE8D8" stroke="#877561" strokeWidth="2" />
            {/* Thatched Straw Roof */}
            <polygon points="160,690 210,640 260,690" fill="#E2BD7E" stroke="#8A6B34" strokeWidth="2" />
            {/* Chimney with soft smoke puff */}
            <rect x="235" y="650" width="10" height="20" fill="#A89278" />
            <circle cx="240" cy="640" r="5" fill="#FFFFFF" opacity="0.5" />
            <circle cx="244" cy="630" r="7" fill="#FFFFFF" opacity="0.4" />
            <circle cx="250" cy="618" r="9" fill="#FFFFFF" opacity="0.25" />
            {/* Wooden Cottage Door & Windows */}
            <rect x="198" y="705" width="16" height="30" rx="3" fill="#8C5C35" />
            <rect x="182" y="698" width="12" height="14" rx="2" fill="#FFE0AF" stroke="#877561" strokeWidth="1" />
            <rect x="222" y="698" width="12" height="14" rx="2" fill="#FFE0AF" stroke="#877561" strokeWidth="1" />

            {/* Terracotta Flower Pots beside nursery */}
            {[
              { x: 260, y: 730, c: '#D47E53', plant: '🌱' },
              { x: 275, y: 732, c: '#C46F46', plant: '🌿' },
              { x: 290, y: 728, c: '#E08A5F', plant: '🌻' },
            ].map((pot, i) => (
              <g key={`pot-${i}`}>
                <polygon points={`${pot.x},${pot.y} ${pot.x + 10},${pot.y} ${pot.x + 8},${pot.y + 12} ${pot.x + 2},${pot.y + 12}`} fill={pot.c} />
                <rect x={pot.x - 1} y={pot.y - 2} width="12" height="3" rx="1" fill={pot.c} />
                <text x={pot.x - 2} y={pot.y - 3} fontSize="11">{pot.plant}</text>
              </g>
            ))}

            {/* Garden Picket Fence */}
            <line x1="160" y1="740" x2="310" y2="740" stroke="#DFD7C7" strokeWidth="3" />
            {[170, 190, 210, 230, 250, 270, 290, 310].map((fx, i) => (
              <line key={`fence-${i}`} x1={fx} y1="732" x2={fx} y2="748" stroke="#C4B8A2" strokeWidth="2.5" />
            ))}
          </g>

          {/* HILLTOP SUNDIAL & CHERRY TREE (Complexity Knoll) */}
          <g filter="url(#watercolor-filter)">
            {/* Stone Sundial Pedestal */}
            <ellipse cx="160" cy="445" rx="18" ry="9" fill="#C6BEA7" stroke="#8A8066" strokeWidth="1.5" />
            <rect x="156" y="432" width="8" height="12" fill="#E5DAC9" stroke="#8A8066" strokeWidth="1" />
            <polygon points="160,425 163,435 157,435" fill="#8A8066" />

            {/* Flowering Pink Cherry Blossom Tree */}
            <path d="M 120,440 Q 110,380 90,360 L 95,358 Q 118,380 128,440 Z" fill="#6B523E" />
            <circle cx="85" cy="350" r="35" fill="#F1B4B1" opacity="0.85" />
            <circle cx="115" cy="340" r="42" fill="#F7D7D5" opacity="0.9" />
            <circle cx="95" cy="320" r="38" fill="#F1B4B1" opacity="0.85" />
            <circle cx="125" cy="365" r="28" fill="#E78E89" opacity="0.75" />
          </g>

          {/* WATER LILY CEDAR PAVILION (Pond) */}
          <g filter="url(#watercolor-filter)">
            {/* Wooden Boardwalk / Deck over water */}
            <rect x="1050" y="475" width="55" height="35" rx="4" fill="#C4A882" stroke="#7A6040" strokeWidth="2" />
            {/* Pavilion Pillars */}
            <line x1="1055" y1="475" x2="1055" y2="445" stroke="#7A6040" strokeWidth="3" />
            <line x1="1100" y1="475" x2="1100" y2="445" stroke="#7A6040" strokeWidth="3" />
            <line x1="1077" y1="475" x2="1077" y2="440" stroke="#7A6040" strokeWidth="3" />
            {/* Hexagonal Cedar Roof with Rose Trim */}
            <polygon points="1040,448 1077,418 1115,448" fill="#E59F9C" stroke="#A85B58" strokeWidth="2" />
            <circle cx="1077" cy="415" r="4" fill="#FFE0AF" />
          </g>

          {/* FAIRY-TALE WATERCOLOR CASTLE (Top-Right) */}
          <g filter="url(#watercolor-filter)">
            {/* Castle Main Keep & Walls */}
            <rect x="1190" y="165" width="60" height="65" rx="4" fill="#DFD7CE" stroke="#877561" strokeWidth="2" />
            {/* Left Tower */}
            <rect x="1170" y="145" width="26" height="85" rx="4" fill="#DFD7CE" stroke="#877561" strokeWidth="2" />
            <polygon points="1165,148 1183,105 1201,148" fill="#87819C" stroke="#5D5770" strokeWidth="2" />
            {/* Right Tower */}
            <rect x="1244" y="145" width="26" height="85" rx="4" fill="#DFD7CE" stroke="#877561" strokeWidth="2" />
            <polygon points="1239,148 1257,105 1275,148" fill="#87819C" stroke="#5D5770" strokeWidth="2" />
            {/* Center High Spire */}
            <polygon points="1205,168 1220,120 1235,168" fill="#AC80B6" stroke="#6F4878" strokeWidth="2" />
            {/* Arched Castle Gate */}
            <path d="M 1210,230 L 1210,205 Q 1220,195 1230,205 L 1230,230 Z" fill="#6B523E" />
            {/* Gold banner pennant */}
            <polygon points="1220,118 1235,124 1220,130" fill="#FFE0AF" />
          </g>

          {/* LAVENDER FIELDS AROUND CASTLE */}
          <g filter="url(#watercolor-filter)">
            {[
              { x: 1120, y: 260 },
              { x: 1145, y: 245 },
              { x: 1170, y: 275 },
              { x: 1240, y: 260 },
              { x: 1270, y: 240 },
              { x: 1300, y: 270 },
            ].map((lav, i) => (
              <g key={`lav-${i}`}>
                <ellipse cx={lav.x} cy={lav.y} rx="16" ry="8" fill="#C6A8CE" opacity="0.85" />
                <ellipse cx={lav.x + 3} cy={lav.y - 3} rx="12" ry="6" fill="#A49FB5" opacity="0.8" />
              </g>
            ))}
          </g>

          {/* SORTING MEADOW WILDFLOWERS ARRAY (Color Array Visual) */}
          <g>
            {/* Wildflower beds planted in ascending color rows like sorted bars */}
            {[
              { x: 670, y: 555, c: '#E78E89', h: 12 },
              { x: 690, y: 550, c: '#E78E89', h: 16 },
              { x: 710, y: 545, c: '#F6CD88', h: 20 },
              { x: 730, y: 540, c: '#F6CD88', h: 25 },
              { x: 750, y: 535, c: '#939F7F', h: 30 },
              { x: 770, y: 530, c: '#939F7F', h: 35 },
              { x: 790, y: 525, c: '#87819C', h: 42 },
              { x: 810, y: 520, c: '#87819C', h: 48 },
            ].map((flower, i) => (
              <g key={`flower-${i}`}>
                <line x1={flower.x} y1={flower.y} x2={flower.x} y2={flower.y - flower.h} stroke="#64714F" strokeWidth="2" />
                <circle cx={flower.x} cy={flower.y - flower.h} r="5" fill={flower.c} />
                <circle cx={flower.x} cy={flower.y - flower.h} r="2" fill="#FFE0AF" />
              </g>
            ))}
          </g>

          {/* ANIMATED AMBIENT BUTTERFLIES FLUTTERING */}
          {ambientSound && (
            <g className="pointer-events-none">
              {/* Butterfly 1 near Sorting Meadows */}
              <g className="animate-float" style={{ transformOrigin: '730px 480px' }}>
                <circle cx="730" cy="480" r="2.5" fill="#5F4B35" />
                <ellipse cx="726" cy="477" rx="5" ry="3.5" fill="#F1B4B1" opacity="0.85" />
                <ellipse cx="734" cy="477" rx="5" ry="3.5" fill="#F1B4B1" opacity="0.85" />
              </g>

              {/* Butterfly 2 near Treehouse Grove */}
              <g className="animate-float" style={{ animationDelay: '1.2s', transformOrigin: '360px 240px' }}>
                <circle cx="360" cy="240" r="2" fill="#5F4B35" />
                <ellipse cx="356" cy="237" rx="4.5" ry="3" fill="#FFE0AF" opacity="0.9" />
                <ellipse cx="364" cy="237" rx="4.5" ry="3" fill="#FFE0AF" opacity="0.9" />
              </g>

              {/* Butterfly 3 near Lavender Fields */}
              <g className="animate-float" style={{ animationDelay: '2.1s', transformOrigin: '1150px 280px' }}>
                <circle cx="1150" cy="280" r="2" fill="#5F4B35" />
                <ellipse cx="1146" cy="277" rx="4.5" ry="3" fill="#C6A8CE" opacity="0.9" />
                <ellipse cx="1154" cy="277" rx="4.5" ry="3" fill="#C6A8CE" opacity="0.9" />
              </g>

              {/* Floating Pink Cherry Blossom Petals drifting */}
              {[
                { x: 190, y: 390, s: 0.8 },
                { x: 230, y: 440, s: 1.2 },
                { x: 280, y: 490, s: 0.9 },
                { x: 1060, y: 520, s: 1.1 },
              ].map((petal, i) => (
                <ellipse
                  key={`petal-${i}`}
                  cx={petal.x}
                  cy={petal.y}
                  rx={4 * petal.s}
                  ry={2.5 * petal.s}
                  fill="#F1B4B1"
                  opacity="0.75"
                  className="animate-pulseSubtle"
                />
              ))}
            </g>
          )}

          {/* INTERACTIVE MILESTONE BEACONS (Layer 6 - Clickable Pins) */}
          {filteredLandmarks.map((landmark) => {
            const completed = isLandmarkCompleted(landmark);
            const mastered = isLandmarkMastered(landmark);
            const isHovered = hoveredLandmark?.id === landmark.id;
            const isSelected = selectedLandmark?.id === landmark.id;

            return (
              <g
                key={landmark.id}
                className="cursor-pointer group"
                onClick={() => setSelectedLandmark(landmark)}
                onMouseEnter={() => setHoveredLandmark(landmark)}
                onMouseLeave={() => setHoveredLandmark(null)}
                tabIndex={0}
                role="button"
                aria-label={`${landmark.name} - ${landmark.lessonTitle}`}
              >
                {/* Gentle Pulsing Halo */}
                <circle
                  cx={landmark.x}
                  cy={landmark.y}
                  r={isHovered || isSelected ? 30 : 22}
                  fill={mastered ? '#FFE0AF' : completed ? '#F1B4B1' : '#FFFFFF'}
                  opacity={isHovered ? 0.6 : 0.35}
                  className="transition-all duration-300"
                />

                {/* Outer Painted Pin Ring */}
                <circle
                  cx={landmark.x}
                  cy={landmark.y}
                  r={isHovered ? 18 : 15}
                  fill={mastered ? '#FFE0AF' : completed ? '#F1B4B1' : '#FFFFFF'}
                  stroke={completed ? '#DC6C66' : '#7D9475'}
                  strokeWidth="2.5"
                  className="transition-all duration-300 drop-shadow-md"
                />

                {/* Milestone Icon / Stage indicator */}
                <text
                  x={landmark.x}
                  y={landmark.y + 5}
                  textAnchor="middle"
                  fontSize={isHovered ? '15' : '13'}
                  className="transition-all duration-200 select-none pointer-events-none"
                >
                  {mastered ? '🌸' : completed ? '🌿' : '🌱'}
                </text>

                {/* Floating Title Tag on Hover */}
                {isHovered && (
                  <g className="animate-fadeIn pointer-events-none">
                    <rect
                      x={landmark.x - 70}
                      y={landmark.y - 48}
                      width="140"
                      height="26"
                      rx="13"
                      fill="#FFFFFF"
                      stroke="#A0C29D"
                      strokeWidth="1.5"
                      className="shadow-lg"
                    />
                    <text
                      x={landmark.x}
                      y={landmark.y - 31}
                      textAnchor="middle"
                      fill="#1B2B1D"
                      fontSize="11"
                      fontWeight="700"
                      className="font-heading"
                    >
                      {landmark.name.length > 20 ? landmark.name.slice(0, 18) + '...' : landmark.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Storybook Landmark Parchment Modal */}
      {selectedLandmark && (
        <div className="absolute inset-0 z-40 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#FDFBF7] dark:bg-[#1E2520] border-2 border-[#D8CABA] dark:border-[#2E3A32] shadow-2xl relative flex flex-col gap-5 overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(rgba(147, 159, 127, 0.08) 1.5px, transparent 1.5px)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Storybook Header Decorative Strip */}
            <div className="flex items-start justify-between gap-3 border-b border-[#D8CABA] dark:border-[#2E3A32] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-buttercream via-dustyrose to-softmauve flex items-center justify-center text-3xl shadow-sm">
                  {selectedLandmark.icon}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mistylavender/40 text-[10px] font-bold uppercase tracking-wider text-garden-text">
                    <span>{selectedLandmark.regionName}</span>
                    <span>•</span>
                    <span>Level {selectedLandmark.level}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-garden-text dark:text-garden-darktext tracking-tight mt-0.5">
                    {selectedLandmark.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedLandmark(null)}
                className="p-1.5 rounded-full hover:bg-garden-cardborder/40 text-garden-secondary hover:text-garden-text transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Storybook Lore Passage */}
            <div className="p-4 rounded-2xl bg-[#F6EFE2] dark:bg-[#161D18] border border-[#E5DAC9] dark:border-[#2E3A32] text-xs sm:text-sm text-[#4E443B] dark:text-[#D5E2D4] leading-relaxed italic font-serif">
              "{selectedLandmark.storybookLore}"
            </div>

            {/* Curriculum Landmark Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder">
                <span className="text-[10px] font-bold text-garden-secondary uppercase block">
                  Curriculum Lesson
                </span>
                <span className="font-bold text-garden-text dark:text-garden-darktext block mt-0.5">
                  {selectedLandmark.lessonTitle}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder">
                <span className="text-[10px] font-bold text-garden-secondary uppercase block">
                  Complexity Growth
                </span>
                <span className="font-bold text-dustyrose-600 dark:text-dustyrose-400 block mt-0.5">
                  {selectedLandmark.complexity}
                </span>
              </div>
            </div>

            {/* Core Concepts Seedlings */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-garden-secondary block mb-1.5">
                Concepts Cultivated Here
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedLandmark.concepts.map((concept, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-garden-darkcard border border-garden-cardborder text-[11px] font-medium text-garden-text dark:text-garden-darktext"
                  >
                    🌱 {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar: Bloom status & Start Learning */}
            <div className="pt-2 border-t border-[#D8CABA] dark:border-[#2E3A32] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {isLandmarkMastered(selectedLandmark)
                    ? '🌸'
                    : isLandmarkCompleted(selectedLandmark)
                    ? '🌿'
                    : '🌱'}
                </span>
                <div>
                  <span className="text-[11px] font-bold block text-garden-text dark:text-garden-darktext">
                    {isLandmarkMastered(selectedLandmark)
                      ? 'Fully Bloomed & Mastered'
                      : isLandmarkCompleted(selectedLandmark)
                      ? 'Sprouting in Garden'
                      : 'Unexplored Landmark'}
                  </span>
                  <span className="text-[10px] text-sagegreen font-semibold">
                    +{selectedLandmark.xpReward} Garden XP
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectLesson(selectedLandmark.algorithmId);
                  setSelectedLandmark(null);
                }}
                className="px-5 py-2.5 rounded-2xl bg-dustyrose hover:bg-dustyrose-400 text-garden-text font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play size={14} className="fill-garden-text" />
                <span>Visit Landmark</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend / Footer Indicator */}
      <div className="p-3 bg-white/70 dark:bg-garden-darkcard/70 backdrop-blur-md border-t border-garden-cardborder flex flex-wrap items-center justify-between text-xs text-garden-secondary px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span>🌸</span> Mastered Flower
          </span>
          <span className="flex items-center gap-1.5">
            <span>🌿</span> Sprouting Concept
          </span>
          <span className="flex items-center gap-1.5">
            <span>🌱</span> Seedling Unlocked
          </span>
        </div>
        <div className="text-[11px] font-semibold text-garden-secondary">
          Click any landmark marker to open its storybook scroll & start learning
        </div>
      </div>
    </div>
  );
};
