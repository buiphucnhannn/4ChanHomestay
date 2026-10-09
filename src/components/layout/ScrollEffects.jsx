'use client';

import { useEffect } from 'react';
import { smoothScrollTo, cleanUrlHash } from '@/lib/smoothScroll';

/*
 * Gắn một lần trong layout → áp dụng cho mọi trang.
 * 1) Reveal 2 chiều: phần tử [data-reveal] hiện ra khi vào màn hình, ẩn lại khi đã ra khỏi
 *    màn hình → cuộn lên hay xuống đều thấy hiệu ứng. Độ trễ đặt bằng data-reveal-delay (ms).
 * 2) Mọi link nội trang (href="#...") cuộn mượt tới đúng vị trí đẹp nhất và không để lại # trên URL.
 */
export default function ScrollEffects() {
  useEffect(() => {
    // Hiện: phần tử vào màn hình ~8% từ dưới lên mới bắt đầu hiện → nhìn rõ hiệu ứng
    const showIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-revealed')),
      { rootMargin: '0px 0px -8% 0px' }
    );
    // Ẩn lại: chỉ khi phần tử đã ra hẳn khỏi màn hình (tránh nhấp nháy ở mép)
    const hideIO = new IntersectionObserver((entries) =>
      entries.forEach((e) => !e.isIntersecting && e.target.classList.remove('is-revealed'))
    );
    const io = {
      observe: (el) => {
        showIO.observe(el);
        hideIO.observe(el);
      },
      disconnect: () => {
        showIO.disconnect();
        hideIO.disconnect();
      },
    };

    const watch = (el) => {
      const delay = el.getAttribute('data-reveal-delay');
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
      io.observe(el);
    };
    document.querySelectorAll('[data-reveal]').forEach(watch);

    // Phần tử mới được render sau (đổi phòng, mở popup...) cũng được theo dõi
    const mo = new MutationObserver((records) => {
      records.forEach((r) =>
        r.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          if (n.matches('[data-reveal]')) watch(n);
          n.querySelectorAll?.('[data-reveal]').forEach(watch);
        })
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Cuộn mượt cho mọi link nội trang
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (!id) {
        e.preventDefault();
        return;
      }
      if (id !== 'top' && !document.getElementById(id)) return;
      e.preventDefault();
      // Chờ menu mobile đóng xong để đo vị trí chính xác
      requestAnimationFrame(() => smoothScrollTo(id));
    };
    document.addEventListener('click', onClick);

    // Mở trang kèm #... (link chia sẻ) → cuộn mượt tới đó rồi xoá #
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => (document.getElementById(id) ? smoothScrollTo(id) : cleanUrlHash()), 400);
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
