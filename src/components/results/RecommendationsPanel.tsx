import type { RiskCategory } from '@/types/screening';

interface RecommendationItem {
  title: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  icon: React.ReactNode;
  items: string[];
}

const ForkIcon = () => (
  <svg width="15" height="20" viewBox="0 0 24 24" fill="#0D631B">
    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
  </svg>
);

const RunIcon = () => (
  <svg width="16" height="20" viewBox="0 0 24 24" fill="#0D631B">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="16" viewBox="0 0 24 24" fill="#0D631B">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

function buildRecommendations({
  riskCategory,
  riskScore,
  bmi,
  systolicBp,
  diastolicBp,
  bloodGlucose,
}: {
  riskCategory: RiskCategory;
  riskScore: number;
  bmi?: number | null;
  systolicBp?: number | null;
  diastolicBp?: number | null;
  bloodGlucose?: number | null;
}): RecommendationItem[] {
  const highRisk = riskCategory === 'high' || riskScore >= 0.7;
  const mediumRisk = riskCategory === 'medium' || riskScore >= 0.4;
  const highBmi = bmi != null && bmi >= 25;
  const elevatedBp =
    systolicBp != null &&
    diastolicBp != null &&
    (systolicBp >= 130 || diastolicBp >= 80);
  const elevatedGlucose = bloodGlucose != null && bloodGlucose > 100;

  return [
    {
      title: 'Diet & Nutrisi',
      badge: highRisk ? 'Prioritas Tinggi' : mediumRisk ? 'Prioritas' : 'Pemeliharaan',
      badgeBg: highRisk ? '#BC1120' : '#9CF49C',
      badgeText: highRisk ? '#F6FBF1' : '#126D27',
      iconBg: 'white',
      icon: <ForkIcon />,
      items: [
        elevatedGlucose
          ? 'Batasi minuman manis dan pilih karbohidrat kompleks setiap hari.'
          : 'Pertahankan pola makan seimbang dengan serat dan protein cukup.',
        highBmi
          ? 'Atur defisit kalori ringan dan prioritaskan porsi makan terukur.'
          : 'Jaga jadwal makan teratur untuk menjaga kestabilan metabolik.',
      ],
    },
    {
      title: 'Aktivitas Fisik',
      badge: highRisk ? 'Harian' : 'Rutin',
      badgeBg: '#9CF49C',
      badgeText: '#126D27',
      iconBg: 'white',
      icon: <RunIcon />,
      items: [
        highRisk || highBmi
          ? 'Lakukan jalan cepat 30 menit minimal 5 kali per minggu.'
          : 'Lanjutkan aktivitas aerobik ringan untuk menjaga stamina harian.',
        elevatedBp
          ? 'Tambahkan latihan peregangan dan pernapasan untuk bantu kontrol tekanan darah.'
          : 'Sisihkan latihan kekuatan ringan 2 kali per minggu.',
      ],
    },
    {
      title: 'Pemantauan Rutin',
      badge: elevatedBp || elevatedGlucose ? 'Monitoring' : 'Observasi',
      badgeBg: '#F0F5EB',
      badgeText: '#40493D',
      iconBg: 'white',
      icon: <EyeIcon />,
      items: [
        elevatedBp
          ? 'Catat tekanan darah pagi dan malam selama 7 hari ke depan.'
          : 'Ulangi skrining berkala untuk melihat perubahan tren risiko.',
        elevatedGlucose
          ? 'Pantau kadar gula darah dan konsultasikan bila hasil tetap meningkat.'
          : 'Simpan hasil skrining berikutnya agar analisis tren makin akurat.',
      ],
    },
  ];
}

function RecommendationCard({ rec }: { rec: RecommendationItem }) {
  return (
    <div
      className="bg-[#F6FBF1] rounded-[20px] p-6 flex flex-col gap-2"
      style={{ border: '1px solid #FFFFFF' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          className="w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0"
          style={{
            background: rec.iconBg,
            border: '1px solid #BFCABA',
          }}
        >
          {rec.icon}
        </div>
        <div
          className="px-2 py-[3px] rounded-[4px] text-[12px] font-medium leading-[14.4px]"
          style={{ background: rec.badgeBg, color: rec.badgeText, paddingBottom: '4.39px' }}
        >
          {rec.badge}
        </div>
      </div>

      <p
        className="text-[14px] font-bold leading-[16.8px]"
        style={{ letterSpacing: '0.14px', color: '#0F6D2B' }}
      >
        {rec.title}
      </p>

      <ul className="flex flex-col gap-3 mt-2">
        {rec.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <div className="mt-2 w-[6px] h-[6px] rounded-full bg-[#0D631B] flex-shrink-0" />
            <span className="text-[16px] font-normal leading-[25.6px] text-[#40493D]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface RecommendationsPanelProps {
  riskCategory: RiskCategory;
  riskScore: number;
  bmi?: number | null;
  systolicBp?: number | null;
  diastolicBp?: number | null;
  bloodGlucose?: number | null;
}

export default function RecommendationsPanel(props: RecommendationsPanelProps) {
  const recommendations = buildRecommendations(props);

  return (
    <div
      className="bg-white rounded-[24px] p-8 flex flex-col gap-8 border-l-[8px] border-l-[#0D631B]"
      style={{ boxShadow: '0px 4px 20px -2px rgba(13,99,27,0.08)' }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0"
          style={{ background: '#9CF49C' }}
        >
          <svg width="15" height="20" viewBox="0 0 24 24" fill="#0D631B">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        </div>
        <div>
          <p className="text-[24px] font-semibold leading-[33.6px] text-[#181D17]">
            Rekomendasi Preventif
          </p>
          <p className="text-[16px] font-normal leading-[25.6px] text-[#40493D]">
            Langkah nyata berdasarkan hasil skrining terbaru Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.title} rec={rec} />
        ))}
      </div>
    </div>
  );
}
