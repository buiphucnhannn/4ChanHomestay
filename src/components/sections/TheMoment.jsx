'use client';

import Image from 'next/image';
import { theMomentData } from '@/data/content';
import { OrganicFrame, Branch, Blossom, CatDoodle, SleepyCat, GrassTuft, PawTrail, Arrow } from '@/components/ui/Organic';

const ICONS = {
  // Giường — riêng tư
  lock: (
    <path d="M4 18.5V12a2 2 0 012-2h12a2 2 0 012 2v6.5M3 18.5h18M3 18.5V20m18-1.5V20M7 10V8a1.5 1.5 0 011.5-1.5h7A1.5 1.5 0 0117 8v2M8.5 10V9h7v1" />
  ),
  // Lấp lánh — sạch sẽ
  sparkles: (
    <path d="M11 3.5l1.8 5.2 5.2 1.8-5.2 1.8L11 17.5l-1.8-5.2L4 10.5l5.2-1.8L11 3.5zM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
  ),
  // Cửa + chìa — tự check-in
  key: (
    <path d="M7 3.5h8a1.5 1.5 0 011.5 1.5v14.5h-11V5A1.5 1.5 0 017 3.5zM4 19.5h16M13.5 11.5h.01M16.5 8.5h2.5v6h-2.5" />
  ),
};

// Mỗi thẻ: nền, viền sáng, màu icon — lấy đúng tông mẫu
const CARD_STYLES = [
  { bg: 'linear-gradient(160deg,#F3E8DA 0%,#EADBC8 100%)', icon: '#8A5A3C' },
  { bg: 'linear-gradient(160deg,#E3EAD9 0%,#D2DDC6 100%)', icon: '#5C7A4E' },
  { bg: 'linear-gradient(160deg,#F8E1D3 0%,#F1CDB9 100%)', icon: '#C4613F' },
];

export default function TheMoment() {
  return (
    <section id="the-moment" className="relative w-full pt-8 pb-16 lg:pt-12 lg:pb-28 overflow-hidden">

      <div className="relative lg:grid lg:grid-cols-[minmax(0,min(32vw,540px))_1fr] items-center gap-4">
        {/* Ảnh: tràn mép trái, có lớp sage làm khung phía sau */}
        <div data-reveal="moment-curtain" className="relative px-4 sm:px-6 lg:px-0">
          <OrganicFrame
            edges={{ right: { amp: 0.03, periods: 1, phase: Math.PI / 2, inset: 0.035 } }}
            className="hidden lg:block absolute inset-y-0 left-0 right-[-22px] bg-[#C9D4BC] lg:[mask-image:linear-gradient(to_bottom,transparent_0%,#000_16%,#000_84%,transparent_100%)]"
          >
            <span />
          </OrganicFrame>
          <OrganicFrame
            edges={{ right: { amp: 0.03, periods: 1, phase: Math.PI / 2, inset: 0.06 } }}
            className="relative h-[300px] sm:h-[380px] lg:h-[460px] w-full rounded-[28px] lg:rounded-none overflow-hidden lg:[mask-image:linear-gradient(to_bottom,transparent_0%,#000_16%,#000_84%,transparent_100%)]"
          >
            <Image
              src="/mockup-assets/moment-tea-corner-sharp.jpg"
              alt="Góc bàn trà ngập nắng tại 4Chan"
              fill
              sizes="(min-width:1024px) 32vw, 100vw"
              className="object-cover object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5a3a28]/15 via-transparent to-[#fff3e0]/10" />
          </OrganicFrame>
          <Branch className="hidden lg:block absolute right-[-48px] bottom-[-18px] w-20 animate-sway" leaves={8} flowers={2} flip />
        </div>

        {/* Nội dung: gom thành 1 khối có độ rộng cố định, canh giữa phần còn lại */}
        <div className="relative px-4 sm:px-6 lg:px-12 mt-14 lg:mt-0">
          <div className="mx-auto w-full max-w-[920px] grid xl:grid-cols-[minmax(0,1fr)_auto] gap-12 xl:gap-14 items-center">
            <div>
              <h2 data-reveal="moment-text" data-reveal-delay="150" className="mb-6 whitespace-nowrap">
                <span className="block font-serif text-[32px] sm:text-[36px] leading-none text-ink mb-2 ml-1">{theMomentData.subtitle}</span>
                <span className="font-serif text-[46px] sm:text-[52px] xl:text-[46px] 2xl:text-[54px] leading-none font-semibold text-terracotta">{theMomentData.brand}</span>
                <span className="font-script text-[54px] sm:text-[62px] xl:text-[54px] 2xl:text-[64px] leading-none text-ink ml-3">{theMomentData.scriptWord}</span>
              </h2>
              <div data-reveal="moment-text" data-reveal-delay="280" className="space-y-1.5 text-[15.5px] text-muted mb-7">
                {theMomentData.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <a data-reveal="moment-text" data-reveal-delay="400" href="#kham-pha-phong" className="link-arrow">
                {theMomentData.ctaText} <Arrow className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-col items-center xl:items-end">
              {/* Ghi chú viết tay — nằm ngay trên các thẻ */}
              <div data-reveal="moment-note" data-reveal-delay="300" className="relative hidden md:block mb-7 self-center">
                <p className="font-script text-[24px] leading-[1.2] text-[#6B5A4E] -rotate-[4deg] text-center">
                  Nơi những
                  <br />
                  khoảnh khắc bình thường
                  <br />
                  trở nên đặc biệt ♡
                </p>
                <Branch className="absolute -right-20 -top-7 w-11 rotate-[24deg]" leaves={6} flowers={2} />
              </div>

              {/* 3 thẻ "viên sỏi" */}
              <div className="relative grid grid-cols-3 gap-3 sm:gap-4 2xl:gap-5 pb-14">
                {theMomentData.features.map((f, i) => (
                  <div data-reveal="moment-pebble" data-reveal-delay={350 + i * 130}
                    key={f.title}
                    className="group relative flex flex-col items-center justify-center text-center w-full sm:w-[140px] xl:w-[128px] 2xl:w-[150px] aspect-[3/4] sm:aspect-[5/6] px-2 sm:px-3 ring-1 ring-white/70 shadow-[0_18px_36px_-22px_rgba(90,58,40,0.55)] transition-transform duration-300 hover:-translate-y-2"
                    style={{ background: CARD_STYLES[i].bg, borderRadius: "46% 46% 42% 42% / 40% 40% 44% 44%" }}
                  >
                    <svg
                      className="w-7 h-7 sm:w-9 sm:h-9 mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={CARD_STYLES[i].icon}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {ICONS[f.icon]}
                    </svg>
                    <h3 className="font-semibold text-[13px] sm:text-[15px] text-ink whitespace-nowrap">{f.title}</h3>
                    <p className="text-[10.5px] sm:text-[11.5px] text-muted leading-snug mt-1 max-w-[110px]">{f.desc}</p>
                  </div>
                ))}
                <CatDoodle className="absolute bottom-0 left-[38%] w-[70px]" />
                <Blossom className="absolute bottom-3 left-[58%] w-5 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Blossom className="absolute right-[3%] top-[30%] w-6 opacity-70 hidden lg:block" />


      {/* Hoạ tiết dọc mép sóng — vị trí bám theo độ cao đường sóng tại từng điểm */}
      <div data-reveal="decor" data-reveal-delay="300" aria-hidden className="hidden lg:block pointer-events-none">
        <GrassTuft className="absolute left-[4.5%] bottom-[44px] w-14" flower={false} />
        <GrassTuft className="absolute left-[7.2%] bottom-[46px] w-10" flip />
        <Branch className="absolute left-[14%] bottom-[46px] w-20 rotate-[62deg] opacity-90" leaves={7} flowers={2} />
        <Blossom className="absolute left-[10%] bottom-[104px] w-6 opacity-75" />
        <GrassTuft className="absolute left-[26.5%] bottom-[36px] w-16" />
        <GrassTuft className="absolute left-[29.6%] bottom-[34px] w-10" flower={false} flip />
        <Blossom className="absolute left-[33.5%] bottom-[108px] w-6 opacity-80" />
        <SleepyCat className="absolute left-[38%] bottom-[18px] w-[172px]" />
        <PawTrail className="absolute left-[50.5%] bottom-[44px] w-[210px] -rotate-6 opacity-80" />
        <GrassTuft className="absolute left-[64%] bottom-[30px] w-12" flower={false} flip />
        <Blossom className="absolute left-[69%] bottom-[92px] w-6 opacity-75" />
        <Branch className="absolute right-[20%] bottom-[44px] w-20 -rotate-[62deg] opacity-90" leaves={7} flowers={2} flip />
        <GrassTuft className="absolute right-[9.6%] bottom-[44px] w-10" flower={false} />
        <GrassTuft className="absolute right-[6.5%] bottom-[42px] w-16" flip />
        <Blossom className="absolute right-[14%] bottom-[112px] w-5 opacity-65" />
      </div>
    </section>
  );
}
