import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import RenderLoads from './renderLoads';
import Profile from './profile/profile';
import Express from './../../fetchExpress';


// Page doesn't update when user chooses a different driver from this page
//cancelledLoad is filtering the load underneath (no note) when load has a note. I think its due to individuale load module have own state and overall state in driver component 
function Driver({ match: { params: { driverID } } }) {
    const [profile, setProfile] = useState(true);
    const [loads, setLoads] = useState([]);
    const [threeLoads, setThreeLoads] = useState(() => [])


    // Using these two useEffects (instead of just one) causes a 'If you meant to render a collection of children, use an array instead.' error in profile.js for the recent activity Feed. 
    // useEffect(() => {
    //     Express.getDriverBookedLoads(driverID).then(loads => setLoads(loads));
    // }, []);

    // useEffect(() => {
    //     let loadsForProfile = [];
    //     for(let i = 0; i <= 2; i++) {
    //         const loadToBePushed = loads[i];
    //         loadsForProfile.push(loadToBePushed);
    //         console.log(loadToBePushed);
    //         console.log(loadsForProfile);
    //     }
    //     setThreeLoads(loadsForProfile);
    // },[loads]);

    useEffect(() => {
        let getMonth = new Date().getMonth();
        getMonth += 1;
        if(getMonth.toString().length === 1) {
            getMonth = `0${getMonth}`;
        };

        Express.getDriverBookedMonthLoads(driverID, new Date().getFullYear(), getMonth).then(loads => {
          setLoads(loads);
          let loadsForProfile = [];
          if(loads.length === false){
                return;
          } else if (loads.length === 1){
            for(let i = 0; i <= 0; i++) {
                const loadToBePushed = loads[i];
                loadsForProfile.push(loadToBePushed);
            };
          } else if(loads.length === 2){
                for(let i = 0; i <= 1; i++) {
                    const loadToBePushed = loads[i];
                    loadsForProfile.push(loadToBePushed);
                };
          } else {
                for(let i = 0; i <= 2; i++) {
                    const loadToBePushed = loads[i];
                    loadsForProfile.push(loadToBePushed);
                };
          }
          setThreeLoads(loadsForProfile);
        }
      );
      
    }, []);



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

    const getMonthLoads = (driverID, year, month) => {
        if(month == 0){
            Express.getDriverBookedYearLoads(driverID, year).then(loads => setLoads(loads));
        } else {
            Express.getDriverBookedMonthLoads(driverID, year, month).then(loads => setLoads(loads));
        }
    };


    const renderProfileOrLoads = () => {
        if (profile === true) {
            return <Profile driverID={driverID}
                            threeLoads={threeLoads} />
        }
        return <RenderLoads loads={loads}
                            cancelLoad={cancelledLoad}
                            monthLoads={getMonthLoads}
                            driverID={driverID}
                            cancel={true} />
    };

    

    const renderPositive = () => {
        if (profile === true) {
            return (
                <Button.Group>
                    <Button positive onClick={() => setProfile(true)}>Profile</Button>
                    <Button.Or />
                    <Button onClick={() => setProfile(false)}>Driver Loads</Button>
                </Button.Group>
            )
        }
        return (
            <Button.Group>
                <Button onClick={() => setProfile(true)}>Profile</Button>
                <Button.Or />
                <Button positive onClick={() => setProfile(false)}>Driver Loads</Button>
            </Button.Group>
        )
    }

    return (
        <div>
            {renderPositive()}
            {renderProfileOrLoads()}
        </div>
    )
}

export default Driver;