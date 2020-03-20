"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    getOpenLobby();
}

function containsPlayer(players) {
    for (let i = 0; i < players.length; i++) {
        if (players[i] === getPlayerName()) {
            return true
        }
    }
    return false
}

function getOpenLobby() {
    let openGameIDs = [];
    fetchFromServer(`${config.root}games?details=true&prefix=${config.groupnumber}`, 'GET')
        .then(function (response) {
            console.log(response);
            for (let i = 0; i < response.length; i++) {
                if (response[i]["started"] === false && response[i]["playerCount"] < 6 && !containsPlayer(response[i]["players"])) {
                    openGameIDs.push(response[i]["id"]);
                    console.log(response[i]["id"]);
                }
            }
            joinOpenLobby(openGameIDs);
            setTimeout(joinLobby, 3000);
        });
}

function joinOpenLobby(openGameIDs) {
    console.log(openGameIDs);
    let firstOpenGame = openGameIDs[0];
    localStorage.setItem("gameID", firstOpenGame);
    let gameID = getGameID();
    let playerName = getPlayerName();

    fetchFromServer(`${config.root}games/${gameID}/players`,'POST',{playerName: `${playerName}` })
        .then(function(response){
            console.log('%c%s','background-color: yellow;color: black','The playerToken is ' , response);
        });
}

function joinLobby() {
    window.location.href = "lobby.html";
}