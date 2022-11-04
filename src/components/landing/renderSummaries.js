import React from 'react';
import Summary from './summary';
import UnassignedSummary from './unassignedSummary';



function RenderSummaries({ loads, unassignedLoads }) {

    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <em style={{display: 'block'}}><strong>Red Border:</strong> behind and needs a load. <strong>Yellow:</strong> delivers today and needs a load. <strong>Green:</strong> Has load booked for today.</em>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                {loads.map(load => {
                    return <Summary load={load} 
                                    key={load.id}/>
                })}
                <UnassignedSummary loads={unassignedLoads} />
            </div>
        </div>
    )
};

export default RenderSummaries;