'use client';

import { useEffect } from 'react';
import { OnboardingProvider, useOnboardingContext } from '@/context/OnboardingContext';
import OnboardingModal from '@/components/modals/OnboardingModal';
import { getOnboardingStatus } from '@/utils/storage';

/** Checks onboarding status on mount and opens modal when user hasn't completed it yet. */
function OnboardingInitializer() {
  const { openModal } = useOnboardingContext();

  useEffect(() => {
    if (!getOnboardingStatus()) {
      openModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

/** Renders the onboarding modal, controlled by OnboardingContext. */
function OnboardingOverlay() {
  const { showModal, closeModal } = useOnboardingContext();
  return <OnboardingModal open={showModal} onClose={closeModal} />;
}

/**
 * Client-side wrapper for the app shell.
 * Provides OnboardingContext, auto-triggers the onboarding modal for new users,
 * and renders the modal overlay at the layout level.
 */
export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <OnboardingInitializer />
      {children}
      <OnboardingOverlay />
    </OnboardingProvider>
  );
}
