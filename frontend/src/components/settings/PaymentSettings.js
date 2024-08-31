// src/components/settings/PaymentSettings.js
import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import { createCustomer, createSubscription, createPaymentIntent } from '../../api/stripe';
import { useUser } from '../../context/UserContext'; // Import useUser hook

// Load Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentSettings = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useUser(); // Get the user data from the UserContext
    const userId = user?._id; // Extract the userId

    const [cardComplete, setCardComplete] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCardChange = (event) => {
        setCardComplete(event.complete);
    };

    const handleCardSave = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !userId) {
            return;
        }

        setIsProcessing(true);

        try {
            // Create a Stripe customer if not already created
            let customerId = user.stripeCustomerId;

            if (!customerId) {
                const customer = await createCustomer(user.email, userId);
                customerId = customer.customerId;
            }

            // Create a payment method and attach it to the customer
            const cardElement = elements.getElement(CardElement);
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                throw error;
            }

            toast.success('Card saved successfully!');
        } catch (error) {
            console.error('Error saving card:', error);
            toast.error('Failed to save card. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <h3>Payment Information</h3>
            <Elements stripe={stripePromise}>
                <form onSubmit={handleCardSave}>
                    <div className="form-group">
                        <label htmlFor="card-element">Credit or Debit Card</label>
                        <CardElement
                            id="card-element"
                            onChange={handleCardChange}
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!stripe || !cardComplete || isProcessing}>
                        {isProcessing ? 'Saving...' : 'Save Card'}
                    </button>
                </form>
            </Elements>
        </div>
    );
};

export default PaymentSettings;
