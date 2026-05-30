import Image from 'next/image';
import Link from 'next/link';

interface LastScreeningCardProps {
  date?: string;
  status?: string;
  detailHref?: string;
  hasData?: boolean;
}

export default function LastScreeningCard({
  date = 'Belum ada data',
  status = 'Lakukan skrining pertama untuk melihat ringkasan terbaru.',
  detailHref = '/health-data',
  hasData = false,
}: LastScreeningCardProps) {
  return (
    <div
      className="bg-white rounded-[20px] p-5 md:p-6 lg:p-8 flex flex-col justify-between gap-5 min-w-0 overflow-hidden"
      style={{
        border: '1px solid rgba(13, 99, 27, 0.05)',
        boxShadow: '0px 4px 20px 0px rgba(13, 99, 27, 0.05)',
      }}
    >
      <div className="flex items-center justify-between gap-4 min-w-0">
        <span className="text-[12px] md:text-[14px] font-semibold text-[#40493D] leading-[16.8px] tracking-[0.7px] uppercase break-words">
          Terakhir Skrining
        </span>
        <Image
          src="/icons/icon-calendar.svg"
          alt="Calendar"
          width={18}
          height={20}
          className="shrink-0"
        />
      </div>

      <div className="min-w-0">
        <p className="text-[20px] md:text-[24px] font-semibold leading-[28px] md:leading-[33.6px] text-[#181D17] break-words">
          {date}
        </p>

        <p className="mt-2 text-[14px] md:text-[16px] font-normal leading-[22.4px] md:leading-[25.6px] text-[#40493D] break-words">
          Status: {status}
        </p>
      </div>

      <div className="pt-4 border-t border-[#BFCABA] min-w-0">
        {hasData ? (
          <Link
            href={detailHref}
            className="inline-flex items-center gap-2 text-[14px] md:text-[16px] font-normal text-[#0D631B] leading-[24px] hover:underline break-words"
          >
            Lihat Detail Laporan
            <Image
              src="/icons/icon-arrow-right.svg"
              alt="Arrow"
              width={10}
              height={10}
              className="shrink-0"
            />
          </Link>
        ) : (
          <p className="text-[13px] md:text-[14px] font-medium leading-[20px] md:leading-[21px] text-[#5E6D60] break-words">
            Data detail akan muncul setelah skrining tersimpan.
          </p>
        )}
      </div>
    </div>
  );
}