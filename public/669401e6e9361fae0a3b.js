const webpack=require("webpack"),config=require("./webpack.config"),compiler=webpack(config);import{initializeApp}from"firebase/app";import{getDatabase,ref,set}from"firebase/database";import{getAnalytics}from"firebase/analytics";const firebaseConfig={apiKey:"AIzaSyDHjvrenveN0OBqC167mRxsmxWN7D4M6Wc",authDomain:"rumblebots-website.firebaseapp.com",projectId:"rumblebots-website",storageBucket:"rumblebots-website.appspot.com",messagingSenderId:"445812151859",appId:"1:445812151859:web:b409a58e9f7eb869c57546",measurementId:"G-D8XD7NLTM7",databaseURL:"https://rumblebots-website-default-rtdb.firebaseio.com/"},app=initializeApp(firebaseConfig),db=getDatabase(app),analytics=getAnalytics(app),express=require("express"),server=express();function writeApplication(e,a,i){set(ref(db,"applications/"+a),{fullName:e,email:a,bio:i})}