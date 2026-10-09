# 4Chan Homestay — Landing Page

Landing page homestay làm bằng **Next.js (App Router) + TailwindCSS v4 + JS thuần**.

## Chạy project

```bash
npm install
npm run dev
# mở http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Cấu trúc thư mục (chia component chuyên nghiệp)

```
src/
  app/
    layout.js      # metadata + font + wrapper html
    page.js        # ghép các section lại
    globals.css    # tailwind + theme + style chung
  components/
    layout/
      Navbar.jsx   # menu desktop/mobile, hiệu ứng scroll
      Footer.jsx
    sections/
      Hero.jsx         # hero + form check giá
      Stats.jsx        # số liệu nổi bật
      About.jsx        # giới thiệu
      Rooms.jsx        # list phòng
      Amenities.jsx    # tiện ích
      Gallery.jsx      # thư viện ảnh
      Testimonials.jsx # đánh giá
      CtaBooking.jsx   # form giữ chỗ
      Contact.jsx      # liên hệ + maps
    ui/
      Button.jsx           # button tái dùng (primary/outline/...)
      SectionHeading.jsx   # tiêu đề section tái dùng
      RoomCard.jsx         # card phòng
  data/
    content.js     # toàn bộ text/ảnh/giá tập trung ở đây
  lib/
    utils.js       # hàm cn() nối class
public/           # ảnh tĩnh, favicon
  favicon.ico              # icon chính (multi-size 16/32/48) — dùng làm icon web
  favicon-16x16.png / favicon-32x32.png
  apple-touch-icon.png     # iOS 180x180
  android-chrome-192x192.png / android-chrome-512x512.png
  icon.svg                 # logo vector gốc → source generate toàn bộ icon
  logo.svg                 # logo dùng trong web
  og-cover.png/.svg        # ảnh share Facebook/Zalo (1200x630)
  site.webmanifest         # PWA manifest
  robots.txt / sitemap.xml # SEO
  browserconfig.xml        # tile Windows
  images/                  # ảnh phòng/banner của bạn để ở đây
scripts/
  generate-icons.mjs  # đổi icon.svg rồi chạy `npm run icons` để regen
```

Muốn sửa nội dung (giá, SĐT, phòng...) chỉ cần sửa `src/data/content.js`, khỏi mò vào UI.

## Stack

- Next.js 16, React 19
- TailwindCSS 4.3 (dùng `@import "tailwindcss"`, theme trong CSS)
- JS thuần, không TypeScript
- next/image tối ưu ảnh Unsplash

## Tùy biến nhanh

- Đổi màu chủ đạo: sửa `--color-brand-*` trong `globals.css` hoặc class `amber-*`.
- Đổi SĐT/email/địa chỉ: `siteConfig` trong `content.js`.
- Thêm section mới: tạo file trong `sections/`, import vào `app/page.js`, thêm link vào `navLinks`.
