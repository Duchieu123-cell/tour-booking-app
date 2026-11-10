import { type ReactElement } from 'react';

export function TourCardSkeleton(): ReactElement {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm animate-pulse flex flex-col">
      <div className="aspect-[16/10] bg-slate-200" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-3 w-24 bg-slate-200 rounded-md mb-3" />
          <div className="h-5 w-4/5 bg-slate-200 rounded-md mb-2" />
          <div className="h-5 w-3/5 bg-slate-200 rounded-md mb-3" />
          <div className="h-3.5 w-full bg-slate-100 rounded-md mb-1.5" />
          <div className="h-3.5 w-5/6 bg-slate-100 rounded-md mb-4" />
        </div>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="h-2.5 w-10 bg-slate-200 rounded-md mb-1.5" />
            <div className="h-6 w-28 bg-slate-200 rounded-md" />
          </div>
          <div className="h-8 w-16 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
