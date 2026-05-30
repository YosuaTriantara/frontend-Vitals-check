"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AppHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="hidden lg:flex h-[83px] bg-[#F6FBF1] items-center justify-end px-9 gap-5 border-b border-[#BFCABA]/40">
      {/* Bell */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[rgba(15,109,43,0.08)] transition-colors">
        <Image
          src="/icons/icon-bell.svg"
          alt="Notifications"
          width={16}
          height={20}
        />
      </button>

      {/* Search */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[rgba(15,109,43,0.08)] transition-colors">
        <Image
          src="/icons/icon-search.svg"
          alt="Search"
          width={21}
          height={20}
        />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-[#BFCABA]" />

      {/* User menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-[rgba(15,109,43,0.06)] transition-colors"
          aria-haspopup="true"
          aria-expanded={open}
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[#318741] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 select-none">
            {initials}
          </div>

          {/* Name */}
          <span className="text-[14px] font-semibold text-[#181D17] max-w-[120px] truncate">
            {user?.name ?? "User"}
          </span>

          {/* Chevron */}
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="#40493D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-0 top-[calc(100%+8px)] w-[224px] bg-white rounded-[16px] overflow-hidden z-50"
            style={{
              boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
              border: "1px solid rgba(191,202,186,0.5)",
            }}
          >
            {/* User info */}
            <div className="px-4 py-3.5 border-b border-[#BFCABA]/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#318741] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 select-none">
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

            {/* Logout action */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[rgba(188,17,32,0.05)]"
            >
              {/* Logout icon */}
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
    </header>
  );
}
