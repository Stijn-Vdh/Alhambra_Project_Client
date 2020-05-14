"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    getOpenLobby();
}

function getOpenLobby() {
    const openGameIDs = [];
    const timeoutMilliseconds = 3000;
    fetchFromServer(`${config.root}games`, 'GET')
        .then(function (response) {
            response.forEach(function (lobby) {
                openGameIDs.push(lobby);

            });
            joinOpenLobby(openGameIDs);
            setTimeout(joinLobby, timeoutMilliseconds);
        });
}

function joinOpenLobby(openGameIDs) {
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
