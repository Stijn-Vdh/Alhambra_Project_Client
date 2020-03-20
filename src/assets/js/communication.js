"use strict";

function fetchFromServer(url, httpVerb, requestBody){
    let options= {};
    options.method = httpVerb;

    options.headers = {};
    options.headers["Content-Type"] = "application/json";

    options.headers["Authorization"] ="Bearer " + getGameID() + '+' + getPlayerName();

    // Don't forget to add data to the body when needed
    options.body = JSON.stringify(requestBody);

    return fetch(url, options)
        .then((response) => {
        if (!response.ok) {
            console.error('%c%s','background-color: red;color: white','! An error occurred while calling the API');
            console.table(response);
        }
        return response.json();
    })
    .then((jsonresponseyouarelookingfor) => {
        return jsonresponseyouarelookingfor
    })
}
