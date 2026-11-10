import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage(): ReactElement {
  return (
    <div className="py-20 text-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
        <span className="text-3xl font-black">404</span>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Trang không tồn tại</h1>
      <p className="text-slate-500 text-sm mb-6 leading-relaxed">
        Đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ khác.
      </p>
      <Link
        to="/tours"
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition shadow-sm"
      >
        Quay lại danh sách tour
      </Link>
    </div>
  );
}
