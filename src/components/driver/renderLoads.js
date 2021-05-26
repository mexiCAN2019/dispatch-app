import React, { useState, useEffect } from 'react';
import Load from './load';
import { Button, Form, Select } from 'semantic-ui-react';
import { months } from './../../util/options';


function RenderLoads({ loads, cancelLoad, monthLoads, unbookedLoads, driverId, cancel, driversDropdown }) {
    const [dataCriteria, setDataCriteria] = useState({year: new Date().getFullYear(), month: null});

    useEffect(() => {
        let getMonth = new Date().getMonth();
        getMonth += 1;
        if(getMonth.toString().length === 1){
            getMonth = `0${getMonth}`;
        } else{
            getMonth = getMonth.toString();
        }
        setDataCriteria({...dataCriteria, month: getMonth});
      }, []);


    const handleChange = (e, {name, value}) => {
        setDataCriteria({...dataCriteria, [name]: value });
    };

    const handleSubmit = () => {
        if(driverId) {
            console.log('driver');
            monthLoads(driverId, dataCriteria.year, dataCriteria.month);
        } else {
            console.log('unbooked');
            unbookedLoads(dataCriteria.year, dataCriteria.month);
        }
    };

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{display: 'flex', justifyContent: "center", margin: '25px auto'}}>
                    <Form.Input control={Select} label='Choose Month' placeholder='Month' name='month' value={dataCriteria.month} options={months} onChange={handleChange} />
                    <Form.Input required type='number' label='Enter Year' placeholder='Year' name='year' value={dataCriteria.year} onChange={handleChange} />
                    <br></br>
                    <Button type="submit" color="green" icon="truck" content="Get Loads!" />
                </Form.Group>
            </Form>

            <span><i>Page initially only retreives loads for the current month.</i></span>
            <br></br>
            <span><i>Green border = Delivered, red = in transit, grey = waiting to be picked up. Red dot means load has not been dispatched (load information sent to driver).</i></span>

            <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", }}>
                {loads.map(load => {
                    return <Load load={load}
                                cancelLoad={cancelLoad}
                                key={load.id}
                                cancel={cancel}
                                driversDropdown={driversDropdown} />
                })}
                
            </div>
        </div>
    )
}

export default RenderLoads;