import type { Request, Response, NextFunction } from 'express';
import { tourService } from '../services/tour.service.js';
import type { GetToursQuery, GetTourBySlugParams } from '../schemas/tour.schema.js';

export const getToursHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = req.query as unknown as GetToursQuery;
    const result = await tourService.getTours(query);
    res.status(200).json({
      data: result.tours,
      meta: result.meta,
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const getTourBySlugHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params as unknown as GetTourBySlugParams;
    const tour = await tourService.getTourBySlug(slug);
    res.status(200).json({
      data: tour,
    });
  } catch (err: unknown) {
    next(err);
  }
};
