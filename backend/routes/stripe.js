// backend/routes/stripe.js
const express = require('express');
const { requireSignin, isAuth } = require('../controllers/auth');
const { 
    createCustomer, 
    createSubscription, 
    createPaymentIntent, 
    handleWebhook,
    handleStripeCallback
} = require('../controllers/stripe');
const router = express.Router();

router.post('/stripe/create-customer', requireSignin, isAuth, createCustomer);
router.post('/stripe/create-subscription', requireSignin, isAuth, createSubscription);
router.post('/stripe/create-payment-intent', requireSignin, isAuth, createPaymentIntent);
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Add the callback route
router.get('/stripe/callback', handleStripeCallback);

module.exports = router;
