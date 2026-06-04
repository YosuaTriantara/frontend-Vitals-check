"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ScreeningForm from "@/components/forms/ScreeningForm";
import apiClient from "@/lib/api";
import { setLastScreeningInputs } from "@/utils/storage";
import type { ScreeningRequest } from "@/types/screening";
import type { ModelStatus } from "@/hooks/useScreening";

// ─── Progress steps shown inside the submission overlay ───────────────────────
const PROGRESS_STEPS = [
  { pct: 15, label: "Mengirim data kesehatan...", delay: 700 },
  { pct: 30, label: "Menghubungi model AI...", delay: 2500 },
  { pct: 52, label: "Model AI sedang memproses data Anda...", delay: 8000 },
  { pct: 70, label: "Menganalisis faktor risiko...", delay: 22000 },
  { pct: 84, label: "Menyusun prediksi per penyakit...", delay: 38000 },
  { pct: 93, label: "Menyiapkan rekomendasi untuk Anda...", delay: 52000 },
];

// ─── Submitting overlay ───────────────────────────────────────────────────────
// Inner component — mounts only when visible=true, so state is always fresh
function SubmittingOverlayContent({
  isModelWarmingUp,
}: {
  isModelWarmingUp: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const [stepLabel, setStepLabel] = useState("Menyiapkan permintaan...");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Schedule progress steps via setTimeout — no synchronous setState
    PROGRESS_STEPS.forEach(({ pct, label, delay }) => {
      const t = setTimeout(() => {
        setProgress(pct);
        setStepLabel(label);
      }, delay);
      timersRef.current.push(t);
    });
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  return (
    <div
      className="bg-white rounded-[24px] w-full max-w-[400px] flex flex-col gap-6 p-8"
      style={{ boxShadow: "0px 24px 48px -8px rgba(0,0,0,0.35)" }}
    >
      {/* Icon + labels */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(13,99,27,0.08)" }}
        >
          <svg
            className="animate-spin w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="10" stroke="#EBEFE5" strokeWidth="3" />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="#318741"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h3 className="text-[18px] font-semibold text-[#0F6D2B]">
          Memproses Skrining
        </h3>
        <p className="text-[14px] text-[#40493D] min-h-[20px]">{stepLabel}</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-[#EBEFE5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#318741] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[12px] font-semibold text-[#318741]">
            {progress}%
          </span>
          <span className="text-[12px] text-[#40493D]">
            Estimasi: 30–90 detik
          </span>
        </div>
      </div>

      {/* Warming-up notice */}
      {isModelWarmingUp && (
        <div
          className="flex items-start gap-2 px-4 py-3 rounded-[12px]"
          style={{ background: "#FEF9C3", border: "1px solid #FDE68A" }}
        >
          <svg
            className="shrink-0 mt-0.5"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#B45309"
          >
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
          <p className="text-[12px] text-[#854D0E]">
            Model AI sedang dalam proses pemanasan. Proses inferensi mungkin
            memakan waktu lebih dari biasanya.
          </p>
        </div>
      )}

      <p className="text-[12px] font-medium text-[#40493D] text-center">
        Mohon jangan menutup atau me-refresh halaman ini.
      </p>
    </div>
  );
}

// ─── Model status banner ──────────────────────────────────────────────────────
function ModelStatusBanner({ status }: { status: ModelStatus | null }) {
  if (!status || status === "ready" || status === "not_configured") return null;

  if (status === "warming_up") {
    return (
      <div
        className="flex items-start gap-3 px-5 py-4 rounded-[16px] min-w-0"
        style={{ background: "#FEF9C3", border: "1px solid #FDE68A" }}
      >
        <svg
          className="shrink-0 mt-0.5 animate-pulse"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#B45309"
        >
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </svg>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-[14px] font-semibold text-[#854D0E]">
            Model AI sedang menyiapkan diri
          </p>
          <p className="text-[13px] text-[#854D0E]">
            Proses pemanasan memakan waktu 1–2 menit. Anda tetap bisa mengisi
            form sekarang, namun proses inferensi mungkin lebih lama dari
            biasanya.
          </p>
        </div>
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div
        className="flex items-start gap-3 px-5 py-4 rounded-[16px] min-w-0"
        style={{ background: "#FEE2E2", border: "1px solid #FCA5A5" }}
      >
        <svg
          className="shrink-0 mt-0.5"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#BA1A1A"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <p className="text-[14px] text-[#7F1D1D]">
          Model AI sedang tidak tersedia. Hasil skrining akan menggunakan
          estimasi sementara.
        </p>
      </div>
    );
  }

  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ScreeningPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelStatus, setModelStatus] = useState<ModelStatus | null>(null);
  const cancelledRef = useRef(false);

  // Fetch model status and start polling if warming_up
  useEffect(() => {
    cancelledRef.current = false;

    async function poll() {
      if (cancelledRef.current) return;
      try {
        const res = await apiClient.get<{
          success: boolean;
          data: { status: ModelStatus };
        }>("/model/status");
        if (cancelledRef.current) return;
        const s = res.data.data.status;
        setModelStatus(s);
        // Continue polling while warming up
        if (s === "warming_up") {
          setTimeout(poll, 10_000);
        }
      } catch {
        if (!cancelledRef.current) setModelStatus("unavailable");
      }
    }

    poll();

    return () => {
      cancelledRef.current = true;
    };
  }, []);

  async function handleSubmit(data: ScreeningRequest) {
    setError("");
    setLoading(true);
    try {
      setLastScreeningInputs(data);
      const res = await apiClient.post("/screenings", data);
      const isWarmingUp = res.data.meta?.isWarmingUp ?? false;
      router.push(
        `/results/${res.data.data.id}${isWarmingUp ? "?warmingUp=1" : ""}`,
      );
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ??
        "Terjadi kesalahan. Silakan coba lagi.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Fullscreen overlay during inference — mounts fresh each time loading=true */}
      {loading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(15,109,43,0.88)",
            backdropFilter: "blur(4px)",
          }}
        >
          <SubmittingOverlayContent
            isModelWarmingUp={modelStatus === "warming_up"}
          />
        </div>
      )}

      <div className="px-4 py-6 md:px-9 md:py-8 flex flex-col gap-6">
        <section className="py-5">
          <div className="max-w-[576px]">
            <h1
              className="text-[32px] font-bold leading-[41.6px] text-[#0F6D2B]"
              style={{ letterSpacing: "-0.32px" }}
            >
              Lakukan Deteksi Risiko Kesehatan Anda Sekarang!
            </h1>
            <p className="mt-3 text-[18px] font-normal leading-[28.8px] text-[#40493D]">
              Isi form data berikut dengan hasil kesehatan anda selama seminggu
              terakhir....
            </p>
          </div>
        </section>

        {/* Model status banner (only visible when not ready) */}
        <ModelStatusBanner status={modelStatus} />

        <ScreeningForm
          onSubmit={handleSubmit}
          isLoading={loading}
          error={error || undefined}
        />
      </div>
    </>
  );
}
