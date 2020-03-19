"use strict";

document.addEventListener('DOMContentLoaded',init);

function init() {
    document.querySelectorAll('a').forEach(tag => {
        if (tag.innerHTML === "Start"){
            tag.addEventListener('click', loadGame)
        }
    });
}

function loadGame(e){
    window.location.href="PlayBoard.html"
}