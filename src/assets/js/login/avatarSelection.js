"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
    const avatars = document.querySelectorAll(".avatar img");
    avatars.forEach(function(avatar){
        avatar.addEventListener("click", setAvatarInStorage);
    });
}



