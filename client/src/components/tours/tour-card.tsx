import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import type { Tour } from '../../types/tour';

export interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps): ReactElement {
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(tour.priceVnd);

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={tour.imageUrl}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
          {tour.durationDays} ngày
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-blue-600 mb-2">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">{tour.location}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
            <Link to={`/tours/${tour.slug}`} className="focus:outline-none">
              {tour.title}
            </Link>
          </h3>

          <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
            {tour.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-slate-400 block">Giá từ</span>
            <span className="text-lg font-extrabold text-blue-600">{formattedPrice}</span>
          </div>

          <Link
            to={`/tours/${tour.slug}`}
            className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm group-hover:bg-blue-600 group-hover:text-white"
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}
