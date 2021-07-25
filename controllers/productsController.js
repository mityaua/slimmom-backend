const Product = require('../services/productService');
const { NotFoundError } = require('../helpers/errors');

const getProduct = async (req, res, next) => {
  try {
    const { search } = req.query;
    const products = await Product.getProducts(search);
    return res.status(200).json(products);
  } catch (error) {
    throw new NotFoundError('Product not found');
  }
};

module.exports = {
  getProduct,
};
