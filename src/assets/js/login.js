"use strict";

document.addEventListener('DOMContentLoaded', init);

function init(){
    setAvatar();
    document.querySelector("#avatar").addEventListener("click", selectAvatar);
    document.querySelector('form').addEventListener("submit", goToMainMenu);
}

function getAvatarFromStorage(){
    let avatarInStorage = localStorage.getItem("avatar");
    if (avatarInStorage === null){
        localStorage.setItem("avatar", "assets/media/Avatars/Avatar1.png");
        return "assets/media/Avatars/Avatar1.png"
    }
    return avatarInStorage;
}

function selectAvatar(){
    window.location.href = "AvatarSelection.html";
}

function setAvatar(){
    let avatarURl = getAvatarFromStorage();
    document.querySelector("#avatar").innerHTML = `<img src="${avatarURl}" alt="avatar" title="avatar">`
}

function goToMainMenu(e){
    e.preventDefault();
    let playerName = document.querySelector("#username").value;
    localStorage.setItem("playerName", playerName);
    window.location.href = "main_menu.html"
}


