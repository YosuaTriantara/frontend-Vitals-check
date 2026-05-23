import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export default function Select({
  label,
  error,
  options,
  className = '',
  ...rest
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[14px] font-semibold text-[#40493D]">
          {label}
        </label>
      )}
      <select
        {...rest}
        className={`h-[50px] px-4 bg-white rounded-[12px] border text-[16px] text-[#181D17] outline-none appearance-none ${
          error
            ? 'border-[#BC1120]'
            : 'border-[#BFCABA] focus:border-[#318741]'
        } ${className}`}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-[12px] text-[#BC1120]">{error}</p>
      )}
    </div>
  );
}
