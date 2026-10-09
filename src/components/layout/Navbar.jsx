'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { navLinks } from '@/data/content';
import { Arrow } from '@/components/ui/Organic';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu mobile: đóng bằng phím Esc hoặc khi màn hình chuyển sang cỡ desktop
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMobileMenuOpen(false);
    const mq = window.matchMedia('(min-width: 1280px)');
    const onMq = () => mq.matches && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [mobileMenuOpen]);

  return (
    <>
    {/* Lớp nền phía sau menu mobile — bấm/chạm ra ngoài chỉ để đóng menu.
        Đóng khi cú bấm đã hoàn tất (không phải lúc vừa chạm) và nuốt luôn cú bấm đó,
        nên không "xuyên" xuống nút bên dưới. Lớp này còn chặn thao tác thêm 300ms trong lúc mờ dần. */}
    <div
      aria-hidden
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setMobileMenuOpen(false);
      }}
      onPointerDown={(e) => e.preventDefault()}
      className={`xl:hidden fixed inset-0 z-40 bg-[#2a1b13]/25 backdrop-blur-[2px] transition-[opacity,visibility] duration-300 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    />
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-cream/90 backdrop-blur-md shadow-[0_6px_24px_-16px_rgba(90,58,40,0.45)] py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#trang-chu" className="flex items-center gap-2.5 group shrink-0">
          <Image
            src="/logo-mark.png"
            alt="4Chan Homestay"
            width={44}
            height={44}
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain transition-transform group-hover:rotate-6"
            preload
          />
          <div className="flex flex-col leading-none">
            <span className="font-brand text-[24px] sm:text-[27px] font-bold tracking-tight text-[#4A5A44]">4Chan</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[8.5px] tracking-[0.32em] font-medium text-muted uppercase">
              <span className="h-px w-2.5 bg-muted/50" />
              Homestay
              <span className="h-px w-2.5 bg-muted/50" />
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-9 rounded-full px-7 py-2.5 bg-cream/70 backdrop-blur-sm">
          {navLinks.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-[13.5px] font-medium transition-colors relative py-1 after:absolute after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:rounded-full after:bg-terracotta after:transition-all after:duration-300 hover:text-terracotta hover:after:w-4 ${
                idx === 0 ? 'text-terracotta after:w-4' : 'text-[#4A3F37] after:w-0'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button onClick={onOpenBooking} className="btn-primary !py-2.5 !px-5 !text-[13px]">
            Đặt phòng ngay <Arrow />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#4A3F37] rounded-full bg-white/70"
            aria-label="Mở menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth="2" d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-2">
          <button onClick={onOpenBooking} className="btn-primary !py-2 !px-4 !text-xs">
            Đặt phòng
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#4A3F37] rounded-full bg-white/70"
            aria-label="Mở menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth="2" d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 sm:px-6 pt-3 pb-6">
          <div className="rounded-3xl card-soft p-4 space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl px-4 py-2.5 text-[15px] font-medium text-[#4A3F37] hover:bg-warm hover:text-terracotta"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
    </>
  );
}
