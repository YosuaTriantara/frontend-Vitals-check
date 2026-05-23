export interface HealthTrend {
  date: string;
  riskScore: number;
  bmi: number;
  systolicBp: number;
  diastolicBp: number;
}

export interface HealthStats {
  totalScreenings: number;
  lastScreeningDate: string;
  avgRiskScore: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface HealthMetrics {
  bmi: number;
  systolicBp: number;
  diastolicBp: number;
  bloodGlucose: number;
  heartRate?: number;
}
