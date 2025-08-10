const Flutterwave = require('flutterwave-node-v3');
const Rental = require('../models/Rental');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

exports.initiatePayment = async (req,res,next) => {
  try {
    const { rentalId, amount, email, phone, name } = req.body;
    if(!rentalId || !amount || !email || !name) return res.status(400).json({ error: 'Missing fields' });

    const rental = await Rental.findById(rentalId);
    if(!rental) return res.status(404).json({ error: 'Rental not found' });

    const txRef = `rental_${rentalId}_${Date.now()}`;
    rental.paymentRef = txRef;
    await rental.save();

    const payload = {
      tx_ref: txRef,
      amount: amount,
      currency: 'NGN',
      redirect_url: process.env.FLW_REDIRECT || 'http://localhost:3000/payment-success',
      customer: { email, phonenumber: phone || '', name },
      customizations: { title: 'Car Rental Payment', description: `Payment for rental ${rentalId}` }
    };

    const response = await flw.Payment.initialize(payload);
    if(response.status === 'success') {
      return res.json({ payment_link: response.data.link });
    } else {
      return res.status(500).json({ error: 'Failed to initialize payment', detail: response });
    }
  } catch (err) { next(err); }
};
