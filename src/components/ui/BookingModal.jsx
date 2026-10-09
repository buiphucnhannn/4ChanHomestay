'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { branchesList, roomsList, pricingPackages, siteConfig } from '@/data/content';

export default function BookingModal({ isOpen, onClose, defaultRoomId = '501' }) {
  const [branch, setBranch] = useState(branchesList[0].name);
  const [roomId, setRoomId] = useState(defaultRoomId);
  const [pkg, setPkg] = useState(pricingPackages[0].duration);
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  // Khoá cuộn trang phía sau + đóng bằng phím Esc khi popup đang mở
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, bodyOverflow: document.body.style.overflow, paddingRight: document.body.style.paddingRight };
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbar}px`;
    const onKey = (e) => e.key === 'Escape' && closeRef.current();
    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prev.overflow;
      document.body.style.overflow = prev.bodyOverflow;
      document.body.style.paddingRight = prev.paddingRight;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleZaloChat = () => {
    const text = encodeURIComponent(
      `Chào 4Chan Homestay, mình muốn đặt phòng ${roomId} tại cơ sở ${branch}, gói ${pkg}. SĐT: ${phone || 'Chưa điền'}`
    );
    window.open(`https://zalo.me/${siteConfig.zalo}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in overscroll-contain touch-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[calc(100svh-2rem)] overflow-y-auto overscroll-contain scrollbar-none touch-pan-y bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EADBCE]"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#52443A] flex items-center justify-center border border-[#EADBCE] transition-colors cursor-pointer text-sm"
          aria-label="Close modal"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-6">
              <Image src="/logo-mark.png" alt="4Chan Homestay" width={56} height={56} className="w-14 h-14 object-contain mx-auto mb-2" />
              <span className="text-[11px] font-semibold tracking-widest text-[#CF6847] uppercase block mb-1">
                4CHAN HOMESTAY • ĐẶT PHÒNG NHANH
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#27201B]">
                Đặt phòng nghỉ ngơi
              </h3>
              <p className="text-xs sm:text-sm text-[#706257] mt-1 font-light">
                Hỗ trợ 24/7 qua Hotline/Zalo: <strong className="text-[#CF6847] font-semibold">{siteConfig.bookingPhone}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Branch */}
              <div>
                <label className="block text-xs font-semibold text-[#483B32] mb-1.5">
                  Chọn cơ sở
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {branchesList.map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setBranch(b.name)}
                      className={`py-2.5 px-1 rounded-xl text-[11.5px] sm:text-xs font-medium whitespace-nowrap border text-center transition-all cursor-pointer ${
                        branch === b.name
                          ? 'bg-[#CF6847] text-white border-[#CF6847]'
                          : 'bg-white text-[#4A3D34] border-[#EADBCE] hover:border-[#CF6847]'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Room */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#483B32] mb-1.5">
                    Chọn phòng
                  </label>
                  <select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#EADBCE] text-xs sm:text-sm text-[#382E27] focus:outline-none focus:border-[#CF6847]"
                  >
                    {roomsList.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#483B32] mb-1.5">
                    Gói thời gian
                  </label>
                  <select
                    value={pkg}
                    onChange={(e) => setPkg(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#EADBCE] text-xs sm:text-sm text-[#382E27] focus:outline-none focus:border-[#CF6847]"
                  >
                    {pricingPackages.map((p, idx) => (
                      <option key={idx} value={p.duration}>
                        {p.duration} ({p.windowPrice})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-xs font-semibold text-[#483B32] mb-1.5">
                  Số điện thoại của bạn
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#EADBCE] text-xs sm:text-sm text-[#382E27] focus:outline-none focus:border-[#CF6847]"
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-semibold text-[#483B32] mb-1.5">
                  Ghi chú hoặc yêu cầu thêm (tùy chọn)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Cần chuẩn bị máy chiếu, hoa tươi..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="block w-full min-h-[46px] max-h-[220px] py-2.5 px-3 rounded-xl bg-white border border-[#EADBCE] text-xs sm:text-sm text-[#382E27] leading-relaxed resize-y overflow-y-auto overscroll-contain scrollbar-none focus:outline-none focus:border-[#CF6847]"
                />
              </div>

              {/* Actions */}
              <div className="pt-2">

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-full bg-[#CF6847] hover:bg-[#B85435] text-white text-xs sm:text-sm font-medium shadow-md transition-all cursor-pointer"
                >
                  Gửi yêu cầu giữ phòng
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#8E9F80]/20 text-[#49613B] flex items-center justify-center mx-auto mb-4 text-2xl">
              ✓
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2A211B] mb-2">
              Đã nhận yêu cầu!
            </h3>
            <p className="text-sm text-[#6C5D53] font-light max-w-sm mx-auto mb-6">
              Nhân viên 4Chan Homestay sẽ liên hệ qua số <strong>{phone}</strong> trong vòng 5 phút để xác nhận phòng cho bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleZaloChat}
                className="py-2.5 px-6 rounded-full bg-[#0068FF] text-white text-xs sm:text-sm font-medium"
              >
                Nhắn tin Zalo ngay
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="py-2.5 px-6 rounded-full bg-[#EADBCE] text-[#4A3D34] text-xs sm:text-sm font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
