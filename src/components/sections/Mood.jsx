'use client';

import Image from 'next/image';
import { moodsList } from '@/data/content';
import { Branch, Blossom, GrassTuft, PawTrail, SleepyCat } from '@/components/ui/Organic';

const BADGES = {
  cloud: { bg: '#E7F1FB', color: '#4A90D9', icon: <path d="M7 18a4 4 0 01-.6-8A5.5 5.5 0 0117 8.6 4.7 4.7 0 0117.5 18H7z" fill="currentColor" /> },
  cat: {
    bg: '#FCEBD9',
    color: '#D9822B',
    icon: <path d="M5 9l1.5-5 4 3h3l4-3L19 9v5a7 7 0 01-14 0V9zm4.5 4.2h.01m5 0h.01" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  },
  disc: {
    bg: '#2D2622',
    color: '#F3D9C6',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <circle cx="12" cy="12" r="3" fill="#CF6847" />
      </>
    ),
  },
  heart: { bg: '#FBE3E3', color: '#D9534F', icon: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" fill="currentColor" /> },
};

export default function Mood({ onOpenBooking }) {
  return (
    <section className="relative w-full pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      <Branch className="hidden lg:block absolute -left-4 top-0 w-20 opacity-80 animate-sway" leaves={7} flowers={2} />
      <Branch className="hidden 2xl:block absolute -right-3 top-[38%] w-16 opacity-80 animate-sway" leaves={7} flowers={1} flip />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative flex items-end justify-between gap-4 mb-7">
          <div data-reveal="mood-head" className="relative">
            <h2 className="font-serif text-[36px] sm:text-[42px] leading-[1.08] text-ink">
              Chọn <span className="text-terracotta">mood</span>
              <Blossom className="inline-block align-top ml-2 mt-1 w-7 opacity-90" />
              <br />
              của bạn
            </h2>
            <GrassTuft className="hidden md:block absolute left-[232px] sm:left-[262px] top-1 w-9" flower={false} />
            <p className="mt-2.5 text-[15px] text-muted">Căn phòng phù hợp cho mọi cảm xúc.</p>
          </div>

          {/* Hoạ tiết lấp khoảng trống bên phải tiêu đề */}
          <div data-reveal="decor" data-reveal-delay="250" aria-hidden className="hidden lg:block absolute inset-0 pointer-events-none">
            <PawTrail className="absolute left-[30%] bottom-3 w-[190px] -rotate-6 opacity-70" />
            <Blossom className="absolute left-[47%] top-4 w-6 opacity-70" />
            <Branch className="absolute left-[55%] top-6 w-20 rotate-[70deg] opacity-90" leaves={7} flowers={2} />
            <p className="absolute right-[30%] top-3 font-script text-[24px] leading-[1.15] text-[#6B5A4E] -rotate-6 text-center">
              Hôm nay
              <br />
              bạn thấy thế nào? ♡
            </p>
            <GrassTuft className="absolute right-[19%] bottom-0 w-12" />
            <SleepyCat className="absolute right-[4%] bottom-0 w-[150px]" />
            <Blossom className="absolute right-[2%] top-2 w-5 opacity-65" />
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pt-2 pb-8 -mt-2 -mb-6">
            {moodsList.map((mood, i) => {
              const b = BADGES[mood.badgeIcon] ?? BADGES.heart;
              return (
                <button data-reveal={i % 2 ? 'mood-card-r' : 'mood-card-l'} data-reveal-delay={150 + i * 110}
                  key={mood.id}
                 
                  onClick={onOpenBooking}
                  className="group snap-start shrink-0 w-[78%] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)] text-left rounded-[26px] p-2 pb-5 cursor-pointer bg-gradient-to-b from-[#FCEFE4] to-[#F7E6D7] ring-1 ring-white/80 shadow-[0_16px_34px_-22px_rgba(90,58,40,0.6)] transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden">
                    <Image
                      src={mood.photo}
                      alt={mood.name}
                      fill
                      sizes="(min-width:1024px) 25vw, 80vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#3b2a20]/25 to-transparent" />
                  </div>
                  <div className="relative px-3.5">
                    <span
                      className="absolute -top-7 left-3.5 w-14 h-14 rounded-full ring-4 ring-[#FCEFE4] shadow-[0_8px_18px_-8px_rgba(90,58,40,0.5)] flex items-center justify-center"
                      style={{ background: b.bg, color: b.color }}
                    >
                      <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden>
                        {b.icon}
                      </svg>
                    </span>
                    <h3 className="pt-10 text-[21px] font-bold text-terracotta leading-tight">{mood.name}</h3>
                    <p className="text-[13px] text-muted mt-1">{mood.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div data-reveal="decor" data-reveal-delay="300" aria-hidden className="hidden lg:block pointer-events-none">
        <GrassTuft className="absolute left-[3%] bottom-[46px] w-12" flower={false} />
        <GrassTuft className="absolute left-[5.6%] bottom-[46px] w-9" flip />
        <Blossom className="absolute left-[24%] bottom-[30px] w-5 opacity-70" />
        <GrassTuft className="absolute left-[47%] bottom-[24px] w-10" flower={false} />
        <Blossom className="absolute left-[70%] bottom-[34px] w-5 opacity-70" />
        <GrassTuft className="absolute right-[4%] bottom-[44px] w-12" flip />
      </div>
    </section>
  );
}
