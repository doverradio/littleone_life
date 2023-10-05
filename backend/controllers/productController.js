const Product = require('../models/product');

exports.getProductByShortURL = async (req, res) => {
  const product = await Product.findOne({ shortURL: req.params.shortURL });
  if(product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
};

exports.addProduct = async (req, res) => {
  const product = new Product(req.body);
  const savedProduct = await product.save();
  res.send(savedProduct);
};
