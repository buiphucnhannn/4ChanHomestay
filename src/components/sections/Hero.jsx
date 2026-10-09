'use client';

import Image from 'next/image';
import { heroData } from '@/data/content';
import { OrganicFrame, Branch, Blossom, Arrow } from '@/components/ui/Organic';

/*
 * Mặt nạ cạnh trái lượn sóng + mép mờ → ảnh tan dần vào nền kem.
 * Dựng sẵn thành PNG (scripts/generate-hero-mask.cjs) thay vì SVG có bộ lọc blur:
 * trình duyệt không phải tính lại khi cuộn nên không còn bị vỡ ô vuông.
 */
const HERO_MASK = 'url(/masks/hero-feather.png)';
const MASK_STYLE = {
  maskImage: HERO_MASK,
  WebkitMaskImage: HERO_MASK,
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  WebkitMaskRepeat: 'no-repeat',
};

export default function Hero({ onOpenBooking }) {
  return (
    <section id="trang-chu" className="relative w-full overflow-hidden bg-cream lg:h-[100svh] lg:min-h-[600px]">
      {/* Ảnh phòng — desktop phủ kín toàn bộ chiều cao màn hình, cạnh trái tan mờ vào nền */}
      {/* Lớp ngoài: chỉ giữ mặt nạ, đứng yên → trình duyệt vẽ mặt nạ một lần rồi tái sử dụng khi cuộn.
          Hiệu ứng xuất hiện đặt ở lớp trong, không làm mặt nạ phải vẽ lại từng khung hình. */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[50%] xl:w-[55%] overflow-hidden" style={MASK_STYLE}>
        <div data-reveal="hero-image" data-reveal-delay="150" className="absolute inset-0">
        <Image
          src="/mockup-assets/hero-room-v2.jpg"
          alt="Phòng 4Chan Homestay với đèn neon mèo"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width:1024px) 55vw, 1px"
          className="object-cover object-[52%_center]"
        />
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#2b1a10]/25 to-transparent pointer-events-none" />
        <div className="absolute right-[3%] bottom-[8%] rounded-[34px] bg-[#3b2a20]/55 px-9 py-6 text-right -rotate-6 pointer-events-none">
          <p className="font-script text-[clamp(22px,3.2vh,30px)] leading-[1.05] text-[#FFF3E6]">A little stay,</p>
          <p className="font-script text-[clamp(22px,3.2vh,30px)] leading-[1.05] text-[#FFF3E6]">A softer you ♡</p>
        </div>
        </div>
      </div>

      {/* Hoạ tiết lá */}
      <Branch className="hidden 2xl:block absolute -left-6 top-[12%] w-28 sm:w-32 opacity-80 animate-sway" leaves={10} flowers={2} />
      <Blossom className="absolute left-[1.2%] top-[72%] w-6 opacity-80 hidden 2xl:block" />

      {/* Nội dung chữ: căn giữa theo chiều dọc */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-28 pb-10 lg:pt-[84px] lg:pb-[40px]">
        <div className="w-full lg:w-[48%] xl:w-[44%]">
          <p data-reveal="hero-text" data-reveal-delay="100" className="text-[12px] sm:text-[13px] lg:text-[clamp(12px,1.7vh,15px)] font-semibold tracking-[0.28em] text-terracotta uppercase mb-[clamp(14px,2.4vh,24px)]">
            {heroData.locationBadge}
          </p>

          <h1 data-reveal="hero-text" data-reveal-delay="220" className="font-serif text-[42px] sm:text-[52px] lg:text-[clamp(40px,min(7.2vh,4.6vw),68px)] leading-[1.12] text-ink tracking-tight">
            Có những khoảng
            <br />
            thời gian <span className="font-semibold">đáng giá</span>
          </h1>

          <div data-reveal="hero-text" data-reveal-delay="380" className="font-script text-terracotta text-[36px] sm:text-[46px] lg:text-[clamp(32px,min(5.8vh,3.8vw),56px)] leading-[1.12] mt-[clamp(8px,1.4vh,14px)] mb-[clamp(16px,2.8vh,28px)]">
            <p>{heroData.scriptLine1}</p>
            <p className="pl-1 inline-flex items-center gap-3">
              {heroData.scriptLine2}
              <svg viewBox="0 0 30 26" className="w-8 h-7 text-terracotta" fill="none" aria-hidden>
                <path d="M15 24C6 17 2 12 2 7.5 2 4.4 4.5 2 7.6 2c2.6 0 4.3 1.6 7.4 4.6C18.1 3.6 19.8 2 22.4 2 25.5 2 28 4.4 28 7.5c0 4.5-4 9.5-13 16.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </p>
          </div>

          <p data-reveal="hero-text" data-reveal-delay="520" className="text-[17px] sm:text-[18px] lg:text-[clamp(17px,2.4vh,21px)] text-muted leading-relaxed max-w-[560px] mb-[clamp(22px,4vh,40px)] text-balance">
            {heroData.desc.replace(/\n/g, ' ')}
          </p>

          <div data-reveal="hero-text" data-reveal-delay="660" className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3 sm:gap-3.5">
            <button onClick={onOpenBooking} className="btn-primary lg:!text-[16px] lg:!px-8 lg:!py-[15px]">
              Đặt phòng ngay <Arrow />
            </button>
            <a href="#kham-pha-phong" className="btn-outline lg:!text-[16px] lg:!px-8 lg:!py-[14px]">
              Khám phá phòng <Arrow />
            </a>
          </div>
        </div>
      </div>

      {/* Ảnh — mobile/tablet */}
      <div data-reveal="hero-image" data-reveal-delay="300" className="lg:hidden relative z-10 px-4 sm:px-6 pb-20">
        <OrganicFrame
          edges={{ top: { amp: 0.025, periods: 1.5, inset: 0.03 }, bottom: { amp: 0.025, periods: 1.5, phase: Math.PI, inset: 0.03 } }}
          className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-md"
        >
          <Image src="/mockup-assets/hero-room-v2.jpg" alt="Phòng 4Chan Homestay" fill loading="eager" sizes="(min-width:1024px) 1px, (min-width:640px) calc(100vw - 48px), calc(100vw - 32px)" className="object-cover object-[50%_center]" />
        </OrganicFrame>
      </div>

      {/* Nút cuộn */}
      <a
        href="#the-moment"
        aria-label="Cuộn xuống"
        className="absolute z-20 bottom-[clamp(12px,2.2vh,22px)] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-[0_8px_20px_-8px_rgba(90,58,40,0.45)] flex items-center justify-center text-muted hover:text-terracotta transition-colors"
      >
        <svg className="w-4 h-4 animate-bounce" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M10 3v13m-5-5 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
