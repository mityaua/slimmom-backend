const Product = require('../../models/productModel');
const { NotFoundError } = require('../errors');

const checkEatenProduct = async productId => {
  try {
    const eatenProduct = await Product.findById(productId);
    if (!eatenProduct) {
      throw new NotFoundError('Product not found');
    }
    return eatenProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = { checkEatenProduct };
