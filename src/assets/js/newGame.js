"use strict";

let _gameId = null;
let _playerToken = null;


document.addEventListener('DOMContentLoaded',init);

function init() {
    document.querySelector('form').addEventListener('submit', createNewGame);
}
function createNewGame(e){
    e.preventDefault();

    let name = document.querySelector('#name').value.toLowerCase();

    fetchFromServer(
        `${config.root}games`,
        'POST',
        {prefix: `group${config.groupnumber}` })
        .then(function(response){

            // The reply here is the game ID, keep it secret, keep it safe!
            _gameId = response; // In case of error you **should** handle this properly
            console.log('%c%s','background-color: cyan;color: blue','The game ID is ' , _gameId);

            // Join the game you've created
            joinGame(_gameId,name)
        });
        
}

function joinGame(gameId,name){
    fetchFromServer(`${config.root}games/${gameId}/players`,'POST',{playerName: `${name}` })
        .then(function(response){
            _playerToken = response;
            console.log('%c%s','background-color: yellow;color: black','The playerToken is ' , _playerToken);
        });
}
