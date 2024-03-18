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
const googleBtn = document.querySelector('.go'); // Endret for å matche HTML-strukturen
const logoutBtn = document.getElementById('logoutBtn'); // Legg til id="logoutBtn" i HTML-strukturen
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
            redirectTo('dashboard.html'); // Omdiriger til ønsket side etter innlogging
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Håndterer anonym innlogging
loginBtn.addEventListener('click', () => {
    signInAnonymously(auth)
        .then(() => {
            // Innlogging vellykket, vis redigeringsknapper
            editMenuButtons.style.display = 'block';
            loginBtn.style.display = 'none';
            googleBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            console.log("Innlogging vellykket!");
            redirectTo('dashboard.html'); // Omdiriger til ønsket side etter innlogging
        })
        .catch((error) => {
            console.error("Innlogging mislyktes:", error);
        });
});

// Håndterer utlogging
logoutBtn.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            // Logget ut, skjul redigeringsknapper
            editMenuButtons.style.display = 'none';
            loginBtn.style.display = 'block';
            googleBtn.style.display = 'block'; // Vis Google-knappen igjen ved utlogging
            logoutBtn.style.display = 'none';
            console.log("Utlogging vellykket!");
            redirectTo('index.html'); // Omdiriger til ønsket side etter utlogging
        })
        .catch((error) => {
            console.error("Utlogging mislyktes:", error);
        });
});

// Funksjon for å legge til et menyelement
function leggTilMenyElement(element) {
    // Implementer logikk for å legge til menyelementet i databasen eller visuelt på nettsiden
    console.log("Menyelement lagt til:", element);
}

// Funksjon for å redigere et menyelement
function redigerMenyElement(element) {
    // Implementer logikk for å redigere menyelementet i databasen eller visuelt på nettsiden
    console.log("Menyelement redigert:", element);
}

// Funksjon for å slette et menyelement
function slettMenyElement(element) {
    // Implementer logikk for å slette menyelementet fra databasen eller visuelt fra nettsiden
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
