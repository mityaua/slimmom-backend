const Products = require('../../models/productModel');

const notAllowedProductsBloodType = async bloodType => {
  let blood = [null, false, false, false, false];
  blood[bloodType] = true;
  const products = Products.find({
    groupBloodNotAllowed: { $all: [blood] },
  });
  return products;
};

module.exports = { notAllowedProductsBloodType };
