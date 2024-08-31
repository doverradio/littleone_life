// frontend/src/api/stripe.js

const API = process.env.REACT_APP_API || 'https://www.littleone.life/api'; // Your backend API URL

// Function to create a Stripe customer
export const createCustomer = async (email, userId) => {
  try {
    const response = await fetch(`${API}/stripe/create-customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure session cookies are included
      body: JSON.stringify({ email, userId }), // Pass userId in the body
    });

    if (!response.ok) {
      throw new Error('Failed to create customer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
};

// Function to create a Stripe subscription
export const createSubscription = async (customerId, priceId, userId) => {
  try {
    const response = await fetch(`${API}/stripe/create-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure session cookies are included
      body: JSON.stringify({ customerId, priceId, userId }), // Pass userId in the body
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Stripe subscription:', error);
    throw error;
  }
};

// Function to create a Stripe payment intent
export const createPaymentIntent = async (amount, userId) => {
  try {
    const response = await fetch(`${API}/stripe/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure session cookies are included
      body: JSON.stringify({ amount, userId }), // Pass userId in the body
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Function to handle webhook setup
export const setupWebhook = async (webhookData, userId) => {
  try {
    const response = await fetch(`${API}/stripe/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure session cookies are included
      body: JSON.stringify({ ...webhookData, userId }), // Pass userId in the body
    });

    if (!response.ok) {
      throw new Error('Failed to setup webhook');
    }

    return await response.json();
  } catch (error) {
    console.error('Error setting up webhook:', error);
    throw error;
  }
};
