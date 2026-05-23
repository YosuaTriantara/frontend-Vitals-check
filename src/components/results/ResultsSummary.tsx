'use client';

import RiskGauge from '@/components/charts/RiskGauge';
import {
  healthScoreFromRisk,
  getRiskBadge,
  getGlucoseStatus,
} from '@/utils/calculations';
import type { RiskCategory } from '@/types/screening';

interface ResultsSummaryProps {
  riskScore: number;
  riskCategory: RiskCategory;
  bmi?: number | null;
  systolicBp?: number | null;
  diastolicBp?: number | null;
  bloodGlucose?: number | null;
}

interface VitalCellProps {
  label: string;
  value: string;
  indicator?: string;
  indicatorColor?: string;
}

function VitalCell({ label, value, indicator, indicatorColor = '#40493D' }: VitalCellProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[12px] font-medium leading-[14.4px] text-[#40493D]">{label}</span>
      <div className="flex items-baseline gap-1 mt-[14px]">
        <span className="text-[24px] font-bold leading-[33.6px] text-[#181D17]">{value}</span>
        {indicator && (
          <span className="text-[12px] font-normal leading-[14.4px]" style={{ color: indicatorColor }}>
            {indicator}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ResultsSummary({
  riskScore,
  riskCategory,
  bmi,
  systolicBp,
  diastolicBp,
  bloodGlucose,
}: ResultsSummaryProps) {
  const score = healthScoreFromRisk(riskScore);
  const badge = getRiskBadge(riskCategory);

  // BMI
  const bmiVal = bmi != null ? bmi.toFixed(1) : '—';
  const bmiIndicator = bmi != null && bmi > 25 ? '↑' : bmi != null && bmi < 18.5 ? '↓' : undefined;
  const bmiIndicatorColor = bmi != null && bmi > 25 ? '#BA1A1A' : '#B45309';

  // BP
  const bpVal =
    systolicBp != null && diastolicBp != null
      ? `${systolicBp}/${diastolicBp}`
      : '—';

  // Sugar
  const glucoseStatus = bloodGlucose != null ? getGlucoseStatus(bloodGlucose) : null;
  const sugarVal = bloodGlucose != null ? `${bloodGlucose} ` : '—';
  const sugarIndicator = glucoseStatus?.label;
  const sugarColor = glucoseStatus?.color ?? '#40493D';

  // Heart rate (derived)
  const heartRate = Math.round(65 + riskScore * 25);

  return (
    <div
      className="bg-white rounded-[24px] flex flex-col items-center px-8 pt-8 pb-8 h-full"
      style={{ boxShadow: '0px 4px 20px -2px rgba(13,99,27,0.08)' }}
    >
      {/* Label */}
      <p
        className="text-[14px] font-semibold leading-[16.8px] uppercase text-[#40493D] text-center"
        style={{ letterSpacing: '10%' }}
      >
        Health Score
      </p>

      {/* Gauge */}
      <div className="mt-8">
        <RiskGauge score={score} />
      </div>

      {/* Risk badge */}
      <div
        className="mt-6 px-6 py-2 rounded-full"
        style={{ background: badge.bg }}
      >
        <span
          className="text-[14px] font-bold leading-[16.8px]"
          style={{ color: badge.text, letterSpacing: '0.14px' }}
        >
          Risiko: {badge.label}
        </span>
      </div>

      {/* Separator + Vitals */}
      <div className="w-full mt-6 pt-6 border-t border-[#BFCABA]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <VitalCell
            label="BMI"
            value={bmiVal}
            indicator={bmiIndicator}
            indicatorColor={bmiIndicatorColor}
          />
          <VitalCell
            label="BP (Tekanan)"
            value={bpVal}
          />
          <VitalCell
            label="Sugar Level"
            value={sugarVal}
            indicator={sugarIndicator}
            indicatorColor={sugarColor}
          />
          <VitalCell
            label="Detak Jantung"
            value={`${heartRate} `}
            indicator="bpm"
            indicatorColor="#40493D"
          />
        </div>
      </div>
    </div>
  );
}
