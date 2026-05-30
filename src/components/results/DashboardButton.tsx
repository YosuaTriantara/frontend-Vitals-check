'use client';

import Link from 'next/link';

export default function DashboardButton() {
  return (
    <div className="flex items-center justify-center pt-2 w-full">
      <Link
        href="/dashboard"
        className="w-full sm:w-auto justify-center flex items-center gap-3 px-6 md:px-8 py-4 rounded-[12px] bg-[#318741] text-white text-[16px] md:text-[18px] font-semibold leading-[25.6px] md:leading-[28.8px] hover:bg-[#0F6D2B] transition-colors"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="white"
          className="shrink-0"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>

        <span className="text-center">Kembali ke Dashboard</span>
      </Link>
    </div>
  );
}