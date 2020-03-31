"use strict";

document.addEventListener('DOMContentLoaded', init);

function init(){
    
}
function buyBuilding(e){

    let currency = e.path[1].id;

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {

            console.log(response.market[currency]);

        });
}

function selectCard(e){
    let id = (e.target.closest('div').id);

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            let playerCoins = getStartingCoins(response);
            console.log(playerCoins);

            console.log(playerCoins[id])


        });


}
