"use strict";

document.addEventListener('DOMContentLoaded', init);

let selectedCards;

function init(){
    selectedCards = [];
}
function buyBuilding(e){

    let currency = e.path[1].id;

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {

            console.log(response.market[currency]);

        });
}

function selectCard(e){
    let selectedCardHTML = (e.target.closest('div'));

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            let playerCoins = getStartingCoins(response);
            let selectedCoin = playerCoins[selectedCardHTML.id];

            processSelectedCard(selectedCardHTML, selectedCoin);

        });
}

function isIllegalCardSelection(selectedCard){
    let res = false;
    selectedCards.forEach(card =>{
        if (card.currency !== selectedCard.currency){
            res =  true;
        }
    });
    return false;
}
function findCoinIndex(selectedCoin){
    let i = 0;
    let index = 0;
    selectedCards.forEach(coin =>{
        if (coin.currency === selectedCoin.currency && coin.amount === selectedCoin.amount){
            index = i;
        }
        i++;
    });
    return index;
}

function processSelectedCard(selectedCardHTML, selectedCoin){

    if (!selectedCardHTML.classList.contains('selectedCard')){
        if (!isIllegalCardSelection(selectedCoin)){
            selectedCardHTML.classList.add('selectedCard');
            selectedCards.push(selectedCoin)
        }
    }else{
        selectedCardHTML.classList.remove('selectedCard');
        selectedCards.splice(findCoinIndex(selectedCoin), 1);
    }

}
