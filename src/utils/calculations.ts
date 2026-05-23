import type { RiskCategory } from '@/types/screening';

export function calculateBMI(heightCm: number, weightKg: number): number {
  if (heightCm <= 0) return 0;
  return parseFloat((weightKg / (heightCm / 100) ** 2).toFixed(1));
}

export function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Kurang',    color: '#854D0E' };
  if (bmi < 25)   return { label: 'Normal',    color: '#0D631B' };
  if (bmi < 30)   return { label: 'Kelebihan', color: '#B45309' };
  return              { label: 'Obesitas',  color: '#BA1A1A' };
}

export function getBPCategory(systolic: number, diastolic: number): {
  label: string;
  color: string;
} {
  if (systolic < 120 && diastolic < 80)
    return { label: 'Normal',        color: '#0D631B' };
  if (systolic < 130 && diastolic < 80)
    return { label: 'Meningkat',     color: '#B45309' };
  if (systolic < 140 || diastolic < 90)
    return { label: 'Hipertensi 1',  color: '#EA580C' };
  return   { label: 'Hipertensi 2',  color: '#BA1A1A' };
}

export function getGlucoseStatus(mg: number): { label: string; color: string } {
  if (mg < 70)  return { label: 'Rendah', color: '#B45309' };
  if (mg <= 100) return { label: 'OK',     color: '#0D631B' };
  if (mg <= 125) return { label: 'Pra-DM', color: '#EA580C' };
  return             { label: 'Tinggi',  color: '#BA1A1A' };
}

export function getRiskBadge(category: RiskCategory): {
  label: string;
  bg: string;
  text: string;
} {
  switch (category) {
    case 'low':
      return { label: 'Rendah',  bg: 'rgba(156,244,156,0.3)', text: '#126D27' };
    case 'medium':
      return { label: 'Moderat', bg: 'rgba(156,244,156,0.3)', text: '#126D27' };
    case 'high':
      return { label: 'Tinggi',  bg: 'rgba(255,218,214,0.3)', text: '#BA1A1A' };
  }
}

export function healthScoreFromRisk(riskScore: number): number {
  return Math.round((1 - riskScore) * 100);
}

export function calculateTrend(scores: number[]): number {
  if (scores.length < 2) return 0;
  return parseFloat(
    (((scores[scores.length - 1] - scores[0]) / scores[0]) * 100).toFixed(1)
  );
}

export function deriveRiskFactors(
  riskScore: number,
  bmi: number | null,
  systolicBp: number | null
): { cardiovascular: number; metabolic: number; lifestyle: number } {
  const base = riskScore * 100;
  const cardiovascular = systolicBp
    ? Math.min(100, Math.round(Math.max(0, (systolicBp - 100) / 1.4)))
    : Math.min(100, Math.round(base * 1.1));
  const metabolic = bmi
    ? Math.min(100, Math.round(Math.max(0, ((bmi - 18.5) / 21.5) * 100)))
    : Math.min(100, Math.round(base * 0.7));
  const lifestyle = Math.min(100, Math.round(base * 1.25));
  return { cardiovascular, metabolic, lifestyle };
}
