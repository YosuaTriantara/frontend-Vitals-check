"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScreeningForm from "@/components/forms/ScreeningForm";
import apiClient from "@/lib/api";
import { setLastScreeningInputs } from "@/utils/storage";
import type { ScreeningRequest } from "@/types/screening";

export default function ScreeningPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(data: ScreeningRequest) {
    setError("");
    setLoading(true);
    try {
      setLastScreeningInputs(data);
      const res = await apiClient.post("/screenings", data);
      router.push(`/results/${res.data.data.id}`);
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
    <div className="px-9 py-8 flex flex-col gap-6">
      {/* Welcome Section */}
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

      {/* Form */}
      <ScreeningForm
        onSubmit={handleSubmit}
        isLoading={loading}
        error={error || undefined}
      />
    </div>
  );
}
