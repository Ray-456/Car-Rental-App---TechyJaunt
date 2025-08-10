const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Flutterwave webhook endpoint
router.post('/flutterwave', express.json({ type: '*/*' }), webhookController.flutterwaveWebhook);

module.exports = router;
