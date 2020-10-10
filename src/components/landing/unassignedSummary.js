import React from 'react';

function UnassignedSummary({ loads }) {

    const border = {
        border: "black solid 3px",
        margin: '150px 50px', 
        width: '250px', 
        height: '50px',
        borderRadius: '20px',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const numberOfLoads = loads.length;

    return (
        <div style={border}>
            <b>{numberOfLoads} Unassigned Loads</b>
        </div>
    )
};

export default UnassignedSummary;