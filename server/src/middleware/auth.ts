import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config.js';
import { AuthTokenPayload } from '../types/index.js';

export interface AuthenticatedRequest extends Request {
  user?: AuthTokenPayload;
}

export function generateToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: (CONFIG.JWT_EXPIRES_IN as any),
  });
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, CONFIG.JWT_SECRET) as AuthTokenPayload;
  } catch (err) {
    return null;
  }
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication token required' });
    return;
  }

  const token = authHeader.substring(7).trim();
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ error: 'Invalid or expired authentication token' });
    return;
  }

  req.user = decoded;
  next();
}

export function optionalAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }
  next();
}
