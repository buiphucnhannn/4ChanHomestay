import fs from 'node:fs';

const files = fs.readdirSync('public/images').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Gallery</title>
  <style>
    body { font-family: sans-serif; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; padding: 20px; background: #faf8f5; }
    div { border: 1px solid #e2d9cf; padding: 8px; border-radius: 8px; background: white; }
    img { width: 100%; height: 200px; object-fit: cover; border-radius: 6px; }
    p { font-size: 11px; word-break: break-all; margin: 6px 0 0; color: #444; }
  </style>
</head>
<body>
  ${files.map(f => `<div><img src="images/${f}" alt="${f}"><p>${f}</p></div>`).join('')}
</body>
</html>`;

fs.writeFileSync('public/preview_images.html', html);
console.log('Done generating preview_images.html');
