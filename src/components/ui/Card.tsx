interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'surface';
  noPadding?: boolean;
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  noPadding = false,
}: CardProps) {
  const bg = variant === 'surface' ? 'bg-[#F6FBF1]' : 'bg-white';
  return (
    <div
      className={`${bg} rounded-[20px] ${noPadding ? '' : 'p-6'} ${className}`}
      style={{
        border: '1px solid rgba(13,99,27,0.05)',
        boxShadow: '0px 4px 20px 0px rgba(13,99,27,0.05)',
      }}
    >
      {children}
    </div>
  );
}
