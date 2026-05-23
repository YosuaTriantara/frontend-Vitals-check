import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-6">
      <p className="text-[80px] font-extrabold text-[#EBEFE5] leading-none">404</p>
      <h1 className="text-[24px] font-bold text-[#181D17]">Halaman Tidak Ditemukan</h1>
      <p className="text-[16px] text-[#40493D] text-center max-w-md">
        Halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-2.5 bg-[#318741] text-white rounded-[12px] text-[14px] font-semibold hover:bg-[#0F6D2B] transition-colors"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
