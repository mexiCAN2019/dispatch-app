import React, { useState, useEffect } from 'react';
import { Form, TextArea, Select, Button, Input, Label, Checkbox } from 'semantic-ui-react';
import { DateInput } from "semantic-ui-calendar-react";
import Express from './../../fetchExpress';
import { trailerOptions, trailerNumbers, states, drivers } from './../../util/options';
import ExpressF from '../../fetchFeathers';


function LoadInference() {
    const [load, setLoad] = useState({driverId: null, puCity: null, puState: null, puDate: null, puTime: null, endPUTime: null, delCity: null, delState: null, delDate: null,
        delTime: null, endDelTime: null, commodity: null, weight: null, broker: null, rate: null, notes: null, loadStatus: 'waiting', dispatched: false, trailerNumber: null, trailerType: null, booked: null, reloadLoad: null});

    const handleBooked = () => {
        
        const newLoad = {
            driverId: load.driverId, puCity: load.puCity, puState: load.puState, puDate: load.puDate, puTime: load.puTime, endPUTime: load.endPUTime, delCity: load.delCity, 
            delState: load.delState, delDate: load.delDate, delTime: load.delTime, endDelTime: load.endDelTime, commodity: load.commodity, weight: load.weight, broker: load.broker, rate: load.rate, 
            notes: load.notes, loadStatus: load.loadStatus, dispatched: load.dispatched, trailerNumber: load.trailerNumber, trailerType: load.trailerType, booked: load.booked, reloadLoad: load.reloadLoad
        };
        ExpressF.createLoad(newLoad).then(response => {
            if(response === 'error 400'){
                return alert('Fields with * must be filled out');
            } else {
                setLoad({driverId: null, puCity: null, puState: null, puDate: null, puTime: null, endPUTime: null, delCity: null, delState: null, delDate: null,
        delTime: null, endDelTime: null, commodity: null, weight: null, broker: null, rate: null, notes: null, loadStatus: 'waiting', dispatched: false, trailerNumber: null, trailerType: null, booked: null, reloadLoad: null});
                if(load.booked){
                    alert('LOAD BOOKED');
                } else{
                    alert('LOAD NOT BOOKED');
                }
            }
        });
    };

    const handleChange = (e, {name, value}) => {
        setLoad({...load, [name]: value });
    };


    const [driversDropdown, setDriversDropdown] = useState();
    useEffect(() => {
        setDriversDropdown(drivers());
    }, []);

    return(
        <Form widths='equal' onSubmit={handleBooked} style={{margin: '50px auto'}}>
        <Form.Group>
            <Form.Input required control={Select} label='Driver' placeholder='Driver' name='driverId' value={load.driverId} options={driversDropdown} onChange={handleChange} />
            <Form.Input required control={Select} label='Trailer Type' placeholder='Trailer Type' name='trailerType' value={load.trailerType} options={trailerOptions} onChange={handleChange} />
            <Form.Input control={Select} label='Trailer Number' placeholder='Trailer Number' name='trailerNumber' value={load.trailerNumber} options={trailerNumbers} onChange={handleChange} />
        </Form.Group>    

            <Form.Group>
                <Form.Input required label='Pickup City' placeholder='Pickup City' name='puCity' value={load.puCity} onChange={handleChange} />
                <Form.Input required control={Select} search options={states} label='Pickup State' placeholder='State' name='puState' value={load.puState} onChange={handleChange} />
                <Form.Field>
                <DateInput
                    label='Pickup Date*'
                    dateFormat='MM/DD/YYYY'
                    name='puDate' value={load.puDate} onChange={handleChange} />
                </Form.Field>
                <Form.Input required label='Pickup Time' placeholder='Pickup Time' type='time' name='puTime' value={load.puTime} onChange={handleChange} />
                <Form.Input label='Latest PU Time' placeholder='Latest Time' type='time' name='endPUTime' value={load.endPUTime} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Input required label='Deliver City' placeholder='Deliver City' name='delCity' value={load.delCity} onChange={handleChange} />
                <Form.Input required control={Select} search options={states} label='Deliver State' placeholder='State' name='delState' value={load.delState} onChange={handleChange} />
                <Form.Field>
                <DateInput
                        label='Deliver Date*'
                        dateFormat='MM/DD/YYYY'
                        name='delDate' value={load.delDate} onChange={handleChange} />
                </Form.Field>
                <Form.Input required label='Deliver Time' placeholder='Deliver Time' type='time' name='delTime' value={load.delTime} onChange={handleChange} />
                <Form.Input label='Latest Del Time' placeholder='Latest Time' type='time' name='endDelTime' value={load.endDelTime} onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Input required label='Commodity' placeholder='Commodity' name='commodity' value={load.commodity} onChange={handleChange} />
                <Form.Field>
                    <Label basic style={{border: 'none'}}>Weight*</Label>
                    <Input label={{ basic: true, content: 'K Lbs' }} labelPosition='right' placeholder='Weight' name='weight' value={load.weight} type='number' onChange={handleChange} />
                </Form.Field>
                <Form.Input required label='Broker' placeholder='Broker' name='broker' value={load.broker} onChange={handleChange} />
                <Form.Field>
                    <Label basic style={{border: 'none'}}>Rate*</Label>
                    <Input label={{ basic: true, content: '$' }} labelPosition='left' placeholder='Rate' name='rate' value={load.rate} type='number' onChange={handleChange} />
                </Form.Field>
            </Form.Group>

            <Form.Input label="Additional Note" control={TextArea} placeholder="note" name='notes' value={load.notes} onChange={handleChange} />

            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
            <Form.Group style={{display: 'flex', flexDirection: "column", alignContent: "space-around", border: "ridge 5px red", borderRadius: "5px", width: "196px", padding: "20px 15px 30px"}}>
                Required*
                <Form.Field>
                <Checkbox
                    radio
                    label='Book it!'
                    name='booked'
                    value={true}
                    checked={load.booked === true}
                    onChange={handleChange}
                />
                </Form.Field>
                <Form.Field>
                <Checkbox
                    radio
                    label="Do not book"
                    name='booked'
                    value={false}
                    checked={load.booked === false}
                    onChange={handleChange}
                />
                </Form.Field>
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: "column", border: "ridge 5px red", borderRadius: "5px", width: "196px", padding: "20px 15px 30px"}}>
                Required*
                <Form.Field>
                <Checkbox
                    radio
                    label='Reloading'
                    name='reloadLoad'
                    value={true}
                    checked={load.reloadLoad === true}
                    onChange={handleChange}
                />
                </Form.Field>
                <Form.Field>
                <Checkbox
                    radio
                    label='Load'
                    name='reloadLoad'
                    value={false}
                    checked={load.reloadLoad === false}
                    onChange={handleChange}
                />
                </Form.Field>
            </Form.Group>
            </div>

            <Button type="submit" color="green" icon="truck" content="Save" />
        </Form>
    )
}

export default LoadInference;