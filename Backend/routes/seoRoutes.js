const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seoController');

router.get('/sitemap.xml', seoController.getSitemapIndex);
router.get('/sitemap-:category.xml', seoController.getCategorySitemap);
router.post('/add', seoController.addOrUpdateSeo);
router.get('/get', seoController.getSeoByPage);
router.get('/getallseo', seoController.getAllSeo);

module.exports = router;
