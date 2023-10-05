const mongoose = require('mongoose');
const shortid = require('shortid');

const productSchema = new mongoose.Schema({
  shortURL: { type: String, default: shortid.generate },
  actualURL: String,
  image: String,
  price: Number,
});

module.exports = mongoose.model('Product', productSchema);
