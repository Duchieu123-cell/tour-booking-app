import { type ReactElement } from 'react';

export interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: PaginationProps): ReactElement | null {
  if (totalPages <= 1) {
    return null;
  }

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getPages = (): number[] => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-slate-200 mt-8">
      <div className="text-sm text-slate-500">
        Hiển thị <span className="font-semibold text-slate-700">{startItem}</span> -{' '}
        <span className="font-semibold text-slate-700">{endItem}</span> trên tổng số{' '}
        <span className="font-semibold text-slate-700">{total}</span> tour
      </div>

      <nav className="inline-flex items-center gap-1.5 shadow-sm bg-white p-1 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition"
        >
          Trước
        </button>

        {getPages().map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-lg transition ${
                isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition"
        >
          Sau
        </button>
      </nav>
    </div>
  );
}
