const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  page: String, // e.g., /category/google-ads
  category: String, // e.g., "category", "blog"
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Seo', seoSchema);
