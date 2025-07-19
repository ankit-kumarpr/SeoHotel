const Seo = require('../models/SeoData');
const { generateSitemapXml } = require('../utils/sitemapGenerator');

const baseUrl = 'https://yourdomain.com';

// Sitemap index like WordPress
exports.getSitemapIndex = async (req, res) => {
  const categories = await Seo.distinct('category');

  const sitemapIndex = categories.map(cat => `
    <sitemap>
      <loc>${baseUrl}/seo/meta/sitemap-${cat}.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  `).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndex}
</sitemapindex>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
};

// Category specific sitemap
exports.getCategorySitemap = async (req, res) => {
  const { category } = req.params;

  const pages = await Seo.find({ category });
  if (!pages.length) {
    return res.status(404).send('No pages found');
  }

  const xml = generateSitemapXml(baseUrl, pages);
  res.header('Content-Type', 'application/xml');
  res.send(xml);
};

// Add or update SEO content
exports.addOrUpdateSeo = async (req, res) => {
  const { page, category, metaTitle, metaDescription, metaKeywords } = req.body;

  const updated = await Seo.findOneAndUpdate(
    { page },
    { category, metaTitle, metaDescription, metaKeywords },
    { upsert: true, new: true }
  );

  res.status(200).json({ message: 'SEO saved/updated successfully', data: updated });
};

// Get SEO by page
exports.getSeoByPage = async (req, res) => {
   try {
        const page = req.query.page;
        const seo = await Seo.findOne({ page: page });
        if (!seo) {
            return res.status(404).json({ message: "Page not found" });
        }
        res.json({ message: "SEO data found", data: seo });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// all page seo 
exports.getAllSeo = async (req, res) => {
  try {
    const seoData = await Seo.find();
    res.json({ message: "All SEO data fetched", data: seoData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};