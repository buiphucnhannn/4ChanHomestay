import { Playfair_Display, Caveat, Be_Vietnam_Pro, Quicksand } from 'next/font/google';
import './globals.css';
import ScrollEffects from '@/components/layout/ScrollEffects';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-script',
  display: 'swap',
});

const beVietnam = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

const quicksand = Quicksand({
  weight: ['600', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-quicksand',
  display: 'swap',
});

const SITE_URL = 'https://4chanhomestay.vn';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: '4Chan Homestay Hà Nội | Có những khoảng thời gian đáng giá',
  description:
    '4Chan Homestay Hà Nội — Hệ thống homestay ấm cúng, riêng tư tại Khâm Thiên, Thanh Xuân, Phúc Đồng (Long Biên). Máy chiếu lớn, ban công thoáng, tự check-in tiện lợi.',
  keywords: ['4chan homestay', 'homestay ha noi', 'homestay kham thien', 'homestay thanh xuan', 'homestay long bien', 'dat phong homestay'],
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport = {
  themeColor: '#FBF6EF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${caveat.variable} ${beVietnam.variable} ${quicksand.variable}`}>
      <body className="font-sans antialiased text-ink bg-cream selection:bg-[#E8C2B2] selection:text-[#2D2622]">
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}

