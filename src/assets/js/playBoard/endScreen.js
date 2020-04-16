"use strict";

document.addEventListener('DOMContentLoaded', init);

function init(){
    loadScoreBoard();
}

function loadScoreBoard(){
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            setScoreBoard(response);
        });
}

function setScoreBoard(response){
    console.log(response);
    let players = response.players;
    players = sortPlayers(players);
    console.log(players);

    let firstPlace = document.querySelector('.first-place .player-name');
    let secondPlace = document.querySelector('.second-place .player-name');
    let thirdPlace = document.querySelector('.third-place .player-name');

    let indexFirst = 0;
    let indexSecond = 1;
    let indexThird = 2;

    firstPlace.innerHTML = players[indexFirst].name;

    secondPlace.innerHTML = players[indexSecond].name;
    thirdPlace.innerHTML = players[indexThird].name;

}

function sortPlayers(players){
    players.sort(function(p1, p2){
        return p2.score - p1.score;
    });
    return players;
}

//voor rematch zelfe principe als ready in een lobby als ierdereen 'ready is voor een rematch' start je een rematch anders niet.

