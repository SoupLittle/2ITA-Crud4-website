// Importer Firebase-moduler
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

 // Firebase konfigurasjon
 var firebaseConfig = {
  apiKey: "AIzaSyD8m55yLOuoIi4KsAo7b0xrz18r5MPLIyA",
  authDomain: "crud-finale.firebaseapp.com",
  databaseURL: "https://crud-finale-default-rtdb.firebaseio.com/",
  projectId: "crud-finale",
  storageBucket: "crud-finale.appspot.com",
  messagingSenderId: "952140375871",
  appId: "1:952140375871:web:1b8d04f1bc094a9414958a",
  measurementId: "G-DBQWKCJKQT"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var analytics = getAnalytics(app);
var auth = getAuth(app);
var storage = getStorage(app);
var database = getDatabase(app);

// Hent menydata fra Firebase Database
function fetchMenuData() {
  var dbMenuRef = ref(database); // Referanse til rot av databasen
  get(dbMenuRef).then((snapshot) => {
    var menuData = snapshot.val();
    displayMenu(menuData);
  }).catch((error) => {
    console.error("Feil ved henting av menydata:", error);
  });
}

// Vis menyen på nettsiden
function displayMenu(menuData) {
  var menuContainer = document.getElementById('menu-container');
  let menuHTML =  '';

  // Loop gjennom dagene i uken og vis menyen
  var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  days.forEach(day => {
    var menuItem = menuData[day];
    if (menuItem) {
      menuHTML += `
        <div class="menu-item">
          <h3>${day.charAt(0).toUpperCase() + day.slice(1)}</h3>
          <p><strong>Navn:</strong> ${menuItem.name}</p>
          <p><strong>Pris:</strong> ${menuItem.price} kr</p>
          <p><strong>Beskrivelse:</strong> ${menuItem.desc}</p>
          <img src="${menuItem.image}" alt="${menuItem.name}" width="300">
        </div>
      `;
    }
  });

  menuContainer.innerHTML = menuHTML;
}

// Kall funksjonen for å hente og vise menydata når siden lastes
fetchMenuData();
