export interface HealthTrend {
  date: string;
  riskScore: number;
  bmi: number;
}

export interface HealthStats {
  totalScreenings: number;
  lastScreeningDate: string;
  avgRiskScore: number;
  trend: "improving" | "stable" | "declining";
}

export interface HealthMetrics {
  bmi: number;
  genHlth?: number;
  mentHlth?: number;
  physHlth?: number;
  diffWalk?: boolean;
  cholCheck?: boolean;
  smoker?: boolean;
  physActivity?: boolean;
  fruits?: boolean;
  veggies?: boolean;
  hvyAlcoholConsump?: boolean;
}

export interface HealthProfile {
  id: string;
  userId: string;
  gender?: "male" | "female";
  age?: number;
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  genHlth?: number;
  mentHlth?: number;
  physHlth?: number;
  diffWalk?: boolean;
  cholCheck?: boolean;
  smoker?: boolean;
  physActivity?: boolean;
  fruits?: boolean;
  veggies?: boolean;
  hvyAlcoholConsump?: boolean;
  lastScreeningId?: string;
  createdAt?: string;
  updatedAt?: string;
}
