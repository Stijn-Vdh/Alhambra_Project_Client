"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    getOpenLobby();
}

function containsPlayer(players) {
    players.forEach(function (player) {
        if (player === getPlayerName()) {
            return true;
        }
    });
    return false;
}

function getOpenLobby() {
    const openGameIDs = [];
    const timeoutMilliseconds = 3000;
    const maxPlayers = 6;
    fetchFromServer(`${config.root}games?details=true&prefix=group${config.groupnumber}`, 'GET')
        .then(function (response) {
            console.log(response);
            response.forEach(function (lobby) {
                if (lobby["started"] === false && lobby["playerCount"] < maxPlayers && !containsPlayer(lobby["players"])) {
                    openGameIDs.push(lobby["id"]);
                    console.log(lobby["id"]);
                }
            });
            joinOpenLobby(openGameIDs);
            setTimeout(joinLobby, timeoutMilliseconds);
        });
}

function joinOpenLobby(openGameIDs) {
    console.log(openGameIDs);
    const firstOpenGame = openGameIDs[0];
    setGameID(firstOpenGame);
    const gameID = getGameID();
    const playerName = getPlayerName();

    fetchFromServer(`${config.root}games/${gameID}/players`,'POST',{playerName: `${playerName}` })
        .then(function(response){
            console.log('%c%s','background-color: yellow;color: black','The playerToken is ' , response);
        });
}

function joinLobby() {
    window.location.href = "lobby.html";
}
