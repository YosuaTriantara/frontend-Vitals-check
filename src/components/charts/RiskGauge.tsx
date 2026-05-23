'use client';

// 192×192 SVG arc gauge
// 270° sweep starting at 135° (bottom-left → bottom-right clockwise)
// r = 80, stroke-width = 12

const SIZE = 192;
const CX = SIZE / 2;          // 96
const CY = SIZE / 2;          // 96
const RADIUS = 80;
const STROKE = 12;
const FULL_CIRC = 2 * Math.PI * RADIUS;          // ≈ 502.65
const SWEEP_PCT = 0.75;                            // 270° = 75% of full circle
const ARC_LEN = FULL_CIRC * SWEEP_PCT;             // ≈ 376.99

function gaugeColor(score: number): string {
  if (score >= 70) return '#0D631B';
  if (score >= 40) return '#B45309';
  return '#BA1A1A';
}

interface RiskGaugeProps {
  score: number;   // 0–100
  size?: number;   // defaults to 192
}

export default function RiskGauge({ score, size = 192 }: RiskGaugeProps) {
  const scale = size / SIZE;
  const filledLen = ARC_LEN * (Math.max(0, Math.min(100, score)) / 100);
  const color = gaugeColor(score);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-label={`Health score: ${score} out of 100`}
    >
      {/* Background track — 270° arc */}
      <circle
        cx={CX}
        cy={CY}
        r={RADIUS}
        fill="none"
        stroke="#EBEFE5"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={`${ARC_LEN} ${FULL_CIRC - ARC_LEN}`}
        transform={`rotate(135 ${CX} ${CY})`}
      />
      {/* Filled arc */}
      <circle
        cx={CX}
        cy={CY}
        r={RADIUS}
        fill="none"
        stroke={color}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={`${filledLen} ${FULL_CIRC - filledLen}`}
        transform={`rotate(135 ${CX} ${CY})`}
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
      {/* Score number */}
      <text
        x={CX}
        y={CY - 6}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-body), Manrope, sans-serif"
        fontWeight={800}
        fontSize={48}
        fill={color}
      >
        {score}
      </text>
      {/* "dari 100" subtitle */}
      <text
        x={CX}
        y={CY + 30}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-body), Manrope, sans-serif"
        fontWeight={500}
        fontSize={12}
        fill="#40493D"
      >
        dari 100
      </text>
    </svg>
  );
}
