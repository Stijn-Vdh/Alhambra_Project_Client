"use strict";

function setHandCoins(response) {
    const coins = getCoins(response);
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

function getCoins(response) {
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
                        [
                            {
                                currency: `${response["bank"][i]["currency"]}`,
                                amount: `${response["bank"][i]["amount"]}`
                            }
                        ])
                        .then(function () {
                            getBankCoins();
                            getGameDetails();
                        });
                }
            }
        });

}

function getBankCoins() {

    const bank = document.querySelector("#MoneyStacks");
    bank.innerHTML = "";
    let counter = 1;
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            for (let i = 0; i < response["bank"].length; i++) {
                bank.innerHTML += `<div class="${response["bank"][i]["currency"]}" id="MoneyStack${counter}"><p>${response["bank"][i]["amount"]}</p></div>`;
                counter++;
            }
        });


}

function selectHandCoin(e) {
    let selectedCardHTML = (e.target.closest('div'));

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            let playerCoins = getCoins(response);
            let selectedCoin = playerCoins[selectedCardHTML.id];
            processSelectedCoin(selectedCardHTML, selectedCoin);

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

function processSelectedCoin(selectedCardHTML, selectedCoin) {

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