import { type ReactElement, type ChangeEvent } from 'react';
import type { TourSort } from '../../types/tour';

export interface TourFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  minPrice: number | undefined;
  onMinPriceChange: (value: number | undefined) => void;
  maxPrice: number | undefined;
  onMaxPriceChange: (value: number | undefined) => void;
  sort: TourSort;
  onSortChange: (value: TourSort) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function TourFilters({
  search,
  onSearchChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sort,
  onSortChange,
  onReset,
  hasActiveFilters,
}: TourFiltersProps): ReactElement {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value.trim();
    if (!val) {
      onMinPriceChange(undefined);
    } else {
      const num = parseInt(val, 10);
      onMinPriceChange(Number.isNaN(num) ? undefined : Math.max(0, num));
    }
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value.trim();
    if (!val) {
      onMaxPriceChange(undefined);
    } else {
      const num = parseInt(val, 10);
      onMaxPriceChange(Number.isNaN(num) ? undefined : Math.max(0, num));
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 mb-8 border border-slate-200/80 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Search Input */}
        <div>
          <label
            htmlFor="search-input"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Tìm kiếm tour
          </label>
          <div className="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Tên tour hoặc địa điểm..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Min Price */}
        <div>
          <label htmlFor="min-price" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Giá tối thiểu (₫)
          </label>
          <input
            id="min-price"
            type="number"
            min={0}
            step={500000}
            placeholder="Từ 1.000.000..."
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>

        {/* Max Price */}
        <div>
          <label htmlFor="max-price" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Giá tối đa (₫)
          </label>
          <input
            id="max-price"
            type="number"
            min={0}
            step={500000}
            placeholder="Đến 5.000.000..."
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>

        {/* Sort Select */}
        <div>
          <label
            htmlFor="sort-select"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Sắp xếp theo
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as TourSort)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
          >
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá: Thấp đến cao</option>
            <option value="price_desc">Giá: Cao đến thấp</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Đang áp dụng bộ lọc tùy chỉnh</span>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
