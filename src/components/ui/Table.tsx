interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export default function Table<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'Tidak ada data.',
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-[16px] border border-[rgba(13,99,27,0.05)]">
      <table className="w-full text-[14px]">
        <thead>
          <tr className="bg-[#F6FBF1] border-b border-[#BFCABA]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left font-semibold text-[#40493D] ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-[#40493D]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-[rgba(13,99,27,0.05)] ${
                  onRowClick
                    ? 'cursor-pointer hover:bg-[rgba(49,135,65,0.03)]'
                    : ''
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-[#181D17] ${col.className ?? ''}`}
                  >
                    {col.render
                      ? col.render(row)
                      : String(
                          (row as Record<string, unknown>)[col.key] ?? '—',
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
