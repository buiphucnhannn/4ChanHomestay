'use client';

import Image from 'next/image';
import { eveningBannerData } from '@/data/content';
import { WaveDivider, Arrow } from '@/components/ui/Organic';

export default function EveningBanner({ onOpenBooking }) {
  return (
    <section className="relative w-full bg-cocoa overflow-hidden">
      {/* Ảnh nền phủ rộng toàn cảnh (panoramic) siêu nét */}
      <div className="absolute inset-0">
        <Image
          src="/mockup-assets/evening-cozy-sharp.jpg"
          alt="Buổi tối xem phim ấm cúng tại 4Chan Homestay"
          fill
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
        {/* Lớp gradient chuyển màu tự nhiên: tối ấm bên trái để nổi bật chữ, mở rộng sang phải */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#26160d]/92 via-[#26160d]/50 to-[#26160d]/35" />
      </div>

      <div className="absolute -left-16 bottom-8 w-56 h-56 rounded-full bg-[#E8A383]/20 blur-3xl pointer-events-none" />

      {/* Sóng trên & dưới nối mượt vào 2 section liền kề */}
      <WaveDivider className="-top-[2px] z-10" flip height={80} periods={1} layers={[{ color: '#FBF6EF', base: 46, amp: 18, phase: -Math.PI / 2 }]} />
      <WaveDivider className="-bottom-[2px] z-10" height={80} periods={1} layers={[{ color: '#2A1B13', base: 46, amp: 18, phase: -Math.PI / 2 }]} />

      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 min-h-[380px] lg:min-h-[440px] py-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div data-reveal="banner-left" className="text-[#FBEFE4] max-w-lg">
          <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.15] drop-shadow-sm">
            Có những buổi tối
            <br />
            chẳng cần đi đâu cả.
          </h2>
          <div className="mt-4 space-y-1.5 text-[15px] sm:text-[16px] text-[#F1DCCB]/95 font-light leading-relaxed">
            {eveningBannerData.bullets.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </div>
        </div>

        <div data-reveal="banner-right" data-reveal-delay="200" className="flex flex-col items-start sm:items-end gap-5">
          <p className="font-script text-[40px] sm:text-[48px] leading-[1.05] text-[#F8CBB6] -rotate-6 sm:text-right drop-shadow-md">
            Stay
            <br />
            &nbsp;&nbsp;a little longer ♡
          </p>
          <button onClick={onOpenBooking} className="btn-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            {eveningBannerData.ctaText} <Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}
