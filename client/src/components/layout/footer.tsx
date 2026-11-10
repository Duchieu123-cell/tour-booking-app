import { type ReactElement } from 'react';

export function Footer(): ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p className="font-semibold text-slate-200 mb-1">Tour Booking App — Fullstack Portfolio</p>
        <p className="text-slate-400 mb-3">
          Xây dựng bằng React 18, TypeScript, Tailwind CSS, Express, Prisma & PostgreSQL
        </p>
        <p className="text-slate-500 text-xs">
          © {currentYear} Tour Booking. Mọi quyền được bảo lưu.
        </p>
      </div>
    </footer>
  );
}
