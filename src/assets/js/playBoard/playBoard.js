"use strict";

document.addEventListener('DOMContentLoaded', init);


function init() {

    setMyAvatar();
    getGameDetails();
    loadCity();
    document.querySelector('#MoneyStacks').addEventListener('click', selectBankCoin);
    document.querySelector(".confirmButton").addEventListener('click', addCoinsToHand);
    document.querySelector("#PlayBoard").addEventListener('click', removeCardFromCity);
    document.querySelector(".ownPlayerReserveButton").addEventListener('click', showReserveOwnPlayer);
    document.querySelector(".ownPlayerReserveTiles").addEventListener('click', selectedReserveBuilding);
    document.querySelector("#exitButton").addEventListener('click', leaveGame);
}

function getGameDetails() {
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            console.log(response);
            setHandCoins(response);
            loadOpponents(response.players);
            setBankCoins();
            getMarketBuildings(response);
            focusActivePlayer(response.currentPlayer);

            let amountOfCoins = getAmountOfCoinsRemaining(response);
            let amountOfBuildings = getAmountOfBuildingsRemaining(response);
            document.querySelector('#RemainingBuildings').innerHTML = amountOfBuildings + " buildings remaining";
            document.querySelector('#RemainingCards').innerHTML = amountOfCoins + " coins remaining";

            if (!response.ended){
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
            }else{
                window.location.href = "playBoard/endScreen.html";
            }
        });
}

function leaveGame() {
    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}`, `DELETE`)
        .then(function () {
            removeGameID();
            window.location.href = "../mainMenu.html";
        });
}


