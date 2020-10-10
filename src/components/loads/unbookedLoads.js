import React, { useState, useEffect } from 'react';
import RenderLoads from './../driver/renderLoads';
import Express from './../../fetchExpress';


function UnbookedLoads() {
    const [loads, setLoads] = useState([]);

    useEffect(() => {
        let getMonth = new Date().getMonth();
        getMonth += 1;
        if(getMonth.toString().length === 1) {
            getMonth = `0${getMonth}`;
        };

        Express.getMonthUnbookedLoads(new Date().getFullYear(), getMonth).then(loads => setLoads(loads));
    }, []);

    const getMonthLoads = (year, month) => {
        if(month == 0){
            
        } else {
            Express.getMonthUnbookedLoads(year, month).then(loads => setLoads(loads));
        }
    };

    return (
        <div>
            <RenderLoads loads={loads} 
                         unbookedMonthLoads={getMonthLoads}
                         driverID={false}
                         cancel={false} />
        </div>
    )
};


export default UnbookedLoads;