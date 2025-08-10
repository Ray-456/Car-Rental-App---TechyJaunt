const Rental = require('../models/Rental');

exports.flutterwaveWebhook = async (req,res) => {
  try {
    const signature = req.headers['verif-hash'];
    if(process.env.FLW_SECRET_HASH && signature !== process.env.FLW_SECRET_HASH) {
      return res.status(401).send('Invalid signature');
    }

    const payload = req.body;
    if(payload && payload.data && payload.data.status === 'successful') {
      const txRef = payload.data.tx_ref;
      await Rental.findOneAndUpdate({ paymentRef: txRef }, { status: 'paid' });
    }
    res.status(200).send('ok');
  } catch (err) {
    console.error('Webhook error', err);
    res.status(500).send('error');
  }
};
