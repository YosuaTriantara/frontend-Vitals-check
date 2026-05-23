'use client';

import Modal from '@/components/ui/Modal';
import ScreeningForm from '@/components/forms/ScreeningForm';
import { useOnboarding } from '@/hooks/useOnboarding';
import type { ScreeningRequest } from '@/types/screening';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const { handleSubmit, isSubmitting, error } = useOnboarding();

  async function handleFormSubmit(data: ScreeningRequest) {
    await handleSubmit(data);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Skrining Kesehatan Pertama"
      maxWidth="880px"
    >
      <p className="text-[16px] text-[#40493D] mb-6">
        Lengkapi data kesehatan Anda untuk mendapatkan analisis risiko personal.
      </p>
      <ScreeningForm
        onSubmit={handleFormSubmit}
        isLoading={isSubmitting}
        error={error ?? undefined}
        compact
      />
    </Modal>
  );
}
