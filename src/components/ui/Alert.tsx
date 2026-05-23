type AlertVariant = 'success' | 'error' | 'warning' | 'info';

const styles: Record<AlertVariant, { wrapper: string; icon: string }> = {
  success: {
    wrapper: 'bg-[rgba(156,244,156,0.2)] border-[#9CF49C] text-[#126D27]',
    icon: '✓',
  },
  error: {
    wrapper: 'bg-[#FEE2E2] border-[#FCA5A5] text-[#7F1D1D]',
    icon: '✕',
  },
  warning: {
    wrapper: 'bg-[#FFEDD5] border-[#FED7AA] text-[#9A3412]',
    icon: '!',
  },
  info: {
    wrapper: 'bg-[rgba(49,135,65,0.05)] border-[#BFCABA] text-[#40493D]',
    icon: 'i',
  },
};

interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Alert({
  variant = 'info',
  children,
  onClose,
}: AlertProps) {
  const s = styles[variant];
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-[12px] border text-[14px] font-medium ${s.wrapper}`}
    >
      <span className="font-bold flex-shrink-0">{s.icon}</span>
      <span className="flex-1">{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-60 hover:opacity-100"
        >
          ×
        </button>
      )}
    </div>
  );
}
