import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:   'bg-[#318741] text-white hover:bg-[#0F6D2B]',
  secondary: 'bg-[#F6FBF1] text-[#0F6D2B] hover:bg-[#EBEFE5]',
  outline:   'border border-[#318741] text-[#318741] hover:bg-[rgba(49,135,65,0.05)]',
  ghost:     'text-[#466647] hover:bg-[rgba(49,135,65,0.05)]',
  danger:    'bg-[#BC1120] text-white hover:bg-[#9A0E1A]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-[12px] rounded-[8px]',
  md: 'px-5 py-2.5 text-[14px] rounded-[12px]',
  lg: 'px-8 py-4 text-[16px] rounded-[12px]',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
}
