"use strict";

document.addEventListener('DOMContentLoaded', init);

function init(){
    
}
function buyBuilding(e){

    let currency = e.path[1].id;

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {

            console.log(response.market[currency]);

        });

}