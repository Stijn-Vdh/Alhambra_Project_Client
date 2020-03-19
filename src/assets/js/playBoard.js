"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    setMyAvatar();
    getGameDetails();
}

function getGameDetails() {
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            setOwnStartingCoins(response);
        });
}

function setMyAvatar() {
    let avatar = document.querySelector('#MyAvatar');
    avatar.innerHTML = `<img src="${localStorage.getItem("avatar")}" alt="myAvatar">`;
}

function getStartingCoins(response) {
    let playerDetails = response["players"];
    for (let i = 0; i < playerDetails.length; i++) {
        if (playerDetails[i]["name"] === localStorage.getItem("playerName")) {
            return playerDetails[i]["coins"];
        }
    }

}

function setOwnStartingCoins(response) {
    let coins = getStartingCoins(response);
    let hand = document.querySelector("#Hand");
    coins.forEach(coin => {
        hand.innerHTML += `<div class="card" id="${coin["currency"]}"><p>${coin["amount"]}</p></div>`
    });
}