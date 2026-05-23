import Image from 'next/image';

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

/** Default quick stats column with BP, BMI, Activity */
export default function QuickStats() {
  return (
    <div className="flex flex-col gap-6">
      <StatCard
        iconSrc="/icons/icon-bp.svg"
        iconAlt="Tekanan Darah"
        label="Tekanan Darah"
        value="120/80"
        unit="mmHg"
        badge="Normal"
        badgeBg="rgba(13, 99, 27, 0.1)"
        badgeText="#0D631B"
      />
      <StatCard
        iconSrc="/icons/icon-bmi.svg"
        iconAlt="BMI"
        label="BMI (IMT)"
        value="22.4"
        unit="kg/m²"
        badge="Ideal"
        badgeBg="rgba(13, 99, 27, 0.1)"
        badgeText="#0D631B"
      />
      <StatCard
        iconSrc="/icons/icon-activity.svg"
        iconAlt="Aktivitas"
        label="Aktivitas"
        value="6,420"
        unit="Langkah"
        badge="-12%"
        badgeBg="#FFDAD6"
        badgeText="#BA1A1A"
      />
    </div>
  );
}
