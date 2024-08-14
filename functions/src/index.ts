import { onRequest } from "firebase-functions/v2/https";
import { config } from "firebase-functions";
import Stripe from "stripe";

// Initialize Stripe with your secret key from Firebase config
const stripe = new Stripe(config().stripe.secret_key, {
    apiVersion: "2024-06-20"
})

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  console.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});