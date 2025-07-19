// 

exports.generateSitemapXml = (baseUrl, pages) => {
  const urls = pages.map(page => `
    <url>
      <loc>${baseUrl}${page.page}</loc>
      <lastmod>${new Date(page.createdAt).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  `);

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n')}
  </urlset>`;
};
