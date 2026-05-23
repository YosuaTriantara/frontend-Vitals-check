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
      className="bg-white rounded-[20px] px-6 py-6 flex items-center justify-between"
      style={{
        border: '1px solid rgba(13, 99, 27, 0.05)',
        boxShadow: '0px 4px 20px 0px rgba(13, 99, 27, 0.05)',
      }}
    >
      <div className="flex items-center gap-4">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={48}
          height={48}
          className="rounded-[12px] flex-shrink-0"
        />
        <div>
          <p className="text-[12px] font-medium text-[#40493D] leading-[14.4px] mb-[-2px]">
            {label}
          </p>
          <div className="flex items-baseline gap-1 mt-[14px]">
            <span className="text-[24px] font-semibold text-[#181D17] leading-[33.6px]">
              {value}
            </span>
            <span className="text-[12px] font-normal text-[#181D17] leading-[14.4px]">
              {unit}
            </span>
          </div>
        </div>
      </div>

      <div
        className="px-3 py-[3px] rounded-full"
        style={{ backgroundColor: badgeBg, paddingBottom: '4.39px' }}
      >
        <span
          className="text-[12px] font-medium leading-[14.4px]"
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
    <div className="flex flex-col gap-6">
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
