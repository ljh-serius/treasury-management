import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import cors from 'cors';

// Initialize Stripe with your secret key from Firebase config
const stripe = new Stripe(functions.config().stripe.secret_key, {
    apiVersion: '2024-06-20',
});

// Initialize CORS
const corsHandler = cors({ origin: true });

// Create the payment intent function
export const createPaymentIntent = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            const { amount, currency = 'usd' } = req.body;

            if (!amount || isNaN(amount)) {
                res.status(400).send({ error: 'Invalid amount' });
                return; // Ensure the function ends after sending the response
            }

            // Create a PaymentIntent with the specified amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100, // Stripe requires the amount to be in cents
                currency: currency,
            });

            // Send the client secret back to the client
            res.status(200).send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error creating payment intent:', error.message);
                res.status(500).send({
                    error: 'Failed to create payment intent',
                });
            } else {
                console.error('Unexpected error', error);
                res.status(500).send({
                    error: 'An unexpected error occurred',
                });
            }
        }
    });
});
