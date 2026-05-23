export function formatDate(dateStr: string, locale = 'id-ID'): string {
  try {
    return new Date(dateStr).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function formatBMI(bmi: number): string {
  return bmi.toFixed(1);
}

/** riskScore is 0–1; returns health score 0–100 as string */
export function formatRiskScore(riskScore: number): string {
  return Math.round((1 - riskScore) * 100).toString();
}

export function formatNumber(n: number, decimals = 0): string {
  return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatRiskCategory(category: 'low' | 'medium' | 'high'): string {
  const map = { low: 'Rendah', medium: 'Moderat', high: 'Tinggi' } as const;
  return map[category];
}
