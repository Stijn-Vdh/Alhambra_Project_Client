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

            if (response.scoringRound1 && !scoringRoundOnePassed){
                scoringRoundOnePassed = true;
                document.querySelector('.Popup').classList.remove('hidden');
                loadScoringRound1(response);
            }
            if (response.scoringRound2 && !scoringRoundTwoPassed){
                scoringRoundTwoPassed = true;
                document.querySelector('.Popup').classList.remove('hidden');
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

function loadScoringRound1(response) {
    let popup = document.querySelector('.Popup');
    let popupBody = popup.querySelector('.popup-body');
    popupBody.innerHTML = "";
    let players = response['players'];
    players.forEach(player => {
        let roundCard = `<div class="scoringCard">
                            <h3>${player.name}</h3><br>
                            <p>scored ${player['virtualScore']} points</p><br>`;

        let buildings = `<hr>
                         <p>Pavilion: ${player['buildingTypesInCity']['pavilion']}</p>
                         <p>Seraglio: ${player['buildingTypesInCity']['seraglio']}</p>
                         <p>Arcades: ${player['buildingTypesInCity']['arcades']}</p>
                         <p>Chambers: ${player['buildingTypesInCity']['chambers']}</p>
                         <p>Garden: ${player['buildingTypesInCity']['garden']}</p>
                         <p>Tower: ${player['buildingTypesInCity']['tower']}</p></div>
`;

        popupBody.innerHTML += roundCard + buildings;
    });

}
