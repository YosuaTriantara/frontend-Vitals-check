export interface ScreeningSchema {
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

export interface LoginSchema {
  email: string;
  password: string;
}

export interface RegisterSchema {
  name: string;
  email: string;
  password: string;
}

export function validateScreening(
  data: Partial<ScreeningSchema>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.age || data.age < 1 || data.age > 120)
    errors.age = "Usia tidak valid (1–120).";
  if (!data.gender) errors.gender = "Jenis kelamin wajib dipilih.";
  if (!data.heightCm || data.heightCm < 50 || data.heightCm > 250)
    errors.heightCm = "Tinggi badan tidak valid (50–250 cm).";
  if (!data.weightKg || data.weightKg < 10 || data.weightKg > 300)
    errors.weightKg = "Berat badan tidak valid (10–300 kg).";
  if (data.genHlth == null || data.genHlth < 1 || data.genHlth > 5)
    errors.genHlth = "Kondisi kesehatan umum tidak valid (1–5).";
  if (data.mentHlth == null || data.mentHlth < 0 || data.mentHlth > 30)
    errors.mentHlth = "Hari kesehatan mental tidak valid (0–30).";
  if (data.physHlth == null || data.physHlth < 0 || data.physHlth > 30)
    errors.physHlth = "Hari kesehatan fisik tidak valid (0–30).";
  return errors;
}

export function validateLogin(
  data: Partial<LoginSchema>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.email?.includes("@")) errors.email = "Email tidak valid.";
  if (!data.password || data.password.length < 6)
    errors.password = "Password minimal 6 karakter.";
  return errors;
}

export function validateRegister(
  data: Partial<RegisterSchema>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name || data.name.trim().length < 2)
    errors.name = "Nama minimal 2 karakter.";
  if (!data.email?.includes("@")) errors.email = "Email tidak valid.";
  if (!data.password || data.password.length < 6)
    errors.password = "Password minimal 6 karakter.";
  return errors;
}
