"use strict";

function setPlayerName(){
    let playerName = document.querySelector("#username").value;
    localStorage.setItem("playerName", playerName);
}

function getPlayerName() {
    return localStorage.getItem("playerName");
}

function setAvatarInStorage(e){
    let selectedAvatar = e.target;
    selectedAvatar = selectedAvatar.getAttribute("src");
    selectedAvatar = selectedAvatar.substring(3);
    localStorage.setItem("avatar", selectedAvatar);
    window.location.href = ("../index.html");
}

function getAvatarFromStorage(){
    let avatarInStorage = localStorage.getItem("avatar");
    if (avatarInStorage === null){
        localStorage.setItem("avatar", "assets/media/Avatars/Avatar1.png");
        return "assets/media/Avatars/Avatar1.png"
    }
    return avatarInStorage;
}

function setPreviousPage(page) {
    localStorage.setItem('previousPage', page)
}
function setCurrentPage() {
    localStorage.setItem('CurrentPage', 'lobby.html')
}