import React, { useState, useEffect } from 'react';
import RenderLoads from './../driver/renderLoads';
import ExpressF from './../../fetchFeathers';


function UnbookedLoads() {
    const [loads, setLoads] = useState([]);

    useEffect(() => {
        let getMonth = new Date().getMonth();
        getMonth += 1;
        if(getMonth.toString().length === 1) {
            getMonth = `0${getMonth}`;
        };

        ExpressF.getMonthUnbookedLoads(new Date().getFullYear(), getMonth).then(loads => setLoads(loads));
    }, []);

    const getUnbookedLoads = (year, month) => {
        if(month === 0){
            ExpressF.getYearUnbookedLoads(year).then(loads => setLoads(loads));
        } else {
            ExpressF.getMonthUnbookedLoads(year, month).then(loads => setLoads(loads));
        }
    };

    return (
        <div>
            <RenderLoads loads={loads} 
                         unbookedLoads={getUnbookedLoads}
                         driverId={false}
                         cancel={false} />
        </div>
    )
};


export default UnbookedLoads;