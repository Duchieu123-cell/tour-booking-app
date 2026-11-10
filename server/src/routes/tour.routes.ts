import { Router } from 'express';
import { getToursHandler, getTourBySlugHandler } from '../controllers/tour.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { getToursQuerySchema, getTourBySlugParamsSchema } from '../schemas/tour.schema.js';

export const tourRouter: Router = Router();

tourRouter.get('/', validate({ query: getToursQuerySchema }), getToursHandler);
tourRouter.get('/:slug', validate({ params: getTourBySlugParamsSchema }), getTourBySlugHandler);
