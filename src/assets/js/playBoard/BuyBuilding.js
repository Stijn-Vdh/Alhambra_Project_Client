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
    let selectedCard = (e.target.closest('div'));

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            let playerCoins = getStartingCoins(response);

            console.log(playerCoins[selectedCard.id]);
            if (!selectedCard.classList.contains('selectedCard')){
                selectedCard.classList.add('selectedCard');
            }else{
                selectedCard.classList.remove('selectedCard')
            }

        });


}
