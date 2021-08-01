const Product = require('../models/productModel');

const getProducts = async query => {
  const products = await Product.find({
    'title.ru': { $regex: `${query}`, $options: 'i' },
  });
  return products;
};

module.exports = {
  getProducts,
};
