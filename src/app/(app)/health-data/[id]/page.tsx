'use client';

import { use } from 'react';
import Link from 'next/link';
import { useScreeningById } from '@/hooks/useScreening';
import { formatDate, formatRiskScore, formatRiskCategory } from '@/utils/formatters';
import { RISK_COLORS } from '@/lib/constants';
import { getLastScreeningInputs } from '@/utils/storage';
import Spinner from '@/components/ui/Spinner';
import Alert from '@/components/ui/Alert';
import type { LastScreeningInputs } from '@/types/screening';

export default function HealthDataDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: screening, loading, error } = useScreeningById(id);
  const inputs = getLastScreeningInputs<LastScreeningInputs>();

  if (loading) {
    return (
      <div className="px-9 py-8 flex items-center justify-center min-h-[400px]">
        <Spinner size={40} />
      </div>
    );
  }

  if (error || !screening) {
    return (
      <div className="px-9 py-8 flex flex-col items-center gap-4 min-h-[400px] justify-center">
        <Alert variant="error">{error ?? 'Data tidak ditemukan.'}</Alert>
        <Link href="/health-data" className="text-[#0F6D2B] hover:underline text-[14px]">
          ← Kembali ke Data Kesehatan
        </Link>
      </div>
    );
  }

  const riskColor = RISK_COLORS[screening.riskCategory];

  return (
    <div className="px-9 py-8 flex flex-col gap-6">
      {/* Back link */}
      <Link href="/health-data" className="text-[14px] text-[#0F6D2B] hover:underline flex items-center gap-1">
        ← Data Kesehatan
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-bold leading-[41.6px] text-[#0F6D2B]"
            style={{ letterSpacing: '-0.32px' }}>
            Detail Skrining
          </h1>
          {screening.createdAt && (
            <p className="text-[16px] text-[#40493D] mt-1">{formatDate(screening.createdAt)}</p>
          )}
        </div>
        <div
          className="px-4 py-2 rounded-full text-[14px] font-semibold"
          style={{ background: riskColor.bg, color: riskColor.text }}
        >
          Risiko {formatRiskCategory(screening.riskCategory)}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: 'Skor Kesehatan', value: `${formatRiskScore(screening.riskScore)}/100` },
          { label: 'BMI', value: screening.bmi ? screening.bmi.toFixed(1) : '—' },
          { label: 'Tekanan Darah', value: inputs?.systolicBp ? `${inputs.systolicBp}/${inputs.diastolicBp}` : '—' },
          { label: 'Gula Darah', value: inputs?.bloodGlucose ? `${inputs.bloodGlucose} mg/dL` : '—' },
          { label: 'Usia', value: inputs?.age ? `${inputs.age} tahun` : '—' },
          { label: 'Jenis Kelamin', value: inputs?.gender === 'male' ? 'Laki-laki' : inputs?.gender === 'female' ? 'Perempuan' : '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-[20px] p-6"
            style={{ border: '1px solid rgba(13,99,27,0.05)', boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}>
            <p className="text-[12px] font-medium text-[#40493D] mb-2">{label}</p>
            <p className="text-[24px] font-semibold text-[#181D17]">{value}</p>
          </div>
        ))}
      </div>

      {/* View full results */}
      <div className="flex justify-center pt-4">
        <Link
          href={`/results/${id}`}
          className="px-8 py-4 bg-[#318741] text-white rounded-[12px] text-[16px] font-semibold hover:bg-[#0F6D2B] transition-colors"
        >
          Lihat Hasil Lengkap
        </Link>
      </div>
    </div>
  );
}
