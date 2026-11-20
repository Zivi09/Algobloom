import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/index.js';
import { generateToken, requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { ProgressService } from '../services/progressService.js';
import { LeagueTier } from '../types/index.js';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', async (req, res): Promise<void> => {
  try {
    const { email, password, username, displayName, avatarFlower } = req.body;

    if (!email || !password || !username) {
      res.status(400).json({ error: 'Email, password, and username are required' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters' });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = username.toLowerCase().trim().replace(/[^a-z0-9_]/g, '');

    if (!cleanUsername) {
      res.status(400).json({ error: 'Username must contain valid letters or numbers' });
      return;
    }

    // Check duplicate email
    if (db.findUserByEmail(cleanEmail)) {
      res.status(409).json({ error: 'Email is already registered' });
      return;
    }

    // Check duplicate username
    if (db.findProfileByUsername(cleanUsername)) {
      res.status(409).json({ error: 'Username is already taken' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = db.createUser({
      email: cleanEmail,
      password_hash: passwordHash,
      oauth_provider: null,
      oauth_id: null,
      role: 'USER',
    });

    const now = new Date().toISOString();
    const newProfile = db.createProfile({
      user_id: newUser.id,
      username: cleanUsername,
      display_name: displayName || cleanUsername,
      bio: 'Growing in algorithmic confidence 🌸',
      avatar_flower: avatarFlower || 'daisy',
      total_xp: 0,
      current_streak: 1,
      last_active_date: now.split('T')[0],
      league_tier: 'SEEDLING' as LeagueTier,
      is_garden_public: true,
      settings: {
        darkMode: false,
        animationSpeed: 'normal',
        soundEnabled: true,
        fontSize: 'normal',
        buddyVisible: true,
      },
      created_at: now,
      updated_at: now,
    });

    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      username: newProfile.username,
      role: newUser.role,
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newProfile.username,
        displayName: newProfile.display_name,
        avatarFlower: newProfile.avatar_flower,
        totalXp: newProfile.total_xp,
        currentStreak: newProfile.current_streak,
        leagueTier: newProfile.league_tier,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

// POST /api/v1/auth/login
router.post('/login', async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = db.findUserByEmail(email.toLowerCase().trim());
    if (!user || !user.password_hash) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const profile = db.findProfileByUserId(user.id);
    if (!profile) {
      res.status(500).json({ error: 'Profile not found' });
      return;
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: profile.username,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: profile.username,
        displayName: profile.display_name,
        bio: profile.bio,
        avatarFlower: profile.avatar_flower,
        totalXp: profile.total_xp,
        currentStreak: profile.current_streak,
        leagueTier: profile.league_tier,
        settings: profile.settings,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// GET /api/v1/auth/me
router.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  try {
    const userId = req.user!.userId;
    const user = db.findUserById(userId);
    const profile = db.findProfileByUserId(userId);

    if (!user || !profile) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const progress = ProgressService.getUserProgress(userId);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: profile.username,
        displayName: profile.display_name,
        bio: profile.bio,
        avatarFlower: profile.avatar_flower,
        totalXp: profile.total_xp,
        currentStreak: profile.current_streak,
        leagueTier: profile.league_tier,
        isGardenPublic: profile.is_garden_public,
        settings: profile.settings,
      },
      progressSummary: {
        completedLessonsCount: progress.completedLessons.length,
        masteredAlgorithmsCount: progress.masteredAlgorithms.length,
        gardenPlantsCount: progress.gardenPlants.length,
        bloomedCount: progress.gardenPlants.filter((p) => p.stage === 'bloomed').length,
        achievementsCount: progress.achievements.length,
      },
      progress,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch current user' });
  }
});

// POST /api/v1/auth/sync-guest
router.post('/sync-guest', requireAuth, (req: AuthenticatedRequest, res: Response): void => {
  try {
    const userId = req.user!.userId;
    const { guestProgress } = req.body;

    if (!guestProgress) {
      res.status(400).json({ error: 'guestProgress object is required' });
      return;
    }

    const updatedProgress = ProgressService.mergeGuestProgress(userId, guestProgress);

    res.json({
      success: true,
      updatedProgress,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to sync guest progress' });
  }
});

export default router;
