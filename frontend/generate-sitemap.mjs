import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const smStream = new SitemapStream({ hostname: 'https://polite-beach-0c34c961e.5.azurestaticapps.net/' });
const writeStream = createWriteStream('./public/sitemap.xml');

smStream.pipe(writeStream);

// List your React routes here
smStream.write({ url: '/', changefreq: 'monthly', priority: 1.0 });
smStream.write({ url: '/Home', changefreq: 'monthly', priority: 0.8 });
smStream.write({ url: '/Donate', changefreq: 'daily', priority: 0.6 });
smStream.write({ url: '/Contact', changefreq: 'monthly', priority: 0.5 });
smStream.write({ url: '/userDashboard', changefreq: 'daily', priority: 0.2 });

smStream.end();
console.log('sitemap.xml generated in public directory!');