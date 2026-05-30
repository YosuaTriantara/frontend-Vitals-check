'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import ResultsSummary from '@/components/results/ResultsSummary';
import RecommendationsPanel from '@/components/results/RecommendationsPanel';
import DashboardButton from '@/components/results/DashboardButton';
import Alert from '@/components/ui/Alert';
import { useScreeningById, useScreeningList } from '@/hooks/useScreening';
import { getLastScreeningInputs } from '@/utils/storage';
import { deriveRiskFactors, healthScoreFromRisk } from '@/utils/calculations';
import { formatDate, formatRiskCategory } from '@/utils/formatters';
import type { LastScreeningInputs } from '@/types/screening';

function RiskBar({
  label,
  pct,
}: {
  label: string;
  pct: number;
}) {
  const color = pct >= 70 ? '#BC1120' : pct >= 40 ? '#B45309' : '#0D631B';

  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div className="flex items-center justify-between gap-4 min-w-0">
        <span className="text-[12px] font-medium leading-[14.4px] text-[#181D17] break-words">
          {label}
        </span>
        <span
          className="text-[12px] font-bold leading-[14.4px] shrink-0"
          style={{ color }}
        >
          {pct}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-[#EBEFE5] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

function TrendSparkline({
  scores,
  labels,
  isLoading,
}: {
  scores: number[];
  labels: string[];
  isLoading?: boolean;
}) {
  const history = scores;
  const hasData = history.length > 0;
  const maxH = 82;
  const highestVal = Math.max(...history, 1);
  const first = history[0] ?? 0;
  const last = history[history.length - 1] ?? 0;
  const delta = first === 0 ? 0 : Math.round(((last - first) / first) * 100);

  return (
    <div
      className="bg-white rounded-[24px] p-5 md:p-6 flex flex-col gap-2 h-full min-w-0 overflow-hidden"
      style={{ boxShadow: '0px 4px 20px -2px rgba(13,99,27,0.08)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 min-w-0">
        <span
          className="text-[13px] md:text-[14px] font-semibold leading-[16.8px] uppercase text-[#40493D] break-words"
          style={{ letterSpacing: '0.1em' }}
        >
          Tren Skor
        </span>

        <span className="text-[12px] font-bold leading-[14.4px] text-[#0D631B] break-words">
          {delta >= 0 ? `+${delta}%` : `${delta}%`} dari awal periode
        </span>
      </div>

      {isLoading ? (
        <div
          className="flex flex-1 items-center justify-center text-center text-[14px] font-medium text-[#40493D] px-4"
          style={{ height: maxH + 12 }}
        >
          Memuat tren skor...
        </div>
      ) : !hasData ? (
        <div
          className="flex flex-1 items-center justify-center px-4 text-center text-[14px] font-medium text-[#40493D]"
          style={{ height: maxH + 12 }}
        >
          Belum ada cukup riwayat skrining untuk menampilkan tren skor.
        </div>
      ) : (
        <div
          className="flex items-end gap-1 flex-1 px-1 md:px-2 pb-1 min-w-0"
          style={{ height: maxH + 12 }}
        >
          {history.map((val, index) => (
            <div
              key={`trend-${index}-${labels[index] ?? 'item'}-${val}`}
              className="flex-1 rounded-t-sm transition-all duration-500 min-w-[6px]"
              style={{
                height: `${(val / highestVal) * maxH}px`,
                background: 'rgba(13,99,27,0.2)',
              }}
              title={`${labels[index] ?? `Data ${index + 1}`}: ${val}`}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center pt-1 border-t border-[#EBEFE5] text-center">
        <span className="text-[12px] font-medium leading-[14.4px] text-[#40493D] break-words">
          {isLoading
            ? 'Mengambil data dari API'
            : hasData
              ? 'Riwayat skor kesehatan tersimpan'
              : 'Belum ada data tren'}
        </span>
      </div>
    </div>
  );
}

function AiInsightCard({
  riskCategory,
  bmi,
  systolicBp,
  diastolicBp,
  bloodGlucose,
}: {
  riskCategory: 'low' | 'medium' | 'high';
  bmi?: number | null;
  systolicBp?: number | null;
  diastolicBp?: number | null;
  bloodGlucose?: number | null;
}) {
  const riskLabel =
    riskCategory === 'low'
      ? 'rendah'
      : riskCategory === 'medium'
        ? 'moderat'
        : 'tinggi';

  const observations = [
    bmi != null
      ? bmi >= 25
        ? `BMI berada di atas rentang ideal (${bmi.toFixed(1)})`
        : `BMI masih dalam rentang yang relatif baik (${bmi.toFixed(1)})`
      : 'BMI belum tersedia',
    systolicBp != null && diastolicBp != null
      ? `tekanan darah tercatat ${systolicBp}/${diastolicBp} mmHg`
      : 'tekanan darah belum tersedia',
    bloodGlucose != null
      ? `gula darah berada di ${bloodGlucose} mg/dL`
      : 'gula darah belum tersedia',
  ];

  const tags =
    riskCategory === 'high'
      ? ['#PemantauanKetat', '#IntervensiGayaHidup']
      : riskCategory === 'medium'
        ? ['#PantauRutin', '#KeseimbanganNutrisi']
        : ['#PertahankanKondisi', '#PencegahanDini'];

  return (
    <div
      className="relative rounded-[24px] p-5 md:p-6 xl:p-8 overflow-hidden min-w-0"
      style={{
        background: '#318741',
        boxShadow: '0px 4px 20px -2px rgba(13,99,27,0.08)',
      }}
    >
      <div
        className="absolute top-[-10px] right-[-10px] opacity-10 pointer-events-none"
        aria-hidden
      >
        <svg width="158" height="167" viewBox="0 0 24 24" fill="white">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
      </div>

      <div
        className="w-[42px] h-[42px] md:w-[46px] md:h-[46px] rounded-[16px] flex items-center justify-center mb-5 md:mb-6"
        style={{ background: 'rgba(255,255,255,0.2)' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
        </svg>
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <h3 className="text-[20px] md:text-[24px] font-semibold leading-[28px] md:leading-[33.6px] text-white break-words">
          Analisis AI VitalsCheck
        </h3>

        <p className="text-[15px] md:text-[18px] font-normal leading-[24px] md:leading-[29.25px] text-white opacity-95 break-words">
          Risiko kesehatan {riskLabel} terdeteksi berdasarkan{' '}
          {observations.join(', ')}. Gunakan rekomendasi di bawah sebagai
          langkah lanjut untuk menjaga kondisi Anda.
        </p>

        <div className="flex gap-2 md:gap-4 pt-4 md:pt-[17px] flex-wrap min-w-0">
          {tags.map((tag) => (
            <div
              key={tag}
              className="px-3 py-[3px] rounded-[8px] text-[12px] md:text-[14px] font-semibold leading-[16.8px] text-white break-words"
              style={{
                background: 'rgba(255,255,255,0.1)',
                letterSpacing: '0.14px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedBanner() {
  return (
    <div
      className="relative rounded-[24px] overflow-hidden py-6 md:py-[39px] px-5 md:px-10 min-w-0"
      style={{ background: '#0F6D2B' }}
    >
      <div
        className="absolute top-0 right-0 w-[347px] h-full opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 70%), linear-gradient(135deg, #9CF49C 0%, #2E7D32 100%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[672px] flex flex-col gap-4 min-w-0">
        <h3
          className="text-[24px] md:text-[32px] font-bold leading-[32px] md:leading-[41.6px] text-white break-words"
          style={{ letterSpacing: '-0.32px' }}
        >
          Jaga Konsistensi Pemantauan Anda
        </h3>

        <p className="text-[15px] md:text-[18px] font-normal leading-[24px] md:leading-[28.8px] text-white opacity-90 break-words">
          Semakin rutin Anda melakukan skrining, semakin akurat tren kesehatan
          dan rekomendasi yang bisa ditampilkan VitalsCheck.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-3 md:pt-[16.61px]">
          <Link
            href="/screening"
            className="w-full sm:w-auto text-center px-6 py-[13px] rounded-[12px] text-[15px] md:text-[16px] font-normal leading-[24px] text-white transition-opacity hover:opacity-90"
            style={{ background: '#318741' }}
          >
            Lakukan Skrining Lagi
          </Link>

          <Link
            href="/health-data"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-[12px] text-[15px] md:text-[16px] font-normal leading-[24px] text-white border transition-opacity hover:opacity-80"
            style={{ borderColor: 'rgba(203,255,194,0.3)' }}
          >
            Lihat Riwayat
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: screening, loading, error } = useScreeningById(id);
  const { data: allScreenings, loading: listLoading } = useScreeningList();
  const [inputs] = useState<LastScreeningInputs | null>(() =>
    getLastScreeningInputs<LastScreeningInputs>(),
  );

  if (loading) {
    return (
      <div className="px-4 py-6 md:px-6 lg:px-9 lg:py-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10 text-[#318741]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#EBEFE5" strokeWidth="3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#318741" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-[16px] font-medium text-[#40493D] text-center">
            Memuat hasil skrining...
          </span>
        </div>
      </div>
    );
  }

  if (error || !screening) {
    return (
      <div className="px-4 py-6 md:px-6 lg:px-9 lg:py-8 flex flex-col items-center justify-center min-h-[400px] gap-4 overflow-x-hidden">
        <Alert variant="error">
          {error ?? 'Data skrining tidak ditemukan.'}
        </Alert>

        <Link
          href="/dashboard"
          className="w-full sm:w-auto text-center px-6 py-3 bg-[#318741] text-white rounded-[12px] text-[16px] hover:bg-[#0F6D2B] transition-colors"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const systolicBp = screening.systolicBp ?? inputs?.systolicBp ?? null;
  const diastolicBp = screening.diastolicBp ?? inputs?.diastolicBp ?? null;
  const bloodGlucose = screening.bloodGlucose ?? inputs?.bloodGlucose ?? null;

  const riskFactors = deriveRiskFactors(
    screening.riskScore,
    screening.bmi ?? null,
    systolicBp,
  );

  const sortedScores = [...allScreenings]
    .sort(
      (a, b) =>
        new Date(a.createdAt ?? 0).getTime() -
        new Date(b.createdAt ?? 0).getTime(),
    )
    .slice(-7);

  const trendScores = sortedScores.map((item) =>
    healthScoreFromRisk(item.riskScore),
  );

  const trendLabels = sortedScores.map((item) =>
    item.createdAt
      ? formatDate(item.createdAt).split(' ')[0]
      : `D${trendScores.length}`,
  );

  return (
    <div className="px-4 py-6 md:px-6 lg:px-9 lg:py-8 flex flex-col gap-5 lg:gap-6 pb-16 overflow-x-hidden">
      <section className="py-2 md:py-5 min-w-0">
        <div className="max-w-[576px] min-w-0">
          <h1
            className="text-[26px] md:text-[32px] font-bold leading-[34px] md:leading-[41.6px] text-[#0F6D2B] break-words"
            style={{ letterSpacing: '-0.32px' }}
          >
            Hasil Analisis
          </h1>

          <p className="mt-3 text-[15px] md:text-[18px] font-normal leading-[24px] md:leading-[28.8px] text-[#40493D] break-words">
            {screening.createdAt
              ? `Analisis kesehatan berdasarkan skrining pada ${formatDate(screening.createdAt)}.`
              : `Analisis kesehatan dengan kategori risiko ${formatRiskCategory(screening.riskCategory)}.`}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-6 min-w-0">
        <div className="min-w-0 xl:col-span-1">
          <ResultsSummary
            riskScore={screening.riskScore}
            riskCategory={screening.riskCategory}
            bmi={screening.bmi}
            systolicBp={systolicBp}
            diastolicBp={diastolicBp}
            bloodGlucose={bloodGlucose}
          />
        </div>

        <div className="min-w-0 xl:col-span-2 flex flex-col gap-5 xl:gap-6">
          <AiInsightCard
            riskCategory={screening.riskCategory}
            bmi={screening.bmi}
            systolicBp={systolicBp}
            diastolicBp={diastolicBp}
            bloodGlucose={bloodGlucose}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-6 min-w-0">
            <div
              className="bg-white rounded-[24px] p-5 md:p-6 flex flex-col gap-5 md:gap-6 min-w-0 overflow-hidden"
              style={{ boxShadow: '0px 4px 20px -2px rgba(13,99,27,0.08)' }}
            >
              <div className="flex items-center justify-between gap-4 min-w-0">
                <span
                  className="text-[13px] md:text-[14px] font-semibold leading-[16.8px] uppercase text-[#40493D] break-words"
                  style={{ letterSpacing: '0.1em' }}
                >
                  Faktor Risiko
                </span>

                <div className="w-6 h-6 rounded-full bg-[#EBEFE5] shrink-0" />
              </div>

              <div className="flex flex-col gap-4">
                <RiskBar label="Kardiovaskular" pct={riskFactors.cardiovascular} />
                <RiskBar label="Metabolik" pct={riskFactors.metabolic} />
                <RiskBar label="Gaya Hidup" pct={riskFactors.lifestyle} />
              </div>
            </div>

            <TrendSparkline
              scores={trendScores}
              labels={trendLabels}
              isLoading={listLoading}
            />
          </div>
        </div>
      </div>

      <RecommendationsPanel
        riskCategory={screening.riskCategory}
        riskScore={screening.riskScore}
        bmi={screening.bmi}
        systolicBp={systolicBp}
        diastolicBp={diastolicBp}
        bloodGlucose={bloodGlucose}
      />

      <FeaturedBanner />

      <DashboardButton />
    </div>
  );
}