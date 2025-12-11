const mongoose = require('mongoose');
const Car = require('../models/carModel');

// get all Cars
const getAllCars = async (req, res) => {

  try {
    const cars = await Car.find({}).sort({createdAt: -1})
    res.status(200).json(cars)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Add one Car
const createCar = async (req, res) => {
  try {
    const user_id = req.user._id;
    const newCar = new Car({
      ...req.body,
      user_id,
    });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Get Car by ID
const getCarById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such car'});
  }

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Delete Car by ID
const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    // const user_id = req.user._id;
    // const car = await Car.findByIdAndDelete({ _id: id, user_id: user_id });
    const car = await Car.findByIdAndDelete({ _id: id,});
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(204).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Update Car by ID
const updateCar = async (req, res) => {
  const { id } = req.params;
  try {
    // const user_id = req.user._id;
    const car = await Car.findOneAndUpdate(
      // { _id: id, user_id: user_id },
      { _id: id,  },
      { ...req.body },
      { new: true }
    );
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  getAllCars,
  createCar,
  getCarById,
  deleteCar,
  updateCar,
};
