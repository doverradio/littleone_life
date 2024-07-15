// backend/routes/stripe.js
const express = require('express');
const { createCustomer, createSubscription, createPaymentIntent } = require('../controllers/stripe');
const router = express.Router();

router.post('/create-customer', createCustomer);
router.post('/create-subscription', createSubscription);
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
