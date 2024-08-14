import { onRequest } from "firebase-functions/v2/https";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  console.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});