"use client";

import { useState, useEffect } from "react";
import apiClient from "@/lib/api";
import type {
  Screening,
  ScreeningRequest,
  ScreeningResponse,
  CreateScreeningApiResponse,
  ScreeningMeta,
} from "@/types/screening";

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
            err?.response?.data?.error?.message ??
              "Gagal memuat data skrining.",
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
      .get<{ success: boolean; data: Screening[] }>("/screenings")
      .then((res) => {
        if (!cancelled) setData(res.data.data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err?.response?.data?.error?.message ?? "Gagal memuat riwayat.",
          );
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
  payload: ScreeningRequest,
): Promise<{ data: ScreeningResponse; meta?: ScreeningMeta }> {
  const res = await apiClient.post<CreateScreeningApiResponse>(
    "/screenings",
    payload,
  );
  return { data: res.data.data, meta: res.data.meta };
}

// ─── Model Status ──────────────────────────────────────────────────────────────
export type ModelStatus =
  | "ready"
  | "warming_up"
  | "not_configured"
  | "unavailable";

export function useModelStatus() {
  const [status, setStatus] = useState<ModelStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    apiClient
      .get<{ success: boolean; data: { status: ModelStatus } }>("/model/status")
      .then((res) => {
        if (!cancelled) setStatus(res.data.data.status);
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { status, loading };
}

// ─── Articles ─────────────────────────────────────────────────────────────────
export interface Article {
  category: string;
  title: string;
  source: string;
  url: string;
}

export type ArticleCategory =
  | "diabetes"
  | "hipertensi"
  | "stroke"
  | "kolesterol"
  | "penyakit_jantung";

export function useArticles(category?: ArticleCategory) {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const url = category
      ? `/articles?category=${encodeURIComponent(category)}`
      : "/articles";
    apiClient
      .get<{ success: boolean; data: Article[] }>(url)
      .then((res) => {
        if (!cancelled) setData(res.data.data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err?.response?.data?.error?.message ?? "Gagal memuat artikel.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [category]);

  return { data, loading, error };
}
