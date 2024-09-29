// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGW5TMfsh38ayC3aa8BccGYuU_9Cd1iDY",
  authDomain: "authentication-ed978.firebaseapp.com",
  projectId: "authentication-ed978",
  storageBucket: "authentication-ed978.appspot.com",
  messagingSenderId: "762400073386",
  appId: "1:762400073386:web:2b2b92d441f232868392d3",
  measurementId: "G-1CVW6NEVH7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);
export { auth }; // Export the auth object
