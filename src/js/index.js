// UPRM RUMblebots Combact Robots Team
//Authored by Ediemar Valentin, Juan E. Quintana: juan.quintana5@upr.edu, Oscar Flores: oscar.flores@upr.edu, Yahid Diaz: yahid.diaz@upr.edu

//Import our custom scss
import '../scss/styles.scss';
import { Carousel } from 'bootstrap';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';



//Fire Base Config Info
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
//Initialize the firebase system with the config above
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




//Listens for click to flip the cards on the meet the teams page
document.querySelectorAll('.card-inner').forEach((card) => {
    card.addEventListener('click', (e) => {
        card.classList.toggle('is-flipped')
    })
})

if (document.querySelector('#sponsorCarousel')) {
    const Mycarousel = document.querySelector('#sponsorCarousel')

    const carousel = new Carousel(Mycarousel, {
        interval: 6000,
        touch: true
    })

}

// encoder
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

//This only happens when we are on the apply now page
if (document.getElementById("application")) {
    //This gets the application form data and prepares it for the database
    var application = document.getElementById("application");
    application.addEventListener("submit", async function (event) {
        event.preventDefault();

        var name = document.getElementById("nameInput").value
        console.log(name);
        var email = document.getElementById("emailInput").value
        console.log(email)
        var bio = document.getElementById("bioInput").value
        console.log(bio);
        let file = document.getElementById('fileInput').files[0];
        await toBase64(file)
        .then(res => {
            console.log(res);
            file = res;
        })
        .catch(err => {
            console.log(err);
        });

        //Application form schema for the database
        const docdata = {
            name: name,
            email: email,
            bio: bio,
            file: file
        };
        //Sends the data to the database (Firebase Cloud)
        await setDoc(doc(db, "applicationV2", email), docdata);
    });
}


if (document.getElementById("typewriter")) {
    var typeWriter = document.getElementById('typewriter');
    var cursor = document.getElementById('cursor');
    var textArray = ["design.", "manufacture.", "code.", "test.", "optimize.", "market.", "RUMBLE."];

    // backspace effect function
    function delWriter(text, i, cb) {
        if (i >= 0) {
            typeWriter.innerHTML = text.substring(0, i--);
            // random number to emulate backspace hitting
            var timeBack = 10 + Math.random() * 100;
            cursor.classList.remove("cursor-blink");
            cursor.classList.add("cursor-static");
            setTimeout(function () {
                delWriter(text, i, cb);
            }, timeBack);
        } else if (typeof cb == 'function') {
            cursor.classList.remove("cursor-static");
            cursor.classList.add("cursor-blink");
            setTimeout(cb, 1000);
        }
    };

    // typing effect function
    function typer(text, i, cb) {
        if (i < text.length + 1) {
            typeWriter.innerHTML = text.substring(0, i++);
            // random number to emulate keyword hitting
            var timeType = 150 - Math.random() * 100;
            cursor.classList.remove("cursor-blink");
            cursor.classList.add("cursor-static");
            setTimeout(function () {
                typer(text, i++, cb)
            }, timeType);
        } else if (i === text.length + 1) {
            cursor.classList.remove("cursor-static");
            cursor.classList.add("cursor-blink");
            setTimeout(function () {
                delWriter(text, i, cb)
            }, 2000);
        }
    };

    // Writer function
    function startTyping(i) {
        if (typeof textArray[i] == "undefined") {
            setTimeout(function () {
                startTyping(0);
            }, 1000);
        } else if (i < textArray[i].length + 1) {
            typer(textArray[i], 0, function () {
                startTyping(i + 1);
            });
        }
    };


    // wait one second before starting the typer
    cursor.classList.add("cursor-blink");
    setTimeout(function () {
        cursor.classList.remove("cursor-blink");
        cursor.classList.add("cursor-static");
        startTyping(0);
    }, 1000);

}
