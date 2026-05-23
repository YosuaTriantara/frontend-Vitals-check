'use client';

interface DataPoint {
  date: string;
  value: number;
}

interface TrendChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
  label?: string;
}

export default function TrendChart({
  data,
  color = '#318741',
  height = 120,
  label,
}: TrendChartProps) {
  if (data.length < 2) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-[12px] text-[#40493D]">Belum cukup data.</p>
      </div>
    );
  }

  const vals = data.map((d) => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const W = 300;
  const H = height;
  const pad = 8;

  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = H - pad - ((d.value - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  });

  return (
    <div>
      {label && (
        <p className="text-[12px] font-medium text-[#40493D] mb-1">{label}</p>
      )}
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <polyline
          points={points.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((_, i) => {
          const [x, y] = (points[i] ?? '0,0').split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
        })}
      </svg>
    </div>
  );
}
