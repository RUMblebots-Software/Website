import html from"../html/index.html";import"../scss/styles.scss";import*as bootstrap from"bootstrap";import{method}from"lodash";import software from"../img/software-team.jpg";import manufacturing from"../img/manufacturing-team.jpg";import electronics from"../img/electronics-team.jpg";import logistics from"../img/logistics-team.jpg";import captains from"../img/captains-team.jpg";var application;(application=document.getElementById("application")).addEventListener("submit",(async function(t){t.preventDefault();var e=document.getElementById("nameInput").value;console.log(e);var r=document.getElementById("emailInput").value;console.log(r);var o=document.getElementById("bioInput").value;console.log(o);try{const t=await addDoc(collection(db,"applications"),{name:"Ada",email:"Lovelace",bio:"1815"});console.log("Document written with ID: ",t.id)}catch(t){console.error("Error adding document:",t)}})),document.querySelectorAll(".card-inner").forEach((t=>{t.addEventListener("click",(e=>{t.classList.toggle("is-flipped")}))})),console.log("hi"),(application=document.getElementById("application")).addEventListener("submit",(function(t){t.preventDefault();var e=document.getElementById("nameInput").value;console.log(e);var r=document.getElementById("emailInput").value;console.log(r);var o=document.getElementById("bioInput").value;console.log(o)}));var typeWriter=document.getElementById("typewriter"),cursor=document.getElementById("cursor"),textArray=["design.","manufacture.","code.","test.","optimize.","market.","RUMBLE."];function delWriter(t,e,r){if(e>=0){typeWriter.innerHTML=t.substring(0,e--);var o=10+100*Math.random();cursor.classList.remove("cursor-blink"),cursor.classList.add("cursor-static"),setTimeout((function(){delWriter(t,e,r)}),o)}else"function"==typeof r&&(cursor.classList.remove("cursor-static"),cursor.classList.add("cursor-blink"),setTimeout(r,1e3))}function typer(t,e,r){if(e<t.length+1){typeWriter.innerHTML=t.substring(0,e++);var o=150-100*Math.random();cursor.classList.remove("cursor-blink"),cursor.classList.add("cursor-static"),setTimeout((function(){typer(t,e++,r)}),o)}else e===t.length+1&&(cursor.classList.remove("cursor-static"),cursor.classList.add("cursor-blink"),setTimeout((function(){delWriter(t,e,r)}),2e3))}function startTyping(t){void 0===textArray[t]?setTimeout((function(){startTyping(0)}),1e3):t<textArray[t].length+1&&typer(textArray[t],0,(function(){startTyping(t+1)}))}function startImageFadeIn(t){}cursor.classList.add("cursor-blink"),setTimeout((function(){cursor.classList.remove("cursor-blink"),cursor.classList.add("cursor-static"),startTyping(0)}),1e3);const getElementVal=t=>document.getElementById(t).value;