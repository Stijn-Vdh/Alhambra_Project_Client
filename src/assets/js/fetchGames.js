"use strict";



document.addEventListener('DOMContentLoaded',init);

function init(){
    fetchGames();
    document.querySelector('table').addEventListener('click', addPlayerExistingGame);
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
    joinGame(e.target.innerText, 'test');
}