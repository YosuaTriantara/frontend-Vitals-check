'use client';

import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="h-[83px] bg-[#F6FBF1] flex items-center justify-end px-9 gap-6 border-b border-[#BFCABA]/40">
      {/* Bell */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[rgba(15,109,43,0.08)] transition-colors">
        <Image src="/icons/icon-bell.svg" alt="Notifications" width={16} height={20} />
      </button>

      {/* Search */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[rgba(15,109,43,0.08)] transition-colors">
        <Image src="/icons/icon-search.svg" alt="Search" width={21} height={20} />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-[#BFCABA]" />

      {/* User Avatar */}
      <button
        onClick={logout}
        title="Logout"
        className="w-10 h-10 rounded-full border-2 border-[#318741] overflow-hidden flex items-center justify-center bg-[#318741] text-white font-bold text-sm hover:opacity-90 transition-opacity"
      >
        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
      </button>
    </header>
  );
}
