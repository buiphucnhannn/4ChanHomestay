'use client';

import Image from 'next/image';
import { experiencesList } from '@/data/content';
import { Branch, Arrow, DecorRow } from '@/components/ui/Organic';

const BADGES = {
  heart: { color: '#D9534F', icon: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" fill="currentColor" /> },
  image: {
    color: '#CF6847',
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
        <path d="M4 16.5l4.5-4.5 4 4 2.5-2.5 5 5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" />
        <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
      </>
    ),
  },
  key: {
    color: '#C68A2E',
    icon: <path d="M14.5 4a5.5 5.5 0 00-5.2 7.3L3.5 17v3.5H7V18h2.5v-2.5H12l1.2-1.2A5.5 5.5 0 1014.5 4zm1.5 4.2a1.3 1.3 0 110 .01z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />,
  },
  sparkles: {
    color: '#5E7354',
    icon: <path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9L12 3z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />,
  },
};

export default function Experience() {
  return (
    <section className="relative w-full pt-8 pb-16 lg:pt-10 lg:pb-20 overflow-hidden">
      <Branch className="hidden lg:block absolute -left-3 top-2 w-20 opacity-80 animate-sway" leaves={7} flowers={1} />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-12 items-center">
        <div data-reveal="exp-head" className="relative">
          <h2 className="font-serif text-[34px] sm:text-[40px] leading-[1.12] text-ink whitespace-nowrap">
            Trải nghiệm
            <br />
            <span className="text-terracotta font-semibold">4Chan</span> khác biệt
          </h2>
          <p className="mt-4 mb-7 text-[15px] text-muted max-w-[230px]">Những điều nhỏ, tạo nên khoảnh khắc thật đặc biệt.</p>
          <a href="#kham-pha-phong" className="btn-primary">
            Khám phá ngay <Arrow />
          </a>
          <p className="hidden lg:block absolute right-0 -top-8 font-script text-xl leading-none text-muted rotate-[-10deg]">
            Good Vibes
            <br />
            Here ♡
          </p>
        </div>

        {/* Dải nền mềm chung phía sau 4 thẻ, giống mẫu */}
        <div className="relative">
          <div data-reveal="exp-band" data-reveal-delay="100"
            aria-hidden
            className="absolute -inset-x-4 -inset-y-5 lg:-inset-x-6 bg-gradient-to-r from-[#F6E3D3] via-[#F3E6D8] to-[#E4E9DA] opacity-80"
            style={{ borderRadius: '56px 72px 56px 72px / 64px 48px 64px 48px' }}
          />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5 py-2">
            {experiencesList.map((item, i) => {
              const badge = BADGES[item.icon] ?? BADGES.sparkles;
              return (
                <div data-reveal="exp-card" data-reveal-delay={250 + i * 130}
                  key={item.title}
                  className="group rounded-[32px] bg-white/65 backdrop-blur-sm p-2.5 pb-5 ring-1 ring-white/80 shadow-[0_18px_36px_-24px_rgba(90,58,40,0.6)] transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <div className="relative">
                    {/* Ảnh dạng "viên sỏi": bo tròn đều, lật đối xứng xen kẽ */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden"
                      style={{ borderRadius: i % 2 ? '42% 58% 46% 54% / 52% 48% 52% 48%' : '58% 42% 54% 46% / 48% 52% 48% 52%' }}
                    >
                      <Image
                        src={item.photo}
                        alt={item.title}
                        fill
                        sizes="(min-width:768px) 22vw, 45vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span
                      className="absolute -bottom-6 left-3 w-14 h-14 rounded-full bg-white ring-4 ring-[#FBF1E8] shadow-[0_8px_18px_-8px_rgba(90,58,40,0.5)] flex items-center justify-center"
                      style={{ color: badge.color }}
                    >
                      <svg className="w-7 h-7" viewBox="0 0 24 24" aria-hidden>
                        {badge.icon}
                      </svg>
                    </span>
                  </div>
                  <div className="px-2 pt-9">
                    <h3 className="text-[15px] font-semibold text-ink leading-snug">{item.title}</h3>
                    <p className="text-[12.5px] text-muted mt-1">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <DecorRow variant="b" />
    </section>
  );
}
