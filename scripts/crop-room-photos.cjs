// Cắt ảnh phòng từ poster gốc: 1 ảnh chính + 3 ảnh phụ. Toạ độ theo thang 1000.
const s = require('sharp');
const fs = require('fs');
const [,, outDir, sheet, overridesJson] = process.argv;
const POSTERS = {
  '201': '802627369_122130244922847678_2701709368725885731_n.jpg',
  '202': '805755764_122130244976847678_1306226328994491356_n.jpg',
  '401': '805959523_122130244946847678_4694316835987559231_n.jpg',
  '402': '797745255_122130244610847678_8852938679973283193_n.jpg',
  '501': '805512060_122130244616847678_7631472108597700783_n.jpg',
  '502': '805980180_122130244604847678_3789069739448545059_n.jpg',
  '601': '805700078_122130244724847678_8667872260084056167_n.jpg',
  '602': '805958994_122130244736847678_7756109870596244387_n.jpg',
  '702': '805854774_122130244730847678_7959739152009390753_n.jpg',
};
const DEFAULT = {
  main: [42, 248, 678, 735],
  t1: [724, 202, 958, 388],
  t2: [724, 418, 958, 586],
  t3: [724, 614, 958, 740],
};
const overrides = overridesJson ? JSON.parse(overridesJson) : {};
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const tiles = [];
  const ids = Object.keys(POSTERS);
  for (const [r, id] of ids.entries()) {
    const src = 'public/images/' + POSTERS[id];
    const { width } = await s(src).metadata();
    const k = width / 1000;
    const R = { ...DEFAULT, ...(overrides[id] || {}) };
    for (const [c, key] of ['main', 't1', 't2', 't3'].entries()) {
      const [x1, y1, x2, y2] = R[key];
      const box = { left: Math.round(x1 * k), top: Math.round(y1 * k), width: Math.round((x2 - x1) * k), height: Math.round((y2 - y1) * k) };
      const name = key === 'main' ? `room-${id}.jpg` : `room-${id}-thumb${c}.jpg`;
      await s(src).extract(box).jpeg({ quality: 88 }).toFile(`${outDir}/${name}`);
      tiles.push({ input: await s(`${outDir}/${name}`).resize(c ? 220 : 300, 200, { fit: 'contain', background: '#555' }).toBuffer(), left: c ? 300 + (c - 1) * 220 : 0, top: r * 200 });
    }
  }
  await s({ create: { width: 960, height: 200 * ids.length, channels: 3, background: '#fff' } }).composite(tiles).jpeg({ quality: 80 }).toFile(sheet);
  console.log('done');
})();
