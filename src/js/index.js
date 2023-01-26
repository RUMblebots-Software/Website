// UPRM RUMblebots Combact Robots Team
import html from "../html/index.html";

//Import our custom scss
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import { method } from "lodash";

import software from "../img/software-team.jpg";
import manufacturing from "../img/manufacturing-team.jpg";
import electronics from "../img/electronics-team.jpg";
import logistics from "../img/logistics-team.jpg";
import captains from "../img/captains-team.jpg";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, where, query, onSnapshot, setDoc,doc } from 'firebase/firestore';
// import { query } from "express";
// import { initializeApp } from "firebase-admin";

// const {initializeApp} = require('../../firebase-admin/app');
// const {initializeApp, applicationDefault, cert} = require('firebase-admin');
// const {getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore')

// initializeApp();



const firebaseConfig = {
    apiKey: "AIzaSyDHjvrenveN0OBqC167mRxsmxWN7D4M6Wc",
    authDomain: "rumblebots-website.firebaseapp.com",
    projectId: "rumblebots-website",
    storageBucket: "rumblebots-website.appspot.com",
    messagingSenderId: "445812151859",
    appId: "1:445812151859:web:b409a58e9f7eb869c57546",
    measurementId: "G-D8XD7NLTM7",
    databaseURL: "https://rumblebots-website-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docRef = collection(db, "applications");

console.log(docRef);




// docRef.forEach((doc)=>{
//     console.log(doc.id, "=>", doc.data());
// })

// firebase.initializeApp(firebaseConfig);

// let database = firebase.database();

// var contactform = firebase.database().ref("application");



// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// var application = document.getElementById("application")

// application.addEventListener("submit", async function (e) {
//     e.preventDefault();
//     var name = document.getElementById("nameInput").value;
//     console.log(name);
//     var email = document.getElementById("emailInput").value;
//     console.log(email);
//     var bio = document.getElementById("bioInput").value;
//     console.log(bio);
//     try {
//         const docRef = await addDoc(collection(db, "applications"), {
//             name: "Ada",
//             email: "Lovelace",
//             bio: "1815"
//         });
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document:",e);
//     }
// })

// Navbar fades up on scroll

// var prevScrollpos = window.pageYOffset;
// window.onscroll = function(){
//     var currentScrollPos = window.pageYOffset;
//     if(prevScrollpos > currentScrollPos){
//         document.getElementById('navbar').style.top = "0";
//     }else{
//         document.getElementById('navbar').style.top = '-100px';
//     }
//     prevScrollpos = currentScrollPos;
// }


document.querySelectorAll('.card-inner').forEach((card) => {
    card.addEventListener('click', (e) => {
        card.classList.toggle('is-flipped')
    })
})
console.log("hi");


var application = document.getElementById("application");
application.addEventListener("submit", async function (event) {
    event.preventDefault();
    var name = document.getElementById("nameInput").value
    console.log(name);
    var email = document.getElementById("emailInput").value
    console.log(email)
    var bio = document.getElementById("bioInput").value
    console.log(bio);


    const docdata = {
        name: name,
        email: email,
        bio: bio
    };
    
    await setDoc(doc(db, "applications", email), docdata);
    


    // await docRef.set({
    //     first: 'Ada',
    //     last: 'Lovance',
    //     born: 1815
    // });

    
    

});



var typeWriter = document.getElementById('typewriter');
var cursor = document.getElementById('cursor');
var textArray = ["design.", "manufacture.", "code.", "test.", "optimize.", "market.", "RUMBLE."];

// backspace effect function
function delWriter(text, i, cb){
    if(i >= 0){
        typeWriter.innerHTML = text.substring(0, i--);
        // random number to emulate backspace hitting
        var timeBack = 10 + Math.random() * 100;
        cursor.classList.remove("cursor-blink");
        cursor.classList.add("cursor-static");
        setTimeout(function(){
            delWriter(text, i, cb);
        }, timeBack);
    }else if(typeof cb == 'function'){
        cursor.classList.remove("cursor-static");
        cursor.classList.add("cursor-blink");
        setTimeout(cb, 1000);
    }
};

// typing effect function
function typer(text, i, cb){
    if(i < text.length + 1){
        typeWriter.innerHTML = text.substring(0, i++);
        // random number to emulate keyword hitting
        var timeType = 150 - Math.random() * 100;
        cursor.classList.remove("cursor-blink");
        cursor.classList.add("cursor-static");
        setTimeout(function(){
            typer(text, i++, cb)
        }, timeType);
    }else if(i === text.length + 1){
        cursor.classList.remove("cursor-static");
        cursor.classList.add("cursor-blink");
        setTimeout(function(){
            delWriter(text, i, cb)
        }, 2000);
    }
};

// Writer function
function startTyping(i){
    if(typeof textArray[i] == "undefined"){
        setTimeout(function(){
            startTyping(0);
        },1000);
    }else if(i < textArray[i].length + 1){
        typer(textArray[i], 0, function(){
            startTyping(i + 1);
        });
    }
};


function startImageFadeIn(img){
    
}



// wait one second before starting the typer
cursor.classList.add("cursor-blink");
setTimeout(function(){
    cursor.classList.remove("cursor-blink");
    cursor.classList.add("cursor-static");
    startTyping(0);
}, 1000);

// document.getElementById("application").addEventListener("submit", sumba);

// function sumba(e) {
//     e.preventDefault();

//     // var name = getElementVal("nameInput");
//     // var email = getElementVal("emailInput");
//     // var msg = getElementVal("bioInput");

//     console.log("me cago");

//     // save(name, email, msg);
// }

const getElementVal = (id) =>{
    return document.getElementById(id).value;
}  