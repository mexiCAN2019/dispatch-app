import React, { useState, useEffect } from 'react';
import Load from './load';
import { Button, Form, Select } from 'semantic-ui-react';
import { months } from './../../util/options';


function RenderLoads({ loads, cancelLoad, monthLoads, unbookedMonthLoads, driverID, cancel }) {
    const [dataCriteria, setDataCriteria] = useState({year: new Date().getFullYear(), month: null});

    useEffect(() => {
        let getMonth = new Date().getMonth();
        if(getMonth.toString().length === 1){
            getMonth = `0${getMonth}`;
        }
        setDataCriteria({...dataCriteria, month: getMonth})
      }, []);


    const handleChange = (e, {name, value}) => {
        setDataCriteria({...dataCriteria, [name]: value });
    };

    const handleSubmit = () => {
        if(driverID) {
            console.log('driver');
            monthLoads(driverID, dataCriteria.year, dataCriteria.month);
        } else {
            console.log('unbooked');
            unbookedMonthLoads(dataCriteria.year, dataCriteria.month);
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
            <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap", }}>
                {loads.map(load => {
                    return <Load load={load}
                                cancelLoad={cancelLoad}
                                key={load.id}
                                cancel={cancel} />
                })}
                
            </div>
        </div>
    )
}

export default RenderLoads;