const mongoose = require('mongoose');
const Car = require('../models/carModel');

// get all Cars (public GET route)
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({}).sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add one Car (protected POST route)
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
};

// Get Car by ID (public GET route)
const getCarById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such car' });
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
};

// Delete Car by ID (protected DELETE route)
const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    // Get the authenticated user's id from req.user (set by auth middleware)
    const user_id = req.user._id;

    /*
      By including user_id in the delete query:
      - Only the user who created/owns the car can delete it
      - Even if another user knows the car ID, they cannot delete it
      - This adds authorization on top of authentication
      - Improves security and prevents unauthorized deletions
    */
    const car = await Car.findByIdAndDelete({ _id: id, user_id: user_id });

    /*
      Previous version (commented out):
      This deleted a car only by its ID.
      That meant any authenticated user could delete any car
      as long as they knew the car ID, which is a security risk.
    */
    // const car = await Car.findByIdAndDelete({ _id: id });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(204).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Update Car by ID (protected PUT route)
const updateCar = async (req, res) => {
  const { id } = req.params;

  try {
    // Get the authenticated user's id
    const user_id = req.user._id;

    /*
      By matching both _id and user_id:
      - Only the owner of the car can update it
      - Prevents other users from modifying cars they do not own
      - Adds proper authorization control to the update operation
    */
    const car = await Car.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );

    /*
      Previous version (commented out):
      This allowed any authenticated user to update any car
      as long as they knew the car ID, which is insecure.
    */
    // const car = await Car.findOneAndUpdate(
    //   { _id: id },
    //   { ...req.body },
    //   { new: true }
    // );

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getAllCars,
  createCar,
  getCarById,
  deleteCar,
  updateCar,
};
