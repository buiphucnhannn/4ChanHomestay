// Dựng sẵn mặt nạ ảnh hero thành PNG tĩnh (public/masks/hero-feather.png).
// Trước đây mặt nạ là SVG có feGaussianBlur, trình duyệt phải tính lại khi cuộn → bị vỡ ô vuông.
// Chạy: node scripts/generate-hero-mask.cjs
const sharp = require('sharp');
const fs = require('fs');

const W = 1000;
const H = 1000;
const amp = 3.6; // biên độ sóng (% chiều rộng)
const periods = 1.5;
const inset = 7; // vị trí mép trái (% chiều rộng)
const blur = 0.9; // độ mờ mép (% kích thước)
const bottomFade = 5; // % chiều cao mờ dần ở đáy

const pts = [];
for (let i = 0; i <= 120; i++) {
  const t = i / 120; // 0 = đáy, 1 = đỉnh
  const x = inset + amp * Math.sin(2 * Math.PI * periods * t + Math.PI / 2);
  pts.push(`${((x * W) / 100).toFixed(1)},${(((110 - t * 120) * H) / 100).toFixed(1)}`);
}
const d = `M${1.15 * W},${-0.1 * H} L${1.15 * W},${1.1 * H} L${pts.join(' L')} Z`;
const fadeStart = (100 - bottomFade) / 100;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0" stop-color="#fff"/><stop offset="${fadeStart}" stop-color="#fff"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${(blur * W) / 100}"/></filter>
  </defs>
  <path d="${d}" fill="url(#g)" filter="url(#b)"/>
</svg>`;

fs.mkdirSync('public/masks', { recursive: true });
sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile('public/masks/hero-feather.png')
  .then((i) => console.log('public/masks/hero-feather.png', i.width + 'x' + i.height, i.size + 'B'));
