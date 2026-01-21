
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/life', changefreq: 'weekly', priority: 0.8 },
  { url: '/reviews', changefreq: 'weekly', priority: 0.8 },
  { url: '/gallery', changefreq: 'weekly', priority: 0.8 },
  { url: '/inside-renaissance', changefreq: 'weekly', priority: 0.8 },
  { url: '/admission', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 }
];

const stream = new SitemapStream({ hostname: 'https://renaissancepreschool.in' });

streamToPromise(stream).then(data => {
    const path = resolve(__dirname, '../public/sitemap.xml');
    createWriteStream(path).write(data);
    console.log(`Sitemap created at ${path}`);
}).catch(console.error);

links.forEach(link => stream.write(link));
stream.end();
