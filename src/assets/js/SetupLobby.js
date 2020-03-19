"use strict";

document.addEventListener('DOMContentLoaded', init);
let __gameId = localStorage.getItem('gameID');
let __PlayerName = localStorage.getItem('playerName');
let __playerToken = __gameId + '+' + __PlayerName;

function init() {

    document.querySelectorAll('a').forEach(tag => {
        if (tag.innerHTML === "Start") {
            tag.addEventListener('click', loadGame);

        } else if (tag.innerHTML === 'Ready') {
            tag.addEventListener('click', readyUp);

        }
    });
    loadLobby();
}

function loadGame() {

    window.location.href = "PlayBoard.html"
}

function loadLobby() {
    let players;
    let table = document.querySelector(".center");
    fetchFromServer(`${config.root}games/${__gameId}`, 'GET')
        .then(function (response) {
            players = response['players'];
            table.innerHTML = '';

            console.log(players);

            players.forEach(player => {
                table.innerHTML += `<tr id="${player}">
                                <td>${player}</td>
                                <td>Not ready</td>
                            </tr>`;
            });
            document.querySelector('#playerCount').innerHTML = players.length + "/6";
        });
}

function readyUp() {
    let table = document.querySelectorAll(".center tr");
    let button = document.querySelector('#readyButton');

    if (button.innerHTML === 'Ready') {
        readyUpPlayer();
        table.forEach(tag => {
            if (tag.id === __PlayerName) {
                tag.querySelectorAll('td').forEach(td => {
                    if (td.innerHTML !== __PlayerName) {
                        td.innerHTML = 'Ready'
                    }
                })
            }
        })
    } else {
        unReadyPlayer();
        table.forEach(tag => {
            if (tag.id === __PlayerName) {
                tag.querySelectorAll('td').forEach(td => {
                    if (td.innerHTML !== __PlayerName) {
                        td.innerHTML = 'Not ready'
                    }
                })
            }
        })
    }

    function readyUpPlayer() {
        fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}/ready`, `PUT`)
            .then(function () {
                button.innerHTML = 'Not ready';
            })
    }

    function unReadyPlayer() {
        fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}/ready`, `DELETE`)
            .then(function () {
                button.innerHTML = 'Ready';
            })
    }
}