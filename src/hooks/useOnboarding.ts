'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import { setLastScreeningInputs } from '@/utils/storage';
import type { ScreeningRequest } from '@/types/screening';

export function useOnboarding() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(data: ScreeningRequest) {
    setIsSubmitting(true);
    setError(null);
    try {
      setLastScreeningInputs(data);
      const res = await apiClient.post('/screenings', data);
      closeModal();
      router.push(`/results/${res.data.data.id}?source=onboarding`);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ?? 'Terjadi kesalahan.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  function closeModal() {
    setShowModal(false);
    setError(null);
  }

  function openModal() {
    setShowModal(true);
  }

  return { showModal, openModal, closeModal, handleSubmit, isSubmitting, error };
}
