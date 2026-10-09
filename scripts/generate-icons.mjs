// Generate toàn bộ icon PNG + favicon.ico + og-cover từ file SVG gốc.
// Chạy lại sau khi đổi logo:  node scripts/generate-icons.mjs
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
mkdirSync(pub, { recursive: true });

const ICON_SVG = join(pub, 'icon.svg');

// 1. PNG các size chuẩn
const pngSizes = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['android-chrome-192x192.png', 192],
  ['android-chrome-512x512.png', 512],
  ['icon-512.png', 512],
];

for (const [file, size] of pngSizes) {
  await sharp(ICON_SVG, { density: 512 })
    .resize(size, size)
    .png()
    .toFile(join(pub, file));
  console.log('✓', file);
}

// 2. favicon.ico (multi-size: 16 + 32 + 48) — mỗi frame là 1 PNG nguyên
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + 16 * count;
  const parts = [header];

  pngBuffers.forEach(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    parts.push(entry);
    entries.push(data);
    offset += data.length;
  });

  return Buffer.concat([...parts, ...entries]);
}

const icoFrames = [];
for (const size of [16, 32, 48]) {
  const data = await sharp(ICON_SVG, { density: 512 }).resize(size, size).png().toBuffer();
  icoFrames.push({ size, data });
}
writeFileSync(join(pub, 'favicon.ico'), buildIco(icoFrames));
console.log('✓ favicon.ico (16/32/48)');

// 3. OG cover 1200x630
await sharp(join(pub, 'og-cover.svg'), { density: 200 })
  .resize(1200, 630)
  .png()
  .toFile(join(pub, 'og-cover.png'));
console.log('✓ og-cover.png');

console.log('\nXong. Check thư mục public/');
