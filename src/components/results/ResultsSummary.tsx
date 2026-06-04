"use client";

import RiskGauge from "@/components/charts/RiskGauge";
import { healthScoreFromRisk, getRiskBadge } from "@/utils/calculations";
import type { RiskCategory } from "@/types/screening";

interface ResultsSummaryProps {
  riskScore: number;
  riskCategory: RiskCategory;
  bmi?: number | null;
  genHlth?: number | null;
  physHlth?: number | null;
}

interface VitalCellProps {
  label: string;
  value: string;
  indicator?: string;
  indicatorColor?: string;
}

function VitalCell({
  label,
  value,
  indicator,
  indicatorColor = "#40493D",
}: VitalCellProps) {
  return (
    <div
      className="
        min-w-[132px] shrink-0 rounded-[16px] bg-[#F6FBF1] px-4 py-3
        md:min-w-0 md:bg-transparent md:p-0 md:rounded-none
        flex flex-col gap-0.5
      "
    >
      <span className="text-[12px] font-medium leading-[14.4px] text-[#40493D] break-words">
        {label}
      </span>

      <div className="flex flex-wrap items-baseline gap-1 mt-2 md:mt-[14px] min-w-0">
        <span className="text-[22px] md:text-[24px] font-bold leading-[30px] md:leading-[33.6px] text-[#181D17] break-words">
          {value}
        </span>

        {indicator && (
          <span
            className="text-[12px] font-normal leading-[14.4px] break-words"
            style={{ color: indicatorColor }}
          >
            {indicator}
          </span>
        )}
      </div>
    </div>
  );
}

const GEN_HLTH_LABEL: Record<number, { label: string; color: string }> = {
  1: { label: "Buruk", color: "#BA1A1A" },
  2: { label: "Cukup", color: "#B45309" },
  3: { label: "Baik", color: "#0D631B" },
  4: { label: "Sangat Baik", color: "#0D631B" },
  5: { label: "Luar Biasa", color: "#0D631B" },
};

export default function ResultsSummary({
  riskScore,
  riskCategory,
  bmi,
  genHlth,
  physHlth,
}: ResultsSummaryProps) {
  const score = healthScoreFromRisk(riskScore);
  const badge = getRiskBadge(riskCategory);

  const bmiVal = bmi != null ? bmi.toFixed(1) : "—";
  const bmiIndicator =
    bmi != null && bmi > 25 ? "↑" : bmi != null && bmi < 18.5 ? "↓" : undefined;
  const bmiIndicatorColor = bmi != null && bmi > 25 ? "#BA1A1A" : "#B45309";

  const genHlthInfo = genHlth != null ? GEN_HLTH_LABEL[genHlth] : null;
  const genHlthVal = genHlth != null ? String(genHlth) : "—";
  const genHlthIndicator = genHlthInfo?.label;
  const genHlthColor = genHlthInfo?.color ?? "#40493D";

  const physHlthVal = physHlth != null ? String(physHlth) : "—";
  const physHlthColor =
    physHlth != null && physHlth >= 15
      ? "#BA1A1A"
      : physHlth != null && physHlth >= 7
        ? "#B45309"
        : "#0D631B";

  const heartRate = Math.round(65 + riskScore * 25);

  return (
    <div
      className="bg-white rounded-[24px] flex flex-col items-center px-5 md:px-8 pt-6 md:pt-8 pb-6 md:pb-8 h-full min-w-0 overflow-hidden"
      style={{ boxShadow: "0px 4px 20px -2px rgba(13,99,27,0.08)" }}
    >
      <p
        className="text-[13px] md:text-[14px] font-semibold leading-[16.8px] uppercase text-[#40493D] text-center"
        style={{ letterSpacing: "0.1em" }}
      >
        Health Score
      </p>

      <div className="mt-6 md:mt-8 scale-90 md:scale-100">
        <RiskGauge score={score} />
      </div>

      <div
        className="mt-5 md:mt-6 px-4 md:px-6 py-2 rounded-full text-center max-w-full"
        style={{ background: badge.bg }}
      >
        <span
          className="text-[13px] md:text-[14px] font-bold leading-[16.8px] break-words"
          style={{ color: badge.text, letterSpacing: "0.14px" }}
        >
          Risiko: {badge.label}
        </span>
      </div>

      <div className="w-full mt-6 pt-6 border-t border-[#BFCABA] min-w-0">
        <div
          className="
            flex gap-3 overflow-x-auto pb-2
            md:grid md:grid-cols-2 md:overflow-visible md:pb-0
            md:gap-x-8 md:gap-y-6
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <VitalCell
            label="BMI"
            value={bmiVal}
            indicator={bmiIndicator}
            indicatorColor={bmiIndicatorColor}
          />

          <VitalCell
            label="Kes. Umum"
            value={genHlthVal}
            indicator={genHlthIndicator}
            indicatorColor={genHlthColor}
          />

          <VitalCell
            label="Kes. Fisik"
            value={physHlthVal}
            indicator={physHlth != null ? "hari" : undefined}
            indicatorColor={physHlthColor}
          />

          <VitalCell
            label="Detak Jantung"
            value={`${heartRate}`}
            indicator="bpm"
            indicatorColor="#40493D"
          />
        </div>
      </div>
    </div>
  );
}
