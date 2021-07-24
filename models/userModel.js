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
  // предположительно както так (Витя)
  // stats: {
  //   height: {
  //     type: Number,
  //     required: true,
  //   },
  //   age: {
  //     type: Number,
  //     required: true,
  //   },
  //   currentWeight: {
  //     type: Number,
  //     required: true,
  //   },
  //   desiredWeight: {
  //     type: Number,
  //     required: true,
  //   },
  //   bloodType: {
  //     type: Number,
  //     required: true,
  //     default: 1,
  //   },
  // },
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
