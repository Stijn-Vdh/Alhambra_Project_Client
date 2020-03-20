"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    setMyAvatar();
    getGameDetails();
    getBankCards();
    document.querySelector('#MoneyStacks').addEventListener('click', addMoneyCardToOwnStack)
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

function setOwnStartingCoins(response) {
    let coins = getStartingCoins(response);
    let hand = document.querySelector("#Hand");
    coins.forEach(coin => {
        hand.innerHTML += `<div class="card ${coin["currency"]}"><p>${coin["amount"]}</p></div>`
    });
}

function getStartingCoins(response) {
    let playerDetails = response["players"];
    for (let i = 0; i < playerDetails.length; i++) {
        if (playerDetails[i]["name"] === localStorage.getItem("playerName")) {
            return playerDetails[i]["coins"];
        }
    }

}


function addMoneyCardToOwnStack(e){
   console.log(e.target.closest('div').id);
   
    /*fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}/players/${localStorage.getItem("playerName")}`, 'GET')
        .then(function (response) {
            test = response;
        });*/
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            console.log(response["bank"].length);
        });


}

function getBankCards(){

    let bank = document.querySelector("#MoneyStacks");

    let counter = 1;

    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            for (let i = 0; i < response["bank"].length; i++) {
                    bank.innerHTML += `<div class="${response["bank"][i]["currency"]}" id="MoneyStack${counter}"><p>${response["bank"][i]["amount"]}</p></div>`;
                    counter++;
            }
        });


}