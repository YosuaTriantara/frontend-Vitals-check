'use client';

import Link from 'next/link';
import { useHealthData } from '@/hooks/useHealthData';
import {
  formatDate,
  formatRiskCategory,
  formatRiskScore,
} from '@/utils/formatters';
import { RISK_COLORS } from '@/lib/constants';
import Spinner from '@/components/ui/Spinner';
import Alert from '@/components/ui/Alert';
import { getBPCategory, getGlucoseStatus } from '@/utils/calculations';

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
            style={{ letterSpacing: '-0.32px' }}
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
          style={{ border: '1px solid #DCE8DC' }}
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

            const bpStatus =
              screening.systolicBp != null && screening.diastolicBp != null
                ? getBPCategory(screening.systolicBp, screening.diastolicBp).label
                : null;

            const glucoseStatus =
              screening.bloodGlucose != null
                ? getGlucoseStatus(screening.bloodGlucose).label
                : null;

            return (
              <Link
                key={screening.id}
                href={`/results/${screening.id}`}
                className="bg-white rounded-[20px] px-5 py-5 md:px-6 md:py-5 hover:shadow-md transition-shadow min-w-0 overflow-hidden"
                style={{
                  border: '1px solid rgba(13,99,27,0.05)',
                  boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 min-w-0">
                  <div className="flex flex-col gap-3 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 sm:flex-wrap min-w-0">
                      <p className="text-[15px] md:text-[16px] font-semibold text-[#181D17] leading-[22px] break-words">
                        Skrining —{' '}
                        {screening.createdAt
                          ? formatDate(screening.createdAt)
                          : 'Tanggal tidak tersedia'}
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

                    <p className="text-[14px] text-[#40493D] leading-[21px] break-words">
                      Skor Kesehatan:{' '}
                      <strong>{formatRiskScore(screening.riskScore)}/100</strong>
                    </p>

                    <div className="flex flex-wrap gap-2 min-w-0">
                      {screening.bmi != null && (
                        <span className="px-3 py-1 rounded-full bg-[#F0F5EB] text-[#40493D] text-[12px] font-medium">
                          BMI {screening.bmi.toFixed(1)}
                        </span>
                      )}

                      {screening.systolicBp != null &&
                        screening.diastolicBp != null && (
                          <span className="px-3 py-1 rounded-full bg-[#F0F5EB] text-[#40493D] text-[12px] font-medium">
                            BP {screening.systolicBp}/{screening.diastolicBp}
                          </span>
                        )}

                      {screening.bloodGlucose != null && (
                        <span className="px-3 py-1 rounded-full bg-[#F0F5EB] text-[#40493D] text-[12px] font-medium">
                          Gula {screening.bloodGlucose} mg/dL
                        </span>
                      )}
                    </div>

                    <p className="text-[13px] leading-[19px] text-[#5E6D60] break-words">
                      {[
                        bpStatus ? `Status BP: ${bpStatus}` : null,
                        glucoseStatus ? `Gula: ${glucoseStatus}` : null,
                      ]
                        .filter(Boolean)
                        .join(' • ') || 'Klik untuk melihat analisis lengkap'}
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