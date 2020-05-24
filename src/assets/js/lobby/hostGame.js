"use strict";

let _gameId = null;
const _playerName = getPlayerName();

document.addEventListener('DOMContentLoaded',init);

function init() {
    document.querySelector('#hostGameButton').addEventListener('click', createNewGame);
}

function createNewGame(e){
    e.preventDefault();
    const timeoutMilliseconds = 100;
    fetchFromServer(
        `${config.root}games`,
        'POST',
        {prefix: `group${config.groupNumber}` })
        .then(function(response){

            _gameId = response;
            localStorage.setItem('gameID', _gameId);

            joinGame(_gameId, _playerName);

            setTimeout(function () {
                window.location.href = "lobby/lobby.html";
            }, timeoutMilliseconds);

        });

}


