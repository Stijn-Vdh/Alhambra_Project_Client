"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    serverList();
}

function serverList() {
    let games = [];
    fetchFromServer(`${config.root}games`, `GET`)
        .then(function (response) {
            games = response;
            const htmlCode = document.querySelector("table tbody");
            htmlCode.innerHTML = '';
            games.forEach(function (game) {

                htmlCode.innerHTML += `<tr><td>${game}</td></tr>`;

            })
        });
    document.querySelector('table').addEventListener('click', joinLobby);
    setTimeout(function () {
        serverList();
    }, 1000);
}

function joinLobby(e) {
    e.preventDefault();
    setGameID(e.target.innerText);
    const playerName = getPlayerName();
    const timeoutMilliseconds = 500;
    joinGame(getGameID(), playerName);
    setTimeout(moveToLobby, timeoutMilliseconds);
}

function moveToLobby() {
    window.location.href = "joiningGamePage.html";
}


