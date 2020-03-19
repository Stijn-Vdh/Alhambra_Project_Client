"use strict";

document.addEventListener('DOMContentLoaded', init);
let __gameId = localStorage.getItem('gameID');
let __PlayerName = localStorage.getItem('playerName');
let __playerToken = __gameId + '+' + __PlayerName;
let readyButton = document.querySelector('#readyButton');


function init() {
    previousPage();
    document.querySelectorAll('a').forEach(tag => {
        if (tag.innerHTML === 'Ready') {
            tag.addEventListener('click', readyUp);

        } else if (tag.innerHTML === 'Quit') {
            tag.addEventListener('click', quitLobby);

        }
    });
    loadLobby();
}

function startGame() {

    window.location.href = "PlayBoard.html"
}

function readyUp() {

    if (readyButton.innerHTML === 'Ready') {
        readyUpPlayer();
        changeReadyState(true)
    } else {
        unReadyPlayer();
        changeReadyState(false)
    }
}

function readyUpPlayer() {
    fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}/ready`, `PUT`)
        .then(function () {
            readyButton.innerHTML = 'Not ready';
        })
}

function unReadyPlayer() {
    fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}/ready`, `DELETE`)
        .then(function () {
            readyButton.innerHTML = 'Ready';
        })
}

function changeReadyState(ready) {
    let table = document.querySelectorAll(".center tr");
    table.forEach(tag => {
        if (tag.id === __PlayerName) {
            tag.querySelectorAll('td').forEach(td => {
                if (td.innerHTML !== __PlayerName) {
                    if (ready) {
                        td.innerHTML = 'Ready'
                    } else {
                        td.innerHTML = 'Not ready'
                    }
                }
            })
        }
    })
}

function getReadyState() {
    if (readyButton.innerHTML === 'Not ready') {
        return 'Ready'
    }
    return 'Not ready'

}

function loadLobby() {
    let players;
    let table = document.querySelector(".center");
    fetchFromServer(`${config.root}games/${__gameId}`, 'GET')
        .then(function (response) {
            players = response['players'];
            table.innerHTML = '';

            players.forEach(player => {
                table.innerHTML += `<tr id="${player}">
                                <td>${player}</td>
                                <td>${getReadyState()}</td>
                            </tr>`;
            });
            document.querySelector('#playerCount').innerHTML = players.length + "/6";

            /*if (players.length !== 6) {
                readyButton.style.display = "none";
            }*/

            if (!response.started) {
                setTimeout(() => loadLobby(), 2000)
            } else if (response.started) {
                window.location.href = "PlayBoard.html"
            }

        });
}

function quitLobby() {
    fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}`, `DELETE`)
        .then(function () {
            localStorage.removeItem('gameID');
            unReadyPlayer();
            window.location.href = "main_menu.html"
        })
}

function previousPage() {
    localStorage.setItem('previousPage', 'lobby.html')
}

