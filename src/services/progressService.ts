import { UserProgress, Achievement } from '../types';

const PROGRESS_KEY = 'algobloom_user_progress_v1';

export const INITIAL_PROGRESS: UserProgress = {
  name: 'Floral Learner',
  xp: 120,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['what-is-an-algorithm'],
  masteredAlgorithms: [],
  quizScores: {
    'what-is-an-algorithm': 5,
  },
  bookmarks: ['binary-search', 'dijkstra'],
  revisionQueue: [],
  unlockedLevels: [0, 1, 2, 3],
  dailyChallengeCompletedDates: [],
  achievements: ['sprout-first-step'],
  gardenPlants: [
    {
      id: 'plant-what-is-an-algorithm',
      algorithmId: 'what-is-an-algorithm',
      name: 'Algorithm Seedling',
      stage: 'bloomed',
      flowerType: 'daisy',
      plantedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      bloomedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'plant-linear-search',
      algorithmId: 'linear-search',
      name: 'Linear Seeker',
      stage: 'sprout',
      flowerType: 'daisy',
      plantedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  settings: {
    darkMode: false,
    animationSpeed: 'normal',
    soundEnabled: true,
    fontSize: 'normal',
    buddyVisible: true,
  },
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'sprout-first-step',
    title: 'Sprout’s First Step',
    description: 'Complete your very first lesson on AlgoBloom.',
    icon: '🌱',
    flowerReward: 'daisy',
    xpReward: 50,
    condition: (p) => p.completedLessons.length >= 1,
  },
  {
    id: 'binary-blossom',
    title: 'Binary Blossom',
    description: 'Master Binary Search with a flawless 5/5 quiz score.',
    icon: '🌸',
    flowerReward: 'cherry-blossom',
    xpReward: 100,
    condition: (p) => p.masteredAlgorithms.includes('binary-search'),
  },
  {
    id: 'sorting-gardener',
    title: 'Sorting Gardener',
    description: 'Complete any 3 sorting algorithm lessons.',
    icon: '🌷',
    flowerReward: 'tulip',
    xpReward: 150,
    condition: (p) => {
      const sorts = ['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'];
      return sorts.filter((s) => p.completedLessons.includes(s)).length >= 3;
    },
  },
  {
    id: 'graph-botanist',
    title: 'Graph Botanist',
    description: 'Traverse graph networks with BFS or DFS.',
    icon: '🪷',
    flowerReward: 'lotus',
    xpReward: 120,
    condition: (p) => p.completedLessons.includes('breadth-first-search') || p.completedLessons.includes('depth-first-search'),
  },
  {
    id: 'pathfinder-sage',
    title: 'Golden Pathfinder',
    description: 'Master Dijkstra’s shortest path algorithm.',
    icon: '🌻',
    flowerReward: 'sunflower',
    xpReward: 150,
    condition: (p) => p.masteredAlgorithms.includes('dijkstra'),
  },
  {
    id: 'dynamic-flora',
    title: 'Dynamic Flora',
    description: 'Unlock Dynamic Programming and remember past solutions.',
    icon: '🌺',
    flowerReward: 'orchid',
    xpReward: 150,
    condition: (p) => p.completedLessons.includes('dp-fibonacci'),
  },
  {
    id: 'garden-of-five',
    title: 'Bouquet of Five',
    description: 'Bloom at least 5 flowers in your Learning Garden.',
    icon: '💐',
    flowerReward: 'rose',
    xpReward: 200,
    condition: (p) => p.gardenPlants.filter((plant) => plant.stage === 'bloomed').length >= 5,
  },
  {
    id: 'streak-bloomer',
    title: 'Sunlight Streak',
    description: 'Maintain a 3-day continuous learning streak.',
    icon: '☀️',
    flowerReward: 'sunflower',
    xpReward: 100,
    condition: (p) => p.streak >= 3,
  },
];

export class ProgressService {
  private static instance: ProgressService;
  private currentProgress: UserProgress;

  private constructor() {
    this.currentProgress = this.loadFromStorage();
    this.updateStreak();
  }

  public static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  private loadFromStorage(): UserProgress {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...INITIAL_PROGRESS,
          ...parsed,
          settings: { ...INITIAL_PROGRESS.settings, ...(parsed.settings || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to parse localStorage progress, using defaults', e);
    }
    return { ...INITIAL_PROGRESS };
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(this.currentProgress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }

  private updateStreak(): void {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.currentProgress.lastActiveDate;

    if (lastActive === today) return;

    const lastDate = new Date(lastActive);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      this.currentProgress.streak += 1;
    } else if (diffDays > 1) {
      this.currentProgress.streak = 1;
    }

    this.currentProgress.lastActiveDate = today;
    this.checkAchievements();
    this.saveToStorage();
  }

  public getProgress(): UserProgress {
    return { ...this.currentProgress };
  }

  public addXp(amount: number): UserProgress {
    this.currentProgress.xp += amount;
    this.checkAchievements();
    this.saveToStorage();
    return this.getProgress();
  }

  public startLesson(lessonId: string, flowerType: string = 'rose'): UserProgress {
    // Plant a seed if not already present in garden
    const existing = this.currentProgress.gardenPlants.find((p) => p.algorithmId === lessonId);
    if (!existing) {
      this.currentProgress.gardenPlants.push({
        id: `plant-${lessonId}`,
        algorithmId: lessonId,
        name: lessonId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        stage: 'seed',
        flowerType,
        plantedAt: new Date().toISOString(),
      });
      this.saveToStorage();
    }
    return this.getProgress();
  }

  public recordQuizScore(
    lessonId: string,
    score: number,
    incorrectQuestions: string[] = [],
    flowerType: string = 'rose'
  ): {
    progress: UserProgress;
    isFirstMastery: boolean;
    earnedXp: number;
    newAchievements: Achievement[];
  } {
    const wasMastered = this.currentProgress.masteredAlgorithms.includes(lessonId);
    const prevBest = this.currentProgress.quizScores[lessonId] || 0;
    let earnedXp = 0;

    // Record highest score
    if (score > prevBest) {
      this.currentProgress.quizScores[lessonId] = score;
    }

    // Mark as completed if score >= 3
    if (score >= 3 && !this.currentProgress.completedLessons.includes(lessonId)) {
      this.currentProgress.completedLessons.push(lessonId);
      earnedXp += 50;
    }

    let isFirstMastery = false;
    // Mark as mastered if 5/5
    if (score === 5 && !wasMastered) {
      this.currentProgress.masteredAlgorithms.push(lessonId);
      isFirstMastery = true;
      earnedXp += 100;
    } else if (score >= 3) {
      earnedXp += 30;
    }

    this.currentProgress.xp += earnedXp;

    // Update garden plant
    let plant = this.currentProgress.gardenPlants.find((p) => p.algorithmId === lessonId);
    if (!plant) {
      plant = {
        id: `plant-${lessonId}`,
        algorithmId: lessonId,
        name: lessonId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        stage: score === 5 ? 'bloomed' : score >= 3 ? 'sprout' : 'seed',
        flowerType,
        plantedAt: new Date().toISOString(),
      };
      this.currentProgress.gardenPlants.push(plant);
    } else {
      if (score === 5) {
        plant.stage = 'bloomed';
        plant.bloomedAt = new Date().toISOString();
      } else if (score >= 3 && plant.stage === 'seed') {
        plant.stage = 'sprout';
      }
    }

    // Revision queue handling
    if (score < 4 && incorrectQuestions.length > 0) {
      const existingQueueItem = this.currentProgress.revisionQueue.find((r) => r.lessonId === lessonId);
      if (!existingQueueItem) {
        this.currentProgress.revisionQueue.push({
          lessonId,
          algorithmTitle: lessonId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          reason: `Scored ${score}/5 on quiz. Needs concept reinforcement.`,
          dateAdded: new Date().toISOString(),
          incorrectQuestions,
        });
      } else {
        existingQueueItem.incorrectQuestions = incorrectQuestions;
        existingQueueItem.reason = `Scored ${score}/5 on latest attempt.`;
      }
    } else if (score >= 4) {
      // Remove from revision queue if mastered/scored well
      this.currentProgress.revisionQueue = this.currentProgress.revisionQueue.filter((r) => r.lessonId !== lessonId);
    }

    const newAchievements = this.checkAchievements();
    this.saveToStorage();

    return {
      progress: this.getProgress(),
      isFirstMastery,
      earnedXp,
      newAchievements,
    };
  }

  public toggleBookmark(lessonId: string): boolean {
    const idx = this.currentProgress.bookmarks.indexOf(lessonId);
    let bookmarked = false;
    if (idx >= 0) {
      this.currentProgress.bookmarks.splice(idx, 1);
      bookmarked = false;
    } else {
      this.currentProgress.bookmarks.push(lessonId);
      bookmarked = true;
    }
    this.saveToStorage();
    return bookmarked;
  }

  public completeDailyChallenge(challengeId: string, xpReward: number): UserProgress {
    const today = new Date().toISOString().split('T')[0];
    if (!this.currentProgress.dailyChallengeCompletedDates.includes(today)) {
      this.currentProgress.dailyChallengeCompletedDates.push(today);
      this.currentProgress.xp += xpReward;
      this.saveToStorage();
    }
    return this.getProgress();
  }

  public updateSettings(partial: Partial<UserProgress['settings']>): UserProgress {
    this.currentProgress.settings = {
      ...this.currentProgress.settings,
      ...partial,
    };
    this.saveToStorage();
    return this.getProgress();
  }

  public checkAchievements(): Achievement[] {
    const newlyUnlocked: Achievement[] = [];
    for (const ach of ACHIEVEMENTS) {
      if (!this.currentProgress.achievements.includes(ach.id)) {
        if (ach.condition(this.currentProgress)) {
          this.currentProgress.achievements.push(ach.id);
          this.currentProgress.xp += ach.xpReward;
          newlyUnlocked.push(ach);
        }
      }
    }
    if (newlyUnlocked.length > 0) {
      this.saveToStorage();
    }
    return newlyUnlocked;
  }

  public resetProgress(): UserProgress {
    this.currentProgress = { ...INITIAL_PROGRESS };
    this.saveToStorage();
    return this.getProgress();
  }

  public exportJson(): string {
    return JSON.stringify(this.currentProgress, null, 2);
  }

  public importJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed.xp === 'number') {
        this.currentProgress = { ...INITIAL_PROGRESS, ...parsed };
        this.saveToStorage();
        return true;
      }
    } catch (e) {
      console.error('Invalid import json', e);
    }
    return false;
  }
}
