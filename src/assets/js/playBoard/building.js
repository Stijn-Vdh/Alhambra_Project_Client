"use strict";



let selectedBuilding;



function getMarketBuildings(response) {
    let buildingStack = document.querySelector('#buildingStack');

    buildingStack.innerHTML = "";

    let buildings = response["market"]["buildingsOnBoard"];


    Object.keys(buildings).forEach(building => {
        if (buildings[building] != null) {
            let buildingContent = `<div class="buildingStackMarket" id="${building}">
            <div class="innerBuildingMarket" id="${buildings[building]["type"]}"></div>
            <div class="price"><p>${buildings[building]["cost"]}</p></div>
        </div>`;
            buildingStack.innerHTML += buildingContent;

            document.querySelectorAll('.innerBuildingMarket').forEach(building => {
                building.addEventListener('click', buyBuilding);

            })
        }
    });

}

function buyBuilding(e) {

    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/buildings-in-hand`,
        'POST',
        {
            currency: `${selectBuilding(e)}`,
            coins: selectedCoins
        })
        .then(function () {
            selectedCoins = [];

            document.querySelector("#PlayBoard").removeEventListener('click', removeCardFromCity);

            fetchFromServer(`${config.root}games/${getGameID()}`,
                'GET')
                .then(function (response) {
                    for (let i = 0;i<response['players'].length;i++){
                        if (response['players'][i]['name'] === getPlayerName()) {

                            let walls = response['players'][i]['buildings-in-hand'][0]['walls'];

                            fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/city/locations?north=${walls['north'] === true ? 'true' : 'false'}&east=${walls['east'] === true ? 'true' : 'false'}&south=${walls['south'] === true ? 'true' : 'false'}&west=${walls['west'] === true ? 'true' : 'false'}`,
                                'GET')
                                .then(function (response) {
                                    for (let i = 0; i < response.length; i++) {
                                        document.querySelector(`.vak${response[i]['row'] + 3}${response[i]['col'] + 3}`).classList.add('highlight');
                                    }
                                });

                            document.querySelector(".ownPlayerReserveButton").addEventListener('click', placeBuildingInReserve);
                            document.querySelector(".ownPlayerReserveButton").classList.add('highlight');
                            document.querySelector("#PlayBoard").addEventListener('click', placeBuildingInCity);

                        }
                    }

                });

        });

}

function selectBuilding(e) {
    let currency = e.path[1].id;

    fetchFromServer(`${config.root}games/${getGameID()}`, 'GET')
        .then(function (response) {
            selectedBuilding = response.market[currency];
        });

    return currency;
}







