const express = require('express');
const router = express.Router();
const { getAllCars, createCar, getCarById, deleteCar, updateCar } = require('../controllers/carController');
const requireAuth = require('../middleware/requireAuth')


// GET all Cars
router.get('/', getAllCars);

// GET a single Car
router.get('/:id', getCarById);

// require auth for the rest of the routes
router.use(requireAuth)

// POST a new Car
router.post('/', createCar);

// DELETE a Car
router.delete('/:id', deleteCar);

// Update Car using PUT
router.put('/:id', updateCar);

module.exports = router;
