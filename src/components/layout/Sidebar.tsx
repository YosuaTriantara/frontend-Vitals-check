"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "/icons/icon-dashboard.svg",
  },
  {
    label: "Risk Detection",
    href: "/screening",
    icon: "/icons/icon-risk.svg",
  },
  {
    label: "Health Data",
    href: "/health-data",
    icon: "/icons/icon-health-data.svg",
  },
  {
    label: "Pengaturan",
    href: "/profile",
    icon: "/icons/icon-settings.svg",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-[326px] bg-[#F6FBF1] flex flex-col z-30">
      {/* Logo / Brand */}
      <div className="flex items-center px-[59px] h-[83px]">
        <Image
          src="/icons/logo.png"
          alt="VitalsCheck"
          width={160}
          height={46}
          priority
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-[#BFCABA] mx-[59px]" />

      {/* Navigation */}
      <nav className="flex flex-col gap-3 px-[47px] pt-[32px] flex-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[rgba(49,135,65,0.1)] text-[#0F6D2B]"
                  : "text-[#466647] hover:bg-[rgba(49,135,65,0.05)]"
              }`}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className={
                  isActive ? "brightness-0 saturate-100" : "opacity-80"
                }
                style={
                  isActive
                    ? {
                        filter:
                          "invert(26%) sepia(97%) saturate(700%) hue-rotate(100deg) brightness(60%)",
                      }
                    : {}
                }
              />
              <span
                className="text-[14px] font-semibold leading-[19.6px] tracking-[0.7px] uppercase"
                style={{ fontFamily: "var(--font-body)" }}
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
