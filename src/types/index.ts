export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type Category =
  | 'Foundations'
  | 'Data Structures'
  | 'Searching'
  | 'Sorting'
  | 'Complexity'
  | 'Recursion'
  | 'Trees'
  | 'Graphs'
  | 'Shortest Path'
  | 'Greedy'
  | 'Dynamic Programming'
  | 'Strings'
  | 'Advanced Graphs'
  | 'Advanced Techniques'
  | 'Advanced CS';

export interface CodeSnippets {
  python: string;
  javascript: string;
  cpp: string;
  java: string;
}

export interface ComplexityInfo {
  bestTime: string;
  bestReason: string;
  averageTime: string;
  averageReason: string;
  worstTime: string;
  worstReason: string;
  space: string;
  spaceReason: string;
  auxiliarySpace: string;
}

export interface TraceStep {
  step: number;
  description: string;
  // Array based states
  array?: number[];
  highlightedIndices?: number[];
  comparingIndices?: number[];
  swappedIndices?: number[];
  sortedIndices?: number[];
  pointers?: Record<string, number>;
  // Tree / Graph based states
  activeNodes?: string[];
  visitedNodes?: string[];
  currentEdge?: [string, string];
  pathEdges?: [string, string][];
  queue?: (string | number)[];
  stack?: (string | number)[];
  distances?: Record<string, number | string>;
  // DP states
  dpTable?: (number | string)[][];
  dpHeadersX?: string[];
  dpHeadersY?: string[];
  activeCell?: [number, number];
  calculatingCells?: [number, number][];
  // Common
  activeLine?: number;
  comparisonsCount?: number;
  swapsCount?: number;
  isComplete?: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'definition' | 'conceptual' | 'step-by-step' | 'practical' | 'complexity';
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  whyWrong?: string[];
  miniExample?: string;
}

export interface RelearnContent {
  conceptKey: string;
  simplifiedTitle: string;
  differentAnalogy: string;
  babySteps: string[];
  workedExample: string;
  miniPractice: QuizQuestion[];
  buddyEncouragement: string;
}

export interface AlgorithmLesson {
  id: string;
  title: string;
  tagline: string;
  difficulty: Difficulty;
  category: Category;
  level: number;
  estimatedMinutes: number;
  flowerType: 'rose' | 'lotus' | 'cherry-blossom' | 'sunflower' | 'lavender' | 'orchid' | 'tulip' | 'daisy';
  prerequisites: string[];
  objectives: string[];
  
  // Section 2: Simple explanation
  simpleExplanation: string;
  eli5: string;
  
  // Section 3: Why we need this
  whyNeeded: {
    problemSolved: string;
    historicalContext: string;
    alternatives: string[];
    whenToUse: string[];
    whenToAvoid: string[];
  };

  // Section 4: Real-life analogy
  realLifeAnalogy: {
    title: string;
    story: string;
    moral: string;
  };

  // Section 5: Step-by-step
  steps: {
    phase: string;
    description: string;
    details: string;
  }[];

  // Section 6 & 7: Visualization initial state and defaults
  defaultInput: number[] | Record<string, any>;
  
  // Section 8: Pseudocode
  pseudocode: {
    line: number;
    code: string;
    explanation: string;
  }[];

  // Section 9: Code
  code: CodeSnippets;

  // Section 10: Complexity
  complexity: ComplexityInfo;

  // Section 11: When to use
  whenToUsePractical: {
    scenario: string;
    reason: string;
    recommendation: string;
  }[];

  // Section 12: Common mistakes
  commonMistakes: {
    mistake: string;
    whyItHappens: string;
    howToFix: string;
  }[];

  // Section 13: 5 Questions
  quiz: QuizQuestion[];

  // Section 14: Recap
  recap: {
    takeaways: string[];
    keyTerms: { term: string; definition: string }[];
    finalChallengePrompt: string;
  };

  // Relearn Mode
  relearn: RelearnContent;
}

export interface LevelMetadata {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  topicsCount: number;
  algorithmsCount: number;
  iconName: string;
  gardenArea: string;
  color: string;
  topics: {
    id: string;
    title: string;
    isAlgorithm: boolean;
    algorithmId?: string;
    shortDescription: string;
  }[];
}

export interface UserProgress {
  name: string;
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[]; // lesson IDs
  masteredAlgorithms: string[]; // score 5/5
  quizScores: Record<string, number>; // lessonId -> best score out of 5
  bookmarks: string[];
  revisionQueue: {
    lessonId: string;
    algorithmTitle: string;
    reason: string;
    dateAdded: string;
    incorrectQuestions: string[];
  }[];
  unlockedLevels: number[];
  dailyChallengeCompletedDates: string[];
  achievements: string[];
  gardenPlants: {
    id: string;
    algorithmId: string;
    name: string;
    stage: 'seed' | 'sprout' | 'bud' | 'bloomed';
    flowerType: string;
    plantedAt: string;
    bloomedAt?: string;
  }[];
  settings: {
    darkMode: boolean;
    animationSpeed: 'slow' | 'normal' | 'fast';
    soundEnabled: boolean;
    fontSize: 'normal' | 'large';
    buddyVisible: boolean;
  };
}

export interface DailyChallenge {
  id: string;
  dateStr: string; // YYYY-MM-DD
  title: string;
  category: Category;
  difficulty: Difficulty;
  xpReward: number;
  scenario: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  flowerReward: string;
  xpReward: number;
  condition: (progress: UserProgress) => boolean;
}
