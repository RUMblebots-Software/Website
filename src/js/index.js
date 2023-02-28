// UPRM RUMblebots Combact Robots Team
//Authored by Ediemar Valentin, Juan E. Quintana: juan.quintana5@upr.edu, Oscar Flores: oscar.flores@upr.edu, Yahid Diaz: yahid.diaz@upr.edu

//Import our custom scss
import '../scss/styles.scss';
import { Carousel } from 'bootstrap';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";



//Fire Base Config Info
const firebaseConfig = {
    apiKey: "AIzaSyDHjvrenveN0OBqC167mRxsmxWN7D4M6Wc",
    authDomain: "rumblebots-website.firebaseapp.com",
    projectId: "rumblebots-website",
    storageBucket: "rumblebots-website.appspot.com",
    messagingSenderId: "445812151859",
    appId: "1:445812151859:web:b409a58e9f7eb869c57546",
    measurementId: "G-D8XD7NLTM7",
    databaseURL: "https://rumblebots-website-default-rtdb.firebaseio.com/",
    storageBucket: "gs://rumblebots-website.appspot.com/"
};
//Initialize the firebase system with the config above
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// firebase storage
const storage = getStorage();

//Listens for click to flip the cards on the meet the teams page
document.querySelectorAll('.card-inner').forEach((card) => {
    card.addEventListener('click', (e) => {
        card.classList.toggle('is-flipped')
    })
})

if (document.querySelector('#sponsorCarousel')) {
    const Mycarousel = document.querySelector('#sponsorCarousel')

    const carousel = new Carousel(Mycarousel, {
        interval: 1500,
        touch: true
    })

}

if (document.querySelector('#majorInput')) {
    var select = document.querySelector('#majorInput');
    var otherMajorInput = document.querySelector('#other-major');
    var undo = document.querySelector(".input-group-append")
    select.addEventListener('change', function () {
        if (select.value === 'Other...') {
            otherMajorInput.style.display = 'block';
            select.style.display = 'none';
            undo.style.display = 'block';
        } else {
            otherMajorInput.style.display = 'none';
        }
    });
    undo.addEventListener('click', function () {
        otherMajorInput.style.display = 'none';
        select.style.display = 'block';
        undo.style.display = 'none';
    });
}

//This only happens when we are on the apply now page
if (document.getElementById("application")) {
    const cooldownPeriod = 15 * 60 * 1000; //15 minutes in milliseconds for the submission cooldown
    var filePassed = false; //flag if file was valid

    var application = document.getElementById("application"); //gets the whole form and listens for submission
    application.addEventListener("submit", async function (event) {
        event.preventDefault();
        //all the field of the form vvv
        var button = document.getElementById("submitBtn");
        var name = document.getElementById("nameInput").value;
        var email = document.getElementById("emailInput").value;
        var major = document.getElementById("majorInput").value;
        var other = document.getElementById("other-major").value;
        var bio = document.getElementById("bioInput").value;
        let file = document.getElementById('fileInput').files[0];

        if (major == "Other...") {
            if (other == "") {
                myFail("Please input a major");
                return;
            }
            else {
                major = other;
            }
        }

        //gets data form the collection with the submitted email
        const docRef = doc(db, "applicationV4", email);
        const docSnap = await getDoc(docRef);
        //checks if the email already subbmitted an application
        if (docSnap.exists()) {
            console.log('here')
            const currentTime = new Date(Date.now());
            const timeDifference = currentTime.getTime() - Number(docSnap.data().dateUploaded);
            /**gets the dates from the database and checks 
             the time difference and checks if it is more than 
             15 minutes and returns and alert if not**/
            if (timeDifference < cooldownPeriod) {
                //Sends a alert with the minutes left on the cooldown
                myFail("You've already submitted an application today you have " + (15 - Math.round(((timeDifference / 1000) / 60))) + " minutes left.")
                return;
            }

        }
        //Creates Storage Reference
        const storageRef = ref(storage, `app_uploads/${name}'s Upload`);
        //Checks if the file is a PDF
        if (getFileType(file) !== "pdf") {
            myFail("Your resume has to be a PDF");
            return;
        }
        //Checks if the email is a valid UPR email
        if (getEmailDomain(email) !== "upr.edu") {
            myFail("Please enter a valid UPR email");
            return;
        }

        button.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i> loading...';
        await uploadBytes(storageRef, file)
            .then((snapshot) => {
                console.log('Uploaded file to storage!');
                filePassed = true;
            })
            .catch((error) => {
                console.error('Failed to upload file to storage', error);
                filePassed = false;
            });

        if (filePassed) {
            const date = new Date(Date.now());
            const docdata = {
                name: name,
                email: email,
                major: major,
                bio: bio,
                file: storageRef.fullPath,
                dateUploaded: date.getTime().toString()
            };
            await setDoc(docRef, docdata);

            myclear();
            Myalert();
            button.innerHTML = "Submit Application";
            setTimeout(() => { window.location.replace('./index.html') }, 2000);
        } else {
            button.innerHTML = "Submit Application";
            myFail("Failed to upload file to storage");
        }
    });
}


function getFileType(file) {
    return file.name.split('.').pop()
}

function getEmailDomain(email) {
    return email.split("@").pop()
}

function myclear() {
    document.getElementById("application").reset();
}

function Myalert() {
    $.bootstrapGrowl("Thank you for submitting your application.", {
        type: "success",
        align: "center",
        delay: 3000,
        allow_dismiss: false,
        stackup_spacing: 10
    });
}

function myFail(err) {
    $.bootstrapGrowl(err, {
        type: "danger",
        align: "center",
        delay: 3000,
        allow_dismiss: false,
        stackup_spacing: 10
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
