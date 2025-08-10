const Car = require('../models/Car');

exports.createCar = async (req,res,next) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err) { next(err); }
};

exports.updateCar = async (req,res,next) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (err) { next(err); }
};

exports.deleteCar = async (req,res,next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if(!car) return res.status(404).json({ error: 'Car not found' });
    res.json({ message: 'Car deleted' });
  } catch (err) { next(err); }
};

exports.getAllCars = async (req,res,next) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) { next(err); }
};
