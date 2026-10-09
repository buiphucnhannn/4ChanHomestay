'use client';

import { pricingPackages, priceNote } from '@/data/content';
import { Branch, Blossom, CatDoodle, GrassTuft } from '@/components/ui/Organic';

const ICONS = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" fill="#FCD9A8" />
      <path strokeLinecap="round" d="M12 2.5v2.2m0 14.6v2.2M4.6 4.6l1.6 1.6m11.6 11.6 1.6 1.6M2.5 12h2.2m14.6 0h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
    </>
  ),
  coffee: <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h12v5a5 5 0 01-5 5H9a5 5 0 01-5-5V9zm12 1h1.5a2.5 2.5 0 010 5H16M7 3.5v2.5M10 3.5v2.5M13 3.5v2.5" />,
  'sun-high': (
    <>
      <circle cx="12" cy="13" r="4.2" fill="#FCD9A8" />
      <path strokeLinecap="round" d="M12 4v2m-6.4.6 1.4 1.4m11.4-1.4L17 8M3 13h2m14 0h2M7 20h10" />
    </>
  ),
  moon: <path strokeLinejoin="round" d="M19.5 14.5A8 8 0 019.5 4.5a8 8 0 1010 10z" fill="#FCD9A8" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path strokeLinecap="round" d="M8 3v4m8-4v4M3.5 10h17M9 14.5l2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="#FCE6CF" />
      <path strokeLinecap="round" d="M12 7.5V12l3 2" />
    </>
  ),
};

export default function Pricing({ onOpenBooking }) {
  return (
    <section id="bang-gia" className="relative w-full pt-8 pb-16 lg:pt-14 lg:pb-16 overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-center">
          <div data-reveal="price-head" className="relative">
            <h2 className="font-serif text-[34px] sm:text-[40px] leading-[1.12] text-ink whitespace-nowrap">
              Chọn thời gian
              <br />
              nghỉ ngơi của bạn
            </h2>
            <p className="mt-4 text-[15px] text-muted max-w-[240px]">Linh hoạt theo nhu cầu, giá rõ ràng, dễ đặt.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {pricingPackages.map((pkg, i) => (
              <button data-reveal="price-card" data-reveal-delay={120 + i * 90}
                key={pkg.duration}
                onClick={onOpenBooking}
                className="group card-soft rounded-[28px] px-3.5 pt-6 pb-5 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-terracotta/60"
              >
                <svg className="w-10 h-10 text-terracotta mb-3 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  {ICONS[pkg.icon]}
                </svg>
                <h3 className="min-h-[42px] flex items-center text-[15px] font-semibold text-ink leading-tight">{pkg.duration}</h3>
                <p className="text-[11.5px] text-muted mt-0.5 mb-4">{pkg.timeframe}</p>
                <div className="w-full mt-auto pt-3.5 border-t border-dashed border-line space-y-1.5">
                  <div className="flex items-baseline justify-between gap-1 px-1">
                    <span className="text-[11px] text-muted">Cửa sổ</span>
                    <span className="font-serif text-[20px] font-semibold text-terracotta">{pkg.windowPrice}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-1 px-1">
                    <span className="text-[11px] text-muted">Ban công</span>
                    <span className="font-serif text-[20px] font-semibold text-terracotta-hover">{pkg.balconyPrice}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div data-reveal="price-note" data-reveal-delay="500" className="mt-6 lg:ml-[368px] rounded-[22px] sm:rounded-full bg-warm border border-line px-6 py-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-center text-[13px] text-muted">
          <span>{priceNote.extraHour}</span>
          <span className="hidden sm:block w-px h-3.5 bg-line" />
          <span>{priceNote.weekend}</span>
        </div>
      </div>

      <Branch className="hidden 2xl:block absolute right-3 bottom-16 w-16 opacity-90 animate-sway" leaves={7} flowers={2} flip />

      {/* Cụm hoạ tiết góc dưới trái — bám theo mép sóng */}
      <div data-reveal="decor" data-reveal-delay="300" aria-hidden className="hidden lg:block pointer-events-none">
        <GrassTuft className="absolute left-[2.5%] bottom-[48px] w-14" flower={false} />
        <GrassTuft className="absolute left-[5.4%] bottom-[46px] w-10" flip />
        <Blossom className="absolute left-[8.5%] bottom-[116px] w-6 opacity-75" />
        <Branch className="absolute left-[11%] bottom-[44px] w-20 rotate-[58deg] opacity-90" leaves={7} flowers={2} />
        <CatDoodle className="absolute left-[18.5%] bottom-[32px] w-[68px]" />
        <GrassTuft className="absolute left-[23.5%] bottom-[24px] w-11" />
        <Blossom className="absolute left-[21.5%] bottom-[104px] w-5 opacity-70" />
      </div>
    </section>
  );
}
