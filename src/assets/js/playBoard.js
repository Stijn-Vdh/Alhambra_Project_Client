"use strict";

document.addEventListener('DOMContentLoaded',init);

function init() {
    let avatar = document.querySelector('#MyAvatar');
    avatar.innerHTML = `<img src="${localStorage.getItem("avatar")}" alt="myAvatar">`;
    console.log(avatar);
}