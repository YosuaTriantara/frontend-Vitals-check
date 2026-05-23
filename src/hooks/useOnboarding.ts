"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { setLastScreeningInputs, setOnboardingStatus } from "@/utils/storage";
import type { ScreeningRequest } from "@/types/screening";

export function useOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(data: ScreeningRequest): Promise<boolean> {
    setIsSubmitting(true);
    setError(null);
    try {
      setLastScreeningInputs(data);
      const res = await apiClient.post("/screenings", data);
      // Mark the user as onboarded so the modal won't appear again
      setOnboardingStatus(true);
      router.push(`/results/${res.data.data.id}?source=onboarding`);
      return true;
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ?? "Terjadi kesalahan.";
      setError(msg);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { handleSubmit, isSubmitting, error };
}
