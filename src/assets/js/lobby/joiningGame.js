"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    joinGameTimer();
}

function joinGameTimer() {
    const timeoutMilliseconds = 2000;
    setTimeout(changeToNextPage, timeoutMilliseconds);
}

function changeToNextPage() {
    window.location.href = "lobby.html";
}
