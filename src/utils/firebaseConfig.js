// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWnkI13003sIpnWIJ1h66VylrRd2-gkWs",
  authDomain: "vault-insight.firebaseapp.com",
  projectId: "vault-insight",
  storageBucket: "vault-insight.appspot.com",
  messagingSenderId: "735159432377",
  appId: "1:735159432377:web:ddc9bd67f7e6c5f0451768",
  measurementId: "G-HCHT2E1PJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
