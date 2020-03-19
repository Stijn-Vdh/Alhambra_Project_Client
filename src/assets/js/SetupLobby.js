"use strict";

document.addEventListener('DOMContentLoaded', init);
let __gameId = localStorage.getItem('gameID');
let __PlayerName = localStorage.getItem('playerName');

function init() {

    document.querySelectorAll('a').forEach(tag => {
        if (tag.innerHTML === "Start") {
            tag.addEventListener('click', loadGame);

        }else if(tag.innerHTML === 'Ready'){
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
    let playerToken = __gameId + '+' + __PlayerName;

    fetchFromServer(`${config.root}games/${__gameId}`, 'GET')
        .then(function(response) {
            players = response['players'];

            let table = document.querySelector(".center");
            console.log(players);
            players.forEach(player => {
                table.innerHTML += `<tr id="${player}">
                                <td>${player}</td>
                                <td>Not ready</td>
                            </tr>`;
            });
        });
}

function readyUp() {
    let table = document.querySelectorAll(".center tr");
    let button = document.querySelector('#readyButton');

    if (button.innerHTML === 'Ready'){
        fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}/ready`, `PUT`)
            .then(function () {
                button.innerHTML = 'Not ready';
                table.forEach(tag => {
                    if (tag.id === __PlayerName){
                        tag.querySelectorAll('td').forEach(td => {
                            if (td.innerHTML !== __PlayerName){
                                td.innerHTML = 'Ready'
                            }
                        })
                    }
                })
            });

    }else{
        fetchFromServer(`${config.root}games/${__gameId}/players/${__PlayerName}/ready`, `DELETE`)
            .then(function () {
                button.innerHTML = 'Ready';
                table.forEach(tag => {
                    if (tag.id === __PlayerName){
                        tag.querySelectorAll('td').forEach(td => {
                            if (td.innerHTML !== __PlayerName){
                                td.innerHTML = 'Not ready'
                            }
                        })
                    }
                })
            });
    }


}