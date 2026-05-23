// src/components/auth/RegisterForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { register: registerAuth } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      setError('');
      await registerAuth(data);
      router.push('/dashboard');
    } catch {
      setError('Gagal membuat akun, coba lagi');
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans">

      {/* LEFT PANEL */}
      <section className="flex h-screen flex-1 items-center justify-center bg-white px-[56px]">

        <div className="flex w-full max-w-[520px] flex-col gap-[36px]">

          {/* Heading */}
          <div className="flex w-full flex-col">

            <h1 className="w-full text-center text-[28px] font-bold leading-[34px] text-[#171D17]">
              Buat Akun Baru
            </h1>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">

            <button
              type="button"
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-gray-200 transition-all hover:bg-gray-50"
            >
              <Image
                src="/icons/icon-google.svg"
                alt="Google"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Divider */}
          <div className="relative w-full">

            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-[14px] text-[#40493E]">
                Atau dengan email
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-[25px]"
          >

            {/* Input Fields */}
            <div className="flex flex-col gap-5">

              {/* Name */}
              <div className="flex flex-col gap-2">

                <label className="text-[15px] font-semibold text-[#181D17]">
                  Nama Lengkap
                </label>

                <div className="flex items-start rounded-[8px] bg-[#F6FBF1] px-[16px] py-[14px]">
                  <input
                    type="text"
                    placeholder="contoh: Budi Santoso"
                    className="w-full bg-transparent text-[15px] text-[#181D17] outline-none placeholder:text-[#BFCABB]"
                    {...register('name')}
                  />
                </div>

                {errors.name && (
                  <p className="text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">

                <label className="text-[15px] font-semibold text-[#181D17]">
                  Email
                </label>

                <div className="flex items-start rounded-[8px] bg-[#F6FBF1] px-[16px] py-[14px]">
                  <input
                    type="email"
                    placeholder="budi.santoso@example.com"
                    className="w-full bg-transparent text-[15px] text-[#181D17] outline-none placeholder:text-[#BFCABB]"
                    {...register('email')}
                  />
                </div>

                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">

                <label className="text-[15px] font-semibold text-[#181D17]">
                  Password
                </label>

                <div className="flex items-start rounded-[8px] bg-[#F6FBF1] px-[16px] py-[14px]">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent text-[15px] text-[#181D17] outline-none placeholder:text-[#BFCABB]"
                    {...register('password')}
                  />
                </div>

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center self-stretch rounded-full bg-[#318741] py-[14px] text-center text-[18px] font-bold leading-[24px] text-white transition-all hover:bg-[#0F6D2B]"
            >
              {isSubmitting ? 'Loading...' : 'SIGN UP'}
            </button>

          </form>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="relative flex h-screen w-[42%] min-w-[520px] items-center justify-center overflow-hidden bg-[#318741] px-[56px]">

        {/* Circle Top Right */}
        <div className="absolute right-[-46.629px] top-[-50.386px] h-[415.771px] w-[388.571px] rounded-full bg-white/10" />

        {/* Circle Bottom Left */}
        <div className="absolute bottom-[-116.442px] left-[-83.2px] h-[395.886px] w-[395.886px] rounded-full bg-white/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6">

          {/* Logo */}
          <Image
            src="/icons/logo-white.png"
            alt="VitalsCheck"
            width={180}
            height={60}
          />

          {/* Heading */}
          <div className="flex flex-col items-center self-stretch pt-[8px]">
            <h2 className="text-center text-[32px] font-bold leading-[38px] text-white">
              Selamat Datang!
            </h2>
          </div>

          {/* Description */}
          <div className="flex w-[360px] flex-col items-center pb-[24px]">
            <p className="text-center text-[17px] leading-[28px] text-white">
              Tetap pantau kesehatan Anda dengan data yang akurat dan terpercaya
              bersama VitalsCheck AI.
            </p>
          </div>

          {/* Login */}
          <div className="flex flex-col items-center gap-4">

            <p className="text-center text-[15px] text-white/80">
              Sudah memiliki akun?
            </p>

            <Link href="/login">
              <button className="flex w-[240px] justify-center rounded-full bg-white px-[48px] py-[12px] text-center text-[18px] font-bold uppercase tracking-[1.6px] text-[#0F6D2B] transition-all hover:scale-[1.02]">
                Masuk
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}