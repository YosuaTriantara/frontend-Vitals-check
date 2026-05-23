'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: '/icons/icon-dashboard.svg',
  },
  {
    label: 'Risk Detection',
    href: '/screening',
    icon: '/icons/icon-risk.svg',
  },
  {
    label: 'Health Data',
    href: '/health-data',
    icon: '/icons/icon-health-data.svg',
  },
  {
    label: 'Pengaturan',
    href: '/profile',
    icon: '/icons/icon-settings.svg',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-[326px] bg-[#F6FBF1] flex flex-col z-30">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-[59px] pt-[21px] pb-[21px] h-[83px]">
        <div className="w-[42px] h-[42px] rounded-full bg-[#318741] flex items-center justify-center flex-shrink-0">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 20.35L9.55 19.05C7.867 17.533 6.475 16.225 5.375 15.125C4.275 14.025 3.4 13.038 2.75 12.163C2.1 11.288 1.646 10.483 1.388 9.75C1.129 9.017 1 8.267 1 7.5C1 5.933 1.525 4.625 2.575 3.575C3.625 2.525 4.933 2 6.5 2C7.367 2 8.192 2.183 8.975 2.55C9.758 2.917 10.433 3.433 11 4.1C11.567 3.433 12.242 2.917 13.025 2.55C13.808 2.183 14.633 2 15.5 2C17.067 2 18.375 2.525 19.425 3.575C20.475 4.625 21 5.933 21 7.5C21 8.267 20.871 9.017 20.613 9.75C20.354 10.483 19.9 11.288 19.25 12.163C18.6 13.038 17.725 14.025 16.625 15.125C15.525 16.225 14.133 17.533 12.45 19.05L11 20.35Z" fill="white"/>
          </svg>
        </div>
        <div className="flex flex-col gap-[-2px]">
          <span className="font-bold text-[28px] leading-[33.6px] font-[family-name:var(--font-body)]">
            <span className="text-[#0F6D2B]">Vitals</span>
            <span className="text-[#318741]">Check</span>
          </span>
          <span className="text-[12px] font-bold leading-[15px] text-[#318741] text-center">
            Health Screening AI
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#BFCABA] mx-[59px]" />

      {/* Navigation */}
      <nav className="flex flex-col gap-3 px-[47px] pt-[32px] flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[rgba(49,135,65,0.1)] text-[#0F6D2B]'
                  : 'text-[#466647] hover:bg-[rgba(49,135,65,0.05)]'
              }`}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className={isActive ? 'brightness-0 saturate-100' : 'opacity-80'}
                style={isActive ? { filter: 'invert(26%) sepia(97%) saturate(700%) hue-rotate(100deg) brightness(60%)' } : {}}
              />
              <span
                className="text-[14px] font-semibold leading-[19.6px] tracking-[0.7px] uppercase"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
