"use client";

import Link from "next/link";
import { useHealthData } from "@/hooks/useHealthData";
import {
  formatDate,
  formatRiskCategory,
  formatRiskScore,
} from "@/utils/formatters";
import { RISK_COLORS } from "@/lib/constants";
import Spinner from "@/components/ui/Spinner";
import Alert from "@/components/ui/Alert";
import { getBMICategory, getGenHlthCategory } from "@/utils/calculations";

// ─── Inline SVG icons used in badge pills ─────────────────────────────────────
const BmiIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const RunnerIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
  </svg>
);

// ─── Badge pill with optional inline icon ─────────────────────────────────────
function BadgePill({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F5EB] text-[#40493D] text-[12px] font-medium">
      {icon}
      {text}
    </span>
  );
}

export default function HealthDataPage() {
  const { screenings, isLoading, error } = useHealthData();

  if (isLoading) {
    return (
      <div className="px-4 py-6 md:px-6 lg:px-9 lg:py-8 flex items-center justify-center min-h-[400px]">
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:px-6 lg:px-9 lg:py-8 flex flex-col gap-5 lg:gap-6 overflow-x-hidden">
      <section className="py-2 md:py-5 min-w-0">
        <div className="max-w-[720px] min-w-0">
          <h1
            className="text-[26px] md:text-[32px] font-bold leading-[34px] md:leading-[41.6px] text-[#0F6D2B] break-words"
            style={{ letterSpacing: "-0.32px" }}
          >
            Data Kesehatan
          </h1>

          <p className="mt-3 text-[15px] md:text-[18px] font-normal leading-[24px] md:leading-[28.8px] text-[#40493D] break-words">
            Riwayat singkat seluruh skrining Anda. Klik satu entri untuk membuka
            analisis lengkap dan rekomendasi detailnya.
          </p>
        </div>
      </section>

      {error && <Alert variant="error">{error}</Alert>}

      {screenings.length === 0 ? (
        <div
          className="bg-[#F6FBF1] rounded-[20px] px-5 py-10 md:p-16 flex flex-col items-center gap-4 text-center min-w-0"
          style={{ border: "1px solid #DCE8DC" }}
        >
          <p className="text-[16px] md:text-[18px] font-medium text-[#40493D] break-words">
            Belum ada data skrining.
          </p>

          <Link
            href="/screening"
            className="w-full sm:w-auto justify-center px-6 py-3 bg-[#318741] text-white rounded-[12px] text-[14px] font-semibold hover:bg-[#0F6D2B] transition-colors"
          >
            Mulai Skrining Pertama
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 min-w-0">
          {screenings.map((screening) => {
            const riskColor = RISK_COLORS[screening.riskCategory];

            // ── Derived labels ──────────────────────────────────────────────
            const bmiLabel =
              screening.bmi != null
                ? getBMICategory(screening.bmi).label
                : null;

            const genHlthLabel =
              screening.genHlth != null
                ? getGenHlthCategory(screening.genHlth).label
                : null;

            const physHlthDays =
              screening.physHlth != null ? screening.physHlth : null;

            // Status summary line
            const statusParts = [
              bmiLabel ? `BMI ${bmiLabel}` : null,
              genHlthLabel ? `Kondisi ${genHlthLabel}` : null,
              physHlthDays != null
                ? `Fisik terganggu ${physHlthDays} hr/bln`
                : null,
            ].filter(Boolean);

            return (
              <Link
                key={screening.id}
                href={`/results/${screening.id}`}
                className="bg-white rounded-[20px] px-5 py-5 md:px-6 md:py-5 hover:shadow-md transition-shadow min-w-0 overflow-hidden"
                style={{
                  border: "1px solid rgba(13,99,27,0.05)",
                  boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 min-w-0">
                  <div className="flex flex-col gap-3 min-w-0">
                    {/* Date + risk badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 sm:flex-wrap min-w-0">
                      <p className="text-[15px] md:text-[16px] font-semibold text-[#181D17] leading-[22px] break-words">
                        Skrining —{" "}
                        {screening.createdAt
                          ? formatDate(screening.createdAt)
                          : "Tanggal tidak tersedia"}
                      </p>

                      <div
                        className="self-start px-3 py-1 rounded-full text-[12px] font-semibold shrink-0"
                        style={{
                          background: riskColor.bg,
                          color: riskColor.text,
                        }}
                      >
                        Risiko {formatRiskCategory(screening.riskCategory)}
                      </div>
                    </div>

                    {/* Health score */}
                    <p className="text-[14px] text-[#40493D] leading-[21px] break-words">
                      Skor Kesehatan:{" "}
                      <strong>
                        {formatRiskScore(screening.riskScore)}/100
                      </strong>
                    </p>

                    {/* Badge pills with inline SVG icons */}
                    <div className="flex flex-wrap gap-2 min-w-0">
                      {screening.bmi != null && (
                        <BadgePill
                          icon={<BmiIcon />}
                          text={`BMI ${screening.bmi.toFixed(1)}`}
                        />
                      )}

                      {screening.genHlth != null && (
                        <BadgePill
                          icon={<HeartIcon />}
                          text={`Kondisi ${screening.genHlth}/5`}
                        />
                      )}

                      {screening.physHlth != null && (
                        <BadgePill
                          icon={<CalendarIcon />}
                          text={`${screening.physHlth} hr fisik`}
                        />
                      )}

                      {screening.physActivity != null && (
                        <BadgePill
                          icon={<RunnerIcon />}
                          text={
                            screening.physActivity
                              ? "Aktif Fisik"
                              : "Tidak Aktif"
                          }
                        />
                      )}
                    </div>

                    {/* Status summary */}
                    <p className="text-[13px] leading-[19px] text-[#5E6D60] break-words">
                      {statusParts.join(" • ") ||
                        "Klik untuk melihat analisis lengkap"}
                    </p>
                  </div>

                  <div className="text-[#0D631B] text-[14px] font-semibold whitespace-nowrap self-start md:self-center shrink-0">
                    Lihat Detail →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
