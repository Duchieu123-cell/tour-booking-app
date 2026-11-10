import { type ReactElement } from 'react';
import { Link, NavLink } from 'react-router-dom';

export function Header(): ReactElement {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/tours" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-blue-700 transition">
            TB
          </span>
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            Tour <span className="text-blue-600">Booking</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/tours"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            Khám phá Tour
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
