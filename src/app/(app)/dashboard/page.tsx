'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Alert from '@/components/ui/Alert';
import HealthTrendChart from '@/components/dashboard/HealthTrendChart';
import LastScreeningCard from '@/components/dashboard/LastScreeningCard';
import QuickStats from '@/components/dashboard/QuickStats';
import { useScreeningList } from '@/hooks/useScreening';
import {
  getBMICategory,
  getBPCategory,
  getGlucoseStatus,
  healthScoreFromRisk,
} from '@/utils/calculations';
import { formatDate, formatRiskCategory } from '@/utils/formatters';
import type { Screening } from '@/types/screening';

function getLatestScreening(screenings: Screening[]) {
  return [...screenings].sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
  );
}

function getDisplayDate(date?: string) {
  return date ? formatDate(date) : 'Tanggal tidak tersedia';
}

function buildRecommendations(screening: Screening | null) {
  if (!screening) {
    return [
      'Mulai skrining pertama untuk mendapatkan rekomendasi kesehatan personal.',
      'Catat tekanan darah, BMI, dan gula darah Anda secara berkala.',
      'Jaga pola makan dan aktivitas fisik minimal 30 menit per hari.',
    ];
  }

  const items: string[] = [];

  if (screening.bloodGlucose != null && screening.bloodGlucose > 100) {
    items.push('Batasi minuman manis dan evaluasi kadar gula darah secara rutin.');
  }

  if (screening.bmi != null && screening.bmi >= 25) {
    items.push('Fokus pada penurunan berat badan bertahap melalui pola makan seimbang.');
  }

  if (screening.systolicBp != null && screening.diastolicBp != null) {
    const bp = getBPCategory(screening.systolicBp, screening.diastolicBp);
    if (bp.label !== 'Normal') {
      items.push('Kurangi asupan garam dan pantau tekanan darah setidaknya mingguan.');
    }
  }

  items.push('Lakukan olahraga ringan 30 menit setiap hari untuk menjaga tren kesehatan.');
  items.push('Ulangi skrining berkala agar dashboard menampilkan tren yang lebih akurat.');

  return items.slice(0, 3);
}

function buildWeeklyData(screenings: Screening[]) {
  return screenings.slice(0, 7).reverse().map((screening, index) => ({
    label: `S${index + 1}`,
    value: healthScoreFromRisk(screening.riskScore),
  }));
}

function buildMonthlyData(screenings: Screening[]) {
  const grouped = new Map<string, { total: number; count: number }>();

  screenings.forEach((screening) => {
    const rawDate = screening.createdAt ? new Date(screening.createdAt) : null;
    if (!rawDate || Number.isNaN(rawDate.getTime())) {
      return;
    }
    const key = `${rawDate.getFullYear()}-${rawDate.getMonth()}`;
    const current = grouped.get(key) ?? { total: 0, count: 0 };
    current.total += healthScoreFromRisk(screening.riskScore);
    current.count += 1;
    grouped.set(key, current);
  });

  return Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7)
    .map(([key, value]) => {
      const [year, month] = key.split('-').map(Number);
      const date = new Date(year, month, 1);
      return {
        label: date.toLocaleDateString('id-ID', { month: 'short' }),
        value: Math.round(value.total / value.count),
      };
    });
}

function HealthScoreCard({
  score,
  delta,
  riskLabel,
  hasData,
  isLoading,
}: {
  score: number | null;
  delta: number | null;
  riskLabel: string;
  hasData: boolean;
  isLoading: boolean;
}) {
  const trendText =
    !hasData
      ? 'Belum ada data skrining yang bisa dianalisis'
      : delta == null
      ? 'Belum cukup data untuk membandingkan tren'
      : delta > 0
        ? `Meningkat ${delta}% dari skrining sebelumnya`
        : delta < 0
          ? `Turun ${Math.abs(delta)}% dari skrining sebelumnya`
          : 'Stabil dibanding skrining sebelumnya';

  return (
    <div
      className="bg-white rounded-[20px] p-8 flex flex-col justify-between"
      style={{
        border: '1px solid rgba(13, 99, 27, 0.05)',
        boxShadow: '0px 4px 20px 0px rgba(13, 99, 27, 0.05)',
      }}
    >
      <div className="flex items-center justify-between pb-6">
        <span className="text-[14px] font-semibold text-[#40493D] leading-[16.8px] tracking-[5%] uppercase">
          Health Score
        </span>
        <Image
          src="/icons/icon-health-score.svg"
          alt="Health Score"
          width={20}
          height={19}
        />
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span
            className="text-[48px] font-extrabold leading-[57.6px] text-[#0D631B]"
            style={{ letterSpacing: '-2%' }}
          >
            {isLoading ? '...' : score ?? '—'}
          </span>
          <span className="text-[18px] font-normal text-[#40493D] leading-[28.8px]">
            /100
          </span>
        </div>
        <p className="mt-2 text-[16px] font-normal leading-[25.6px] text-[#40493D]">
          Risiko saat ini: {riskLabel}
        </p>
      </div>

      <div className="pt-4 border-t border-[#BFCABA] mt-4">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/icon-trending-up.svg"
            alt="Health trend"
            width={12}
            height={7}
          />
          <span className="text-[16px] font-normal text-[#0D631B] leading-[24px]">
            {trendText}
          </span>
        </div>
      </div>
    </div>
  );
}

function RecommendationsCard({
  recommendations,
}: {
  recommendations: string[];
}) {
  return (
    <div
      className="rounded-[20px] p-8 flex flex-col gap-4"
      style={{
        border: '1px solid rgba(18, 109, 39, 0.1)',
        boxShadow: '0px 4px 20px 0px rgba(13, 99, 27, 0.05)',
        paddingBottom: '45.81px',
      }}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/icons/icon-recommend.svg"
          alt="Recommendations"
          width={23}
          height={22}
        />
        <span className="text-[14px] font-semibold leading-[16.8px] tracking-[5%] uppercase text-[#BC1120]">
          Rekomendasi Harian
        </span>
      </div>

      <ul className="flex flex-col gap-4 mt-2">
        {recommendations.map((item) => (
          <li key={item} className="flex gap-3 items-start">
            <div className="mt-2 flex-shrink-0">
              <div className="w-[6px] h-[6px] rounded-full bg-[#126D27]" />
            </div>
            <p className="text-[16px] font-normal leading-[25.6px] text-[#181D17]">
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: screenings, loading, error } = useScreeningList();
  const ordered = getLatestScreening(screenings);
  const latest = ordered[0] ?? null;
  const previous = ordered[1] ?? null;

  const hasData = ordered.length > 0;
  const healthScore = latest ? healthScoreFromRisk(latest.riskScore) : null;
  const previousScore = previous ? healthScoreFromRisk(previous.riskScore) : null;
  const scoreDelta =
    previousScore == null || healthScore == null ? null : healthScore - previousScore;

  const lastStatus = latest
    ? [
        latest.bmi != null ? getBMICategory(latest.bmi).label : null,
        latest.systolicBp != null && latest.diastolicBp != null
          ? getBPCategory(latest.systolicBp, latest.diastolicBp).label
          : null,
        latest.bloodGlucose != null
          ? getGlucoseStatus(latest.bloodGlucose).label
          : null,
      ]
        .filter(Boolean)
        .join(' • ')
    : 'Belum ada hasil skrining tersimpan';

  const weeklyData = ordered.length > 0 ? buildWeeklyData(ordered) : [];
  const monthlyData = ordered.length > 0 ? buildMonthlyData(ordered) : [];
  const recommendations = buildRecommendations(latest);

  return (
    <div className="px-4 py-6 md:px-6 lg:px-9 lg:py-8 flex flex-col gap-5 lg:gap-6 overflow-x-hidden">
      {error && (
        <Alert variant="warning">
          Gagal memuat data dashboard dari API. Tidak ada data yang ditampilkan sampai API tersedia.
        </Alert>
      )}

      <section className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 min-w-0">
        <div className="max-w-[576px] min-w-0">
          <h1
            className="text-[26px] md:text-[32px] font-bold leading-[34px] md:leading-[41.6px] text-[#0F6D2B] break-words"
            style={{ letterSpacing: '-0.32px', fontFamily: 'var(--font-body)' }}
          >
            Selamat Datang, {user?.name ?? 'User'}
          </h1>

          <p className="mt-3 text-[15px] md:text-[18px] font-normal leading-[24px] md:leading-[28.8px] text-[#40493D] break-words">
            {latest
              ? `Skrining terakhir Anda tercatat pada ${getDisplayDate(latest.createdAt)}. Pantau perubahan skor kesehatan dan lanjutkan skrining rutin.`
              : 'Belum ada data skrining dari API. Mulai skrining pertama Anda untuk mengisi dashboard secara otomatis.'}
          </p>
        </div>

        <Link
          href="/screening"
          className="w-full xl:w-auto justify-center flex items-center gap-3 px-6 xl:px-8 py-4 rounded-[12px] bg-[#318741] text-white text-[16px] xl:text-[18px] font-normal leading-[25.6px] xl:leading-[28.8px] hover:bg-[#0F6D2B] transition-colors shrink-0"
        >
          <Image
            src="/icons/icon-screening-btn.svg"
            alt="Screening"
            width={20}
            height={20}
            className="shrink-0"
          />
          <span className="break-words text-center">
            {loading ? 'Memuat Data Skrining...' : 'Mulai Skrining Risiko'}
          </span>
        </Link>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-6 pt-4 min-w-0">
        <div className="min-w-0">
          <HealthScoreCard
            score={healthScore}
            delta={scoreDelta}
            riskLabel={latest ? formatRiskCategory(latest.riskCategory) : 'Belum tersedia'}
            hasData={hasData}
            isLoading={loading}
          />
        </div>

        <div className="min-w-0">
          <LastScreeningCard
            date={latest ? getDisplayDate(latest.createdAt) : 'Belum ada data'}
            status={lastStatus}
            detailHref={latest?.id ? `/results/${latest.id}` : '/health-data'}
            hasData={hasData}
          />
        </div>
        
        <div className="min-w-0">
          <QuickStats
            bloodPressure={
              latest?.systolicBp != null && latest?.diastolicBp != null
                ? {
                    systolic: latest.systolicBp,
                    diastolic: latest.diastolicBp,
                  }
                : null
            }
            bmi={latest?.bmi ?? null}
            totalScreenings={ordered.length}
            hasData={hasData}
          />
        </div>
        
        <div className="min-w-0">
          <RecommendationsCard recommendations={recommendations} />
        </div>

        <div className="min-w-0 xl:col-span-2">
          <HealthTrendChart
            weeklyData={weeklyData}
            monthlyData={monthlyData}
            isLoading={loading}
          />
        </div>

        
      </section>
    </div>
  );
}
