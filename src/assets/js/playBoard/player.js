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
            <div class="EnemyBoard" id="alhambra${player.name}">
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
                <button class="dropDownButton">Reserve</button>
            </div>
            <div class="EnemyIcon">
                <!-- enemy icon -->
            </div>
            <div class="EnemyScore">
                <!-- enemy score -->
                <p id="Score${player.name}">${player['score']}</p>
            </div>
        </div>`;
            enemyPlayersHtml.innerHTML += EnemyCard;
            loadOpponentAlhambra(player);
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

function loadOpponentAlhambra(player){
    let alhambra = document.querySelector(`#alhambra${player.name}`);
    let sizeBoard = 7;
    let city = player["city"]["board"];


    alhambra.innerHTML = "";

    for(let r = 0; r < sizeBoard; r++){
        for (let  c= 0; c < sizeBoard; c++){
            let html = `<div class="plateBuilding grid${r}${c}"></div>`;
            alhambra.innerHTML += html;
        }
    }


    for (let i = 0; i<city.length; i++){
        for (let j = 0; j < city[i].length;j++){
            if (city[i][j] != null){
                document.querySelector(`.grid${i+((sizeBoard-city.length)/2)}${j+((sizeBoard-city.length)/2)}`).setAttribute('class', `${getColorFromImage(city[i][j])}`);
            }
        }
    }
}

function getColorFromImage(image){
    switch (image["type"]) {
        case 'arcades':
            return 'brown';
        case 'chambers':
            return 'white';
        case 'garden':
            return 'green';
        case 'pavilion':
            return 'blue';
        case 'serglio':
            return 'red';
        case 'tower':
            return 'purple';
        default:
            return 'grey';
    }
}
