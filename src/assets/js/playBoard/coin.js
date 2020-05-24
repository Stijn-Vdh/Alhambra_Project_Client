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
        if (playerDetails[i]["name"] === getPlayerName()) {
            return playerDetails[i]["money"]["coinsInBag"];
        }
    }
    return null;
}

function addCoinsToHand() {

    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/money`,
        'POST',
        selectedBankCoins)
        .then(function () {
            getGameDetails();
        });

    fetchFromServer(`${config.root}games/${getGameID()}`, 'GET')
        .then(function (response) {
            setBankCoins(response);
        });
    selectedBankCoins = [];

}

function setBankCoins(response) {

    const bank = document.querySelector("#MoneyStacks");
    bank.innerHTML = "";
    let counter = 1;
    const coinsOnBoard = response["bank"]["coinsOnBoard"];

    Object.keys(coinsOnBoard).forEach(coin => {
        const coinContent = `<div class="${coinsOnBoard[coin]["currency"]}" id="Coin${counter}"><p>${coinsOnBoard[coin]["amount"]}</p></div>`;
        counter++;
        bank.innerHTML += coinContent;
    });

}

function selectHandCoin(e) {
    const selectedCoinHTML = (e.target.closest('div'));

    fetchFromServer(`${config.root}games/${getGameID()}`, 'GET')
        .then(function (response) {
            const playerCoins = getHandCoins(response);
            const selectedCoin = playerCoins[selectedCoinHTML.id];
            processSelectedHandCoin(selectedCoinHTML, selectedCoin);

        });
}

function selectBankCoin(e) {
    const selectedCoinHTML = (e.target.closest('div'));
    fetchFromServer(`${config.root}games/${getGameID()}`, 'GET')
        .then(function (response) {
            const bankCoins = response["bank"]["coinsOnBoard"];
            const coinIndex = selectedCoinHTML.id.slice(4);
            const selectedCoin = bankCoins[coinIndex - 1];

            processSelectedBankCoin(selectedCoinHTML, selectedCoin);
        });
}

function isIllegalCoinSelection(selectedCoin) {
    let illegal = false;
    selectedCoins.forEach(coin => {
        if (selectedCoin.currency !== coin.currency) {
            illegal = true;
        }
    });
    return illegal;
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

function processSelectedHandCoin(selectedCoinHTML, selectedCoin) {

    if (!selectedCoinHTML.classList.contains('selectedCard')) {
        if (!isIllegalCoinSelection(selectedCoin)) {
            selectedCoinHTML.classList.add('selectedCard');

            const coin = {
                currency: selectedCoin.currency,
                amount: selectedCoin.amount
            };

            selectedCoins.push(coin);
        }
    } else {
        selectedCoinHTML.classList.remove('selectedCard');

        selectedCoins.splice(findCoinIndex(selectedCoin, selectedCoins), 1);
    }

}

function processSelectedBankCoin(selectedCoinHTML, selectedCoin) {
    if (!selectedCoinHTML.classList.contains('selectedBankCoin')) {
        selectedCoinHTML.classList.add('selectedBankCoin');

        const bankCoin = {
            currency: selectedCoin.currency,
            amount: selectedCoin.amount
        };
        selectedBankCoins.push(bankCoin);
    } else {
        selectedCoinHTML.classList.remove('selectedBankCoin');
        selectedBankCoins.splice(findCoinIndex(selectedCoin, selectedBankCoins), 1);
    }

}

function getAmountOfCoinsRemaining(response) {
    return response["bank"]["amountOfCoins"];
}
