import React, { useState, useEffect } from 'react';
import Express from '../../fetchExpress';
import ExpressF from '../../fetchFeathers';
import RenderSummaries from './renderSummaries';
import './landing.css';

function HomePage() {
    const [loads, setLoads] = useState([]);
    const [unassignedLoads, setUnassignedLoads] = useState([]);

    useEffect(() => {
            const token = localStorage.getItem('token');
            ExpressF.getDriversLanding(token).then(drivers => drivers.filter(driver => driver.id !== 1)).then(drivers => drivers.map(driver => {
                Express.getMostRecentLoads(driver.id, new Date().getFullYear()).then(load => {
                    if(load){
                        setLoads(prevLoads => [...prevLoads, load]);
                    }
                });
            })) 
            
            // ExpressF.getUnassignedLoads().then(loads => setUnassignedLoads(loads))
    }, []);


    return(
        <div>
            <div className='truckOne'>
                <div className='slogan'>
                    <h1>KG Transport</h1>
                    <h4 style={{margin: '0px auto 5px'}}>"Excellence in Motion"</h4>
                </div>
            </div>
            <h2>Dashboard</h2>

            <RenderSummaries loads={loads}
                             unassignedLoads={unassignedLoads} />
        </div>
    )
}

export default HomePage;