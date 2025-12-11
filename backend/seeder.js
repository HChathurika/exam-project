require("dotenv").config();
const colors = require("colors");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const cars = require("./data/cars.js");
const Car = require("./models/carModel.js");
const users = require("./data/users.js");
const User = require("./models/userModel.js");

connectDB();

const importData = async () => {
  try {

    await User.deleteMany();
    const user =  await await User.create(users[0]);
    const carsWithUserId = cars.map(item => ({
      ...item,
      user_id: user._id.toString()
    }));
    await Car.deleteMany();
    await Car.insertMany(carsWithUserId);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Car.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}