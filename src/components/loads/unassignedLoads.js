import React, { useState, useEffect } from 'react';
import RenderLoads from './../driver/renderLoads';
import Express from './../../fetchExpress';


function UnassignedLoads() {
    const [loads, setLoads] = useState([]);

    useEffect(() => {
        Express.getUnassignedLoads().then(loads => setLoads(loads));
    }, []);

    const getMonthLoads = (driverID, year, month) => {
        if(month == 0){
            Express.getDriverBookedYearLoads(driverID, year).then(loads => setLoads(loads));
        } else {
            Express.getMonthUnbookedLoads(year, month).then(loads => setLoads(loads));
        }
    };

    const cancelledLoad = (cancelledLoad) => {
        if (window.confirm('Are you sure you want to cancel load?')) {
            Express.updateLoad(cancelledLoad.id, cancelledLoad);
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
                         cancel={true} />
        </div>
    )
};


export default UnassignedLoads;