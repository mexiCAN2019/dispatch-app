import React, { useState, useEffect } from 'react';
import { Divider, Stack, Dialog, Container, Button, FormControl, Select, InputLabel, MenuItem, Grid, TextField, DialogTitle, Card, CardContent } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateInput } from 'semantic-ui-calendar-react';
import { trailerOptions, trailerNumbers, states, status, dispatched, drivers } from './../../util/options'
import Express from '../../fetchExpress';
import ExpressF from '../../fetchFeathers';

function Load({ load, cancelLoad, cancel }) {
    const [editOpen, setEditOpen] = useState(false);
    const [loadInfo , setLoadInfo] = useState(load);
    const [drivers, setDrivers] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        ExpressF.getDrivers(token).then(fetchedDrivers => {
            setDrivers(fetchedDrivers);
        }); 
    }, []);
    
    const cancelledLoad = () => {
        const updatedLoad = {
            id: loadInfo.id,
            loadID: loadInfo.loadID,
            driverId: loadInfo.driverId,
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
            reloadLoad: loadInfo.reloadLoad,
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
            ExpressF.deleteLoad(loadInfo.id);
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
                driverId: loadInfo.driverId,
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
                reloadLoad: loadInfo.reloadLoad,
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
                driverId: loadInfo.driverId,
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
                reloadLoad: loadInfo.reloadLoad,
                notes: loadInfo.notes,
                loadStatus:loadInfo.loadStatus,
                dispatched: loadInfo.dispatched,
                trailerNumber: loadInfo.trailerNumber,
                trailerType: loadInfo.trailerType,
                booked: true
            };
        }
        ExpressF.updateLoad(loadInfo.id, updatedLoad).then(response => {
            if(response === 400){
                return alert('Make sure all areas with * are filled');
            }
            alert('Load Updated');
            setEditOpen(false);
        });
    };

    const handleChange = ({ target }) => {
        const {name, value} = target;
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
            return <Button onClick={cancelledLoad}>Cancel Load</Button>
        }
        return <Button onClick={handleDelete}>Delete Load</Button>
    }

    const renderSaveOrBookButton = () => {
        if(cancel){
            return <Button onClick={handleSubmit}>Save Changes</Button>
        }
        return <Button onClick={handleSubmit}>Book Load</Button> 
    };


    return(
        <Card style={loadStatusBorderColor()}>
            <CardContent style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                {loadInfo.dispatched ? '' : <h3 style={{color: 'red'}}>Not Dispatched</h3>}
                <p style={{fontWeight: "bold", margin: "0px"}}>Load #: {loadInfo.loadID}</p>
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
                <p style={{border: "black solid 1px", width: "300px", margin: "auto"}}><strong>Notes:</strong> {loadInfo.notes}</p>
            </CardContent>    
            <Button onClick={()=> setEditOpen(true)} style={{margin: "auto"}}>Edit</Button> 
                
            

            <Dialog onClose={() => setEditOpen(false)} open={editOpen} fullWidth={true} maxWidth="md">
                <DialogTitle>Edit Load Info</DialogTitle>
                <Container>
                    <Grid container rowSpacing={3} columnSpacing={2}>
                        <Grid item md={4} fullWidth>
                            <TextField label="Load ID" placeholder='Pro#, Confirmation#, etc...' name='loadID' value={loadInfo.loadID} onChange={handleChange} />
                        </Grid>
                        <Grid item md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Dispatched</InputLabel>
                                <Select name='dispatched' value={loadInfo.dispatched} onChange={handleChange}>
                                    {dispatched.map(dispatch => {
                                        return <MenuItem value={dispatch.key}>{dispatch.text}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>  
                        <Grid item md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select name='loadStatus' value={loadInfo.loadStatus} onChange={handleChange}>
                                    {status.map(location => {
                                        return <MenuItem value={location.key}>{location.text}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
              
                        <Grid item sm={true} md={4} >
                            <FormControl fullWidth>
                                <InputLabel>Driver *</InputLabel>
                                <Select name='driverId' value={loadInfo.driverId} onChange={handleChange} required /* error={error.driverId} */>
                                    {drivers ? drivers.map(driver => {
                                        return <MenuItem value={driver.id}>{`${driver.firstName}, ${driver.truckNumber}, ${driver.phoneNumber}`}</MenuItem>
                                    }) : <MenuItem>Loading</MenuItem>}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={true} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Trailer *</InputLabel>
                                <Select name='trailerType' value={loadInfo.trailerType} onChange={handleChange} required /* error={error.trailerType} */>
                                    {trailerOptions ? trailerOptions.map(trailer => {
                                        return <MenuItem value={trailer.value}>{trailer.text}</MenuItem>
                                    }) : <MenuItem>Loading</MenuItem>}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={true} md={4}>
                            <FormControl fullWidth>
                                <InputLabel>Trailer Number *</InputLabel>
                                <Select name='trailerNumber' value={loadInfo.trailerNumber} onChange={handleChange} required /* error={error.trailerNumber} */>
                                    {trailerNumbers ? trailerNumbers.map(trailer => {
                                        return <MenuItem value={trailer.value}>{trailer.text}</MenuItem>
                                    }) : <MenuItem>Loading</MenuItem>}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item md={2}>
                            <TextField required name="puCity" label="Pickup City" value={loadInfo.puCity} onChange={handleChange} /* error={error.puCity} */ />
                        </Grid>
                        <Grid item md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Pickup State *</InputLabel>
                                <Select name='puState' value={loadInfo.puState} onChange={handleChange} required /* error={error.puState} */>
                                    {states.map(state => {
                                        return <MenuItem value={state.value}>{state.text}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Pickup Date *"
                                    name="puDate"
                                    /* error={error.puDate} */
                                    value={loadInfo.puDate}
                                    onChange={(newValue) => {
                                    setLoadInfo({...load, puDate: newValue});
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker label="Pickup Time" value={loadInfo.puTime} /* error={error.puTime} */ onChange={(newValue) => setLoadInfo({...load, puTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker label="Deliver Time" value={loadInfo.delTime} /* error={error.delTime} */ onChange={(newValue) => setLoadInfo({...load, delTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                            </LocalizationProvider>
                        </Grid>


                        <Grid item md={2}>
                            <TextField required name="delCity" label="Deliver City" value={loadInfo.delCity} onChange={handleChange} /* error={error.delCity} */ />
                        </Grid>
                        <Grid item md={2}>
                            <FormControl fullWidth>
                                <InputLabel>Deliver State *</InputLabel>
                                <Select name='delState' value={loadInfo.delState} onChange={handleChange} required /* error={error.delState} */>
                                    {states.map(state => {
                                        return <MenuItem value={state.value}>{state.text}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Deliver Date *"
                                    name="delDate"
                                    /* error={error.delDate} */
                                    value={loadInfo.delDate}
                                    onChange={(newValue) => {
                                    setLoadInfo({...load, delDate: newValue});
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker label="Latest Pickup Time" value={loadInfo.endPUTime} /* error={error.endPUTime} */ onChange={(newValue) => setLoadInfo({...load, endPUTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker label="Latest Deliver Time" value={loadInfo.endDelTime} /* error={error.endDelTime} */ onChange={(newValue) => setLoadInfo({...load, endDelTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                            </LocalizationProvider>
                        </Grid>


                        <Grid item sm={6} md={3}>
                            <TextField required name="commodity" label="Commodity" value={loadInfo.commodity} onChange={handleChange} /* error={error.commodity} */ />
                        </Grid>
                        <Grid item sm={6} md={3}>
                            <TextField required type="number" inputProps={{min: '0'}} name="weight" label="Weight" value={loadInfo.weight} onChange={handleChange} /* error={error.weight} */ />
                        </Grid>
                        <Grid item sm={6} md={3}>
                            <TextField required name="broker" label="Broker" value={loadInfo.broker} onChange={handleChange} /* error={error.broker} */ />
                        </Grid>
                        <Grid item sm={6} md={3}>
                            <TextField required type="number" inputProps={{min: '0'}} name="rate" label="Rate" value={loadInfo.rate} onChange={handleChange} rate />
                        </Grid>

                        <Grid item md={12}>
                            <TextField label="Additional Notes" name="notes" variant='outlined' fullWidth multiline rows={4} value={loadInfo.notes} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Container>
                {renderSaveOrBookButton()}
                {renderCancelOrDelete()}
            </Dialog>
        </Card>
    );
};

export default Load;