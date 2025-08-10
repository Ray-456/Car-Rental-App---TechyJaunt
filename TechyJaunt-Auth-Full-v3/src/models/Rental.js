const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending','paid','cancelled'], default: 'pending' },
  paymentRef: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Rental', RentalSchema);
