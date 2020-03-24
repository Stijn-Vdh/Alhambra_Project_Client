"use strict";

document.addEventListener('DOMContentLoaded', init);
const __gameId = getGameID();
const __PlayerName = getPlayerName();
const readyButton = document.querySelector('#readyButton');


function init() {
    document.querySelectorAll('a').forEach(tag => {
        if (tag.innerHTML === 'Ready') {
            tag.addEventListener('click', readyUp);

        } else if (tag.innerHTML === 'Quit') {
            tag.addEventListener('click', quitLobby);
        }
    });
    loadLobby();
}

function readyUp() {

    if (readyButton.innerHTML === 'Ready') {
        readyUpPlayer();
        changeReadyState(true);
    } else {
        unReadyPlayer();
        changeReadyState(false);
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

function changeReadyState(ready) {
    const table = document.querySelectorAll(".center tr");
    table.forEach(tag => {
        if (tag.id === __PlayerName) {
            tag.querySelectorAll('td').forEach(td => {
                if (td.innerHTML !== __PlayerName) {
                    if (ready) {
                        td.innerHTML = 'Ready';
                    } else {
                        td.innerHTML = 'Not ready';
                    }
                }
            });
        }
    });
}

function getReadyState(player) {
    if (player === __PlayerName){
        if (readyButton.innerHTML === 'Not ready') {
            return 'Ready';
        }
    }
    return 'Not ready';
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
                table.innerHTML += `<tr id="${player}">
                                <td>${player}</td>
                                <td>${getReadyState(player)}</td>
                            </tr>`;
            });
            document.querySelector('#playerCount').innerHTML = players.length + "/" + maxPlayers;

            if (!response.started) {
                setTimeout(() => loadLobby(), timeoutMilliseconds);
            } else if (response.started) {
                window.location.href = "../playBoard/playBoard.html";
            }

        });
}

function quitLobby() {
    fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}`, `DELETE`)
        .then(function () {
            removeGameID();
            unReadyPlayer();
            window.location.href = "../mainMenu.html";
        });
}


