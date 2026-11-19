import React, { useState } from 'react';
import { Sparkles, Play, ZoomIn, ZoomOut, RotateCcw, MapPin, Eye, Volume2, VolumeX, X, Clock, Compass } from 'lucide-react';
import { UserProgress } from '../../types';

export interface MapMilestone {
  id: string;
  title: string;
  shortDescription: string;
  algorithmId: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  xpReward: number;
  flowerType: 'daisy' | 'tulip' | 'cherry-blossom' | 'orchid' | 'lotus' | 'rose' | 'sunflower';
  level: number;
  levelBadge: string;
  zoneName: string;
  x: number; // Coordinate on 993x881 reference image
  y: number; // Coordinate on 993x881 reference image
  storybookLore: string;
  concepts: string[];
}

export const MAP_MILESTONES: MapMilestone[] = [
  // ZONE 1: BOTTOM LEFT ENTRANCE (Level 0: Foundations)
  {
    id: 'm1-what-is-algo',
    title: 'The Garden Path Gate: What is an Algorithm?',
    shortDescription: 'Your journey begins. Discover how step-by-step botanical recipes bring digital gardens into bloom.',
    algorithmId: 'what-is-an-algorithm',
    difficulty: 'Beginner',
    durationMinutes: 5,
    xpReward: 50,
    flowerType: 'daisy',
    level: 0,
    levelBadge: 'Foundations',
    zoneName: 'The Entrance Trail',
    x: 350,
    y: 885,
    storybookLore: 'Standing at the cobblestone gateway beneath morning blossoms, you plant the seed of computational thinking.',
    concepts: ['Deterministic Steps', 'Inputs & Outputs', 'Problem Solving', 'Everyday Logic'],
  },
  {
    id: 'm2-variables',
    title: 'Variables & Seed Packets',
    shortDescription: 'Learn how named pots and memory boxes store numbers, flower counts, and petal colors.',
    algorithmId: 'what-is-an-algorithm',
    difficulty: 'Beginner',
    durationMinutes: 6,
    xpReward: 40,
    flowerType: 'daisy',
    level: 0,
    levelBadge: 'Foundations',
    zoneName: 'The Lower Shrub Bend',
    x: 270,
    y: 820,
    storybookLore: 'Each clay pot carries a chalk label: storing state safely through the changing seasons.',
    concepts: ['Memory Allocation', 'Data Types', 'Assignment', 'State Tracking'],
  },
  {
    id: 'm3-conditions-loops',
    title: 'Conditions & Daily Watering Loops',
    shortDescription: 'Control the flow of execution: water while dry, protect if sunny, and prune when overgrown.',
    algorithmId: 'what-is-an-algorithm',
    difficulty: 'Beginner',
    durationMinutes: 7,
    xpReward: 45,
    flowerType: 'daisy',
    level: 0,
    levelBadge: 'Foundations',
    zoneName: 'The Outer Stone Loop',
    x: 200,
    y: 720,
    storybookLore: 'A wooden waterwheel checks the morning dew: IF thirsty, water each sprout in the row.',
    concepts: ['If / Else Branching', 'While Loops', 'For Loops', 'Termination Bounds'],
  },

  // ZONE 2: LEFT MEADOWS & TERRACES (Level 1 & 2: Data Structures & Searching)
  {
    id: 'm4-linear-search',
    title: 'Linear Search along the Riverbanks',
    shortDescription: 'Inspect every stone in sequential order from left to right until the target flower is discovered.',
    algorithmId: 'linear-search',
    difficulty: 'Beginner',
    durationMinutes: 7,
    xpReward: 50,
    flowerType: 'tulip',
    level: 2,
    levelBadge: 'Searching',
    zoneName: 'The Riverbank Path',
    x: 170,
    y: 580,
    storybookLore: 'Walking the riverbank step by step, examining every single pebble until the golden stone shines.',
    concepts: ['Sequential Scan', 'Unsorted Arrays', 'Best vs Worst Case', 'Linear Time O(n)'],
  },
  {
    id: 'm5-binary-search',
    title: 'Binary Search Stone Terraces',
    shortDescription: 'Leap straight to the center stepping stone, halving the remaining search terrain with every bound.',
    algorithmId: 'binary-search',
    difficulty: 'Beginner',
    durationMinutes: 9,
    xpReward: 60,
    flowerType: 'tulip',
    level: 2,
    levelBadge: 'Searching',
    zoneName: 'The Stepping Stone Terraces',
    x: 130,
    y: 440,
    storybookLore: 'Carved marble steps ascending the hillside: checking the middle step dismisses half the hill.',
    concepts: ['Sorted Collections', 'Midpoint Calculation', 'Divide & Conquer', 'Logarithmic O(log n)'],
  },
  {
    id: 'm6-arrays',
    title: 'Arrays & Continuous Planter Troughs',
    shortDescription: 'Contiguous memory slots allow instantaneous O(1) random access to any blossom by index.',
    algorithmId: 'what-is-an-algorithm',
    difficulty: 'Beginner',
    durationMinutes: 9,
    xpReward: 55,
    flowerType: 'sunflower',
    level: 1,
    levelBadge: 'Data Structures',
    zoneName: 'The Left Cliff Planters',
    x: 95,
    y: 310,
    storybookLore: 'A long stone planter carved into the cliff where flower #0 sits directly beside flower #1.',
    concepts: ['Zero-Indexing', 'Contiguous Memory', 'Direct Address O(1)', 'Fixed Capacity'],
  },
  {
    id: 'm7-linked-lists',
    title: 'Linked Lists & The Hanging Overpass',
    shortDescription: 'Nodes chained together by organic vine pointers that can insert and prune anywhere dynamically.',
    algorithmId: 'what-is-an-algorithm',
    difficulty: 'Intermediate',
    durationMinutes: 11,
    xpReward: 65,
    flowerType: 'sunflower',
    level: 1,
    levelBadge: 'Data Structures',
    zoneName: 'The High Cliff Overpass',
    x: 55,
    y: 140,
    storybookLore: 'A bridge of intertwined wisteria vines where each bloom holds a tendril linking to the next.',
    concepts: ['Pointers & Nodes', 'Dynamic Allocation', 'Head & Tail', 'O(1) Insertion'],
  },

  // ZONE 3: LEFT WOODEN BRIDGE (Level 8: Graph Algorithms)
  {
    id: 'm8-bfs',
    title: 'Breadth-First Search (BFS) at Bridge Pier',
    shortDescription: 'Expand outward in concentric rings, exploring every adjacent clearing before heading deeper.',
    algorithmId: 'bfs',
    difficulty: 'Intermediate',
    durationMinutes: 12,
    xpReward: 75,
    flowerType: 'lotus',
    level: 8,
    levelBadge: 'Graphs',
    zoneName: 'The Left Bridge Entrance',
    x: 300,
    y: 710,
    storybookLore: 'Fairy lanterns illuminate concentric ripples across the water, discovering the shortest unweighted route.',
    concepts: ['FIFO Queue', 'Level-Order Rings', 'Shortest Route', 'Visited Nodes'],
  },
  {
    id: 'm9-dfs',
    title: 'Depth-First Search (DFS) on the Wooden Span',
    shortDescription: 'Cross deep into a single path to its very terminus before turning back to explore forks.',
    algorithmId: 'dfs',
    difficulty: 'Intermediate',
    durationMinutes: 12,
    xpReward: 75,
    flowerType: 'lotus',
    level: 8,
    levelBadge: 'Graphs',
    zoneName: 'The Left Wooden Bridge',
    x: 360,
    y: 645,
    storybookLore: 'Crossing the sturdy cedar bridge over sapphire waters, tracing a single path into the unknown.',
    concepts: ['LIFO Stack', 'Backtracking', 'Cycle Detection', 'Exhaustive Traversal'],
  },
  {
    id: 'm10-dijkstra',
    title: 'Dijkstra’s Shortest Bridge Path',
    shortDescription: 'Calculate the path of minimum stamina across weighted trails using greedy relaxation.',
    algorithmId: 'dijkstra',
    difficulty: 'Advanced',
    durationMinutes: 16,
    xpReward: 95,
    flowerType: 'lotus',
    level: 8,
    levelBadge: 'Graphs',
    zoneName: 'The Island Bridgehead',
    x: 415,
    y: 575,
    storybookLore: 'Runes inscribed on the bridge landing guide travelers along the path of least fatigue.',
    concepts: ['Min-Priority Queue', 'Edge Weights', 'Greedy Relaxation', 'Optimal Distance Table'],
  },

  // ZONE 4: CENTRAL ISLAND & WHITE STEPPING STONES (Level 6: Dynamic Programming)
  {
    id: 'm11-dp-fibonacci',
    title: 'Water Lily Dynamic Programming (Fibonacci)',
    shortDescription: 'Write solved subproblems onto broad lotus leaves so calculations are never repeated twice.',
    algorithmId: 'dp-fibonacci',
    difficulty: 'Beginner',
    durationMinutes: 10,
    xpReward: 70,
    flowerType: 'cherry-blossom',
    level: 6,
    levelBadge: 'Dynamic Programming',
    zoneName: 'The Island Meadow',
    x: 480,
    y: 535,
    storybookLore: 'Subproblem answers float on water lilies; subsequent calls look them up in instant O(1) time.',
    concepts: ['Memoization', 'Overlapping Subproblems', 'Optimal Substructure', 'Linear Time O(n)'],
  },
  {
    id: 'm12-tabulation',
    title: 'Tabulation across the White Stepping Stones',
    shortDescription: 'Build solutions bottom-up, step by step from base stone 0 across to the temple stairs.',
    algorithmId: 'dp-fibonacci',
    difficulty: 'Intermediate',
    durationMinutes: 12,
    xpReward: 80,
    flowerType: 'cherry-blossom',
    level: 6,
    levelBadge: 'Dynamic Programming',
    zoneName: 'The White Stepping Stones',
    x: 520,
    y: 460,
    storybookLore: 'Each rounded white stepping stone is laid upon the two stones immediately beneath it.',
    concepts: ['Bottom-Up Iteration', 'Table Construction', 'Space Optimization', 'Base Case Anchors'],
  },
  {
    id: 'm13-knapsack',
    title: 'The Island Forager’s Knapsack',
    shortDescription: 'Decide which rare blossoms to pack into your wicker basket to maximize value without overloading.',
    algorithmId: 'dp-fibonacci',
    difficulty: 'Advanced',
    durationMinutes: 16,
    xpReward: 90,
    flowerType: 'cherry-blossom',
    level: 6,
    levelBadge: 'Dynamic Programming',
    zoneName: 'The Stepping Stone Arc',
    x: 555,
    y: 510,
    storybookLore: 'Standing on the stepping stone, deciding whether to include each blossom in your pack.',
    concepts: ['0/1 Decision Matrix', 'Capacity Constraints', 'Optimal Substructure', 'Dynamic Grid'],
  },

  // ZONE 5: RIGHT WOODEN BRIDGE & SORTING MEADOW (Level 3: Sorting)
  {
    id: 'm14-bubble-sort',
    title: 'Bubble Sort at the Right Bridge',
    shortDescription: 'Gently float taller blooms to the top by repeatedly comparing adjacent neighbors.',
    algorithmId: 'bubble-sort',
    difficulty: 'Beginner',
    durationMinutes: 8,
    xpReward: 55,
    flowerType: 'tulip',
    level: 3,
    levelBadge: 'Sorting',
    zoneName: 'The Right Bridge Pier',
    x: 615,
    y: 585,
    storybookLore: 'Blossoms trade places with their neighbors until ascending order ripples across the waterway.',
    concepts: ['Adjacent Swaps', 'Pass Optimization', 'Inner & Outer Loops', 'Quadratic O(n²)'],
  },
  {
    id: 'm15-insertion-sort',
    title: 'Insertion Sort Bouquet Bridge',
    shortDescription: 'Slide each freshly cut stem into its rightful place within an existing hand-tied bouquet.',
    algorithmId: 'insertion-sort',
    difficulty: 'Beginner',
    durationMinutes: 9,
    xpReward: 60,
    flowerType: 'tulip',
    level: 3,
    levelBadge: 'Sorting',
    zoneName: 'The Right Wooden Bridge',
    x: 655,
    y: 645,
    storybookLore: 'Arranging stems along the wooden planks, inserting each into its perfect sorted location.',
    concepts: ['Incremental Construction', 'Shift vs Swap', 'Adaptive for Nearly Sorted', 'Stable Sort'],
  },
  {
    id: 'm16-selection-sort',
    title: 'Selection Sort Meadow Landing',
    shortDescription: 'Scan the entire field to find the absolute smallest bud, placing it at the front of the trail.',
    algorithmId: 'selection-sort',
    difficulty: 'Beginner',
    durationMinutes: 8,
    xpReward: 55,
    flowerType: 'tulip',
    level: 3,
    levelBadge: 'Sorting',
    zoneName: 'The Right Bridgehead',
    x: 710,
    y: 720,
    storybookLore: 'With patient eyes, the gardener scans the meadow for the smallest flower and transplants it.',
    concepts: ['Minimum Selection', 'Array Partitioning', 'Unstable Swapping', 'O(n²) Comparisons'],
  },
  {
    id: 'm17-merge-sort',
    title: 'Merge Sort Twin Canal Crossing',
    shortDescription: 'Divide flower beds in half recursively, then weave the sorted halves back together seamlessly.',
    algorithmId: 'merge-sort',
    difficulty: 'Intermediate',
    durationMinutes: 14,
    xpReward: 80,
    flowerType: 'tulip',
    level: 3,
    levelBadge: 'Sorting',
    zoneName: 'The Lower Canal Curve',
    x: 570,
    y: 840,
    storybookLore: 'Twin streams flow side by side, merging cleanly into one grand waterway without disruption.',
    concepts: ['Recursive Splitting', 'Merge Subroutine', 'Guaranteed O(n log n)', 'Auxiliary Memory'],
  },
  {
    id: 'm18-quick-sort',
    title: 'Quick Sort Pivot Flower Crossing',
    shortDescription: 'Select a pivot flower: stream smaller petals left, grander petals right, and sort the world.',
    algorithmId: 'quick-sort',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    xpReward: 85,
    flowerType: 'tulip',
    level: 3,
    levelBadge: 'Sorting',
    zoneName: 'The Right Blossom Trail',
    x: 820,
    y: 600,
    storybookLore: 'A bustling fork in the stone path where blossoms partition around the chosen pivot stem.',
    concepts: ['Pivot Selection', 'In-Place Partitioning', 'Recursive Sub-arrays', 'Average O(n log n)'],
  },
  {
    id: 'm19-heap-sort',
    title: 'Heap Sort Meadow Plantation',
    shortDescription: 'Organize blossoms into a binary max-heap in place, repeatedly extracting the grandest bloom.',
    algorithmId: 'quick-sort',
    difficulty: 'Intermediate',
    durationMinutes: 14,
    xpReward: 80,
    flowerType: 'sunflower',
    level: 3,
    levelBadge: 'Sorting',
    zoneName: 'The Right Terraced Plots',
    x: 885,
    y: 450,
    storybookLore: 'Ordered grid of flower beds arranged like a heap tree, extracting the top bloom in O(log n) time.',
    concepts: ['Binary Heap', 'Heapify Subroutine', 'In-Place O(1) Space', 'Guaranteed O(n log n)'],
  },

  // ZONE 6: UPPER RIGHT CANOPIES (Level 5 & 7: Recursion & Trees)
  {
    id: 'm20-bst',
    title: 'Binary Search Treehouse Canopy',
    shortDescription: 'Navigate high treehouse branches where smaller keys branch left and greater treasures climb right.',
    algorithmId: 'bst',
    difficulty: 'Intermediate',
    durationMinutes: 13,
    xpReward: 85,
    flowerType: 'orchid',
    level: 7,
    levelBadge: 'Trees',
    zoneName: 'The Upper Treehouse Walk',
    x: 920,
    y: 280,
    storybookLore: 'Walking the high canopy walkway: left rope bridges lead to smaller keys, right bridges climb higher.',
    concepts: ['BST Invariant', 'In-Order Traversal', 'Search, Insert & Delete', 'Balanced Heights'],
  },
  {
    id: 'm21-tree-traversals',
    title: 'Tree Traversals in the Cherry Blossoms',
    shortDescription: 'Harvest blossoms in Pre-Order, In-Order, and Post-Order across the pink canopy trees.',
    algorithmId: 'bst',
    difficulty: 'Intermediate',
    durationMinutes: 12,
    xpReward: 75,
    flowerType: 'orchid',
    level: 7,
    levelBadge: 'Trees',
    zoneName: 'The Cherry Blossom Canopies',
    x: 890,
    y: 150,
    storybookLore: 'Three walking tours through the cherry blossoms, each producing a unique sequence of petals.',
    concepts: ['Depth-First Tree Walking', 'Sorted Output from BST', 'Expression Evaluation', 'Recursive Traversal'],
  },

  // ZONE 7: THE GRAND SHRINE PAVILION (Level 4 & 14: Complexity & Grand Mastery)
  {
    id: 'm22-big-o',
    title: 'The Grand Pavilion Steps: Complexity (Big O)',
    shortDescription: 'Measure how algorithmic efficiency scales as your data garden expands from seeds to infinite meadows.',
    algorithmId: 'big-o',
    difficulty: 'Beginner',
    durationMinutes: 10,
    xpReward: 65,
    flowerType: 'rose',
    level: 4,
    levelBadge: 'Analysis',
    zoneName: 'The Pavilion Marble Stairs',
    x: 500,
    y: 380,
    storybookLore: 'Standing on the broad marble steps leading up to the sacred shrine, charting the laws of asymptotic growth.',
    concepts: ['Big O Upper Bounds', 'Omega & Theta', 'Time-Space Tradeoffs', 'Growth Hierarchy'],
  },
  {
    id: 'm23-grand-mastery',
    title: 'The Algorithmic Shrine of Grand Mastery',
    shortDescription: 'The crowning sanctuary of AlgoBloom. Celebrate complete algorithmic thinking and blooming confidence.',
    algorithmId: 'dijkstra',
    difficulty: 'Advanced',
    durationMinutes: 15,
    xpReward: 150,
    flowerType: 'rose',
    level: 14,
    levelBadge: 'Grand Master',
    zoneName: 'The Sacred Pavilion Shrine',
    x: 505,
    y: 270,
    storybookLore: 'Atop the shrine under clouds of pink cherry blossoms and glowing mist: you have mastered algorithms!',
    concepts: ['Algorithmic Synthesis', 'Problem Recognition', 'Lifetime Confidence', 'Bloom Master Crown'],
  },
];

interface Props {
  progress: UserProgress;
  onSelectLesson: (algorithmId: string) => void;
}

export const IllustratedGardenMap: React.FC<Props> = ({ progress, onSelectLesson }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<MapMilestone | null>(null);
  const [hoveredMilestone, setHoveredMilestone] = useState<MapMilestone | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(true);

  // Determine current active milestone index (first uncompleted)
  const activeMilestoneIndex = MAP_MILESTONES.findIndex(
    (m) => !progress.completedLessons.includes(m.algorithmId)
  );
  const currentMilestone = activeMilestoneIndex >= 0 ? MAP_MILESTONES[activeMilestoneIndex] : MAP_MILESTONES[0];

  const getMilestoneStatus = (milestone: MapMilestone): 'not-started' | 'in-progress' | 'completed' | 'mastered' => {
    if (progress.masteredAlgorithms.includes(milestone.algorithmId)) {
      return 'mastered';
    }
    if (progress.completedLessons.includes(milestone.algorithmId)) {
      return 'completed';
    }
    const plant = progress.gardenPlants.find((p) => p.algorithmId === milestone.algorithmId);
    if (plant && (plant.stage === 'sprout' || plant.stage === 'bloomed')) {
      return plant.stage === 'bloomed' ? 'completed' : 'in-progress';
    }
    return 'not-started';
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg bg-[#A6DA80] select-none">
      {/* Top Map Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Map Zone Quick-Jump Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 backdrop-blur-md border border-garden-cardborder shadow-sm overflow-x-auto max-w-[80vw] scrollbar-none">
          {[
            { label: 'Gate Entrance', x: 350, y: 885, icon: '🌸' },
            { label: 'Left Terraces', x: 130, y: 440, icon: '🪜' },
            { label: 'Left Bridge', x: 360, y: 645, icon: '🌉' },
            { label: 'Island Pond', x: 480, y: 535, icon: '🪷' },
            { label: 'Right Bridge', x: 655, y: 645, icon: '🌉' },
            { label: 'Right Meadows', x: 820, y: 600, icon: '🌾' },
            { label: 'Cherry Trees', x: 890, y: 150, icon: '🌳' },
            { label: 'Master Shrine', x: 505, y: 270, icon: '⛩️' },
          ].map((zone, idx) => (
            <button
              key={idx}
              onClick={() => {
                const target = MAP_MILESTONES.find((m) => Math.abs(m.x - zone.x) < 50 && Math.abs(m.y - zone.y) < 50);
                if (target) setSelectedMilestone(target);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap text-garden-secondary hover:text-garden-text hover:bg-white/60 transition-all flex items-center gap-1.5"
            >
              <span>{zone.icon}</span>
              <span>{zone.label}</span>
            </button>
          ))}
        </div>

        {/* Zoom & Particle Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 backdrop-blur-md border border-garden-cardborder shadow-sm">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
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
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-garden-secondary hover:text-garden-text rounded-lg hover:bg-white/60 transition-colors"
              title="Reset Zoom"
              aria-label="Reset zoom"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <button
            onClick={() => setParticlesEnabled(!particlesEnabled)}
            className="p-2 rounded-2xl bg-white/85 dark:bg-garden-darkcard/85 backdrop-blur-md border border-garden-cardborder text-garden-secondary hover:text-garden-text shadow-sm text-xs font-bold"
            title="Toggle cherry blossom drift"
          >
            {particlesEnabled ? '🌸 Petals On' : '🌸 Petals Off'}
          </button>
        </div>
      </div>

      {/* Main Map Container with High-Res Reference Painting */}
      <div className="relative w-full overflow-hidden">
        <div
          className="relative w-full transition-transform duration-500 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Base Reference Watercolor Painting (993x881) */}
          <img
            src="/garden-map.jpg"
            alt="AlgoBloom Storybook Garden Map"
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Precision SVG Interactive Overlay Layer (viewBox matching 993x881) */}
          <svg
            viewBox="0 0 993 881"
            className="absolute inset-0 w-full h-full pointer-events-auto"
            preserveAspectRatio="none"
          >
            {/* Soft Water Ripples in Central River & Pool */}
            {particlesEnabled && (
              <g className="pointer-events-none">
                {/* Central bottom pool ripple */}
                <ellipse cx="490" cy="855" rx="35" ry="14" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.45" className="animate-ping" style={{ animationDuration: '3s' }} />
                <ellipse cx="490" cy="855" rx="55" ry="22" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.3" className="animate-ping" style={{ animationDuration: '4.5s' }} />

                {/* Left river ripple */}
                <ellipse cx="300" cy="790" rx="25" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.35" className="animate-ping" style={{ animationDuration: '3.8s' }} />

                {/* Right river ripple */}
                <ellipse cx="730" cy="790" rx="25" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.35" className="animate-ping" style={{ animationDuration: '4.2s' }} />

                {/* Island river split ripple */}
                <ellipse cx="500" cy="670" rx="30" ry="12" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.35" className="animate-ping" style={{ animationDuration: '3.5s' }} />
              </g>
            )}

            {/* Drifting Pink Cherry Blossom Petals from Top Canopy */}
            {particlesEnabled && (
              <g className="pointer-events-none">
                {[
                  { x: 380, y: 180, s: 0.9, d: '0s' },
                  { x: 440, y: 260, s: 1.1, d: '1.2s' },
                  { x: 560, y: 220, s: 0.8, d: '0.6s' },
                  { x: 620, y: 310, s: 1.2, d: '2.1s' },
                  { x: 490, y: 410, s: 0.9, d: '1.8s' },
                  { x: 360, y: 550, s: 1.0, d: '0.9s' },
                  { x: 680, y: 560, s: 0.85, d: '2.5s' },
                ].map((p, i) => (
                  <ellipse
                    key={`petal-${i}`}
                    cx={p.x}
                    cy={p.y}
                    rx={5 * p.s}
                    ry={3 * p.s}
                    fill="#FFAEBE"
                    opacity="0.8"
                    className="animate-float"
                    style={{ animationDelay: p.d, animationDuration: '4s' }}
                  />
                ))}

                {/* Floating Butterflies */}
                <g className="animate-float" style={{ transformOrigin: '220px 650px', animationDuration: '5s' }}>
                  <ellipse cx="218" cy="648" rx="4.5" ry="3" fill="#F1B4B1" opacity="0.9" />
                  <ellipse cx="224" cy="648" rx="4.5" ry="3" fill="#F1B4B1" opacity="0.9" />
                  <circle cx="221" cy="649" r="1.5" fill="#403746" />
                </g>
                <g className="animate-float" style={{ transformOrigin: '760px 620px', animationDuration: '6s', animationDelay: '1.5s' }}>
                  <ellipse cx="758" cy="618" rx="4.5" ry="3" fill="#FFE0AF" opacity="0.95" />
                  <ellipse cx="764" cy="618" rx="4.5" ry="3" fill="#FFE0AF" opacity="0.95" />
                  <circle cx="761" cy="619" r="1.5" fill="#403746" />
                </g>
              </g>
            )}

            {/* Player Avatar Position Marker (The Cute Winged Emblem from Reference) */}
            <g
              className="pointer-events-none animate-float"
              style={{
                transformOrigin: `${currentMilestone.x}px ${currentMilestone.y - 32}px`,
                animationDuration: '2.5s',
              }}
            >
              {/* Pulsing Target Halo */}
              <circle
                cx={currentMilestone.x}
                cy={currentMilestone.y}
                r="26"
                fill="#F1B4B1"
                opacity="0.35"
                className="animate-ping"
                style={{ animationDuration: '2s' }}
              />

              {/* White & Pink Winged Emblem Badge (Matching Image Reference Emblem) */}
              <g transform={`translate(${currentMilestone.x - 24}, ${currentMilestone.y - 50})`}>
                {/* Glow Backdrop */}
                <circle cx="24" cy="24" r="22" fill="#FFFFFF" opacity="0.9" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.25))" />
                {/* Winged Outer Disc */}
                <circle cx="24" cy="24" r="18" fill="#F1B4B1" stroke="#DC6C66" strokeWidth="2.5" />
                {/* Wing details */}
                <path d="M 12,24 C 8,16 16,12 24,18 C 32,12 40,16 36,24 C 32,32 16,32 12,24 Z" fill="#FFFFFF" />
                {/* Center Cherry Blossom */}
                <circle cx="24" cy="22" r="5" fill="#DC6C66" />
                <circle cx="24" cy="22" r="2" fill="#FFE0AF" />
              </g>
            </g>

            {/* Interactive Botanical Milestone Markers (Pinpoint coordinates on reference map paths) */}
            {MAP_MILESTONES.map((milestone, idx) => {
              const status = getMilestoneStatus(milestone);
              const isHovered = hoveredMilestone?.id === milestone.id;
              const isSelected = selectedMilestone?.id === milestone.id;
              const isCurrent = currentMilestone.id === milestone.id;

              return (
                <g
                  key={milestone.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedMilestone(milestone)}
                  onMouseEnter={() => setHoveredMilestone(milestone)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${milestone.title} - ${status}`}
                >
                  {/* Outer Pulsing Glow */}
                  <circle
                    cx={milestone.x}
                    cy={milestone.y}
                    r={isHovered || isSelected ? 24 : 18}
                    fill={
                      status === 'mastered'
                        ? '#FFE0AF'
                        : status === 'completed'
                        ? '#F1B4B1'
                        : status === 'in-progress'
                        ? '#939F7F'
                        : '#FFFFFF'
                    }
                    opacity={isHovered ? 0.75 : 0.4}
                    className="transition-all duration-300"
                  />

                  {/* Stepping Stone Disc */}
                  <circle
                    cx={milestone.x}
                    cy={milestone.y}
                    r={isHovered ? 17 : 14}
                    fill={
                      status === 'mastered'
                        ? '#FFE0AF'
                        : status === 'completed'
                        ? '#F1B4B1'
                        : status === 'in-progress'
                        ? '#A6DA80'
                        : '#FFFFFF'
                    }
                    stroke={
                      status === 'mastered'
                        ? '#D4A853'
                        : status === 'completed'
                        ? '#DC6C66'
                        : status === 'in-progress'
                        ? '#5E8F3C'
                        : '#A89E84'
                    }
                    strokeWidth={isCurrent ? '3.5' : '2.5'}
                    className="transition-all duration-300 drop-shadow-md"
                  />

                  {/* Center Flower / Sprout / Seed Emoji */}
                  <text
                    x={milestone.x}
                    y={milestone.y + 4.5}
                    textAnchor="middle"
                    fontSize={isHovered ? '13' : '11'}
                    className="transition-all duration-200 select-none pointer-events-none font-bold"
                  >
                    {status === 'mastered' ? '🌸' : status === 'completed' ? '🌷' : status === 'in-progress' ? '🌱' : '🌰'}
                  </text>

                  {/* Floating Title Plaque on Hover */}
                  {isHovered && (
                    <g className="animate-fadeIn pointer-events-none">
                      <rect
                        x={milestone.x - 85}
                        y={milestone.y - 48}
                        width="170"
                        height="28"
                        rx="14"
                        fill="#FFFFFF"
                        stroke="#A6DA80"
                        strokeWidth="2"
                        className="shadow-xl"
                      />
                      <text
                        x={milestone.x}
                        y={milestone.y - 30}
                        textAnchor="middle"
                        fill="#1B2B1D"
                        fontSize="11"
                        fontWeight="700"
                        className="font-heading"
                      >
                        {milestone.title.length > 22 ? milestone.title.slice(0, 20) + '...' : milestone.title}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Floating Storybook Landmark Parchment Modal */}
      {selectedMilestone && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedMilestone(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#FDFBF7] dark:bg-[#1E2520] border-2 border-[#D8CABA] dark:border-[#2E3A32] shadow-2xl relative flex flex-col gap-5 overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: 'radial-gradient(rgba(147, 159, 127, 0.12) 1.5px, transparent 1.5px)',
              backgroundSize: '22px 22px',
            }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-garden-cardborder pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-buttercream via-dustyrose to-softmauve flex items-center justify-center text-3xl shadow-sm shrink-0">
                  {getMilestoneStatus(selectedMilestone) === 'mastered'
                    ? '✨🌸'
                    : getMilestoneStatus(selectedMilestone) === 'completed'
                    ? '🌷'
                    : getMilestoneStatus(selectedMilestone) === 'in-progress'
                    ? '🌱'
                    : '🌰'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-mistylavender/40 text-[10px] font-bold uppercase tracking-wider text-garden-text dark:text-garden-darktext">
                      {selectedMilestone.zoneName}
                    </span>
                    <span className="text-[10px] font-bold text-garden-secondary">
                      {selectedMilestone.levelBadge}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-garden-text dark:text-garden-darktext tracking-tight mt-1">
                    {selectedMilestone.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedMilestone(null)}
                className="p-1.5 rounded-full hover:bg-garden-cardborder/40 text-garden-secondary hover:text-garden-text transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-garden-secondary leading-relaxed">
              {selectedMilestone.shortDescription}
            </p>

            {/* Storybook Lore Passage */}
            <div className="p-4 rounded-2xl bg-[#F6EFE2] dark:bg-[#161D18] border border-[#E5DAC9] dark:border-[#2E3A32] text-xs sm:text-sm text-[#4E443B] dark:text-[#D5E2D4] leading-relaxed italic font-serif">
              "{selectedMilestone.storybookLore}"
            </div>

            {/* Metadata Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder text-center">
                <span className="text-[10px] font-bold text-garden-secondary uppercase block">
                  Difficulty
                </span>
                <span className="font-bold text-xs text-garden-text dark:text-garden-darktext mt-0.5 block">
                  {selectedMilestone.difficulty}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder text-center">
                <span className="text-[10px] font-bold text-garden-secondary uppercase block flex items-center justify-center gap-1">
                  <Clock size={11} /> Duration
                </span>
                <span className="font-bold text-xs text-garden-text dark:text-garden-darktext mt-0.5 block">
                  ~{selectedMilestone.durationMinutes} mins
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder text-center">
                <span className="text-[10px] font-bold text-garden-secondary uppercase block flex items-center justify-center gap-1">
                  <Sparkles size={11} className="text-amber-500" /> Reward
                </span>
                <span className="font-bold text-xs text-dustyrose-600 dark:text-dustyrose-400 mt-0.5 block">
                  +{selectedMilestone.xpReward} XP
                </span>
              </div>
            </div>

            {/* Concepts Cultivated */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-garden-secondary block mb-1.5">
                Key Concepts Cultivated
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMilestone.concepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-garden-darkcard border border-garden-cardborder text-[11px] font-medium text-garden-text dark:text-garden-darktext"
                  >
                    🌿 {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-garden-cardborder flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {getMilestoneStatus(selectedMilestone) === 'mastered'
                    ? '✨🌸'
                    : getMilestoneStatus(selectedMilestone) === 'completed'
                    ? '🌷'
                    : getMilestoneStatus(selectedMilestone) === 'in-progress'
                    ? '🌱'
                    : '🌰'}
                </span>
                <div>
                  <span className="text-xs font-bold block text-garden-text dark:text-garden-darktext">
                    {getMilestoneStatus(selectedMilestone) === 'mastered'
                      ? 'Fully Bloomed & Mastered'
                      : getMilestoneStatus(selectedMilestone) === 'completed'
                      ? 'Completed & Flourishing'
                      : getMilestoneStatus(selectedMilestone) === 'in-progress'
                      ? 'Sprouting in Soil'
                      : 'Untouched Landmark'}
                  </span>
                  <span className="text-[10px] text-sagegreen font-semibold">
                    +{selectedMilestone.xpReward} Garden XP
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectLesson(selectedMilestone.algorithmId);
                  setSelectedMilestone(null);
                }}
                className="px-6 py-3 rounded-2xl bg-dustyrose hover:bg-dustyrose-400 text-garden-text font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play size={15} className="fill-garden-text" />
                <span>
                  {getMilestoneStatus(selectedMilestone) === 'mastered' ||
                  getMilestoneStatus(selectedMilestone) === 'completed'
                    ? 'Review Lesson 🌸'
                    : 'Start Learning 🌸'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend & Instructions Footer Strip */}
      <div className="p-3.5 bg-white/80 dark:bg-garden-darkcard/80 backdrop-blur-md border-t border-garden-cardborder flex flex-wrap items-center justify-between text-xs text-garden-secondary px-6">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 font-semibold">
            <span>🌸</span> Mastered Flower
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <span>🌷</span> Completed Lesson
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <span>🌱</span> Sprouting In Progress
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <span>🌰</span> Closed Seed
          </span>
        </div>
        <div className="flex items-center gap-2 font-bold text-dustyrose-600 dark:text-dustyrose-400">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-dustyrose animate-pulse" />
          <span>Click any stepping stone or bridge milestone to start learning</span>
        </div>
      </div>
    </div>
  );
};
