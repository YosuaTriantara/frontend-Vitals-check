'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ScreeningRequest } from '@/types/screening';

interface FormState {
  age: number;
  gender: 'male' | 'female';
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

function calcBmi(h: number, w: number): number {
  if (h <= 0) return 0;
  return parseFloat((w / (h / 100) ** 2).toFixed(1));
}

function bmiStatus(bmi: number) {
  if (bmi < 18.5) return { label: 'Kurang', bg: '#FEF9C3', text: '#854D0E' };
  if (bmi < 25) return { label: 'Normal', bg: '#9CF49C', text: '#19722B' };
  if (bmi < 30) return { label: 'Kelebihan', bg: '#FFEDD5', text: '#9A3412' };
  return { label: 'Obesitas', bg: '#FEE2E2', text: '#7F1D1D' };
}

function trackStyle(value: number, min: number, max: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #318741 0%, #318741 ${pct}%, #BFCABA ${pct}%, #BFCABA 100%)`,
  };
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-[#F6FBF1] rounded-[20px] p-5 md:p-6 xl:p-8 flex flex-col gap-5 xl:gap-6 min-w-0 overflow-hidden"
      style={{
        border: '1px solid #DCE8DC',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="shrink-0 text-[#0F6D2B]">{icon}</span>
        <h3 className="text-[20px] md:text-[24px] font-semibold leading-[28px] md:leading-[33.6px] text-[#181D17] break-words">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  unit,
  valueColor = '#0D631B',
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
    <div className="flex flex-col gap-4 min-w-0">
      <div className="flex items-start justify-between gap-4 min-w-0">
        <span className="text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#40493D] break-words">
          {label}
        </span>
        <span
          className="text-[14px] font-bold leading-[16.8px] tracking-[0.14px] shrink-0"
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
    <div className="flex flex-col gap-[8.8px] min-w-0">
      <label className="text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#40493D] break-words">
        {label}
      </label>

      <div
        className="flex items-center h-[50px] bg-white rounded-[12px] overflow-hidden min-w-0"
        style={{ border: '1px solid #BFCABA' }}
      >
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={isFocused ? draft : String(value)}
          placeholder={`${min} - ${max}`}
          onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, ''))}
          onFocus={() => {
            setIsFocused(true);
            setDraft(String(value));
          }}
          onBlur={(e) => {
            commit(e.target.value);
            setIsFocused(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              commit(draft);
              (e.currentTarget as HTMLInputElement).blur();
            }
          }}
          className="flex-1 min-w-0 pl-4 h-full text-[16px] font-normal text-[#6B7280] bg-transparent outline-none"
        />

        <div className="flex flex-col h-full shrink-0" style={{ borderLeft: '1px solid #BFCABA' }}>
          <button
            type="button"
            onClick={() => onChange(clamp(value + 1))}
            className="flex-1 w-10 flex items-center justify-center hover:bg-[rgba(13,99,27,0.06)] transition-colors"
            aria-label="Increment"
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 5L5 1L9 5" stroke="#40493D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div style={{ height: '1px', background: '#BFCABA' }} />

          <button
            type="button"
            onClick={() => onChange(clamp(value - 1))}
            className="flex-1 w-10 flex items-center justify-center hover:bg-[rgba(13,99,27,0.06)] transition-colors"
            aria-label="Decrement"
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#40493D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-[12px] font-medium leading-[14.4px] text-[#40493D] break-words">
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
      className="relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-[3px] box-border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#318741] focus-visible:ring-offset-2"
      style={{ background: checked ? '#318741' : '#BFCABA' }}
    >
      <span
        className="block h-[26px] w-[26px] rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: checked ? 'translateX(24px)' : 'translateX(0)' }}
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
      className="flex items-start gap-4 p-4 rounded-[12px] text-left transition-colors min-w-0"
      style={{
        border: `1px solid ${checked ? '#318741' : '#BFCABA'}`,
        background: checked ? 'rgba(49,135,65,0.04)' : '#FFFFFF',
      }}
    >
      <div
        className="w-5 h-5 mt-0.5 rounded-[4px] shrink-0 flex items-center justify-center transition-colors"
        style={{
          border: `1px solid ${checked ? 'transparent' : '#BFCABA'}`,
          background: checked ? '#0D631B' : 'white',
        }}
      >
        {checked && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-[15px] md:text-[16px] font-normal leading-[22px] md:leading-[24px] text-[#181D17] break-words">
          {label}
        </span>
        <span className="text-[12px] font-medium leading-[16px] text-[#40493D] break-words">
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
      className="flex min-h-[54px] w-full items-center gap-3 rounded-[12px] px-4 py-3 text-left box-border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#318741] focus-visible:ring-offset-2 min-w-0"
      style={{
        border: `1px solid ${selected ? '#318741' : '#BFCABA'}`,
        background: selected ? 'rgba(49,135,65,0.04)' : 'white',
      }}
    >
      <div
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
        style={{ borderColor: selected ? '#0D631B' : '#BFCABA' }}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#0D631B]" />}
      </div>

      <span className="text-[14px] font-semibold leading-[18px] tracking-[0.14px] text-[#181D17] break-words">
        {label}
      </span>
    </button>
  );
}

const PersonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const RunnerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const WalkIcon = () => (
  <svg width="14" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM8.09 17.98 9 14l3 2.5V22h2v-7l-3-2.5 1-4C13.29 10 15.09 11 17 11v-2c-1.69 0-3.19-.85-4.09-2.16l-1-1.61C11.69 5.24 11 5 10.3 5c-.35 0-.62.1-.91.19L4 7.57V13h2V9l2.09-.77L6 17l2.09.98z" />
  </svg>
);

const LockIcon = () => (
  <svg width="11" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

const GENERAL_HEALTH_OPTIONS = [
  { label: 'Buruk', value: 1 },
  { label: 'Cukup', value: 2 },
  { label: 'Baik', value: 3 },
  { label: 'Sangat Baik', value: 4 },
  { label: 'Luar Biasa', value: 5 },
];

export interface ScreeningFormProps {
  onSubmit: (data: ScreeningRequest) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  compact?: boolean;
}

export default function ScreeningForm({
  onSubmit,
  isLoading = false,
  error,
  compact = false,
}: ScreeningFormProps) {
  const [form, setForm] = useState<FormState>({
    age: 45,
    gender: 'male',
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
  });

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  const bmi = calcBmi(form.heightCm, form.weightKg);
  const bmiSt = bmiStatus(bmi);

  async function handleSubmit() {
    await onSubmit({
      age: form.age,
      gender: form.gender,
      heightCm: form.heightCm,
      weightKg: form.weightKg,
      systolicBp: form.systolicBp,
      diastolicBp: form.diastolicBp,
      bloodGlucose: form.bloodGlucose,
    });
  }

  return (
    <div className={`mx-auto w-full max-w-[1040px] flex flex-col gap-5 xl:gap-6 min-w-0 ${compact ? '' : 'pb-16'}`}>
      <SectionCard icon={<PersonIcon />} title="Informasi Dasar">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 min-w-0">
          <NumberStepper
            label="Usia (tahun)"
            value={form.age}
            min={0}
            max={100}
            onChange={(v) => set('age', v)}
          />

          <div className="flex flex-col gap-4 min-w-0">
            <span className="text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#40493D]">
              Jenis Kelamin
            </span>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {([
                { key: 'male', label: 'Laki-laki' },
                { key: 'female', label: 'Perempuan' },
              ] as const).map(({ key, label }) => {
                const active = form.gender === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => set('gender', key)}
                    className="py-3 px-3 rounded-[12px] text-[15px] md:text-[16px] font-normal leading-[24px] transition-colors"
                    style={{
                      background: active ? '#2E7D32' : 'white',
                      border: `1px solid ${active ? '#318741' : '#BFCABA'}`,
                      color: active ? '#F6FFF4' : '#181D17',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-5 border-t border-[rgba(191,202,186,0.3)]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6 min-w-0">
            <NumberStepper
              label="Tinggi Badan (cm)"
              value={form.heightCm}
              min={50}
              max={250}
              onChange={(v) => set('heightCm', v)}
            />

            <NumberStepper
              label="Berat Badan (kg)"
              value={form.weightKg}
              min={10}
              max={300}
              onChange={(v) => set('weightKg', v)}
            />

            <div className="flex flex-col gap-[8.8px] min-w-0 md:col-span-2 xl:col-span-1">
              <span className="hidden xl:block text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#40493D]">
                &nbsp;
              </span>

              <div
                className="flex items-center justify-between gap-4 px-4 py-4 rounded-[12px] min-h-[78px] min-w-0"
                style={{ background: 'rgba(13,99,27,0.05)' }}
              >
                <div className="min-w-0">
                  <p className="text-[12px] font-medium leading-[14.4px] text-[#40493D]">
                    BMI Kalkulasi
                  </p>
                  <p className="text-[24px] font-bold leading-[33.6px] mt-2" style={{ color: '#0D631B' }}>
                    {bmi > 0 ? bmi : '—'}
                  </p>
                </div>

                {bmi > 0 && (
                  <div
                    className="px-3 py-[3px] rounded-full shrink-0"
                    style={{ background: bmiSt.bg, paddingBottom: '4.39px' }}
                  >
                    <span className="text-[12px] font-medium leading-[14.4px]" style={{ color: bmiSt.text }}>
                      {bmiSt.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={<HeartIcon />} title="Kondisi Kesehatan">
        <div className="flex flex-col gap-4 min-w-0">
          <span className="text-[14px] font-semibold leading-[18px] tracking-[0.14px] text-[#40493D] break-words">
            Bagaimana Anda menilai kesehatan umum Anda?
          </span>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {GENERAL_HEALTH_OPTIONS.map(({ label, value }) => {
              const active = form.generalHealth === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('generalHealth', value)}
                  className="py-[11px] px-3 rounded-[12px] text-[12px] font-medium leading-[14.4px] transition-colors min-w-0"
                  style={{
                    background: active ? '#318741' : 'white',
                    border: `1px solid ${active ? 'white' : '#BFCABA'}`,
                    color: active ? '#FAFFF9' : '#181D17',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 min-w-0">
          <SliderField
            label="Hari Kesehatan Fisik Kurang Baik (30 hari terakhir)"
            value={form.physHlth}
            min={0}
            max={30}
            unit="Hari"
            onChange={(v) => set('physHlth', v)}
          />

          <SliderField
            label="Hari Kesehatan Mental Kurang Baik (30 hari terakhir)"
            value={form.mentHlth}
            min={0}
            max={30}
            unit="Hari"
            onChange={(v) => set('mentHlth', v)}
          />
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-[16px] min-w-0"
          style={{ border: '1px solid #BFCABA' }}
        >
          <div className="flex items-start gap-4 min-w-0">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(255,218,214,0.2)',
                border: '1px solid rgba(186,26,26,0.15)',
              }}
            >
              <span className="text-[#BA1A1A]">
                <WalkIcon />
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[15px] md:text-[16px] font-normal leading-[22px] md:leading-[24px] text-[#181D17] break-words">
                Kesulitan Berjalan atau Menaiki Tangga?
              </p>
              <p className="mt-1 text-[12px] font-medium leading-[16px] text-[#40493D] break-words">
                Kondisi fisik yang membatasi mobilitas
              </p>
            </div>
          </div>

          <ToggleSwitch checked={form.diffWalk} onChange={(v) => set('diffWalk', v)} />
        </div>
      </SectionCard>

      <SectionCard icon={<RunnerIcon />} title="Gaya Hidup">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
          <CheckCard checked={form.smoking} label="Merokok" description="Pernah merokok setidaknya 100 batang" onChange={(v) => set('smoking', v)} />
          <CheckCard checked={form.physActivity} label="Aktivitas Fisik" description="Olahraga rutin dalam 30 hari terakhir" onChange={(v) => set('physActivity', v)} />
          <CheckCard checked={form.fruits} label="Konsumsi Buah & Sayur" description="Mengkonsumsi harian sesuai anjuran" onChange={(v) => set('fruits', v)} />
          <CheckCard checked={form.heavyDrinker} label="Konsumsi Alkohol Berat" description="Peminum berat sesuai kriteria medis" onChange={(v) => set('heavyDrinker', v)} />
        </div>
      </SectionCard>

      <SectionCard icon={<ClipboardIcon />} title="Pemeriksaan Medis">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-start gap-6 xl:gap-8 min-w-0">
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            <div className="flex flex-col gap-4 min-w-0">
              <p className="text-[15px] md:text-[16px] font-normal leading-[22px] md:leading-[24px] text-[#40493D] break-words">
                Kapan terakhir kali Anda melakukan pengecekan kolesterol?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-3">
                <RadioOption
                  selected={form.cholCheck === true}
                  label="Dalam 5 tahun terakhir"
                  onSelect={() => set('cholCheck', true)}
                />
                <RadioOption
                  selected={form.cholCheck === false}
                  label="Lebih dari 5 tahun lalu / Belum pernah"
                  onSelect={() => set('cholCheck', false)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 pt-5 border-t border-[rgba(191,202,186,0.3)] min-w-0">
              <p className="text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#40493D]">
                Data Vital Terakhir
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
                <NumberStepper
                  label="Tekanan Darah Sistolik (mmHg)"
                  value={form.systolicBp}
                  min={60}
                  max={250}
                  onChange={(v) => set('systolicBp', v)}
                />

                <NumberStepper
                  label="Tekanan Darah Diastolik (mmHg)"
                  value={form.diastolicBp}
                  min={40}
                  max={150}
                  onChange={(v) => set('diastolicBp', v)}
                />
              </div>

              <div className="w-full md:max-w-[calc(50%-8px)] xl:max-w-[calc(50%-8px)]">
                <NumberStepper
                  label="Gula Darah (mg/dL)"
                  value={form.bloodGlucose}
                  min={50}
                  max={500}
                  onChange={(v) => set('bloodGlucose', v)}
                />
              </div>
            </div>
          </div>

          <div className="hidden xl:block shrink-0 w-64 rounded-[16px] overflow-hidden" style={{ background: '#E0E4DA' }}>
            <div className="relative h-64 w-full">
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #9CF49C 0%, #2E7D32 60%, #0D631B 100%)',
                  opacity: 0.85,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.1) 0%, transparent 40%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
                  <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-1 14H7v-2h4v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{ background: 'linear-gradient(0deg, rgba(13,99,27,0.6) 0%, rgba(13,99,27,0) 100%)' }}
              >
                <p className="text-[12px] font-bold leading-[14.4px] text-white">
                  Pentingnya Cek Rutin
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="flex flex-col items-center gap-5 md:gap-6 pt-6 md:pt-10 min-w-0">
        {error && (
          <div className="w-full max-w-[448px] px-4 py-3 rounded-[12px] bg-[#FEE2E2] border border-[#FCA5A5] text-[14px] font-medium text-[#7F1D1D] text-center break-words">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full max-w-[448px] relative flex items-center justify-center gap-3 rounded-[16px] text-white transition-opacity disabled:opacity-70 px-5 py-4 md:py-5"
          style={{
            background: '#318741',
            boxShadow:
              '0px 4px 6px -4px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)',
          }}
        >
          {isLoading ? (
            <svg className="animate-spin shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : (
            <Image src="/icons/icon-screening-btn.svg" alt="" width={16} height={20} className="shrink-0" />
          )}

          <span className="text-[18px] md:text-[24px] font-semibold leading-[26px] md:leading-[33.6px] text-center">
            {isLoading ? 'Memproses...' : 'Deteksi Risiko PTM'}
          </span>
        </button>

        <div className="flex items-start justify-center gap-2 text-[#40493D] max-w-[448px] text-center">
          <span className="mt-0.5 shrink-0">
            <LockIcon />
          </span>
          <span className="text-[12px] font-medium leading-[16px]">
            Data Anda aman dan dienkripsi sesuai standar privasi medis.
          </span>
        </div>
      </div>
    </div>
  );
}