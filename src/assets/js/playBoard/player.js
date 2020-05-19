"use strict";

function setMyAvatar() {
    const avatar = document.querySelector('#MyAvatar');
    const avatarURL = "../" + getAvatarFromStorage();
    avatar.innerHTML = `<img src="${avatarURL}" alt="myAvatar">`;
}

function loadOpponents(players) {

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
                    <div class="ReserveEnemy" id="reserveHidden">
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                    <div class="innerBuilding"></div>
                </div>
                <button class="dropDownButton">${player.name}</button>
            </div>
            <div class="EnemyScore">
                <!-- enemy score -->
                <p id="Score${player.name}">${player['score']}</p>
            </div>
        </div>`;
            enemyPlayersHtml.innerHTML += EnemyCard;
        }
        else{
            document.querySelector('.Score #MyScore').innerHTML = player['score'];
        }

    });

}

function focusActivePlayer(player) {
    let playerCard;

    if (player === getPlayerName()) {
        playerCard = document.querySelector(`#me`);
    } else {
        playerCard = document.querySelector(`#${player} .EnemyBoard`);
    }

    addCurrentPlayerTag(playerCard);
}

function addCurrentPlayerTag(playerCard) {
    document.querySelectorAll('div').forEach(tag => {
        tag.classList.remove("currentPlayer");
    });
    playerCard.classList.add('currentPlayer');
}
