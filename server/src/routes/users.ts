import { Router, Response } from 'express';
import { db } from '../db/index.js';
import { optionalAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/v1/users/@:username
router.get('/@:username', (req, res): void => {
  try {
    const username = (req.params.username as string).toLowerCase();
    const profile = db.findProfileByUsername(username);

    if (!profile) {
      res.status(404).json({ error: `User "@${username}" not found` });
      return;
    }

    const user = db.findUserById(profile.user_id);
    const reactions = db.getReactionsForUser(profile.user_id);
    const plants = db.getUserPlants(profile.user_id);
    const achievements = db.getUserAchievements(profile.user_id);

    const reactionCounts = {
      blossom: reactions.filter((r) => r.reaction_type === 'blossom').length,
      bee: reactions.filter((r) => r.reaction_type === 'bee').length,
      water: reactions.filter((r) => r.reaction_type === 'water').length,
      total: reactions.length,
    };

    const bloomedCount = plants.filter((p) => p.stage === 'bloomed').length;

    res.json({
      username: profile.username,
      displayName: profile.display_name,
      bio: profile.bio,
      avatarFlower: profile.avatar_flower,
      totalXp: profile.total_xp,
      currentStreak: profile.current_streak,
      leagueTier: profile.league_tier,
      isGardenPublic: profile.is_garden_public,
      joinedAt: user?.created_at || profile.created_at,
      stats: {
        totalPlants: plants.length,
        bloomedCount,
        achievementsCount: achievements.length,
      },
      reactions: reactionCounts,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch user profile' });
  }
});

// GET /api/v1/users/@:username/garden
router.get('/@:username/garden', (req, res): void => {
  try {
    const username = (req.params.username as string).toLowerCase();
    const profile = db.findProfileByUsername(username);

    if (!profile) {
      res.status(404).json({ error: `User "@${username}" not found` });
      return;
    }

    if (!profile.is_garden_public) {
      res.status(403).json({ error: 'This garden is private' });
      return;
    }

    const plants = db.getUserPlants(profile.user_id);
    const lessons = db.getLessonProgress(profile.user_id);
    const lessonScores: Record<string, number> = {};
    for (const l of lessons) {
      lessonScores[l.lesson_id] = l.best_score;
    }

    const garden = plants.map((p) => ({
      id: p.id,
      algorithmId: p.algorithm_id,
      plantName: p.plant_name,
      stage: p.stage,
      flowerType: p.flower_type,
      plantedAt: p.planted_at,
      bloomedAt: p.bloomed_at,
      bestScore: lessonScores[p.algorithm_id] || 0,
    }));

    res.json({
      owner: {
        username: profile.username,
        displayName: profile.display_name,
        avatarFlower: profile.avatar_flower,
        totalXp: profile.total_xp,
        currentStreak: profile.current_streak,
        leagueTier: profile.league_tier,
      },
      plantsCount: garden.length,
      bloomedCount: garden.filter((p) => p.stage === 'bloomed').length,
      plants: garden,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch user garden' });
  }
});

// POST /api/v1/users/@:username/react
router.post(
  '/@:username/react',
  optionalAuth,
  (req: AuthenticatedRequest, res: Response): void => {
    try {
      const username = (req.params.username as string).toLowerCase();
      const profile = db.findProfileByUsername(username);

      if (!profile) {
        res.status(404).json({ error: `User "@${username}" not found` });
        return;
      }

      const { reactionType } = req.body;
      const validTypes = ['blossom', 'bee', 'water'];

      if (!validTypes.includes(reactionType)) {
        res.status(400).json({ error: 'reactionType must be blossom, bee, or water' });
        return;
      }

      const giverId = req.user?.userId || 'guest-visitor';

      db.addReaction(giverId, profile.user_id, reactionType);

      const reactions = db.getReactionsForUser(profile.user_id);
      const reactionCounts = {
        blossom: reactions.filter((r) => r.reaction_type === 'blossom').length,
        bee: reactions.filter((r) => r.reaction_type === 'bee').length,
        water: reactions.filter((r) => r.reaction_type === 'water').length,
        total: reactions.length,
      };

      res.json({
        success: true,
        reactionType,
        reactions: reactionCounts,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to add reaction' });
    }
  }
);

export default router;
