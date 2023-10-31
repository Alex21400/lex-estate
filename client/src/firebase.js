// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lex-estate.firebaseapp.com",
  projectId: "lex-estate",
  storageBucket: "lex-estate.appspot.com",
  messagingSenderId: "1073260495943",
  appId: "1:1073260495943:web:d274d11a466d1951d49d62",
  measurementId: "G-PQP8LLHB05"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);