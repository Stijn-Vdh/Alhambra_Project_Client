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
    const maxPlayers = 6;
    fetchFromServer(`${config.root}games?details=true&prefix=group${config.groupnumber}`, `GET`)
        .then(function (response) {
            games = response;
            console.log(response);
            const htmlCode = document.querySelector("table tbody");
            htmlCode.innerHTML = '';
            games.forEach(function (game) {
                if (game["playerCount"] < 6) {
                    htmlCode.innerHTML += `<tr><td>${game["id"]}</td></tr>`;
                }
            })
        });
}

function joinLobby(e) {
    e.preventDefault();
    console.log(__gameId);
    setGameID(__gameId);
    const playerName = getPlayerName();
    const timeoutMilliseconds = 500;
    fetchFromServer(`${config.root}games/${__gameId}/players`, 'POST', {playerName: `${playerName}`})
        .then(function (response) {
            console.log('%c%s', 'background-color: yellow;color: black', 'The playerToken is ', response);
            setTimeout(moveToLobby, timeoutMilliseconds);
        });
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

