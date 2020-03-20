"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
    setCurrentPage();
    let avatars = document.querySelectorAll(".avatar img");
    avatars.forEach(function(avatar){
        avatar.addEventListener("click", setAvatarInStorage);
    })
}



