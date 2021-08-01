const Product = require('../services/productService');
const { NotFoundError } = require('../helpers/errors');

const getProduct = async (req, res) => {
  try {
    // const search = decodeURI(req.query.search);
    const product = await Product.getProducts(req.query.search);
    return res.status(200).json(product);
  } catch (error) {
    throw new NotFoundError('Product not found');
  }
};

module.exports = {
  getProduct,
};
