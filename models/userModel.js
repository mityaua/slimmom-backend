const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  userData: {
    currentWeight: { type: Number, required: true, default: 0 },
    height: { type: Number, required: true, default: 0 },
    age: { type: Number, required: true, default: 0 },
    desiredWeight: { type: Number, required: true, default: 0 },
    bloodType: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    dailyRate: { type: Number, required: true, default: 0 },
    notAllowedProducts: { type: Array },
    notAllowedProductsAll: { type: Array },
  },
  days: { type: Array },
});

userSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = model('User', userSchema);

module.exports = User;
