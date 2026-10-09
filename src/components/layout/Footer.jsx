'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { navLinks, siteConfig, branchesList } from '@/data/content';
import { smoothScrollTo } from '@/lib/smoothScroll';

const FOOTER_BG = '#2A1B13';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tel = siteConfig.phone.replace(/\./g, '');

  return (
    <>
      <footer id="lien-he" className="relative w-full text-[#E9DCCF]" style={{ background: FOOTER_BG }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Hàng chính: logo — menu — liên hệ */}
          <div data-reveal="footer" className="flex flex-col lg:flex-row items-center justify-between gap-7 py-9">
            <a href="#trang-chu" className="flex items-center gap-3.5 shrink-0">
              <span className="w-14 h-14 rounded-full bg-[#FBF6EF] ring-2 ring-[#E3A07E]/40 flex items-center justify-center">
                <Image src="/logo-mark.png" alt="4Chan Homestay" width={40} height={40} className="w-10 h-10 object-contain" />
              </span>
              <span className="leading-tight">
                <span className="block font-brand text-[24px] font-bold tracking-wide text-[#FBEFE4]">4Chan Homestay</span>
                <span className="block text-[13px] text-[#CDB8A6]">Riêng tư • Ấm cúng • Đáng nhớ</span>
              </span>
            </a>

            <nav className="flex flex-wrap justify-center gap-x-9 gap-y-2">
              {navLinks.slice(1).map((l) => (
                <a key={l.href} href={l.href} className="text-[15px] text-[#E9DCCF] hover:text-[#F3B08E] transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="text-center lg:text-right shrink-0">
              <p className="text-[15px] text-[#CDB8A6]">
                Hotline:{' '}
                <a href={`tel:${tel}`} className="font-bold text-[17px] text-[#FBEFE4] hover:text-[#F3B08E] transition-colors">
                  {siteConfig.phone}
                </a>
              </p>
              <p className="mt-1 text-[13px] text-[#B39F8E]">{branchesList.map((b) => b.name).join(' • ')} — Hà Nội</p>
            </div>
          </div>

          <div data-reveal="footer" data-reveal-delay="150" className="border-t border-white/10 pt-5 pb-24 sm:pb-5 text-center text-[13px] text-[#B39F8E]">
            © 2026 4Chan Homestay. Có những khoảng thời gian đáng giá ♡
          </div>
        </div>
      </footer>

      {/* Nút nổi: lên đầu trang + gọi điện */}
      <div className="fixed right-5 bottom-6 z-40 flex flex-col items-center gap-3">
        <button
          onClick={() => smoothScrollTo(0)}
          aria-label="Lên đầu trang"
          className={`w-14 h-14 rounded-full bg-white text-ink shadow-[0_10px_24px_-8px_rgba(42,27,19,0.45)] flex items-center justify-center hover:text-terracotta transition-all duration-300 cursor-pointer ${
            showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 12.5 10 7.5l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <a
          href={`tel:${tel}`}
          aria-label={`Gọi ${siteConfig.phone}`}
          className="relative w-14 h-14 rounded-full bg-terracotta text-white shadow-[0_10px_24px_-8px_rgba(207,104,71,0.8)] flex items-center justify-center hover:bg-terracotta-hover transition-colors"
        >
          <span className="absolute inset-0 rounded-full bg-terracotta/40 animate-ping" />
          <svg className="relative w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
          </svg>
        </a>
      </div>
    </>
  );
}
