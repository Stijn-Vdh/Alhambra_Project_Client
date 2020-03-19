"use strict";

let _playerToken = null;

function joinGame(gameId,playerName){
    fetchFromServer(`${config.root}games/${gameId}/players`,
        'POST',
        {playerName: `${playerName}` })
        .then(function(response){
            _playerToken = response;
            console.log('%c%s','background-color: yellow;color: black','The playerToken is ' , _playerToken);
        });
}