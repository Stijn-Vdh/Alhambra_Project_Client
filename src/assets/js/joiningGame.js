"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    joinGameTimer();
}

function joinGameTimer() {
    setTimeout(changeToNextPage, 2000);
}

function changeToNextPage() {
    window.location.href = "lobby.html"
}