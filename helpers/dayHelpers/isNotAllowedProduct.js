const isNotAllowedProduct = (bloodType, eatenProduct) => {
  const { title, groupBloodNotAllowed } = eatenProduct;
  if (groupBloodNotAllowed[bloodType]) {
    return title.ru;
  }
};

module.exports = { isNotAllowedProduct };
