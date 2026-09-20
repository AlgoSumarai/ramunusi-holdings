import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App, routes, getPageMeta } = await server.ssrLoadModule('/src/App.jsx');
  const { company } = await server.ssrLoadModule('/src/config/company.js');
  const template = await readFile('dist/index.html','utf8');
  const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
  for (const path of [...routes, '/404']) {
    const meta = getPageMeta(path);
    const url = company.website ? `${company.website.replace(/\/$/,'')}${path}` : '';
    const data = { '@context':'https://schema.org', '@type':'Electrician', name:company.name, description:meta.description, ...(company.phone && {telephone:company.phone}), ...(company.email && {email:company.email}), ...(company.serviceArea && {areaServed:company.serviceArea}), ...(company.website && {url:company.website}) };
    const seo = `<meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:type" content="website"/><meta property="og:site_name" content="Ramunusi Holdings"/>${url ? `<link rel="canonical" href="${escape(url)}"/><meta property="og:url" content="${escape(url)}"/><meta property="og:image" content="${escape(company.website)}/logo.png"/>` : ''}${path === '/404' ? '<meta name="robots" content="noindex"/>' : ''}<script type="application/ld+json">${JSON.stringify(data).replaceAll('<','\\u003c')}</script>`;
    const html = template.replace(/<title>.*?<\/title>/,`<title>${escape(meta.title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${escape(meta.description)}"/>`).replace('<!--seo-->',seo).replace('<!--app-->',renderToString(createElement(App,{path})));
    if (path === '/404') await writeFile('dist/404.html',html);
    else { const dir = `dist${path === '/' ? '' : path}`; await mkdir(dir,{recursive:true}); await writeFile(`${dir}/index.html`,html); if (path !== '/') await writeFile(`dist${path}.html`,html); }
  }
  await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n${company.website ? `Sitemap: ${company.website}/sitemap.xml\n` : ''}`);
  if (company.website) await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(path=>`<url><loc>${escape(company.website + path)}</loc></url>`).join('')}</urlset>`);
  console.log(`Prerendered ${routes.length} pages and a 404 page.`);
} finally { await server.close(); }
