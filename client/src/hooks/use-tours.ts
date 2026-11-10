import { useQuery, keepPreviousData, type UseQueryResult } from '@tanstack/react-query';
import { fetchTours } from '../api/tours';
import type { ApiResponse } from '../types/api';
import type { Tour, TourFilters } from '../types/tour';
import type { ApiError } from '../api/client';

export function useTours(filters: TourFilters): UseQueryResult<ApiResponse<Tour[]>, ApiError> {
  return useQuery<ApiResponse<Tour[]>, ApiError>({
    queryKey: ['tours', filters],
    queryFn: () => fetchTours(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60, // 1 minute
  });
}
