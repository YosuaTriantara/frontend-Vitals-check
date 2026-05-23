import Image from "next/image";
import Link from "next/link";
import HealthTrendChart from "@/components/dashboard/HealthTrendChart";
import LastScreeningCard from "@/components/dashboard/LastScreeningCard";
import QuickStats from "@/components/dashboard/QuickStats";

/* ─── Card: Health Score ─────────────────────────────────────── */
function HealthScoreCard() {
  return (
    <div
      className="bg-white rounded-[20px] p-8 flex flex-col justify-between"
      style={{
        border: "1px solid rgba(13, 99, 27, 0.05)",
        boxShadow: "0px 4px 20px 0px rgba(13, 99, 27, 0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-6">
        <span className="text-[14px] font-semibold text-[#40493D] leading-[16.8px] tracking-[5%] uppercase">
          Health Score
        </span>
        <Image
          src="/icons/icon-health-score.svg"
          alt="Health Score"
          width={20}
          height={19}
        />
      </div>

      {/* Score */}
      <div className="flex items-baseline gap-2">
        <span
          className="text-[48px] font-extrabold leading-[57.6px] text-[#0D631B]"
          style={{ letterSpacing: "-2%" }}
        >
          84
        </span>
        <span className="text-[18px] font-normal text-[#40493D] leading-[28.8px]">
          /100
        </span>
      </div>

      {/* Trend */}
      <div className="pt-4 border-t border-[#BFCABA] mt-4">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/icon-trending-up.svg"
            alt="Trending up"
            width={12}
            height={7}
          />
          <span className="text-[16px] font-normal text-[#0D631B] leading-[24px]">
            Meningkat 4% dari bulan lalu
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Card: Recommendations ──────────────────────────────────── */
function RecommendationsCard() {
  const recommendations = [
    "Tingkatkan konsumsi air mineral (min. 2.5L)",
    "Lakukan olahraga ringan 30 menit setiap hari",
    "Kurangi konsumsi makanan tinggi garam",
  ];

  return (
    <div
      className="rounded-[20px] p-8 flex flex-col gap-4"
      style={{
        border: "1px solid rgba(18, 109, 39, 0.1)",
        boxShadow: "0px 4px 20px 0px rgba(13, 99, 27, 0.05)",
        paddingBottom: "45.81px",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image
          src="/icons/icon-recommend.svg"
          alt="Recommendations"
          width={23}
          height={22}
        />
        <span className="text-[14px] font-semibold leading-[16.8px] tracking-[5%] uppercase text-[#BC1120]">
          Rekomendasi Harian
        </span>
      </div>

      {/* List */}
      <ul className="flex flex-col gap-4 mt-2">
        {recommendations.map((item, i) => (
          <li key={i} className="flex gap-3 items-start">
            <div className="mt-2 flex-shrink-0">
              <div className="w-[6px] h-[6px] rounded-full bg-[#126D27]" />
            </div>
            <p className="text-[16px] font-normal leading-[25.6px] text-[#181D17]">
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// StatCard moved to components/dashboard/QuickStats.tsx

/* ─── Dashboard Page ─────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className="px-9 py-8 flex flex-col gap-6">
      {/* Welcome Section */}
      <section className="flex items-end justify-between">
        <div className="max-w-[576px]">
          <h1
            className="text-[32px] font-bold leading-[41.6px] text-[#0F6D2B]"
            style={{ letterSpacing: "-0.32px", fontFamily: "var(--font-body)" }}
          >
            Selamat Pagi, User
          </h1>
          <p className="mt-3 text-[18px] font-normal leading-[28.8px] text-[#40493D]">
            Berdasarkan data terakhir, hari ini adalah waktu yang tepat untuk
            melakukan skrining kesehatan rutin Anda. Hanya membutuhkan 5 menit.
          </p>
        </div>

        <Link
          href="/screening"
          className="flex items-center gap-3 px-8 py-4 rounded-[12px] bg-[#318741] text-white text-[18px] font-normal leading-[28.8px] hover:bg-[#0F6D2B] transition-colors flex-shrink-0"
        >
          <Image
            src="/icons/icon-screening-btn.svg"
            alt="Screening"
            width={20}
            height={20}
          />
          Mulai Skrining Risiko
        </Link>
      </section>

      {/* Bento Grid */}
      <section className="grid grid-cols-3 gap-6 pt-4">
        {/* Row 1: 3 cards */}
        <HealthScoreCard />
        <LastScreeningCard />
        <RecommendationsCard />

        {/* Row 2: Chart (2/3) + Stats (1/3) */}
        <div className="col-span-2">
          <HealthTrendChart />
        </div>

        {/* Stats Column */}
        <QuickStats />
      </section>
    </div>
  );
}
