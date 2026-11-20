import { Router, Response } from 'express';
import { db } from '../db/index.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// GET /api/v1/guilds
router.get('/', (_req, res): void => {
  try {
    const guilds = db.getAllGuilds();

    const formatted = guilds.map((g) => {
      const members = db.getGuildMembers(g.id);
      const ownerProfile = db.findProfileByUserId(g.owner_id);

      return {
        id: g.id,
        name: g.name,
        motto: g.motto,
        bannerColor: g.banner_color,
        totalXp: g.total_xp,
        level: g.level,
        membersCount: members.length,
        owner: {
          userId: g.owner_id,
          username: ownerProfile?.username || 'unknown',
          displayName: ownerProfile?.display_name || 'Guild Founder',
        },
        createdAt: g.created_at,
      };
    });

    res.json({
      count: formatted.length,
      guilds: formatted,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch guilds' });
  }
});

// POST /api/v1/guilds
router.post('/', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  try {
    const userId = req.user!.userId;
    const { name, motto, bannerColor } = req.body;

    if (!name || name.trim().length < 3) {
      res.status(400).json({ error: 'Guild name must be at least 3 characters' });
      return;
    }

    const cleanName = name.trim();
    if (db.findGuildByName(cleanName)) {
      res.status(409).json({ error: 'A guild with this name already exists' });
      return;
    }

    const profile = db.findProfileByUserId(userId);
    if (!profile) {
      res.status(404).json({ error: 'User profile not found' });
      return;
    }

    const newGuild = db.createGuild({
      name: cleanName,
      motto: motto || 'Growing together in the algorithmic garden 🌸',
      banner_color: bannerColor || '#F1B4B1',
      owner_id: userId,
    });

    res.status(201).json({
      success: true,
      guild: newGuild,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create guild' });
  }
});

// GET /api/v1/guilds/:id
router.get('/:id', (req, res): void => {
  try {
    const { id } = req.params;
    const guild = db.findGuildById(id);

    if (!guild) {
      res.status(404).json({ error: `Guild "${id}" not found` });
      return;
    }

    const membersRecords = db.getGuildMembers(guild.id);
    const members = membersRecords.map((m) => {
      const p = db.findProfileByUserId(m.user_id);
      return {
        id: m.id,
        userId: m.user_id,
        role: m.role,
        joinedAt: m.joined_at,
        username: p?.username || 'gardener',
        displayName: p?.display_name || 'Gardener',
        avatarFlower: p?.avatar_flower || 'daisy',
        totalXp: p?.total_xp || 0,
        streak: p?.current_streak || 0,
      };
    });

    // Calculate communal world tree metrics
    // Level formula: level = floor(total_xp / 1500) + 1
    const nextLevelXp = guild.level * 1500;
    const currentLevelBaseXp = (guild.level - 1) * 1500;
    const progressInLevel = guild.total_xp - currentLevelBaseXp;
    const progressPercent = Math.min(
      100,
      Math.round((progressInLevel / (nextLevelXp - currentLevelBaseXp)) * 100)
    );

    res.json({
      id: guild.id,
      name: guild.name,
      motto: guild.motto,
      bannerColor: guild.banner_color,
      totalXp: guild.total_xp,
      level: guild.level,
      communalTree: {
        stage: guild.level >= 5 ? 'Ancient Sacred Oak' : guild.level >= 3 ? 'Blossoming Cherry Tree' : 'Young Sprout Tree',
        currentLevelXp: progressInLevel,
        nextLevelRequiredXp: 1500,
        progressPercent,
      },
      membersCount: members.length,
      members,
      createdAt: guild.created_at,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch guild details' });
  }
});

// POST /api/v1/guilds/:id/join
router.post(
  '/:id/join',
  requireAuth,
  (req: AuthenticatedRequest, res: Response): void => {
    try {
      const userId = req.user!.userId;
      const id = req.params.id as string;

      const guild = db.findGuildById(id);
      if (!guild) {
        res.status(404).json({ error: `Guild "${id}" not found` });
        return;
      }

      const membership = db.joinGuild(guild.id, userId);

      res.json({
        success: true,
        message: `Successfully joined ${guild.name}! 🌸`,
        membership,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to join guild' });
    }
  }
);

export default router;
