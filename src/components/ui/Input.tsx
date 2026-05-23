import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  error,
  hint,
  className = '',
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#40493D]">
          {label}
        </label>
      )}
      <input
        {...rest}
        className={`h-[50px] px-4 bg-white rounded-[12px] text-[16px] font-normal text-[#181D17] outline-none transition-colors border ${
          error
            ? 'border-[#BC1120]'
            : 'border-[#BFCABA] focus:border-[#318741]'
        } ${className}`}
      />
      {error && (
        <p className="text-[12px] text-[#BC1120] leading-[14.4px]">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[12px] text-[#40493D] leading-[14.4px]">{hint}</p>
      )}
    </div>
  );
}
