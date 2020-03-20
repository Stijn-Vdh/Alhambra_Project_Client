"use strict";

let __gameId = null;
let previousTag ;
document.addEventListener('DOMContentLoaded', init);

function init() {
    fetchGames();
    document.querySelector('table').addEventListener('click', save);
    document.querySelector('#joinLobbyForm').addEventListener('submit', joinLobby);
}

function fetchGames() {
    let games = [];
    fetchFromServer(`${config.root}games?prefix=group${config.groupnumber}`, `GET`)
        .then(function (response) {
            games = response;
            console.log(response);
            let htmlCode = document.querySelector("table tbody");
            for (let i = 0; i < games.length; i++) {
                if (games[i]["playerCount"] < 6){
                    htmlCode.innerHTML += `<tr><td>${games[i]}</td></tr>`;
                }
            }
        });
}

function joinLobby() {
    console.log(__gameId);
    localStorage.setItem("gameID", __gameId);
    let playerName = localStorage.getItem("playerName");

    fetchFromServer(`${config.root}games/${__gameId}/players`, 'POST', {playerName: `${playerName}`})
        .then(function (response) {
            console.log('%c%s', 'background-color: yellow;color: black', 'The playerToken is ', response);
        });
    moveToLobby();
}

function moveToLobby() {
    window.location.href = "joiningGamePage.html";
}

function save(e) {
    __gameId = e.target.innerText;
    console.log(__gameId);
    console.log(e);

    document.querySelectorAll('table tbody td').forEach(tag =>{
       tag.classList.remove("active")
    });

    e.target.classList.add("active")



}

