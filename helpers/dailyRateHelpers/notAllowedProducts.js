const Products = require('../../models/productModel');

const notAllowedProducts = async bloodType => {
  let blood = [null, false, false, false, false];
  blood[bloodType] = true;
  const products = Products.find({
    groupBloodNotAllowed: { $all: [blood] },
  }).limit();
  return products;
};

module.exports = { notAllowedProducts };
