"use strict";

document.addEventListener('DOMContentLoaded', init);
let scoringRoundOnePassed = false;
let scoringRoundTwoPassed = false;

function init() {
    document.querySelector('span.close').addEventListener('click',closePopup);
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
            setBankCoins(response);
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
                window.location.href = "endScreen.html";
            }

            if (response.scoringRound1 && !scoringRoundOnePassed){
                scoringRoundOnePassed = true;
                document.querySelector('.Popup').classList.remove('hidden');
                loadScoringRound(response);
            }
            if (response.scoringRound2 && !scoringRoundTwoPassed){
                scoringRoundTwoPassed = true;
                document.querySelector('.Popup').classList.remove('hidden');
                loadScoringRound(response);
            }
        });
}
function closePopup() {
    document.querySelector('.Popup').classList.add('hidden');

}

function leaveGame() {
    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}`, `DELETE`)
        .then(function () {
            removeGameID();
            localStorage.removeItem('selectedReserve');
            window.location.href = "../mainMenu.html";
        });
}

function loadScoringRound(response) {
    let popup = document.querySelector('.Popup');
    let popupBody = popup.querySelector('.popup-body');
    popupBody.innerHTML = "";
    let players = response['players'];
    players.forEach(player => {
        let roundCard = `<div class="scoringCard">
                            <h3>${player.name}</h3><br>
                            <p>scored ${player['virtualScore']} points</p><br>
                            <p class="popupContentLine">current score : ${player['score']}</p><br>`;

        let buildings = `
                        <p>Buildings bought:</p>
                         <div id="buildTypes">
                            <p>Pavilion:</p>
                            <p>Seraglio:</p>
                            <p>Arcades:</p>
                            <p>Chambers:</p>
                            <p>Garden:</p>
                            <p>Tower:</p>
                         </div>
                         <div class="buildingAmount">
                            <p> ${player['buildingTypesInCity']['pavilion']}</p>
                            <p> ${player['buildingTypesInCity']['seraglio']}</p>
                            <p> ${player['buildingTypesInCity']['arcades']}</p>
                            <p> ${player['buildingTypesInCity']['chambers']}</p>
                            <p> ${player['buildingTypesInCity']['garden']}</p>
                            <p> ${player['buildingTypesInCity']['tower']}</p>
                        </div>
                       </div>
`;

        popupBody.innerHTML += roundCard + buildings;
    });

}
