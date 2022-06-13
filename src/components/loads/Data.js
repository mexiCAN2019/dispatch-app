import React, { useState, useEffect } from 'react';
import { MenuItem, Stack, Grid, TextField, Card, InputLabel, Select, Container, Button, FormControl } from '@mui/material';
import Express from './../../fetchExpress';
import ExpressF from './../../fetchFeathers';
import { months, reloadSelect } from './../../util/options';

const dataType = [{key: 'average', value: 'average', text: 'Average'}, {key: 'sum', value: 'sum', text: 'Total'}];

function Data() {
    const [dataCriteria, setDataCriteria] = useState({dataType: null, year: new Date().getFullYear(), month: null, reloadLoad: null, driverId: null});
    const [data, setData] = useState({rate: null, numberOfLoads: null});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDataCriteria({...dataCriteria, [name]: value });
    };

    const handleSubmit = () => {
        if(dataCriteria.driverId === 0){
            switch(dataCriteria.dataType){
                case "average":
                    if(dataCriteria.month == 0){
                        Express.getYearRateAverage(dataCriteria.year, dataCriteria.reloadLoad).then(response => setData({rate: response.averageRate, numberOfLoads: response.numberOfLoads}));
                        console.log("year");
                    } else{
                        Express.getMonthRateAverage(dataCriteria.year, dataCriteria.month, dataCriteria.reloadLoad).then(response => setData({rate: response.averageRate, numberOfLoads: response.numberOfLoads}));
                        console.log("month");
                    }
                    break;
                case "sum":
                    if(dataCriteria.month == 0){
                        Express.getYearRateSum(dataCriteria.year, dataCriteria.reloadLoad).then(response => setData({rate: response.sumRate, numberOfLoads: response.numberOfLoads}));
                    } else{
                        Express.getMonthRateSum(dataCriteria.year, dataCriteria.month, dataCriteria.reloadLoad).then(response => setData({rate: response.sumRate, numberOfLoads: response.numberOfLoads}));
                    }
                    break;
                default:
                    return;
            }
        } else {
            switch(dataCriteria.dataType){
                case "average":
                    if(dataCriteria.month == 0){
                        Express.getDriverYearRateAverage(dataCriteria.year, dataCriteria.reloadLoad, dataCriteria.driverId).then(response => setData({rate: response.averageRate, numberOfLoads: response.numberOfLoads}));
                    } else{
                        Express.getDriverMonthRateAverage(dataCriteria.year, dataCriteria.month, dataCriteria.reloadLoad, dataCriteria.driverId).then(response => setData({rate: response.averageRate, numberOfLoads: response.numberOfLoads}));
                        console.log("Drivermonth");
                    }
                    break;
                case "sum":
                    if(dataCriteria.month == 0){
                        Express.getDriverYearRateSum(dataCriteria.year, dataCriteria.reloadLoad, dataCriteria.driverId).then(response => setData({rate: response.sumRate, numberOfLoads: response.numberOfLoads}));
                    } else{
                        Express.getDriverMonthRateSum(dataCriteria.year, dataCriteria.month, dataCriteria.reloadLoad, dataCriteria.driverId).then(response => setData({rate: response.sumRate, numberOfLoads: response.numberOfLoads}));
                    }
                    break;
                default:
                    return;
                }
        }
        
    };


    const [driversDropdown, setDriversDropdown] = useState();
    useEffect(() => {
        const token = localStorage.getItem('token');
        ExpressF.getDrivers(token).then(fetchedDrivers => {
            let drivers = [{key: 0, value: 0, text: 'All Drivers'}];
            fetchedDrivers.map(driver => {
                drivers.push({key: driver.id, value: driver.id, text: `${driver.firstName}`})
            });
            console.log(drivers);
        setDriversDropdown(drivers);
        }) 
    }, []);

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" style={{height: "90vh"}}>
            <Grid item>
                <Stack spacing={3}>
                    <FormControl fullWidth>
                        <InputLabel>Driver *</InputLabel>
                        <Select name='driverId' value={dataCriteria.driverId} onChange={handleChange} required>
                            {driversDropdown ? driversDropdown.map(driver => {
                                return <MenuItem key={driver.key} value={driver.value}>{driver.text}</MenuItem>
                            }) : <MenuItem>Loading</MenuItem>}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Average or Total *</InputLabel>
                        <Select name='dataType' value={dataCriteria.dataType} onChange={handleChange} required>
                            {dataType.map(type => {
                                return <MenuItem key={type.key} value={type.value}>{type.text}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Choose Month *</InputLabel>
                        <Select name='month' value={dataCriteria.month} onChange={handleChange} required>
                            {months.map(month => {
                                return <MenuItem key={month.key} value={month.value}>{month.text}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Choose Load Type *</InputLabel>
                        <Select name='reloadLoad' value={dataCriteria.reloadLoad} onChange={handleChange} required>
                            {reloadSelect.map(load => {
                                return <MenuItem key={load.key} value={load.value}>{load.text}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <TextField type="number" label='Enter Year' value={dataCriteria.year} name="year" onChange={handleChange} required />
                    <Button variant='contained' onClick={handleSubmit}>Go</Button>
                </Stack>
            </Grid>
            <Grid item>
                <Card>
                    <Container style={{padding: '5vh 10vw'}}>
                        <Stack spacing={3}>
                            <h2>Results</h2>
                            <label>{dataCriteria.dataType} Rate for {dataCriteria.month} {dataCriteria.year} is</label>
                            <h5>${data.rate}</h5>
                            <label>Total number of loads:</label>
                            <h5>{data.numberOfLoads}</h5>
                        </Stack>
                    </Container>
                </Card>
            </Grid >
        </Grid>
        // <div>
        //     <div style={{display: 'flex', justifyContent: 'center'}}>
                
        //     <Form.Input style={{width:"300px"}} required control={Select} label='Driver' placeholder='Driver' name='driverId' value={dataCriteria.driverId} options={driversDropdown} onChange={handleChange} width={6} />
        //     <Form.Input style={{width:"300px"}} required control={Select} label='Choose Data Type' placeholder='Average or Total?' name='dataType' value={dataCriteria.dataType} options={dataType} onChange={handleChange} width={6} />
        //     <Form.Input style={{width:"300px"}} required control={Select} label='Choose Month' placeholder='Month' name='month' value={dataCriteria.month} options={months} onChange={handleChange} width={6} />
        //     <Form.Input style={{width:"300px"}} required type='number' label='Enter Year' placeholder='Year' name='year' value={dataCriteria.year} onChange={handleChange} width={6} />
        //     <Form.Input style={{width:"300px"}} required control={Select} label='Choose Load Type' placeholder='Reload?' name='reloadLoad' value={dataCriteria.reloadLoad} options={reloadSelect} onChange={handleChange} width={6} />
            
        //     <br></br>
            
        //     </div>
            
        // </div>
    )
};


export default Data;