"use strict";

function joinGame(gameId,playerName){
    fetchFromServer(`${config.root}games/${gameId}/players`,'POST',{playerName: `${playerName}` })
        .then(function(response){
            console.log('%c%s','background-color: yellow;color: black','The playerToken is ' , response);
            saveToken(response);

        });
}

function saveToken(response){
    const token = btoa(response);
    localStorage.setItem("token", token);
}