const Rental = require('../models/Rental');

exports.createRental = async (req,res,next) => {
  try {
    const { carId, userId, startDate, endDate, amount } = req.body;
    const rental = await Rental.create({ carId, userId, startDate, endDate, amount });
    res.status(201).json(rental);
  } catch (err) { next(err); }
};

exports.deleteRental = async (req,res,next) => {
  try {
    const r = await Rental.findByIdAndDelete(req.params.id);
    if(!r) return res.status(404).json({ error: 'Rental not found' });
    res.json({ message: 'Rental deleted' });
  } catch (err) { next(err); }
};

exports.searchRentals = async (req,res,next) => {
  try {
    const q = {};
    if(req.query.userId) q.userId = req.query.userId;
    if(req.query.carId) q.carId = req.query.carId;
    if(req.query.status) q.status = req.query.status;
    const rentals = await Rental.find(q).populate('carId').populate('userId').sort({ createdAt: -1 });
    res.json(rentals);
  } catch (err) { next(err); }
};
