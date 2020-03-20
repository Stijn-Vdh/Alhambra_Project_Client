"use strict";

document.addEventListener('DOMContentLoaded', init);

function init(){
    setAvatar();
    insertUserName();
    document.querySelector("#avatar").addEventListener("click", selectAvatar);
    document.querySelector('form').addEventListener("submit", goToMainMenu);
}

function insertUserName(){
    document.querySelector("#username").value = getPlayerName();
}

function selectAvatar(){
    setPlayerName();
    window.location.href = "loginPage/avatarSelection.html";
}

function setAvatar(){
    let avatarURl = getAvatarFromStorage();
    document.querySelector("#avatar").innerHTML = `<img src="${avatarURl}" alt="avatar" title="avatar">`
}

function goToMainMenu(e){
    e.preventDefault();
    setPlayerName();
    window.location.href = "mainMenu.html"
}


