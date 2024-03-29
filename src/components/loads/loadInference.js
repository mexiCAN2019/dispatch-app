import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, Container, Button, MenuItem, Grid, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, InputAdornment, Alert, FormHelperText } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Snackbar from '@mui/material/Snackbar';
import { trailerOptions, trailerNumbers, states } from './../../util/options';
import ExpressF from '../../fetchFeathers';


function LoadInference() {
    const [error, setError] = useState({driverId: false, puCity: false, puState: false, puDate: false, puTime: false, endPUTime: false, delCity: false, delState: false, delDate: false,
        delTime: false, endDelTime: false, commodity: false, weight: false, broker: false, rate: false, dispatched: false, trailerNumber: false, trailerType: false, booked: false, reloadLoad: false})
    const [load, setLoad] = useState({driverId: '', puCity: '', puState: '', puDate: null, puTime: null, endPUTime: null, delCity: '', delState: '', delDate: null,
        delTime: null, endDelTime: null, commodity: '', weight: '', broker: '', rate: '', notes: '', loadStatus: 'waiting', dispatched: false, trailerNumber: '', trailerType: '', booked: 0, reloadLoad: 0});
    
    const [snackbar, setSnackbar] = useState({success: false, info: false, error: false, vertical: 'top', horizontal: 'center',})

    const { vertical, horizontal } = snackbar;
    
    const handleClose = () => {
        setSnackbar({ ...snackbar, success: false, info: false, error: false });
    };



    const checkForError = () => {
        if(load.driverId === null || load.driverId === ''){
            setError({...error, driverId: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.puState === null || load.puState === ''){
            setError({...error, puState: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.puDate === null || load.puDate === ''){
            setError({...error, puDate: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.puTime === null || load.puTime === ''){
            setError({...error, puTime: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.delCity === null || load.delCity === ''){
            setError({...error, delCity: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.delState === null || load.delState === ''){
            setError({...error, delState: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.delDate === null || load.delDate === ''){
            setError({...error, delDate: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.delTime === null || load.delTime === ''){
            setError({...error, delTime: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.commodity === null || load.commodity === ''){
            setError({...error, commodity: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.weight === null || load.weight === ''){
            setError({...error, weight: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.broker === null || load.broker === ''){
            setError({...error, broker: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.rate === null || load.rate === ''){
            setError({...error, rate: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.dispatched === null || load.dispatched === ''){
            setError({...error, dispatched: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.trailerNumber === null || load.trailerNumber === ''){
            setError({...error, trailerNumber: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.trailerType === null || load.trailerType === ''){
            setError({...error, trailerType: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        if(load.puCity === null || load.puCity === ''){
            setError({...error, puCity: true});
            return setSnackbar({ ...snackbar, error: true });
        } 
        return 'all good'
    }
    const handleBooked = () => {
        const newLoad = {
            driverId: load.driverId, puCity: load.puCity, puState: load.puState, puDate: load.puDate.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}), puTime: load.puTime, endPUTime: load.endPUTime, delCity: load.delCity, 
            delState: load.delState, delDate: load.delDate.toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}), delTime: load.delTime, endDelTime: load.endDelTime, commodity: load.commodity, weight: load.weight, broker: load.broker, rate: load.rate, 
            notes: load.notes, loadStatus: load.loadStatus, dispatched: load.dispatched, trailerNumber: load.trailerNumber, trailerType: load.trailerType, booked: load.booked, reloadLoad: load.reloadLoad
        };

        ExpressF.createLoad(newLoad).then(response => {
            if(response === 'error 400'){
                setSnackbar({ ...snackbar, error: true });
                return checkForError();
            } else {
                setLoad({driverId: '', puCity: '', puState: '', puDate: null, puTime: null, endPUTime: null, delCity: '', delState: '', delDate: null,
        delTime: null, endDelTime: null, commodity: '', weight: '', broker: '', rate: '', notes: '', loadStatus: 'waiting', dispatched: false, trailerNumber: '', trailerType: '', booked: null, reloadLoad: null});
                if(load.booked){
                    // alert('LOAD BOOKED');
                    setSnackbar({ ...snackbar, success: true });
                } else{
                    // alert('LOAD NOT BOOKED');
                    setSnackbar({ ...snackbar, info: true });
                }
            }
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoad({...load, [name]: value})
        setError({...error, [name]: null});
    }


    const [drivers, setDrivers] = useState();
    useEffect(() => {
        const token = localStorage.getItem('token');
        ExpressF.getDrivers(token).then(fetchedDrivers => {
            setDrivers(fetchedDrivers);
        }); 
    }, []);

    return(
        <Container style={{paddingTop: '20px'}}>
            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid item xs={6} sm={6} md={4} >
                    <FormControl fullWidth>
                        <InputLabel>Driver *</InputLabel>
                        <Select className='white-back' name='driverId' value={load.driverId} onChange={handleChange} required error={error.driverId ? true : undefined}>
                            {drivers ? drivers.map(driver => {
                                return <MenuItem key={driver.id} value={driver.id}>{`${driver.firstName}, ${driver.truckNumber}, ${driver.phoneNumber}`}</MenuItem>
                            }) : <MenuItem>Loading</MenuItem>}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Trailer *</InputLabel>
                        <Select className='white-back' name='trailerType' value={load.trailerType} onChange={handleChange} required error={error.trailerType ? true : undefined}>
                            {trailerOptions ? trailerOptions.map(trailer => {
                                return <MenuItem key={trailer.key} value={trailer.value}>{trailer.text}</MenuItem>
                            }) : <MenuItem>Loading</MenuItem>}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Trailer Number *</InputLabel>
                        <Select className='white-back' name='trailerNumber' value={load.trailerNumber} onChange={handleChange} required error={error.trailerNumber ? true : undefined}>
                            {trailerNumbers ? trailerNumbers.map(trailer => {
                                return <MenuItem key={trailer.key} value={trailer.value}>{trailer.text}</MenuItem>
                            }) : <MenuItem>Loading</MenuItem>}
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={6} sm={6} md={2}>
                    <TextField className='white-back' required name="puCity" label="Pickup City" value={load.puCity} onChange={handleChange} error={error.puCity ? true : undefined} />
                </Grid>
                <Grid item xs={6} sm={6} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Pickup State *</InputLabel>
                        <Select className='white-back' name='puState' value={load.puState} onChange={handleChange} required error={error.puState ? true : undefined}>
                            {states.map(state => {
                                return <MenuItem key={state.key} value={state.value}>{state.text}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={6} md={3} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <LocalizationProvider dateFormats={{fullDate: 'MM/dd/yyyy', keyboardDate: 'MM/dd/yyyy'}} dateAdapter={AdapterDateFns}>
                        <DatePicker
                            className='white-back'
                            label="Pickup Date *"
                            name="puDate"
                            error={error.puDate ? true : undefined}
                            inputFormat="MM/dd/yyyy"
                            value={load.puDate}
                            onChange={(newValue) => {
                            setLoad({...load, puDate: newValue});
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            className='white-back'
                            label="Pickup Date *"
                            name="puDate"
                            error={error.puDate ? true : undefined}
                            value={load.puDate}
                            onChange={(newValue) => {
                            setLoad({...load, puDate: newValue});
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={6} md={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker className='white-back' ampm={false} label="Pickup Time" value={load.puTime} error={error.puTime ? true : undefined} onChange={(newValue) => setLoad({...load, puTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={6} md={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker className='white-back' ampm={false} label="Latest Pickup Time" value={load.endPUTime} error={error.endPUTime ? true : undefined} onChange={(newValue) => setLoad({...load, endPUTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Grid>


                <Grid item xs={6} sm={6} md={2}>
                    <TextField className='white-back' required name="delCity" label="Deliver City" value={load.delCity} onChange={handleChange} error={error.delCity ? true : undefined} />
                </Grid>
                <Grid item xs={6} sm={6} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>Deliver State *</InputLabel>
                        <Select className='white-back' name='delState' value={load.delState} onChange={handleChange} required error={error.delState ? true : undefined}>
                            {states.map(state => {
                                return <MenuItem key={state.key} value={state.value}>{state.text}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={6} md={3} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            className='white-back'
                            label="Deliver Date *"
                            name="delDate"
                            error={error.delDate ? true : undefined}
                            inputFormat="MM/dd/yyyy"
                            value={load.delDate}
                            onChange={(newValue) => {
                            setLoad({...load, delDate: newValue});
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            className='white-back'
                            label="Deliver Date *"
                            name="delDate"
                            error={error.delDate ? true : undefined}
                            value={load.delDate}
                            onChange={(newValue) => {
                            setLoad({...load, delDate: newValue});
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={6} md={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker className='white-back' format="HH:mm" ampm={false} label="Deliver Time" value={load.delTime} error={error.delTime ? true : undefined} onChange={(newValue) => setLoad({...load, delTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={6} md={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker className='white-back' ampm={false} label="Latest Deliver Time" value={load.endDelTime} error={error.endDelTime ? true : undefined} onChange={(newValue) => setLoad({...load, endDelTime: newValue})} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Grid>


                <Grid item xs={6} sm={6} md={3}>
                    <TextField className='white-back' required name="commodity" label="Commodity" value={load.commodity} onChange={handleChange} error={error.commodity ? true : undefined} />
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    {<TextField className='white-back' InputProps={{endAdornment: <InputAdornment position="end">K lbs</InputAdornment>}} required type="number" inputProps={{min: '0'}} name="weight" label="Weight" value={load.weight} onChange={handleChange} error={error.weight ? true : undefined} />}
                    
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <TextField className='white-back' required name="broker" label="Broker" value={load.broker} onChange={handleChange} error={error.broker ? true : undefined} />
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <TextField className='white-back' required type="number" inputProps={{min: '0'}} name="rate" label="Rate" value={load.rate} onChange={handleChange} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <TextField className='white-back' label="Additional Notes" name="notes" variant='outlined' fullWidth multiline rows={4} value={load.notes} onChange={handleChange} />
                </Grid>


                <Grid item xs={12} sm={12} md={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <FormControl className='white-back'>
                        <FormLabel id="book-load">Book Load?</FormLabel>
                        <RadioGroup
                            aria-labelledby="book-load"
                            name="booked"
                            value={load.booked}
                            error={error.booked ? true : undefined}
                            onChange={handleChange}
                        >
                            <FormControlLabel value={1} control={<Radio />} label="Book it!" />
                            <FormControlLabel value={0} control={<Radio />} label="Do not book" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl className='white-back'>
                        <FormLabel id="reload">Reloading?</FormLabel>
                        <RadioGroup
                            aria-labelledby="reload"
                            name="reloadLoad"
                            value={load.reloadLoad}
                            error={error.reloadLoad ? true : undefined}
                            onChange={handleChange}
                        >
                            <FormControlLabel value={1} control={<Radio />} label="Reloading" />
                            <FormControlLabel value={0} control={<Radio />} label="Outbound" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={handleBooked}>Save</Button>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbar.success}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity="success">Load Booked!</Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbar.info}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity="info">Load Not Booked</Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbar.error}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity="error">Make sure all required fields are completed.</Alert>
            </Snackbar>
        </Container>
    )
}

export default LoadInference;