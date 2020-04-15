"use strict";

function showReserveOwnPlayer(e) {
    const idHidden = e.target.closest("div").firstChild.nextElementSibling;


    if (idHidden.id === 'reserveHidden'){
        console.log('true');
        idHidden.removeAttribute("id", "reserveHidden" );
    }
    else{
        idHidden.setAttribute("id", "reserveHidden");
    }
}

// function placeBuildingInReserve(e) {
//
//     const selectedSpaceHTML = (e.target.closest('div'));
//     fetchFromServer(`${config.root}games/${getGameID()}`,
//         'GET')
//         .then(function (response) {
//             for (let i = 0; i < response['players'].length; i++) {
//                 if (response['players'][i]['name'] === getPlayerName()) {
//                     selectedSpaceHTML.setAttribute('id', `${response['players'][i]["buildings-in-hand"][0]["type"]}`);
//
//                     // fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/reserve`,
//                     //     'POST',
//                     //     {
//                     //         "building": response['players'][i]["buildings-in-hand"][0]
//                     //     })
//                     //     .then(function () {
//
//
//                             addBuildingToReserve();
//                             loadCity();
//                             getGameDetails();
//                         });
//                 }
//             }
//
//
//         });
// }
//
//
// function addBuildingToReserve(e) {
//     let reserveBuildings = document.querySelector("ownPLayerReserveTiles");
//     reserveBuildings.innerHTML = "";
//     fetchFromServer(`${config.root}games/${getGameID()}/players/${getPlayerName()}/reserve`,
//         'GET')
//         .then(function (response) {
//             for (let i=0; i<response.length; i++){
//                 reserveBuildings.innerHTML += `<div class="innerBuilding" >${response[i]}</div>`
//             }
//         });
//
// }