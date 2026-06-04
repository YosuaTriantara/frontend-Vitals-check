export type RiskCategory = "low" | "medium" | "high";

export interface PredictionItem {
  probability_score: number;
  threshold_used: number;
  predicted_risk: "Rendah" | "Tinggi";
}

export interface Predictions {
  Diabetes: PredictionItem;
  "Penyakit Jantung": PredictionItem;
  Stroke: PredictionItem;
  Hipertensi: PredictionItem;
  "Kolesterol Tinggi": PredictionItem;
}

export interface ScreeningMeta {
  isWarmingUp: boolean;
  message: string;
}

export interface Screening {
  id: string;
  userId?: string;
  bmi?: number;
  riskScore: number;
  riskCategory: RiskCategory;
  age?: number;
  gender?: "male" | "female";
  heightCm?: number;
  weightKg?: number;
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
  predictions?: Predictions;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScreeningRequest {
  age: number;
  gender: "male" | "female";
  heightCm: number;
  weightKg: number;
  genHlth: number;
  mentHlth: number;
  physHlth: number;
  diffWalk: boolean;
  cholCheck: boolean;
  smoker: boolean;
  physActivity: boolean;
  fruits: boolean;
  veggies: boolean;
  hvyAlcoholConsump: boolean;
}

export interface ScreeningResponse {
  id: string;
  userId: string;
  age: number;
  gender: "male" | "female";
  heightCm: number;
  weightKg: number;
  bmi: number;
  genHlth: number;
  mentHlth: number;
  physHlth: number;
  diffWalk: boolean;
  cholCheck: boolean;
  smoker: boolean;
  physActivity: boolean;
  fruits: boolean;
  veggies: boolean;
  hvyAlcoholConsump: boolean;
  riskScore: number;
  riskCategory: RiskCategory;
  predictions: Predictions;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScreeningApiResponse {
  success: boolean;
  data: ScreeningResponse;
  meta?: ScreeningMeta;
}

export interface LastScreeningInputs {
  age: number;
  gender: "male" | "female";
  heightCm: number;
  weightKg: number;
  genHlth: number;
  mentHlth: number;
  physHlth: number;
  diffWalk: boolean;
  cholCheck: boolean;
  smoker: boolean;
  physActivity: boolean;
  fruits: boolean;
  veggies: boolean;
  hvyAlcoholConsump: boolean;
}
