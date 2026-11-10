import { useState, useEffect, useMemo, type ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTours } from '../hooks/use-tours';
import { useDebounce } from '../hooks/use-debounce';
import { TourCard } from '../components/tours/tour-card';
import { TourCardSkeleton } from '../components/tours/tour-card-skeleton';
import { TourFilters } from '../components/tours/tour-filters';
import { Pagination } from '../components/common/pagination';
import type { TourFilters as TourFiltersType, TourSort } from '../types/tour';

export function ToursPage(): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter values from URL search params
  const urlSearch = searchParams.get('search') ?? '';
  const urlMinPrice = searchParams.get('minPrice')
    ? parseInt(searchParams.get('minPrice')!, 10)
    : undefined;
  const urlMaxPrice = searchParams.get('maxPrice')
    ? parseInt(searchParams.get('maxPrice')!, 10)
    : undefined;
  const urlSort = (searchParams.get('sort') as TourSort) || 'newest';
  const urlPage = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;

  // Local state for immediate input feedback (debounce search)
  const [searchInput, setSearchInput] = useState<string>(urlSearch);
  const debouncedSearch = useDebounce<string>(searchInput, 400);

  // Sync debounced search to URL searchParams
  useEffect(() => {
    if (debouncedSearch !== urlSearch) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (debouncedSearch.trim()) {
          next.set('search', debouncedSearch.trim());
        } else {
          next.delete('search');
        }
        next.set('page', '1');
        return next;
      });
    }
  }, [debouncedSearch, urlSearch, setSearchParams]);

  // If user navigates via browser Back/Forward, keep local input in sync
  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  // Build query filter object from URL
  const filters: TourFiltersType = useMemo(
    () => ({
      search: urlSearch || undefined,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      sort: urlSort,
      page: urlPage,
      limit: 9,
    }),
    [urlSearch, urlMinPrice, urlMaxPrice, urlSort, urlPage]
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useTours(filters);

  const tours = data?.data ?? [];
  const meta = data?.meta;

  const hasActiveFilters = Boolean(
    urlSearch || urlMinPrice !== undefined || urlMaxPrice !== undefined || urlSort !== 'newest'
  );

  const handleMinPriceChange = (min: number | undefined): void => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (min !== undefined) {
        next.set('minPrice', min.toString());
      } else {
        next.delete('minPrice');
      }
      next.set('page', '1');
      return next;
    });
  };

  const handleMaxPriceChange = (max: number | undefined): void => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (max !== undefined) {
        next.set('maxPrice', max.toString());
      } else {
        next.delete('maxPrice');
      }
      next.set('page', '1');
      return next;
    });
  };

  const handleSortChange = (newSort: TourSort): void => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newSort !== 'newest') {
        next.set('sort', newSort);
      } else {
        next.delete('sort');
      }
      next.set('page', '1');
      return next;
    });
  };

  const handlePageChange = (newPage: number): void => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', newPage.toString());
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = (): void => {
    setSearchInput('');
    setSearchParams(new URLSearchParams());
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Khám phá các tour du lịch
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Lựa chọn điểm đến lý tưởng và trải nghiệm những chuyến hành trình đáng nhớ
          </p>
        </div>

        {meta && (
          <div className="text-sm font-medium text-slate-500">
            Tìm thấy <span className="font-bold text-blue-600">{meta.total}</span> tour phù hợp
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <TourFilters
        search={searchInput}
        onSearchChange={setSearchInput}
        minPrice={urlMinPrice}
        onMinPriceChange={handleMinPriceChange}
        maxPrice={urlMaxPrice}
        onMaxPriceChange={handleMaxPriceChange}
        sort={urlSort}
        onSortChange={handleSortChange}
        onReset={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <TourCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="p-8 bg-red-50/80 border border-red-200 rounded-2xl text-center max-w-lg mx-auto my-12">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-slate-900 text-lg mb-1">Không thể tải danh sách tour</h3>
          <p className="text-sm text-slate-600 mb-5">
            {error?.message || 'Đã xảy ra lỗi trong quá trình kết nối tới máy chủ.'}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition shadow-sm"
          >
            Thử lại ngay
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && tours.length === 0 && (
        <div className="p-12 bg-white border border-slate-200/80 rounded-2xl text-center max-w-md mx-auto my-12 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="font-bold text-slate-900 text-lg mb-1">Không tìm thấy tour phù hợp</h3>
          <p className="text-sm text-slate-500 mb-5">
            Vui lòng thử điều chỉnh lại từ khóa tìm kiếm hoặc mở rộng khoảng giá lọc.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-sm"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      )}

      {/* Tour Grid (Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols) */}
      {!isLoading && !isError && tours.length > 0 && (
        <div className={`transition-opacity ${isFetching ? 'opacity-70' : 'opacity-100'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {meta && (
            <Pagination
              page={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={meta.limit}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}
