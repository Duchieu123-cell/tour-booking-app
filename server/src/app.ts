import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';

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

  app.get('/api/health', (_req: Request, res: Response<ApiResponse<HealthData>>): void => {
    res.status(200).json({
      data: {
        status: 'ok',
      },
    });
  });

  return app;
};
