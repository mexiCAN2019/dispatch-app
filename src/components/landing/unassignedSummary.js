import React from 'react';
import { Card } from '@mui/material';

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

    const numberOfLoads = loads ? loads.length : 0;

    return (
        <Card style={border}>
            <b>{numberOfLoads} Unassigned Loads</b>
        </Card>
    )
};

export default UnassignedSummary;