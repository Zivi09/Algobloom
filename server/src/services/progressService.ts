import { db } from '../db/index.js';
import {
  PlantStage,
  UserProgress,
  UserProgressGardenPlant,
  UserProgressRevisionItem,
  UserSettings,
} from '../types/index.js';

export class ProgressService {
  public static getUserProgress(userId: string): UserProgress {
    const profile = db.findProfileByUserId(userId);
    if (!profile) {
      throw new Error(`Profile not found for user ${userId}`);
    }

    const lessons = db.getLessonProgress(userId);
    const plants = db.getUserPlants(userId);
    const bookmarks = db.getBookmarks(userId);
    const revisions = db.getRevisionItems(userId);
    const achievements = db.getUserAchievements(userId);

    const completedLessons = lessons
      .filter((l) => l.status === 'completed' || l.status === 'mastered')
      .map((l) => l.lesson_id);

    const masteredAlgorithms = lessons
      .filter((l) => l.best_score >= 5 || l.status === 'mastered')
      .map((l) => l.lesson_id);

    const quizScores: Record<string, number> = {};
    for (const l of lessons) {
      quizScores[l.lesson_id] = l.best_score;
    }

    const gardenPlants: UserProgressGardenPlant[] = plants.map((p) => ({
      id: p.id,
      algorithmId: p.algorithm_id,
      name: p.plant_name,
      stage: p.stage,
      flowerType: p.flower_type,
      plantedAt: p.planted_at,
      bloomedAt: p.bloomed_at || undefined,
    }));

    const revisionQueue: UserProgressRevisionItem[] = revisions.map((r) => ({
      lessonId: r.lesson_id,
      algorithmTitle: r.algorithm_title,
      reason: r.reason,
      dateAdded: r.added_at,
      incorrectQuestions: r.incorrect_questions,
    }));

    // Derive unlocked levels (levels 0, 1, 2, 3 default, unlock up to 14 based on completions)
    const baseLevels = [0, 1, 2, 3];
    const unlockedLevels = Array.from(
      new Set([...baseLevels, Math.min(14, Math.floor(completedLessons.length / 2) + 3)])
    ).sort((a, b) => a - b);

    return {
      name: profile.display_name,
      xp: profile.total_xp,
      streak: profile.current_streak,
      lastActiveDate: profile.last_active_date,
      completedLessons,
      masteredAlgorithms,
      quizScores,
      bookmarks: bookmarks.map((b) => b.algorithm_id),
      revisionQueue,
      unlockedLevels,
      dailyChallengeCompletedDates: [],
      achievements: achievements.map((a) => a.achievement_id),
      gardenPlants,
      settings: profile.settings,
    };
  }

  public static mergeGuestProgress(
    userId: string,
    guest: Partial<UserProgress>
  ): UserProgress {
    const profile = db.findProfileByUserId(userId);
    if (!profile) {
      throw new Error(`Profile not found for user ${userId}`);
    }

    const now = new Date().toISOString();
    const today = now.split('T')[0];

    // 1. Merge XP & streak
    const guestXp = typeof guest.xp === 'number' ? Math.max(0, guest.xp) : 0;
    const newTotalXp = Math.max(profile.total_xp, profile.total_xp + guestXp);
    const newStreak = Math.max(profile.current_streak, guest.streak || 0);

    // 2. Merge Settings
    const newSettings: UserSettings = {
      ...profile.settings,
      ...(guest.settings || {}),
    };

    db.updateProfile(userId, {
      total_xp: newTotalXp,
      current_streak: newStreak,
      last_active_date: today,
      settings: newSettings,
    });

    // 3. Merge Completed Lessons and Quiz Scores
    if (guest.quizScores) {
      for (const [lessonId, score] of Object.entries(guest.quizScores)) {
        const existing = db.findLessonProgress(userId, lessonId);
        const bestScore = existing ? Math.max(existing.best_score, score) : score;
        const status = bestScore >= 5 ? 'mastered' : bestScore >= 4 ? 'completed' : 'in_progress';
        db.upsertLessonProgress(userId, lessonId, {
          best_score: bestScore,
          status,
          completed_at: status !== 'in_progress' ? now : null,
        });
      }
    }

    if (Array.isArray(guest.completedLessons)) {
      for (const lessonId of guest.completedLessons) {
        const existing = db.findLessonProgress(userId, lessonId);
        if (!existing) {
          db.upsertLessonProgress(userId, lessonId, {
            status: 'completed',
            best_score: 4,
            completed_at: now,
          });
        }
      }
    }

    // 4. Merge Garden Plants
    if (Array.isArray(guest.gardenPlants)) {
      for (const plant of guest.gardenPlants) {
        if (!plant.algorithmId) continue;
        const existing = db.findUserPlant(userId, plant.algorithmId);
        if (!existing) {
          db.upsertUserPlant(userId, plant.algorithmId, {
            plant_name: plant.name || `${plant.algorithmId} Blossom`,
            stage: plant.stage || 'sprout',
            flower_type: plant.flowerType || 'daisy',
            planted_at: plant.plantedAt || now,
            bloomed_at: plant.bloomedAt || (plant.stage === 'bloomed' ? now : null),
          });
        } else if (plant.stage === 'bloomed' && existing.stage !== 'bloomed') {
          db.upsertUserPlant(userId, plant.algorithmId, {
            stage: 'bloomed',
            bloomed_at: now,
          });
        }
      }
    }

    // 5. Merge Bookmarks
    if (Array.isArray(guest.bookmarks)) {
      const existingBookmarks = new Set(db.getBookmarks(userId).map((b) => b.algorithm_id));
      for (const algId of guest.bookmarks) {
        if (!existingBookmarks.has(algId)) {
          db.toggleBookmark(userId, algId);
        }
      }
    }

    // 6. Merge Achievements
    if (Array.isArray(guest.achievements)) {
      for (const achId of guest.achievements) {
        db.addAchievement(userId, achId);
      }
    }

    // Check for any newly earned achievements after merging
    this.evaluateAchievements(userId);

    return this.getUserProgress(userId);
  }

  public static plantSeed(
    userId: string,
    algorithmId: string,
    flowerType: string = 'daisy',
    plantName?: string
  ): UserProgressGardenPlant {
    const existing = db.findUserPlant(userId, algorithmId);
    if (existing) {
      return {
        id: existing.id,
        algorithmId: existing.algorithm_id,
        name: existing.plant_name,
        stage: existing.stage,
        flowerType: existing.flower_type,
        plantedAt: existing.planted_at,
        bloomedAt: existing.bloomed_at || undefined,
      };
    }

    const created = db.upsertUserPlant(userId, algorithmId, {
      flower_type: flowerType,
      plant_name: plantName || `${algorithmId.replace(/-/g, ' ')} Seedling`,
      stage: 'seed',
      planted_at: new Date().toISOString(),
    });

    return {
      id: created.id,
      algorithmId: created.algorithm_id,
      name: created.plant_name,
      stage: created.stage,
      flowerType: created.flower_type,
      plantedAt: created.planted_at,
      bloomedAt: created.bloomed_at || undefined,
    };
  }

  public static updateSettings(
    userId: string,
    settings: Partial<UserSettings>
  ): UserSettings {
    const profile = db.findProfileByUserId(userId);
    if (!profile) throw new Error('User not found');

    const updatedSettings: UserSettings = {
      ...profile.settings,
      ...settings,
    };

    db.updateProfile(userId, { settings: updatedSettings });
    return updatedSettings;
  }

  public static evaluateAchievements(userId: string): string[] {
    const progress = this.getUserProgress(userId);
    const unlockedNow: string[] = [];
    const currentUnlocked = new Set(progress.achievements);

    const checkAndAward = (achId: string, condition: boolean) => {
      if (condition && !currentUnlocked.has(achId)) {
        db.addAchievement(userId, achId);
        unlockedNow.push(achId);
      }
    };

    // 1. Sprout's First Step
    checkAndAward('sprout-first-step', progress.completedLessons.length >= 1);

    // 2. Binary Blossom
    checkAndAward(
      'binary-blossom',
      progress.masteredAlgorithms.includes('binary-search')
    );

    // 3. Sorting Gardener
    const sorts = ['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'];
    const completedSorts = sorts.filter((s) => progress.completedLessons.includes(s));
    checkAndAward('sorting-gardener', completedSorts.length >= 3);

    // 4. Graph Botanist
    checkAndAward(
      'graph-botanist',
      progress.completedLessons.includes('breadth-first-search') ||
        progress.completedLessons.includes('depth-first-search')
    );

    // 5. Golden Pathfinder
    checkAndAward(
      'pathfinder-sage',
      progress.masteredAlgorithms.includes('dijkstra')
    );

    // 6. Dynamic Flora
    checkAndAward(
      'dynamic-flora',
      progress.completedLessons.includes('dp-fibonacci')
    );

    // 7. Bouquet of Five
    const bloomedCount = progress.gardenPlants.filter((p) => p.stage === 'bloomed').length;
    checkAndAward('garden-of-five', bloomedCount >= 5);

    // 8. Sunlight Streak
    checkAndAward('streak-bloomer', progress.streak >= 3);

    return unlockedNow;
  }
}
