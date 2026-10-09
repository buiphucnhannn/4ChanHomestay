'use client';

import Image from 'next/image';
import { branchesList } from '@/data/content';
import { Branch, Blossom, GrassTuft, DecorRow } from '@/components/ui/Organic';

// Bản đồ minh hoạ tan dần vào nền ở cả 4 cạnh
const MAP_FADE =
  'radial-gradient(ellipse 58% 62% at 50% 50%, #000 58%, transparent 100%)';

export default function Locations() {
  return (
    <section id="dia-diem" className="relative w-full pt-8 pb-20 lg:pt-12 lg:pb-32 overflow-hidden">
      <Branch className="hidden 2xl:block absolute -right-2 bottom-24 w-16 opacity-80 animate-sway" leaves={8} flowers={2} flip />
      <Blossom className="hidden lg:block absolute left-[2%] bottom-[30%] w-6 opacity-70" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] gap-8 items-center">
        <div>
          <h2 data-reveal="loc-head" className="font-serif text-[36px] sm:text-[42px] leading-[1.1] text-ink mb-2">3 cơ sở tại Hà Nội</h2>
          <p data-reveal="loc-head" data-reveal-delay="120" className="text-[15px] text-muted mb-7">Dễ tìm – Thuận tiện – Cùng một chất riêng 4Chan.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[640px] lg:max-w-none mx-auto lg:mx-0">
            {branchesList.map((b, i) => (
              <a data-reveal="loc-card" data-reveal-delay={200 + i * 130}
                key={b.id}
                href={b.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Mở ${b.name} trên Google Maps`}
                className="group rounded-[24px] p-2.5 pr-3 flex items-center gap-3 xl:gap-4 text-left cursor-pointer bg-gradient-to-br from-[#FFF8F1] to-[#F8EADC] ring-1 ring-white/80 shadow-[0_16px_32px_-22px_rgba(90,58,40,0.6)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative w-[72px] h-[80px] xl:w-[84px] xl:h-[92px] shrink-0 rounded-[18px] overflow-hidden">
                  <Image src={b.image} alt={b.name} fill sizes="92px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[16px] xl:text-[17px] font-bold text-ink leading-tight whitespace-nowrap">{b.name}</h3>
                  <p className="text-[12.5px] text-muted leading-snug mt-1.5 text-balance">{b.address}</p>
                  <p className="text-[12.5px] text-muted leading-snug whitespace-nowrap">{b.district}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bản đồ minh hoạ — to hơn, không viền, mờ dần vào nền */}
        <div data-reveal="loc-map" data-reveal-delay="250" className="relative w-full max-w-[640px] mx-auto xl:max-w-none">
          <div
            className="relative w-full aspect-[1376/768]"
            style={{ maskImage: MAP_FADE, WebkitMaskImage: MAP_FADE }}
          >
            <Image src="/mockup-assets/map-hanoi-sharp.jpg" alt="Bản đồ 3 cơ sở 4Chan tại Hà Nội" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          {/* Vùng bấm trên từng ghim định vị → mở Google Maps */}
          {branchesList.map((b) => (
            <a
              key={b.id}
              href={b.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Mở ${b.name} trên Google Maps`}
              title={`Mở ${b.name} trên Google Maps`}
              className="absolute rounded-full transition-transform duration-300 hover:scale-105 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-terracotta"
              style={{ left: `${b.mapPin.left}%`, top: `${b.mapPin.top}%`, width: `${b.mapPin.width}%`, height: `${b.mapPin.height}%` }}
            />
          ))}
          <GrassTuft className="hidden lg:block absolute right-[2%] -bottom-4 w-12" flip />
        </div>
      </div>
      <DecorRow variant="a" />
    </section>
  );
}
