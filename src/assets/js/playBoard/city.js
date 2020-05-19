"use strict";

let city = [];

function loadCity(){

    let city = document.querySelector("#PlayBoard");
    let sizeBoard = 7;
    city.innerHTML = "";

    for(let r = 0; r < sizeBoard; r++){
        for (let  c= 0; c < sizeBoard; c++){
            let html = `<div class="plateBuilding innerBuildingCity vak${r}${c}"></div>`;
            city.innerHTML += html;
        }
    }


    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {


            console.log(response["players"][1]["city"]["board"]);
            for (let i = 0;i<response['players'].length;i++){
                if (response['players'][i]['name'] === getPlayerName()){
                    city = response['players'][i]["city"]["board"];
                    for (let i = 0; i<city.length; i++){
                        for (let j = 0; j < city[i].length;j++){
                            if (city[i][j] != null){
                                document.querySelector(`.vak${i+((sizeBoard-city.length)/2)}${j+((sizeBoard-city.length)/2)}`).setAttribute('id', `${city[i][j]['type']}`);
                            }
                        }
                    }

                    }
                }
        });

    loadReserve();

}

function placeBuildingInCity(e) {

    let selectedSpaceHTML = (e.target.closest('div'));

    let row = selectedSpaceHTML.classList[2].charAt(3)-3;
    let col = selectedSpaceHTML.classList[2].charAt(4)-3;

    fetchFromServer(`${config.root}games/${getGameID()}`,
        'GET')
        .then(function (response) {
            for (let i = 0;i<response['players'].length;i++){
                if (response['players'][i]['name'] === getPlayerName()){
                    selectedSpaceHTML.setAttribute('id', `${response['players'][i]["buildingsInHand"][0]["type"]}`);

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
                            document.querySelector(".ownPlayerReserveButton").removeEventListener('click', placeBuildingInReserve);
                            document.querySelector(".ownPlayerReserveButton").classList.remove('highlight');
                            document.querySelector("#PlayBoard").removeEventListener('click', placeBuildingInCity);
                        });
                }
            }


        });

}