"use strict";

document.addEventListener('DOMContentLoaded', init);

function init(){
    loadScoreBoard();
}

function loadScoreBoard(){
    fetchFromServer(`${config.root}games/${getGameID()}`, 'GET')
        .then(function (response) {
            loadFinalScoring(response);
        });
}

function sortPlayers(players){
    players.sort(function(p1, p2){
        return p2['score'] - p1['score'];
    });
    return players;
}

function loadFinalScoring(response) {

    const scoreBoard = document.querySelector('.scoreboard');
    scoreBoard.innerHTML = "";
    let players = response['players'];
    players = sortPlayers(players);
    players.forEach(player => {
        const roundCard = `<div class="scoringCard">
                            <h3>${player['name']}</h3><br>
                            <p class="popupContentLine">final score : ${player['score']}</p><br>`;

        const buildings = `
                        <p>Buildings on board:</p><br>
                         <div id="buildTypes">
                            <p>Pavilion:</p>
                            <p>Seraglio:</p>
                            <p>Arcades:</p>
                            <p>Chambers:</p>
                            <p>Garden:</p>
                            <p>Tower:</p>
                         </div>
                         <div class="buildingAmount">
                            <p>${player['buildingTypesInCity']['pavilion']}</p>
                            <p>${player['buildingTypesInCity']['seraglio']}</p>
                            <p>${player['buildingTypesInCity']['arcades']}</p>
                            <p>${player['buildingTypesInCity']['chambers']}</p>
                            <p>${player['buildingTypesInCity']['garden']}</p>
                            <p>${player['buildingTypesInCity']['tower']}</p>
                        </div>`;
        
        let place;
        if (player['name'] === players[0]['name']){
            place = `<div class="place"><p>1st</p></div></div>`;

        }else if (player['name'] === players[1]['name']){
            place = `<div class="place"><p>2nd</p></div></div>`;

        }else if (player['name'] === players[2]['name']){
            place = `<div class="place"><p>3rd</p></div></div>`;
        }else{
            place = `</div>`;
        }

        const endOfGameTextId = '#endOfGameText';
        
        if (players[0]['name'] === getPlayerName()){
            document.querySelector(endOfGameTextId).innerHTML = "Winner winner camel dinner";
        }else if (players[1]['name'] === getPlayerName()){
            document.querySelector(endOfGameTextId).innerHTML = "Winner winner almost camel dinner";
        }else if (players[2]['name'] === getPlayerName()){
            document.querySelector(endOfGameTextId).innerHTML = "Winner winner smell the camel dinner";
        }else{
            document.querySelector(endOfGameTextId).innerHTML = "You're the camel dinner";
        }

        scoreBoard.innerHTML += roundCard + buildings + place;
    });
}
