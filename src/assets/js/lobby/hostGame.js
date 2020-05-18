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
        {prefix: `group${config.groupnumber}` })
        .then(function(response){
            console.log(response);
            // The reply here is the game ID, keep it secret, keep it safe!
            _gameId = response; // In case of error you **should** handle this properly
            console.log('%c%s','background-color: cyan;color: blue','The game ID is ' , _gameId);
            localStorage.setItem('gameID', _gameId);

            // Join the game you've created
            joinGame(_gameId, _playerName);

            setTimeout(function () {
                window.location.href = "lobby/lobby.html";
            }, timeoutMilliseconds);

        });

}


