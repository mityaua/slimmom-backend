const Product = require('../models/productModel');
const Products = require('../models/productModel');

const listProducts = owner => {
  return Products.find({ owner }).select({
    __v: 0,
    categories: 0,
    groupBloodNotAllowed: 0,
    title: { ua: 0 },
    _id: 0,
  });
};

const addProduct = ({ title: { ru }, weight, calories }, owner) => {
  calories = (weight * calories) / 100;
  return Products.create({ title: { ru }, calories, weight, owner });
};

const removeProduct = (id, owner) => {
  return Products.findByIdAndRemove({ _id: id, owner });
};

const getCalories = async (
  height,
  age,
  currentWeight,
  desiredWeight,
  bloodType,
) => {
  const calories =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  let groupBloud = [null, false, false, false, false];
  groupBloud[bloodType] = true;
  const positiveFood = await Products.find({
    groupBloodNotAllowed: groupBloud,
  })
    .select({
      title: { ru: 1 },
      _id: 0,
    })
    .limit(10);
  const foodList = positiveFood.map(({ title: { ru } }) => ru);
  return { calories, foodList };
};

const getProduct = async query => {
  return await Product.find({ title: { ru: query } });
};

module.exports = {
  listProducts,
  removeProduct,
  addProduct,
  getCalories,
  getProduct,
};
