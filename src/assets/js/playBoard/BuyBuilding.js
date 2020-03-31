"use strict";

document.addEventListener('DOMContentLoaded', init);

let selectedCoins;
let selectedBuilding;

function init() {
    selectedCoins = [];
}

function buyBuilding(e) {

    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/buildings-in-hand`,
        'POST',
        {
            currency: `${selectBuilding(e)}`,
            coins: selectedCoins
        })
        .then(function () {

        });

}

function selectBuilding(e) {
    let currency = e.path[1].id;

    fetchFromServer(`${config.root}games/${getGameID()}`, 'GET')
        .then(function (response) {
            selectedBuilding = response.market[currency];


        });
    console.log(currency);
    return currency;
}

function selectCard(e) {
    let selectedCardHTML = (e.target.closest('div'));

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            let playerCoins = getStartingCoins(response);
            let selectedCoin = playerCoins[selectedCardHTML.id];
            processSelectedCard(selectedCardHTML, selectedCoin);

        });
}

function isIllegalCardSelection(selectedCard) {
    let res = false;
    selectedCoins.forEach(card => {
        if (card.currency !== selectedCard.currency) {
            res = true;
        }
    });
    return false;
}

function findCoinIndex(selectedCoin) {
    let i = 0;
    let index = 0;
    selectedCoins.forEach(coin => {
        if (coin["currency"] === selectedCoin["currency"] && coin["amount"] === selectedCoin["amount"]) {
            index = i;
        }
        i++;
    });
    return index;
}

function processSelectedCard(selectedCardHTML, selectedCoin) {

    if (!selectedCardHTML.classList.contains('selectedCard')) {
        if (!isIllegalCardSelection(selectedCoin)) {
            selectedCardHTML.classList.add('selectedCard');

            let coin = {
                currency: selectedCoin.currency,
                amount: selectedCoin.amount
            };


            selectedCoins.push(coin);

        }
    } else {
        selectedCardHTML.classList.remove('selectedCard');

        selectedCoins.splice(findCoinIndex(selectedCoin), 1);
    }
    console.log(selectedCoins)
}





