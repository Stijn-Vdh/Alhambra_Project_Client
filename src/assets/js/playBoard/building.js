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
            selectedCoins = [];
            fetchFromServer(`${config.root}games/${getGameID()}`,
                'GET')
                .then(function (response) {
                    for (let i = 0;i<response['players'].length;i++){
                        if (response['players'][i]['name'] === getPlayerName()) {

                            let walls = response['players'][i]['buildings-in-hand'][0]['walls'];

                            fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/city/locations?north=${walls['north'] === true ? 'true' : 'false'}&east=${walls['east'] === true ? 'true' : 'false'}&south=${walls['south'] === true ? 'true' : 'false'}&west=${walls['west'] === true ? 'true' : 'false'}`,
                                'GET')
                                .then(function (response) {
                                    for (let i = 0; i < response.length; i++) {
                                        document.querySelector(`.vak${response[i]['row'] + 3}${response[i]['col'] + 3}`).classList.add('highlight');
                                    }
                                });

                        }
                    }

                });

        });

}

function selectBuilding(e) {
    let currency = e.path[1].id;

    fetchFromServer(`${config.root}games/${getGameID()}`, 'GET')
        .then(function (response) {
            selectedBuilding = response.market[currency];


        });

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
        if (selectedCard.currency !== card.currency) {
            res = true;
        }
    });
    return res;
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





