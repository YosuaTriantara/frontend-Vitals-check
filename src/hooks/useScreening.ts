'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import type { Screening, ScreeningRequest, ScreeningResponse } from '@/types/screening';

export function useScreeningById(id: string | null) {
  const [data, setData] = useState<Screening | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    apiClient
      .get<{ success: boolean; data: Screening }>(`/screenings/${id}`)
      .then((res) => {
        if (!cancelled) setData(res.data.data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err?.response?.data?.error?.message ?? 'Gagal memuat data skrining.'
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, loading, error };
}

export function useScreeningList() {
  const [data, setData] = useState<Screening[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    apiClient
      .get<{ success: boolean; data: Screening[] }>('/screenings')
      .then((res) => {
        if (!cancelled) setData(res.data.data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err?.response?.data?.error?.message ?? 'Gagal memuat riwayat.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

export async function createScreening(
  payload: ScreeningRequest
): Promise<ScreeningResponse> {
  const res = await apiClient.post<{ success: boolean; data: ScreeningResponse }>(
    '/screenings',
    payload
  );
  return res.data.data;
}
