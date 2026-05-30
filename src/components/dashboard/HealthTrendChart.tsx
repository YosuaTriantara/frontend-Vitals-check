'use client';

import { useState } from 'react';

interface TrendPoint {
  value: number;
  label: string;
}

interface HealthTrendChartProps {
  weeklyData?: TrendPoint[];
  monthlyData?: TrendPoint[];
  isLoading?: boolean;
}

export default function HealthTrendChart({
  weeklyData = [],
  monthlyData = [],
  isLoading = false,
}: HealthTrendChartProps) {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const data = (period === 'weekly' ? weeklyData : monthlyData).slice(-7);
  const hasData = data.length > 0;
  const maxValue = hasData ? Math.max(...data.map((item) => item.value), 100) : 100;

  return (
    <div
      className="bg-white rounded-[20px] p-4 md:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 min-w-0 overflow-hidden"
      style={{
        border: '1px solid rgba(13, 99, 27, 0.05)',
        boxShadow: '0px 4px 20px 0px rgba(13, 99, 27, 0.05)',
      }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between min-w-0">
        <div className="min-w-0">
          <h3
            className="text-[20px] md:text-[24px] font-semibold leading-[28px] md:leading-[33.6px] text-[#181D17] break-words"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Tren Kesehatan
          </h3>
          <p className="mt-1 text-[14px] md:text-[16px] font-normal text-[#40493D] leading-[22.4px] md:leading-[25.6px] break-words">
            Skor kesehatan berdasarkan hasil skrining tersimpan.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-4 py-[7px] rounded-full text-[12px] font-medium leading-[14.4px] transition-colors ${
              period === 'weekly'
                ? 'bg-[#0D631B] text-white'
                : 'border border-[#BFCABA] text-[#181D17]'
            }`}
          >
            Terbaru
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-[8px] rounded-full text-[12px] font-medium leading-[14.4px] transition-colors ${
              period === 'monthly'
                ? 'bg-[#0D631B] text-white'
                : 'border border-[#BFCABA] text-[#181D17]'
            }`}
          >
            Bulanan
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[240px] md:h-[300px] items-center justify-center rounded-xl bg-[#F6FBF1] text-center text-[14px] md:text-[16px] font-medium text-[#40493D] px-4">
          Memuat tren kesehatan...
        </div>
      ) : !hasData ? (
        <div className="flex h-[240px] md:h-[300px] items-center justify-center rounded-xl bg-[#F6FBF1] text-center text-[14px] md:text-[16px] font-medium text-[#40493D] px-4 md:px-8">
          Belum ada data tren. Lakukan skrining dan simpan hasilnya untuk melihat perkembangan kesehatan.
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden h-[240px] md:h-[300px] min-w-0">
          <div
            className="absolute inset-0 rounded-xl pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(0deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-evenly px-2 sm:px-4 md:px-8 lg:px-12 pb-4 h-full gap-2 md:gap-4 min-w-0">
            {data.map((bar, index) => (
              <div
                key={`${bar.label}-${index}`}
                className="flex flex-col items-center gap-2 flex-1 min-w-0"
              >
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${Math.max((bar.value / maxValue) * 220, 24)}px`,
                    backgroundColor: index % 2 === 0 ? '#9CF49C' : '#2E7D32',
                    minWidth: 22,
                    maxWidth: 56,
                  }}
                  title={`${bar.label}: ${bar.value}`}
                />
                <span className="text-[10px] md:text-[11px] text-[#40493D] font-medium truncate max-w-full">
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}