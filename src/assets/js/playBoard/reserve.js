"use strict";

function showReserveOwnPlayer(e) {
    const riseUp = e.target.closest("div").firstChild.nextElementSibling;

    if (riseUp.id === 'reserveHidden') {
        riseUp.removeAttribute("id", "reserveHidden");
    } else {
        riseUp.setAttribute("id", "reserveHidden");
        loadCity();
        document.querySelector("#PlayBoard").removeEventListener('click', addReserveTileToCity);
        document.querySelector("#PlayBoard").addEventListener('click', removeCardFromCity);
    }
}

function placeBuildingInReserve() {

    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {
            for (let i = 0; i < response['players'].length; i++) {
                if (response['players'][i]['name'] === getPlayerName()) {

                    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/city`,
                        'POST',
                        {
                            "building": response['players'][i]["buildingsInHand"][0],
                            "location": null

                        })
                        .then(function () {
                            loadCity();
                            getGameDetails();
                            document.querySelector(".ownPlayerReserveButton").removeEventListener('click', placeBuildingInReserve);
                            document.querySelector(".ownPlayerReserveButton").classList.remove('highlight');
                            document.querySelector("#PlayBoard").removeEventListener('click', placeBuildingInCity);
                        });
                }
            }


        });
}

function loadReserve() {
    let htmlOwnReserve = document.querySelector(".ownPlayerReserveTiles");

    htmlOwnReserve.innerHTML = "";

    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {
            for (let i = 0; i < response['players'].length; i++) {
                if (response['players'][i]['name'] === getPlayerName()) {

                    for (let r = 0; r < response['players'][i]['reserve'].length; r++) {
                        let building = response['players'][i]['reserve'][r];
                        htmlOwnReserve.innerHTML += `<div class="innerBuilding reserve${r + 1}" id="${building['type']}"></div>`;
                        let buildingHTML = htmlOwnReserve.querySelector(`.reserve${r + 1}`);
                        buildingHTML = loadWalls(buildingHTML, building);
                    }
                }
            }
        });
}

function selectedReserveBuilding(e) {
    document.querySelector("#PlayBoard").removeEventListener('click', removeCardFromCity);
    document.querySelector("#PlayBoard").addEventListener('click', addReserveTileToCity);
    loadCity();

    let building = e.target.closest('div').className.charAt(21) - 1;

    let walls = '';

    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {
            for (let i = 0; i < response['players'].length; i++) {
                if (response['players'][i]['name'] === getPlayerName()) {
                    setSelectedReserveInStorage(response['players'][i]['reserve'][building]);
                    walls = response['players'][i]['reserve'][building]['walls'];
                }
            }

            fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/city/locations?north=${walls['north'] === true ? 'true' : 'false'}&east=${walls['east'] === true ? 'true' : 'false'}&south=${walls['south'] === true ? 'true' : 'false'}&west=${walls['west'] === true ? 'true' : 'false'}`,
                'GET')
                .then(function (response) {
                    for (let i = 0; i < response.length; i++) {
                        let offset = 3;
                        document.querySelector(`.vak${response[i]['row'] + offset}${response[i]['col'] + offset}`).classList.add('highlight');
                    }
                });

        });


}

function addReserveTileToCity(e) {
    let selectedSpaceHTML = (e.target.closest('div'));
    let row = selectedSpaceHTML.classList[2].charAt(3) - 3;
    let col = selectedSpaceHTML.classList[2].charAt(4) - 3;

    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/city`,
        'PATCH',
        {
            "building": getSelectedReserveFromStorage(),
            "location": {
                "row": row,
                "col": col
            }
        })
        .then(function () {
            loadCity();
            getGameDetails();
        });

}

function removeCardFromCity(e) {
    let selectedSpaceHTML = (e.target.closest('div'));
    let offset = 3;
    let row = selectedSpaceHTML.classList[2].charAt(3) - offset;
    let col = selectedSpaceHTML.classList[2].charAt(4) - offset;

    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {
            for (let i = 0; i < response['players'].length; i++) {
                if (response['players'][i]['name'] === getPlayerName()) {

                    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/city`,
                        'PATCH',
                        {
                            "location": {
                                "row": row,
                                "col": col
                            }
                        })
                        .then(function () {
                            loadCity();
                            getGameDetails();
                        });
                }
            }
        });
}
