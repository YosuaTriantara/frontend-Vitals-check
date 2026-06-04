import Image from "next/image";
import { getBMICategory, getGenHlthCategory } from "@/utils/calculations";
import { formatNumber } from "@/utils/formatters";

// ─── Scale dot colors per level ────────────────────────────────────────────────
const SCALE_COLORS: Record<number, string> = {
  1: "#BA1A1A",
  2: "#EA580C",
  3: "#B45309",
  4: "#0D631B",
  5: "#0D631B",
};

// ─── 5-dot scale bar ──────────────────────────────────────────────────────────
function GenHlthScaleBar({ value }: { value: number | null }) {
  return (
    <div className="flex items-center gap-[5px]">
      {[1, 2, 3, 4, 5].map((level) => {
        const filled = value != null && level <= value;
        return (
          <svg
            key={level}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            aria-hidden
          >
            <circle
              cx="5"
              cy="5"
              r="4.5"
              fill={filled ? SCALE_COLORS[level] : "#EBEFE5"}
              stroke={filled ? SCALE_COLORS[level] : "#BFCABA"}
              strokeWidth="0.5"
            />
          </svg>
        );
      })}
      {value != null && (
        <span className="ml-1 text-[11px] font-medium text-[#40493D]">
          {value}/5
        </span>
      )}
    </div>
  );
}

// ─── Custom card for genHlth ──────────────────────────────────────────────────
function GenHlthCard({
  genHlth,
  badge,
  badgeColor,
}: {
  genHlth: number | null;
  badge: string;
  badgeColor: string;
}) {
  // Icon background & fill change per level
  const iconBg =
    genHlth == null
      ? "rgba(13,99,27,0.08)"
      : genHlth <= 2
        ? "rgba(186,26,26,0.10)"
        : genHlth === 3
          ? "rgba(180,83,9,0.10)"
          : "rgba(13,99,27,0.10)";

  const iconColor =
    genHlth == null
      ? "#40493D"
      : genHlth <= 2
        ? "#BA1A1A"
        : genHlth === 3
          ? "#B45309"
          : "#0D631B";

  return (
    <div
      className="
        bg-white rounded-[20px]
        min-w-[190px] flex-shrink-0
        px-4 py-4
        xl:min-w-0 xl:w-full xl:px-6 xl:py-6
        flex flex-col gap-3
        overflow-hidden
      "
      style={{
        border: "1px solid rgba(13, 99, 27, 0.05)",
        boxShadow: "0px 4px 20px 0px rgba(13, 99, 27, 0.05)",
      }}
    >
      {/* Top row: icon + label + badge */}
      <div className="flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          {/* Inline SVG heart icon */}
          <div
            className="w-10 h-10 xl:w-12 xl:h-12 rounded-[12px] flex items-center justify-center shrink-0 transition-colors"
            style={{ background: iconBg }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={iconColor}
              className="transition-colors"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <p className="text-[12px] font-medium text-[#40493D] leading-[14.4px] break-words">
            Kondisi Kesehatan Umum
          </p>
        </div>

        {/* Badge */}
        <div
          className="self-start px-3 py-[3px] rounded-full shrink-0"
          style={{
            backgroundColor: "rgba(13, 99, 27, 0.1)",
            paddingBottom: "4.39px",
          }}
        >
          <span
            className="block text-[12px] font-medium leading-[14.4px] truncate"
            style={{ color: badgeColor }}
          >
            {badge}
          </span>
        </div>
      </div>

      {/* Value + scale bar */}
      <div className="flex items-end justify-between gap-3 min-w-0 pl-1">
        <div className="flex flex-col gap-2">
          {/* Numeric value */}
          <div className="flex items-baseline gap-0.5">
            <span className="text-[28px] font-semibold text-[#181D17] leading-[33.6px]">
              {genHlth ?? "—"}
            </span>
            {genHlth != null && (
              <span className="text-[13px] font-normal text-[#40493D] leading-[14.4px] ml-0.5">
                / 5
              </span>
            )}
          </div>

          {/* 5-dot scale */}
          <GenHlthScaleBar value={genHlth} />
        </div>

        {/* Decorative ECG / pulse icon */}
        <svg
          width="48"
          height="28"
          viewBox="0 0 48 28"
          fill="none"
          className="shrink-0 opacity-20"
          aria-hidden
        >
          <polyline
            points="0,14 8,14 12,4 16,24 20,10 24,18 28,14 36,14 40,6 44,20 48,14"
            stroke={iconColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

// ─── Static card props ─────────────────────────────────────────────────────────
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
        border: "1px solid rgba(13, 99, 27, 0.05)",
        boxShadow: "0px 4px 20px 0px rgba(13, 99, 27, 0.05)",
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
        style={{ backgroundColor: badgeBg, paddingBottom: "4.39px" }}
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

// ─── QuickStats ────────────────────────────────────────────────────────────────
interface QuickStatsProps {
  genHlth?: number | null;
  bmi?: number | null;
  totalScreenings?: number;
  hasData?: boolean;
}

export default function QuickStats({
  genHlth = null,
  bmi = null,
  totalScreenings,
  hasData = false,
}: QuickStatsProps) {
  const noDataLabel = hasData ? "Tidak tersedia" : "Belum ada data";

  const genHlthBadge =
    genHlth != null
      ? getGenHlthCategory(genHlth)
      : { label: noDataLabel, color: "#40493D" };

  const bmiValue = bmi != null ? bmi.toFixed(1) : "—";
  const bmiBadge =
    bmi != null
      ? getBMICategory(bmi)
      : { label: noDataLabel, color: "#40493D" };

  return (
    <div
      className="
        flex gap-4 overflow-x-auto pb-2 min-w-0
        xl:flex-col xl:gap-6 xl:overflow-visible xl:pb-0
        [-ms-overflow-style:none] [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {/* Kondisi Kesehatan Umum — custom card with inline SVG + scale bar */}
      <GenHlthCard
        genHlth={genHlth}
        badge={genHlthBadge.label}
        badgeColor={genHlthBadge.color}
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
        badge={hasData ? "Tersimpan" : "Kosong"}
        badgeBg={hasData ? "rgba(13, 99, 27, 0.1)" : "rgba(64,73,61,0.08)"}
        badgeText={hasData ? "#0D631B" : "#40493D"}
      />
    </div>
  );
}
