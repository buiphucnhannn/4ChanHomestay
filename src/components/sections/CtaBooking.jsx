'use client';

import { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { siteConfig } from '@/data/content';

export default function CtaBooking() {
  const [sent, setSent] = useState(false);

  return (
    <section id="dat-phong" className="relative overflow-hidden bg-amber-500 py-20">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
      <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-black/10" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Đặt phòng"
            title="Giữ phòng chỉ với 30 giây"
            desc={`Để lại SĐT, tụi mình gọi xác nhận trong 15 phút (7:00–22:00). Hoặc gọi luôn ${siteConfig.phone} để giữ phòng gấp.`}
          />
          <ul className="mt-6 space-y-2 text-sm font-semibold text-white">
            <li>✓ Không cần cọc với booking trong tuần</li>
            <li>✓ Hủy miễn phí trước 48h</li>
            <li>✓ Giảm 10% khi ở từ 3 đêm</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <p className="text-5xl">🎉</p>
              <h3 className="mt-4 text-xl font-extrabold">Đã nhận thông tin!</h3>
              <p className="mt-2 text-sm text-stone-600">
                Tụi mình sẽ gọi xác nhận trong 15 phút tới. Check điện thoại nha!
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-bold text-amber-600 hover:underline"
              >
                Đặt thêm phòng khác
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase text-stone-500">Họ tên</span>
                  <input required placeholder="Nguyễn Văn A" className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-amber-500" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase text-stone-500">Số điện thoại</span>
                  <input required placeholder="09xx xxx xxx" className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-amber-500" />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase text-stone-500">Ngày đến</span>
                  <input required type="date" className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-amber-500" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase text-stone-500">Loại phòng</span>
                  <select className="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-amber-500">
                    <option>Phòng Đôi View Núi</option>
                    <option>Bungalow Gia Đình</option>
                    <option>Dorm Chill Lưng Đồi</option>
                  </select>
                </label>
              </div>
              <button className="w-full rounded-xl bg-stone-900 py-4 text-sm font-bold text-white transition hover:bg-stone-800 active:scale-[0.99]">
                Giữ chỗ ngay — không cần cọc →
              </button>
              <p className="text-center text-xs text-stone-500">
                Bấm đặt là đồng ý để home gọi xác nhận. Không spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
