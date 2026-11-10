import { z } from 'zod';

export const getToursQuerySchema = z
  .object({
    search: z.string().trim().optional(),
    minPrice: z.coerce.number().int().nonnegative().optional(),
    maxPrice: z.coerce.number().int().nonnegative().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(9),
    sort: z.enum(['price_asc', 'price_desc', 'newest']).default('newest'),
  })
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: 'minPrice must be less than or equal to maxPrice',
      path: ['minPrice'],
    }
  );

export type GetToursQuery = z.infer<typeof getToursQuerySchema>;

export const getTourBySlugParamsSchema = z.object({
  slug: z.string().trim().min(1, 'Slug cannot be empty'),
});

export type GetTourBySlugParams = z.infer<typeof getTourBySlugParamsSchema>;
