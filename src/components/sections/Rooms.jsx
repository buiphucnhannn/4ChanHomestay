'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { roomsList } from '@/data/content';
import { Branch, Blossom, Arrow, DecorRow } from '@/components/ui/Organic';

/*
 * Ảnh chuyển mượt: ảnh mới được đặt chồng lên ảnh cũ, chỉ hiện dần khi đã tải xong
 * (không bị nháy trắng), sau đó lớp ảnh cũ mới được gỡ bỏ.
 */
function CrossfadeImage({ src, alt, sizes }) {
  const [layers, setLayers] = useState([{ src, ready: true }]);
  const [lastSrc, setLastSrc] = useState(src);

  // Cập nhật lớp ảnh ngay trong lúc render khi src đổi (mẫu "state theo prop trước đó" của React)
  if (src !== lastSrc) {
    setLastSrc(src);
    setLayers((ls) => [...ls.filter((l) => l.src !== src).slice(-1), { src, ready: false }]);
  }

  const handleLoad = (loadedSrc) => {
    setLayers((ls) =>
      ls.some((l) => l.src === loadedSrc && !l.ready) ? ls.map((l) => (l.src === loadedSrc ? { ...l, ready: true } : l)) : ls
    );
    setTimeout(() => {
      setLayers((ls) => {
        const lastReady = ls.findLastIndex((l) => l.ready);
        return lastReady > 0 ? ls.slice(lastReady) : ls;
      });
    }, 750);
  };

  // Mốc an toàn: nếu trình duyệt không bắn sự kiện load thì vẫn hiện ảnh sau 1.2s
  const pending = layers.find((l) => !l.ready)?.src;
  useEffect(() => {
    if (!pending) return;
    const t = setTimeout(() => handleLoad(pending), 1200);
    return () => clearTimeout(t);
  }, [pending]);

  return layers.map((l) => (
    <Image
      key={l.src}
      src={l.src}
      alt={alt}
      fill
      sizes={sizes}
      ref={(el) => {
        if (!el || l.ready) return;
        // Ảnh có sẵn trong cache → hiện ngay; chưa có → nghe sự kiện load gốc của trình duyệt
        if (el.complete && el.naturalWidth > 0) handleLoad(l.src);
        else el.addEventListener('load', () => handleLoad(l.src), { once: true });
      }}
      className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
        l.ready ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
      }`}
    />
  ));
}

export default function Rooms({ onOpenBooking }) {
  const [activeRoomId, setActiveRoomId] = useState('501');
  const [photoIdx, setPhotoIdx] = useState(0);
  const room = roomsList.find((r) => r.id === activeRoomId) || roomsList[0];
  const gallery = room.thumbs;

  const selectRoom = (id) => {
    setActiveRoomId(id);
    setPhotoIdx(0);
  };
  const step = (dir) => setPhotoIdx((i) => (i + dir + gallery.length) % gallery.length);

  return (
    <section id="kham-pha-phong" className="relative w-full pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      <Branch className="hidden lg:block absolute -left-4 top-2 w-20 opacity-80 animate-sway" leaves={8} />
      <Branch className="hidden 2xl:block absolute -right-3 bottom-24 w-16 opacity-80 animate-sway" leaves={7} flowers={2} flip />
      <Blossom className="hidden 2xl:block absolute right-[1.8%] top-[46%] w-6 opacity-70" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Tiêu đề + mô tả cùng một hàng để tiết kiệm chiều cao */}
        <div data-reveal="rooms-head" className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-8 mb-6 lg:mb-8">
          <h2 className="font-serif text-[34px] sm:text-[40px] leading-[1.05] text-ink shrink-0">
            Khám phá
            <br />
            <span className="pl-10 sm:pl-12">các phòng</span>
          </h2>
          <p className="text-[14px] text-muted leading-relaxed sm:pb-1.5 sm:text-right">
            Mỗi căn phòng là một cảm xúc khác nhau.
            <br className="hidden sm:block" /> Bạn thích phong cách nào?
          </p>
        </div>

        {/* Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-[70px_minmax(0,1fr)_340px] xl:grid-cols-[72px_minmax(0,1fr)_360px] gap-5 lg:gap-6">
          {/* Danh sách phòng */}
          <div data-reveal="rooms-list" data-reveal-delay="120" className="card-soft rounded-[22px] p-1.5 flex lg:flex-col gap-1 overflow-x-auto scrollbar-none">
            {roomsList.map((r) => {
              const active = r.id === activeRoomId;
              return (
                <button
                  key={r.id}
                  onClick={() => selectRoom(r.id)}
                  className={`shrink-0 lg:flex-1 min-w-12 px-3 py-1 rounded-[14px] text-[13px] font-semibold transition-all duration-300 cursor-pointer ${
                    active ? 'bg-terracotta text-white shadow-md' : 'text-[#4A3E36] hover:bg-warm'
                  }`}
                >
                  {r.id}
                </button>
              );
            })}
          </div>

          {/* Ảnh chính + thumbnail */}
          <div className="flex flex-col gap-3 min-w-0">
            <div data-reveal="rooms-photo" data-reveal-delay="200" className="relative w-full aspect-[16/9] lg:aspect-auto lg:h-[clamp(280px,min(27vw,calc(100svh_-_360px)),400px)] rounded-[26px] overflow-hidden ring-4 ring-white/80 shadow-[0_20px_40px_-24px_rgba(90,58,40,0.6)] bg-sand">
              <CrossfadeImage src={gallery[photoIdx]} alt={room.name} sizes="(min-width:1024px) 60vw, 100vw" />
              <span className="absolute z-10 left-4 top-4 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-[11.5px] font-semibold text-ink">
                Phòng {room.type.toLowerCase()}
              </span>
            </div>
            <div data-reveal="rooms-list" data-reveal-delay="380" className="flex items-center gap-3">
              <button
                onClick={() => step(-1)}
                aria-label="Ảnh trước"
                className="shrink-0 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-ink hover:text-terracotta cursor-pointer"
              >
                <Arrow className="w-4 h-4 rotate-180" />
              </button>
              <div key={room.id} className="flex-1 grid grid-cols-4 gap-2.5 animate-fade-in">
                {gallery.map((src, idx) => (
                  <button
                    key={src}
                    onClick={() => setPhotoIdx(idx)}
                    aria-label={`Ảnh ${idx + 1}`}
                    className={`relative h-[52px] xl:h-[56px] rounded-[14px] overflow-hidden cursor-pointer transition-all duration-300 ${
                      photoIdx === idx ? 'ring-2 ring-terracotta ring-offset-2 ring-offset-warm' : 'opacity-65 hover:opacity-100'
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="160px" className="object-cover" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => step(1)}
                aria-label="Ảnh sau"
                className="shrink-0 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-ink hover:text-terracotta cursor-pointer"
              >
                <Arrow className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thông tin phòng — polaroid nằm ở khoảng trống phía trên, căn đáy theo hàng thumbnail */}
          <div data-reveal="rooms-info" data-reveal-delay="300" className="flex">
          <div key={room.id} className="w-full flex flex-col justify-end animate-fade-in">
            <div className="hidden lg:flex items-end justify-end gap-2 mb-auto pr-2 pt-1">
              <div className="relative w-[84px] h-[96px] bg-white p-1.5 pb-4 rotate-[7deg] shadow-[0_14px_30px_-14px_rgba(90,58,40,0.55)]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={room.thumbs[2]} alt={`Góc nhỏ ${room.name}`} fill sizes="84px" className="object-cover" />
                </div>
              </div>
              <p className="font-script text-[19px] leading-none text-muted -rotate-6 mb-1">
                Cozy
                <br />
                Room ♡
              </p>
            </div>
            <h3 className="font-serif text-[28px] font-semibold text-ink tracking-tight mb-2.5">{room.name}</h3>
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {room.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-[11.5px] font-medium bg-sand text-[#5A463A]">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-[14px] text-muted leading-relaxed mb-4">{room.desc}</p>

            <div className="card-soft grid grid-cols-2 rounded-[20px] divide-x divide-line mb-4">
              {[
                ['Giá 3 giờ', room.price3h, '/ 3h'],
                ['Qua đêm', room.priceNight, '21h–9h'],
              ].map(([label, price, unit]) => (
                <div key={label} className="py-2.5 text-center">
                  <p className="text-[11.5px] text-muted mb-0.5">{label}</p>
                  <p className="font-serif text-[22px] font-semibold text-terracotta leading-tight">
                    {price}
                    <span className="ml-1 font-sans text-[11px] font-normal text-muted">{unit}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href="#bang-gia" className="btn-primary !bg-terracotta-soft hover:!bg-terracotta !px-4">
                Xem bảng giá <Arrow />
              </a>
              <button onClick={() => onOpenBooking(room.id)} className="btn-primary !px-4">
                Đặt phòng <Arrow />
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      <DecorRow variant="a" />
    </section>
  );
}
