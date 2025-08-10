const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

router.post('/', rentalController.createRental);
router.delete('/:id', rentalController.deleteRental);
router.get('/search', rentalController.searchRentals);

module.exports = router;
