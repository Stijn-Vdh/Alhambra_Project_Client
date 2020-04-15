"use strict";

function showReserveOwnPlayer(e) {
    let idHidden = e.target.closest("div").firstChild.nextElementSibling;


    if (idHidden.id === 'reserveHidden'){
        console.log('true');
        idHidden.removeAttribute("id", "reserveHidden" );
    }
    else{
        idHidden.setAttribute("id", "reserveHidden");
    }
}
