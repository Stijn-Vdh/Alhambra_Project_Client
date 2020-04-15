"use strict";

document.addEventListener('DOMContentLoaded', init);


function init() {

    setMyAvatar();
    getGameDetails();
    loadCity();
    document.querySelector('#MoneyStacks').addEventListener('click', addCoinsToHand);
    document.querySelector("#PlayBoard").addEventListener('click', placeBuilding);
    document.querySelector(".ownPlayerReserveButton").addEventListener('click', showReserveOwnPlayer);
}

function getGameDetails() {
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {

            setHandCoins(response);
            loadOpponents(response.players);
            getBankCoins();
            getMarketBuildings(response);
            focusActivePlayer(response.currentPlayer);

            if (!(response.currentPlayer === getPlayerName())) {
                document.querySelectorAll('.card').forEach(card => {
                    card.removeEventListener('click', selectHandCoin);
                });
                setTimeout(function () {
                    getGameDetails();
                }, 1500);
            } else {
                document.querySelectorAll('.card').forEach(card => {
                    card.addEventListener('click', selectHandCoin);
                });
            }
        });
}



