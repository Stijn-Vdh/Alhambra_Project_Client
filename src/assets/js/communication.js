"use strict";

function fetchFromServer(url, httpVerb, requestBody) {
    let options = {
    method: httpVerb,

    headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: `Bearer ${getGameID()}+${getPlayerName()}`,
},
    // Don't forget to add data to the body when needed
    body: JSON.stringify(requestBody)
};

    return fetch(url, options)
        .then((response) => {
        if (!response.ok) {
            console.error('%c%s','background-color: red;color: white','! An error occurred while calling the API');
            console.table(response);
        }
        return response.json();
    })
    .then((jsonresponseyouarelookingfor) => {
        return jsonresponseyouarelookingfor;
    });
}
