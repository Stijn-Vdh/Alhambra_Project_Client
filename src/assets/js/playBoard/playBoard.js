"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    setMyAvatar();
    getGameDetails();
    getBankCards();
    document.querySelector('#MoneyStacks').addEventListener('click', addMoneyCardToOwnStack);
}

function getGameDetails() {
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            setOwnStartingCoins(response);
        });
}

function setMyAvatar() {
    const avatar = document.querySelector('#MyAvatar');
    const avatarURL = "../" + getAvatarFromStorage();
    avatar.innerHTML = `<img src="${avatarURL}" alt="myAvatar">`;
}

function setOwnStartingCoins(response) {
    const coins = getStartingCoins(response);
    const hand = document.querySelector("#Hand");
    hand.innerHTML = "";
    coins.forEach(coin => {
        hand.innerHTML += `<div class="card ${coin["currency"]}"><p>${coin["amount"]}</p></div>`;
    });
}

function getStartingCoins(response) {
    const playerDetails = response["players"];
    for (let i = 0; i < playerDetails.length; i++) {
        if (playerDetails[i]["name"] === localStorage.getItem("playerName")) {
            return playerDetails[i]["coins"];
        }
    }
    return null;
}


function addMoneyCardToOwnStack(e){

   let index = e.target.closest('div').id.charAt(10);
   index--;
   console.log(index);
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            for (let i = 0; i < response["bank"].length; i++) {
                if (i === index){
                    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}/players/${localStorage.getItem("playerName")}/money`,
                        'POST',
                        [{currency: `${response["bank"][i]["currency"]}`,amount: `${response["bank"][i]["amount"]}`}])
                        .then(function () {
                            getBankCards();
                            getGameDetails();
                        });
                }
            }
        });

}

function getBankCards(){


    const bank = document.querySelector("#MoneyStacks");
    bank.innerHTML = "";
    let counter = 1;
    fetchFromServer(`${config.root}games/${localStorage.getItem("gameID")}`, 'GET')
        .then(function (response) {
            for (let i = 0; i < response["bank"].length; i++) {
                    bank.innerHTML += `<div class="${response["bank"][i]["currency"]}" id="MoneyStack${counter}"><p>${response["bank"][i]["amount"]}</p></div>`;
                    counter++;
            }
        });


}