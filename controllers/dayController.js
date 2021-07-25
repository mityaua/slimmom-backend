const {
  addProductPerDay,
  deleteProductPerDay,
  infoPerDay,
} = require('../services/dayService');

const addProductPerDayController = async (req, res, next) => {
  try {
    const currentDay = await addProductPerDay(req.body, req.user);
    return res.status(201).json(currentDay);
  } catch (error) {
    next(error);
  }
};

const deleteProductPerDayController = async (req, res, next) => {
  const { dayId, eatenProductId } = req.body;

  try {
    const daySummary = await deleteProductPerDay(dayId, eatenProductId);

    return res.status(201).json(daySummary);
  } catch (error) {
    next(error);
  }
};

const infoPerDayController = async (req, res, next) => {
  const { date } = req.body;
  try {
    const dayInfo = await infoPerDay(date, req.user);

    return res.status(200).json(dayInfo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProductPerDayController,
  deleteProductPerDayController,
  infoPerDayController,
};