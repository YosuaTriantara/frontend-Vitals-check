import Image from 'next/image';
import Link from 'next/link';

interface LastScreeningCardProps {
  date?: string;
  status?: string;
}

export default function LastScreeningCard({
  date = '12 April 2025',
  status = 'Lengkap & Stabil',
}: LastScreeningCardProps) {
  return (
    <div
      className="bg-white rounded-[20px] p-8 flex flex-col justify-between"
      style={{
        border: '1px solid rgba(13, 99, 27, 0.05)',
        boxShadow: '0px 4px 20px 0px rgba(13, 99, 27, 0.05)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-6">
        <span className="text-[14px] font-semibold text-[#40493D] leading-[16.8px] tracking-[5%] uppercase">
          Terakhir Skrining
        </span>
        <Image src="/icons/icon-calendar.svg" alt="Calendar" width={18} height={20} />
      </div>

      {/* Date */}
      <p className="text-[24px] font-semibold leading-[33.6px] text-[#181D17]">
        {date}
      </p>

      {/* Status */}
      <p className="mt-1 mb-1 text-[16px] font-normal leading-[25.6px] text-[#40493D]">
        Status: {status}
      </p>

      {/* Link */}
      <div className="pt-[7px] border-t border-[#BFCABA]">
        <div className="pt-4">
          <Link
            href="/health-data"
            className="flex items-center gap-2 text-[16px] font-normal text-[#0D631B] leading-[24px] hover:underline"
          >
            Lihat Detail Laporan
            <Image src="/icons/icon-arrow-right.svg" alt="Arrow" width={10} height={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}
