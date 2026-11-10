export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  durationDays: number;
  priceVnd: number;
  imageUrl: string;
  createdAt: string;
}

export type TourSort = 'newest' | 'price_asc' | 'price_desc';

export interface TourFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: TourSort;
  page?: number;
  limit?: number;
}
