// Importer Firebase-moduler
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getDatabase, ref as dbRef, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


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

// Lytt etter skjema-innsending
document.getElementById('menu-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Hent data fra skjemaet for hver dag
    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    days.forEach(day => {
        var name = document.getElementById(`${day}-name`).value;
        var imageFileInput = document.getElementById(`${day}-image`);
        var imageFile = imageFileInput.files[0]; // Få den valgte filen
        var desc = document.getElementById(`${day}-desc`).value;
        var price = document.getElementById(`${day}-price`).value;

        // Sjekk om filen er valgt
        if (imageFile) {
            // Lagre bildefilen i Firebase Storage
            var storageRef = ref(storage, `${day}/${imageFile.name}`);
            var uploadTask = uploadBytesResumable(storageRef, imageFile);

            uploadTask.then(snapshot => {
                getDownloadURL(snapshot.ref).then(imageUrl => {
                    // Lagre data i Firebase Database
                    set(dbRef(database, day), {
                        name: name,
                        image: imageUrl,
                        desc: desc,
                        price: price
                    }).then(() => {
                        console.log(`Data for ${day} lagret.`);
                    }).catch(error => {
                        console.error(`Feil ved lagring av data for ${day}:`, error);
                    });
                }).catch(error => {
                    console.error(`Feil ved å hente nedlastings-URL for ${day}:`, error);
                });
            }).catch(error => {
                console.error(`Feil ved opplasting av bilde for ${day}:`, error);
            });
        } else {
            console.error(`Ingen fil valgt for ${day}.`);
        }
    });
  
    // Tilbakestill skjemaet
    event.target.reset();
});