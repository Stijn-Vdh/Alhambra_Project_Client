"use strict";

let __gameId = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
    serverList();
    document.querySelector('table').addEventListener('click', save);
    document.querySelector('#joinLobbyForm').addEventListener('submit', joinLobby);
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
}

function joinLobby(e) {
    e.preventDefault();
    setGameID(__gameId);
    const playerName = getPlayerName();
    const timeoutMilliseconds = 500;
    joinGame(getGameID(), playerName);
    setTimeout(moveToLobby, timeoutMilliseconds);
}

function moveToLobby() {
    window.location.href = "joiningGamePage.html";
}

function save(e) {
    __gameId = e.target.innerText;

    document.querySelectorAll('table tbody td').forEach(tag => {
        tag.classList.remove("active");
    });

    e.target.classList.add("active");


}

