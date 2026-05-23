export function validateAge(age: number): string | null {
  if (!Number.isInteger(age) || age < 0 || age > 120)
    return 'Usia harus antara 0 dan 120 tahun.';
  return null;
}

export function validateHeight(cm: number): string | null {
  if (cm < 50 || cm > 250) return 'Tinggi badan harus antara 50 dan 250 cm.';
  return null;
}

export function validateWeight(kg: number): string | null {
  if (kg < 10 || kg > 300) return 'Berat badan harus antara 10 dan 300 kg.';
  return null;
}

export function validateBloodGlucose(mg: number): string | null {
  if (mg < 20 || mg > 600)
    return 'Kadar gula darah harus antara 20 dan 600 mg/dL.';
  return null;
}

export function validateBloodPressure(
  systolic: number,
  diastolic: number,
): string | null {
  if (systolic < 60 || systolic > 250)
    return 'Tekanan sistolik harus antara 60 dan 250 mmHg.';
  if (diastolic < 40 || diastolic > 150)
    return 'Tekanan diastolik harus antara 40 dan 150 mmHg.';
  if (diastolic >= systolic)
    return 'Tekanan diastolik harus lebih rendah dari sistolik.';
  return null;
}
