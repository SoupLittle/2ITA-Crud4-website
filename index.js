// Import av nødvendige funksjoner og konfigurasjon
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "firebase/auth";

// Firebase konfigurasjon
const firebaseConfig = {
    apiKey: "AIzaSyD8m55yLOuoIi4KsAo7b0xrz18r5MPLIyA",
    authDomain: "crud-finale.firebaseapp.com",
    projectId: "crud-finale",
    storageBucket: "crud-finale.appspot.com",
    messagingSenderId: "952140375871",
    appId: "1:952140375871:web:1b8d04f1bc094a9414958a",
    measurementId: "G-DBQWKCJKQT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


