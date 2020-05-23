"use strict";

function getMarketBuildings(response) {
    let buildingStack = document.querySelector('#buildingStack');
    buildingStack.innerHTML =  "";
    let buildings = response["market"]["buildingsOnBoard"];


    Object.keys(buildings).forEach(building => {
        if (buildings[building] != null) {
            let buildingContent = `<div class="buildingStackMarket" id="${building}">
            <div class="innerBuildingMarket" id="${buildings[building]["type"]}"></div>
            <div class="price"><p>${buildings[building]["cost"]}</p></div>
        </div>`;

            buildingStack.innerHTML += buildingContent;

            let html = document.querySelector(`#${building}`);
            html = html.querySelector(`#${buildings[building]["type"]}`);

            loadWalls(html, buildings[building]);

            document.querySelectorAll('.innerBuildingMarket').forEach(building => {
                building.addEventListener('click', buyBuilding);

            })
        }

    });
}

function buyBuilding(e) {
    let correctCurrency = false;
    selectedCoins.forEach(coin => {
        if (coin['currency'] === selectBuildingCurrency(e)){
            correctCurrency = true;
        }
    });
    if (correctCurrency){
        try{
            fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/buildings-in-hand`,
                'POST',
                {
                    currency: `${selectBuildingCurrency(e)}`,
                    coins: selectedCoins
                })
                .then(function () {
                    selectedCoins = [];

                    document.querySelector("#PlayBoard").removeEventListener('click', removeCardFromCity);
                    getHighlightedBuildPositions();
                });
        }catch(err)
        {
            alert(err.message);
        }
    }
}

function getHighlightedBuildPositions() {
    let player;
    let buildingsInHand;
    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {
            for (let i = 0; i < response['players'].length; i++) {
                if (response['players'][i]['name'] === getPlayerName()) {

                    player = response['players'][i];
                    buildingsInHand = player['buildingsInHand'];

                    console.log(player);
                    console.log(buildingsInHand);

                    let walls = buildingsInHand[0]['walls'];

                    document.querySelector(".ownPlayerReserveButton").addEventListener('click', placeBuildingInReserve);
                    document.querySelector(".ownPlayerReserveButton").classList.add('highlight');

                    document.querySelector("#PlayBoard").addEventListener('click', placeBuildingInCity);
                    highlightBuildPlaces(walls);
                }
            }
        });
}

function highlightBuildPlaces(walls){
    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/city/locations?north=${walls['north'] === true ? 'true' : 'false'}&east=${walls['east'] === true ? 'true' : 'false'}&south=${walls['south'] === true ? 'true' : 'false'}&west=${walls['west'] === true ? 'true' : 'false'}`,
        'GET')
        .then(function (response) {
            for (let i = 0; i < response.length; i++) {
                document.querySelector(`.vak${response[i]['row'] + 3}${response[i]['col'] + 3}`).classList.add('highlight');
            }
        });
}

function selectBuildingCurrency(e) {
    return e.target.parentNode.id;
}

function getAmountOfBuildingsRemaining(response) {
    return response["market"]["amountOfBuildings"]
}







