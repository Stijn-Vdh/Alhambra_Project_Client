"use strict";

function loadCity() {

    let city = document.querySelector("#PlayBoard");
    const sizeBoard = 7;
    city.innerHTML = "";

    generateGridHtml(city, sizeBoard);

    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {

            for (let i = 0; i < response['players'].length; i++) {
                if (response['players'][i]['name'] === getPlayerName()) {
                    city = response['players'][i]["city"]["board"];
                    loadOwnAlhambra(city, sizeBoard);
                }
            }
        });
    loadReserve();
}

function loadOwnAlhambra(city, sizeBoard) {
    for (let row = 0; row < city.length; row++) {
        for (let col = 0; col < city[row].length; col++) {
            if (city[row][col] != null) {
                const building = city[row][col];
                let html = document.querySelector(`.vak${row + ((sizeBoard - city.length) / 2)}${col + ((sizeBoard - city.length) / 2)}`);
                html.setAttribute('id', `${building['type']}`);
                loadWalls(html, building);
            }
        }
    }
}

function generateGridHtml(city, sizeBoard) {
    for (let row = 0; row < sizeBoard; row++) {
        for (let col = 0; col < sizeBoard; col++) {
            const html = `<div class="plateBuilding innerBuildingCity vak${row}${col}"></div>`;
            city.innerHTML += html;
        }
    }
}

function placeBuildingInCity(e) {

    const selectedSpaceHTML = (e.target.closest('div'));

    const row = selectedSpaceHTML.classList[2].charAt(3) - 3;
    const col = selectedSpaceHTML.classList[2].charAt(4) - 3;

    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {
            for (let i = 0; i < response['players'].length; i++) {
                if (response['players'][i]['name'] === getPlayerName()) {
                    const building = response['players'][i]["buildingsInHand"][0];
                    fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/city`,
                        'POST',
                        {
                            "building": response['players'][i]["buildingsInHand"][0],
                            "location": {
                                "row": row,
                                "col": col
                            }
                        })
                        .then(function () {
                            loadCity();
                            getGameDetails();
                            selectedSpaceHTML.setAttribute('id', `${building["type"]}`);
                            document.querySelector(".ownPlayerReserveButton").removeEventListener('click', placeBuildingInReserve);
                            document.querySelector(".ownPlayerReserveButton").classList.remove('highlight');
                            document.querySelector("#PlayBoard").removeEventListener('click', placeBuildingInCity);
                        });
                }
            }
        });
}

function loadWalls(html, building) {
    const walls = building['walls'];
    if (walls['north']) {
        html.classList.add('north');
    }
    if (walls['south']) {
        html.classList.add('south');
    }
    if (walls['east']) {
        html.classList.add('east');
    }
    if (walls['west']) {
        html.classList.add('west');
    }
    return html;
}
