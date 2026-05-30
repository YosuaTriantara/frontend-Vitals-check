"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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

function NavLink({
  item,
  isActive,
  onClick,
}: {
  item: (typeof navItems)[number];
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
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
        className={isActive ? "brightness-0 saturate-100" : "opacity-80"}
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
}

function MobileProfileMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [open]);

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-[#318741] flex items-center justify-center text-white font-bold text-sm"
        aria-label="User menu"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {initials}
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+10px)] w-[calc(100vw-32px)] max-w-[240px] bg-white rounded-[16px] overflow-hidden z-[60]"
          style={{
            boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
            border: "1px solid rgba(191,202,186,0.5)",
          }}
        >
          <div className="px-4 py-3.5 border-b border-[#BFCABA]/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#318741] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#181D17] truncate">
                  {user?.name ?? "User"}
                </p>
                <p className="text-[12px] text-[#40493D] truncate mt-0.5">
                  {user?.email ?? ""}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[rgba(188,17,32,0.05)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="flex-shrink-0"
            >
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                stroke="#BC1120"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="16 17 21 12 16 7"
                stroke="#BC1120"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="21"
                y1="12"
                x2="9"
                y2="12"
                stroke="#BC1120"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-[14px] font-semibold text-[#BC1120]">
              Keluar
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Navbar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-[72px] bg-[#F6FBF1] border-b border-[#BFCABA]/40 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[rgba(15,109,43,0.08)] transition-colors flex-shrink-0"
            aria-label="Open navigation"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <path
                d="M1 1H21"
                stroke="#181D17"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M1 8H21"
                stroke="#181D17"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M1 15H21"
                stroke="#181D17"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Image
            src="/icons/logo.png"
            alt="VitalsCheck"
            width={135}
            height={39}
            priority
            className="min-w-0"
          />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[rgba(15,109,43,0.08)] transition-colors"
            aria-label="Notifications"
          >
            <Image
              src="/icons/icon-bell.svg"
              alt=""
              width={16}
              height={20}
            />
          </button>

          <MobileProfileMenu />
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-[280px] bg-[#F6FBF1] z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[72px]">
          <Image
            src="/icons/logo.png"
            alt="VitalsCheck"
            width={145}
            height={42}
            priority
          />

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[rgba(15,109,43,0.08)]"
            aria-label="Close navigation"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M1 1L17 17"
                stroke="#181D17"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M17 1L1 17"
                stroke="#181D17"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="h-px bg-[#BFCABA] mx-6" />

        <nav className="flex flex-col gap-3 px-5 pt-6">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <NavLink
                key={item.href}
                item={item}
                isActive={isActive}
                onClick={() => setOpen(false)}
              />
            );
          })}
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-[326px] bg-[#F6FBF1] flex-col z-30">
        <div className="flex items-center px-[59px] h-[83px]">
          <Image
            src="/icons/logo.png"
            alt="VitalsCheck"
            width={160}
            height={46}
            priority
          />
        </div>

        <div className="h-px bg-[#BFCABA] mx-[59px]" />

        <nav className="flex flex-col gap-3 px-[47px] pt-[32px] flex-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <NavLink key={item.href} item={item} isActive={isActive} />
            );
          })}
        </nav>
      </aside>
    </>
  );
}