const Day = require('../../models/dayModel');

const isFirstNotAllowedProduct = async (dayId, notAllowedProduct) => {
  try {
    const currentDay = await Day.findById(dayId);
    if (currentDay.notAllowedProducts.length > 0) {
      return notAllowedProduct.toLowerCase();
    }
    return notAllowedProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = { isFirstNotAllowedProduct };
