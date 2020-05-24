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
        if (player['name'] !== getPlayerName()) {
            let EnemyCard = `<div class="EnemyCard" id="${player['name']}">
                                <div class="EnemyBoard" id="alhambra${player['name']}"></div>
                                <p class="nameTag">${player['name']}</p>
                                <div class="EnemyScore">
                                    <p id="Score${player['name']}">${player['score']}</p>
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
    let alhambra = document.querySelector(`#alhambra${player['name']}`);
    let sizeBoard = 7;
    let city = player["city"]["board"];

    alhambra.innerHTML = "";

    for(let row = 0; row < sizeBoard; row++){
        for (let col = 0; col < sizeBoard; col++){
            let html = `<div class="plateBuilding ${player['name']}grid${row}${col}"></div>`;
            alhambra.innerHTML += html;
        }
    }

    for (let row = 0; row < city.length; row++){
        for (let col = 0; col < city[row].length; col++){
            if (city[row][col] !== null){
                let buildingGridHtml = document.querySelector(`.${player['name']}grid${row+((sizeBoard-city.length)/2)}${col+((sizeBoard-city.length)/2)}`);
                buildingGridHtml.setAttribute('class', `${getColorFromImage(city[row][col])}`);
                loadOpponentWalls(buildingGridHtml,city[row][col]);
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
        case 'seraglio':
            return 'red';
        case 'tower':
            return 'purple';
        default:
            return 'grey';
    }
}

function loadOpponentWalls(html, building){
    let walls = building['walls'];
    if (walls['north']){
        html.classList.add('opponentNorth');
    }
    if (walls['south']){
        html.classList.add('opponentSouth');
    }
    if (walls['east']){
        html.classList.add('opponentEast');
    }
    if (walls['west']){
        html.classList.add('opponentWest');
    }
    return html;
}
