import React, { useState, useEffect } from 'react';

function Forms() {
    const [authentication, setAuthentication] = useState();
    const [data, setData] = useState();


    const handleGetData = () => {
        const fetchOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Authorization: `Bearer ${authentication ? authentication.accessToken : ''}`}
        };
        return fetch("http://localhost:3030/users", fetchOptions).then(response => {
            if(!response.ok){
                return 400;
            }
            return response.json();
        }).then(jsonResponse => {
            setData(jsonResponse);
        });
    }

    return (
        <div>
            Forms
            <button onClick={handleGetData}>Get data</button>
        </div>
    )
};

export default Forms;