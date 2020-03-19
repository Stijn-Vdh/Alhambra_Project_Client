"use strict";

let __gameId = null;
let __PlayerName = localStorage.getItem('playerName');
let __playerToken = __gameId + '+' + __PlayerName;


document.addEventListener('DOMContentLoaded',init);

function init(){
    fetchGames();
    document.querySelector('table').addEventListener('click', save);
    document.querySelector('#joinLobbyForm').addEventListener('submit', addPlayerExistingGame);
}

function fetchGames() {
    let games = [];
    fetchFromServer(`${config.root}games?prefix=group${config.groupnumber}`,`GET`)
        .then(function(response) {
            games = response;
            let htmlCode = document.querySelector("tbody");
            for(let i = 0; i < games.length;i++){
            htmlCode.innerHTML += `<tr><td>${games[i]}</td></tr>`;
        }
    });
}

function addPlayerExistingGame(e){
    e.preventDefault();
    joinGame(__gameId, 'stijn');

}

function save(e) {
   __gameId = e.target.innerText;
}

