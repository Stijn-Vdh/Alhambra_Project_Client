"use strict";

document.addEventListener('DOMContentLoaded', init);
let __gameId = localStorage.getItem('gameID');
let __PlayerName = localStorage.getItem('playerName');
let __playerToken = __gameId + '+' + __PlayerName;

function init() {

    document.querySelectorAll('a').forEach(tag => {
        if (tag.innerHTML === "Start") {
            tag.addEventListener('click', startGame);

        } else if (tag.innerHTML === 'Ready') {
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


function loadLobby() {
    let players;
    let table = document.querySelector(".center");
    fetchFromServer(`${config.root}games/${__gameId}`, 'GET')
        .then(function (response) {

            console.log(response);
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

            if (!response.started){
                setTimeout(() => loadLobby(),3000)
            }
        });
}
function quitLobby(){
    fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}`, `DELETE`)
        .then(function () {
            localStorage.removeItem('gameID');
            unReadyPlayer();
            window.location.href = "main_menu.html"
        })
}

