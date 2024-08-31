// backend/routes/stripe.js
const express = require('express');
const { requireSignin, isAuth } = require('../controllers/auth');
const { createCustomer, createSubscription, createPaymentIntent, handleWebhook } = require('../controllers/stripe');
const router = express.Router();

router.post('/create-customer', requireSignin, isAuth, createCustomer);
router.post('/create-subscription', requireSignin, isAuth, createSubscription);
router.post('/create-payment-intent', requireSignin, isAuth, createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
