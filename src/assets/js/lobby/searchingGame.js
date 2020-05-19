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
            if (openGameIDs.length === 0) {
                setTimeout(getOpenLobby, timeoutMilliseconds) ;
            } else {
                joinOpenLobby(openGameIDs);
                setTimeout(goToLobby, timeoutMilliseconds);
            }
        });
}

function joinOpenLobby(openGameIDs) {
    const firstOpenGame = openGameIDs[0];
    setGameID(firstOpenGame);
    const gameID = getGameID();
    const playerName = getPlayerName();

    joinGame(gameID, playerName);
}

function goToLobby() {
    window.location.href = "lobby.html";
}
