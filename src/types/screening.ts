export type RiskCategory = 'low' | 'medium' | 'high';

export interface Screening {
  id: string;
  userId?: string;
  bmi?: number;
  riskScore: number;        // 0–1, higher = worse
  riskCategory: RiskCategory;
  age?: number;
  gender?: 'male' | 'female';
  heightCm?: number;
  weightKg?: number;
  systolicBp?: number;
  diastolicBp?: number;
  bloodGlucose?: number;
  createdAt?: string;
}

export interface ScreeningRequest {
  age: number;
  gender: 'male' | 'female';
  heightCm: number;
  weightKg: number;
  systolicBp: number;
  diastolicBp: number;
  bloodGlucose: number;
}

export interface ScreeningResponse {
  id: string;
  userId: string;
  bmi: number;
  riskScore: number;
  riskCategory: RiskCategory;
}

export interface LastScreeningInputs {
  age: number;
  gender: 'male' | 'female';
  heightCm: number;
  weightKg: number;
  systolicBp: number;
  diastolicBp: number;
  bloodGlucose: number;
}
