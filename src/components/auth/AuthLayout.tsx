interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="w-full max-w-[440px]">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-bold">
          <span className="text-[#0F6D2B]">Vitals</span>
          <span className="text-[#318741]">Check</span>
        </h1>
        <p className="text-[12px] font-bold text-[#318741]">Health Screening AI</p>
      </div>

      {/* Card */}
      <div
        className="bg-white rounded-[24px] p-8 flex flex-col gap-6"
        style={{ boxShadow: '0px 4px 20px -2px rgba(13,99,27,0.08)', border: '1px solid #DCE8DC' }}
      >
        <div>
          <h2 className="text-[24px] font-semibold text-[#181D17]">{title}</h2>
          {subtitle && <p className="text-[14px] text-[#40493D] mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
