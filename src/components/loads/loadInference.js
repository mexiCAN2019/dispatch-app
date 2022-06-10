import React, { useState, useEffect } from 'react';
import { Form,  Input } from 'semantic-ui-react';
// TextArea, Select, Button,Label, Checkbox
import { FormControl, InputLabel, Select, Container, Button, MenuItem, Grid, TextField, Radio, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import { DateInput } from "semantic-ui-calendar-react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Express from './../../fetchExpress';
import { trailerOptions, trailerNumbers, states } from './../../util/options';
import ExpressF from '../../fetchFeathers';


function LoadInference() {
    const [error, setError] = useState({driverId: false, puCity: false, puState: false, puDate: false, puTime: false, endPUTime: false, delCity: false, delState: false, delDate: false,
        delTime: false, endDelTime: false, commodity: false, weight: false, broker: false, rate: false, dispatched: false, trailerNumber: false, trailerType: false, booked: false, reloadLoad: false})
    const [load, setLoad] = useState({driverId: null, puCity: null, puState: null, puDate: null, puTime: null, endPUTime: null, delCity: null, delState: null, delDate: null,
        delTime: null, endDelTime: null, commodity: null, weight: null, broker: null, rate: null, notes: null, loadStatus: 'waiting', dispatched: false, trailerNumber: null, trailerType: null, booked: false, reloadLoad: false});

    const checkForError = () => {
        if(load.driverId === null || load.driverId === ''){
            setError({...error, driverId: true});
        } 
        if(load.puState === null || load.puState === '') setError({...error, puState: true});
        if(load.puDate === null || load.puDate === '') setError({...error, puDate: true});
        if(load.puTime === null || load.puTime === '') setError({...error, puTime: true});
        if(load.endPUTime === null || load.endPUTime === '') setError({...error, endPUTime: true});
        if(load.delCity === null || load.delCity === '') setError({...error, delCity: true});
        if(load.delState === null || load.delState === '') setError({...error, delState: true});
        if(load.delDate === null || load.delDate === '') setError({...error, delDate: true});
        if(load.delTime === null || load.delTime === '') setError({...error, delTime: true});
        if(load.endDelTime === null || load.endDelTime === '') setError({...error, endDelTime: true});
        if(load.commodity === null || load.commodity === '') setError({...error, commodity: true});
        if(load.weight === null || load.weight === '') setError({...error, weight: true});
        if(load.broker === null || load.broker === '') setError({...error, broker: true});
        if(load.rate === null || load.rate === '') setError({...error, rate: true});
        if(load.dispatched === null || load.dispatched === '') setError({...error, dispatched: true});
        if(load.trailerNumber === null || load.trailerNumber === '') setError({...error, trailerNumber: true});
        if(load.trailerType === null || load.trailerType === '') setError({...error, trailerType: true});
        if(load.puCity === null || load.puCity === '') setError({...error, puCity: true});
        return alert('Fields with * must be filled out');
    }
    
    const handleBooked = () => {
        const newLoad = {
            driverId: load.driverId, puCity: load.puCity, puState: load.puState, puDate: load.puDate, puTime: load.puTime, endPUTime: load.endPUTime, delCity: load.delCity, 
            delState: load.delState, delDate: load.delDate, delTime: load.delTime, endDelTime: load.endDelTime, commodity: load.commodity, weight: load.weight, broker: load.broker, rate: load.rate, 
            notes: load.notes, loadStatus: load.loadStatus, dispatched: load.dispatched, trailerNumber: load.trailerNumber, trailerType: load.trailerType, booked: load.booked, reloadLoad: load.reloadLoad
        };

        ExpressF.createLoad(newLoad).then(response => {
            if(response === 'error 400'){
                return checkForError();
            } else {
                setLoad({driverId: null, puCity: '', puState: null, puDate: null, puTime: '', endPUTime: '', delCity: '', delState: null, delDate: null,
        delTime: '', endDelTime: '', commodity: '', weight: '', broker: '', rate: '', notes: '', loadStatus: 'waiting', dispatched: false, trailerNumber: null, trailerType: null, booked: null, reloadLoad: null});
                if(load.booked){
                    alert('LOAD BOOKED');
                } else{
                    alert('LOAD NOT BOOKED');
                }
            }
        });
    };

    // const handleChange = (e, {name, value}) => {
    //     setLoad({...load, [name]: value });
    // };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoad({...load, [name]: value})
        setError({...error, [name]: null});
    }


    // const [driversDropdown, setDriversDropdown] = useState();
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     setDriversDropdown(drivers(token));
    // }, []);
    const [driversTesting, setDriversTesting] = useState();
    useEffect(() => {
        const token = localStorage.getItem('token');
        ExpressF.getDrivers(token).then(fetchedDrivers => {
            setDriversTesting(fetchedDrivers);
        }); 
    }, []);

    return(
        <Container style={{paddingTop: '20px'}}>
            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid item sm={true} md={4} >
                    <FormControl fullWidth>
                        <InputLabel>Driver *</InputLabel>
                        <Select name='driverId' value={load.driverId} onChange={handleChange} required error={error.driverId}>
                            {driversTesting ? driversTesting.map(driver => {
                                return <MenuItem value={driver.id}>{`${driver.firstName}, ${driver.truckNumber}, ${driver.phoneNumber}`}</MenuItem>
                            }) : <MenuItem>Loading</MenuItem>}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={true} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Trailer *</InputLabel>
                        <Select name='trailerType' value={load.trailerType} onChange={handleChange} required error={error.trailerType}>
                            {trailerOptions ? trailerOptions.map(trailer => {
                                return <MenuItem value={trailer.value}>{trailer.text}</MenuItem>
                            }) : <MenuItem>Loading</MenuItem>}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={true} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Trailer Number *</InputLabel>
                        <Select name='trailerNumber' value={load.trailerNumber} onChange={handleChange} required error={error.trailerNumber}>
                            {trailerNumbers ? trailerNumbers.map(trailer => {
                                return <MenuItem value={trailer.value}>{trailer.text}</MenuItem>
                            }) : <MenuItem>Loading</MenuItem>}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item md={2}>
                    <TextField required name="puCity" label="Pickup City" value={load.puCity} onChange={handleChange} error={error.puCity} />
                </Grid>
                <Grid item md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Pickup State *</InputLabel>
                        <Select name='puState' value={load.puState} onChange={handleChange} required error={error.puState}>
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
                            error={error.puDate}
                            value={load.puDate}
                            onChange={(newValue) => {
                            setLoad({...load, puDate: newValue});
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker label="Pickup Time" value={load.puTime} error={error.puTime} onChange={(newValue) => setLoad({...load, puTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker label="Deliver Time" value={load.delTime} error={error.delTime} onChange={(newValue) => setLoad({...load, delTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Grid>


                <Grid item md={2}>
                    <TextField required name="delCity" label="Deliver City" value={load.delCity} onChange={handleChange} error={error.delCity} />
                </Grid>
                <Grid item md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Deliver State *</InputLabel>
                        <Select name='delState' value={load.delState} onChange={handleChange} required error={error.delState}>
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
                            error={error.delDate}
                            value={load.delDate}
                            onChange={(newValue) => {
                            setLoad({...load, delDate: newValue});
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker label="Latest Pickup Time" value={load.endPUTime} error={error.endPUTime} onChange={(newValue) => setLoad({...load, endPUTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Grid>
                <Grid item md={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker label="Latest Deliver Time" value={load.endDelTime} error={error.endDelTime} onChange={(newValue) => setLoad({...load, endDelTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Grid>


                <Grid item sm={6} md={3}>
                    <TextField required name="commodity" label="Commodity" value={load.commodity} onChange={handleChange} error={error.commodity} />
                </Grid>
                <Grid item sm={6} md={3}>
                    <TextField required type="number" inputProps={{min: '0'}} name="weight" label="Weight" value={load.weight} onChange={handleChange} error={error.weight} />
                </Grid>
                <Grid item sm={6} md={3}>
                    <TextField required name="broker" label="Broker" value={load.broker} onChange={handleChange} error={error.broker} />
                </Grid>
                <Grid item sm={6} md={3}>
                    <TextField required type="number" inputProps={{min: '0'}} name="rate" label="Rate" value={load.rate} onChange={handleChange} rate />
                </Grid>

                <Grid item md={12}>
                    <TextField label="Additional Notes" name="notes" variant='outlined' fullWidth multiline rows={4} value={load.notes} onChange={handleChange} />
                </Grid>


                <Grid item>
                    <FormControl>
                        <FormLabel id="book-load">Book Load?</FormLabel>
                        <RadioGroup
                            aria-labelledby="book-load"
                            name="booked"
                            value={load.booked}
                            error={error.booked}
                            onChange={handleChange}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Book it!" />
                            <FormControlLabel value={false} control={<Radio />} label="Do not book" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <FormLabel id="reload">Reloading?</FormLabel>
                        <RadioGroup
                            aria-labelledby="reload"
                            name="reloadLoad"
                            value={load.reloadLoad}
                            error={error.reloadLoad}
                            onChange={handleChange}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Reloading" />
                            <FormControlLabel value={false} control={<Radio />} label="Outbound" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item>
                    <Button onClick={handleBooked}>Save</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoadInference;