const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = new Schema({
  eatenProducts: [
    {
      title: { type: String, required: true },
      weight: { type: Number, required: true },
      kcal: { type: Number, required: true },
    },
  ],
  date: { type: String, required: true },
  daySummary: {
    kcalLeft: { type: Number, required: true },
    kcalConsumed: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    percentsOfDailyRate: { type: Number, required: true },
  },
  notAllowedProducts: { type: Array },
});

const dayModel = mongoose.model('Day', daySchema);

module.exports = dayModel;
