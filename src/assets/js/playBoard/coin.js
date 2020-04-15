"use strict";
let selectedCoins = [];
let selectedBankCoins = [];

function setHandCoins(response) {
    const coins = getHandCoins(response);
    const hand = document.querySelector("#Hand");
    hand.innerHTML = "";
    let i = 0;
    coins.forEach(coin => {
        hand.innerHTML += `<div class="card ${coin["currency"]}" id="${i}"><p>${coin["amount"]}</p></div>`;

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', selectHandCoin);
        });
        i++;
    });
}

function getHandCoins(response) {
    const playerDetails = response["players"];
    for (let i = 0; i < playerDetails.length; i++) {
        if (playerDetails[i]["name"] === localStorage.getItem("playerName")) {
            return playerDetails[i]["coins"];
        }
    }
    return null;
}

function addCoinsToHand(e) {

    let index = e.target.closest('div').id.charAt(10);
    index--;

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            for (let i = 0; i < response["bank"].length; i++) {
                if (i === index) {
                    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}/players/${localStorage.getItem("playerName")}/money`,
                        'POST',
                        selectedBankCoins)
                        .then(function () {
                            setBankCoins();
                            getGameDetails();
                        });
                }
            }
        });

}


function setBankCoins() {

    const bank = document.querySelector("#MoneyStacks");
    bank.innerHTML = "";
    let counter = 1;
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            for (let i = 0; i < response["bank"].length; i++) {
                bank.innerHTML += `<div class="${response["bank"][i]["currency"]}" id="Coin${counter}"><p>${response["bank"][i]["amount"]}</p></div>`;
                counter++;
            }
        });
}

function selectHandCoin(e) {
    let selectedCardHTML = (e.target.closest('div'));

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            let playerCoins = getHandCoins(response);
            let selectedCoin = playerCoins[selectedCardHTML.id];
            processSelectedHandCoin(selectedCardHTML, selectedCoin);

        });
}

function selectBankCoin(e){
    let selectedCoinHTML = (e.target.closest('div'));
    console.log(selectedCoinHTML);
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            let bankCoins = response["bank"];
            let coinIndex = selectedCoinHTML.id.slice(4);
            let selectedCoin = bankCoins[coinIndex -1];
            console.log(selectedCoin);
            processSelectedBankCoin(selectedCoinHTML, selectedCoin);
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

function findCoinIndex(selectedCoin, coinsList) {
    let i = 0;
    let index = 0;
    coinsList.forEach(coin => {
        if (coin["currency"] === selectedCoin["currency"] && coin["amount"] === selectedCoin["amount"]) {
            index = i;
        }
        i++;
    });
    return index;
}

function processSelectedHandCoin(selectedCardHTML, selectedCoin) {

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

        selectedCoins.splice(findCoinIndex(selectedCoin, selectedCoins), 1);
    }
    console.log(selectedCoins)
}

function processSelectedBankCoin(selectedCoinHTML, selectedCoin){
    if (!selectedCoinHTML.classList.contains('selectedBankCoin')){
        selectedCoinHTML.classList.add('selectedBankCoin');

        let bankCoin = {
            currency: selectedCoin.currency,
            amount: selectedCoin.amount
        };
        selectedBankCoins.push(bankCoin)
    }else{
        selectedCoinHTML.classList.remove('selectedBankCoin');
        selectedBankCoins.splice(findCoinIndex(selectedCoin, selectedBankCoins), 1);
    }
    console.log(selectedBankCoins)
}