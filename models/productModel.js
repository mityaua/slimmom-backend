const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: {
    ru: { type: String, required: true },
  },
  categories: [{ type: String }],
  calories: { type: Number, required: true },
  weight: { type: Number, required: true },
  groupBloodNotAllowed: {
    1: { type: Boolean, required: true },
    2: { type: Boolean, required: true },
    3: { type: Boolean, required: true },
    4: { type: Boolean, required: true },
  },
});

const Product = model('product', productSchema);

module.exports = Product;
