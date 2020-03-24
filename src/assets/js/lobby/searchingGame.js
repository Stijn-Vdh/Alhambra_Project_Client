"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    getOpenLobby();
}

function containsPlayer(players) {
    let i = 0;
    players.forEach(function () {
        if (players[i] === getPlayerName()) {
            return true;
        }
        i++
    });
    return false;
}

function getOpenLobby() {
    const openGameIDs = [];
    fetchFromServer(`${config.root}games?details=true&prefix=group${config.groupnumber}`, 'GET')
        .then(function (response) {
            console.log(response);
            /*for (let i = 0; i < response.length; i++) {
                if (response[i]["started"] === false && response[i]["playerCount"] < 6 && !containsPlayer(response[i]["players"])) {
                    openGameIDs.push(response[i]["id"]);
                    console.log(response[i]["id"]);
                }
            }*/
            let i = 0;
            response.forEach(function () {
                if (response[i]["started"] === false && response[i]["playerCount"] < 6 && !containsPlayer(response[i]["players"])) {
                    openGameIDs.push(response[i]["id"]);
                    console.log(response[i]["id"]);
                }
                i++;
            });
            joinOpenLobby(openGameIDs);
            setTimeout(joinLobby, 3000);
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
