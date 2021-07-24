const mongoose = require('mongoose');
const { Schema, SchemaTypes, model } = mongoose;

const productSchema = new Schema({
  title: {
    ru: {
      type: String,
      default: null,
    },
  },
  calories: {
    type: String,
    default: null,
  },
  weight: {
    type: Number,
    default: 0,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
});

const Product = model('product', productSchema);

module.exports = Product;
