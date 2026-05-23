'use client';

import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="px-9 py-8 flex flex-col gap-6">
      <section className="py-5">
        <h1 className="text-[32px] font-bold leading-[41.6px] text-[#0F6D2B]"
          style={{ letterSpacing: '-0.32px' }}>
          Pengaturan Akun
        </h1>
        <p className="mt-3 text-[18px] font-normal leading-[28.8px] text-[#40493D]">
          Kelola profil dan preferensi Anda.
        </p>
      </section>

      {/* Profile card */}
      <div className="bg-white rounded-[20px] p-8 max-w-[600px]"
        style={{ border: '1px solid rgba(13,99,27,0.05)', boxShadow: '0px 4px 20px 0px rgba(13,99,27,0.05)' }}>
        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#318741] flex items-center justify-center text-white text-[28px] font-bold">
            {user?.name?.charAt(0).toUpperCase() ?? 'U'}
          </div>
          <div>
            <p className="text-[20px] font-semibold text-[#181D17]">{user?.name}</p>
            <p className="text-[14px] text-[#40493D]">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between py-3 border-b border-[#BFCABA]">
            <span className="text-[14px] font-medium text-[#40493D]">Nama</span>
            <span className="text-[14px] text-[#181D17]">{user?.name ?? '—'}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#BFCABA]">
            <span className="text-[14px] font-medium text-[#40493D]">Email</span>
            <span className="text-[14px] text-[#181D17]">{user?.email ?? '—'}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#BFCABA]">
            <span className="text-[14px] font-medium text-[#40493D]">Member sejak</span>
            <span className="text-[14px] text-[#181D17]">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
                : '—'}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <Button variant="danger" size="md" onClick={logout}>
            Keluar dari Akun
          </Button>
        </div>
      </div>
    </div>
  );
}
