import React, { useState, useEffect } from 'react';
import RenderLoads from './../driver/renderLoads';
import Express from './../../fetchExpress';
import ExpressF from './../../fetchFeathers';


function UnassignedLoads() {
    const [loads, setLoads] = useState([]);

    useEffect(() => {
        ExpressF.getUnassignedLoads().then(loads => setLoads(loads));
    }, []);

    const getMonthLoads = (driverId, year, month) => {
        if(month == 0){
            ExpressF.getDriverBookedYearLoads(driverId, year).then(loads => setLoads(loads));
        } else {
            ExpressF.getMonthUnbookedLoads(year, month).then(loads => setLoads(loads));
        }
    };

    const cancelledLoad = (cancelledLoad) => {
        if (window.confirm('Are you sure you want to cancel load?')) {
            ExpressF.updateLoad(cancelledLoad.id, cancelledLoad);
            alert('load cancelled');
            const filteredLoads = loads.filter(load => load.id != cancelledLoad.id);
            setLoads(filteredLoads);
        } else {
            alert('load not cancelled');
        }
    };

    return (
        <div>
            <RenderLoads loads={loads}
                         monthLoads={getMonthLoads}
                         cancelLoad={cancelledLoad}
                         cancel={true}
                         driverId={1} />
        </div>
    )
};


export default UnassignedLoads;