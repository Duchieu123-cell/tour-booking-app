import { prisma } from '../lib/prisma.js';
import { AppError } from '../errors/app-error.js';
import type { GetToursQuery } from '../schemas/tour.schema.js';
import type {
  TourModel,
  TourWhereInput,
  TourOrderByWithRelationInput,
} from '../generated/prisma/models/Tour.js';
import type { DepartureModel } from '../generated/prisma/models/Departure.js';

export interface PaginatedToursResult {
  tours: TourModel[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type TourWithDepartures = TourModel & {
  departures: DepartureModel[];
};

export class TourService {
  public async getTours(query: GetToursQuery): Promise<PaginatedToursResult> {
    const { search, minPrice, maxPrice, page, limit, sort } = query;

    const where: TourWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.priceVnd = {};
      if (minPrice !== undefined) {
        where.priceVnd.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.priceVnd.lte = maxPrice;
      }
    }

    const orderBy: TourOrderByWithRelationInput = {};
    if (sort === 'price_asc') {
      orderBy.priceVnd = 'asc';
    } else if (sort === 'price_desc') {
      orderBy.priceVnd = 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }

    const skip = (page - 1) * limit;
    const take = limit;

    const [total, tours] = await prisma.$transaction([
      prisma.tour.count({ where }),
      prisma.tour.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      tours,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  public async getTourBySlug(slug: string): Promise<TourWithDepartures> {
    const tour = await prisma.tour.findUnique({
      where: { slug },
      include: {
        departures: {
          where: {
            startDate: {
              gte: new Date(),
            },
          },
          orderBy: {
            startDate: 'asc',
          },
        },
      },
    });

    if (!tour) {
      throw new AppError('Tour not found', 404);
    }

    return tour;
  }
}

export const tourService = new TourService();
