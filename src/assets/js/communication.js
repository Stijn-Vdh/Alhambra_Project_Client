"use strict";

function fetchFromServer(url, httpVerb, requestBody) {
    const TKN_SALT = "$Sm3lly_3lli3$TKN.";
    const options = {
    method: httpVerb,

    headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: `Bearer ${TKN_SALT}${getGameID()}+${getPlayerName()}`,
},
    // Don't forget to add data to the body when needed
    body: JSON.stringify(requestBody)
};

    return fetch(url, options)
        .then((response) => {

            switch (response.status) {
                case 401:
                    console.error('%c%s', 'background-color: red;color: white', "You don't have the correct authentication");
                    console.table(response);
                    break;
                case 403:
                    console.error('%c%s', 'background-color: red;color: white', 'U have performed a forbidden action');
                    console.table(response);
                    break;
                case 409:
                    console.error('%c%s', 'background-color: red;color: white', "This action is not allowed because it's against the rules");
                    console.table(response);
                    break;
                case 422:
                    console.error('%c%s', 'background-color: red;color: white', 'Player or game does not exist');
                    console.table(response);
                    break;
                case 200:
                    return response.json();
            }


    })
    .then((jsonresponseyouarelookingfor) => {
        return jsonresponseyouarelookingfor;
    });
}
