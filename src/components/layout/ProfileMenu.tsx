'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Profile menu"
        className="w-10 h-10 rounded-full bg-[#318741] border-2 border-[#318741] flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity"
      >
        {user?.name?.charAt(0).toUpperCase() ?? 'U'}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-12 z-20 bg-white rounded-[16px] py-2 w-48"
            style={{
              boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
              border: '1px solid rgba(13,99,27,0.08)',
            }}
          >
            <div className="px-4 py-2 border-b border-[#BFCABA]">
              <p className="text-[14px] font-semibold text-[#181D17]">
                {user?.name}
              </p>
              <p className="text-[12px] text-[#40493D]">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-left text-[14px] text-[#BA1A1A] hover:bg-[#FEE2E2] transition-colors"
            >
              Keluar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
