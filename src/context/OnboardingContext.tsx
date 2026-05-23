'use client';
import { createContext, useContext, useState } from 'react';

interface OnboardingContextType {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  currentStep: number;
  setStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  function openModal() {
    setShowModal(true);
    setCurrentStep(1);
  }
  function closeModal() {
    setShowModal(false);
  }
  function setStep(step: number) {
    setCurrentStep(step);
  }

  return (
    <OnboardingContext.Provider
      value={{ showModal, openModal, closeModal, currentStep, setStep }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const ctx = useContext(OnboardingContext);
  if (!ctx)
    throw new Error(
      'useOnboardingContext must be used inside OnboardingProvider',
    );
  return ctx;
}
