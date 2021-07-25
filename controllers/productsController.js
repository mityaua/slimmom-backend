const Product = require('../services/productService');
const { NotFoundError } = require('../helpers/errors');

const getProduct = async (req, res, next) => {
  try {
    const { search } = req.query;
    const products = await Product.getProducts(search);
    return res.status(200).json(products);
  } catch (error) {
    throw new NotFoundError('this product not found');
  }
};

// const listProductsPerDay = async (req, res, next) => {
//   const { _id } = req.user;
//   //   let { skip = 0, limit = 5, favorite } = req.query;
//   //   limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
//   //   skip = parseInt(skip);
//   try {
//     const products = await Product.listProducts(_id);
//     res.status(200).json({ products });
//   } catch (error) {
//     next(error);
//   }
// };

// const addProductPerDay = async (req, res, next) => {
//   const { _id } = req.user;
//   try {
//     const product = await Product.addProduct(req.body, _id);
//     res.status(201).json({ product, status: 'success' });
//   } catch (error) {
//     next(error);
//   }
// };

// const removeProductPerDay = async (req, res, next) => {
//   const { productId } = req.params;
//   const { _id } = req.user;
//   try {
//     const result = await Product.removeProduct(productId, _id);
//     if (result) {
//       return res.status(200).json({ message: `product ${productId} deleted` });
//     }
//     throw new NotFoundError('Not found');
//   } catch (error) {
//     next(error);
//   }
// };

// const caloriesNormalize = async (req, res, next) => {
//   const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
//   try {
//     const calories = await Product.getCalories(
//       height,
//       age,
//       currentWeight,
//       desiredWeight,
//       bloodType,
//     );
//     res.status(200).json({ calories });
//   } catch (error) {
//     next(error);
//   }
// };

// const caloriesNormalizePrivate = async (req, res, next) => {
//   //   const { _id } = req.user;
//   const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

//   try {
//     const calories = await Product.getCalories(
//       height,
//       age,
//       currentWeight,
//       desiredWeight,
//       bloodType,
//     );
//     res.status(200).json({ calories });
//   } catch (error) {
//     next(error);
//   }
// };

// const getProductByName = async (req, res, next) => {
//   const { query } = req.params;
//   console.log(req);
//   try {
//     const product = await Product.getProduct(query);
//     res.status(200).json({ product });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getProduct,
};
