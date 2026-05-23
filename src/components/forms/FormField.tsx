interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({
  label,
  error,
  hint,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold leading-[16.8px] tracking-[0.14px] text-[#40493D]">
        {label}
        {required && <span className="text-[#BC1120] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[12px] text-[#BC1120] leading-[14.4px]">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[12px] text-[#40493D] leading-[14.4px]">{hint}</p>
      )}
    </div>
  );
}
