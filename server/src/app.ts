import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { CONFIG } from './config.js';
import authRouter from './routes/auth.js';
import progressRouter from './routes/progress.js';
import lessonsRouter from './routes/lessons.js';
import usersRouter from './routes/users.js';
import leaderboardRouter from './routes/leaderboard.js';
import guildsRouter from './routes/guilds.js';

export function createApp(): Express {
  const app = express();

  // CORS configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or same-origin)
        if (!origin) return callback(null, true);
        if (CONFIG.CORS_ORIGINS.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
          return callback(null, true);
        }
        return callback(null, true); // Dev-friendly permissive
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'AlgoBloom 2.0 Backend Service',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // API v1 Routes
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/progress', progressRouter);
  app.use('/api/v1/lessons', lessonsRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/leaderboard', leaderboardRouter);
  app.use('/api/v1/guilds', guildsRouter);

  // 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });

  // Global Error Handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled Server Error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
    });
  });

  return app;
}
