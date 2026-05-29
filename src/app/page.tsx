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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
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

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-5 md:px-[85px] h-[64px]">
          <Image src="/icons/logo.png" alt="VitalsCheck" width={140} height={40} />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-[25px]">
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

          {/* Desktop login button */}
          <Link href="/login" className="hidden md:block">
            <button className="flex h-[30px] px-6 flex-col justify-center items-center rounded-[20px] bg-[#0F6D2B] text-white text-[14px] font-semibold transition-colors hover:bg-[#318741]">
              Login
            </button>
          </Link>

          {/* Mobile: login + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/login">
              <button className="flex h-[30px] px-4 justify-center items-center rounded-[20px] bg-[#0F6D2B] text-white text-[13px] font-semibold">
                Login
              </button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-[#40493D]"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <>
                    <line x1="4" y1="4" x2="20" y2="20" />
                    <line x1="20" y1="4" x2="4" y2="20" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveNav(link.href);
                  setMobileMenuOpen(false);
                }}
                className={`text-[15px] py-1 transition-colors ${activeNav === link.href
                    ? 'text-[#318741] font-semibold'
                    : 'text-[#40493D]'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav >

      {/* ── Hero ── */}
      < section className="px-5 md:px-[88px] py-12 md:py-[80px] bg-white" >
        <div className="flex flex-col-reverse md:grid md:gap-x-[48px] md:items-center"
          style={{ gridTemplateColumns: '1fr auto' }}
        >
          {/* Kiri - Text */}
          <div className="flex flex-col justify-center items-start gap-6 mt-8 md:mt-0">
            <div className="flex flex-col gap-3">
              <h1 className="text-[32px] md:text-[48px] font-bold text-[#181D17] leading-tight">
                Monitor Kesehatan <br className="hidden md:block" /> Anda dengan Presisi AI
              </h1>
              <p className="text-[15px] md:text-[16px] text-[#40493D] leading-relaxed max-w-[520px]">
                VitalsCheck membantu Anda mendeteksi risiko kesehatan lebih dini melalui analisis data biometrik yang cerdas dan laporan medis yang akurat.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
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

          {/* Kanan - Image */}
          <div className="w-full md:w-[452px] lg:w-[552px]">
            <div className="w-full aspect-square max-w-[320px] md:max-w-none md:w-[452px] lg:w-[552px] rounded-[24px] overflow-hidden relative mx-auto md:mx-0">
              <Image
                src="/images/body-human.png"
                alt="Human Body"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section >

      {/* ── Misi Kami ── */}
      < section id="tentang" className="bg-[#F0F5EB] px-5 md:px-[88px] lg:px-[143px] py-12 md:py-[80px]" >
        <div className="flex flex-col md:grid md:gap-[48px] md:items-start"
          style={{ gridTemplateColumns: '1fr auto' }}
        >
          {/* Kiri */}
          <div className="flex flex-col gap-8 md:gap-0 md:justify-between md:h-[448px]">
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] md:text-[40px] font-bold leading-tight text-[#181D17]">
                Misi Kami
              </h2>
              <p className="text-[15px] md:text-[16px] leading-[28px] text-[#40493D]">
                Di VitalsCheck, kami percaya bahwa pencegahan adalah obat terbaik.
                Kami memadukan teknologi kecerdasan buatan (AI) dengan ilmu medis
                untuk memberikan deteksi dini kesehatan yang mudah diakses oleh siapa saja, kapan saja.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="flex flex-col items-start gap-3 rounded-[16px] border border-[rgba(191,202,187,0.30)] bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                <Image src="/icons/icon-shield-lock.svg" alt="Shield Lock" width={24} height={24} />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[17px] font-semibold text-[#181D17]">Data Privacy Guaranteed</h3>
                  <p className="text-[14px] leading-[24px] text-[#40493D]">
                    Privasi dan keamanan data kesehatan Anda menjadi prioritas utama kami.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-start gap-3 rounded-[16px] border border-[rgba(191,202,187,0.30)] bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                <Image src="/icons/icon-shield-acc.svg" alt="Shield Access" width={24} height={24} />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[17px] font-semibold text-[#181D17]">Data Terenkripsi & Aman</h3>
                  <p className="text-[14px] leading-[24px] text-[#40493D]">
                    Sistem keamanan berlapis dengan standar perlindungan industri modern.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan - Icon box */}
          <div className="hidden md:flex justify-end items-start mt-0">
            <div className="flex w-[280px] lg:w-[448px] aspect-square items-center justify-center rounded-[48px] bg-[#0F6D2B]">
              <Image src="/icons/icon-plus-health.svg" alt="Health Plus" width={120} height={120} />
            </div>
          </div>
        </div>
      </section >

      {/* ── Fitur Unggulan ── */}
      < section id="fitur" className="flex flex-col items-center bg-white px-5 md:px-8 py-12 md:py-[80px]" >
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-10 md:gap-[48px]">
          <h2 className="text-center text-[28px] md:text-[34px] font-bold leading-tight tracking-[-0.32px] text-[#171D17]">
            Fitur Unggulan
          </h2>

          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {[
              { icon: '/icons/icon-deteksi.svg', alt: 'Deteksi', title: 'Deteksi Risiko Dini', desc: 'Menggunakan algoritma AI canggih untuk mendeteksi anomali kesehatan sebelum berkembang menjadi risiko serius.' },
              { icon: '/icons/icon-input.svg', alt: 'Input', title: 'Input Data Mandiri', desc: 'Masukkan data biometrik secara manual untuk mendapatkan analisis kesehatan yang akurat dan personal.' },
              { icon: '/icons/icon-analisis.svg', alt: 'Analisis', title: 'Laporan Analisis AI', desc: 'Dapatkan laporan kesehatan mendalam dengan rekomendasi tindakan preventif yang dipersonalisasi secara otomatis.' },
            ].map((item) => (
              <div key={item.title} className="relative min-h-[280px] w-full max-w-[368px] rounded-[16px] shadow-[0_10px_30px_-10px_rgba(15,109,43,0.15)]">
                <div className="flex h-full flex-col items-start gap-6 rounded-[16px] bg-[rgba(15,109,43,0.10)] p-7 md:p-8">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[14px] bg-white">
                    <Image src={item.icon} alt={item.alt} width={25} height={25} />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[20px] md:text-[22px] font-semibold leading-[30px] text-[#181D17]">{item.title}</h3>
                    <p className="text-[15px] leading-[28px] text-[#40493D]">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* ── Cara Kerja ── */}
      < section id="cara-kerja" className="flex flex-col items-center bg-[#F6FBF1] px-5 md:px-8 py-12 md:py-[80px]" >
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-12 md:gap-[64px]">
          <h2 className="text-center text-[28px] md:text-[34px] font-bold leading-tight tracking-[-0.32px] text-[#171D17]">
            Cara Kerja VitalsCheck
          </h2>

          <div className="relative grid w-full grid-cols-1 md:grid-cols-3 gap-10 md:gap-[48px] justify-items-center">
            {/* Connector line - desktop only */}
            <div className="absolute left-[15%] right-[15%] top-[40px] hidden h-[2px] bg-[linear-gradient(90deg,rgba(15,109,43,0.00)_0%,rgba(15,109,43,0.20)_50%,rgba(15,109,43,0.00)_100%)] md:block" />

            {[
              { icon: '/icons/icon-input-step.svg', alt: 'Input', step: '1', title: 'Input Data Mandiri', desc: 'Masukkan informasi kesehatan dan hasil lab Anda dengan mudah ke dalam sistem kami yang aman.' },
              { icon: '/icons/icon-thinking.svg', alt: 'Thinking', step: '2', title: 'Analisis AI Instan', desc: 'Algoritma cerdas kami memproses data Anda secara real-time untuk mendeteksi potensi risiko kesehatan.' },
              { icon: '/icons/icon-laporan.svg', alt: 'Laporan', step: '3', title: 'Laporan & Rekomendasi', desc: 'Terima hasil analisis mendalam beserta saran tindakan preventif yang personal bagi kesehatan Anda.' },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center max-w-[340px] z-10 w-full">
                <div className="inline-flex flex-col items-center pb-8">
                  <div className="relative">
                    <div className="flex h-[80px] w-[80px] items-center justify-center rounded-[24px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]">
                      <Image src={item.icon} alt={item.alt} width={25} height={25} />
                    </div>
                    <div className="absolute -right-[8px] -top-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-white bg-[#318741] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10)]">
                      <span className="text-[14px] font-bold text-white">{item.step}</span>
                    </div>
                  </div>
                </div>
                <h4 className="text-[22px] md:text-[24px] font-bold leading-[33.6px] text-[#171D17] mb-3">{item.title}</h4>
                <p className="text-[15px] md:text-[16px] leading-[25.6px] text-[#40493E] px-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* ── FAQ ── */}
      < section id="faq" className="bg-white px-5 md:px-16 py-12 md:py-[80px]" >
        <div className="flex w-full max-w-[1280px] mx-auto flex-col md:flex-row items-start gap-10 md:gap-[64px]">

          {/* Left */}
          <div className="flex w-full md:w-[280px] lg:w-[320px] flex-shrink-0 flex-col gap-4">
            <h2 className="text-[28px] md:text-[34px] font-bold leading-tight tracking-[-0.32px] text-[#171D17]">
              Pertanyaan Umum (FAQ)
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[25.6px] text-[#40493D]">
              Informasi lebih lanjut mengenai layanan, keamanan data, dan penggunaan VitalsCheck AI.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-1 flex-col gap-4 w-full">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-[20px] border border-[rgba(191,202,187,0.30)] bg-white transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left transition-colors hover:bg-[#F6FBF1]"
                  >
                    <span className="text-[16px] md:text-[18px] font-semibold leading-[28px] text-[#181D17] pr-4">
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 flex h-[32px] w-[32px] items-center justify-center rounded-full text-[22px] font-medium text-[#0F6D2B] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                      {isOpen ? '−' : '+'}
                    </div>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] md:text-[15px] leading-[28px] text-[#40493D]">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section >

      {/* ── Footer ── */}
      < footer className="bg-[#1a3320] px-5 md:px-16 py-10 md:py-12" >
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Image src="/icons/logo-white.png" alt="VitalsCheck" width={140} height={40} />
            <p className="text-white/60 text-[13px]">© 2026 VitalsCheck.AI. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-10 md:gap-16">
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
                <div className="w-[36px] h-[36px] bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 cursor-pointer transition-colors">𝕏</div>
                <div className="w-[36px] h-[36px] bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 cursor-pointer transition-colors">in</div>
              </div>
            </div>
          </div>
        </div>
      </footer >

    </div >
  );
}