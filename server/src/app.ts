import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import { tourRouter } from './routes/tour.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

export interface HealthData {
  status: 'ok';
}

export interface ApiResponse<T> {
  data: T;
}

export const createApp = (): Express => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // ─── Health check ───────────────────────────────────────────────────────
  app.get('/api/health', (_req: Request, res: Response<ApiResponse<HealthData>>): void => {
    res.status(200).json({
      data: {
        status: 'ok',
      },
    });
  });

  // ─── API Routes ─────────────────────────────────────────────────────────
  app.use('/api/tours', tourRouter);

  // ─── Centralized Error Handler (must be last middleware) ────────────────
  app.use(errorHandler);

  return app;
};
