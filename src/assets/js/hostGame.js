"use strict";

let _gameId = null;
let _playerName = localStorage.getItem('playerName');

document.addEventListener('DOMContentLoaded',init);

function init() {
    document.querySelector('#hostGameForm').addEventListener('submit', createNewGame);
}
function createNewGame(e){
    e.preventDefault();

    fetchFromServer(
        `${config.root}games`,
        'POST',
        {prefix: `group${config.groupnumber}` })
        .then(function(response){

            // The reply here is the game ID, keep it secret, keep it safe!
            _gameId = response; // In case of error you **should** handle this properly
            console.log('%c%s','background-color: cyan;color: blue','The game ID is ' , _gameId);
            localStorage.setItem('gameID', _gameId);

            // Join the game you've created
            joinGame(_gameId,_playerName);
        });
        
}

