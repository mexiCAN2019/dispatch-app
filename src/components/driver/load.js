import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Label, Modal, Select, TextArea, Icon} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { trailerOptions, trailerNumbers, states, status, dispatched, drivers } from './../../util/options'
import Express from '../../fetchExpress';

function Load({ load, cancelLoad, cancel }) {
    const [editOpen, setEditOpen] = useState(false);
    const [loadInfo , setLoadInfo] = useState(load);

    
    const cancelledLoad = () => {
        const updatedLoad = {
            id: loadInfo.id,
            loadID: loadInfo.loadID,
            driverID: loadInfo.driverID,
            puCity: loadInfo.puCity,
            puState: loadInfo.puState,
            puDate: loadInfo.puDate,
            puTime: loadInfo.puTime,
            endPUTime: loadInfo.endPUTime,
            delCity: loadInfo.delCity,
            delState: loadInfo.delState,
            delDate: loadInfo.delDate,
            delTime: loadInfo.delTime,
            endDelTime: loadInfo.endDelTime,
            commodity: loadInfo.commodity,
            weight: loadInfo.weight,
            broker: loadInfo.broker,
            rate: loadInfo.rate,
            notes: loadInfo.notes,
            loadStatus:loadInfo.loadStatus,
            dispatched: loadInfo.dispatched,
            trailerNumber: loadInfo.trailerNumber,
            trailerType: loadInfo.trailerType,
            booked: false
        };
        cancelLoad(updatedLoad);
    }

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete load?')) {
            Express.deleteLoad(loadInfo.id);
            alert('Load Deleted');
        } else {
            alert('Load Not Deleted');
        }
    };


    const handleSubmit = () => {
        let updatedLoad;
        if(cancel){
            updatedLoad = {
                loadID: loadInfo.loadID,
                driverID: loadInfo.driverID,
                puCity: loadInfo.puCity,
                puState: loadInfo.puState,
                puDate: loadInfo.puDate,
                puTime: loadInfo.puTime,
                endPUTime: loadInfo.endPUTime,
                delCity: loadInfo.delCity,
                delState: loadInfo.delState,
                delDate: loadInfo.delDate,
                delTime: loadInfo.delTime,
                endDelTime: loadInfo.endDelTime,
                commodity: loadInfo.commodity,
                weight: loadInfo.weight,
                broker: loadInfo.broker,
                rate: loadInfo.rate,
                notes: loadInfo.notes,
                loadStatus:loadInfo.loadStatus,
                dispatched: loadInfo.dispatched,
                trailerNumber: loadInfo.trailerNumber,
                trailerType: loadInfo.trailerType,
                booked: loadInfo.booked
            };
        } else {
            updatedLoad = {
                loadID: loadInfo.loadID,
                driverID: loadInfo.driverID,
                puCity: loadInfo.puCity,
                puState: loadInfo.puState,
                puDate: loadInfo.puDate,
                puTime: loadInfo.puTime,
                endPUTime: loadInfo.endPUTime,
                delCity: loadInfo.delCity,
                delState: loadInfo.delState,
                delDate: loadInfo.delDate,
                delTime: loadInfo.delTime,
                endDelTime: loadInfo.endDelTime,
                commodity: loadInfo.commodity,
                weight: loadInfo.weight,
                broker: loadInfo.broker,
                rate: loadInfo.rate,
                notes: loadInfo.notes,
                loadStatus:loadInfo.loadStatus,
                dispatched: loadInfo.dispatched,
                trailerNumber: loadInfo.trailerNumber,
                trailerType: loadInfo.trailerType,
                booked: true
            };
        }
        
        Express.updateLoad(loadInfo.id, updatedLoad).then(response => {
            if(response === 400){
                return alert('Make sure all areas with * are filled');
            } 
            console.log(response);
            alert('Load Updated');
            setEditOpen(false);
        });
    };

    const handleChange = (e, {name, value}) => {
        setLoadInfo({...loadInfo, [name]: value });
    }

    const renderEndDelTime = () => {
        if(loadInfo.endDelTime){
            return <a style={{color: 'black'}}>- {loadInfo.endDelTime}</a>
        }
    }
    const renderEndPUTime = () => {
        if(loadInfo.endPUTime){
            return <a style={{color: 'black'}}>- {loadInfo.endPUTime}</a>
        }
    }

    const loadStatusBorderColor = () => {
        const greenBorder = {
            border: "green solid 5px",
            width: "335px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            margin: "25px auto"
        }
        const maroonBorder = {
            border: "maroon solid 5px",
            width: "335px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            margin: "25px auto"
        }
        const greyBorder = {
            border: "grey solid 5px",
            width: "335px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            margin: "25px auto"
        }

        switch(loadInfo.loadStatus){
            case "waiting":
                return greyBorder;
            case "In-transit":
                return maroonBorder;
            default: 
                return greenBorder;
        };
    };

    const renderCancelOrDelete = () => {
        if(cancel){
            return <Button color='red' onClick={cancelledLoad}>Cancel Load</Button>
        }
        return <Button color='red' onClick={handleDelete}>Delete Load</Button>
    }

    const renderSaveOrBookButton = () => {
        if(cancel){
            return <Button type="submit" color="green" icon="truck" content="Save Changes" />
        }
        return <Button type="submit" color='green' content="Book Load" /> 
    };

    const [driversDropdown, setDriversDropdown] = useState();
    useEffect(() => {
        setDriversDropdown(drivers());
    }, []);


    return(
        <div style={loadStatusBorderColor()}>
            {loadInfo.dispatched ? '' : <Icon name="circle" color="red" />}
            <p style={{fontWeight: "bold", margin: "0px"}}>{loadInfo.loadID}</p>
            <p style={{fontWeight: "bold", margin: "0px"}}>{loadInfo.puCity}, {loadInfo.puState}</p>
            <p style={{margin: "0px"}}>{loadInfo.puDate}, {loadInfo.puTime} {renderEndPUTime()}</p>
             <p style={{margin: "0px"}}>- to -</p>
            <p style={{fontWeight: "bold", margin: "0px"}}>{loadInfo.delCity}, {loadInfo.delState}</p>
            <p style={{margin: "0px"}}>{loadInfo.delDate}, {loadInfo.delTime} {renderEndDelTime()}</p>
            <br></br>
            {loadInfo.commodity} | {loadInfo.weight}K LBS
            <br></br>
            {loadInfo.broker} | ${loadInfo.rate}
            <br></br>
            <p style={{border: "black solid 1px", width: "300px", margin: "auto"}}>Notes: {loadInfo.notes}</p>

            <Button color="twitter" onClick={()=> setEditOpen(true)} style={{margin: "auto"}}>Edit</Button> 

            <Modal open={editOpen} size='large'>
                <Modal.Header>
                    Edit 
                    <Button onClick={()=> setEditOpen(false)} color='grey' icon="times" floated='right' />
                </Modal.Header>
                
                <Modal.Content image>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Form widths='equal' onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Input label='Load ID' placeholder='PRO#, Confirmation#, etc...' name='loadID' value={loadInfo.loadID} onChange={handleChange} />
                            <Form.Input control={Select} options={status} label='Status' name='loadStatus' value={loadInfo.loadStatus} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input control={Select} label='Dispatched' name='dispatched' value={loadInfo.dispatched} options={dispatched} onChange={handleChange} />
                            <Form.Input required control={Select} label='Driver' placeholder='Driver' name='driverID' value={loadInfo.driverID} options={driversDropdown} onChange={handleChange} />
                            <Form.Input required control={Select} label='Trailer Type' placeholder='Trailer Type' name='trailerType' value={loadInfo.trailerType} options={trailerOptions} onChange={handleChange} />
                            <Form.Input control={Select} label='Trailer Number' placeholder='Trailer Number' name='trailerNumber' value={loadInfo.trailerNumber} options={trailerNumbers} onChange={handleChange} />
                        </Form.Group>    

                <Form.Group>
                    <Form.Input required label='Pickup City' placeholder='Pickup City' name='puCity' value={loadInfo.puCity} onChange={handleChange} />
                    <Form.Input required control={Select} search options={states} label='Pickup State' placeholder='State' name='puState' value={loadInfo.puState} onChange={handleChange} />
                    <Form.Field>
                    <DateInput
                        label='Pickup Date*'
                        dateFormat='MM/DD/YYYY'
                        name='puDate' value={loadInfo.puDate} onChange={handleChange} />
                    </Form.Field>
                    <Form.Input required label='Pickup Time' placeholder='Pickup Time' type='time' name='puTime' value={loadInfo.puTime} onChange={handleChange} />
                    <Form.Input label='Latest PU Time' placeholder='Latest Time' type='time' name='endPUTime' value={loadInfo.endPUTime} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Input required label='Deliver City' placeholder='Deliver City' name='delCity' value={loadInfo.delCity} onChange={handleChange} />
                    <Form.Input required control={Select} search options={states} label='Deliver State' placeholder='State' name='delState' value={loadInfo.delState} onChange={handleChange} />
                    <Form.Field>
                    <DateInput
                            label='Deliver Date*'
                            dateFormat='MM/DD/YYYY'
                            name='delDate' value={loadInfo.delDate} onChange={handleChange} />
                    </Form.Field>
                    <Form.Input required label='Deliver Time' placeholder='Deliver Time' type='time' name='delTime' value={loadInfo.delTime} onChange={handleChange} />
                    <Form.Input label='Latest Del Time' placeholder='Latest Time' type='time' name='endDelTime' value={loadInfo.endDelTime} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Input required label='Commodity' placeholder='Commodity' name='commodity' value={loadInfo.commodity} onChange={handleChange} />
                    <Form.Field>
                        <Label basic style={{border: 'none'}}>Weight*</Label>
                        <Input label={{ basic: true, content: 'K Lbs' }} labelPosition='right' placeholder='Weight' name='weight' value={loadInfo.weight} type='number' onChange={handleChange} />
                    </Form.Field>
                    <Form.Input required label='Broker' placeholder='Broker' name='broker' value={loadInfo.broker} onChange={handleChange} />
                    <Form.Field>
                        <Label basic style={{border: 'none'}}>Rate*</Label>
                        <Input label={{ basic: true, content: '$' }} labelPosition='left' placeholder='Rate' name='rate' value={loadInfo.rate} type='number' onChange={handleChange} />
                    </Form.Field>
                </Form.Group>

                <Form.Input label="Additional Note" control={TextArea} placeholder="note" name='notes' value={loadInfo.notes} onChange={handleChange} />

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {renderSaveOrBookButton()}
                
                </div>
                
                
            </Form>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                {renderCancelOrDelete()}
            </div>
        </div>
                </Modal.Content>
                
            </Modal>
        </div>
    );
};

export default Load;