"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
    let avatars = document.querySelectorAll(".avatar img");
    avatars.forEach(function(avatar){
        avatar.addEventListener("click", setAvatarInStorage);
    })
}

function setAvatarInStorage(e){
    let selectedAvatar = e.target;
    localStorage.setItem("avatar", selectedAvatar.getAttribute("src"));
    window.location.href = ("index.html");
}

