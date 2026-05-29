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
    <div className="flex min-h-screen flex-col md:flex-row bg-white font-sans">

      {/* ── LEFT PANEL ── */}
      <section className="
        relative flex items-center justify-center overflow-hidden bg-[#318741]
        w-full py-8 px-6
        md:h-screen md:w-[42%] md:min-w-[420px] lg:min-w-[520px] md:py-0 md:px-[56px]
        md:sticky md:top-0
      ">
        <div className="absolute left-[-46px] top-[-50px] h-[300px] w-[300px] md:h-[415px] md:w-[388px] rounded-full bg-white/10" />

        <div className="absolute bottom-[-80px] right-[-60px] h-[280px] w-[280px] md:h-[395px] md:w-[395px] rounded-full bg-white/10" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6">

          {/* Logo */}
          <Image
            src="/icons/logo-white.png"
            alt="VitalsCheck"
            width={140}
            height={46}
          />

          {/* Heading */}
          <div className="hidden md:flex flex-col items-center pt-2">
            <h2 className="text-center text-[32px] font-extrabold leading-[38px] text-white">
              Hallo, Teman Sehat!
            </h2>
          </div>

          {/* Description*/}
          <div className="hidden md:flex w-[360px] flex-col items-center pb-6">
            <p className="text-center text-[17px] leading-[28px] text-white">
              Mulai perjalanan kesehatan Anda hari ini. Pantau vitalitas dan
              kelola kesehatan dengan lebih tenang dan teratur.
            </p>
          </div>

          {/* Register */}
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <p className="text-center text-[14px] md:text-[15px] text-white/80">
              Belum memiliki akun?
            </p>
            <Link href="/register">
              <button className="flex w-[180px] md:w-[240px] justify-center rounded-full bg-white px-8 py-2.5 md:py-3 text-center text-[15px] md:text-[18px] font-bold uppercase tracking-[1.6px] text-[#0F6D2B] transition-all hover:scale-[1.02]">
                Daftar
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/*  RIGHT PANEL  */}
      <section className="
        flex flex-1 items-center justify-center bg-white
        px-5 py-10
        md:h-screen md:px-10 lg:px-[56px]
        md:overflow-y-auto
      ">
        <div className="flex w-full max-w-[480px] flex-col gap-7 md:gap-[36px]">

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="w-full text-center text-[24px] md:text-[28px] font-bold leading-tight text-[#171D17]">
              Selamat Datang Kembali
            </h1>
            <p className="text-center text-[14px] md:text-[16px] font-medium leading-[24px] text-[#40493E]">
              Silakan masuk untuk mengakses dasbor kesehatan Anda.
            </p>
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
            className="flex w-full flex-col gap-6 md:gap-[28px]"
          >
            {/* Input Fields */}
            <div className="flex flex-col gap-4 md:gap-5">

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] md:text-[15px] font-semibold text-[#181D17]">
                  Email
                </label>
                <div className="flex items-start rounded-[8px] bg-[#F6FBF1] px-4 py-3 md:py-[14px]">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-transparent text-[14px] md:text-[15px] text-[#181D17] outline-none placeholder:text-[#BFCABB]"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] md:text-[15px] font-semibold text-[#181D17]">
                  Password
                </label>
                <div className="flex items-start rounded-[8px] bg-[#F6FBF1] px-4 py-3 md:py-[14px]">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent text-[14px] md:text-[15px] text-[#181D17] outline-none placeholder:text-[#BFCABB]"
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[13px] md:text-[14px] text-[#40493E]">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] font-medium text-[#318741] hover:underline"
              >
                Lupa Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center self-stretch rounded-full bg-[#318741] py-3 md:py-[14px] text-center text-[16px] md:text-[18px] font-bold leading-[24px] text-white transition-all hover:bg-[#0F6D2B] disabled:opacity-60"
            >
              {isSubmitting ? 'Loading...' : 'SIGN IN'}
            </button>

            {/* Divider */}
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-[13px] md:text-[14px] text-[#40493E]">
                  Atau masuk dengan
                </span>
              </div>
            </div>

            {/* Google Login */}
            <div className="flex justify-center">
              <button
                type="button"
                className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-gray-200 transition-all hover:bg-gray-50"
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