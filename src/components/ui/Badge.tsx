type BadgeVariant = 'success' | 'warning' | 'danger' | 'muted' | 'primary';

const styles: Record<BadgeVariant, string> = {
  success: 'bg-[rgba(156,244,156,0.3)] text-[#126D27]',
  warning: 'bg-[#FFEDD5] text-[#9A3412]',
  danger:  'bg-[rgba(255,218,214,0.3)] text-[#BA1A1A]',
  muted:   'bg-[#F0F5EB] text-[#40493D]',
  primary: 'bg-[rgba(49,135,65,0.1)] text-[#0F6D2B]',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-[3px] rounded-full text-[12px] font-medium leading-[14.4px] ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
