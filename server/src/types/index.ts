export type Role = 'USER' | 'EDUCATOR' | 'ADMIN';

export type LeagueTier = 'SEEDLING' | 'SPROUT' | 'BUDDING' | 'BLOSSOM' | 'ANCIENT_GROVE';

export type PlantStage = 'seed' | 'sprout' | 'bud' | 'bloomed';

export type GuildRole = 'OWNER' | 'OFFICER' | 'MEMBER';

export type FlowerType =
  | 'rose'
  | 'lotus'
  | 'cherry-blossom'
  | 'sunflower'
  | 'lavender'
  | 'orchid'
  | 'tulip'
  | 'daisy';

export interface UserSettings {
  darkMode: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  soundEnabled: boolean;
  fontSize: 'normal' | 'large';
  buddyVisible: boolean;
}

export interface UserProgressGardenPlant {
  id: string;
  algorithmId: string;
  name: string;
  stage: PlantStage;
  flowerType: string;
  plantedAt: string;
  bloomedAt?: string;
}

export interface UserProgressRevisionItem {
  lessonId: string;
  algorithmTitle: string;
  reason: string;
  dateAdded: string;
  incorrectQuestions: string[];
}

export interface UserProgress {
  name: string;
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  masteredAlgorithms: string[];
  quizScores: Record<string, number>;
  bookmarks: string[];
  revisionQueue: UserProgressRevisionItem[];
  unlockedLevels: number[];
  dailyChallengeCompletedDates: string[];
  achievements: string[];
  gardenPlants: UserProgressGardenPlant[];
  settings: UserSettings;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  username: string;
  role: Role;
}
