/**
 * Stripe Checkout Integration
 * Uses Stripe Checkout (hosted) for secure payment processing
 * 
 * Note: This is a frontend-only implementation.
 * The actual checkout session creation should be handled by your backend.
 * See BACKEND_REQUIREMENTS.md for endpoint specifications.
 */

import { loadStripe } from '@stripe/stripe-js';
import { config } from '../config/env';

let stripePromise = null;

/**
 * Initialize Stripe with publishable key
 */
const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = config.stripe.publishableKey;
    if (!publishableKey || publishableKey.includes('placeholder')) {
      console.warn('Stripe publishable key not configured. Please set REACT_APP_STRIPE_PUBLISHABLE_KEY in your .env file.');
      return null;
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

/**
 * Redirect to Stripe Checkout
 * @param {string} serviceId - Service ID to purchase
 * @param {number} amount - Amount in SEK (smallest currency unit, e.g., 15000 = 150.00 SEK)
 * @param {string} serviceName - Name of the service
 */
export const redirectToCheckout = async (serviceId, amount, serviceName) => {
  try {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe not initialized. Please configure your Stripe keys.');
    }

    // Call your backend to create a checkout session
    // This endpoint needs to be implemented in your Azure backend
    const response = await fetch(`${config.api.baseUrl}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceId,
        amount,
        serviceName,
        successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};

export default {
  getStripe,
  redirectToCheckout,
};

