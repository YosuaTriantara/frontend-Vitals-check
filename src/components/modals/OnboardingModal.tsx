"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOnboarding } from "@/hooks/useOnboarding";
import type { ScreeningRequest } from "@/types/screening";

/* ═══════════════════════════════════════════════════════════════
   Props
═══════════════════════════════════════════════════════════════ */
interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

/* ═══════════════════════════════════════════════════════════════
   Internal form state
═══════════════════════════════════════════════════════════════ */
interface FormState {
  age: number;
  gender: "male" | "female";
  heightCm: number;
  weightKg: number;
  generalHealth: number;
  physHlth: number;
  mentHlth: number;
  diffWalk: boolean;
  smoking: boolean;
  physActivity: boolean;
  fruits: boolean;
  heavyDrinker: boolean;
  cholCheck: boolean;
  systolicBp: number;
  diastolicBp: number;
  bloodGlucose: number;
}

const DEFAULT_FORM: FormState = {
  age: 45,
  gender: "male",
  heightCm: 170,
  weightKg: 70,
  generalHealth: 3,
  physHlth: 5,
  mentHlth: 2,
  diffWalk: false,
  smoking: false,
  physActivity: true,
  fruits: true,
  heavyDrinker: false,
  cholCheck: false,
  systolicBp: 120,
  diastolicBp: 80,
  bloodGlucose: 95,
};

/* ═══════════════════════════════════════════════════════════════
   Helpers
═══════════════════════════════════════════════════════════════ */
function calcBmi(h: number, w: number): number {
  if (h <= 0) return 0;
  return parseFloat((w / (h / 100) ** 2).toFixed(1));
}

function bmiStatus(bmi: number) {
  if (bmi < 18.5) return { label: "Kurang", bg: "#FEF9C3", text: "#854D0E" };
  if (bmi < 25) return { label: "Normal", bg: "#9CF49C", text: "#19722B" };
  if (bmi < 30) return { label: "Kelebihan", bg: "#FFEDD5", text: "#9A3412" };
  return { label: "Obesitas", bg: "#FEE2E2", text: "#7F1D1D" };
}

function trackStyle(value: number, min: number, max: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #318741 0%, #318741 ${pct}%, #BFCABA ${pct}%, #BFCABA 100%)`,
  };
}

/* ═══════════════════════════════════════════════════════════════
   Sub-components
═══════════════════════════════════════════════════════════════ */
function SliderField({
  label,
  value,
  min,
  max,
  unit,
  valueColor = "#0D631B",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  valueColor?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center justify-between"
        style={{ height: "16.8px" }}
      >
        <span className="text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#40493D]">
          {label}
        </span>
        <span
          className="text-[14px] font-bold leading-[16.8px] tracking-[0.14px]"
          style={{ color: valueColor }}
        >
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={trackStyle(value, min, max)}
      />
      <div className="flex justify-between text-[12px] font-medium text-[#40493D]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function NumberStepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const [draft, setDraft] = useState(String(value));
  const [isFocused, setIsFocused] = useState(false);

  function commit(nextRaw: string) {
    if (!nextRaw.trim()) {
      setDraft(String(value));
      return;
    }
    const parsed = Number.parseInt(nextRaw, 10);
    if (Number.isNaN(parsed)) {
      setDraft(String(value));
      return;
    }
    const nextValue = clamp(parsed);
    setDraft(String(nextValue));
    if (nextValue !== value) onChange(nextValue);
  }

  return (
    <div className="flex flex-col gap-[8.8px]">
      <label className="text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#40493D]">
        {label}
      </label>
      <div
        className="flex items-center h-[50px] bg-white rounded-[12px] overflow-hidden"
        style={{ border: "1px solid #BFCABA" }}
      >
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={isFocused ? draft : String(value)}
          placeholder={`${min} – ${max}`}
          onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, ""))}
          onFocus={() => {
            setIsFocused(true);
            setDraft(String(value));
          }}
          onBlur={(e) => {
            commit(e.target.value);
            setIsFocused(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              commit(draft);
              (e.currentTarget as HTMLInputElement).blur();
            }
          }}
          className="flex-1 pl-4 h-full text-[16px] font-normal text-[#6B7280] bg-transparent outline-none"
        />
        <div
          className="flex flex-col h-full"
          style={{ borderLeft: "1px solid #BFCABA" }}
        >
          <button
            type="button"
            onClick={() => onChange(clamp(value + 1))}
            className="flex-1 w-10 flex items-center justify-center hover:bg-[rgba(13,99,27,0.06)] transition-colors"
            aria-label="Tambah"
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 5L5 1L9 5"
                stroke="#40493D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div style={{ height: "1px", background: "#BFCABA" }} />
          <button
            type="button"
            onClick={() => onChange(clamp(value - 1))}
            className="flex-1 w-10 flex items-center justify-center hover:bg-[rgba(13,99,27,0.06)] transition-colors"
            aria-label="Kurangi"
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 1L5 5L9 1"
                stroke="#40493D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-[12px] font-medium leading-[14.4px] text-[#40493D]">
        Masukkan angka antara {min} sampai {max}.
      </p>
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-8 w-14 flex-shrink-0 items-center rounded-full p-[3px] box-border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#318741] focus-visible:ring-offset-2"
      style={{ background: checked ? "#318741" : "#BFCABA" }}
    >
      <span
        className="block h-[26px] w-[26px] rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: checked ? "translateX(24px)" : "translateX(0)" }}
      />
    </button>
  );
}

function CheckCard({
  checked,
  label,
  description,
  onChange,
}: {
  checked: boolean;
  label: string;
  description: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-4 p-4 rounded-[12px] text-left transition-colors"
      style={{
        border: `1px solid ${checked ? "#318741" : "#BFCABA"}`,
        background: checked ? "rgba(49,135,65,0.04)" : "#FFFFFF",
      }}
    >
      <div
        className="w-5 h-5 rounded-[4px] flex-shrink-0 flex items-center justify-center transition-colors"
        style={{
          border: `1px solid ${checked ? "transparent" : "#BFCABA"}`,
          background: checked ? "#0D631B" : "white",
        }}
      >
        {checked && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path
              d="M1 4L4.5 7.5L11 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className="flex flex-col gap-[2px]">
        <span className="text-[15px] font-semibold leading-[22px] text-[#181D17]">
          {label}
        </span>
        <span className="text-[12px] font-medium leading-[14.4px] text-[#40493D]">
          {description}
        </span>
      </div>
    </button>
  );
}

function RadioOption({
  selected,
  label,
  onSelect,
}: {
  selected: boolean;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex min-h-[54px] w-full items-center gap-3 rounded-[12px] px-4 py-3 text-left box-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#318741] focus-visible:ring-offset-2"
      style={{
        border: `1px solid ${selected ? "#318741" : "#BFCABA"}`,
        background: selected ? "rgba(49,135,65,0.04)" : "white",
      }}
    >
      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
        style={{ borderColor: selected ? "#0D631B" : "#BFCABA" }}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#0D631B]" />}
      </div>
      <span className="text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#181D17]">
        {label}
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Icons
═══════════════════════════════════════════════════════════════ */
function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
function RunnerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
    </svg>
  );
}
function ClipboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );
}
function WalkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM8.09 17.98 9 14l3 2.5V22h2v-7l-3-2.5 1-4C13.29 10 15.09 11 17 11v-2c-1.69 0-3.19-.85-4.09-2.16l-1-1.61C11.69 5.24 11 5 10.3 5c-.35 0-.62.1-.91.19L4 7.57V13h2V9l2.09-.77L6 17l2.09.98z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Constants
═══════════════════════════════════════════════════════════════ */
const GENERAL_HEALTH_OPTIONS = [
  { label: "Buruk", value: 1 },
  { label: "Cukup", value: 2 },
  { label: "Baik", value: 3 },
  { label: "Sangat Baik", value: 4 },
  { label: "Luar Biasa", value: 5 },
];

const STEP_META = [
  {
    title: "Informasi Dasar",
    subtitle: "Usia, jenis kelamin, dan pengukuran tubuh Anda",
    Icon: PersonIcon,
  },
  {
    title: "Kondisi Kesehatan",
    subtitle: "Penilaian kondisi fisik dan mental Anda",
    Icon: HeartIcon,
  },
  {
    title: "Gaya Hidup",
    subtitle: "Pilih yang mencerminkan kebiasaan sehari-hari Anda",
    Icon: RunnerIcon,
  },
  {
    title: "Pemeriksaan Medis",
    subtitle: "Data vital terakhir yang Anda ketahui",
    Icon: ClipboardIcon,
  },
];

/* ═══════════════════════════════════════════════════════════════
   OnboardingModal — main component
═══════════════════════════════════════════════════════════════ */
export default function OnboardingModal({
  open,
  onClose,
}: OnboardingModalProps) {
  const { user } = useAuth();
  const { handleSubmit, isSubmitting, error } = useOnboarding();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);

  // Reset to welcome screen whenever the modal opens
  useEffect(() => {
    if (open) {
      setStep(0);
      setForm(DEFAULT_FORM);
      setDirection("forward");
    }
  }, [open]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function goNext() {
    setDirection("forward");
    setStep((s) => s + 1);
  }

  function goBack() {
    setDirection("backward");
    setStep((s) => s - 1);
  }

  async function handleFormSubmit() {
    const payload: ScreeningRequest = {
      age: form.age,
      gender: form.gender,
      heightCm: form.heightCm,
      weightKg: form.weightKg,
      systolicBp: form.systolicBp,
      diastolicBp: form.diastolicBp,
      bloodGlucose: form.bloodGlucose,
    };
    const success = await handleSubmit(payload);
    if (success) onClose();
  }

  const bmi = calcBmi(form.heightCm, form.weightKg);
  const bmiSt = bmiStatus(bmi);
  const userName = user?.name ?? "Pengguna";

  if (!open) return null;

  // Safe – only accessed when step is 1–4
  const meta = step > 0 ? STEP_META[step - 1] : null;

  return (
    /* ── Overlay ── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      // Backdrop click only closes on welcome screen to prevent accidental mid-form dismissal
      onClick={step === 0 ? onClose : undefined}
    >
      {/* ── Modal card ── */}
      <div
        className="bg-white rounded-[24px] w-full max-w-[640px] relative overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0px 20px 60px rgba(0,0,0,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button – absolutely positioned, outside the animated layer */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full text-[#40493D] hover:bg-[rgba(0,0,0,0.05)] text-xl"
          aria-label="Tutup"
        >
          ×
        </button>

        {/* ── Animated step wrapper ── */}
        <div
          key={`step-${step}`}
          style={{
            animation:
              direction === "forward"
                ? "ob-slide-forward 0.3s ease"
                : "ob-slide-backward 0.3s ease",
          }}
        >
          {/* ════════════════════════════════════════════════
              STEP 0 — Welcome screen
          ════════════════════════════════════════════════ */}
          {step === 0 && (
            <>
              {/* Gradient hero banner */}
              <div
                className="relative w-full h-[160px] flex flex-col items-center justify-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #0D631B 0%, #318741 60%, #9CF49C 100%)",
                }}
              >
                {/* Decorative circles for depth */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 190,
                    height: 190,
                    background: "rgba(255,255,255,0.07)",
                    top: -55,
                    right: -45,
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 130,
                    height: 130,
                    background: "rgba(255,255,255,0.06)",
                    bottom: -35,
                    left: "7%",
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 75,
                    height: 75,
                    background: "rgba(255,255,255,0.05)",
                    top: 18,
                    left: "22%",
                  }}
                />

                {/* Heart logo mark */}
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-white font-bold text-[24px] mt-[6px]">
                  VitalsCheck
                </span>
              </div>

              {/* Welcome content */}
              <div className="p-8">
                <h2 className="text-[28px] font-bold text-[#181D17]">
                  Hei, {userName}! 👋
                </h2>
                <p className="text-[15px] text-[#40493D] mt-2 leading-[22px]">
                  Sebelum memulai, kami perlu mengetahui kondisi kesehatan dasar
                  Anda untuk memberikan analisis risiko yang personal.
                </p>

                {/* Benefit chips */}
                <div className="flex gap-3 mt-5 flex-wrap">
                  {(
                    [
                      "Deteksi Dini Risiko",
                      "Analisis Personal",
                      "Rekomendasi Harian",
                    ] as const
                  ).map((text) => (
                    <div
                      key={text}
                      className="rounded-[10px] px-4 py-3 flex items-center gap-2 flex-shrink-0"
                      style={{
                        background: "#F6FBF1",
                        border: "1px solid #DCE8DC",
                      }}
                    >
                      <span>✅</span>
                      <span className="text-[14px] font-medium text-[#181D17]">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Step preview strip */}
                <div className="flex items-center gap-2 mt-5 flex-wrap">
                  {(
                    [
                      "1 Profil",
                      "2 Kesehatan",
                      "3 Gaya Hidup",
                      "4 Medis",
                    ] as const
                  ).map((label, i) => (
                    <div key={label} className="flex items-center gap-2">
                      <div
                        className="rounded-[8px] px-3 py-2"
                        style={{ background: "rgba(49,135,65,0.08)" }}
                      >
                        <span className="text-[12px] font-semibold text-[#0F6D2B]">
                          {label}
                        </span>
                      </div>
                      {i < 3 && (
                        <span className="text-[#BFCABA] text-[16px] font-medium">
                          ›
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Time estimate */}
                <p className="text-[13px] text-[#40493D] italic mt-3">
                  ⏱ Hanya butuh ~2 menit
                </p>

                {/* CTA button */}
                <button
                  type="button"
                  onClick={goNext}
                  className="w-full mt-6 rounded-[14px] bg-[#318741] text-white h-[52px] text-[17px] font-semibold hover:bg-[#0F6D2B] transition-colors"
                >
                  Mulai Skrining Pertama →
                </button>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════════════
              STEPS 1–4 — Form steps
          ════════════════════════════════════════════════ */}
          {step >= 1 &&
            step <= 4 &&
            meta &&
            (() => {
              const StepIcon = meta.Icon;
              return (
                <>
                  {/* ── Progress header ── */}
                  <div className="px-8 pt-7 pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-[#40493D]">
                        Langkah {step} dari 4
                      </span>
                      <span className="text-[13px] font-semibold text-[#0F6D2B]">
                        {meta.title}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div
                      className="w-full h-[6px] rounded-full mt-3"
                      style={{ background: "#E5EDE5" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${step * 25}%`,
                          background: "#318741",
                        }}
                      />
                    </div>
                    {/* Step dots */}
                    <div className="flex gap-2 mt-3">
                      {[1, 2, 3, 4].map((dot) => (
                        <div
                          key={dot}
                          className="w-2 h-2 rounded-full"
                          style={
                            dot === step
                              ? { background: "#318741" }
                              : {
                                  background: "white",
                                  border: "1px solid #BFCABA",
                                }
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* ── Step title ── */}
                  <div className="px-8 pt-5">
                    <div className="flex items-center gap-3 text-[#0F6D2B]">
                      <StepIcon />
                      <h3 className="text-[20px] font-semibold text-[#181D17]">
                        {meta.title}
                      </h3>
                    </div>
                    <p className="text-[14px] text-[#40493D] mt-1">
                      {meta.subtitle}
                    </p>
                  </div>

                  {/* ── STEP 1: Informasi Dasar ── */}
                  {step === 1 && (
                    <div className="px-8 py-5 flex flex-col gap-5">
                      <div className="grid grid-cols-2 gap-6">
                        <SliderField
                          label="Usia"
                          value={form.age}
                          min={1}
                          max={100}
                          unit="Tahun"
                          onChange={(v) => set("age", v)}
                        />
                        <div className="flex flex-col gap-3">
                          <span className="text-[14px] font-semibold text-[#40493D]">
                            Jenis Kelamin
                          </span>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { key: "male" as const, label: "Laki-laki" },
                              { key: "female" as const, label: "Perempuan" },
                            ].map(({ key, label }) => {
                              const active = form.gender === key;
                              return (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={() => set("gender", key)}
                                  className="rounded-[10px] h-[46px] text-[14px] font-medium transition-colors"
                                  style={{
                                    background: active ? "#2E7D32" : "white",
                                    border: `1px solid ${active ? "#318741" : "#BFCABA"}`,
                                    color: active ? "white" : "#181D17",
                                  }}
                                >
                                  {label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <NumberStepper
                          label="Tinggi (cm)"
                          value={form.heightCm}
                          min={50}
                          max={250}
                          onChange={(v) => set("heightCm", v)}
                        />
                        <NumberStepper
                          label="Berat (kg)"
                          value={form.weightKg}
                          min={10}
                          max={300}
                          onChange={(v) => set("weightKg", v)}
                        />
                        {/* BMI display card */}
                        <div className="flex flex-col gap-[8.8px]">
                          <span
                            className="text-[14px] font-semibold text-[#40493D] invisible"
                            aria-hidden
                          >
                            &nbsp;
                          </span>
                          <div
                            className="flex items-center justify-between flex-1 px-4 rounded-[12px]"
                            style={{
                              background: "rgba(13,99,27,0.05)",
                              minHeight: "80px",
                              border: "1px solid rgba(13,99,27,0.08)",
                            }}
                          >
                            <div>
                              <p className="text-[11px] font-medium text-[#40493D]">
                                BMI
                              </p>
                              <p
                                className="text-[22px] font-bold mt-1"
                                style={{ color: "#0D631B" }}
                              >
                                {bmi > 0 ? bmi : "—"}
                              </p>
                            </div>
                            {bmi > 0 && (
                              <div
                                className="px-2 py-1 rounded-full"
                                style={{ background: bmiSt.bg }}
                              >
                                <span
                                  className="text-[11px] font-semibold"
                                  style={{ color: bmiSt.text }}
                                >
                                  {bmiSt.label}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: Kondisi Kesehatan ── */}
                  {step === 2 && (
                    <div className="px-8 py-5 flex flex-col gap-5">
                      {/* General health rating */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[14px] font-semibold text-[#40493D]">
                          Bagaimana Anda menilai kesehatan umum Anda?
                        </span>
                        <div className="flex gap-2">
                          {GENERAL_HEALTH_OPTIONS.map(({ label, value }) => {
                            const active = form.generalHealth === value;
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => set("generalHealth", value)}
                                className="flex-1 h-[42px] rounded-[10px] text-[13px] font-medium transition-colors"
                                style={{
                                  background: active ? "#318741" : "white",
                                  border: `1px solid ${active ? "transparent" : "#BFCABA"}`,
                                  color: active ? "white" : "#181D17",
                                }}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Physical / mental health days */}
                      <div className="grid grid-cols-2 gap-6">
                        <SliderField
                          label="Hari fisik kurang baik (30 hari)"
                          value={form.physHlth}
                          min={0}
                          max={30}
                          unit="Hari"
                          onChange={(v) => set("physHlth", v)}
                        />
                        <SliderField
                          label="Hari mental kurang baik (30 hari)"
                          value={form.mentHlth}
                          min={0}
                          max={30}
                          unit="Hari"
                          onChange={(v) => set("mentHlth", v)}
                        />
                      </div>

                      {/* Difficulty walking */}
                      <div
                        className="flex justify-between items-center p-4 rounded-[12px]"
                        style={{ border: "1px solid #BFCABA" }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[#BA1A1A]">
                            <WalkIcon />
                          </span>
                          <span className="text-[14px] font-medium text-[#181D17]">
                            Kesulitan berjalan atau menaiki tangga?
                          </span>
                        </div>
                        <ToggleSwitch
                          checked={form.diffWalk}
                          onChange={(v) => set("diffWalk", v)}
                        />
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: Gaya Hidup ── */}
                  {step === 3 && (
                    <div className="px-8 py-5">
                      <div className="grid grid-cols-2 gap-3">
                        <CheckCard
                          checked={form.smoking}
                          label="Merokok"
                          description="Pernah merokok ≥100 batang"
                          onChange={(v) => set("smoking", v)}
                        />
                        <CheckCard
                          checked={form.physActivity}
                          label="Aktif Fisik"
                          description="Olahraga rutin 30 hari terakhir"
                          onChange={(v) => set("physActivity", v)}
                        />
                        <CheckCard
                          checked={form.fruits}
                          label="Buah & Sayur"
                          description="Konsumsi harian sesuai anjuran"
                          onChange={(v) => set("fruits", v)}
                        />
                        <CheckCard
                          checked={form.heavyDrinker}
                          label="Konsumsi Alkohol"
                          description="Peminum berat (kriteria medis)"
                          onChange={(v) => set("heavyDrinker", v)}
                        />
                      </div>
                    </div>
                  )}

                  {/* ── STEP 4: Pemeriksaan Medis ── */}
                  {step === 4 && (
                    <div className="px-8 py-5 flex flex-col gap-5">
                      {/* Cholesterol check timing */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[14px] font-semibold text-[#40493D]">
                          Kapan terakhir cek kolesterol?
                        </span>
                        <RadioOption
                          selected={form.cholCheck === true}
                          label="Dalam 5 tahun terakhir"
                          onSelect={() => set("cholCheck", true)}
                        />
                        <RadioOption
                          selected={form.cholCheck === false}
                          label="Lebih dari 5 tahun / Belum pernah"
                          onSelect={() => set("cholCheck", false)}
                        />
                      </div>

                      {/* Blood pressure */}
                      <div className="grid grid-cols-2 gap-4">
                        <NumberStepper
                          label="Tekanan Darah Sistolik (mmHg)"
                          value={form.systolicBp}
                          min={60}
                          max={250}
                          onChange={(v) => set("systolicBp", v)}
                        />
                        <NumberStepper
                          label="Tekanan Darah Diastolik (mmHg)"
                          value={form.diastolicBp}
                          min={40}
                          max={150}
                          onChange={(v) => set("diastolicBp", v)}
                        />
                      </div>

                      {/* Blood glucose */}
                      <div style={{ maxWidth: "calc(50% - 8px)" }}>
                        <NumberStepper
                          label="Gula Darah (mg/dL)"
                          value={form.bloodGlucose}
                          min={50}
                          max={500}
                          onChange={(v) => set("bloodGlucose", v)}
                        />
                      </div>

                      {/* API error */}
                      {error && (
                        <div
                          className="px-4 py-3 rounded-[12px] text-[14px] font-medium text-[#7F1D1D] text-center"
                          style={{
                            background: "#FEE2E2",
                            border: "1px solid #FCA5A5",
                          }}
                        >
                          {error}
                        </div>
                      )}

                      {/* Privacy note */}
                      <p className="text-[12px] text-[#40493D]">
                        🔒 Data Anda aman dan dienkripsi sesuai standar privasi
                        medis.
                      </p>
                    </div>
                  )}

                  {/* ── Navigation footer ── */}
                  <div className="px-8 pb-7 mt-2 flex justify-between items-center">
                    {/* Back button – invisible placeholder on step 1 to keep layout stable */}
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={goBack}
                        className="rounded-[10px] h-[46px] px-6 text-[15px] font-medium text-[#40493D] hover:bg-[#F6FBF1] transition-colors"
                        style={{ border: "1px solid #BFCABA" }}
                      >
                        ← Kembali
                      </button>
                    ) : (
                      <div />
                    )}

                    {/* Next / Submit button */}
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="rounded-[10px] h-[46px] px-8 bg-[#318741] text-white text-[15px] font-semibold hover:bg-[#0F6D2B] transition-colors"
                      >
                        Selanjutnya →
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFormSubmit}
                        disabled={isSubmitting}
                        className="rounded-[10px] h-[46px] px-8 bg-[#318741] text-white text-[15px] font-semibold hover:bg-[#0F6D2B] transition-colors disabled:opacity-60 flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="3"
                              />
                              <path
                                d="M12 2a10 10 0 0 1 10 10"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            </svg>
                            Memproses...
                          </>
                        ) : (
                          "Kirim & Lihat Hasil →"
                        )}
                      </button>
                    )}
                  </div>
                </>
              );
            })()}
        </div>
      </div>
    </div>
  );
}
