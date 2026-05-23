'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import ResultsSummary from '@/components/results/ResultsSummary';
import RecommendationsPanel from '@/components/results/RecommendationsPanel';
import DashboardButton from '@/components/results/DashboardButton';
import { useScreeningById } from '@/hooks/useScreening';
import { getLastScreeningInputs } from '@/utils/storage';
import { deriveRiskFactors } from '@/utils/calculations';
import type { LastScreeningInputs } from '@/types/screening';

/* ─── Risk Factor bar ─────────────────────────────────────────── */
function RiskBar({
  label,
  pct,
}: {
  label: string;
  pct: number;
}) {
  const color =
    pct >= 70 ? '#BC1120' : pct >= 40 ? '#B45309' : '#0D631B';
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium leading-[14.4px] text-[#181D17]">
          {label}
        </span>
        <span
          className="text-[12px] font-bold leading-[14.4px]"
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

/* ─── Trend Sparkline ─────────────────────────────────────────── */
function TrendSparkline({ score }: { score: number }) {
  /* synthetic 7-point history ending at current score */
  const history = [
    score - 12,
    score - 9,
    score - 7,
    score - 5,
    score - 3,
    score - 1,
    score,
  ].map((v) => Math.max(0, Math.min(100, v)));

  const maxH = 82; // max bar height in px
  const highestVal = Math.max(...history);

  return (
    <div
      className="bg-white rounded-[24px] p-6 flex flex-col gap-2 h-full"
      style={{ boxShadow: '0px 4px 20px -2px rgba(13,99,27,0.08)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span
          className="text-[14px] font-semibold leading-[16.8px] uppercase text-[#40493D]"
          style={{ letterSpacing: '10%' }}
        >
          Tren Skor
        </span>
        <span className="text-[12px] font-bold leading-[14.4px] text-[#0D631B]">
          +5.2% Bln ini
        </span>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-1 flex-1 px-2 pb-1" style={{ height: maxH + 12 }}>
        {history.map((val, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm transition-all duration-500"
            style={{
              height: `${(val / highestVal) * maxH}px`,
              background: 'rgba(13,99,27,0.2)',
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center pt-1 border-t border-[#EBEFE5]">
        <span className="text-[12px] font-medium leading-[14.4px] text-[#40493D]">
          Riwayat 7 Hari Terakhir
        </span>
      </div>
    </div>
  );
}

/* ─── AI Insight card ─────────────────────────────────────────── */
function AiInsightCard({
  riskScore,
  riskCategory,
  bmi,
  systolicBp,
}: {
  riskScore: number;
  riskCategory: 'low' | 'medium' | 'high';
  bmi?: number | null;
  systolicBp?: number | null;
}) {
  const riskLabel =
    riskCategory === 'low'
      ? 'rendah'
      : riskCategory === 'medium'
      ? 'moderat'
      : 'tinggi';

  const bmiNote =
    bmi != null && bmi >= 25
      ? `indikator **BMI overweight** (${bmi})`
      : 'indikator BMI yang perlu dipantau';

  const bpNote =
    systolicBp != null && systolicBp >= 130
      ? `tekanan darah yang mulai memasuki kategori **Hipertensi Tahap 1** (${systolicBp}/${0})`
      : 'tekanan darah dalam batas aman';

  const aiText = `"Risiko kesehatan ${riskLabel} terdeteksi berdasarkan ${bmiNote} dan ${bpNote}. Tindak lanjut dengan rekomendasi di bawah untuk menjaga kondisi optimal Anda."`;

  const tags =
    riskCategory === 'high'
      ? ['#Hipertensi', '#ManajemenBeratBadan']
      : riskCategory === 'medium'
      ? ['#PantauRutin', '#GayaHidupSehat']
      : ['#KesehatanOptimal', '#PencegahanDini'];

  return (
    <div
      className="relative rounded-[24px] p-8 overflow-hidden"
      style={{
        background: '#318741',
        boxShadow: '0px 4px 20px -2px rgba(13,99,27,0.08)',
      }}
    >
      {/* Decorative opacity overlay */}
      <div
        className="absolute top-[-10px] right-[-10px] opacity-10 pointer-events-none"
        aria-hidden
      >
        <svg width="158" height="167" viewBox="0 0 24 24" fill="white">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
        </svg>
      </div>

      {/* Small icon box */}
      <div
        className="w-[46px] h-[46px] rounded-[16px] flex items-center justify-center mb-6"
        style={{ background: 'rgba(255,255,255,0.2)' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
        </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[24px] font-semibold leading-[33.6px] text-white">
          Analisis AI VitalsCheck
        </h3>
        <p className="text-[18px] font-normal leading-[29.25px] text-white opacity-95">
          {aiText}
        </p>

        {/* Tags */}
        <div className="flex gap-4 pt-[17px] flex-wrap">
          {tags.map((tag) => (
            <div
              key={tag}
              className="px-3 py-[3px] rounded-[8px] text-[14px] font-semibold leading-[16.8px] text-white"
              style={{ background: 'rgba(255,255,255,0.1)', letterSpacing: '0.14px' }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Featured Banner ─────────────────────────────────────────── */
function FeaturedBanner() {
  return (
    <div
      className="relative rounded-[24px] overflow-hidden py-[39px] px-10"
      style={{ background: '#0F6D2B' }}
    >
      {/* Decorative element right side (30% opacity gradient) */}
      <div
        className="absolute top-0 right-0 w-[347px] h-full opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 70%), linear-gradient(135deg, #9CF49C 0%, #2E7D32 100%)',
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 max-w-[672px] flex flex-col gap-[15.4px]">
        <h3 className="text-[32px] font-bold leading-[41.6px] text-white" style={{ letterSpacing: '-0.32px' }}>
          Program Pencegahan Diabetes 2024
        </h3>
        <p className="text-[18px] font-normal leading-[28.8px] text-white opacity-90">
          Bergabunglah dengan ribuan pengguna lain dalam program pemantauan
          glukosa cerdas. Dapatkan panduan nutrisi personal berdasarkan profil
          risiko Anda.
        </p>
        <div className="flex items-center gap-4 pt-[16.61px]">
          <button
            type="button"
            className="px-6 py-[13px] rounded-[12px] text-[16px] font-normal leading-[24px] text-white transition-opacity hover:opacity-90"
            style={{ background: '#318741' }}
          >
            Pelajari Program
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-[12px] text-[16px] font-normal leading-[24px] text-white border transition-opacity hover:opacity-80"
            style={{ borderColor: 'rgba(203,255,194,0.3)' }}
          >
            Lain Kali
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Page
═══════════════════════════════════════════════════════════════ */
export default function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: screening, loading, error } = useScreeningById(id);
  const [inputs, setInputs] = useState<LastScreeningInputs | null>(null);

  useEffect(() => {
    setInputs(getLastScreeningInputs<LastScreeningInputs>());
  }, []);

  if (loading) {
    return (
      <div className="px-9 py-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10 text-[#318741]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#EBEFE5" strokeWidth="3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#318741" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-[16px] font-medium text-[#40493D]">Memuat hasil skrining…</span>
        </div>
      </div>
    );
  }

  if (error || !screening) {
    return (
      <div className="px-9 py-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-[18px] font-medium text-[#BA1A1A]">
          {error ?? 'Data skrining tidak ditemukan.'}
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-[#318741] text-white rounded-[12px] text-[16px] hover:bg-[#0F6D2B] transition-colors"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const riskFactors = deriveRiskFactors(
    screening.riskScore,
    screening.bmi ?? null,
    inputs?.systolicBp ?? null
  );

  const healthScore = Math.round((1 - screening.riskScore) * 100);

  return (
    <div className="px-9 py-8 flex flex-col gap-6 pb-16">
      {/* ── Welcome ───────────────────────────────────────────── */}
      <section className="py-5">
        <div className="max-w-[576px]">
          <h1
            className="text-[32px] font-bold leading-[41.6px] text-[#0F6D2B]"
            style={{ letterSpacing: '-0.32px' }}
          >
            Hasil Analisis
          </h1>
          <p className="mt-3 text-[18px] font-normal leading-[28.8px] text-[#40493D]">
            Keseluruhan Informasi Kesehatan Berdasarkan Data Terakhir Anda
          </p>
        </div>
      </section>

      {/* ── Bento Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Health gauge (col-span-1) */}
        <div className="col-span-1">
          <ResultsSummary
            riskScore={screening.riskScore}
            riskCategory={screening.riskCategory}
            bmi={screening.bmi}
            systolicBp={inputs?.systolicBp}
            diastolicBp={inputs?.diastolicBp}
            bloodGlucose={inputs?.bloodGlucose}
          />
        </div>

        {/* Right column (col-span-2) */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* AI Insight Card */}
          <AiInsightCard
            riskScore={screening.riskScore}
            riskCategory={screening.riskCategory}
            bmi={screening.bmi}
            systolicBp={inputs?.systolicBp}
          />

          {/* Risk Factors + Trend Sparkline (2-col) */}
          <div className="grid grid-cols-2 gap-6">
            {/* Risk Factor Radar (simplified bars) */}
            <div
              className="bg-white rounded-[24px] p-6 flex flex-col gap-6"
              style={{ boxShadow: '0px 4px 20px -2px rgba(13,99,27,0.08)' }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[14px] font-semibold leading-[16.8px] uppercase text-[#40493D]"
                  style={{ letterSpacing: '10%' }}
                >
                  Faktor Risiko
                </span>
                {/* Circular icon */}
                <div className="w-6 h-6 rounded-full bg-[#EBEFE5]" />
              </div>
              <div className="flex flex-col gap-4">
                <RiskBar label="Kardiovaskular" pct={riskFactors.cardiovascular} />
                <RiskBar label="Metabolik"      pct={riskFactors.metabolic} />
                <RiskBar label="Gaya Hidup"     pct={riskFactors.lifestyle} />
              </div>
            </div>

            {/* Trend Sparkline */}
            <TrendSparkline score={healthScore} />
          </div>
        </div>
      </div>

      {/* ── Recommendations ───────────────────────────────────── */}
      <RecommendationsPanel
        riskCategory={screening.riskCategory}
        riskScore={screening.riskScore}
      />

      {/* ── Featured Banner ───────────────────────────────────── */}
      <FeaturedBanner />

      {/* ── Dashboard CTA ─────────────────────────────────────── */}
      <DashboardButton />
    </div>
  );
}
