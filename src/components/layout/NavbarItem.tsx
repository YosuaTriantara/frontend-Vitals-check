'use client';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarItemProps {
  href: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

export default function NavbarItem({
  href,
  label,
  icon,
  isActive = false,
}: NavbarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-[rgba(49,135,65,0.1)] text-[#0F6D2B]'
          : 'text-[#466647] hover:bg-[rgba(49,135,65,0.05)]'
      }`}
    >
      <Image
        src={icon}
        alt={label}
        width={20}
        height={20}
        style={
          isActive
            ? {
                filter:
                  'invert(26%) sepia(97%) saturate(700%) hue-rotate(100deg) brightness(60%)',
              }
            : {}
        }
      />
      <span className="text-[14px] font-semibold leading-[19.6px] tracking-[0.7px] uppercase">
        {label}
      </span>
    </Link>
  );
}
