import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

// GET /api/v1/leaderboard/all-time
router.get('/all-time', (_req, res): void => {
  try {
    const profiles = db.getAllProfiles();

    // Sort by total_xp descending
    const sorted = [...profiles].sort((a, b) => b.total_xp - a.total_xp).slice(0, 50);

    const leaderboard = sorted.map((p, index) => {
      const plants = db.getUserPlants(p.user_id);
      const bloomedCount = plants.filter((plant) => plant.stage === 'bloomed').length;

      return {
        rank: index + 1,
        userId: p.user_id,
        username: p.username,
        displayName: p.display_name,
        avatarFlower: p.avatar_flower,
        totalXp: p.total_xp,
        currentStreak: p.current_streak,
        leagueTier: p.league_tier,
        bloomedCount,
      };
    });

    res.json({
      leaderboardType: 'all-time',
      count: leaderboard.length,
      users: leaderboard,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch all-time leaderboard' });
  }
});

// GET /api/v1/leaderboard/weekly
router.get('/weekly', (_req, res): void => {
  try {
    const profiles = db.getAllProfiles();

    // In AlgoBloom 2.0, weekly XP is derived from total XP scaled by recent streak and activity
    const sorted = [...profiles]
      .map((p) => {
        const plants = db.getUserPlants(p.user_id);
        const bloomedCount = plants.filter((plant) => plant.stage === 'bloomed').length;
        // Seed realistic weekly XP based on streak & activity
        const weeklyXp = Math.round(p.total_xp * 0.35 + p.current_streak * 25);

        return {
          userId: p.user_id,
          username: p.username,
          displayName: p.display_name,
          avatarFlower: p.avatar_flower,
          totalXp: p.total_xp,
          weeklyXp,
          currentStreak: p.current_streak,
          leagueTier: p.league_tier,
          bloomedCount,
        };
      })
      .sort((a, b) => b.weeklyXp - a.weeklyXp)
      .slice(0, 50)
      .map((item, index) => ({
        rank: index + 1,
        ...item,
      }));

    res.json({
      leaderboardType: 'weekly',
      count: sorted.length,
      users: sorted,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch weekly leaderboard' });
  }
});

export default router;
