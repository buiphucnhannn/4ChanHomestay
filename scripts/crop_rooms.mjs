import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const roomMap = {
  '201': '802627369_122130244922847678_2701709368725885731_n.jpg',
  '202': '805755764_122130244976847678_1306226328994491356_n.jpg',
  '401': '805959523_122130244946847678_4694316835987559231_n.jpg',
  '402': '797745255_122130244610847678_8852938679973283193_n.jpg',
  '501': '805512060_122130244616847678_7631472108597700783_n.jpg',
  '502': '805980180_122130244604847678_3789069739448545059_n.jpg',
  '601': '805700078_122130244724847678_8667872260084056167_n.jpg',
  '602': '805958994_122130244736847678_7756109870596244387_n.jpg',
  '701': '805854774_122130244730847678_7959739152009390753_n.jpg',
};

const outDir = 'public/mockup-assets/rooms';
fs.mkdirSync(outDir, { recursive: true });

async function cropAllRooms() {
  for (const [room, file] of Object.entries(roomMap)) {
    const src = path.join('public/images', file);
    try {
      // Clean extract of main bed area
      await sharp(src)
        .extract({ left: 55, top: 290, width: 780, height: 630 })
        .toFile(path.join(outDir, `room-${room}.jpg`));

      // Extra sub-crops for thumbnails
      await sharp(src)
        .extract({ left: 705, top: 200, width: 370, height: 240 })
        .toFile(path.join(outDir, `room-${room}-thumb1.jpg`));
      await sharp(src)
        .extract({ left: 705, top: 410, width: 370, height: 240 })
        .toFile(path.join(outDir, `room-${room}-thumb2.jpg`));
      await sharp(src)
        .extract({ left: 705, top: 605, width: 370, height: 240 })
        .toFile(path.join(outDir, `room-${room}-thumb3.jpg`));

      console.log(`✓ Cropped room ${room}`);
    } catch (e) {
      console.error(`Error cropping room ${room}:`, e.message);
    }
  }
}

cropAllRooms();
