"use strict";

function showReserveOwnPlayer(e) {
    const idHidden = e.target.closest("div").firstChild.nextElementSibling;


    if (idHidden.id === 'reserveHidden'){
        idHidden.removeAttribute("id", "reserveHidden" );
    }
    else{
        idHidden.setAttribute("id", "reserveHidden");
        loadCity();
        document.querySelector("#PlayBoard").removeEventListener('click', addReserveTileToCity);
        document.querySelector("#PlayBoard").addEventListener('click', removeCardFromCity);
    }
}

function placeBuildingInReserve() {

    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {
            for (let i = 0;i<response['players'].length;i++){
                if (response['players'][i]['name'] === getPlayerName()){

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


    htmlOwnReserve.innerHTML = '';

     fetchFromServer(`${config.root}games/${getGameID()}`,
         'GET')
         .then(function (response) {
             for (let i = 0;i<response['players'].length;i++){
                 if (response['players'][i]['name'] === getPlayerName()) {

                     for (let r = 0;r < response['players'][i]['reserve'].length;r++){
                         let building = response['players'][i]['reserve'][r];
                         htmlOwnReserve.innerHTML += `<div class="innerBuilding reserve${r+1}" id="${building['type']}"></div>`;
                         let html = htmlOwnReserve.querySelector(`.reserve${r+1}`);
                         html = loadWalls(html, building);
                     }
                 }
             }
         });
 }

 function selectedReserveBuilding(e) {

     document.querySelector("#PlayBoard").removeEventListener('click', removeCardFromCity);
     document.querySelector("#PlayBoard").addEventListener('click', addReserveTileToCity);

     loadCity();

    let building = e.target.closest('div').className.charAt(21)-1;

    let walls = '';

     fetchFromServer(`${config.root}games/${getGameID()}`,
         'GET')
         .then(function (response) {
             for (let i = 0;i<response['players'].length;i++){
                 if (response['players'][i]['name'] === getPlayerName()) {
                     setSelectedReserveInStorage(response['players'][i]['reserve'][building]);
                     walls = response['players'][i]['reserve'][building]['walls'];
                 }
             }



            fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/city/locations?north=${walls['north'] === true ? 'true' : 'false'}&east=${walls['east'] === true ? 'true' : 'false'}&south=${walls['south'] === true ? 'true' : 'false'}&west=${walls['west'] === true ? 'true' : 'false'}`,
                 'GET')
                 .then(function (response) {
                     for (let i = 0; i < response.length; i++) {
                         document.querySelector(`.vak${response[i]['row'] + 3}${response[i]['col'] + 3}`).classList.add('highlight');
                     }
                 });

         });



 }

 function addReserveTileToCity(e) {

     let selectedSpaceHTML = (e.target.closest('div'));

     let row = selectedSpaceHTML.classList[2].charAt(3)-3;
     let col = selectedSpaceHTML.classList[2].charAt(4)-3;

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

function removeCardFromCity(e){

    let selectedSpaceHTML = (e.target.closest('div'));

    let row = selectedSpaceHTML.classList[2].charAt(3)-3;
    let col = selectedSpaceHTML.classList[2].charAt(4)-3;


    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {
            for (let i = 0;i<response['players'].length;i++){
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