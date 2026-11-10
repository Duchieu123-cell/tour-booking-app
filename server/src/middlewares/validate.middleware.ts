import { type Request, type Response, type NextFunction } from 'express';
import { type ZodType } from 'zod';

export interface RequestValidationSchemas<TParams = unknown, TQuery = unknown, TBody = unknown> {
  params?: ZodType<TParams>;
  query?: ZodType<TQuery>;
  body?: ZodType<TBody>;
}

export const validate = <TParams = unknown, TQuery = unknown, TBody = unknown>(
  schemas: RequestValidationSchemas<TParams, TQuery, TBody>
) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(req.params)) as typeof req.params;
      }
      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(req.query)) as typeof req.query;
      }
      if (schemas.body) {
        req.body = (await schemas.body.parseAsync(req.body)) as typeof req.body;
      }
      next();
    } catch (err: unknown) {
      next(err);
    }
  };
};
