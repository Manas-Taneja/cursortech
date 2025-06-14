const fs = require('fs');
const path = require('path');

const domain = 'https://cursortech.vercel.app';

const pages = [
  '', // homepage
  'crosshair/naruto-default',
  'crosshair/yoru-valorant',
  // ... add all your slugs or read from `crosshairs.js`
];

const urls = pages.map((slug) => `
  <url>
    <loc>${domain}/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${slug ? '0.8' : '1.0'}</priority>
  </url>`).join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml.trim());
console.log('✅ sitemap.xml generated.');
