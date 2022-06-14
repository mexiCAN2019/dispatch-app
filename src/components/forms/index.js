import React, { useState } from 'react';

function Forms() {
    const [value, setValue] = useState(null);


    
    const handleClick = () => {
            const url = `http://kgtransportapi.elementbalance.com/loadsForCalendar/2022/05`;
            fetch(url).then(response => {
                if(response.ok){
                    return response.json();
                }
                console.log(response);
            }, networkError => {
                console.log(networkError.message);
            }).then(jsonResponse => {
                return jsonResponse;
            }).then(data => setValue(data));
        }

    return (
        <div>
            <button onClick={handleClick}>test</button>
            {value.map(value => {
                return <div>{value.puTime}</div>
            })}
        </div>
    )
};

export default Forms;