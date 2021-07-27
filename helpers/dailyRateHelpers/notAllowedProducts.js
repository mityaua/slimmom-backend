const Products = require('../../models/productModel');

const notAllowedProducts = async bloodType => {
  const products = Products.find({
    groupBloodNotAllowed: { $in: [true] },
  });
  return products;
};

module.exports = { notAllowedProducts };
