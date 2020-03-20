"use strict";

document.querySelector("#back").addEventListener("click", goBack);

function goBack(){
    window.history.back();
}