// src/app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

const faqs = [
  {
    question: 'Apakah data kesehatan saya aman di VitalsCheck AI?',
    answer:
      'Kami menggunakan enkripsi end-to-end untuk memastikan data medis Anda hanya dapat diakses oleh Anda. Kami mematuhi regulasi privasi data kesehatan global yang ketat.',
  },
  {
    question: 'Seberapa akurat analisis AI yang diberikan?',
    answer:
      'Model AI kami dilatih menggunakan dataset kesehatan yang tervalidasi secara medis dengan akurasi tinggi untuk deteksi risiko penyakit tidak menular.',
  },
  {
    question: 'Perangkat apa saja yang didukung?',
    answer:
      'VitalsCheck dapat diakses melalui browser di perangkat apapun — desktop, tablet, maupun smartphone.',
  },
  {
    question: 'Berapa biaya langganannya?',
    answer:
      'VitalsCheck saat ini tersedia gratis untuk semua pengguna selama masa beta.',
  },
];

const navLinks = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'FAQ', href: '#faq' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState<string>('');

  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.querySelector(link.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 flex items-center justify-between px-[85px] py-0 h-[64px]">
        <Image src="/icons/logo.png" alt="VitalsCheck" width={140} height={40} />

        <div className="flex items-center gap-[25px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveNav(link.href)}
              className={`text-[14px] transition-colors pb-1 ${activeNav === link.href
                ? 'text-[#318741] border-b-2 border-[#318741]'
                : 'text-[#40493D] hover:text-[#318741]'
                }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <Link href="/login">
          <button
            className="flex h-[30px] px-6 flex-col justify-center items-center rounded-[20px] bg-[#0F6D2B] text-white text-[14px] font-semibold transition-colors hover:bg-[#318741]"
          >
            Login
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex h-[712px] px-[88px] py-[80px] flex-col items-start bg-white">
        <div className="grid gap-y-[10px] w-full h-full"
          style={{ gridTemplateRows: 'repeat(1, fit-content(100%))', gridTemplateColumns: '710px fit-content(100%)' }}
        >
          {/* Kiri */}
          <div className="flex flex-col justify-center items-start gap-6 row-start-1 col-start-1">
            <div className="flex flex-col gap-3">
              <h1 className="text-[48px] font-bold text-[#181D17] leading-tight">
                Monitor Kesehatan <br /> Anda dengan Presisi AI
              </h1>
              <p className="text-[16px] text-[#40493D] leading-relaxed max-w-[520px]">
                VitalsCheck membantu Anda mendeteksi risiko kesehatan lebih dini melalui analisis data biometrik yang cerdas dan laporan medis yang akurat.
              </p>
            </div>
            <div className="flex items-start gap-2 pt-4">
              <Link href="/register">
                <Button variant="primary" size="lg">
                  Mulai Skrining Sekarang
                </Button>
              </Link>
              <a href="#cara-kerja">
                <Button variant="outline" size="lg">
                  Pelajari Lebih Lanjut
                </Button>
              </a>
            </div>
          </div>

          {/* Kanan */}
          <div className="flex w-[552px] flex-col items-start row-start-1 col-start-2">
            <div className="w-[552px] h-[552px] rounded-[24px] overflow-hidden relative">
              <Image
                src="/images/body-human.png"
                alt="Human Body"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misi Kami */}
      <section
        id="tentang"
        className="flex w-full flex-col items-start bg-[#F0F5EB] px-[143px] py-[80px]"
      >
        <div
          className="inline-grid w-full self-stretch gap-[48px]"
          style={{
            gridTemplateRows: '448px',
            gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
          }}
        >
          {/* Kiri */}
          <div className="flex w-[552px] flex-col justify-between items-start self-stretch row-start-1 col-start-1">

            {/* Text */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[40px] font-bold leading-tight text-[#181D17]">
                Misi Kami
              </h2>

              <p className="text-[16px] leading-[28px] text-[#40493D]">
                Di VitalsCheck, kami percaya bahwa pencegahan adalah obat terbaik.
                Kami memadukan teknologi kecerdasan buatan (AI) dengan ilmu medis
                untuk memberikan deteksi dini kesehatan yang mudah diakses oleh siapa
                saja, kapan saja.
              </p>
            </div>

            {/* Cards */}
            <div
              className="inline-grid w-full self-stretch gap-[16px]"
              style={{
                gridTemplateRows: '182px',
                gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
              }}
            >
              {/* Card 1 */}
              <div
                className="flex flex-col items-start gap-3 justify-self-stretch rounded-[16px] border border-[rgba(191,202,187,0.30)] bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
              >
                <div className="relative flex w-12 h-12 items-center justify-center">

                  {/* Icon */}
                  <Image
                    src="/icons/icon-shield-lock.svg"
                    alt="Shield Lock"
                    width={24}
                    height={24}
                    className="relative z-10"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[18px] font-semibold text-[#181D17]">
                    Data Privacy Guaranteed
                  </h3>

                  <p className="text-[14px] leading-[24px] text-[#40493D]">
                    Privasi dan keamanan data kesehatan Anda menjadi prioritas utama kami.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="flex flex-col items-start gap-3 justify-self-stretch rounded-[16px] border border-[rgba(191,202,187,0.30)] bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
              >
                <div className="relative flex w-12 h-12 items-center justify-center">

                  {/* Icon */}
                  <Image
                    src="/icons/icon-shield-acc.svg"
                    alt="Shield Access"
                    width={24}
                    height={24}
                    className="relative z-10"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[18px] font-semibold text-[#181D17]">
                    Data Terenkripsi & Aman
                  </h3>

                  <p className="text-[14px] leading-[24px] text-[#40493D]">
                    Sistem keamanan berlapis dengan standar perlindungan industri modern.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan */}
          <div className="flex h-[448px] justify-end items-start justify-self-stretch row-start-1 col-start-2">
            <div className="flex w-[448px] max-w-[448px] aspect-square self-stretch items-center justify-center rounded-[48px] bg-[#0F6D2B]">
              <Image
                src="/icons/icon-plus-health.svg"
                alt="Health Plus"
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section
        id="fitur"
        className="flex flex-col items-center self-stretch bg-white px-4 py-[80px]" // Mengubah items-start menjadi items-center dan menyederhanakan padding
      >
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-[48px]"> {/* Menambahkan max-width agar responsif di layar besar */}

          {/* Heading */}
          <div className="flex flex-col items-center gap-[7px] self-stretch">
            <h2 className="text-center text-[34px] font-bold leading-[41.6px] tracking-[-0.32px] text-[#171D17]">
              Fitur Unggulan
            </h2>
          </div>

          {/* Cards */}
          <div className="grid w-full grid-cols-1 gap-[24px] md:grid-cols-3 justify-items-center"> {/* Menggunakan utility class Tailwind murni untuk Grid */}

            {/* Card 1 */}
            <div className="relative min-h-[330px] w-full max-w-[368px] rounded-[16px] bg-transparent shadow-[0_10px_30px_-10px_rgba(15,109,43,0.15)]">
              <div className="flex h-full flex-col items-start gap-6 rounded-[16px] bg-[rgba(15,109,43,0.10)] p-8">
                {/* Icon */}
                <div className="flex flex-col items-start">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[14px] bg-white">
                    <Image
                      src="/icons/icon-deteksi.svg"
                      alt="Deteksi"
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[22px] font-semibold leading-[30px] text-[#181D17]">
                    Deteksi Risiko Dini
                  </h3>
                  <p className="text-[15px] leading-[28px] text-[#40493D]">
                    Menggunakan algoritma AI canggih untuk mendeteksi anomali kesehatan
                    sebelum berkembang menjadi risiko serius.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative min-h-[330px] w-full max-w-[368px] rounded-[16px] bg-transparent shadow-[0_10px_30px_-10px_rgba(15,109,43,0.15)]">
              <div className="flex h-full flex-col items-start gap-6 rounded-[16px] bg-[rgba(15,109,43,0.10)] p-8">
                {/* Icon */}
                <div className="flex flex-col items-start">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[14px] bg-white">
                    <Image
                      src="/icons/icon-input.svg"
                      alt="Input"
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[22px] font-semibold leading-[30px] text-[#181D17]">
                    Input Data Mandiri
                  </h3>
                  <p className="text-[15px] leading-[28px] text-[#40493D]">
                    Masukkan data biometrik secara manual untuk mendapatkan analisis
                    kesehatan yang akurat dan personal.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative min-h-[330px] w-full max-w-[368px] rounded-[16px] bg-transparent shadow-[0_10px_30px_-10px_rgba(15,109,43,0.15)]">
              <div className="flex h-full flex-col items-start gap-6 rounded-[16px] bg-[rgba(15,109,43,0.10)] p-8">
                {/* Icon */}
                <div className="flex flex-col items-start">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[14px] bg-white">
                    <Image
                      src="/icons/icon-analisis.svg"
                      alt="Analisis"
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[22px] font-semibold leading-[30px] text-[#181D17]">
                    Laporan Analisis AI
                  </h3>
                  <p className="text-[15px] leading-[28px] text-[#40493D]">
                    Dapatkan laporan kesehatan mendalam dengan rekomendasi tindakan
                    preventif yang dipersonalisasi secara otomatis.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section
        id="cara-kerja"
        className="flex flex-col items-center self-stretch bg-[#F6FBF1] px-4 py-[80px]" // Mengubah ke items-center dan mengamankan padding horizontal
      >
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-[64px]">

          {/* Heading */}
          <div className="flex flex-col items-center self-stretch pb-[0.59px]">
            <h2 className="text-center text-[34px] font-bold leading-[41.6px] tracking-[-0.32px] text-[#171D17]">
              Cara Kerja VitalsCheck
            </h2>
          </div>

          {/* Cards Container */}
          <div className="relative grid w-full grid-cols-1 gap-[48px] md:grid-cols-3 justify-items-center">

            {/* Garis Penghubung - Dibuat responsif & otomatis center secara horizontal */}
            <div className="absolute left-[15%] right-[15%] top-[40px] hidden h-[2px] bg-[linear-gradient(90deg,rgba(15,109,43,0.00)_0%,rgba(15,109,43,0.20)_50%,rgba(15,109,43,0.00)_100%)] md:block" />

            {/* Card 1 */}
            <div className="relative flex flex-col items-center text-center max-w-[340px] z-10">

              {/* Icon */}
              <div className="inline-flex flex-col items-center pb-[32px]">
                <div className="relative flex flex-col items-start">

                  {/* Background */}
                  <div className="flex h-[80px] w-[80px] items-center justify-center rounded-[24px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]">
                    <Image
                      src="/icons/icon-input-step.svg"
                      alt="Input"
                      width={25}
                      height={25}
                    />
                  </div>

                  {/* Step */}
                  <div className="absolute -right-[8px] -top-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-white bg-[#318741] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]">
                    <span className="text-center text-[14px] font-bold leading-[20px] text-white">
                      1
                    </span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="inline-flex flex-col items-center pb-[12px]">
                <h4 className="text-center text-[24px] font-bold leading-[33.6px] text-[#171D17]">
                  Input Data Mandiri
                </h4>
              </div>

              <div className="inline-flex flex-col items-center px-2">
                <p className="text-center text-[16px] font-normal leading-[25.6px] text-[#40493E]">
                  Masukkan informasi kesehatan dan hasil lab Anda dengan mudah ke dalam sistem kami yang aman.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative flex flex-col items-center text-center max-w-[340px] z-10">

              {/* Icon */}
              <div className="inline-flex flex-col items-center pb-[32px]">
                <div className="relative flex flex-col items-start">

                  {/* Background */}
                  <div className="flex h-[80px] w-[80px] items-center justify-center rounded-[24px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]">
                    <Image
                      src="/icons/icon-thinking.svg"
                      alt="Thinking"
                      width={25}
                      height={25}
                    />
                  </div>

                  {/* Step */}
                  <div className="absolute -right-[8px] -top-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-white bg-[#318741] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]">
                    <span className="text-center text-[14px] font-bold leading-[20px] text-white">
                      2
                    </span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="inline-flex flex-col items-center pb-[12px]">
                <h4 className="text-center text-[24px] font-bold leading-[33.6px] text-[#171D17]">
                  Analisis AI Instan
                </h4>
              </div>

              <div className="inline-flex flex-col items-center px-2">
                <p className="text-center text-[16px] font-normal leading-[25.6px] text-[#40493E]">
                  Algoritma cerdas kami memproses data Anda secara real-time untuk mendeteksi potensi risiko kesehatan.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative flex flex-col items-center text-center max-w-[340px] z-10">

              {/* Icon */}
              <div className="inline-flex flex-col items-center pb-[32px]">
                <div className="relative flex flex-col items-start">

                  {/* Background */}
                  <div className="flex h-[80px] w-[80px] items-center justify-center rounded-[24px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]">
                    <Image
                      src="/icons/icon-laporan.svg"
                      alt="Laporan"
                      width={25}
                      height={25}
                    />
                  </div>

                  {/* Step */}
                  <div className="absolute -right-[8px] -top-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-white bg-[#318741] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)]">
                    <span className="text-center text-[14px] font-bold leading-[20px] text-white">
                      3
                    </span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="inline-flex flex-col items-center pb-[12px]">
                <h4 className="text-center text-[24px] font-bold leading-[33.6px] text-[#171D17]">
                  Laporan & Rekomendasi
                </h4>
              </div>

              <div className="inline-flex flex-col items-center px-2">
                <p className="text-center text-[16px] font-normal leading-[25.6px] text-[#40493E]">
                  Terima hasil analisis mendalam beserta saran tindakan preventif yang personal bagi kesehatan Anda.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="flex flex-col items-start self-stretch bg-white px-[71.5px] pt-[79px] pb-[80px]"
      >
        <div className="flex w-full max-w-[1280px] flex-row items-start gap-[64px] self-stretch px-[64px]">

          {/* Left */}
          <div className="flex w-[320px] flex-col items-start gap-4">
            <h2 className="text-[34px] font-bold leading-[41.6px] tracking-[-0.32px] text-[#171D17]">
              Pertanyaan Umum (FAQ)
            </h2>

            <p className="text-[16px] leading-[25.6px] text-[#40493D]">
              Informasi lebih lanjut mengenai layanan, keamanan data,
              dan penggunaan VitalsCheck AI.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-1 flex-col gap-4">

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-[20px] border border-[rgba(191,202,187,0.30)] bg-white transition-all duration-300"
                >

                  {/* Header */}
                  <button
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[#F6FBF1]"
                  >
                    <span className="text-[18px] font-semibold leading-[28px] text-[#181D17]">
                      {faq.question}
                    </span>

                    <div
                      className={`flex h-[32px] w-[32px] items-center justify-center rounded-full text-[22px] font-medium text-[#0F6D2B] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                    >
                      {isOpen ? '−' : '+'}
                    </div>
                  </button>

                  {/* Content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-[15px] leading-[28px] text-[#40493D]">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3320] px-8 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Image src="/icons/logo-white.png" alt="VitalsCheck" width={140} height={40} />
            <p className="text-white/60 text-[13px]">© 2026 VitalsCheck.AI. All rights reserved.</p>
          </div>
          <div className="flex gap-16">
            <div>
              <h4 className="text-white font-semibold text-[14px] mb-3">COMPANY</h4>
              <div className="flex flex-col gap-2 text-white/60 text-[13px]">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-white transition-colors">Careers</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-[14px] mb-3">HELP</h4>
              <div className="flex flex-col gap-2 text-white/60 text-[13px]">
                <Link href="#" className="hover:text-white transition-colors">Contact Support</Link>
                <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
                <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-[14px] mb-3">SOCIAL MEDIA</h4>
              <div className="flex gap-3">
                <div className="w-[36px] h-[36px] bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 cursor-pointer transition-colors">
                  𝕏
                </div>
                <div className="w-[36px] h-[36px] bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 cursor-pointer transition-colors">
                  in
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}