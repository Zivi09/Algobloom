// Automatically load .env file if available (supported natively in Node.js 20+)
try {
  (process as any).loadEnvFile?.();
} catch {
  // Ignore if .env is missing or already loaded
}

const customCorsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
  : null;

export const CONFIG = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'algobloom-secret-botanical-key-2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  DATABASE_URL: process.env.DATABASE_URL || 'file:./data/db.json',
  CORS_ORIGINS: customCorsOrigins || [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ],
};
