// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKeys.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://rumblebots-website-default-rtdb.firebaseio.com"
// });

// var applicatio = document.getElementById("application");
// applicatio.addEventListener("submit", function (event) {
//     event.preventDefault();
//     var name = document.getElementById("nameInput").value
//     console.log(name);
//     var email = document.getElementById("emailInput").value
//     console.log(email)
//     var bio = document.getElementById("bioInput").value
//     console.log(bio);
    
//     // let docRef = db.collection("aplication");

//     // docRef.set({
//     //     first: 'Ada',
//     //     last: 'Lovance',
//     //     born: 1815
//     // });

    
    

// });

// const webpack = require("webpack");
// const config = require("./webpack.config");
// const firebase = require("firebase");
// const compiler = webpack(config);
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database";
// //Web APP firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyDHjvrenveN0OBqC167mRxsmxWN7D4M6Wc",
//   authDomain: "rumblebots-website.firebaseapp.com",
//   projectId: "rumblebots-website",
//   storageBucket: "rumblebots-website.appspot.com",
//   messagingSenderId: "445812151859",
//   appId: "1:445812151859:web:b409a58e9f7eb869c57546",
//   measurementId: "G-D8XD7NLTM7",
//   databaseURL:"https://rumblebots-website-default-rtdb.firebaseio.com/"
// };

// const app = initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const User = db.collection("Users");
// module.exports = Users;
// const database = getDatabase(app);
// const analytics = getAnalytics(app);