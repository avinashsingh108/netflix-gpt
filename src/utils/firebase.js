// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "the-netflixgpt.firebaseapp.com",
  projectId: "the-netflixgpt",
  storageBucket: "the-netflixgpt.firebasestorage.app",
  messagingSenderId: "241239723390",
  appId: "1:241239723390:web:f2d10d005c442de8eff72f",
  measurementId: "G-NV2T1JTG4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
