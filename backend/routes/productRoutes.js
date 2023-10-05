const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/product/:shortURL', productController.getProductByShortURL);
router.post('/product', productController.addProduct);

module.exports = router;
