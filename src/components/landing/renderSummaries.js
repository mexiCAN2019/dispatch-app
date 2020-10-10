import React from 'react';
import Summary from './summary';
import UnassignedSummary from './unassignedSummary';



function RenderSummaries({ loads, unassignedLoads }) {

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {loads.map(load => {
                return <Summary load={load} 
                                key={load.id}/>
            })}
            <UnassignedSummary loads={unassignedLoads} />
        </div>
    )
};

export default RenderSummaries;