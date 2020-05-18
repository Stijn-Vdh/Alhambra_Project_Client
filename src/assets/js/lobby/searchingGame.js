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

    joinGame(gameID, playerName);
}

function joinLobby() {
    window.location.href = "lobby.html";
}
