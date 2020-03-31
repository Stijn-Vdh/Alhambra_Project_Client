"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    setMyAvatar();
    getGameDetails();
    document.querySelector('#MoneyStacks').addEventListener('click', addMoneyCardToOwnStack);
}


function getGameDetails() {
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            console.log(response);
            setOwnStartingCoins(response);
            loadEnemyPlayers(response.players);
            getBankCards();
            getMarketBuildings(response);
            focusActivePlayer(response.currentPlayer);

            if (!(response.currentPlayer === getPlayerName())) {
                setTimeout(function () { getGameDetails(); }, 1500);
            } else {
                setTimeout(focusMe, 1500);
            }

        });
}

function setMyAvatar() {
    const avatar = document.querySelector('#MyAvatar');
    const avatarURL = "../" + getAvatarFromStorage();
    avatar.innerHTML = `<img src="${avatarURL}" alt="myAvatar">`;
}

function setOwnStartingCoins(response) {
    const coins = getStartingCoins(response);
    const hand = document.querySelector("#Hand");
    hand.innerHTML = "";
    let i = 0;
    coins.forEach(coin => {
        hand.innerHTML += `<div class="card ${coin["currency"]}" id="${i}"><p>${coin["amount"]}</p></div>`;

        document.querySelectorAll('.card').forEach(card =>{
            card.addEventListener('click',selectCard);
        });
        i++;
    });
}

function getStartingCoins(response) {
    const playerDetails = response["players"];
    for (let i = 0; i < playerDetails.length; i++) {
        if (playerDetails[i]["name"] === localStorage.getItem("playerName")) {
            return playerDetails[i]["coins"];
        }
    }
    return null;
}


function addMoneyCardToOwnStack(e) {

    let index = e.target.closest('div').id.charAt(10);
    index--;
    console.log(index);
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            for (let i = 0; i < response["bank"].length; i++) {
                if (i === index) {
                    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}/players/${localStorage.getItem("playerName")}/money`,
                        'POST',
                        [{currency: `${response["bank"][i]["currency"]}`, amount: `${response["bank"][i]["amount"]}`}])
                        .then(function () {
                            getBankCards();
                            getGameDetails();
                        });
                }
            }
        });

}

function loadEnemyPlayers(players) {

    let enemyPlayersHtml = document.querySelector('.EnemyPlayers');
    enemyPlayersHtml.innerHTML = "";
    players.forEach(player => {
        if (player.name !== getPlayerName()) {
            let EnemyCard = `<div class="EnemyCard" id="${player.name}">
            <div class="EnemyBoard">
                <!-- enemy playboard -->
            </div>
            <div class="EnemyReserve">
                <!-- enemy reserve stack -->
                <button class="dropDownButton">Reserve</button>
                <div id="ReserveEnemy1">
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                </div>
            </div>
            <div class="EnemyIcon">
                <!-- enemy icon -->
            </div>
            <div class="EnemyScore">
                <!-- enemy score -->
                <p id="Score${player.name}">${player.score}</p>
            </div>
        </div>`;
            enemyPlayersHtml.innerHTML += EnemyCard;
        }

    });

}

function getBankCards() {

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

function focusActivePlayer(player) {
    let playerCard = document.querySelector(`#${player} .EnemyBoard`);

    document.querySelectorAll('div').forEach(tag => {
        tag.classList.remove("currentPlayer");
    });

    playerCard.classList.add('currentPlayer');

}

function focusMe() {
    let playerCard = document.querySelector(`#MyAvatar`);

    document.querySelectorAll('div').forEach(tag => {
        tag.classList.remove("currentPlayer");
    });

    playerCard.classList.add('currentPlayer');
}

function getMarketBuildings(response) {
    let buildingStack = document.querySelector('#buildingStack');

    buildingStack.innerHTML = "";

    let buildings = response["market"];
    console.log(buildings);

    Object.keys(buildings).forEach(building => {
        if (buildings[building] != null){
            let buildingContent = `<div class="buildingStackMarket" id="${building}">
            <div class="innerBuildingMarket" id="${buildings[building]["type"]}"></div>
            <div class="price"><p>${buildings[building]["cost"]}</p></div>
        </div>`;
            buildingStack.innerHTML += buildingContent;

            document.querySelectorAll('.innerBuildingMarket').forEach(building =>{
                building.addEventListener('click',buyBuilding);
            })
        }
    });

}
