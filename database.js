 // Import av nødvendige funksjoner og konfigurasjon
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
 import { getAuth, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
 
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
 
 // Hent knapper og elementer
 const loginBtn = document.getElementById('loginBtn');
 const googleBtn = document.querySelector('.go');
 const logoutBtn = document.getElementById('logoutBtn');
 const editMenuButtons = document.getElementById('editMenuButtons');
 
 // Funksjon for å omdirigere til en annen side
 function redirectTo(path) {
     window.location.href = path;
 }
 
 // Håndterer innlogging med Google OAuth
 googleBtn.addEventListener('click', () => {
     const provider = new GoogleAuthProvider();
     signInWithPopup(auth, provider)
         .then((result) => {
             editMenuButtons.style.display = 'block';
             loginBtn.style.display = 'none';
             googleBtn.style.display = 'none';
             logoutBtn.style.display = 'block';
             console.log("Innlogging vellykket!");
             redirectTo('dashboard.html');
         })
         .catch((error) => {
             alert(error.message);
         });
 });
 
 // Håndterer anonym innlogging
 loginBtn.addEventListener('click', () => {
     signInAnonymously(auth)
         .then(() => {
             editMenuButtons.style.display = 'block';
             loginBtn.style.display = 'none';
             googleBtn.style.display = 'none';
             logoutBtn.style.display = 'block';
             console.log("Innlogging vellykket!");
             redirectTo('dashboard.html');
         })
         .catch((error) => {
             console.error("Innlogging mislyktes:", error);
         });
 });
 
 // Håndterer utlogging
 logoutBtn.addEventListener('click', () => {
     auth.signOut()
         .then(() => {
             editMenuButtons.style.display = 'none';
             loginBtn.style.display = 'block';
             googleBtn.style.display = 'block';
             logoutBtn.style.display = 'none';
             console.log("Utlogging vellykket!");
             redirectTo('index.html');
         })
         .catch((error) => {
             console.error("Utlogging mislyktes:", error);
         });
 });
 
 // Funksjon for å legge til et menyelement
 function leggTilMenyElement(element) {
     console.log("Menyelement lagt til:", element);
 }
 
 // Funksjon for å redigere et menyelement
 function redigerMenyElement(element) {
     console.log("Menyelement redigert:", element);
 }
 
 // Funksjon for å slette et menyelement
 function slettMenyElement(element) {
     console.log("Menyelement slettet:", element);
 }
 
 // Legg til funksjonalitet for knapper for å legge til, redigere og slette menyelementer
 const addMenuItemBtn = document.getElementById('addMenuItemBtn');
 const editMenuItemBtn = document.getElementById('editMenuItemBtn');
 const deleteMenuItemBtn = document.getElementById('deleteMenuItemBtn');
 
 addMenuItemBtn.addEventListener('click', () => {
     const newMenuItem = prompt("Skriv inn navnet på det nye menyelementet:");
     if (newMenuItem) {
         leggTilMenyElement(newMenuItem);
     }
 });
 
 editMenuItemBtn.addEventListener('click', () => {
     const menuItemToEdit = prompt("Skriv inn navnet på menyelementet du vil redigere:");
     if (menuItemToEdit) {
         redigerMenyElement(menuItemToEdit);
     }
 });
 
 deleteMenuItemBtn.addEventListener('click', () => {
     const menuItemToDelete = prompt("Skriv inn navnet på menyelementet du vil slette:");
     if (menuItemToDelete) {
         slettMenyElement(menuItemToDelete);
     }
 });