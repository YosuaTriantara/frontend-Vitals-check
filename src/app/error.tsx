'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-6">
      <div className="w-16 h-16 rounded-full bg-[#FEE2E2] flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#BA1A1A">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      </div>
      <h1 className="text-[24px] font-bold text-[#181D17]">Terjadi Kesalahan</h1>
      <p className="text-[16px] text-[#40493D] text-center max-w-md">
        {error.message ?? 'Maaf, terjadi kesalahan yang tidak terduga.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-[#318741] text-white rounded-[12px] text-[14px] font-semibold hover:bg-[#0F6D2B] transition-colors"
        >
          Coba Lagi
        </button>
        <Link
          href="/dashboard"
          className="px-6 py-2.5 border border-[#BFCABA] text-[#40493D] rounded-[12px] text-[14px] font-semibold hover:bg-[rgba(49,135,65,0.05)] transition-colors"
        >
          Ke Dashboard
        </Link>
      </div>
    </div>
  );
}
