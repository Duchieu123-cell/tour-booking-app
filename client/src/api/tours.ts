import { fetchApi } from './client';
import type { ApiResponse } from '../types/api';
import type { Tour, TourFilters } from '../types/tour';

export async function fetchTours(filters: TourFilters): Promise<ApiResponse<Tour[]>> {
  const searchParams = new URLSearchParams();

  if (filters.search && filters.search.trim().length > 0) {
    searchParams.set('search', filters.search.trim());
  }

  if (filters.minPrice !== undefined && !Number.isNaN(filters.minPrice)) {
    searchParams.set('minPrice', filters.minPrice.toString());
  }

  if (filters.maxPrice !== undefined && !Number.isNaN(filters.maxPrice)) {
    searchParams.set('maxPrice', filters.maxPrice.toString());
  }

  if (filters.sort) {
    searchParams.set('sort', filters.sort);
  }

  if (filters.page && filters.page > 0) {
    searchParams.set('page', filters.page.toString());
  }

  if (filters.limit && filters.limit > 0) {
    searchParams.set('limit', filters.limit.toString());
  }

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/api/tours?${queryString}` : '/api/tours';

  return fetchApi<ApiResponse<Tour[]>>(endpoint);
}
