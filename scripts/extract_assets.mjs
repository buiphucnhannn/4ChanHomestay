import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const userDir = 'C:/Users/buiph/.gemini/antigravity-ide/brain/c9678ec0-3efd-4105-b77e-fa7ba9413c86/.user_uploaded/';
const outDir = 'public/mockup-assets/';
fs.mkdirSync(outDir, { recursive: true });

async function extract() {
  const file1 = path.join(userDir, 'media_1791427701142.jpg'); // Hero + Moment (1024x632)
  const file2 = path.join(userDir, 'media_1791427707719.jpg'); // Rooms + Pricing (1024x618)
  const file3 = path.join(userDir, 'media_1791427713740.png'); // Experience + Mood (1024x460)
  const file4 = path.join(userDir, 'media_1791427720322.jpg'); // Locations + Banner + Footer (1024x651)

  // 1. Hero room image (full photo section without the top navbar, y: 55 to 420)
  await sharp(file1)
    .extract({ left: 435, top: 52, width: 589, height: 370 })
    .toFile(path.join(outDir, 'hero-room-clean.jpg'));

  // Hero couple avatars
  await sharp(file1)
    .extract({ left: 95, top: 388, width: 95, height: 32 })
    .toFile(path.join(outDir, 'hero-avatars.jpg'));

  // 2. The 4Chan Moment arch photo (clean arch)
  await sharp(file1)
    .extract({ left: 0, top: 445, width: 330, height: 185 })
    .toFile(path.join(outDir, 'moment-arch.jpg'));

  // 3. Room 501 main showcase photo
  await sharp(file2)
    .extract({ left: 140, top: 110, width: 485, height: 232 })
    .toFile(path.join(outDir, 'room-501-showcase.jpg'));

  // Room 501 polaroid
  await sharp(file2)
    .extract({ left: 885, top: 28, width: 120, height: 135 })
    .toFile(path.join(outDir, 'room-501-polaroid.jpg'));

  // 5 Thumbnails for Room 501
  await sharp(file2)
    .extract({ left: 194, top: 350, width: 78, height: 50 })
    .toFile(path.join(outDir, 'thumb-1.jpg'));
  await sharp(file2)
    .extract({ left: 280, top: 350, width: 78, height: 50 })
    .toFile(path.join(outDir, 'thumb-2.jpg'));
  await sharp(file2)
    .extract({ left: 367, top: 350, width: 78, height: 50 })
    .toFile(path.join(outDir, 'thumb-3.jpg'));
  await sharp(file2)
    .extract({ left: 454, top: 350, width: 78, height: 50 })
    .toFile(path.join(outDir, 'thumb-4.jpg'));
  await sharp(file2)
    .extract({ left: 540, top: 350, width: 50, height: 50 })
    .toFile(path.join(outDir, 'thumb-5.jpg'));

  // Botanical leaf decoration
  await sharp(file2)
    .extract({ left: 18, top: 492, width: 150, height: 120 })
    .toFile(path.join(outDir, 'botanical-branch.jpg'));

  // 4 Experiences arch photos
  await sharp(file3)
    .extract({ left: 300, top: 40, width: 165, height: 95 })
    .toFile(path.join(outDir, 'exp-photo-1.png'));
  await sharp(file3)
    .extract({ left: 472, top: 40, width: 165, height: 95 })
    .toFile(path.join(outDir, 'exp-photo-2.png'));
  await sharp(file3)
    .extract({ left: 642, top: 40, width: 165, height: 95 })
    .toFile(path.join(outDir, 'exp-photo-3.png'));
  await sharp(file3)
    .extract({ left: 812, top: 40, width: 165, height: 95 })
    .toFile(path.join(outDir, 'exp-photo-4.png'));

  // 4 Mood photos
  await sharp(file3)
    .extract({ left: 46, top: 275, width: 220, height: 110 })
    .toFile(path.join(outDir, 'mood-photo-1.png'));
  await sharp(file3)
    .extract({ left: 278, top: 275, width: 220, height: 110 })
    .toFile(path.join(outDir, 'mood-photo-2.png'));
  await sharp(file3)
    .extract({ left: 508, top: 275, width: 220, height: 110 })
    .toFile(path.join(outDir, 'mood-photo-3.png'));
  await sharp(file3)
    .extract({ left: 738, top: 275, width: 220, height: 110 })
    .toFile(path.join(outDir, 'mood-photo-4.png'));

  // 3 branch facade photos
  await sharp(file4)
    .extract({ left: 34, top: 76, width: 88, height: 90 })
    .toFile(path.join(outDir, 'branch-khamthien.jpg'));
  await sharp(file4)
    .extract({ left: 242, top: 76, width: 88, height: 90 })
    .toFile(path.join(outDir, 'branch-thanhxuan.jpg'));
  await sharp(file4)
    .extract({ left: 444, top: 76, width: 88, height: 90 })
    .toFile(path.join(outDir, 'branch-phucdong.jpg'));

  // Hanoi map illustration
  await sharp(file4)
    .extract({ left: 635, top: 20, width: 388, height: 175 })
    .toFile(path.join(outDir, 'map-hanoi.jpg'));

  // Evening full-width banner
  await sharp(file4)
    .extract({ left: 0, top: 202, width: 1024, height: 236 })
    .toFile(path.join(outDir, 'evening-banner-bg.jpg'));

  console.log('Precision assets extracted successfully!');
}

extract();
