"use strict";

document.addEventListener('DOMContentLoaded', init);
const __gameId = getGameID();
const __PlayerName = getPlayerName();
const readyButton = document.querySelector('#readyButton');


function init() {
    readyButton.addEventListener('click', setReadyState);
    document.querySelector('#quitButton').addEventListener('click', quitLobby);

    loadLobby();
}

function setReadyState() {
    if (readyButton.innerHTML === 'Ready') {
        readyUpPlayer();
    } else {
        unReadyPlayer();
    }
}

function readyUpPlayer() {
    fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}/ready`, `PUT`)
        .then(function () {
            readyButton.innerHTML = 'Not ready';
        });
}

function unReadyPlayer() {
    fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}/ready`, `DELETE`)
        .then(function () {
            readyButton.innerHTML = 'Ready';
        });
}

function getReadyState(player) {
    if (player['ready']) {
        return 'Ready';
    } else {
        return 'Not ready';
    }
}

function loadLobby() {
    let players;
    const table = document.querySelector(".center");
    const timeoutMilliseconds = 2000;
    const maxPlayers = 6;
    fetchFromServer(`${config.root}games/${__gameId}`, 'GET')
        .then(function (response) {
            players = response['players'];
            table.innerHTML = '';

            players.forEach(player => {
                table.innerHTML += `<tr id="${player['name']}">
                                <td>${player['name']}</td>
                                <td>${getReadyState(player)}</td>
                            </tr>`;
            });
            document.querySelector('#playerCount').innerHTML = players.length + "/" + maxPlayers;
            document.querySelector('#waiting h3').innerHTML = `gameID: ${getGameID()}` ;

            if (!response['started']) {
                setTimeout(() => loadLobby(), timeoutMilliseconds);
            } else if (response['started']) {
                window.location.href = "../playBoard/playBoard.html";
            }

        });
}

function quitLobby() {
    fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}`, `DELETE`)
        .then(function () {
            removeGameID();
            window.location.href = "../mainMenu.html";
        });
}


