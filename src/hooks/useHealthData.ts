'use client';
import { useState } from 'react';
import { useScreeningList } from '@/hooks/useScreening';
import type { RiskCategory } from '@/types/screening';

interface Filters {
  riskCategory?: RiskCategory | 'all';
  sortBy?: 'date_desc' | 'date_asc' | 'risk_desc';
}

export function useHealthData() {
  const { data: allScreenings, loading, error } = useScreeningList();
  const [filters, setFilters] = useState<Filters>({
    riskCategory: 'all',
    sortBy: 'date_desc',
  });

  const screenings = allScreenings
    .filter((s) =>
      filters.riskCategory === 'all'
        ? true
        : s.riskCategory === filters.riskCategory,
    )
    .sort((a, b) => {
      if (filters.sortBy === 'date_asc')
        return (
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime()
        );
      if (filters.sortBy === 'risk_desc') return b.riskScore - a.riskScore;
      return (
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
      );
    });

  return {
    screenings,
    totalCount: screenings.length,
    isLoading: loading,
    error,
    filters,
    setFilters,
  };
}
