'use client';
import { useMemo } from 'react';
import type { Screening } from '@/types/screening';
import { healthScoreFromRisk } from '@/utils/calculations';

export function useTrends(screenings: Screening[]) {
  const sorted = useMemo(
    () =>
      [...screenings].sort(
        (a, b) =>
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime(),
      ),
    [screenings],
  );

  const riskScoreTrend = useMemo(
    () =>
      sorted.map((s) => ({
        date: s.createdAt ?? '',
        value: healthScoreFromRisk(s.riskScore),
      })),
    [sorted],
  );

  const bmiTrend = useMemo(
    () =>
      sorted
        .filter((s) => s.bmi != null)
        .map((s) => ({ date: s.createdAt ?? '', value: s.bmi! })),
    [sorted],
  );

  const bpTrend = useMemo(
    () =>
      sorted
        .filter((s) => s.systolicBp != null)
        .map((s) => ({ date: s.createdAt ?? '', value: s.systolicBp! })),
    [sorted],
  );

  return { riskScoreTrend, bmiTrend, bpTrend };
}
