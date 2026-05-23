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
      className="bg-white rounded-[20px] p-8 flex flex-col gap-8"
      style={{
        border: '1px solid rgba(13, 99, 27, 0.05)',
        boxShadow: '0px 4px 20px 0px rgba(13, 99, 27, 0.05)',
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            className="text-[24px] font-semibold leading-[33.6px] text-[#181D17]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Tren Kesehatan
          </h3>
          <p className="text-[16px] font-normal text-[#40493D] leading-[25.6px]">
            Skor kesehatan berdasarkan hasil skrining tersimpan.
          </p>
        </div>

        <div className="flex gap-2">
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
        <div className="flex h-[300px] items-center justify-center rounded-xl bg-[#F6FBF1] text-[16px] font-medium text-[#40493D]">
          Memuat tren kesehatan...
        </div>
      ) : !hasData ? (
        <div className="flex h-[300px] items-center justify-center rounded-xl bg-[#F6FBF1] text-center text-[16px] font-medium text-[#40493D] px-8">
          Belum ada data tren. Lakukan skrining dan simpan hasilnya untuk melihat perkembangan kesehatan.
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden" style={{ height: 300 }}>
          <div
            className="absolute inset-0 rounded-xl pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(0deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-evenly px-12 pb-4 h-full gap-4">
            {data.map((bar, index) => (
              <div key={`${bar.label}-${index}`} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${Math.max((bar.value / maxValue) * 260, 24)}px`,
                    backgroundColor: index % 2 === 0 ? '#9CF49C' : '#2E7D32',
                    minWidth: 40,
                    maxWidth: 56,
                  }}
                  title={`${bar.label}: ${bar.value}`}
                />
                <span className="text-[11px] text-[#40493D] font-medium">
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
