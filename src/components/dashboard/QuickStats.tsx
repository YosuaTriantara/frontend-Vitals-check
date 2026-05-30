import Image from 'next/image';
import { getBMICategory, getBPCategory } from '@/utils/calculations';
import { formatNumber } from '@/utils/formatters';

interface StatCardProps {
  iconSrc: string;
  iconAlt: string;
  label: string;
  value: string;
  unit: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
}

interface QuickStatsProps {
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  } | null;
  bmi?: number | null;
  totalScreenings?: number;
  hasData?: boolean;
}

export function StatCard({
  iconSrc,
  iconAlt,
  label,
  value,
  unit,
  badge,
  badgeBg,
  badgeText,
}: StatCardProps) {
  return (
    <div
      className="
        bg-white rounded-[20px]
        min-w-[190px] flex-shrink-0
        px-4 py-4
        xl:min-w-0 xl:w-full xl:px-6 xl:py-6
        flex flex-col gap-4
        xl:flex-row xl:items-center xl:justify-between
        overflow-hidden
      "
      style={{
        border: '1px solid rgba(13, 99, 27, 0.05)',
        boxShadow: '0px 4px 20px 0px rgba(13, 99, 27, 0.05)',
      }}
    >
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-4 min-w-0">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={48}
          height={48}
          className="rounded-[12px] shrink-0 w-10 h-10 xl:w-12 xl:h-12"
        />

        <div className="min-w-0">
          <p className="text-[12px] font-medium text-[#40493D] leading-[14.4px] break-words">
            {label}
          </p>

          <div className="flex flex-wrap items-baseline gap-1 mt-2 xl:mt-[14px] min-w-0">
            <span className="text-[22px] xl:text-[24px] font-semibold text-[#181D17] leading-[30px] xl:leading-[33.6px] break-words">
              {value}
            </span>
            <span className="text-[12px] font-normal text-[#181D17] leading-[14.4px] shrink-0">
              {unit}
            </span>
          </div>
        </div>
      </div>

      <div
        className="self-start xl:self-center px-3 py-[3px] rounded-full max-w-full shrink-0"
        style={{ backgroundColor: badgeBg, paddingBottom: '4.39px' }}
      >
        <span
          className="block text-[12px] font-medium leading-[14.4px] truncate"
          style={{ color: badgeText }}
        >
          {badge}
        </span>
      </div>
    </div>
  );
}

export default function QuickStats({
  bloodPressure = null,
  bmi = null,
  totalScreenings,
  hasData = false,
}: QuickStatsProps) {
  const bpValue = bloodPressure
    ? `${bloodPressure.systolic}/${bloodPressure.diastolic}`
    : '—';

  const bpBadge = bloodPressure
    ? getBPCategory(bloodPressure.systolic, bloodPressure.diastolic)
    : { label: hasData ? 'Tidak tersedia' : 'Belum ada data', color: '#40493D' };

  const bmiValue = bmi != null ? bmi.toFixed(1) : '—';

  const bmiBadge = bmi != null
    ? getBMICategory(bmi)
    : { label: hasData ? 'Tidak tersedia' : 'Belum ada data', color: '#40493D' };

  return (
    <div
      className="
        flex gap-4 overflow-x-auto pb-2 min-w-0
        xl:flex-col xl:gap-6 xl:overflow-visible xl:pb-0
        [-ms-overflow-style:none] [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      <StatCard
        iconSrc="/icons/icon-bp.svg"
        iconAlt="Tekanan Darah"
        label="Tekanan Darah"
        value={bpValue}
        unit="mmHg"
        badge={bpBadge.label}
        badgeBg="rgba(13, 99, 27, 0.1)"
        badgeText={bpBadge.color}
      />

      <StatCard
        iconSrc="/icons/icon-bmi.svg"
        iconAlt="BMI"
        label="BMI (IMT)"
        value={bmiValue}
        unit="kg/m²"
        badge={bmiBadge.label}
        badgeBg="rgba(13, 99, 27, 0.1)"
        badgeText={bmiBadge.color}
      />

      <StatCard
        iconSrc="/icons/icon-activity.svg"
        iconAlt="Riwayat Skrining"
        label="Total Skrining"
        value={formatNumber(totalScreenings ?? 0)}
        unit="Data"
        badge={hasData ? 'Tersimpan' : 'Kosong'}
        badgeBg={hasData ? 'rgba(13, 99, 27, 0.1)' : 'rgba(64,73,61,0.08)'}
        badgeText={hasData ? '#0D631B' : '#40493D'}
      />
    </div>
  );
}