"use strict";

document.addEventListener('DOMContentLoaded', init);


function init() {

    setMyAvatar();
    getGameDetails();
    loadCity();
    document.querySelector('#MoneyStacks').addEventListener('click', selectBankCoin);
    document.querySelector("#PlayBoard").addEventListener('click', placeBuildingInCity);
    document.querySelector(".confirmButton").addEventListener('click', addCoinsToHand);
    document.querySelector(".ownPlayerReserveButton").addEventListener('click', showReserveOwnPlayer);
}

function getGameDetails() {
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {

            setHandCoins(response);
            loadOpponents(response.players);
            setBankCoins();
            getMarketBuildings(response);
            focusActivePlayer(response.currentPlayer);

            if (!(response.currentPlayer === getPlayerName())) {
                document.querySelectorAll('.card').forEach(card => {
                    card.removeEventListener('click', selectHandCoin);
                });
                document.querySelector(".confirmButton").removeEventListener('click', addCoinsToHand);
                document.querySelector('#MoneyStacks').removeEventListener('click', selectBankCoin);
                setTimeout(function () {
                    getGameDetails();
                }, 1500);
            } else {
                document.querySelectorAll('.card').forEach(card => {
                    card.addEventListener('click', selectHandCoin);
                });
                document.querySelector(".confirmButton").addEventListener('click', addCoinsToHand);
                document.querySelector('#MoneyStacks').addEventListener('click', selectBankCoin);
            }
        });
}



