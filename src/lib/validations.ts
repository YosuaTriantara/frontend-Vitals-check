// Plain TypeScript validation schemas (no Zod required).
// If Zod is added later: npm install zod, then replace with z.object({...})

export interface ScreeningSchema {
  age: number;
  gender: 'male' | 'female';
  heightCm: number;
  weightKg: number;
  systolicBp: number;
  diastolicBp: number;
  bloodGlucose: number;
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
    errors.age = 'Usia tidak valid (1–120).';
  if (!data.gender) errors.gender = 'Jenis kelamin wajib dipilih.';
  if (!data.heightCm || data.heightCm < 50 || data.heightCm > 250)
    errors.heightCm = 'Tinggi badan tidak valid (50–250 cm).';
  if (!data.weightKg || data.weightKg < 10 || data.weightKg > 300)
    errors.weightKg = 'Berat badan tidak valid (10–300 kg).';
  if (!data.systolicBp || data.systolicBp < 60 || data.systolicBp > 250)
    errors.systolicBp = 'Tekanan sistolik tidak valid.';
  if (!data.diastolicBp || data.diastolicBp < 40 || data.diastolicBp > 150)
    errors.diastolicBp = 'Tekanan diastolik tidak valid.';
  if (!data.bloodGlucose || data.bloodGlucose < 20 || data.bloodGlucose > 600)
    errors.bloodGlucose = 'Kadar gula darah tidak valid.';
  return errors;
}

export function validateLogin(
  data: Partial<LoginSchema>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.email?.includes('@')) errors.email = 'Email tidak valid.';
  if (!data.password || data.password.length < 6)
    errors.password = 'Password minimal 6 karakter.';
  return errors;
}

export function validateRegister(
  data: Partial<RegisterSchema>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name || data.name.trim().length < 2)
    errors.name = 'Nama minimal 2 karakter.';
  if (!data.email?.includes('@')) errors.email = 'Email tidak valid.';
  if (!data.password || data.password.length < 6)
    errors.password = 'Password minimal 6 karakter.';
  return errors;
}
