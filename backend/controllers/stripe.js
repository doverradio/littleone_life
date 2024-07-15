// backend/controllers/stripe.js
const stripe = require('../services/stripe');
const Seller = require('../models/seller');

exports.createCustomer = async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            email: req.body.email,
        });

        const seller = new Seller({
            userId: req.body.userId,
            stripeCustomerId: customer.id
        });
        await seller.save();

        res.status(200).send({ customerId: customer.id });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createSubscription = async (req, res) => {
    try {
        const { customerId, priceId } = req.body;

        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            expand: ['latest_invoice.payment_intent'],
        });

        res.status(200).send(subscription);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
