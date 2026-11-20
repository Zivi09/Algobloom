import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { ProgressService } from '../services/progressService.js';
import { db } from '../db/index.js';

const router = Router();

// All progress routes require authentication
router.use(requireAuth);

// GET /api/v1/progress
router.get('/', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const userId = req.user!.userId;
    const progress = ProgressService.getUserProgress(userId);
    res.json(progress);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch progress' });
  }
});

// POST /api/v1/progress/plant
router.post('/plant', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const userId = req.user!.userId;
    const { algorithmId, flowerType, plantName } = req.body;

    if (!algorithmId) {
      res.status(400).json({ error: 'algorithmId is required' });
      return;
    }

    const plant = ProgressService.plantSeed(userId, algorithmId, flowerType, plantName);
    const progress = ProgressService.getUserProgress(userId);

    res.json({
      plant,
      progress,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to plant seed' });
  }
});

// PUT & POST /api/v1/progress/sync
const handleSync = (req: AuthenticatedRequest, res: Response): void => {
  try {
    const userId = req.user!.userId;
    const progressPayload = req.body;

    if (!progressPayload) {
      res.status(400).json({ error: 'Progress payload is required' });
      return;
    }

    const updatedProgress = ProgressService.mergeGuestProgress(userId, progressPayload);
    res.json({
      success: true,
      progress: updatedProgress,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to sync progress' });
  }
};

router.put('/sync', handleSync);
router.post('/sync', handleSync);

// PUT /api/v1/progress/settings
router.put('/settings', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const userId = req.user!.userId;
    const settings = req.body;

    const updated = ProgressService.updateSettings(userId, settings);
    res.json({
      success: true,
      settings: updated,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update settings' });
  }
});

// POST /api/v1/progress/bookmark
router.post('/bookmark', (req: AuthenticatedRequest, res: Response): void => {
  try {
    const userId = req.user!.userId;
    const { algorithmId } = req.body;

    if (!algorithmId) {
      res.status(400).json({ error: 'algorithmId is required' });
      return;
    }

    const bookmarked = db.toggleBookmark(userId, algorithmId);
    res.json({
      algorithmId,
      bookmarked,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to toggle bookmark' });
  }
});

export default router;
