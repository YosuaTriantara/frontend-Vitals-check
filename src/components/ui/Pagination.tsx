interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1.5 rounded-[8px] border border-[#BFCABA] text-[14px] text-[#40493D] disabled:opacity-40 hover:bg-[rgba(49,135,65,0.05)] transition-colors"
      >
        ←
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-8 h-8 rounded-[8px] text-[14px] font-medium transition-colors ${
            p === page
              ? 'bg-[#318741] text-white'
              : 'border border-[#BFCABA] text-[#40493D] hover:bg-[rgba(49,135,65,0.05)]'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1.5 rounded-[8px] border border-[#BFCABA] text-[14px] text-[#40493D] disabled:opacity-40 hover:bg-[rgba(49,135,65,0.05)] transition-colors"
      >
        →
      </button>
    </div>
  );
}
