// src/components/auth/LoginForm.tsx
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

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setError('');
      await login(data);
      router.push('/dashboard');
    } catch {
      setError('Email atau password salah');
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans">

      {/* LEFT PANEL */}
      <section className="relative flex h-screen w-[42%] min-w-[520px] items-center justify-center overflow-hidden bg-[#318741] px-[56px]">

        {/* Circle Top Left */}
        <div className="absolute left-[-46.629px] top-[-50.386px] h-[415.771px] w-[388.571px] rounded-full bg-white/10" />

        {/* Circle Bottom Right */}
        <div className="absolute bottom-[-116.442px] right-[-83.2px] h-[395.886px] w-[395.886px] rounded-full bg-white/10" />

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
            <h2 className="text-center text-[32px] font-extrabold leading-[38px] text-white">
              Hallo, Teman Sehat!
            </h2>
          </div>

          {/* Description */}
          <div className="flex w-[360px] flex-col items-center pb-[24px]">
            <p className="text-center text-[17px] leading-[28px] text-white">
              Mulai perjalanan kesehatan Anda hari ini. Pantau vitalitas dan
              kelola kesehatan dengan lebih tenang dan teratur.
            </p>
          </div>

          {/* Register */}
          <div className="flex flex-col items-center gap-4">

            <p className="text-center text-[15px] text-white/80">
              Belum memiliki akun?
            </p>

            <Link href="/register">
              <button className="flex w-[240px] justify-center rounded-full bg-white px-[48px] py-[12px] text-center text-[18px] font-bold uppercase tracking-[1.6px] text-[#0F6D2B] transition-all hover:scale-[1.02]">
                Daftar
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="flex h-screen flex-1 items-center justify-center bg-white px-[56px]">

        <div className="flex w-full max-w-[520px] flex-col gap-[36px]">

          {/* Heading */}
          <div className="flex w-full flex-col gap-[10px]">

            <h1 className="w-full text-center text-[28px] font-bold leading-[34px] text-[#171D17]">
              Selamat Datang Kembali
            </h1>

            <div className="flex flex-col items-center self-stretch">
              <p className="text-center text-[16px] font-medium leading-[24px] text-[#40493E]">
                Silakan masuk untuk mengakses dasbor kesehatan Anda.
              </p>
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
            className="flex w-full flex-col gap-[28px]"
          >

            {/* Input Fields */}
            <div className="flex flex-col gap-5">

              {/* Email */}
              <div className="flex flex-col gap-2">

                <label className="text-[15px] font-semibold text-[#181D17]">
                  Email
                </label>

                <div className="flex items-start rounded-[8px] bg-[#F6FBF1] px-[16px] py-[14px]">
                  <input
                    type="email"
                    placeholder="name@example.com"
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

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">

              <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#40493E]">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>

              <Link
                href="#"
                className="text-[14px] font-medium text-[#318741] hover:underline"
              >
                Lupa Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center self-stretch rounded-full bg-[#318741] py-[14px] text-center text-[18px] font-bold leading-[24px] text-white transition-all hover:bg-[#0F6D2B]"
            >
              {isSubmitting ? 'Loading...' : 'SIGN IN'}
            </button>

            {/* Divider */}
            <div className="relative w-full">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-[14px] text-[#40493E]">
                  Atau masuk dengan
                </span>
              </div>
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
          </form>
        </div>
      </section>
    </div>
  );
}