//UPRM RUMblebots Combact Robots Team 
const webpack = require("webpack")
const config = require("./webpack.config")
const compiler = webpack(config)
import { initializeApp } from "firebase/app"
import { getDatabase, ref, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics"
//Web APP firebase config
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
const db = getDatabase(app);
const analytics = getAnalytics(app);

// expressjs backend
const express = require('express')
const server = express()


function writeUserData(name, email, bio) {
  set(ref(db, 'applications/' + email), {
    username: name,
    email: email,
    bio : bio
  });


}  
writeUserData("aslkdjasdas","askdhjaskdhasd","laksdjaskdljasd");