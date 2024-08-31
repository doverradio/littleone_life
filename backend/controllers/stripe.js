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

exports.handleWebhook = async (req, res) => {
    let event;

    try {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], webhookSecret);
    } catch (err) {
        console.error(`⚠️  Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Add your business logic here, e.g., updating order status
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            break;
        case 'invoice.payment_succeeded':
            const invoice = event.data.object;
            const subscriptionId = invoice.subscription;
            const customerId = invoice.customer;
            // Add logic to update subscription status, e.g., updating the Seller's subscription status
            console.log(`Invoice payment for subscription ${subscriptionId} was successful!`);
            break;
        // Add more event types as needed
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
};