const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
  token: {
    type: String,
    default: null,
  },
  userData: {
    weight: { type: Number, required: true, default: 0 },
    height: { type: Number, required: true, default: 0 },
    age: { type: Number, required: true, default: 0 },
    desiredWeight: { type: Number, required: true, default: 0 },
    bloodType: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    dailyRate: { type: Number, required: true, default: 0 },
  },
});

userSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
