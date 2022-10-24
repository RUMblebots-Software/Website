// UPRM RUMblebots Combact Robots Team 


// Navbar fades up on scroll
/*
var prevScrollpos = window.pageYOffset;
window.onscroll = function(){
    var currentScrollPos = window.pageYOffset;
    if(prevScrollpos > currentScrollPos){
        document.getElementById('navbar').style.top = "0";
    }else{
        document.getElementById('navbar').style.top = '-100px';
    }
    prevScrollpos = currentScrollPos;
}
*/

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