import { API } from "../config";

export const subscribe = (email) => {
    return fetch(`http://localhost:5000/api/subscribe/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
         
        },
        body: JSON.stringify({ email: email})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

