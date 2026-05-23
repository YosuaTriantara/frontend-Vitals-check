'use client';

import Link from 'next/link';
import { useHealthData } from '@/hooks/useHealthData';
import { formatDate, formatRiskCategory, formatRiskScore } from '@/utils/formatters';
import { RISK_COLORS } from '@/lib/constants';
import Spinner from '@/components/ui/Spinner';
import Alert from '@/components/ui/Alert';

export default function HealthDataPage() {
  const { screenings, isLoading, error } = useHealthData();

  if (isLoading) {
    return (
      <div className="px-9 py-8 flex items-center justify-center min-h-[400px]">
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <div className="px-9 py-8 flex flex-col gap-6">
      {/* Header */}
      <section className="py-5">
        <div className="max-w-[576px]">
          <h1
            className="text-[32px] font-bold leading-[41.6px] text-[#0F6D2B]"
            style={{ letterSpacing: '-0.32px' }}
          >
            Data Kesehatan
          </h1>
          <p className="mt-3 text-[18px] font-normal leading-[28.8px] text-[#40493D]">
            Riwayat seluruh skrining kesehatan Anda.
          </p>
        </div>
      </section>

      {error && <Alert variant="error">{error}</Alert>}

      {/* Screening list */}
      {screenings.length === 0 ? (
        <div
          className="bg-[#F6FBF1] rounded-[20px] p-16 flex flex-col items-center gap-4"
          style={{ border: '1px solid #DCE8DC' }}
        >
          <p className="text-[18px] font-medium text-[#40493D]">Belum ada data skrining.</p>
          <Link
            href="/screening"
            className="px-6 py-3 bg-[#318741] text-white rounded-[12px] text-[14px] font-semibold hover:bg-[#0F6D2B] transition-colors"
          >
            Mulai Skrining Pertama
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {screenings.map((s) => {
            const riskColor = RISK_COLORS[s.riskCategory];
            return (
              <Link
                key={s.id}
                href={`/health-data/${s.id}`}
                className="bg-white rounded-[20px] px-6 py-5 flex items-center justify-between hover:shadow-md transition-shadow"
                style={{ border: '1px solid rgba(13,99,27,0.05)', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] font-semibold text-[#181D17]">
                    Skrining — {s.createdAt ? formatDate(s.createdAt) : '—'}
                  </p>
                  <p className="text-[14px] text-[#40493D]">
                    Skor Kesehatan: <strong>{formatRiskScore(s.riskScore)}/100</strong>
                    {s.bmi ? ` · BMI ${s.bmi.toFixed(1)}` : ''}
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-[12px] font-semibold"
                  style={{ background: riskColor.bg, color: riskColor.text }}
                >
                  Risiko {formatRiskCategory(s.riskCategory)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
