"use strict";

function fetchFromServer(url, httpVerb, requestBody) {
    const errorColor = 'background-color: red;color: white';
    const options = {
        method: httpVerb,

        headers: {
            ["Content-Type"]: "application/json",
            ["Authorization"]: `Bearer ${atob(localStorage.getItem("token"))}`,
        },
        // Don't forget to add data to the body when needed
        body: JSON.stringify(requestBody)
    };

    return fetch(url, options)
        .then((response) => {

            switch (response.status) {
                case 401:
                    console.error('%c%s', errorColor, "You don't have the correct authentication");
                    console.table(response);
                    break;
                case 403:
                    console.error('%c%s', errorColor, 'U have performed a forbidden action');
                    console.table(response);
                    break;
                case 409:
                    console.error('%c%s', errorColor, "This action is not allowed because it's against the rules");
                    console.table(response);
                    break;
                case 422:
                    console.error('%c%s', errorColor, 'Player or game does not exist');
                    console.table(response);
                    break;
                case 200:
                    return response.json();
                default:
                    return null;
            }
            return null
        })
        .then((jsonResponseYouAreLookingFor) => {
            return jsonResponseYouAreLookingFor;
        });
}
