'use client';

import Link from 'next/link';

export default function DashboardButton() {
  return (
    <div className="flex items-center justify-center gap-4 pt-2">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 px-8 py-4 rounded-[12px] bg-[#318741] text-white text-[18px] font-semibold leading-[28.8px] hover:bg-[#0F6D2B] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
